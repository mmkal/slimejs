package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class a_BronzeflasherTalon extends c_ForesthuggerCrest
{

    public a_BronzeflasherTalon()
    {
        o = -1;
    }

    public void aVeildiveChiller()
    {
        if(o != -1 || _fldvoid == 800 && _flddo == 0)
        {
            _mthcaseBallisticflyRipper();
            return;
        }
        int i = _mthvoid(_fldfor + b + 30);
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
        if((_fldint <= 900 || Math.random() >= 0.40000000000000002D) && i >= 720 && (_fldelse >= 150 || _fldif <= -3))
            if((_fldint >= 900 && _fldvoid > 830 || _fldint <= 580 && _fldvoid < 530) && Math.abs(_fldvoid - _fldint) < 100)
                aLapisgazelleVulture(2);
            else
            if(c(_fldvoid - _fldint) * 2 + c(_fldelse - _fldfor) < c(185) && _fldvoid != _fldint)
                aLapisgazelleVulture(2);
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldvoid - _fldint < 30 && _fldvoid != _fldint)
                aLapisgazelleVulture(2);
            else
            if(Math.abs(_fldvoid - _fldint) < 150 && _fldelse > 50 && _fldelse < 250)
                aLapisgazelleVulture(2);
    }

    private int c(int i)
    {
        return i * i;
    }

    private int b(int i)
    {
        int j = 0;
        int k = _fldelse;
        int l = _fldif;
        while((k += --l) > 0) 
            j++;
        return j;
    }

    private int _mthvoid(int i)
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

    private int _mthchar()
    {
        int i = _fldint - _fldvoid;
        int j = _fldfor - _fldelse;
        return (int)Math.sqrt(i * i + j * j);
    }

    private void _mthcaseBallisticflyRipper()
    {
        if(o == -1)
        {
            if(Math.random() < 0.29999999999999999D)
            {
                if(g < 300)
                    o = 0;
                else
                if(g > 200)
                    o = 1;
                else
                    o = 2;
            } else
            {
                o = 2;
            }
            if(o == -1 || Math.random() < 0.29999999999999999D)
                o = (int)(Math.random() * 3D);
        }
        switch(o)
        {
        default:
            break;

        case 0: // '\0'
        case 1: // '\001'
            char c4 = o != 0 ? '\u0348' : '\u035C';
            if(_fldif > 12 && _fldint < c4)
                aLapisgazelleVulture(1);
            if(_fldint >= c4)
                aLapisgazelleVulture(3);
            if(_fldif == -3 && _fldint != 800)
                aLapisgazelleVulture(2);
            if(_fldif < -12 && _fldfor != 0 && _fldint >= c4 - 15 && o == 0)
                aLapisgazelleVulture(0);
            if(_fldvoid < 700)
                o = -1;
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
                o = 3 + _mthbyte();
            break;

        case 3: // '\003'
            char c2 = '\u0249';
            if(_fldint > c2)
                aLapisgazelleVulture(0);
            if(_fldint <= c2)
                aLapisgazelleVulture(3);
            if(_fldvoid <= 730)
                aLapisgazelleVulture(2);
            if(_fldvoid < 600)
                aLapisgazelleVulture(1);
            if(_fldvoid < 580)
                aLapisgazelleVulture(3);
            if(_fldvoid < 540)
                o = -1;
            // fall through

        case 4: // '\004'
            char c3 = '\u0249';
            if(_fldint > c3)
                aLapisgazelleVulture(0);
            if(_fldint <= c3)
                aLapisgazelleVulture(3);
            if(_fldvoid <= 755)
                aLapisgazelleVulture(2);
            if(_fldvoid < 600)
                aLapisgazelleVulture(1);
            if(_fldvoid < 580)
                aLapisgazelleVulture(3);
            if(_fldvoid < 540)
                o = -1;
            break;
        }
    }

    private int _mthbyte()
    {
        int i = 0;
        if(g < 200)
            i = 1;
        else
        if(g > 300)
            i = 0;
        if(Math.random() < 0.34999999999999998D)
            i = 1 - i;
        return i;
    }

    private int o;
}
