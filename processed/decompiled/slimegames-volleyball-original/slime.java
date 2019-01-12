import java.applet.Applet;
import java.awt.Color;
import java.awt.Event;
import java.awt.Font;
import java.awt.Graphics;

public class slime extends Applet implements Runnable {
   // $FF: renamed from: th java.lang.Thread
   Thread field_rn_slime_th_1;
   Graphics gra;
   int XSIZE;
   int YSIZE;
   int SLIMESIZE;
   int BALLSIZE;
   int NETSIZEX;
   int NETSIZEY;
   int GROUNDSIZE;
   int EYESIZE;
   int BLACKEYESIZE;
   int WINSCORE;
   // $FF: renamed from: G double
   double field_rn_slime_G_2;
   int comLevel;
   int paintFlag;
   int comserv;
   // $FF: renamed from: px double[]
   double[] field_rn_slime_px_3 = new double[3];
   // $FF: renamed from: py double[]
   double[] field_rn_slime_py_4 = new double[3];
   double[] pvx = new double[3];
   double[] pvy = new double[3];
   // $FF: renamed from: bx double
   double field_rn_slime_bx_5;
   // $FF: renamed from: by double
   double field_rn_slime_by_6;
   double bvx;
   double bvy;
   int[] score = new int[3];
   int[] jumpFlag = new int[3];
   int service;
   int moveX;
   int jump;
   int comjump;
   int mDown;

   public void init() {
      this.XSIZE = 600;
      this.YSIZE = 400;
      this.SLIMESIZE = 35;
      this.BALLSIZE = 10;
      this.NETSIZEX = 6;
      this.NETSIZEY = 50;
      this.GROUNDSIZE = 50;
      this.EYESIZE = 8;
      this.BLACKEYESIZE = 4;
      this.WINSCORE = 6;
      this.field_rn_slime_G_2 = 0.05D;
      this.mDown = 0;
      this.paintFlag = 0;
      this.comserv = 0;
      this.gra = this.getGraphics();
   }

   public void paint(Graphics var1) {
      switch(this.paintFlag) {
      case 1:
         this.ShowTitle();
         return;
      case 2:
         this.DrawAll();
         this.DrawScore();
         return;
      default:
      }
   }

   public void start() {
      if(this.field_rn_slime_th_1 == null) {
         this.field_rn_slime_th_1 = new Thread(this);
         this.field_rn_slime_th_1.start();
      }

   }

   public void stop() {
      if(this.field_rn_slime_th_1 != null) {
         this.field_rn_slime_th_1.stop();
         this.field_rn_slime_th_1 = null;
      }

   }

   public boolean keyDown(Event var1, int var2) {
      if(var2 != 1006 && var2 != 52) {
         if(var2 == 1007 || var2 == 54) {
            this.moveX = 1;
         }
      } else {
         this.moveX = -1;
      }

      if(var2 == 32) {
         this.jump = 1;
      }

      return true;
   }

   public boolean keyUp(Event var1, int var2) {
      if(var2 == 1006 || var2 == 1007 || var2 == 52 || var2 == 54) {
         this.moveX = 0;
      }

      if(var2 == 32) {
         this.jump = 0;
      }

      return true;
   }

   public boolean mouseUp(Event var1, int var2, int var3) {
      this.mDown = 1;
      return true;
   }

   public void run() {
      this.Setup();
   }

   void Setup() {
      boolean var2 = false;

      int var3;
      do {
         this.paintFlag = 1;
         this.ShowTitle();
         this.WaitClickMouse();
         this.paintFlag = 0;
         this.comLevel = this.SelectComLevel();
         int var1 = this.Main();
         var3 = this.ShowWinner(var1);
      } while(var3 == 0);

   }

   void ShowTitle() {
      this.DrawBG();
      this.gra.setColor(Color.white);
      this.gra.setFont(new Font("TimesRoman", 1, 64));
      this.gra.drawString("Slime Volley Ball", 20, 150);
      this.gra.setFont(new Font("TimesRoman", 1, 32));
      this.gra.drawString("CLICK MOUSE", 350, 250);
   }

   void WaitClickMouse() {
      this.mDown = 0;

      try {
         do {
            Thread.sleep(1L);
         } while(this.mDown == 0);
      } catch (InterruptedException var1) {
         ;
      }

      this.mDown = 0;
   }

