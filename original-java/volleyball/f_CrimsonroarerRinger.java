package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class f_CrimsonroarerRinger extends c_ForesthuggerCrest
{

    public f_CrimsonroarerRinger()
    {
        n = -1;
    }

    private int _mthlong(int i)
    {
        return i * i;
    }

    private int _mthgoto(int i)
    {
        int j = 0;
        int k = _fldelseEmberdonkeySpirit;
        int l = _fldifGlenrayLantern;
        while((k += --l) > i) 
            j++;
        return j;
    }

    private int _mthelse(int i)
    {
        int j = _mthgoto(i);
        int k = _fldvoidBoneladyMind;
        int l = _flddoPatchlightningSword;
        for(int i1 = 0; i1 < j; i1++)
        {
            k += l;
            if(k < 0)
            {
                k = 0;
                l = -l;
                continue;
            }
            if(k > 1000)
            {
                k = 1000;
                l = -l;
            }
        }

        return k;
    }

    public void aVeildiveChiller()
    {
        if(_fldvoidBoneladyMind < 500 && n != -1)
            n = -1;
        int i = _mthelse(125);
        int j = _mthgoto(125);
        int k;
        if(_fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard < 575)
            k = 0;
        else
            k = 25 + (int)(10D * Math.random());
        if(_flddoPatchlightningSword == 0 && _fldvoidBoneladyMind == 800 || n != -1)
        {
            if(n == -1)
            {
                if(gGlimmerfishGem > 250)
                    n = 0;
                else
                    n = 1;
                if(Math.random() < 0.34999999999999998D)
                    n = (int)(2D * Math.random());
            }
            switch(n)
            {
            default:
                break;

            case 0: // '\0'
                if(_fldelseEmberdonkeySpirit < 250 && _fldifGlenrayLantern < -3)
                {
                    aLapisgazelleVulture(1);
                    aLapisgazelleVulture(2);
                }
                break;

            case 1: // '\001'
                if(_fldelseEmberdonkeySpirit < 250 && _fldifGlenrayLantern < 0)
                {
                    aLapisgazelleVulture(0);
                    aLapisgazelleVulture(2);
                }
                break;
            }
            return;
        }
        if(i < 500)
        {
            if(Math.abs(_fldintDestinybearLeopard - 666) < 20)
                aLapisgazelleVulture(3);
            else
            if(_fldintDestinybearLeopard > 666)
                aLapisgazelleVulture(0);
            else
            if(_fldintDestinybearLeopard < 666)
                aLapisgazelleVulture(1);
            return;
        }
        if(Math.abs(_fldintDestinybearLeopard - i) < k)
        {
            if(_fldforAlmondsingerBrow != 0 || fSunrisecougarMonkey && Math.random() < 0.29999999999999999D)
                return;
            if((_fldintDestinybearLeopard >= 900 && _fldvoidBoneladyMind > 830 || _fldintDestinybearLeopard <= 580 && _fldvoidBoneladyMind < 530) && Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 100)
                _mthtry();
            else
            if(_mthlong(_fldvoidBoneladyMind - _fldintDestinybearLeopard) * 2 + _mthlong(_fldelseEmberdonkeySpirit - _fldforAlmondsingerBrow) < _mthlong(170) && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthtry();
            else
            if(_flddoPatchlightningSword * _flddoPatchlightningSword + _fldifGlenrayLantern * _fldifGlenrayLantern < 20 && _fldvoidBoneladyMind - _fldintDestinybearLeopard < 30 && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthtry();
            else
            if(Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 150 && _fldelseEmberdonkeySpirit > 50 && _fldelseEmberdonkeySpirit < 400 && Math.random() < 0.66600000000000004D)
                _mthtry();
        }
        if(_fldforAlmondsingerBrow == 0 && n == -1)
        {
            if(Math.abs(_fldintDestinybearLeopard - i) < k)
                aLapisgazelleVulture(3);
            else
            if(i + k < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(i + k > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        } else
        if(n == -1)
        {
            if(_fldintDestinybearLeopard < 575)
                return;
            if(_fldintDestinybearLeopard > 900)
            {
                aLapisgazelleVulture(1);
                return;
            }
            if(Math.abs(_fldintDestinybearLeopard - _fldvoidBoneladyMind) < k)
                aLapisgazelleVulture(3);
            else
            if(_fldvoidBoneladyMind < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(_fldvoidBoneladyMind > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        }
    }

    private void _mthtry()
    {
        if(Math.random() < 0.84999999999999998D)
            aLapisgazelleVulture(2);
    }

    private final double m = 0.84999999999999998D;
    private int n;
}
