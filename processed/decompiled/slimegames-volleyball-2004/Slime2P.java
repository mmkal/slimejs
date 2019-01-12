import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.net.URL;

public class Slime2P extends Applet implements Runnable {
   private int SERVE = 0;
   private int SERVE_ALT;
   private int NUM_DIFFERENT_SERVES = 6;
   private int SERVE_STATE = 0;
   private int randomoffset = 0;
   private int Level = 1;
   private int currentstate;
   private int timesincelastjump = 0;
   private int timesincelastdirectionchange = 0;
   private int whereland = 0;
   private int uwhereland = 0;
   private int bestposition = 800;
   private int counter = 0;
   private boolean p1CanJump = true;
   private boolean p2CanJump = false;
   int p1TouchCounter = 0;
   int p2TouchCounter = 0;
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
   private String[] slimeColText = new String[]{"Big Red Slime ", "The Green Monster ", "Golden Boy ", "The Great White Slime ", "The Grass Tree© "};
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
   private final int scoringRunForSuper = 300;

   public boolean handleEvent(Event event) {
      switch(event.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            switch(event.key) {
            case 32:
               this.mousePressed = true;
               break;
            case 65:
            case 74:
            case 97:
            case 106:
            case 1006:
               this.p1XV = this.scoringRun <= -300?-16:-8;
               break;
            case 68:
            case 76:
            case 100:
            case 108:
            case 1007:
               this.p1XV = this.scoringRun <= -300?16:8;
               break;
            case 73:
            case 87:
            case 105:
            case 119:
            case 1004:
               if(this.p1Y == 0 && this.p1CanJump) {
                  this.p1YV = this.scoringRun <= -300?45:31;
               }
            }
         }
         break;
      case 402:
      case 404:
         switch(event.key) {
         case 65:
         case 74:
         case 97:
         case 106:
         case 1006:
            if(this.p1XV < 0) {
               this.p1XV = 0;
            }

            return false;
         case 68:
         case 76:
         case 100:
         case 108:
         case 1007:
            if(this.p1XV > 0) {
               this.p1XV = 0;
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
         this.showStatus("Slime Volleyball 1-Player, by Chris Coyne: www.chriscoyne.com");
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
      this.MoveBall();
      i = this.p1X * this.nWidth / 1000 - k1 / 2;
      l = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.scoringRun <= -300?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
      if(!this.p1CanJump) {
         this.screen.setColor(Color.gray);
      }

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
      this.screen.setColor(this.scoringRun >= 300?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
      if(!this.p2CanJump) {
         this.screen.setColor(Color.gray);
      }

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
      if(this.p1TouchCounter > 3) {
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
      } else if(this.nScore > 8) {
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

         return;
      }

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

   public void paint(Graphics g) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      g.setColor(Color.blue);
      g.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      g.setColor(Color.gray);
      g.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      g.setColor(Color.white);
      g.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      g.setColor(Color.black);
      g.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10 + 2, 4, this.nHeight / 10 - 14);
      this.drawScores();
      this.drawPrompt();
      if(!this.fInPlay) {
         FontMetrics fontmetrics = this.screen.getFontMetrics();
         this.screen.setColor(Color.black);
         this.screen.fillRect(260, 220, 240, 25);
         this.screen.setColor(Color.white);
         this.screen.drawString("Slime Volleyball 2004", this.nWidth / 2 - fontmetrics.stringWidth("Slime Volleyball 2004") / 2, this.nHeight / 2 - fontmetrics.getHeight());
         g.setColor(Color.white);
         fontmetrics = g.getFontMetrics();
         g.drawString("AI by Chris Coyne v 1.1", this.nWidth / 2 - fontmetrics.stringWidth("AI by Chris Coyne") / 2, this.nHeight / 2 + fontmetrics.getHeight() * 2);
         g.drawString("newest version always at www.chriscoyne.com", this.nWidth / 2 - fontmetrics.stringWidth("newest version always at www.chriscoyne.com") / 2, this.nHeight / 2 + 20 + fontmetrics.getHeight() * 2);
         g.drawString("based on 2-Player by Quin Pendragon", this.nWidth / 2 - fontmetrics.stringWidth("based on 2-Player by Quin Pendragon") / 2, this.nHeight / 2 + 40 + fontmetrics.getHeight() * 2);
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
         this.screen.setColor(Color.blue);
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
         s = s + "0";
      }

      s = s + l4;
      s = s + ":";
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
      this.p1X += this.p1XV;
      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > 445) {
         this.p1X = 445;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= this.scoringRun <= -300?4:2;
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
         this.p2Y += this.p2YV -= this.scoringRun >= 300?4:2;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

   }

   private boolean CanHitWithJump() {
      if(this.p2Y != 0) {
         return false;
      } else {
         int bY = this.ballY;
         int bVY = this.ballVY;
         int bX = this.ballX;
         int bVX = this.ballVX;
         int pY = 0;
         int pVY = 31;
         int pX = this.p2X;
         int pVX = this.p2XV;

         while(bY > 0 && pY >= 0 && (pVY > 0 || pX < 640 && pVY > -20 + (pX - 550) / 5)) {
            --bVY;
            bY += bVY;
            bX += bVX;
            pVY -= 2;
            pY += pVY;
            if(pX > this.whereland) {
               pX -= 8;
            } else if(pX < this.whereland) {
               pX += 8;
            }

            if(pX < 555) {
               pX = 555;
            }

            if(Math.abs(bX - pX) < 30 && Math.abs(bY - pY) < 35 && bY > pY) {
               if(bVX < 0 && pX < 900 && bX > pX - 10) {
                  return false;
               }

               return true;
            }
         }

         return false;
      }
   }

   private double TimeTillLand(int Y, int VY) {
      int t;
      for(t = -1; Y > 120; ++t) {
         --VY;
         Y += VY;
      }

      return (double)t;
   }

   private void Player2_Level1_AI() {
      Graphics g = this.screen;
      ++this.timesincelastjump;
      ++this.timesincelastdirectionchange;
      if(this.counter % 50 == 0) {
         this.randomoffset = 0;
      }

      if(this.counter % 3 == 0) {
         double timetillland = this.TimeTillLand(this.ballY, this.ballVY);
         this.whereland = (int)((double)this.ballX + (double)this.ballVX * timetillland);
         this.uwhereland = this.whereland;
         if(this.whereland < 0) {
            this.whereland = Math.abs(this.whereland);
         } else if(this.whereland > 1100) {
            this.whereland = 1980 - this.whereland;
         } else if(this.whereland > 990 && this.ballX > this.p2X) {
            this.whereland = 1980 - this.whereland;
         }

         if(Math.abs(this.ballVX) > 3) {
            this.bestposition = this.whereland + 10;
         } else {
            this.bestposition = this.whereland + 4;
         }

         if(this.whereland < 600) {
            this.bestposition += 7;
         } else if(this.whereland < 700) {
            this.bestposition += 4;
         } else if(this.whereland < 800) {
            this.bestposition += 2;
         }

         this.bestposition += this.randomoffset;
         if(this.whereland < 250) {
            this.bestposition = this.whereland + 550 - (int)(200.0D * Math.random()) + (int)(200.0D * Math.random());
         } else if(this.whereland < 500) {
            this.bestposition = 650 + (int)(100.0D * Math.random()) - (int)(100.0D * Math.random());
         }
      }

      if(this.counter % 500 == 0) {
         this.SERVE = (int)(1000.0D * Math.random()) % this.NUM_DIFFERENT_SERVES;
         this.SERVE_ALT = (int)(1000.0D * Math.random());
      }

      if(this.SERVE == 0 && this.whereland == 800) {
         if(this.counter > 200) {
            this.counter = 0;
         }

         if(this.counter < 150) {
            this.bestposition = 800;
         }

         this.SERVE_STATE = 0;
      }

      if((this.SERVE == 1 || this.SERVE == 2) && this.SERVE_STATE == 0 && this.whereland == 800) {
         this.SERVE_STATE = 1;
         this.bestposition = 800;
      } else if((this.SERVE == 1 || this.SERVE == 2) && this.SERVE_STATE > 0) {
         this.bestposition = 800;
         if(this.SERVE_STATE == 1 && this.ballVY > 10 && this.ballY > 300 && this.whereland == 800) {
            this.SERVE_STATE = 2;
         } else if(this.SERVE_STATE == 2 && this.whereland == 800) {
            this.bestposition = 772 + 56 * (this.SERVE - 1);
         } else if(this.SERVE_STATE == 2) {
            this.bestposition = 772 + 56 * (this.SERVE - 1);
         }

         if(this.whereland < 500) {
            this.SERVE_STATE = 0;
         }
      }

      if((this.SERVE == 4 || this.SERVE == 5 || this.SERVE == 3) && this.SERVE_STATE == 0 && this.whereland == 800) {
         this.SERVE_STATE = 1;
         this.bestposition = 800;
         if(this.p2Y == 0) {
            this.SERVE_STATE = 3;
            this.p2YV = 31;
         }
      } else if((this.SERVE == 4 || this.SERVE == 5 || this.SERVE == 3) && this.SERVE_STATE > 0) {
         this.bestposition = 800;
         if(this.SERVE_STATE == 1 && this.ballVY > 1 && this.ballY > 200 && this.whereland == 800) {
            this.SERVE_STATE = 2;
         } else if(this.SERVE_STATE == 2 && this.whereland == 800) {
            if(this.p2Y == 0 && this.ballY < 290) {
               this.p2YV = 31;
               this.SERVE_STATE = 3;
            }

            this.bestposition = 805 + this.SERVE_ALT % 6 * 6;
         } else if(this.ballX < 700) {
            this.SERVE_STATE = 0;
         } else if(this.SERVE_STATE == 3) {
            this.bestposition = 805 + this.SERVE_ALT % 6 * 6;
            if(this.p2X > this.bestposition + 4) {
               this.p2XV = -8;
            } else if(this.p2X < this.bestposition - 4) {
               this.p2XV = 8;
            } else {
               this.p2XV = 0;
            }

            if(this.ballVY < 0 && this.ballY < 550 && this.p2Y == 0) {
               this.p2YV = 31;
            }
         }
      }

      if(this.whereland == this.uwhereland && this.whereland != 800 && this.SERVE_STATE == 0) {
         if(this.whereland > 480 && this.CanHitWithJump()) {
            this.p2YV = 31;
            this.p2XV = 0;
            this.timesincelastjump = 0;
         }
      } else if(this.whereland - this.p2X > 50 && this.whereland != 800 && this.SERVE_STATE == 0 && this.whereland > 480 && this.CanHitWithJump()) {
         this.p2YV = 31;
         this.p2XV = 0;
         this.timesincelastjump = 0;
      }

      if(this.p2X + 3 < this.bestposition && this.timesincelastdirectionchange > 10 && this.p2Y == 0) {
         if(this.p2XV != 8) {
            this.timesincelastdirectionchange = 0;
         }

         this.p2XV = 8;
      } else if(this.whereland > 970 && this.timesincelastdirectionchange > 10 && this.p2Y == 0) {
         if(this.p2XV != 8) {
            this.timesincelastdirectionchange = 0;
         }

         this.p2XV = 8;
      } else if(this.p2X - 3 > this.bestposition && this.timesincelastdirectionchange > 10 && this.p2Y == 0) {
         if(this.p2XV != -8) {
            this.timesincelastdirectionchange = 0;
         }

         this.p2XV = -8;
      } else if(Math.abs(this.p2X - this.bestposition) < 5 && this.p2Y == 0) {
         this.p2XV = 0;
      }

      if(this.p2Y > 0 && this.SERVE_STATE == 0 && Math.abs(this.ballVX) > 3) {
         if(this.p2X < this.whereland - 5) {
            if(this.p2XV != 8) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = 8;
         } else if(this.p2X > this.whereland + 5) {
            if(this.p2XV != -8) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = -8;
         } else if(this.p2X < this.whereland + 4 && this.p2X > this.whereland - 4) {
            if(this.p2XV != 0) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = 0;
         }
      } else if(this.p2Y > 0 && this.SERVE_STATE == 0) {
         if(this.p2X < this.whereland + 2 && this.timesincelastdirectionchange > 3) {
            if(this.p2XV != 8) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = 8;
         } else if(this.p2X > this.whereland + 11 && this.timesincelastdirectionchange > 3) {
            if(this.p2XV != -8) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = -8;
         } else if(this.p2X >= this.whereland + 2 && this.p2X <= this.whereland + 10) {
            if(this.p2XV != 0) {
               this.timesincelastdirectionchange = 0;
            }

            this.p2XV = 0;
         }
      }

      if(this.p2Y > 0 && this.whereland > 490 && this.timesincelastdirectionchange > 0 && Math.abs(this.ballX - this.bestposition) < 20) {
         if(this.p2XV != 0) {
            this.timesincelastdirectionchange = 0;
         }

         this.p2XV = 0;
      }

      ++this.counter;
   }

   private void Player2_Level2_AI() {
   }

   public Slime2P() {
      this.slimeColours = new Color[]{Color.red, Color.green, Color.white, Color.white, Color.black};
      this.replayData = new int[200][8];
   }

   private void MoveBall() {
      int k = 30 * this.nHeight / 1000;
      int i = this.ballOldX * this.nWidth / 1000;
      int j = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(this.ballX >= 500) {
         this.p1CanJump = true;
         this.p1TouchCounter = 0;
      } else if(this.ballX <= 500) {
         this.p2CanJump = true;
         this.p2TouchCounter = 0;
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
            ++this.p1TouchCounter;
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
            ++this.p2TouchCounter;
         }

         if(this.ballX < 15) {
            if(!this.fP2Touched) {
               this.p1CanJump = false;
            }

            this.ballX = 15;
            this.ballVX = -this.ballVX;
         }

         if(this.ballX > 985) {
            if(!this.fP1Touched) {
               this.p2CanJump = false;
            }

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
      this.screen.setColor(Color.white);
      this.screen.fillOval(i - k, j - k, k * 2, k * 2);
   }

   private void DrawStatus() {
      Graphics g = this.screen;
      int i = this.nHeight / 20;
      g.setColor(Color.blue);
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int j = this.nWidth / 2 + (this.nScore - 5) * this.nWidth / 24;
      String s = "Points Scored: " + this.nPointsScored + "   Elapsed: " + this.MakeTime(this.gameTime);
      int k = fontmetrics.stringWidth(s);
      g.fillRect(j - k / 2 - 5, 0, k + 10, i + 22);
      g.setColor(Color.white);
      this.screen.drawString(s, j - k / 2, fontmetrics.getAscent() + 20);
   }

   public void drawPrompt() {
      this.screen.setColor(Color.gray);
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
      g.setColor(Color.blue);
      g.fillRect(0, 0, this.nWidth, k + 22);

      int i1;
      int j;
      for(i1 = 0; i1 < this.nScore; ++i1) {
         j = (i1 + 1) * this.nWidth / 24;
         g.setColor(this.slimeColours[this.p1Col]);
         g.fillOval(j, 20, k, k);
         g.setColor(Color.white);
         g.drawOval(j, 20, k, k);
      }

      for(i1 = 0; i1 < 10 - this.nScore; ++i1) {
         j = this.nWidth - (i1 + 1) * this.nWidth / 24 - k;
         g.setColor(this.slimeColours[this.p2Col]);
         g.fillOval(j, 20, k, k);
         g.setColor(Color.white);
         g.drawOval(j, 20, k, k);
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
         if(this.Level == 1) {
            this.Player2_Level1_AI();
         } else if(this.Level == 2) {
            this.Player2_Level2_AI();
         }

         this.MoveSlimers();
         this.DrawSlimers();
         this.DrawStatus();
         if(this.ballY < 35) {
            this.p1TouchCounter = 0;
            this.p2TouchCounter = 0;
            this.p1CanJump = true;
            this.p2CanJump = true;
            this.counter = 0;
            long _ex = System.currentTimeMillis();
            ++this.nPointsScored;
            this.nScore += this.ballX <= 500?-1:1;
            Graphics g = this.screen;
            if(this.nScore == 10) {
               FontMetrics flag = this.screen.getFontMetrics();
               this.screen.setColor(Color.black);
               this.screen.fillRect(160, 200, 440, 85);
               this.screen.setColor(Color.white);
               this.screen.drawString("YOU WON!", this.nWidth / 2 - flag.stringWidth("YOU WON!") / 2, this.nHeight / 2 - flag.getHeight());
               g.setColor(Color.white);
               flag = g.getFontMetrics();
               g.drawString("The game took " + this.MakeTime(this.gameTime), this.nWidth / 2 - flag.stringWidth("The Game took 5:35:45") / 2, this.nHeight / 2 + flag.getHeight() * 2);
               g.drawString("It was a " + this.nPointsScored + " point game!", this.nWidth / 2 - flag.stringWidth("It was a 34 points game") / 2, this.nHeight / 2 + 20 + flag.getHeight() * 2);
               g.drawString("To prove your victory, send this victory code:" + (73 + 3 * this.nPointsScored) + "x" + (this.gameTime / 2L - 1234L) + " to ccoyne@post.harvard.edu", this.nWidth / 2 - flag.stringWidth("Please send to Chris Coyne with victory code sadf asdfdsaf to ccoyne@post.harvard.edu") / 2, this.nHeight / 2 + 40 + flag.getHeight() * 2);

               try {
                  Thread.sleep(15000L);
                  this.getAppletContext().showDocument(new URL("mailto:ccoyne@post.harvard.edu?subject=Slime 2004 1.1 Victory &body=Chris, please add my " + this.nPointsScored + " point game to the high score list; my victory code is " + (73 + 3 * this.nPointsScored) + "x" + (this.gameTime / 2L - 1234L) + "%0d%0dMy name is ____, I am ___ years old, and I live in ______"));
               } catch (Exception var11) {
                  this.showStatus("Failed to connect to Email");
               }

               if(this.gameThread != null) {
                  try {
                     Thread.sleep(250000L);
                  } catch (InterruptedException var10) {
                     ;
                  }
               }
            }

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
            } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) == 300) {
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
            boolean var12 = this.nScore != 0 && this.nScore != 10;
            int i = this.ballX;
            this.drawPrompt();
            if(var12) {
               this.drawPrompt("Click mouse for replay...", 1);
               this.mousePressed = false;
               if(this.gameThread != null) {
                  try {
                     Thread.sleep(2500L);
                  } catch (InterruptedException var9) {
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
               } catch (InterruptedException var8) {
                  ;
               }
            }

            this.promptMsg = "";
            this.drawPrompt();
            this.fCanChangeCol = true;
            if(var12) {
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

            this.startTime += System.currentTimeMillis() - _ex;
            this.counter = 0;
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
      FontMetrics fontmetrics = this.screen.getFontMetrics();
      int i = fontmetrics.stringWidth("Replay...");
      int j = fontmetrics.getHeight();
      int k = this.nWidth / 2 - i / 2;
      int l = this.nHeight / 2 - j;
      this.promptMsg = "Click the mouse to continue...";
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
}
