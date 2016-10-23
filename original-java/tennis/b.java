// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;

public class b extends e
{

    public b()
    {
        h = false;
        g = 850;
    }

    public String _mthif()
    {
        return "Silly Slime ";
    }

    public Color _mthdo()
    {
        return Color.green;
    }

    private int _mthif(int i)
    {
        return i * i;
    }

    public void a()
    {
        if(_fldbyte._mthdo() > 0)
        {
            a(3);
            return;
        }
        h = h || _fldlong == 950 && _fldif == 0;
        if(_fldlong == 50 && _fldif == 0)
            g = 850;
        byte byte0 = 100;
        int ai[] = new int[byte0];
        int ai1[] = new int[byte0];
        int ai2[] = new int[byte0];
        ai[0] = _fldlong;
        ai1[0] = _fldchar;
        ai2[0] = _fldbyte.d();
        Graphics g1 = _fldbyte.getGraphics();
        g1.setColor(Color.yellow);
        int i = _fldbyte.getWidth();
        int j = _fldbyte.getHeight();
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
            }
            ai[k] = _fldlong;
            ai1[k] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        byte byte1 = 25;
        a(3);
        boolean flag = false;
        if(h)
        {
            if(g != 990)
                g = 990;
            if(_fldchar < 130)
            {
                a(2);
                g = 850;
            }
            if(ai[1] < ai[0])
                h = false;
        } else
        {
            int ai3[] = new int[32];
            int ai4[] = new int[32];
            ai4[0] = ai3[0] = 0;
            ai4[1] = ai3[1] = 31;
            for(int i1 = 2; i1 < ai4.length; i1++)
            {
                ai3[i1] = ai3[i1 - 1] - 2;
                ai4[i1] = ai4[i1 - 1] + ai3[i1];
            }

            boolean flag1 = false;
            int k1 = 500;
            boolean flag2 = false;
            byte byte2 = 5;
            int l1 = 13;
            int i2 = 22;
            byte byte3 = 30;
            byte byte4 = 100;
            byte byte5 = 25;
            long l2 = System.currentTimeMillis();
            for(int j2 = 1; j2 < byte0 && System.currentTimeMillis() - l2 <= 15L; j2++)
            {
                if(ai2[j2] != 1)
                    continue;
                int k2 = (_fldint - 550) % 8;
                for(int i3 = 550 + k2; i3 <= 1050; i3 += 16)
                {
                    if(Math.abs(_fldint - i3) >= j2 * 8 || Math.abs(ai[j2] - _fldint) >= j2 * 8)
                        continue;
label0:
                    for(int j3 = 1; j3 < a(j2, ai4.length); j3++)
                    {
                        if(_fldfor > 0 && _fldfor != ai4[j3])
                            continue;
                        int k3 = 2 * (ai[j2 - 1] - i3);
                        int l3 = ai1[j2 - 1] - ai4[j3 - 1];
                        int i4 = (int)Math.sqrt(k3 * k3 + l3 * l3);
                        int j4 = 2 * (ai[j2] - i3);
                        int l4 = ai1[j2] - ai4[j3];
                        int j5 = (int)Math.sqrt(j4 * j4 + l4 * l4);
                        if(i4 <= byte4 + byte5 || j5 > byte4 + byte5 || l4 < 0 || l3 < 0)
                            continue;
                        _fldlong = ai[j2 - 1];
                        _fldchar = ai1[j2 - 1];
                        _flddo = ai[j2 - 1] - ai[j2 - 2];
                        _fldif = ai1[j2 - 1] - ai1[j2 - 2];
                        boolean flag3 = false;
                        do
                        {
                            if(flag3 && _flddo > 0)
                                continue label0;
                            _fldchar += --_fldif;
                            _fldlong += _flddo;
                            int k4 = 2 * (_fldlong - i3);
                            int i5 = _fldchar - ai4[j3];
                            int k5 = (int)Math.sqrt(k4 * k4 + i5 * i5);
                            int l5 = _flddo - -8;
                            int i6 = _fldif - ai3[j3];
                            if(i5 > 0 && k5 < byte4 + byte5 && k5 > byte2 && !flag3)
                            {
                                flag3 = true;
                                int j6 = (k4 * l5 + i5 * i6) / k5;
                                _fldlong = i3 + (((byte4 + byte5) / 2) * k4) / k5;
                                _fldchar = ai4[j3] + ((byte4 + byte5) * i5) / k5;
                                if(j6 <= 0)
                                {
                                    _flddo += -8 - (2 * k4 * j6) / k5;
                                    if(_flddo < -l1)
                                        _flddo = -l1;
                                    if(_flddo > l1)
                                        _flddo = l1;
                                    _fldif += ai3[j3] - (2 * i5 * j6) / k5;
                                    if(_fldif < -i2)
                                        _fldif = -i2;
                                    if(_fldif > i2)
                                        _fldif = i2;
                                }
                            }
                        } while(_fldchar >= 35);
                        if(_fldlong < 500 && _fldlong > 130 && _fldlong <= k1)
                        {
                            g = i3;
                            int j1 = j3;
                            flag2 = j2 == j3 + 1;
                            k1 = _fldlong;
                            int l = j2;
                        }
                    }

                }

            }

            if(flag2)
                a(2);
        }
        if(g < _fldint)
            a(0);
        else
        if(g > _fldint)
            a(1);
    }

    private int a(int i, int j)
    {
        return i >= j ? j : i;
    }

    final boolean f = false;
    boolean h;
    int g;
}
