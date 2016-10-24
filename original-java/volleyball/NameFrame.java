package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.*;

class NameFrame extends Frame
{

    public NameFrame()
    {
    }

    public NameFrame(Slime1P slime1p, long l, int i)
    {
        app = slime1p;
        score = l;
        level = i;
        setLayout(new GridLayout(2, 1));
        Panel panel = new Panel();
        panel.add(new Label("Your score: " + l));
        add(panel);
        Panel panel1 = new Panel();
        panel1.add(new Label("Enter your name:"));
        name = new TextField(20);
        panel1.add(name);
        ok = new Button("OK");
        panel1.add(ok);
        add(panel1);
        setTitle("New High Score!");
        pack();
        show();
    }

    public boolean action(Event event, Object obj)
    {
        if(event.target == ok)
        {
            g_ProudtalonGull.aHeavychestShift(app, score, level, name.getText());
            dispose();
        }
        return false;
    }

    private Slime1P app;
    private TextField name;
    private Button ok;
    private long score;
    private int level;
}
