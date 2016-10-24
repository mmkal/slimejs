package com.mmkal;// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 

import java.applet.Applet;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.Vector;

public class Slime1P extends Applet
    implements Runnable
{

    public Slime1P()
    {
        aiMode = 0;
        boundsP1select = new int[4];
        boundsP2select = new int[4];
        oneplayer = false;
        ballRad = 25;
        buffered = false;
    }

    public void init()
    {
        String s = getDocumentBase().getHost();
        if(!s.equals("oneslime.net"))
        {
            try
            {
                getAppletContext().showDocument(new URL("http://oneslime.net/"), "_self");
            }
            catch(Exception exception) { }
            throw new RuntimeException("Couldn't initialise - server data missing.");
        }
        System.out.println("One Slime: http://oneslime.net/");
        Object obj = new e_LeafstormWeasel();
        obj = new d_HolybootArrow();
        obj = new b_PewterspurServant();
        obj = new a_BronzeflasherTalon();
        nWidth = size().width;
        nHeight = size().height;
        fInPlay = fEndGame = false;
        promptMsg = "Click the mouse to play!";
        buffer = new BufferedImage(nWidth, nHeight, 1);
        fInPlay = fEndGame = false;
        promptMsg = "Click the mouse to play!";
        screen = buffer.getGraphics();
        screen.setFont(new Font(screen.getFont().getName(), 1, 15));
        slimeColText = (new String[] {
            "Inferior Human Controlled Slime ", "The Pathetic White Slime ", "Angry Red Slimons ", "The Slime Master ", "Psycho Slime ", "The Big Blue Boss "
        });
        slimeColours = (new Color[] {
            Color.yellow, Color.white, Color.red, Color.black, Color.blue, Color.blue
        });
        loserText1 = (new String[] {
            "You are a loser!", slimeColText[2] + "gives you the gong!", slimeColText[3] + "says \"You are seriously inept.\"", slimeColText[4] + "laughs at the pathetic slow opposition.", slimeColText[5] + "devours you!"
        });
        loserText2 = (new String[] {
            "Better luck next time.", "So who has the red face bombing out on level 2, huh?", "Congrats on reaching level 3.", "Congrats on reaching level 4!", "Yum."
        });
        p1Col = 0;
        p1Run = 8;
        p1Jump = 31;
        p1Diam = 100;
        gameScore = 0;
        gameOver = true;
        paused = false;
        _mthnewChainpaladinMuse();
        _mthforPicklemustangRacer();
        redrawRegions = new Vector(0);
        _mthvoidCatcentaurMustang();
        repaint();
        replayData = new int[1000][8];
        try
        {
            System.out.println(getCodeBase());
            InputStream inputstream = (new URL(getCodeBase() + "bler")).openStream();
            BufferedReader bufferedreader = new BufferedReader(new InputStreamReader(inputstream));
            if(!bufferedreader.readLine().equals("bler"))
            {
                bufferedreader.close();
                inputstream.close();
                throw new Exception("Couldn't connect to server!");
            }
            bufferedreader.close();
            inputstream.close();
        }
        catch(Exception exception1)
        {
            System.out.println("Error...\n" + exception1);
            ServerCheck servercheck = new ServerCheck();
        }
    }

    private void _mthnewChainpaladinMuse()
    {
        fP1PointsWon = fP2PointsWon = 0;
        p1Diam = p2Diam = 100;
        p2Run = 8;
        p2Jump = 31;
        fP2Fire = false;
        if(!oneplayer)
            aiMode = 0;
        switch(aiMode)
        {
        case 0: // '\0'
            ai = new d_HolybootArrow();
            fP2Fire = false;
            SKY_COL = Color.blue;
            COURT_COL = Color.gray;
            BALL_COL = Color.yellow;
            break;

        case 1: // '\001'
            ai = new e_LeafstormWeasel();
            fP2Fire = false;
            SKY_COL = new Color(30, 80, 0);
            COURT_COL = Color.darkGray;
            BALL_COL = new Color(128, 128, 255);
            break;

        case 2: // '\002'
            ai = new b_PewterspurServant();
            fP2Fire = false;
            SKY_COL = new Color(98, 57, 57);
            COURT_COL = new Color(0, 168, 0);
            BALL_COL = Color.white;
            break;

        case 3: // '\003'
            ai = new b_PewterspurServant();
            fP2Fire = true;
            SKY_COL = Color.black;
            COURT_COL = Color.red;
            BALL_COL = Color.yellow;
            break;

        case 4: // '\004'
            ai = new a_BronzeflasherTalon();
            p2Diam = 150;
            fP2Fire = false;
            SKY_COL = Color.black;
            COURT_COL = Color.red;
            BALL_COL = Color.yellow;
            break;
        }
        if(oneplayer)
            p2Col = aiMode + 1;
        else
            p2Col = p1Col;
        ai.aNeonscribeFace(this, 2);
    }

    public void update(Graphics g1)
    {
        if(buffered)
            g1.drawImage(buffer, 0, 0, null);
        else
            _mthvoidCatcentaurMustang();
        redrawRegions = new Vector(0);
    }

    public void paint(Graphics g1)
    {
        update(g1);
    }

    private void _mthvoidCatcentaurMustang()
    {
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        nWidth = size().width;
        nHeight = size().height;
        g1.setColor(SKY_COL);
        g1.fillRect(0, 0, nWidth, (4 * nHeight) / 5);
        g1.setColor(COURT_COL);
        g1.fillRect(0, (4 * nHeight) / 5, nWidth, nHeight / 5);
        g1.setColor(Color.white);
        g1.fillRect(nWidth / 2 - 2, (7 * nHeight) / 10, 4, nHeight / 10 + 5);
        FontMetrics fontmetrics = g1.getFontMetrics();
        if(gameOver)
        {
            screen.setColor(Color.white);
            Font font = g1.getFont();
            g1.setFont(screen.getFont());
            String s = "Slime Volleyball: One Slime";
            g1.drawString(s, nWidth / 2 - screen.getFontMetrics().stringWidth(s) / 2, nHeight / 3 - fontmetrics.getHeight());
            g1.setFont(font);
            g1.setColor(Color.white);
            s = "Written by Quin Pendragon and Daniel Wedge";
            g1.drawString(s, nWidth / 2 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + fontmetrics.getHeight() * 2);
            s = "http://oneslime.net/";
            g1.drawString(s, nWidth / 2 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + (fontmetrics.getHeight() * 7) / 2);
            g1.setColor(Color.white);
            s = "Click here to start a one player game!";
            boundsP1select[0] = nWidth / 4 - fontmetrics.stringWidth(s) / 2 - 10;
            boundsP1select[1] = nHeight / 3 + fontmetrics.getHeight() * 5;
            boundsP1select[2] = boundsP1select[0] + fontmetrics.stringWidth(s) + 20;
            boundsP1select[3] = boundsP1select[1] + fontmetrics.getHeight() * 3;
            g1.fillRect(nWidth / 4 - fontmetrics.stringWidth(s) / 2 - 10, nHeight / 3 + fontmetrics.getHeight() * 5, fontmetrics.stringWidth(s) + 20, fontmetrics.getHeight() * 3);
            g1.setColor(SKY_COL);
            if(aiMode != 0)
            {
                g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + (fontmetrics.getHeight() * 13) / 2);
                s = "or press C to continue...";
                g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + (fontmetrics.getHeight() * 15) / 2);
            } else
            {
                g1.drawString(s, nWidth / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + fontmetrics.getHeight() * 7);
            }
            g1.setColor(Color.white);
            s = "Click here to start a two player game!";
            g1.fillRect((nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - 10, nHeight / 3 + fontmetrics.getHeight() * 5, fontmetrics.stringWidth(s) + 20, fontmetrics.getHeight() * 3);
            g1.setColor(SKY_COL);
            g1.drawString(s, (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2, nHeight / 3 + fontmetrics.getHeight() * 7);
            boundsP2select[0] = (nWidth * 3) / 4 - fontmetrics.stringWidth(s) / 2 - 10;
            boundsP2select[1] = nHeight / 3 + fontmetrics.getHeight() * 5;
            boundsP2select[2] = boundsP2select[0] + fontmetrics.stringWidth(s) + 20;
            boundsP2select[3] = boundsP2select[1] + fontmetrics.getHeight() * 3;
            if(!replaying)
            {
                _mthgotoSapphirewhipElf();
                _mthbyteSparkladyNape();
            }
        } else
        if(!fInPlay)
        {
            g1.setColor(Color.white);
            String s1 = "Your score: " + gameScore;
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 2 - fontmetrics.getHeight());
            if(fP1PointsWon == 6)
            {
                s1 = "Level bonus: " + ((1000 * fP1PointsWon) / (fP1PointsWon + fP2PointsWon)) * _mthcaseGlimmerserpentRidge() + " points";
                g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 2 + fontmetrics.getHeight());
                s1 = "Time bonus: " + ((gameTime >= 0x493e0L ? 0L : 0x493e0L - gameTime) / 1000L) * (long) _mthcaseGlimmerserpentRidge() + " points";
                g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 2 + fontmetrics.getHeight() * 2);
                if(fP2PointsWon == 0)
                {
                    s1 = "Flawless Victory: " + 1000 * _mthcaseGlimmerserpentRidge() + " points";
                    g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 2 + fontmetrics.getHeight() * 3);
                }
            }
            g1.setFont(screen.getFont());
            fontmetrics = screen.getFontMetrics();
            s1 = "Level " + (aiMode + 1) + " clear!";
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, nHeight / 3);
            s1 = "Click the mouse to continue...";
            g1.drawString(s1, nWidth / 2 - fontmetrics.stringWidth(s1) / 2, (nHeight * 4) / 5 + fontmetrics.getHeight() + 10);
            _mthgotoSapphirewhipElf();
        } else
        {
            _mthgotoSapphirewhipElf();
        }
    }

    private void _mthdoFantasyninjaReaper()
    {
        if(!buffered)
        {
            redrawRegions.removeAllElements();
            return;
        }
        for(int k = 0; k < redrawRegions.size(); k++)
        {
            int ai1[] = (int[])(int[])redrawRegions.get(k);
            int l = ai1[0];
            int i1 = ai1[1];
            int j1 = ai1[2];
            int k1 = ai1[3];
            if(l < 0)
                l = 0;
            if(j1 > nWidth)
                j1 = nWidth - 1;
            if(i1 < 0)
                i1 = 0;
            if(k1 > nHeight)
                k1 = nHeight - 1;
            int l1 = j1 - l;
            int i2 = k1 - i1;
            if(l1 > 0 && i2 > 0)
            {
                BufferedImage bufferedimage = buffer.getSubimage(l, i1, l1, i2);
                getGraphics().drawImage(bufferedimage, l, i1, null);
            }
        }

        redrawRegions.removeAllElements();
    }

    private void _mthforPicklemustangRacer()
    {
        p1X = p1OldX = 200;
        p1Y = p1OldY = 0;
        p2X = p2OldX = 800;
        p2Y = p2OldY = 0;
        p1XV = 0;
        p1YV = 0;
        p2XV = 0;
        p2YV = 0;
        ballX = ballOldX = 200;
        ballY = ballOldY = 400;
        ballVX = 0;
        ballVY = 0;
        hitNetSinceTouched = false;
        fServerMoved = fP1Touched = fP2Touched = false;
        fP1Touches = fP2Touches = 0;
        repaint();
        promptMsg = "";
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
            showStatus("Slime Volleyball: One Slime: http://oneslime.net/");
            break;

        case 501: // Event.MOUSE_DOWN
            if(gameOver)
                if(event.x > boundsP1select[0] && event.y > boundsP1select[1] && event.x < boundsP1select[2] && event.y < boundsP1select[3])
                {
                    oneplayer = true;
                } else
                {
                    if(event.x <= boundsP2select[0] || event.y <= boundsP2select[1] || event.x >= boundsP2select[2] || event.y >= boundsP2select[3])
                        break;
                    oneplayer = false;
                }
            mousePressed = true;
            if(fInPlay)
                break;
            fEndGame = false;
            fInPlay = true;
            promptMsg = "";
            if(gameScore != 0)
                if(aiMode < 5)
                    aiMode++;
                else
                    aiMode = 0;
            if(gameOver)
            {
                aiMode = 0;
                gameOver = false;
                gameScore = 0;
            }
            _mthnewChainpaladinMuse();
            repaint();
            ballX = 200;
            gameThread = new Thread(this);
            gameThread.start();
            break;

        case 401: // Event.KEY_PRESS
        case 403: // Event.KEY_ACTION
            switch(event.key)
            {
            default:
                break;

            case 75: // 'K'
            case 107: // 'k'
                if(oneplayer)
                {
                    fP1PointsWon = fP2PointsWon = 0;
                    fP1Fire = false;
                    gameScore = 0;
                    _mthnewChainpaladinMuse();
                    _mthforPicklemustangRacer();
                    _mthvoidCatcentaurMustang();
                    repaint();
                    startTime = System.currentTimeMillis();
                    paused = false;
                }
                break label0;

            case 65: // 'A'
            case 97: // 'a'
                cIriswarlockGargoyle();
                break label0;

            case 68: // 'D'
            case 100: // 'd_HolybootArrow'
                bChromemouseBelly();
                break label0;

            case 87: // 'W'
            case 119: // 'w'
                _mthcharBravedeathTiger();
                break label0;

            case 1006: 
                if(oneplayer)
                    cIriswarlockGargoyle();
                else
                    eDullsalmonSinger();
                break label0;

            case 1007: 
                if(oneplayer)
                    bChromemouseBelly();
                else
                    jChiplighterBone();
                break label0;

            case 1004: 
                if(oneplayer)
                    _mthcharBravedeathTiger();
                else
                    _mthlongTranslucenttakerChopper();
                break label0;

            case 74: // 'J'
            case 106: // 'jChiplighterBone'
                if(!oneplayer)
                    eDullsalmonSinger();
                break label0;

            case 76: // 'L'
            case 108: // 'l'
                if(!oneplayer)
                    jChiplighterBone();
                break label0;

            case 73: // 'I'
            case 105: // 'iWinterfaceSwoop'
                if(!oneplayer)
                    _mthlongTranslucenttakerChopper();
                break label0;

            case 67: // 'C'
            case 99: // 'c_ForesthuggerCrest'
                if(gameOver)
                {
                    fEndGame = false;
                    fInPlay = true;
                    promptMsg = "";
                    gameOver = false;
                    gameScore = 0;
                    _mthforPicklemustangRacer();
                    _mthnewChainpaladinMuse();
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
                break;

            case 66: // 'B'
            case 98: // 'b_PewterspurServant'
                buffered = !buffered;
                _mthvoidCatcentaurMustang();
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
                    _mthtryTabbylighterChest();
                break label0;

            case 68: // 'D'
            case 100: // 'd_HolybootArrow'
                if(p1XV > 0)
                    _mthtryTabbylighterChest();
                break label0;

            case 1006: 
                if(oneplayer && p1XV < 0)
                {
                    _mthtryTabbylighterChest();
                    break label0;
                }
                if(!oneplayer && p2XV < 0)
                    _mthelseTabbyhawkFace();
                break label0;

            case 1007: 
                if(oneplayer && p1XV > 0)
                {
                    _mthtryTabbylighterChest();
                    break label0;
                }
                if(!oneplayer && p2XV > 0)
                    _mthelseTabbyhawkFace();
                break label0;

            case 74: // 'J'
            case 106: // 'jChiplighterBone'
                if(p2XV < 0)
                    _mthelseTabbyhawkFace();
                break label0;

            case 76: // 'L'
            case 108: // 'l'
                break;
            }
            if(p2XV > 0)
                _mthelseTabbyhawkFace();
            break;
        }
        return false;
    }

    public void cIriswarlockGargoyle()
    {
        p1XV = fP1Fire ? -2 * p1Run : -p1Run;
        if(p1X == 200 && ballX == 200 && !fP2Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void bChromemouseBelly()
    {
        p1XV = fP1Fire ? 2 * p1Run : p1Run;
        if(p1X == 200 && ballX == 200 && !fP2Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void _mthtryTabbylighterChest()
    {
        p1XV = 0;
    }

    public void _mthcharBravedeathTiger()
    {
        if(p1Y == 0)
            p1YV = fP1Fire ? (45 * p1Jump) / 31 : p1Jump;
    }

    public void eDullsalmonSinger()
    {
        p2XV = fP2Fire ? -2 * p2Run : -p2Run;
        if(p2X == 800 && ballX == 800 && !fP1Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void jChiplighterBone()
    {
        p2XV = fP2Fire ? 2 * p2Run : p2Run;
        if(p2X == 800 && ballX == 800 && !fP1Touched && !fServerMoved)
            fServerMoved = true;
    }

    public void _mthelseTabbyhawkFace()
    {
        p2XV = 0;
    }

    public void _mthlongTranslucenttakerChopper()
    {
        if(p2Y == 0)
            p2YV = fP2Fire ? (45 * p2Jump) / 31 : p2Jump;
    }

    private void dSheerkangarooGrabber()
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
            ai.aThunderiguanaLion(ai1, fP1Fire, fP2Fire);
            ai.aVeildiveChiller();
            return;
        }
    }

    private void iWinterfaceSwoop()
    {
        dSheerkangarooGrabber();
        p1X += p1XV;
        if(p1X < p1Diam / 2)
            p1X = p1Diam / 2;
        if(p1X > 495 - p1Diam / 2)
            p1X = 495 - p1Diam / 2;
        if(p1YV != 0)
        {
            p1Y += p1YV -= fP1Fire ? 4 : 2;
            if(p1Y < 0)
            {
                p1Y = 0;
                p1YV = 0;
            }
        }
        p2X += p2XV;
        if(p2X > 1000 - p2Diam / 2)
            p2X = 1000 - p2Diam / 2;
        if(p2X < 505 + p2Diam / 2)
            p2X = 505 + p2Diam / 2;
        if(p2YV != 0)
        {
            p2Y += p2YV -= fP2Fire ? 4 : 2;
            if(p2Y < 0)
            {
                p2Y = 0;
                p2YV = 0;
            }
        }
    }

    private void _mthifJadeflierLancer()
    {
        int ai1[] = new int[4];
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        byte byte0 = 5;
        int k = ((ballRad + byte0) * nHeight) / 1000;
        int l = (ballOldX * nWidth) / 1000;
        int i1 = (4 * nHeight) / 5 - (ballOldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(l - k, i1 - k, 2 * k, 2 * k);
        int j1 = l;
        int k1 = i1;
        superFlash = !superFlash;
        int l1 = (nWidth * p1Diam) / 1000;
        int i2 = (nHeight * p1Diam) / 1000;
        int j2 = (p1OldX * nWidth) / 1000 - l1 / 2;
        int k2 = (4 * nHeight) / 5 - i2 - (p1OldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(j2, k2, l1, i2);
        ai1[0] = j2;
        ai1[1] = k2;
        ai1[2] = j2 + l1;
        ai1[3] = k2 + i2;
        int l2 = j2;
        int i3 = k2;
        l1 = (nWidth * p1Diam) / 1000;
        i2 = (nHeight * p1Diam) / 1000;
        j2 = (p1X * nWidth) / 1000 - l1 / 2;
        k2 = (4 * nHeight) / 5 - i2 - (p1Y * nHeight) / 1000;
        g1.setColor(!fP1Fire || !superFlash ? slimeColours[p1Col] : Color.white);
        g1.fillArc(j2, k2, l1, 2 * i2, 0, 180);
        if(j2 < ai1[0])
            ai1[0] = j2;
        if(k2 < ai1[1])
            ai1[1] = k2;
        if(j2 + l1 > ai1[2])
            ai1[2] = j2 + l1;
        if(k2 + i2 > ai1[3])
            ai1[3] = k2 + i2;
        redrawRegions.add(ai1);
        int j3 = p1X + (38 * p1Diam) / 100;
        int k3 = p1Y - (60 * p1Diam) / 100;
        j2 = (j3 * nWidth) / 1000;
        k2 = (4 * nHeight) / 5 - i2 - (k3 * nHeight) / 1000;
        int l3 = j2 - l;
        int i4 = k2 - i1;
        int j4 = (int)Math.sqrt(l3 * l3 + i4 * i4);
        int k4 = ((nWidth / 50) * p1Diam) / 100;
        int l4 = ((nHeight / 25) * p1Diam) / 100;
        g1.setColor(Color.white);
        g1.fillOval(j2 - k4, k2 - l4, k4, l4);
        g1.setColor(Color.black);
        g1.fillOval(j2 - (4 * l3) / j4 - (3 * k4) / 4, k2 - (4 * i4) / j4 - (3 * l4) / 4, k4 / 2, l4 / 2);
        l1 = (nWidth * p2Diam) / 1000;
        i2 = (nHeight * p2Diam) / 1000;
        j2 = (p2OldX * nWidth) / 1000 - l1 / 2;
        k2 = (4 * nHeight) / 5 - i2 - (p2OldY * nHeight) / 1000;
        g1.setColor(SKY_COL);
        g1.fillRect(j2, k2, l1, i2);
        ai1 = new int[4];
        ai1[0] = j2;
        ai1[1] = k2;
        ai1[2] = j2 + l1;
        ai1[3] = k2 + i2;
        l1 = (nWidth * p2Diam) / 1000;
        i2 = (nHeight * p2Diam) / 1000;
        j2 = (p2X * nWidth) / 1000 - l1 / 2;
        k2 = (4 * nHeight) / 5 - (p2Diam * nHeight) / 1000 - (p2Y * nHeight) / 1000;
        g1.setColor(!fP2Fire || !superFlash ? slimeColours[p2Col] : Color.white);
        l2 = j2;
        i3 = k2;
        if(j2 < ai1[0])
            ai1[0] = j2;
        if(k2 < ai1[1])
            ai1[1] = k2;
        if(j2 + l1 > ai1[2])
            ai1[2] = j2 + l1;
        if(k2 + i2 > ai1[3])
            ai1[3] = k2 + i2;
        redrawRegions.add(ai1);
        g1.fillArc(j2, k2, l1, 2 * i2, 0, 180);
        j3 = p2X - (18 * p2Diam) / 100;
        k3 = p2Y - (60 * p2Diam) / 100;
        j2 = (j3 * nWidth) / 1000;
        k2 = (4 * nHeight) / 5 - i2 - (k3 * nHeight) / 1000;
        l3 = j2 - l;
        i4 = k2 - i1;
        j4 = (int)Math.sqrt(l3 * l3 + i4 * i4);
        k4 = ((nWidth / 50) * p2Diam) / 100;
        l4 = ((nHeight / 25) * p2Diam) / 100;
        g1.setColor(Color.white);
        g1.fillOval(j2 - k4, k2 - l4, k4, l4);
        g1.setColor(Color.black);
        g1.fillOval(j2 - (4 * l3) / j4 - (3 * k4) / 4, k2 - (4 * i4) / j4 - (3 * l4) / 4, k4 / 2, l4 / 2);
        if(!fP1Fire && !fP2Fire)
            superFlash = false;
        l = (ballX * nWidth) / 1000;
        i1 = (4 * nHeight) / 5 - (ballY * nHeight) / 1000;
        g1.setColor(BALL_COL);
        g1.fillOval(l - k, i1 - k, 2 * k, 2 * k);
        ai1 = new int[4];
        ai1[0] = j1 - k;
        ai1[1] = k1 - k;
        ai1[2] = j1 + k;
        ai1[3] = k1 + k;
        if(l - k < ai1[0])
            ai1[0] = l - k;
        if(i1 - k < ai1[1])
            ai1[1] = i1 - k;
        if(l + k > ai1[2])
            ai1[2] = l + k;
        if(i1 + k > ai1[3])
            ai1[3] = i1 + k;
        redrawRegions.add(ai1);
    }

    private void hPalecockatooMustang()
    {
        byte byte0 = 5;
        int k = 15;
        int l = 22;
        ballY += --ballVY;
        ballX += ballVX;
        if(!fEndGame)
        {
            int i1 = 2 * (ballX - p1X);
            int j1 = ballY - p1Y;
            int k1 = (int)Math.sqrt(i1 * i1 + j1 * j1);
            int l1 = ballVX - p1XV;
            int i2 = ballVY - p1YV;
            if(j1 > 0 && k1 < p1Diam + ballRad && k1 > byte0)
            {
                int j2 = (i1 * l1 + j1 * i2) / k1;
                ballX = p1X + (((p1Diam + ballRad) / 2) * i1) / k1;
                ballY = p1Y + ((p1Diam + ballRad) * j1) / k1;
                if(j2 <= 0)
                {
                    ballVX += p1XV - (2 * i1 * j2) / k1;
                    if(ballVX < -k)
                        ballVX = -k;
                    if(ballVX > k)
                        ballVX = k;
                    ballVY += p1YV - (2 * j1 * j2) / k1;
                    if(ballVY < -l)
                        ballVY = -l;
                    if(ballVY > l)
                        ballVY = l;
                }
                if(fServerMoved)
                {
                    fP1Touched = true;
                    fP1Touches++;
                    fP2Touches = 0;
                    fP1HitStill = p1YV == 0 && p1XV == 0;
                    hitNetSinceTouched = false;
                }
            }
            i1 = 2 * (ballX - p2X);
            j1 = ballY - p2Y;
            k1 = (int)Math.sqrt(i1 * i1 + j1 * j1);
            l1 = ballVX - p2XV;
            i2 = ballVY - p2YV;
            if(j1 > 0 && k1 < p2Diam + ballRad && k1 > byte0)
            {
                int k2 = (i1 * l1 + j1 * i2) / k1;
                ballX = p2X + (((p2Diam + ballRad) / 2) * i1) / k1;
                ballY = p2Y + ((p2Diam + ballRad) * j1) / k1;
                if(k2 <= 0)
                {
                    ballVX += p2XV - (2 * i1 * k2) / k1;
                    if(ballVX < -k)
                        ballVX = -k;
                    if(ballVX > k)
                        ballVX = k;
                    ballVY += p2YV - (2 * j1 * k2) / k1;
                    if(ballVY < -l)
                        ballVY = -l;
                    if(ballVY > l)
                        ballVY = l;
                }
                if(fServerMoved)
                {
                    fP2Touched = true;
                    fP2Touches++;
                    fP1Touches = 0;
                    fP2HitStill = p2YV == 0 && p2XV == 0;
                    hitNetSinceTouched = false;
                }
            }
            if(ballX < 15)
            {
                ballX = 15;
                ballVX = -ballVX;
            }
            if(ballX > 985)
            {
                ballX = 985;
                ballVX = -ballVX;
            }
            if(ballX > 480 && ballX < 520 && ballY < 140)
                if(ballVY < 0 && ballY > 130)
                {
                    ballVY *= -1;
                    ballY = 130;
                } else
                if(ballX < 500)
                {
                    ballX = 480;
                    ballVX = ballVX < 0 ? ballVX : -ballVX;
                    hitNetSinceTouched = true;
                } else
                {
                    ballX = 520;
                    ballVX = ballVX > 0 ? ballVX : -ballVX;
                    hitNetSinceTouched = true;
                }
        }
    }

    private void _mthgotoSapphirewhipElf()
    {
        if(replaying)
            return;
        Graphics g1 = getGraphics();
        FontMetrics fontmetrics = g1.getFontMetrics();
        int k = nHeight / 15;
        int l = 20;
        for(int i1 = 0; i1 < 6; i1++)
        {
            if(fP1PointsWon >= i1 + 1)
            {
                g1.setColor(slimeColours[p1Col]);
                g1.fillOval(l, 30 - k / 2, k, k);
            }
            g1.setColor(Color.white);
            g1.drawOval(l, 30 - k / 2, k, k);
            l += k + 10;
        }

        l = nWidth - 20 - 6 * (k + 10);
        for(int j1 = 0; j1 < 6; j1++)
        {
            if(fP2PointsWon >= 6 - j1)
            {
                g1.setColor(slimeColours[p2Col]);
                g1.fillOval(l, 30 - k / 2, k, k);
            }
            g1.setColor(Color.white);
            g1.drawOval(l, 30 - k / 2, k, k);
            l += k + 10;
        }

    }

    private String aButtoncrystalThorn(long l)
    {
        String s = "";
        long l1 = (l / 10L) % 100L;
        long l2 = (l / 1000L) % 60L;
        long l3 = (l / 60000L) % 60L;
        long l4 = l / 0x36ee80L;
        s = s + l3 + ":";
        if(l2 < 10L)
            s = s + "0";
        s = s + l2;
        return s;
    }

    private void _mthbyteSparkladyNape()
    {
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        int k = nHeight / 20;
        g1.setColor(SKY_COL);
        g1.setFont(screen.getFont());
        FontMetrics fontmetrics = g1.getFontMetrics();
        String s = (oneplayer ? "Score: " + gameScore : "") + (fInPlay ? "   Time: " + aButtoncrystalThorn((paused ? pausedTime : System.currentTimeMillis()) - startTime) : "");
        int l = fontmetrics.stringWidth(s);
        int i1 = nWidth / 2 - l / 2 - 10;
        g1.fillRect(i1, 0, l + 20, k + 22);
        g1.setColor(Color.white);
        int j1 = fontmetrics.stringWidth(s);
        int k1 = nWidth / 2 - j1 / 2;
        int l1 = fontmetrics.getHeight() * 2;
        g1.drawString(s, k1, l1);
        redrawRegions.add(new int[] {
            k1, 0, k1 + j1, l1 + l1 / 2
        });
    }

    public void _mthintScythechinHorse()
    {
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        g1.setFont(screen.getFont());
        screen.setColor(COURT_COL);
        screen.fillRect(0, (4 * nHeight) / 5 + 6, nWidth, nHeight / 5 - 10);
        aTimemoleDog(promptMsg, 0);
    }

    public void aTimemoleDog(String s, int k)
    {
        Graphics g1 = getGraphics();
        g1.setFont(new Font(g1.getFont().getName(), 1, 15));
        FontMetrics fontmetrics = g1.getFontMetrics();
        g1.setColor(Color.white);
        int l = fontmetrics.stringWidth(s);
        int i1 = (nWidth - l) / 2;
        int j1 = (nHeight * 4) / 5 + fontmetrics.getHeight() * (k + 1) + 10;
        g1.drawString(s, i1, j1);
        _mthgotoSapphirewhipElf();
        _mthbyteSparkladyNape();
        redrawRegions.add(new int[] {
            i1, j1, i1 + l + 1, j1 + fontmetrics.getHeight()
        });
    }

    private void aWatermooseGecko(int k)
    {
        aTreasurearrowThief(k, true);
    }

    private void aTreasurearrowThief(int k, boolean flag)
    {
        int l = k == 0 ? replayData.length - 1 : k - 1;
        p1OldX = replayData[l][0];
        p1OldY = replayData[l][1];
        p2OldX = replayData[l][2];
        p2OldY = replayData[l][3];
        ballOldX = replayData[l][4];
        ballOldY = replayData[l][5];
        p1X = replayData[k][0];
        p1Y = replayData[k][1];
        p2X = replayData[k][2];
        p2Y = replayData[k][3];
        ballX = replayData[k][4];
        ballY = replayData[k][5];
        ballVX = 0;
        ballVY = 1;
        if(ballOldX == 0 && ballOldY == 0)
            ballOldX = ballOldY = -500;
        if(ballX == ballOldX && ballY == ballOldY)
            ballOldX = ballOldY = -500;
        _mthifJadeflierLancer();
        if(buffered)
            getGraphics().drawImage(buffer, 0, 0, null);
    }

    private void gBeadmarkFoe()
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

    private void fSlashgorillaPlayer()
    {
        replaying = true;
        _mthvoidCatcentaurMustang();
        Graphics g1 = buffered ? buffer.getGraphics() : getGraphics();
        FontMetrics fontmetrics = g1.getFontMetrics();
        int k = fontmetrics.getHeight();
        promptMsg = "Press space to continue...";
        mousePressed = false;
        int l = scoringRun;
        scoringRun = oldScoringRun;
        int i1 = replayStart;
        boolean flag = false;
        while(!mousePressed) 
        {
            if(++i1 >= replayData.length)
                i1 = 0;
            if(i1 == replayIndex)
            {
                g1.setColor(Color.white);
                g1.fillRect(20, 20, 20, 20);
                aCutegraspPig(1000L, false);
                flag = !flag;
                paint(g1);
                g1.setColor(SKY_COL);
                g1.fillRect(0, 0, nWidth, nHeight / 20 + 22);
                if(replayIndex < replayStart)
                    i1 += replayData.length;
                while(i1 > replayStart) 
                {
                    i1 -= 5;
                    _mthvoidCatcentaurMustang();
                    g1.setColor(Color.white);
                    g1.fillPolygon(new Polygon(new int[] {
                        20, 35, 35, 50, 50, 35, 35, 20
                    }, new int[] {
                        30, 20, 30, 20, 40, 30, 40, 30
                    }, 8));
                    if(i1 < replayStart)
                        i1 = replayStart;
                    aTreasurearrowThief(i1 % replayData.length, false);
                    aCutegraspPig(20L, false);
                }
                _mthvoidCatcentaurMustang();
                g1.setColor(Color.white);
                g1.fillRect(20, 20, 20, 20);
                aWatermooseGecko(replayStart);
                aCutegraspPig(500L, false);
                _mthvoidCatcentaurMustang();
            }
            aWatermooseGecko(i1);
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
        scoringRun = l;
        promptMsg = "";
        paint(g1);
        replaying = false;
    }

    public void run()
    {
        replayIndex = replayStart = 0;
        _mthintScythechinHorse();
        superFlash = false;
        scoringRun = 0;
        fP1Touches = 0;
        fP2Touches = 0;
        fP1TouchesTot = 0;
        fP2TouchesTot = 0;
        fP1Clangers = 0;
        fP2Clangers = 0;
        fP1Aces = 0;
        fP2Aces = 0;
        fP1Winners = 0;
        fP2Winners = 0;
        fP1Frames = 0L;
        fP2Frames = 0L;
        fP1Super = 0;
        fP2Super = 0;
        fP1HitStill = false;
        fP2HitStill = false;
        fServerMoved = false;
        _mthgotoSapphirewhipElf();
        fP1Touched = fP2Touched = false;
        hitNetSinceTouched = false;
        boolean flag = false;
        boolean flag4 = false;
        boolean flag5 = false;
        gameOver = false;
        Graphics g1 = buffer.getGraphics();
        startTime = System.currentTimeMillis();
        _mthvoidCatcentaurMustang();
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
                iWinterfaceSwoop();
                hPalecockatooMustang();
                _mthbyteSparkladyNape();
                _mthgotoSapphirewhipElf();
                _mthifJadeflierLancer();
                _mthdoFantasyninjaReaper();
                gBeadmarkFoe();
            }
            if(ballY < 35)
            {
                long l = System.currentTimeMillis();
                if(ballX > 500)
                    fP1PointsWon++;
                else
                    fP2PointsWon++;
                if(ballX <= 500 && (fP1Touches >= 3 || hitNetSinceTouched && fP1Touches > 0 || !fP2Touched || fP1HitStill && fP1Touches > 0))
                {
                    fP1Clangers++;
                    boolean flag1 = true;
                } else
                if(ballX > 500 && (fP2Touches >= 3 || hitNetSinceTouched && fP2Touches > 0 || !fP1Touched || fP2HitStill && fP2Touches > 0))
                {
                    fP2Clangers++;
                    boolean flag2 = true;
                }
                if(fP1Touched && !fP2Touched && ballX >= 500)
                {
                    fP1Aces++;
                    flag4 = true;
                    gameScore += 200 * _mthcaseGlimmerserpentRidge();
                } else
                if(fP2Touched && !fP1Touched && ballX < 500)
                {
                    fP2Aces++;
                    flag4 = true;
                } else
                if(ballX > 500 && fP1Touches > 0)
                {
                    fP1Winners++;
                    flag5 = true;
                    gameScore += 100 * _mthcaseGlimmerserpentRidge();
                } else
                if(ballX <= 500 && fP2Touches > 0)
                {
                    fP2Winners++;
                    flag5 = true;
                }
                if(ballX > 500 && !flag5 && !flag4)
                    gameScore += 50 * _mthcaseGlimmerserpentRidge();
                if(oneplayer)
                    promptMsg = ballX > 500 ? slimeColText[p1Col] : slimeColText[p2Col];
                else
                    promptMsg = slimeColText[p1Col] + (ballX > 500 ? "1 " : "2 ");
                if(fP1PointsWon == 6 || fP2PointsWon == 6)
                    promptMsg += "wins!";
                else
                if(flag4)
                    promptMsg += "aces the serve!";
                else
                if(flag5)
                    promptMsg += "scores a winner!";
                else
                if(ballX > 500 && !fP1Touched && fP2Touched || ballX <= 500 && fP1Touched && !fP2Touched)
                    promptMsg += "laughs at his opponent's inability to serve!";
                else
                if(fP1PointsWon == fP2PointsWon)
                    promptMsg += "draws level!";
                else
                if(ballX > 500 && fP1PointsWon == fP2PointsWon + 1 || ballX <= 500 && fP1PointsWon + 1 == fP2PointsWon)
                    promptMsg += "takes the lead!";
                else
                    promptMsg += "scores!";
                int k = ballX;
                _mthintScythechinHorse();
                _mthgotoSapphirewhipElf();
                _mthbyteSparkladyNape();
                boolean flag3 = false;
                flag4 = false;
                flag5 = false;
                mousePressed = false;
                aCutegraspPig(1500L, true);
                if(mousePressed)
                {
                    gBeadmarkFoe();
                    fSlashgorillaPlayer();
                }
                if(fP1PointsWon == 6 || fP2PointsWon == 6)
                    aCanyonchatterGazelle();
                promptMsg = "";
                _mthforPicklemustangRacer();
                ballX = k < 500 ? 800 : 200;
                _mthvoidCatcentaurMustang();
                repaint();
                startTime += System.currentTimeMillis() - l;
            }
            if(gameThread != null)
                aCutegraspPig(20L, true);
        } while(true);
        fEndGame = true;
        fInPlay = false;
        repaint();
    }

    private void aCanyonchatterGazelle()
    {
        if(!oneplayer)
            aFieldlionCrest(fP1PointsWon > fP2PointsWon);
        else
        if(fP1PointsWon == 6)
        {
            gameTime = System.currentTimeMillis() - startTime;
            if(fP1PointsWon == 6)
            {
                gameScore += ((1000 * fP1PointsWon) / (fP1PointsWon + fP2PointsWon)) * _mthcaseGlimmerserpentRidge();
                gameScore += ((gameTime >= 0x493e0L ? 0L : 0x493e0L - gameTime) / 1000L) * (long) _mthcaseGlimmerserpentRidge();
            }
            if(fP2PointsWon == 0)
                gameScore += 1000 * _mthcaseGlimmerserpentRidge();
            if(aiMode == 4)
            {
                aiMode = 5;
                _mthifJunglestingRaccoon(true);
            }
        } else
        {
            _mthifJunglestingRaccoon(false);
        }
        fInPlay = false;
        gameThread = null;
        _mthvoidCatcentaurMustang();
        repaint();
    }

    private void aFieldlionCrest(boolean flag)
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        _mthgotoSapphirewhipElf();
        _mthbyteSparkladyNape();
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        FontMetrics fontmetrics1 = g1.getFontMetrics();
        g1.setColor(COURT_COL);
        String as[] = {
            "C'mon player " + (flag ? 1 : 2) + ", I'll take you on!", "Inferior human controlled slime " + (flag ? 2 : 1) + " is insipid!", "Inferior human controlled slime " + (flag ? 2 : 1) + " is rubbish!", "Super inferior human controlled slime " + (flag ? 1 : 2) + " wins!", "You're both yellow cowards. Play me instead!"
        };
        String s = as[(int)((double)as.length * Math.random())];
        g1.fillRect((nWidth - fontmetrics1.stringWidth(s)) / 2 - 30, nHeight / 2 - fontmetrics1.getAscent() * 5, fontmetrics1.stringWidth(s) + 60, fontmetrics1.getAscent() * 5 + fontmetrics.getAscent() * 2);
        g1.setColor(Color.white);
        g1.drawString(s, (nWidth - fontmetrics1.stringWidth(s)) / 2, nHeight / 2 - fontmetrics1.getAscent() * 3);
        g1.setFont(screen.getFont());
        g1.drawString("GAME OVER", (nWidth - fontmetrics.stringWidth("GAME OVER")) / 2, nHeight / 2 + fontmetrics.getAscent());
        repaint();
        aCutegraspPig(3000L, false);
        gameOver = true;
    }

    private void _mthifJunglestingRaccoon(boolean flag)
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        _mthgotoSapphirewhipElf();
        _mthbyteSparkladyNape();
        Graphics g1;
        if(buffered)
            g1 = buffer.getGraphics();
        else
            g1 = getGraphics();
        FontMetrics fontmetrics1 = g1.getFontMetrics();
        if(!flag)
        {
            g1.setColor(COURT_COL);
            g1.fillRect((nWidth - aLovesoarerLeader(fontmetrics1.stringWidth(loserText1[aiMode]), fontmetrics1.stringWidth(loserText2[aiMode]))) / 2 - 30, nHeight / 2 - fontmetrics1.getAscent() * 5, aLovesoarerLeader(fontmetrics1.stringWidth(loserText1[aiMode]), fontmetrics1.stringWidth(loserText2[aiMode])) + 60, fontmetrics1.getAscent() * 5 + fontmetrics.getAscent() * 2);
            g1.setColor(Color.white);
            g1.drawString(loserText1[aiMode], (nWidth - fontmetrics1.stringWidth(loserText1[aiMode])) / 2, nHeight / 2 - fontmetrics1.getAscent() * 3);
            g1.drawString(loserText2[aiMode], (nWidth - fontmetrics1.stringWidth(loserText2[aiMode])) / 2, nHeight / 2 - fontmetrics1.getAscent() * 2);
            g1.setFont(screen.getFont());
            g1.drawString("GAME OVER", (nWidth - fontmetrics.stringWidth("GAME OVER")) / 2, nHeight / 2 + fontmetrics.getAscent());
        } else
        {
            aSugarotterDevourer(g1);
            g1.setColor(Color.white);
            g1.setFont(screen.getFont());
            g1.drawString("YOU WIN!", (nWidth - fontmetrics.stringWidth("YOU WIN!")) / 2, nHeight / 2);
            g1.drawString("The Slimes bow down before the new Slime King!", (nWidth - fontmetrics1.stringWidth("The Slimes bow down before the new Slime King!")) / 2, nHeight / 2 + fontmetrics1.getAscent());
        }
        if(buffered)
            repaint();
        NameFrame nameframe;
        try
        {
            if(g_ProudtalonGull.aDotlizardWeasel(this, gameScore))
                nameframe = new NameFrame(this, gameScore, aiMode);
        }
        catch(Exception exception) { }
        aCutegraspPig(3000L, false);
        gameOver = true;
        _mthvoidCatcentaurMustang();
        repaint();
    }

    private void aSugarotterDevourer(Graphics g1)
    {
    }

    private int aLovesoarerLeader(int k, int l)
    {
        if(k > l)
            return k;
        else
            return l;
    }

    private void aCutegraspPig(long l, boolean flag)
    {
        if(gameThread != null)
        {
            for(int k = 0; (long)k < l / 20L; k++)
                try
                {
                    Thread _tmp = gameThread;
                    Thread.sleep(20L);
                }
                catch(InterruptedException interruptedexception) { }

        }
    }

    private int _mthcaseGlimmerserpentRidge()
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
    private Graphics screen;
    private String promptMsg;
    private boolean mousePressed;
    private boolean fInPlay;
    private boolean fP1Fire;
    private boolean fP2Fire;
    private boolean superFlash;
    private boolean fP1Touched;
    private boolean fP2Touched;
    private int fP1Touches;
    private int fP2Touches;
    private int fP1TouchesTot;
    private int fP2TouchesTot;
    private int fP1Clangers;
    private int fP2Clangers;
    private int fP1Aces;
    private int fP2Aces;
    private int fP1Winners;
    private int fP2Winners;
    private int fP1PointsWon;
    private int fP2PointsWon;
    private boolean fP1HitStill;
    private boolean fP2HitStill;
    private long fP1Frames;
    private long fP2Frames;
    private int fP1Super;
    private int fP2Super;
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
    private String slimeColText[];
    private Color slimeColours[];
    private String loserText1[];
    private String loserText2[];
    private Color SKY_COL;
    private Color COURT_COL;
    private Color BALL_COL;
    private int p1Run;
    private int p2Run;
    private int p1Jump;
    private int p2Jump;
    private final int pointsToWin = 6;
    private int aiMode;
    private c_ForesthuggerCrest ai;
    private int gameScore;
    private boolean gameOver;
    private int boundsP1select[];
    private int boundsP2select[];
    private boolean oneplayer;
    private int ballRad;
    private BufferedImage buffer;
    private Vector redrawRegions;
    private boolean buffered;
    private int replayData[][];
    private int replayIndex;
    private int replayStart;
    private boolean replaying;
}
