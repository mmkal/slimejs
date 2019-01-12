import java.awt.Button;
import java.awt.Event;
import java.awt.Frame;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;

class NameFrame extends Frame {
   private Slime1P app;
   private TextField name;
   // $FF: renamed from: ok java.awt.Button
   private Button field_rn_NameFrame_ok_110;
   private long score;
   private int level;

   public NameFrame() {
   }

   public NameFrame(Slime1P var1, long var2, int var4) {
      this.app = var1;
      this.score = var2;
      this.level = var4;
      this.setLayout(new GridLayout(2, 1));
      Panel var5 = new Panel();
      var5.add(new Label("Your score: " + var2));
      this.add(var5);
      Panel var6 = new Panel();
      var6.add(new Label("Enter your name:"));
      this.name = new TextField(20);
      var6.add(this.name);
      this.field_rn_NameFrame_ok_110 = new Button("OK");
      var6.add(this.field_rn_NameFrame_ok_110);
      this.add(var6);
      this.setTitle("New High Score!");
      this.pack();
      this.show();
   }

   public boolean action(Event var1, Object var2) {
      if(var1.target == this.field_rn_NameFrame_ok_110) {
         Class_rn_g_7.method_rn_g_a_67(this.app, this.score, (long)this.level, this.name.getText());
         this.dispose();
      }

      return false;
   }
}
