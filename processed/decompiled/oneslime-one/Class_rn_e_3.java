// $FF: renamed from: e
public class Class_rn_e_3 extends Class_rn_c_1 {
   // $FF: renamed from: k double
   private final double field_rn_e_k_43 = 0.4D;
   // $FF: renamed from: l int
   private int field_rn_e_l_44 = -1;

   // $FF: renamed from: char (int) int
   private int method_rn_e_char_39(int var1) {
      return var1 * var1;
   }

   // $FF: renamed from: case (int) int
   private int method_rn_e_case_40(int var1) {
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

   // $FF: renamed from: byte (int) int
   private int method_rn_e_byte_41(int var1) {
      int var2 = this.method_rn_e_case_40(var1);
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
      if(this.void < 500 && this.field_rn_e_l_44 != -1) {
         this.field_rn_e_l_44 = -1;
      }

      int var1 = this.method_rn_e_byte_41(125);
      int var2 = this.method_rn_e_case_40(125);
      int var3;
      if(this.for != 0 && this.int < 575) {
         var3 = 0;
      } else {
         var3 = 23 + (int)(15.0D * Math.random());
      }

      if((this.do != 0 || this.void != 800) && this.field_rn_e_l_44 == -1) {
         if(var1 < 500) {
            if(Math.abs(this.int - 800) < 20) {
               this.a(3);
            } else if(this.int > 800) {
               this.a(0);
            } else if(this.int < 800) {
               this.a(1);
            }

         } else {
            if(Math.abs(this.int - var1) < var3) {
               if(this.for != 0 || this.f && Math.random() < 0.3D) {
                  return;
               }

               if((this.int >= 900 && this.void > 830 || this.int <= 580 && this.void < 530) && Math.abs(this.void - this.int) < 100) {
                  this.method_rn_e_new_42();
               } else if(this.method_rn_e_char_39(this.void - this.int) * 2 + this.method_rn_e_char_39(this.else - this.for) < this.method_rn_e_char_39(170) && this.void != this.int) {
                  this.method_rn_e_new_42();
               } else if(this.do * this.do + this.if * this.if < 20 && this.void - this.int < 30 && this.void != this.int) {
                  this.method_rn_e_new_42();
               } else if(Math.abs(this.void - this.int) < 150 && this.else > 50 && this.else < 400 && Math.random() < 0.5D) {
                  this.method_rn_e_new_42();
               }
            }

            if(this.for == 0 && this.field_rn_e_l_44 == -1) {
               if(Math.abs(this.int - var1) < var3) {
                  this.a(3);
               } else if(var1 + var3 < this.int) {
                  this.a(0);
               } else if(var1 + var3 > this.int) {
                  this.a(1);
               }
            } else if(this.field_rn_e_l_44 == -1) {
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
         if(this.field_rn_e_l_44 == -1) {
            if(this.g > 250) {
               this.field_rn_e_l_44 = 0;
            } else if(this.g < 200) {
               this.field_rn_e_l_44 = 1;
            } else if(this.g < 250) {
               this.field_rn_e_l_44 = 2;
            }

            if(Math.random() < 0.35D) {
               this.field_rn_e_l_44 = (int)(3.0D * Math.random());
            }
         }

         switch(this.field_rn_e_l_44) {
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
            break;
         case 2:
            short var4 = 860;
            if(this.if > 12 && this.int < var4) {
               this.a(1);
            }

            if(this.int >= var4) {
               this.a(3);
            }

            if(this.if == -3 && this.int != 800) {
               this.a(2);
            }

            if(this.if < -12 && this.for != 0 && this.int >= var4 - 15) {
               this.a(0);
            }
         }

      }
   }

   // $FF: renamed from: new () void
   private void method_rn_e_new_42() {
      if(Math.random() < 0.4D) {
         this.a(2);
      }

   }
}
