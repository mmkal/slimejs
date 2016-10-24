package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;

public class a_ShortmoleSaver extends e_BrownhornetCollar
{

    public a_ShortmoleSaver()
    {
        RSparkshriekerGuardian = false;
        QHickoryspiritBard = 850;
        PBattlepantherSeed = false;
        SShinewitchSalmon = -1;
        ODandywarlockFinger = new int[32];
        THelixbatRacer = new int[32];
        THelixbatRacer[0] = ODandywarlockFinger[0] = 0;
        THelixbatRacer[1] = ODandywarlockFinger[1] = 29;
        for(int i = 2; i < THelixbatRacer.length; i++)
        {
            ODandywarlockFinger[i] = ODandywarlockFinger[i - 1] - 2;
            THelixbatRacer[i] = THelixbatRacer[i - 1] + ODandywarlockFinger[i];
        }

    }

    public String _mthifChocolatestingerKiller()
    {
        return "Agasslimey ";
    }

    public Color _mthdoHeathersaverRazor()
    {
        return Color.white;
    }

    private int _mthelseRegalqueenKnave(int i)
    {
        return i * i;
    }

    private int _mthnewGingerwizardLifter(int i, int j)
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
        RSparkshriekerGuardian = RSparkshriekerGuardian || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
            QHickoryspiritBard = 850;
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
        if(RSparkshriekerGuardian)
        {
            if(_fldint != 990)
                QHickoryspiritBard = 990;
            if(_fldchar < 130)
            {
                aLeafroarStealer(2);
                QHickoryspiritBard = 850;
            }
            if(ai[1] < ai[0])
                RSparkshriekerGuardian = false;
        } else
        if(flag)
            QHickoryspiritBard = 806;
        else
        if(SShinewitchSalmon >= -3 && SShinewitchSalmon < 5)
        {
            if(SShinewitchSalmon-- == 0)
                aLeafroarStealer(2);
            if(SShinewitchSalmon < 0 && (_fldint < 900 || PBattlepantherSeed))
                QHickoryspiritBard = 500;
        } else
        {
            byte byte1 = -1;
            int l = 0;
            do
            {
                if(l >= byte0 - 1)
                    break;
                if(ai2[l] == 0 && ai2[l + 1] == 1)
                {
                    SShinewitchSalmon = l + 2;
                    QHickoryspiritBard = ai[l] + 100;
                    PBattlepantherSeed = Math.random() < 0.5D;
                    break;
                }
                l++;
            } while(true);
        }
        if(Math.abs(_fldint - QHickoryspiritBard) < 8)
            aLeafroarStealer(3);
        else
        if(QHickoryspiritBard < _fldint)
            aLeafroarStealer(0);
        else
        if(QHickoryspiritBard > _fldint)
            aLeafroarStealer(1);
    }

    final boolean NCarnelianlynxFollower = false;
    boolean RSparkshriekerGuardian;
    int QHickoryspiritBard;
    boolean PBattlepantherSeed;
    int ODandywarlockFinger[];
    int THelixbatRacer[];
    int SShinewitchSalmon;
}
