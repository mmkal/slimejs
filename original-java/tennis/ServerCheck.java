// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.*;

class ServerCheck extends Frame
{

    public ServerCheck()
    {
        setLayout(new GridLayout(4, 1));
        Panel panel = new Panel();
        panel.add(new Label("Couldn't connect to server!"));
        add(panel);
        Panel panel1 = new Panel();
        panel1.add(new Label("Your high scores may not be saved on the server."));
        add(panel1);
        Panel panel2 = new Panel();
        panel2.add(new Label("To fix this, close all browser windows and try again."));
        setTitle("Error!");
        ok = new Button("Damn. Oh well if that's how it is...");
        add(panel2);
        add(ok);
        pack();
        show();
    }

    public boolean action(Event event, Object obj)
    {
        if(event.target == ok)
            dispose();
        return false;
    }

    Button ok;
}
