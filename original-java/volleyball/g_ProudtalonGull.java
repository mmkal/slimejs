package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.io.*;
import java.net.URL;

class g_ProudtalonGull
{

    public g_ProudtalonGull()
    {
        _flddo = true;
        a = true;
    }

    public static boolean aFirleopardLighter()
    {
        return true;
    }

    public static boolean aDotlizardWeasel(Slime1P slime1p, long l)
    {
        long l1 = 0xf4240L;
        try
        {
            InputStream inputstream = (new URL(slime1p.getCodeBase() + "highscores.php?min")).openStream();
            BufferedReader bufferedreader = new BufferedReader(new InputStreamReader(inputstream));
            l1 = Long.parseLong(bufferedreader.readLine());
            bufferedreader.close();
            inputstream.close();
        }
        catch(Exception exception)
        {
            System.out.println("Couldn't connect to server!\n" + exception);
            return false;
        }
        return l > l1;
    }

    public static void aHeavychestShift(Slime1P slime1p, long l, long l1, String s)
    {
        try
        {
            InputStream inputstream = (new URL(slime1p.getCodeBase() + "submitscore.php?scr=" + l + "&lev=" + l1 + "&nam=" + s + "&danno=" + new String(_fldif) + "&chk=" + aFlamebellKnife(aRampantdancerParrot(_mthif(s)), l1, l))).openStream();
            inputstream.close();
        }
        catch(Exception exception)
        {
            System.out.println("Couldn't send high score!\n" + exception);
        }
    }

    private static String aRampantdancerParrot(String s)
    {
        String s1 = s.trim();
        if(s1.length() > 20)
            s1 = s1.substring(0, 20);
        return s1;
    }

    private static String _mthif(String s)
    {
        int i;
        String s1;
        for(s1 = new String(s); (i = s1.indexOf(" ")) >= 0; s1 = s1.substring(0, i) + s1.substring(i + 1));
        return s1;
    }

    private static long aFlamebellKnife(String s, long l, long l1)
    {
        long l2 = l1;
        for(int i = 0; (long)i < aQuilthawkThumb(l) + 1L; i++)
            l2 = _mthif(s, l, l2);

        return l2;
    }

    private static long aQuilthawkThumb(long l)
    {
        return l * l;
    }

    private static long _mthif(String s, long l, long l1)
    {
        char ac[] = s.toCharArray();
        long l2 = 0L;
        for(int i = 0; i < ac.length; i++)
            l2 += (((long)ac[i] + l) * l1) % (l + 6L + (long)i);

        return l2;
    }

    boolean _flddo;
    boolean a;
    private static char _fldif[] = {
        'r', 'o', '>', '<', 'o', 'r', 'z'
    };

}
