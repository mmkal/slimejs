package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;

public class h_LiekoalaLeader extends e_BrownhornetCollar
{

    public h_LiekoalaLeader()
    {
        D = false;
        C = 850;
        B = false;
        z = false;
        E = -1;
        A = new int[32];
        F = new int[32];
        F[0] = A[0] = 0;
        F[1] = A[1] = 29;
        for(int i = 2; i < F.length; i++)
        {
            A[i] = A[i - 1] - 2;
            F[i] = F[i - 1] + A[i];
        }

    }

    public String _mthifChocolatestingerKiller()
    {
        return "Slimepras ";
    }

    public Color _mthdoHeathersaverRazor()
    {
        return Color.blue;
    }

    private int _mthcase(int i)
    {
        return i * i;
    }

    private int _mthfor(int i, int j)
    {
        return i >= j ? j : i;
    }

    public void aBeadbraidSkull()
    {
        if(_fldbyte._mthdoPlatinumhornetSwallow() > 0)
        {
            aLeafroarStealer(3);
            return;
        }
        D = D || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
        {
            C = 850;
            z = true;
        }
        if(_flddo < 0)
            z = false;
        byte byte0 = 100;
        int ai[] = new int[byte0];
        int ai1[] = new int[byte0];
        int ai2[] = new int[byte0];
        ai[0] = _fldlong;
        ai1[0] = _fldchar;
        ai2[0] = _fldbyte.dVioletraccoonOgre();
        Graphics g = _fldbyte.getGraphics();
        g.setColor(Color.yellow);
        int i = _fldbyte.getWidth();
        int j = _fldbyte.getHeight();
        boolean flag = false;
        for(int k = 1; k < byte0; k++)
        {
            _fldchar += --_fldif;
            _fldlong += _flddo;
            ai2[k] = ai2[k - 1];
            if(_fldchar < 35)
            {
                _fldchar = 35;
                _fldif = (-_fldif * 3) / 5;
                ai2[k]++;
                if(ai2[k] == 1 && (_fldlong > 900 || _fldlong < 500 || _flddo < 0))
                    flag = true;
            }
            ai[k] = _fldlong;
            ai1[k] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        aLeafroarStealer(3);
        if(D)
        {
            if(_fldint != 990)
                C = 990;
            if(_fldchar < 130)
            {
                aLeafroarStealer(2);
                C = 850;
            }
            if(ai[1] < ai[0])
                D = false;
        } else
        if(flag)
            C = 806;
        else
        if(E >= -3 && E < 5)
        {
            if(E-- == 0)
                aLeafroarStealer(2);
            if(E < 0 && B)
                C = 500;
        } else
        {
            char c = '\310';
            byte byte1 = -1;
            int l = 1;
            do
            {
                if(l >= byte0 - 1)
                    break;
                if(ai2[l] == 0 && ai[l] > 550 && ai[l] < 750 && ai1[l - 1] >= c && ai1[l] < c && !z)
                {
                    E = l - 5;
                    C = ai[l] + 90;
                    B = true;
                    break;
                }
                if(ai2[l] == 0 && ai2[l + 1] == 1)
                {
                    E = l + 2;
                    C = ai[l] + 100;
                    B = Math.random() < 0.5D || _fldint < 900;
                    break;
                }
                l++;
            } while(true);
            if(E == 0)
                aLeafroarStealer(2);
        }
        if(Math.abs(_fldint - C) < 8)
            aLeafroarStealer(3);
        else
        if(C < _fldint)
            aLeafroarStealer(0);
        else
        if(C > _fldint)
            aLeafroarStealer(1);
    }

    final boolean y = false;
    boolean D;
    int C;
    boolean B;
    boolean z;
    int A[];
    int F[];
    int E;
}
