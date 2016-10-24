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
        int i1 = _fldelse;
        int j1 = _fldif;
        while((i1 += --j1) > i) 
            j++;
        return j;
    }

    private int _mthbyte(int i)
    {
        int j = _mthcase(i);
        int i1 = _fldvoid;
        int j1 = _flddo;
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
        if(_fldvoid < 500 && l != -1)
            l = -1;
        int i = _mthbyte(125);
        int j = _mthcase(125);
        int i1;
        if(_fldfor != 0 && _fldint < 575)
            i1 = 0;
        else
            i1 = 23 + (int)(15D * Math.random());
        if(_flddo == 0 && _fldvoid == 800 || l != -1)
        {
            if(l == -1)
            {
                if(g > 250)
                    l = 0;
                else
                if(g < 200)
                    l = 1;
                else
                if(g < 250)
                    l = 2;
                if(Math.random() < 0.34999999999999998D)
                    l = (int)(3D * Math.random());
            }
            switch(l)
            {
            default:
                break;

            case 0: // '\0'
                if(_fldelse < 300 && _fldif < -3)
                {
                    aLapisgazelleVulture(1);
                    aLapisgazelleVulture(2);
                }
                break;

            case 1: // '\001'
                if(_fldelse < 300 && _fldif < 0)
                {
                    aLapisgazelleVulture(0);
                    aLapisgazelleVulture(2);
                }
                break;

            case 2: // '\002'
                char c1 = '\u035C';
                if(_fldif > 12 && _fldint < c1)
                    aLapisgazelleVulture(1);
                if(_fldint >= c1)
                    aLapisgazelleVulture(3);
                if(_fldif == -3 && _fldint != 800)
                    aLapisgazelleVulture(2);
                if(_fldif < -12 && _fldfor != 0 && _fldint >= c1 - 15)
                    aLapisgazelleVulture(0);
                break;
            }
            return;
        }
        if(i < 500)
        {
            if(Math.abs(_fldint - 800) < 20)
                aLapisgazelleVulture(3);
            else
            if(_fldint > 800)
                aLapisgazelleVulture(0);
            else
            if(_fldint < 800)
                aLapisgazelleVulture(1);
            return;
        }
        if(Math.abs(_fldint - i) < i1)
        {
            if(_fldfor != 0 || f && Math.random() < 0.29999999999999999D)
                return;
            if((_fldint >= 900 && _fldvoid > 830 || _fldint <= 580 && _fldvoid < 530) && Math.abs(_fldvoid - _fldint) < 100)
                _mthnew();
            else
            if(_mthchar(_fldvoid - _fldint) * 2 + _mthchar(_fldelse - _fldfor) < _mthchar(170) && _fldvoid != _fldint)
                _mthnew();
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldvoid - _fldint < 30 && _fldvoid != _fldint)
                _mthnew();
            else
            if(Math.abs(_fldvoid - _fldint) < 150 && _fldelse > 50 && _fldelse < 400 && Math.random() < 0.5D)
                _mthnew();
        }
        if(_fldfor == 0 && l == -1)
        {
            if(Math.abs(_fldint - i) < i1)
                aLapisgazelleVulture(3);
            else
            if(i + i1 < _fldint)
                aLapisgazelleVulture(0);
            else
            if(i + i1 > _fldint)
                aLapisgazelleVulture(1);
        } else
        if(l == -1)
        {
            if(_fldint < 575)
                return;
            if(_fldint > 900)
            {
                aLapisgazelleVulture(1);
                return;
            }
            if(Math.abs(_fldint - _fldvoid) < i1)
                aLapisgazelleVulture(3);
            else
            if(_fldvoid < _fldint)
                aLapisgazelleVulture(0);
            else
            if(_fldvoid > _fldint)
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
