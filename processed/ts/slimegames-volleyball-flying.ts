import { Applet, Runnable, Color, Graphics, Thread, Font, FontMetrics, Event, System, BufferedImage, Image, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Slime2P extends Applet implements Runnable {
    public recommended_width = 700;
    public recommended_height = 350;
    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ topScore : number = 10;

    /*public*/ nScore : number;

    /*public*/ p1X : number;

    /*public*/ p2X : number;

    /*public*/ p1Y : number;

    /*public*/ p2Y : number;

    /*public*/ p1Col : number = 0;

    /*public*/ p2Col : number = 1;

    /*public*/ slimeColours : Color[];

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

    /*public*/ fInPlay : boolean;

    /*public*/ mousePressed : boolean;

    /*public*/ fEndGame : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ currTime : number;

    /*public*/ elapsTime : number;

    /*public*/ minute : number;

    /*public*/ sec : number;

    /*public*/ msec : number;

    public init() {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.nScore = 5;
        this.fInPlay = this.fEndGame = false;
        this.promptMsg = "Click the mouse to play...";
        this.screen = this.getGraphics();
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
    }

    public paint(dc : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        dc.setColor(Color.fromString("blue"));
        dc.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        dc.setColor(Color.fromString("gray"));
        dc.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        dc.setColor(Color.fromString("white"));
        dc.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        this.drawScores();
        this.drawPrompt();
        if(!this.fInPlay) {
            let fm : FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString("Slime Volleyball!", (this.nWidth / 2|0) - (fm.stringWidth("Slime Volleyball!") / 2|0), (this.nHeight / 2|0) - fm.getHeight());
            dc.setColor(Color.fromString("white"));
            fm = dc.getFontMetrics();
            dc.drawString("Written by ZAIN0", (this.nWidth / 2|0) - (fm.stringWidth("Written by ZAIN0") / 2|0), (this.nHeight / 2|0) + fm.getHeight() * 2);
        }
    }

    /*public*/ drawScores() {
        let g : Graphics = this.screen;
        let nDiam : number = (this.nHeight / 20|0);
        g.setColor(Color.fromString("blue"));
        g.fillRect(0, 0, this.nWidth, nDiam + 22);
        let nX : number;
        for(let i : number = 0; i < this.nScore; ++i) {
            nX = ((i + 1) * this.nWidth / 20|0);
            g.setColor(this.slimeColours[this.p1Col]);
            g.fillOval(nX, 20, nDiam, nDiam);
            g.setColor(Color.fromString("white"));
            g.drawOval(nX, 20, nDiam, nDiam);
        };
        for(let i1 : number = 0; i1 < 10 - this.nScore; ++i1) {
            nX = this.nWidth - ((i1 + 1) * this.nWidth / 20|0) - nDiam;
            g.setColor(this.slimeColours[this.p2Col]);
            g.fillOval(nX, 20, nDiam, nDiam);
            g.setColor(Color.fromString("white"));
            g.drawOval(nX, 20, nDiam, nDiam);
        };
    }

    public drawPrompt() {
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 6, this.nWidth, (this.nHeight / 5|0) - 10);
        let fm : FontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("lightGray"));
        this.screen.drawString(this.promptMsg, ((this.nWidth - fm.stringWidth(this.promptMsg)) / 2|0), (this.nHeight * 4 / 5|0) + fm.getHeight() + 10);
    }

    public async handleEvent(e : Event) : Promise<boolean> {
        switch((e.id)) {
        case 401:
            if(!this.fEndGame) {
                switch((e.key)) {
                case 65:
                case 97:
                    this.p1XV = -8;
                    break;
                case 68:
                case 100:
                    this.p1XV = 8;
                    break;
                case 73:
                case 105:
                    this.p2YV = 31;
                    break;
                case 74:
                case 106:
                    this.p2XV = -8;
                    break;
                case 75:
                case 107:
                    this.p2Col = this.p2Col === 5?0:this.p2Col + 1;
                    if(this.p2Col === this.p1Col) {
                        if(this.p2Col === 5) {
                            this.p2Col = 0;
                        } else {
                            ++this.p2Col;
                        }
                    }
                    this.drawScores();
                    break;
                case 76:
                case 108:
                    this.p2XV = 8;
                    break;
                case 83:
                case 115:
                    this.p1Col = this.p1Col === 5?0:this.p1Col + 1;
                    if(this.p1Col === this.p2Col) {
                        if(this.p1Col === 5) {
                            this.p1Col = 0;
                        } else {
                            ++this.p1Col;
                        }
                    }
                    this.drawScores();
                    break;
                case 87:
                case 119:
                    this.p1YV = 31;
                }
            }
            break;
        case 402:
            switch((e.key)) {
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
                if(this.p2XV < 0) {
                    this.p2XV = 0;
                }
                return false;
            case 76:
            case 108:
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
            this.showStatus("Slime Volleyball 2-Player, by Zaino");
        }
        return false;
    }

    public async run() {
        this.currTime = System.currentTimeMillis();
        while((this.nScore !== 0 && this.nScore !== 10 && this.gameThread != null)) {
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.MoveSlimers();
            this.DrawSlimers();
            this.drawTime();
            this.drawScores();
            if(this.ballY < 35) {
                this.nScore += this.ballX > 500?1:-1;
                this.promptMsg = this.ballX > 500?"Red ":"Green ";
                if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(this.promptMsg,"Red "))) {
                    switch((this.p1Col)) {
                    case 0:
                        this.promptMsg = "Big Red Slime ";
                        break;
                    case 1:
                        this.promptMsg = "Magic Green Slime ";
                        break;
                    case 2:
                        this.promptMsg = "Golden Boy ";
                        break;
                    case 3:
                        this.promptMsg = "The Great White Slime ";
                        break;
                    case 4:
                        this.promptMsg = "Blackie ";
                        break;
                    case 5:
                        this.promptMsg = "Invisible Blue Slime ";
                    }
                } else {
                    switch((this.p2Col)) {
                    case 0:
                        this.promptMsg = "Big Red Slime ";
                        break;
                    case 1:
                        this.promptMsg = "Magic Green Slime ";
                        break;
                    case 2:
                        this.promptMsg = "Golden Boy ";
                        break;
                    case 3:
                        this.promptMsg = "The Great White Slime ";
                        break;
                    case 4:
                        this.promptMsg = "Blackie ";
                        break;
                    case 5:
                        this.promptMsg = "Invisible Blue Slime ";
                    }
                }
                switch((this.nScore)) {
                case 0:
                case 10:
                    this.promptMsg = this.promptMsg + "Wins!!!";
                    break;
                case 4:
                    this.promptMsg = this.promptMsg + (this.ballX < 500?"takes the lead!!":"Scores!");
                    break;
                case 5:
                    this.promptMsg = this.promptMsg + "Equalizes!";
                    break;
                case 6:
                    this.promptMsg = this.promptMsg + (this.ballX > 500?"takes the lead!!":"Scores!");
                    break;
                default:
                    this.promptMsg = this.promptMsg + "Scores!";
                }
                this.drawPrompt();
                if(this.gameThread != null) {
                    try {
                        Thread.sleep$long(2000);
                    } catch(var2) {
                    };
                }
                this.promptMsg = "";
                this.drawPrompt();
                if(this.nScore !== 0 && this.nScore !== 10) {
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p1XV = 0;
                    this.p1YV = 0;
                    this.p2XV = 0;
                    this.p2YV = 0;
                    this.ballX = this.ballX < 500?800:200;
                    this.ballY = 400;
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.repaint();
                }
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var1) {
                };
            }
        };
        this.fEndGame = true;
        this.DoFatality();
        this.fInPlay = false;
        this.promptMsg = "Click the mouse to play...";
        this.repaint();
    }

    /*public*/ MoveSlimers() {
        this.p1X += this.p1XV;
        if(this.p1X > 950) {
            this.p1X = 950;
        }
        if(this.p1X < 50) {
            this.p1X = 50;
        }
        if(this.p1X > 445 && this.p1X < 555 && this.p1Y < 110) {
            if(this.p1XV > 0) {
                this.p1XV = 0;
                this.p1X = 445;
            } else {
                this.p1XV = 0;
                this.p1X = 555;
            }
        } else if(this.p1X > 445 && this.p1X < 555 && this.p1Y > 110 && this.p1Y < 120) {
            this.p1YV = this.p1YV < 0?0:this.p1YV;
            this.p1Y = 120;
        }
        if(this.p1Y > 1000) {
            this.p1Y = 1000;
            this.p1YV = -this.p1YV;
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= 3;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            } else if(this.p1X > 450 && this.p1X < 550 && this.p1Y > 110 && this.p1Y < 130 && this.p1YV < 0) {
                this.p1YV = -this.p1YV;
                this.p1Y = 130;
            }
        }
        this.p2X += this.p2XV;
        if(this.p2X > 950) {
            this.p2X = 950;
        }
        if(this.p2X < 50) {
            this.p2X = 50;
        }
        if(this.p2X > 445 && this.p2X < 555 && this.p2Y < 110) {
            if(this.p2XV > 0) {
                this.p2XV = 0;
                this.p2X = 445;
            } else {
                this.p2XV = 0;
                this.p2X = 555;
            }
        } else if(this.p2X > 445 && this.p2X < 555 && this.p2Y > 110 && this.p2Y < 120) {
            this.p2YV = this.p2YV < 0?0:this.p2YV;
            this.p2Y = 120;
        }
        if(this.p2Y > 1000) {
            this.p2Y = 1000;
            this.p2YV = -this.p2YV;
        }
        if(this.p2YV !== 0) {
            this.p2Y += this.p2YV -= 3;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            } else if(this.p2X > 450 && this.p2X < 550 && this.p2Y > 110 && this.p2Y < 130 && this.p2YV < 0) {
                this.p2YV = -this.p2YV;
                this.p2Y = 130;
            }
        }
    }

    /*public*/ DrawSlimers() {
        let nW : number = (this.nWidth / 10|0);
        let nH : number = (this.nHeight / 10|0);
        let nEW : number = (this.nWidth / 50|0);
        let nEH : number = (this.nHeight / 25|0);
        let bX : number = (this.ballX * this.nWidth / 1000|0);
        let bY : number = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        let nX : number = (this.p1OldX * this.nWidth / 1000|0) - (nW / 2|0);
        let nY : number = (7 * this.nHeight / 10|0) - (this.p1OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(nX, nY, nW, nH);
        nX = (this.p2OldX * this.nWidth / 1000|0) - (nW / 2|0);
        nY = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(nX, nY, nW, nH);
        this.MoveBall();
        nX = (this.p1X * this.nWidth / 1000|0) - (nW / 2|0);
        nY = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.slimeColours[this.p1Col]);
        this.screen.fillArc(nX, nY, nW, 2 * nH, 0, 180);
        this.screen.setColor(Color.fromString("white"));
        let flyingV : number;
        if(this.p1YV >= 0) {
            this.screen.fillArc(nX, nY, (5 * nW / 8|0), (nH * this.p1YV / 31|0), 0, -150);
        } else {
            flyingV = Math.abs(this.p1YV) > 31?31:Math.abs(this.p1YV);
            this.screen.fillArc(nX, nY, (5 * nW / 8|0), (nH * flyingV / 31|0), 0, 150);
        }
        let ex : number = this.p1X + 38;
        let ey : number = this.p1Y - 60;
        nX = (ex * this.nWidth / 1000|0);
        nY = (7 * this.nHeight / 10|0) - (ey * this.nHeight / 1000|0);
        let dx : number = nX - bX;
        let dy : number = nY - bY;
        let rad : number = (<number>Math.sqrt(<number>(dx * dx + dy * dy))|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(nX - nEW, nY - nEH, nEW, nEH);
        if(rad > 0) {
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillOval(nX - (4 * dx / rad|0) - (3 * nEW / 4|0), nY - (4 * dy / rad|0) - (3 * nEH / 4|0), (nEW / 2|0), (nEH / 2|0));
        }
        nX = (this.p2X * this.nWidth / 1000|0) - (nW / 2|0);
        nY = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(this.slimeColours[this.p2Col]);
        this.screen.fillArc(nX, nY, nW, 2 * nH, 0, 180);
        this.screen.setColor(Color.fromString("white"));
        if(this.p2YV >= 0) {
            this.screen.fillArc(nX + (3 * nW / 8|0), nY, (5 * nW / 8|0), (nH * this.p2YV / 31|0), -30, -150);
        } else {
            flyingV = Math.abs(this.p2YV) > 31?31:Math.abs(this.p2YV);
            this.screen.fillArc(nX + (3 * nW / 8|0), nY, (5 * nW / 8|0), (nH * flyingV / 31|0), 30, 150);
        }
        ex = this.p2X - 18;
        ey = this.p2Y - 60;
        nX = (ex * this.nWidth / 1000|0);
        nY = (7 * this.nHeight / 10|0) - (ey * this.nHeight / 1000|0);
        dx = nX - bX;
        dy = nY - bY;
        rad = (<number>Math.sqrt(<number>(dx * dx + dy * dy))|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(nX - nEW, nY - nEH, nEW, nEH);
        if(rad > 0) {
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillOval(nX - (4 * dx / rad|0) - (3 * nEW / 4|0), nY - (4 * dy / rad|0) - (3 * nEH / 4|0), (nEW / 2|0), (nEH / 2|0));
        }
        let i : number;
        if(this.nScore > 8) {
            nX = (this.p1X * this.nWidth / 1000|0);
            nY = (7 * this.nHeight / 10|0) - ((this.p1Y - 40) * this.nHeight / 1000|0);
            nW = (this.nWidth / 20|0);
            nH = (this.nHeight / 20|0);
            for(i = 0; i < 3; ++i) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(nX, nY + i, nW, nH, -30, -150);
            };
        } else if(this.nScore < 2) {
            nW = (this.nWidth / 20|0);
            nH = (this.nHeight / 20|0);
            nX = (this.p2X * this.nWidth / 1000|0) - nW;
            nY = (7 * this.nHeight / 10|0) - ((this.p2Y - 40) * this.nHeight / 1000|0);
            for(i = 0; i < 3; ++i) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(nX, nY + i, nW, nH, -10, -150);
            };
        }
    }

    /*public*/ MoveBall() {
        let nW : number = (30 * this.nHeight / 1000|0);
        let nX : number = (this.ballOldX * this.nWidth / 1000|0);
        let nY : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillOval(nX - nW, nY - nW, nW * 2, nW * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(!this.fEndGame) {
            let dx : number = (this.ballX - this.p1X) * 2;
            let dy : number = this.ballY - this.p1Y;
            let radius_sq : number = dx * dx + dy * dy;
            let dVX : number = this.ballVX - this.p1XV;
            let dVY : number = this.ballVY - this.p1YV;
            let rad : number;
            let dot : number;
            if(dy > 0 && radius_sq < 15625 && radius_sq > 25) {
                rad = (<number>Math.sqrt(<number>radius_sq)|0);
                dot = ((dx * dVX + dy * dVY) / rad|0);
                this.ballX = this.p1X + (dx * 63 / rad|0);
                this.ballY = this.p1Y + (dy * 125 / rad|0);
                if(dot <= 0) {
                    this.ballVX += this.p1XV - (2 * dx * dot / rad|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p1YV - (2 * dy * dot / rad|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
            }
            dx = (this.ballX - this.p2X) * 2;
            dy = this.ballY - this.p2Y;
            radius_sq = dx * dx + dy * dy;
            dVX = this.ballVX - this.p2XV;
            dVY = this.ballVY - this.p2YV;
            if(dy > 0 && radius_sq < 15625 && radius_sq > 25) {
                rad = (<number>Math.sqrt(<number>radius_sq)|0);
                dot = ((dx * dVX + dy * dVY) / rad|0);
                this.ballX = this.p2X + (dx * 63 / rad|0);
                this.ballY = this.p2Y + (dy * 125 / rad|0);
                if(dot <= 0) {
                    this.ballVX += this.p2XV - (2 * dx * dot / rad|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p2YV - (2 * dy * dot / rad|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
            }
            if(this.ballX < 15) {
                this.ballX = 15;
                this.ballVX = -this.ballVX;
            }
            if(this.ballX > 985) {
                this.ballX = 985;
                this.ballVX = -this.ballVX;
            }
            if(this.ballY > 985) {
                this.ballY = 985;
                this.ballVY = -this.ballVY;
            }
            if(this.ballX > 480 && this.ballX < 520 && this.ballY < 140) {
                if(this.ballVY < 0 && this.ballY > 130) {
                    this.ballVY *= -1;
                    this.ballY = 130;
                } else if(this.ballX < 500) {
                    this.ballX = 480;
                    this.ballVX = this.ballVX < 0?this.ballVX:-this.ballVX;
                } else {
                    this.ballX = 520;
                    this.ballVX = this.ballVX > 0?this.ballVX:-this.ballVX;
                }
            }
        }
        nX = (this.ballX * this.nWidth / 1000|0);
        nY = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(nX - nW, nY - nW, nW * 2, nW * 2);
    }

    public drawTime() {
        let fm : FontMetrics = this.screen.getFontMetrics();
        this.msec = this.minute = this.sec = 0;
        this.elapsTime = System.currentTimeMillis() - this.currTime;
        this.sec = Math.floor(this.elapsTime / 1000);
        this.msec = this.elapsTime % 1000;
        this.minute = Math.floor(this.sec / 60);
        this.sec %= 60;
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0), fm.stringWidth(this.minute + ":" + this.sec + ":" + this.msec), (this.nHeight / 5|0));
        this.screen.setColor(Color.fromString("black"));
        this.screen.drawString(this.minute + ":" + this.sec + ":" + this.msec, 0, (9 * this.nHeight / 10|0));
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ DoFatality() {
        this.repaint();
        this.p1XV = this.p2XV = 0;
        this.ballY = 2000;
        this.ballOldX = this.ballX;
        this.ballOldY = this.ballY;
        this.p1YV = this.p2YV = -1;
        this.p1OldX = this.p1X;
        this.p2OldX = this.p2X;
        while((this.p1YV !== 0 || this.p2YV !== 0)) {
            this.ballVY = 1;
            this.p1OldY = this.p1Y;
            this.p2OldY = this.p2Y;
            this.MoveSlimers();
            this.DrawSlimers();
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var2) {
                };
            }
        };
        for(let i : number = 0; i < 5; ++i) {
            if(this.nScore === 0) {
                this.p2YV = 31;
            } else {
                this.p1YV = 31;
            }
            while((this.p1YV !== 0 || this.p2YV !== 0)) {
                this.ballVY = 1;
                this.p1OldY = this.p1Y;
                this.p2OldY = this.p2Y;
                this.MoveSlimers();
                this.DrawSlimers();
                if(this.gameThread != null) {
                    try {
                        Thread.sleep$long(20);
                    } catch(var3) {
                    };
                }
            };
        };
    }

    public constructor() {
        super();
        this.nWidth = 0;
        this.nHeight = 0;
        this.nScore = 0;
        this.p1X = 0;
        this.p2X = 0;
        this.p1Y = 0;
        this.p2Y = 0;
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
        this.fInPlay = false;
        this.mousePressed = false;
        this.fEndGame = false;
        this.gameThread = null;
        this.currTime = 0;
        this.elapsTime = 0;
        this.minute = 0;
        this.sec = 0;
        this.msec = 0;
        this.slimeColours = [Color.fromString("red"), Color.fromString("green"), Color.fromString("yellow"), Color.fromString("white"), Color.fromString("black"), Color.fromString("blue")];
        this.currTime = 0;
        this.elapsTime = 0;
        this.minute = 0;
        this.sec = 0;
        this.msec = 0;
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