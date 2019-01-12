import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.ImageObserver;

public class Slime2P extends Applet implements Runnable {
   private int nWidth;
   private int nHeight;
   private int p1X;
   private int p1Y;
   private int p2X;
   private int p2Y;
   private int p3X = 952;
   private int p3Y;
   private int p1Col;
   private int p2Col;
   private Color[] slimeColours;
   private Color[] slimeColours2;
   private String[] slimeColText;
   private String[] slimeColAbbr;
   private int p1OldX;
   private int p1OldY;
   private int p2OldX;
   private int p2OldY;
   private int p3OldY;
   private int p1XV;
   private int p1YV;
   private int p2XV;
   private int p2YV;
   private int p3YV;
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
   private boolean fP1Touched;
   private boolean fP2Touched;
   private Thread gameThread;
   private boolean fEndGame;
   private final int p1Diam;
   private final int p2Diam;
   private final int ballRad;
   private Color BALL_COL;
   private Color COURT_COL;
   private Color DAY_COL;
   private Color NIGHT_COL;
   private Color SKY_COL;
   private int bounces;
   private boolean fEndOfOver;
   private boolean fHitBackWall;
   private int p1XMin;
   private int p2XMin;
   private int p2XMax;
   private int ballXMax;
   private int p1Touches;
   private int ballCount;
   private int postPos;
   private int bowlingCrease;
   private int runningCrease;
   private int battingCrease;
   private long p1Score;
   private long p2Score;
   private int inns;
   private int wicketPenalty;
   private boolean fNoBall;
   private int overs;
   private int stillFrames;
   private Image buffer;
   private int thisBall;
   private String thisOver;
   private long[] p1bxb;
   private long[] p2bxb;
   private final String[] COMM_FOUR;
   private final String[] COMM_FOURTOUCHED;
   private final String[] COMM_SIX;
   private final String[] COMM_SIXTOUCHED;
   private final String[] COMM_STUMPED;
   private final String[] COMM_RUNOUT;
   private final String[] COMM_BOWLED;
   private final String[] COMM_PLAYEDON;
   private final String[] COMM_CAUGHT;
   private final String[] COMM_CTBEHIND;
   private final String[] COMM_OUT_GENERIC;
   private boolean buffered;

   public void init() {
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      this.buffer = this.createImage(this.nWidth, this.nHeight);
      this.fInPlay = false;
      this.fEndGame = true;
      this.fEndOfOver = false;
      this.fCanChangeCol = true;
      this.promptMsg = "Click team names to select teams, then choose an innings length to start!";
      this.screen = this.buffered?this.buffer.getGraphics():this.getGraphics();
      this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
      this.p1Col = 0;
      this.p2Col = 1;
      this.inns = 0;
   }

