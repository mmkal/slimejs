package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class g_AlpinepuppyPython extends e_BrownhornetCollar
{

    public g_AlpinepuppyPython()
    {
        x = false;
        w = 850;
    }

    private int _mthbyte(int i)
    {
        return i * i;
    }

    public void aBeadbraidSkull()
    {
        if(_fldbyte._mthdoPlatinumhornetSwallow() > 0)
        {
            aLeafroarStealer(3);
            return;
        }
        x = x || _fldlong == 950 && _fldif == 0;
        char c = '\310';
        int ai[] = new int[c];
        int ai1[] = new int[c];
        int ai2[] = new int[c];
        ai[0] = _fldlong;
        ai1[0] = _fldchar;
        ai2[0] = _fldbyte.dVioletraccoonOgre();
        for(int i = 1; i < c; i++)
        {
            _fldlong += _flddo;
            _fldchar += _fldif;
            ai2[i] = ai2[i - 1];
            if(_fldchar < 35)
            {
                _fldchar = 35;
                _fldif = -_fldif;
                ai2[i]++;
            }
            _fldif -= 2;
            ai[i] = _fldlong;
            ai1[i] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        byte byte0 = 25;
        aLeafroarStealer(3);
        if(x)
        {
            if(w != 970)
                w = 970;
            if(_fldchar < 200)
                aLeafroarStealer(2);
            if(ai[1] < ai[0])
                x = false;
        } else
        {
            w = 850;
            boolean flag = false;
            for(int j = 0; j < c - 5; j++)
            {
                if(ai2[j] == 0 && ai2[j + 1] == 1)
                    if(ai[j] > 900)
                    {
                        w = 500;
                        flag = true;
                    } else
                    if(ai[j] > 700)
                        w = ai[j + 3] + 80;
                if(ai2[j] == 1 && ai2[j + 1] == 2 && ai[j] > 500 && ai[j] < 900)
                    w = ai[j] - 80;
            }

            if(ai[0] < ai[1] && _fldint - ai[0] < 100 && !flag)
            {
                aLeafroarStealer(2);
                w = ai[0];
            }
        }
        if(w < _fldint)
            aLeafroarStealer(0);
        else
        if(w > _fldint)
            aLeafroarStealer(1);
    }

    boolean x;
    int w;
}
