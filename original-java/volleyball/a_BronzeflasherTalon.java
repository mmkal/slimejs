package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class a_BronzeflasherTalon extends c_ForesthuggerCrest
{

    public a_BronzeflasherTalon()
    {
        oSagepiperLizard = -1;
    }

    public void aVeildiveChiller()
    {
        if(oSagepiperLizard != -1 || _fldvoidBoneladyMind == 800 && _flddoPatchlightningSword == 0)
        {
            _mthcaseBallisticflyRipper();
            return;
        }
        int i = _mthvoidMadgorillaHyena(_fldforAlmondsingerBrow + bRustsnagglefootFin + 30);
        byte byte0;
        if(i < 600)
            byte0 = 0;
        else
        if(i < 700)
            byte0 = 10;
        else
            byte0 = 20;
        if(i < 450)
        {
            if(Math.abs(_fldintDestinybearLeopard - 666) < 10)
                aLapisgazelleVulture(3);
            else
            if(666 < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(666 > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        } else
        if(Math.abs(_fldintDestinybearLeopard - i - byte0) < 10)
            aLapisgazelleVulture(3);
        else
        if(i + byte0 < _fldintDestinybearLeopard)
            aLapisgazelleVulture(0);
        else
        if(i + byte0 > _fldintDestinybearLeopard)
            aLapisgazelleVulture(1);
        if((_fldintDestinybearLeopard <= 900 || Math.random() >= 0.40000000000000002D) && i >= 720 && (_fldelseEmberdonkeySpirit >= 150 || _fldifGlenrayLantern <= -3))
            if((_fldintDestinybearLeopard >= 900 && _fldvoidBoneladyMind > 830 || _fldintDestinybearLeopard <= 580 && _fldvoidBoneladyMind < 530) && Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 100)
                aLapisgazelleVulture(2);
            else
            if(cPalmrazorDiver(_fldvoidBoneladyMind - _fldintDestinybearLeopard) * 2 + cPalmrazorDiver(_fldelseEmberdonkeySpirit - _fldforAlmondsingerBrow) < cPalmrazorDiver(185) && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                aLapisgazelleVulture(2);
            else
            if(_flddoPatchlightningSword * _flddoPatchlightningSword + _fldifGlenrayLantern * _fldifGlenrayLantern < 20 && _fldvoidBoneladyMind - _fldintDestinybearLeopard < 30 && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                aLapisgazelleVulture(2);
            else
            if(Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 150 && _fldelseEmberdonkeySpirit > 50 && _fldelseEmberdonkeySpirit < 250)
                aLapisgazelleVulture(2);
    }

    private int cPalmrazorDiver(int i)
    {
        return i * i;
    }

    private int bDarkdiverPegasus(int i)
    {
        int j = 0;
        int k = _fldelseEmberdonkeySpirit;
        int l = _fldifGlenrayLantern;
        while((k += --l) > 0) 
            j++;
        return j;
    }

    private int _mthvoidMadgorillaHyena(int i)
    {
        int j = _fldvoidBoneladyMind;
        int k = _fldelseEmberdonkeySpirit;
        int l = _fldifGlenrayLantern;
        do
        {
            if((k += --l) <= i)
                break;
            j += _flddoPatchlightningSword;
            if(j <= 0)
            {
                j = 0;
                _flddoPatchlightningSword = -_flddoPatchlightningSword;
            } else
            if(j >= 1000)
            {
                j = 1000;
                _flddoPatchlightningSword = -_flddoPatchlightningSword;
            }
        } while(true);
        return j;
    }

    private int _mthcharBallisticboarRaven()
    {
        int i = _fldintDestinybearLeopard - _fldvoidBoneladyMind;
        int j = _fldforAlmondsingerBrow - _fldelseEmberdonkeySpirit;
        return (int)Math.sqrt(i * i + j * j);
    }

    private void _mthcaseBallisticflyRipper()
    {
        if(oSagepiperLizard == -1)
        {
            if(Math.random() < 0.29999999999999999D)
            {
                if(gGlimmerfishGem < 300)
                    oSagepiperLizard = 0;
                else
                if(gGlimmerfishGem > 200)
                    oSagepiperLizard = 1;
                else
                    oSagepiperLizard = 2;
            } else
            {
                oSagepiperLizard = 2;
            }
            if(oSagepiperLizard == -1 || Math.random() < 0.29999999999999999D)
                oSagepiperLizard = (int)(Math.random() * 3D);
        }
        switch(oSagepiperLizard)
        {
        default:
            break;

        case 0: // '\0'
        case 1: // '\001'
            char c4 = oSagepiperLizard != 0 ? '\u0348' : '\u035C';
            if(_fldifGlenrayLantern > 12 && _fldintDestinybearLeopard < c4)
                aLapisgazelleVulture(1);
            if(_fldintDestinybearLeopard >= c4)
                aLapisgazelleVulture(3);
            if(_fldifGlenrayLantern == -3 && _fldintDestinybearLeopard != 800)
                aLapisgazelleVulture(2);
            if(_fldifGlenrayLantern < -12 && _fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard >= c4 - 15 && oSagepiperLizard == 0)
                aLapisgazelleVulture(0);
            if(_fldvoidBoneladyMind < 700)
                oSagepiperLizard = -1;
            break;

        case 2: // '\002'
            char c1 = '\u0302';
            if(_fldifGlenrayLantern > 12 && _fldintDestinybearLeopard > c1)
                aLapisgazelleVulture(0);
            if(_fldintDestinybearLeopard <= c1)
                aLapisgazelleVulture(3);
            if(_fldifGlenrayLantern == -2 && _fldintDestinybearLeopard != 800)
                aLapisgazelleVulture(2);
            if(_fldforAlmondsingerBrow != 0 && _fldvoidBoneladyMind > 800)
                oSagepiperLizard = 3 + _mthbyteLightrazorCat();
            break;

        case 3: // '\003'
            char c2 = '\u0249';
            if(_fldintDestinybearLeopard > c2)
                aLapisgazelleVulture(0);
            if(_fldintDestinybearLeopard <= c2)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind <= 730)
                aLapisgazelleVulture(2);
            if(_fldvoidBoneladyMind < 600)
                aLapisgazelleVulture(1);
            if(_fldvoidBoneladyMind < 580)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind < 540)
                oSagepiperLizard = -1;
            // fall through

        case 4: // '\004'
            char c3 = '\u0249';
            if(_fldintDestinybearLeopard > c3)
                aLapisgazelleVulture(0);
            if(_fldintDestinybearLeopard <= c3)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind <= 755)
                aLapisgazelleVulture(2);
            if(_fldvoidBoneladyMind < 600)
                aLapisgazelleVulture(1);
            if(_fldvoidBoneladyMind < 580)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind < 540)
                oSagepiperLizard = -1;
            break;
        }
    }

    private int _mthbyteLightrazorCat()
    {
        int i = 0;
        if(gGlimmerfishGem < 200)
            i = 1;
        else
        if(gGlimmerfishGem > 300)
            i = 0;
        if(Math.random() < 0.34999999999999998D)
            i = 1 - i;
        return i;
    }

    private int oSagepiperLizard;
}
