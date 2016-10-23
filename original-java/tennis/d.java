// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;
import java.io.PrintStream;

public class d extends e
{

    public d()
    {
        r = false;
        q = 850;
        p = false;
        s = -1;
        o = new int[16];
        t = new int[16];
        t[0] = o[0] = 0;
        t[1] = o[1] = 29;
        for(int i = 2; i < t.length; i++)
        {
            o[i] = o[i - 1] - 2;
            t[i] = t[i - 1] + o[i];
        }

    }

    public String _mthif()
    {
        return "\"C'mon!\" Slime ";
    }

    public Color _mthdo()
    {
        return Color.yellow;
    }

    private int _mthfor(int i)
    {
        return i * i;
    }

    private int _mthdo(int i, int j)
    {
        return i >= j ? j : i;
    }

    public void a()
    {
        if(_fldbyte._mthdo() > 0)
        {
            a(3);
            return;
        }
        r = r || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
            q = 850;
        byte byte0 = 40;
        int ai[] = new int[byte0];
        int ai1[] = new int[byte0];
        int ai2[] = new int[byte0];
        ai[0] = _fldlong;
        ai1[0] = _fldchar;
        ai2[0] = _fldbyte.d();
        Graphics g = _fldbyte.getGraphics();
        g.setColor(Color.yellow);
        int i = _fldbyte.getWidth();
        int j = _fldbyte.getHeight();
        boolean flag = false;
        for(int k = 1; k < byte0; k++)
        {
            _fldchar += --_fldif;
            _fldlong += _flddo;
            ai2[k] = ai2[k - 1];
            if(_fldchar < 35)
            {
                _fldchar = 35;
                _fldif = (-_fldif * 3) / 5;
                ai2[k]++;
                if(ai2[k] == 1 && (_fldlong > 900 || _fldlong < 500 || _flddo < 0))
                    flag = true;
            }
            ai[k] = _fldlong;
            ai1[k] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        a(3);
        q = 850;
        if(r)
        {
            if(_fldint != 994)
                q = 994;
            if(_fldchar < 130)
            {
                a(2);
                q = 850;
            }
            if(ai[1] < ai[0])
                r = false;
        } else
        if(flag)
            q = 806;
        else
        if(s >= 0)
        {
            System.out.println("" + s);
            if(s-- <= 0)
                a(2);
        } else
        {
            byte byte1 = -1;
            int j1 = 0;
            do
            {
                if(j1 >= byte0 - 1)
                    break;
                if(ai[j1] <= 800 && ai[j1 + 1] > 800)
                {
                    if(ai[j1] == 800)
                        System.out.println(800);
                    int k1 = ai1[j1];
                    int l1 = 1;
                    do
                    {
                        if(l1 >= t.length - 1)
                            break;
                        if(k1 > t[l1 - 1] && k1 < t[l1] + 125)
                        {
                            int l = j1 - l1 - 2;
                            if(l == 0)
                                a(2);
                            break;
                        }
                        int i1 = j1 - ai1.length - 1;
                        l1++;
                    } while(true);
                    break;
                }
                j1++;
            } while(true);
        }
        if(Math.abs(_fldint - q) < 8)
            a(3);
        else
        if(q < _fldint)
            a(0);
        else
        if(q > _fldint)
            a(1);
    }

    final boolean n = false;
    boolean r;
    int q;
    boolean p;
    int o[];
    int t[];
    int s;
}
