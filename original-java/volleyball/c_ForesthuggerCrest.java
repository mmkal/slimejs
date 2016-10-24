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
        _fldcaseShortwhaleWanderer = slime1p;
        cCheckerneckBraid = i;
    }

    public final void aThunderiguanaLion(int ai[], boolean flag, boolean flag1)
    {
        _fldvoidBoneladyMind = cCheckerneckBraid != 2 ? 1000 - ai[0] : ai[0];
        _fldelseEmberdonkeySpirit = ai[1];
        _flddoPatchlightningSword = cCheckerneckBraid != 2 ? -ai[2] : ai[2];
        _fldifGlenrayLantern = ai[3];
        gGlimmerfishGem = cCheckerneckBraid != 2 ? 1000 - ai[8] : ai[4];
        eGlowfairyOcelot = cCheckerneckBraid != 2 ? ai[9] : ai[5];
        _fldbytePrismcoyoteArrow = cCheckerneckBraid != 2 ? -ai[10] : ai[6];
        _fldtryLovenapeKicker = cCheckerneckBraid != 2 ? ai[11] : ai[7];
        _fldintDestinybearLeopard = cCheckerneckBraid != 2 ? 1000 - ai[4] : ai[8];
        _fldforAlmondsingerBrow = cCheckerneckBraid != 2 ? ai[5] : ai[9];
        dAbalonewatcherPiper = cCheckerneckBraid != 2 ? -ai[6] : ai[10];
        bRustsnagglefootFin = cCheckerneckBraid != 2 ? ai[7] : ai[11];
        _fldnewSharpripperUnicorn = cCheckerneckBraid != 2 ? flag1 : flag;
        fSunrisecougarMonkey = cCheckerneckBraid != 2 ? flag : flag1;
    }

    public abstract void aVeildiveChiller();

    protected final void aLapisgazelleVulture(int i)
    {
        if(cCheckerneckBraid == 1)
            switch(i)
            {
            case 0: // '\0'
                _fldcaseShortwhaleWanderer.bChromemouseBelly();
                break;

            case 1: // '\001'
                _fldcaseShortwhaleWanderer.cIriswarlockGargoyle();
                break;

            case 2: // '\002'
                _fldcaseShortwhaleWanderer._mthcharBravedeathTiger();
                break;

            case 3: // '\003'
                _fldcaseShortwhaleWanderer._mthtryTabbylighterChest();
                break;
            }
        else
        if(cCheckerneckBraid == 2)
            switch(i)
            {
            case 0: // '\0'
                _fldcaseShortwhaleWanderer.eDullsalmonSinger();
                break;

            case 1: // '\001'
                _fldcaseShortwhaleWanderer.jChiplighterBone();
                break;

            case 2: // '\002'
                _fldcaseShortwhaleWanderer._mthlongTranslucenttakerChopper();
                break;

            case 3: // '\003'
                _fldcaseShortwhaleWanderer._mthelseTabbyhawkFace();
                break;
            }
    }

    protected int _fldvoidBoneladyMind;
    protected int _fldelseEmberdonkeySpirit;
    protected int _flddoPatchlightningSword;
    protected int _fldifGlenrayLantern;
    protected int gGlimmerfishGem;
    protected int eGlowfairyOcelot;
    protected int _fldbytePrismcoyoteArrow;
    protected int _fldtryLovenapeKicker;
    protected int _fldintDestinybearLeopard;
    protected int _fldforAlmondsingerBrow;
    protected int dAbalonewatcherPiper;
    protected int bRustsnagglefootFin;
    protected boolean _fldnewSharpripperUnicorn;
    protected boolean fSunrisecougarMonkey;
    private int cCheckerneckBraid;
    private Slime1P _fldcaseShortwhaleWanderer;
    public static final int _fldgotoLinenswoopSpear = 0;
    public static final int _fldcharHotflyGrin = 1;
    public static final int _fldlongGemsparrowFrill = 2;
    public static final int aRogueweaverSnout = 3;
}