   public void paint(Graphics var1) {
      Graphics var2 = this.buffered?this.buffer.getGraphics():this.getGraphics();
      this.nWidth = this.size().width;
      this.nHeight = this.size().height;
      var2.setColor(this.SKY_COL);
      var2.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
      var2.setColor(this.COURT_COL);
      var2.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
      var2.setColor(Color.white);
      var2.fillRect(this.nWidth * 18 / 20 - 2, this.nHeight * 7 / 10, 3, this.nHeight / 10);
      var2.fillRect(this.nWidth * this.bowlingCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
      var2.fillRect(this.nWidth * this.runningCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
      var2.fillRect(this.nWidth * this.battingCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
      this.drawPrompt();
      FontMetrics var3;
      if(!this.fInPlay && this.fEndGame) {
         var3 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         this.screen.drawString("CricketSlime", this.nWidth / 2 - var3.stringWidth("CricketSlime") / 2, this.nHeight / 2 - var3.getHeight() * 7);
         this.screen.setColor(this.slimeColours[this.p1Col]);
         this.screen.fillRect(this.nWidth / 3 - var3.stringWidth(this.slimeColText[this.p1Col]) / 2 - 10, this.nHeight / 2 - var3.getAscent() * 2, var3.stringWidth(this.slimeColText[this.p1Col]) + 20, var3.getAscent() * 2);
         this.screen.setColor(this.slimeColours2[this.p1Col]);
         this.screen.drawString(this.slimeColText[this.p1Col], this.nWidth / 3 - var3.stringWidth(this.slimeColText[this.p1Col]) / 2, this.nHeight / 2 - var3.getAscent() / 2);
         this.screen.setColor(this.slimeColours[this.p2Col]);
         this.screen.fillRect(this.nWidth * 2 / 3 - var3.stringWidth(this.slimeColText[this.p2Col]) / 2 - 10, this.nHeight / 2 - var3.getAscent() * 2, var3.stringWidth(this.slimeColText[this.p2Col]) + 20, var3.getAscent() * 2);
         this.screen.setColor(this.slimeColours2[this.p2Col]);
         this.screen.drawString(this.slimeColText[this.p2Col], this.nWidth * 2 / 3 - var3.stringWidth(this.slimeColText[this.p2Col]) / 2, this.nHeight / 2 - var3.getAscent() / 2);
         var2.setColor(Color.white);
         this.screen.setColor(this.SKY_COL);

         for(int var4 = 0; var4 < 5; ++var4) {
            var2.fillRect(this.nWidth / 4 + var4 * this.nWidth / 10 + 5, this.nHeight * 2 / 3 - var3.getAscent() * 3 / 2, this.nWidth / 10 - 10, 2 * var3.getAscent());
            this.screen.drawString(4 * (var4 + 1) + " overs", this.nWidth * 3 / 10 + var4 * this.nWidth / 10 - var3.stringWidth(4 * var4 + 1 + " overs") / 2, this.nHeight * 2 / 3 - var3.getAscent() * 0);
         }

         var3 = var2.getFontMetrics();
         var2.setColor(Color.white);
         var2.drawString("Coding by Quin Pendragon and Daniel Wedge", this.nWidth / 2 - var3.stringWidth("Coding by Quin Pendragon and Daniel Wedge") / 2, this.nHeight / 2 - var3.getHeight() * 6);
         var2.drawString("and input from Scott Brown, Damian Versaci and Tim Hayward", this.nWidth / 2 - var3.stringWidth("and input from Scott Brown, Damian Versaci and Tim Hayward") / 2, this.nHeight / 2 - var3.getHeight() * 5);
         this.drawScores();
         var2.drawString("Batting first", this.nWidth / 3 - var3.stringWidth("Batting first") / 2, this.nHeight / 2 - var3.getAscent() * 3);
         var2.drawString("Bowling first", this.nWidth * 2 / 3 - var3.stringWidth("Bowling first") / 2, this.nHeight / 2 - var3.getAscent() * 3);
         var2.drawString("Click on innings length to start...", this.nWidth / 2 - var3.stringWidth("Click on innings length to start...") / 2, this.nHeight * 2 / 3 - var3.getHeight() * 2);
         this.screen.setColor(this.SKY_COL);
      } else if(!this.fInPlay && !this.fEndGame && !this.fEndOfOver) {
         var3 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         this.screen.drawString("Change of innings", this.nWidth / 2 - var3.stringWidth("Change of innings") / 2, this.nHeight / 2 - var3.getHeight() * 5);
         this.drawScores();
      } else if(this.fEndOfOver) {
         var3 = this.screen.getFontMetrics();
         this.screen.setColor(Color.white);
         switch(this.inns) {
         case 1:
            this.drawScores();
            this.screen.drawString("Over", this.nWidth / 2 - var3.stringWidth("Over") / 2, this.nHeight / 2 - var3.getHeight() * 3);
            this.screen.drawString("Last over: " + this.thisOver, this.nWidth / 2 - var3.stringWidth("Last over: " + this.thisOver) / 2, this.nHeight / 2 - var3.getHeight());
            break;
         case 2:
            this.drawScores();
            this.screen.drawString("Over", this.nWidth / 2 - var3.stringWidth("Over") / 2, var3.getHeight());
            this.screen.drawString("Last over: " + this.thisOver, this.nWidth / 2 - var3.stringWidth("Last over: " + this.thisOver) / 2, var3.getHeight() * 2);
            this.drawWorm();
            this.screen.drawString("After " + this.ballCount / 6 + (this.ballCount / 6 == 1?" over...":" overs..."), this.nWidth / 2 - var3.stringWidth("After " + this.ballCount / 6 + (this.ballCount / 6 == 1?" over...":" overs...")) / 2, var3.getHeight() * 4);
            this.screen.drawString(this.slimeColText[this.p2Col].toUpperCase(), this.nWidth / 3, var3.getHeight() * 5);
            this.screen.drawString(String.valueOf(this.p2Score), this.nWidth * 2 / 3 - var3.stringWidth(String.valueOf(this.p2Score)), var3.getHeight() * 5);
            this.screen.drawString(this.slimeColText[this.p1Col] + " (" + this.p1Score + ")", this.nWidth / 3, var3.getHeight() * 6);
            this.screen.drawString(String.valueOf(this.p1bxb[this.ballCount - 1]), this.nWidth * 2 / 3 - var3.stringWidth(String.valueOf(this.p1bxb[this.ballCount - 1])), var3.getHeight() * 6);
         }
      } else {
         this.drawScores();
         this.drawWorm();
      }

      if(this.buffered) {
         var1.drawImage(this.buffer, 0, 0, (ImageObserver)null);
      }

   }

   public boolean handleEvent(Event var1) {
      switch(var1.id) {
      case 401:
      case 403:
         if(!this.fEndGame) {
            switch(var1.key) {
            case 32:
               this.mousePressed = true;
               break;
            case 65:
            case 97:
               this.p1XV = -8;
               break;
            case 66:
            case 98:
               if(!this.fEndOfOver) {
                  this.nextBall();
               }
               break;
            case 68:
            case 100:
               this.p1XV = 8;
               break;
            case 69:
            case 81:
            case 101:
            case 113:
               if(this.p3Y == 0) {
                  this.p3YV = 31;
               }
               break;
            case 73:
            case 105:
            case 1004:
               if(this.p2Y == 0) {
                  this.p2YV = 31;
               }
               break;
            case 74:
            case 106:
            case 1006:
               this.p2XV = -8;
               break;
            case 76:
            case 108:
            case 1007:
               this.p2XV = 8;
               break;
            case 87:
            case 119:
               if(this.p1Y == 0) {
                  this.p1YV = 31;
               }
               break;
            case 94:
               this.buffered = !this.buffered;
               this.screen = this.buffered?this.buffer.getGraphics():this.getGraphics();
               this.repaint();
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
         if(this.fEndOfOver) {
            this.gameThread = new Thread(this);
            this.gameThread.start();
            this.thisOver = "";
            this.fEndOfOver = false;
            this.promptMsg = "";
            this.repaint();
         } else if(!this.fInPlay) {
            if(!this.fEndGame) {
               this.fInPlay = true;
               ++this.inns;
               int var6 = this.p1Col;
               this.p1Col = this.p2Col;
               this.p2Col = var6;
               long var7 = this.p1Score;
               this.p1Score = this.p2Score;
               this.p2Score = var7;
               long[] var8 = this.p1bxb;
               this.p1bxb = this.p2bxb;
               this.p2bxb = var8;
               this.SKY_COL = this.NIGHT_COL;
            } else {
               FontMetrics var2 = this.screen.getFontMetrics();
               if(var1.y > this.nHeight * 2 / 3 - var2.getAscent() * 3 / 2 && var1.y < this.nHeight * 2 / 3 + var2.getAscent() / 2) {
                  for(int var3 = 0; var3 < 5 && !this.fInPlay; ++var3) {
                     if(var1.x > this.nWidth / 4 + var3 * this.nWidth / 10 + 5 && var1.x < this.nWidth / 4 + (var3 + 1) * this.nWidth / 10 - 5) {
                        this.fEndGame = false;
                        this.fInPlay = true;
                        this.inns = 1;
                        this.p1Score = this.p2Score = 0L;
                        int var4 = this.p1Col;
                        this.p1Col = this.p2Col;
                        this.p2Col = var4;
                        this.SKY_COL = this.DAY_COL;
                        this.overs = (var3 + 1) * 4;
                        this.p1bxb = new long[this.overs * 6];
                        this.p2bxb = new long[this.overs * 6];

                        for(int var5 = 0; var5 < this.overs * 6; ++var5) {
                           this.p1bxb[var5] = this.p2bxb[var5] = 0L;
                        }
                     }
                  }
               } else if(var1.y > this.nHeight / 2 - var2.getAscent() * 2 && var1.y < this.nHeight / 2) {
                  this.drawPrompt("dood", 1);
                  if(var1.x > this.nWidth / 3 - var2.stringWidth(this.slimeColText[this.p1Col]) / 2 - 10 && var1.x < this.nWidth / 3 + var2.stringWidth(this.slimeColText[this.p1Col]) / 2 + 10) {
                     while(true) {
                        this.p1Col = this.p1Col != this.slimeColours.length - 1?this.p1Col + 1:0;
                        if(this.p1Col != this.p2Col) {
                           this.repaint();
                           break;
                        }
                     }
                  } else if(var1.x > this.nWidth * 2 / 3 - var2.stringWidth(this.slimeColText[this.p2Col]) / 2 - 10 && var1.x < this.nWidth * 2 / 3 + var2.stringWidth(this.slimeColText[this.p2Col]) / 2 + 10) {
                     while(true) {
                        this.p2Col = this.p2Col != this.slimeColours.length - 1?this.p2Col + 1:0;
                        if(this.p1Col != this.p2Col) {
                           this.repaint();
                           break;
                        }
                     }
                  }
               }
            }

            if(this.fInPlay) {
               this.ballCount = -1;
               this.thisOver = "";
               this.promptMsg = "";
               this.thisBall = 0;
               this.nextBall();
               this.gameThread = new Thread(this);
               this.gameThread.start();
            }
         }
         break;
      case 503:
         this.showStatus("CricketSlime, by Danno: http://www.student.uwa.edu.au/~wedgey");
      }

      return false;
   }

   private void nextBall() {
      this.p1XMin = this.p1X = 200;
      this.p2XMin = this.p2XMax = this.p2X = 800;
      this.ballVX = this.ballVY = this.p1Y = this.p2Y = this.p2XV = this.p2YV = this.p3Y = this.p3YV = this.p1XV = this.p1YV = 0;
      this.ballXMax = this.ballX = 200;
      this.ballY = 400;
      this.fP1Touched = this.fP2Touched = false;
      this.bounces = 0;
      this.p1Touches = 0;
      if(this.fNoBall) {
         ++this.thisBall;
      }

      if(this.ballCount >= 0) {
         this.p2bxb[this.ballCount] = this.p2Score += (long)this.thisBall;
         if(this.fNoBall) {
            this.thisOver = this.thisOver + "N";
         }

         if(this.thisBall != -this.wicketPenalty && this.thisBall != -this.wicketPenalty + 1) {
            if(this.thisBall == 0) {
               this.thisOver = this.thisOver + ".";
            } else if(!this.fNoBall || this.thisBall != -this.wicketPenalty + 1 && this.thisBall != 0) {
               this.thisOver = this.thisOver + (!this.fNoBall?this.thisBall:this.thisBall - 1);
            }
         } else {
            this.thisOver = this.thisOver + "W";
         }

         this.thisOver = this.thisOver + " ";
      }

      this.thisBall = 0;
      if(!this.fNoBall) {
         ++this.ballCount;
         if(this.ballCount % 6 == 0 && this.ballCount != 0 && this.ballCount != this.overs * 6) {
            this.fEndOfOver = true;
            this.gameThread = null;
            this.promptMsg = "Click the mouse to continue...";
         }
      }

      this.fNoBall = false;
      this.fHitBackWall = false;
      this.stillFrames = 0;
      this.repaint();
   }

   private long getMinScore(int var1) {
      long var2 = 0L;

      for(int var4 = 0; var4 < this.overs * 6; ++var4) {
         if((var1 == 1?this.p1bxb[var4]:this.p2bxb[var4]) < var2) {
            var2 = var1 == 1?this.p1bxb[var4]:this.p2bxb[var4];
         }
      }

      return var2;
   }

   private long getMaxScore(int var1) {
      long var2 = 0L;

      for(int var4 = 0; var4 < this.overs * 6; ++var4) {
         if((var1 == 1?this.p1bxb[var4]:this.p2bxb[var4]) > var2) {
            var2 = var1 == 1?this.p1bxb[var4]:this.p2bxb[var4];
         }
      }

      return var2;
   }

   private void MoveSlimers() {
      this.p1X += this.p1XV;
      if(this.p1X < 50) {
         this.p1X = 50;
      }

      if(this.p1X > this.postPos - 50 - 5) {
         this.p1X = this.postPos - 50 - 5;
      }

      if(this.p1YV != 0) {
         this.p1Y += this.p1YV -= 2;
         if(this.p1Y < 0) {
            this.p1Y = 0;
            this.p1YV = 0;
         }
      }

      if(this.ballX == 200 && this.ballVX == 200 && this.p1X < this.p1XMin) {
         this.p1XMin = this.p1X;
      }

      this.p2X += this.p2XV;
      if(this.p2X > this.postPos - 50 - 5) {
         this.p2X = this.postPos - 50 - 5;
      }

      if(this.p2X < 50) {
         this.p2X = 50;
      }

      if(this.p2YV != 0) {
         this.p2Y += this.p2YV -= 2;
         if(this.p2Y < 0) {
            this.p2Y = 0;
            this.p2YV = 0;
         }
      }

      if(this.p2X < this.p2XMin && this.p2Y == 0) {
         this.p2XMin = this.p2X;
      } else if(this.p2X > this.p2XMax && this.p2Y == 0) {
         this.p2XMax = this.p2X;
      }

      if(this.p2X - 50 <= this.runningCrease && this.p2XMax + 50 >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y == 0) {
         ++this.thisBall;
         this.p2XMin = this.p2XMax = this.p2X;
         this.drawScores();
      } else if(this.p2XMin - 50 <= this.runningCrease && this.p2X + 50 >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y == 0) {
         ++this.thisBall;
         this.p2XMin = this.p2XMax = this.p2X;
         this.drawScores();
      }

      if(this.p3YV != 0) {
         this.p3Y += this.p3YV -= 2;
      }

      if(this.p3Y < 0) {
         this.p3Y = 0;
         this.p3YV = 0;
      }

   }

   private void DrawSlimers() {
      int var1 = this.ballX * this.nWidth / 1000;
      int var2 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      int var3 = this.nWidth * 100 / 1000;
      int var4 = this.nHeight * 100 / 1000;
      int var5 = this.p1OldX * this.nWidth / 1000 - var3 / 2;
      int var6 = 4 * this.nHeight / 5 - var4 - this.p1OldY * this.nHeight / 1000;
      this.screen.setColor(this.SKY_COL);
      this.screen.fillRect(var5, var6, var3, var4);
      var3 = this.nWidth * 100 / 1000;
      var4 = this.nHeight * 100 / 1000;
      var5 = this.p2OldX * this.nWidth / 1000 - var3 / 2;
      var6 = 4 * this.nHeight / 5 - var4 - this.p2OldY * this.nHeight / 1000;
      this.screen.fillRect(var5, var6, var3, var4);
      var3 = this.nWidth / 10;
      var4 = this.nHeight / 10;
      var5 = this.p3X * this.nWidth / 1000 - var3 / 2;
      var6 = 4 * this.nHeight / 5 - var4 - this.p3OldY * this.nHeight / 1000;
      this.screen.fillRect(var5, var6, var3, var4);
      byte var7 = 5;
      int var8 = (25 + var7) * this.nHeight / 1000;
      this.screen.fillOval(var1 - var8, var2 - var8, 2 * var8, 2 * var8);
      var3 = this.nWidth * 100 / 1000;
      var4 = this.nHeight * 100 / 1000;
      var5 = this.p1X * this.nWidth / 1000 - var3 / 2;
      var6 = 4 * this.nHeight / 5 - var4 - this.p1Y * this.nHeight / 1000;
      this.screen.setColor(this.slimeColours[this.p1Col]);
      this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
      int var9 = this.p1X + 38;
      int var10 = this.p1Y - 60;
      var5 = var9 * this.nWidth / 1000;
      var6 = 4 * this.nHeight / 5 - var4 - var10 * this.nHeight / 1000;
      int var11 = var5 - var1;
      int var12 = var6 - var2;
      int var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      if(var13 == 0) {
         var13 = 1;
      }

      int var14 = this.nWidth / 50 * 100 / 100;
      int var15 = this.nHeight / 25 * 100 / 100;
      this.screen.setColor(Color.white);
      this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
      this.screen.setColor(Color.black);
      this.screen.fillOval(var5 - 4 * var11 / var13 - 3 * var14 / 4, var6 - 4 * var12 / var13 - 3 * var15 / 4, var14 / 2, var15 / 2);
      var3 = this.nWidth * 100 / 1000;
      var4 = this.nHeight * 100 / 1000;
      var5 = this.p2X * this.nWidth / 1000 - var3 / 2;
      var6 = 4 * this.nHeight / 5 - 100 * this.nHeight / 1000 - this.p2Y * this.nHeight / 1000;
      this.screen.setColor(this.slimeColours[this.p2Col]);
      this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
      var9 = this.p2X - 18;
      var10 = this.p2Y - 60;
      var5 = var9 * this.nWidth / 1000;
      var6 = 4 * this.nHeight / 5 - var4 - var10 * this.nHeight / 1000;
      var11 = var5 - var1;
      var12 = var6 - var2;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      if(var13 == 0) {
         var13 = 1;
      }

      var14 = this.nWidth / 50 * 100 / 100;
      var15 = this.nHeight / 25 * 100 / 100;
      this.screen.setColor(Color.white);
      this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
      this.screen.setColor(Color.black);
      this.screen.fillOval(var5 - 4 * var11 / var13 - 3 * var14 / 4, var6 - 4 * var12 / var13 - 3 * var15 / 4, var14 / 2, var15 / 2);
      var3 = this.nWidth / 10;
      var4 = this.nHeight / 10;
      var5 = this.p3X * this.nWidth / 1000 - var3 / 2;
      var6 = 4 * this.nHeight / 5 - 100 * this.nHeight / 1000 - this.p3Y * this.nHeight / 1000;
      this.screen.setColor(this.slimeColours[this.p1Col]);
      this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
      var9 = this.p3X - 18;
      var10 = this.p3Y - 60;
      var5 = var9 * this.nWidth / 1000;
      var6 = 4 * this.nHeight / 5 - var4 - var10 * this.nHeight / 1000;
      var11 = var5 - var1;
      var12 = var6 - var2;
      var13 = (int)Math.sqrt((double)(var11 * var11 + var12 * var12));
      if(var13 == 0) {
         var13 = 1;
      }

      var14 = this.nWidth / 50;
      var15 = this.nHeight / 25;
      this.screen.setColor(Color.white);
      this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
      this.screen.setColor(Color.black);
      this.screen.fillOval(var5 - 4 * var11 / var13 - 3 * var14 / 4, var6 - 4 * var12 / var13 - 3 * var15 / 4, var14 / 2, var15 / 2);
      this.MoveBall();
   }

   private void MoveBall() {
      byte var1 = 5;
      byte var2 = 15;
      byte var3 = 22;
      byte var4 = 19;
      int var5 = (25 + var1) * this.nHeight / 1000;
      int var6 = this.ballOldX * this.nWidth / 1000;
      int var7 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
      this.ballY += --this.ballVY;
      this.ballX += this.ballVX;
      if(this.ballVX >= 2 || this.ballVY >= 2 || this.p1XV + this.p1YV + this.p2XV + this.p2YV + this.p3YV != 0 || this.ballX == 200 || this.p2X > this.runningCrease + 50 && this.p2X < this.battingCrease - 50) {
         this.stillFrames = 0;
      } else if(this.stillFrames++ > 75) {
         this.promptMsg = " ";
      }

      if(this.ballY < 35) {
         this.ballY = 35;
         this.ballVY = -this.ballVY * 2 / 3;
         this.ballVX = this.ballVX * 19 / 20;
         ++this.bounces;
         if(!this.fP2Touched && this.bounces > 2 && !this.fHitBackWall) {
            this.fNoBall = true;
            this.drawPrompt("No ball!", 2);
         }
      }

      if(this.ballX > this.postPos && !this.fP2Touched) {
         this.fP2Touched = true;
      }

      if(this.ballY > 180 && this.ballX > this.battingCrease - 50 && this.p2X >= this.battingCrease - 50 && !this.fP2Touched && this.p2XMin > this.battingCrease - 75) {
         this.fNoBall = true;
         this.drawPrompt("No ball!", 2);
      }

      if(!this.fEndGame) {
         int var8 = 2 * (this.ballX - this.p1X);
         int var9 = this.ballY - this.p1Y;
         int var10 = (int)Math.sqrt((double)(var8 * var8 + var9 * var9));
         int var11 = this.ballVX - this.p1XV;
         int var12 = this.ballVY - this.p1YV;
         int var13;
         if(var9 > 0 && var10 < 125 && var10 > var1) {
            var13 = (var8 * var11 + var9 * var12) / var10;
            this.ballX = this.p1X + 62 * var8 / var10;
            this.ballY = this.p1Y + 125 * var9 / var10;
            if(var13 <= 0) {
               this.ballVX += this.p1XV - 2 * var8 * var13 / var10;
               if(this.ballVX < -var2) {
                  this.ballVX = -var2;
               }

               if(this.ballVX > var2) {
                  this.ballVX = var2;
               }

               this.ballVY += this.p1YV - 2 * var9 * var13 / var10;
               if(this.ballVY < -var3) {
                  this.ballVY = -var3;
               }

               if(this.ballVY > var3) {
                  this.ballVY = var3;
               }
            }

            if(this.p1Touches > 0 && !this.fP2Touched && this.ballOldX == this.ballXMax && !this.fHitBackWall) {
               this.drawPrompt("No ball!", 2);
               this.fNoBall = true;
            }

            if(this.fP2Touched) {
               this.fP1Touched = true;
            }

            if(this.p1X != 200) {
               ++this.p1Touches;
            }

            if(this.fP2Touched && this.bounces == 0 && !this.fNoBall && !this.fHitBackWall) {
               this.promptMsg = this.COMM_CAUGHT[(int)((double)this.COMM_CAUGHT.length * Math.random())];
               this.thisBall = -this.wicketPenalty;
            }
         }

         if(!this.fP2Touched) {
            var8 = 2 * (this.ballX - this.p2X);
            var9 = this.ballY - this.p2Y;
            var10 = (int)Math.sqrt((double)(var8 * var8 + var9 * var9));
            var11 = this.ballVX - this.p2XV;
            var12 = this.ballVY - this.p2YV;
            if(var9 > 0 && var10 < 125 && var10 > var1 && this.p1Touches > 0) {
               var13 = (var8 * var11 + var9 * var12) / var10;
               this.ballX = this.p2X + 62 * var8 / var10;
               this.ballY = this.p2Y + 125 * var9 / var10;
               if(var13 <= 0) {
                  this.ballVX += this.p2XV - 2 * var8 * var13 / var10;
                  if(this.ballVX < -var4) {
                     this.ballVX = -var4;
                  }

                  if(this.ballVX > var2) {
                     this.ballVX = var2;
                  }

                  this.ballVY += this.p2YV - 2 * var9 * var13 / var10;
                  if(this.ballVY < -var3) {
                     this.ballVY = -var3;
                  }

                  if(this.ballVY > var3) {
                     this.ballVY = var3;
                  }
               }

               this.fP2Touched = true;
               this.bounces = 0;
            }
         }

         var8 = 2 * (this.ballX - this.p3X);
         var9 = this.ballY - this.p3Y;
         var10 = (int)Math.sqrt((double)(var8 * var8 + var9 * var9));
         var11 = this.ballVX;
         var12 = this.ballVY - this.p3YV;
         if(var9 > 0 && var10 < 125 && var10 > var1) {
            var13 = (var8 * var11 + var9 * var12) / var10 * 2 / 3;
            this.ballX = this.p3X + 62 * var8 / var10;
            this.ballY = this.p3Y + 125 * var9 / var10;
            if(var13 <= 0) {
               this.ballVX += -2 * var8 * var13 / var10;
               if(this.ballVX < -var4) {
                  this.ballVX = -var4;
               }

               if(this.ballVX > var2) {
                  this.ballVX = var2;
               }

               this.ballVY += this.p3YV - 2 * var9 * var13 / var10;
               if(this.ballVY < -var3) {
                  this.ballVY = -var3;
               }

               if(this.ballVY > var3) {
                  this.ballVY = var3;
               }
            }

            if(!this.fP1Touched && this.fP2Touched && this.bounces == 0 && !this.fNoBall) {
               this.promptMsg = this.COMM_CTBEHIND[(int)((double)this.COMM_CTBEHIND.length * Math.random())];
               this.thisBall = -this.wicketPenalty;
            } else if(this.p2X < this.battingCrease - 50 && this.p2X > this.runningCrease + 50 || this.p2Y != 0) {
               if(this.p2XMin - 50 > this.runningCrease && !this.fNoBall && !this.fP1Touched) {
                  this.promptMsg = this.COMM_STUMPED[(int)((double)this.COMM_STUMPED.length * Math.random())];
               } else {
                  this.promptMsg = this.COMM_RUNOUT[(int)((double)this.COMM_RUNOUT.length * Math.random())];
               }

               this.thisBall = -this.wicketPenalty;
            }

            this.fP1Touched = true;
         }

         if(this.ballX < 15) {
            this.ballX = 15;
            this.ballVX = -this.ballVX * 2 / 3;
            if(this.fP2Touched && this.bounces == 0 && !this.fHitBackWall) {
               this.promptMsg = this.COMM_SIX[(int)((double)this.COMM_SIX.length * Math.random())];
               if(this.fP1Touched && Math.random() < 0.7D) {
                  this.promptMsg = this.COMM_SIXTOUCHED[(int)((double)this.COMM_SIXTOUCHED.length * Math.random())];
               }

               this.drawPrompt(this.promptMsg, 1);
               this.promptMsg = "";
               this.thisBall += 6;
            } else if(this.fP2Touched && !this.fHitBackWall) {
               this.promptMsg = this.COMM_FOUR[(int)((double)this.COMM_FOUR.length * Math.random())];
               if(this.fP1Touched && Math.random() < 0.7D) {
                  this.promptMsg = this.COMM_FOURTOUCHED[(int)((double)this.COMM_FOURTOUCHED.length * Math.random())];
               }

               this.drawPrompt(this.promptMsg, 1);
               this.promptMsg = "";
               this.thisBall += 4;
            } else if(!this.fP2Touched) {
               this.fNoBall = true;
               this.drawPrompt("No ball!", 2);
            }

            if(this.fP2Touched) {
               this.fHitBackWall = true;
            }
         }

         if(this.ballX > 985) {
            this.ballX = 985;
            this.ballVX = -this.ballVX * 2 / 3;
            this.fHitBackWall = true;
         }

         if(this.ballX > this.postPos - 17 && this.ballX < this.postPos + 17 && this.ballY < 135) {
            if((this.p2X < this.battingCrease - 50 && this.p2X > this.runningCrease + 50 || this.p2Y != 0) && this.fP1Touched && this.fP2Touched) {
               this.promptMsg = this.COMM_RUNOUT[(int)((double)this.COMM_RUNOUT.length * Math.random())];
               this.thisBall = -this.wicketPenalty;
            } else if(!this.fNoBall && !this.fHitBackWall && this.p1Touches == 1) {
               this.promptMsg = this.COMM_BOWLED[(int)((double)this.COMM_BOWLED.length * Math.random())];
               if(this.fP2Touched && Math.random() < 0.5D) {
                  this.promptMsg = this.COMM_PLAYEDON[(int)((double)this.COMM_PLAYEDON.length * Math.random())];
               }

               this.thisBall = -this.wicketPenalty;
            }

            this.fHitBackWall = true;
            if(this.ballVY < 0 && this.ballY > 130) {
               this.ballVY *= -1;
               this.ballY = 130;
            } else if(this.ballX < this.postPos) {
               this.ballX = this.postPos - 17;
               this.ballVX = (this.ballVX >= 0?-this.ballVX:this.ballVX) * 3 / 4;
            } else {
               this.ballX = this.postPos + 17;
               this.ballVX = (this.ballVX <= 0?-this.ballVX:this.ballVX) * 3 / 4;
            }
         }
      }

      if(this.ballX > this.ballXMax) {
         this.ballXMax = this.ballX;
      }

      var6 = this.ballX * this.nWidth / 1000;
      var7 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
      this.screen.setColor(this.BALL_COL);
      this.screen.fillOval(var6 - var5, var7 - var5, 2 * var5, 2 * var5);
      this.drawScores();
      if(this.promptMsg.length() > 0) {
         if(this.promptMsg.length() > 1 && Math.random() < 0.3D) {
            this.promptMsg = this.COMM_OUT_GENERIC[(int)((double)this.COMM_OUT_GENERIC.length * Math.random())];
         }

         this.drawPrompt(this.promptMsg, 0);
         if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, this);
         }

         if(this.promptMsg.length() > 1) {
            this.sleep(1500L);
         }

         this.promptMsg = "";
         this.nextBall();
      }

   }

   private void sleep(long var1) {
      if(this.gameThread != null) {
         try {
            Thread.sleep(var1);
         } catch (InterruptedException var3) {
            ;
         }
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

   private void drawScores() {
      if(this.inns != 0) {
         Graphics var1 = this.screen;
         FontMetrics var2 = var1.getFontMetrics();
         byte var3 = 1;
         var1.setColor(this.SKY_COL);
         var1.fillRect(0, 0, this.nWidth / 2, 3 * var2.getAscent() + 10);
         var1.setColor(Color.white);
         String var4 = this.slimeColText[this.p2Col] + (this.p2Score + (long)this.thisBall);
         var1.drawString(var4, 10, (var2.getAscent() + 3) * var3 + 10);
         int var5 = var3 + 1;
         if(this.inns != 1) {
            var4 = this.slimeColText[this.p1Col] + this.p1Score;
            var1.drawString(var4, 10, (var2.getAscent() + 3) * var5 + 10);
            ++var5;
         }

         if(this.ballCount < 6 * this.overs - 1) {
            var4 = "Over: " + this.ballCount / 6;
            if(this.ballCount % 6 != 0) {
               var4 = var4 + "." + this.ballCount % 6;
            }

            var4 = var4 + " (" + this.overs + ")";
         } else if(this.ballCount == 6 * this.overs - 1) {
            var4 = "Last ball";
         } else {
            var4 = "Over: " + this.overs;
         }

         var1.drawString(var4, 10, (var2.getAscent() + 3) * var5 + 20);
         ++var5;
         if(this.p1X != 200 || this.p2X != 800 || this.fP1Touched || this.fP2Touched) {
            ;
         }
      }
   }

   private void drawWorm() {
      Graphics var1 = this.buffered?this.buffer.getGraphics():this.getGraphics();
      FontMetrics var2 = var1.getFontMetrics();
      long var5 = this.getMinScore(1);
      long var7 = this.getMinScore(2);
      long var11 = this.getMaxScore(1);
      long var13 = this.getMaxScore(2);
      long var3 = var5 < var7?var5:var7;
      long var9 = var11 > var13?var11:var13;
      if(var3 != 0L || var9 != 0L) {
         int var15 = this.nWidth * 4 / 5 - 5;
         int var16 = this.nWidth / 5;
         int var17 = (int)(5L + (long)(this.nHeight / 5) * var9 / (var9 - var3));
         int var18 = this.nHeight / 5;
         if(this.fEndOfOver) {
            var15 = this.nWidth / 10 - 5;
            var16 = this.nWidth * 4 / 5;
            var17 = (int)((long)(this.nHeight * 2 / 5) * var9 / (var9 - var3) + (long)(this.nHeight * 3 / 10));
            var18 = this.nHeight * 2 / 5;
         }

         if(this.inns == 2) {
            var1.setColor(this.slimeColours[this.p1Col]);
            var1.drawString(this.slimeColAbbr[this.p1Col], var15 - var2.stringWidth(this.slimeColAbbr[this.p1Col]) - 5, var17 - (int)((var9 + var3) / 2L * (long)var18 / (var9 - var3)));
            var1.drawLine(var15, var17, var15 + var16 / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p1bxb[0] / (var9 - var3)));

            for(int var19 = 1; var19 < 6 * this.overs; ++var19) {
               var1.drawLine(var15 + var16 * var19 / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p1bxb[var19 - 1] / (var9 - var3)), var15 + var16 * (var19 + 1) / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p1bxb[var19] / (var9 - var3)));
            }

            var1.setColor(this.slimeColours[this.p2Col]);
            var1.drawString(this.slimeColAbbr[this.p2Col], var15 - var2.stringWidth(this.slimeColAbbr[this.p2Col]) - 5, var17 - (int)((var9 + var3) / 2L * (long)var18 / (var9 - var3)) + var2.getAscent());
            var1.drawLine(var15, var17, var15 + var16 / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p2bxb[0] / (var9 - var3)));

            for(int var20 = 1; var20 < this.ballCount; ++var20) {
               var1.drawLine(var15 + var16 * var20 / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p2bxb[var20 - 1] / (var9 - var3)), var15 + var16 * (var20 + 1) / (6 * this.overs), (int)((long)var17 - (long)var18 * this.p2bxb[var20] / (var9 - var3)));
            }

            var1.setColor(Color.white);
            var1.drawString(String.valueOf(var9), var15 - 5 - var2.stringWidth(String.valueOf(var9)), var17 - (int)(var9 * (long)var18 / (var9 - var3)) + var2.getAscent());
            var1.drawString(String.valueOf(var3), var15 - 5 - var2.stringWidth(String.valueOf(var3)), var17 - (int)(var3 * (long)var18 / (var9 - var3)));
            var1.drawLine(var15, var17 - (int)(var9 * (long)var18 / (var9 - var3)), var15, var17 - (int)(var3 * (long)var18 / (var9 - var3)));
            var1.drawLine(var15, var17, var15 + var16, var17);
         }

      }
   }

