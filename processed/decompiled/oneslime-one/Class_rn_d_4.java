// $FF: renamed from: d
public class Class_rn_d_4 extends Class_rn_c_1 {
   // $FF: renamed from: i double
   private final double field_rn_d_i_49 = 0.85D;
   // $FF: renamed from: j int
   private int field_rn_d_j_50 = -1;

   // $FF: renamed from: try (int) int
   private int method_rn_d_try_45(int var1) {
      return var1 * var1;
   }

   // $FF: renamed from: new (int) int
   private int method_rn_d_new_46(int var1) {
      int var2 = 0;
      int var3 = this.else;
      int var4 = this.if;

      while(true) {
         --var4;
         if((var3 += var4) <= var1) {
            return var2;
         }

         ++var2;
      }
   }

   // $FF: renamed from: int (int) int
   private int method_rn_d_int_47(int var1) {
      int var2 = this.method_rn_d_new_46(var1);
      int var3 = this.void;
      int var4 = this.do;

      for(int var5 = 0; var5 < var2; ++var5) {
         var3 += var4;
         if(var3 < 0) {
            var3 = 0;
            var4 = -var4;
         } else if(var3 > 1000) {
            var3 = 1000;
            var4 = -var4;
         }
      }

      return var3;
   }

   // $FF: renamed from: a () void
   public void method_rn_c_a_11() {
      if(this.void < 500 && this.field_rn_d_j_50 != -1) {
         this.field_rn_d_j_50 = -1;
      }

      int var1 = this.method_rn_d_int_47(125);
      int var2 = this.method_rn_d_new_46(125);
      int var3;
      if(this.for != 0 && this.int < 575) {
         var3 = 0;
      } else {
         var3 = 25 + (int)(10.0D * Math.random());
      }

      if((this.do != 0 || this.void != 800) && this.field_rn_d_j_50 == -1) {
         if(var1 < 500) {
            if(Math.abs(this.int - 666) < 20) {
               this.a(3);
            } else if(this.int > 666) {
               this.a(0);
            } else if(this.int < 666) {
               this.a(1);
            }

         } else {
            if(Math.abs(this.int - var1) < var3) {
               if(this.for != 0 || this.f && Math.random() < 0.3D) {
                  return;
               }

               if((this.int >= 900 && this.void > 830 || this.int <= 580 && this.void < 530) && Math.abs(this.void - this.int) < 100) {
                  this.method_rn_d_int_48();
               } else if(this.method_rn_d_try_45(this.void - this.int) * 2 + this.method_rn_d_try_45(this.else - this.for) < this.method_rn_d_try_45(170) && this.void != this.int) {
                  this.method_rn_d_int_48();
               } else if(this.do * this.do + this.if * this.if < 20 && this.void - this.int < 30 && this.void != this.int) {
                  this.method_rn_d_int_48();
               } else if(Math.abs(this.void - this.int) < 150 && this.else > 50 && this.else < 400 && Math.random() < 0.666D) {
                  this.method_rn_d_int_48();
               }
            }

            if(this.for == 0 && this.field_rn_d_j_50 == -1) {
               if(Math.abs(this.int - var1) < var3) {
                  this.a(3);
               } else if(var1 + var3 < this.int) {
                  this.a(0);
               } else if(var1 + var3 > this.int) {
                  this.a(1);
               }
            } else if(this.field_rn_d_j_50 == -1) {
               if(this.int < 575) {
                  return;
               }

               if(this.int > 900) {
                  this.a(1);
                  return;
               }

               if(Math.abs(this.int - this.void) < var3) {
                  this.a(3);
               } else if(this.void < this.int) {
                  this.a(0);
               } else if(this.void > this.int) {
                  this.a(1);
               }
            }

         }
      } else {
         if(this.field_rn_d_j_50 == -1) {
            if(this.g > 250) {
               this.field_rn_d_j_50 = 0;
            } else {
               this.field_rn_d_j_50 = 1;
            }

            if(Math.random() < 0.35D) {
               this.field_rn_d_j_50 = (int)(2.0D * Math.random());
            }
         }

         switch(this.field_rn_d_j_50) {
         case 0:
            if(this.else < 300 && this.if < -3) {
               this.a(1);
               this.a(2);
            }
            break;
         case 1:
            if(this.else < 300 && this.if < 0) {
               this.a(0);
               this.a(2);
            }
         }

      }
   }

   // $FF: renamed from: int () void
   private void method_rn_d_int_48() {
      if(Math.random() < 0.85D) {
         this.a(2);
      }

   }
}
