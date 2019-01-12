import java.applet.Applet;
import java.applet.AudioClip;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;

public class Slime2P2 extends Applet implements Runnable {
   private Image image;
   private AudioClip ScoreSound;
   private AudioClip TouchSlime1;
   private AudioClip TouchSlime2;
   private int nWidth;
   private int nHeight;
   private final int topScore = 10;
   private int nScore;
   private int nPointsScored;
   private int p1X;
   private int p2X;
   private int p3X;
   private int p4X;
   private int p1Y;
   private int p2Y;
   private int p3Y;
   private int p4Y;
   private int p1Col;
   private int p2Col;
   private int p3Col;
   private int p4Col;
   private Color[] slimeColours;
   private String[] slimeColText = new String[]{"Team Slimonds ", "Team Green Magic ", "The Golden Boyz ", "Gaw\'s Troop ", "The Masters "};
   private int p1OldX;
   private int p2OldX;
   private int p3OldX;
   private int p4OldX;
   private int p1OldY;
   private int p2OldY;
   private int p3OldY;
   private int p4OldY;
   private int p1XV;
   private int p2XV;
   private int p3XV;
   private int p4XV;
   private int p1YV;
   private int p2YV;
   private int p3YV;
   private int p4YV;
   private int ballX;
   private int ballY;
   private int ballVX;
   private int ballVY;
   private int ballOldX;
   private int ballOldY;
   private Graphics screen;
   private String promptMsg;
   private boolean mousePressed;
   private boolean fCanChangeCol;
   private boolean fInPlay;
   private int p1Blink;
   private int p2Blink;
   private int p3Blink;
   private int p4Blink;
   private boolean fP1Touched;
   private boolean fP2Touched;
   private boolean fP3Touched;
   private boolean fP4Touched;
   private Thread gameThread;
   private boolean fEndGame;
   private long startTime;
   private long gameTime;
   private int scoringRun;
   private int frenzyCol = 0;
   private final int scoringRunForSuper = 12;

   public Slime2P2() {
      this.p2Col = this.p3Col = 1;
      this.p1Col = this.p4Col = 0;
      this.slimeColours = new Color[]{Color.red, Color.green, Color.yellow, Color.white, Color.black};
   }

