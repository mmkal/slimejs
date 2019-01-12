import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

// $FF: renamed from: g
class Class_rn_g_7 {
   // $FF: renamed from: do boolean
   boolean field_rn_g_do_73 = true;
   // $FF: renamed from: a boolean
   boolean field_rn_g_a_74 = true;
   // $FF: renamed from: if char[]
   private static char[] field_rn_g_if_75 = new char[]{'r', 'o', '>', '<', 'o', 'r', 'z'};

   // $FF: renamed from: a () boolean
   public static boolean method_rn_g_a_65() {
      return true;
   }

   // $FF: renamed from: a (Slime1P, long) boolean
   public static boolean method_rn_g_a_66(Slime1P var0, long var1) {
      long var3 = 1000000L;

      try {
         InputStream var5 = (new URL(var0.getCodeBase() + "highscores.php?min")).openStream();
         BufferedReader var6 = new BufferedReader(new InputStreamReader(var5));
         var3 = Long.parseLong(var6.readLine());
         var6.close();
         var5.close();
      } catch (Exception var7) {
         System.out.println("Couldn\'t connect to server!\n" + var7);
         return false;
      }

      return var1 > var3;
   }

   // $FF: renamed from: a (Slime1P, long, long, java.lang.String) void
   public static void method_rn_g_a_67(Slime1P var0, long var1, long var3, String var5) {
      try {
         InputStream var6 = (new URL(var0.getCodeBase() + "submitscore.php?scr=" + var1 + "&lev=" + var3 + "&nam=" + var5 + "&danno=" + new String(field_rn_g_if_75) + "&chk=" + method_rn_g_a_70(method_rn_g_a_68(method_rn_g_if_69(var5)), var3, var1))).openStream();
         var6.close();
      } catch (Exception var7) {
         System.out.println("Couldn\'t send high score!\n" + var7);
      }

   }

   // $FF: renamed from: a (java.lang.String) java.lang.String
   private static String method_rn_g_a_68(String var0) {
      String var1 = var0.trim();
      if(var1.length() > 20) {
         var1 = var1.substring(0, 20);
      }

      return var1;
   }

   // $FF: renamed from: if (java.lang.String) java.lang.String
   private static String method_rn_g_if_69(String var0) {
      int var1;
      String var2;
      for(var2 = new String(var0); (var1 = var2.indexOf(" ")) >= 0; var2 = var2.substring(0, var1) + var2.substring(var1 + 1)) {
         ;
      }

      return var2;
   }

   // $FF: renamed from: a (java.lang.String, long, long) long
   private static long method_rn_g_a_70(String var0, long var1, long var3) {
      long var5 = var3;

      for(int var7 = 0; (long)var7 < method_rn_g_a_71(var1) + 1L; ++var7) {
         var5 = method_rn_g_if_72(var0, var1, var5);
      }

      return var5;
   }

   // $FF: renamed from: a (long) long
   private static long method_rn_g_a_71(long var0) {
      return var0 * var0;
   }

   // $FF: renamed from: if (java.lang.String, long, long) long
   private static long method_rn_g_if_72(String var0, long var1, long var3) {
      char[] var5 = var0.toCharArray();
      long var6 = 0L;

      for(int var8 = 0; var8 < var5.length; ++var8) {
         var6 += ((long)var5[var8] + var1) * var3 % (var1 + 6L + (long)var8);
      }

      return var6;
   }
}
