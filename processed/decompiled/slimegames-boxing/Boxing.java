import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.ImageObserver;
import java.util.Random;

public class Boxing extends Applet implements Runnable {
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
   private Color[] thirdColor;
   private Color[] fourthColor;
   private int p1OldX;
   private int p2OldX;
   private int p1OldY;
   private int p2OldY;
   private int p1XV;
   private int p2XV;
   private int p1YV;
   private int p2YV;
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
   private boolean worldCup;
   private int worldCupRound;
   private boolean fExtraTime;
   private boolean fGoldenGoal;
   private boolean fSuperSlime;
   private boolean fSuperSlime2;
   private boolean doubleBuffered;
   private boolean p1defend;
   private boolean p2defend;
   private boolean p1attack;
   private boolean p2attack;
   private boolean p1scores;
   private boolean p2scores;
   private int p1HP;
   private int p2HP;
   private int p1goingsuper;
   private int p2goingsuper;
   private boolean p1lookingleft;
   private boolean p2lookingleft;
   private boolean p1lookingright;
   private boolean p2lookingright;
   private int[] pointsX;
   private int[] pointsY;

   public Boxing() {
      this.slimaryCols = new Color[]{Color.cyan, Color.red, Color.green, Color.white, this.darkGreen, Color.white, this.darkRed, this.darkRed, new Color(119, 41, 28), Color.yellow, Color.green, Color.white, Color.white, new Color(128, 128, 255), this.darkBlue, Color.white, Color.red, Color.white, new Color(119, 41, 28), Color.green, Color.white, Color.white, Color.white, new Color(185, 30, 2), Color.white, Color.red, new Color(252, 239, 82), Color.white, Color.red, new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.white, Color.blue};
      this.secondaryCols = new Color[]{Color.white, Color.black, Color.yellow, new Color(128, 128, 255), Color.red, Color.red, this.darkBlue, Color.white, Color.white, this.darkBlue, Color.green, Color.blue, this.darkBlue, Color.white, Color.white, Color.blue, Color.white, Color.red, this.darkGreen, Color.white, new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.white, Color.blue, Color.red, Color.white, Color.black, new Color(7, 177, 33), Color.red, Color.black, Color.blue};
      this.thirdColor = new Color[]{Color.red, Color.yellow, Color.red, Color.red, Color.yellow, Color.yellow, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.yellow, Color.yellow, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.red, Color.yellow, Color.red, Color.yellow, Color.yellow, Color.red, Color.red, Color.yellow, Color.red, Color.red};
      this.fourthColor = new Color[]{Color.black, Color.white, Color.white, Color.black, Color.white, Color.black, Color.white, Color.black, Color.black, Color.white, Color.white, Color.black, Color.black, Color.black, Color.black, Color.black, Color.black, Color.black, Color.white, Color.black, Color.black, Color.black, Color.black, Color.white, Color.black, Color.black, Color.white, Color.black, Color.black, Color.white, Color.white, Color.white, Color.black, Color.white};
      this.frenzyCol = 0;
      this.SMILE_DIFF = 2;
      this.DAMPING = 7;
      this.MAX_TICKS_TOUCHING_GOAL = 60;
      this.worldCup = false;
      this.worldCupRound = 0;
      this.p1goingsuper = 0;
      this.p2goingsuper = 0;
      this.pointsX = new int[4];
      this.pointsY = new int[4];
      this.p2Col = 1;
      this.replayData = new int[200][8];
   }

   private void DoReplay() {
      FontMetrics var1 = this.screen.getFontMetrics();
      int var2 = var1.stringWidth("Replay...");
      int var3 = var1.getHeight();
      int var4 = this.nWidth / 2 - var2 / 2;
      int var5 = this.nHeight / 2 - var3;
      this.promptMsg = "Click the mouse to continue...";
      this.mousePressed = false;
      int var6 = this.replayPos - 1;

      while(!this.mousePressed) {
         ++var6;
         if(var6 >= 200) {
            var6 = 0;
         }

         if(var6 == this.replayPos) {
            try {
               Thread.sleep(1000L);
            } catch (InterruptedException var7) {
               ;
            }

            var6 = this.replayStart;
            this.paint(this.getGraphics());
         }

         this.ReplayFrame(var6, var4, var5, var2, var3, false);
         this.flip();
      }

      this.promptMsg = "";
      this.paint(this.getGraphics());
   }

   private void DrawGoals() {
   }

