// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;

public class a extends e
{

    public a()
    {
        R = false;
        Q = 850;
        P = false;
        S = -1;
        O = new int[32];
        T = new int[32];
        T[0] = O[0] = 0;
        T[1] = O[1] = 29;
        for(int i = 2; i < T.length; i++)
        {
            O[i] = O[i - 1] - 2;
            T[i] = T[i - 1] + O[i];
        }

    }

    public String _mthif()
    {
        return "Agasslimey ";
    }

    public Color _mthdo()
    {
        return Color.white;
    }

    private int _mthelse(int i)
    {
        return i * i;
    }

    private int _mthnew(int i, int j)
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
        R = R || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
            Q = 850;
        byte byte0 = 100;
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
        if(R)
        {
            if(_fldint != 990)
                Q = 990;
            if(_fldchar < 130)
            {
                a(2);
                Q = 850;
            }
            if(ai[1] < ai[0])
                R = false;
        } else
        if(flag)
            Q = 806;
        else
        if(S >= -3 && S < 5)
        {
            if(S-- == 0)
                a(2);
            if(S < 0 && (_fldint < 900 || P))
                Q = 500;
        } else
        {
            byte byte1 = -1;
            int l = 0;
            do
            {
                if(l >= byte0 - 1)
                    break;
                if(ai2[l] == 0 && ai2[l + 1] == 1)
                {
                    S = l + 2;
                    Q = ai[l] + 100;
                    P = Math.random() < 0.5D;
                    break;
                }
                l++;
            } while(true);
        }
        if(Math.abs(_fldint - Q) < 8)
            a(3);
        else
        if(Q < _fldint)
            a(0);
        else
        if(Q > _fldint)
            a(1);
    }

    final boolean N = false;
    boolean R;
    int Q;
    boolean P;
    int O[];
    int T[];
    int S;
}