   public void run() {
      Graphics var1 = this.getGraphics();

      while(this.gameThread != null) {
         this.p1OldX = this.p1X;
         this.p1OldY = this.p1Y;
         this.p2OldX = this.p2X;
         this.p2OldY = this.p2Y;
         this.p3OldY = this.p3Y;
         this.ballOldX = this.ballX;
         this.ballOldY = this.ballY;
         this.MoveSlimers();
         this.DrawSlimers();
         if(this.buffered) {
            var1.drawImage(this.buffer, 0, 0, (ImageObserver)null);
         }

         if(this.ballCount == this.overs * 6 && !this.fNoBall) {
            this.fInPlay = false;
            this.gameThread = null;
            if(this.inns == 1) {
               this.promptMsg = "Click the mouse to continue...";
            } else {
               this.promptMsg = "Click team names to select teams, then choose an innings length to start!";
               this.fEndGame = true;
            }
         }

         if(this.gameThread != null) {
            try {
               Thread.sleep(20L);
            } catch (InterruptedException var2) {
               ;
            }
         }
      }

      if(!this.fEndOfOver) {
         this.fInPlay = false;
      }

      this.repaint();
   }

   private void DoFatality() {
   }

   public void destroy() {
      this.gameThread.stop();
      this.gameThread = null;
   }