   private void DrawSlimers() {
      if(this.p1goingsuper >= 3) {
         this.fSuperSlime = true;
      } else {
         this.fSuperSlime = false;
      }

      if(this.p2goingsuper >= 3) {
         this.fSuperSlime2 = true;
      } else {
         this.fSuperSlime2 = false;
      }

      int var1 = this.nWidth / 10;
      int var2 = this.nHeight / 10;
      int var3 = this.nWidth / 50;
      int var4 = this.nHeight / 25;
      short var5 = 2000;
      short var6 = 4000;
      int var7 = this.p1OldX * this.nWidth / 1000 - var1 / 2;
      int var8 = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7 - 22, var8, var1 + 46, var2);
      var7 = this.p2OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7 - 25, var8, var1 + 48, var2);
      var7 = this.p1X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      if(this.p1lookingright) {
         this.screen.setColor(this.fSuperSlime?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p1Col]);
         this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
         this.screen.setColor(this.secondaryCols[this.p1Col]);
         this.pointsX[0] = this.pointsX[2] = var7 + var1 / 2;
         this.pointsX[1] = var7 + var1 * 2 / 5;
         this.pointsX[3] = var7 + var1 / 8;
         this.pointsY[0] = var8;
         this.pointsY[1] = this.pointsY[3] = var8 + var2 / 2;
         this.pointsY[2] = var8 + var2;
         this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
      } else if(this.p1lookingleft) {
         this.screen.setColor(this.fSuperSlime?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p1Col]);
         this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
         this.screen.setColor(this.secondaryCols[this.p1Col]);
         this.pointsX[0] = this.pointsX[2] = var7 + var1 / 2;
         this.pointsX[1] = var7 + var1 * 3 / 5;
         this.pointsX[3] = var7 + var1 * 7 / 8;
         this.pointsY[0] = var8;
         this.pointsY[1] = this.pointsY[3] = var8 + var2 / 2;
         this.pointsY[2] = var8 + var2;
         this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
      }

      int var9 = this.p1X + 38;
      int var10 = this.p1Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      int var11 = var7 - var5;
      int var12 = var8 - var6;
      int var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      boolean var14 = Math.random() < 0.01D;
      if(this.p1lookingright) {
         this.screen.setColor(this.thirdColor[this.p1Col]);
         if(this.p1defend) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 2, var8 - 1000 / var13 - 3 * var4 / 4 - 10, 25, 35);
         } else if(this.p1attack) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 2, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         } else {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 50, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         }

         this.screen.setColor(this.fourthColor[this.p1Col]);
         if(this.p1defend) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - -2, var8 - 1000 / var13 - 3 * var4 / 4 + 20, 15, 5);
         } else if(this.p1attack) {
            this.screen.fillRect(var7 - 4 * var11 / var13, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         } else {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 50, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         }
      } else if(this.p1lookingleft) {
         this.screen.setColor(this.thirdColor[this.p1Col]);
         if(this.p1defend) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 38 - 40, var8 - 1000 / var13 - 3 * var4 / 4 - 10, 25, 35);
         } else if(this.p1attack) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 48 - 40, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         } else {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3 - 40, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         }

         this.screen.setColor(this.fourthColor[this.p1Col]);
         if(this.p1defend) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 33 - 40, var8 - 1000 / var13 - 3 * var4 / 4 + 20, 15, 5);
         } else if(this.p1attack) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 20 - 40, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         } else {
            this.screen.fillRect(var7 - 4 * var11 / var13 - -27 - 40, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         }
      }

      if(var14) {
         this.p1Blink = 5;
      }

      if(this.p1Blink == 0) {
         if(this.p1lookingright) {
            this.screen.setColor(Color.white);
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
               this.screen.setColor(Color.black);
               this.screen.fillOval(var7 - 4 * var11 / var13 - 7, var8 - 1000 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
            }
         } else if(this.p1lookingleft) {
            this.screen.setColor(var14?Color.gray:Color.white);
            this.screen.fillOval(var7 - var3 - 40, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
               this.screen.setColor(Color.black);
               this.screen.fillOval(var7 - 4 * var11 / var13 - 17 - 40, var8 - 1000 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
            }
         }
      } else {
         --this.p1Blink;
      }

      int var15;
      int var16;
      int var17;
      int var18;
      int var19;
      int var20;
      int var21;
      int var22;
      int var23;
      int var24;
      if(this.p1HP > this.p2HP + 2) {
         var15 = this.p1X * this.nWidth / 1000;
         var16 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         var17 = this.nWidth / 20;
         var18 = this.nHeight / 20;
         var19 = 0;
         var20 = this.nWidth / 20;
         var21 = this.nHeight / 20;
         var22 = this.p1X * this.nWidth / 1000 - var20;
         var23 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         var24 = 0;
         if(this.p1lookingleft) {
            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var22, var23 + var24, var20, var21, -10, -150);
               ++var24;
            } while(var24 < 3);
         } else if(this.p1lookingright) {
            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
               ++var19;
            } while(var19 < 3);
         }
      }

      var7 = this.p2X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      if(this.p2lookingright) {
         this.screen.setColor(this.fSuperSlime2?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p2Col]);
         this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
         this.screen.setColor(this.secondaryCols[this.p2Col]);
         this.pointsX[0] = this.pointsX[2] = var7 + var1 / 2;
         this.pointsX[1] = var7 + var1 * 2 / 5;
         this.pointsX[3] = var7 + var1 / 8;
         this.pointsY[0] = var8;
         this.pointsY[1] = this.pointsY[3] = var8 + var2 / 2;
         this.pointsY[2] = var8 + var2;
         this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
      } else if(this.p2lookingleft) {
         this.screen.setColor(this.fSuperSlime2?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p2Col]);
         this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
         this.screen.setColor(this.secondaryCols[this.p2Col]);
         this.pointsX[0] = this.pointsX[2] = var7 + var1 / 2;
         this.pointsX[1] = var7 + var1 * 3 / 5;
         this.pointsX[3] = var7 + var1 * 7 / 8;
         this.pointsY[0] = var8;
         this.pointsY[1] = this.pointsY[3] = var8 + var2 / 2;
         this.pointsY[2] = var8 + var2;
         this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
      }

      var9 = this.p2X - 18;
      var10 = this.p2Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      var11 = var7 - var5;
      var12 = var8 - var6;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      var14 = Math.random() < 0.01D;
      if(this.p2lookingright) {
         this.screen.setColor(this.thirdColor[this.p2Col]);
         if(this.p2defend) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 2 + 40, var8 - 1000 / var13 - 3 * var4 / 4 - 10, 25, 35);
         } else if(this.p2attack) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 2 + 40, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         } else {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 50 + 40, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         }

         this.screen.setColor(this.fourthColor[this.p2Col]);
         if(this.p2defend) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - -2 + 40, var8 - 1000 / var13 - 3 * var4 / 4 + 20, 15, 5);
         } else if(this.p2attack) {
            this.screen.fillRect(var7 - 4 * var11 / var13 + 40, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         } else {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 50 + 40, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         }
      } else if(this.p2lookingleft) {
         this.screen.setColor(this.thirdColor[this.p2Col]);
         if(this.p2defend) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 38, var8 - 1000 / var13 - 3 * var4 / 4 - 10, 25, 35);
         } else if(this.p2attack) {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 48, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         } else {
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3, var8 - 1000 / var13 - 3 * var4 / 4 - 2, 35, 25);
         }

         this.screen.setColor(this.fourthColor[this.p2Col]);
         if(this.p2defend) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 33, var8 - 1000 / var13 - 3 * var4 / 4 + 20, 15, 5);
         } else if(this.p2attack) {
            this.screen.fillRect(var7 - 4 * var11 / var13 - 20, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         } else {
            this.screen.fillRect(var7 - 4 * var11 / var13 - -27, var8 - 1000 / var13 - 3 * var4 / 4 + 3, 5, 15);
         }
      }

      if(var14) {
         this.p2Blink = 5;
      }

      if(this.p2Blink == 0) {
         this.screen.setColor(var14?Color.gray:Color.white);
         if(this.p2lookingleft) {
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
         } else if(this.p2lookingright) {
            this.screen.fillOval(var7 - var3 + 40, var8 - var4, var3, var4);
         }

         if(var13 > 0 && !var14) {
            this.screen.setColor(Color.black);
            if(this.p2lookingleft) {
               this.screen.fillOval(var7 - 4 * var11 / var13 - 17, var8 - 1000 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
            } else if(this.p2lookingright) {
               this.screen.fillOval(var7 - 4 * var11 / var13 - 17 + 50, var8 - 1000 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
            }
         }
      } else {
         --this.p2Blink;
      }

      if(this.p2HP > this.p1HP + 2) {
         var15 = this.p2X * this.nWidth / 1000;
         var16 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
         var17 = this.nWidth / 20;
         var18 = this.nHeight / 20;
         var19 = 0;
         var20 = this.nWidth / 20;
         var21 = this.nHeight / 20;
         var22 = this.p2X * this.nWidth / 1000 - var20;
         var23 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
         var24 = 0;
         if(this.p2lookingleft) {
            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var22, var23 + var24, var20, var21, -10, -150);
               ++var24;
            } while(var24 < 3);
         } else if(this.p2lookingright) {
            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
               ++var19;
            } while(var19 < 3);
         }
      }

      if(this.p2HP <= 9) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(410, 35, 30, 28);
      }

      if(this.p2HP <= 8) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(441, 35, 30, 28);
      }

      if(this.p2HP <= 7) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(476, 35, 30, 28);
      }

      if(this.p2HP <= 6) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(511, 35, 30, 28);
      }

      if(this.p2HP <= 5) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(546, 35, 30, 28);
      }

      if(this.p2HP <= 4) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(581, 35, 30, 28);
      }

      if(this.p2HP <= 3) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(616, 35, 30, 28);
      }

      if(this.p2HP <= 2) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(651, 35, 30, 28);
      }

      if(this.p2HP <= 1) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(686, 35, 30, 28);
      }

      if(this.p2HP <= 0) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(721, 35, 30, 28);
      }

      if(this.p1HP <= 9) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(0, 35, 30, 28);
      }

      if(this.p1HP <= 8) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(31, 35, 30, 28);
      }

      if(this.p1HP <= 7) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(66, 35, 30, 28);
      }

      if(this.p1HP <= 6) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(101, 35, 30, 28);
      }

      if(this.p1HP <= 5) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(136, 35, 30, 28);
      }

      if(this.p1HP <= 4) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(171, 35, 30, 28);
      }

      if(this.p1HP <= 3) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(206, 35, 30, 28);
      }

      if(this.p1HP <= 2) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(241, 35, 30, 28);
      }

      if(this.p1HP <= 1) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(276, 35, 30, 28);
      }

      if(this.p1HP <= 0) {
         this.screen.setColor(Color.red);
         this.screen.fillOval(311, 35, 30, 28);
      }

   }

   private void DrawStatus() {
      Graphics var1 = this.screen;
      FontMetrics var2 = this.screen.getFontMetrics();
      String var3 = null;
      String var4 = this.MakeTime(this.gameTime);
      int var5 = this.nHeight / 20;
      int var6 = 0;
      int var7 = var2.stringWidth(var4);
      if(this.worldCup) {
         switch(this.worldCupRound) {
         case 1:
            var3 = "Quarter Finals";
            break;
         case 2:
            var3 = "Semi-Finals";
            break;
         case 3:
            var3 = "Final";
            break;
         default:
            var3 = "Qualifying";
         }

         if(this.fGoldenGoal) {
            var3 = var3 + " [Golden Goal]";
         } else if(this.fExtraTime) {
            var3 = var3 + " [Extra Time]";
         }

         var6 = var2.stringWidth(var3);
      }

      int var8 = var6 > var7?var6:var7;
      var1.setColor(Color.blue);
      var1.fillRect(this.nWidth / 2 - var8 / 2 - 5, 80, var8 + 105, var5 + 22);
      var1.setColor(Color.white);
      this.screen.drawString(var4, this.nWidth / 2 - var7 / 2, var2.getAscent() + 80);
   }

   private String MakeTime(long var1) {
      long var3 = var1 / 10L % 100L;
      long var5 = var1 / 1000L % 60L;
      long var7 = var1 / 60000L % 60L;
      String var9 = "";
      if(var7 < 10L) {
         var9 = var9 + "0";
      }

      var9 = var9 + var7;
      var9 = var9 + ":";
      if(var5 < 10L) {
         var9 = var9 + "0";
      }

      var9 = var9 + var5;
      var9 = var9 + ":";
      if(var3 < 10L) {
         var9 = var9 + "0";
      }

      var9 = var9 + var3;
      return var9;
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

      if(this.p1attack && this.p2attack && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 160 && this.p1X < this.p2X + 160) {
               this.p1X = this.p2OldX - 160;
               this.p2X = this.p1OldX + 160;
            }
         } else if(this.p2X > this.p1X - 160 && this.p2X < this.p1X + 160) {
            this.p1X = this.p2OldX + 160;
            this.p2X = this.p1OldX - 160;
         }
      }

      if(this.p1attack && !this.p2attack && !this.p2defend || !this.p1attack && !this.p1defend && this.p2attack && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 120 && this.p1X < this.p2X + 120) {
               this.p1X = this.p2OldX - 120;
               this.p2X = this.p1OldX + 120;
            }
         } else if(this.p2X > this.p1X - 120 && this.p2X < this.p1X + 120) {
            this.p1X = this.p2OldX + 120;
            this.p2X = this.p1OldX - 120;
         }
      }

      if(this.p1defend && !this.p2attack && !this.p2defend || !this.p1attack && !this.p1defend && this.p2defend && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 110 && this.p1X < this.p2X + 110) {
               this.p1X = this.p2OldX - 110;
               this.p2X = this.p1OldX + 110;
            }
         } else if(this.p2X > this.p1X - 110 && this.p2X < this.p1X + 110) {
            this.p1X = this.p2OldX + 110;
            this.p2X = this.p1OldX - 110;
         }
      }

      if(this.p1defend && this.p2defend && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 135 && this.p1X < this.p2X + 135) {
               this.p1X = this.p2OldX - 135;
               this.p2X = this.p1OldX + 135;
            }
         } else if(this.p2X > this.p1X - 135 && this.p2X < this.p1X + 135) {
            this.p1X = this.p2OldX + 135;
            this.p2X = this.p1OldX - 135;
         }
      }

      if(!this.p1defend && !this.p1attack && !this.p2defend && !this.p2attack && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 100 && this.p1X < this.p2X + 100) {
               this.p1X = this.p2OldX - 100;
               this.p2X = this.p1OldX + 100;
            }
         } else if(this.p2X > this.p1X - 100 && this.p2X < this.p1X + 100) {
            this.p1X = this.p2OldX + 100;
            this.p2X = this.p1OldX - 100;
         }
      }

      if(this.p1defend && this.p2attack || this.p1attack && this.p2defend && this.p1Y == this.p2Y) {
         if(this.p1X < this.p2X) {
            if(this.p1X > this.p2X - 150 && this.p1X < this.p2X + 150) {
               this.p1X = this.p2OldX - 150;
               this.p2X = this.p1OldX + 150;
            }
         } else if(this.p2X > this.p1X - 150 && this.p2X < this.p1X + 150) {
            this.p1X = this.p2OldX + 150;
            this.p2X = this.p1OldX - 150;
         }
      }

   }

   private void ReplayFrame(int var1, int var2, int var3, int var4, int var5, boolean var6) {
      if(var6) {
         this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
      } else {
         int var7 = var1 != 0?var1 - 1:199;
         this.p1OldX = this.replayData[var7][0];
         this.p1OldY = this.replayData[var7][1];
         this.p2OldX = this.replayData[var7][2];
         this.p2OldY = this.replayData[var7][3];
      }

      this.p1X = this.replayData[var1][0];
      this.p1Y = this.replayData[var1][1];
      this.p2X = this.replayData[var1][2];
      this.p2Y = this.replayData[var1][3];
      this.p1Col = this.replayData[var1][4];
      this.p2Col = this.replayData[var1][5];
      if(var1 / 10 % 2 > 0) {
         this.screen.setColor(Color.red);
         this.screen.drawString("Replay...", var2, var3);
      } else {
         this.screen.setColor(Color.blue);
         this.screen.fillRect(var2, var3 - var5, var4, var5 * 2);
      }

      this.DrawSlimers();
      this.DrawGoals();

      try {
         Thread.sleep(20L);
      } catch (InterruptedException var8) {
         ;
      }
   }

   private void SaveReplayData() {
      this.replayData[this.replayPos][0] = this.p1X;
      this.replayData[this.replayPos][1] = this.p1Y;
      this.replayData[this.replayPos][2] = this.p2X;
      this.replayData[this.replayPos][3] = this.p2Y;
      this.replayData[this.replayPos][4] = this.p1Col;
      this.replayData[this.replayPos][5] = this.p2Col;
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

   public boolean checkScored() {
      return false;
   }

   private void controlP2v0() {
      Random var1 = new Random();
      int var2 = var1.nextInt(4) + 1;
      if(this.p2X < this.p1X) {
         if(var2 == 1) {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
         } else {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
         }
      } else if(var2 == 1) {
         this.p2XV = this.SLIMEVEL;
         this.p2lookingleft = false;
         this.p2lookingright = true;
      } else {
         this.p2XV = -this.SLIMEVEL;
         this.p2lookingleft = true;
         this.p2lookingright = false;
      }

      if(this.p1X > this.p2X - 160) {
         int var3 = var1.nextInt(10) + 1;
         if(var3 == 1) {
            this.p2attack = true;
            this.p2defend = false;
            if(this.p2X < this.p1X) {
               if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                  this.p2scores = true;
                  ++this.p2goingsuper;
                  this.p1goingsuper = 0;
               }
            } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
               this.p2scores = true;
               ++this.p2goingsuper;
               this.p1goingsuper = 0;
            }
         } else if(var3 == 2) {
            this.p2defend = true;
            this.p2attack = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         } else {
            this.p2attack = false;
            this.p2defend = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         }
      }

   }

   private void controlP2v1() {
      Random var1 = new Random();
      int var2 = var1.nextInt(3) + 1;
      if(this.p2X < this.p1X) {
         if(var2 == 1) {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
         } else {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
         }
      } else if(var2 == 1) {
         this.p2XV = this.SLIMEVEL;
         this.p2lookingleft = false;
         this.p2lookingright = true;
      } else {
         this.p2XV = -this.SLIMEVEL;
         this.p2lookingleft = true;
         this.p2lookingright = false;
      }

      if(this.p1X > this.p2X - 160) {
         int var3 = var1.nextInt(10) + 1;
         if(var3 >= 1 && var3 <= 2) {
            this.p2attack = true;
            this.p2defend = false;
            if(this.p2X < this.p1X) {
               if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                  this.p2scores = true;
                  ++this.p2goingsuper;
                  this.p1goingsuper = 0;
               }
            } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
               this.p2scores = true;
               ++this.p2goingsuper;
               this.p1goingsuper = 0;
            }
         } else if(var3 >= 3 && var3 <= 4) {
            this.p2defend = true;
            this.p2attack = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         } else {
            this.p2attack = false;
            this.p2defend = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         }
      }

   }

   private void controlP2v2() {
      Random var1 = new Random();
      int var2 = var1.nextInt(2) + 1;
      if(this.p2X < this.p1X) {
         if(var2 == 1) {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
         } else {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
         }
      } else if(var2 == 1) {
         this.p2XV = this.SLIMEVEL;
         this.p2lookingleft = false;
         this.p2lookingright = true;
      } else {
         this.p2XV = -this.SLIMEVEL;
         this.p2lookingleft = true;
         this.p2lookingright = false;
      }

      if(this.p1X > this.p2X - 160) {
         int var3 = var1.nextInt(10) + 1;
         if(var3 >= 1 && var3 <= 3) {
            this.p2attack = true;
            this.p2defend = false;
            if(this.p2X < this.p1X) {
               if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                  this.p2scores = true;
                  ++this.p2goingsuper;
                  this.p1goingsuper = 0;
               }
            } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
               this.p2scores = true;
               ++this.p2goingsuper;
               this.p1goingsuper = 0;
            }
         } else if(var3 >= 4 && var3 <= 5) {
            this.p2defend = true;
            this.p2attack = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         } else {
            this.p2attack = false;
            this.p2defend = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         }
      }

   }

   private void controlP2v3() {
      Random var1 = new Random();
      int var2 = var1.nextInt(4) + 1;
      if(this.p2X < this.p1X) {
         if(var2 == 1) {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
         } else {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
         }
      } else if(var2 == 1) {
         this.p2XV = this.SLIMEVEL;
         this.p2lookingleft = false;
         this.p2lookingright = true;
      } else {
         this.p2XV = -this.SLIMEVEL;
         this.p2lookingleft = true;
         this.p2lookingright = false;
      }

      if(this.p1X > this.p2X - 160) {
         int var3 = var1.nextInt(10) + 1;
         if(var3 >= 1 && var3 <= 3) {
            this.p2attack = true;
            this.p2defend = false;
            if(this.p2X < this.p1X) {
               if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                  this.p2scores = true;
                  ++this.p2goingsuper;
                  this.p1goingsuper = 0;
               }
            } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
               this.p2scores = true;
               ++this.p2goingsuper;
               this.p1goingsuper = 0;
            }
         } else if(var3 >= 4 && var3 <= 6) {
            this.p2defend = true;
            this.p2attack = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         } else {
            this.p2attack = false;
            this.p2defend = false;
            if(this.p2scores) {
               if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                  this.p1HP -= 2;
               } else {
                  --this.p1HP;
               }

               this.p2scores = false;
            }
         }
      }

   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   private void drawButtons() {
      String[] var1 = new String[]{"1 minute", "2 minutes", "4 minutes", "8 minutes", "Tournament"};
      FontMetrics var2 = this.screen.getFontMetrics();
      Color var3 = new Color(0, 0, 128);

      for(int var4 = 0; var4 < 5; ++var4) {
         this.screen.setColor(var3);
         this.screen.fillRect((2 * var4 + 1) * this.nWidth / 10 - this.nWidth / 12, this.nHeight * 2 / 10, this.nWidth / 6, this.nHeight / 10);
         this.screen.setColor(Color.white);
         this.screen.drawString(var1[var4], (2 * var4 + 1) * this.nWidth / 10 - var2.stringWidth(var1[var4]) / 2, this.nHeight * 5 / 20 + var2.getHeight() / 2);
      }

      this.flip();
   }

   public void drawPrompt() {
      this.screen.setColor(Color.gray);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      this.drawPrompt(this.promptMsg, 0);
   }

   public void drawPrompt(String var1, int var2) {
      FontMetrics var3 = this.screen.getFontMetrics();
      this.screen.setColor(Color.lightGray);
      this.screen.drawString(var1, (this.nWidth - var3.stringWidth(var1)) / 2, this.nHeight * 4 / 5 + var3.getHeight() * (var2 + 1) + 10);
   }

   private void drawScores() {
      this.screen.setColor(Color.black);
      this.screen.fillRect(0, 20, 340, 56);
      this.screen.setColor(Color.green);
      this.screen.fillOval(0, 35, 30, 28);
      this.screen.fillOval(31, 35, 30, 28);
      this.screen.fillOval(66, 35, 30, 28);
      this.screen.fillOval(101, 35, 30, 28);
      this.screen.fillOval(136, 35, 30, 28);
      this.screen.fillOval(171, 35, 30, 28);
      this.screen.fillOval(206, 35, 30, 28);
      this.screen.fillOval(241, 35, 30, 28);
      this.screen.fillOval(276, 35, 30, 28);
      this.screen.fillOval(311, 35, 30, 28);
      this.screen.setColor(Color.black);
      this.screen.fillRect(410, 20, 340, 56);
      this.screen.setColor(Color.green);
      this.screen.fillOval(410, 35, 30, 28);
      this.screen.fillOval(441, 35, 30, 28);
      this.screen.fillOval(476, 35, 30, 28);
      this.screen.fillOval(511, 35, 30, 28);
      this.screen.fillOval(546, 35, 30, 28);
      this.screen.fillOval(581, 35, 30, 28);
      this.screen.fillOval(616, 35, 30, 28);
      this.screen.fillOval(651, 35, 30, 28);
      this.screen.fillOval(686, 35, 30, 28);
      this.screen.fillOval(721, 35, 30, 28);
      Graphics var1 = this.screen;
      int var2 = this.nHeight / 20;
      FontMetrics var3 = this.screen.getFontMetrics();
      int var4 = var3.stringWidth("Replay...");
      var1.setColor(Color.blue);
      var1.setColor(Color.white);
      var1.drawString(this.slimeColText[this.p1Col] + " : ", 0, var2);
      String var5 = this.p2Score + " : " + this.slimeColText[this.p2Col];
      var1.drawString(this.slimeColText[this.p2Col] + " : ", 410, var2);
   }

   private void flip() {
      if(this.doubleBuffered) {
         this.getGraphics().drawImage(this.backBuffer, 0, 0, (ImageObserver)null);
      }

   }

   private int getBallBounceX() {
      return 0;
   }

   private int getBallMaxY() {
      return 0;
   }

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         if(this.fCanChangeCol) {
            switch(var1.key) {
            case 73:
            case 105:
            case 1004:
               do {
                  this.p2Col = this.p2Col == 0?this.slimaryCols.length - 1:this.p2Col - 1;
               } while(this.p1Col == this.p2Col);

               this.drawScores();
               this.repaint();
               break;
            case 75:
            case 107:
            case 1005:
               do {
                  this.p2Col = this.p2Col != this.slimaryCols.length - 1?this.p2Col + 1:0;
               } while(this.p2Col == this.p1Col);

               this.drawScores();
               this.repaint();
               break;
            case 83:
            case 115:
               do {
                  this.p1Col = this.p1Col != this.slimaryCols.length - 1?this.p1Col + 1:0;
               } while(this.p1Col == this.p2Col);

               this.drawScores();
               this.repaint();
               break;
            case 87:
            case 119:
               while(true) {
                  this.p1Col = this.p1Col == 0?this.slimaryCols.length - 1:this.p1Col - 1;
                  if(this.p1Col != this.p2Col) {
                     this.drawScores();
                     this.repaint();
                     break;
                  }
               }
            }
         }

         if(!this.fEndGame) {
            switch(var1.key) {
            case 32:
               this.mousePressed = true;
               return false;
            case 65:
            case 97:
               this.p1XV = -this.SLIMEVEL;
               this.p1lookingleft = true;
               this.p1lookingright = false;
               return false;
            case 66:
            case 98:
               this.toggleBuffering();
               return false;
            case 68:
            case 100:
               this.p1XV = this.SLIMEVEL;
               this.p1lookingleft = false;
               this.p1lookingright = true;
               return false;
            case 69:
            case 101:
               if(this.p1Y == 0) {
                  this.p1YV = this.JUMPVEL;
               }

               return false;
            case 73:
            case 105:
            case 1004:
               if(!this.worldCup) {
                  this.p2attack = true;
                  if(this.p2X < this.p1X) {
                     if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                        this.p2scores = true;
                        ++this.p2goingsuper;
                        this.p1goingsuper = 0;
                        return false;
                     }
                  } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
                     this.p2scores = true;
                     ++this.p2goingsuper;
                     this.p1goingsuper = 0;
                     return false;
                  }

                  return false;
               }

               return false;
            case 74:
            case 106:
            case 1006:
               if(!this.worldCup) {
                  this.p2XV = -this.SLIMEVEL;
                  this.p2lookingleft = true;
                  this.p2lookingright = false;
               }

               return false;
            case 75:
            case 107:
            case 1005:
               if(!this.worldCup) {
                  this.p2defend = true;
               }

               return false;
            case 76:
            case 108:
            case 1007:
               if(!this.worldCup) {
                  this.p2XV = this.SLIMEVEL;
                  this.p2lookingleft = false;
                  this.p2lookingright = true;
               }

               return false;
            case 83:
            case 115:
               this.p1defend = true;
               return false;
            case 85:
            case 117:
               if(this.p2Y == 0 && !this.worldCup) {
                  this.p2YV = this.JUMPVEL;
               }

               return false;
            case 87:
            case 119:
               this.p1attack = true;
               if(this.p1X < this.p2X) {
                  if(this.p1X > this.p2X - 120 && (!this.p2defend && !this.p2attack || this.p1lookingright && this.p2lookingright) && this.p1Y == this.p2Y) {
                     this.p1scores = true;
                     ++this.p1goingsuper;
                     this.p2goingsuper = 0;
                  }
               } else if(this.p2X > this.p1X - 120 && (!this.p2defend && !this.p2attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y == this.p2Y) {
                  this.p1scores = true;
                  ++this.p1goingsuper;
                  this.p2goingsuper = 0;
               }
            }
         }
         break;
      case 402:
      case 404:
         switch(var1.key) {
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
         case 73:
         case 105:
         case 1004:
            if(!this.worldCup) {
               this.p2attack = false;
               if(this.p2scores) {
                  if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                     this.p1HP -= 2;
                  } else {
                     --this.p1HP;
                  }

                  this.p2scores = false;
                  return false;
               }
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
            this.p2defend = false;
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
            this.p1defend = false;
            return false;
         case 87:
         case 119:
            this.p1attack = false;
            if(this.p1scores) {
               if(this.fSuperSlime && this.p1goingsuper >= 4) {
                  this.p2HP -= 2;
               } else {
                  --this.p2HP;
               }

               this.p1scores = false;
            }

            return false;
         default:
            return false;
         }
      case 501:
         this.mousePressed = true;
         if(!this.fInPlay && this.testButton(var1.x, var1.y)) {
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
            this.p1Score = 0;
            this.p2Score = 0;
            this.promptMsg = "";
            this.paint(this.getGraphics());

            try {
               Thread.sleep(100L);
            } catch (Exception var2) {
               ;
            }

            this.gameThread = new Thread(this);
            this.gameThread.start();
         }
         break;
      case 503:
         this.showStatus("Boxing Slime by Mohamed Seyam");
         this.requestFocus();
      }

      return false;
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

   public void initStuff() {
      this.p1lookingright = true;
      this.p1lookingleft = false;
      this.p2lookingright = false;
      this.p2lookingleft = true;
      this.p1attack = false;
      this.p2attack = false;
      this.p1defend = false;
      this.p2defend = false;
      this.p1HP = 10;
      this.p2HP = 10;
      this.p1goingsuper = 0;
      this.p2goingsuper = 0;
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
      this.replayStart = this.replayPos = 0;
      this.fP1Touched = this.fP2Touched = false;
      this.playOnTicks = 10;
      this.fPlayOn = false;
      this.fExtraTime = false;
      this.fGoldenGoal = false;
      this.JUMPVEL = this.fSuperSlime?65:31;
      this.SLIMEVEL = this.fSuperSlime?16:8;
      this.GRAVITY = this.fSuperSlime?8:2;
   }

   // $FF: renamed from: p (java.lang.String) void
   private void method_rn_Boxing_p_1(String var1) {
      System.out.println(var1);
   }

   public void paint(Graphics var1) {
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
         FontMetrics var2 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         if(this.fSuperSlime) {
            this.screen.drawString("Super Slime Boxing!", this.nWidth / 2 - var2.stringWidth("Super Slime Boxing!") / 2, this.nHeight / 2 - var2.getHeight());
         } else {
            this.screen.drawString("Slime Boxing!", this.nWidth / 2 - var2.stringWidth("Slime Boxing!") / 2, this.nHeight / 2 - var2.getHeight());
         }

         this.screen.setColor(Color.white);
         var2 = this.screen.getFontMetrics();
         this.screen.drawString("Original Code by Quin Pendragon", this.nWidth / 2 - var2.stringWidth("Original Code by Quin Pendragon") / 2, this.nHeight / 2 + var2.getHeight() * 2);
         this.screen.drawString("Modified by Mohamed Seyam", this.nWidth / 2 - var2.stringWidth("Modified by Mohamed Seyam") / 2, this.nHeight / 2 + var2.getHeight() * 2 + 20);
         this.screen.drawString("October 11, 2003", this.nWidth / 2 - var2.stringWidth("October 11, 2003") / 2, this.nHeight / 2 + var2.getHeight() * 2 + 40);
      }

      this.flip();
   }

   private void promptBox(String var1, String var2) {
      FontMetrics var3 = this.screen.getFontMetrics();
      int var4 = var3.stringWidth(var1);
      int var5 = var3.stringWidth(var2);
      int var6 = var4 > var5?var4:var5;
      this.screen.setColor(Color.darkGray);
      this.screen.fillRect(this.nWidth / 2 - var6 / 2 - 20, this.nHeight * 2 / 5, var6 + 40, this.nHeight / 5);
      this.screen.setColor(Color.white);
      this.screen.drawString(var1, this.nWidth / 2 - var4 / 2, this.nHeight * 9 / 20);
      this.screen.drawString(var2, this.nWidth / 2 - var5 / 2, this.nHeight * 11 / 20);
      this.flip();
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
         if(this.worldCup) {
            this.paint(this.getGraphics());

            do {
               this.p2Col = (int)(Math.random() * (double)this.slimaryCols.length / 4.0D) + this.worldCupRound * this.slimaryCols.length / 4;
            } while(this.p1Col == this.p2Col);

            String var1 = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
            switch(this.worldCupRound) {
            case 0:
               this.promptBox("Qualifying Round", var1);
               this.gameLength = 30000;
               break;
            case 1:
               this.promptBox("Quarter Finals", var1);
               this.gameLength = 120000;
               break;
            case 2:
               this.promptBox("Semi-Finals", var1);
               this.gameLength = 120000;
               break;
            case 3:
               this.promptBox("Tournament Final", var1);
               this.gameLength = 300000;
            }

            try {
               Thread.sleep(4000L);
            } catch (Exception var3) {
               ;
            }

            this.repaint();
            this.flip();
         }

         while(this.gameTime > 0L || this.worldCup && this.worldCupRound > 0 && this.p1HP == this.p2HP && this.p1HP > 0 && this.p2HP > 0) {
            this.gameTime = this.startTime + (long)this.gameLength - System.currentTimeMillis();
            if(this.gameTime < 0L) {
               this.gameTime = 0L;
            }

            String var10000;
            if(this.worldCup && !this.fExtraTime && this.gameTime <= 0L && this.worldCupRound > 0 && this.p1HP == this.p2HP) {
               if(this.p1Score == 0) {
                  var10000 = " nil";
               } else {
                  (new StringBuffer(" ")).append(this.p1Score).toString();
               }

               this.promptBox("Both players have the same amount of HP.", "And the game goes into extra time...");

               try {
                  Thread.sleep(4000L);
               } catch (Exception var6) {
                  ;
               }

               this.repaint();
               this.flip();
               this.startTime += 30000L;
               this.gameTime += 30000L;
               this.fExtraTime = true;
            } else if(this.gameTime <= 0L && this.fExtraTime && !this.fGoldenGoal && this.p1HP == this.p2HP) {
               this.fGoldenGoal = true;
               if(this.p1Score == 0) {
                  var10000 = " nil";
               } else {
                  (new StringBuffer(" ")).append(this.p1Score).toString();
               }

               this.promptBox("Both players have the same HP again.", "The next player to land a punch will win the match!");

               try {
                  Thread.sleep(4000L);
               } catch (Exception var5) {
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
            this.MoveSlimers();
            this.DrawSlimers();
            this.DrawGoals();
            this.DrawStatus();
            if(this.p1HP <= 0 || this.p2HP <= 0) {
               break;
            }

            this.flip();
            if(this.playOnTicks == 0 || this.p1TouchingGoal > 60 || this.p2TouchingGoal > 60) {
               long var9 = System.currentTimeMillis();
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
               this.startTime += System.currentTimeMillis() - var9;
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
               this.promptMsg = this.slimeColText[this.p2Col] + " scores at the last second!";
            } else {
               ++this.p1Score;
               this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
            }

            this.drawPrompt();
         } else {
            this.drawPrompt("And that\'s the end!", 0);
         }

         if(this.worldCup) {
            if(this.p1HP == this.p2HP) {
               this.drawPrompt("It\'s a draw at full time, here at Slime Arena!", 1);
               this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
               this.worldCup = false;
               this.flip();
            } else if(this.p1HP >= this.p2HP) {
               switch(this.worldCupRound) {
               case 0:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " qualifies for the Tournament!", 1);
                  break;
               case 1:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                  break;
               case 2:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                  break;
               case 3:
                  this.drawPrompt(this.slimeColText[this.p1Col] + " wins the Tournament!!!!!", 1);
               }

               if(this.worldCupRound == 3) {
                  this.worldCup = false;
                  this.promptBox("You win the Tournament!!!", "Congratulations!");
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
         } else if(this.p1HP == this.p2HP) {
            this.drawPrompt("It\'s a draw at full time, here at Slime Arena!", 1);
         } else if(this.p1HP < this.p2HP) {
            this.drawPrompt(this.slimeColText[this.p2Col] + " def. " + this.slimeColText[this.p1Col], 1);
         } else if(this.p2HP < this.p1HP) {
            this.drawPrompt(this.slimeColText[this.p1Col] + " def. " + this.slimeColText[this.p2Col], 1);
         }

         this.flip();

         try {
            Thread.sleep(5000L);
         } catch (InterruptedException var4) {
            ;
         }

         this.initStuff();
      } while(this.worldCup);

      this.fCanChangeCol = true;
      this.fInPlay = false;
      this.repaint();
   }

   private boolean testButton(int var1, int var2) {
      for(int var3 = 0; var3 < 5; ++var3) {
         if(var1 > (2 * var3 + 1) * this.nWidth / 10 - this.nWidth / 12 && var1 < (2 * var3 + 1) * this.nWidth / 10 + this.nWidth / 12 && var2 > this.nHeight * 2 / 10 && var2 < this.nHeight * 3 / 10) {
            if(var3 == 4) {
               this.gameLength = 120000;
               this.worldCup = true;
            } else {
               this.gameLength = (1 << var3) * '\uea60';
               this.worldCup = false;
            }

            return true;
         }
      }

      return false;
   }

   private void toggleBuffering() {
      if(this.doubleBuffered ^= true) {
         this.screen = this.backBuffer.getGraphics();
         this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
      } else {
         this.screen = this.getGraphics();
         this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
      }

      this.repaint();
   }
}
