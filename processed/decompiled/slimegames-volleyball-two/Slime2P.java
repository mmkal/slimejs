import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;

public class Slime2P extends Applet implements Runnable {
   private int nWidth;
   private int nHeight;
   private final int topScore = 10;
   private int nScore;
   private int nPointsScored;
   private int p1X;
   private int p2X;
   private int p1Y;
   private int p2Y;
   private int p1Col;
   private int p2Col = 1;
   private Color[] slimeColours;
   private String[] slimeColText = new String[]{"Big Red Slime ", "Magic Green Slime ", "Golden Boy ", "The Great White Slime ", "The Grass Tree© "};
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
   private boolean fP1Touched;
   private boolean fP2Touched;
   private Thread gameThread;
   private boolean fEndGame;
   private long startTime;
   private long gameTime;
   private int scoringRun;
   private int frenzyCol;
   private final int scoringRunForSuper = 3;

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            switch(var1.key) {
            case 65:
            case 97:
               this.p1XV = this.scoringRun <= -3?-16:-8;
               break;
            case 68:
            case 100:
               this.p1XV = this.scoringRun <= -3?16:8;
               break;
            case 73:
            case 105:
            case 1004:
               if(this.p2Y == 0) {
                  this.p2YV = this.scoringRun >= 3?45:31;
               }
               break;
            case 74:
            case 106:
            case 1006:
               this.p2XV = this.scoringRun >= 3?-16:-8;
               break;
            case 75:
            case 107:
            case 1005:
               if(this.fCanChangeCol) {
                  do {
                     this.p2Col = this.p2Col != 4?this.p2Col + 1:0;
                  } while(this.p2Col == this.p1Col);

                  this.drawScores();
                  break;
               }
            case 32:
               this.mousePressed = true;
               break;
            case 76:
            case 108:
            case 1007:
               this.p2XV = this.scoringRun >= 3?16:8;
               break;
            case 83:
            case 115:
               if(this.fCanChangeCol) {
                  do {
                     this.p1Col = this.p1Col != 4?this.p1Col + 1:0;
                  } while(this.p1Col == this.p2Col);

                  this.drawScores();
               }
               break;
            case 87:
            case 119:
               if(this.p1Y == 0) {
                  this.p1YV = this.scoringRun <= -3?45:31;
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
         case 74:
         case 106:
         case 1006:
            if(this.p2XV < 0) {
               this.p2XV = 0;
            }

            return false;
         case 76:
         case 108:
         case 1007:
            if(this.p2XV > 0) {
               this.p2XV = 0;
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
            this.nScore = 5;
            this.nPointsScored = 0;
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
            this.promptMsg = "";
            this.repaint();
            this.gameThread = new Thread(this);
            this.gameThread.start();
         }
         break;
      case 503:
         this.showStatus("Slime Volleyball 2-Player, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
      }

      return false;
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
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7, var8, var1, var2);
      var7 = this.p2OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7, var8, var1, var2);
      this.MoveBall();
      var7 = this.p1X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun <= -3?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
      this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
      int var9 = this.p1X + 38;
      int var10 = this.p1Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      int var11 = var7 - var5;
      int var12 = var8 - var6;
      int var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      boolean var14 = Math.random() < 0.01D;
      if(var14) {
         this.p1Blink = 5;
      }

