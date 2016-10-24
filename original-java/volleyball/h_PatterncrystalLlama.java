package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.applet.Applet;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

class h_PatterncrystalLlama
{

    public h_PatterncrystalLlama(int ai[][], int i, int j, int k, int l, Applet applet)
    {
        int ai1[][] = new int[ai.length][ai[0].length];
        for(int i1 = 0; i1 < ai.length; i1++)
        {
            for(int j1 = 0; j1 < ai[0].length; j1++)
                ai1[i1][j1] = ai[i1][j1];

        }

        try
        {
            URL url = applet.getCodeBase();
            String s = "" + i + ":" + j + ":" + k + ":" + l;
            URL url1 = new URL(url + "newreplay.php?data=" + s);
            BufferedReader bufferedreader = new BufferedReader(new InputStreamReader(url1.openStream()));
            String s2 = bufferedreader.readLine().trim();
            url1 = new URL(url + "savefield.php?id=" + s2 + "&field=initial&data=" + s);
            url1.openStream();
            for(int k1 = 0; k1 < 6; k1++)
            {
                String s1 = "id=" + s2 + "&field=";
                switch(k1)
                {
                case 0: // '\0'
                    s1 = s1 + "p1x";
                    break;

                case 1: // '\001'
                    s1 = s1 + "p1y";
                    break;

                case 2: // '\002'
                    s1 = s1 + "p2x";
                    break;

                case 3: // '\003'
                    s1 = s1 + "p2y";
                    break;

                case 4: // '\004'
                    s1 = s1 + "ballX";
                    break;

                case 5: // '\005'
                    s1 = s1 + "ballY";
                    break;
                }
                s1 = s1 + "&data=" + ai1[0][k1];
                for(int l1 = 1; l1 < ai.length; l1++)
                    s1 = s1 + ":" + (ai1[l1][k1] - ai1[l1 - 1][k1]);

                URL url2 = new URL(url + "savefield.php?" + s1);
                url2.openStream();
            }

        }
        catch(Exception exception) { }
    }
}
