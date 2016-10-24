package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;

public abstract class e_BrownhornetCollar
{

    public e_BrownhornetCollar()
    {
    }

    public final void aGlassmoleSting(SlimeTennis slimetennis, int i)
    {
        _fldbyte = slimetennis;
        b = i;
    }

    public final void aNorthridgeRaver(int ai[])
    {
        _fldlong = b != 2 ? 1000 - ai[0] : ai[0];
        _fldchar = ai[1];
        _flddo = b != 2 ? -ai[2] : ai[2];
        _fldif = ai[3];
        e = b != 2 ? 1000 - ai[8] : ai[4];
        d = b != 2 ? ai[9] : ai[5];
        _fldtry = b != 2 ? -ai[10] : ai[6];
        _fldnew = b != 2 ? ai[11] : ai[7];
        _fldint = b != 2 ? 1000 - ai[4] : ai[8];
        _fldfor = b != 2 ? ai[5] : ai[9];
        c = b != 2 ? -ai[6] : ai[10];
        _fldvoid = b != 2 ? ai[7] : ai[11];
    }

    public abstract void aBeadbraidSkull();

    public String _mthifChocolatestingerKiller()
    {
        return "AI ";
    }

    public Color _mthdoHeathersaverRazor()
    {
        return Color.black;
    }

    protected final void aLeafroarStealer(int i)
    {
        if(b == 1)
            switch(i)
            {
            case 0: // '\0'
                _fldbyte.cShallowboarYak();
                break;

            case 1: // '\001'
                _fldbyte.eWheatthumbHorse();
                break;

            case 2: // '\002'
                _fldbyte._mthelsePickleoxBug();
                break;

            case 3: // '\003'
                _fldbyte._mthbyteSolarfancierLighter();
                break;
            }
        else
        if(b == 2)
            switch(i)
            {
            case 0: // '\0'
                _fldbyte.gValiantfingerSentry();
                break;

            case 1: // '\001'
                _fldbyte.lLeadterrierWyrm();
                break;

            case 2: // '\002'
                _fldbyte._mthvoidSequoiacollarMuse();
                break;

            case 3: // '\003'
                _fldbyte._mthgotoBravemareZebra();
                break;
            }
    }

    protected int _fldlong;
    protected int _fldchar;
    protected int _flddo;
    protected int _fldif;
    protected int e;
    protected int d;
    protected int _fldtry;
    protected int _fldnew;
    protected int _fldint;
    protected int _fldfor;
    protected int c;
    protected int _fldvoid;
    private int b;
    protected SlimeTennis _fldbyte;
    public static final int _fldelse = 0;
    public static final int _fldcase = 1;
    public static final int _fldgoto = 2;
    public static final int a = 3;
}