   private void DoFatality() {
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
      var7 = this.p4OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p4OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7, var8, var1, var2);
      var7 = this.p2OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7, var8, var1, var2);
      var7 = this.p3OldX * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p3OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(var7, var8, var1, var2);
      this.MoveBall();
      var7 = this.p1X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun <= -12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
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

      var7 = this.p4X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p4Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun <= -12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
      this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
      var9 = this.p4X + 38;
      var10 = this.p4Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      var11 = var7 - var5;
      var12 = var8 - var6;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      var14 = Math.random() < 0.01D;
      if(var14) {
         this.p4Blink = 5;
      }

      if(this.p4Blink == 0) {
         this.screen.setColor(Color.white);
         this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
         if(var13 > 0 && !var14) {
            this.screen.setColor(Color.red);
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
         }
      } else {
         --this.p4Blink;
      }

      var7 = this.p2X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun >= 12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
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

      var7 = this.p3X * this.nWidth / 1000 - var1 / 2;
      var8 = 7 * this.nHeight / 10 - this.p3Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun >= 12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
      this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
      var9 = this.p3X - 18;
      var10 = this.p3Y - 60;
      var7 = var9 * this.nWidth / 1000;
      var8 = 7 * this.nHeight / 10 - var10 * this.nHeight / 1000;
      var11 = var7 - var5;
      var12 = var8 - var6;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      var14 = Math.random() < 0.01D;
      if(var14) {
         this.p3Blink = 5;
      }

      if(this.p3Blink == 0) {
         this.screen.setColor(var14?Color.gray:Color.white);
         this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
         if(var13 > 0 && !var14) {
            this.screen.setColor(Color.red);
            this.screen.fillOval(var7 - 4 * var11 / var13 - 3 * var3 / 4, var8 - 4 * var12 / var13 - 3 * var4 / 4, var3 / 2, var4 / 2);
         }
      } else {
         --this.p3Blink;
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

         var15 = this.p4X * this.nWidth / 1000;
         var16 = 7 * this.nHeight / 10 - (this.p4Y - 40) * this.nHeight / 1000;
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

            var15 = this.nWidth / 20;
            var16 = this.nHeight / 20;
            var17 = this.p3X * this.nWidth / 1000 - var15;
            var18 = 7 * this.nHeight / 10 - (this.p3Y - 40) * this.nHeight / 1000;
            var19 = 0;

            do {
               this.screen.setColor(Color.black);
               this.screen.drawArc(var17, var18 + var19, var15, var16, -10, -150);
               ++var19;
            } while(var19 < 3);
         }

      }
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

   private void MoveBall() {
      int var1 = 30 * this.nHeight / 1000;
      int var2 = this.ballOldX * this.nWidth / 1000;
      int var3 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
      this.ballY += --this.ballVY;
      this.ballX = (int)((double)this.ballX + 1.5D * (double)this.ballVX);
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
            if(this.TouchSlime1 != null) {
               this.TouchSlime1.play();
            }
         }

         var4 = (this.ballX - this.p4X) * 2;
         var5 = this.ballY - this.p4Y;
         var6 = var4 * var4 + var5 * var5;
         var7 = this.ballVX - this.p4XV;
         var8 = this.ballVY - this.p4YV;
         if(var5 > 0 && var6 < 15625 && var6 > 25) {
            var9 = (int)Math.sqrt((double)var6);
            var10 = (var4 * var7 + var5 * var8) / var9;
            this.ballX = this.p4X + var4 * 63 / var9;
            this.ballY = this.p4Y + var5 * 125 / var9;
            if(var10 <= 0) {
               this.ballVX += this.p4XV - 2 * var4 * var10 / var9;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p4YV - 2 * var5 * var10 / var9;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            this.fP4Touched = true;
            if(this.TouchSlime1 != null) {
               this.TouchSlime1.play();
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

            this.fP2Touched = true;
            if(this.TouchSlime2 != null) {
               this.TouchSlime2.play();
            }
         }

         var4 = (this.ballX - this.p3X) * 2;
         var5 = this.ballY - this.p3Y;
         var6 = var4 * var4 + var5 * var5;
         var7 = this.ballVX - this.p3XV;
         var8 = this.ballVY - this.p3YV;
         if(var5 > 0 && var6 < 15625 && var6 > 25) {
            var9 = (int)Math.sqrt((double)var6);
            var10 = (var4 * var7 + var5 * var8) / var9;
            this.ballX = this.p3X + var4 * 63 / var9;
            this.ballY = this.p3Y + var5 * 125 / var9;
            if(var10 <= 0) {
               this.ballVX += this.p3XV - 2 * var4 * var10 / var9;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p3YV - 2 * var5 * var10 / var9;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            this.fP3Touched = true;
            if(this.TouchSlime2 != null) {
               this.TouchSlime2.play();
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

   private void MoveSlimers() {
      this.p1X += this.p1XV;
      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > 445) {
         this.p1X = 445;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= this.scoringRun <= -12?4:2;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         }
      }

      this.p4X += this.p4XV;
      if(this.p4X < 50) {
         this.p4X = 50;
      }

      if(this.p4X > 445) {
         this.p4X = 445;
      }

      if(this.p4YV != 0) {
         this.p4Y += this.p4YV -= this.scoringRun <= -12?4:2;
         if(this.p4Y < 0) {
            this.p4Y = 0;
            this.p4YV = 0;
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
         this.p2Y += this.p2YV -= this.scoringRun >= 12?4:2;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

      this.p3X += this.p3XV;
      if(this.p3X > 950) {
         this.p3X = 950;
      }

      if(this.p3X < 555) {
         this.p3X = 555;
      }

      if(this.p3YV != 0) {
         this.p3Y += this.p3YV -= this.scoringRun >= 12?4:2;
         if(this.p3Y < 0) {
            this.p3Y = 0;
            this.p3YV = 0;
         }
      }

   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
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

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            switch(var1.key) {
            case 52:
               this.p3XV = this.scoringRun <= -12?-16:-8;
               break;
            case 53:
            case 1005:
               if(this.fCanChangeCol) {
                  do {
                     this.p2Col = this.p3Col = this.p2Col != 4?this.p2Col + 1:0;
                  } while(this.p2Col == this.p1Col);

                  this.drawScores();
                  break;
               }
            case 32:
               this.mousePressed = true;
               break;
            case 54:
               this.p3XV = this.scoringRun <= -12?16:8;
               break;
            case 56:
               if(this.p3Y == 0) {
                  this.p3YV = this.scoringRun <= -12?45:31;
               }
               break;
            case 65:
            case 97:
               this.p1XV = this.scoringRun <= -12?-16:-8;
               break;
            case 68:
            case 100:
               this.p1XV = this.scoringRun <= -12?16:8;
               break;
            case 73:
            case 105:
               if(this.p4Y == 0) {
                  this.p4YV = this.scoringRun >= 12?45:31;
               }
               break;
            case 74:
            case 106:
               this.p4XV = this.scoringRun >= 12?-16:-8;
               break;
            case 75:
            case 83:
            case 107:
            case 115:
               if(this.fCanChangeCol) {
                  do {
                     this.p1Col = this.p4Col = this.p1Col != 4?this.p1Col + 1:0;
                  } while(this.p1Col == this.p2Col);

                  this.drawScores();
               }
               break;
            case 76:
            case 108:
               this.p4XV = this.scoringRun >= 12?16:8;
               break;
            case 87:
            case 119:
               if(this.p1Y == 0) {
                  this.p1YV = this.scoringRun <= -12?45:31;
               }
               break;
            case 1004:
               if(this.p2Y == 0) {
                  this.p2YV = this.scoringRun >= 12?45:31;
               }
               break;
            case 1006:
               this.p2XV = this.scoringRun >= 12?-16:-8;
               break;
            case 1007:
               this.p2XV = this.scoringRun >= 12?16:8;
            }
         }
         break;
      case 402:
      case 404:
         switch(var1.key) {
         case 52:
            if(this.p3XV < 0) {
               this.p3XV = 0;
            }

            return false;
         case 54:
            if(this.p3XV > 0) {
               this.p3XV = 0;
            }

            return false;
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
            if(this.p4XV < 0) {
               this.p4XV = 0;
            }

            return false;
         case 76:
         case 108:
            if(this.p4XV > 0) {
               this.p4XV = 0;
            }

            return false;
         case 1006:
            if(this.p2XV < 0) {
               this.p2XV = 0;
            }

            return false;
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
            this.p3X = 600;
            this.p3Y = 0;
            this.p2X = 800;
            this.p2Y = 0;
            this.p4X = 400;
            this.p4Y = 0;
            this.p1XV = 0;
            this.p1YV = 0;
            this.p2XV = 0;
            this.p2YV = 0;
            this.p3XV = 0;
            this.p3YV = 0;
            this.p4XV = 0;
            this.p4YV = 0;
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
         this.showStatus("Modified by: Brad Neish, Eddie Rabenda, Chris Jochem, and Brian Pegram.");
      }

      return false;
   }

   public void init() {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.nScore = 5;
      this.TouchSlime1 = this.getAudioClip(this.getCodeBase(), "exclamation.au");
      this.TouchSlime2 = this.getAudioClip(this.getCodeBase(), "doiinggg.au");
      this.image = this.getImage(this.getCodeBase(), "slimevolleyball.jpg");
      this.ScoreSound = this.getAudioClip(this.getCodeBase(), "down.au");
      this.fInPlay = this.fEndGame = false;
      this.fCanChangeCol = true;
      this.promptMsg = "Click the mouse to play...";
      this.screen = this.getGraphics();
      this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
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
         this.image.getHeight(this);
         var1.drawImage(this.image, 0, 0, this);
      }

   }

   public void run() {
      this.p1Col = 0;
      this.p2Col = 1;
      this.scoringRun = 0;
      this.fP1Touched = this.fP2Touched = false;
      this.nPointsScored = 0;
      this.startTime = System.currentTimeMillis();

      while(this.nScore != 0 && this.nScore != 10 && this.gameThread != null) {
         this.gameTime = System.currentTimeMillis() - this.startTime;
         this.p1OldX = this.p1X;
         this.p1OldY = this.p1Y;
         this.p2OldX = this.p2X;
         this.p2OldY = this.p2Y;
         this.p3OldX = this.p3X;
         this.p3OldY = this.p3Y;
         this.p4OldX = this.p4X;
         this.p4OldY = this.p4Y;
         this.ballOldX = this.ballX;
         this.ballOldY = this.ballY;
         this.MoveSlimers();
         this.DrawSlimers();
         this.DrawStatus();
         if(this.ballY < 35) {
            if(this.ScoreSound != null) {
               this.ScoreSound.play();
            }

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
            if(!this.fP1Touched && !this.fP2Touched && !this.fP3Touched && !this.fP4Touched) {
               this.promptMsg = "What can I say?";
            } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 12) {
               this.promptMsg = this.promptMsg + "is on fire!";
            } else if((this.ballX <= 500 || !this.fP1Touched && !this.fP4Touched || this.fP2Touched || this.fP3Touched) && (this.ballX > 500 || this.fP1Touched || this.fP4Touched || !this.fP2Touched && !this.fP3Touched)) {
               if(this.ballX > 500 && !this.fP1Touched && !this.fP4Touched && (this.fP2Touched || this.fP3Touched) || this.ballX <= 500 && (this.fP1Touched || this.fP4Touched) && !this.fP2Touched && !this.fP3Touched) {
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
                  case 1:
                  case 2:
                  case 3:
                  case 7:
                  case 8:
                  case 9:
                  default:
                     this.promptMsg = this.promptMsg + "Scores!";
                     break;
                  case 4:
                     this.promptMsg = this.promptMsg + (this.ballX >= 500?"Scores!":"takes the lead!!");
                     break;
                  case 5:
                     this.promptMsg = this.promptMsg + "Equalizes!";
                     break;
                  case 6:
                     this.promptMsg = this.promptMsg + (this.ballX <= 500?"Scores!":"takes the lead!!");
                  }
               }
            } else {
               this.promptMsg = this.promptMsg + "aces the serve!";
            }

            this.fCanChangeCol = false;
            boolean var3 = this.nScore != 0 && this.nScore != 10;
            int var4 = this.ballX;
            this.drawPrompt();
            if(this.gameThread != null) {
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
               this.p3X = 600;
               this.p3Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p4X = 400;
               this.p4Y = 0;
               this.ballX = var4 >= 500?200:800;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
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
      this.fInPlay = false;
      this.promptMsg = "Click the mouse to play...";
      this.repaint();
   }
}
