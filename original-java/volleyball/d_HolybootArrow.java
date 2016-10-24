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
        int i1 = _fldelse;
        int j1 = _fldif;
        while((i1 += --j1) > k) 
            l++;
        return l;
    }

    private int _mthint(int k)
    {
        int l = _mthnew(k);
        int i1 = _fldvoid;
        int j1 = _flddo;
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
        if(_fldvoid < 500 && j != -1)
            j = -1;
        int k = _mthint(125);
        int l = _mthnew(125);
        int i1;
        if(_fldfor != 0 && _fldint < 575)
            i1 = 0;
        else
            i1 = 25 + (int)(10D * Math.random());
        if(_flddo == 0 && _fldvoid == 800 || j != -1)
        {
            if(j == -1)
            {
                if(g > 250)
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
            }
            return;
        }
        if(k < 500)
        {
            if(Math.abs(_fldint - 666) < 20)
                aLapisgazelleVulture(3);
            else
            if(_fldint > 666)
                aLapisgazelleVulture(0);
            else
            if(_fldint < 666)
                aLapisgazelleVulture(1);
            return;
        }
        if(Math.abs(_fldint - k) < i1)
        {
            if(_fldfor != 0 || f && Math.random() < 0.29999999999999999D)
                return;
            if((_fldint >= 900 && _fldvoid > 830 || _fldint <= 580 && _fldvoid < 530) && Math.abs(_fldvoid - _fldint) < 100)
                _mthint();
            else
            if(_mthtry(_fldvoid - _fldint) * 2 + _mthtry(_fldelse - _fldfor) < _mthtry(170) && _fldvoid != _fldint)
                _mthint();
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldvoid - _fldint < 30 && _fldvoid != _fldint)
                _mthint();
            else
            if(Math.abs(_fldvoid - _fldint) < 150 && _fldelse > 50 && _fldelse < 400 && Math.random() < 0.66600000000000004D)
                _mthint();
        }
        if(_fldfor == 0 && j == -1)
        {
            if(Math.abs(_fldint - k) < i1)
                aLapisgazelleVulture(3);
            else
            if(k + i1 < _fldint)
                aLapisgazelleVulture(0);
            else
            if(k + i1 > _fldint)
                aLapisgazelleVulture(1);
        } else
        if(j == -1)
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

    private void _mthint()
    {
        if(Math.random() < 0.84999999999999998D)
            aLapisgazelleVulture(2);
    }

    private final double i = 0.84999999999999998D;
    private int j;
}
