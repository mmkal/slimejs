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
        int k = _fldelse;
        int l = _fldif;
        while((k += --l) > i) 
            j++;
        return j;
    }

    private int _mthelse(int i)
    {
        int j = _mthgoto(i);
        int k = _fldvoid;
        int l = _flddo;
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
        if(_fldvoid < 500 && n != -1)
            n = -1;
        int i = _mthelse(125);
        int j = _mthgoto(125);
        int k;
        if(_fldfor != 0 && _fldint < 575)
            k = 0;
        else
            k = 25 + (int)(10D * Math.random());
        if(_flddo == 0 && _fldvoid == 800 || n != -1)
        {
            if(n == -1)
            {
                if(g > 250)
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
                if(_fldelse < 250 && _fldif < -3)
                {
                    aLapisgazelleVulture(1);
                    aLapisgazelleVulture(2);
                }
                break;

            case 1: // '\001'
                if(_fldelse < 250 && _fldif < 0)
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
        if(Math.abs(_fldint - i) < k)
        {
            if(_fldfor != 0 || f && Math.random() < 0.29999999999999999D)
                return;
            if((_fldint >= 900 && _fldvoid > 830 || _fldint <= 580 && _fldvoid < 530) && Math.abs(_fldvoid - _fldint) < 100)
                _mthtry();
            else
            if(_mthlong(_fldvoid - _fldint) * 2 + _mthlong(_fldelse - _fldfor) < _mthlong(170) && _fldvoid != _fldint)
                _mthtry();
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldvoid - _fldint < 30 && _fldvoid != _fldint)
                _mthtry();
            else
            if(Math.abs(_fldvoid - _fldint) < 150 && _fldelse > 50 && _fldelse < 400 && Math.random() < 0.66600000000000004D)
                _mthtry();
        }
        if(_fldfor == 0 && n == -1)
        {
            if(Math.abs(_fldint - i) < k)
                aLapisgazelleVulture(3);
            else
            if(i + k < _fldint)
                aLapisgazelleVulture(0);
            else
            if(i + k > _fldint)
                aLapisgazelleVulture(1);
        } else
        if(n == -1)
        {
            if(_fldint < 575)
                return;
            if(_fldint > 900)
            {
                aLapisgazelleVulture(1);
                return;
            }
            if(Math.abs(_fldint - _fldvoid) < k)
                aLapisgazelleVulture(3);
            else
            if(_fldvoid < _fldint)
                aLapisgazelleVulture(0);
            else
            if(_fldvoid > _fldint)
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