   int SelectComLevel() {
      return 1;
   }

   int ShowWinner(int var1) {
      this.gra.setFont(new Font("TimesRoman", 1, 50));
      this.gra.setColor(Color.white);
      byte var2;
      if(var1 == 1) {
         var2 = 2;
         this.gra.drawString("You Win!", 200, 100);
      } else {
         var2 = 1;
         this.gra.drawString("You lose.", 200, 100);
      }

      for(int var3 = 0; var3 < 3; ++var3) {
         this.pvy[var1] = -80.0D * this.field_rn_slime_G_2;
         this.field_rn_slime_py_4[var1] = (double)(this.YSIZE - this.GROUNDSIZE);

         do {
            this.gra.setColor(new Color(100, 100, 255));
            this.gra.fillRect((int)this.field_rn_slime_px_3[var1] - this.SLIMESIZE, (int)this.field_rn_slime_py_4[var1] - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE);
            this.field_rn_slime_py_4[var1] += this.pvy[var1];
            this.pvy[var1] += this.field_rn_slime_G_2 * 2.0D;
            this.DrawSlime(var2);

            try {
               Thread.sleep(5L);
            } catch (InterruptedException var4) {
               ;
            }
         } while(this.pvy[var1] < 80.0D * this.field_rn_slime_G_2);
      }

      this.gra.setColor(new Color(100, 100, 255));
      this.gra.fillRect((int)this.field_rn_slime_px_3[var1] - this.SLIMESIZE, (int)this.field_rn_slime_py_4[var1] - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE);
      this.field_rn_slime_py_4[var1] = (double)(this.YSIZE - this.GROUNDSIZE);
      this.DrawSlime(var2);
      return 1;
   }

   int Main() {
      this.score[1] = 0;
      this.score[2] = 0;
      this.service = 1;
      this.DrawBG();
      this.DrawScore();

      int var1;
      do {
         if(this.service == 2) {
            this.comserv = (int)(Math.random() * 4.0D + 1.0D);
         }

         var1 = this.Game(this.service);
         ++this.score[var1];
         this.DrawScore();
         if(var1 == 1) {
            this.DrawSlime(2);
         } else if(var1 == 2) {
            this.DrawSlime(1);
         }

         try {
            Thread.sleep(2000L);
         } catch (InterruptedException var2) {
            ;
         }

         this.service = var1;
      } while(this.score[1] != this.WINSCORE && this.score[2] != this.WINSCORE);

      return var1;
   }

   int Game(int var1) {
      this.field_rn_slime_px_3[1] = (double)(this.SLIMESIZE + this.SLIMESIZE);
      this.field_rn_slime_px_3[2] = (double)(this.XSIZE - this.SLIMESIZE - this.SLIMESIZE);
      this.field_rn_slime_py_4[1] = (double)(this.YSIZE - this.GROUNDSIZE);
      this.field_rn_slime_py_4[2] = (double)(this.YSIZE - this.GROUNDSIZE);
      this.pvx[1] = 0.0D;
      this.pvx[2] = 0.0D;
      this.pvy[1] = 0.0D;
      this.pvy[2] = 0.0D;
      this.jumpFlag[1] = 0;
      this.jumpFlag[2] = 0;
      this.field_rn_slime_bx_5 = this.field_rn_slime_px_3[var1];
      this.field_rn_slime_by_6 = this.field_rn_slime_py_4[var1] - (double)this.SLIMESIZE - (double)this.SLIMESIZE;
      this.bvx = 0.0D;
      this.bvy = -50.0D * this.field_rn_slime_G_2;
      int var2 = 0;
      this.DrawAll();
      this.paintFlag = 2;

      try {
         Thread.sleep(100L);
      } catch (InterruptedException var4) {
         ;
      }

      do {
         try {
            Thread.sleep(8L);
            this.MoveBall();
            this.MoveSlime(1);
            this.MoveSlime(2);
            this.CheckHit();
            var2 = this.CheckPoint();
            this.DrawAll();
         } catch (InterruptedException var3) {
            ;
         }
      } while(var2 == 0);

      this.paintFlag = 0;
      return var2;
   }

