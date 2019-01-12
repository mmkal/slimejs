import { Applet, Runnable, Color, Graphics, Thread, Image, FontMetrics, Event, System, Font, ImageObserver, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class SpaceSlime extends Applet implements Runnable {
    public recommended_width = 700;
    public recommended_height = 350;
    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ p1Score : number;

    /*public*/ p2Score : number;

    /*public*/ p1X : number;

    /*public*/ p2X : number;

    /*public*/ p1Y : number;

    /*public*/ p2Y : number;

    /*public*/ p1Col : number;

    /*public*/ p2Col : number;

    /*public*/ slimeColText : string[] = ["Argentina", "Belgium", "Australia", "Iceland", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland", "Saudi Arabia", "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", "England", "Germany", "Night Elves"];

    /*public*/ darkRed : Color = new Color(128, 0, 0);

    /*public*/ darkGreen : Color = new Color(0, 128, 0);

    /*public*/ darkBlue : Color = new Color(0, 0, 128);

    /*public*/ slimaryCols : Color[];

    /*public*/ secondaryCols : Color[];

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

    /*public*/ fP1Sticky : boolean;

    /*public*/ fP2Sticky : boolean;

    /*public*/ fP1Touched : boolean;

    /*public*/ fP2Touched : boolean;

    /*public*/ p1TouchingGoal : number;

    /*public*/ p2TouchingGoal : number;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ fPlayOn : boolean;

    /*public*/ nScoreX : number;

    /*public*/ startTime : number;

    /*public*/ gameTime : number;

    /*public*/ scoringRun : number;

    /*public*/ frenzyCol : number;

    /*public*/ playOnTicks : number;

    /*public*/ backBuffer : Image;

    /*public*/ SMILE_DIFF : number;

    /*public*/ DAMPING : number;

    /*public*/ MAX_TICKS_TOUCHING_GOAL : number;

    /*public*/ JUMPVEL : number;

    /*public*/ SLIMEVEL : number;

    /*public*/ GRAVITY : number;

    /*public*/ gameLength : number;

    /*public*/ worldCup : boolean;

    /*public*/ worldCupRound : number;

    public floaty : number;

    /*public*/ fExtraTime : boolean;

    /*public*/ fGoldenGoal : boolean;

    /*public*/ fSuperSlime : boolean;

    /*public*/ doubleBuffered : boolean;

    /*public*/ pointsX : number[];

    /*public*/ pointsY : number[];

    public initStuff() {
        this.fEndGame = true;
        this.p1X = 200;
        this.p1Y = 0;
        this.p2X = 800;
        this.p2Y = 0;
        this.p1XV = 0;
        this.p1YV = 0;
        this.p2XV = 0;
        this.p2YV = 0;
        this.p1Score = 0;
        this.p2Score = 0;
        this.ballOldX = this.ballX = 500;
        this.ballOldY = this.ballY = 200;
        this.ballVX = 0;
        this.ballVY = 0;
        this.replayStart = this.replayPos = 0;
        this.fP1Touched = this.fP2Touched = false;
        this.playOnTicks = 10;
        this.fPlayOn = false;
        this.fExtraTime = false;
        this.fGoldenGoal = false;
        this.JUMPVEL = !this.fSuperSlime?20:20;
        this.SLIMEVEL = !this.fSuperSlime?8:16;
        this.GRAVITY = !this.fSuperSlime?1:1;
    }

    /*public*/ drawButtons() {
        let buttons : string[] = ["1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"];
        let fm : FontMetrics = this.screen.getFontMetrics();
        let darkBlue : Color = new Color(0, 0, 128);
        for(let i : number = 0; i < 5; ++i) {
            this.screen.setColor(darkBlue);
            this.screen.fillRect(((2 * i + 1) * this.nWidth / 10|0) - (this.nWidth / 12|0), (this.nHeight * 2 / 10|0), (this.nWidth / 6|0), (this.nHeight / 10|0));
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString(buttons[i], ((2 * i + 1) * this.nWidth / 10|0) - (fm.stringWidth(buttons[i]) / 2|0), (this.nHeight * 5 / 20|0) + (fm.getHeight() / 2|0));
        };
        this.flip();
    }

    /*public*/ testButton(x : number, y : number) : boolean {
        for(let i : number = 0; i < 5; ++i) {
            if(x > ((2 * i + 1) * this.nWidth / 10|0) - (this.nWidth / 12|0) && x < ((2 * i + 1) * this.nWidth / 10|0) + (this.nWidth / 12|0) && y > (this.nHeight * 2 / 10|0) && y < (this.nHeight * 3 / 10|0)) {
                if(i === 4) {
                    this.gameLength = 120000;
                    this.worldCup = true;
                } else {
                    this.gameLength = (1 << i) * 60000;
                    this.worldCup = false;
                }
                return true;
            }
        };
        return false;
    }

    public async handleEvent(event : Event) : Promise<boolean> {
        switch((event.id)) {
        case 401:
        case 403:
            if(this.fCanChangeCol) {
                switch((event.key)) {
                case 54:
                    this.fSuperSlime = !this.fSuperSlime;
                    this.repaint();
                    break;
                case 73:
                case 105:
                case 1004:
                    do {
                        this.p2Col = this.p2Col !== 0?this.p2Col - 1:this.slimaryCols.length - 1;
                    } while((this.p1Col === this.p2Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 75:
                case 107:
                case 1005:
                    do {
                        this.p2Col = this.p2Col === this.slimaryCols.length - 1?0:this.p2Col + 1;
                    } while((this.p2Col === this.p1Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 83:
                case 115:
                    do {
                        this.p1Col = this.p1Col === this.slimaryCols.length - 1?0:this.p1Col + 1;
                    } while((this.p1Col === this.p2Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 87:
                case 119:
                    while((true)) {
                        this.p1Col = this.p1Col !== 0?this.p1Col - 1:this.slimaryCols.length - 1;
                        if(this.p1Col !== this.p2Col) {
                            this.drawScores();
                            this.repaint();
                            break;
                        }
                    };
                }
            }
            if(!this.fEndGame) {
                switch((event.key)) {
                case 32:
                    this.mousePressed = true;
                    return false;
                case 65:
                case 97:
                    this.p1XV = -this.SLIMEVEL;
                    return false;
                case 66:
                case 98:
                    this.toggleBuffering();
                    return false;
                case 68:
                case 100:
                    this.p1XV = this.SLIMEVEL;
                    return false;
                case 73:
                case 105:
                case 1004:
                    if(!this.worldCup) {
                        this.p2YV = this.JUMPVEL;
                    }
                    return false;
                case 74:
                case 106:
                case 1006:
                    if(!this.worldCup) {
                        this.p2XV = -this.SLIMEVEL;
                    }
                    return false;
                case 75:
                case 107:
                case 1005:
                    if(!this.worldCup) {
                        this.p2YV = -this.JUMPVEL;
                    }
                    return false;
                case 76:
                case 108:
                case 1007:
                    if(!this.worldCup) {
                        this.p2XV = this.SLIMEVEL;
                    }
                    return false;
                case 83:
                case 115:
                    this.p1YV = -this.JUMPVEL;
                    return false;
                case 87:
                case 119:
                    this.p1YV = this.JUMPVEL;
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
                if(this.p2XV < 0 && !this.worldCup) {
                    this.p2XV = 0;
                }
                return false;
            case 75:
            case 107:
            case 1005:
                this.fP2Sticky = false;
                return false;
            case 76:
            case 108:
            case 1007:
                if(this.p2XV > 0 && !this.worldCup) {
                    this.p2XV = 0;
                }
                return false;
            case 83:
            case 115:
                this.fP1Sticky = false;
                return false;
            default:
                return false;
            }
        case 501:
            this.mousePressed = true;
            if(!this.fInPlay && this.testButton(event.x, event.y)) {
                this.fEndGame = false;
                this.fInPlay = true;
                this.p1X = 200;
                this.p1Y = 0;
                this.p2X = 800;
                this.p2Y = 0;
                this.p1XV = 0;
                this.p1YV = 0;
                this.p2XV = 0;
                this.p2YV = 0;
                this.ballX = 500;
                this.ballY = 200;
                this.ballOldX = 500;
                this.ballOldY = 200;
                this.ballVX = 0;
                this.ballVY = 0;
                this.p1Score = 0;
                this.p2Score = 0;
                this.promptMsg = "";
                this.paint(this.getGraphics());
                try {
                    Thread.sleep$long(100);
                } catch(var4) {
                };
                this.gameThread = new Thread(this);
                this.gameThread.start();
            }
            break;
        case 503:
            this.showStatus("Slime Volleyball 2-Player: Soccer Slime, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
            this.requestFocus();
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
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillRect(i, l, k1, j2);
        i = (this.p2OldX * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillRect(i, l, k1, j2);
        if(!this.fEndGame) {
            this.MoveBall();
        }
        i = (this.p1X * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p1Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
        this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.pointsX[0] = this.pointsX[2] = i + (k1 / 2|0);
        this.pointsX[1] = i + (k1 * 2 / 5|0);
        this.pointsX[3] = i + (k1 / 8|0);
        this.pointsY[0] = l;
        this.pointsY[1] = this.pointsY[3] = l + (j2 / 2|0);
        this.pointsY[2] = l + j2;
        this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
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
        let i2 : number;
        let l2 : number;
        let k : number;
        let j1 : number;
        let k5 : number;
        if(this.p1Score > this.p2Score + 2) {
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
        }
        i = (this.p2X * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(!this.fSuperSlime?this.slimaryCols[this.p2Col]:this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]);
        this.screen.fillArc(i, l, k1, 2 * j2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.pointsX[0] = this.pointsX[2] = i + (k1 / 2|0);
        this.pointsX[1] = i + (k1 * 3 / 5|0);
        this.pointsX[3] = i + (k1 * 7 / 8|0);
        this.pointsY[0] = l;
        this.pointsY[1] = this.pointsY[3] = l + (j2 / 2|0);
        this.pointsY[2] = l + j2;
        this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
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
            this.screen.setColor(!flag?Color.fromString("white"):Color.fromString("gray"));
            this.screen.fillOval(i - i3, l - j3, i3, j3);
            if(k4 > 0 && !flag) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(i - (4 * i4 / k4|0) - (3 * i3 / 4|0), l - (4 * j4 / k4|0) - (3 * j3 / 4|0), (i3 / 2|0), (j3 / 2|0));
            }
        } else {
            --this.p2Blink;
        }
        if(this.p2Score > this.p1Score + 2) {
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

    public paint(g : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        this.screen.setColor(Color.fromString("white"));
        this.drawScores();
        if(!this.fInPlay) {
            this.DrawSlimers();
            this.drawButtons();
        }
        this.DrawGoals();
        this.drawPrompt();
        if(!this.fInPlay) {
            let fontmetrics : FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            if(this.fSuperSlime) {
                this.screen.drawString("Super Space Slime+!", (this.nWidth / 2|0) - (fontmetrics.stringWidth("Super Soccer Slime!") / 2|0), (this.nHeight / 2|0) - fontmetrics.getHeight());
            } else {
                this.screen.drawString("Space Slime+!", (this.nWidth / 2|0) - (fontmetrics.stringWidth("Soccer Slime!") / 2|0), (this.nHeight / 2|0) - fontmetrics.getHeight());
            }
            this.screen.setColor(Color.fromString("white"));
            fontmetrics = this.screen.getFontMetrics();
            this.screen.drawString("Written by Quin Pendragon", (this.nWidth / 2|0) - (fontmetrics.stringWidth("Written by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + fontmetrics.getHeight() * 2);
            this.screen.drawString("Space Mod added by anonymous tipster", (this.nWidth / 3|0) - (fontmetrics.stringWidth("Written by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + fontmetrics.getHeight() * 3);
        }
        this.flip();
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ ReplayFrame(i : number, j : number, k : number, l : number, i1 : number, flag : boolean) {
        if(flag) {
            this.ballX = -1000;
            this.ballOldX = 500;
            this.ballY = -1000;
            this.ballOldY = 500;
            this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
        } else {
            let j1 : number = i === 0?199:i - 1;
            this.p1OldX = this.replayData[j1][0];
            this.p1OldY = this.replayData[j1][1];
            this.p2OldX = this.replayData[j1][2];
            this.p2OldY = this.replayData[j1][3];
            if(i === 0) {
                this.ballOldX = 500;
                this.ballOldY = 200;
            } else {
                this.ballOldX = this.replayData[j1][4];
                this.ballOldY = this.replayData[j1][5];
            }
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
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillRect(j, k - i1, l, i1 * 2);
        }
        this.DrawSlimers();
        this.DrawGoals();
        try {
            Thread.sleep$long(20);
        } catch(var9) {
        };
    }

    /*public*/ MakeTime(l : number) : string {
        let l1 : number = Math.floor(l / 10) % 100;
        let l2 : number = Math.floor(l / 1000) % 60;
        let l3 : number = Math.floor(l / 60000) % 60;
        let s : string = "";
        if(l3 < 10) {
            s = s + "0";
        }
        s = s + l3;
        s = s + ":";
        if(l2 < 10) {
            s = s + "0";
        }
        s = s + l2;
        s = s + ":";
        if(l1 < 10) {
            s = s + "0";
        }
        s = s + l1;
        return s;
    }

    /*public*/ MoveSlimers() {
        if(this.worldCup) {
            switch((this.worldCupRound)) {
            case 0:
                this.controlP2v0();
                break;
            case 1:
                this.controlP2v1();
                break;
            case 2:
                this.controlP2v2();
                break;
            case 3:
                this.controlP2v3();
            }
        }
        this.p1X += this.p1XV;
        if(this.p1X < 50) {
            this.p1X = 50;
        }
        if(this.p1X > 950) {
            this.p1X = 950;
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= this.GRAVITY;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p2X += this.p2XV;
        if(this.p2X > 950) {
            this.p2X = 950;
        }
        if(this.p2X < 50) {
            this.p2X = 50;
        }
        if(this.p2YV !== 0) {
            this.p2Y += this.p2YV -= this.GRAVITY;
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
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1X = 0;
        this.p2X = 0;
        this.p1Y = 0;
        this.p2Y = 0;
        this.p1Col = 0;
        this.p2Col = 0;
        this.slimaryCols = null;
        this.secondaryCols = null;
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
        this.fP1Sticky = false;
        this.fP2Sticky = false;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.p1TouchingGoal = 0;
        this.p2TouchingGoal = 0;
        this.gameThread = null;
        this.fEndGame = false;
        this.fPlayOn = false;
        this.nScoreX = 0;
        this.startTime = 0;
        this.gameTime = 0;
        this.scoringRun = 0;
        this.frenzyCol = 0;
        this.playOnTicks = 0;
        this.backBuffer = null;
        this.SMILE_DIFF = 0;
        this.DAMPING = 0;
        this.MAX_TICKS_TOUCHING_GOAL = 0;
        this.JUMPVEL = 0;
        this.SLIMEVEL = 0;
        this.GRAVITY = 0;
        this.gameLength = 0;
        this.worldCup = false;
        this.worldCupRound = 0;
        this.floaty = 0;
        this.fExtraTime = false;
        this.fGoldenGoal = false;
        this.fSuperSlime = false;
        this.doubleBuffered = false;
        this.pointsX = null;
        this.pointsY = null;
        this.slimaryCols = [Color.fromString("cyan"), Color.fromString("red"), Color.fromString("green"), Color.fromString("white"), this.darkGreen, Color.fromString("white"), this.darkRed, this.darkRed, new Color(119, 41, 28), Color.fromString("yellow"), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), new Color(128, 128, 255), this.darkBlue, Color.fromString("white"), Color.fromString("red"), Color.fromString("white"), new Color(119, 41, 28), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), new Color(185, 30, 2), Color.fromString("white"), Color.fromString("red"), new Color(252, 239, 82), Color.fromString("white"), Color.fromString("red"), new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.fromString("white"), Color.fromString("black")];
        this.secondaryCols = [Color.fromString("white"), Color.fromString("black"), Color.fromString("yellow"), new Color(128, 128, 255), Color.fromString("red"), Color.fromString("red"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), this.darkBlue, Color.fromString("green"), Color.fromString("black"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), Color.fromString("black"), Color.fromString("white"), Color.fromString("red"), this.darkGreen, Color.fromString("white"), new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.fromString("white"), Color.fromString("black"), Color.fromString("red"), Color.fromString("white"), Color.fromString("black"), new Color(7, 177, 33), Color.fromString("red"), Color.fromString("black"), Color.fromString("black")];
        this.frenzyCol = 0;
        this.SMILE_DIFF = 2;
        this.DAMPING = 7;
        this.MAX_TICKS_TOUCHING_GOAL = 60;
        this.worldCup = false;
        this.worldCupRound = 0;
        this.floaty = 0;
        this.pointsX = [];
        this.pointsY = [];
        this.p2Col = 1;
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 8]);
    }

    /*public*/ MoveBall() {
        let k : number = (30 * this.nHeight / 1000|0);
        let i : number = (this.ballOldX * this.nWidth / 1000|0);
        let j : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
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
                    if(!this.fP1Sticky) {
                        this.ballVY += this.p1YV - (2 * i2 * k1 / i1|0);
                        this.ballVX += ((this.p1XV - (2 * l1 * k1 / i1|0)) * 7 / 10|0);
                    } else {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
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
                    if(!this.fP2Sticky) {
                        this.ballVX += ((this.p2XV - (2 * l1 * k1 / i1|0)) * 7 / 10|0);
                        this.ballVY += this.p2YV - (2 * i2 * k1 / i1|0);
                    } else {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
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
            if(this.ballX <= 50 || this.ballX >= 950) {
                if(this.ballY > 200 && this.ballOldY < 200 || this.ballY < 200 && this.ballOldY >= 200) {
                    this.ballY = 200;
                    this.ballVY *= -1;
                }
                if(this.ballY > 180 && this.ballY < 220) {
                    if(this.ballX > 40 && this.ballX < 50 && this.ballVX < 0) {
                        this.ballX = 50;
                        this.ballVX *= -1;
                    }
                    if(this.ballX < 960 && this.ballX > 950 && this.ballVX > 0) {
                        this.ballX = 950;
                        this.ballVX *= -1;
                    }
                }
            }
            if(this.ballY < 34) {
                this.ballY = 34;
                this.ballVY = (-this.ballVY * 7 / 10|0);
                this.ballVX = (this.ballVX * 7 / 10|0);
            }
        }
        i = (this.ballX * this.nWidth / 1000|0);
        j = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
    }

    /*public*/ DrawGoals() {
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillRect((this.nWidth / 20|0), (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), 5, (200 * this.nHeight / 1000|0));
        this.screen.fillRect(this.nWidth - (this.nWidth / 20|0) - 5, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), 5, (200 * this.nHeight / 1000|0));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 2, (this.nWidth / 10|0), 2);
        this.screen.fillRect((this.nWidth * 9 / 10|0), (4 * this.nHeight / 5|0) + 2, (this.nWidth / 10|0), 2);
        let p1TickX : number;
        for(p1TickX = 0; p1TickX < (this.nWidth / 20|0); p1TickX += 5) {
            this.screen.drawLine(p1TickX, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), p1TickX, (4 * this.nHeight / 5|0));
            this.screen.drawLine(this.nWidth - p1TickX, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), this.nWidth - p1TickX, (4 * this.nHeight / 5|0));
        };
        for(p1TickX = (4 * this.nHeight / 5|0) - (this.nHeight / 5|0); p1TickX < (4 * this.nHeight / 5|0); p1TickX += 5) {
            this.screen.drawLine(0, p1TickX, (this.nWidth / 20|0), p1TickX);
            this.screen.drawLine(this.nWidth, p1TickX, this.nWidth - (this.nWidth / 20|0), p1TickX);
        };
        p1TickX = ((60 - this.p1TouchingGoal) * this.nWidth / 120|0);
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.screen.fillRect(0, this.nHeight - 5, p1TickX, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(p1TickX, this.nHeight - 5, (this.nWidth / 2|0) - p1TickX, 5);
        let p2TickX : number = this.nWidth - ((60 - this.p2TouchingGoal) * this.nWidth / 120|0);
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.screen.fillRect(p2TickX, this.nHeight - 5, this.nWidth, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect((this.nWidth / 2|0), this.nHeight - 5, p2TickX - (this.nWidth / 2|0), 5);
    }

    /*public*/ DrawStatus() {
        let g : Graphics = this.screen;
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let s : string = null;
        let time : string = this.MakeTime(this.gameTime);
        let i : number = (this.nHeight / 20|0);
        let k : number = 0;
        let kt : number = fontmetrics.stringWidth(time);
        if(this.worldCup) {
            switch((this.worldCupRound)) {
            case 1:
                s = "Quarter Finals";
                break;
            case 2:
                s = "Semi-Finals";
                break;
            case 3:
                s = "Final";
                break;
            default:
                s = "Qualifying";
            }
            if(this.fGoldenGoal) {
                s = s + " [Golden Goal]";
            } else if(this.fExtraTime) {
                s = s + " [Extra Time]";
            }
            k = fontmetrics.stringWidth(s);
        }
        let mw : number = k <= kt?kt:k;
        g.setColor(Color.fromString("black"));
        g.fillRect((this.nWidth / 2|0) - (mw / 2|0) - 5, 0, mw + 10, i + 22);
        g.setColor(Color.fromString("white"));
        this.screen.drawString(time, (this.nWidth / 2|0) - (kt / 2|0), fontmetrics.getAscent() + 20);
        if(s != null) {
            this.screen.drawString(s, (this.nWidth / 2|0) - (k / 2|0), fontmetrics.getAscent() + 20 - fontmetrics.getHeight());
        }
    }

    public drawPrompt$() {
        this.screen.setColor(Color.fromString("gray"));
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

    /*public*/ promptBox(msg1 : string, msg2 : string) {
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let len1 : number = fontmetrics.stringWidth(msg1);
        let len2 : number = fontmetrics.stringWidth(msg2);
        let maxlen : number = len1 <= len2?len2:len1;
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect((this.nWidth / 2|0) - (maxlen / 2|0) - 20, (this.nHeight * 2 / 5|0), maxlen + 40, (this.nHeight / 5|0));
        this.screen.setColor(Color.fromString("white"));
        this.screen.drawString(msg1, (this.nWidth / 2|0) - (len1 / 2|0), (this.nHeight * 9 / 20|0));
        this.screen.drawString(msg2, (this.nWidth / 2|0) - (len2 / 2|0), (this.nHeight * 11 / 20|0));
        this.flip();
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
        let fm : FontMetrics = this.screen.getFontMetrics();
        let i : number = fm.stringWidth("Replay...");
        g.setColor(Color.fromString("black"));
        g.fillRect(0, 0, this.nWidth, k + 22);
        g.setColor(Color.fromString("white"));
        g.drawString(this.slimeColText[this.p1Col] + " : " + this.p1Score, (this.nWidth / 20|0), k);
        let p2ScrStr : string = this.p2Score + " : " + this.slimeColText[this.p2Col];
        g.drawString(p2ScrStr, this.nWidth - (this.nWidth / 20|0) - fm.stringWidth(p2ScrStr), k);
    }

    public checkScored() : boolean {
        if(this.floaty < -200) {
        }
        this.floaty += 100;
        if(this.floaty > 200) {
        }
        this.floaty -= 100;
        this.p1YV += this.floaty;
        this.p2YV += this.floaty;
        if(this.ballY >= 200 || this.ballX >= 40 && this.ballX <= 960) {
            return false;
        } else {
            this.nScoreX = this.ballX;
            this.fPlayOn = true;
            this.playOnTicks = 10;
            return true;
        }
    }

    public async run() {
        this.worldCupRound = 0;
        do {
            this.initStuff();
            this.replayPos = this.replayStart = 0;
            this.scoringRun = 0;
            this.fP1Touched = this.fP2Touched = false;
            this.gameTime = 0;
            this.startTime = System.currentTimeMillis();
            this.fEndGame = false;
            this.fCanChangeCol = false;
            this.mousePressed = false;
            this.gameTime = Math.floor(<number>this.gameLength);
            this.fInPlay = true;
            this.fEndGame = false;
            let l : string;
            if(this.worldCup) {
                this.paint(this.getGraphics());
                do {
                    this.p2Col = (<number>(Math.random() * <number>this.slimaryCols.length / 4.0)|0) + (this.worldCupRound * this.slimaryCols.length / 4|0);
                } while((this.p1Col === this.p2Col));
                l = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
                switch((this.worldCupRound)) {
                case 0:
                    this.promptBox("Qualifying Round", l);
                    this.gameLength = 30000;
                    break;
                case 1:
                    this.promptBox("Quarter Finals", l);
                    this.gameLength = 120000;
                    break;
                case 2:
                    this.promptBox("Semi-Finals", l);
                    this.gameLength = 120000;
                    break;
                case 3:
                    this.promptBox("World Cup Final", l);
                    this.gameLength = 300000;
                }
                try {
                    Thread.sleep$long(4000);
                } catch(var5) {
                };
                this.repaint();
                this.flip();
            }
            while((this.gameTime > 0 || this.worldCup && this.worldCupRound > 0 && this.p1Score === this.p2Score)) {
                this.gameTime = this.startTime + Math.floor(<number>this.gameLength) - System.currentTimeMillis();
                if(this.gameTime < 0) {
                    this.gameTime = 0;
                }
                if(this.worldCup && !this.fExtraTime && this.gameTime <= 0 && this.worldCupRound > 0 && this.p1Score === this.p2Score) {
                    l = this.p1Score !== 0?" " + this.p1Score:" nil";
                    this.promptBox("The score is " + this.slimeColText[this.p1Col] + l + ", " + this.slimeColText[this.p2Col] + l + ".", "And the game goes into extra time...");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var10) {
                    };
                    this.repaint();
                    this.flip();
                    this.startTime += 30000;
                    this.gameTime += 30000;
                    this.fExtraTime = true;
                } else if(this.gameTime <= 0 && this.fExtraTime && !this.fGoldenGoal && this.p1Score === this.p2Score) {
                    this.fGoldenGoal = true;
                    l = this.p1Score !== 0?" " + this.p1Score:" nil";
                    this.promptBox("The score is " + this.slimeColText[this.p1Col] + l + ", " + this.slimeColText[this.p2Col] + l + ", and the game goes into Golden Goal.", "The next player to score will win the match!");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var9) {
                    };
                    this.repaint();
                    this.flip();
                }
                this.SaveReplayData();
                this.p1OldX = this.p1X;
                this.p1OldY = this.p1Y;
                this.p2OldX = this.p2X;
                this.p2OldY = this.p2Y;
                this.ballOldX = this.ballX;
                this.ballOldY = this.ballY;
                this.MoveSlimers();
                this.DrawSlimers();
                this.DrawGoals();
                this.DrawStatus();
                this.flip();
                if(this.p1X < 150) {
                    ++this.p1TouchingGoal;
                } else {
                    this.p1TouchingGoal = 0;
                }
                if(this.p2X > 850) {
                    ++this.p2TouchingGoal;
                } else {
                    this.p2TouchingGoal = 0;
                }
                if(this.fPlayOn) {
                    --this.playOnTicks;
                } else {
                    this.fPlayOn = this.checkScored();
                }
                if(this.playOnTicks === 0 || this.p1TouchingGoal > 60 || this.p2TouchingGoal > 60) {
                    let var11 : number = System.currentTimeMillis();
                    if(this.p1TouchingGoal > 60) {
                        ++this.p2Score;
                        this.promptMsg = this.slimeColText[this.p1Col] + " pinged for goal hanging!";
                    } else if(this.p2TouchingGoal > 60) {
                        ++this.p1Score;
                        this.promptMsg = this.slimeColText[this.p2Col] + " pinged for goal hanging!";
                    } else if(this.nScoreX < 500) {
                        ++this.p2Score;
                        this.promptMsg = this.slimeColText[this.p2Col] + " Scores!";
                    } else {
                        ++this.p1Score;
                        this.promptMsg = this.slimeColText[this.p1Col] + " Scores!";
                    }
                    this.drawPrompt();
                    this.drawPrompt$java_lang_String$int("Click mouse for replay...", 1);
                    this.flip();
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
                    this.promptMsg = "";
                    this.drawPrompt();
                    this.playOnTicks = 10;
                    this.fPlayOn = false;
                    this.startTime += System.currentTimeMillis() - var11;
                    this.ballX = 490 + (<number>(Math.random() * 20.0)|0);
                    this.ballY = 190 + (<number>(Math.random() * 20.0)|0);
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p1YV = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p2YV = 0;
                    this.replayStart = this.replayPos = 0;
                    this.repaint();
                }
                if(this.gameThread != null) {
                    try {
                        if(this.fPlayOn) {
                            Thread.sleep$long(120);
                        } else {
                            Thread.sleep$long(20);
                        }
                    } catch(var7) {
                    };
                }
            };
            this.fEndGame = true;
            if(this.fPlayOn) {
                if(this.nScoreX < 500) {
                    ++this.p2Score;
                    this.promptMsg = this.slimeColText[this.p2Col] + " scores at the final whistle!";
                } else {
                    ++this.p1Score;
                    this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
                }
                this.drawPrompt();
            } else {
                this.drawPrompt$java_lang_String$int("And that\'s the final whistle!", 0);
            }
            if(this.worldCup) {
                if(this.p1Score === this.p2Score) {
                    this.drawPrompt$java_lang_String$int("It\'s a draw at full time, here at Slime Stadium!", 1);
                    this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
                    this.worldCup = false;
                    this.flip();
                } else if(this.p1Score >= this.p2Score) {
                    switch((this.worldCupRound)) {
                    case 0:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " qualifies for the world cup!", 1);
                        break;
                    case 1:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                        break;
                    case 2:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                        break;
                    case 3:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " wins the WORLD CUP!!!!!", 1);
                    }
                    if(this.worldCupRound === 3) {
                        this.worldCup = false;
                        this.promptBox("You win the world cup!!!", "Congratulations!");
                    } else {
                        ++this.worldCupRound;
                    }
                } else {
                    switch((this.worldCupRound)) {
                    case 0:
                    case 1:
                        this.promptBox("You have been eliminated.", "Goodbye.");
                        break;
                    case 2:
                        this.promptBox("You have been knocked out of the semifinals.", "You played well.");
                        break;
                    case 3:
                        this.promptBox("You came second.", "Are you satisfied with that?");
                    }
                    this.worldCup = false;
                }
            } else if(this.p1Score === this.p2Score) {
                this.drawPrompt$java_lang_String$int("It\'s a draw at full time, here at Slime Stadium!", 1);
            } else if(this.p1Score < this.p2Score) {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p2Col] + " (" + this.p2Score + ")    def. " + this.slimeColText[this.p1Col] + " (" + this.p1Score + ")", 1);
            } else {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " (" + this.p1Score + ")    def. " + this.slimeColText[this.p2Col] + " (" + this.p2Score + ")", 1);
            }
            this.flip();
            try {
                Thread.sleep$long(5000);
            } catch(var6) {
            };
            this.initStuff();
        } while((this.worldCup));
        this.fCanChangeCol = true;
        this.fInPlay = false;
        this.repaint();
    }

    public init() {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.fInPlay = this.fEndGame = false;
        this.fCanChangeCol = true;
        this.initStuff();
        this.promptMsg = "Click on an option to play...";
        this.backBuffer = this.createImage(this.nWidth, this.nHeight);
        this.screen = this.getGraphics();
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
    }

    /*public*/ toggleBuffering() {
        if(this.doubleBuffered = !this.doubleBuffered) {
            this.screen = this.backBuffer.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        } else {
            this.screen = this.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        }
        this.repaint();
    }

    /*public*/ DoReplay() {
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let i : number = fontmetrics.stringWidth("Replay...");
        let j : number = fontmetrics.getHeight();
        let k : number = (this.nWidth / 2|0) - (i / 2|0);
        let l : number = (this.nHeight / 2|0) - j;
        this.promptMsg = "Click the mouse to continue...";
        this.mousePressed = false;
        let i1 : number = this.replayPos - 1;
        while((!this.mousePressed)) {
            ++i1;
            if(i1 >= 200) {
                i1 = 0;
            }
            if(i1 === this.replayPos) {
                try {
                    Thread.sleep$long(1000);
                } catch(var9) {
                };
                i1 = this.replayStart;
                this.paint(this.getGraphics());
            }
            this.ReplayFrame(i1, k, l, i, j, false);
            this.flip();
        };
        this.promptMsg = "";
        this.paint(this.getGraphics());
    }

    /*public*/ flip() {
        if(this.doubleBuffered) {
            this.getGraphics().drawImage(this.backBuffer, 0, 0, <ImageObserver>null);
        }
    }

    /*public*/ getBallBounceX() : number {
        let t : number = this.ballVY + (<number>Math.sqrt(<number>(this.ballVY * this.ballVY + 2 * this.ballY))|0);
        let ballBounceX : number = this.ballX + t * this.ballVX;
        if(ballBounceX < 0) {
            ballBounceX = -ballBounceX;
        }
        if(ballBounceX > 1000) {
            ballBounceX = 1000 - ballBounceX;
        }
        return ballBounceX;
    }

    /*public*/ getBallMaxY() : number {
        return this.ballVY < 0?this.ballY:this.ballY + (this.ballVY * this.ballVY / 2|0);
    }

    /*public*/ controlP2v0() {
        this.p2XV = 0;
        if(this.ballX > this.p2X + 5 && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.ballX > this.p2X - 10) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX + 30 > this.p2X && this.p2YV === 0) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        if(this.ballX + 50 < this.p2X) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        if(this.ballX > this.p2X + 50 && this.p2YV === 0 && this.ballY > 10 && this.ballY < 150) {
            this.p2YV = this.JUMPVEL;
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / this.SLIMEVEL|0)) {
            this.p2XV = -this.SLIMEVEL;
        }
    }

    /*public*/ controlP2v1() {
        this.p2XV = 0;
        let bounceX : number = this.getBallBounceX();
        let ballMaxY : number = this.getBallMaxY();
        if(this.ballVY >= 1) {
            let var10000 : number = this.ballVY;
        } else {
            let var4 : boolean = true;
        }
        if(bounceX > 900) {
            this.p2XV = this.SLIMEVEL;
        }
        if(bounceX + 20 < this.p2X) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        if(this.ballX > this.p2X - 10) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX + 30 > this.p2X && this.p2YV === 0) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        if(bounceX > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = this.SLIMEVEL;
            }
            if(this.ballX > 800 && bounceX > 950 && this.p2YV === 0 && ballMaxY > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(ballMaxY < 110) {
                this.p2YV = 0;
            }
            if(this.ballX < this.p2X - 400) {
                this.p2YV = 0;
            }
            if(this.ballY < 80) {
                this.p2YV = 0;
            }
            if(this.ballX < 900 && this.p2X > 900) {
                this.p2YV = 0;
            }
            if(this.p2X < 150) {
                this.p2YV = 0;
            }
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / this.SLIMEVEL|0)) {
            this.p2XV = -this.SLIMEVEL;
        }
    }

    /*public*/ controlP2v2() {
        let bounceX : number = this.getBallBounceX();
        let ballMaxY : number = this.getBallMaxY();
        if(this.ballVY >= 1) {
            let var10000 : number = this.ballVY;
        } else {
            let var4 : boolean = true;
        }
        if(this.p2X < 790) {
            this.p2XV = this.SLIMEVEL;
        } else if(this.p2X > 830) {
            this.p2XV = -this.SLIMEVEL;
        } else {
            this.p2XV = 0;
        }
        if(bounceX > 900) {
            this.p2XV = this.SLIMEVEL;
        }
        if(bounceX + 20 < this.p2X) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        if(this.ballX > this.p2X - 10) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX + 30 > this.p2X && this.p2YV === 0) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        if(bounceX > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = this.SLIMEVEL;
            }
            if(this.ballX > 800 && bounceX > 950 && this.p2YV === 0 && ballMaxY > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(ballMaxY < 110) {
                this.p2YV = 0;
            }
            if(this.ballX < this.p2X - 400) {
                this.p2YV = 0;
            }
            if(this.ballY < 80) {
                this.p2YV = 0;
            }
            if(this.ballX < 900 && this.p2X > 900) {
                this.p2YV = 0;
            }
        }
        if(this.p2YV === 0 && this.p2X < 400 && bounceX > 500 && ballMaxY > 50) {
            this.p2YV = this.JUMPVEL;
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / this.SLIMEVEL|0)) {
            this.p2XV = -this.SLIMEVEL;
        }
    }

    /*public*/ controlP2v3() {
        let SLIMEVEL : number = (this.SLIMEVEL * 4 / 3|0);
        let bounceX : number = this.getBallBounceX();
        let ballMaxY : number = this.getBallMaxY();
        if(this.ballVY >= 1) {
            let var10000 : number = this.ballVY;
        } else {
            let var5 : boolean = true;
        }
        if(this.p2X < 790) {
            this.p2XV = SLIMEVEL;
        } else if(this.p2X > 830) {
            this.p2XV = -SLIMEVEL;
        } else {
            this.p2XV = 0;
        }
        if(bounceX > 900) {
            this.p2XV = SLIMEVEL;
        }
        if(bounceX + 20 < this.p2X) {
            this.fP2Sticky = false;
            this.p2XV = -SLIMEVEL;
        }
        if(this.ballX > this.p2X - 10) {
            this.p2XV = SLIMEVEL;
        }
        if(this.ballX + 30 > this.p2X && this.p2YV === 0) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        if(bounceX > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = SLIMEVEL;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = SLIMEVEL;
        }
        if(this.p2Score >= this.p1Score && bounceX < 200 && this.p2X > this.p1X || bounceX < this.p1X + 50 && bounceX > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = SLIMEVEL;
            }
            if(this.ballX > 800 && bounceX > 950 && this.p2YV === 0 && ballMaxY > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(ballMaxY < 110) {
                this.p2YV = 0;
            }
            if(this.ballX < this.p2X - 400) {
                this.p2YV = 0;
            }
            if(this.ballY < 80) {
                this.p2YV = 0;
            }
            if(this.ballX < 900 && this.p2X > 900) {
                this.p2YV = 0;
            }
            if(this.p2XV > 0 && ballMaxY > 200 && bounceX > this.p2X + 300) {
                this.p2YV = 0;
            }
        }
        if(this.p2YV === 0 && this.p2X < 400 && bounceX > this.p2X + 400 && ballMaxY > 50) {
            this.p2YV = this.JUMPVEL;
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / SLIMEVEL|0)) {
            this.p2XV = -SLIMEVEL;
        }
    }

    /*public*/ method_rn_SpaceSlime_p_1(s : string) {
        System.out.println$java_lang_Object(s);
    }
}
SpaceSlime["__class"] = "SpaceSlime";
SpaceSlime["__interfaces"] = ["Runnable"];



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