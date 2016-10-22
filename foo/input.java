public class ShimmedSize {
	public int width;
	public int height;
}
public class ShimmedApplet {
	public ShimmedSize size() { return null; }
	public ShimmedImage createImage(int x, int y) { return null; }
	public void showStatus(String s) {}
	public void repaint() {}
	public ShimmedGraphics getGraphics() { return null; }
	public void requestFocus() {}
}
public class ShimmedColor {
	public static ShimmedColor yellow = null;
	public static ShimmedColor black = null;
	public static ShimmedColor red = null;
	public static ShimmedColor gray = null;
	public static ShimmedColor white = null;
	public static ShimmedColor blue = null;
	public static ShimmedColor green = null;
	public static ShimmedColor pink = null;
	public static ShimmedColor cyan = null;
	public static ShimmedColor lightGray = null;
	public static ShimmedColor darkGray = null;
	public ShimmedColor(int r, int g, int b) {}
}
public class ShimmedGraphics {
	public ShimmedFont getFont() { return null; }
	public void setFont(ShimmedFont f) {}
	public void setColor(ShimmedColor c) {}
	public void fillRect(int x, int y, int w, int h) {}
	public ShimmedFontMetrics getFontMetrics() { return null; }
	public void drawString(String s, int x, int y) {}
	public void drawImage(ShimmedImage i, int x, int y, Object o) {}
	public void fillOval(int x, int y, int w, int h) {}
	public void fillArc(int x, int y, int w, int h, int s, int e) {}
	public void drawLine(int x, int y, int w, int h) {}
	public void fillPolygon(int[] xs, int[] ys, int n) {}
	public void drawArc(int x, int y, int w, int h, int s, int e) {}
}
public class ShimmedImage {
	public ShimmedGraphics getGraphics() { return null; }
}
public class ShimmedEvent {
	public int id;
	public int x;
	public int y;
	public static final int KEY_ACTION = 0;
	public int key;
	public static final int LEFT = 1;
	public static final int RIGHT = 2;
	public static final int UP = 3;
	public static final int DOWN = 4;
	public static final int KEY_ACTION_RELEASE = 5;
}
public class ShimmedFont {
	public String getName() { return null; }
	public ShimmedFont(String name, int w, int h) {}
}
public class ShimmedFontMetrics {
	public int getHeight() { return 0; }
	public int stringWidth(String s) { return 0; }
	public int getAscent() { return 0; }
}
public class ShimmedThread {
    public static void sleep(int ms) {}
    public ShimmedThread(ShimmedRunnable r) {}
    public void start() {}
    public void stop() {}
}
public interface ShimmedRunnable {}

public class Marker{}





