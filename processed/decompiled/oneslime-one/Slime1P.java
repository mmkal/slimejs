import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Polygon;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Vector;

public class Slime1P extends Applet implements Runnable {
   private int nWidth;
   private int nHeight;
   private int p1X;
   private int p1Y;
   private int p2X;
   private int p2Y;
   private int p1Diam;
   private int p2Diam;
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
   private boolean mousePressed;
   private boolean fInPlay;
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
   private boolean fServerMoved;
   private boolean hitNetSinceTouched;
   private Thread gameThread;
   private boolean fEndGame;
   private long startTime;
   private long gameTime;
   private long crossedNetTime;
   private long pausedTime;
   private boolean paused;
   private int scoringRun;
   private int oldScoringRun;
   private String[] slimeColText;
   private Color[] slimeColours;
   private String[] loserText1;
   private String[] loserText2;
   private Color SKY_COL;
   private Color COURT_COL;
   private Color BALL_COL;
   private int p1Run;
   private int p2Run;
   private int p1Jump;
   private int p2Jump;
   private final int pointsToWin = 6;
   private int aiMode = 0;
   // $FF: renamed from: ai c
   private Class_rn_c_1 field_rn_Slime1P_ai_109;
   private int gameScore;
   private boolean gameOver;
   private int[] boundsP1select = new int[4];
   private int[] boundsP2select = new int[4];
   private boolean oneplayer = false;
   private int ballRad = 25;
   private BufferedImage buffer;
   private Vector redrawRegions;
   private boolean buffered = false;
   private int[][] replayData;
   private int replayIndex;
   private int replayStart;
   private boolean replaying;

   public void init() {
      String var1 = this.getDocumentBase().getHost();
      if(!var1.equals("oneslime.net")) {
         try {
            this.getAppletContext().showDocument(new URL("http://oneslime.net/"), "_self");
         } catch (Exception var5) {
            ;
         }

         throw new RuntimeException("Couldn\'t initialise - server data missing.");
      } else {
         System.out.println("One Slime: http://oneslime.net/");
         new Class_rn_e_3();
         new Class_rn_d_4();
         new Class_rn_b_5();
         new Class_rn_a_6();
         this.nWidth = this.size().width;
         this.nHeight = this.size().height;
         this.fInPlay = this.fEndGame = false;
         this.promptMsg = "Click the mouse to play!";
         this.buffer = new BufferedImage(this.nWidth, this.nHeight, 1);
         this.fInPlay = this.fEndGame = false;
         this.promptMsg = "Click the mouse to play!";
         this.screen = this.buffer.getGraphics();
         this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
         this.slimeColText = new String[]{"Inferior Human Controlled Slime ", "The Pathetic White Slime ", "Angry Red Slimons ", "The Slime Master ", "Psycho Slime ", "The Big Blue Boss "};
         this.slimeColours = new Color[]{Color.yellow, Color.white, Color.red, Color.black, Color.blue, Color.blue};
         this.loserText1 = new String[]{"You are a loser!", this.slimeColText[2] + "gives you the gong!", this.slimeColText[3] + "says \"You are seriously inept.\"", this.slimeColText[4] + "laughs at the pathetic slow opposition.", this.slimeColText[5] + "devours you!"};
         this.loserText2 = new String[]{"Better luck next time.", "So who has the red face bombing out on level 2, huh?", "Congrats on reaching level 3.", "Congrats on reaching level 4!", "Yum."};
         this.p1Col = 0;
         this.p1Run = 8;
         this.p1Jump = 31;
         this.p1Diam = 100;
         this.gameScore = 0;
         this.gameOver = true;
         this.paused = false;
         this.method_rn_Slime1P_new_77();
         this.method_rn_Slime1P_for_80();
         this.redrawRegions = new Vector(0);
         this.method_rn_Slime1P_void_78();
         this.repaint();
         this.replayData = new int[1000][8];

         try {
            System.out.println(this.getCodeBase());
            InputStream var3 = (new URL(this.getCodeBase() + "bler")).openStream();
            BufferedReader var4 = new BufferedReader(new InputStreamReader(var3));
            if(!var4.readLine().equals("bler")) {
               var4.close();
               var3.close();
               throw new Exception("Couldn\'t connect to server!");
            }

            var4.close();
            var3.close();
         } catch (Exception var6) {
            System.out.println("Error...\n" + var6);
            new ServerCheck();
         }

      }
   }

   // $FF: renamed from: new () void
   private void method_rn_Slime1P_new_77() {
      this.fP1PointsWon = this.fP2PointsWon = 0;
      this.p1Diam = this.p2Diam = 100;
      this.p2Run = 8;
      this.p2Jump = 31;
      this.fP2Fire = false;
      if(!this.oneplayer) {
         this.aiMode = 0;
      }

      switch(this.aiMode) {
      case 0:
         this.field_rn_Slime1P_ai_109 = new Class_rn_d_4();
         this.fP2Fire = false;
         this.SKY_COL = Color.blue;
         this.COURT_COL = Color.gray;
         this.BALL_COL = Color.yellow;
         break;
      case 1:
         this.field_rn_Slime1P_ai_109 = new Class_rn_e_3();
         this.fP2Fire = false;
         this.SKY_COL = new Color(30, 80, 0);
         this.COURT_COL = Color.darkGray;
         this.BALL_COL = new Color(128, 128, 255);
         break;
      case 2:
         this.field_rn_Slime1P_ai_109 = new Class_rn_b_5();
         this.fP2Fire = false;
         this.SKY_COL = new Color(98, 57, 57);
         this.COURT_COL = new Color(0, 168, 0);
         this.BALL_COL = Color.white;
         break;
      case 3:
         this.field_rn_Slime1P_ai_109 = new Class_rn_b_5();
         this.fP2Fire = true;
         this.SKY_COL = Color.black;
         this.COURT_COL = Color.red;
         this.BALL_COL = Color.yellow;
         break;
      case 4:
         this.field_rn_Slime1P_ai_109 = new Class_rn_a_6();
         this.p2Diam = 150;
         this.fP2Fire = false;
         this.SKY_COL = Color.black;
         this.COURT_COL = Color.red;
         this.BALL_COL = Color.yellow;
      }

      if(this.oneplayer) {
         this.p2Col = this.aiMode + 1;
      } else {
         this.p2Col = this.p1Col;
      }

      this.field_rn_Slime1P_ai_109.method_rn_c_a_9(this, 2);
   }

