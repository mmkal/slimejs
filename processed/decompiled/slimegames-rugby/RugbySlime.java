import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.ImageObserver;

public class RugbySlime extends Applet implements Runnable {
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
   private String[] slimeColText = new String[]{"Argentina", "Belgium", "Australia", "Iceland", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland", "Saudi Arabia", "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", "England", "Germany", "Night Elves"};
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
   private boolean fP1Stuck;
   private boolean fP2Stuck;
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
   private boolean worldCup;
   private int worldCupRound;
   private boolean fExtraTime;
   private boolean fGoldenGoal;
   private boolean fSuperSlime;
   private boolean doubleBuffered;
   private int[] pointsX;
   private int[] pointsY;

   public void initStuff() {
      this.fEndGame = true;
      this.p1X = 200;
      this.p1Y = 0;
      this.p2X = 800;
      this.p2Y = 0;
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
      this.fP1Stuck = false;
      this.fP2Stuck = false;
      this.JUMPVEL = !this.fSuperSlime?31:65;
      this.SLIMEVEL = !this.fSuperSlime?8:16;
      this.GRAVITY = !this.fSuperSlime?2:8;
   }

   private void drawButtons() {
      String[] buttons = new String[]{"1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"};
      FontMetrics fm = this.screen.getFontMetrics();
      Color darkBlue = new Color(200, 0, 0);

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
               this.p1XV = -this.SLIMEVEL;
               return false;
            case 66:
            case 98:
               this.toggleBuffering();
               return false;
            case 68:
            case 100:
               this.p1XV = this.SLIMEVEL;
               return false;
            case 73:
            case 105:
            case 1004:
               if(this.p2Y == 0 && !this.worldCup) {
                  this.p2YV = this.JUMPVEL;
               }

               return false;
            case 74:
            case 106:
            case 1006:
               if(!this.worldCup) {
                  this.p2XV = -this.SLIMEVEL;
               }

               return false;
            case 75:
            case 107:
            case 1005:
               if(!this.worldCup) {
                  this.fP2Sticky = false;
               }

               if(this.ballX > this.p2X - 10 && this.ballX < this.p2X + 10) {
                  this.ballVX = -20;
               }

               return false;
            case 76:
            case 108:
            case 1007:
               if(!this.worldCup) {
                  this.p2XV = this.SLIMEVEL;
               }

               return false;
            case 83:
            case 115:
               this.fP1Sticky = false;
               if(this.ballX > this.p1X - 10 && this.ballX < this.p1X + 10) {
                  this.ballVX = 20;
               }

               return false;
            case 87:
            case 119:
               if(this.p1Y == 0) {
                  this.p1YV = this.JUMPVEL;
               }
            }
         }
         break;
      case 402:
      case 404:
         switch(event.key) {
         case 65:
         case 97:
            if(this.p1XV < 0) {
               this.p1XV = 0;
            }

            return false;
         case 68:
         case 100:
            if(this.p1XV > 0) {
               this.p1XV = 0;
            }

            return false;
         case 74:
         case 106:
         case 1006:
            if(this.p2XV < 0 && !this.worldCup) {
               this.p2XV = 0;
            }

            return false;
         case 75:
         case 107:
         case 1005:
            this.fP2Sticky = true;
            return false;
         case 76:
         case 108:
         case 1007:
            if(this.p2XV > 0 && !this.worldCup) {
               this.p2XV = 0;
            }

            return false;
         case 83:
         case 115:
            this.fP1Sticky = true;
            return false;
         default:
            return false;
         }
      case 501:
         this.mousePressed = true;
         if(!this.fInPlay && this.testButton(event.x, event.y)) {
            this.fEndGame = false;
            this.fP1Sticky = true;
            this.fP2Sticky = true;
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
      int k1 = this.nWidth / 10;
      int j2 = this.nHeight / 10;
      int i3 = this.nWidth / 50;
      int j3 = this.nHeight / 25;
      int k3 = this.ballX * this.nWidth / 1000;
      int l3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int i = this.p1OldX * this.nWidth / 1000 - k1 / 2;
      int l = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(i, l, k1, j2);
      i = this.p2OldX * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(i, l, k1, j2);
      if(!this.fEndGame) {
         this.MoveBall();
      }

      i = this.p1X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p1Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
      this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
      this.screen.setColor(this.secondaryCols[this.p1Col]);
      this.pointsX[0] = this.pointsX[2] = i + k1 / 2;
      this.pointsX[1] = i + k1 * 2 / 5;
      this.pointsX[3] = i + k1 / 8;
      this.pointsY[0] = l;
      this.pointsY[1] = this.pointsY[3] = l + j2 / 2;
      this.pointsY[2] = l + j2;
      this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
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

      if(this.p1Blink == 0) {
         this.screen.setColor(Color.white);
         this.screen.fillOval(i - i3, l - j3, i3, j3);
         if(k4 > 0 && !flag) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(i - 4 * i4 / k4 - 3 * i3 / 4, l - 4 * j4 / k4 - 3 * j3 / 4, i3 / 2, j3 / 2);
         }
      } else {
         --this.p1Blink;
      }

