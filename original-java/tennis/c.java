// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;

public class c extends e
{

    public c()
    {
        l = false;
        k = 850;
        j = new int[32];
        m = new int[32];
        m[0] = j[0] = 0;
        m[1] = j[1] = 29;
        for(int i1 = 2; i1 < m.length; i1++)
        {
            j[i1] = j[i1 - 1] - 2;
            m[i1] = m[i1 - 1] + j[i1];
        }

    }

    public String _mthif()
    {
        return "Mr Slime ";
    }

    public Color _mthdo()
    {
        return Color.red;
    }

    private int _mthdo(int i1)
    {
        return i1 * i1;
    }

    private int _mthif(int i1, int j1)
    {
        return i1 >= j1 ? j1 : i1;
    }

    public void a()
    {
        if(_fldbyte._mthdo() > 0)
        {
            a(3);
            return;
        }
        l = l || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
            k = 850;
        byte byte0 = 100;
        int ai[] = new int[byte0];
        int ai1[] = new int[byte0];
        int ai2[] = new int[byte0];
        ai[0] = _fldlong;
        ai1[0] = _fldchar;
        ai2[0] = _fldbyte.d();
        Graphics g = _fldbyte.getGraphics();
        g.setColor(Color.yellow);
        int i1 = _fldbyte.getWidth();
        int j1 = _fldbyte.getHeight();
        boolean flag = false;
        for(int k1 = 1; k1 < byte0; k1++)
        {
            _fldchar += --_fldif;
            _fldlong += _flddo;
            ai2[k1] = ai2[k1 - 1];
            if(_fldchar < 35)
            {
                _fldchar = 35;
                _fldif = (-_fldif * 3) / 5;
                ai2[k1]++;
                if(ai2[k1] == 1 && (_fldlong > 900 || _fldlong < 500))
                    flag = true;
            }
            ai[k1] = _fldlong;
            ai1[k1] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        a(3);
        if(l)
        {
            if(_fldint != 990)
                k = 990;
            if(_fldchar < 130)
            {
                a(2);
                k = 850;
            }
            if(ai[1] < ai[0])
                l = false;
        } else
        if(flag)
        {
            k = 806;
        } else
        {
            boolean flag1 = false;
            boolean flag2 = false;
            int j2 = 0;
            boolean flag3 = false;
            byte byte1 = 5;
            int k2 = 13;
            int l2 = 22;
            byte byte2 = 30;
            byte byte3 = 100;
            byte byte4 = 25;
            long l3 = System.currentTimeMillis();
label0:
            for(int i3 = 1; i3 < byte0; i3++)
            {
                if(ai2[i3] > 1)
                    continue;
                int j3 = 550 <= _fldint - i3 * 8 ? _fldint - i3 * 8 : 550;
                int k3 = 1050 >= _fldint + i3 * 8 ? _fldint + i3 * 8 : 1050;
                int i4 = (_fldint - j3) % 8;
                int j4 = j3 + i4;
                do
                {
                    if(j4 > k3)
                        continue label0;
                    int k4 = _mthif(i3, m.length);
label1:
                    for(int l4 = 1; l4 < k4; l4++)
                    {
                        if(_fldfor > 0 && _fldfor != m[l4])
                            continue;
                        int i5 = 2 * (ai[i3] - j4);
                        int k5 = ai1[i3] - m[l4];
                        int i6 = i5 * i5 + k5 * k5;
                        int j6 = 2 * (ai[i3 - 1] - j4);
                        int k6 = ai1[i3 - 1] - m[l4 - 1];
                        int l6 = j6 * j6 + k6 * k6;
                        if(i6 > _mthdo(byte3 + byte4) || k5 < 0 || k6 < 0)
                            continue;
                        _fldlong = ai[i3];
                        _fldchar = ai1[i3];
                        _flddo = ai[i3] - ai[i3 - 1];
                        _fldif = ai1[i3] - ai1[i3 - 1];
                        boolean flag4 = false;
                        int i7 = 0;
                        do
                        {
                            if(flag4 && _flddo > 0)
                                continue label1;
                            _fldchar += --_fldif;
                            _fldlong += _flddo;
                            int j5 = 2 * (_fldlong - j4);
                            int l5 = _fldchar - m[l4];
                            int j7 = (int)Math.sqrt(j5 * j5 + l5 * l5);
                            int k7 = _flddo - i7;
                            int l7 = _fldif - j[l4];
                            if(l5 > 0 && j7 < byte3 + byte4 && j7 > byte1 && !flag4)
                            {
                                flag4 = true;
                                int i8 = (j5 * k7 + l5 * l7) / j7;
                                _fldlong = j4 + (((byte3 + byte4) / 2) * j5) / j7;
                                _fldchar = m[l4] + ((byte3 + byte4) * l5) / j7;
                                if(i8 <= 0)
                                {
                                    _flddo += i7 - (2 * j5 * i8) / j7;
                                    if(_flddo < -k2)
                                        _flddo = -k2;
                                    if(_flddo > k2)
                                        _flddo = k2;
                                    _fldif += j[l4] - (2 * l5 * i8) / j7;
                                    if(_fldif < -l2)
                                        _fldif = -l2;
                                    if(_fldif > l2)
                                        _fldif = l2;
                                }
                            }
                        } while(_fldchar >= 35);
                        int j8 = (2 - ai2[i3]) * (500 - _fldlong);
                        if(_fldlong > 450 || _fldlong < 200)
                            j8 = 0;
                        if(j8 > j2)
                        {
                            k = j4;
                            int i2 = l4;
                            flag3 = _fldfor == 0 && i3 == l4 + 1;
                            j2 = j8;
                            int l1 = i3;
                        }
                    }

                    j4 += 8;
                } while(true);
            }

            if(flag3)
                a(2);
        }
        if(Math.abs(_fldint - k) < 8)
            a(3);
        else
        if(k < _fldint)
            a(0);
        else
        if(k > _fldint)
            a(1);
    }

    final boolean i = false;
    boolean l;
    int k;
    int j[];
    int m[];
}