      if(this.p1Blink == 0) {
         this.screen.setColor(Color.white);
         this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
         if(var13 > 0 && !var14) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
         }
      } else {
         --this.p1Blink;
      }

      var7 = this.p2X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun >= 3?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
      this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
      var9 = this.p2X - 18;
      var10 = this.p2Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      var11 = var7 - var5;
      var12 = var8 - var6;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      var14 = Math.random() < 0.01D;
      if(var14) {
         this.p2Blink = 5;
      }

      if(this.p2Blink == 0) {
         this.screen.setColor(var14?Color.gray:Color.white);
         this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
         if(var13 > 0 && !var14) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
         }
      } else {
         --this.p2Blink;
      }

      int var15;
      int var16;
      int var17;
      int var18;
      int var19;
      if(this.nScore > 8) {
         var15 = this.p1X * this.nWidth / 1000;
         var16 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         var17 = this.nWidth / 20;
         var18 = this.nHeight / 20;
         var19 = 0;

         do {
            this.screen.setColor(Color.black);
            this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
            ++var19;
         } while(var19 < 3);

      } else {
         if(this.nScore < 2) {
            var15 = this.nWidth / 20;
            var16 = this.nHeight / 20;
            var17 = this.p2X * this.nWidth / 1000 - var15;
            var18 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
            var19 = 0;

            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var17, var18 + var19, var15, var16, -10, -150);
               ++var19;
            } while(var19 < 3);
         }

      }
   }

   public void paint(Graphics var1) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      var1.setColor(Color.blue);
      var1.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      var1.setColor(Color.gray);
      var1.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      var1.setColor(Color.white);
      var1.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      this.drawScores();
      this.drawPrompt();
      if(!this.fInPlay) {
         FontMetrics var2 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         this.screen.drawString("Slime Volleyball!", this.nWidth / 2 - var2.stringWidth("Slime Volleyball!") / 2, this.nHeight / 2 - var2.getHeight());
         var1.setColor(Color.white);
         var2 = var1.getFontMetrics();
         var1.drawString("Written by Quin Pendragon", this.nWidth / 2 - var2.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + var2.getHeight() * 2);
      }

   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   private void ReplayFrame(int var1, int var2, int var3, int var4, int var5, boolean var6) {
      if(var6) {
         this.ballX = this.ballOldX = -50000000;
         this.ballY = this.ballOldY = 100000;
         this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
      } else {
         int var7 = var1 != 0?var1 - 1:199;
         this.p1OldX = this.replayData[var7][0];
         this.p1OldY = this.replayData[var7][1];
         this.p2OldX = this.replayData[var7][2];
         this.p2OldY = this.replayData[var7][3];
         this.ballOldX = this.replayData[var7][4];
         this.ballOldY = this.replayData[var7][5];
      }

      this.p1X = this.replayData[var1][0];
      this.p1Y = this.replayData[var1][1];
      this.p2X = this.replayData[var1][2];
      this.p2Y = this.replayData[var1][3];
      this.ballX = this.replayData[var1][4];
      this.ballY = this.replayData[var1][5];
      this.p1Col = this.replayData[var1][6];
      this.p2Col = this.replayData[var1][7];
      this.ballVX = 0;
      this.ballVY = 1;
      if(var1 / 10 % 2 > 0) {
         this.screen.setColor(Color.red);
         this.screen.drawString("Replay...", var2, var3);
      } else {
         this.screen.setColor(Color.blue);
         this.screen.fillRect(var2, var3 - var5, var4, var5 * 2);
      }

      this.DrawSlimers();

      try {
         Thread.sleep(20L);
      } catch (InterruptedException var8) {
         ;
      }
   }

   private String MakeTime(long var1) {
      long var3 = var1 / 10L % 100L;
      long var5 = var1 / 1000L % 60L;
      long var7 = var1 / 60000L % 60L;
      long var9 = var1 / 3600000L;
      String var11 = "";
      if(var9 < 10L) {
         var11 = var11 + "0";
      }

      var11 = var11 + var9;
      var11 = var11 + ":";
      if(var7 < 10L) {
         var11 = var11 + "0";
      }

      var11 = var11 + var7;
      var11 = var11 + ":";
      if(var5 < 10L) {
         var11 = var11 + "0";
      }

      var11 = var11 + var5;
      var11 = var11 + ":";
      if(var3 < 10L) {
         var11 = var11 + "0";
      }

      var11 = var11 + var3;
      return var11;
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
         this.p1Y += this.p1YV -= this.scoringRun <= -3?4:2;
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
         this.p2Y += this.p2YV -= this.scoringRun >= 3?4:2;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

   }

   public Slime2P() {
      this.slimeColours = new Color[]{Color.red, Color.green, Color.yellow, Color.white, Color.black};
      this.replayData = new int[200][8];
   }

   private void MoveBall() {
      int var1 = 30 * this.nHeight / 1000;
      int var2 = this.ballOldX * this.nWidth / 1000;
      int var3 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
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

            this.fP1Touched = true;
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

         if(this.ballX > 480 && this.ballX < 520 && this.ballY < 140) {
            if(this.ballVY < 0 && this.ballY > 130) {
               this.ballVY *= -1;
               this.ballY = 130;
            } else if(this.ballX < 500) {
               this.ballX = 480;
               this.ballVX = this.ballVX >= 0?-this.ballVX:this.ballVX;
            } else {
               this.ballX = 520;
               this.ballVX = this.ballVX <= 0?-this.ballVX:this.ballVX;
            }
         }
      }

      var2 = this.ballX * this.nWidth / 1000;
      var3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(Color.yellow);
      this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
   }

   private void DrawStatus() {
      Graphics var1 = this.screen;
      int var2 = this.nHeight / 20;
      var1.setColor(Color.blue);
      FontMetrics var3 = this.screen.getFontMetrics();
      int var4 = this.nWidth / 2 + (this.nScore - 5) * this.nWidth / 24;
      String var5 = "Points: " + this.nPointsScored + "   Elapsed: " + this.MakeTime(this.gameTime);
      int var6 = var3.stringWidth(var5);
      var1.fillRect(var4 - var6 / 2 - 5, 0, var6 + 10, var2 + 22);
      var1.setColor(Color.white);
      this.screen.drawString(var5, var4 - var6 / 2, var3.getAscent() + 20);
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
      Graphics var1 = this.screen;
      int var2 = this.nHeight / 20;
      var1.setColor(Color.blue);
      var1.fillRect(0, 0, this.nWidth, var2 + 22);

      int var4;
      for(int var3 = 0; var3 < this.nScore; ++var3) {
         var4 = (var3 + 1) * this.nWidth / 24;
         var1.setColor(this.slimeColours[this.p1Col]);
         var1.fillOval(var4, 20, var2, var2);
         var1.setColor(Color.white);
         var1.drawOval(var4, 20, var2, var2);
      }

      for(var4 = 0; var4 < 10 - this.nScore; ++var4) {
         int var5 = this.nWidth - (var4 + 1) * this.nWidth / 24 - var2;
         var1.setColor(this.slimeColours[this.p2Col]);
         var1.fillOval(var5, 20, var2, var2);
         var1.setColor(Color.white);
         var1.drawOval(var5, 20, var2, var2);
      }

   }

   public void run() {
      this.replayPos = this.replayStart = 0;
      this.p1Col = 0;
      this.p2Col = 1;
      this.scoringRun = 0;
      this.fP1Touched = this.fP2Touched = false;
      this.nPointsScored = 0;
      this.startTime = System.currentTimeMillis();

      while(this.nScore != 0 && this.nScore != 10 && this.gameThread != null) {
         this.gameTime = System.currentTimeMillis() - this.startTime;
         this.SaveReplayData();
         this.p1OldX = this.p1X;
         this.p1OldY = this.p1Y;
         this.p2OldX = this.p2X;
         this.p2OldY = this.p2Y;
         this.ballOldX = this.ballX;
         this.ballOldY = this.ballY;
         this.MoveSlimers();
         this.DrawSlimers();
         this.DrawStatus();
         if(this.ballY < 35) {
            long var1 = System.currentTimeMillis();
            ++this.nPointsScored;
            this.nScore += this.ballX <= 500?-1:1;
            if(this.ballX <= 500 && this.scoringRun >= 0) {
               ++this.scoringRun;
            } else if(this.ballX > 500 && this.scoringRun <= 0) {
               --this.scoringRun;
            } else if(this.ballX <= 500 && this.scoringRun <= 0) {
               this.scoringRun = 1;
            } else if(this.ballX > 500 && this.scoringRun >= 0) {
               this.scoringRun = -1;
            }

            this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
            if(!this.fP1Touched && !this.fP2Touched) {
               this.promptMsg = "What can I say?";
            } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 3) {
               this.promptMsg = this.promptMsg + "is on fire!";
            } else if((this.ballX <= 500 || !this.fP1Touched || this.fP2Touched) && (this.ballX > 500 || this.fP1Touched || !this.fP2Touched)) {
               if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                  this.promptMsg = this.promptMsg + "dies laughing! :P";
               } else {
                  switch(this.nScore) {
                  case 0:
                  case 10:
                     if(this.nPointsScored == 5) {
                        this.promptMsg = this.promptMsg + "Wins with a QUICK FIVE!!!";
                     } else if(this.scoringRun == 8) {
                        this.promptMsg = this.promptMsg + "Wins with a BIG NINE!!!";
                     } else {
                        this.promptMsg = this.promptMsg + "Wins!!!";
                     }
                     break;
                  case 4:
                     this.promptMsg = this.promptMsg + (this.ballX >= 500?"Scores!":"takes the lead!!");
                     break;
                  case 5:
                     this.promptMsg = this.promptMsg + "Equalizes!";
                     break;
                  case 6:
                     this.promptMsg = this.promptMsg + (this.ballX <= 500?"Scores!":"takes the lead!!");
                     break;
                  default:
                     this.promptMsg = this.promptMsg + "Scores!";
                  }
               }
            } else {
               this.promptMsg = this.promptMsg + "aces the serve!";
            }

            this.fCanChangeCol = false;
            boolean var3 = this.nScore != 0 && this.nScore != 10;
            int var4 = this.ballX;
            this.drawPrompt();
            if(var3) {
               this.drawPrompt("Click mouse for replay...", 1);
               this.mousePressed = false;
               if(this.gameThread != null) {
                  try {
                     Thread.sleep(2500L);
                  } catch (InterruptedException var7) {
                     ;
                  }
               }

               if(this.mousePressed) {
                  this.SaveReplayData();
                  this.DoReplay();
               }
            } else if(this.gameThread != null) {
               try {
                  Thread.sleep(2500L);
               } catch (InterruptedException var6) {
                  ;
               }
            }

            this.promptMsg = "";
            this.drawPrompt();
            this.fCanChangeCol = true;
            if(var3) {
               this.p1X = 200;
               this.p1Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p1XV = 0;
               this.p1YV = 0;
               this.p2XV = 0;
               this.p2YV = 0;
               this.ballX = var4 >= 500?200:800;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
               this.replayStart = this.replayPos = 0;
               this.fP1Touched = this.fP2Touched = false;
               this.repaint();
            }

            this.startTime += System.currentTimeMillis() - var1;
         }

         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var5) {
               ;
            }
         }
      }

      this.fEndGame = true;
      this.SaveReplayData();
      this.DoReplay();
      this.fInPlay = false;
      this.promptMsg = "Click the mouse to play...";
      this.repaint();
   }

   public void init() {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.nScore = 5;
      this.fInPlay = this.fEndGame = false;
      this.fCanChangeCol = true;
      this.promptMsg = "Click the mouse to play...";
      this.screen = this.getGraphics();
      this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
   }

   private void DoReplay() {
      FontMetrics var1 = this.screen.getFontMetrics();
      int var2 = var1.stringWidth("Replay...");
      int var3 = var1.getHeight();
      int var4 = this.nWidth / 2 - var2 / 2;
      int var5 = this.nHeight / 2 - var3;
      this.promptMsg = "Click the mouse to continue...";
      this.mousePressed = false;

      for(int var6 = this.replayPos - 1; !this.mousePressed; this.ReplayFrame(var6, var4, var5, var2, var3, false)) {
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
      }

      this.promptMsg = "";
      this.paint(this.getGraphics());
   }

   private void DoFatality() {
   }
}