   void MoveBall() {
      this.field_rn_slime_bx_5 += this.bvx;
      this.field_rn_slime_by_6 += this.bvy;
      this.bvy += this.field_rn_slime_G_2;
      if(this.field_rn_slime_bx_5 < (double)this.BALLSIZE) {
         this.field_rn_slime_bx_5 = (double)this.BALLSIZE;
         this.bvx = -this.bvx;
      } else if(this.field_rn_slime_bx_5 > (double)(this.XSIZE - this.BALLSIZE)) {
         this.field_rn_slime_bx_5 = (double)(this.XSIZE - this.BALLSIZE);
         this.bvx = -this.bvx;
      }

      if(this.field_rn_slime_bx_5 > (double)(this.XSIZE / 2 - this.NETSIZEX / 2 - this.BALLSIZE) && this.field_rn_slime_bx_5 < (double)(this.XSIZE / 2 + this.NETSIZEX / 2 + this.BALLSIZE)) {
         if(this.field_rn_slime_by_6 > (double)(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY)) {
            if(this.bvx < 0.0D) {
               this.field_rn_slime_bx_5 = (double)(this.XSIZE / 2 + this.NETSIZEX / 2 + this.BALLSIZE + 1);
               this.bvx = -this.bvx;
               return;
            }

            if(this.bvx > 0.0D) {
               this.field_rn_slime_bx_5 = (double)(this.XSIZE / 2 - this.NETSIZEX / 2 - this.BALLSIZE - 1);
               this.bvx = -this.bvx;
               return;
            }
         } else if(this.field_rn_slime_by_6 <= (double)(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY) && this.field_rn_slime_by_6 > (double)(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY - this.BALLSIZE)) {
            this.field_rn_slime_by_6 = (double)(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY - this.BALLSIZE);
            this.bvy = -Math.abs(this.bvy);
         }
      }

   }

   void CheckHit() {
      for(int var3 = 1; var3 <= 2; ++var3) {
         if(this.field_rn_slime_by_6 <= this.field_rn_slime_py_4[var3]) {
            double var1 = (this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) * (this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) + (this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6) * (this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6);
            var1 = Math.sqrt(var1);
            if(var1 <= (double)(this.SLIMESIZE + this.BALLSIZE)) {
               this.HitBall(var3);
            }
         } else if(Math.abs(this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6) < (double)this.BALLSIZE && Math.abs(this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) < (double)(this.SLIMESIZE + this.BALLSIZE)) {
            this.HitBall2();
         }
      }

   }

   void HitBall(int var1) {
      if(this.comserv != 0) {
         this.comserv = 0;
      }

      double var6 = Math.sqrt(this.bvx * this.bvx + this.bvy * this.bvy);
      double var2 = (this.field_rn_slime_bx_5 - this.field_rn_slime_px_3[var1]) / (double)(this.SLIMESIZE + this.BALLSIZE);
      double var4 = (this.field_rn_slime_by_6 - this.field_rn_slime_py_4[var1]) / (double)(this.SLIMESIZE + this.BALLSIZE);
      this.bvx += var2 * (var6 + 80.0D * this.field_rn_slime_G_2);
      if(this.bvx < -100.0D * this.field_rn_slime_G_2) {
         this.bvx = -100.0D * this.field_rn_slime_G_2;
      } else if(this.bvx > 100.0D * this.field_rn_slime_G_2) {
         this.bvx = 100.0D * this.field_rn_slime_G_2;
      }

      if(this.jumpFlag[var1] == 0) {
         this.bvy = var4 * 80.0D * this.field_rn_slime_G_2;
      } else {
         this.bvy = var4 * 10.0D * this.field_rn_slime_G_2;
      }

      this.field_rn_slime_bx_5 += this.bvx * 2.0D;
      this.field_rn_slime_by_6 += this.bvy * 2.0D;
   }

   void HitBall2() {
      this.bvy = Math.abs(this.bvy);
   }

   int CheckPoint() {
      byte var1 = 0;
      if(this.field_rn_slime_by_6 > (double)(this.YSIZE - this.GROUNDSIZE - this.BALLSIZE)) {
         if(this.field_rn_slime_bx_5 < (double)(this.XSIZE / 2 - this.NETSIZEX / 2)) {
            var1 = 2;
         } else {
            var1 = 1;
         }
      }

      return var1;
   }

