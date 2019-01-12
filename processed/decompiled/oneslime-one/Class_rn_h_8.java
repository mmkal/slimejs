import java.applet.Applet;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

// $FF: renamed from: h
class Class_rn_h_8 {
   public Class_rn_h_8(int[][] var1, int var2, int var3, int var4, int var5, Applet var6) {
      int[][] var7 = new int[var1.length][var1[0].length];

      for(int var8 = 0; var8 < var1.length; ++var8) {
         for(int var9 = 0; var9 < var1[0].length; ++var9) {
            var7[var8][var9] = var1[var8][var9];
         }
      }

      try {
         URL var17 = var6.getCodeBase();
         String var10 = "" + var2 + ":" + var3 + ":" + var4 + ":" + var5;
         URL var11 = new URL(var17 + "newreplay.php?data=" + var10);
         BufferedReader var12 = new BufferedReader(new InputStreamReader(var11.openStream()));
         String var13 = var12.readLine().trim();
         var11 = new URL(var17 + "savefield.php?id=" + var13 + "&field=initial&data=" + var10);
         var11.openStream();

         for(int var14 = 0; var14 < 6; ++var14) {
            var10 = "id=" + var13 + "&field=";
            switch(var14) {
            case 0:
               var10 = var10 + "p1x";
               break;
            case 1:
               var10 = var10 + "p1y";
               break;
            case 2:
               var10 = var10 + "p2x";
               break;
            case 3:
               var10 = var10 + "p2y";
               break;
            case 4:
               var10 = var10 + "ballX";
               break;
            case 5:
               var10 = var10 + "ballY";
            }

            var10 = var10 + "&data=" + var7[0][var14];

            for(int var15 = 1; var15 < var1.length; ++var15) {
               var10 = var10 + ":" + (var7[var15][var14] - var7[var15 - 1][var14]);
            }

            var11 = new URL(var17 + "savefield.php?" + var10);
            var11.openStream();
         }
      } catch (Exception var16) {
         ;
      }

   }
}