   public Slime2P() {
      this.slimeColours = new Color[]{Color.yellow, new Color(128, 128, 255), new Color(164, 164, 255), Color.black, Color.green, new Color(0, 162, 0), new Color(0, 0, 210), new Color(128, 78, 0), Color.red};
      this.slimeColours2 = new Color[]{new Color(0, 162, 0), Color.white, Color.yellow, Color.gray, Color.white, Color.yellow, Color.yellow, Color.white, Color.yellow};
      this.slimeColText = new String[]{"Australia ", "England ", "India ", "New Zealand ", "Pakistan ", "South Africa ", "Sri Lanka ", "West Indies ", "Zimbabwe "};
      this.slimeColAbbr = new String[]{"AUS", "ENG", "IND", "NZ", "PAK", "RSA", "SL", "WI", "ZIM"};
      this.p1Diam = 100;
      this.p2Diam = 100;
      this.ballRad = 25;
      this.BALL_COL = Color.white;
      this.COURT_COL = new Color(0, 160, 0);
      this.DAY_COL = new Color(85, 85, 255);
      this.NIGHT_COL = new Color(0, 0, 128);
      this.SKY_COL = this.DAY_COL;
      this.fHitBackWall = false;
      this.postPos = 900;
      this.bowlingCrease = 250;
      this.runningCrease = 450;
      this.battingCrease = 850;
      this.inns = 1;
      this.wicketPenalty = 5;
      this.fNoBall = false;
      this.overs = 5;
      this.COMM_FOUR = new String[]{"Along the carpet it goes for four.", "Back past the bowler for four.", "Picks the gap nicely and into the fence it goes for four.", "Shot!", "Four more added to the total.", "It\'s certainly a batsman\'s paradise out there today.", "... and the umpire waves his arm once more.", "Exactly not what the bowler had planned.", "Well it\'s bounced up off the rope and smacked some guy in the face!"};
      this.COMM_FOURTOUCHED = new String[]{"Terrible fielding effort there.", "The bowler won\'t be pleased with that effort.", "Well that should never have been a four."};
      this.COMM_SIX = new String[]{"He\'s carving them up like a Christmas cake!", "That\'s come right orf the meat of the bat.", "Wabam!", "He\'s hit that one very hored indeed.", "He\'s smacked that one.", "It\'s gone all the way for six!", "He could be a hero if he keeps batting like this.", "Six more to the score.", "Well it wasn\'t pretty but it certainly was effective.", "It\'s not Mark Waugh carting Vettori onto the roof of the stand, but it\'s still a six.", "The bowler\'s not happy but whoever caught that in the crowd just won some money.", "Looks like he\'s chasing Andrew Symonds\' record here..."};
      this.COMM_SIXTOUCHED = new String[]{"Oh no, he\'s done a Paul Reiffel!", "Well that\'s six more on top of the no ball, he can\'t be happy."};
      this.COMM_STUMPED = new String[]{"Stumped him!", "A fine example of wicket keeping there. Excellent stuff.", "There goes the red light! What quick hands this keeper has!"};
      this.COMM_RUNOUT = new String[]{"He\'s run out! What a tragedy!", "... and there\'s the red light. He\'s out.", "Allan Donald would be pleased with that effort.", "Well the fielder\'s decided to chance his arm, and it\'s come off!", "The bails were off in a flash, he never had a chance.", "Poor calling there, he deserved to get out.", "Well what else do you expect if you run like Ranatunga?"};
      this.COMM_BOWLED = new String[]{"Bowled him neck and crop.", "Tremendous delivery, he really had no idea about that.", "What a marvellous ball!", "That\'s a ripsnorter of a ball!", "I think that\'s just knocked Joe the stumpcameraman out.", "Well the bowler\'s certainly had his weeties this morning.", "There\'s the death rattle.", "That\'s gotta be a contender for today\'s fastest ball.", "Straight through the gate. The batsman won\'t be pleased with that.", "Completely bamboozled.", "A wonderful spell of bowling, this."};
      this.COMM_PLAYEDON = new String[]{"He\'s played on!", "A magnificent chop shot, oh wait, it\'s hit the stumps.", "He\'s done an Adam Gilchrist!"};
      this.COMM_CAUGHT = new String[]{"He\'s hit it straight down his throat.", "A safe pair of hands, he doesn\'t drop those.", "What a magnificent shot! No, he\'s been caught!", "A marvellous catch, that.", "... and he takes a straightforward catch.", "Well, they say \"catches win matches\".", "Caught, yes!", "Well, he\'s picked out the only fielder in front of the bat!", "Can\'t be happy with that shot.", "What a shame, we can\'t use the snickometer on that one it\'s so damned obvious."};
      this.COMM_CTBEHIND = new String[]{"... the keeper gobbles up the catch.", "... and the snickometer shows that that\'s clearly out.", "Excellent line and length, he\'s got another edge.", "Yes, there was some bat in that, he\'s gone!"};
      this.COMM_OUT_GENERIC = new String[]{"Got him, yes!", "It\'s all happening here!", "A marvellous effort, that!", "Oh dear.", "Gone!", "What a magnificent fielding side this team is.", "Yes, another one! He\'s a hero, this man!"};
      this.buffered = false;
   }
}