   public void update(Graphics var1) {
      if(this.buffered) {
         var1.drawImage(this.buffer, 0, 0, (ImageObserver)null);
      } else {
         this.method_rn_Slime1P_void_78();
      }

      this.redrawRegions = new Vector(0);
   }

   public void paint(Graphics var1) {
      this.update(var1);
   }

   // $FF: renamed from: void () void
   private void method_rn_Slime1P_void_78() {
      Graphics var1;
      if(this.buffered) {
         var1 = this.buffer.getGraphics();
      } else {
         var1 = this.getGraphics();
      }

      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      var1.setColor(this.SKY_COL);
      var1.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      var1.setColor(this.COURT_COL);
      var1.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      var1.setColor(Color.white);
      var1.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      FontMetrics var2 = var1.getFontMetrics();
      String var3;
      if(this.gameOver) {
         this.screen.setColor(Color.white);
         Font var4 = var1.getFont();
         var1.setFont(this.screen.getFont());
         var3 = "Slime Volleyball: One Slime";
         var1.drawString(var3, this.nWidth / 2 - this.screen.getFontMetrics().stringWidth(var3) / 2, this.nHeight / 3 - var2.getHeight());
         var1.setFont(var4);
         var1.setColor(Color.white);
         var3 = "Written by Quin Pendragon and Daniel Wedge";
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 2);
         var3 = "http://oneslime.net/";
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 7 / 2);
         var1.setColor(Color.white);
         var3 = "Click here to start a one player game!";
         this.boundsP1select[0] = this.nWidth / 4 - var2.stringWidth(var3) / 2 - 10;
         this.boundsP1select[1] = this.nHeight / 3 + var2.getHeight() * 5;
         this.boundsP1select[2] = this.boundsP1select[0] + var2.stringWidth(var3) + 20;
         this.boundsP1select[3] = this.boundsP1select[1] + var2.getHeight() * 3;
         var1.fillRect(this.nWidth / 4 - var2.stringWidth(var3) / 2 - 10, this.nHeight / 3 + var2.getHeight() * 5, var2.stringWidth(var3) + 20, var2.getHeight() * 3);
         var1.setColor(this.SKY_COL);
         if(this.aiMode != 0) {
            var1.drawString(var3, this.nWidth / 4 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 13 / 2);
            var3 = "or press C to continue...";
            var1.drawString(var3, this.nWidth / 4 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 15 / 2);
         } else {
            var1.drawString(var3, this.nWidth / 4 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 7);
         }

