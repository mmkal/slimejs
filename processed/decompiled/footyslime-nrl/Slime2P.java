import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Polygon;
import java.awt.image.ImageObserver;
import java.net.URL;

public class Slime2P extends Applet implements Runnable {
   private int nWidth;
   private int nHeight;
   private int p1X;
   private int p1Y;
   private int p2X;
   private int p2Y;
   private int p1Col;
   private int p2Col;
   private int p1OldX;
   private int p1OldY;
   private int p2OldX;
   private int p2OldY;
   private int p1XV;
   private int p1YV;
   private int p2XV;
   private int p2YV;
   private int ballX;
   private int ballY;
   private int ballVX;
   private int ballVY;
   private int ballOldX;
   private int ballOldY;
   private Graphics screen;
   private String promptMsg;
   private int[][] replayData;
   private int replayPos;
   private int replayStart;
   private boolean mousePressed;
   private boolean fInPlay;
   private int p1Blink;
   private int p2Blink;
   private boolean fP1Fire;
   private boolean fP2Fire;
   private boolean superFlash;
   private boolean fP1Touched;
   private boolean fP2Touched;
   private int fP1Touches;
   private int fP2Touches;
   private int fP1TouchesTot;
   private int fP2TouchesTot;
   private int fP1Clangers;
   private int fP2Clangers;
   private int fP1Aces;
   private int fP2Aces;
   private int fP1Winners;
   private int fP2Winners;
   private int fP1PointsWon;
   private int fP2PointsWon;
   private boolean fP1HitStill;
   private boolean fP2HitStill;
   private long fP1Frames;
   private long fP2Frames;
   private int fP1Super;
   private int fP2Super;
   private int fP1Streak;
   private int fP2Streak;
   private boolean fSelectedColours;
   private boolean fServerMoved;
   private boolean hitNetSinceTouched;
   private Thread gameThread;
   private boolean fEndGame;
   private long startTime;
   private long gameTime;
   private long realStartTime;
   private long crossedNetTime;
   private int scoringRun;
   private int oldScoringRun;
   private final int scoringRunForSuper = 6;
   private String[] slimeColText;
   private Color[] slimeColours;
   private Color[] slimeColours2;
   private Color SKY_COL;
   private Color COURT_COL;
   private Color BALL_COL;
   private boolean nightTime = false;
   private boolean psycho = false;
   private boolean backwards = false;
   private boolean timer = false;
   private boolean buffered = false;
   // $FF: renamed from: pw char[]
   private char[] field_rn_Slime2P_pw_1;
   private String nyt = "night";
   private String psy = "super";
   private String bck = "toast";
   private String tim = "clock";
   private String wnd = "windy";
   private String hl2 = "2mins";
   private String hl3 = "3mins";
   private String hl4 = "4mins";
   private String hl5 = "5mins";
   private String bfr = "uffer";
   private long GAME_LENGTH = 120000L;
   private boolean holdingOn = false;
   private final long HOLDING_LENGTH = 5000L;
   private boolean firstHalf;
   private boolean windOn = false;
   private int wind;
   private final int maxWind = 30;
   private int NUM_PARTICLES = 60;
   private int particle_size = 3;
   private int[] particle_x;
   private int[] particle_y;
   private float[] particle_weight;
   private int floor;
   private Image buffer;
   private Font baseFont;

   public Slime2P() {
      this.particle_x = new int[this.NUM_PARTICLES];
      this.particle_y = new int[this.NUM_PARTICLES];
      this.particle_weight = new float[this.NUM_PARTICLES];
      this.floor = 280;
   }

   public void init() {
      String var1 = this.getDocumentBase().getHost();
      if(!var1.equals("footyslime.com")) {
         try {
            this.getAppletContext().showDocument(new URL("http://footyslime.com/"), "_self");
         } catch (Exception var6) {
            System.out.println("Couldn\'t initialise!");
            throw new RuntimeException("Couldn\'t initialise!");
         }
      }

      this.SKY_COL = new Color(85, 85, 255);
      this.COURT_COL = new Color(0, 168, 0);
      this.BALL_COL = Color.yellow;
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.fInPlay = this.fEndGame = false;
      this.promptMsg = "Click the mouse to play...";
      this.screen = this.getGraphics();
      this.baseFont = this.screen.getFont();
      this.screen.setFont(new Font(this.baseFont.getName(), 1, 15));
      this.replayData = new int[200][6];
      this.firstHalf = true;
      int var2 = this.nWidth / 10;
      int var3 = 2 * this.nHeight / 10;

      for(int var4 = 0; var4 < this.NUM_PARTICLES; ++var4) {
         this.particle_x[var4] = (int)(Math.random() * (double)this.nWidth);
         this.particle_y[var4] = (int)(-Math.random() * 50.0D);
         this.particle_weight[var4] = (float)(Math.random() * 0.95D + 0.05D);
      }

      this.slimeColText = new String[]{"Bronco Slime ", "Canterbury Bullslime ", "Cowboy Slime ", "Dragon McSlimer ", "Slimy Eel Slime ", "Knight Slimer ", "Panther Slime ", "Rabbitoh Slime ", "Raider of the Lost Slime ", "Rooster Slime ", "Womanly Slime ", "Shark Slime ", "Stormy Slime ", "Tiger Slime ", "Warrior Slime "};
      this.slimeColours = new Color[]{new Color(96, 10, 44), Color.white, Color.white, Color.white, Color.yellow, new Color(0, 48, 149), Color.black, new Color(140, 78, 0), new Color(167, 216, 11), new Color(23, 33, 86), new Color(106, 10, 35), new Color(0, 173, 227), new Color(117, 22, 158), new Color(25, 25, 25), new Color(48, 34, 37)};
      this.slimeColours2 = new Color[]{new Color(231, 155, 36), new Color(0, 34, 135), new Color(6, 40, 79), new Color(185, 0, 0), new Color(0, 30, 76), new Color(237, 37, 64), new Color(0, 133, 152), new Color(225, 8, 30), new Color(0, 35, 154), Color.red, Color.white, new Color(31, 28, 28), new Color(161, 161, 162), new Color(255, 135, 10), new Color(212, 211, 205)};
      this.field_rn_Slime2P_pw_1 = ".....".toCharArray();
      this.buffer = this.createImage(this.nWidth, this.nHeight);
      if(this.buffered) {
         this.buffered = false;

         for(int var5 = 0; var5 < this.bfr.length(); ++var5) {
            this.pwAddChar(this.bfr.toCharArray()[var5]);
         }
      }

   }

