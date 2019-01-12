import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.ImageObserver;

public class BalancingPoleSlime extends Applet implements Runnable {
   private int nWidth;
   private int nHeight;
   private int p1Score;
   private int p2Score;
   private int p1X;
   private int p2X;
   private int p1Y;
   private int p2Y;
   private int p1Col;
   private int p2Col;
   private String[] slimeColText = new String[]{"Blue Slime", "Red Slime", "Green Slime", "Black Slime", "Yellow Slime", "Night Elves"};
   private Color darkRed = new Color(128, 0, 0);
   private Color darkGreen = new Color(0, 128, 0);
   private Color darkBlue = new Color(0, 0, 128);
   private Color[] slimaryCols;
   private Color[] secondaryCols;
   private int p1OldX;
   private int p2OldX;
   private int p1OldY;
   private int p2OldY;
   private int p1XV;
   private int p2XV;
   private int p1YV;
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
   private boolean fCanChangeCol;
   private boolean fInPlay;
   private int p1Blink;
   private int p2Blink;
   private boolean fP1Sticky;
   private boolean fP2Sticky;
   private boolean fP1Touched;
   private boolean fP2Touched;
   private int p1TouchingGoal;
   private int p2TouchingGoal;
   private Thread gameThread;
   private boolean fEndGame;
   private boolean fPlayOn;
   private int nScoreX;
   private long startTime;
   private long gameTime;
   private int scoringRun;
   private int frenzyCol;
   private int playOnTicks;
   private Image backBuffer;
   private final int SMILE_DIFF;
   private final int DAMPING;
   private final int MAX_TICKS_TOUCHING_GOAL;
   private int JUMPVEL;
   private int SLIMEVEL;
   private int GRAVITY;
   private int gameLength;
   int p1Fall;
   int p2Fall;
   int p1Stage;
   int p2Stage;
   int counting;
   int p1XVar;
   int p1YVar;
   int p2XVar;
   int p2YVar;
   int countTime;
   int turnLikely;
   int likelyness;
   int countDown;
   int NUM_PARTICLES;
   int[] particle_x;
   int[] particle_y;
   int[] particle_yv;
   int[] particle_xv;
   int totalDegrees;
   int[] p1EyeStageX;
   int[] p1EyeStageY;
   private boolean worldCup;
   private int worldCupRound;
   private boolean fExtraTime;
   private boolean fGoldenGoal;
   private boolean fSuperSlime;
   private boolean doubleBuffered;
   private int[] pointsX;
   private int[] pointsY;

   public void initStuff() {
      this.countDown = 100;
      this.turnLikely = 0;
      this.likelyness = 2;
      this.countTime = 0;
      this.counting = 1;
      this.p1Stage = 0;
      this.p2Stage = 0;
      this.p1Fall = 0;
      this.p2Fall = 0;
      this.fEndGame = true;
      this.p1X = 200;
      this.p1Y = 300;
      this.p2X = 800;
      this.p2Y = 300;
      this.p1XV = 0;
      this.p1YV = 0;
      this.p2XV = 0;
      this.p2YV = 0;
      this.p1Score = 0;
      this.p2Score = 0;
      this.ballOldX = this.ballX = 500;
      this.ballOldY = this.ballY = 200;
      this.ballVX = 0;
      this.ballVY = 0;
      this.replayStart = this.replayPos = 0;
      this.fP1Touched = this.fP2Touched = false;
      this.playOnTicks = 10;
      this.fPlayOn = false;
      this.fExtraTime = false;
      this.fGoldenGoal = false;
      this.JUMPVEL = !this.fSuperSlime?31:65;
      this.SLIMEVEL = !this.fSuperSlime?2:4;
      this.GRAVITY = !this.fSuperSlime?2:8;
   }

   private void drawButtons() {
      String[] buttons = new String[]{"1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"};
      FontMetrics fm = this.screen.getFontMetrics();
      Color darkBlue = new Color(0, 0, 128);

      for(int i = 0; i < 5; ++i) {
         this.screen.setColor(darkBlue);
         this.screen.fillRect((2 * i + 1) * this.nWidth / 10 - this.nWidth / 12, this.nHeight * 2 / 10, this.nWidth / 6, this.nHeight / 10);
         this.screen.setColor(Color.white);
         this.screen.drawString(buttons[i], (2 * i + 1) * this.nWidth / 10 - fm.stringWidth(buttons[i]) / 2, this.nHeight * 5 / 20 + fm.getHeight() / 2);
      }

      this.flip();
   }

   private boolean testButton(int x, int y) {
      for(int i = 0; i < 5; ++i) {
         if(x > (2 * i + 1) * this.nWidth / 10 - this.nWidth / 12 && x < (2 * i + 1) * this.nWidth / 10 + this.nWidth / 12 && y > this.nHeight * 2 / 10 && y < this.nHeight * 3 / 10) {
            if(i == 4) {
               this.gameLength = 120000;
               this.worldCup = true;
            } else {
               this.gameLength = (1 << i) * '\uea60';
               this.worldCup = false;
            }

            return true;
         }
      }

      return false;
   }

