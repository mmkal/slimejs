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
   private int p1X;
   private int p2X;
   private int p1Y;
   private int p2Y;
   private int p1Col = 0;
   private int p2Col = 1;
   private Color[] slimeColours;
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
   private boolean fInPlay;
   private boolean mousePressed;
   private boolean fEndGame;
   private Thread gameThread;
   private long currTime;
   private long elapsTime;
   private long minute;
   private long sec;
   private long msec;

   public void init() {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.nScore = 5;
      this.fInPlay = this.fEndGame = false;
      this.promptMsg = "Click the mouse to play...";
      this.screen = this.getGraphics();
      this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
   }

   public void paint(Graphics dc) {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      dc.setColor(Color.blue);
      dc.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      dc.setColor(Color.gray);
      dc.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      dc.setColor(Color.white);
      dc.fillRect(this.nWidth / 2 - 2, 7 * this.nHeight / 10, 4, this.nHeight / 10 + 5);
      this.drawScores();
      this.drawPrompt();
      if(!this.fInPlay) {
         FontMetrics fm = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         this.screen.drawString("Slime Volleyball!", this.nWidth / 2 - fm.stringWidth("Slime Volleyball!") / 2, this.nHeight / 2 - fm.getHeight());
         dc.setColor(Color.white);
         fm = dc.getFontMetrics();
         dc.drawString("Written by ZAIN0", this.nWidth / 2 - fm.stringWidth("Written by ZAIN0") / 2, this.nHeight / 2 + fm.getHeight() * 2);
      }

   }

   private void drawScores() {
      Graphics g = this.screen;
      int nDiam = this.nHeight / 20;
      g.setColor(Color.blue);
      g.fillRect(0, 0, this.nWidth, nDiam + 22);

      int nX;
      for(int i = 0; i < this.nScore; ++i) {
         nX = (i + 1) * this.nWidth / 20;
         g.setColor(this.slimeColours[this.p1Col]);
         g.fillOval(nX, 20, nDiam, nDiam);
         g.setColor(Color.white);
         g.drawOval(nX, 20, nDiam, nDiam);
      }

      for(int i1 = 0; i1 < 10 - this.nScore; ++i1) {
         nX = this.nWidth - (i1 + 1) * this.nWidth / 20 - nDiam;
         g.setColor(this.slimeColours[this.p2Col]);
         g.fillOval(nX, 20, nDiam, nDiam);
         g.setColor(Color.white);
         g.drawOval(nX, 20, nDiam, nDiam);
      }

   }

   public void drawPrompt() {
      this.screen.setColor(Color.gray);
      this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
      FontMetrics fm = this.screen.getFontMetrics();
      this.screen.setColor(Color.lightGray);
      this.screen.drawString(this.promptMsg, (this.nWidth - fm.stringWidth(this.promptMsg)) / 2, this.nHeight * 4 / 5 + fm.getHeight() + 10);
   }

   public boolean handleEvent(Event e) {
      switch(e.id) {
      case 401:
         if(!this.fEndGame) {
            switch(e.key) {
            case 65:
            case 97:
               this.p1XV = -8;
               break;
            case 68:
            case 100:
               this.p1XV = 8;
               break;
            case 73:
            case 105:
               this.p2YV = 31;
               break;
            case 74:
            case 106:
               this.p2XV = -8;
               break;
            case 75:
            case 107:
               this.p2Col = this.p2Col == 5?0:this.p2Col + 1;
               if(this.p2Col == this.p1Col) {
                  if(this.p2Col == 5) {
                     this.p2Col = 0;
                  } else {
                     ++this.p2Col;
                  }
               }

               this.drawScores();
               break;
            case 76:
            case 108:
               this.p2XV = 8;
               break;
            case 83:
            case 115:
               this.p1Col = this.p1Col == 5?0:this.p1Col + 1;
               if(this.p1Col == this.p2Col) {
                  if(this.p1Col == 5) {
                     this.p1Col = 0;
                  } else {
                     ++this.p1Col;
                  }
               }

               this.drawScores();
               break;
            case 87:
            case 119:
               this.p1YV = 31;
            }
         }
         break;
      case 402:
         switch(e.key) {
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
            if(this.p2XV < 0) {
               this.p2XV = 0;
            }

            return false;
         case 76:
         case 108:
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
         this.showStatus("Slime Volleyball 2-Player, by Zaino");
      }

      return false;
   }

   public void run() {
      this.currTime = System.currentTimeMillis();

      while(this.nScore != 0 && this.nScore != 10 && this.gameThread != null) {
         this.p1OldX = this.p1X;
         this.p1OldY = this.p1Y;
         this.p2OldX = this.p2X;
         this.p2OldY = this.p2Y;
         this.ballOldX = this.ballX;
         this.ballOldY = this.ballY;
         this.MoveSlimers();
         this.DrawSlimers();
         this.drawTime();
         this.drawScores();
         if(this.ballY < 35) {
            this.nScore += this.ballX > 500?1:-1;
            this.promptMsg = this.ballX > 500?"Red ":"Green ";
            if(this.promptMsg.equals("Red ")) {
               switch(this.p1Col) {
               case 0:
                  this.promptMsg = "Big Red Slime ";
                  break;
               case 1:
                  this.promptMsg = "Magic Green Slime ";
                  break;
               case 2:
                  this.promptMsg = "Golden Boy ";
                  break;
               case 3:
                  this.promptMsg = "The Great White Slime ";
                  break;
               case 4:
                  this.promptMsg = "Blackie ";
                  break;
               case 5:
                  this.promptMsg = "Invisible Blue Slime ";
               }
            } else {
               switch(this.p2Col) {
               case 0:
                  this.promptMsg = "Big Red Slime ";
                  break;
               case 1:
                  this.promptMsg = "Magic Green Slime ";
                  break;
               case 2:
                  this.promptMsg = "Golden Boy ";
                  break;
               case 3:
                  this.promptMsg = "The Great White Slime ";
                  break;
               case 4:
                  this.promptMsg = "Blackie ";
                  break;
               case 5:
                  this.promptMsg = "Invisible Blue Slime ";
               }
            }

            switch(this.nScore) {
            case 0:
            case 10:
               this.promptMsg = this.promptMsg + "Wins!!!";
               break;
            case 4:
               this.promptMsg = this.promptMsg + (this.ballX < 500?"takes the lead!!":"Scores!");
               break;
            case 5:
               this.promptMsg = this.promptMsg + "Equalizes!";
               break;
            case 6:
               this.promptMsg = this.promptMsg + (this.ballX > 500?"takes the lead!!":"Scores!");
               break;
            default:
               this.promptMsg = this.promptMsg + "Scores!";
            }

            this.drawPrompt();
            if(this.gameThread != null) {
               try {
                  Thread.sleep(2000L);
               } catch (InterruptedException var2) {
                  ;
               }
            }

            this.promptMsg = "";
            this.drawPrompt();
            if(this.nScore != 0 && this.nScore != 10) {
               this.p1X = 200;
               this.p1Y = 0;
               this.p2X = 800;
               this.p2Y = 0;
               this.p1XV = 0;
               this.p1YV = 0;
               this.p2XV = 0;
               this.p2YV = 0;
               this.ballX = this.ballX < 500?800:200;
               this.ballY = 400;
               this.ballVX = 0;
               this.ballVY = 0;
               this.repaint();
            }
         }

         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var1) {
               ;
            }
         }
      }

      this.fEndGame = true;
      this.DoFatality();
      this.fInPlay = false;
      this.promptMsg = "Click the mouse to play...";
      this.repaint();
   }

   private void MoveSlimers() {
      this.p1X += this.p1XV;
      if(this.p1X > 950) {
         this.p1X = 950;
      }

      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > 445 && this.p1X < 555 && this.p1Y < 110) {
         if(this.p1XV > 0) {
            this.p1XV = 0;
            this.p1X = 445;
         } else {
            this.p1XV = 0;
            this.p1X = 555;
         }
      } else if(this.p1X > 445 && this.p1X < 555 && this.p1Y > 110 && this.p1Y < 120) {
         this.p1YV = this.p1YV < 0?0:this.p1YV;
         this.p1Y = 120;
      }

      if(this.p1Y > 1000) {
         this.p1Y = 1000;
         this.p1YV = -this.p1YV;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= 3;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         } else if(this.p1X > 450 && this.p1X < 550 && this.p1Y > 110 && this.p1Y < 130 && this.p1YV < 0) {
            this.p1YV = -this.p1YV;
            this.p1Y = 130;
         }
      }

      this.p2X += this.p2XV;
      if(this.p2X > 950) {
         this.p2X = 950;
      }

      if(this.p2X < 50) {
         this.p2X = 50;
      }

      if(this.p2X > 445 && this.p2X < 555 && this.p2Y < 110) {
         if(this.p2XV > 0) {
            this.p2XV = 0;
            this.p2X = 445;
         } else {
            this.p2XV = 0;
            this.p2X = 555;
         }
      } else if(this.p2X > 445 && this.p2X < 555 && this.p2Y > 110 && this.p2Y < 120) {
         this.p2YV = this.p2YV < 0?0:this.p2YV;
         this.p2Y = 120;
      }

      if(this.p2Y > 1000) {
         this.p2Y = 1000;
         this.p2YV = -this.p2YV;
      }

      if(this.p2YV != 0) {
         this.p2Y += this.p2YV -= 3;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         } else if(this.p2X > 450 && this.p2X < 550 && this.p2Y > 110 && this.p2Y < 130 && this.p2YV < 0) {
            this.p2YV = -this.p2YV;
            this.p2Y = 130;
         }
      }

   }

   private void DrawSlimers() {
      int nW = this.nWidth / 10;
      int nH = this.nHeight / 10;
      int nEW = this.nWidth / 50;
      int nEH = this.nHeight / 25;
      int bX = this.ballX * this.nWidth / 1000;
      int bY = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int nX = this.p1OldX * this.nWidth / 1000 - nW / 2;
      int nY = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(nX, nY, nW, nH);
      nX = this.p2OldX * this.nWidth / 1000 - nW / 2;
      nY = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillRect(nX, nY, nW, nH);
      this.MoveBall();
      nX = this.p1X * this.nWidth / 1000 - nW / 2;
      nY = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.slimeColours[this.p1Col]);
      this.screen.fillArc(nX, nY, nW, 2 * nH, 0, 180);
      this.screen.setColor(Color.white);
      int flyingV;
      if(this.p1YV >= 0) {
         this.screen.fillArc(nX, nY, 5 * nW / 8, nH * this.p1YV / 31, 0, -150);
      } else {
         flyingV = Math.abs(this.p1YV) > 31?31:Math.abs(this.p1YV);
         this.screen.fillArc(nX, nY, 5 * nW / 8, nH * flyingV / 31, 0, 150);
      }

      int ex = this.p1X + 38;
      int ey = this.p1Y - 60;
      nX = ex * this.nWidth / 1000;
      nY = 7 * this.nHeight / 10 - ey * this.nHeight / 1000;
      int dx = nX - bX;
      int dy = nY - bY;
      int rad = (int)Math.sqrt((double)(dx * dx + dy * dy));
      this.screen.setColor(Color.white);
      this.screen.fillOval(nX - nEW, nY - nEH, nEW, nEH);
      if(rad > 0) {
         this.screen.setColor(Color.black);
         this.screen.fillOval(nX - 4 * dx / rad - 3 * nEW / 4, nY - 4 * dy / rad - 3 * nEH / 4, nEW / 2, nEH / 2);
      }

      nX = this.p2X * this.nWidth / 1000 - nW / 2;
      nY = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(this.slimeColours[this.p2Col]);
      this.screen.fillArc(nX, nY, nW, 2 * nH, 0, 180);
      this.screen.setColor(Color.white);
      if(this.p2YV >= 0) {
         this.screen.fillArc(nX + 3 * nW / 8, nY, 5 * nW / 8, nH * this.p2YV / 31, -30, -150);
      } else {
         flyingV = Math.abs(this.p2YV) > 31?31:Math.abs(this.p2YV);
         this.screen.fillArc(nX + 3 * nW / 8, nY, 5 * nW / 8, nH * flyingV / 31, 30, 150);
      }

      ex = this.p2X - 18;
      ey = this.p2Y - 60;
      nX = ex * this.nWidth / 1000;
      nY = 7 * this.nHeight / 10 - ey * this.nHeight / 1000;
      dx = nX - bX;
      dy = nY - bY;
      rad = (int)Math.sqrt((double)(dx * dx + dy * dy));
      this.screen.setColor(Color.white);
      this.screen.fillOval(nX - nEW, nY - nEH, nEW, nEH);
      if(rad > 0) {
         this.screen.setColor(Color.black);
         this.screen.fillOval(nX - 4 * dx / rad - 3 * nEW / 4, nY - 4 * dy / rad - 3 * nEH / 4, nEW / 2, nEH / 2);
      }

      int i;
      if(this.nScore > 8) {
         nX = this.p1X * this.nWidth / 1000;
         nY = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
         nW = this.nWidth / 20;
         nH = this.nHeight / 20;

         for(i = 0; i < 3; ++i) {
            this.screen.setColor(Color.black);
            this.screen.drawArc(nX, nY + i, nW, nH, -30, -150);
         }
      } else if(this.nScore < 2) {
         nW = this.nWidth / 20;
         nH = this.nHeight / 20;
         nX = this.p2X * this.nWidth / 1000 - nW;
         nY = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;

         for(i = 0; i < 3; ++i) {
            this.screen.setColor(Color.black);
            this.screen.drawArc(nX, nY + i, nW, nH, -10, -150);
         }
      }

   }

   private void MoveBall() {
      int nW = 30 * this.nHeight / 1000;
      int nX = this.ballOldX * this.nWidth / 1000;
      int nY = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.screen.setColor(Color.blue);
      this.screen.fillOval(nX - nW, nY - nW, nW * 2, nW * 2);
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(!this.fEndGame) {
         int dx = (this.ballX - this.p1X) * 2;
         int dy = this.ballY - this.p1Y;
         int radius_sq = dx * dx + dy * dy;
         int dVX = this.ballVX - this.p1XV;
         int dVY = this.ballVY - this.p1YV;
         int rad;
         int dot;
         if(dy > 0 && radius_sq < 15625 && radius_sq > 25) {
            rad = (int)Math.sqrt((double)radius_sq);
            dot = (dx * dVX + dy * dVY) / rad;
            this.ballX = this.p1X + dx * 63 / rad;
            this.ballY = this.p1Y + dy * 125 / rad;
            if(dot <= 0) {
               this.ballVX += this.p1XV - 2 * dx * dot / rad;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p1YV - 2 * dy * dot / rad;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
            }
         }

         dx = (this.ballX - this.p2X) * 2;
         dy = this.ballY - this.p2Y;
         radius_sq = dx * dx + dy * dy;
         dVX = this.ballVX - this.p2XV;
         dVY = this.ballVY - this.p2YV;
         if(dy > 0 && radius_sq < 15625 && radius_sq > 25) {
            rad = (int)Math.sqrt((double)radius_sq);
            dot = (dx * dVX + dy * dVY) / rad;
            this.ballX = this.p2X + dx * 63 / rad;
            this.ballY = this.p2Y + dy * 125 / rad;
            if(dot <= 0) {
               this.ballVX += this.p2XV - 2 * dx * dot / rad;
               if(this.ballVX < -15) {
                  this.ballVX = -15;
               }

               if(this.ballVX > 15) {
                  this.ballVX = 15;
               }

               this.ballVY += this.p2YV - 2 * dy * dot / rad;
               if(this.ballVY < -22) {
                  this.ballVY = -22;
               }

               if(this.ballVY > 22) {
                  this.ballVY = 22;
               }
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

         if(this.ballY > 985) {
            this.ballY = 985;
            this.ballVY = -this.ballVY;
         }

         if(this.ballX > 480 && this.ballX < 520 && this.ballY < 140) {
            if(this.ballVY < 0 && this.ballY > 130) {
               this.ballVY *= -1;
               this.ballY = 130;
            } else if(this.ballX < 500) {
               this.ballX = 480;
               this.ballVX = this.ballVX < 0?this.ballVX:-this.ballVX;
            } else {
               this.ballX = 520;
               this.ballVX = this.ballVX > 0?this.ballVX:-this.ballVX;
            }
         }
      }

      nX = this.ballX * this.nWidth / 1000;
      nY = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(Color.yellow);
      this.screen.fillOval(nX - nW, nY - nW, nW * 2, nW * 2);
   }

   public void drawTime() {
      FontMetrics fm = this.screen.getFontMetrics();
      this.msec = this.minute = this.sec = 0L;
      this.elapsTime = System.currentTimeMillis() - this.currTime;
      this.sec = this.elapsTime / 1000L;
      this.msec = this.elapsTime % 1000L;
      this.minute = this.sec / 60L;
      this.sec %= 60L;
      this.screen.setColor(Color.gray);
      this.screen.fillRect(0, 4 * this.nHeight / 5, fm.stringWidth(this.minute + ":" + this.sec + ":" + this.msec), this.nHeight / 5);
      this.screen.setColor(Color.black);
      this.screen.drawString(this.minute + ":" + this.sec + ":" + this.msec, 0, 9 * this.nHeight / 10);
   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   private void DoFatality() {
      this.repaint();
      this.p1XV = this.p2XV = 0;
      this.ballY = 2000;
      this.ballOldX = this.ballX;
      this.ballOldY = this.ballY;
      this.p1YV = this.p2YV = -1;
      this.p1OldX = this.p1X;
      this.p2OldX = this.p2X;

      while(this.p1YV != 0 || this.p2YV != 0) {
         this.ballVY = 1;
         this.p1OldY = this.p1Y;
         this.p2OldY = this.p2Y;
         this.MoveSlimers();
         this.DrawSlimers();
         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var2) {
               ;
            }
         }
      }

      for(int i = 0; i < 5; ++i) {
         if(this.nScore == 0) {
            this.p2YV = 31;
         } else {
            this.p1YV = 31;
         }

         while(this.p1YV != 0 || this.p2YV != 0) {
            this.ballVY = 1;
            this.p1OldY = this.p1Y;
            this.p2OldY = this.p2Y;
            this.MoveSlimers();
            this.DrawSlimers();
            if(this.gameThread != null) {
               try {
                  Thread.sleep(20L);
               } catch (InterruptedException var3) {
                  ;
               }
            }
         }
      }

   }

   public Slime2P() {
      this.slimeColours = new Color[]{Color.red, Color.green, Color.yellow, Color.white, Color.black, Color.blue};
      this.currTime = 0L;
      this.elapsTime = 0L;
      this.minute = 0L;
      this.sec = 0L;
      this.msec = 0L;
   }
}