   public void paint(Graphics var1) {
      Graphics var2 = this.buffered?this.buffer.getGraphics():this.getGraphics();
      var2.setColor(this.SKY_COL);
      var2.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      var2.setColor(this.COURT_COL);
      var2.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      var2.setColor(Color.white);
      var2.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      this.drawScores();
      this.drawPrompt();
      if(!this.fInPlay) {
         FontMetrics var3 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         if(this.fP1PointsWon + this.fP2PointsWon > 0) {
            if(this.firstHalf) {
               this.screen.drawString("NRL Slime Volleyball!", this.nWidth / 2 - var3.stringWidth("NRL Slime Volleyball!") / 2, this.nHeight / 2 - var3.getHeight() * 5);
            }

            var2.setColor(Color.white);
            var3 = var2.getFontMetrics();
            if(!this.firstHalf) {
               var2.drawString("First half stats:", this.nWidth / 2 - var3.stringWidth("First half stats:") / 2, this.nHeight / 2 - var3.getHeight() * 4);
            } else {
               var2.drawString("Last game\'s stats:", this.nWidth / 2 - var3.stringWidth("Last game\'s stats:") / 2, this.nHeight / 2 - var3.getHeight() * 4);
            }

            String[] var4 = new String[]{"Possession", "Touches", "Points won", "Winners", "Aces", "Clangers", "Super Slimes", "Longest streak"};
            String[][] var5 = new String[][]{{"" + 100L * this.fP1Frames / (this.fP1Frames + this.fP2Frames) + "%", "" + this.fP1TouchesTot, "" + this.fP1PointsWon, "" + this.fP1Winners, "" + this.fP1Aces, "" + this.fP1Clangers, "" + this.fP1Super, "" + this.fP1Streak}, {"" + (100L - 100L * this.fP1Frames / (this.fP1Frames + this.fP2Frames)) + "%", "" + this.fP2TouchesTot, "" + this.fP2PointsWon, "" + this.fP2Winners, "" + this.fP2Aces, "" + this.fP2Clangers, "" + this.fP2Super, "" + this.fP2Streak}};
            int var6 = 0;

            for(int var7 = 0; var7 < var4.length; ++var7) {
               var6 = Math.max(var6, var3.stringWidth(var4[var7]));
            }

            for(int var8 = 0; var8 < var4.length; ++var8) {
               var2.drawString(var4[var8], this.nWidth / 2 - var3.stringWidth(var4[var8]) / 2, this.nHeight / 2 + var3.getHeight() * (var8 - 2));
               var2.drawString(var5[0][var8], this.nWidth / 2 - var6 - var3.stringWidth(var5[0][var8]) / 2, this.nHeight / 2 + var3.getHeight() * (var8 - 2));
               var2.drawString(var5[1][var8], this.nWidth / 2 + var6 - var3.stringWidth(var5[1][var8]) / 2, this.nHeight / 2 + var3.getHeight() * (var8 - 2));
            }

            this.drawPrompt(!this.firstHalf?"Swap sides and click the mouse to continue...":"Click the mouse to start another game!", 0);
         } else {
            this.screen.drawString("NRL Slime Volleyball!", this.nWidth / 2 - var3.stringWidth("NRL Slime Volleyball!") / 2, this.nHeight / 2 - var3.getHeight());
            var2.setColor(Color.white);
            var3 = var2.getFontMetrics();
            var2.drawString("Code base by Quin Pendragon", this.nWidth / 2 - var3.stringWidth("Code base by Quin Pendragon") / 2, this.nHeight / 2 + var3.getHeight() * 2);
            var2.drawString("Mod by Daniel Wedge", this.nWidth / 2 - var3.stringWidth("Mod by Daniel Wedge") / 2, this.nHeight / 2 + var3.getHeight() * 3);
            var2.drawString("Wind particles by Tim Lightfoot", this.nWidth / 2 - var3.stringWidth("Wind particles by Tim Lightfoot") / 2, this.nHeight / 2 + var3.getHeight() * 4);
         }
      }

      if(this.buffered) {
         var1.drawImage(this.buffer, 0, 0, this);
      }

   }

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            if(!this.fSelectedColours) {
               this.pwAddChar((char)var1.key);
            }