   public boolean handleEvent(Event event) {
      switch(event.id) {
      case 401:
      case 403:
         if(this.fCanChangeCol) {
            switch(event.key) {
            case 54:
               this.fSuperSlime = !this.fSuperSlime;
               this.repaint();
               break;
            case 73:
            case 105:
            case 1004:
               do {
                  this.p2Col = this.p2Col != 0?this.p2Col - 1:this.slimaryCols.length - 1;
               } while(this.p1Col == this.p2Col);

               this.drawScores();
               this.repaint();
               break;
            case 75:
            case 107:
            case 1005:
               do {
                  this.p2Col = this.p2Col == this.slimaryCols.length - 1?0:this.p2Col + 1;
               } while(this.p2Col == this.p1Col);

               this.drawScores();
               this.repaint();
               break;
            case 83:
            case 115:
               do {
                  this.p1Col = this.p1Col == this.slimaryCols.length - 1?0:this.p1Col + 1;
               } while(this.p1Col == this.p2Col);

               this.drawScores();
               this.repaint();
               break;
            case 87:
            case 119:
               while(true) {
                  this.p1Col = this.p1Col != 0?this.p1Col - 1:this.slimaryCols.length - 1;
                  if(this.p1Col != this.p2Col) {
                     this.drawScores();
                     this.repaint();
                     break;
                  }
               }
            }
         }

         if(!this.fEndGame) {
            switch(event.key) {
            case 32:
               this.mousePressed = true;
               return false;
            case 65:
            case 97:
               this.p1Stage += this.SLIMEVEL;
               return false;
            case 66:
            case 98:
               this.toggleBuffering();
               return false;
            case 68:
            case 100:
               this.p1Stage -= this.SLIMEVEL;
               return false;
            case 74:
            case 106:
            case 1006:
               if(!this.worldCup) {
                  this.p2Stage += this.SLIMEVEL;
               }

               return false;
            case 76:
            case 108:
            case 1007:
               if(!this.worldCup) {
                  this.p2Stage -= this.SLIMEVEL;
               }
            }
         }
         break;
      case 402:
      case 404:
         switch(event.key) {
         case 65:
         case 68:
         case 74:
         case 76:
         case 97:
         case 100:
         case 106:
         case 108:
         case 1006:
         case 1007:
         default:
            return false;
         }
      case 501:
         this.mousePressed = true;
         if(!this.fInPlay && this.testButton(event.x, event.y)) {
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
            this.ballX = 500;
            this.ballY = 200;
            this.ballOldX = 500;
            this.ballOldY = 200;
            this.ballVX = 0;
            this.ballVY = 0;
            this.p1Score = 0;
            this.p2Score = 0;
            this.promptMsg = "";
            this.paint(this.getGraphics());

            try {
               Thread.sleep(100L);
            } catch (Exception var4) {
               ;
            }

            this.gameThread = new Thread(this);
            this.gameThread.start();
         }
         break;
      case 503:
         this.showStatus("Slime Volleyball 2-Player: Soccer Slime, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
         this.requestFocus();
      }

      return false;
   }

   private void DrawSlimers() {
      this.screen.setColor(Color.blue);
      this.screen.fillRect(0, 20, this.nWidth, 4 * this.nHeight / 5 - 20);
      this.screen.setColor(new Color(0, 0, 128));
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6 - 10, this.nWidth, this.nHeight / 5 - 10 + 20);
      int k1 = this.nWidth / 10;
      int j2 = this.nHeight / 10;
      int i3 = this.nWidth / 50;
      int j3 = this.nHeight / 25;
      int k3 = this.ballX * this.nWidth / 1000;
      int l3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int i = this.p1OldX * this.nWidth / 1000 - k1 / 2;
      int l = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      i = this.p2OldX * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.p2XVar = i;
      this.p2YVar = l;
      if(!this.fEndGame) {
         this.MoveBall();
      }

      i = this.p1X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.p1XVar = i;
      this.p1YVar = l;
      this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p1Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
      this.screen.fillArc(i, l, k1, 2 * j2, this.p1Stage, 180);
      this.screen.setColor(new Color(0, 0, 128));
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6 - 10, this.nWidth, this.nHeight / 5 - 10 + 20);
      int l4 = this.p1X + 38;
      int i5 = this.p1Y - 60;
      i = l4 * this.nWidth / 1000;
      l = 7 * this.nHeight / 10 - i5 * this.nHeight / 1000;
      int i4 = i - k3;
      int j4 = l - l3;
      int k4 = (int)Math.sqrt((double)(i4 * i4 + j4 * j4));
      boolean flag = Math.random() < 0.01D;
      if(flag) {
         this.p1Blink = 5;
      }

