// Decompiled by Jad v1.5.8e. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.geocities.com/kpdus/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   Slime2P.java

import java.applet.Applet;
import java.awt.*;

public class Slime2P extends Applet
    implements Runnable
{

    public boolean handleEvent(Event event)
    {
label0:
        switch(event.id)
        {
        default:
            break;

        case 503: // Event.MOUSE_MOVE
            showStatus("Slime Volleyball 2-Player, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
            break;

        case 501: // Event.MOUSE_DOWN
            mousePressed = true;
            if(!fInPlay)
            {
                fEndGame = false;
                fInPlay = true;
                nScore = 5;
                nPointsScored = 0;
                p1X = 200;
                p1Y = 0;
                p2X = 800;
                p2Y = 0;
                p1XV = 0;
                p1YV = 0;
                p2XV = 0;
                p2YV = 0;
                ballX = 200;
                ballY = 400;
                ballVX = 0;
                ballVY = 0;
                promptMsg = "";
                repaint();
                gameThread = new Thread(this);
                gameThread.start();
            }
            break;

        case 401: // Event.KEY_PRESS
        case 403: // Event.KEY_ACTION
            if(fEndGame)
                break;
            switch(event.key)
            {
            default:
                break;

            case 65: // 'A'
            case 97: // 'a'
                p1XV = scoringRun > -3 ? -8 : -16;
                break label0;

            case 68: // 'D'
            case 100: // 'd'
                p1XV = scoringRun > -3 ? 8 : 16;
                break label0;

            case 87: // 'W'
            case 119: // 'w'
                if(p1Y == 0)
                    p1YV = scoringRun > -3 ? 31 : 45;
                break label0;

            case 74: // 'J'
            case 106: // 'j'
            case 1006: 
                p2XV = scoringRun < 3 ? -8 : -16;
                break label0;

            case 76: // 'L'
            case 108: // 'l'
            case 1007: 
                p2XV = scoringRun < 3 ? 8 : 16;
                break label0;

            case 73: // 'I'
            case 105: // 'i'
            case 1004: 
                if(p2Y == 0)
                    p2YV = scoringRun < 3 ? 31 : 45;
                break label0;

            case 83: // 'S'
            case 115: // 's'
                if(!fCanChangeCol)
                    break label0;
                do
                    p1Col = p1Col == 4 ? 0 : p1Col + 1;
                while(p1Col == p2Col);
                drawScores();
                break label0;

            case 75: // 'K'
            case 107: // 'k'
            case 1005: 
                if(fCanChangeCol)
                {
                    do
                        p2Col = p2Col == 4 ? 0 : p2Col + 1;
                    while(p2Col == p1Col);
                    drawScores();
                    break label0;
                }
                // fall through

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
                    p1XV = 0;
                break label0;

            case 68: // 'D'
            case 100: // 'd'
                if(p1XV > 0)
                    p1XV = 0;
                break label0;

            case 74: // 'J'
            case 106: // 'j'
            case 1006: 
                if(p2XV < 0)
                    p2XV = 0;
                break label0;

            case 76: // 'L'
            case 108: // 'l'
            case 1007: 
                break;
            }
            if(p2XV > 0)
                p2XV = 0;
            break;
        }
        return false;
    }

    private void DrawSlimers()
    {
        int i = nWidth / 10;
        int j = nHeight / 10;
        int k = nWidth / 50;
        int l = nHeight / 25;
        int i1 = (ballX * nWidth) / 1000;
        int j1 = (4 * nHeight) / 5 - (ballY * nHeight) / 1000;
        int k1 = (p1OldX * nWidth) / 1000 - i / 2;
        int l1 = (7 * nHeight) / 10 - (p1OldY * nHeight) / 1000;
        screen.setColor(Color.blue);
        screen.fillRect(k1, l1, i, j);
        k1 = (p2OldX * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p2OldY * nHeight) / 1000;
        screen.setColor(Color.blue);
        screen.fillRect(k1, l1, i, j);
        MoveBall();
        k1 = (p1X * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p1Y * nHeight) / 1000;
        screen.setColor(scoringRun > -3 ? slimeColours[p1Col] : slimeColours[frenzyCol = (frenzyCol + 1) % slimeColours.length]);
        screen.fillArc(k1, l1, i, 2 * j, 0, 180);
        int i2 = p1X + 38;
        int j2 = p1Y - 60;
        k1 = (i2 * nWidth) / 1000;
        l1 = (7 * nHeight) / 10 - (j2 * nHeight) / 1000;
        int k2 = k1 - i1;
        int l2 = l1 - j1;
        int i3 = (int)Math.sqrt(k2 * k2 + l2 * l2);
        boolean flag = Math.random() < 0.01D;
        if(flag)
            p1Blink = 5;
        if(p1Blink == 0)
        {
            screen.setColor(Color.white);
            screen.fillOval(k1 - k, l1 - l, k, l);
            if(i3 > 0 && !flag)
            {
                screen.setColor(Color.black);
                screen.fillOval(k1 - (4 * k2) / i3 - (3 * k) / 4, l1 - (4 * l2) / i3 - (3 * l) / 4, k / 2, l / 2);
            }
        } else
        {
            p1Blink--;
        }
        k1 = (p2X * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p2Y * nHeight) / 1000;
        screen.setColor(scoringRun < 3 ? slimeColours[p2Col] : slimeColours[frenzyCol = (frenzyCol + 1) % slimeColours.length]);
        screen.fillArc(k1, l1, i, 2 * j, 0, 180);
        i2 = p2X - 18;
        j2 = p2Y - 60;
        k1 = (i2 * nWidth) / 1000;
        l1 = (7 * nHeight) / 10 - (j2 * nHeight) / 1000;
        k2 = k1 - i1;
        l2 = l1 - j1;
        i3 = (int)Math.sqrt(k2 * k2 + l2 * l2);
        flag = Math.random() < 0.01D;
        if(flag)
            p2Blink = 5;
        if(p2Blink == 0)
        {
            screen.setColor(flag ? Color.gray : Color.white);
            screen.fillOval(k1 - k, l1 - l, k, l);
            if(i3 > 0 && !flag)
            {
                screen.setColor(Color.black);
                screen.fillOval(k1 - (4 * k2) / i3 - (3 * k) / 4, l1 - (4 * l2) / i3 - (3 * l) / 4, k / 2, l / 2);
            }
        } else
        {
            p2Blink--;
        }
        if(nScore > 8)
        {
            int j3 = (p1X * nWidth) / 1000;
            int l3 = (7 * nHeight) / 10 - ((p1Y - 40) * nHeight) / 1000;
            int j4 = nWidth / 20;
            int l4 = nHeight / 20;
            int j5 = 0;
            do
            {
                screen.setColor(Color.black);
                screen.drawArc(j3, l3 + j5, j4, l4, -30, -150);
            } while(++j5 < 3);
            return;
        }
        if(nScore < 2)
        {
            int k3 = nWidth / 20;
            int i4 = nHeight / 20;
            int k4 = (p2X * nWidth) / 1000 - k3;
            int i5 = (7 * nHeight) / 10 - ((p2Y - 40) * nHeight) / 1000;
            int k5 = 0;
            do
            {
                screen.setColor(Color.black);
                screen.drawArc(k4, i5 + k5, k3, i4, -10, -150);
            } while(++k5 < 3);
        }
    }

    public void paint(Graphics g)
    {
        nWidth = size().width;
        nHeight = size().height;
        g.setColor(Color.blue);
        g.fillRect(0, 0, nWidth, (4 * nHeight) / 5);
        g.setColor(Color.gray);
        g.fillRect(0, (4 * nHeight) / 5, nWidth, nHeight / 5);
        g.setColor(Color.white);
        g.fillRect(nWidth / 2 - 2, (7 * nHeight) / 10, 4, nHeight / 10 + 5);
        drawScores();
        drawPrompt();
        if(!fInPlay)
        {
            FontMetrics fontmetrics = screen.getFontMetrics();
            screen.setColor(Color.white);
            screen.drawString("Slime Volleyball!", nWidth / 2 - fontmetrics.stringWidth("Slime Volleyball!") / 2, nHeight / 2 - fontmetrics.getHeight());
            g.setColor(Color.white);
            fontmetrics = g.getFontMetrics();
            g.drawString("Written by Quin Pendragon", nWidth / 2 - fontmetrics.stringWidth("Written by Quin Pendragon") / 2, nHeight / 2 + fontmetrics.getHeight() * 2);
        }
    }

    public void destroy()
    {
        gameThread.stop();
        gameThread = null;
    }

    private void ReplayFrame(int i, int j, int k, int l, int i1, boolean flag)
    {
        if(flag)
        {
            ballX = ballOldX = 0xfd050f80;
            ballY = ballOldY = 0x186a0;
            p1OldX = p1OldY = p2OldX = p2OldY = -10000;
        } else
        {
            int j1 = i == 0 ? 199 : i - 1;
            p1OldX = replayData[j1][0];
            p1OldY = replayData[j1][1];
            p2OldX = replayData[j1][2];
            p2OldY = replayData[j1][3];
            ballOldX = replayData[j1][4];
            ballOldY = replayData[j1][5];
        }
        p1X = replayData[i][0];
        p1Y = replayData[i][1];
        p2X = replayData[i][2];
        p2Y = replayData[i][3];
        ballX = replayData[i][4];
        ballY = replayData[i][5];
        p1Col = replayData[i][6];
        p2Col = replayData[i][7];
        ballVX = 0;
        ballVY = 1;
        if((i / 10) % 2 > 0)
        {
            screen.setColor(Color.red);
            screen.drawString("Replay...", j, k);
        } else
        {
            screen.setColor(Color.blue);
            screen.fillRect(j, k - i1, l, i1 * 2);
        }
        DrawSlimers();
        try
        {
            Thread.sleep(20L);
            return;
        }
        catch(InterruptedException _ex)
        {
            return;
        }
    }

    private String MakeTime(long l)
    {
        long l1 = (l / 10L) % 100L;
        long l2 = (l / 1000L) % 60L;
        long l3 = (l / 60000L) % 60L;
        long l4 = l / 0x36ee80L;
        String s = "";
        if(l4 < 10L)
            s = s + "0";
        s = s + l4;
        s = s + ":";
        if(l3 < 10L)
            s = s + "0";
        s = s + l3;
        s = s + ":";
        if(l2 < 10L)
            s = s + "0";
        s = s + l2;
        s = s + ":";
        if(l1 < 10L)
            s = s + "0";
        s = s + l1;
        return s;
    }

    private void MoveSlimers()
    {
        p1X += p1XV;
        if(p1X < 50)
            p1X = 50;
        if(p1X > 445)
            p1X = 445;
        if(p1YV != 0)
        {
            p1Y += p1YV -= scoringRun > -3 ? 2 : 4;
            if(p1Y < 0)
            {
                p1Y = 0;
                p1YV = 0;
            }
        }
        p2X += p2XV;
        if(p2X > 950)
            p2X = 950;
        if(p2X < 555)
            p2X = 555;
        if(p2YV != 0)
        {
            p2Y += p2YV -= scoringRun < 3 ? 2 : 4;
            if(p2Y < 0)
            {
                p2Y = 0;
                p2YV = 0;
            }
        }
    }

    public Slime2P()
    {
        p2Col = 1;
        slimeColours = (new Color[] {
            Color.red, Color.green, Color.yellow, Color.white, Color.black
        });
        replayData = new int[200][8];
    }

    private void MoveBall()
    {
        int i = (30 * nHeight) / 1000;
        int j = (ballOldX * nWidth) / 1000;
        int k = (4 * nHeight) / 5 - (ballOldY * nHeight) / 1000;
        screen.setColor(Color.blue);
        screen.fillOval(j - i, k - i, i * 2, i * 2);
        ballY += --ballVY;
        ballX += ballVX;
        if(!fEndGame)
        {
            int l = (ballX - p1X) * 2;
            int i1 = ballY - p1Y;
            int j1 = l * l + i1 * i1;
            int k1 = ballVX - p1XV;
            int l1 = ballVY - p1YV;
            if(i1 > 0 && j1 < 15625 && j1 > 25)
            {
                int i2 = (int)Math.sqrt(j1);
                int k2 = (l * k1 + i1 * l1) / i2;
                ballX = p1X + (l * 63) / i2;
                ballY = p1Y + (i1 * 125) / i2;
                if(k2 <= 0)
                {
                    ballVX += p1XV - (2 * l * k2) / i2;
                    if(ballVX < -15)
                        ballVX = -15;
                    if(ballVX > 15)
                        ballVX = 15;
                    ballVY += p1YV - (2 * i1 * k2) / i2;
                    if(ballVY < -22)
                        ballVY = -22;
                    if(ballVY > 22)
                        ballVY = 22;
                }
                fP1Touched = true;
            }
            l = (ballX - p2X) * 2;
            i1 = ballY - p2Y;
            j1 = l * l + i1 * i1;
            k1 = ballVX - p2XV;
            l1 = ballVY - p2YV;
            if(i1 > 0 && j1 < 15625 && j1 > 25)
            {
                int j2 = (int)Math.sqrt(j1);
                int l2 = (l * k1 + i1 * l1) / j2;
                ballX = p2X + (l * 63) / j2;
                ballY = p2Y + (i1 * 125) / j2;
                if(l2 <= 0)
                {
                    ballVX += p2XV - (2 * l * l2) / j2;
                    if(ballVX < -15)
                        ballVX = -15;
                    if(ballVX > 15)
                        ballVX = 15;
                    ballVY += p2YV - (2 * i1 * l2) / j2;
                    if(ballVY < -22)
                        ballVY = -22;
                    if(ballVY > 22)
                        ballVY = 22;
                }
                fP2Touched = true;
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
                } else
                {
                    ballX = 520;
                    ballVX = ballVX > 0 ? ballVX : -ballVX;
                }
        }
        j = (ballX * nWidth) / 1000;
        k = (4 * nHeight) / 5 - (ballY * nHeight) / 1000;
        screen.setColor(Color.yellow);
        screen.fillOval(j - i, k - i, i * 2, i * 2);
    }

    private void DrawStatus()
    {
        Graphics g = screen;
        int i = nHeight / 20;
        g.setColor(Color.blue);
        FontMetrics fontmetrics = screen.getFontMetrics();
        int j = nWidth / 2 + ((nScore - 5) * nWidth) / 24;
        String s = "Points: " + nPointsScored + "   Elapsed: " + MakeTime(gameTime);
        int k = fontmetrics.stringWidth(s);
        g.fillRect(j - k / 2 - 5, 0, k + 10, i + 22);
        g.setColor(Color.white);
        screen.drawString(s, j - k / 2, fontmetrics.getAscent() + 20);
    }

    public void drawPrompt()
    {
        screen.setColor(Color.gray);
        screen.fillRect(0, (4 * nHeight) / 5 + 6, nWidth, nHeight / 5 - 10);
        drawPrompt(promptMsg, 0);
    }

    public void drawPrompt(String s, int i)
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        screen.setColor(Color.lightGray);
        screen.drawString(s, (nWidth - fontmetrics.stringWidth(s)) / 2, (nHeight * 4) / 5 + fontmetrics.getHeight() * (i + 1) + 10);
    }

    private void SaveReplayData()
    {
        replayData[replayPos][0] = p1X;
        replayData[replayPos][1] = p1Y;
        replayData[replayPos][2] = p2X;
        replayData[replayPos][3] = p2Y;
        replayData[replayPos][4] = ballX;
        replayData[replayPos][5] = ballY;
        replayData[replayPos][6] = p1Col;
        replayData[replayPos][7] = p2Col;
        replayPos++;
        if(replayPos >= 200)
            replayPos = 0;
        if(replayStart == replayPos)
            replayStart++;
        if(replayStart >= 200)
            replayStart = 0;
    }

    private void drawScores()
    {
        Graphics g = screen;
        int i = nHeight / 20;
        g.setColor(Color.blue);
        g.fillRect(0, 0, nWidth, i + 22);
        for(int j = 0; j < nScore; j++)
        {
            int k = ((j + 1) * nWidth) / 24;
            g.setColor(slimeColours[p1Col]);
            g.fillOval(k, 20, i, i);
            g.setColor(Color.white);
            g.drawOval(k, 20, i, i);
        }

        for(int l = 0; l < 10 - nScore; l++)
        {
            int i1 = nWidth - ((l + 1) * nWidth) / 24 - i;
            g.setColor(slimeColours[p2Col]);
            g.fillOval(i1, 20, i, i);
            g.setColor(Color.white);
            g.drawOval(i1, 20, i, i);
        }

    }

    public void run()
    {
        replayPos = replayStart = 0;
        p1Col = 0;
        p2Col = 1;
        scoringRun = 0;
        fP1Touched = fP2Touched = false;
        nPointsScored = 0;
        startTime = System.currentTimeMillis();
        while(nScore != 0 && nScore != 10 && gameThread != null) 
        {
            gameTime = System.currentTimeMillis() - startTime;
            SaveReplayData();
            p1OldX = p1X;
            p1OldY = p1Y;
            p2OldX = p2X;
            p2OldY = p2Y;
            ballOldX = ballX;
            ballOldY = ballY;
            MoveSlimers();
            DrawSlimers();
            DrawStatus();
            if(ballY < 35)
            {
                long l = System.currentTimeMillis();
                nPointsScored++;
                nScore += ballX > 500 ? 1 : -1;
                if(ballX <= 500 && scoringRun >= 0)
                    scoringRun++;
                else
                if(ballX > 500 && scoringRun <= 0)
                    scoringRun--;
                else
                if(ballX <= 500 && scoringRun <= 0)
                    scoringRun = 1;
                else
                if(ballX > 500 && scoringRun >= 0)
                    scoringRun = -1;
                promptMsg = ballX > 500 ? slimeColText[p1Col] : slimeColText[p2Col];
                if(!fP1Touched && !fP2Touched)
                    promptMsg = "What can I say?";
                else
                if((scoringRun >= 0 ? scoringRun : -scoringRun) == 3)
                    promptMsg += "is on fire!";
                else
                if(ballX > 500 && fP1Touched && !fP2Touched || ballX <= 500 && !fP1Touched && fP2Touched)
                    promptMsg += "aces the serve!";
                else
                if(ballX > 500 && !fP1Touched && fP2Touched || ballX <= 500 && fP1Touched && !fP2Touched)
                    promptMsg += "dies laughing! :P";
                else
                    switch(nScore)
                    {
                    case 0: // '\0'
                    case 10: // '\n'
                        if(nPointsScored == 5)
                        {
                            promptMsg += "Wins with a QUICK FIVE!!!";
                            break;
                        }
                        if(scoringRun == 8)
                            promptMsg += "Wins with a BIG NINE!!!";
                        else
                            promptMsg += "Wins!!!";
                        break;

                    case 4: // '\004'
                        promptMsg += ballX < 500 ? "takes the lead!!" : "Scores!";
                        break;

                    case 6: // '\006'
                        promptMsg += ballX > 500 ? "takes the lead!!" : "Scores!";
                        break;

                    case 5: // '\005'
                        promptMsg += "Equalizes!";
                        break;

                    default:
                        promptMsg += "Scores!";
                        break;
                    }
                fCanChangeCol = false;
                boolean flag = nScore != 0 && nScore != 10;
                int i = ballX;
                drawPrompt();
                if(flag)
                {
                    drawPrompt("Click mouse for replay...", 1);
                    mousePressed = false;
                    if(gameThread != null)
                        try
                        {
                            Thread.sleep(2500L);
                        }
                        catch(InterruptedException _ex) { }
                    if(mousePressed)
                    {
                        SaveReplayData();
                        DoReplay();
                    }
                } else
                if(gameThread != null)
                    try
                    {
                        Thread.sleep(2500L);
                    }
                    catch(InterruptedException _ex) { }
                promptMsg = "";
                drawPrompt();
                fCanChangeCol = true;
                if(flag)
                {
                    p1X = 200;
                    p1Y = 0;
                    p2X = 800;
                    p2Y = 0;
                    p1XV = 0;
                    p1YV = 0;
                    p2XV = 0;
                    p2YV = 0;
                    ballX = i < 500 ? 800 : 200;
                    ballY = 400;
                    ballVX = 0;
                    ballVY = 0;
                    replayStart = replayPos = 0;
                    fP1Touched = fP2Touched = false;
                    repaint();
                }
                startTime += System.currentTimeMillis() - l;
            }
            if(gameThread != null)
                try
                {
                    Thread.sleep(20L);
                }
                catch(InterruptedException _ex) { }
        }
        fEndGame = true;
        SaveReplayData();
        DoReplay();
        fInPlay = false;
        promptMsg = "Click the mouse to play...";
        repaint();
    }

    public void init()
    {
        nWidth = size().width;
        nHeight = size().height;
        nScore = 5;
        fInPlay = fEndGame = false;
        fCanChangeCol = true;
        promptMsg = "Click the mouse to play...";
        screen = getGraphics();
        screen.setFont(new Font(screen.getFont().getName(), 1, 15));
    }

    private void DoReplay()
    {
        FontMetrics fontmetrics = screen.getFontMetrics();
        int i = fontmetrics.stringWidth("Replay...");
        int j = fontmetrics.getHeight();
        int k = nWidth / 2 - i / 2;
        int l = nHeight / 2 - j;
        promptMsg = "Click the mouse to continue...";
        mousePressed = false;
        int i1 = replayPos - 1;
        while(!mousePressed) 
        {
            if(++i1 >= 200)
                i1 = 0;
            if(i1 == replayPos)
            {
                try
                {
                    Thread.sleep(1000L);
                }
                catch(InterruptedException _ex) { }
                i1 = replayStart;
                paint(getGraphics());
            }
            ReplayFrame(i1, k, l, i, j, false);
        }
        promptMsg = "";
        paint(getGraphics());
    }

    private void DoFatality()
    {
    }

    private int nWidth;
    private int nHeight;
    private final int topScore = 10;
    private int nScore;
    private int nPointsScored;
    private int p1X;
    private int p2X;
    private int p1Y;
    private int p2Y;
    private int p1Col;
    private int p2Col;
    private Color slimeColours[];
    private String slimeColText[] = {
        "Big Red Slime ", "Magic Green Slime ", "Golden Boy ", "The Great White Slime ", "The Grass Tree\251 "
    };
    private int p1OldX;
    private int p2OldX;
    private int p1OldY;
    private int p2OldY;
    private int p1XV;
    private int p2XV;
    private int p1YV;
    private int p2YV;
    private int ballX;
    private int ballY;
    private int ballVX;
    private int ballVY;
    private int ballOldX;
    private int ballOldY;
    private Graphics screen;
    private String promptMsg;
    private int replayData[][];
    private int replayPos;
    private int replayStart;
    private boolean mousePressed;
    private boolean fCanChangeCol;
    private boolean fInPlay;
    private int p1Blink;
    private int p2Blink;
    private boolean fP1Touched;
    private boolean fP2Touched;
    private Thread gameThread;
    private boolean fEndGame;
    private long startTime;
    private long gameTime;
    private int scoringRun;
    private int frenzyCol;
    private final int scoringRunForSuper = 3;
}
