package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class b_PewterspurServant extends c_ForesthuggerCrest
{

    public b_PewterspurServant()
    {
        h = -1;
    }

    public void aVeildiveChiller()
    {
        if(h != -1 || _fldvoidBoneladyMind == 800 && _flddoPatchlightningSword == 0)
        {
            _mthdoThornnapeFang();
            return;
        }
        int i = _mthif(_fldforAlmondsingerBrow + bRustsnagglefootFin + 30);
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
        if((_fldintDestinybearLeopard <= 900 || Math.random() >= 0.40000000000000002D) && i >= 620 && (_fldelseEmberdonkeySpirit >= 130 || _fldifGlenrayLantern >= 0) && (!fSunrisecougarMonkey || Math.random() >= 0.59999999999999998D))
            if((_fldintDestinybearLeopard >= 900 && _fldvoidBoneladyMind > 830 || _fldintDestinybearLeopard <= 580 && _fldvoidBoneladyMind < 530) && Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < 100)
                aLapisgazelleVulture(2);
            else
            if(_mthfor(_fldvoidBoneladyMind - _fldintDestinybearLeopard) * 2 + _mthfor(_fldelseEmberdonkeySpirit - _fldforAlmondsingerBrow) < _mthfor(185) && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                aLapisgazelleVulture(2);
            else
            if(_flddoPatchlightningSword * _flddoPatchlightningSword + _fldifGlenrayLantern * _fldifGlenrayLantern < 20 && _fldvoidBoneladyMind - _fldintDestinybearLeopard < 30 && _fldvoidBoneladyMind != _fldintDestinybearLeopard)
                aLapisgazelleVulture(2);
            else
            if(Math.abs(_fldvoidBoneladyMind - _fldintDestinybearLeopard) < (fSunrisecougarMonkey ? 135 : '\226') && (_fldelseEmberdonkeySpirit > 50 && _fldelseEmberdonkeySpirit < 250))
                aLapisgazelleVulture(2);
    }

    private int _mthfor(int i)
    {
        return i * i;
    }

    private int _mthdoMesquiteweaverTerrier(int i)
    {
        int j = 0;
        int k = _fldelseEmberdonkeySpirit;
        int l = _fldifGlenrayLantern;
        while((k += --l) > 0) 
            j++;
        return j;
    }

    private int _mthif(int i)
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

    private int _mthfor()
    {
        int i = _fldintDestinybearLeopard - _fldvoidBoneladyMind;
        int j = _fldforAlmondsingerBrow - _fldelseEmberdonkeySpirit;
        return (int)Math.sqrt(i * i + j * j);
    }

    private void _mthdoThornnapeFang()
    {
        if(h == -1)
        {
            if(Math.random() < 0.29999999999999999D)
            {
                if(gGlimmerfishGem < 300 && !fSunrisecougarMonkey)
                    h = 0;
                else
                if(gGlimmerfishGem > 200)
                    h = 1;
                else
                    h = 2;
            } else
            {
                h = 2;
            }
            if(h == -1 || Math.random() < 0.29999999999999999D)
                h = (int)(Math.random() * 3D);
            if(fSunrisecougarMonkey && h == 0)
                h = 1 + (int)(Math.random() * 2D);
        }
        switch(h)
        {
        default:
            break;

        case 0: // '\0'
        case 1: // '\001'
            char c4 = h != 0 ? '\u0348' : '\u035C';
            if(_fldifGlenrayLantern > 12 && _fldintDestinybearLeopard < c4)
                aLapisgazelleVulture(1);
            if(_fldintDestinybearLeopard >= c4)
                aLapisgazelleVulture(3);
            if(_fldifGlenrayLantern == -3 && _fldintDestinybearLeopard != 800)
                aLapisgazelleVulture(2);
            if(_fldifGlenrayLantern < -12 && _fldforAlmondsingerBrow != 0 && _fldintDestinybearLeopard >= c4 - 15 && h == 0)
                aLapisgazelleVulture(0);
            if(_fldvoidBoneladyMind < 700)
                h = -1;
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
                h = 3 + _mthif();
            break;

        case 3: // '\003'
            char c2 = fSunrisecougarMonkey ? '\u022B' : '\u0249';
            if(_fldintDestinybearLeopard > c2)
                aLapisgazelleVulture(0);
            if(_fldintDestinybearLeopard <= c2)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind <= (fSunrisecougarMonkey ? '\u02E4' : 730))
                aLapisgazelleVulture(2);
            if(_fldvoidBoneladyMind < 540)
                h = -1;
            break;

        case 4: // '\004'
            char c3 = fSunrisecougarMonkey ? '\u022B' : '\u0249';
            if(_fldintDestinybearLeopard > c3)
                aLapisgazelleVulture(0);
            if(_fldintDestinybearLeopard <= c3)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind <= (fSunrisecougarMonkey ? '\u02BC' : 730))
                aLapisgazelleVulture(2);
            if(_fldvoidBoneladyMind < 600)
                aLapisgazelleVulture(1);
            if(_fldvoidBoneladyMind < 580)
                aLapisgazelleVulture(3);
            if(_fldvoidBoneladyMind < 540)
                h = -1;
            break;
        }
    }

    private int _mthif()
    {
        boolean flag = false;
        if(gGlimmerfishGem < 200)
            flag = Math.random() < 0.69999999999999996D;
        else
        if(gGlimmerfishGem > 300)
            flag = Math.random() < 0.29999999999999999D;
        else
            flag = Math.random() < 0.5D;
        return !flag ? 0 : 1;
    }

    private int h;
}
