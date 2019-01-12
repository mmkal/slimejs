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
   private String[] slimeColText = new String[]{"Super Blue Slime ", "Power Green Slime "};
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
   private int frenzyCol = 0;
   private final int scoringRunForSuper = 2;
   private final int pow_HOPBALL = 1;
   private final int pow_KILLBALL = 2;
   private final int pow_INVERTBALL = 3;
   private final int pow_ATTRACTBALL = 4;
   private final int pow_REPELBALL = 5;
   private final int pow_HOPBALL_ENERGY = 10;
   private final int pow_KILLBALL_ENERGY = 35;
   private final int pow_INVERTBALL_ENERGY = 15;
   private final int pow_ATTRACTBALL_ENERGY = 5;
   private final int pow_REPELBALL_ENERGY = 5;
   private int p1Pow = 1;
   private int p2Pow = 1;
   private int p1PowReq = 10;
   private int p2PowReq = 10;
   private Color bgColor = new Color(0, 0, 50);
   private float p1Energy = 100.0F;
   private float p2Energy = 100.0F;
   String p1PowString = "undefined";
   String p2PowString = "undefined";
   boolean fBouncyRoof = true;

   public boolean handleEvent(Event event) {
      switch(event.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            switch(event.key) {
            case 9:
            case 81:
            case 113:
               this.slimerSpecial(1);
               break;
            case 10:
            case 72:
            case 104:
               this.slimerSpecial(2);
               break;
            case 65:
            case 97:
               this.p1XV = this.scoringRun <= -2?-16:-8;
               break;
            case 68:
            case 100:
               this.p1XV = this.scoringRun <= -2?16:8;
               break;
            case 73:
            case 105:
            case 1004:
               if(this.p2Y == 0) {
                  this.p2YV = this.scoringRun >= 2?45:31;
               }
               break;
            case 74:
            case 106:
            case 1006:
               this.p2XV = this.scoringRun >= 2?-16:-8;
               break;
            case 75:
            case 107:
            case 1005:
               if(this.fCanChangeCol) {
                  this.p2Pow = this.p2Pow != 5?this.p2Pow + 1:1;
                  switch(this.p2Pow) {
                  case 1:
                     this.p2PowReq = 10;
                     break;
                  case 2:
                     this.p2PowReq = 35;
                     break;
                  case 3:
                     this.p2PowReq = 15;
                     break;
                  case 4:
                     this.p2PowReq = 5;
                     break;
                  case 5:
                     this.p2PowReq = 5;
                  }

                  this.drawScores();
                  this.drawEnergyBars();
                  break;
               }
            case 32:
               this.mousePressed = true;
               break;
            case 76:
            case 108:
            case 1007:
               this.p2XV = this.scoringRun >= 2?16:8;
               break;
            case 83:
            case 115:
               this.p1Pow = this.p1Pow != 5?this.p1Pow + 1:1;
               switch(this.p1Pow) {
               case 1:
                  this.p1PowReq = 10;
                  break;
               case 2:
                  this.p1PowReq = 35;
                  break;
               case 3:
                  this.p1PowReq = 15;
                  break;
               case 4:
                  this.p1PowReq = 5;
                  break;
               case 5:
                  this.p1PowReq = 5;
               }

               this.drawScores();
               this.drawEnergyBars();
               break;
            case 87:
            case 119:
               if(this.p1Y == 0) {
                  this.p1YV = this.scoringRun <= -2?45:31;
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
      int k1 = this.nWidth / 10;
      int j2 = this.nHeight / 10;
      int i3 = this.nWidth / 50;
      int j3 = this.nHeight / 25;
      int k3 = this.ballX * this.nWidth / 1000;
      int l3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int i = this.p1OldX * this.nWidth / 1000 - k1 / 2;
      int l = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(this.bgColor);
      this.screen.fillRect(i, l, k1, j2);
      i = this.p2OldX * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(this.bgColor);
      this.screen.fillRect(i, l, k1, j2);
      this.MoveBall();
      i = this.p1X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun <= -2?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:Color.blue);
      this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
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

      i = this.p2X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun >= 2?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:Color.green);
      this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
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
         this.screen.setColor(flag?Color.gray:Color.white);
         this.screen.fillOval(i - i3, l - j3, i3, j3);
         if(k4 > 0 && !flag) {
            this.screen.setColor(Color.black);
            this.screen.fillOval(i - 4 * i4 / k4 - 3 * i3 / 4, l - 4 * j4 / k4 - 3 * j3 / 4, i3 / 2, j3 / 2);
         }
      } else {
         --this.p2Blink;
      }

      int i2;
      int l2;
      int k;
      int j1;
      int k5;
      if(this.nScore > 8) {
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

      } else {
         if(this.nScore < 2) {
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
   }

   public void paint(Graphics g) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      g.setColor(this.bgColor);
      g.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      g.setColor(Color.darkGray);
      g.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      g.setColor(Color.white);
      g.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      this.drawScores();
      this.drawPrompt();
      this.drawEnergyBars();
      if(!this.fInPlay) {
         FontMetrics fm = this.screen.getFontMetrics();
         g.setFont(new Font("Arial", 1, 150));
         fm = g.getFontMetrics();
         g.setColor(new Color(20, 20, 40));
         g.drawString("2", this.nWidth / 2 - fm.stringWidth("2") / 2, this.nHeight / 2 + 20);
         g.setFont(new Font("Courier", 0, 18));
         fm = g.getFontMetrics();
         g.setColor(new Color(255, 255, 255));
         g.drawString("Slime Volleyball", this.nWidth / 2 - fm.stringWidth("Slime Volleyball") / 2, this.nHeight / 2);
         g.setFont(new Font("Courier", 3, 12));
         fm = g.getFontMetrics();
         g.setColor(new Color(255, 255, 100));
         g.drawString("POWER SLIME - beta", this.nWidth / 2 - fm.stringWidth("POWER SLIME - beta") / 2, this.nHeight / 2 + 15);
         g.setFont(new Font("Arial", 0, 11));
         fm = g.getFontMetrics();
         g.setColor(new Color(255, 255, 255));
         fm = g.getFontMetrics();
         g.drawString("Written by Quin Pendragon", this.nWidth / 2 - fm.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + fm.getHeight() * 2 + 20);
         g.drawString("Mod by Tim Lightfoot", this.nWidth / 2 - fm.stringWidth("Mod by Tim Lightfoot") / 2, this.nHeight / 2 + fm.getHeight() * 2 + 35);
      }

   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   private void ReplayFrame(int i, int j, int k, int l, int i1, boolean flag) {
      if(flag) {
         this.ballX = this.ballOldX = -50000000;
         this.ballY = this.ballOldY = 100000;
         this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
      } else {
         int _ex = i != 0?i - 1:199;
         this.p1OldX = this.replayData[_ex][0];
         this.p1OldY = this.replayData[_ex][1];
         this.p2OldX = this.replayData[_ex][2];
         this.p2OldY = this.replayData[_ex][3];
         this.ballOldX = this.replayData[_ex][4];
         this.ballOldY = this.replayData[_ex][5];
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
         this.screen.setColor(this.bgColor);
         this.screen.fillRect(j, k - i1, l, i1 * 2);
      }

      this.DrawSlimers();

      try {
         Thread.sleep(20L);
      } catch (InterruptedException var8) {
         ;
      }
   }

   private String MakeTime(long l) {
      long l1 = l / 10L % 100L;
      long l2 = l / 1000L % 60L;
      long l3 = l / 60000L % 60L;
      long l4 = l / 3600000L;
      String s = "";
      if(l4 < 10L) {
         s = String.valueOf(String.valueOf(s)).concat("0");
      }

      s = String.valueOf(String.valueOf(s)).concat(String.valueOf(String.valueOf(l4)));
      s = String.valueOf(String.valueOf(s)).concat(":");
      if(l3 < 10L) {
         s = String.valueOf(String.valueOf(s)).concat("0");
      }

      s = String.valueOf(String.valueOf(s)).concat(String.valueOf(String.valueOf(l3)));
      s = String.valueOf(String.valueOf(s)).concat(":");
      if(l2 < 10L) {
         s = String.valueOf(String.valueOf(s)).concat("0");
      }

      s = String.valueOf(String.valueOf(s)).concat(String.valueOf(String.valueOf(l2)));
      s = String.valueOf(String.valueOf(s)).concat(":");
      if(l1 < 10L) {
         s = String.valueOf(String.valueOf(s)).concat("0");
      }

      s = String.valueOf(String.valueOf(s)).concat(String.valueOf(String.valueOf(l1)));
      return s;
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
         this.p1Y += this.p1YV -= this.scoringRun <= -2?4:2;
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
         this.p2Y += this.p2YV -= this.scoringRun >= 2?4:2;
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
      int k = 30 * this.nHeight / 1000;
      int i = this.ballOldX * this.nWidth / 1000;
      int j = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(this.bgColor);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(this.fBouncyRoof) {
         ;
      }

      if(!this.fEndGame) {
         int l1 = (this.ballX - this.p1X) * 2;
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
               this.ballVX += this.p1XV - 2 * l1 * k1 / i1;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p1YV - 2 * i2 * k1 / i1;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }

            this.fP1Touched = true;
         }

         l1 = (this.ballX - this.p2X) * 2;
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
               this.ballVX += this.p2XV - 2 * l1 * k1 / i1;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p2YV - 2 * i2 * k1 / i1;
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

      i = this.ballX * this.nWidth / 1000;
      j = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(Color.yellow);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
   }

   private void DrawStatus() {
      Graphics g = this.screen;
      int i = this.nHeight / 20;
      g.setColor(this.bgColor);
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int j = this.nWidth / 2 + (this.nScore - 5) * this.nWidth / 24;
      String s = String.valueOf(String.valueOf((new StringBuffer("Points: ")).append(this.nPointsScored).append("   Elapsed: ").append(this.MakeTime(this.gameTime))));
      int k = fontmetrics.stringWidth(s);
      g.fillRect(j - k / 2 - 5, 0, k + 10, i + 22);
      g.setColor(Color.white);
      this.screen.drawString(s, j - k / 2, fontmetrics.getAscent() + 20);
   }

   public void drawPrompt() {
      this.screen.setColor(Color.darkGray);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      this.drawPrompt(this.promptMsg, 0);
   }

   public void drawPrompt(String s, int i) {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      this.screen.setColor(Color.lightGray);
      this.screen.drawString(s, (this.nWidth - fontmetrics.stringWidth(s)) / 2, this.nHeight * 4 / 5 + fontmetrics.getHeight() * (i + 1) + 10);
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

      int i1;
      int j;
      for(i1 = 0; i1 < this.nScore; ++i1) {
         j = (i1 + 1) * this.nWidth / 24;
         g.setColor(Color.blue);
         g.fillOval(j, 20, k, k);
         g.setColor(Color.white);
         g.drawOval(j, 20, k, k);
      }

      g.setColor(this.bgColor);
      g.drawString("Special Ability: ".concat(String.valueOf(String.valueOf(this.p1PowString))), 20, 60);
      switch(this.p1Pow) {
      case 1:
         this.p1PowString = "Super Hop";
         break;
      case 2:
         this.p1PowString = "Stun Ball";
         break;
      case 3:
         this.p1PowString = "Invert Ball";
         break;
      case 4:
         this.p1PowString = "Telekenetic Attract";
         break;
      case 5:
         this.p1PowString = "Telekenetic Repel";
      }

      g.setColor(Color.white);
      g.drawString("Special Ability: ".concat(String.valueOf(String.valueOf(this.p1PowString))), 20, 60);

      for(i1 = 0; i1 < 10 - this.nScore; ++i1) {
         j = this.nWidth - (i1 + 1) * this.nWidth / 24 - k;
         g.setColor(Color.green);
         g.fillOval(j, 20, k, k);
         g.setColor(Color.white);
         g.drawOval(j, 20, k, k);
      }

      g.setColor(this.bgColor);
      g.drawString("Special Ability: ".concat(String.valueOf(String.valueOf(this.p2PowString))), this.nWidth - 200, 60);
      switch(this.p2Pow) {
      case 1:
         this.p2PowString = "Super Hop";
         break;
      case 2:
         this.p2PowString = "Stun Ball";
         break;
      case 3:
         this.p2PowString = "Invert Ball";
         break;
      case 4:
         this.p2PowString = "Telekenetic Attract";
         break;
      case 5:
         this.p2PowString = "Telekenetic Repel";
      }

      g.setColor(Color.white);
      g.drawString("Special Ability: ".concat(String.valueOf(String.valueOf(this.p2PowString))), this.nWidth - 200, 60);
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
         this.recoverSlimerEnergy();
         this.drawEnergyBars();
         this.drawScores();
         if(this.ballY < 35) {
            long l = System.currentTimeMillis();
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
               this.promptMsg = "It\'s official, you suck!";
            } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 2) {
               this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("is on fire!");
            } else if(this.ballX > 500 && this.fP1Touched && !this.fP2Touched || this.ballX <= 500 && !this.fP1Touched && this.fP2Touched) {
               this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("aces the serve!");
            } else if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
               this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("watches you make a tool of yourself!");
            } else {
               switch(this.nScore) {
               case 0:
               case 10:
                  if(this.nPointsScored == 5) {
                     this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("Wins with a QUICK FIVE!!!");
                  } else if(this.scoringRun == 8) {
                     this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("Wins with a BIG NINE!!!");
                  } else {
                     this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("Wins!!!");
                  }
                  break;
               case 1:
               case 2:
               case 3:
               case 7:
               case 8:
               case 9:
               default:
                  this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("Scores!");
                  break;
               case 4:
                  this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat(String.valueOf(String.valueOf(this.ballX >= 500?"Scores!":"takes the lead!!")));
                  break;
               case 5:
                  this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat("Equalizes!");
                  break;
               case 6:
                  this.promptMsg = String.valueOf(String.valueOf(this.promptMsg)).concat(String.valueOf(String.valueOf(this.ballX <= 500?"Scores!":"takes the lead!!")));
               }
            }

            this.fCanChangeCol = false;
            boolean flag = this.nScore != 0 && this.nScore != 10;
            int i = this.ballX;
            this.drawPrompt();
            if(flag) {
               this.drawPrompt("Click mouse or Hit space for replay...", 1);
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
            } else if(this.gameThread != null) {
               try {
                  Thread.sleep(2500L);
               } catch (InterruptedException var7) {
                  ;
               }
            }

            this.promptMsg = "";
            this.drawPrompt();
            this.fCanChangeCol = true;
            if(flag) {
               this.p1X = 200;
               this.p1Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p1XV = 0;
               this.p1YV = 0;
               this.p2XV = 0;
               this.p2YV = 0;
               this.ballX = i >= 500?200:800;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
               this.replayStart = this.replayPos = 0;
               this.fP1Touched = this.fP2Touched = false;
               this.repaint();
            }

            this.startTime += System.currentTimeMillis() - l;
         }

         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var6) {
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
   }

   private void DoReplay() {
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int i = fontmetrics.stringWidth("Replay...");
      int j = fontmetrics.getHeight();
      int k = this.nWidth / 2 - i / 2;
      int l = this.nHeight / 2 - j;
      this.promptMsg = "Click mouse or hit space to continue...";
      this.mousePressed = false;

      for(int i1 = this.replayPos - 1; !this.mousePressed; this.ReplayFrame(i1, k, l, i, j, false)) {
         ++i1;
         if(i1 >= 200) {
            i1 = 0;
         }

         if(i1 == this.replayPos) {
            try {
               Thread.sleep(1000L);
            } catch (InterruptedException var8) {
               ;
            }

            i1 = this.replayStart;
            this.paint(this.getGraphics());
         }
      }

      this.promptMsg = "";
      this.paint(this.getGraphics());
   }

   private void DoFatality() {
   }

   private void slimerSpecial(int playerNum) {
      if(this.fP1Touched && this.fP2Touched) {
         float dx;
         float dy;
         switch(playerNum) {
         case 1:
            if(this.scoringRun > -2) {
               this.p1Energy -= (float)this.p1PowReq;
            }

            switch(this.p1Pow) {
            case 1:
               if(this.p1Energy > (float)this.p1PowReq) {
                  this.promptMsg = "Slimer 1 Hops the ball!";
                  this.drawPrompt();
                  this.ballVY += 20;
                  this.drawEnergyBars();
               }

               return;
            case 2:
               if(this.p1Energy > (float)this.p1PowReq) {
                  this.promptMsg = "Slimer 1 stuns the ball!";
                  this.drawPrompt();
                  this.ballVX = 0;
                  this.ballVY = 0;
                  this.drawEnergyBars();
               }

               return;
            case 3:
               if(this.p1Energy > (float)this.p1PowReq) {
                  this.promptMsg = "Slimer 1 Inverts the ball!";
                  this.drawPrompt();
                  this.ballVX *= -1;
                  this.ballVY *= -1;
                  this.drawEnergyBars();
               }

               return;
            case 4:
               this.promptMsg = "Slimer 1 uses telekenetic attract!";
               this.drawPrompt();
               if(this.p1Energy > (float)this.p1PowReq) {
                  dx = (float)(this.ballX - this.p1X);
                  dy = (float)(this.ballY - this.p1Y);
                  if(Math.abs(dx) > Math.abs(dy)) {
                     dy /= dx;
                     dx /= Math.abs(dx);
                  } else {
                     dx /= dy;
                     dy /= Math.abs(dy);
                  }

                  this.ballVX = (int)((float)this.ballVX - (float)8 * dx);
                  this.ballVY = (int)((float)this.ballVY - (float)8 * dy);
                  this.drawEnergyBars();
               }

               return;
            case 5:
               if(this.p1Energy > (float)this.p1PowReq) {
                  this.promptMsg = "Slimer 1 uses telekenetic repel!";
                  this.drawPrompt();
                  dx = (float)(this.ballX - this.p1X);
                  dy = (float)(this.ballY - this.p1Y);
                  if(Math.abs(dx) > Math.abs(dy)) {
                     dy /= dx;
                     dx /= Math.abs(dx);
                  } else {
                     dx /= dy;
                     dy /= Math.abs(dy);
                  }

                  this.ballVX = (int)((float)this.ballVX + (float)10 * dx);
                  this.ballVY = (int)((float)this.ballVY + (float)10 * dy);
                  this.drawEnergyBars();
               }

               return;
            default:
               return;
            }
         case 2:
            if(this.scoringRun < 2) {
               this.p2Energy -= (float)this.p2PowReq;
            }

            switch(this.p2Pow) {
            case 1:
               if(this.p2Energy > (float)this.p2PowReq) {
                  this.promptMsg = "Slimer 2 Hops the ball!";
                  this.drawPrompt();
                  this.ballVY += 20;
                  this.drawEnergyBars();
               }
               break;
            case 2:
               if(this.p2Energy > (float)this.p2PowReq) {
                  this.promptMsg = "Slimer 2 stuns the ball!";
                  this.drawPrompt();
                  this.ballVX = 0;
                  this.ballVY = 0;
                  this.drawEnergyBars();
               }
               break;
            case 3:
               if(this.p2Energy > (float)this.p2PowReq) {
                  this.promptMsg = "Slimer 2 Inverts the ball!";
                  this.drawPrompt();
                  this.ballVX *= -1;
                  this.ballVY *= -1;
                  this.drawEnergyBars();
               }
               break;
            case 4:
               this.promptMsg = "Slimer 2 uses telekenetic attract!";
               this.drawPrompt();
               if(this.p2Energy > (float)this.p2PowReq) {
                  dx = (float)(this.ballX - this.p2X);
                  dy = (float)(this.ballY - this.p2Y);
                  if(Math.abs(dx) > Math.abs(dy)) {
                     dy /= dx;
                     dx /= Math.abs(dx);
                  } else {
                     dx /= dy;
                     dy /= Math.abs(dy);
                  }

                  this.ballVX = (int)((float)this.ballVX - (float)8 * dx);
                  this.ballVY = (int)((float)this.ballVY - (float)8 * dy);
                  this.drawEnergyBars();
               }
               break;
            case 5:
               if(this.p2Energy > (float)this.p2PowReq) {
                  this.promptMsg = "Slimer 2 uses telekenetic repel!";
                  this.drawPrompt();
                  dx = (float)(this.ballX - this.p2X);
                  dy = (float)(this.ballY - this.p2Y);
                  if(Math.abs(dx) > Math.abs(dy)) {
                     dy /= dx;
                     dx /= Math.abs(dx);
                  } else {
                     dx /= dy;
                     dy /= Math.abs(dy);
                  }

                  this.ballVX = (int)((float)this.ballVX + (float)10 * dx);
                  this.ballVY = (int)((float)this.ballVY + (float)10 * dy);
                  this.drawEnergyBars();
               }
            }
         }
      } else {
         this.promptMsg = "Sorry, No more cheap points!";
         this.drawPrompt();
      }

   }

   private void recoverSlimerEnergy() {
      if(this.p1Energy < (float)100) {
         this.p1Energy = (float)((double)this.p1Energy + 0.22D);
      }

      if(this.p2Energy < (float)100) {
         this.p2Energy = (float)((double)this.p2Energy + 0.22D);
      }

   }

   private void drawEnergyBars() {
      this.screen.setColor(Color.darkGray);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 30, this.nWidth, 15);
      this.screen.setColor(Color.black);
      this.screen.drawRect(10, 4 * this.nHeight / 5 + 30, this.nWidth / 2 - 20, 15);
      this.screen.drawRect(10 + this.nWidth / 2, 4 * this.nHeight / 5 + 30, this.nWidth / 2 - 20, 15);
      this.screen.setColor(new Color(50, 50, 255));
      this.screen.fillRect(11, 4 * this.nHeight / 5 + 31, (int)((float)(this.nWidth / 2 - 22) * this.p1Energy) / 100, 14);
      this.screen.setColor(new Color(30, 30, 30));
      this.screen.drawRect(10, 4 * this.nHeight / 5 + 30, (this.nWidth / 2 - 20) * this.p1PowReq / 100, 15);
      this.screen.setColor(new Color(50, 255, 50));
      this.screen.fillRect(11 + this.nWidth / 2, 4 * this.nHeight / 5 + 31, (int)((float)(this.nWidth / 2 - 22) * this.p2Energy) / 100, 14);
      this.screen.setColor(new Color(30, 30, 30));
      this.screen.drawRect(10 + this.nWidth / 2, 4 * this.nHeight / 5 + 30, (this.nWidth / 2 - 20) * this.p2PowReq / 100, 15);
   }
}