         var1.setColor(Color.white);
         var3 = "Click here to start a two player game!";
         var1.fillRect(this.nWidth * 3 / 4 - var2.stringWidth(var3) / 2 - 10, this.nHeight / 3 + var2.getHeight() * 5, var2.stringWidth(var3) + 20, var2.getHeight() * 3);
         var1.setColor(this.SKY_COL);
         var1.drawString(var3, this.nWidth * 3 / 4 - var2.stringWidth(var3) / 2, this.nHeight / 3 + var2.getHeight() * 7);
         this.boundsP2select[0] = this.nWidth * 3 / 4 - var2.stringWidth(var3) / 2 - 10;
         this.boundsP2select[1] = this.nHeight / 3 + var2.getHeight() * 5;
         this.boundsP2select[2] = this.boundsP2select[0] + var2.stringWidth(var3) + 20;
         this.boundsP2select[3] = this.boundsP2select[1] + var2.getHeight() * 3;
         if(!this.replaying) {
            this.method_rn_Slime1P_goto_93();
            this.method_rn_Slime1P_byte_95();
         }
      } else if(!this.fInPlay) {
         var1.setColor(Color.white);
         var3 = "Your score: " + this.gameScore;
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 2 - var2.getHeight());
         if(this.fP1PointsWon == 6) {
            var3 = "Level bonus: " + 1000 * this.fP1PointsWon / (this.fP1PointsWon + this.fP2PointsWon) * this.method_rn_Slime1P_case_108() + " points";
            var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 2 + var2.getHeight());
            var3 = "Time bonus: " + (this.gameTime < 300000L?300000L - this.gameTime:0L) / 1000L * (long)this.method_rn_Slime1P_case_108() + " points";
            var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 2 + var2.getHeight() * 2);
            if(this.fP2PointsWon == 0) {
               var3 = "Flawless Victory: " + 1000 * this.method_rn_Slime1P_case_108() + " points";
               var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 2 + var2.getHeight() * 3);
            }
         }

         var1.setFont(this.screen.getFont());
         var2 = this.screen.getFontMetrics();
         var3 = "Level " + (this.aiMode + 1) + " clear!";
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight / 3);
         var3 = "Click the mouse to continue...";
         var1.drawString(var3, this.nWidth / 2 - var2.stringWidth(var3) / 2, this.nHeight * 4 / 5 + var2.getHeight() + 10);
         this.method_rn_Slime1P_goto_93();
      } else {
         this.method_rn_Slime1P_goto_93();
      }

   }

   // $FF: renamed from: do () void
   private void method_rn_Slime1P_do_79() {
      if(!this.buffered) {
         this.redrawRegions.removeAllElements();
      } else {
         for(int var1 = 0; var1 < this.redrawRegions.size(); ++var1) {
            int[] var2 = (int[])((int[])this.redrawRegions.get(var1));
            int var3 = var2[0];
            int var4 = var2[1];
            int var5 = var2[2];
            int var6 = var2[3];
            if(var3 < 0) {
               var3 = 0;
            }

            if(var5 > this.nWidth) {
               var5 = this.nWidth - 1;
            }

            if(var4 < 0) {
               var4 = 0;
            }

            if(var6 > this.nHeight) {
               var6 = this.nHeight - 1;
            }

            int var7 = var5 - var3;
            int var8 = var6 - var4;
            if(var7 > 0 && var8 > 0) {
               BufferedImage var9 = this.buffer.getSubimage(var3, var4, var7, var8);
               this.getGraphics().drawImage(var9, var3, var4, (ImageObserver)null);
            }
         }

         this.redrawRegions.removeAllElements();
      }
   }

   // $FF: renamed from: for () void
   private void method_rn_Slime1P_for_80() {
      this.p1X = this.p1OldX = 200;
      this.p1Y = this.p1OldY = 0;
      this.p2X = this.p2OldX = 800;
      this.p2Y = this.p2OldY = 0;
      this.p1XV = 0;
      this.p1YV = 0;
      this.p2XV = 0;
      this.p2YV = 0;
      this.ballX = this.ballOldX = 200;
      this.ballY = this.ballOldY = 400;
      this.ballVX = 0;
      this.ballVY = 0;
      this.hitNetSinceTouched = false;
      this.fServerMoved = this.fP1Touched = this.fP2Touched = false;
      this.fP1Touches = this.fP2Touches = 0;
      this.repaint();
      this.promptMsg = "";
      this.replayStart = this.replayIndex = 0;
      this.replaying = false;
   }

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         switch(var1.key) {
         case 32:
            this.mousePressed = true;
            return false;
         case 65:
         case 97:
            this.method_rn_Slime1P_c_81();
            return false;
         case 66:
         case 98:
            this.buffered = !this.buffered;
            this.method_rn_Slime1P_void_78();
            return false;
         case 67:
         case 99:
            if(this.gameOver) {
               this.fEndGame = false;
               this.fInPlay = true;
               this.promptMsg = "";
               this.gameOver = false;
               this.gameScore = 0;
               this.method_rn_Slime1P_for_80();
               this.method_rn_Slime1P_new_77();
               this.repaint();
               this.gameThread = new Thread(this);
               this.gameThread.start();
            }

            return false;
         case 68:
         case 100:
            this.method_rn_Slime1P_b_82();
            return false;
         case 73:
         case 105:
            if(!this.oneplayer) {
               this.method_rn_Slime1P_long_88();
            }

            return false;
         case 74:
         case 106:
            if(!this.oneplayer) {
               this.method_rn_Slime1P_e_85();
            }

            return false;
         case 75:
         case 107:
            if(this.oneplayer) {
               this.fP1PointsWon = this.fP2PointsWon = 0;
               this.fP1Fire = false;
               this.gameScore = 0;
               this.method_rn_Slime1P_new_77();
               this.method_rn_Slime1P_for_80();
               this.method_rn_Slime1P_void_78();
               this.repaint();
               this.startTime = System.currentTimeMillis();
               this.paused = false;
            }

            return false;
         case 76:
         case 108:
            if(!this.oneplayer) {
               this.method_rn_Slime1P_j_86();
            }

            return false;
         case 79:
         case 111:
            if(!this.paused) {
               this.pausedTime = System.currentTimeMillis();

               try {
                  this.getAppletContext().showDocument(new URL("http://oneslime.net/boss/launch.html"), "_blank");
               } catch (Exception var3) {
                  System.out.println(var3);
               }

               this.paused = true;
            } else {
               this.startTime += System.currentTimeMillis() - this.pausedTime;
               this.paused = false;
            }

            return false;
         case 80:
         case 112:
            if(!this.paused) {
               this.pausedTime = System.currentTimeMillis();
               this.paused = true;
            } else {
               this.startTime += System.currentTimeMillis() - this.pausedTime;
               this.paused = false;
            }

            return false;
         case 87:
         case 119:
            this.method_rn_Slime1P_char_84();
            return false;
         case 1004:
            if(this.oneplayer) {
               this.method_rn_Slime1P_char_84();
            } else {
               this.method_rn_Slime1P_long_88();
            }

            return false;
         case 1006:
            if(this.oneplayer) {
               this.method_rn_Slime1P_c_81();
            } else {
               this.method_rn_Slime1P_e_85();
            }

            return false;
         case 1007:
            if(this.oneplayer) {
               this.method_rn_Slime1P_b_82();
            } else {
               this.method_rn_Slime1P_j_86();
            }

            return false;
         default:
            return false;
         }
      case 402:
      case 404:
         switch(var1.key) {
         case 65:
         case 97:
            if(this.p1XV < 0) {
               this.method_rn_Slime1P_try_83();
            }

            return false;
         case 68:
         case 100:
            if(this.p1XV > 0) {
               this.method_rn_Slime1P_try_83();
            }

            return false;
         case 74:
         case 106:
            if(this.p2XV < 0) {
               this.method_rn_Slime1P_else_87();
            }

            return false;
         case 76:
         case 108:
            if(this.p2XV > 0) {
               this.method_rn_Slime1P_else_87();
            }

            return false;
         case 1006:
            if(this.oneplayer && this.p1XV < 0) {
               this.method_rn_Slime1P_try_83();
            } else if(!this.oneplayer && this.p2XV < 0) {
               this.method_rn_Slime1P_else_87();
               return false;
            }

            return false;
         case 1007:
            if(this.oneplayer && this.p1XV > 0) {
               this.method_rn_Slime1P_try_83();
            } else if(!this.oneplayer && this.p2XV > 0) {
               this.method_rn_Slime1P_else_87();
               return false;
            }

            return false;
         default:
            return false;
         }
      case 501:
         if(this.gameOver) {
            if(var1.x > this.boundsP1select[0] && var1.y > this.boundsP1select[1] && var1.x < this.boundsP1select[2] && var1.y < this.boundsP1select[3]) {
               this.oneplayer = true;
            } else {
               if(var1.x <= this.boundsP2select[0] || var1.y <= this.boundsP2select[1] || var1.x >= this.boundsP2select[2] || var1.y >= this.boundsP2select[3]) {
                  break;
               }

               this.oneplayer = false;
            }
         }

         this.mousePressed = true;
         if(!this.fInPlay) {
            this.fEndGame = false;
            this.fInPlay = true;
            this.promptMsg = "";
            if(this.gameScore != 0) {
               if(this.aiMode < 5) {
                  ++this.aiMode;
               } else {
                  this.aiMode = 0;
               }
            }

            if(this.gameOver) {
               this.aiMode = 0;
               this.gameOver = false;
               this.gameScore = 0;
            }

            this.method_rn_Slime1P_new_77();
            this.repaint();
            this.ballX = 200;
            this.gameThread = new Thread(this);
            this.gameThread.start();
         }
         break;
      case 503:
         this.showStatus("Slime Volleyball: One Slime: http://oneslime.net/");
      }

      return false;
   }

   // $FF: renamed from: c () void
   public void method_rn_Slime1P_c_81() {
      this.p1XV = this.fP1Fire?-2 * this.p1Run:-this.p1Run;
      if(this.p1X == 200 && this.ballX == 200 && !this.fP2Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   // $FF: renamed from: b () void
   public void method_rn_Slime1P_b_82() {
      this.p1XV = this.fP1Fire?2 * this.p1Run:this.p1Run;
      if(this.p1X == 200 && this.ballX == 200 && !this.fP2Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   // $FF: renamed from: try () void
   public void method_rn_Slime1P_try_83() {
      this.p1XV = 0;
   }

   // $FF: renamed from: char () void
   public void method_rn_Slime1P_char_84() {
      if(this.p1Y == 0) {
         this.p1YV = this.fP1Fire?45 * this.p1Jump / 31:this.p1Jump;
      }

   }

   // $FF: renamed from: e () void
   public void method_rn_Slime1P_e_85() {
      this.p2XV = this.fP2Fire?-2 * this.p2Run:-this.p2Run;
      if(this.p2X == 800 && this.ballX == 800 && !this.fP1Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   // $FF: renamed from: j () void
   public void method_rn_Slime1P_j_86() {
      this.p2XV = this.fP2Fire?2 * this.p2Run:this.p2Run;
      if(this.p2X == 800 && this.ballX == 800 && !this.fP1Touched && !this.fServerMoved) {
         this.fServerMoved = true;
      }

   }

   // $FF: renamed from: else () void
   public void method_rn_Slime1P_else_87() {
      this.p2XV = 0;
   }

   // $FF: renamed from: long () void
   public void method_rn_Slime1P_long_88() {
      if(this.p2Y == 0) {
         this.p2YV = this.fP2Fire?45 * this.p2Jump / 31:this.p2Jump;
      }

   }

   // $FF: renamed from: d () void
   private void method_rn_Slime1P_d_89() {
      if(this.oneplayer) {
         int[] var1 = new int[]{this.ballX, this.ballY, this.ballVX, this.ballVY, this.p1X, this.p1Y, this.p1XV, this.p1YV, this.p2X, this.p2Y, this.p2XV, this.p2YV};
         this.field_rn_Slime1P_ai_109.method_rn_c_a_10(var1, this.fP1Fire, this.fP2Fire);
         this.field_rn_Slime1P_ai_109.method_rn_c_a_11();
      }
   }

   // $FF: renamed from: i () void
   private void method_rn_Slime1P_i_90() {
      this.method_rn_Slime1P_d_89();
      this.p1X += this.p1XV;
      if(this.p1X < this.p1Diam / 2) {
         this.p1X = this.p1Diam / 2;
      }

      if(this.p1X > 495 - this.p1Diam / 2) {
         this.p1X = 495 - this.p1Diam / 2;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= this.fP1Fire?4:2;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         }
      }

      this.p2X += this.p2XV;
      if(this.p2X > 1000 - this.p2Diam / 2) {
         this.p2X = 1000 - this.p2Diam / 2;
      }

      if(this.p2X < 505 + this.p2Diam / 2) {
         this.p2X = 505 + this.p2Diam / 2;
      }

      if(this.p2YV != 0) {
         this.p2Y += this.p2YV -= this.fP2Fire?4:2;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

   }

   // $FF: renamed from: if () void
   private void method_rn_Slime1P_if_91() {
      int[] var1 = new int[4];
      Graphics var2;
      if(this.buffered) {
         var2 = this.buffer.getGraphics();
      } else {
         var2 = this.getGraphics();
      }

      byte var3 = 5;
      int var4 = (this.ballRad + var3) * this.nHeight / 1000;
      int var5 = this.ballOldX * this.nWidth / 1000;
      int var6 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      var2.setColor(this.SKY_COL);
      var2.fillRect(var5 - var4, var6 - var4, 2 * var4, 2 * var4);
      int var7 = var5;
      int var8 = var6;
      this.superFlash = !this.superFlash;
      int var9 = this.nWidth * this.p1Diam / 1000;
      int var10 = this.nHeight * this.p1Diam / 1000;
      int var11 = this.p1OldX * this.nWidth / 1000 - var9 / 2;
      int var12 = 4 * this.nHeight / 5 - var10 - this.p1OldY * this.nHeight / 1000;
      var2.setColor(this.SKY_COL);
      var2.fillRect(var11, var12, var9, var10);
      var1[0] = var11;
      var1[1] = var12;
      var1[2] = var11 + var9;
      var1[3] = var12 + var10;
      var9 = this.nWidth * this.p1Diam / 1000;
      var10 = this.nHeight * this.p1Diam / 1000;
      var11 = this.p1X * this.nWidth / 1000 - var9 / 2;
      var12 = 4 * this.nHeight / 5 - var10 - this.p1Y * this.nHeight / 1000;
      var2.setColor(this.fP1Fire && this.superFlash?Color.white:this.slimeColours[this.p1Col]);
      var2.fillArc(var11, var12, var9, 2 * var10, 0, 180);
      if(var11 < var1[0]) {
         var1[0] = var11;
      }

      if(var12 < var1[1]) {
         var1[1] = var12;
      }

      if(var11 + var9 > var1[2]) {
         var1[2] = var11 + var9;
      }

      if(var12 + var10 > var1[3]) {
         var1[3] = var12 + var10;
      }

      this.redrawRegions.add(var1);
      int var15 = this.p1X + 38 * this.p1Diam / 100;
      int var16 = this.p1Y - 60 * this.p1Diam / 100;
      var11 = var15 * this.nWidth / 1000;
      var12 = 4 * this.nHeight / 5 - var10 - var16 * this.nHeight / 1000;
      int var17 = var11 - var5;
      int var18 = var12 - var6;
      int var19 = (int)Math.sqrt((double)(var17 * var17 + var18 * var18));
      int var20 = this.nWidth / 50 * this.p1Diam / 100;
      int var21 = this.nHeight / 25 * this.p1Diam / 100;
      var2.setColor(Color.white);
      var2.fillOval(var11 - var20, var12 - var21, var20, var21);
      var2.setColor(Color.black);
      var2.fillOval(var11 - 4 * var17 / var19 - 3 * var20 / 4, var12 - 4 * var18 / var19 - 3 * var21 / 4, var20 / 2, var21 / 2);
      var9 = this.nWidth * this.p2Diam / 1000;
      var10 = this.nHeight * this.p2Diam / 1000;
      var11 = this.p2OldX * this.nWidth / 1000 - var9 / 2;
      var12 = 4 * this.nHeight / 5 - var10 - this.p2OldY * this.nHeight / 1000;
      var2.setColor(this.SKY_COL);
      var2.fillRect(var11, var12, var9, var10);
      var1 = new int[]{var11, var12, var11 + var9, var12 + var10};
      var9 = this.nWidth * this.p2Diam / 1000;
      var10 = this.nHeight * this.p2Diam / 1000;
      var11 = this.p2X * this.nWidth / 1000 - var9 / 2;
      var12 = 4 * this.nHeight / 5 - this.p2Diam * this.nHeight / 1000 - this.p2Y * this.nHeight / 1000;
      var2.setColor(this.fP2Fire && this.superFlash?Color.white:this.slimeColours[this.p2Col]);
      if(var11 < var1[0]) {
         var1[0] = var11;
      }

      if(var12 < var1[1]) {
         var1[1] = var12;
      }

      if(var11 + var9 > var1[2]) {
         var1[2] = var11 + var9;
      }

      if(var12 + var10 > var1[3]) {
         var1[3] = var12 + var10;
      }

      this.redrawRegions.add(var1);
      var2.fillArc(var11, var12, var9, 2 * var10, 0, 180);
      var15 = this.p2X - 18 * this.p2Diam / 100;
      var16 = this.p2Y - 60 * this.p2Diam / 100;
      var11 = var15 * this.nWidth / 1000;
      var12 = 4 * this.nHeight / 5 - var10 - var16 * this.nHeight / 1000;
      var17 = var11 - var5;
      var18 = var12 - var6;
      var19 = (int)Math.sqrt((double)(var17 * var17 + var18 * var18));
      var20 = this.nWidth / 50 * this.p2Diam / 100;
      var21 = this.nHeight / 25 * this.p2Diam / 100;
      var2.setColor(Color.white);
      var2.fillOval(var11 - var20, var12 - var21, var20, var21);
      var2.setColor(Color.black);
      var2.fillOval(var11 - 4 * var17 / var19 - 3 * var20 / 4, var12 - 4 * var18 / var19 - 3 * var21 / 4, var20 / 2, var21 / 2);
      if(!this.fP1Fire && !this.fP2Fire) {
         this.superFlash = false;
      }

      var5 = this.ballX * this.nWidth / 1000;
      var6 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      var2.setColor(this.BALL_COL);
      var2.fillOval(var5 - var4, var6 - var4, 2 * var4, 2 * var4);
      var1 = new int[]{var7 - var4, var8 - var4, var7 + var4, var8 + var4};
      if(var5 - var4 < var1[0]) {
         var1[0] = var5 - var4;
      }

      if(var6 - var4 < var1[1]) {
         var1[1] = var6 - var4;
      }

      if(var5 + var4 > var1[2]) {
         var1[2] = var5 + var4;
      }

      if(var6 + var4 > var1[3]) {
         var1[3] = var6 + var4;
      }

      this.redrawRegions.add(var1);
   }

   // $FF: renamed from: h () void
   private void method_rn_Slime1P_h_92() {
      byte var1 = 5;
      byte var2 = 15;
      byte var3 = 22;
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(!this.fEndGame) {
         int var4 = 2 * (this.ballX - this.p1X);
         int var5 = this.ballY - this.p1Y;
         int var6 = (int)Math.sqrt((double)(var4 * var4 + var5 * var5));
         int var7 = this.ballVX - this.p1XV;
         int var8 = this.ballVY - this.p1YV;
         int var9;
         if(var5 > 0 && var6 < this.p1Diam + this.ballRad && var6 > var1) {
            var9 = (var4 * var7 + var5 * var8) / var6;
            this.ballX = this.p1X + (this.p1Diam + this.ballRad) / 2 * var4 / var6;
            this.ballY = this.p1Y + (this.p1Diam + this.ballRad) * var5 / var6;
            if(var9 <= 0) {
               this.ballVX += this.p1XV - 2 * var4 * var9 / var6;
               if(this.ballVX < -var2) {
                  this.ballVX = -var2;
               }

               if(this.ballVX > var2) {
                  this.ballVX = var2;
               }

               this.ballVY += this.p1YV - 2 * var5 * var9 / var6;
               if(this.ballVY < -var3) {
                  this.ballVY = -var3;
               }

               if(this.ballVY > var3) {
                  this.ballVY = var3;
               }
            }

            if(this.fServerMoved) {
               this.fP1Touched = true;
               ++this.fP1Touches;
               this.fP2Touches = 0;
               this.fP1HitStill = this.p1YV == 0 && this.p1XV == 0;
               this.hitNetSinceTouched = false;
            }
         }

         var4 = 2 * (this.ballX - this.p2X);
         var5 = this.ballY - this.p2Y;
         var6 = (int)Math.sqrt((double)(var4 * var4 + var5 * var5));
         var7 = this.ballVX - this.p2XV;
         var8 = this.ballVY - this.p2YV;
         if(var5 > 0 && var6 < this.p2Diam + this.ballRad && var6 > var1) {
            var9 = (var4 * var7 + var5 * var8) / var6;
            this.ballX = this.p2X + (this.p2Diam + this.ballRad) / 2 * var4 / var6;
            this.ballY = this.p2Y + (this.p2Diam + this.ballRad) * var5 / var6;
            if(var9 <= 0) {
               this.ballVX += this.p2XV - 2 * var4 * var9 / var6;
               if(this.ballVX < -var2) {
                  this.ballVX = -var2;
               }

               if(this.ballVX > var2) {
                  this.ballVX = var2;
               }

               this.ballVY += this.p2YV - 2 * var5 * var9 / var6;
               if(this.ballVY < -var3) {
                  this.ballVY = -var3;
               }

               if(this.ballVY > var3) {
                  this.ballVY = var3;
               }
            }

            if(this.fServerMoved) {
               this.fP2Touched = true;
               ++this.fP2Touches;
               this.fP1Touches = 0;
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

   }

   // $FF: renamed from: goto () void
   private void method_rn_Slime1P_goto_93() {
      if(!this.replaying) {
         Graphics var1 = this.getGraphics();
         FontMetrics var2 = var1.getFontMetrics();
         int var3 = this.nHeight / 15;
         int var4 = 20;

         int var5;
         for(var5 = 0; var5 < 6; ++var5) {
            if(this.fP1PointsWon >= var5 + 1) {
               var1.setColor(this.slimeColours[this.p1Col]);
               var1.fillOval(var4, 30 - var3 / 2, var3, var3);
            }

            var1.setColor(Color.white);
            var1.drawOval(var4, 30 - var3 / 2, var3, var3);
            var4 += var3 + 10;
         }

         var4 = this.nWidth - 20 - 6 * (var3 + 10);

         for(var5 = 0; var5 < 6; ++var5) {
            if(this.fP2PointsWon >= 6 - var5) {
               var1.setColor(this.slimeColours[this.p2Col]);
               var1.fillOval(var4, 30 - var3 / 2, var3, var3);
            }

            var1.setColor(Color.white);
            var1.drawOval(var4, 30 - var3 / 2, var3, var3);
            var4 += var3 + 10;
         }

      }
   }

   // $FF: renamed from: a (long) java.lang.String
   private String method_rn_Slime1P_a_94(long var1) {
      String var3 = "";
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

   // $FF: renamed from: byte () void
   private void method_rn_Slime1P_byte_95() {
      Graphics var1;
      if(this.buffered) {
         var1 = this.buffer.getGraphics();
      } else {
         var1 = this.getGraphics();
      }

      int var2 = this.nHeight / 20;
      var1.setColor(this.SKY_COL);
      var1.setFont(this.screen.getFont());
      FontMetrics var3 = var1.getFontMetrics();
      String var4 = (this.oneplayer?"Score: " + this.gameScore:"") + (!this.fInPlay?"":"   Time: " + this.method_rn_Slime1P_a_94((this.paused?this.pausedTime:System.currentTimeMillis()) - this.startTime));
      int var5 = var3.stringWidth(var4);
      int var6 = this.nWidth / 2 - var5 / 2 - 10;
      var1.fillRect(var6, 0, var5 + 20, var2 + 22);
      var1.setColor(Color.white);
      int var7 = var3.stringWidth(var4);
      int var8 = this.nWidth / 2 - var7 / 2;
      int var9 = var3.getHeight() * 2;
      var1.drawString(var4, var8, var9);
      this.redrawRegions.add(new int[]{var8, 0, var8 + var7, var9 + var9 / 2});
   }

   // $FF: renamed from: int () void
   public void method_rn_Slime1P_int_96() {
      Graphics var1;
      if(this.buffered) {
         var1 = this.buffer.getGraphics();
      } else {
         var1 = this.getGraphics();
      }

      var1.setFont(this.screen.getFont());
      this.screen.setColor(this.COURT_COL);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      this.method_rn_Slime1P_a_97(this.promptMsg, 0);
   }

   // $FF: renamed from: a (java.lang.String, int) void
   public void method_rn_Slime1P_a_97(String var1, int var2) {
      Graphics var3 = this.getGraphics();
      var3.setFont(new Font(var3.getFont().getName(), 1, 15));
      FontMetrics var4 = var3.getFontMetrics();
      var3.setColor(Color.white);
      int var5 = var4.stringWidth(var1);
      int var6 = (this.nWidth - var5) / 2;
      int var7 = this.nHeight * 4 / 5 + var4.getHeight() * (var2 + 1) + 10;
      var3.drawString(var1, var6, var7);
      this.method_rn_Slime1P_goto_93();
      this.method_rn_Slime1P_byte_95();
      this.redrawRegions.add(new int[]{var6, var7, var6 + var5 + 1, var7 + var4.getHeight()});
   }

   // $FF: renamed from: a (int) void
   private void method_rn_Slime1P_a_98(int var1) {
      this.method_rn_Slime1P_a_99(var1, true);
   }

   // $FF: renamed from: a (int, boolean) void
   private void method_rn_Slime1P_a_99(int var1, boolean var2) {
      int var3 = var1 != 0?var1 - 1:this.replayData.length - 1;
      this.p1OldX = this.replayData[var3][0];
      this.p1OldY = this.replayData[var3][1];
      this.p2OldX = this.replayData[var3][2];
      this.p2OldY = this.replayData[var3][3];
      this.ballOldX = this.replayData[var3][4];
      this.ballOldY = this.replayData[var3][5];
      this.p1X = this.replayData[var1][0];
      this.p1Y = this.replayData[var1][1];
      this.p2X = this.replayData[var1][2];
      this.p2Y = this.replayData[var1][3];
      this.ballX = this.replayData[var1][4];
      this.ballY = this.replayData[var1][5];
      this.ballVX = 0;
      this.ballVY = 1;
      if(this.ballOldX == 0 && this.ballOldY == 0) {
         this.ballOldX = this.ballOldY = -500;
      }

      if(this.ballX == this.ballOldX && this.ballY == this.ballOldY) {
         this.ballOldX = this.ballOldY = -500;
      }

      this.method_rn_Slime1P_if_91();
      if(this.buffered) {
         this.getGraphics().drawImage(this.buffer, 0, 0, (ImageObserver)null);
      }

   }

   // $FF: renamed from: g () void
   private void method_rn_Slime1P_g_100() {
      this.replayData[this.replayIndex][0] = this.p1X;
      this.replayData[this.replayIndex][1] = this.p1Y;
      this.replayData[this.replayIndex][2] = this.p2X;
      this.replayData[this.replayIndex][3] = this.p2Y;
      this.replayData[this.replayIndex][4] = this.ballX;
      this.replayData[this.replayIndex][5] = this.ballY;
      this.replayData[this.replayIndex][6] = this.p1Col;
      this.replayData[this.replayIndex][7] = this.p2Col;
      ++this.replayIndex;
      if(this.replayIndex >= this.replayData.length) {
         this.replayIndex = 0;
      }

      if(this.replayStart == this.replayIndex) {
         ++this.replayStart;
      }

      if(this.replayStart >= this.replayData.length) {
         this.replayStart = 0;
      }

   }

   // $FF: renamed from: f () void
   private void method_rn_Slime1P_f_101() {
      this.replaying = true;
      this.method_rn_Slime1P_void_78();
      Graphics var1 = this.buffered?this.buffer.getGraphics():this.getGraphics();
      FontMetrics var2 = var1.getFontMetrics();
      int var3 = var2.getHeight();
      this.promptMsg = "Press space to continue...";
      this.mousePressed = false;
      int var4 = this.scoringRun;
      this.scoringRun = this.oldScoringRun;
      int var5 = this.replayStart;
      boolean var6 = false;

      while(!this.mousePressed) {
         ++var5;
         if(var5 >= this.replayData.length) {
            var5 = 0;
         }

         if(var5 == this.replayIndex) {
            var1.setColor(Color.white);
            var1.fillRect(20, 20, 20, 20);
            this.method_rn_Slime1P_a_107(1000L, false);
            var6 = !var6;
            this.paint(var1);
            var1.setColor(this.SKY_COL);
            var1.fillRect(0, 0, this.nWidth, this.nHeight / 20 + 22);
            if(this.replayIndex < this.replayStart) {
               var5 += this.replayData.length;
            }

            while(var5 > this.replayStart) {
               var5 -= 5;
               this.method_rn_Slime1P_void_78();
               var1.setColor(Color.white);
               var1.fillPolygon(new Polygon(new int[]{20, 35, 35, 50, 50, 35, 35, 20}, new int[]{30, 20, 30, 20, 40, 30, 40, 30}, 8));
               if(var5 < this.replayStart) {
                  var5 = this.replayStart;
               }

               this.method_rn_Slime1P_a_99(var5 % this.replayData.length, false);
               this.method_rn_Slime1P_a_107(20L, false);
            }

            this.method_rn_Slime1P_void_78();
            var1.setColor(Color.white);
            var1.fillRect(20, 20, 20, 20);
            this.method_rn_Slime1P_a_98(this.replayStart);
            this.method_rn_Slime1P_a_107(500L, false);
            this.method_rn_Slime1P_void_78();
         }

         this.method_rn_Slime1P_a_98(var5);

         try {
            Thread.sleep(var6?60L:20L);
         } catch (InterruptedException var8) {
            ;
         }

         var1.setColor(Color.white);
         var1.fillPolygon(new Polygon(new int[]{20, 35, 20}, new int[]{20, 30, 40}, 3));
      }

      this.scoringRun = var4;
      this.promptMsg = "";
      this.paint(var1);
      this.replaying = false;
   }

   public void run() {
      this.replayIndex = this.replayStart = 0;
      this.method_rn_Slime1P_int_96();
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
      this.fP1Frames = 0L;
      this.fP2Frames = 0L;
      this.fP1Super = 0;
      this.fP2Super = 0;
      this.fP1HitStill = false;
      this.fP2HitStill = false;
      this.fServerMoved = false;
      this.method_rn_Slime1P_goto_93();
      this.fP1Touched = this.fP2Touched = false;
      this.hitNetSinceTouched = false;
      boolean var1 = false;
      boolean var2 = false;
      boolean var3 = false;
      this.gameOver = false;
      Graphics var4 = this.buffer.getGraphics();
      this.startTime = System.currentTimeMillis();
      this.method_rn_Slime1P_void_78();
      this.repaint();

      while(this.gameThread != null && !this.gameOver) {
         if(!this.paused) {
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.method_rn_Slime1P_i_90();
            this.method_rn_Slime1P_h_92();
            this.method_rn_Slime1P_byte_95();
            this.method_rn_Slime1P_goto_93();
            this.method_rn_Slime1P_if_91();
            this.method_rn_Slime1P_do_79();
            this.method_rn_Slime1P_g_100();
         }

         if(this.ballY < 35) {
            long var5 = System.currentTimeMillis();
            if(this.ballX > 500) {
               ++this.fP1PointsWon;
            } else {
               ++this.fP2PointsWon;
            }

            if(this.ballX > 500 || this.fP1Touches < 3 && (!this.hitNetSinceTouched || this.fP1Touches <= 0) && this.fP2Touched && (!this.fP1HitStill || this.fP1Touches <= 0)) {
               if(this.ballX > 500 && (this.fP2Touches >= 3 || this.hitNetSinceTouched && this.fP2Touches > 0 || !this.fP1Touched || this.fP2HitStill && this.fP2Touches > 0)) {
                  ++this.fP2Clangers;
                  var1 = true;
               }
            } else {
               ++this.fP1Clangers;
               var1 = true;
            }

            if(this.fP1Touched && !this.fP2Touched && this.ballX >= 500) {
               ++this.fP1Aces;
               var2 = true;
               this.gameScore += 200 * this.method_rn_Slime1P_case_108();
            } else if(this.fP2Touched && !this.fP1Touched && this.ballX < 500) {
               ++this.fP2Aces;
               var2 = true;
            } else if(this.ballX > 500 && this.fP1Touches > 0) {
               ++this.fP1Winners;
               var3 = true;
               this.gameScore += 100 * this.method_rn_Slime1P_case_108();
            } else if(this.ballX <= 500 && this.fP2Touches > 0) {
               ++this.fP2Winners;
               var3 = true;
            }

            if(this.ballX > 500 && !var3 && !var2) {
               this.gameScore += 50 * this.method_rn_Slime1P_case_108();
            }

            if(this.oneplayer) {
               this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
            } else {
               this.promptMsg = this.slimeColText[this.p1Col] + (this.ballX <= 500?"2 ":"1 ");
            }

            if(this.fP1PointsWon != 6 && this.fP2PointsWon != 6) {
               if(var2) {
                  this.promptMsg = this.promptMsg + "aces the serve!";
               } else if(var3) {
                  this.promptMsg = this.promptMsg + "scores a winner!";
               } else if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                  this.promptMsg = this.promptMsg + "laughs at his opponent\'s inability to serve!";
               } else if(this.fP1PointsWon == this.fP2PointsWon) {
                  this.promptMsg = this.promptMsg + "draws level!";
               } else if((this.ballX <= 500 || this.fP1PointsWon != this.fP2PointsWon + 1) && (this.ballX > 500 || this.fP1PointsWon + 1 != this.fP2PointsWon)) {
                  this.promptMsg = this.promptMsg + "scores!";
               } else {
                  this.promptMsg = this.promptMsg + "takes the lead!";
               }
            } else {
               this.promptMsg = this.promptMsg + "wins!";
            }

            int var7 = this.ballX;
            this.method_rn_Slime1P_int_96();
            this.method_rn_Slime1P_goto_93();
            this.method_rn_Slime1P_byte_95();
            var1 = false;
            var2 = false;
            var3 = false;
            this.mousePressed = false;
            this.method_rn_Slime1P_a_107(1500L, true);
            if(this.mousePressed) {
               this.method_rn_Slime1P_g_100();
               this.method_rn_Slime1P_f_101();
            }

            if(this.fP1PointsWon == 6 || this.fP2PointsWon == 6) {
               this.method_rn_Slime1P_a_102();
            }

            this.promptMsg = "";
            this.method_rn_Slime1P_for_80();
            this.ballX = var7 >= 500?200:800;
            this.method_rn_Slime1P_void_78();
            this.repaint();
            this.startTime += System.currentTimeMillis() - var5;
         }

         if(this.gameThread != null) {
            this.method_rn_Slime1P_a_107(20L, true);
         }
      }

      this.fEndGame = true;
      this.fInPlay = false;
      this.repaint();
   }

   // $FF: renamed from: a () void
   private void method_rn_Slime1P_a_102() {
      if(!this.oneplayer) {
         this.method_rn_Slime1P_a_103(this.fP1PointsWon > this.fP2PointsWon);
      } else if(this.fP1PointsWon == 6) {
         this.gameTime = System.currentTimeMillis() - this.startTime;
         if(this.fP1PointsWon == 6) {
            this.gameScore += 1000 * this.fP1PointsWon / (this.fP1PointsWon + this.fP2PointsWon) * this.method_rn_Slime1P_case_108();
            this.gameScore = (int)((long)this.gameScore + (this.gameTime < 300000L?300000L - this.gameTime:0L) / 1000L * (long)this.method_rn_Slime1P_case_108());
         }

         if(this.fP2PointsWon == 0) {
            this.gameScore += 1000 * this.method_rn_Slime1P_case_108();
         }

         if(this.aiMode == 4) {
            this.aiMode = 5;
            this.method_rn_Slime1P_if_104(true);
         }
      } else {
         this.method_rn_Slime1P_if_104(false);
      }

      this.fInPlay = false;
      this.gameThread = null;
      this.method_rn_Slime1P_void_78();
      this.repaint();
   }

   // $FF: renamed from: a (boolean) void
   private void method_rn_Slime1P_a_103(boolean var1) {
      FontMetrics var2 = this.screen.getFontMetrics();
      this.method_rn_Slime1P_goto_93();
      this.method_rn_Slime1P_byte_95();
      Graphics var3;
      if(this.buffered) {
         var3 = this.buffer.getGraphics();
      } else {
         var3 = this.getGraphics();
      }

      FontMetrics var4 = var3.getFontMetrics();
      var3.setColor(this.COURT_COL);
      String[] var5 = new String[]{"C\'mon player " + (var1?1:2) + ", I\'ll take you on!", "Inferior human controlled slime " + (var1?2:1) + " is insipid!", "Inferior human controlled slime " + (var1?2:1) + " is rubbish!", "Super inferior human controlled slime " + (var1?1:2) + " wins!", "You\'re both yellow cowards. Play me instead!"};
      String var6 = var5[(int)((double)var5.length * Math.random())];
      var3.fillRect((this.nWidth - var4.stringWidth(var6)) / 2 - 30, this.nHeight / 2 - var4.getAscent() * 5, var4.stringWidth(var6) + 60, var4.getAscent() * 5 + var2.getAscent() * 2);
      var3.setColor(Color.white);
      var3.drawString(var6, (this.nWidth - var4.stringWidth(var6)) / 2, this.nHeight / 2 - var4.getAscent() * 3);
      var3.setFont(this.screen.getFont());
      var3.drawString("GAME OVER", (this.nWidth - var2.stringWidth("GAME OVER")) / 2, this.nHeight / 2 + var2.getAscent());
      this.repaint();
      this.method_rn_Slime1P_a_107(3000L, false);
      this.gameOver = true;
   }

   // $FF: renamed from: if (boolean) void
   private void method_rn_Slime1P_if_104(boolean var1) {
      FontMetrics var2 = this.screen.getFontMetrics();
      this.method_rn_Slime1P_goto_93();
      this.method_rn_Slime1P_byte_95();
      Graphics var3;
      if(this.buffered) {
         var3 = this.buffer.getGraphics();
      } else {
         var3 = this.getGraphics();
      }

      FontMetrics var4 = var3.getFontMetrics();
      if(!var1) {
         var3.setColor(this.COURT_COL);
         var3.fillRect((this.nWidth - this.method_rn_Slime1P_a_106(var4.stringWidth(this.loserText1[this.aiMode]), var4.stringWidth(this.loserText2[this.aiMode]))) / 2 - 30, this.nHeight / 2 - var4.getAscent() * 5, this.method_rn_Slime1P_a_106(var4.stringWidth(this.loserText1[this.aiMode]), var4.stringWidth(this.loserText2[this.aiMode])) + 60, var4.getAscent() * 5 + var2.getAscent() * 2);
         var3.setColor(Color.white);
         var3.drawString(this.loserText1[this.aiMode], (this.nWidth - var4.stringWidth(this.loserText1[this.aiMode])) / 2, this.nHeight / 2 - var4.getAscent() * 3);
         var3.drawString(this.loserText2[this.aiMode], (this.nWidth - var4.stringWidth(this.loserText2[this.aiMode])) / 2, this.nHeight / 2 - var4.getAscent() * 2);
         var3.setFont(this.screen.getFont());
         var3.drawString("GAME OVER", (this.nWidth - var2.stringWidth("GAME OVER")) / 2, this.nHeight / 2 + var2.getAscent());
      } else {
         this.method_rn_Slime1P_a_105(var3);
         var3.setColor(Color.white);
         var3.setFont(this.screen.getFont());
         var3.drawString("YOU WIN!", (this.nWidth - var2.stringWidth("YOU WIN!")) / 2, this.nHeight / 2);
         var3.drawString("The Slimes bow down before the new Slime King!", (this.nWidth - var4.stringWidth("The Slimes bow down before the new Slime King!")) / 2, this.nHeight / 2 + var4.getAscent());
      }

      if(this.buffered) {
         this.repaint();
      }

      try {
         if(Class_rn_g_7.method_rn_g_a_66(this, (long)this.gameScore)) {
            new NameFrame(this, (long)this.gameScore, this.aiMode);
         }
      } catch (Exception var6) {
         ;
      }

      this.method_rn_Slime1P_a_107(3000L, false);
      this.gameOver = true;
      this.method_rn_Slime1P_void_78();
      this.repaint();
   }

   // $FF: renamed from: a (java.awt.Graphics) void
   private void method_rn_Slime1P_a_105(Graphics var1) {
   }

   // $FF: renamed from: a (int, int) int
   private int method_rn_Slime1P_a_106(int var1, int var2) {
      return var1 > var2?var1:var2;
   }

   // $FF: renamed from: a (long, boolean) void
   private void method_rn_Slime1P_a_107(long var1, boolean var3) {
      if(this.gameThread != null) {
         for(int var4 = 0; (long)var4 < var1 / 20L; ++var4) {
            try {
               Thread var10000 = this.gameThread;
               Thread.sleep(20L);
            } catch (InterruptedException var6) {
               ;
            }
         }
      }

   }

   // $FF: renamed from: case () int
   private int method_rn_Slime1P_case_108() {
      return (int)Math.pow(2.0D, (double)this.aiMode);
   }

   public void destroy() {
      if(this.gameThread != null) {
         this.gameThread.stop();
         this.gameThread = null;
      }

   }
}
