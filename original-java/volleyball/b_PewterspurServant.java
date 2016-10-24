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
        if(h != -1 || _fldvoid == 800 && _flddo == 0)
        {
            _mthdoThornnapeFang();
            return;
        }
        int i = _mthif(_fldfor + b + 30);
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
            if(Math.abs(_fldint - 666) < 10)
                aLapisgazelleVulture(3);
            else
            if(666 < _fldint)
                aLapisgazelleVulture(0);
            else
            if(666 > _fldint)
                aLapisgazelleVulture(1);
        } else
        if(Math.abs(_fldint - i - byte0) < 10)
            aLapisgazelleVulture(3);
        else
        if(i + byte0 < _fldint)
            aLapisgazelleVulture(0);
        else
        if(i + byte0 > _fldint)
            aLapisgazelleVulture(1);
        if((_fldint <= 900 || Math.random() >= 0.40000000000000002D) && i >= 620 && (_fldelse >= 130 || _fldif >= 0) && (!f || Math.random() >= 0.59999999999999998D))
            if((_fldint >= 900 && _fldvoid > 830 || _fldint <= 580 && _fldvoid < 530) && Math.abs(_fldvoid - _fldint) < 100)
                aLapisgazelleVulture(2);
            else
            if(_mthfor(_fldvoid - _fldint) * 2 + _mthfor(_fldelse - _fldfor) < _mthfor(185) && _fldvoid != _fldint)
                aLapisgazelleVulture(2);
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldvoid - _fldint < 30 && _fldvoid != _fldint)
                aLapisgazelleVulture(2);
            else
            if(Math.abs(_fldvoid - _fldint) < (f ? 135 : '\226') && (_fldelse > 50 && _fldelse < 250))
                aLapisgazelleVulture(2);
    }

    private int _mthfor(int i)
    {
        return i * i;
    }

    private int _mthdoMesquiteweaverTerrier(int i)
    {
        int j = 0;
        int k = _fldelse;
        int l = _fldif;
        while((k += --l) > 0) 
            j++;
        return j;
    }

    private int _mthif(int i)
    {
        int j = _fldvoid;
        int k = _fldelse;
        int l = _fldif;
        do
        {
            if((k += --l) <= i)
                break;
            j += _flddo;
            if(j <= 0)
            {
                j = 0;
                _flddo = -_flddo;
            } else
            if(j >= 1000)
            {
                j = 1000;
                _flddo = -_flddo;
            }
        } while(true);
        return j;
    }

    private int _mthfor()
    {
        int i = _fldint - _fldvoid;
        int j = _fldfor - _fldelse;
        return (int)Math.sqrt(i * i + j * j);
    }

    private void _mthdoThornnapeFang()
    {
        if(h == -1)
        {
            if(Math.random() < 0.29999999999999999D)
            {
                if(g < 300 && !f)
                    h = 0;
                else
                if(g > 200)
                    h = 1;
                else
                    h = 2;
            } else
            {
                h = 2;
            }
            if(h == -1 || Math.random() < 0.29999999999999999D)
                h = (int)(Math.random() * 3D);
            if(f && h == 0)
                h = 1 + (int)(Math.random() * 2D);
        }
        switch(h)
        {
        default:
            break;

        case 0: // '\0'
        case 1: // '\001'
            char c4 = h != 0 ? '\u0348' : '\u035C';
            if(_fldif > 12 && _fldint < c4)
                aLapisgazelleVulture(1);
            if(_fldint >= c4)
                aLapisgazelleVulture(3);
            if(_fldif == -3 && _fldint != 800)
                aLapisgazelleVulture(2);
            if(_fldif < -12 && _fldfor != 0 && _fldint >= c4 - 15 && h == 0)
                aLapisgazelleVulture(0);
            if(_fldvoid < 700)
                h = -1;
            break;

        case 2: // '\002'
            char c1 = '\u0302';
            if(_fldif > 12 && _fldint > c1)
                aLapisgazelleVulture(0);
            if(_fldint <= c1)
                aLapisgazelleVulture(3);
            if(_fldif == -2 && _fldint != 800)
                aLapisgazelleVulture(2);
            if(_fldfor != 0 && _fldvoid > 800)
                h = 3 + _mthif();
            break;

        case 3: // '\003'
            char c2 = f ? '\u022B' : '\u0249';
            if(_fldint > c2)
                aLapisgazelleVulture(0);
            if(_fldint <= c2)
                aLapisgazelleVulture(3);
            if(_fldvoid <= (f ? '\u02E4' : 730))
                aLapisgazelleVulture(2);
            if(_fldvoid < 540)
                h = -1;
            break;

        case 4: // '\004'
            char c3 = f ? '\u022B' : '\u0249';
            if(_fldint > c3)
                aLapisgazelleVulture(0);
            if(_fldint <= c3)
                aLapisgazelleVulture(3);
            if(_fldvoid <= (f ? '\u02BC' : 730))
                aLapisgazelleVulture(2);
            if(_fldvoid < 600)
                aLapisgazelleVulture(1);
            if(_fldvoid < 580)
                aLapisgazelleVulture(3);
            if(_fldvoid < 540)
                h = -1;
            break;
        }
    }

    private int _mthif()
    {
        boolean flag = false;
        if(g < 200)
            flag = Math.random() < 0.69999999999999996D;
        else
        if(g > 300)
            flag = Math.random() < 0.29999999999999999D;
        else
            flag = Math.random() < 0.5D;
        return !flag ? 0 : 1;
    }

    private int h;
}
