import { Applet, Runnable, Color, Graphics, Thread, Event, FontMetrics, Font, StringBuffer, System, BufferedImage, Image, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Slime2P extends Applet implements Runnable {
    public recommended_width = 700;
    public recommended_height = 350;
    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ topScore : number = 10;

    /*public*/ nScore : number;

    /*public*/ nPointsScored : number;

    /*public*/ p1X : number;

    /*public*/ p2X : number;

    /*public*/ p1Y : number;

    /*public*/ p2Y : number;

    /*public*/ p1Col : number;

    /*public*/ p2Col : number = 1;

    /*public*/ slimeColours : Color[];

    /*public*/ slimeColText : string[] = ["Super Blue Slime ", "Power Green Slime "];

    /*public*/ p1OldX : number;

    /*public*/ p2OldX : number;

    /*public*/ p1OldY : number;

    /*public*/ p2OldY : number;

    /*public*/ p1XV : number;

    /*public*/ p2XV : number;

    /*public*/ p1YV : number;

    /*public*/ p2YV : number;

    /*public*/ ballX : number;

    /*public*/ ballY : number;

    /*public*/ ballVX : number;

    /*public*/ ballVY : number;

    /*public*/ ballOldX : number;

    /*public*/ ballOldY : number;

    /*public*/ screen : Graphics;

    /*public*/ promptMsg : string;

    /*public*/ replayData : number[][];

    /*public*/ replayPos : number;

    /*public*/ replayStart : number;

    /*public*/ mousePressed : boolean;

    /*public*/ fCanChangeCol : boolean;

    /*public*/ fInPlay : boolean;

    /*public*/ p1Blink : number;

    /*public*/ p2Blink : number;

    /*public*/ fP1Touched : boolean;

    /*public*/ fP2Touched : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ startTime : number;

    /*public*/ gameTime : number;

    /*public*/ scoringRun : number;

    /*public*/ frenzyCol : number = 0;

    /*public*/ scoringRunForSuper : number = 2;

    /*public*/ pow_HOPBALL : number = 1;

    /*public*/ pow_KILLBALL : number = 2;

    /*public*/ pow_INVERTBALL : number = 3;

    /*public*/ pow_ATTRACTBALL : number = 4;

    /*public*/ pow_REPELBALL : number = 5;

    /*public*/ pow_HOPBALL_ENERGY : number = 10;

    /*public*/ pow_KILLBALL_ENERGY : number = 35;

    /*public*/ pow_INVERTBALL_ENERGY : number = 15;

    /*public*/ pow_ATTRACTBALL_ENERGY : number = 5;

    /*public*/ pow_REPELBALL_ENERGY : number = 5;

    /*public*/ p1Pow : number = 1;

    /*public*/ p2Pow : number = 1;

    /*public*/ p1PowReq : number = 10;

    /*public*/ p2PowReq : number = 10;

    /*public*/ bgColor : Color = new Color(0, 0, 50);

    /*public*/ p1Energy : number = 100.0;

    /*public*/ p2Energy : number = 100.0;

    p1PowString : string = "undefined";

    p2PowString : string = "undefined";

    fBouncyRoof : boolean = true;

    public async handleEvent(event : Event) : Promise<boolean> {
        switch((event.id)) {
        case 401:
        case 403:
            if(!this.fEndGame) {
                switch((event.key)) {
                case 9:
                case 81:
                case 113:
                    this.slimerSpecial(1);
                    break;
                case 10:
                case 72:
                case 104:
                    this.slimerSpecial(2);
                    break;
                case 65:
                case 97:
                    this.p1XV = this.scoringRun <= -2?-16:-8;
                    break;
                case 68:
                case 100:
                    this.p1XV = this.scoringRun <= -2?16:8;
                    break;
                case 73:
                case 105:
                case 1004:
                    if(this.p2Y === 0) {
                        this.p2YV = this.scoringRun >= 2?45:31;
                    }
                    break;
                case 74:
                case 106:
                case 1006:
                    this.p2XV = this.scoringRun >= 2?-16:-8;
                    break;
                case 75:
                case 107:
                case 1005:
                    if(this.fCanChangeCol) {
                        this.p2Pow = this.p2Pow !== 5?this.p2Pow + 1:1;
                        switch((this.p2Pow)) {
                        case 1:
                            this.p2PowReq = 10;
                            break;
                        case 2:
                            this.p2PowReq = 35;
                            break;
                        case 3:
                            this.p2PowReq = 15;
                            break;
                        case 4:
                            this.p2PowReq = 5;
                            break;
                        case 5:
                            this.p2PowReq = 5;
                        }
                        this.drawScores();
                        this.drawEnergyBars();
                        break;
                    }
                case 32:
                    this.mousePressed = true;
                    break;
                case 76:
                case 108:
                case 1007:
                    this.p2XV = this.scoringRun >= 2?16:8;
                    break;
                case 83:
                case 115:
                    this.p1Pow = this.p1Pow !== 5?this.p1Pow + 1:1;
                    switch((this.p1Pow)) {
                    case 1:
                        this.p1PowReq = 10;
                        break;
                    case 2:
                        this.p1PowReq = 35;
                        break;
                    case 3:
                        this.p1PowReq = 15;
                        break;
                    case 4:
                        this.p1PowReq = 5;
                        break;
                    case 5:
                        this.p1PowReq = 5;
                    }
                    this.drawScores();
                    this.drawEnergyBars();
                    break;
                case 87:
                case 119:
                    if(this.p1Y === 0) {
                        this.p1YV = this.scoringRun <= -2?45:31;
                    }
                }
            }
            break;
        case 402:
        case 404:
            switch((event.key)) {
            case 65:
            case 97:
                if(this.p1XV < 0) {
                    this.p1XV = 0;
                }
                return false;
            case 68:
            case 100:
                if(this.p1XV > 0) {
                    this.p1XV = 0;
                }
                return false;
            case 74:
            case 106:
            case 1006:
                if(this.p2XV < 0) {
                    this.p2XV = 0;
                }
                return false;
            case 76:
            case 108:
            case 1007:
                if(this.p2XV > 0) {
                    this.p2XV = 0;
                }
                return false;
            default:
                return false;
            }
        case 501:
            this.mousePressed = true;
            if(!this.fInPlay) {
                this.fEndGame = false;
                this.fInPlay = true;
                this.nScore = 5;
                this.nPointsScored = 0;
                this.p1X = 200;
                this.p1Y = 0;
                this.p2X = 800;
                this.p2Y = 0;
                this.p1XV = 0;
                this.p1YV = 0;
                this.p2XV = 0;
                this.p2YV = 0;
                this.ballX = 200;
                this.ballY = 400;
                this.ballVX = 0;
                this.ballVY = 0;
                this.promptMsg = "";
                this.repaint();
                this.gameThread = new Thread(this);
                this.gameThread.start();
            }
            break;
        case 503:
            this.showStatus("Slime Volleyball 2-Player, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
        }
        return false;
    }

    /*public*/ DrawSlimers() {
        let k1 : number = (this.nWidth / 10|0);
        let j2 : number = (this.nHeight / 10|0);
        let i3 : number = (this.nWidth / 50|0);
        let j3 : number = (this.nHeight / 25|0);
        let k3 : number = (this.ballX * this.nWidth / 1000|0);
        let l3 : number = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        let i : number = (this.p1OldX * this.nWidth / 1000|0) - (k1 / 2|0);
        let l : number = (7 * this.nHeight / 10|0) - (this.p1OldY * this.nHeight / 1000|0);
        this.screen.setColor(this.bgColor);
        this.screen.fillRect(i, l, k1, j2);
        i = (this.p2OldX * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(this.bgColor);
        this.screen.fillRect(i, l, k1, j2);
        this.MoveBall();
        i = (this.p1X * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun <= -2?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:Color.fromString("blue"));
        this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
        let l4 : number = this.p1X + 38;
        let i5 : number = this.p1Y - 60;
        i = (l4 * this.nWidth / 1000|0);
        l = (7 * this.nHeight / 10|0) - (i5 * this.nHeight / 1000|0);
        let i4 : number = i - k3;
        let j4 : number = l - l3;
        let k4 : number = (<number>Math.sqrt(<number>(i4 * i4 + j4 * j4))|0);
        let flag : boolean = Math.random() < 0.01;
        if(flag) {
            this.p1Blink = 5;
        }
        if(this.p1Blink === 0) {
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillOval(i - i3, l - j3, i3, j3);
            if(k4 > 0 && !flag) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(i - (4 * i4 / k4|0) - (3 * i3 / 4|0), l - (4 * j4 / k4|0) - (3 * j3 / 4|0), (i3 / 2|0), (j3 / 2|0));
            }
        } else {
            --this.p1Blink;
        }
        i = (this.p2X * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun >= 2?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:Color.fromString("green"));
        this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
        l4 = this.p2X - 18;
        i5 = this.p2Y - 60;
        i = (l4 * this.nWidth / 1000|0);
        l = (7 * this.nHeight / 10|0) - (i5 * this.nHeight / 1000|0);
        i4 = i - k3;
        j4 = l - l3;
        k4 = (<number>Math.sqrt(<number>(i4 * i4 + j4 * j4))|0);
        flag = Math.random() < 0.01;
        if(flag) {
            this.p2Blink = 5;
        }
        if(this.p2Blink === 0) {
            this.screen.setColor(flag?Color.fromString("gray"):Color.fromString("white"));
            this.screen.fillOval(i - i3, l - j3, i3, j3);
            if(k4 > 0 && !flag) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(i - (4 * i4 / k4|0) - (3 * i3 / 4|0), l - (4 * j4 / k4|0) - (3 * j3 / 4|0), (i3 / 2|0), (j3 / 2|0));
            }
        } else {
            --this.p2Blink;
        }
        let i2 : number;
        let l2 : number;
        let k : number;
        let j1 : number;
        let k5 : number;
        if(this.nScore > 8) {
            i2 = (this.p1X * this.nWidth / 1000|0);
            l2 = (7 * this.nHeight / 10|0) - ((this.p1Y - 40) * this.nHeight / 1000|0);
            k = (this.nWidth / 20|0);
            j1 = (this.nHeight / 20|0);
            k5 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(i2, l2 + k5, k, j1, -30, -150);
                ++k5;
            } while((k5 < 3));
        } else {
            if(this.nScore < 2) {
                i2 = (this.nWidth / 20|0);
                l2 = (this.nHeight / 20|0);
                k = (this.p2X * this.nWidth / 1000|0) - i2;
                j1 = (7 * this.nHeight / 10|0) - ((this.p2Y - 40) * this.nHeight / 1000|0);
                k5 = 0;
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(k, j1 + k5, i2, l2, -10, -150);
                    ++k5;
                } while((k5 < 3));
            }
        }
    }

    public paint(g : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        g.setColor(this.bgColor);
        g.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        g.setColor(Color.fromString("darkGray"));
        g.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        g.setColor(Color.fromString("white"));
        g.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        this.drawScores();
        this.drawPrompt();
        this.drawEnergyBars();
        if(!this.fInPlay) {
            let fm : FontMetrics = this.screen.getFontMetrics();
            g.setFont(new Font("Arial", 1, 150));
            fm = g.getFontMetrics();
            g.setColor(new Color(20, 20, 40));
            g.drawString("2", (this.nWidth / 2|0) - (fm.stringWidth("2") / 2|0), (this.nHeight / 2|0) + 20);
            g.setFont(new Font("Courier", 0, 18));
            fm = g.getFontMetrics();
            g.setColor(new Color(255, 255, 255));
            g.drawString("Slime Volleyball", (this.nWidth / 2|0) - (fm.stringWidth("Slime Volleyball") / 2|0), (this.nHeight / 2|0));
            g.setFont(new Font("Courier", 3, 12));
            fm = g.getFontMetrics();
            g.setColor(new Color(255, 255, 100));
            g.drawString("POWER SLIME - beta", (this.nWidth / 2|0) - (fm.stringWidth("POWER SLIME - beta") / 2|0), (this.nHeight / 2|0) + 15);
            g.setFont(new Font("Arial", 0, 11));
            fm = g.getFontMetrics();
            g.setColor(new Color(255, 255, 255));
            fm = g.getFontMetrics();
            g.drawString("Written by Quin Pendragon", (this.nWidth / 2|0) - (fm.stringWidth("Written by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + fm.getHeight() * 2 + 20);
            g.drawString("Mod by Tim Lightfoot", (this.nWidth / 2|0) - (fm.stringWidth("Mod by Tim Lightfoot") / 2|0), (this.nHeight / 2|0) + fm.getHeight() * 2 + 35);
        }
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ ReplayFrame(i : number, j : number, k : number, l : number, i1 : number, flag : boolean) {
        if(flag) {
            this.ballX = this.ballOldX = -50000000;
            this.ballY = this.ballOldY = 100000;
            this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
        } else {
            let _ex : number = i !== 0?i - 1:199;
            this.p1OldX = this.replayData[_ex][0];
            this.p1OldY = this.replayData[_ex][1];
            this.p2OldX = this.replayData[_ex][2];
            this.p2OldY = this.replayData[_ex][3];
            this.ballOldX = this.replayData[_ex][4];
            this.ballOldY = this.replayData[_ex][5];
        }
        this.p1X = this.replayData[i][0];
        this.p1Y = this.replayData[i][1];
        this.p2X = this.replayData[i][2];
        this.p2Y = this.replayData[i][3];
        this.ballX = this.replayData[i][4];
        this.ballY = this.replayData[i][5];
        this.p1Col = this.replayData[i][6];
        this.p2Col = this.replayData[i][7];
        this.ballVX = 0;
        this.ballVY = 1;
        if((i / 10|0) % 2 > 0) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.drawString("Replay...", j, k);
        } else {
            this.screen.setColor(this.bgColor);
            this.screen.fillRect(j, k - i1, l, i1 * 2);
        }
        this.DrawSlimers();
        try {
            Thread.sleep$long(20);
        } catch(var8) {
        };
    }

    /*public*/ MakeTime(l : number) : string {
        let l1 : number = Math.floor(l / 10) % 100;
        let l2 : number = Math.floor(l / 1000) % 60;
        let l3 : number = Math.floor(l / 60000) % 60;
        let l4 : number = Math.floor(l / 3600000);
        let s : string = "";
        if(l4 < 10) {
            s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat("0");
        }
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(l4).toString()).toString());
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(":");
        if(l3 < 10) {
            s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat("0");
        }
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(l3).toString()).toString());
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(":");
        if(l2 < 10) {
            s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat("0");
        }
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(l2).toString()).toString());
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(":");
        if(l1 < 10) {
            s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat("0");
        }
        s = /* valueOf */new String(/* valueOf */new String(s).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(l1).toString()).toString());
        return s;
    }

    /*public*/ MoveSlimers() {
        this.p1X += this.p1XV;
        if(this.p1X < 50) {
            this.p1X = 50;
        }
        if(this.p1X > 445) {
            this.p1X = 445;
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= this.scoringRun <= -2?4:2;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p2X += this.p2XV;
        if(this.p2X > 950) {
            this.p2X = 950;
        }
        if(this.p2X < 555) {
            this.p2X = 555;
        }
        if(this.p2YV !== 0) {
            this.p2Y += this.p2YV -= this.scoringRun >= 2?4:2;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
    }

    public constructor() {
        super();
        this.nWidth = 0;
        this.nHeight = 0;
        this.nScore = 0;
        this.nPointsScored = 0;
        this.p1X = 0;
        this.p2X = 0;
        this.p1Y = 0;
        this.p2Y = 0;
        this.p1Col = 0;
        this.slimeColours = null;
        this.p1OldX = 0;
        this.p2OldX = 0;
        this.p1OldY = 0;
        this.p2OldY = 0;
        this.p1XV = 0;
        this.p2XV = 0;
        this.p1YV = 0;
        this.p2YV = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.ballVX = 0;
        this.ballVY = 0;
        this.ballOldX = 0;
        this.ballOldY = 0;
        this.screen = null;
        this.promptMsg = null;
        this.replayData = null;
        this.replayPos = 0;
        this.replayStart = 0;
        this.mousePressed = false;
        this.fCanChangeCol = false;
        this.fInPlay = false;
        this.p1Blink = 0;
        this.p2Blink = 0;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.gameThread = null;
        this.fEndGame = false;
        this.startTime = 0;
        this.gameTime = 0;
        this.scoringRun = 0;
        this.slimeColours = [Color.fromString("red"), Color.fromString("green"), Color.fromString("yellow"), Color.fromString("white"), Color.fromString("black")];
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 8]);
    }

    /*public*/ MoveBall() {
        let k : number = (30 * this.nHeight / 1000|0);
        let i : number = (this.ballOldX * this.nWidth / 1000|0);
        let j : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(this.bgColor);
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(this.fBouncyRoof) {
        }
        if(!this.fEndGame) {
            let l1 : number = (this.ballX - this.p1X) * 2;
            let i2 : number = this.ballY - this.p1Y;
            let j2 : number = l1 * l1 + i2 * i2;
            let k2 : number = this.ballVX - this.p1XV;
            let l2 : number = this.ballVY - this.p1YV;
            let i1 : number;
            let k1 : number;
            if(i2 > 0 && j2 < 15625 && j2 > 25) {
                i1 = (<number>Math.sqrt(<number>j2)|0);
                k1 = ((l1 * k2 + i2 * l2) / i1|0);
                this.ballX = this.p1X + (l1 * 63 / i1|0);
                this.ballY = this.p1Y + (i2 * 125 / i1|0);
                if(k1 <= 0) {
                    this.ballVX += this.p1XV - (2 * l1 * k1 / i1|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p1YV - (2 * i2 * k1 / i1|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP1Touched = true;
            }
            l1 = (this.ballX - this.p2X) * 2;
            i2 = this.ballY - this.p2Y;
            j2 = l1 * l1 + i2 * i2;
            k2 = this.ballVX - this.p2XV;
            l2 = this.ballVY - this.p2YV;
            if(i2 > 0 && j2 < 15625 && j2 > 25) {
                i1 = (<number>Math.sqrt(<number>j2)|0);
                k1 = ((l1 * k2 + i2 * l2) / i1|0);
                this.ballX = this.p2X + (l1 * 63 / i1|0);
                this.ballY = this.p2Y + (i2 * 125 / i1|0);
                if(k1 <= 0) {
                    this.ballVX += this.p2XV - (2 * l1 * k1 / i1|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p2YV - (2 * i2 * k1 / i1|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP2Touched = true;
            }
            if(this.ballX < 15) {
                this.ballX = 15;
                this.ballVX = -this.ballVX;
            }
            if(this.ballX > 985) {
                this.ballX = 985;
                this.ballVX = -this.ballVX;
            }
            if(this.ballX > 480 && this.ballX < 520 && this.ballY < 140) {
                if(this.ballVY < 0 && this.ballY > 130) {
                    this.ballVY *= -1;
                    this.ballY = 130;
                } else if(this.ballX < 500) {
                    this.ballX = 480;
                    this.ballVX = this.ballVX >= 0?-this.ballVX:this.ballVX;
                } else {
                    this.ballX = 520;
                    this.ballVX = this.ballVX <= 0?-this.ballVX:this.ballVX;
                }
            }
        }
        i = (this.ballX * this.nWidth / 1000|0);
        j = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
    }

    /*public*/ DrawStatus() {
        let g : Graphics = this.screen;
        let i : number = (this.nHeight / 20|0);
        g.setColor(this.bgColor);
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let j : number = (this.nWidth / 2|0) + ((this.nScore - 5) * this.nWidth / 24|0);
        let s : string = /* valueOf */new String(/* valueOf */new String((new StringBuffer("Points: ")).append(this.nPointsScored).append("   Elapsed: ").append(this.MakeTime(this.gameTime))).toString()).toString();
        let k : number = fontmetrics.stringWidth(s);
        g.fillRect(j - (k / 2|0) - 5, 0, k + 10, i + 22);
        g.setColor(Color.fromString("white"));
        this.screen.drawString(s, j - (k / 2|0), fontmetrics.getAscent() + 20);
    }

    public drawPrompt$() {
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 6, this.nWidth, (this.nHeight / 5|0) - 10);
        this.drawPrompt$java_lang_String$int(this.promptMsg, 0);
    }

    public drawPrompt$java_lang_String$int(s : string, i : number) {
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("lightGray"));
        this.screen.drawString(s, ((this.nWidth - fontmetrics.stringWidth(s)) / 2|0), (this.nHeight * 4 / 5|0) + fontmetrics.getHeight() * (i + 1) + 10);
    }

    public drawPrompt(s? : any, i? : any) : any {
        if(((typeof s === 'string') || s === null) && ((typeof i === 'number') || i === null)) {
            return <any>this.drawPrompt$java_lang_String$int(s, i);
        } else if(s === undefined && i === undefined) {
            return <any>this.drawPrompt$();
        } else throw new Error('invalid overload');
    }

    /*public*/ SaveReplayData() {
        this.replayData[this.replayPos][0] = this.p1X;
        this.replayData[this.replayPos][1] = this.p1Y;
        this.replayData[this.replayPos][2] = this.p2X;
        this.replayData[this.replayPos][3] = this.p2Y;
        this.replayData[this.replayPos][4] = this.ballX;
        this.replayData[this.replayPos][5] = this.ballY;
        this.replayData[this.replayPos][6] = this.p1Col;
        this.replayData[this.replayPos][7] = this.p2Col;
        ++this.replayPos;
        if(this.replayPos >= 200) {
            this.replayPos = 0;
        }
        if(this.replayStart === this.replayPos) {
            ++this.replayStart;
        }
        if(this.replayStart >= 200) {
            this.replayStart = 0;
        }
    }

    /*public*/ drawScores() {
        let g : Graphics = this.screen;
        let k : number = (this.nHeight / 20|0);
        let i1 : number;
        let j : number;
        for(i1 = 0; i1 < this.nScore; ++i1) {
            j = ((i1 + 1) * this.nWidth / 24|0);
            g.setColor(Color.fromString("blue"));
            g.fillOval(j, 20, k, k);
            g.setColor(Color.fromString("white"));
            g.drawOval(j, 20, k, k);
        };
        g.setColor(this.bgColor);
        g.drawString("Special Ability: ".concat(/* valueOf */new String(/* valueOf */new String(this.p1PowString).toString()).toString()), 20, 60);
        switch((this.p1Pow)) {
        case 1:
            this.p1PowString = "Super Hop";
            break;
        case 2:
            this.p1PowString = "Stun Ball";
            break;
        case 3:
            this.p1PowString = "Invert Ball";
            break;
        case 4:
            this.p1PowString = "Telekenetic Attract";
            break;
        case 5:
            this.p1PowString = "Telekenetic Repel";
        }
        g.setColor(Color.fromString("white"));
        g.drawString("Special Ability: ".concat(/* valueOf */new String(/* valueOf */new String(this.p1PowString).toString()).toString()), 20, 60);
        for(i1 = 0; i1 < 10 - this.nScore; ++i1) {
            j = this.nWidth - ((i1 + 1) * this.nWidth / 24|0) - k;
            g.setColor(Color.fromString("green"));
            g.fillOval(j, 20, k, k);
            g.setColor(Color.fromString("white"));
            g.drawOval(j, 20, k, k);
        };
        g.setColor(this.bgColor);
        g.drawString("Special Ability: ".concat(/* valueOf */new String(/* valueOf */new String(this.p2PowString).toString()).toString()), this.nWidth - 200, 60);
        switch((this.p2Pow)) {
        case 1:
            this.p2PowString = "Super Hop";
            break;
        case 2:
            this.p2PowString = "Stun Ball";
            break;
        case 3:
            this.p2PowString = "Invert Ball";
            break;
        case 4:
            this.p2PowString = "Telekenetic Attract";
            break;
        case 5:
            this.p2PowString = "Telekenetic Repel";
        }
        g.setColor(Color.fromString("white"));
        g.drawString("Special Ability: ".concat(/* valueOf */new String(/* valueOf */new String(this.p2PowString).toString()).toString()), this.nWidth - 200, 60);
    }

    public async run() {
        this.replayPos = this.replayStart = 0;
        this.p1Col = 0;
        this.p2Col = 1;
        this.scoringRun = 0;
        this.fP1Touched = this.fP2Touched = false;
        this.nPointsScored = 0;
        this.startTime = System.currentTimeMillis();
        while((this.nScore !== 0 && this.nScore !== 10 && this.gameThread != null)) {
            this.gameTime = System.currentTimeMillis() - this.startTime;
            this.SaveReplayData();
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.MoveSlimers();
            this.DrawSlimers();
            this.DrawStatus();
            this.recoverSlimerEnergy();
            this.drawEnergyBars();
            this.drawScores();
            if(this.ballY < 35) {
                let l : number = System.currentTimeMillis();
                ++this.nPointsScored;
                this.nScore += this.ballX <= 500?-1:1;
                if(this.ballX <= 500 && this.scoringRun >= 0) {
                    ++this.scoringRun;
                } else if(this.ballX > 500 && this.scoringRun <= 0) {
                    --this.scoringRun;
                } else if(this.ballX <= 500 && this.scoringRun <= 0) {
                    this.scoringRun = 1;
                } else if(this.ballX > 500 && this.scoringRun >= 0) {
                    this.scoringRun = -1;
                }
                this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
                if(!this.fP1Touched && !this.fP2Touched) {
                    this.promptMsg = "It\'s official, you suck!";
                } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) === 2) {
                    this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("is on fire!");
                } else if(this.ballX > 500 && this.fP1Touched && !this.fP2Touched || this.ballX <= 500 && !this.fP1Touched && this.fP2Touched) {
                    this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("aces the serve!");
                } else if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                    this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("watches you make a tool of yourself!");
                } else {
                    switch((this.nScore)) {
                    case 0:
                    case 10:
                        if(this.nPointsScored === 5) {
                            this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("Wins with a QUICK FIVE!!!");
                        } else if(this.scoringRun === 8) {
                            this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("Wins with a BIG NINE!!!");
                        } else {
                            this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("Wins!!!");
                        }
                        break;
                    case 1:
                    case 2:
                    case 3:
                    case 7:
                    case 8:
                    case 9:
                    default:
                        this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("Scores!");
                        break;
                    case 4:
                        this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(this.ballX >= 500?"Scores!":"takes the lead!!").toString()).toString());
                        break;
                    case 5:
                        this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat("Equalizes!");
                        break;
                    case 6:
                        this.promptMsg = /* valueOf */new String(/* valueOf */new String(this.promptMsg).toString()).toString().concat(/* valueOf */new String(/* valueOf */new String(this.ballX <= 500?"Scores!":"takes the lead!!").toString()).toString());
                    }
                }
                this.fCanChangeCol = false;
                let flag : boolean = this.nScore !== 0 && this.nScore !== 10;
                let i : number = this.ballX;
                this.drawPrompt();
                if(flag) {
                    this.drawPrompt$java_lang_String$int("Click mouse or Hit space for replay...", 1);
                    this.mousePressed = false;
                    if(this.gameThread != null) {
                        try {
                            Thread.sleep$long(2500);
                        } catch(var8) {
                        };
                    }
                    if(this.mousePressed) {
                        this.SaveReplayData();
                        this.DoReplay();
                    }
                } else if(this.gameThread != null) {
                    try {
                        Thread.sleep$long(2500);
                    } catch(var7) {
                    };
                }
                this.promptMsg = "";
                this.drawPrompt();
                this.fCanChangeCol = true;
                if(flag) {
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p1XV = 0;
                    this.p1YV = 0;
                    this.p2XV = 0;
                    this.p2YV = 0;
                    this.ballX = i >= 500?200:800;
                    this.ballY = 400;
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.replayStart = this.replayPos = 0;
                    this.fP1Touched = this.fP2Touched = false;
                    this.repaint();
                }
                this.startTime += System.currentTimeMillis() - l;
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var6) {
                };
            }
        };
        this.fEndGame = true;
        this.SaveReplayData();
        this.DoReplay();
        this.fInPlay = false;
        this.promptMsg = "Click the mouse to play...";
        this.repaint();
    }

    public init() {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.nScore = 5;
        this.fInPlay = this.fEndGame = false;
        this.fCanChangeCol = true;
        this.promptMsg = "Click the mouse to play...";
        this.screen = this.getGraphics();
    }

    /*public*/ DoReplay() {
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let i : number = fontmetrics.stringWidth("Replay...");
        let j : number = fontmetrics.getHeight();
        let k : number = (this.nWidth / 2|0) - (i / 2|0);
        let l : number = (this.nHeight / 2|0) - j;
        this.promptMsg = "Click mouse or hit space to continue...";
        this.mousePressed = false;
        for(let i1 : number = this.replayPos - 1; !this.mousePressed; this.ReplayFrame(i1, k, l, i, j, false)) {
            ++i1;
            if(i1 >= 200) {
                i1 = 0;
            }
            if(i1 === this.replayPos) {
                try {
                    Thread.sleep$long(1000);
                } catch(var8) {
                };
                i1 = this.replayStart;
                this.paint(this.getGraphics());
            }
        };
        this.promptMsg = "";
        this.paint(this.getGraphics());
    }

    /*public*/ DoFatality() {
    }

    /*public*/ slimerSpecial(playerNum : number) {
        if(this.fP1Touched && this.fP2Touched) {
            let dx : number;
            let dy : number;
            switch((playerNum)) {
            case 1:
                if(this.scoringRun > -2) {
                    this.p1Energy -= <number>this.p1PowReq;
                }
                switch((this.p1Pow)) {
                case 1:
                    if(this.p1Energy > <number>this.p1PowReq) {
                        this.promptMsg = "Slimer 1 Hops the ball!";
                        this.drawPrompt();
                        this.ballVY += 20;
                        this.drawEnergyBars();
                    }
                    return;
                case 2:
                    if(this.p1Energy > <number>this.p1PowReq) {
                        this.promptMsg = "Slimer 1 stuns the ball!";
                        this.drawPrompt();
                        this.ballVX = 0;
                        this.ballVY = 0;
                        this.drawEnergyBars();
                    }
                    return;
                case 3:
                    if(this.p1Energy > <number>this.p1PowReq) {
                        this.promptMsg = "Slimer 1 Inverts the ball!";
                        this.drawPrompt();
                        this.ballVX *= -1;
                        this.ballVY *= -1;
                        this.drawEnergyBars();
                    }
                    return;
                case 4:
                    this.promptMsg = "Slimer 1 uses telekenetic attract!";
                    this.drawPrompt();
                    if(this.p1Energy > <number>this.p1PowReq) {
                        dx = <number>(this.ballX - this.p1X);
                        dy = <number>(this.ballY - this.p1Y);
                        if(Math.abs(dx) > Math.abs(dy)) {
                            dy /= dx;
                            dx /= Math.abs(dx);
                        } else {
                            dx /= dy;
                            dy /= Math.abs(dy);
                        }
                        this.ballVX = (<number>(<number>this.ballVX - <number>8 * dx)|0);
                        this.ballVY = (<number>(<number>this.ballVY - <number>8 * dy)|0);
                        this.drawEnergyBars();
                    }
                    return;
                case 5:
                    if(this.p1Energy > <number>this.p1PowReq) {
                        this.promptMsg = "Slimer 1 uses telekenetic repel!";
                        this.drawPrompt();
                        dx = <number>(this.ballX - this.p1X);
                        dy = <number>(this.ballY - this.p1Y);
                        if(Math.abs(dx) > Math.abs(dy)) {
                            dy /= dx;
                            dx /= Math.abs(dx);
                        } else {
                            dx /= dy;
                            dy /= Math.abs(dy);
                        }
                        this.ballVX = (<number>(<number>this.ballVX + <number>10 * dx)|0);
                        this.ballVY = (<number>(<number>this.ballVY + <number>10 * dy)|0);
                        this.drawEnergyBars();
                    }
                    return;
                default:
                    return;
                }
            case 2:
                if(this.scoringRun < 2) {
                    this.p2Energy -= <number>this.p2PowReq;
                }
                switch((this.p2Pow)) {
                case 1:
                    if(this.p2Energy > <number>this.p2PowReq) {
                        this.promptMsg = "Slimer 2 Hops the ball!";
                        this.drawPrompt();
                        this.ballVY += 20;
                        this.drawEnergyBars();
                    }
                    break;
                case 2:
                    if(this.p2Energy > <number>this.p2PowReq) {
                        this.promptMsg = "Slimer 2 stuns the ball!";
                        this.drawPrompt();
                        this.ballVX = 0;
                        this.ballVY = 0;
                        this.drawEnergyBars();
                    }
                    break;
                case 3:
                    if(this.p2Energy > <number>this.p2PowReq) {
                        this.promptMsg = "Slimer 2 Inverts the ball!";
                        this.drawPrompt();
                        this.ballVX *= -1;
                        this.ballVY *= -1;
                        this.drawEnergyBars();
                    }
                    break;
                case 4:
                    this.promptMsg = "Slimer 2 uses telekenetic attract!";
                    this.drawPrompt();
                    if(this.p2Energy > <number>this.p2PowReq) {
                        dx = <number>(this.ballX - this.p2X);
                        dy = <number>(this.ballY - this.p2Y);
                        if(Math.abs(dx) > Math.abs(dy)) {
                            dy /= dx;
                            dx /= Math.abs(dx);
                        } else {
                            dx /= dy;
                            dy /= Math.abs(dy);
                        }
                        this.ballVX = (<number>(<number>this.ballVX - <number>8 * dx)|0);
                        this.ballVY = (<number>(<number>this.ballVY - <number>8 * dy)|0);
                        this.drawEnergyBars();
                    }
                    break;
                case 5:
                    if(this.p2Energy > <number>this.p2PowReq) {
                        this.promptMsg = "Slimer 2 uses telekenetic repel!";
                        this.drawPrompt();
                        dx = <number>(this.ballX - this.p2X);
                        dy = <number>(this.ballY - this.p2Y);
                        if(Math.abs(dx) > Math.abs(dy)) {
                            dy /= dx;
                            dx /= Math.abs(dx);
                        } else {
                            dx /= dy;
                            dy /= Math.abs(dy);
                        }
                        this.ballVX = (<number>(<number>this.ballVX + <number>10 * dx)|0);
                        this.ballVY = (<number>(<number>this.ballVY + <number>10 * dy)|0);
                        this.drawEnergyBars();
                    }
                }
            }
        } else {
            this.promptMsg = "Sorry, No more cheap points!";
            this.drawPrompt();
        }
    }

    /*public*/ recoverSlimerEnergy() {
        if(this.p1Energy < <number>100) {
            this.p1Energy = <number>(<number>this.p1Energy + 0.22);
        }
        if(this.p2Energy < <number>100) {
            this.p2Energy = <number>(<number>this.p2Energy + 0.22);
        }
    }

    /*public*/ drawEnergyBars() {
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 30, this.nWidth, 15);
        this.screen.setColor(Color.fromString("black"));
        this.screen.drawRect(10, (4 * this.nHeight / 5|0) + 30, (this.nWidth / 2|0) - 20, 15);
        this.screen.drawRect(10 + (this.nWidth / 2|0), (4 * this.nHeight / 5|0) + 30, (this.nWidth / 2|0) - 20, 15);
        this.screen.setColor(new Color(50, 50, 255));
        this.screen.fillRect(11, (4 * this.nHeight / 5|0) + 31, ((<number>(<number>((this.nWidth / 2|0) - 22) * this.p1Energy)|0) / 100|0), 14);
        this.screen.setColor(new Color(30, 30, 30));
        this.screen.drawRect(10, (4 * this.nHeight / 5|0) + 30, (((this.nWidth / 2|0) - 20) * this.p1PowReq / 100|0), 15);
        this.screen.setColor(new Color(50, 255, 50));
        this.screen.fillRect(11 + (this.nWidth / 2|0), (4 * this.nHeight / 5|0) + 31, ((<number>(<number>((this.nWidth / 2|0) - 22) * this.p2Energy)|0) / 100|0), 14);
        this.screen.setColor(new Color(30, 30, 30));
        this.screen.drawRect(10 + (this.nWidth / 2|0), (4 * this.nHeight / 5|0) + 30, (((this.nWidth / 2|0) - 20) * this.p2PowReq / 100|0), 15);
    }
}
Slime2P["__class"] = "Slime2P";
Slime2P["__interfaces"] = ["Runnable"];



class BufferedImage extends Image {
    public constructor(x : number, y : number, z : number) {
        super();
    }

    public getSubimage(a : number, b : number, c : number, d : number) : BufferedImage {
        return null;
    }
}
BufferedImage["__class"] = "BufferedImage";


class Frame extends Element {
    public setTitle(s : string) {
    }

    public pack() {
    }

    public show() {
    }

    public dispose() {
    }

    public setLayout(g : GridLayout) {
    }
}
Frame["__class"] = "Frame";


class TextField extends Element {
    public constructor(s : number) {
        super();
    }

    public getText() : string {
        return null;
    }
}
TextField["__class"] = "TextField";


class Button extends Element {
    public constructor(s : string) {
        super();
    }
}
Button["__class"] = "Button";


class Panel extends Element {}
Panel["__class"] = "Panel";


class Label extends Element {
    public constructor(s : string) {
        super();
    }
}
Label["__class"] = "Label";