package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class d_HolybootArrow extends c_ForesthuggerCrest
{

    public d_HolybootArrow()
    {
        j = -1;
    }

    private int _mthtry(int k)
    {
        return k * k;
    }

    private int _mthnew(int k)
    {
        int l = 0;
        int i1 = _fldelseEmberdonkeySpirit;
        int j1 = _fldifGlenrayLantern;
        while((i1 += --j1) > k) 
            l++;
        return l;
    }

    private int _mthint(int k)
    {
        int l = _mthnew(k);
        int i1 = _fldvoidBoneladyMind;
        int j1 = _flddoPatchlightningSword;
        for(int k1 = 0; k1 < l; k1++)
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
        if(_fldvoidBoneladyMind < 500 && j != -1)
            j = -1;
        int k = _mthint(125);
        int l = _mthnew(125);
        int i1;
        if(_fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard < 575)
            i1 = 0;
        else
            i1 = 25 + (int)(10D * Math.random());
        if(_flddoPatchlightningSword == 0 && _fldvoidBoneladyMind == 800 || j != -1)
        {
            if(j == -1)
            {
                if(gGlimmerfishGem > 250)
                    j = 0;
                else
                    j = 1;
                if(Math.random() < 0.34999999999999998D)
                    j = (int)(2D * Math.random());
            }
            switch(j)
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
            }
            return;
        }
        if(k < 500)
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
        if(Math.abs(_fldintDestinybearLeopard - k) < i1)
        {
            if(_fldforAlmondsingerBrow != 0 || fSunrisecougarMonkey && Math.random() < 0.29999999999999999D)
                return;
            if((_fldintDestinybearLeopard >= 900 && _fldvoidBoneladyMind > 830 || _fldintDestinybearLeopard <= 580 && _fldvoidBoneladyMind < 530) && Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 100)
                _mthint();
            else
            if(_mthtry(_fldvoidBoneladyMind - _fldintDestinybearLeopard) * 2 + _mthtry(_fldelseEmberdonkeySpirit - _fldforAlmondsingerBrow) < _mthtry(170) && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthint();
            else
            if(_flddoPatchlightningSword * _flddoPatchlightningSword + _fldifGlenrayLantern * _fldifGlenrayLantern < 20 && _fldvoidBoneladyMind - _fldintDestinybearLeopard < 30 && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                _mthint();
            else
            if(Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 150 && _fldelseEmberdonkeySpirit > 50 && _fldelseEmberdonkeySpirit < 400 && Math.random() < 0.66600000000000004D)
                _mthint();
        }
        if(_fldforAlmondsingerBrow == 0 && j == -1)
        {
            if(Math.abs(_fldintDestinybearLeopard - k) < i1)
                aLapisgazelleVulture(3);
            else
            if(k + i1 < _fldintDestinybearLeopard)
                aLapisgazelleVulture(0);
            else
            if(k + i1 > _fldintDestinybearLeopard)
                aLapisgazelleVulture(1);
        } else
        if(j == -1)
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

    private void _mthint()
    {
        if(Math.random() < 0.84999999999999998D)
            aLapisgazelleVulture(2);
    }

    private final double i = 0.84999999999999998D;
    private int j;
}