public class WorldCupSoccerSlime extends ShimmedApplet
    implements ShimmedRunnable
{

    public void initStuff()
    {
        fEndGame = true;
        p1X = 200;
        p1Y = 0;
        p2X = 800;
        p2Y = 0;
        p1XV = 0;
        p1YV = 0;
        p2XV = 0;
        p2YV = 0;
        p1Score = 0;
        p2Score = 0;
        ballOldX = ballX = 500;
        ballOldY = ballY = 200;
        ballVX = 0;
        ballVY = 0;
        replayStart = replayPos = 0;
        fP1Touched = fP2Touched = false;
        playOnTicks = 10;
        fPlayOn = false;
        fExtraTime = false;
        fGoldenGoal = false;
        JUMPVEL = fSuperSlime ? 65 : 31;
        SLIMEVEL = fSuperSlime ? 16 : 8;
        GRAVITY = fSuperSlime ? 8 : 2;
    }

    private void drawButtons()
    {
        String as[] = {
            "1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"
        };
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
        ShimmedColor color = new ShimmedColor(0, 0, 128);
        for(int i = 0; i < 5; i++)
        {
            screen.setColor(color);
            screen.fillRect(((2 * i + 1) * nWidth) / 10 - nWidth / 12, (nHeight * 2) / 10, nWidth / 6, nHeight / 10);
            screen.setColor(ShimmedColor.white);
            screen.drawString(as[i], ((2 * i + 1) * nWidth) / 10 - fontmetrics.stringWidth(as[i]) / 2, (nHeight * 5) / 20 + fontmetrics.getHeight() / 2);
        }

        flip();
    }

    private boolean testButton(int i, int j)
    {
        for(int k = 0; k < 5; k++)
            if(i > ((2 * k + 1) * nWidth) / 10 - nWidth / 12 && i < ((2 * k + 1) * nWidth) / 10 + nWidth / 12 && j > (nHeight * 2) / 10 && j < (nHeight * 3) / 10)
            {
                if(k == 4)
                {
                    gameLength = 0x1d4c0;
                    worldCup = true;
                } else
                {
                    gameLength = (1 << k) * 60000;
                    worldCup = false;
                }
                return true;
            }

        return false;
    }

    public boolean handleEvent(ShimmedEvent event)
    {
label0:
        switch(event.id)
        {
        default:
            break;

        case 503: // ShimmedEvent.MOUSE_MOVE
            showStatus("Slime Volleyball 2-Player: Soccer Slime, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
            requestFocus();
            break;

        case 501: // ShimmedEvent.MOUSE_DOWN
            mousePressed = true;
            if(fInPlay || !testButton(event.x, event.y))
                break;
            fEndGame = false;
            fInPlay = true;
            p1X = 200;
            p1Y = 0;
            p2X = 800;
            p2Y = 0;
            p1XV = 0;
            p1YV = 0;
            p2XV = 0;
            p2YV = 0;
            ballX = 500;
            ballY = 200;
            ballOldX = 500;
            ballOldY = 200;
            ballVX = 0;
            ballVY = 0;
            p1Score = 0;
            p2Score = 0;
            promptMsg = "";
            paint(getGraphics());
            try
            {
                ShimmedThread.sleep(100L);
            }
            catch(Exception _ex) { }
            gameThread = new ShimmedThread(this);
            gameThread.start();
            break;

        case 401: // ShimmedEvent.KEY_PRESS
        case 403: // ShimmedEvent.KEY_ACTION
            if(fCanChangeCol)
                switch(event.key)
                {
                default:
                    break;

                case 83: // 'S'
                case 115: // 's'
                    do { 
                        p1Col = p1Col == slimaryCols.length - 1 ? 0 : p1Col + 1;
                     } while(p1Col == p2Col);
                    drawScores();
                    repaint();
                    break;

                case 87: // 'W'
                case 119: // 'w'
                    do { 
                        p1Col = p1Col != 0 ? p1Col - 1 : slimaryCols.length - 1;
                     } while(p1Col == p2Col);
                    drawScores();
                    repaint();
                    break;

                case 75: // 'K'
                case 107: // 'k'
                case 1005: 
                    do { 
                        p2Col = p2Col == slimaryCols.length - 1 ? 0 : p2Col + 1;
                     } while(p2Col == p1Col);
                    drawScores();
                    repaint();
                    break;

                case 73: // 'I'
                case 105: // 'i'
                case 1004: 
                    do { 
                        p2Col = p2Col != 0 ? p2Col - 1 : slimaryCols.length - 1;
                     } while(p1Col == p2Col);
                    drawScores();
                    repaint();
                    break;

                case 54: // '6'
                    fSuperSlime = !fSuperSlime;
                    repaint();
                    break;
                }
            if(fEndGame)
                break;
            switch(event.key)
            {
            default:
                break;

            case 83: // 'S'
            case 115: // 's'
                fP1Sticky = true;
                break label0;

            case 75: // 'K'
            case 107: // 'k'
            case 1005: 
                if(!worldCup)
                    fP2Sticky = true;
                break label0;

            case 65: // 'A'
            case 97: // 'a'
                p1XV = -SLIMEVEL;
                break label0;

            case 68: // 'D'
            case 100: // 'd'
                p1XV = SLIMEVEL;
                break label0;

            case 87: // 'W'
            case 119: // 'w'
                if(p1Y == 0)
                    p1YV = JUMPVEL;
                break label0;

            case 74: // 'J'
            case 106: // 'j'
            case 1006: 
                if(!worldCup)
                    p2XV = -SLIMEVEL;
                break label0;

            case 76: // 'L'
            case 108: // 'l'
            case 1007: 
                if(!worldCup)
                    p2XV = SLIMEVEL;
                break label0;

            case 73: // 'I'
            case 105: // 'i'
            case 1004: 
                if(p2Y == 0 && !worldCup)
                    p2YV = JUMPVEL;
                break;

            case 66: // 'B'
            case 98: // 'b'
                toggleBuffering();
                break;

            case 32: // ' '
                mousePressed = true;
                break;
            }
            break;

        case 402: // ShimmedEvent.KEY_RELEASE
        case 404: // ShimmedEvent.KEY_ACTION_RELEASE
            switch(event.key)
            {
            default:
                break label0;

            case 83: // 'S'
            case 115: // 's'
                fP1Sticky = false;
                break label0;

            case 75: // 'K'
            case 107: // 'k'
            case 1005: 
                fP2Sticky = false;
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
                if(p2XV < 0 && !worldCup)
                    p2XV = 0;
                break label0;

            case 76: // 'L'
            case 108: // 'l'
            case 1007: 
                break;
            }
            if(p2XV > 0 && !worldCup)
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
        screen.setColor(ShimmedColor.blue);
        screen.fillRect(k1, l1, i, j);
        k1 = (p2OldX * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p2OldY * nHeight) / 1000;
        screen.setColor(ShimmedColor.blue);
        screen.fillRect(k1, l1, i, j);
        if(!fEndGame)
            MoveBall();
        k1 = (p1X * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p1Y * nHeight) / 1000;
        screen.setColor(fSuperSlime ? slimaryCols[frenzyCol = (frenzyCol + 1) % slimaryCols.length] : slimaryCols[p1Col]);
        screen.fillArc(k1, l1, i, 2 * j, 0, 180);
        screen.setColor(secondaryCols[p1Col]);
        pointsX[0] = pointsX[2] = k1 + i / 2;
        pointsX[1] = k1 + (i * 2) / 5;
        pointsX[3] = k1 + i / 8;
        pointsY[0] = l1;
        pointsY[1] = pointsY[3] = l1 + j / 2;
        pointsY[2] = l1 + j;
        screen.fillPolygon(pointsX, pointsY, 4);
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
            screen.setColor(ShimmedColor.white);
            screen.fillOval(k1 - k, l1 - l, k, l);
            if(i3 > 0 && !flag)
            {
                screen.setColor(ShimmedColor.black);
                screen.fillOval(k1 - (4 * k2) / i3 - (3 * k) / 4, l1 - (4 * l2) / i3 - (3 * l) / 4, k / 2, l / 2);
            }
        } else
        {
            p1Blink--;
        }
        if(p1Score > p2Score + 2)
        {
            int j3 = (p1X * nWidth) / 1000;
            int l3 = (7 * nHeight) / 10 - ((p1Y - 40) * nHeight) / 1000;
            int j4 = nWidth / 20;
            int l4 = nHeight / 20;
            int j5 = 0;
            do
            {
                screen.setColor(ShimmedColor.black);
                screen.drawArc(j3, l3 + j5, j4, l4, -30, -150);
            } while(++j5 < 3);
        }
        k1 = (p2X * nWidth) / 1000 - i / 2;
        l1 = (7 * nHeight) / 10 - (p2Y * nHeight) / 1000;
        screen.setColor(fSuperSlime ? slimaryCols[frenzyCol = (frenzyCol + 1) % slimaryCols.length] : slimaryCols[p2Col]);
        screen.fillArc(k1, l1, i, 2 * j, 0, 180);
        screen.setColor(secondaryCols[p2Col]);
        pointsX[0] = pointsX[2] = k1 + i / 2;
        pointsX[1] = k1 + (i * 3) / 5;
        pointsX[3] = k1 + (i * 7) / 8;
        pointsY[0] = l1;
        pointsY[1] = pointsY[3] = l1 + j / 2;
        pointsY[2] = l1 + j;
        screen.fillPolygon(pointsX, pointsY, 4);
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
            screen.setColor(flag ? ShimmedColor.gray : ShimmedColor.white);
            screen.fillOval(k1 - k, l1 - l, k, l);
            if(i3 > 0 && !flag)
            {
                screen.setColor(ShimmedColor.black);
                screen.fillOval(k1 - (4 * k2) / i3 - (3 * k) / 4, l1 - (4 * l2) / i3 - (3 * l) / 4, k / 2, l / 2);
            }
        } else
        {
            p2Blink--;
        }
        if(p2Score > p1Score + 2)
        {
            int k3 = nWidth / 20;
            int i4 = nHeight / 20;
            int k4 = (p2X * nWidth) / 1000 - k3;
            int i5 = (7 * nHeight) / 10 - ((p2Y - 40) * nHeight) / 1000;
            int k5 = 0;
            do
            {
                screen.setColor(ShimmedColor.black);
                screen.drawArc(k4, i5 + k5, k3, i4, -10, -150);
            } while(++k5 < 3);
        }
    }

    public void paint(ShimmedGraphics g)
    {
        nWidth = size().width;
        nHeight = size().height;
        screen.setColor(ShimmedColor.blue);
        screen.fillRect(0, 0, nWidth, (4 * nHeight) / 5);
        screen.setColor(ShimmedColor.gray);
        screen.fillRect(0, (4 * nHeight) / 5, nWidth, nHeight / 5);
        screen.setColor(ShimmedColor.white);
        drawScores();
        if(!fInPlay)
        {
            DrawSlimers();
            drawButtons();
        }
        DrawGoals();
        drawPrompt();
        if(!fInPlay)
        {
            ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
            screen.setColor(ShimmedColor.white);
            if(fSuperSlime)
                screen.drawString("Super Soccer Slime!", nWidth / 2 - fontmetrics.stringWidth("Super Soccer Slime!") / 2, nHeight / 2 - fontmetrics.getHeight());
            else
                screen.drawString("Soccer Slime!", nWidth / 2 - fontmetrics.stringWidth("Soccer Slime!") / 2, nHeight / 2 - fontmetrics.getHeight());
            screen.setColor(ShimmedColor.white);
            fontmetrics = screen.getFontMetrics();
            screen.drawString("Written by Quin Pendragon", nWidth / 2 - fontmetrics.stringWidth("Written by Quin Pendragon") / 2, nHeight / 2 + fontmetrics.getHeight() * 2);
        }
        flip();
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
            ballX = -1000;
            ballOldX = 500;
            ballY = -1000;
            ballOldY = 500;
            p1OldX = p1OldY = p2OldX = p2OldY = -10000;
        } else
        {
            int j1 = i == 0 ? 199 : i - 1;
            p1OldX = replayData[j1][0];
            p1OldY = replayData[j1][1];
            p2OldX = replayData[j1][2];
            p2OldY = replayData[j1][3];
            if(i == 0)
            {
                ballOldX = 500;
                ballOldY = 200;
            } else
            {
                ballOldX = replayData[j1][4];
                ballOldY = replayData[j1][5];
            }
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
            screen.setColor(ShimmedColor.red);
            screen.drawString("Replay...", j, k);
        } else
        {
            screen.setColor(ShimmedColor.blue);
            screen.fillRect(j, k - i1, l, i1 * 2);
        }
        DrawSlimers();
        DrawGoals();
        try
        {
            ShimmedThread.sleep(20L);
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
        String s = "";
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
        if(worldCup)
            switch(worldCupRound)
            {
            case 0: // '\0'
                controlP2v0();
                break;

            case 1: // '\001'
                controlP2v1();
                break;

            case 2: // '\002'
                controlP2v2();
                break;

            case 3: // '\003'
                controlP2v3();
                break;
            }
        p1X += p1XV;
        if(p1X < 50)
            p1X = 50;
        if(p1X > 950)
            p1X = 950;
        if(p1YV != 0)
        {
            p1Y += p1YV -= GRAVITY;
            if(p1Y < 0)
            {
                p1Y = 0;
                p1YV = 0;
            }
        }
        p2X += p2XV;
        if(p2X > 950)
            p2X = 950;
        if(p2X < 50)
            p2X = 50;
        if(p2YV != 0)
        {
            p2Y += p2YV -= GRAVITY;
            if(p2Y < 0)
            {
                p2Y = 0;
                p2YV = 0;
            }
        }
    }

    public WorldCupSoccerSlime()
    {
        darkRed = new ShimmedColor(128, 0, 0);
        darkGreen = new ShimmedColor(0, 128, 0);
        darkBlue = new ShimmedColor(0, 0, 128);
        slimaryCols = (new ShimmedColor[] {
            ShimmedColor.cyan, ShimmedColor.red, ShimmedColor.green, darkGreen, ShimmedColor.white, darkRed, darkRed, new ShimmedColor(119, 41, 28), ShimmedColor.yellow, ShimmedColor.green, 
            ShimmedColor.white, ShimmedColor.white, new ShimmedColor(128, 128, 255), darkBlue, ShimmedColor.white, ShimmedColor.red, ShimmedColor.white, new ShimmedColor(119, 41, 28), ShimmedColor.green, ShimmedColor.white, 
            ShimmedColor.white, ShimmedColor.white, new ShimmedColor(185, 30, 2), ShimmedColor.white, ShimmedColor.red, new ShimmedColor(252, 239, 82), ShimmedColor.white, ShimmedColor.red, new ShimmedColor(16, 180, 180), new ShimmedColor(241, 245, 71), 
            new ShimmedColor(230, 230, 230), ShimmedColor.white
        });
        secondaryCols = (new ShimmedColor[] {
            ShimmedColor.white, ShimmedColor.black, ShimmedColor.yellow, ShimmedColor.red, ShimmedColor.red, darkBlue, ShimmedColor.white, ShimmedColor.white, darkBlue, ShimmedColor.green, 
            ShimmedColor.blue, darkBlue, ShimmedColor.white, ShimmedColor.white, ShimmedColor.blue, ShimmedColor.white, ShimmedColor.red, darkGreen, ShimmedColor.white, new ShimmedColor(128, 255, 128), 
            new ShimmedColor(255, 128, 0), darkGreen, darkBlue, new ShimmedColor(13, 131, 10), ShimmedColor.white, ShimmedColor.blue, ShimmedColor.red, ShimmedColor.white, ShimmedColor.black, new ShimmedColor(7, 177, 33), 
            ShimmedColor.red, ShimmedColor.black
        });
        worldCup = false;
        pointsX = new int[4];
        pointsY = new int[4];
        p2Col = 1;
        replayData = new int[200][8];
    }

    private void MoveBall()
    {
        int i = (30 * nHeight) / 1000;
        int j = (ballOldX * nWidth) / 1000;
        int k = (4 * nHeight) / 5 - (ballOldY * nHeight) / 1000;
        screen.setColor(ShimmedColor.blue);
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
                    if(!fP1Sticky)
                    {
                        ballVY += p1YV - (2 * i1 * k2) / i2;
                        ballVX += ((p1XV - (2 * l * k2) / i2) * 7) / 10;
                    } else
                    {
                        ballVX = 0;
                        ballVY = 0;
                    }
                    if(ballVX < -15)
                        ballVX = -15;
                    if(ballVX > 15)
                        ballVX = 15;
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
                    if(!fP2Sticky)
                    {
                        ballVX += ((p2XV - (2 * l * l2) / j2) * 7) / 10;
                        ballVY += p2YV - (2 * i1 * l2) / j2;
                    } else
                    {
                        ballVX = 0;
                        ballVY = 0;
                    }
                    if(ballVX < -15)
                        ballVX = -15;
                    if(ballVX > 15)
                        ballVX = 15;
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
            if(ballX <= 50 || ballX >= 950)
            {
                if(ballY > 200 && ballOldY < 200 || ballY < 200 && ballOldY >= 200)
                {
                    ballY = 200;
                    ballVY *= -1;
                }
                if(ballY > 180 && ballY < 220)
                {
                    if(ballX > 40 && ballX < 50 && ballVX < 0)
                    {
                        ballX = 50;
                        ballVX *= -1;
                    }
                    if(ballX < 960 && ballX > 950 && ballVX > 0)
                    {
                        ballX = 950;
                        ballVX *= -1;
                    }
                }
            }
            if(ballY < 34)
            {
                ballY = 34;
                ballVY = (-ballVY * 7) / 10;
                ballVX = (ballVX * 7) / 10;
            }
        }
        j = (ballX * nWidth) / 1000;
        k = (4 * nHeight) / 5 - (ballY * nHeight) / 1000;
        screen.setColor(ShimmedColor.yellow);
        screen.fillOval(j - i, k - i, i * 2, i * 2);
    }

    private void DrawGoals()
    {
        screen.setColor(ShimmedColor.white);
        screen.fillRect(nWidth / 20, (4 * nHeight) / 5 - (200 * nHeight) / 1000, 5, (200 * nHeight) / 1000);
        screen.fillRect(nWidth - nWidth / 20 - 5, (4 * nHeight) / 5 - (200 * nHeight) / 1000, 5, (200 * nHeight) / 1000);
        screen.fillRect(0, (4 * nHeight) / 5 + 2, nWidth / 10, 2);
        screen.fillRect((nWidth * 9) / 10, (4 * nHeight) / 5 + 2, nWidth / 10, 2);
        for(int i = 0; i < nWidth / 20; i += 5)
        {
            screen.drawLine(i, (4 * nHeight) / 5 - (200 * nHeight) / 1000, i, (4 * nHeight) / 5);
            screen.drawLine(nWidth - i, (4 * nHeight) / 5 - (200 * nHeight) / 1000, nWidth - i, (4 * nHeight) / 5);
        }

        for(int j = (4 * nHeight) / 5 - nHeight / 5; j < (4 * nHeight) / 5; j += 5)
        {
            screen.drawLine(0, j, nWidth / 20, j);
            screen.drawLine(nWidth, j, nWidth - nWidth / 20, j);
        }

        int k = ((60 - p1TouchingGoal) * nWidth) / 120;
        screen.setColor(secondaryCols[p1Col]);
        screen.fillRect(0, nHeight - 5, k, 5);
        screen.setColor(ShimmedColor.gray);
        screen.fillRect(k, nHeight - 5, nWidth / 2 - k, 5);
        int l = nWidth - ((60 - p2TouchingGoal) * nWidth) / 120;
        screen.setColor(secondaryCols[p2Col]);
        screen.fillRect(l, nHeight - 5, nWidth, 5);
        screen.setColor(ShimmedColor.gray);
        screen.fillRect(nWidth / 2, nHeight - 5, l - nWidth / 2, 5);
    }

    private void DrawStatus()
    {
        ShimmedGraphics g = screen;
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
        String s = null;
        String s1 = MakeTime(gameTime);
        int i = nHeight / 20;
        int j = 0;
        int k = fontmetrics.stringWidth(s1);
        if(worldCup)
        {
            switch(worldCupRound)
            {
            case 1: // '\001'
                s = "Quarter Finals";
                break;

            case 2: // '\002'
                s = "Semi-Finals";
                break;

            case 3: // '\003'
                s = "Final";
                break;

            default:
                s = "Qualifying";
                break;
            }
            if(fGoldenGoal)
                s = s + " [Golden Goal]";
            else
            if(fExtraTime)
                s = s + " [Extra Time]";
            j = fontmetrics.stringWidth(s);
        }
        int l = j <= k ? k : j;
        g.setColor(ShimmedColor.blue);
        g.fillRect(nWidth / 2 - l / 2 - 5, 0, l + 10, i + 22);
        g.setColor(ShimmedColor.white);
        screen.drawString(s1, nWidth / 2 - k / 2, fontmetrics.getAscent() + 20);
        if(s != null)
            screen.drawString(s, nWidth / 2 - j / 2, (fontmetrics.getAscent() + 20) - fontmetrics.getHeight());
    }

    public void drawPrompt()
    {
        screen.setColor(ShimmedColor.gray);
        screen.fillRect(0, (4 * nHeight) / 5 + 6, nWidth, nHeight / 5 - 10);
        drawPrompt(promptMsg, 0);
    }

    public void drawPrompt(String s, int i)
    {
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
        screen.setColor(ShimmedColor.lightGray);
        screen.drawString(s, (nWidth - fontmetrics.stringWidth(s)) / 2, (nHeight * 4) / 5 + fontmetrics.getHeight() * (i + 1) + 10);
    }

    private void promptBox(String s, String s1)
    {
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
        int i = fontmetrics.stringWidth(s);
        int j = fontmetrics.stringWidth(s1);
        int k = i <= j ? j : i;
        screen.setColor(ShimmedColor.darkGray);
        screen.fillRect(nWidth / 2 - k / 2 - 20, (nHeight * 2) / 5, k + 40, nHeight / 5);
        screen.setColor(ShimmedColor.white);
        screen.drawString(s, nWidth / 2 - i / 2, (nHeight * 9) / 20);
        screen.drawString(s1, nWidth / 2 - j / 2, (nHeight * 11) / 20);
        flip();
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
        ShimmedGraphics g = screen;
        int i = nHeight / 20;
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
        fontmetrics.stringWidth("Replay...");
        g.setColor(ShimmedColor.blue);
        g.fillRect(0, 0, nWidth, i + 22);
        g.setColor(ShimmedColor.white);
        g.drawString(slimeColText[p1Col] + " : " + p1Score, nWidth / 20, i);
        String s = p2Score + " : " + slimeColText[p2Col];
        g.drawString(s, nWidth - nWidth / 20 - fontmetrics.stringWidth(s), i);
    }

    public boolean checkScored()
    {
        if(ballY < 200 && (ballX < 40 || ballX > 960))
        {
            nScoreX = ballX;
            fPlayOn = true;
            playOnTicks = 10;
            return true;
        } else
        {
            return false;
        }
    }

    public void run()
    {
        worldCupRound = 0;
        do
        {
            initStuff();
            replayPos = replayStart = 0;
            scoringRun = 0;
            fP1Touched = fP2Touched = false;
            gameTime = 0L;
            startTime = System.currentTimeMillis();
            fEndGame = false;
            fCanChangeCol = false;
            mousePressed = false;
            gameTime = gameLength;
            fInPlay = true;
            fEndGame = false;
            if(worldCup)
            {
                paint(getGraphics());
                do { 
                    p2Col = (int)((Math.random() * (double)slimaryCols.length) / 4D) + (worldCupRound * slimaryCols.length) / 4;
                 } while(p1Col == p2Col);
                String s = slimeColText[p1Col] + " vs. " + slimeColText[p2Col];
                switch(worldCupRound)
                {
                case 0: // '\0'
                    promptBox("Qualifying Round", s);
                    gameLength = 30000;
                    break;

                case 1: // '\001'
                    promptBox("Quarter Finals", s);
                    gameLength = 0x1d4c0;
                    break;

                case 2: // '\002'
                    promptBox("Semi-Finals", s);
                    gameLength = 0x1d4c0;
                    break;

                case 3: // '\003'
                    promptBox("World Cup Final", s);
                    gameLength = 0x493e0;
                    break;
                }
                try
                {
                    ShimmedThread.sleep(4000L);
                }
                catch(Exception _ex) { }
                repaint();
                flip();
            }
            while(gameTime > 0L || worldCup && worldCupRound > 0 && p1Score == p2Score) 
            {
                gameTime = (startTime + (long)gameLength) - System.currentTimeMillis();
                if(gameTime < 0L)
                    gameTime = 0L;
                if(worldCup && !fExtraTime && gameTime <= 0L && worldCupRound > 0 && p1Score == p2Score)
                {
                    String s1 = p1Score != 0 ? " " + p1Score : " nil";
                    promptBox("The score is " + slimeColText[p1Col] + s1 + ", " + slimeColText[p2Col] + s1 + ".", "And the game goes into extra time...");
                    try
                    {
                        ShimmedThread.sleep(4000L);
                    }
                    catch(Exception _ex) { }
                    repaint();
                    flip();
                    startTime += 30000L;
                    gameTime += 30000L;
                    fExtraTime = true;
                } else
                if(gameTime <= 0L && fExtraTime && !fGoldenGoal && p1Score == p2Score)
                {
                    fGoldenGoal = true;
                    String s2 = p1Score != 0 ? " " + p1Score : " nil";
                    promptBox("The score is " + slimeColText[p1Col] + s2 + ", " + slimeColText[p2Col] + s2 + ", and the game goes into Golden Goal.", "The next player to score will win the match!");
                    try
                    {
                        ShimmedThread.sleep(4000L);
                    }
                    catch(Exception _ex) { }
                    repaint();
                    flip();
                }
                SaveReplayData();
                p1OldX = p1X;
                p1OldY = p1Y;
                p2OldX = p2X;
                p2OldY = p2Y;
                ballOldX = ballX;
                ballOldY = ballY;
                MoveSlimers();
                DrawSlimers();
                DrawGoals();
                DrawStatus();
                flip();
                if(p1X < 150)
                    p1TouchingGoal++;
                else
                    p1TouchingGoal = 0;
                if(p2X > 850)
                    p2TouchingGoal++;
                else
                    p2TouchingGoal = 0;
                if(fPlayOn)
                    playOnTicks--;
                else
                    fPlayOn = checkScored();
                if(playOnTicks == 0 || p1TouchingGoal > 60 || p2TouchingGoal > 60)
                {
                    long l = System.currentTimeMillis();
                    if(p1TouchingGoal > 60)
                    {
                        p2Score++;
                        promptMsg = slimeColText[p1Col] + " pinged for goal hanging!";
                    } else
                    if(p2TouchingGoal > 60)
                    {
                        p1Score++;
                        promptMsg = slimeColText[p2Col] + " pinged for goal hanging!";
                    } else
                    if(nScoreX < 500)
                    {
                        p2Score++;
                        promptMsg = slimeColText[p2Col] + " Scores!";
                    } else
                    {
                        p1Score++;
                        promptMsg = slimeColText[p1Col] + " Scores!";
                    }
                    drawPrompt();
                    drawPrompt("Click mouse for replay...", 1);
                    flip();
                    mousePressed = false;
                    if(gameThread != null)
                        try
                        {
                            ShimmedThread.sleep(2500L);
                        }
                        catch(InterruptedException _ex) { }
                    if(mousePressed)
                    {
                        SaveReplayData();
                        DoReplay();
                    }
                    promptMsg = "";
                    drawPrompt();
                    playOnTicks = 10;
                    fPlayOn = false;
                    startTime += System.currentTimeMillis() - l;
                    ballX = 490 + (int)(Math.random() * 20D);
                    ballY = 190 + (int)(Math.random() * 20D);
                    ballVX = 0;
                    ballVY = 0;
                    p1X = 200;
                    p1Y = 0;
                    p1YV = 0;
                    p2X = 800;
                    p2Y = 0;
                    p2YV = 0;
                    replayStart = replayPos = 0;
                    repaint();
                }
                if(gameThread != null)
                    try
                    {
                        if(fPlayOn)
                            ShimmedThread.sleep(120L);
                        else
                            ShimmedThread.sleep(20L);
                    }
                    catch(InterruptedException _ex) { }
            }
            fEndGame = true;
            if(fPlayOn)
            {
                if(nScoreX < 500)
                {
                    p2Score++;
                    promptMsg = slimeColText[p2Col] + " scores at the final whistle!";
                } else
                {
                    p1Score++;
                    promptMsg = slimeColText[p1Col] + " scores at the final whistle!";
                }
                drawPrompt();
            } else
            {
                drawPrompt("And that's the final whistle!", 0);
            }
            if(worldCup)
            {
                if(p1Score == p2Score)
                {
                    drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
                    promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
                    worldCup = false;
                    flip();
                } else
                if(p1Score >= p2Score)
                {
                    switch(worldCupRound)
                    {
                    case 0: // '\0'
                        drawPrompt(slimeColText[p1Col] + " qualifies for the world cup!", 1);
                        break;

                    case 1: // '\001'
                        drawPrompt(slimeColText[p1Col] + " proceeds to the semi-finals!", 1);
                        break;

                    case 2: // '\002'
                        drawPrompt(slimeColText[p1Col] + " is through to the final!!!", 1);
                        break;

                    case 3: // '\003'
                        drawPrompt(slimeColText[p1Col] + " wins the WORLD CUP!!!!!", 1);
                        break;
                    }
                    if(worldCupRound == 3)
                    {
                        worldCup = false;
                        promptBox("You win the world cup!!!", "Congratulations!");
                    } else
                    {
                        worldCupRound++;
                    }
                } else
                {
                    switch(worldCupRound)
                    {
                    case 0: // '\0'
                    case 1: // '\001'
                        promptBox("You have been eliminated.", "Goodbye.");
                        break;

                    case 2: // '\002'
                        promptBox("You have been knocked out of the semifinals.", "You played well.");
                        break;

                    case 3: // '\003'
                        promptBox("You came second.", "Are you satisfied with that?");
                        break;
                    }
                    worldCup = false;
                }
            } else
            if(p1Score == p2Score)
                drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
            else
            if(p1Score < p2Score)
                drawPrompt(slimeColText[p2Col] + " (" + p2Score + ")    def. " + slimeColText[p1Col] + " (" + p1Score + ")", 1);
            else
                drawPrompt(slimeColText[p1Col] + " (" + p1Score + ")    def. " + slimeColText[p2Col] + " (" + p2Score + ")", 1);
            flip();
            try
            {
                ShimmedThread.sleep(5000L);
            }
            catch(InterruptedException _ex) { }
            initStuff();
        } while(worldCup);
        fCanChangeCol = true;
        fInPlay = false;
        repaint();
    }

    public void init()
    {
        nWidth = size().width;
        nHeight = size().height;
        fInPlay = fEndGame = false;
        fCanChangeCol = true;
        initStuff();
        promptMsg = "Click on an option to play...";
        backBuffer = createImage(nWidth, nHeight);
        screen = getGraphics();
        screen.setFont(new ShimmedFont(screen.getFont().getName(), 1, 15));
    }

    private void toggleBuffering()
    {
        if(doubleBuffered = !doubleBuffered)
        {
            screen = backBuffer.getGraphics();
            screen.setFont(new ShimmedFont(screen.getFont().getName(), 1, 15));
        } else
        {
            screen = getGraphics();
            screen.setFont(new ShimmedFont(screen.getFont().getName(), 1, 15));
        }
        repaint();
    }

    private void DoReplay()
    {
        ShimmedFontMetrics fontmetrics = screen.getFontMetrics();
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
                    ShimmedThread.sleep(1000L);
                }
                catch(InterruptedException _ex) { }
                i1 = replayStart;
                paint(getGraphics());
            }
            ReplayFrame(i1, k, l, i, j, false);
            flip();
        }
        promptMsg = "";
        paint(getGraphics());
    }

    private void flip()
    {
        if(doubleBuffered)
            getGraphics().drawImage(backBuffer, 0, 0, null);
    }

    private int getBallBounceX()
    {
        int i = ballVY + (int)Math.sqrt(ballVY * ballVY + 2 * ballY);
        int j = ballX + i * ballVX;
        if(j < 0)
            j = -j;
        if(j > 1000)
            j = 1000 - j;
        return j;
    }

    private int getBallMaxY()
    {
        if(ballVY < 0)
            return ballY;
        else
            return ballY + (ballVY * ballVY) / 2;
    }

    private void controlP2v0()
    {
        p2XV = 0;
        if(ballX > p2X + 5 && ballX < 960)
            fP2Sticky = true;
        if(ballX > p2X - 10)
            p2XV = SLIMEVEL;
        if(ballX + 30 > p2X && p2YV == 0)
        {
            fP2Sticky = false;
            p2YV = JUMPVEL;
        }
        if(ballX + 50 < p2X)
        {
            fP2Sticky = false;
            p2XV = -SLIMEVEL;
        }
        if(ballX > p2X + 50 && p2YV == 0 && ballY > 10 && ballY < 150)
            p2YV = JUMPVEL;
        if(p2TouchingGoal > 0 && 60 - p2TouchingGoal < 3 + (p2X - 850) / SLIMEVEL)
            p2XV = -SLIMEVEL;
    }

    private void controlP2v1()
    {
        p2XV = 0;
        int i = getBallBounceX();
        int j = getBallMaxY();
        if(i > 900)
            p2XV = SLIMEVEL;
        if(i + 20 < p2X)
        {
            fP2Sticky = false;
            p2XV = -SLIMEVEL;
        }
        if(ballX > p2X - 10)
            p2XV = SLIMEVEL;
        if(ballX + 30 > p2X && p2YV == 0)
        {
            fP2Sticky = false;
            p2YV = JUMPVEL;
        }
        if(i > p2X + 50 && p2YV == 0)
            p2XV = SLIMEVEL;
        if(ballX > p2X && ballX < 960)
            fP2Sticky = true;
        if(p2YV == 0 && ballX > p1X - 120 && ballX < p1X + 120 && ballY > p1Y && ballY < p1Y + 100 && p1Y > 0)
            p2XV = SLIMEVEL;
        if(p2Score >= p1Score && i < 200 && p2X > p1X || i < p1X + 50 && i > p1X - 50 && ballVY / 4 == 0 && p1X < 400 && p2X < 848)
        {
            if(p2X < 900)
                p2XV = SLIMEVEL;
            if(ballX > 800 && i > 950 && p2YV == 0 && j > 40)
                p2YV = JUMPVEL;
        }
        if(p2YV == JUMPVEL)
        {
            if(j < 110)
                p2YV = 0;
            if(ballX < p2X - 400)
                p2YV = 0;
            if(ballY < 80)
                p2YV = 0;
            if(ballX < 900 && p2X > 900)
                p2YV = 0;
            if(p2X < 150)
                p2YV = 0;
        }
        if(p2TouchingGoal > 0 && 60 - p2TouchingGoal < 3 + (p2X - 850) / SLIMEVEL)
            p2XV = -SLIMEVEL;
    }

    private void controlP2v2()
    {
        int i = getBallBounceX();
        int j = getBallMaxY();
        if(p2X < 790)
            p2XV = SLIMEVEL;
        else
        if(p2X > 830)
            p2XV = -SLIMEVEL;
        else
            p2XV = 0;
        if(i > 900)
            p2XV = SLIMEVEL;
        if(i + 20 < p2X)
        {
            fP2Sticky = false;
            p2XV = -SLIMEVEL;
        }
        if(ballX > p2X - 10)
            p2XV = SLIMEVEL;
        if(ballX + 30 > p2X && p2YV == 0)
        {
            fP2Sticky = false;
            p2YV = JUMPVEL;
        }
        if(i > p2X + 50 && p2YV == 0)
            p2XV = SLIMEVEL;
        if(ballX > p2X && ballX < 960)
            fP2Sticky = true;
        if(p2YV == 0 && ballX > p1X - 120 && ballX < p1X + 120 && ballY > p1Y && ballY < p1Y + 100 && p1Y > 0)
            p2XV = SLIMEVEL;
        if(p2Score >= p1Score && i < 200 && p2X > p1X || i < p1X + 50 && i > p1X - 50 && ballVY / 4 == 0 && p1X < 400 && p2X < 848)
        {
            if(p2X < 900)
                p2XV = SLIMEVEL;
            if(ballX > 800 && i > 950 && p2YV == 0 && j > 40)
                p2YV = JUMPVEL;
        }
        if(p2YV == JUMPVEL)
        {
            if(j < 110)
                p2YV = 0;
            if(ballX < p2X - 400)
                p2YV = 0;
            if(ballY < 80)
                p2YV = 0;
            if(ballX < 900 && p2X > 900)
                p2YV = 0;
        }
        if(p2YV == 0 && p2X < 400 && i > 500 && j > 50)
            p2YV = JUMPVEL;
        if(p2TouchingGoal > 0 && 60 - p2TouchingGoal < 3 + (p2X - 850) / SLIMEVEL)
            p2XV = -SLIMEVEL;
    }

    private void controlP2v3()
    {
        int i = (SLIMEVEL * 4) / 3;
        int j = getBallBounceX();
        int k = getBallMaxY();
        if(p2X < 790)
            p2XV = i;
        else
        if(p2X > 830)
            p2XV = -i;
        else
            p2XV = 0;
        if(j > 900)
            p2XV = i;
        if(j + 20 < p2X)
        {
            fP2Sticky = false;
            p2XV = -i;
        }
        if(ballX > p2X - 10)
            p2XV = i;
        if(ballX + 30 > p2X && p2YV == 0)
        {
            fP2Sticky = false;
            p2YV = JUMPVEL;
        }
        if(j > p2X + 50 && p2YV == 0)
            p2XV = i;
        if(ballX > p2X && ballX < 960)
            fP2Sticky = true;
        if(p2YV == 0 && ballX > p1X - 120 && ballX < p1X + 120 && ballY > p1Y && ballY < p1Y + 100 && p1Y > 0)
            p2XV = i;
        if(p2Score >= p1Score && j < 200 && p2X > p1X || j < p1X + 50 && j > p1X - 50 && ballVY / 4 == 0 && p1X < 400 && p2X < 848)
        {
            if(p2X < 900)
                p2XV = i;
            if(ballX > 800 && j > 950 && p2YV == 0 && k > 40)
                p2YV = JUMPVEL;
        }
        if(p2YV == JUMPVEL)
        {
            if(k < 110)
                p2YV = 0;
            if(ballX < p2X - 400)
                p2YV = 0;
            if(ballY < 80)
                p2YV = 0;
            if(ballX < 900 && p2X > 900)
                p2YV = 0;
            if(p2XV > 0 && k > 200 && j > p2X + 300)
                p2YV = 0;
        }
        if(p2YV == 0 && p2X < 400 && j > p2X + 400 && k > 50)
            p2YV = JUMPVEL;
        if(p2TouchingGoal > 0 && 60 - p2TouchingGoal < 3 + (p2X - 850) / i)
            p2XV = -i;
    }

    private void p(String s)
    {
        System.out.println(s);
    }

    private int nWidth;
    private int nHeight;
    private int p1Score;
    private int p2Score;
    private int p1X;
    private int p2X;
    private int p1Y;
    private int p2Y;
    private int p1Col;
    private int p2Col;
    private String slimeColText[] = {
        "Argentina", "Belgium", "Australia", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", 
        "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland", "Saudi Arabia", 
        "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", 
        "England", "Germany"
    };
    private ShimmedColor darkRed;
    private ShimmedColor darkGreen;
    private ShimmedColor darkBlue;
    private ShimmedColor slimaryCols[];
    private ShimmedColor secondaryCols[];
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
    private ShimmedGraphics screen;
    private String promptMsg;
    private int replayData[][];
    private int replayPos;
    private int replayStart;
    private boolean mousePressed;
    private boolean fCanChangeCol;
    private boolean fInPlay;
    private int p1Blink;
    private int p2Blink;
    private boolean fP1Sticky;
    private boolean fP2Sticky;
    private boolean fP1Touched;
    private boolean fP2Touched;
    private int p1TouchingGoal;
    private int p2TouchingGoal;
    private ShimmedThread gameThread;
    private boolean fEndGame;
    private boolean fPlayOn;
    private int nScoreX;
    private long startTime;
    private long gameTime;
    private int scoringRun;
    private int frenzyCol;
    private int playOnTicks;
    private ShimmedImage backBuffer;
    private final int SMILE_DIFF = 2;
    private final int DAMPING = 7;
    private final int MAX_TICKS_TOUCHING_GOAL = 60;
    private int JUMPVEL;
    private int SLIMEVEL;
    private int GRAVITY;
    private int gameLength;
    private boolean worldCup;
    private int worldCupRound;
    private boolean fExtraTime;
    private boolean fGoldenGoal;
    private boolean fSuperSlime;
    private boolean doubleBuffered;
    private int pointsX[];
    private int pointsY[];
}
