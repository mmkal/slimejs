// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.io.*;
import java.net.URL;

class i
{

    public i()
    {
        _flddo = true;
        a = true;
    }

    public static boolean a()
    {
        return true;
    }

    public static boolean a(SlimeTennis slimetennis, long l)
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

    public static void a(SlimeTennis slimetennis, long l, long l1, String s)
    {
        try
        {
            InputStream inputstream = (new URL(slimetennis.getCodeBase() + "submitscore.php?scr=" + l + "&lev=" + l1 + "&nam=" + s + "&danno=" + new String(_fldif) + "&chk=" + a(a(_mthif(s)), l1, l))).openStream();
            inputstream.close();
        }
        catch(Exception exception)
        {
            System.out.println("Couldn't send high score!\n" + exception);
        }
    }

    private static String a(String s)
    {
        String s1 = s.trim();
        if(s1.length() > 20)
            s1 = s1.substring(0, 20);
        return s1;
    }

    private static String _mthif(String s)
    {
        int j;
        String s1;
        for(s1 = new String(s); (j = s1.indexOf(" ")) >= 0; s1 = s1.substring(0, j) + s1.substring(j + 1));
        return s1;
    }

    private static long a(String s, long l, long l1)
    {
        long l2 = l1;
        for(int j = 0; (long)j < a(l) + 1L; j++)
            l2 = _mthif(s, l, l2);

        return l2;
    }

    private static long a(long l)
    {
        return l * l;
    }

    private static long _mthif(String s, long l, long l1)
    {
        char ac[] = s.toCharArray();
        long l2 = 0L;
        for(int j = 0; j < ac.length; j++)
            l2 += (((long)ac[j] + l) * l1) % (l + 6L + (long)j);

        return l2;
    }

    boolean _flddo;
    boolean a;
    private static char _fldif[] = {
        'r', 'o', '>', '<', 'o', 'r', 'z'
    };

}