   void MoveSlime(int var1) {
      int var2 = 0;
      int var3 = 0;
      if(this.jumpFlag[var1] == 0) {
         if(var1 == 1) {
            var2 = this.GetKey();
            var3 = this.GetJump();
         } else if(var1 == 2) {
            var2 = this.MoveCom2();
            var3 = this.ComJump();
         }

         this.pvx[var1] = (double)var2 * 1.5D;
         this.jumpFlag[var1] = var3;
         if(var3 == 1) {
            this.pvy[var1] = -80.0D * this.field_rn_slime_G_2;
         }
      }

      this.field_rn_slime_px_3[var1] += this.pvx[var1];
      if(var1 == 1) {
         if(this.field_rn_slime_px_3[var1] < (double)this.SLIMESIZE) {
            this.field_rn_slime_px_3[var1] = (double)this.SLIMESIZE;
         } else if(this.field_rn_slime_px_3[var1] > (double)(this.XSIZE / 2 - this.NETSIZEX / 2 - this.SLIMESIZE)) {
            this.field_rn_slime_px_3[var1] = (double)(this.XSIZE / 2 - this.NETSIZEX / 2 - this.SLIMESIZE);
         }
      } else if(var1 == 2) {
         if(this.field_rn_slime_px_3[var1] < (double)(this.XSIZE / 2 + this.NETSIZEX / 2 + this.SLIMESIZE)) {
            this.field_rn_slime_px_3[var1] = (double)(this.XSIZE / 2 + this.NETSIZEX / 2 + this.SLIMESIZE);
         } else if(this.field_rn_slime_px_3[var1] > (double)(this.XSIZE - this.SLIMESIZE)) {
            this.field_rn_slime_px_3[var1] = (double)(this.XSIZE - this.SLIMESIZE);
         }
      }

      if(this.jumpFlag[var1] == 1) {
         this.field_rn_slime_py_4[var1] += this.pvy[var1];
         this.pvy[var1] += this.field_rn_slime_G_2 * 2.0D;
         if(this.field_rn_slime_py_4[var1] >= (double)(this.YSIZE - this.GROUNDSIZE)) {
            this.field_rn_slime_py_4[var1] = (double)(this.YSIZE - this.GROUNDSIZE);
            this.jumpFlag[var1] = 0;
         }
      }

   }

   int GetKey() {
      return this.moveX;
   }

   int GetJump() {
      return this.jump;
   }

