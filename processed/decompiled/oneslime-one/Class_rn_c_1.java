// $FF: renamed from: c
public abstract class Class_rn_c_1 {
   // $FF: renamed from: void int
   protected int field_rn_c_void_13;
   // $FF: renamed from: else int
   protected int field_rn_c_else_14;
   // $FF: renamed from: do int
   protected int field_rn_c_do_15;
   // $FF: renamed from: if int
   protected int field_rn_c_if_16;
   // $FF: renamed from: g int
   protected int field_rn_c_g_17;
   // $FF: renamed from: e int
   protected int field_rn_c_e_18;
   // $FF: renamed from: byte int
   protected int field_rn_c_byte_19;
   // $FF: renamed from: try int
   protected int field_rn_c_try_20;
   // $FF: renamed from: int int
   protected int field_rn_c_int_21;
   // $FF: renamed from: for int
   protected int field_rn_c_for_22;
   // $FF: renamed from: d int
   protected int field_rn_c_d_23;
   // $FF: renamed from: b int
   protected int field_rn_c_b_24;
   // $FF: renamed from: new boolean
   protected boolean field_rn_c_new_25;
   // $FF: renamed from: f boolean
   protected boolean field_rn_c_f_26;
   // $FF: renamed from: c int
   private int field_rn_c_c_27;
   // $FF: renamed from: case Slime1P
   private Slime1P field_rn_c_case_28;
   // $FF: renamed from: goto int
   public static final int field_rn_c_goto_29 = 0;
   // $FF: renamed from: char int
   public static final int field_rn_c_char_30 = 1;
   // $FF: renamed from: long int
   public static final int field_rn_c_long_31 = 2;
   // $FF: renamed from: a int
   public static final int field_rn_c_a_32 = 3;

   // $FF: renamed from: a (Slime1P, int) void
   public final void method_rn_c_a_9(Slime1P var1, int var2) {
      this.field_rn_c_case_28 = var1;
      this.field_rn_c_c_27 = var2;
   }

   // $FF: renamed from: a (int[], boolean, boolean) void
   public final void method_rn_c_a_10(int[] var1, boolean var2, boolean var3) {
      this.field_rn_c_void_13 = this.field_rn_c_c_27 == 2?var1[0]:1000 - var1[0];
      this.field_rn_c_else_14 = var1[1];
      this.field_rn_c_do_15 = this.field_rn_c_c_27 == 2?var1[2]:-var1[2];
      this.field_rn_c_if_16 = var1[3];
      this.field_rn_c_g_17 = this.field_rn_c_c_27 == 2?var1[4]:1000 - var1[8];
      this.field_rn_c_e_18 = this.field_rn_c_c_27 == 2?var1[5]:var1[9];
      this.field_rn_c_byte_19 = this.field_rn_c_c_27 == 2?var1[6]:-var1[10];
      this.field_rn_c_try_20 = this.field_rn_c_c_27 == 2?var1[7]:var1[11];
      this.field_rn_c_int_21 = this.field_rn_c_c_27 == 2?var1[8]:1000 - var1[4];
      this.field_rn_c_for_22 = this.field_rn_c_c_27 == 2?var1[9]:var1[5];
      this.field_rn_c_d_23 = this.field_rn_c_c_27 == 2?var1[10]:-var1[6];
      this.field_rn_c_b_24 = this.field_rn_c_c_27 == 2?var1[11]:var1[7];
      this.field_rn_c_new_25 = this.field_rn_c_c_27 == 2?var2:var3;
      this.field_rn_c_f_26 = this.field_rn_c_c_27 == 2?var3:var2;
   }

   // $FF: renamed from: a () void
   public abstract void method_rn_c_a_11();

   // $FF: renamed from: a (int) void
   protected final void method_rn_c_a_12(int var1) {
      if(this.field_rn_c_c_27 == 1) {
         switch(var1) {
         case 0:
            this.field_rn_c_case_28.method_rn_Slime1P_b_82();
            break;
         case 1:
            this.field_rn_c_case_28.method_rn_Slime1P_c_81();
            break;
         case 2:
            this.field_rn_c_case_28.method_rn_Slime1P_char_84();
            break;
         case 3:
            this.field_rn_c_case_28.method_rn_Slime1P_try_83();
         }
      } else if(this.field_rn_c_c_27 == 2) {
         switch(var1) {
         case 0:
            this.field_rn_c_case_28.method_rn_Slime1P_e_85();
            break;
         case 1:
            this.field_rn_c_case_28.method_rn_Slime1P_j_86();
            break;
         case 2:
            this.field_rn_c_case_28.method_rn_Slime1P_long_88();
            break;
         case 3:
            this.field_rn_c_case_28.method_rn_Slime1P_else_87();
         }
      }

   }
}
