import java.awt.Button;
import java.awt.Event;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Panel;

class ServerCheck extends Frame {
   // $FF: renamed from: ok java.awt.Button
   Button field_rn_ServerCheck_ok_76;

   public ServerCheck() {
      this.setLayout(new GridLayout(4, 1));
      Panel var1 = new Panel();
      var1.add(new Label("Couldn\'t connect to server!"));
      this.add(var1);
      Panel var2 = new Panel();
      var2.add(new Label("Your high scores may not be saved on the server."));
      this.add(var2);
      Panel var3 = new Panel();
      var3.add(new Label("To fix this, close all browser windows and try again."));
      this.setTitle("Error!");
      this.field_rn_ServerCheck_ok_76 = new Button("Damn. Oh well if that\'s how it is...");
      this.add(var3);
      this.add(this.field_rn_ServerCheck_ok_76);
      this.pack();
      this.show();
   }

   public boolean action(Event var1, Object var2) {
      if(var1.target == this.field_rn_ServerCheck_ok_76) {
         this.dispose();
      }

      return false;
   }
}
