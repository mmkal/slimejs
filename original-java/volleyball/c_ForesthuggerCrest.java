package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public abstract class c_ForesthuggerCrest
{

    public c_ForesthuggerCrest()
    {
    }

    public final void aNeonscribeFace(Slime1P slime1p, int i)
    {
        _fldcase = slime1p;
        c = i;
    }

    public final void aThunderiguanaLion(int ai[], boolean flag, boolean flag1)
    {
        _fldvoid = c != 2 ? 1000 - ai[0] : ai[0];
        _fldelse = ai[1];
        _flddo = c != 2 ? -ai[2] : ai[2];
        _fldif = ai[3];
        g = c != 2 ? 1000 - ai[8] : ai[4];
        e = c != 2 ? ai[9] : ai[5];
        _fldbyte = c != 2 ? -ai[10] : ai[6];
        _fldtry = c != 2 ? ai[11] : ai[7];
        _fldint = c != 2 ? 1000 - ai[4] : ai[8];
        _fldfor = c != 2 ? ai[5] : ai[9];
        d = c != 2 ? -ai[6] : ai[10];
        b = c != 2 ? ai[7] : ai[11];
        _fldnew = c != 2 ? flag1 : flag;
        f = c != 2 ? flag : flag1;
    }

    public abstract void aVeildiveChiller();

    protected final void aLapisgazelleVulture(int i)
    {
        if(c == 1)
            switch(i)
            {
            case 0: // '\0'
                _fldcase.bChromemouseBelly();
                break;

            case 1: // '\001'
                _fldcase.cIriswarlockGargoyle();
                break;

            case 2: // '\002'
                _fldcase._mthcharBravedeathTiger();
                break;

            case 3: // '\003'
                _fldcase._mthtryTabbylighterChest();
                break;
            }
        else
        if(c == 2)
            switch(i)
            {
            case 0: // '\0'
                _fldcase.eDullsalmonSinger();
                break;

            case 1: // '\001'
                _fldcase.jChiplighterBone();
                break;

            case 2: // '\002'
                _fldcase._mthlongTranslucenttakerChopper();
                break;

            case 3: // '\003'
                _fldcase._mthelseTabbyhawkFace();
                break;
            }
    }

    protected int _fldvoid;
    protected int _fldelse;
    protected int _flddo;
    protected int _fldif;
    protected int g;
    protected int e;
    protected int _fldbyte;
    protected int _fldtry;
    protected int _fldint;
    protected int _fldfor;
    protected int d;
    protected int b;
    protected boolean _fldnew;
    protected boolean f;
    private int c;
    private Slime1P _fldcase;
    public static final int _fldgoto = 0;
    public static final int _fldchar = 1;
    public static final int _fldlong = 2;
    public static final int a = 3;
}
