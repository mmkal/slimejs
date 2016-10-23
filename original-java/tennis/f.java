// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 


public class f extends e
{

    public f()
    {
        v = -1;
    }

    private int _mthtry(int i)
    {
        return i * i;
    }

    private int _mthnew(int i)
    {
        int j = 0;
        int k = _fldchar;
        int l = _fldif;
        while((k += --l) > i) 
            j++;
        return j;
    }

    private int _mthint(int i)
    {
        int j = _mthnew(i);
        int k = _fldlong;
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

    public void a()
    {
        if(_fldlong < 500 && v != -1)
            v = -1;
        int i = _mthint(125);
        int j = _mthnew(125);
        int k;
        if(_fldfor != 0 && _fldint < 575)
            k = 0;
        else
            k = 25 + (int)(10D * Math.random());
        if(_flddo == 0 && _fldlong == 800 || v != -1)
        {
            if(v == -1)
            {
                if(e > 250)
                    v = 0;
                else
                    v = 1;
                if(Math.random() < 0.34999999999999998D)
                    v = (int)(2D * Math.random());
            }
            switch(v)
            {
            default:
                break;

            case 0: // '\0'
                if(_fldchar < 300 && _fldif < -3)
                {
                    a(1);
                    a(2);
                }
                break;

            case 1: // '\001'
                if(_fldchar < 300 && _fldif < 0)
                {
                    a(0);
                    a(2);
                }
                break;
            }
            return;
        }
        if(i < 500)
        {
            if(Math.abs(_fldint - 666) < 20)
                a(3);
            else
            if(_fldint > 666)
                a(0);
            else
            if(_fldint < 666)
                a(1);
            return;
        }
        if(Math.abs(_fldint - i) < k)
        {
            if(_fldfor != 0)
                return;
            if((_fldint >= 900 && _fldlong > 830 || _fldint <= 580 && _fldlong < 530) && Math.abs(_fldlong - _fldint) < 100)
                _mthfor();
            else
            if(_mthtry(_fldlong - _fldint) * 2 + _mthtry(_fldchar - _fldfor) < _mthtry(170) && _fldlong != _fldint)
                _mthfor();
            else
            if(_flddo * _flddo + _fldif * _fldif < 20 && _fldlong - _fldint < 30 && _fldlong != _fldint)
                _mthfor();
            else
            if(Math.abs(_fldlong - _fldint) < 150 && _fldchar > 50 && _fldchar < 400 && Math.random() < 0.66600000000000004D)
                _mthfor();
        }
        if(_fldfor == 0 && v == -1)
        {
            if(Math.abs(_fldint - i) < k)
                a(3);
            else
            if(i + k < _fldint)
                a(0);
            else
            if(i + k > _fldint)
                a(1);
        } else
        if(v == -1)
        {
            if(_fldint < 575)
                return;
            if(_fldint > 900)
            {
                a(1);
                return;
            }
            if(Math.abs(_fldint - _fldlong) < k)
                a(3);
            else
            if(_fldlong < _fldint)
                a(0);
            else
            if(_fldlong > _fldint)
                a(1);
        }
    }

    private void _mthfor()
    {
        if(Math.random() < 0.84999999999999998D)
            a(2);
    }

    private final double u = 0.84999999999999998D;
    private int v;
}