            switch(var1.key) {
            case 32:
               this.mousePressed = true;
               break;
            case 65:
            case 97:
               if(!this.backwards) {
                  this.moveP1Left();
               } else {
                  this.moveP1Right();
               }
               break;
            case 68:
            case 100:
               if(!this.backwards) {
                  this.moveP1Right();
               } else {
                  this.moveP1Left();
               }
               break;
            case 73:
            case 105:
               this.moveP2Jump();
               break;
            case 74:
            case 106:
               if(!this.backwards) {
                  this.moveP2Left();
               } else {
                  this.moveP2Right();
               }
               break;
            case 75:
            case 107:
               if(!this.fSelectedColours) {
                  this.changeP2Col();
               }
               break;
            case 76:
            case 108:
               if(!this.backwards) {
                  this.moveP2Right();
               } else {
                  this.moveP2Left();
               }
               break;
            case 83:
            case 115:
               if(!this.fSelectedColours) {
                  this.changeP1Col();
               }
               break;
            case 87:
            case 119:
               this.moveP1Jump();
            }
         }
         break;
      case 402:
      case 404:
         switch(var1.key) {
         case 65:
         case 97:
            if(this.p1XV * (this.backwards?-1:1) < 0) {
               this.moveP1Stop();
            }

            return false;
         case 68:
         case 100:
            if(this.p1XV * (this.backwards?-1:1) > 0) {
               this.moveP1Stop();
            }

            return false;
         case 74:
         case 106:
            if(this.p2XV * (this.backwards?-1:1) < 0) {
               this.moveP2Stop();
            }

            return false;
         case 76:
         case 108:
            if(this.p2XV * (this.backwards?-1:1) > 0) {
               this.moveP2Stop();
            }

            return false;
         default:
            return false;
         }
      case 501:
         this.mousePressed = true;
         if(!this.fInPlay) {
            this.fEndGame = false;
            this.fInPlay = true;
            this.p1X = 200;
            this.p1Y = 0;
            this.p2X = 800;
            this.p2Y = 0;
            this.p1XV = 0;
            this.p1YV = 0;
            this.p2XV = 0;
            this.p2YV = 0;
            this.ballX = 200;
            this.ballY = 400;
            this.ballVX = 0;
            this.ballVY = 0;
            this.hitNetSinceTouched = false;
            this.promptMsg = "";
            this.repaint();
            this.gameThread = new Thread(this);
            this.gameThread.start();
         } else if(!this.fSelectedColours) {
            this.fInPlay = true;
            this.replayStart = 0;
            this.replayPos = 0;
            this.p1X = 200;
            this.p1Y = 0;
            this.p2X = 800;
            this.p2Y = 0;
            this.p1XV = 0;
            this.p1YV = 0;
            this.p2XV = 0;
            this.p2YV = 0;
            this.ballX = 200;
            this.ballY = 400;
            this.ballVX = 0;
            this.ballVY = 0;
            this.hitNetSinceTouched = false;
            this.promptMsg = "";
            this.fP1Touched = false;
            this.fP2Touched = false;
            this.fServerMoved = false;
            this.drawPrompt();
            this.DrawStatus();
            this.repaint();
            this.startTime = System.currentTimeMillis();
            this.realStartTime = this.startTime;
            this.fSelectedColours = true;
         }
         break;
      case 503:
         this.showStatus("NRL Slime Volleyball: http://footyslime.com/nrl/");
      }

      return false;
   }

   private void pwAddChar(char var1) {
      for(int var2 = 0; var2 < 4; this.field_rn_Slime2P_pw_1[var2++] = this.field_rn_Slime2P_pw_1[var2]) {
         ;
      }

      this.field_rn_Slime2P_pw_1[4] = var1;
      String var3 = (new String(this.field_rn_Slime2P_pw_1)).toLowerCase();
      boolean var4 = false;
      if(var3.equals(this.nyt)) {
         var4 = true;
         this.nightTime = !this.nightTime;
         this.SKY_COL = this.nightTime?new Color(0, 0, 70):new Color(85, 85, 255);
         this.COURT_COL = this.nightTime?new Color(0, 100, 0):new Color(0, 168, 0);
         this.BALL_COL = this.nightTime?Color.white:Color.yellow;
         this.repaint();
         this.promptMsg = this.nightTime?"... and the lights come on at Slime Stadium!":"The Slime Sun has risen!";
      } else if(var3.equals(this.psy)) {
         var4 = true;
         this.psycho = !this.psycho;
         this.promptMsg = this.psycho?"Can\'t get to the ball fast enough?":"Can\'t handle the pace?";
      } else if(var3.equals(this.bck)) {
         var4 = true;
         this.backwards = !this.backwards;
         this.promptMsg = this.backwards?"Slime God Clive blesses you!":"Don\'t like challenges, huh?";
      } else if(var3.equals(this.tim)) {
         var4 = true;
         this.timer = !this.timer;
         this.promptMsg = this.timer?"Don\'t like the uncertainty of time on? Pathetic.":"Welcome back from the other side.";
      } else if(var3.equals(this.wnd)) {
         var4 = true;
         this.windOn = !this.windOn;
         this.promptMsg = !this.windOn?"Can\'t handle the challenge?":"Yeah, wind is good.";
         if(!this.windOn) {
            this.unDrawParticles();
         }
      } else if(var3.equals(this.bfr)) {
         var4 = true;
         this.buffered = !this.buffered;
         this.screen = this.buffered?this.buffer.getGraphics():this.getGraphics();
         this.screen.setFont(new Font(this.baseFont.getName(), 1, 15));
         if(this.fInPlay) {
            this.promptMsg = this.buffered?"Double buffering is on.":"Do not adjust your set... the Slimes are flickery.";
         }
      } else if(var3.equals(this.hl2)) {
         var4 = true;
         this.GAME_LENGTH = 120000L;
         this.promptMsg = "Halves now two minutes long.";
      } else if(var3.equals(this.hl3)) {
         var4 = true;
         this.GAME_LENGTH = 180000L;
         this.promptMsg = "Halves now three minutes long.";
      } else if(var3.equals(this.hl4)) {
         var4 = true;
         this.GAME_LENGTH = 240000L;
         this.promptMsg = "Halves now four minutes long.";
      } else if(var3.equals(this.hl5)) {
         var4 = true;
         this.GAME_LENGTH = 300000L;
         this.promptMsg = "Halves now five minutes long.";
      }

      if(var4) {
         this.fServerMoved = true;
         this.drawPrompt();
      }

   }

   public void moveP1Left() {
      this.p1XV = this.scoringRun > -6 && !this.psycho?-8:-16;
      if(this.p1X == 200 && this.ballX == 200 && !this.fP2Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   public void moveP1Right() {
      this.p1XV = this.scoringRun > -6 && !this.psycho?8:16;
      if(this.p1X == 200 && this.ballX == 200 && !this.fP2Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   public void moveP1Stop() {
      this.p1XV = 0;
   }

   public void moveP1Jump() {
      if(this.p1Y == 0) {
         this.p1YV = this.scoringRun > -6 && !this.psycho?31:45;
      }

   }

   public void changeP1Col() {
      do {
         this.p1Col = (this.p1Col + 1) % this.slimeColText.length;
      } while(this.p1Col == this.p2Col);

   }

   public void moveP2Left() {
      this.p2XV = this.scoringRun < 6 && !this.psycho?-8:-16;
      if(this.p2X == 800 && this.ballX == 800 && !this.fP1Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   public void moveP2Right() {
      this.p2XV = this.scoringRun < 6 && !this.psycho?8:16;
      if(this.p2X == 800 && this.ballX == 800 && !this.fP1Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   public void moveP2Stop() {
      this.p2XV = 0;
   }

   public void moveP2Jump() {
      if(this.p2Y == 0) {
         this.p2YV = this.scoringRun < 6 && !this.psycho?31:45;
      }

   }

   private void changeP2Col() {
      do {
         this.p2Col = (this.p2Col + 1) % this.slimeColText.length;
      } while(this.p2Col == this.p1Col);

   }

   private void MoveSlimers() {
      this.p1X += this.p1XV;
      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > 445) {
         this.p1X = 445;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= this.scoringRun > -6 && !this.psycho?2:4;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         }
      }

      this.p2X += this.p2XV;
      if(this.p2X > 950) {
         this.p2X = 950;
      }

      if(this.p2X < 555) {
         this.p2X = 555;
      }

      if(this.p2YV != 0) {
         this.p2Y += this.p2YV -= this.scoringRun < 6 && !this.psycho?2:4;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

   }

   private void DrawSlimers() {
      int var1 = this.nWidth / 10;
      int var2 = this.nHeight / 10;
      int var3 = this.nWidth / 50;
      int var4 = this.nHeight / 25;
      int var5 = this.ballX * this.nWidth / 1000;
      int var6 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int var7 = this.p1OldX * this.nWidth / 1000 - var1 / 2;
      int var8 = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(this.SKY_COL);
      this.screen.fillRect(var7, var8, var1, var2);
      var7 = this.p2OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(this.SKY_COL);
      this.screen.fillRect(var7, var8, var1, var2);
      this.MoveBall();
      var7 = this.p1X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.fP1Fire = this.scoringRun <= -6 || this.psycho;
      this.fP2Fire = this.scoringRun >= 6 || this.psycho;
      if(this.fP1Fire || this.fP2Fire || this.psycho) {
         this.superFlash = !this.superFlash;
      }

      this.DrawStrip(this.screen, var7, var8, var1, var2, this.p1Col);
      int var9 = this.p1X + 38;
      int var10 = this.p1Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      int var11 = var7 - var5;
      int var12 = var8 - var6;
      int var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      this.screen.setColor(Color.white);
      this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
      if(var13 > 0) {
         this.screen.setColor(Color.black);
         this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
      }

      var7 = this.p2X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.DrawStrip(this.screen, var7, var8, var1, var2, this.p2Col);
      var9 = this.p2X - 18;
      var10 = this.p2Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      var11 = var7 - var5;
      var12 = var8 - var6;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      this.screen.setColor(Color.white);
      this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
      if(var13 > 0) {
         this.screen.setColor(Color.black);
         this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
      }

      if(Math.abs(this.scoringRun) < 6 && !this.psycho) {
         this.superFlash = false;
      }

   }

   private void DrawStrip(Graphics var1, int var2, int var3, int var4, int var5, int var6) {
      boolean var7 = false;
      if(var6 == this.p1Col && (this.fP1Fire || this.psycho) || var6 == this.p2Col && (this.fP2Fire || this.psycho)) {
         var7 = this.superFlash;
      }

      var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
      var1.fillArc(var2, var3, var4, 2 * var5, 0, 180);
      var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
      switch(var6) {
      case 0:
      case 2:
      case 4:
      case 5:
      case 6:
      case 8:
      case 11:
      case 13:
         var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
         var1.fillArc(var2, var3, var4, 2 * var5, 0, 180);
         var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
         var1.fillPolygon(new Polygon(new int[]{var2 + var4 / 5, var2 + 4 * var4 / 5, var2 + 4 * var4 / 5, var2 + var4 / 5}, new int[]{(int)(0.2D * (double)var5 + (double)var3), (int)(0.2D * (double)var5 + (double)var3), var3 + var5, var3 + var5}, 4));
         var1.fillArc(var2, var3, var4, 2 * var5, 53, 74);
         if(var6 == 2) {
            var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
            var1.fillArc(var2, var3, var4, 2 * var5, 0, 19);
            var1.fillArc(var2, var3, var4, 2 * var5, 161, 19);
            var1.fillRect((int)(0.029D * (double)var4 + (double)var2), var3 + 2 * var5 / 3, (int)(0.942D * (double)var4), var5 / 3);
         }
         break;
      case 1:
      case 3:
      case 9:
      case 12:
      case 14:
         var1.fillArc(var2, var3, var4, 2 * var5, 40, 100);
         if(var6 == 9) {
            var1.setColor(Color.white);
         } else if(var6 == 12) {
            var1.setColor(new Color(0, 28, 87));
         } else {
            var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
         }

         var1.fillArc(var2, var3, var4, 2 * var5, 70, 40);
         break;
      case 7:
         var1.fillArc(var2, var3, var4, 2 * var5, 19, 23);
         var1.fillArc(var2, var3, var4, 2 * var5, 138, 23);
         var1.fillRect((int)(0.128D * (double)var4 + (double)var2), var3 + var5 / 3, (int)(0.744D * (double)var4), 2 * var5 / 3);
         var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
         var1.fillArc(var2, var3, var4, 2 * var5, 0, 19);
         var1.fillArc(var2, var3, var4, 2 * var5, 161, 19);
         var1.fillRect((int)(0.029D * (double)var4 + (double)var2), var3 + 2 * var5 / 3, (int)(0.942D * (double)var4), var5 / 3);
         break;
      case 10:
         var1.setColor(Color.white);
         var1.drawLine((int)(0.128D * (double)var4 + (double)var2), var3 + var5 / 3, (int)(0.872D * (double)var4 + (double)var2), var3 + var5 / 3);
         var1.drawLine((int)(0.029D * (double)var4 + (double)var2), var3 + 2 * var5 / 3, (int)(0.971D * (double)var4 + (double)var2), var3 + 2 * var5 / 3);
      }

   }

   private void doWind() {
      if(this.windOn && Math.random() >= 0.9D) {
         this.wind += (int)(2.0D - 4.0D * Math.random());
         if(this.wind > 30) {
            this.wind = 30;
         } else if(this.wind < -30) {
            this.wind = -30;
         }

      }
   }

   private void MoveBall() {
      int var1 = 30 * this.nHeight / 1000;
      int var2 = this.ballOldX * this.nWidth / 1000;
      int var3 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(this.SKY_COL);
      this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(this.windOn && this.fServerMoved) {
         this.ballX *= 10;
         this.ballX += this.wind;
         this.ballX /= 10;
      }

      if(!this.fEndGame) {
         int var4 = (this.ballX - this.p1X) * 2;
         int var5 = this.ballY - this.p1Y;
         int var6 = var4 * var4 + var5 * var5;
         int var7 = this.ballVX - this.p1XV;
         int var8 = this.ballVY - this.p1YV;
         int var9;
         int var10;
         if(var5 > 0 && var6 < 15625 && var6 > 25) {
            var9 = (int)Math.sqrt((double)var6);
            var10 = (var4 * var7 + var5 * var8) / var9;
            this.ballX = this.p1X + var4 * 63 / var9;
            this.ballY = this.p1Y + var5 * 125 / var9;
            if(var10 <= 0) {
               this.ballVX += this.p1XV - 2 * var4 * var10 / var9;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p1YV - 2 * var5 * var10 / var9;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            if(this.fServerMoved) {
               this.fP1Touched = true;
               ++this.fP1Touches;
               ++this.fP1TouchesTot;
               this.fP2Touches = 0;
               this.fP1HitStill = this.p1YV == 0 && this.p1XV == 0;
               this.hitNetSinceTouched = false;
            }
         }

         var4 = (this.ballX - this.p2X) * 2;
         var5 = this.ballY - this.p2Y;
         var6 = var4 * var4 + var5 * var5;
         var7 = this.ballVX - this.p2XV;
         var8 = this.ballVY - this.p2YV;
         if(var5 > 0 && var6 < 15625 && var6 > 25) {
            var9 = (int)Math.sqrt((double)var6);
            var10 = (var4 * var7 + var5 * var8) / var9;
            this.ballX = this.p2X + var4 * 63 / var9;
            this.ballY = this.p2Y + var5 * 125 / var9;
            if(var10 <= 0) {
               this.ballVX += this.p2XV - 2 * var4 * var10 / var9;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p2YV - 2 * var5 * var10 / var9;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            if(this.fServerMoved) {
               this.fP2Touched = true;
               this.fP1Touches = 0;
               ++this.fP2Touches;
               ++this.fP2TouchesTot;
               this.fP2HitStill = this.p2YV == 0 && this.p2XV == 0;
               this.hitNetSinceTouched = false;
            }
         }

         if(this.ballX < 15) {
            this.ballX = 15;
            this.ballVX = -this.ballVX;
         }

         if(this.ballX > 985) {
            this.ballX = 985;
            this.ballVX = -this.ballVX;
         }

         if(this.ballX > 480 && this.ballX < 520 && this.ballY < 140) {
            if(this.ballVY < 0 && this.ballY > 130) {
               this.ballVY *= -1;
               this.ballY = 130;
            } else if(this.ballX < 500) {
               this.ballX = 480;
               this.ballVX = this.ballVX >= 0?-this.ballVX:this.ballVX;
               this.hitNetSinceTouched = true;
            } else {
               this.ballX = 520;
               this.ballVX = this.ballVX <= 0?-this.ballVX:this.ballVX;
               this.hitNetSinceTouched = true;
            }
         }
      }

      var2 = this.ballX * this.nWidth / 1000;
      var3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(this.BALL_COL);
      this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
   }

   private void drawScores() {
      Graphics var1 = this.screen;
      FontMetrics var2 = var1.getFontMetrics();
      int var3 = this.nHeight / 25;
      int var4 = this.nHeight / 15;
      var1.setColor(this.SKY_COL);
      var1.fillRect(0, 0, this.nWidth, var4 + 22);
      int var5 = 20;

      for(int var6 = 0; var6 < this.fP1PointsWon / 10; ++var6) {
         var1.setColor(this.slimeColours[this.p1Col]);
         var1.fillOval(var5, 30 - var4 / 2, var4, var4);
         var1.setColor(this.slimeColours2[this.p1Col]);
         var1.drawOval(var5, 30 - var4 / 2, var4, var4);
         var5 += var4 / 2;
      }

      if(this.fP1PointsWon >= 20) {
         var1.drawString("" + this.fP1PointsWon / 10, var5 - var2.stringWidth("" + this.fP1PointsWon / 10) / 2, 30 + var2.getAscent() / 2);
      }

      if(this.fP1PointsWon > 10) {
         var5 += var4 / 2 + 10;
      }

      for(int var7 = 0; var7 < this.fP1PointsWon % 10; ++var7) {
         var1.setColor(this.slimeColours[this.p1Col]);
         var1.fillOval(var5, 30 - var3 / 2, var3, var3);
         var1.setColor(this.slimeColours2[this.p1Col]);
         var1.drawOval(var5, 30 - var3 / 2, var3, var3);
         var5 += var3 + 5;
      }

      var5 = this.nWidth - 20 - this.fP2PointsWon / 10 * var4 / 2 - (this.fP2PointsWon % 10 == 0?var4 / 2 + 10:0) - this.fP2PointsWon % 10 * var3 - (this.fP2PointsWon % 10 > 0?this.fP2PointsWon % 10 - 1:0) * 5;
      if(this.fP2PointsWon > 10 && this.fP2PointsWon % 10 != 0) {
         var5 -= var4 / 2 + 10;
      }

      for(int var8 = 0; var8 < this.fP2PointsWon / 10; ++var8) {
         var1.setColor(this.slimeColours[this.p2Col]);
         var1.fillOval(var5, 30 - var4 / 2, var4, var4);
         var1.setColor(this.slimeColours2[this.p2Col]);
         var1.drawOval(var5, 30 - var4 / 2, var4, var4);
         var5 += var4 / 2;
      }

      if(this.fP2PointsWon >= 20) {
         var1.drawString("" + this.fP2PointsWon / 10, var5 - var2.stringWidth("" + this.fP2PointsWon / 10) / 2, 30 + var2.getAscent() / 2);
      }

      if(this.fP2PointsWon > 10) {
         var5 += var4 / 2 + 10;
      }

      for(int var9 = 0; var9 < this.fP2PointsWon % 10; ++var9) {
         var1.setColor(this.slimeColours[this.p2Col]);
         var1.fillOval(var5, 30 - var3 / 2, var3, var3);
         var1.setColor(this.slimeColours2[this.p2Col]);
         var1.drawOval(var5, 30 - var3 / 2, var3, var3);
         var5 += var3 + 5;
      }

   }

   private String MakeTime(long var1) {
      String var3 = "";
      var1 = (long)(2400000.0D * (double)var1 / (double)this.GAME_LENGTH);
      long var4 = var1 / 10L % 100L;
      long var6 = var1 / 1000L % 60L;
      long var8 = var1 / 60000L % 60L;
      long var10 = var1 / 3600000L;
      var3 = var3 + var8 + ":";
      if(var6 < 10L) {
         var3 = var3 + "0";
      }

      var3 = var3 + var6;
      return var3;
   }

   private void DrawStatus() {
      Graphics var1 = this.screen;
      FontMetrics var2 = var1.getFontMetrics();
      String var3;
      if(this.fSelectedColours) {
         var3 = (this.firstHalf?"1st":"2nd") + " half: " + this.MakeTime(this.timer?this.GAME_LENGTH - this.gameTime:System.currentTimeMillis() - this.realStartTime);
      } else {
         var3 = this.slimeColText[this.p1Col] + "v " + this.slimeColText[this.p2Col];
      }

      if(this.gameTime > this.GAME_LENGTH) {
         var3 = (this.firstHalf?"1st":"2nd") + " half: Final point!";
      }

      int var4 = var2.getHeight() * 3;
      int var5 = var2.stringWidth(var3);
      int var6 = this.nWidth / 2 - var5 / 2 - 10;
      var1.setColor(this.SKY_COL);
      if(this.fSelectedColours) {
         var1.fillRect(var6, 0, var5 + 20, var4 + 22);
      } else {
         var1.fillRect(0, 0, this.nWidth, var4 + 22);
      }

      var1.setColor(Color.white);
      var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, var2.getHeight() * 2);
      if(this.windOn) {
         if(this.wind < 0) {
            var3 = "<< " + -this.wind + " km/h";
         } else if(this.wind > 0) {
            var3 = this.wind + " km/h >>";
         } else {
            var3 = "no wind";
         }

         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, var2.getHeight() * 3);
      }

      if(!this.fSelectedColours) {
         var1.setColor(Color.red);
         var3 = "WARM UP ONLY";
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, var2.getHeight() * 4);
      }

   }

   public void drawPrompt() {
      this.screen.setColor(this.COURT_COL);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      this.drawPrompt(this.promptMsg, 0);
   }

   public void drawPrompt(String var1, int var2) {
      FontMetrics var3 = this.screen.getFontMetrics();
      this.screen.setColor(Color.white);
      this.screen.drawString(var1, (this.nWidth - var3.stringWidth(var1)) / 2, this.nHeight * 4 / 5 + var3.getHeight() * (var2 + 1) + 10);
   }

   private void SaveReplayData() {
      this.replayData[this.replayPos][0] = this.p1X;
      this.replayData[this.replayPos][1] = this.p1Y;
      this.replayData[this.replayPos][2] = this.p2X;
      this.replayData[this.replayPos][3] = this.p2Y;
      this.replayData[this.replayPos][4] = this.ballX;
      this.replayData[this.replayPos][5] = this.ballY;
      ++this.replayPos;
      if(this.replayPos >= 200) {
         this.replayPos = 0;
      }

      if(this.replayStart == this.replayPos) {
         ++this.replayStart;
      }

      if(this.replayStart >= 200) {
         this.replayStart = 0;
      }

   }

   private void ReplayFrame(int var1) {
      int var2 = var1 != 0?var1 - 1:199;
      this.p1OldX = this.replayData[var2][0];
      this.p1OldY = this.replayData[var2][1];
      this.p2OldX = this.replayData[var2][2];
      this.p2OldY = this.replayData[var2][3];
      this.ballOldX = this.replayData[var2][4];
      this.ballOldY = this.replayData[var2][5];
      this.p1X = this.replayData[var1][0];
      this.p1Y = this.replayData[var1][1];
      this.p2X = this.replayData[var1][2];
      this.p2Y = this.replayData[var1][3];
      this.ballX = this.replayData[var1][4];
      this.ballY = this.replayData[var1][5];
      this.ballVX = 0;
      this.ballVY = 1;
      this.DrawSlimers();
      if(this.buffered) {
         this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
      }

   }

   public void run() {
      this.replayPos = this.replayStart = 0;
      if(this.firstHalf) {
         this.fSelectedColours = false;
         this.p1Col = 0;
         this.p2Col = 1;
         this.promptMsg = "Select a slime and click the mouse when warmed up.";
         this.drawPrompt();
         this.superFlash = false;
         this.scoringRun = 0;
         this.fP1Touches = 0;
         this.fP2Touches = 0;
         this.fP1TouchesTot = 0;
         this.fP2TouchesTot = 0;
         this.fP1Clangers = 0;
         this.fP2Clangers = 0;
         this.fP1Aces = 0;
         this.fP2Aces = 0;
         this.fP1Winners = 0;
         this.fP2Winners = 0;
         this.fP1PointsWon = 0;
         this.fP2PointsWon = 0;
         this.fP1Frames = 0L;
         this.fP2Frames = 0L;
         this.fP1Super = 0;
         this.fP2Super = 0;
         this.fP1Streak = 0;
         this.fP2Streak = 0;
         this.wind = (int)(30.0D - 60.0D * Math.random());
      } else {
         this.ballX = 200;
         this.scoringRun = 0;
         this.superFlash = false;
         int var1 = this.p1Col;
         this.p1Col = this.p2Col;
         this.p2Col = var1;
         var1 = this.fP1Touches;
         this.fP1Touches = this.fP2Touches;
         this.fP2Touches = var1;
         var1 = this.fP1TouchesTot;
         this.fP1TouchesTot = this.fP2TouchesTot;
         this.fP2TouchesTot = var1;
         var1 = this.fP1Clangers;
         this.fP1Clangers = this.fP2Clangers;
         this.fP2Clangers = var1;
         var1 = this.fP1Aces;
         this.fP1Aces = this.fP2Aces;
         this.fP2Aces = var1;
         var1 = this.fP1Winners;
         this.fP1Winners = this.fP2Winners;
         this.fP2Winners = var1;
         var1 = this.fP1PointsWon;
         this.fP1PointsWon = this.fP2PointsWon;
         this.fP2PointsWon = var1;
         long var2 = this.fP1Frames;
         this.fP1Frames = this.fP2Frames;
         this.fP2Frames = var2;
         var1 = this.fP1Super;
         this.fP1Super = this.fP2Super;
         this.fP2Super = var1;
         var1 = this.fP1Streak;
         this.fP1Streak = this.fP2Streak;
         this.fP2Streak = var1;
         this.repaint();
      }

      this.fP1HitStill = false;
      this.fP2HitStill = false;
      this.fServerMoved = false;
      this.crossedNetTime = 0L;
      this.drawScores();
      this.fP1Touched = this.fP2Touched = false;
      this.hitNetSinceTouched = false;
      boolean var9 = false;
      boolean var8 = false;
      boolean var3 = false;
      this.startTime = System.currentTimeMillis();
      this.realStartTime = this.startTime;

      while(this.gameThread != null) {
         if(!this.fSelectedColours) {
            this.startTime = System.currentTimeMillis() - this.gameTime;
            this.realStartTime = this.startTime;
         } else {
            this.gameTime = System.currentTimeMillis() - this.startTime;
         }

         this.SaveReplayData();
         if(!this.fServerMoved) {
            this.crossedNetTime = System.currentTimeMillis();
         } else if(this.crossedNetTime < 0L && this.ballX > 500 - 3 * this.nHeight / 50 || this.crossedNetTime > 0L && this.ballX < 500 + 3 * this.nHeight / 50) {
            this.crossedNetTime = this.ballX <= 500?-System.currentTimeMillis():System.currentTimeMillis();
            this.drawPrompt();
         }

         this.p1OldX = this.p1X;
         this.p1OldY = this.p1Y;
         this.p2OldX = this.p2X;
         this.p2OldY = this.p2Y;
         this.ballOldX = this.ballX;
         this.ballOldY = this.ballY;
         this.DrawStatus();
         if(this.windOn) {
            this.doWind();
            this.unDrawParticles();
            this.updateParticles();
            this.drawParticles();
            this.screen.setColor(Color.white);
            this.screen.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
         }

         this.MoveSlimers();
         this.DrawSlimers();
         if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
         }

         if(this.fServerMoved && this.fSelectedColours) {
            if(this.ballX < 500 - 3 * this.nHeight / 50) {
               ++this.fP1Frames;
            } else if(this.ballX > 500 + 3 * this.nHeight / 50) {
               ++this.fP2Frames;
            }
         }

         if(!this.fSelectedColours && this.ballY < 35) {
            this.sleep(1000L, false);
            this.p1X = 200;
            this.p1Y = 0;
            this.p2X = 800;
            this.p2Y = 0;
            this.p1XV = 0;
            this.p1YV = 0;
            this.p2XV = 0;
            this.p2YV = 0;
            this.ballX = this.ballX >= 500?200:800;
            this.ballY = 400;
            this.ballVX = 0;
            this.ballVY = 0;
            this.fServerMoved = false;
            this.fP1Touched = this.fP2Touched = false;
            this.repaint();
         } else {
            long var4;
            if(this.fSelectedColours && this.holdingOn && Math.abs(this.crossedNetTime) + 5000L < System.currentTimeMillis() && this.ballY >= 35) {
               var4 = System.currentTimeMillis();
               this.promptMsg = "BALL... YES!";
               this.drawPrompt();
               this.promptMsg = "";
               this.drawPrompt("Holding the ball against " + (this.ballX <= 500?this.slimeColText[this.p1Col]:this.slimeColText[this.p2Col]) + "!!", 1);
               this.drawPrompt("Press space for replay...", 2);
               if(this.buffered) {
                  this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
               }

               this.mousePressed = false;
               if(this.ballX > 500) {
                  ++this.fP1PointsWon;
                  ++this.fP2Clangers;
               } else {
                  ++this.fP2PointsWon;
                  ++this.fP1Clangers;
               }

               this.oldScoringRun = this.scoringRun;
               if(this.ballX <= 500 && this.scoringRun >= 0) {
                  ++this.scoringRun;
                  if(this.scoringRun > this.fP2Streak) {
                     this.fP2Streak = this.scoringRun;
                  }
               } else if(this.ballX > 500 && this.scoringRun <= 0) {
                  --this.scoringRun;
                  if(-this.scoringRun > this.fP1Streak) {
                     this.fP1Streak = -this.scoringRun;
                  }
               } else if(this.ballX <= 500 && this.scoringRun <= 0) {
                  this.scoringRun = 1;
                  if(this.scoringRun > this.fP2Streak) {
                     this.fP2Streak = this.scoringRun;
                  }
               } else if(this.ballX > 500 && this.scoringRun >= 0) {
                  this.scoringRun = -1;
                  if(-this.scoringRun > this.fP1Streak) {
                     this.fP1Streak = -this.scoringRun;
                  }
               }

               this.drawScores();
               this.DrawStatus();
               this.sleep(1000L, true);
               if(this.mousePressed) {
                  this.SaveReplayData();
                  this.DoReplay();
               }

               this.promptMsg = "";
               this.drawPrompt();
               this.p1X = 200;
               this.p1Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p1XV = 0;
               this.p1YV = 0;
               this.p2XV = 0;
               this.p2YV = 0;
               this.ballX = this.ballX >= 500?200:800;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
               this.replayStart = this.replayPos = 0;
               this.fP1Touched = this.fP2Touched = false;
               this.fServerMoved = false;
               if(this.GAME_LENGTH <= this.gameTime) {
                  this.endHalf();
               }

               this.repaint();
            } else if(this.fSelectedColours && this.holdingOn && Math.abs(this.crossedNetTime) + 5000L - 1000L < System.currentTimeMillis() && this.ballY >= 35) {
               this.promptMsg = "BALL...";
               if(this.buffered) {
                  this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
               }

               this.drawPrompt();
               this.promptMsg = "";
            } else if(this.ballY < 35) {
               var4 = System.currentTimeMillis();
               if(this.ballX > 500) {
                  ++this.fP1PointsWon;
               } else {
                  ++this.fP2PointsWon;
               }

               this.oldScoringRun = this.scoringRun;
               if(this.ballX <= 500 && this.scoringRun >= 0) {
                  ++this.scoringRun;
                  if(this.scoringRun > this.fP2Streak) {
                     this.fP2Streak = this.scoringRun;
                  }
               } else if(this.ballX > 500 && this.scoringRun <= 0) {
                  --this.scoringRun;
                  if(-this.scoringRun > this.fP1Streak) {
                     this.fP1Streak = -this.scoringRun;
                  }
               } else if(this.ballX <= 500 && this.scoringRun <= 0) {
                  this.scoringRun = 1;
                  if(this.scoringRun > this.fP2Streak) {
                     this.fP2Streak = this.scoringRun;
                  }
               } else if(this.ballX > 500 && this.scoringRun >= 0) {
                  this.scoringRun = -1;
                  if(-this.scoringRun > this.fP1Streak) {
                     this.fP1Streak = -this.scoringRun;
                  }
               }

               if(this.ballX > 500 || this.fP1Touches < 3 && (!this.hitNetSinceTouched || this.fP1Touches <= 0) && this.fP2Touched && (!this.fP1HitStill || this.fP1Touches <= 0)) {
                  if(this.ballX > 500 && (this.fP2Touches >= 3 || this.hitNetSinceTouched && this.fP2Touches > 0 || !this.fP1Touched || this.fP2HitStill && this.fP2Touches > 0)) {
                     ++this.fP2Clangers;
                     var9 = true;
                  }
               } else {
                  ++this.fP1Clangers;
                  var9 = true;
               }

               if(this.fP1Touched && !this.fP2Touched && this.ballX >= 500) {
                  ++this.fP1Aces;
                  var8 = true;
               } else if(this.fP2Touched && !this.fP1Touched && this.ballX < 500) {
                  ++this.fP2Aces;
                  var8 = true;
               } else if(this.ballX > 500 && this.fP1Touches > 0) {
                  ++this.fP1Winners;
                  var3 = true;
               } else if(this.ballX <= 500 && this.fP2Touches > 0) {
                  ++this.fP2Winners;
                  var3 = true;
               }

               if(Math.abs(this.scoringRun) > 6) {
                  this.promptMsg = "Super " + (this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col]);
               } else {
                  this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
               }

               if(!this.fP1Touched && !this.fP2Touched) {
                  this.promptMsg = "What can I say?";
               } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 5) {
                  this.promptMsg = this.promptMsg + "is heating up!";
               } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 6) {
                  this.promptMsg = this.promptMsg + "is on fire!";
                  if(this.scoringRun < 0) {
                     ++this.fP1Super;
                  } else {
                     ++this.fP2Super;
                  }
               } else if((this.ballX <= 500 || !this.fP1Touched || this.fP2Touched) && (this.ballX > 500 || this.fP1Touched || !this.fP2Touched)) {
                  if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                     this.promptMsg = (this.ballX < 500?this.slimeColText[this.p1Col]:this.slimeColText[this.p2Col]) + "can\'t serve!";
                  } else if(this.fP1PointsWon == this.fP2PointsWon) {
                     this.promptMsg = this.promptMsg + "draws level!";
                  } else if((this.ballX <= 500 || this.fP1PointsWon != this.fP2PointsWon + 1) && (this.ballX > 500 || this.fP1PointsWon + 1 != this.fP2PointsWon)) {
                     this.promptMsg = this.promptMsg + "scores!";
                  } else {
                     this.promptMsg = this.promptMsg + "takes the lead!";
                  }
               } else {
                  this.promptMsg = this.promptMsg + "aces the serve!";
               }

               int var6 = this.ballX;
               this.drawPrompt();
               if((-this.scoringRun >= this.fP1Streak || this.scoringRun >= this.fP2Streak) && Math.abs(this.scoringRun) >= 3) {
                  this.drawPrompt("" + this.fP1Streak + " << Longest streak >> " + this.fP2Streak, 2);
               } else if(var9) {
                  this.drawPrompt("" + this.fP1Clangers + " << Clangers >> " + this.fP2Clangers, 2);
               } else if(var8) {
                  this.drawPrompt("" + this.fP1Aces + " << Aces >> " + this.fP2Aces, 2);
               } else if(var3) {
                  this.drawPrompt("" + this.fP1Winners + " << Winners >> " + this.fP2Winners, 2);
               } else {
                  this.drawPrompt("" + this.fP1PointsWon + " << Points won >> " + this.fP2PointsWon, 2);
               }

               var9 = false;
               var8 = false;
               var3 = false;
               this.drawPrompt("Press space for replay...", 1);
               this.mousePressed = false;
               this.drawScores();
               this.DrawStatus();
               if(this.buffered) {
                  this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
               }

               this.sleep(1000L, true);
               if(this.mousePressed) {
                  this.SaveReplayData();
                  this.DoReplay();
               }

               this.promptMsg = "";
               this.drawPrompt();
               this.p1X = 200;
               this.p1Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p1XV = 0;
               this.p1YV = 0;
               this.p2XV = 0;
               this.p2YV = 0;
               this.ballX = var6 >= 500?200:800;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
               this.replayStart = this.replayPos = 0;
               this.fP1Touched = this.fP2Touched = false;
               this.fServerMoved = false;
               if(this.GAME_LENGTH <= this.gameTime) {
                  this.endHalf();
               }

               this.repaint();
            }
         }

         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var7) {
               ;
            }
         }
      }

      this.fEndGame = true;
      this.fInPlay = false;
      this.promptMsg = "";
      this.repaint();
   }

   private void endHalf() {
      if(this.firstHalf) {
         this.gameTime = 0L;
         this.firstHalf = false;
         this.promptMsg = "It\'s half time.";
         this.drawPrompt();
         if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
         }

         this.promptMsg = "";
      } else {
         this.promptMsg = "";
         this.drawPrompt();
         this.drawPrompt("... and that\'s the game.", 0);
         if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
         }

         this.promptMsg = "";
         this.sleep(1000L, false);
         if(this.fP1PointsWon > this.fP2PointsWon) {
            this.drawPrompt(this.slimeColText[this.p1Col] + "Wins!", 1);
         } else if(this.fP2PointsWon > this.fP1PointsWon) {
            this.drawPrompt(this.slimeColText[this.p2Col] + "Wins!", 1);
         } else {
            this.drawPrompt("It\'s a draw!", 1);
         }

         if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
         }

         this.gameTime = 0L;
         this.firstHalf = true;
      }

      this.sleep(3000L, false);
      this.p1X = 200;
      this.p1Y = 0;
      this.p2X = 800;
      this.p2Y = 0;
      this.p1XV = 0;
      this.p1YV = 0;
      this.p2XV = 0;
      this.p2YV = 0;
      this.ballX = this.firstHalf?200:800;
      this.ballY = 400;
      this.ballVX = 0;
      this.ballVY = 0;
      this.replayStart = this.replayPos = 0;
      this.fP1Touched = this.fP2Touched = false;
      this.fServerMoved = false;
      this.repaint();
      this.gameThread = null;
   }

   private void DoReplay() {
      FontMetrics var1 = this.screen.getFontMetrics();
      int var2 = var1.getHeight();
      this.promptMsg = "Press space to continue...";
      this.mousePressed = false;
      int var3 = this.scoringRun;
      this.scoringRun = this.oldScoringRun;
      int var4 = this.replayStart;
      boolean var5 = false;
      this.drawCourt(this.screen);

      while(!this.mousePressed) {
         ++var4;
         if(var4 >= 200) {
            var4 = 0;
         }

         if(var4 == this.replayPos) {
            this.screen.setColor(Color.white);
            this.screen.fillRect(20, 20, 20, 20);
            this.sleep(1000L, false);
            var5 = !var5;
            this.paint(this.screen);
            this.screen.setColor(this.SKY_COL);
            this.screen.fillRect(0, 0, this.nWidth, this.nHeight / 20 + 22);
            if(this.replayPos < this.replayStart) {
               var4 += 200;
            }

            while(var4 > this.replayStart) {
               var4 -= 5;
               this.drawCourt(this.screen);
               this.screen.setColor(Color.white);
               this.screen.fillPolygon(new Polygon(new int[]{20, 35, 35, 50, 50, 35, 35, 20}, new int[]{30, 20, 30, 20, 40, 30, 40, 30}, 8));
               if(var4 < this.replayStart) {
                  var4 = this.replayStart;
               }

               this.ReplayFrame(var4 % 200);
               this.sleep(20L, false);
            }

            this.drawCourt(this.screen);
            this.screen.setColor(Color.white);
            this.screen.fillRect(20, 20, 20, 20);
            this.ReplayFrame(this.replayStart);
            this.sleep(500L, false);
            this.drawCourt(this.screen);
         }

         this.ReplayFrame(var4);

         try {
            Thread.sleep(var5?60L:20L);
         } catch (InterruptedException var7) {
            ;
         }

         this.screen.setColor(Color.white);
         this.screen.fillPolygon(new Polygon(new int[]{20, 35, 20}, new int[]{20, 30, 40}, 3));
         this.screen.drawString(var5?"Slow motion replay":"Replay", 60, 35 - var2 / 2);
      }

      this.scoringRun = var3;
      this.promptMsg = "";
      this.paint(this.screen);
   }

   private void drawCourt(Graphics var1) {
      var1.setColor(this.SKY_COL);
      var1.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      var1.setColor(this.COURT_COL);
      var1.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      var1.setColor(Color.white);
      var1.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      this.drawPrompt();
   }

   private void unDrawParticles() {
      this.screen.setColor(this.SKY_COL);

      for(int var1 = 0; var1 < this.NUM_PARTICLES; ++var1) {
         this.screen.fillOval(this.particle_x[var1], this.particle_y[var1], this.particle_size, this.particle_size);
      }

   }

   private void updateParticles() {
      for(int var1 = 0; var1 < this.NUM_PARTICLES; ++var1) {
         this.particle_x[var1] = (int)((float)this.particle_x[var1] + this.particle_weight[var1] * (float)this.wind / 3.0F);
         int var2 = (int)(this.particle_weight[var1] * 3.0F);
         this.particle_y[var1] += var2 > 0?var2:1;
         if(this.particle_x[var1] < 0 || this.particle_x[var1] > this.nWidth || this.particle_y[var1] > this.floor) {
            if(Math.random() > (double)Math.abs((float)this.wind / 60.0F)) {
               this.particle_x[var1] = (int)(Math.random() * (double)this.nWidth);
               this.particle_y[var1] = 0;
            } else if(this.wind > 0) {
               this.particle_x[var1] = -1;
               this.particle_y[var1] = (int)(Math.random() * (double)this.floor);
            } else {
               this.particle_x[var1] = this.nWidth + 1;
               this.particle_y[var1] = (int)(Math.random() * (double)this.floor);
            }
         }
      }

   }

   private void drawParticles() {
      for(int var2 = 0; var2 < this.NUM_PARTICLES; ++var2) {
         int var1 = (int)(170.0F * this.particle_weight[var2]);
         this.screen.setColor(new Color(85 + var1, 85 + var1, 255));
         this.screen.fillOval(this.particle_x[var2], this.particle_y[var2], this.particle_size, this.particle_size);
      }

   }

   private void sleep(long var1, boolean var3) {
      if(this.gameThread != null) {
         for(int var4 = 0; (long)var4 < var1 / 20L; ++var4) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var6) {
               ;
            }

            if(var3) {
               this.DrawStatus();
               if(this.windOn) {
                  this.doWind();
                  this.unDrawParticles();
                  this.updateParticles();
                  this.drawParticles();
                  this.screen.setColor(Color.white);
                  this.screen.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
               }
            }
         }
      }

   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }
}
