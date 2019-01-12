import { Applet, Runnable, Color, Graphics, Thread, Event, FontMetrics, System, URL, Font, BufferedImage, Image, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Slime2P extends Applet implements Runnable {
    public recommended_width = 700;
    public recommended_height = 350;
    /*public*/ SERVE : number = 0;

    /*public*/ SERVE_ALT : number;

    /*public*/ NUM_DIFFERENT_SERVES : number = 6;

    /*public*/ SERVE_STATE : number = 0;

    /*public*/ randomoffset : number = 0;

    /*public*/ Level : number = 1;

    /*public*/ currentstate : number;

    /*public*/ timesincelastjump : number = 0;

    /*public*/ timesincelastdirectionchange : number = 0;

    /*public*/ whereland : number = 0;

    /*public*/ uwhereland : number = 0;

    /*public*/ bestposition : number = 800;

    /*public*/ counter : number = 0;

    /*public*/ p1CanJump : boolean = true;

    /*public*/ p2CanJump : boolean = false;

    p1TouchCounter : number = 0;

    p2TouchCounter : number = 0;

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

    /*public*/ slimeColText : string[] = ["Big Red Slime ", "The Green Monster ", "Golden Boy ", "The Great White Slime ", "The Grass Tree\u00a9 "];

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

    /*public*/ scoringRunForSuper : number = 300;

    public async handleEvent(event : Event) : Promise<boolean> {
        switch((event.id)) {
        case 401:
        case 403:
            if(!this.fEndGame) {
                switch((event.key)) {
                case 32:
                    this.mousePressed = true;
                    break;
                case 65:
                case 74:
                case 97:
                case 106:
                case 1006:
                    this.p1XV = this.scoringRun <= -300?-16:-8;
                    break;
                case 68:
                case 76:
                case 100:
                case 108:
                case 1007:
                    this.p1XV = this.scoringRun <= -300?16:8;
                    break;
                case 73:
                case 87:
                case 105:
                case 119:
                case 1004:
                    if(this.p1Y === 0 && this.p1CanJump) {
                        this.p1YV = this.scoringRun <= -300?45:31;
                    }
                }
            }
            break;
        case 402:
        case 404:
            switch((event.key)) {
            case 65:
            case 74:
            case 97:
            case 106:
            case 1006:
                if(this.p1XV < 0) {
                    this.p1XV = 0;
                }
                return false;
            case 68:
            case 76:
            case 100:
            case 108:
            case 1007:
                if(this.p1XV > 0) {
                    this.p1XV = 0;
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
            this.showStatus("Slime Volleyball 1-Player, by Chris Coyne: www.chriscoyne.com");
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
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(i, l, k1, j2);
        i = (this.p2OldX * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(i, l, k1, j2);
        this.MoveBall();
        i = (this.p1X * this.nWidth / 1000|0) - (k1 / 2|0);
        l = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun <= -300?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
        if(!this.p1CanJump) {
            this.screen.setColor(Color.fromString("gray"));
        }
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
        this.screen.setColor(this.scoringRun >= 300?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
        if(!this.p2CanJump) {
            this.screen.setColor(Color.fromString("gray"));
        }
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
        if(this.p1TouchCounter > 3) {
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
        } else if(this.nScore > 8) {
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
            return;
        }
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

    public paint(g : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        g.setColor(Color.fromString("blue"));
        g.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        g.setColor(Color.fromString("gray"));
        g.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        g.setColor(Color.fromString("white"));
        g.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        g.setColor(Color.fromString("black"));
        g.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0) + 2, 4, (this.nHeight / 10|0) - 14);
        this.drawScores();
        this.drawPrompt();
        if(!this.fInPlay) {
            let fontmetrics : FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillRect(260, 220, 240, 25);
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString("Slime Volleyball 2004", (this.nWidth / 2|0) - (fontmetrics.stringWidth("Slime Volleyball 2004") / 2|0), (this.nHeight / 2|0) - fontmetrics.getHeight());
            g.setColor(Color.fromString("white"));
            fontmetrics = g.getFontMetrics();
            g.drawString("AI by Chris Coyne v 1.1", (this.nWidth / 2|0) - (fontmetrics.stringWidth("AI by Chris Coyne") / 2|0), (this.nHeight / 2|0) + fontmetrics.getHeight() * 2);
            g.drawString("newest version always at www.chriscoyne.com", (this.nWidth / 2|0) - (fontmetrics.stringWidth("newest version always at www.chriscoyne.com") / 2|0), (this.nHeight / 2|0) + 20 + fontmetrics.getHeight() * 2);
            g.drawString("based on 2-Player by Quin Pendragon", (this.nWidth / 2|0) - (fontmetrics.stringWidth("based on 2-Player by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + 40 + fontmetrics.getHeight() * 2);
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
            this.screen.setColor(Color.fromString("blue"));
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
            s = s + "0";
        }
        s = s + l4;
        s = s + ":";
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
        this.p1X += this.p1XV;
        if(this.p1X < 50) {
            this.p1X = 50;
        }
        if(this.p1X > 445) {
            this.p1X = 445;
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= this.scoringRun <= -300?4:2;
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
            this.p2Y += this.p2YV -= this.scoringRun >= 300?4:2;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
    }

    /*public*/ CanHitWithJump() : boolean {
        if(this.p2Y !== 0) {
            return false;
        } else {
            let bY : number = this.ballY;
            let bVY : number = this.ballVY;
            let bX : number = this.ballX;
            let bVX : number = this.ballVX;
            let pY : number = 0;
            let pVY : number = 31;
            let pX : number = this.p2X;
            let pVX : number = this.p2XV;
            while((bY > 0 && pY >= 0 && (pVY > 0 || pX < 640 && pVY > -20 + ((pX - 550) / 5|0)))) {
                --bVY;
                bY += bVY;
                bX += bVX;
                pVY -= 2;
                pY += pVY;
                if(pX > this.whereland) {
                    pX -= 8;
                } else if(pX < this.whereland) {
                    pX += 8;
                }
                if(pX < 555) {
                    pX = 555;
                }
                if(Math.abs(bX - pX) < 30 && Math.abs(bY - pY) < 35 && bY > pY) {
                    if(bVX < 0 && pX < 900 && bX > pX - 10) {
                        return false;
                    }
                    return true;
                }
            };
            return false;
        }
    }

    /*public*/ TimeTillLand(Y : number, VY : number) : number {
        let t : number;
        for(t = -1; Y > 120; ++t) {
            --VY;
            Y += VY;
        };
        return <number>t;
    }

    /*public*/ Player2_Level1_AI() {
        let g : Graphics = this.screen;
        ++this.timesincelastjump;
        ++this.timesincelastdirectionchange;
        if(this.counter % 50 === 0) {
            this.randomoffset = 0;
        }
        if(this.counter % 3 === 0) {
            let timetillland : number = this.TimeTillLand(this.ballY, this.ballVY);
            this.whereland = (<number>(<number>this.ballX + <number>this.ballVX * timetillland)|0);
            this.uwhereland = this.whereland;
            if(this.whereland < 0) {
                this.whereland = Math.abs(this.whereland);
            } else if(this.whereland > 1100) {
                this.whereland = 1980 - this.whereland;
            } else if(this.whereland > 990 && this.ballX > this.p2X) {
                this.whereland = 1980 - this.whereland;
            }
            if(Math.abs(this.ballVX) > 3) {
                this.bestposition = this.whereland + 10;
            } else {
                this.bestposition = this.whereland + 4;
            }
            if(this.whereland < 600) {
                this.bestposition += 7;
            } else if(this.whereland < 700) {
                this.bestposition += 4;
            } else if(this.whereland < 800) {
                this.bestposition += 2;
            }
            this.bestposition += this.randomoffset;
            if(this.whereland < 250) {
                this.bestposition = this.whereland + 550 - (<number>(200.0 * Math.random())|0) + (<number>(200.0 * Math.random())|0);
            } else if(this.whereland < 500) {
                this.bestposition = 650 + (<number>(100.0 * Math.random())|0) - (<number>(100.0 * Math.random())|0);
            }
        }
        if(this.counter % 500 === 0) {
            this.SERVE = (<number>(1000.0 * Math.random())|0) % this.NUM_DIFFERENT_SERVES;
            this.SERVE_ALT = (<number>(1000.0 * Math.random())|0);
        }
        if(this.SERVE === 0 && this.whereland === 800) {
            if(this.counter > 200) {
                this.counter = 0;
            }
            if(this.counter < 150) {
                this.bestposition = 800;
            }
            this.SERVE_STATE = 0;
        }
        if((this.SERVE === 1 || this.SERVE === 2) && this.SERVE_STATE === 0 && this.whereland === 800) {
            this.SERVE_STATE = 1;
            this.bestposition = 800;
        } else if((this.SERVE === 1 || this.SERVE === 2) && this.SERVE_STATE > 0) {
            this.bestposition = 800;
            if(this.SERVE_STATE === 1 && this.ballVY > 10 && this.ballY > 300 && this.whereland === 800) {
                this.SERVE_STATE = 2;
            } else if(this.SERVE_STATE === 2 && this.whereland === 800) {
                this.bestposition = 772 + 56 * (this.SERVE - 1);
            } else if(this.SERVE_STATE === 2) {
                this.bestposition = 772 + 56 * (this.SERVE - 1);
            }
            if(this.whereland < 500) {
                this.SERVE_STATE = 0;
            }
        }
        if((this.SERVE === 4 || this.SERVE === 5 || this.SERVE === 3) && this.SERVE_STATE === 0 && this.whereland === 800) {
            this.SERVE_STATE = 1;
            this.bestposition = 800;
            if(this.p2Y === 0) {
                this.SERVE_STATE = 3;
                this.p2YV = 31;
            }
        } else if((this.SERVE === 4 || this.SERVE === 5 || this.SERVE === 3) && this.SERVE_STATE > 0) {
            this.bestposition = 800;
            if(this.SERVE_STATE === 1 && this.ballVY > 1 && this.ballY > 200 && this.whereland === 800) {
                this.SERVE_STATE = 2;
            } else if(this.SERVE_STATE === 2 && this.whereland === 800) {
                if(this.p2Y === 0 && this.ballY < 290) {
                    this.p2YV = 31;
                    this.SERVE_STATE = 3;
                }
                this.bestposition = 805 + this.SERVE_ALT % 6 * 6;
            } else if(this.ballX < 700) {
                this.SERVE_STATE = 0;
            } else if(this.SERVE_STATE === 3) {
                this.bestposition = 805 + this.SERVE_ALT % 6 * 6;
                if(this.p2X > this.bestposition + 4) {
                    this.p2XV = -8;
                } else if(this.p2X < this.bestposition - 4) {
                    this.p2XV = 8;
                } else {
                    this.p2XV = 0;
                }
                if(this.ballVY < 0 && this.ballY < 550 && this.p2Y === 0) {
                    this.p2YV = 31;
                }
            }
        }
        if(this.whereland === this.uwhereland && this.whereland !== 800 && this.SERVE_STATE === 0) {
            if(this.whereland > 480 && this.CanHitWithJump()) {
                this.p2YV = 31;
                this.p2XV = 0;
                this.timesincelastjump = 0;
            }
        } else if(this.whereland - this.p2X > 50 && this.whereland !== 800 && this.SERVE_STATE === 0 && this.whereland > 480 && this.CanHitWithJump()) {
            this.p2YV = 31;
            this.p2XV = 0;
            this.timesincelastjump = 0;
        }
        if(this.p2X + 3 < this.bestposition && this.timesincelastdirectionchange > 10 && this.p2Y === 0) {
            if(this.p2XV !== 8) {
                this.timesincelastdirectionchange = 0;
            }
            this.p2XV = 8;
        } else if(this.whereland > 970 && this.timesincelastdirectionchange > 10 && this.p2Y === 0) {
            if(this.p2XV !== 8) {
                this.timesincelastdirectionchange = 0;
            }
            this.p2XV = 8;
        } else if(this.p2X - 3 > this.bestposition && this.timesincelastdirectionchange > 10 && this.p2Y === 0) {
            if(this.p2XV !== -8) {
                this.timesincelastdirectionchange = 0;
            }
            this.p2XV = -8;
        } else if(Math.abs(this.p2X - this.bestposition) < 5 && this.p2Y === 0) {
            this.p2XV = 0;
        }
        if(this.p2Y > 0 && this.SERVE_STATE === 0 && Math.abs(this.ballVX) > 3) {
            if(this.p2X < this.whereland - 5) {
                if(this.p2XV !== 8) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = 8;
            } else if(this.p2X > this.whereland + 5) {
                if(this.p2XV !== -8) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = -8;
            } else if(this.p2X < this.whereland + 4 && this.p2X > this.whereland - 4) {
                if(this.p2XV !== 0) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = 0;
            }
        } else if(this.p2Y > 0 && this.SERVE_STATE === 0) {
            if(this.p2X < this.whereland + 2 && this.timesincelastdirectionchange > 3) {
                if(this.p2XV !== 8) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = 8;
            } else if(this.p2X > this.whereland + 11 && this.timesincelastdirectionchange > 3) {
                if(this.p2XV !== -8) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = -8;
            } else if(this.p2X >= this.whereland + 2 && this.p2X <= this.whereland + 10) {
                if(this.p2XV !== 0) {
                    this.timesincelastdirectionchange = 0;
                }
                this.p2XV = 0;
            }
        }
        if(this.p2Y > 0 && this.whereland > 490 && this.timesincelastdirectionchange > 0 && Math.abs(this.ballX - this.bestposition) < 20) {
            if(this.p2XV !== 0) {
                this.timesincelastdirectionchange = 0;
            }
            this.p2XV = 0;
        }
        ++this.counter;
    }

    /*public*/ Player2_Level2_AI() {
    }

    public constructor() {
        super();
        this.SERVE_ALT = 0;
        this.currentstate = 0;
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
        this.slimeColours = [Color.fromString("red"), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), Color.fromString("black")];
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 8]);
    }

    /*public*/ MoveBall() {
        let k : number = (30 * this.nHeight / 1000|0);
        let i : number = (this.ballOldX * this.nWidth / 1000|0);
        let j : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(this.ballX >= 500) {
            this.p1CanJump = true;
            this.p1TouchCounter = 0;
        } else if(this.ballX <= 500) {
            this.p2CanJump = true;
            this.p2TouchCounter = 0;
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
                ++this.p1TouchCounter;
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
                ++this.p2TouchCounter;
            }
            if(this.ballX < 15) {
                if(!this.fP2Touched) {
                    this.p1CanJump = false;
                }
                this.ballX = 15;
                this.ballVX = -this.ballVX;
            }
            if(this.ballX > 985) {
                if(!this.fP1Touched) {
                    this.p2CanJump = false;
                }
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
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(i - k, j - k, k * 2, k * 2);
    }

    /*public*/ DrawStatus() {
        let g : Graphics = this.screen;
        let i : number = (this.nHeight / 20|0);
        g.setColor(Color.fromString("blue"));
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let j : number = (this.nWidth / 2|0) + ((this.nScore - 5) * this.nWidth / 24|0);
        let s : string = "Points Scored: " + this.nPointsScored + "   Elapsed: " + this.MakeTime(this.gameTime);
        let k : number = fontmetrics.stringWidth(s);
        g.fillRect(j - (k / 2|0) - 5, 0, k + 10, i + 22);
        g.setColor(Color.fromString("white"));
        this.screen.drawString(s, j - (k / 2|0), fontmetrics.getAscent() + 20);
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
        g.setColor(Color.fromString("blue"));
        g.fillRect(0, 0, this.nWidth, k + 22);
        let i1 : number;
        let j : number;
        for(i1 = 0; i1 < this.nScore; ++i1) {
            j = ((i1 + 1) * this.nWidth / 24|0);
            g.setColor(this.slimeColours[this.p1Col]);
            g.fillOval(j, 20, k, k);
            g.setColor(Color.fromString("white"));
            g.drawOval(j, 20, k, k);
        };
        for(i1 = 0; i1 < 10 - this.nScore; ++i1) {
            j = this.nWidth - ((i1 + 1) * this.nWidth / 24|0) - k;
            g.setColor(this.slimeColours[this.p2Col]);
            g.fillOval(j, 20, k, k);
            g.setColor(Color.fromString("white"));
            g.drawOval(j, 20, k, k);
        };
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
            if(this.Level === 1) {
                this.Player2_Level1_AI();
            } else if(this.Level === 2) {
                this.Player2_Level2_AI();
            }
            this.MoveSlimers();
            this.DrawSlimers();
            this.DrawStatus();
            if(this.ballY < 35) {
                this.p1TouchCounter = 0;
                this.p2TouchCounter = 0;
                this.p1CanJump = true;
                this.p2CanJump = true;
                this.counter = 0;
                let _ex : number = System.currentTimeMillis();
                ++this.nPointsScored;
                this.nScore += this.ballX <= 500?-1:1;
                let g : Graphics = this.screen;
                if(this.nScore === 10) {
                    let flag : FontMetrics = this.screen.getFontMetrics();
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.fillRect(160, 200, 440, 85);
                    this.screen.setColor(Color.fromString("white"));
                    this.screen.drawString("YOU WON!", (this.nWidth / 2|0) - (flag.stringWidth("YOU WON!") / 2|0), (this.nHeight / 2|0) - flag.getHeight());
                    g.setColor(Color.fromString("white"));
                    flag = g.getFontMetrics();
                    g.drawString("The game took " + this.MakeTime(this.gameTime), (this.nWidth / 2|0) - (flag.stringWidth("The Game took 5:35:45") / 2|0), (this.nHeight / 2|0) + flag.getHeight() * 2);
                    g.drawString("It was a " + this.nPointsScored + " point game!", (this.nWidth / 2|0) - (flag.stringWidth("It was a 34 points game") / 2|0), (this.nHeight / 2|0) + 20 + flag.getHeight() * 2);
                    g.drawString("To prove your victory, send this victory code:" + (73 + 3 * this.nPointsScored) + "x" + (Math.floor(this.gameTime / 2) - 1234) + " to ccoyne@post.harvard.edu", (this.nWidth / 2|0) - (flag.stringWidth("Please send to Chris Coyne with victory code sadf asdfdsaf to ccoyne@post.harvard.edu") / 2|0), (this.nHeight / 2|0) + 40 + flag.getHeight() * 2);
                    try {
                        Thread.sleep$long(15000);
                        this.getAppletContext().showDocument$URL(new URL("mailto:ccoyne@post.harvard.edu?subject=Slime 2004 1.1 Victory &body=Chris, please add my " + this.nPointsScored + " point game to the high score list; my victory code is " + (73 + 3 * this.nPointsScored) + "x" + (Math.floor(this.gameTime / 2) - 1234) + "%0d%0dMy name is ____, I am ___ years old, and I live in ______"));
                    } catch(var11) {
                        this.showStatus("Failed to connect to Email");
                    };
                    if(this.gameThread != null) {
                        try {
                            Thread.sleep$long(250000);
                        } catch(var10) {
                        };
                    }
                }
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
                    this.promptMsg = "What can I say?";
                } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) === 300) {
                    this.promptMsg = this.promptMsg + "is on fire!";
                } else if((this.ballX <= 500 || !this.fP1Touched || this.fP2Touched) && (this.ballX > 500 || this.fP1Touched || !this.fP2Touched)) {
                    if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                        this.promptMsg = this.promptMsg + "dies laughing! :P";
                    } else {
                        switch((this.nScore)) {
                        case 0:
                        case 10:
                            if(this.nPointsScored === 5) {
                                this.promptMsg = this.promptMsg + "Wins with a QUICK FIVE!!!";
                            } else if(this.scoringRun === 8) {
                                this.promptMsg = this.promptMsg + "Wins with a BIG NINE!!!";
                            } else {
                                this.promptMsg = this.promptMsg + "Wins!!!";
                            }
                            break;
                        case 1:
                        case 2:
                        case 3:
                        case 7:
                        case 8:
                        case 9:
                        default:
                            this.promptMsg = this.promptMsg + "Scores!";
                            break;
                        case 4:
                            this.promptMsg = this.promptMsg + (this.ballX >= 500?"Scores!":"takes the lead!!");
                            break;
                        case 5:
                            this.promptMsg = this.promptMsg + "Equalizes!";
                            break;
                        case 6:
                            this.promptMsg = this.promptMsg + (this.ballX <= 500?"Scores!":"takes the lead!!");
                        }
                    }
                } else {
                    this.promptMsg = this.promptMsg + "aces the serve!";
                }
                this.fCanChangeCol = false;
                let var12 : boolean = this.nScore !== 0 && this.nScore !== 10;
                let i : number = this.ballX;
                this.drawPrompt();
                if(var12) {
                    this.drawPrompt$java_lang_String$int("Click mouse for replay...", 1);
                    this.mousePressed = false;
                    if(this.gameThread != null) {
                        try {
                            Thread.sleep$long(2500);
                        } catch(var9) {
                        };
                    }
                    if(this.mousePressed) {
                        this.SaveReplayData();
                        this.DoReplay();
                    }
                } else if(this.gameThread != null) {
                    try {
                        Thread.sleep$long(2500);
                    } catch(var8) {
                    };
                }
                this.promptMsg = "";
                this.drawPrompt();
                this.fCanChangeCol = true;
                if(var12) {
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
                this.startTime += System.currentTimeMillis() - _ex;
                this.counter = 0;
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var7) {
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
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
    }

    /*public*/ DoReplay() {
        let fontmetrics : FontMetrics = this.screen.getFontMetrics();
        let i : number = fontmetrics.stringWidth("Replay...");
        let j : number = fontmetrics.getHeight();
        let k : number = (this.nWidth / 2|0) - (i / 2|0);
        let l : number = (this.nHeight / 2|0) - j;
        this.promptMsg = "Click the mouse to continue...";
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