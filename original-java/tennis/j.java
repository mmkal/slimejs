// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.awt.Color;
import java.awt.Graphics;
import java.io.PrintStream;

public class j extends e
{

    public j()
    {
        L = false;
        I = 850;
        K = false;
        J = 0;
        H = new int[32];
        M = new int[32];
        M[0] = H[0] = 0;
        M[1] = H[1] = 29;
        for(int i = 2; i < M.length; i++)
        {
            H[i] = H[i - 1] - 2;
            M[i] = M[i - 1] + H[i];
        }

    }

    public String _mthif()
    {
        return "Slimerer ";
    }

    public Color _mthdo()
    {
        return Color.red;
    }

    private int _mthchar(int i)
    {
        return i * i;
    }

    private int _mthint(int i, int k)
    {
        return i >= k ? k : i;
    }

    public void a()
    {
        if(_fldbyte._mthdo() > 0)
        {
            a(3);
            return;
        }
        L = L || _fldlong == 950 && _fldif == 0;
        if(L)
            K = false;
        if(_fldlong == 50 && _fldif == 0)
        {
            I = 850;
            K = false;
            J = 0;
        }
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
        int k = _fldbyte.getHeight();
        boolean flag = false;
        for(int l = 1; l < byte0; l++)
        {
            _fldchar += --_fldif;
            _fldlong += _flddo;
            ai2[l] = ai2[l - 1];
            if(_fldchar < 35)
            {
                _fldchar = 35;
                _fldif = (-_fldif * 3) / 5;
                ai2[l]++;
                if(ai2[l] == 1 && (_fldlong > 920 || _fldlong < 500 || _flddo < 0))
                    flag = true;
            }
            ai[l] = _fldlong;
            ai1[l] = _fldchar;
        }

        _fldlong = ai[0];
        _fldchar = ai1[0];
        a(3);
        if(L)
        {
            if(_fldint != 990)
                I = 990;
            if(_fldchar < 130)
            {
                a(2);
                I = 850;
            }
            if(ai[1] < ai[0])
                L = false;
        } else
        if(flag)
        {
            I = 806;
            K = false;
        } else
        {
            boolean flag1 = false;
            boolean flag2 = false;
            int k1 = 0;
            boolean flag3 = false;
            byte byte1 = 5;
            int l1 = 13;
            int i2 = 22;
            byte byte2 = 30;
            byte byte3 = 100;
            byte byte4 = 25;
            long l2 = System.currentTimeMillis();
            int ai3[];
            int i3;
            if(K)
            {
                int j2 = J - 5;
                if(j2 < 0)
                    j2 = 0;
                i3 = J + 5;
                if(i3 < 0)
                    i3 = 0;
                System.out.println("maxf=" + i3 + ", minf=" + j2);
                ai3 = new int[(i3 - j2) + 1];
                for(int j3 = 0; j3 < ai3.length; j3++)
                    ai3[j3] = j2 + j3;

                J--;
                I = 500;
                if(J <= 1)
                {
                    a(0);
                    K = false;
                    return;
                }
            } else
            {
                int k2 = 0;
                i3 = byte0 - 1;
                ai3 = new int[((i3 - k2) + 1) / 2];
                for(int k3 = 0; k3 < ai3.length; k3 += 2)
                    ai3[k3] = k2 + k3;

            }
            int l3 = 550 <= _fldint - i3 * 8 ? _fldint - i3 * 8 : 550;
            int i4 = 1050 >= _fldint + i3 * 8 ? _fldint + i3 * 8 : 1050;
            int j4 = (_fldint - l3) % 8;
            int ai4[] = new int[(i4 - l3) / 8 + 1];
            for(int k4 = 0; k4 < ai4.length; k4++)
                ai4[k4] = l3 + j4 + k4 * 8;

label0:
            for(int l4 = 1; l4 < ai3.length; l4++)
            {
                int i5 = ai3[l4];
                if(ai2[i5] > 1)
                    continue;
                int j5 = 0;
                do
                {
                    if(j5 >= ai4.length)
                        continue label0;
                    int k5 = ai4[j5];
                    boolean flag4 = true;
                    int l5 = _mthint(i5, M.length);
                    if(_fldfor > 0)
                    {
                        int i6 = ((flag4) ? 1 : 0);
                        do
                        {
                            if(i6 >= l5 - i5)
                                break;
                            if(M[i6] == _fldfor)
                            {
                                i6 += i5;
                                break;
                            }
                            i6++;
                        } while(true);
                    }
label1:
                    for(int j6 = ((flag4) ? 1 : 0); j6 < l5; j6++)
                    {
                        if(_fldfor > 0 && _fldfor != M[j6])
                            continue;
                        int k6 = 2 * (ai[i5] - k5);
                        int i7 = ai1[i5] - M[j6];
                        int k7 = k6 * k6 + i7 * i7;
                        if(k7 > _mthchar(byte3 + byte4) || i7 < 0)
                            continue;
                        _fldlong = ai[i5];
                        _fldchar = ai1[i5];
                        _flddo = ai[i5] - ai[i5 - 1];
                        _fldif = ai1[i5] - ai1[i5 - 1];
                        boolean flag5 = false;
                        int l7 = 0;
                        do
                        {
                            if(flag5 && _flddo > 0)
                                continue label1;
                            _fldchar += --_fldif;
                            _fldlong += _flddo;
                            int l6 = 2 * (_fldlong - k5);
                            int j7 = _fldchar - M[j6];
                            int i8 = (int)Math.sqrt(l6 * l6 + j7 * j7);
                            int j8 = _flddo - l7;
                            int k8 = _fldif - H[j6];
                            if(j7 > 0 && i8 < byte3 + byte4 && i8 > byte1 && !flag5)
                            {
                                flag5 = true;
                                int l8 = (l6 * j8 + j7 * k8) / i8;
                                _fldlong = k5 + (((byte3 + byte4) / 2) * l6) / i8;
                                _fldchar = M[j6] + ((byte3 + byte4) * j7) / i8;
                                if(l8 <= 0)
                                {
                                    _flddo += l7 - (2 * l6 * l8) / i8;
                                    if(_flddo < -l1)
                                        _flddo = -l1;
                                    if(_flddo > l1)
                                        _flddo = l1;
                                    _fldif += H[j6] - (2 * j7 * l8) / i8;
                                    if(_fldif < -i2)
                                        _fldif = -i2;
                                    if(_fldif > i2)
                                        _fldif = i2;
                                }
                            }
                        } while(_fldchar >= 35);
                        int i9 = (2 - ai2[i5]) * (500 - _fldlong) - i5;
                        if(_fldlong > 450 || _fldlong < 100)
                            i9 = 0;
                        if(i9 <= k1)
                            continue;
                        I = k5;
                        int j1 = j6;
                        flag3 = _fldfor == 0 && i5 == j6 + 1;
                        k1 = i9;
                        int i1 = i5;
                        if(!K)
                        {
                            J = i5;
                            K = true;
                            System.out.print("bestscore=" + k1);
                            System.out.print(",p2dX=" + Math.abs(_fldint - I) % 8);
                            System.out.print(",bestX=" + I);
                            System.out.print(",bestYind=" + j1);
                            System.out.print(",bestFrame=" + i1);
                            System.out.println();
                        }
                    }

                    j5++;
                } while(true);
            }

            if(flag3)
                a(2);
        }
        if(Math.abs(_fldint - I) < 8)
            a(3);
        else
        if(I < _fldint)
            a(0);
        else
        if(I > _fldint)
            a(1);
    }

    final boolean G = false;
    boolean L;
    int I;
    boolean K;
    int J;
    int H[];
    int M[];
}
