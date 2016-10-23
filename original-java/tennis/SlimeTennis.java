// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.applet.Applet;
import java.applet.AppletContext;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.PrintStream;
import java.net.URL;
import java.util.Vector;

public class SlimeTennis extends Applet
    implements Runnable
{

    public SlimeTennis()
    {
        courtTypeSelected = 0;
        courtColours = (new Color[] {
            Color.gray, new Color(0, 180, 0), new Color(180, 60, 0)
        });
        gameLengthSelected = 0;
        slimeColours = (new Color[] {
            Color.red, Color.white, Color.yellow, Color.black, Color.green, Color.blue
        });
        loserText1 = (new String[] {
            "Game, set, and match.", "That's the end of the road for you.", "You're not the only one to crash out at this stage.", slimeColText[4] + "laughs at the pathetic slow opposition.", slimeColText[5] + "devours you!"
        });
        SKY_COL = new Color(80, 80, 255);
        BALL_COL = Color.yellow;
        gamesToWin = 3;
        aiMode = 0;
        menuSelectBoundsHorizontal = new int[4];
        menuSelectBoundsVertical = new int[6];
        menuOK = new int[4];
        boundsP1select = new int[4];
        boundsP2select = new int[4];
        oneplayer = true;
        ballRad = 25;
        buffered = false;
    }

    public int d()
    {
        return nBounces;
    }

    public int _mthdo()
    {
        return nFramesUntilStop;
    }

    public void init()
    {
        String s = getDocumentBase().getHost();
        if(!s.equals("slimetennis.com"))
        {
            try
            {
                getAppletContext().showDocument(new URL("http://slimetennis.com/"), "_self");
            }
            catch(Exception exception) { }
            throw new RuntimeException("Couldn't initialise - server data missing.");
        }
        System.out.println("Slime Tennis: http://slimetennis.com/");
        Object obj = new b();
        obj = new d();
        obj = new a();
        obj = new j();
        obj = new h();
        replayData = new int[1000][8];
        nWidth = size().width;
        nHeight = size().height;
        fInPlay = fEndGame = false;
        promptMsg = "Click the mouse to play!";
        buffer = new BufferedImage(nWidth, nHeight, 1);
        scoreBuffer = new BufferedImage(nWidth, nHeight, 1);
        fInPlay = fEndGame = false;
        promptMsg = "Click the mouse to play!";
        if(buffered)
            screen = buffer.getGraphics();
        else
            screen = getGraphics();
        screen.setFont(new Font(screen.getFont().getName(), 1, 15));
        p1Col = 0;
        p2Col = 1;
        p1Run = 8;
        p1Jump = 31;
        p1Diam = 70;
        gameScore = 0;
        courtTypeSelected = 0;
        COURT_COL = Color.gray;
        gameOver = true;
        paused = false;
        _mthtry();
        _mthint();
        redrawRegions = new Vector(0);
        b();
        repaint();
    }

    private void _mthtry()
    {
        nP1PointsWon = nP2PointsWon = 0;
        nP1GamesWon = nP2GamesWon = 0;
        nFaults = 0;
        mousePressed = false;
        p1Diam = p2Diam = 100;
        p2Run = 8;
        p2Jump = 31;
        if(!oneplayer)
            aiMode = 0;
        SCOREBOX_COL = new Color(0, 0, 122);
        switch(aiMode)
        {
        case 0: // '\0'
        default:
            ai = new b();
            break;

        case 1: // '\001'
            ai = new d();
            break;

        case 2: // '\002'
            ai = new h();
            break;

        case 3: // '\003'
            ai = new a();
            break;
        }
        if(oneplayer)
            p2Col = aiMode + 1;
        else
            p2Col = p1Col + 1;
        ai.a(this, 2);
    }

    public void update(Graphics g1)
    {
        if(buffered)
            g1.drawImage(buffer, 0, 0, null);
        else
            b();
        redrawRegions = new Vector(0);
    }

    public void paint(Graphics g1)
    {
        update(g1);
    }

    private int _mthif(int i1, int j1)
    {
        return i1 >= j1 ? j1 : i1;
    }

    private int a(int i1, int j1)
    {
        return i1 <= j1 ? j1 : i1;
    }

    private void b()
    {
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        nWidth = size().width;
        nHeight = size().height;
        g1.setColor(SKY_COL);
        g1.fillRect(0, 0, nWidth, (nHeight * 4) / 5);
        g1.setColor(COURT_COL);
        g1.fillRect(0, (nHeight * 4) / 5, nWidth, nHeight / 5);
        g1.setColor(Color.white);
        g1.fillRect(nWidth / 2 - 2, (nHeight * 7) / 10, 4, nHeight / 10 + 5);
        g1.fillRect(nWidth / 10, (nHeight * 4) / 5 + 5, (nWidth * 4) / 5, 5);
        g1.fillRect(nWidth / 10, (nHeight * 4) / 5, 5, 10);
        g1.fillRect((nWidth * 9) / 10 - 5, (nHeight * 4) / 5, 5, 10);
        g1.fillRect((nWidth * 3) / 10, (nHeight * 4) / 5, 5, 10);
        g1.fillRect((nWidth * 7) / 10 - 5, (nHeight * 4) / 5, 5, 10);
        g1.fillRect((nWidth * 3) / 10, (nHeight * 4) / 5, (nWidth * 2) / 5, 2);
        FontMetrics fontmetrics = g1.getFontMetrics();
        if(gameOver)
        {
            screen.setColor(Color.white);
            Font font = g1.getFont();
            g1.setFont(screen.getFont());
            String s = "Slime Tennis!";
            g1.drawString(s, nWidth / 4 - screen.getFontMetrics().stringWidth(s) / 2, nHeight / 3 - fontmetrics.getHeight());
            g1.setFont(font);
            g1.setColor(Color.white);
            s = "Written by Quin Pendragon and Daniel Wedge";
            g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + fontmetrics.getHeight() * 2);
            s = "http://slimetennis.com/";
            g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + (fontmetrics.getHeight() * 7) / 2);
            s = "Last updated: 8th October 2007";
            g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + fontmetrics.getHeight() * 5);
            fontmetrics = screen.getFontMetrics();
            screen.setColor(Color.white);
            byte byte0 = 20;
            menuSelectBoundsHorizontal[0] = menuSelectBoundsHorizontal[1] = menuSelectBoundsHorizontal[2] = menuSelectBoundsHorizontal[3] = (nWidth * 3) / 4;
            s = playerSelectText[oneplayer ? 0 : 1];
            menuSelectBoundsHorizontal[1] = _mthif(menuSelectBoundsHorizontal[1], (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - byte0);
            menuSelectBoundsHorizontal[0] = _mthif(menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1] - byte0);
            menuSelectBoundsHorizontal[2] = a(menuSelectBoundsHorizontal[2], (nWidth * 3) / 4 + fontmetrics.stringWidth(s) / 2 + byte0);
            menuSelectBoundsHorizontal[3] = a(menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2] + byte0);
            menuSelectBoundsVertical[0] = nHeight / 3 - fontmetrics.getHeight() * 3;
            menuSelectBoundsVertical[1] = menuSelectBoundsVertical[0] + fontmetrics.getHeight();
            screen.drawString(s, (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2, menuSelectBoundsVertical[0] + fontmetrics.getAscent());
            s = courtTypeSelectText[courtTypeSelected];
            menuSelectBoundsHorizontal[1] = _mthif(menuSelectBoundsHorizontal[1], (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - byte0);
            menuSelectBoundsHorizontal[0] = _mthif(menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1] - byte0);
            menuSelectBoundsHorizontal[2] = a(menuSelectBoundsHorizontal[2], (nWidth * 3) / 4 + fontmetrics.stringWidth(s) / 2 + byte0);
            menuSelectBoundsHorizontal[3] = a(menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2] + byte0);
            menuSelectBoundsVertical[2] = nHeight / 3;
            menuSelectBoundsVertical[3] = menuSelectBoundsVertical[2] + fontmetrics.getHeight();
            screen.drawString(s, (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2, menuSelectBoundsVertical[2] + fontmetrics.getAscent());
            s = gameLengthSelectText[gameLengthSelected];
            menuSelectBoundsHorizontal[1] = _mthif(menuSelectBoundsHorizontal[1], (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - byte0);
            menuSelectBoundsHorizontal[0] = _mthif(menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1] - byte0);
            menuSelectBoundsHorizontal[2] = a(menuSelectBoundsHorizontal[2], (nWidth * 3) / 4 + fontmetrics.stringWidth(s) / 2 + byte0);
            menuSelectBoundsHorizontal[3] = a(menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2] + byte0);
            menuSelectBoundsVertical[4] = nHeight / 3 + fontmetrics.getHeight() * 3;
            menuSelectBoundsVertical[5] = menuSelectBoundsVertical[4] + fontmetrics.getHeight();
            screen.drawString(s, (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2, menuSelectBoundsVertical[4] + fontmetrics.getAscent());
            screen.setColor(Color.white);
            screen.fillRect(menuSelectBoundsHorizontal[0] - 1, menuSelectBoundsVertical[0] - 1, byte0 + 2, (menuSelectBoundsVertical[1] - menuSelectBoundsVertical[0]) + 2);
            screen.fillRect(menuSelectBoundsHorizontal[0] - 1, menuSelectBoundsVertical[2] - 1, byte0 + 2, (menuSelectBoundsVertical[3] - menuSelectBoundsVertical[2]) + 2);
            screen.fillRect(menuSelectBoundsHorizontal[0] - 1, menuSelectBoundsVertical[4] - 1, byte0 + 2, (menuSelectBoundsVertical[5] - menuSelectBoundsVertical[4]) + 2);
            screen.setColor(SKY_COL);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1], menuSelectBoundsHorizontal[1]
            }, new int[] {
                (menuSelectBoundsVertical[0] + menuSelectBoundsVertical[1]) / 2, menuSelectBoundsVertical[0], menuSelectBoundsVertical[1]
            }, 3);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1], menuSelectBoundsHorizontal[1]
            }, new int[] {
                (menuSelectBoundsVertical[2] + menuSelectBoundsVertical[3]) / 2, menuSelectBoundsVertical[2], menuSelectBoundsVertical[3]
            }, 3);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[0], menuSelectBoundsHorizontal[1], menuSelectBoundsHorizontal[1]
            }, new int[] {
                (menuSelectBoundsVertical[4] + menuSelectBoundsVertical[5]) / 2, menuSelectBoundsVertical[4], menuSelectBoundsVertical[5]
            }, 3);
            screen.setColor(Color.white);
            screen.fillRect(menuSelectBoundsHorizontal[2] - 1, menuSelectBoundsVertical[0] - 1, byte0 + 2, (menuSelectBoundsVertical[1] - menuSelectBoundsVertical[0]) + 2);
            screen.fillRect(menuSelectBoundsHorizontal[2] - 1, menuSelectBoundsVertical[2] - 1, byte0 + 2, (menuSelectBoundsVertical[3] - menuSelectBoundsVertical[2]) + 2);
            screen.fillRect(menuSelectBoundsHorizontal[2] - 1, menuSelectBoundsVertical[4] - 1, byte0 + 2, (menuSelectBoundsVertical[5] - menuSelectBoundsVertical[4]) + 2);
            screen.setColor(SKY_COL);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2], menuSelectBoundsHorizontal[2]
            }, new int[] {
                (menuSelectBoundsVertical[0] + menuSelectBoundsVertical[1]) / 2, menuSelectBoundsVertical[0], menuSelectBoundsVertical[1]
            }, 3);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2], menuSelectBoundsHorizontal[2]
            }, new int[] {
                (menuSelectBoundsVertical[2] + menuSelectBoundsVertical[3]) / 2, menuSelectBoundsVertical[2], menuSelectBoundsVertical[3]
            }, 3);
            screen.fillPolygon(new int[] {
                menuSelectBoundsHorizontal[3], menuSelectBoundsHorizontal[2], menuSelectBoundsHorizontal[2]
            }, new int[] {
                (menuSelectBoundsVertical[4] + menuSelectBoundsVertical[5]) / 2, menuSelectBoundsVertical[4], menuSelectBoundsVertical[5]
            }, 3);
            screen.setColor(Color.white);
            s = "Start game!";
            menuOK[0] = (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - byte0;
            menuOK[1] = nHeight / 3 + fontmetrics.getHeight() * 5;
            menuOK[2] = menuOK[0] + fontmetrics.stringWidth(s) + byte0 * 2;
            menuOK[3] = menuOK[1] + fontmetrics.getHeight() * 2;
            screen.fillRect(menuOK[0], menuOK[1], menuOK[2] - menuOK[0], menuOK[3] - menuOK[1]);
            screen.setColor(SKY_COL);
            screen.drawString(s, menuOK[0] + byte0, menuOK[1] + fontmetrics.getAscent());
            if(!replaying)
            {
                _mthlong();
                _mthcase();
            }
        } else
        if(!fInPlay)
        {
            g1.setColor(Color.white);
            String s1 = ai._mthif() + "is no match for you... prepare for your next challenge!";
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 2 - fontmetrics.getHeight());
            g1.setFont(screen.getFont());
            fontmetrics = screen.getFontMetrics();
            s1 = "Level " + (aiMode + 1) + " clear!";
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 3);
            s1 = "Click the mouse to continue...";
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, (nHeight * 4) / 5 + fontmetrics.getHeight() + 10);
        } else
        {
            _mthlong();
        }
    }

    private void _mthfor()
    {
        if(!buffered)
        {
            redrawRegions.removeAllElements();
            return;
        }
        for(int i1 = 0; i1 < redrawRegions.size(); i1++)
        {
            int ai1[] = (int[])(int[])redrawRegions.get(i1);
            int j1 = ai1[0];
            int k1 = ai1[1];
            int l1 = ai1[2];
            int i2 = ai1[3];
            if(j1 < 0)
                j1 = 0;
            if(l1 > nWidth)
                l1 = nWidth - 1;
            if(k1 < 0)
                k1 = 0;
            if(i2 > nHeight)
                i2 = nHeight - 1;
            int j2 = l1 - j1;
            int k2 = i2 - k1;
            if(j2 > 0 && k2 > 0)
            {
                BufferedImage bufferedimage = buffer.getSubimage(j1, k1, j2, k2);
                getGraphics().drawImage(bufferedimage, j1, k1, null);
            }
        }

        redrawRegions.removeAllElements();
    }

    private void _mthint()
    {
        p1X = 50;
        p1Y = 0;
        p2X = 950;
        p2Y = 0;
        p1XV = 0;
        p1YV = 0;
        p2XV = 0;
        p2YV = 0;
        ballX = (nP1GamesWon + nP2GamesWon) % 2 != 0 ? 950 : 50;
        ballY = 400;
        ballVX = 0;
        ballVY = 0;
        topSpin = 0;
        lastPlayerToTouch = 0;
        nBounces = 0;
        nFramesSinceSpin = 0;
        hitNetSinceTouched = false;
        fServerMoved = fP1Touched = fP2Touched = false;
        repaint();
        promptMsg = "";
        nFramesUntilStop = -1;
        replayStart = replayIndex = 0;
        replaying = false;
    }

    public boolean handleEvent(Event event)
    {
label0:
        switch(event.id)
        {
        default:
            break;

        case 503: // Event.MOUSE_MOVE
            showStatus("Slime Tennis: http://slimetennis.com/");
            break;

        case 501: // Event.MOUSE_DOWN
            if(gameOver)
                if(event.x > menuOK[0] && event.y > menuOK[1] && event.x < menuOK[2] && event.y < menuOK[3])
                {
                    gamesToWin = gameLengths[gameLengthSelected];
                    COURT_COL = courtColours[courtTypeSelected];
                } else
                {
                    if(event.x > menuSelectBoundsHorizontal[0] && event.x < menuSelectBoundsHorizontal[1])
                    {
                        if(event.y > menuSelectBoundsVertical[0] && event.y < menuSelectBoundsVertical[1])
                            oneplayer = !oneplayer;
                        else
                        if(event.y > menuSelectBoundsVertical[2] && event.y < menuSelectBoundsVertical[3])
                            courtTypeSelected = (courtTypeSelected + 1) % courtTypes.length;
                        else
                        if(event.y > menuSelectBoundsVertical[4] && event.y < menuSelectBoundsVertical[5])
                            gameLengthSelected = (gameLengthSelected + 1) % gameLengths.length;
                        b();
                        repaint();
                        break;
                    }
                    if(event.x <= menuSelectBoundsHorizontal[2] || event.x >= menuSelectBoundsHorizontal[3])
                        break;
                    if(event.y > menuSelectBoundsVertical[0] && event.y < menuSelectBoundsVertical[1])
                        oneplayer = !oneplayer;
                    else
                    if(event.y > menuSelectBoundsVertical[2] && event.y < menuSelectBoundsVertical[3])
                        courtTypeSelected = ((courtTypeSelected - 1) + courtTypes.length) % courtTypes.length;
                    else
                    if(event.y > menuSelectBoundsVertical[4] && event.y < menuSelectBoundsVertical[5])
                        gameLengthSelected = ((gameLengthSelected - 1) + gameLengths.length) % gameLengths.length;
                    b();
                    repaint();
                    break;
                }
            mousePressed = true;
            if(fInPlay)
                break;
            fEndGame = false;
            fInPlay = true;
            promptMsg = "";
            if(nP1GamesWon + nP2GamesWon > 0)
                if(aiMode < 3)
                    aiMode++;
                else
                    aiMode = 0;
            if(gameOver)
            {
                aiMode = 0;
                gameOver = false;
                gameScore = 0;
            }
            _mthtry();
            repaint();
            ballX = 50;
            gameThread = new Thread(this);
            gameThread.start();
            break;

        case 401: // Event.KEY_PRESS
        case 403: // Event.KEY_ACTION
            switch(event.key)
            {
            default:
                break;

            case 65: // 'A'
            case 97: // 'a'
                e();
                break label0;

            case 68: // 'D'
            case 100: // 'd'
                c();
                break label0;

            case 87: // 'W'
            case 119: // 'w'
                _mthelse();
                break label0;

            case 83: // 'S'
            case 115: // 's'
                do
                    p1Col = (p1Col + 1) % slimeColours.length;
                while(p1Col == p2Col);
                break label0;

            case 1006: 
                if(oneplayer)
                    e();
                else
                    g();
                break label0;

            case 1007: 
                if(oneplayer)
                    c();
                else
                    l();
                break label0;

            case 1004: 
                if(oneplayer)
                    _mthelse();
                else
                    _mthvoid();
                break label0;

            case 74: // 'J'
            case 106: // 'j'
                if(!oneplayer)
                    g();
                break label0;

            case 76: // 'L'
            case 108: // 'l'
                if(!oneplayer)
                    l();
                break label0;

            case 73: // 'I'
            case 105: // 'i'
                if(!oneplayer)
                    _mthvoid();
                break label0;

            case 75: // 'K'
            case 107: // 'k'
            case 1005: 
                if(oneplayer)
                    break label0;
                do
                    p2Col = (p2Col + 1) % slimeColours.length;
                while(p1Col == p2Col);
                break label0;

            case 67: // 'C'
            case 99: // 'c'
                if(gameOver)
                {
                    fEndGame = false;
                    fInPlay = true;
                    promptMsg = "";
                    gameOver = false;
                    gameScore = 0;
                    _mthtry();
                    _mthint();
                    repaint();
                    gameThread = new Thread(this);
                    gameThread.start();
                }
                break label0;

            case 80: // 'P'
            case 112: // 'p'
                if(!paused)
                {
                    pausedTime = System.currentTimeMillis();
                    paused = true;
                } else
                {
                    startTime += System.currentTimeMillis() - pausedTime;
                    paused = false;
                }
                break label0;

            case 79: // 'O'
            case 111: // 'o'
                if(!paused)
                {
                    pausedTime = System.currentTimeMillis();
                    try
                    {
                        getAppletContext().showDocument(new URL("http://oneslime.net/boss/launch.html"), "_blank");
                    }
                    catch(Exception exception)
                    {
                        System.out.println(exception);
                    }
                    paused = true;
                } else
                {
                    startTime += System.currentTimeMillis() - pausedTime;
                    paused = false;
                }
                break label0;

            case 66: // 'B'
            case 98: // 'b'
                buffered = !buffered;
                if(buffered)
                    screen = buffer.getGraphics();
                else
                    screen = getGraphics();
                screen.setFont(new Font(screen.getFont().getName(), 1, 15));
                b();
                break;

            case 32: // ' '
                mousePressed = true;
                break;
            }
            break;

        case 402: // Event.KEY_RELEASE
        case 404: // Event.KEY_ACTION_RELEASE
            switch(event.key)
            {
            default:
                break label0;

            case 65: // 'A'
            case 97: // 'a'
                if(p1XV < 0)
                    _mthbyte();
                break label0;

            case 68: // 'D'
            case 100: // 'd'
                if(p1XV > 0)
                    _mthbyte();
                break label0;

            case 1006: 
                if(oneplayer && p1XV < 0)
                {
                    _mthbyte();
                    break label0;
                }
                if(!oneplayer && p2XV < 0)
                    _mthgoto();
                break label0;

            case 1007: 
                if(oneplayer && p1XV > 0)
                {
                    _mthbyte();
                    break label0;
                }
                if(!oneplayer && p2XV > 0)
                    _mthgoto();
                break label0;

            case 74: // 'J'
            case 106: // 'j'
                if(p2XV < 0)
                    _mthgoto();
                break label0;

            case 76: // 'L'
            case 108: // 'l'
                break;
            }
            if(p2XV > 0)
                _mthgoto();
            break;
        }
        return false;
    }

    public void e()
    {
        p1XV = -p1Run;
        if(p1X == 50 && ballX == 50 && !fP2Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void c()
    {
        p1XV = p1Run;
        if(p1X == 50 && ballX == 50 && !fP2Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void _mthbyte()
    {
        p1XV = 0;
    }

    public void _mthelse()
    {
        if(p1Y == 0)
            p1YV = p1Jump;
    }

    public void g()
    {
        p2XV = -p2Run;
        if(p2X == 950 && ballX == 950 && !fP1Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void l()
    {
        p2XV = p2Run;
        if(p2X == 950 && ballX == 950 && !fP1Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void _mthgoto()
    {
        p2XV = 0;
    }

    public void _mthvoid()
    {
        if(p2Y == 0)
            p2YV = p2Jump;
    }

    private void f()
    {
        if(!oneplayer)
        {
            return;
        } else
        {
            int ai1[] = {
                ballX, ballY, ballVX, ballVY, p1X, p1Y, p1XV, p1YV, p2X, p2Y, 
                p2XV, p2YV
            };
            ai.a(ai1);
            ai.a();
            return;
        }
    }

    private void k()
    {
        f();
        p1X += p1XV;
        if(p1X < -p1Diam / 4)
            p1X = -p1Diam / 4;
        if(p1X > 495 - p1Diam / 2)
            p1X = 495 - p1Diam / 2;
        if(!fP1Touched && nBounces == 0 && p1X > 200 - p1Diam / 2)
            p1X = 200 - p1Diam / 2;
        if(p1YV != 0)
        {
            p1Y += p1YV -= 2;
            if(p1Y < 0)
            {
                p1Y = 0;
                p1YV = 0;
            }
        }
        p2X += p2XV;
        if(p2X > 1000 + p2Diam / 4)
            p2X = 1000 + p2Diam / 4;
        if(p2X < 505 + p2Diam / 2)
            p2X = 505 + p2Diam / 2;
        if(!fP2Touched && nBounces == 0 && p2X < 800 + p2Diam / 2)
            p2X = 800 + p2Diam / 2;
        if(p2YV != 0)
        {
            p2Y += p2YV -= 2;
            if(p2Y < 0)
            {
                p2Y = 0;
                p2YV = 0;
            }
        }
    }

    private void _mthif()
    {
        int ai1[] = new int[4];
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        byte byte0 = 5;
        int i1 = ((ballRad + byte0) * nHeight) / 1000;
        int j1 = (ballOldX * nWidth) / 1000;
        int k1 = (4 * nHeight) / 5 - (ballOldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(j1 - i1, k1 - i1, 2 * i1, 2 * i1);
        int l1 = j1;
        int i2 = k1;
        int j2 = (nWidth * p1Diam) / 1000;
        int k2 = (nHeight * p1Diam) / 1000;
        int l2 = (p1OldX * nWidth) / 1000 - j2 / 2;
        int i3 = (4 * nHeight) / 5 - k2 - (p1OldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(l2, i3, j2, k2);
        ai1[0] = l2;
        ai1[1] = i3;
        ai1[2] = l2 + j2;
        ai1[3] = i3 + k2;
        int j3 = l2;
        int k3 = i3;
        j2 = (nWidth * p1Diam) / 1000;
        k2 = (nHeight * p1Diam) / 1000;
        l2 = (p1X * nWidth) / 1000 - j2 / 2;
        i3 = (4 * nHeight) / 5 - k2 - (p1Y * nHeight) / 1000;
        g1.setColor(slimeColours[p1Col]);
        g1.fillArc(l2, i3, j2, 2 * k2, 0, 180);
        if(l2 < ai1[0])
            ai1[0] = l2;
        if(i3 < ai1[1])
            ai1[1] = i3;
        if(l2 + j2 > ai1[2])
            ai1[2] = l2 + j2;
        if(i3 + k2 > ai1[3])
            ai1[3] = i3 + k2;
        redrawRegions.add(ai1);
        int l3 = p1X + (38 * p1Diam) / 100;
        int i4 = p1Y - (60 * p1Diam) / 100;
        l2 = (l3 * nWidth) / 1000;
        i3 = (4 * nHeight) / 5 - k2 - (i4 * nHeight) / 1000;
        int j4 = l2 - j1;
        if(j4 == 0)
            j4 = 1;
        int k4 = i3 - k1;
        if(k4 == 0)
            k4 = 1;
        int l4 = (int)Math.sqrt(j4 * j4 + k4 * k4);
        int i5 = ((nWidth / 50) * p1Diam) / 100;
        int j5 = ((nHeight / 25) * p1Diam) / 100;
        g1.setColor(Color.white);
        g1.fillOval(l2 - i5, i3 - j5, i5, j5);
        g1.setColor(Color.black);
        g1.fillOval(l2 - (4 * j4) / l4 - (3 * i5) / 4, i3 - (4 * k4) / l4 - (3 * j5) / 4, i5 / 2, j5 / 2);
        j2 = (nWidth * p2Diam) / 1000;
        k2 = (nHeight * p2Diam) / 1000;
        l2 = (p2OldX * nWidth) / 1000 - j2 / 2;
        i3 = (4 * nHeight) / 5 - k2 - (p2OldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(l2, i3, j2, k2);
        ai1 = new int[4];
        ai1[0] = l2;
        ai1[1] = i3;
        ai1[2] = l2 + j2;
        ai1[3] = i3 + k2;
        j2 = (nWidth * p2Diam) / 1000;
        k2 = (nHeight * p2Diam) / 1000;
        l2 = (p2X * nWidth) / 1000 - j2 / 2;
        i3 = (4 * nHeight) / 5 - (p2Diam * nHeight) / 1000 - (p2Y * nHeight) / 1000;
        g1.setColor(oneplayer ? ai._mthdo() : slimeColours[p2Col]);
        j3 = l2;
        k3 = i3;
        if(l2 < ai1[0])
            ai1[0] = l2;
        if(i3 < ai1[1])
            ai1[1] = i3;
        if(l2 + j2 > ai1[2])
            ai1[2] = l2 + j2;
        if(i3 + k2 > ai1[3])
            ai1[3] = i3 + k2;
        redrawRegions.add(ai1);
        g1.fillArc(l2, i3, j2, 2 * k2, 0, 180);
        l3 = p2X - (18 * p2Diam) / 100;
        i4 = p2Y - (60 * p2Diam) / 100;
        l2 = (l3 * nWidth) / 1000;
        i3 = (4 * nHeight) / 5 - k2 - (i4 * nHeight) / 1000;
        j4 = l2 - j1;
        if(j4 == 0)
            j4 = 1;
        k4 = i3 - k1;
        if(k4 == 0)
            k4 = 1;
        l4 = (int)Math.sqrt(j4 * j4 + k4 * k4);
        i5 = ((nWidth / 50) * p2Diam) / 100;
        j5 = ((nHeight / 25) * p2Diam) / 100;
        g1.setColor(Color.white);
        g1.fillOval(l2 - i5, i3 - j5, i5, j5);
        g1.setColor(Color.black);
        g1.fillOval(l2 - (4 * j4) / l4 - (3 * i5) / 4, i3 - (4 * k4) / l4 - (3 * j5) / 4, i5 / 2, j5 / 2);
        j1 = (ballX * nWidth) / 1000;
        k1 = (4 * nHeight) / 5 - (ballY * nHeight) / 1000;
        g1.setColor(BALL_COL);
        g1.fillOval(j1 - i1, k1 - i1, 2 * i1, 2 * i1);
        ai1 = new int[4];
        ai1[0] = l1 - i1;
        ai1[1] = i2 - i1;
        ai1[2] = l1 + i1;
        ai1[3] = i2 + i1;
        if(j1 - i1 < ai1[0])
            ai1[0] = j1 - i1;
        if(k1 - i1 < ai1[1])
            ai1[1] = k1 - i1;
        if(j1 + i1 > ai1[2])
            ai1[2] = j1 + i1;
        if(k1 + i1 > ai1[3])
            ai1[3] = k1 + i1;
        redrawRegions.add(ai1);
    }

    private void j()
    {
        byte byte0 = 5;
        int i1 = 14;
        int j1 = 25;
        byte byte1 = 45;
        ballY += --ballVY;
        if(++nFramesSinceSpin == 17 - topSpin / 3)
        {
            ballVY--;
            nFramesSinceSpin = 0;
        } else
        if(nFramesSinceSpin == -(17 - topSpin / 3))
        {
            ballVY++;
            nFramesSinceSpin = 0;
        }
        ballX += ballVX;
        if(!fEndGame)
        {
            int k1 = 2 * (ballX - p1X);
            int l1 = ballY - p1Y;
            int i2 = (int)Math.sqrt(k1 * k1 + l1 * l1);
            int j2 = ballVX - p1XV;
            int k2 = ballVY - p1YV;
            if(l1 > 0 && i2 < p1Diam + ballRad && i2 > byte0 && lastPlayerToTouch != 1 && nFramesUntilStop < 0)
            {
                int l2 = (k1 * j2 + l1 * k2) / i2;
                ballX = p1X + (((p1Diam + ballRad) / 2) * k1) / i2;
                ballY = p1Y + ((p1Diam + ballRad) * l1) / i2;
                if(l2 <= 0)
                {
                    ballVX += p1XV - (2 * k1 * l2) / i2;
                    if(ballVX < -i1)
                        ballVX = -i1;
                    if(ballVX > i1)
                        ballVX = i1;
                    ballVY += p1YV - (2 * l1 * l2) / i2;
                    if(ballVY < -j1)
                        ballVY = -j1;
                    if(ballVY > j1)
                        ballVY = j1;
                }
                if(fServerMoved)
                {
                    fP1Touched = true;
                    fP1HitStill = p1YV == 0 && p1XV == 0;
                    hitNetSinceTouched = false;
                    topSpin = 2 * p1XV + p1YV;
                    lastPlayerToTouch = 1;
                }
                nFramesSinceSpin = nBounces = 0;
            }
            k1 = 2 * (ballX - p2X);
            l1 = ballY - p2Y;
            i2 = (int)Math.sqrt(k1 * k1 + l1 * l1);
            j2 = ballVX - p2XV;
            k2 = ballVY - p2YV;
            if(l1 > 0 && i2 < p2Diam + ballRad && i2 > byte0 && lastPlayerToTouch != 2 && nFramesUntilStop < 0)
            {
                int i3 = (k1 * j2 + l1 * k2) / i2;
                ballX = p2X + (((p2Diam + ballRad) / 2) * k1) / i2;
                ballY = p2Y + ((p2Diam + ballRad) * l1) / i2;
                if(i3 <= 0)
                {
                    ballVX += p2XV - (2 * k1 * i3) / i2;
                    if(ballVX < -i1)
                        ballVX = -i1;
                    if(ballVX > i1)
                        ballVX = i1;
                    ballVY += p2YV - (2 * l1 * i3) / i2;
                    if(ballVY < -j1)
                        ballVY = -j1;
                    if(ballVY > j1)
                        ballVY = j1;
                }
                if(fServerMoved)
                {
                    fP2Touched = true;
                    fP2HitStill = p2YV == 0 && p2XV == 0;
                    hitNetSinceTouched = false;
                    topSpin = -2 * p2XV + p2YV;
                    lastPlayerToTouch = 2;
                }
                nFramesSinceSpin = nBounces = 0;
            }
            if(ballX > 480 && ballX < 520 && ballY < 140)
            {
                topSpin = 0;
                if(ballVY < 0 && ballY > 130)
                {
                    ballVY *= -1;
                    ballY = 130;
                    ballVX = ballVX / 3;
                    hitNetSinceTouched = true;
                } else
                if(ballX < 500)
                {
                    ballX = 480;
                    ballVX = ((ballVX < 0 ? ballVX : -ballVX) * 2) / 5;
                    hitNetSinceTouched = true;
                } else
                {
                    ballX = 520;
                    ballVX = ((ballVX > 0 ? ballVX : -ballVX) * 2) / 5;
                    hitNetSinceTouched = true;
                }
            }
        }
        if(Math.abs(topSpin) > byte1)
            topSpin = byte1 * (topSpin <= 0 ? -1 : 1);
        if(ballY < ballRad + byte0)
        {
            byte byte2 = 0;
            double d1 = 1.0D;
            switch(courtTypes[courtTypeSelected])
            {
            case 2: // '\002'
                byte2 = 7;
                d1 = 0.65000000000000002D;
                break;

            case 0: // '\0'
                byte2 = 10;
                d1 = 0.69999999999999996D;
                break;

            case 1: // '\001'
            default:
                byte2 = 13;
                d1 = 0.59999999999999998D;
                break;
            }
            ballY = ballRad + byte0;
            ballVY = (int)(-d1 * (double)ballVY);
            if(topSpin < 0)
                ballVY = ballVY + topSpin / byte2;
            else
                ballVY = ballVY + topSpin / (byte2 * 2);
            if(ballVX < 0)
                ballVX = ballVX - topSpin / byte2;
            else
                ballVX = ballVX + topSpin / byte2;
            topSpin = 0;
            if(ballVX < -i1)
                ballVX = -i1;
            if(ballVX > i1)
                ballVX = i1;
            nBounces++;
            boolean flag = nBounces == 1 && (!fP2Touched && (ballX < 500 || ballX > 710) || !fP1Touched && (ballX > 500 || ballX < 290));
            boolean flag1 = nBounces > 1 || ballX < 90 || ballX > 910 || lastPlayerToTouch == 1 && ballX < 500 || lastPlayerToTouch == 2 && ballX > 500 && !flag;
            boolean flag2 = nBounces == 1 && hitNetSinceTouched && (fP1Touched && !fP2Touched && (ballX > 500) & (ballX <= 710) || fP2Touched && !fP1Touched && ballX >= 290 && ballX < 500) && !flag;
            if((flag1 || flag2 || flag) && nFramesUntilStop < 0)
            {
                nFramesUntilStop = 100;
                boolean flag3 = false;
                boolean flag4 = false;
                boolean flag5 = false;
                byte byte3 = 0;
                if(flag)
                {
                    nFaults++;
                    promptMsg = "Fault!";
                    if(nFaults == 2)
                    {
                        promptMsg = "Double fault!";
                        nFaults = 0;
                        if(!fP1Touched && !fP2Touched && ballX > 500)
                            byte3 = 1;
                        else
                        if(!fP2Touched && !fP1Touched && ballX < 500)
                            byte3 = 2;
                        else
                        if(!fP2Touched && (ballX < 500 || ballX > 710))
                            byte3 = 2;
                        else
                        if(!fP1Touched && (ballX > 500 || ballX < 290))
                            byte3 = 1;
                    }
                } else
                if(flag1)
                {
                    if(lastPlayerToTouch == 1)
                    {
                        if(ballX < 500 || nBounces == 1 && ballX > 900)
                            byte3 = 2;
                        else
                            byte3 = 1;
                    } else
                    if(ballX > 500 || nBounces == 1 && ballX < 100)
                        byte3 = 1;
                    else
                        byte3 = 2;
                    nFaults = 0;
                }
                if(byte3 == 1)
                    nP1PointsWon++;
                else
                if(byte3 == 2)
                    nP2PointsWon++;
                if(byte3 == 1 || byte3 == 2)
                    if(nP1PointsWon == 4 && nP2PointsWon < 3 || nP1PointsWon >= 3 && nP2PointsWon >= 3 && nP1PointsWon == nP2PointsWon + 2)
                    {
                        nP1GamesWon++;
                        nP1PointsWon = nP2PointsWon = 0;
                    } else
                    if(nP2PointsWon == 4 && nP1PointsWon < 3 || nP2PointsWon >= 3 && nP1PointsWon >= 3 && nP2PointsWon == nP1PointsWon + 2)
                    {
                        nP2GamesWon++;
                        nP1PointsWon = nP2PointsWon = 0;
                    }
                if(oneplayer)
                    promptMsg = byte3 != 1 ? ai._mthif() : slimeColText[p1Col];
                else
                    promptMsg = byte3 != 1 ? slimeColText[p2Col] : slimeColText[p1Col];
                if(flag2)
                    promptMsg = "Let!";
                else
                if(nP1PointsWon + nP2PointsWon == 0 && byte3 > 0)
                {
                    if(byte3 == 1 && nP1GamesWon + nP2GamesWon % 2 == 0 || byte3 == 2 && nP1GamesWon + nP2GamesWon % 2 == 1)
                        promptMsg += "breaks serve!";
                    else
                        promptMsg += "wins the game!";
                } else
                if(flag)
                {
                    if(nFaults == 0)
                        promptMsg = "Double fault!";
                    else
                        promptMsg = "Fault!";
                } else
                if(flag4)
                    promptMsg += "serves an ace!";
                else
                if(flag5)
                    promptMsg += "hits a winner!";
                else
                if(ballX > 500 && !fP1Touched && fP2Touched || ballX <= 500 && fP1Touched && !fP2Touched)
                    promptMsg += "laughs at his opponent's inability to serve!";
                else
                    promptMsg += "scores!";
                b();
                _mthnew();
                _mthlong();
            }
        }
    }

    private void _mthlong()
    {
        if(replaying)
            return;
        Graphics g1 = getGraphics();
        FontMetrics fontmetrics = g1.getFontMetrics();
        byte byte0 = 5;
        int i1 = byte0 * 2;
        int j1 = byte0 * 2 + fontmetrics.getAscent();
        int k1 = j1 + fontmetrics.getAscent() + byte0;
        int l1 = a(fontmetrics.stringWidth(slimeColText[p1Col]), fontmetrics.stringWidth(oneplayer ? ai._mthif() : slimeColText[p2Col]));
        g1.setColor(SCOREBOX_COL);
        g1.fillRect(i1 - byte0, j1 - (k1 - j1), l1 + 2 * byte0, k1 + byte0);
        g1.setColor(Color.white);
        g1.drawString(slimeColText[p1Col], i1, j1);
        g1.drawString(oneplayer ? ai._mthif() : slimeColText[p2Col], i1, k1);
        i1 += l1 + 3 * byte0;
        l1 = a(fontmetrics.stringWidth("" + nP1GamesWon), fontmetrics.stringWidth("" + nP2GamesWon));
        g1.setColor(SCOREBOX_COL);
        g1.fillRect(i1 - byte0, j1 - (k1 - j1), l1 + 2 * byte0, k1 + byte0);
        g1.setColor(Color.white);
        g1.drawString("" + nP1GamesWon, (i1 + l1) - fontmetrics.stringWidth("" + nP1GamesWon), j1);
        g1.drawString("" + nP2GamesWon, (i1 + l1) - fontmetrics.stringWidth("" + nP2GamesWon), k1);
        i1 += l1 + 3 * byte0;
        if(nP1PointsWon + nP2PointsWon > 0)
        {
            String s = "0";
            String s1 = "0";
            if(nP1PointsWon == 0)
                s = "0";
            else
            if(nP1PointsWon == 1)
                s = "15";
            else
            if(nP1PointsWon == 2)
                s = "30";
            else
            if(nP1PointsWon == 3 || nP1PointsWon <= nP2PointsWon)
                s = "40";
            else
            if(nP1PointsWon > nP2PointsWon)
                s = "A";
            if(nP2PointsWon == 0)
                s1 = "0";
            else
            if(nP2PointsWon == 1)
                s1 = "15";
            else
            if(nP2PointsWon == 2)
                s1 = "30";
            else
            if(nP2PointsWon == 3 || nP2PointsWon <= nP1PointsWon)
                s1 = "40";
            else
            if(nP2PointsWon > nP1PointsWon)
                s1 = "A";
            int i2 = a(fontmetrics.stringWidth(s), fontmetrics.stringWidth(s1));
            g1.setColor(SCOREBOX_COL);
            g1.fillRect(i1 - byte0, j1 - (k1 - j1), i2 + 2 * byte0, k1 + byte0);
            g1.setColor(Color.white);
            g1.drawString(s, (i1 + i2) - fontmetrics.stringWidth(s), j1);
            g1.drawString(s1, (i1 + i2) - fontmetrics.stringWidth(s1), k1);
            i1 += i2 + 3 * byte0;
        }
    }

    private String a(long l1)
    {
        String s = "";
        long l2 = (l1 / 10L) % 100L;
        long l3 = (l1 / 1000L) % 60L;
        long l4 = (l1 / 60000L) % 60L;
        long l5 = l1 / 0x36ee80L;
        s = s + l4 + ":";
        if(l3 < 10L)
            s = s + "0";
        s = s + l3;
        return s;
    }

    private void _mthcase()
    {
    }

    public void _mthnew()
    {
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        g1.setFont(screen.getFont());
        screen.setColor(COURT_COL);
        screen.fillRect(0, (4 * nHeight) / 5 + 10, nWidth, nHeight / 5 - 10);
        a(promptMsg, 0);
    }

    public void a(String s, int i1)
    {
        Graphics g1 = getGraphics();
        g1.setFont(new Font(g1.getFont().getName(), 1, 15));
        FontMetrics fontmetrics = g1.getFontMetrics();
        g1.setColor(Color.white);
        int j1 = fontmetrics.stringWidth(s);
        int k1 = (nWidth - j1) / 2;
        int l1 = (nHeight * 4) / 5 + fontmetrics.getHeight() * (i1 + 1) + 10;
        g1.drawString(s, k1, l1);
        _mthlong();
        _mthcase();
        redrawRegions.add(new int[] {
            k1, l1, k1 + j1 + 1, l1 + fontmetrics.getHeight()
        });
    }

    private void a(int i1)
    {
        a(i1, true);
    }

    private void a(int i1, boolean flag)
    {
        int j1 = i1 == 0 ? replayData.length - 1 : i1 - 1;
        p1OldX = replayData[j1][0];
        p1OldY = replayData[j1][1];
        p2OldX = replayData[j1][2];
        p2OldY = replayData[j1][3];
        ballOldX = replayData[j1][4];
        ballOldY = replayData[j1][5];
        p1X = replayData[i1][0];
        p1Y = replayData[i1][1];
        p2X = replayData[i1][2];
        p2Y = replayData[i1][3];
        ballX = replayData[i1][4];
        ballY = replayData[i1][5];
        ballVX = 0;
        ballVY = 1;
        if(ballOldX == 0 && ballOldY == 0)
            ballOldX = ballOldY = -500;
        if(ballX == ballOldX && ballY == ballOldY)
            ballOldX = ballOldY = -500;
        _mthif();
        if(buffered)
            getGraphics().drawImage(buffer, 0, 0, null);
    }

    private void i()
    {
        replayData[replayIndex][0] = p1X;
        replayData[replayIndex][1] = p1Y;
        replayData[replayIndex][2] = p2X;
        replayData[replayIndex][3] = p2Y;
        replayData[replayIndex][4] = ballX;
        replayData[replayIndex][5] = ballY;
        replayData[replayIndex][6] = p1Col;
        replayData[replayIndex][7] = p2Col;
        replayIndex++;
        if(replayIndex >= replayData.length)
            replayIndex = 0;
        if(replayStart == replayIndex)
            replayStart++;
        if(replayStart >= replayData.length)
            replayStart = 0;
    }

    private void h()
    {
        replaying = true;
        b();
        Graphics g1 = buffered ? buffer.getGraphics() : getGraphics();
        FontMetrics fontmetrics = g1.getFontMetrics();
        int i1 = fontmetrics.getHeight();
        promptMsg = "Press space to continue...";
        mousePressed = false;
        int j1 = scoringRun;
        scoringRun = oldScoringRun;
        int k1 = replayStart;
        boolean flag = false;
        while(!mousePressed) 
        {
            if(++k1 >= replayData.length)
                k1 = 0;
            if(k1 == replayIndex)
            {
                g1.setColor(Color.white);
                g1.fillRect(20, 20, 20, 20);
                a(1000L, false);
                flag = !flag;
                paint(g1);
                g1.setColor(SKY_COL);
                g1.fillRect(0, 0, nWidth, nHeight / 20 + 22);
                if(replayIndex < replayStart)
                    k1 += replayData.length;
                while(k1 > replayStart) 
                {
                    k1 -= 5;
                    b();
                    g1.setColor(Color.white);
                    g1.fillPolygon(new Polygon(new int[] {
                        20, 35, 35, 50, 50, 35, 35, 20
                    }, new int[] {
                        30, 20, 30, 20, 40, 30, 40, 30
                    }, 8));
                    if(k1 < replayStart)
                        k1 = replayStart;
                    a(k1 % replayData.length, false);
                    a(20L, false);
                }
                b();
                g1.setColor(Color.white);
                g1.fillRect(20, 20, 20, 20);
                a(replayStart);
                a(500L, false);
                b();
            }
            a(k1);
            try
            {
                Thread.sleep(flag ? 60L : 20L);
            }
            catch(InterruptedException interruptedexception) { }
            g1.setColor(Color.white);
            g1.fillPolygon(new Polygon(new int[] {
                20, 35, 20
            }, new int[] {
                20, 30, 40
            }, 3));
        }
        scoringRun = j1;
        promptMsg = "";
        paint(g1);
        replaying = false;
    }

    public void run()
    {
        replayIndex = replayStart = 0;
        _mthnew();
        scoringRun = 0;
        nP1Aces = 0;
        nP2Aces = 0;
        nP1Winners = 0;
        nP2Winners = 0;
        fP1HitStill = false;
        fP2HitStill = false;
        fServerMoved = false;
        _mthlong();
        fP1Touched = fP2Touched = false;
        hitNetSinceTouched = false;
        gameOver = false;
        Graphics g1 = buffer.getGraphics();
        startTime = System.currentTimeMillis();
        b();
        repaint();
        do
        {
            if(gameThread == null || gameOver)
                break;
            if(!paused)
            {
                p1OldX = p1X;
                p1OldY = p1Y;
                p2OldX = p2X;
                p2OldY = p2Y;
                ballOldX = ballX;
                ballOldY = ballY;
                k();
                j();
                _mthcase();
                _mthlong();
                _mthif();
                _mthfor();
                i();
                nFramesUntilStop--;
            }
            if(nFramesUntilStop == 0)
            {
                long l1 = System.currentTimeMillis();
                _mthcase();
                if(mousePressed)
                {
                    i();
                    h();
                }
                mousePressed = false;
                if(nP1GamesWon >= gamesToWin && nP1GamesWon >= nP2GamesWon + 2 || nP2GamesWon >= gamesToWin && nP2GamesWon >= nP1GamesWon + 2)
                    a();
                promptMsg = "";
                _mthint();
                b();
                repaint();
                startTime += System.currentTimeMillis() - l1;
                if(gameThread != null)
                    a(20L, true);
            }
            if(gameThread != null)
                a(20L, true);
        } while(true);
        fEndGame = true;
        fInPlay = false;
        repaint();
    }

    private void a()
    {
        if(!oneplayer)
            a(nP1GamesWon > nP2GamesWon);
        else
        if(nP1GamesWon > nP2GamesWon)
        {
            gameTime = System.currentTimeMillis() - startTime;
            if(aiMode == 3)
            {
                aiMode = 4;
                _mthif(true);
            }
        } else
        {
            _mthif(false);
        }
        fInPlay = false;
        gameThread = null;
        b();
        repaint();
    }

    private void a(boolean flag)
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        _mthlong();
        _mthcase();
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        FontMetrics fontmetrics1 = g1.getFontMetrics();
        g1.setColor(COURT_COL);
        String as[] = {
            "Player " + (flag ? "2" : "1") + " is insipid!", "Player " + (flag ? "2" : "1") + " is rubbish!", "Player " + (flag ? "1" : "2") + " wins!"
        };
        String s = as[(int)((double)as.length * Math.random())];
        g1.fillRect((nWidth - fontmetrics1.stringWidth(s)) / 2 - 30, nHeight / 2 - fontmetrics1.getAscent() * 5, fontmetrics1.stringWidth(s) + 60, fontmetrics1.getAscent() * 5 + fontmetrics.getAscent() * 2);
        g1.setColor(Color.white);
        g1.drawString(s, (nWidth - fontmetrics1.stringWidth(s)) / 2, nHeight / 2 - fontmetrics1.getAscent() * 3);
        g1.setFont(screen.getFont());
        g1.drawString("GAME OVER", (nWidth - fontmetrics.stringWidth("GAME OVER")) / 2, nHeight / 2 + fontmetrics.getAscent());
        repaint();
        a(3000L, false);
        gameOver = true;
    }

    private void _mthif(boolean flag)
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        _mthlong();
        _mthcase();
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        FontMetrics fontmetrics1 = g1.getFontMetrics();
        if(!flag)
        {
            g1.setColor(COURT_COL);
            g1.fillRect((nWidth - a(fontmetrics1.stringWidth(loserText1[aiMode]), fontmetrics1.stringWidth(loserText2[aiMode]))) / 2 - 30, nHeight / 2 - fontmetrics1.getAscent() * 5, a(fontmetrics1.stringWidth(loserText1[aiMode]), fontmetrics1.stringWidth(loserText2[aiMode])) + 60, fontmetrics1.getAscent() * 5 + fontmetrics.getAscent() * 2);
            g1.setColor(Color.white);
            g1.drawString(loserText1[aiMode], (nWidth - fontmetrics1.stringWidth(loserText1[aiMode])) / 2, nHeight / 2 - fontmetrics1.getAscent() * 3);
            g1.drawString(loserText2[aiMode], (nWidth - fontmetrics1.stringWidth(loserText2[aiMode])) / 2, nHeight / 2 - fontmetrics1.getAscent() * 2);
            g1.setFont(screen.getFont());
            g1.drawString("GAME OVER", (nWidth - fontmetrics.stringWidth("GAME OVER")) / 2, nHeight / 2 + fontmetrics.getAscent());
        } else
        {
            a(g1);
            g1.setColor(Color.white);
            g1.setFont(screen.getFont());
            g1.drawString("YOU WIN!", (nWidth - fontmetrics.stringWidth("YOU WIN!")) / 2, nHeight / 2);
            g1.drawString("You cannot be serious! This is MY game! !", (nWidth - fontmetrics1.stringWidth("The Slimes bow down before the new Slime King!")) / 2, nHeight / 2 + fontmetrics1.getAscent());
        }
        if(buffered)
            repaint();
        a(3000L, false);
        gameOver = true;
        b();
        repaint();
    }

    private void a(Graphics g1)
    {
    }

    private void a(long l1, boolean flag)
    {
        if(gameThread != null)
        {
            for(int i1 = 0; (long)i1 < l1 / 20L; i1++)
                try
                {
                    Thread _tmp = gameThread;
                    Thread.sleep(20L);
                }
                catch(InterruptedException interruptedexception) { }

        }
    }

    private int _mthchar()
    {
        return (int)Math.pow(2D, aiMode);
    }

    public void destroy()
    {
        if(gameThread != null)
        {
            gameThread.stop();
            gameThread = null;
        }
    }

    private int nWidth;
    private int nHeight;
    private int p1X;
    private int p1Y;
    private int p2X;
    private int p2Y;
    private int p1Diam;
    private int p2Diam;
    private int p1Col;
    private int p2Col;
    private int p1OldX;
    private int p1OldY;
    private int p2OldX;
    private int p2OldY;
    private int p1XV;
    private int p1YV;
    private int p2XV;
    private int p2YV;
    private int ballX;
    private int ballY;
    private int ballVX;
    private int ballVY;
    private int ballOldX;
    private int ballOldY;
    private int lastPlayerToTouch;
    private int nBounces;
    private int topSpin;
    private int nFramesSinceSpin;
    private int nFramesUntilStop;
    private final int COURT_HARD = 0;
    private final int COURT_GRASS = 1;
    private final int COURT_CLAY = 2;
    private int courtTypeSelected;
    private int courtTypes[] = {
        0, 1, 2
    };
    private String courtTypeSelectText[] = {
        "Hard court", "Grass court", "Clay court"
    };
    private Color courtColours[];
    private String playerSelectText[] = {
        "One player", "Two players"
    };
    private int playerSelected;
    private String gameLengthSelectText[] = {
        "Short (3 games)", "Long (6 games)"
    };
    private int gameLengthSelected;
    private int gameLengths[] = {
        3, 6
    };
    private Graphics screen;
    private String promptMsg;
    private boolean mousePressed;
    private boolean fInPlay;
    private boolean fP1Touched;
    private boolean fP2Touched;
    private int nP1Aces;
    private int nP2Aces;
    private int nP1Winners;
    private int nP2Winners;
    private boolean fP1HitStill;
    private boolean fP2HitStill;
    private int fP1Super;
    private int fP2Super;
    private int nP1PointsWon;
    private int nP2PointsWon;
    private int nP1GamesWon;
    private int nP2GamesWon;
    private int nFaults;
    private BufferedImage scoreBuffer;
    private boolean fServerMoved;
    private boolean hitNetSinceTouched;
    private Thread gameThread;
    private boolean fEndGame;
    private long startTime;
    private long gameTime;
    private long crossedNetTime;
    private long pausedTime;
    private boolean paused;
    private int scoringRun;
    private int oldScoringRun;
    private int replayData[][];
    private int replayIndex;
    private int replayStart;
    private boolean replaying;
    private String slimeColText[] = {
        "Big Red Slime ", "Albino Slime ", "Golden Slime ", "Grass Tree Slime ", "Green Slime ", "Floating Eye Slime "
    };
    private Color slimeColours[];
    private String loserText1[];
    private String loserText2[] = {
        "Better luck next time.", "C'mon! Go computer Slime!", "Congrats on reaching level 3!", "Congrats on reaching level 4!", "Yum."
    };
    private Color SKY_COL;
    private Color COURT_COL;
    private Color BALL_COL;
    private Color SCOREBOX_COL;
    private int p1Run;
    private int p2Run;
    private int p1Jump;
    private int p2Jump;
    private int gamesToWin;
    private int aiMode;
    private e ai;
    private int gameScore;
    private boolean gameOver;
    private int menuSelectBoundsHorizontal[];
    private int menuSelectBoundsVertical[];
    private int menuOK[];
    private int boundsP1select[];
    private int boundsP2select[];
    private boolean oneplayer;
    private int ballRad;
    private BufferedImage buffer;
    private Vector redrawRegions;
    private boolean buffered;
}