      int i2;
      int l2;
      int k;
      int j1;
      int k5;
      if(this.p1Score > this.p2Score + 2) {
         i2 = this.p1X * this.nWidth / 1000;
         l2 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         k = this.nWidth / 20;
         j1 = this.nHeight / 20;
         k5 = 0;

         do {
            this.screen.setColor(Color.black);
            this.screen.drawArc(i2, l2 + k5, k, j1, -30, -150);
            ++k5;
         } while(k5 < 3);
      }

      i = this.p2X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p2Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
      this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
      this.screen.setColor(this.secondaryCols[this.p2Col]);
      this.pointsX[0] = this.pointsX[2] = i + k1 / 2;
      this.pointsX[1] = i + k1 * 3 / 5;
      this.pointsX[3] = i + k1 * 7 / 8;
      this.pointsY[0] = l;
      this.pointsY[1] = this.pointsY[3] = l + j2 / 2;
      this.pointsY[2] = l + j2;
      this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
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
         this.screen.setColor(!flag?Color.white:Color.green);
         this.screen.fillOval(i - i3, l - j3, i3, j3);
         if(k4 > 0 && !flag) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(i - 4 * i4 / k4 - 3 * i3 / 4, l - 4 * j4 / k4 - 3 * j3 / 4, i3 / 2, j3 / 2);
         }
      } else {
         --this.p2Blink;
      }

      if(this.p2Score > this.p1Score + 2) {
         i2 = this.nWidth / 20;
         l2 = this.nHeight / 20;
         k = this.p2X * this.nWidth / 1000 - i2;
         j1 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
         k5 = 0;

         do {
            this.screen.setColor(Color.black);
            this.screen.drawArc(k, j1 + k5, i2, l2, -10, -150);
            ++k5;
         } while(k5 < 3);
      }

   }

   public void paint(Graphics g) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      this.screen.setColor(Color.green);
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
            this.screen.drawString("Super Rugby Slime!", this.nWidth / 2 - fontmetrics.stringWidth("Super Rugby Slime!") / 2, this.nHeight / 2 - fontmetrics.getHeight());
         } else {
            this.screen.drawString("Rugby Slime!", this.nWidth / 2 - fontmetrics.stringWidth("Soccer Slime!") / 2, this.nHeight / 2 - fontmetrics.getHeight());
         }

         this.screen.setColor(Color.white);
         fontmetrics = this.screen.getFontMetrics();
         this.screen.drawString("Written by Quin Pendragon", this.nWidth / 2 - fontmetrics.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + fontmetrics.getHeight() * 2);
         this.screen.drawString("Rugby mod by Anonymous tipster", this.nWidth / 3 - fontmetrics.stringWidth("Written by Quin Pendragon") / 8, this.nHeight / 2 + fontmetrics.getHeight() * 3);
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

      this.p1X += this.p1XV;
      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > 950) {
         this.p1X = 950;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= this.GRAVITY;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         }
      }

      this.p2X += this.p2XV;
      if(this.p2X > 950) {
         this.p2X = 950;
      }

      if(this.p2X < 50) {
         this.p2X = 50;
      }

      if(this.p2YV != 0) {
         this.p2Y += this.p2YV -= this.GRAVITY;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

   }

   public RugbySlime() {
      this.slimaryCols = new Color[]{Color.cyan, Color.red, Color.green, Color.white, this.darkGreen, Color.white, this.darkRed, this.darkRed, new Color(119, 41, 28), Color.yellow, Color.green, Color.white, Color.white, new Color(128, 128, 255), this.darkBlue, Color.white, Color.red, Color.white, new Color(119, 41, 28), Color.green, Color.white, Color.white, Color.white, new Color(185, 30, 2), Color.white, Color.red, new Color(252, 239, 82), Color.white, Color.red, new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.white, Color.blue};
      this.secondaryCols = new Color[]{Color.white, Color.black, Color.yellow, new Color(128, 128, 255), Color.red, Color.red, this.darkBlue, Color.white, Color.white, this.darkBlue, Color.green, Color.blue, this.darkBlue, Color.white, Color.white, Color.blue, Color.white, Color.red, this.darkGreen, Color.white, new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.white, Color.blue, Color.red, Color.white, Color.black, new Color(7, 177, 33), Color.red, Color.black, Color.blue};
      this.frenzyCol = 0;
      this.SMILE_DIFF = 2;
      this.DAMPING = 7;
      this.MAX_TICKS_TOUCHING_GOAL = '\uea60';
      this.worldCup = false;
      this.worldCupRound = 0;
      this.pointsX = new int[4];
      this.pointsY = new int[4];
      this.p2Col = 1;
      this.replayData = new int[200][8];
   }

   private void MoveBall() {
      this.fP1Stuck = false;
      this.fP2Stuck = false;
      int k = 30 * this.nHeight / 1000;
      int i = this.ballOldX * this.nWidth / 1000;
      int j = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(!this.fEndGame) {
         int l1 = (this.ballX - this.p1X) * 1;
         int i2 = this.ballY - this.p1Y;
         int j2 = l1 * l1 + i2 * i2;
         int k2 = this.ballVX - this.p1XV;
         int l2 = this.ballVY - this.p1YV;
         int i1;
         int k1;
         if(i2 > 0 && j2 < 15625 && j2 > 25) {
            i1 = (int)Math.sqrt((double)j2);
            k1 = (l1 * k2 + i2 * l2) / i1;
            this.ballX = this.p1X + l1 * 63 / i1;
            this.ballY = this.p1Y + i2 * 125 / i1;
            if(k1 <= 0) {
               if(!this.fP1Sticky) {
                  this.ballVY += 0;
                  this.ballVX += 0;
               } else {
                  this.ballVX = 0;
                  this.ballVY = 0;
                  this.ballVY = this.p1YV;
                  this.ballVX = this.p1XV;
               }

               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 0;
               }

               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 0;
               }
            }

            this.fP1Touched = true;
         }

         l1 = (this.ballX - this.p2X) * 1;
         i2 = this.ballY - this.p2Y;
         j2 = l1 * l1 + i2 * i2;
         k2 = this.ballVX - this.p2XV;
         l2 = this.ballVY - this.p2YV;
         if(i2 > 0 && j2 < 15625 && j2 > 25) {
            i1 = (int)Math.sqrt((double)j2);
            k1 = (l1 * k2 + i2 * l2) / i1;
            this.ballX = this.p2X + l1 * 63 / i1;
            this.ballY = this.p2Y + i2 * 125 / i1;
            if(k1 <= 0) {
               if(!this.fP2Sticky) {
                  this.ballVX += (this.p2XV - 2 * l1 * k1 / i1) * 7 / 10;
                  this.ballVY += this.p2YV - 2 * i2 * k1 / i1;
               } else {
                  this.ballVX = 0;
                  this.ballVY = 0;
                  this.ballVY = this.p2YV;
                  this.ballVX = this.p2XV;
                  this.fP2Stuck = true;
                  this.fP1Stuck = true;
               }

               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            this.fP2Touched = true;
         }

         if(this.ballX < 15) {
            this.ballX = 15;
            this.ballVX = -this.ballVX;
         }

         if(this.ballX > 985) {
            this.ballX = 985;
            this.ballVX = -this.ballVX;
         }

         if(this.ballX <= 0 || this.ballX >= 1000) {
            if(this.ballY > 200 && this.ballOldY < 200 || this.ballY < 200 && this.ballOldY >= 200) {
               this.ballY = 200;
               this.ballVY *= -1;
            }

            if(this.ballY > 180 && this.ballY < 220) {
               if(this.ballX > 40 && this.ballX < 50 && this.ballVX < 0) {
                  this.ballX = 50;
                  this.ballVX *= -1;
               }

               if(this.ballX < 960 && this.ballX > 950 && this.ballVX > 0) {
                  this.ballX = 950;
                  this.ballVX *= -1;
               }
            }
         }

         if(this.ballY < 34) {
            this.ballY = 34;
            this.ballVY = -this.ballVY * 7 / 10;
            this.ballVX = this.ballVX * 7 / 10;
         }
      }

      i = this.ballX * this.nWidth / 1000;
      j = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(Color.orange);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
   }

   private void DrawGoals() {
      this.screen.setColor(Color.white);
      this.screen.fillRect(this.nWidth / 20, 4 * this.nHeight / 5 - 10 * this.nHeight / 1000, 5, 40 * this.nHeight / 1000);
      this.screen.fillRect(this.nWidth - this.nWidth / 20 - 5, 4 * this.nHeight / 5 - 10 * this.nHeight / 1000, 5, 40 * this.nHeight / 1000);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);
      this.screen.fillRect(this.nWidth * 9 / 10, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);

      int p1TickX;
      for(p1TickX = 0; p1TickX < this.nWidth / 20; p1TickX += 5) {
         ;
      }

      for(p1TickX = 4 * this.nHeight / 5 - this.nHeight / 5; p1TickX < 4 * this.nHeight / 5; p1TickX += 5) {
         ;
      }

      p1TickX = ('\uea60' - this.p1TouchingGoal) * this.nWidth / 120000;
      this.screen.setColor(this.secondaryCols[this.p1Col]);
      this.screen.fillRect(0, this.nHeight - 5, p1TickX, 5);
      this.screen.setColor(Color.green);
      this.screen.fillRect(p1TickX, this.nHeight - 5, this.nWidth / 2 - p1TickX, 5);
      int p2TickX = this.nWidth - ('\uea60' - this.p2TouchingGoal) * this.nWidth / 120000;
      this.screen.setColor(this.secondaryCols[this.p2Col]);
      this.screen.fillRect(p2TickX, this.nHeight - 5, this.nWidth, 5);
      this.screen.setColor(Color.green);
      this.screen.fillRect(this.nWidth / 2, this.nHeight - 5, p2TickX - this.nWidth / 2, 5);
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
      this.screen.setColor(Color.green);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      this.drawPrompt(this.promptMsg, 0);
   }

   public void drawPrompt(String s, int i) {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      this.screen.setColor(Color.black);
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
         this.fP1Stuck = false;
         this.fP2Stuck = false;
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
               this.promptBox("Final", l);
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

            if(this.playOnTicks == 0 || this.p1TouchingGoal > '\uea60' || this.p2TouchingGoal > '\uea60') {
               long var11 = System.currentTimeMillis();
               if(this.p1TouchingGoal > '\uea60') {
                  ++this.p2Score;
                  this.promptMsg = this.slimeColText[this.p1Col] + " pinged for goal hanging!";
               } else if(this.p2TouchingGoal > '\uea60') {
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
      this.p2XV = 0;
      if(this.ballX > this.p2X + 5 && this.ballX < 960) {
         this.fP2Sticky = true;
      }

      if(this.ballX > this.p2X - 10) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.ballX + 30 > this.p2X && this.p2YV == 0) {
         this.fP2Sticky = false;
         this.p2YV = this.JUMPVEL;
      }

      if(this.ballX + 50 < this.p2X) {
         this.fP2Sticky = false;
         this.p2XV = -this.SLIMEVEL;
      }

      if(this.ballX > this.p2X + 50 && this.p2YV == 0 && this.ballY > 10 && this.ballY < 150) {
         this.p2YV = this.JUMPVEL;
      }

      if(this.p2TouchingGoal > 0 && '\uea60' - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL) {
         this.p2XV = -this.SLIMEVEL;
      }

   }

   private void controlP2v1() {
      this.p2XV = 0;
      int bounceX = this.getBallBounceX();
      int ballMaxY = this.getBallMaxY();
      if(this.ballVY >= 1) {
         int var10000 = this.ballVY;
      } else {
         boolean var4 = true;
      }

      if(bounceX > 900) {
         this.p2XV = this.SLIMEVEL;
      }

      if(bounceX + 20 < this.p2X) {
         this.fP2Sticky = false;
         this.p2XV = -this.SLIMEVEL;
      }

      if(this.ballX > this.p2X - 10) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.ballX + 30 > this.p2X && this.p2YV == 0) {
         this.fP2Sticky = false;
         this.p2YV = this.JUMPVEL;
      }

      if(bounceX > this.p2X + 50 && this.p2YV == 0) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.ballX > this.p2X && this.ballX < 960) {
         this.fP2Sticky = true;
      }

      if(this.p2YV == 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && this.ballVY / 4 == 0 && this.p1X < 400 && this.p2X < 848) {
         if(this.p2X < 900) {
            this.p2XV = this.SLIMEVEL;
         }

         if(this.ballX > 800 && bounceX > 950 && this.p2YV == 0 && ballMaxY > 40) {
            this.p2YV = this.JUMPVEL;
         }
      }

      if(this.p2YV == this.JUMPVEL) {
         if(ballMaxY < 110) {
            this.p2YV = 0;
         }

         if(this.ballX < this.p2X - 400) {
            this.p2YV = 0;
         }

         if(this.ballY < 80) {
            this.p2YV = 0;
         }

         if(this.ballX < 900 && this.p2X > 900) {
            this.p2YV = 0;
         }

         if(this.p2X < 150) {
            this.p2YV = 0;
         }
      }

      if(this.p2TouchingGoal > 0 && '\uea60' - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL) {
         this.p2XV = -this.SLIMEVEL;
      }

   }

   private void controlP2v2() {
      int bounceX = this.getBallBounceX();
      int ballMaxY = this.getBallMaxY();
      if(this.ballVY >= 1) {
         int var10000 = this.ballVY;
      } else {
         boolean var4 = true;
      }

      if(this.p2X < 790) {
         this.p2XV = this.SLIMEVEL;
      } else if(this.p2X > 830) {
         this.p2XV = -this.SLIMEVEL;
      } else {
         this.p2XV = 0;
      }

      if(bounceX > 900) {
         this.p2XV = this.SLIMEVEL;
      }

      if(bounceX + 20 < this.p2X) {
         this.fP2Sticky = false;
         this.p2XV = -this.SLIMEVEL;
      }

      if(this.ballX > this.p2X - 10) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.ballX + 30 > this.p2X && this.p2YV == 0) {
         this.fP2Sticky = false;
         this.p2YV = this.JUMPVEL;
      }

      if(bounceX > this.p2X + 50 && this.p2YV == 0) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.ballX > this.p2X && this.ballX < 960) {
         this.fP2Sticky = true;
      }

      if(this.p2YV == 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
         this.p2XV = this.SLIMEVEL;
      }

      if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && this.ballVY / 4 == 0 && this.p1X < 400 && this.p2X < 848) {
         if(this.p2X < 900) {
            this.p2XV = this.SLIMEVEL;
         }

         if(this.ballX > 800 && bounceX > 950 && this.p2YV == 0 && ballMaxY > 40) {
            this.p2YV = this.JUMPVEL;
         }
      }

      if(this.p2YV == this.JUMPVEL) {
         if(ballMaxY < 110) {
            this.p2YV = 0;
         }

         if(this.ballX < this.p2X - 400) {
            this.p2YV = 0;
         }

         if(this.ballY < 80) {
            this.p2YV = 0;
         }

         if(this.ballX < 900 && this.p2X > 900) {
            this.p2YV = 0;
         }
      }

      if(this.p2YV == 0 && this.p2X < 400 && bounceX > 500 && ballMaxY > 50) {
         this.p2YV = this.JUMPVEL;
      }

      if(this.p2TouchingGoal > 0 && '\uea60' - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL) {
         this.p2XV = -this.SLIMEVEL;
      }

   }

   private void controlP2v3() {
      int SLIMEVEL = this.SLIMEVEL * 4 / 3;
      int bounceX = this.getBallBounceX();
      int ballMaxY = this.getBallMaxY();
      if(this.ballVY >= 1) {
         int var10000 = this.ballVY;
      } else {
         boolean var5 = true;
      }

      if(this.p2X < 790) {
         this.p2XV = SLIMEVEL;
      } else if(this.p2X > 830) {
         this.p2XV = -SLIMEVEL;
      } else {
         this.p2XV = 0;
      }

      if(bounceX > 900) {
         this.p2XV = SLIMEVEL;
      }

      if(bounceX + 20 < this.p2X) {
         this.fP2Sticky = false;
         this.p2XV = -SLIMEVEL;
      }

      if(this.ballX > this.p2X - 10) {
         this.p2XV = SLIMEVEL;
      }

      if(this.ballX + 30 > this.p2X && this.p2YV == 0) {
         this.fP2Sticky = false;
         this.p2YV = this.JUMPVEL;
      }

      if(bounceX > this.p2X + 50 && this.p2YV == 0) {
         this.p2XV = SLIMEVEL;
      }

      if(this.ballX > this.p2X && this.ballX < 960) {
         this.fP2Sticky = true;
      }

      if(this.p2YV == 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
         this.p2XV = SLIMEVEL;
      }

      if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && this.ballVY / 4 == 0 && this.p1X < 400 && this.p2X < 848) {
         if(this.p2X < 900) {
            this.p2XV = SLIMEVEL;
         }

         if(this.ballX > 800 && bounceX > 950 && this.p2YV == 0 && ballMaxY > 40) {
            this.p2YV = this.JUMPVEL;
         }
      }

      if(this.p2YV == this.JUMPVEL) {
         if(ballMaxY < 110) {
            this.p2YV = 0;
         }

         if(this.ballX < this.p2X - 400) {
            this.p2YV = 0;
         }

         if(this.ballY < 80) {
            this.p2YV = 0;
         }

         if(this.ballX < 900 && this.p2X > 900) {
            this.p2YV = 0;
         }

         if(this.p2XV > 0 && ballMaxY > 200 && bounceX > this.p2X + 300) {
            this.p2YV = 0;
         }
      }

      if(this.p2YV == 0 && this.p2X < 400 && bounceX > this.p2X + 400 && ballMaxY > 50) {
         this.p2YV = this.JUMPVEL;
      }

      if(this.p2TouchingGoal > 0 && '\uea60' - this.p2TouchingGoal < 3 + (this.p2X - 850) / SLIMEVEL) {
         this.p2XV = -SLIMEVEL;
      }

   }

   // $FF: renamed from: p (java.lang.String) void
   private void method_rn_RugbySlime_p_1(String s) {
      System.out.println(s);
   }
}
