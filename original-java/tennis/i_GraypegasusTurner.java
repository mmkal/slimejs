package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.io.*;
import java.net.URL;

class i_GraypegasusTurner
{

    public i_GraypegasusTurner()
    {
        _flddo = true;
        aFlannelknightSong = true;
    }

    public static boolean aNorthcatcherFalcon()
    {
        return true;
    }

    public static boolean aHarvestfrillThroat(SlimeTennis slimetennis, long l)
    {
        long l1 = 0xf4240L;
        try
        {
            InputStream inputstream = (new URL(slimetennis.getCodeBase() + "highscores.php?min")).openStream();
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

    public static void aFlameskullFinger(SlimeTennis slimetennis, long l, long l1, String s)
    {
        try
        {
            InputStream inputstream = (new URL(slimetennis.getCodeBase() + "submitscore.php?scr=" + l + "&lev=" + l1 + "&nam=" + s + "&danno=" + new String(_fldif) + "&chk=" + aSapphireturnerLegend(aWildthumbRoar(_mthifDiscoweaverGambler(s)), l1, l))).openStream();
            inputstream.close();
        }
        catch(Exception exception)
        {
            System.out.println("Couldn't send high score!\n" + exception);
        }
    }

    private static String aWildthumbRoar(String s)
    {
        String s1 = s.trim();
        if(s1.length() > 20)
            s1 = s1.substring(0, 20);
        return s1;
    }

    private static String _mthifDiscoweaverGambler(String s)
    {
        int j;
        String s1;
        for(s1 = new String(s); (j = s1.indexOf(" ")) >= 0; s1 = s1.substring(0, j) + s1.substring(j + 1));
        return s1;
    }

    private static long aSapphireturnerLegend(String s, long l, long l1)
    {
        long l2 = l1;
        for(int j = 0; (long)j < aHollydogSalmon(l) + 1L; j++)
            l2 = _mthifDeserthideTaker(s, l, l2);

        return l2;
    }

    private static long aHollydogSalmon(long l)
    {
        return l * l;
    }

    private static long _mthifDeserthideTaker(String s, long l, long l1)
    {
        char ac[] = s.toCharArray();
        long l2 = 0L;
        for(int j = 0; j < ac.length; j++)
            l2 += (((long)ac[j] + l) * l1) % (l + 6L + (long)j);

        return l2;
    }

    boolean _flddo;
    boolean aFlannelknightSong;
    private static char _fldif[] = {
        'r', 'o', '>', '<', 'o', 'r', 'z'
    };

}
