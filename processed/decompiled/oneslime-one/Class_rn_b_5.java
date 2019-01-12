// $FF: renamed from: b
public class Class_rn_b_5 extends Class_rn_c_1 {
   // $FF: renamed from: h int
   private int field_rn_b_h_57 = -1;

   // $FF: renamed from: a () void
   public void method_rn_c_a_11() {
      if(this.field_rn_b_h_57 == -1 && (this.void != 800 || this.do != 0)) {
         int var2 = this.method_rn_b_if_53(this.for + this.b + 30);
         byte var1;
         if(var2 < 600) {
            var1 = 0;
         } else if(var2 < 700) {
            var1 = 10;
         } else {
            var1 = 20;
         }

         if(var2 < 450) {
            if(Math.abs(this.int - 666) < 10) {
               this.a(3);
            } else if(666 < this.int) {
               this.a(0);
            } else if(666 > this.int) {
               this.a(1);
            }
         } else if(Math.abs(this.int - var2 - var1) < 10) {
            this.a(3);
         } else if(var2 + var1 < this.int) {
            this.a(0);
         } else if(var2 + var1 > this.int) {
            this.a(1);
         }

         if((this.int <= 900 || Math.random() >= 0.4D) && var2 >= 620 && (this.else >= 130 || this.if >= 0) && (!this.f || Math.random() >= 0.6D)) {
            if((this.int >= 900 && this.void > 830 || this.int <= 580 && this.void < 530) && Math.abs(this.void - this.int) < 100) {
               this.a(2);
            } else if(this.method_rn_b_for_51(this.void - this.int) * 2 + this.method_rn_b_for_51(this.else - this.for) < this.method_rn_b_for_51(185) && this.void != this.int) {
               this.a(2);
            } else if(this.do * this.do + this.if * this.if < 20 && this.void - this.int < 30 && this.void != this.int) {
               this.a(2);
            } else if(Math.abs(this.void - this.int) < (this.f?135:150) && this.else > 50 && this.else < 250) {
               this.a(2);
            }
         }

      } else {
         this.method_rn_b_do_55();
      }
   }

   // $FF: renamed from: for (int) int
   private int method_rn_b_for_51(int var1) {
      return var1 * var1;
   }

   // $FF: renamed from: do (int) int
   private int method_rn_b_do_52(int var1) {
      int var2 = 0;
      int var3 = this.else;
      int var4 = this.if;

      while(true) {
         --var4;
         if((var3 += var4) <= 0) {
            return var2;
         }

         ++var2;
      }
   }

   // $FF: renamed from: if (int) int
   private int method_rn_b_if_53(int var1) {
      int var2 = this.void;
      int var3 = this.else;
      int var4 = this.if;

      while(true) {
         --var4;
         if((var3 += var4) <= var1) {
            return var2;
         }

         var2 += this.do;
         if(var2 <= 0) {
            var2 = 0;
            this.do = -this.do;
         } else if(var2 >= 1000) {
            var2 = 1000;
            this.do = -this.do;
         }
      }
   }

   // $FF: renamed from: for () int
   private int method_rn_b_for_54() {
      int var1 = this.int - this.void;
      int var2 = this.for - this.else;
      return (int)Math.sqrt((double)(var1 * var1 + var2 * var2));
   }

   // $FF: renamed from: do () void
   private void method_rn_b_do_55() {
      if(this.field_rn_b_h_57 == -1) {
         if(Math.random() < 0.3D) {
            if(this.g < 300 && !this.f) {
               this.field_rn_b_h_57 = 0;
            } else if(this.g > 200) {
               this.field_rn_b_h_57 = 1;
            } else {
               this.field_rn_b_h_57 = 2;
            }
         } else {
            this.field_rn_b_h_57 = 2;
         }

         if(this.field_rn_b_h_57 == -1 || Math.random() < 0.3D) {
            this.field_rn_b_h_57 = (int)(Math.random() * 3.0D);
         }

         if(this.f && this.field_rn_b_h_57 == 0) {
            this.field_rn_b_h_57 = 1 + (int)(Math.random() * 2.0D);
         }
      }

      int var1;
      switch(this.field_rn_b_h_57) {
      case 0:
      case 1:
         int var2 = this.field_rn_b_h_57 == 0?860:840;
         if(this.if > 12 && this.int < var2) {
            this.a(1);
         }

         if(this.int >= var2) {
            this.a(3);
         }

         if(this.if == -3 && this.int != 800) {
            this.a(2);
         }

         if(this.if < -12 && this.for != 0 && this.int >= var2 - 15 && this.field_rn_b_h_57 == 0) {
            this.a(0);
         }

         if(this.void < 700) {
            this.field_rn_b_h_57 = -1;
         }
         break;
      case 2:
         short var3 = 770;
         if(this.if > 12 && this.int > var3) {
            this.a(0);
         }

         if(this.int <= var3) {
            this.a(3);
         }

         if(this.if == -2 && this.int != 800) {
            this.a(2);
         }

         if(this.for != 0 && this.void > 800) {
            this.field_rn_b_h_57 = 3 + this.method_rn_b_if_56();
         }
         break;
      case 3:
         var1 = !this.f?585:555;
         if(this.int > var1) {
            this.a(0);
         }

         if(this.int <= var1) {
            this.a(3);
         }

         if(this.void <= (!this.f?730:740)) {
            this.a(2);
         }

         if(this.void < 540) {
            this.field_rn_b_h_57 = -1;
         }
         break;
      case 4:
         var1 = !this.f?585:555;
         if(this.int > var1) {
            this.a(0);
         }

         if(this.int <= var1) {
            this.a(3);
         }

         if(this.void <= (!this.f?730:700)) {
            this.a(2);
         }

         if(this.void < 600) {
            this.a(1);
         }

         if(this.void < 580) {
            this.a(3);
         }

         if(this.void < 540) {
            this.field_rn_b_h_57 = -1;
         }
      }

   }

   // $FF: renamed from: if () int
   private int method_rn_b_if_56() {
      boolean var1 = false;
      if(this.g < 200) {
         var1 = Math.random() < 0.7D;
      } else if(this.g > 300) {
         var1 = Math.random() < 0.3D;
      } else {
         var1 = Math.random() < 0.5D;
      }

      return var1?1:0;
   }
}