   int MoveCom() {
      byte var1 = 0;
      this.comjump = 0;
      if(this.field_rn_slime_bx_5 < (double)(this.XSIZE / 2)) {
         if(this.field_rn_slime_px_3[2] < (double)(this.XSIZE / 2 + this.XSIZE / 5)) {
            var1 = 1;
         } else if(this.field_rn_slime_px_3[2] > (double)(this.XSIZE / 2 + this.XSIZE / 5)) {
            var1 = -1;
         }
      }

      if(this.field_rn_slime_bx_5 > (double)(this.XSIZE / 2 - this.SLIMESIZE * 3)) {
         double var4 = (double)this.YSIZE - (double)this.GROUNDSIZE - this.field_rn_slime_by_6 - (double)this.SLIMESIZE / 1.5D;
         double var6 = (Math.sqrt(this.bvy * this.bvy + 2.0D * this.field_rn_slime_G_2 * var4) - this.bvy) / this.field_rn_slime_G_2;
         double var2 = this.field_rn_slime_bx_5 + this.bvx * var6;
         if(var2 > (double)this.XSIZE) {
            var2 = 2.0D * (double)this.XSIZE - var2;
         }

         if(var2 < (double)(this.XSIZE / 2 + this.XSIZE / 4)) {
            if(Math.abs(this.bvx) < 30.0D * this.field_rn_slime_G_2 && this.bvy > (8.0D + (this.field_rn_slime_py_4[2] - this.field_rn_slime_by_6) * 2.0D * this.field_rn_slime_G_2) * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - this.field_rn_slime_py_4[2]) > (double)this.SLIMESIZE * 2.5D) {
               this.comjump = 1;
               if(this.bvx > 20.0D * this.field_rn_slime_G_2 && this.field_rn_slime_px_3[2] < this.field_rn_slime_bx_5 - (double)this.BALLSIZE) {
                  var1 = 1;
               } else if(this.bvx < -20.0D * this.field_rn_slime_G_2 && this.field_rn_slime_px_3[2] > this.field_rn_slime_bx_5 + (double)this.BALLSIZE) {
                  var1 = -1;
               } else {
                  var1 = 0;
               }

               if(var2 < (double)(this.XSIZE / 2) && this.jumpFlag[1] == 0) {
                  this.comjump = 0;
               }
            } else if(Math.abs(this.bvx) < 20.0D * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - this.field_rn_slime_py_4[2]) > (double)this.SLIMESIZE * 2.5D) {
               if(this.field_rn_slime_px_3[2] - (double)this.BALLSIZE < this.field_rn_slime_bx_5) {
                  var1 = 1;
               } else if(this.field_rn_slime_px_3[2] - (double)this.BALLSIZE > this.field_rn_slime_bx_5) {
                  var1 = -1;
               }
            } else if(this.field_rn_slime_px_3[2] - (double)(this.BALLSIZE / 3) < var2) {
               var1 = 1;
            } else if(this.field_rn_slime_px_3[2] - (double)(this.BALLSIZE / 3) > var2) {
               var1 = -1;
            } else {
               var1 = 0;
            }
         } else if(this.field_rn_slime_px_3[2] - (double)(this.BALLSIZE / 2) < var2) {
            var1 = 1;
         } else if(this.field_rn_slime_px_3[2] - (double)(this.BALLSIZE / 2) > var2) {
            var1 = -1;
         } else {
            var1 = 0;
         }
      }

      return var1;
   }

   int ComJump() {
      if(this.comjump == 1) {
         this.comjump = 0;
         return 1;
      } else {
         return 0;
      }
   }

   void DrawAll() {
      this.DrawBG();
      this.DrawSlime(0);
      this.DrawBall();
   }

   void DrawBG() {
      Color var1 = new Color(100, 100, 255);
      this.gra.setColor(var1);
      this.gra.fillRect(0, 50, this.XSIZE, this.YSIZE - this.GROUNDSIZE - 50);
      var1 = new Color(180, 140, 160);
      this.gra.setColor(var1);
      this.gra.fillRect(0, this.YSIZE - this.GROUNDSIZE, this.XSIZE, this.GROUNDSIZE);
      this.gra.setColor(Color.white);
      this.gra.fillRect(this.XSIZE / 2 - this.NETSIZEX / 2, this.YSIZE - this.GROUNDSIZE - this.NETSIZEY, this.NETSIZEX, this.NETSIZEY);
   }

   void DrawSlime(int var1) {
      for(int var10 = 1; var10 <= 2; ++var10) {
         int var2 = (int)this.field_rn_slime_px_3[var10];
         int var3 = (int)this.field_rn_slime_py_4[var10];
         if(var10 == 1) {
            this.gra.setColor(Color.red);
         } else if(var10 == 2) {
            this.gra.setColor(Color.blue);
         }

         this.gra.fillArc(var2 - this.SLIMESIZE, var3 - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE * 2, 0, 180);
         if(var10 == 1) {
            var2 += this.SLIMESIZE / 2;
         } else if(var10 == 2) {
            var2 -= this.SLIMESIZE / 2;
         }

         var3 -= this.SLIMESIZE * 3 / 5;
         this.gra.setColor(Color.white);
         this.gra.fillArc(var2 - this.EYESIZE, var3 - this.EYESIZE, this.EYESIZE * 2, this.EYESIZE * 2, 0, 360);
         this.gra.setColor(Color.black);
         if(var1 != var10) {
            double var4 = this.field_rn_slime_bx_5 - (double)var2;
            double var6 = this.field_rn_slime_by_6 - (double)var3;
            double var8 = Math.sqrt(var4 * var4 + var6 * var6);
            var2 += (int)(var4 * (double)(this.BLACKEYESIZE + 1) / var8);
            var3 += (int)(var6 * (double)(this.BLACKEYESIZE + 1) / var8);
            this.gra.fillArc(var2 - this.BLACKEYESIZE, var3 - this.BLACKEYESIZE, this.BLACKEYESIZE * 2, this.BLACKEYESIZE * 2, 0, 360);
         } else {
            this.gra.drawLine(var2 - this.EYESIZE + 2, var3 - this.EYESIZE + 2, var2 + this.EYESIZE - 2, var3 + this.EYESIZE - 2);
            this.gra.drawLine(var2 - this.EYESIZE + 2, var3 + this.EYESIZE - 2, var2 + this.EYESIZE - 2, var3 - this.EYESIZE + 2);
         }
      }

   }

   void DrawBall() {
      this.gra.setColor(Color.yellow);
      this.gra.fillArc((int)this.field_rn_slime_bx_5 - this.BALLSIZE, (int)this.field_rn_slime_by_6 - this.BALLSIZE, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
   }

   void DrawScore() {
      this.gra.setColor(new Color(100, 100, 255));
      this.gra.fillRect(0, 0, this.XSIZE, 50);
      this.gra.setColor(Color.white);
      this.gra.setFont(new Font("TimesRoman", 1, 28));
      this.gra.drawString("RED ", 30, 46);
      this.gra.drawString("BLUE", 30 + this.XSIZE / 2, 46);
      this.gra.setColor(Color.yellow);

      for(int var1 = 1; var1 <= this.WINSCORE; ++var1) {
         if(this.score[1] < var1) {
            this.gra.drawArc(80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
         } else {
            this.gra.fillArc(80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
         }

         if(this.score[2] < var1) {
            this.gra.drawArc(this.XSIZE / 2 + 80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
         } else {
            this.gra.fillArc(this.XSIZE / 2 + 80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
         }
      }

   }

   int MoveCom2() {
      byte var3 = 0;
      boolean var4 = false;
      double var23 = (double)this.YSIZE - (double)this.GROUNDSIZE - this.field_rn_slime_by_6 - (double)this.SLIMESIZE;
      double var25 = (Math.sqrt(this.bvy * this.bvy + 2.0D * this.field_rn_slime_G_2 * var23) - this.bvy) / this.field_rn_slime_G_2;
      double var21 = this.field_rn_slime_bx_5 + this.bvx * var25;
      if(var21 > (double)this.XSIZE) {
         var21 = 2.0D * (double)this.XSIZE - var21;
      }

      if(var21 < 0.0D) {
         var21 = -var21;
      }

      double var5 = this.field_rn_slime_px_3[1];
      double var7 = this.field_rn_slime_px_3[2];
      double var13 = this.field_rn_slime_py_4[1];
      double var15 = this.field_rn_slime_py_4[2];
      int var1 = this.jumpFlag[1];
      int var2 = this.jumpFlag[2];
      double var29 = this.bvx;
      double var31 = this.bvy + this.field_rn_slime_G_2 * var25;
      double var33 = Math.sqrt(var29 * var29 * var31 * var31);
      if(var7 < (double)(this.XSIZE / 2 + this.XSIZE / 5)) {
         var3 = 1;
      } else if(var7 > (double)(this.XSIZE / 2 + this.XSIZE / 5)) {
         var3 = -1;
      }

      double var9 = (double)(this.SLIMESIZE + this.BALLSIZE) * this.bvx / (var33 + 80.0D * this.field_rn_slime_G_2);
      if(var21 > (double)(this.XSIZE / 2 - this.SLIMESIZE * 2)) {
         if(var21 > (double)(this.XSIZE / 2 + this.XSIZE / 4)) {
            if(var21 + var9 + (double)(this.BALLSIZE / 2) > var7) {
               var3 = 1;
            } else if(var21 + var9 + (double)(this.BALLSIZE / 2) < var7) {
               var3 = -1;
            } else {
               var3 = 0;
            }
         } else if(Math.abs(this.bvx) < 30.0D * this.field_rn_slime_G_2) {
            if(var5 < (double)(this.XSIZE / 3) && Math.abs(this.field_rn_slime_by_6 - var15) > (double)this.SLIMESIZE * 2.5D) {
               if(this.field_rn_slime_bx_5 + (double)this.BALLSIZE + this.bvx * 10.0D > var7) {
                  var3 = 1;
               } else if(this.field_rn_slime_bx_5 + (double)this.BALLSIZE + this.bvx * 10.0D < var7) {
                  var3 = -1;
               } else {
                  var3 = 0;
               }
            } else if(var21 + var9 + (double)(this.BALLSIZE * 2) > var7) {
               var3 = 1;
            } else if(var21 + var9 + (double)(this.BALLSIZE * 2) < var7) {
               var3 = -1;
            } else {
               var3 = 0;
            }
         } else if(var21 + var9 + (double)(this.BALLSIZE / 6) > var7) {
            var3 = 1;
         } else if(var21 + var9 + (double)(this.BALLSIZE / 6) < var7) {
            var3 = -1;
         } else {
            var3 = 0;
         }

         if(this.field_rn_slime_bx_5 < (double)(this.XSIZE / 2) && Math.abs(var5 - this.field_rn_slime_bx_5) < (double)this.SLIMESIZE && var1 != 0 && var7 < (double)(this.XSIZE / 2 + this.XSIZE / 4) && this.field_rn_slime_bx_5 > (double)(this.XSIZE / 3)) {
            var3 = -1;
            var4 = true;
         }

         if(Math.abs(this.bvx) < 25.0D * this.field_rn_slime_G_2 && this.bvy > (8.0D + (var15 - this.field_rn_slime_by_6) * 2.0D * this.field_rn_slime_G_2) * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - var15) > (double)this.SLIMESIZE * 2.5D && var7 < (double)(this.XSIZE / 2 + this.XSIZE / 4) && this.bvx * 20.0D + this.field_rn_slime_bx_5 < var7 + (double)this.BALLSIZE && this.bvx * 20.0D + this.field_rn_slime_bx_5 > var7 - (double)this.SLIMESIZE) {
            if(var5 < (double)this.XSIZE / 2.7D) {
               var4 = true;
               var3 = 0;
            } else if(var1 == 1) {
               var4 = true;
               var3 = 0;
            }
         }
      }

      var9 = var7 - (double)this.SLIMESIZE * 1.5D - this.field_rn_slime_bx_5;
      if(var9 > 0.0D && var7 < (double)(this.XSIZE / 2 + this.XSIZE / 4)) {
         var25 = var9 / this.bvx;
         double var17 = this.field_rn_slime_by_6 + var25 * this.bvy + this.field_rn_slime_G_2 * var25 * var25 / 2.0D;
         if(var17 > var15 - (double)this.NETSIZEY - (double)this.SLIMESIZE * 1.5D && var17 < var15 - (double)this.NETSIZEY) {
            if(var25 > 20.0D && var25 < 30.0D) {
               double var11 = var9 - 60.0D;
               if(var11 > 0.0D && var7 < (double)(this.XSIZE / 2 + this.XSIZE + 4) + 60.0D) {
                  double var27 = var11 / this.bvx;
                  double var19 = this.field_rn_slime_by_6 + var27 * this.bvy + this.field_rn_slime_G_2 * var27 * var27 / 2.0D;
                  if(var19 > var15 - (double)this.NETSIZEY - (double)this.SLIMESIZE * 1.5D && var19 < var15 - (double)this.NETSIZEY && var27 > 13.0D && var27 < 15.0D) {
                     var3 = -1;
                     var4 = true;
                  }
               } else {
                  var3 = -1;
               }
            } else if(var25 > 7.0D && var25 < 10.0D) {
               var3 = 0;
               var4 = true;
            }
         }
      }

      if(this.comserv != 0) {
         switch(this.comserv) {
         case 1:
            if(var21 + (double)(this.BALLSIZE * 2) < var7) {
               var3 = -1;
            } else if(var21 + (double)(this.BALLSIZE * 2) > var7) {
               var3 = 1;
            } else {
               var3 = 0;
            }
            break;
         case 2:
            if(var21 + (double)this.BALLSIZE * 2.5D < var7) {
               var3 = -1;
            } else if(var21 + (double)this.BALLSIZE * 2.5D > var7) {
               var3 = 1;
            } else {
               var3 = 0;
            }
         case 3:
         default:
            break;
         case 4:
            if(var21 - (double)this.BALLSIZE < var7) {
               var3 = -1;
            } else if(var21 - (double)this.BALLSIZE > var7) {
               var3 = 1;
            } else {
               var3 = 0;
            }
         }
      }

      if(var4 && this.comserv == 0) {
         this.comjump = 1;
      }

      return var3;
   }
}
