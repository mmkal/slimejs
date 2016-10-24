package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class e_LeafstormWeasel extends c_ForesthuggerCrest
{

    public e_LeafstormWeasel()
    {
        l = -1;
    }

    private int _mthchar(int i)
    {
        return i * i;
    }

    private int _mthcase(int i)
    {
        int j = 0;
        int i1 = _fldelseEmberdonkeySpirit;
        int j1 = _fldifGlenrayLantern;
        while((i1 += --j1) > i) 
            j++;
        return j;
    }

    private int _mthbyte(int i)
    {
        int j = _mthcase(i);
        int i1 = _fldvoidBoneladyMind;
        int j1 = _flddoPatchlightningSword;
        for(int k1 = 0; k1 < j; k1++)
        {
            i1 += j1;
            if(i1 < 0)
            {
                i1 = 0;
                j1 = -j1;
                continue;
            }
            if(i1 > 1000)
            {
                i1 = 1000;
                j1 = -j1;
            }
        }

        return i1;
    }

    public void aVeildiveChiller()
    {
        if(_fldvoidBoneladyMind < 500 && l != -1)
            l = -1;
        int i = _mthbyte(125);
        int j = _mthcase(125);
        int i1;
        if(_fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard < 575)
            i1 = 0;
        else
            i1 = 23 + (int)(15D * Math.random());
        if(_flddoPatchlightningSword == 0 && _fldvoidBoneladyMind == 800 || l != -1)
        {
            if(l == -1)
            {
                if(gGlimmerfishGem > 250)
                    l = 0;
                else
                if(gGlimmerfishGem < 200)
                    l = 1;
                else
                if(gGlimmerfishGem < 250)
                    l = 2;
                if(Math.random() < 0.34999999999999998D)
                    l = (int)(3D * Math.random());
            }
            switch(l)
            {
            default:
                break;

            case 0: // '\0'
                if(_fldelseEmberdonkeySpirit < 300 && _fldifGlenrayLantern < -3)
                {
                    aLapisgazelleVulture(1);
                    aLapisgazelleVulture(2);
                }
                break;

            case 1: // '\001'
                if(_fldelseEmberdonkeySpirit < 300 && _fldifGlenrayLantern < 0)
                {
                    aLapisgazelleVulture(0);
                    aLapisgazelleVulture(2);
                }
                break;

            case 2: // '\002'
                char c1 = '\u035C';
                if(_fldifGlenrayLantern > 12 && _fldintDestinybearLeopard < c1)
                    aLapisgazelleVulture(1);
                if(_fldintDestinybearLeopard >= c1)
                    aLapisgazelleVulture(3);
                if(_fldifGlenrayLantern == -3 && _fldintDestinybearLeopard != 800)
                    aLapisgazelleVulture(2);
                if(_fldifGlenrayLantern < -12 && _fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard >= c1 - 15)
                    aLapisgazelleVulture(0);
                break;
            }
            return;
        }
        if(i < 500)
        {
            if(Math.abs(_fldintDestinybearLeopard - 800) < 20)
                aLapisgazelleVulture(3);
            else
            if(_fldintDestinybearLeopard > 800)
                aLapisgazelleVulture(0);
            else
            if(_fldintDestinybearLeopard < 800)
                aLapisgazelleVulture(1);
            return;
        }
        if(Math.abs(_fldintDestinybearLeopard - i) < i1)
        {
            if(_fldforAlmondsingerBrow != 0 || fSunrisecougarMonkey && Math.random() < 0.29999999999999999D)
                return;
            if((_fldintDestinybearLeopard >= 900 && _fldvoidBoneladyMind > 830 || _fldintDestinybearLeopard <= 580 && _fldvoidBoneladyMind < 530) && Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 100)
                _mthnew();
            else
            if(_mthchar(_fldvoidBoneladyMind - _fldintDestinybearLeopard) * 2 + _mthchar(_fldelseEmberdonkeySpirit - _fldforAlmondsingerBrow) < _mthchar(170) && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthnew();
            else
            if(_flddoPatchlightningSword * _flddoPatchlightningSword + _fldifGlenrayLantern * _fldifGlenrayLantern < 20 && _fldvoidBoneladyMind - _fldintDestinybearLeopard < 30 && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthnew();
            else
            if(Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 150 && _fldelseEmberdonkeySpirit > 50 && _fldelseEmberdonkeySpirit < 400 && Math.random() < 0.5D)
                _mthnew();
        }
        if(_fldforAlmondsingerBrow == 0 && l == -1)
        {
            if(Math.abs(_fldintDestinybearLeopard - i) < i1)
                aLapisgazelleVulture(3);
            else
            if(i + i1 < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(i + i1 > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        } else
        if(l == -1)
        {
            if(_fldintDestinybearLeopard < 575)
                return;
            if(_fldintDestinybearLeopard > 900)
            {
                aLapisgazelleVulture(1);
                return;
            }
            if(Math.abs(_fldintDestinybearLeopard - _fldvoidBoneladyMind) < i1)
                aLapisgazelleVulture(3);
            else
            if(_fldvoidBoneladyMind < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(_fldvoidBoneladyMind > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        }
    }

    private void _mthnew()
    {
        if(Math.random() < 0.40000000000000002D)
            aLapisgazelleVulture(2);
    }

    private final double k = 0.40000000000000002D;
    private int l;
}