      int random;
      int random3;
      int random4;
      if(this.p1Blink == 0) {
         random = this.p1Stage;
         if(random < 0) {
            random = 360 + this.p1Stage;
         }

         random3 = this.nWidth / 50 + this.p1EyeStageX[random];
         random4 = this.nHeight / 25 + this.p1EyeStageY[random];
         this.screen.setColor(Color.white);
         this.screen.fillOval(i - random3, l - random4, i3, j3);
         if(k4 > 0 && !flag) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(i + 5 - random3, l + 5 - random4, i3 / 2, j3 / 2);
         }
      } else {
         --this.p1Blink;
      }

      int j1;
      int k5;
      if(this.p1Score > this.p2Score + 2) {
         random = this.p1X * this.nWidth / 1000;
         random3 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         random4 = this.nWidth / 20;
         j1 = this.nHeight / 20;
         k5 = 0;

         do {
            this.screen.setColor(Color.black);
            this.screen.drawArc(random, random3 + k5, random4, j1, -30, -150);
            ++k5;
         } while(k5 < 3);
      }

      i = this.p2X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p2Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
      this.screen.fillArc(i, l, k1, 2 * j2, this.p2Stage, 180);
      this.screen.setColor(new Color(0, 0, 128));
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6 - 10, this.nWidth, this.nHeight / 5 - 10 + 20);
      l4 = this.p2X - 18;
      i5 = this.p2Y - 60;
      i = l4 * this.nWidth / 1000;
      l = 7 * this.nHeight / 10 - i5 * this.nHeight / 1000;
      i4 = i - k3;
      j4 = l - l3;
      k4 = (int)Math.sqrt((double)(i4 * i4 + j4 * j4));
      flag = Math.random() < 0.01D;
      if(flag) {
         this.p2Blink = 5;
      }

      if(this.p2Blink == 0) {
         random = this.p2Stage;
         if(random < 0) {
            random = 360 + this.p2Stage;
         }

         random3 = this.nWidth / 50 - 30 + this.p1EyeStageX[random];
         random4 = this.nHeight / 25 + this.p1EyeStageY[random];
         this.screen.setColor(!flag?Color.white:Color.gray);
         this.screen.fillOval(i - random3, l - random4, i3, j3);
         if(k4 > 0 && !flag) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(i + 5 - random3, l + 5 - random4, i3 / 2, j3 / 2);
         }
      } else {
         --this.p2Blink;
      }

      if(this.p2Score > this.p1Score + 2) {
         random = this.nWidth / 20;
         random3 = this.nHeight / 20;
         random4 = this.p2X * this.nWidth / 1000 - random;
         j1 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
         k5 = 0;

         do {
            this.screen.setColor(Color.black);
            this.screen.drawArc(random4, j1 + k5, random, random3, -10, -150);
            ++k5;
         } while(k5 < 3);
      }

      this.screen.setColor(Color.orange);
      this.screen.fillOval(115, 145, 10, 10);
      this.screen.fillOval(475, 145, 10, 10);
      if(this.counting == 1) {
         random = (int)(Math.random() * 3.0D);
         if(random == 1) {
            random3 = (int)(Math.random() * 2.0D);
            if(random3 == 1) {
               this.p1Stage += this.SLIMEVEL * this.likelyness;
            }

            if(random3 == 0) {
               this.p1Stage -= this.SLIMEVEL * this.likelyness;
            }
         }

         random3 = (int)(Math.random() * 3.0D);
         if(random3 == 1) {
            random4 = (int)(Math.random() * 2.0D);
            if(random4 == 1) {
               this.p2Stage += this.SLIMEVEL * this.likelyness;
            }

            if(random4 == 0) {
               this.p2Stage -= this.SLIMEVEL * this.likelyness;
            }
         }
      }

      if((this.p1Stage < -60 || this.p1Stage > 60) && this.counting == 1) {
         this.counting = 0;
         this.p1Fall = 1;
         ++this.p2Score;
      }

      if((this.p2Stage < -60 || this.p2Stage > 60) && this.counting == 1) {
         this.counting = 0;
         this.p2Fall = 1;
         ++this.p1Score;
      }

      this.drawScores();
      if(this.p1Fall == 1) {
         this.p1Y -= 16;
      }

      if(this.p2Fall == 1) {
         this.p2Y -= 16;
      }

      if(this.p1Fall == 1 && this.p1Y <= 0) {
         this.updateParticles();
         this.drawParticles();
      }

      if(this.p2Fall == 1 && this.p2Y <= 0) {
         this.updateParticles();
         this.drawParticles();
      }

      this.screen.setColor(new Color(0, 0, 128));
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6 - 10, this.nWidth, this.nHeight / 5 - 10 + 20);
      ++this.turnLikely;
      if(this.turnLikely > 100 && this.turnLikely < 200) {
         this.likelyness = 2;
      }

      if(this.turnLikely > 200 && this.turnLikely < 300) {
         this.likelyness = 3;
      }

      if(this.turnLikely > 300 && this.turnLikely < 400) {
         this.likelyness = 4;
      }

      if(this.turnLikely > 400 && this.turnLikely < 500) {
         this.likelyness = 5;
      }

      if(this.turnLikely > 500 && this.turnLikely < 600) {
         this.likelyness = 6;
      }

      if(this.turnLikely > 600 && this.turnLikely < 700) {
         this.likelyness = 7;
      }

      if(this.turnLikely > 700 && this.turnLikely < 800) {
         this.likelyness = 9;
      }

      if(this.turnLikely > 800 && this.turnLikely < 900) {
         this.likelyness = 10;
      }

      if(this.turnLikely > 900 && this.turnLikely < 1000) {
         this.likelyness = 12;
      }

      if(this.turnLikely > 1000 && this.turnLikely < 1100) {
         this.likelyness = 15;
      }

      if(this.turnLikely > 1100 && this.turnLikely < 1200) {
         this.likelyness = 18;
      }

      if(this.turnLikely > 1200 && this.turnLikely < 1300) {
         this.likelyness = 20;
      }

      if(this.turnLikely > 1300) {
         this.likelyness = 20;
      }

   }

   public void paint(Graphics g) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      this.screen.setColor(Color.gray);
      this.screen.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      this.screen.setColor(Color.white);
      this.drawScores();
      if(!this.fInPlay) {
         this.DrawSlimers();
         this.drawButtons();
      }

      this.DrawGoals();
      this.drawPrompt();
      if(!this.fInPlay) {
         FontMetrics fontmetrics = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         if(this.fSuperSlime) {
            this.screen.drawString("Super Balancing Pole Slime!", this.nWidth / 2 - fontmetrics.stringWidth("Super Soccer Slime!") / 2, this.nHeight / 2 - fontmetrics.getHeight());
         } else {
            this.screen.drawString("Balancing Pole Slime!", this.nWidth / 2 - fontmetrics.stringWidth("Soccer Slime!") / 2, this.nHeight / 2 - fontmetrics.getHeight());
         }

         this.screen.setColor(Color.white);
         fontmetrics = this.screen.getFontMetrics();
         this.screen.drawString("Written by Quin Pendragon + Anonymous Tipster", this.nWidth / 2 - fontmetrics.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + fontmetrics.getHeight() * 2);
      }

      this.flip();
   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   private void ReplayFrame(int i, int j, int k, int l, int i1, boolean flag) {
      if(flag) {
         this.ballX = -1000;
         this.ballOldX = 500;
         this.ballY = -1000;
         this.ballOldY = 500;
         this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
      } else {
         int j1 = i == 0?199:i - 1;
         this.p1OldX = this.replayData[j1][0];
         this.p1OldY = this.replayData[j1][1];
         this.p2OldX = this.replayData[j1][2];
         this.p2OldY = this.replayData[j1][3];
         if(i == 0) {
            this.ballOldX = 500;
            this.ballOldY = 200;
         } else {
            this.ballOldX = this.replayData[j1][4];
            this.ballOldY = this.replayData[j1][5];
         }
      }

      this.p1X = this.replayData[i][0];
      this.p1Y = this.replayData[i][1];
      this.p2X = this.replayData[i][2];
      this.p2Y = this.replayData[i][3];
      this.ballX = this.replayData[i][4];
      this.ballY = this.replayData[i][5];
      this.p1Col = this.replayData[i][6];
      this.p2Col = this.replayData[i][7];
      this.ballVX = 0;
      this.ballVY = 1;
      if(i / 10 % 2 > 0) {
         this.screen.setColor(Color.red);
         this.screen.drawString("Replay...", j, k);
      } else {
         this.screen.setColor(Color.blue);
         this.screen.fillRect(j, k - i1, l, i1 * 2);
      }

      this.DrawSlimers();
      this.DrawGoals();

      try {
         Thread.sleep(20L);
      } catch (InterruptedException var9) {
         ;
      }
   }

   private String MakeTime(long l) {
      long l1 = l / 10L % 100L;
      long l2 = l / 1000L % 60L;
      long l3 = l / 60000L % 60L;
      String s = "";
      if(l3 < 10L) {
         s = s + "0";
      }

      s = s + l3;
      s = s + ":";
      if(l2 < 10L) {
         s = s + "0";
      }

      s = s + l2;
      s = s + ":";
      if(l1 < 10L) {
         s = s + "0";
      }

      s = s + l1;
      return s;
   }

   private void MoveSlimers() {
      if(this.worldCup) {
         switch(this.worldCupRound) {
         case 0:
            this.controlP2v0();
            break;
         case 1:
            this.controlP2v1();
            break;
         case 2:
            this.controlP2v2();
            break;
         case 3:
            this.controlP2v3();
         }
      }

   }

   public BalancingPoleSlime() {
      this.slimaryCols = new Color[]{Color.cyan, Color.red, Color.green, Color.black, Color.yellow, Color.blue};
      this.secondaryCols = new Color[]{Color.cyan, Color.red, Color.green, Color.black, Color.yellow, Color.blue};
      this.frenzyCol = 0;
      this.SMILE_DIFF = 2;
      this.DAMPING = 7;
      this.MAX_TICKS_TOUCHING_GOAL = 60;
      this.p1Fall = 0;
      this.p2Fall = 0;
      this.p1Stage = 0;
      this.p2Stage = 0;
      this.counting = 1;
      this.p1XVar = 0;
      this.p1YVar = 0;
      this.p2XVar = 0;
      this.p2YVar = 0;
      this.countTime = 0;
      this.turnLikely = 0;
      this.likelyness = 1;
      this.countDown = 100;
      this.NUM_PARTICLES = 100;
      this.particle_x = new int[this.NUM_PARTICLES];
      this.particle_y = new int[this.NUM_PARTICLES];
      this.particle_yv = new int[this.NUM_PARTICLES];
      this.particle_xv = new int[this.NUM_PARTICLES];
      this.totalDegrees = 360;
      this.p1EyeStageX = new int[]{1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 22, 23, 23, 23, 24, 24, 24, 25, 25, 25, 26, 26, 26, 27, 27, 27, 28, 28, 28, 29, 29, 29, 30, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 38, 38, 38, 38, 38, 39, 39, 39, 39, 39, 40, 40, 40, 40, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 41, 41, 41, 41, 41, 40, 40, 40, 40, 39, 39, 39, 39, 38, 38, 38, 38, 37, 37, 37, 37, 36, 36, 36, 35, 35, 35, 35, 34, 34, 34, 34, 33, 33, 33, 32, 32, 32, 31, 31, 31, 30, 30, 29, 29, 28, 28, 27, 27, 26, 26, 25, 25, 24, 24, 23, 23, 22, 22, 21, 21, 20, 20, 19, 19, 18, 18, 17, 17, 16, 16, 15, 15, 14, 14, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0, 0, -1, -1, -2, -2, -3, -3, -4, -4, -5, -5, -6, -6, -7, -7, -8, -8, -9, -9, -9, -9, -10, -10, -20, -10, -10, -10, -10, -10, -10, -10, -10, -10, -11, -11, -11, -11, -11, -11, -11, -11, -11, -11, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -12, -11, -11, -11, -11, -11, -11, -11, -11, -11, -10, -10, -10, -10, -10, -10, -10, -10, -9, -9, -9, -9, -9, -9, -9, -8, -8, -8, -8, -8, -8, -8, -8, -7, -7, -7, -7, -7, -6, -6, -6, -6, -6, -6, -5, -5, -5, -5, -5, -5, -4, -4, -4, -4, -3, -3, -3, -3, -2, -2, -2, -2, -1, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5};
      this.p1EyeStageY = new int[]{1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -2, -2, -2, -2, -2, -3, -3, -3, -3, -3, -4, -4, -4, -4, -4, -5, -5, -5, -5, -5, -6, -6, -6, -6, -6, -7, -7, -7, -7, -7, -8, -8, -8, -8, -8, -9, -9, -9, -9, -9, -10, -10, -10, -10, -10, -11, -11, -11, -11, -11, -12, -12, -12, -12, -13, -13, -13, -13, -14, -14, -14, -14, -15, -15, -15, -15, -16, -16, -16, -16, -17, -17, -17, -17, -18, -18, -18, -19, -19, -19, -20, -20, -21, -21, -22, -22, -23, -23, -24, -24, -25, -25, -26, -26, -27, -27, -28, -28, -29, -29, -30, -30, -31, -31, -32, -32, -33, -33, -34, -34, -35, -35, -35, -36, -36, -36, -37, -37, -37, -37, -38, -38, -39, -39, -40, -40, -40, -40, -39, -39, -39, -39, -39, -39, -38, -38, -38, -38, -38, -38, -37, -37, -37, -37, -37, -37, -36, -36, -36, -36, -36, -36, -35, -35, -35, -35, -35, -35, -34, -34, -34, -34, -34, -34, -33, -33, -33, -33, -33, -33, -32, -32, -32, -32, -32, -32, -31, -31, -31, -31, -31, -31, -30, -30, -30, -30, -30, -30, -30, -29, -29, -29, -29, -28, -28, -28, -28, -28, -27, -27, -27, -27, -27, -26, -26, -26, -26, -25, -25, -25, -25, -25, -24, -24, -24, -24, -23, -23, -23, -23, -22, -22, -22, -22, -21, -21, -21, -21, -20, -20, -20, -20, -19, -19, -19, -18, -18, -18, -18, -17, -17, -17, -17, -16, -16, -16, -16, -15, -15, -15, -15, -15, -14, -14, -14, -14, -13, -13, -13, -12, -12, -12, -12, -11, -11, -11, -11, -10, -10, -10, -10, -9, -9, -8, -8, -8, -7, -7, -6, -6, -6, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5, -5};
      this.worldCup = false;
      this.worldCupRound = 0;
      this.pointsX = new int[4];
      this.pointsY = new int[4];
      this.p2Col = 1;
      this.replayData = new int[200][8];
   }

   private void MoveBall() {
   }

   private void DrawGoals() {
   }

   private void DrawStatus() {
      Graphics g = this.screen;
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      String s = null;
      String time = this.MakeTime(this.gameTime);
      int i = this.nHeight / 20;
      int k = 0;
      int kt = fontmetrics.stringWidth(time);
      if(this.worldCup) {
         switch(this.worldCupRound) {
         case 1:
            s = "Quarter Finals";
            break;
         case 2:
            s = "Semi-Finals";
            break;
         case 3:
            s = "Final";
            break;
         default:
            s = "Qualifying";
         }

         if(this.fGoldenGoal) {
            s = s + " [Golden Goal]";
         } else if(this.fExtraTime) {
            s = s + " [Extra Time]";
         }

         k = fontmetrics.stringWidth(s);
      }

      int mw = k <= kt?kt:k;
      g.setColor(Color.blue);
      g.fillRect(this.nWidth / 2 - mw / 2 - 5, 0, mw + 10, i + 22);
      g.setColor(Color.white);
      this.screen.drawString(time, this.nWidth / 2 - kt / 2, fontmetrics.getAscent() + 20);
      if(s != null) {
         this.screen.drawString(s, this.nWidth / 2 - k / 2, fontmetrics.getAscent() + 20 - fontmetrics.getHeight());
      }

   }

   public void drawPrompt() {
      this.screen.setColor(new Color(0, 0, 128));
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6 - 10, this.nWidth, this.nHeight / 5 - 10 + 20);
      this.drawPrompt(this.promptMsg, 0);
   }

   public void drawPrompt(String s, int i) {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      this.screen.setColor(Color.lightGray);
      this.screen.drawString(s, (this.nWidth - fontmetrics.stringWidth(s)) / 2, this.nHeight * 4 / 5 + fontmetrics.getHeight() * (i + 1) + 10);
   }

   private void promptBox(String msg1, String msg2) {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int len1 = fontmetrics.stringWidth(msg1);
      int len2 = fontmetrics.stringWidth(msg2);
      int maxlen = len1 <= len2?len2:len1;
      this.screen.setColor(Color.darkGray);
      this.screen.fillRect(this.nWidth / 2 - maxlen / 2 - 20, this.nHeight * 2 / 5, maxlen + 40, this.nHeight / 5);
      this.screen.setColor(Color.white);
      this.screen.drawString(msg1, this.nWidth / 2 - len1 / 2, this.nHeight * 9 / 20);
      this.screen.drawString(msg2, this.nWidth / 2 - len2 / 2, this.nHeight * 11 / 20);
      this.flip();
   }

   private void SaveReplayData() {
      this.replayData[this.replayPos][0] = this.p1X;
      this.replayData[this.replayPos][1] = this.p1Y;
      this.replayData[this.replayPos][2] = this.p2X;
      this.replayData[this.replayPos][3] = this.p2Y;
      this.replayData[this.replayPos][4] = this.ballX;
      this.replayData[this.replayPos][5] = this.ballY;
      this.replayData[this.replayPos][6] = this.p1Col;
      this.replayData[this.replayPos][7] = this.p2Col;
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

   private void drawScores() {
      Graphics g = this.screen;
      int k = this.nHeight / 20;
      FontMetrics fm = this.screen.getFontMetrics();
      int i = fm.stringWidth("Replay...");
      g.setColor(Color.blue);
      g.fillRect(0, 0, this.nWidth, k + 22);
      g.setColor(Color.white);
      g.drawString(this.slimeColText[this.p1Col] + " : " + this.p1Score, this.nWidth / 20, k);
      String p2ScrStr = this.p2Score + " : " + this.slimeColText[this.p2Col];
      g.drawString(p2ScrStr, this.nWidth - this.nWidth / 20 - fm.stringWidth(p2ScrStr), k);
   }

   public boolean checkScored() {
      if(this.ballY >= 200 || this.ballX >= 40 && this.ballX <= 960) {
         return false;
      } else {
         this.nScoreX = this.ballX;
         this.fPlayOn = true;
         this.playOnTicks = 10;
         return true;
      }
   }

   public void run() {
      this.worldCupRound = 0;

      do {
         this.initStuff();
         this.replayPos = this.replayStart = 0;
         this.scoringRun = 0;
         this.fP1Touched = this.fP2Touched = false;
         this.gameTime = 0L;
         this.startTime = System.currentTimeMillis();
         this.fEndGame = false;
         this.fCanChangeCol = false;
         this.mousePressed = false;
         this.gameTime = (long)this.gameLength;
         this.fInPlay = true;
         this.fEndGame = false;
         String l;
         if(this.worldCup) {
            this.paint(this.getGraphics());

            do {
               this.p2Col = (int)(Math.random() * (double)this.slimaryCols.length / 4.0D) + this.worldCupRound * this.slimaryCols.length / 4;
            } while(this.p1Col == this.p2Col);

            l = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
            switch(this.worldCupRound) {
            case 0:
               this.promptBox("Qualifying Round", l);
               this.gameLength = 30000;
               break;
            case 1:
               this.promptBox("Quarter Finals", l);
               this.gameLength = 120000;
               break;
            case 2:
               this.promptBox("Semi-Finals", l);
               this.gameLength = 120000;
               break;
            case 3:
               this.promptBox("World Cup Final", l);
               this.gameLength = 300000;
            }

            try {
               Thread.sleep(4000L);
            } catch (Exception var5) {
               ;
            }

            this.repaint();
            this.flip();
         }

         while(this.gameTime > 0L || this.worldCup && this.worldCupRound > 0 && this.p1Score == this.p2Score) {
            this.gameTime = this.startTime + (long)this.gameLength - System.currentTimeMillis();
            if(this.gameTime < 0L) {
               this.gameTime = 0L;
            }

            if(this.worldCup && !this.fExtraTime && this.gameTime <= 0L && this.worldCupRound > 0 && this.p1Score == this.p2Score) {
               l = this.p1Score != 0?" " + this.p1Score:" nil";
               this.promptBox("The score is " + this.slimeColText[this.p1Col] + l + ", " + this.slimeColText[this.p2Col] + l + ".", "And the game goes into extra time...");

               try {
                  Thread.sleep(4000L);
               } catch (Exception var10) {
                  ;
               }

               this.repaint();
               this.flip();
               this.startTime += 30000L;
               this.gameTime += 30000L;
               this.fExtraTime = true;
            } else if(this.gameTime <= 0L && this.fExtraTime && !this.fGoldenGoal && this.p1Score == this.p2Score) {
               this.fGoldenGoal = true;
               l = this.p1Score != 0?" " + this.p1Score:" nil";
               this.promptBox("The score is " + this.slimeColText[this.p1Col] + l + ", " + this.slimeColText[this.p2Col] + l + ", and the game goes into Golden Goal.", "The next player to score will win the match!");

               try {
                  Thread.sleep(4000L);
               } catch (Exception var9) {
                  ;
               }

               this.repaint();
               this.flip();
            }

            this.SaveReplayData();
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.MoveSlimers();
            this.DrawSlimers();
            this.DrawGoals();
            this.DrawStatus();
            this.flip();
            if(this.p1X < 150) {
               ++this.p1TouchingGoal;
            } else {
               this.p1TouchingGoal = 0;
            }

            if(this.p2X > 850) {
               ++this.p2TouchingGoal;
            } else {
               this.p2TouchingGoal = 0;
            }

            if(this.fPlayOn) {
               --this.playOnTicks;
            } else {
               this.fPlayOn = this.checkScored();
            }

            if(this.playOnTicks == 0 || this.p1TouchingGoal > 60 || this.p2TouchingGoal > 60) {
               long var11 = System.currentTimeMillis();
               if(this.p1TouchingGoal > 60) {
                  ++this.p2Score;
                  this.promptMsg = this.slimeColText[this.p1Col] + " pinged for goal hanging!";
               } else if(this.p2TouchingGoal > 60) {
                  ++this.p1Score;
                  this.promptMsg = this.slimeColText[this.p2Col] + " pinged for goal hanging!";
               } else if(this.nScoreX < 500) {
                  ++this.p2Score;
                  this.promptMsg = this.slimeColText[this.p2Col] + " Scores!";
               } else {
                  ++this.p1Score;
                  this.promptMsg = this.slimeColText[this.p1Col] + " Scores!";
               }

               this.drawPrompt();
               this.drawPrompt("Click mouse for replay...", 1);
               this.flip();
               this.mousePressed = false;
               if(this.gameThread != null) {
                  try {
                     Thread.sleep(2500L);
                  } catch (InterruptedException var8) {
                     ;
                  }
               }

               if(this.mousePressed) {
                  this.SaveReplayData();
                  this.DoReplay();
               }

               this.promptMsg = "";
               this.drawPrompt();
               this.playOnTicks = 10;
               this.fPlayOn = false;
               this.startTime += System.currentTimeMillis() - var11;
               this.ballX = 490 + (int)(Math.random() * 20.0D);
               this.ballY = 190 + (int)(Math.random() * 20.0D);
               this.ballVX = 0;
               this.ballVY = 0;
               this.p1X = 200;
               this.p1Y = 0;
               this.p1YV = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p2YV = 0;
               this.replayStart = this.replayPos = 0;
               this.repaint();
            }

            if(this.gameThread != null) {
               try {
                  if(this.fPlayOn) {
                     Thread.sleep(120L);
                  } else {
                     Thread.sleep(20L);
                  }
               } catch (InterruptedException var7) {
                  ;
               }
            }
         }

         this.fEndGame = true;
         if(this.fPlayOn) {
            if(this.nScoreX < 500) {
               ++this.p2Score;
               this.promptMsg = this.slimeColText[this.p2Col] + " scores at the final whistle!";
            } else {
               ++this.p1Score;
               this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
            }

            this.drawPrompt();
         } else {
            this.drawPrompt("And that\'s the final whistle!", 0);
         }

         if(this.worldCup) {
            if(this.p1Score == this.p2Score) {
               this.drawPrompt("It\'s a draw at full time, here at Slime Stadium!", 1);
               this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
               this.worldCup = false;
               this.flip();
            } else if(this.p1Score >= this.p2Score) {
               switch(this.worldCupRound) {
               case 0:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " qualifies for the world cup!", 1);
                  break;
               case 1:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                  break;
               case 2:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                  break;
               case 3:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " wins the WORLD CUP!!!!!", 1);
               }

               if(this.worldCupRound == 3) {
                  this.worldCup = false;
                  this.promptBox("You win the world cup!!!", "Congratulations!");
               } else {
                  ++this.worldCupRound;
               }
            } else {
               switch(this.worldCupRound) {
               case 0:
               case 1:
                  this.promptBox("You have been eliminated.", "Goodbye.");
                  break;
               case 2:
                  this.promptBox("You have been knocked out of the semifinals.", "You played well.");
                  break;
               case 3:
                  this.promptBox("You came second.", "Are you satisfied with that?");
               }

               this.worldCup = false;
            }
         } else if(this.p1Score == this.p2Score) {
            this.drawPrompt("It\'s a draw at full time, here at Slime Stadium!", 1);
         } else if(this.p1Score < this.p2Score) {
            this.drawPrompt(this.slimeColText[this.p2Col] + " (" + this.p2Score + ")    def. " + this.slimeColText[this.p1Col] + " (" + this.p1Score + ")", 1);
         } else {
            this.drawPrompt(this.slimeColText[this.p1Col] + " (" + this.p1Score + ")    def. " + this.slimeColText[this.p2Col] + " (" + this.p2Score + ")", 1);
         }

         this.flip();

         try {
            Thread.sleep(5000L);
         } catch (InterruptedException var6) {
            ;
         }

         this.initStuff();
      } while(this.worldCup);

      this.fCanChangeCol = true;
      this.fInPlay = false;
      this.repaint();
   }

   public void init() {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.fInPlay = this.fEndGame = false;
      this.fCanChangeCol = true;
      this.initStuff();
      this.promptMsg = "Click on an option to play...";
      this.backBuffer = this.createImage(this.nWidth, this.nHeight);
      this.screen = this.getGraphics();
      this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
   }

   private void toggleBuffering() {
      if(this.doubleBuffered = !this.doubleBuffered) {
         this.screen = this.backBuffer.getGraphics();
         this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
      } else {
         this.screen = this.getGraphics();
         this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
      }

      this.repaint();
   }

   private void DoReplay() {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int i = fontmetrics.stringWidth("Replay...");
      int j = fontmetrics.getHeight();
      int k = this.nWidth / 2 - i / 2;
      int l = this.nHeight / 2 - j;
      this.promptMsg = "Click the mouse to continue...";
      this.mousePressed = false;
      int i1 = this.replayPos - 1;

      while(!this.mousePressed) {
         ++i1;
         if(i1 >= 200) {
            i1 = 0;
         }

         if(i1 == this.replayPos) {
            try {
               Thread.sleep(1000L);
            } catch (InterruptedException var9) {
               ;
            }

            i1 = this.replayStart;
            this.paint(this.getGraphics());
         }

         this.ReplayFrame(i1, k, l, i, j, false);
         this.flip();
      }

      this.promptMsg = "";
      this.paint(this.getGraphics());
   }

   private void updateParticles() {
      --this.countDown;
      if(this.countDown < 1) {
         this.gameTime = 0L;
      }

      for(int i = 0; i < this.NUM_PARTICLES; ++i) {
         --this.gameTime;
         int incrY = (int)(Math.random() * 4.0D + 1.0D);
         int incrX = (int)(Math.random() * 4.0D + 1.0D);
         int incr2 = (int)(Math.random() * 2.0D + 1.0D);
         int randY = (int)(Math.random() * 30.0D + 1.0D);
         int randX = (int)(Math.random() * 50.0D + 1.0D);
         this.particle_y[i] += this.particle_yv[i];
         this.particle_x[i] += this.particle_xv[i];
         ++this.particle_yv[i];
         if(this.p1Fall == 1 && (this.particle_y[i] > 240 || this.particle_y[i] < 60)) {
            this.particle_x[i] = this.p1XVar + randX;
            this.particle_y[i] = this.p1YVar + 20;
            this.particle_yv[i] = -1 - randY;
            if(incr2 == 1) {
               this.particle_xv[i] = -1 - incrX;
            }

            if(incr2 == 2) {
               this.particle_xv[i] = 1 + incrX;
            }
         }

         if(this.p2Fall == 1 && (this.particle_y[i] > 240 || this.particle_y[i] < 60)) {
            this.particle_x[i] = this.p2XVar + randX;
            this.particle_y[i] = this.p2YVar + 20;
            this.particle_yv[i] = -1 - randY;
            if(incr2 == 1) {
               this.particle_xv[i] = -1 - incrX;
            }

            if(incr2 == 2) {
               this.particle_xv[i] = 1 + incrX;
            }
         }
      }

   }

   private void drawParticles() {
      short r = 250;
      short g = 250;
      short b = 250;

      for(int i = 0; i < this.NUM_PARTICLES; ++i) {
         int cr = 1 * (int)(Math.random() * 3.0D + 1.0D);
         if(cr == 1) {
            r = 255;
            g = 255;
            b = 255;
         }

         if(cr == 2) {
            r = 200;
            g = 100;
            b = 255;
         }

         this.screen.setColor(new Color(r, g, b));
         this.screen.fillOval(this.particle_x[i], this.particle_y[i], 3, 3);
      }

   }

   private void flip() {
      if(this.doubleBuffered) {
         this.getGraphics().drawImage(this.backBuffer, 0, 0, (ImageObserver)null);
      }

   }

   private int getBallBounceX() {
      int t = this.ballVY + (int)Math.sqrt((double)(this.ballVY * this.ballVY + 2 * this.ballY));
      int ballBounceX = this.ballX + t * this.ballVX;
      if(ballBounceX < 0) {
         ballBounceX = -ballBounceX;
      }

      if(ballBounceX > 1000) {
         ballBounceX = 1000 - ballBounceX;
      }

      return ballBounceX;
   }

   private int getBallMaxY() {
      return this.ballVY < 0?this.ballY:this.ballY + this.ballVY * this.ballVY / 2;
   }

   private void controlP2v0() {
      if(this.p2Stage > 50) {
         this.p2Stage -= this.SLIMEVEL;
      }

      if(this.p2Stage < -50) {
         this.p2Stage += this.SLIMEVEL;
      }

   }

   private void controlP2v1() {
      if(this.p2Stage > 40) {
         this.p2Stage -= this.SLIMEVEL;
      }

      if(this.p2Stage < -40) {
         this.p2Stage += this.SLIMEVEL;
      }

   }

   private void controlP2v2() {
      if(this.p2Stage > 30) {
         this.p2Stage -= this.SLIMEVEL;
      }

      if(this.p2Stage < -30) {
         this.p2Stage += this.SLIMEVEL;
      }

   }

   private void controlP2v3() {
      if(this.p2Stage > 20) {
         this.p2Stage -= this.SLIMEVEL;
      }

      if(this.p2Stage < -20) {
         this.p2Stage += this.SLIMEVEL;
      }

   }

   // $FF: renamed from: p (java.lang.String) void
   private void method_rn_BalancingPoleSlime_p_1(String s) {
      System.out.println(s);
   }
}
