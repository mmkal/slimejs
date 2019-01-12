import { Applet, Runnable, Color, Graphics, Thread, Image, Font, FontMetrics, ImageObserver, Event, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class SlimeCricket2 extends Applet implements Runnable {
    public recommended_width = 750;
    public recommended_height = 375;
    /*public*/ p1Diam : number = 75;

    /*public*/ p2Diam : number = 75;

    /*public*/ ballRad : number = 13;

    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ p1X : number;

    /*public*/ p1Y : number;

    /*public*/ p2X : number;

    /*public*/ p2Y : number;

    /*public*/ p3X : number;

    /*public*/ p3Y : number;

    /*public*/ p1Col : number;

    /*public*/ p2Col : number;

    /*public*/ slimeColours : Color[];

    /*public*/ slimeColours2 : Color[];

    /*public*/ slimeColText : string[];

    /*public*/ slimeColAbbr : string[];

    /*public*/ difficultyColours : Color[];

    /*public*/ difficultyText : string[];

    /*public*/ difficulty : number;

    /*public*/ p1OldX : number;

    /*public*/ p1OldY : number;

    /*public*/ p2OldX : number;

    /*public*/ p2OldY : number;

    /*public*/ p3OldY : number;

    /*public*/ p1XV : number;

    /*public*/ p1YV : number;

    /*public*/ p2XV : number;

    /*public*/ p2YV : number;

    /*public*/ p3YV : number;

    /*public*/ ballX : number;

    /*public*/ ballY : number;

    /*public*/ ballVX : number;

    /*public*/ ballVY : number;

    /*public*/ ballOldX : number;

    /*public*/ ballOldY : number;

    /*public*/ screen : Graphics;

    /*public*/ promptMsg : string;

    /*public*/ mousePressed : boolean;

    /*public*/ fCanChangeCol : boolean;

    /*public*/ fInPlay : boolean;

    /*public*/ p1Blink : number;

    /*public*/ p2Blink : number;

    /*public*/ fP1Touched : boolean;

    /*public*/ fP2Touched : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ BALL_COL : Color;

    /*public*/ COURT_COL : Color;

    /*public*/ DAY_COL : Color;

    /*public*/ NIGHT_COL : Color;

    /*public*/ SKY_COL : Color;

    /*public*/ bounces : number;

    /*public*/ fEndOfOver : boolean;

    /*public*/ fHitBackWall : boolean;

    /*public*/ p1XMin : number;

    /*public*/ p2XMin : number;

    /*public*/ p2XMax : number;

    /*public*/ ballXMax : number;

    /*public*/ p1Touches : number;

    /*public*/ ballCount : number;

    /*public*/ postPos : number;

    /*public*/ bowlingCrease : number;

    /*public*/ runningCrease : number;

    /*public*/ battingCrease : number;

    /*public*/ p1Score : number;

    /*public*/ p2Score : number;

    /*public*/ inns : number;

    /*public*/ wicketPenalty : number;

    /*public*/ fNoBall : boolean;

    /*public*/ overs : number;

    /*public*/ stillFrames : number;

    /*public*/ buffer : Image;

    /*public*/ thisBall : number;

    /*public*/ thisOver : string;

    /*public*/ p1bxb : number[];

    /*public*/ p2bxb : number[];

    /*public*/ p1Hold : boolean;

    /*public*/ ballbowled : boolean;

    /*public*/ p1next : boolean;

    /*public*/ p2next : boolean;

    /*public*/ __wait : number;

    /*public*/ p1ai : boolean;

    /*public*/ p2ai : boolean;

    /*public*/ balltype : number;

    /*public*/ shottype : number;

    /*public*/ AI_COL : number;

    /*public*/ COMM_FOUR : string[];

    /*public*/ COMM_FOURTOUCHED : string[];

    /*public*/ COMM_SIX : string[];

    /*public*/ COMM_SIXTOUCHED : string[];

    /*public*/ COMM_STUMPED : string[];

    /*public*/ COMM_RUNOUT : string[];

    /*public*/ COMM_BOWLED : string[];

    /*public*/ COMM_PLAYEDON : string[];

    /*public*/ COMM_CAUGHT : string[];

    /*public*/ COMM_CTBEHIND : string[];

    /*public*/ COMM_OUT_GENERIC : string[];

    public init() {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.buffer = this.createImage(this.nWidth, this.nHeight);
        this.fInPlay = false;
        this.fEndGame = true;
        this.fEndOfOver = false;
        this.fCanChangeCol = true;
        this.promptMsg = "Click team names to select teams, an opponent, then choose an innings length to start!";
        this.screen = this.buffer.getGraphics();
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        this.p1Col = 9;
        this.p2Col = 9;
        this.inns = 0;
    }

    public paint(var1 : Graphics) {
        let var2 : Graphics = this.buffer.getGraphics();
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        var2.setColor(this.SKY_COL);
        var2.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        var2.setColor(this.COURT_COL);
        var2.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        var2.setColor(Color.fromString("white"));
        var2.fillRect((this.nWidth * this.postPos / 1000|0) - 2, (this.nHeight * 7 / 10|0), 3, (this.nHeight / 10|0));
        var2.fillRect((this.nWidth * this.bowlingCrease / 1000|0) - 1, (this.nHeight * 4 / 5|0), 2, 5);
        var2.fillRect((this.nWidth * this.runningCrease / 1000|0) - 1, (this.nHeight * 4 / 5|0), 2, 5);
        var2.fillRect((this.nWidth * this.battingCrease / 1000|0) - 1, (this.nHeight * 4 / 5|0), 2, 5);
        this.drawPrompt();
        let var3 : FontMetrics;
        if(!this.fInPlay && this.fEndGame) {
            var3 = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString("Slime Cricket 2: World Cup Edition BETA", (this.nWidth / 2|0) - (var3.stringWidth("Slime Cricket 2: World Cup Edition BETA") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 7);
            this.screen.drawString("This is not the final version of the game!", (this.nWidth / 2|0) - (var3.stringWidth("This is not the final version of the game!") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 6);
            this.screen.setColor(this.slimeColours[this.p2Col]);
            this.screen.fillRect((this.nWidth / 4|0) - (var3.stringWidth(this.slimeColText[this.p2Col]) / 2|0) - 10, (this.nHeight / 2|0) - var3.getAscent() * 2, var3.stringWidth(this.slimeColText[this.p2Col]) + 20, var3.getAscent() * 2);
            this.screen.setColor(this.slimeColours2[this.p2Col]);
            this.screen.drawString(this.slimeColText[this.p2Col], (this.nWidth / 4|0) - (var3.stringWidth(this.slimeColText[this.p2Col]) / 2|0), (this.nHeight / 2|0) - (var3.getAscent() / 2|0));
            this.screen.setColor(this.slimeColours[this.p1Col]);
            this.screen.fillRect((this.nWidth / 2|0) - (var3.stringWidth(this.slimeColText[this.p1Col]) / 2|0) - 10, (this.nHeight / 2|0) - var3.getAscent() * 2, var3.stringWidth(this.slimeColText[this.p1Col]) + 20, var3.getAscent() * 2);
            this.screen.setColor(this.slimeColours2[this.p1Col]);
            this.screen.drawString(this.slimeColText[this.p1Col], (this.nWidth / 2|0) - (var3.stringWidth(this.slimeColText[this.p1Col]) / 2|0), (this.nHeight / 2|0) - (var3.getAscent() / 2|0));
            this.screen.setColor(this.difficultyColours[this.difficulty]);
            this.screen.fillRect((this.nWidth * 3 / 4|0) - (var3.stringWidth(this.difficultyText[this.difficulty]) / 2|0) - 10, (this.nHeight / 2|0) - var3.getAscent() * 2, var3.stringWidth(this.difficultyText[this.difficulty]) + 20, var3.getAscent() * 2);
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString(this.difficultyText[this.difficulty], (this.nWidth * 3 / 4|0) - (var3.stringWidth(this.difficultyText[this.difficulty]) / 2|0), (this.nHeight / 2|0) - (var3.getAscent() / 2|0));
            var2.setColor(Color.fromString("white"));
            this.screen.setColor(this.SKY_COL);
            for(let var4 : number = 0; var4 < 5; ++var4) {
                var2.fillRect((this.nWidth / 4|0) + (var4 * this.nWidth / 10|0) + 5, (this.nHeight * 2 / 3|0) - (var3.getAscent() * 3 / 2|0), (this.nWidth / 10|0) - 10, 2 * var3.getAscent());
                this.screen.drawString(var4 + 1 + " overs", (this.nWidth * 3 / 10|0) + (var4 * this.nWidth / 10|0) - (var3.stringWidth(var4 + 1 + " overs") / 2|0), (this.nHeight * 2 / 3|0) - var3.getAscent() * 0);
            };
            var3 = var2.getFontMetrics();
            var2.setColor(Color.fromString("white"));
            var2.drawString("Written by Wedgey and Fractoid", (this.nWidth / 2|0) - (var3.stringWidth("Written by Wedgey and Fractoid") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 6);
            var2.drawString("with input from Browny, Chucky and Damo", (this.nWidth / 2|0) - (var3.stringWidth("with input from Browny, Chucky and Damo") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 5);
            this.drawScores();
            var2.drawString("Bowling first", (this.nWidth / 4|0) - (var3.stringWidth("Bowling first") / 2|0), (this.nHeight / 2|0) - var3.getAscent() * 3);
            var2.drawString("Batting first", (this.nWidth / 2|0) - (var3.stringWidth("Batting first") / 2|0), (this.nHeight / 2|0) - var3.getAscent() * 3);
            var2.drawString("Difficulty", (this.nWidth * 3 / 4|0) - (var3.stringWidth("Difficulty") / 2|0), (this.nHeight / 2|0) - var3.getAscent() * 3);
            var2.drawString("Click on innings length to start...", (this.nWidth / 2|0) - (var3.stringWidth("Click on innings length to start...") / 2|0), (this.nHeight * 2 / 3|0) - var3.getHeight() * 2);
            this.screen.setColor(this.SKY_COL);
        } else if(!this.fInPlay && !this.fEndGame && !this.fEndOfOver) {
            var3 = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString("Change of innings", (this.nWidth / 2|0) - (var3.stringWidth("Change of innings") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 5);
            this.drawScores();
        } else if(this.fEndOfOver) {
            var3 = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            switch((this.inns)) {
            case 1:
                this.drawScores();
                this.screen.drawString("Over", (this.nWidth / 2|0) - (var3.stringWidth("Over") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 3);
                this.screen.drawString("Last over: " + this.thisOver, (this.nWidth / 2|0) - (var3.stringWidth("Last over: " + this.thisOver) / 2|0), (this.nHeight / 2|0) - var3.getHeight());
                break;
            case 2:
                this.drawScores();
                this.screen.drawString("Over", (this.nWidth / 2|0) - (var3.stringWidth("Over") / 2|0), var3.getHeight());
                this.screen.drawString("Last over: " + this.thisOver, (this.nWidth / 2|0) - (var3.stringWidth("Last over: " + this.thisOver) / 2|0), var3.getHeight() * 2);
                this.drawWorm();
                this.screen.drawString("After " + (this.ballCount / 6|0) + ((this.ballCount / 6|0) === 1?" over...":" overs..."), (this.nWidth / 2|0) - (var3.stringWidth("After " + (this.ballCount / 6|0) + ((this.ballCount / 6|0) === 1?" over...":" overs...")) / 2|0), var3.getHeight() * 4);
                this.screen.drawString(this.slimeColText[this.p2Col].toUpperCase(), (this.nWidth / 3|0), var3.getHeight() * 5);
                this.screen.drawString(/* valueOf */new String(this.p2Score).toString(), (this.nWidth * 2 / 3|0) - var3.stringWidth(/* valueOf */new String(this.p2Score).toString()), var3.getHeight() * 5);
                this.screen.drawString(this.slimeColText[this.p1Col] + " (" + this.p1Score + ")", (this.nWidth / 3|0), var3.getHeight() * 6);
                this.screen.drawString(/* valueOf */new String(this.p1bxb[this.ballCount - 1]).toString(), (this.nWidth * 2 / 3|0) - var3.stringWidth(/* valueOf */new String(this.p1bxb[this.ballCount - 1]).toString()), var3.getHeight() * 6);
            }
        } else {
            this.drawScores();
            this.drawWorm();
        }
        var1.drawImage(this.buffer, 0, 0, <ImageObserver>null);
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            if(!this.fEndGame) {
                switch((var1.key)) {
                case 32:
                    this.mousePressed = true;
                    break;
                case 65:
                case 97:
                    if(!this.p1ai) {
                        this.p1L();
                    }
                    break;
                case 68:
                case 100:
                    if(!this.p1ai) {
                        this.p1R();
                    }
                    break;
                case 69:
                case 81:
                case 101:
                case 113:
                    if(!this.p1ai) {
                        this.p3J();
                    }
                    break;
                case 73:
                case 105:
                case 1004:
                    if(!this.p2ai) {
                        this.p2J();
                    }
                    break;
                case 74:
                case 106:
                case 1006:
                    if(!this.p2ai) {
                        this.p2L();
                    }
                    break;
                case 75:
                case 107:
                case 1005:
                    this.p2next = true;
                    if(!this.fEndOfOver && this.p1next && this.p2next) {
                        this.nextBall();
                    }
                    break;
                case 76:
                case 108:
                case 1007:
                    if(!this.p2ai) {
                        this.p2R();
                    }
                    break;
                case 83:
                case 115:
                    this.p1next = true;
                    if(!this.fEndOfOver && this.p1next && this.p2next) {
                        this.nextBall();
                    }
                    break;
                case 87:
                case 119:
                    if(!this.p1ai) {
                        this.p1J();
                    }
                }
            }
            break;
        case 402:
        case 404:
            switch((var1.key)) {
            case 65:
            case 97:
                if(this.p1XV < 0 && !this.p1ai) {
                    this.p1S();
                }
                return false;
            case 68:
            case 100:
                if(this.p1XV > 0 && !this.p1ai) {
                    this.p1S();
                }
                return false;
            case 74:
            case 106:
            case 1006:
                if(this.p2XV < 0 && !this.p2ai) {
                    this.p2S();
                }
                return false;
            case 76:
            case 108:
            case 1007:
                if(this.p2XV > 0 && !this.p2ai) {
                    this.p2S();
                }
                return false;
            case 83:
            case 115:
                this.p1Hold = false;
                return false;
            default:
                return false;
            }
        case 501:
            this.mousePressed = true;
            if(this.fEndOfOver) {
                this.gameThread = new Thread(this);
                this.gameThread.start();
                this.thisOver = "";
                this.fEndOfOver = false;
                this.promptMsg = "";
                this.repaint();
            } else if(!this.fInPlay) {
                if(!this.fEndGame) {
                    this.fInPlay = true;
                    ++this.inns;
                    let var7 : number = this.p1Col;
                    this.p1Col = this.p2Col;
                    this.p2Col = var7;
                    let var8 : number = this.p1Score;
                    this.p1Score = this.p2Score;
                    this.p2Score = var8;
                    let var9 : number[] = this.p1bxb;
                    this.p1bxb = this.p2bxb;
                    this.p2bxb = var9;
                    if(Math.random() < 0.8) {
                        this.SKY_COL = this.NIGHT_COL;
                    }
                    let var6 : boolean = this.p1ai;
                    this.p1ai = this.p2ai;
                    this.p2ai = var6;
                } else {
                    let var2 : FontMetrics = this.screen.getFontMetrics();
                    if(var1.y > (this.nHeight * 2 / 3|0) - (var2.getAscent() * 3 / 2|0) && var1.y < (this.nHeight * 2 / 3|0) + (var2.getAscent() / 2|0)) {
                        for(let var3 : number = 0; var3 < 5 && !this.fInPlay; ++var3) {
                            if(var1.x > (this.nWidth / 4|0) + (var3 * this.nWidth / 10|0) + 5 && var1.x < (this.nWidth / 4|0) + ((var3 + 1) * this.nWidth / 10|0) - 5) {
                                this.fEndGame = false;
                                this.fInPlay = true;
                                this.p1ai = this.p2ai = false;
                                if(this.p1Col === 9) {
                                    this.p2ai = true;
                                    while(((this.p1Col = (<number>(Math.random() * <number>this.slimeColours.length)|0)) === this.p2Col)) {
                                    };
                                }
                                if(this.p2Col === 9) {
                                    this.p1ai = true;
                                    while(((this.p2Col = (<number>(Math.random() * <number>this.slimeColours.length)|0)) === this.p1Col)) {
                                    };
                                }
                                this.inns = 1;
                                this.p1Score = this.p2Score = 0;
                                let var4 : number = this.p1Col;
                                this.p1Col = this.p2Col;
                                this.p2Col = var4;
                                this.SKY_COL = this.DAY_COL;
                                this.overs = var3 + 1;
                                this.p1bxb = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.overs * 6);
                                this.p2bxb = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.overs * 6);
                                for(let var5 : number = 0; var5 < this.overs * 6; ++var5) {
                                    this.p1bxb[var5] = this.p2bxb[var5] = 0;
                                };
                            }
                        };
                    } else if(var1.y > (this.nHeight / 2|0) - var2.getAscent() * 2 && var1.y < (this.nHeight / 2|0)) {
                        if(var1.x > (this.nWidth / 4|0) - (var2.stringWidth(this.slimeColText[this.p2Col]) / 2|0) - 10 && var1.x < (this.nWidth / 4|0) + (var2.stringWidth(this.slimeColText[this.p2Col]) / 2|0) + 10) {
                            while((true)) {
                                this.p2Col = this.p2Col !== this.slimeColours.length - 1?this.p2Col + 1:0;
                                if(this.p1Col !== this.p2Col) {
                                    this.repaint();
                                    break;
                                }
                            };
                        } else if(var1.x > (this.nWidth / 2|0) - (var2.stringWidth(this.slimeColText[this.p1Col]) / 2|0) - 10 && var1.x < (this.nWidth / 2|0) + (var2.stringWidth(this.slimeColText[this.p1Col]) / 2|0) + 10) {
                            while((true)) {
                                this.p1Col = this.p1Col !== this.slimeColours.length - 1?this.p1Col + 1:0;
                                if(this.p1Col !== this.p2Col) {
                                    this.repaint();
                                    break;
                                }
                            };
                        } else if(var1.x > (this.nWidth * 3 / 4|0) - (var2.stringWidth(this.difficultyText[this.difficulty]) / 2|0) - 10 && var1.x < (this.nWidth * 3 / 4|0) + (var2.stringWidth(this.difficultyText[this.difficulty]) / 2|0) + 10) {
                            this.difficulty = (this.difficulty + 1) % this.difficultyText.length;
                            this.repaint();
                        }
                    }
                }
                if(this.fInPlay) {
                    this.ballCount = -1;
                    this.thisOver = "";
                    this.promptMsg = "";
                    this.thisBall = 0;
                    this.nextBall();
                    this.gameThread = new Thread(this);
                    this.gameThread.start();
                }
            }
            break;
        case 503:
            this.showStatus("Slime Cricket 2: by Wedgey: http://www.student.uwa.edu.au/~wedgey/slimec/");
        }
        return false;
    }

    /*public*/ p1L() {
        this.p1XV = -8;
    }

    /*public*/ p1R() {
        this.p1XV = 8;
    }

    /*public*/ p1J() {
        if(this.p1Y === 0) {
            this.p1YV = 31;
        }
    }

    /*public*/ p1S() {
        this.p1XV = 0;
    }

    /*public*/ p2L() {
        this.p2XV = -8;
    }

    /*public*/ p2R() {
        this.p2XV = 8;
    }

    /*public*/ p2J() {
        if(this.p2Y === 0) {
            this.p2YV = 31;
        }
    }

    /*public*/ p2S() {
        this.p2XV = 0;
    }

    /*public*/ p3J() {
        if(this.p3Y === 0) {
            this.p3YV = 31;
        }
    }

    /*public*/ nextBall() {
        this.__wait = 50;
        this.p1XMin = this.p1X = this.runningCrease - (this.p1Diam / 2|0);
        this.p2XMin = this.p2XMax = this.p2X = this.battingCrease + 20;
        this.ballVX = this.ballVY = this.p1Y = this.p2Y = this.p2XV = this.p2YV = this.p3Y = this.p3YV = this.p1XV = this.p1YV = 0;
        this.ballXMax = this.ballX = this.runningCrease - (this.p1Diam / 2|0);
        this.ballY = 400;
        this.balltype = -1;
        this.shottype = -1;
        this.p1next = this.p2next = false;
        this.ballbowled = false;
        this.fP1Touched = this.fP2Touched = false;
        this.bounces = 0;
        this.p1Touches = 0;
        if(this.fNoBall) {
            ++this.thisBall;
        }
        if(this.ballCount >= 0) {
            this.p2bxb[this.ballCount] = this.p2Score += Math.floor(<number>this.thisBall);
            if(this.fNoBall) {
                this.thisOver = this.thisOver + "N";
            }
            if(this.thisBall !== -this.wicketPenalty && this.thisBall !== -this.wicketPenalty + 1) {
                if(this.thisBall === 0) {
                    this.thisOver = this.thisOver + ".";
                } else if(!this.fNoBall || this.thisBall !== -this.wicketPenalty + 1 && this.thisBall !== 0) {
                    this.thisOver = this.thisOver + (!this.fNoBall?this.thisBall:this.thisBall - 1);
                }
            } else {
                this.thisOver = this.thisOver + "W";
            }
            this.thisOver = this.thisOver + " ";
        }
        this.thisBall = 0;
        if(!this.fNoBall) {
            ++this.ballCount;
            if(this.ballCount % 6 === 0 && this.ballCount !== 0 && this.ballCount !== this.overs * 6) {
                this.fEndOfOver = true;
                this.gameThread = null;
                this.promptMsg = "Click the mouse to continue...";
            }
        }
        this.fNoBall = false;
        this.fHitBackWall = false;
        this.stillFrames = 0;
        this.repaint();
    }

    /*public*/ getMinScore(var1 : number) : number {
        let var2 : number = 0;
        for(let var4 : number = 0; var4 < this.overs * 6; ++var4) {
            if((var1 === 1?this.p1bxb[var4]:this.p2bxb[var4]) < var2) {
                var2 = var1 === 1?this.p1bxb[var4]:this.p2bxb[var4];
            }
        };
        return var2;
    }

    /*public*/ getMaxScore(var1 : number) : number {
        let var2 : number = 0;
        for(let var4 : number = 0; var4 < this.overs * 6; ++var4) {
            if((var1 === 1?this.p1bxb[var4]:this.p2bxb[var4]) > var2) {
                var2 = var1 === 1?this.p1bxb[var4]:this.p2bxb[var4];
            }
        };
        return var2;
    }

    /*public*/ MoveSlimers() {
        if(this.p1ai) {
            if(!this.ballbowled) {
                this.bowl();
            } else {
                this.field();
            }
        }
        if(this.p2ai) {
            if(!this.fP2Touched && !this.fHitBackWall) {
                this.playball();
            } else {
                this.running();
            }
        }
        this.p1X += this.p1XV;
        if(this.p1X < (this.p1Diam / 2|0)) {
            this.p1X = (this.p1Diam / 2|0);
        }
        if(this.p1X > this.postPos - (this.p1Diam / 2|0) - 5) {
            this.p1X = this.postPos - (this.p1Diam / 2|0) - 5;
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= 2;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        if(this.ballX === 200 && this.ballVX === 200 && this.p1X < this.p1XMin) {
            this.p1XMin = this.p1X;
        }
        this.p2X += this.p2XV;
        if(this.p2X > this.postPos - (this.p2Diam / 2|0) - 5) {
            this.p2X = this.postPos - (this.p2Diam / 2|0) - 5;
        }
        if(this.p2X < (this.p2Diam / 2|0)) {
            this.p2X = (this.p2Diam / 2|0);
        }
        if(this.p2YV !== 0) {
            this.p2Y += this.p2YV -= 2;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
        if(this.p2X < this.p2XMin && this.p2Y === 0) {
            this.p2XMin = this.p2X;
        } else if(this.p2X > this.p2XMax && this.p2Y === 0) {
            this.p2XMax = this.p2X;
        }
        if(this.p2X - (this.p2Diam / 2|0) <= this.runningCrease && this.p2XMax + (this.p2Diam / 2|0) >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y === 0) {
            ++this.thisBall;
            this.p2XMin = this.p2XMax = this.p2X;
            this.drawScores();
        } else if(this.p2XMin - (this.p2Diam / 2|0) <= this.runningCrease && this.p2X + (this.p2Diam / 2|0) >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y === 0) {
            ++this.thisBall;
            this.p2XMin = this.p2XMax = this.p2X;
            this.drawScores();
        }
        if(this.p3YV !== 0) {
            this.p3Y += this.p3YV -= 2;
        }
        if(this.p3Y < 0) {
            this.p3Y = 0;
            this.p3YV = 0;
        }
    }

    /*public*/ DrawSlimers() {
        let var1 : number = (this.ballX * this.nWidth / 1000|0);
        let var2 : number = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        let var3 : number = (this.nWidth * this.p1Diam / 1000|0);
        let var4 : number = (this.nHeight * this.p1Diam / 1000|0);
        let var5 : number = (this.p1OldX * this.nWidth / 1000|0) - (var3 / 2|0);
        let var6 : number = (4 * this.nHeight / 5|0) - var4 - (this.p1OldY * this.nHeight / 1000|0);
        this.screen.setColor(this.SKY_COL);
        this.screen.fillRect(var5, var6, var3, var4);
        var3 = (this.nWidth * this.p2Diam / 1000|0);
        var4 = (this.nHeight * this.p2Diam / 1000|0);
        var5 = (this.p2OldX * this.nWidth / 1000|0) - (var3 / 2|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.fillRect(var5, var6, var3, var4);
        var3 = (this.nWidth / 10|0);
        var4 = (this.nHeight / 10|0);
        var5 = (this.p3X * this.nWidth / 1000|0) - (var3 / 2|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (this.p3OldY * this.nHeight / 1000|0);
        this.screen.fillRect(var5, var6, var3, var4);
        let var7 : number = 5;
        let var8 : number = ((this.ballRad + var7) * this.nHeight / 1000|0);
        this.screen.fillOval(var1 - var8, var2 - var8, 2 * var8, 2 * var8);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillRect((this.nWidth * this.postPos / 1000|0) - 2, (this.nHeight * 7 / 10|0), 3, (this.nHeight / 10|0));
        var3 = (this.nWidth * this.p1Diam / 1000|0);
        var4 = (this.nHeight * this.p1Diam / 1000|0);
        var5 = (this.p1X * this.nWidth / 1000|0) - (var3 / 2|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.slimeColours2[this.p1Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
        this.screen.setColor(this.slimeColours[this.p1Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 53, 74);
        this.screen.fillRect(var5 + (var3 / 5|0), var6 + (var4 / 5|0), (var3 * 3 / 5|0), (var4 * 4 / 5|0));
        let var9 : number = this.p1X + (38 * this.p1Diam / 100|0);
        let var10 : number = this.p1Y - (60 * this.p1Diam / 100|0);
        var5 = (var9 * this.nWidth / 1000|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (var10 * this.nHeight / 1000|0);
        let var11 : number = var5 - var1;
        let var12 : number = var6 - var2;
        let var13 : number = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        if(var13 === 0) {
            var13 = 1;
        }
        let var14 : number = ((this.nWidth / 50|0) * this.p1Diam / 100|0);
        let var15 : number = ((this.nHeight / 25|0) * this.p1Diam / 100|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillOval(var5 - (4 * var11 / var13|0) - (3 * var14 / 4|0), var6 - (4 * var12 / var13|0) - (3 * var15 / 4|0), (var14 / 2|0), (var15 / 2|0));
        var3 = (this.nWidth * this.p2Diam / 1000|0);
        var4 = (this.nHeight * this.p2Diam / 1000|0);
        var5 = (this.p2X * this.nWidth / 1000|0) - (var3 / 2|0);
        var6 = (4 * this.nHeight / 5|0) - (this.p2Diam * this.nHeight / 1000|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(this.slimeColours2[this.p2Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
        this.screen.setColor(this.slimeColours[this.p2Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 53, 74);
        this.screen.fillRect(var5 + (var3 / 5|0), var6 + (var4 / 5|0), (var3 * 3 / 5|0), (var4 * 4 / 5|0));
        var9 = this.p2X - (18 * this.p2Diam / 100|0);
        var10 = this.p2Y - (60 * this.p2Diam / 100|0);
        var5 = (var9 * this.nWidth / 1000|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (var10 * this.nHeight / 1000|0);
        var11 = var5 - var1;
        var12 = var6 - var2;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        if(var13 === 0) {
            var13 = 1;
        }
        var14 = ((this.nWidth / 50|0) * this.p2Diam / 100|0);
        var15 = ((this.nHeight / 25|0) * this.p2Diam / 100|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillOval(var5 - (4 * var11 / var13|0) - (3 * var14 / 4|0), var6 - (4 * var12 / var13|0) - (3 * var15 / 4|0), (var14 / 2|0), (var15 / 2|0));
        var3 = (this.nWidth * this.p1Diam / 1000|0);
        var4 = (this.nHeight * this.p1Diam / 1000|0);
        var5 = (this.p3X * this.nWidth / 1000|0) - (var3 / 2|0);
        var6 = (4 * this.nHeight / 5|0) - (this.p1Diam * this.nHeight / 1000|0) - (this.p3Y * this.nHeight / 1000|0);
        this.screen.setColor(this.slimeColours2[this.p1Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 0, 180);
        this.screen.setColor(this.slimeColours[this.p1Col]);
        this.screen.fillArc(var5, var6, var3, 2 * var4, 53, 74);
        this.screen.fillRect(var5 + (var3 / 5|0), var6 + (var4 / 5|0), (var3 * 3 / 5|0), (var4 * 4 / 5|0));
        var9 = this.p3X - (18 * this.p1Diam / 100|0);
        var10 = this.p3Y - (60 * this.p1Diam / 100|0);
        var5 = (var9 * this.nWidth / 1000|0);
        var6 = (4 * this.nHeight / 5|0) - var4 - (var10 * this.nHeight / 1000|0);
        var11 = var5 - var1;
        var12 = var6 - var2;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        if(var13 === 0) {
            var13 = 1;
        }
        var14 = ((this.nWidth / 50|0) * this.p1Diam / 100|0);
        var15 = ((this.nHeight / 25|0) * this.p1Diam / 100|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(var5 - var14, var6 - var15, var14, var15);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillOval(var5 - (4 * var11 / var13|0) - (3 * var14 / 4|0), var6 - (4 * var12 / var13|0) - (3 * var15 / 4|0), (var14 / 2|0), (var15 / 2|0));
        this.MoveBall();
    }

    /*public*/ MoveBall() {
        let var1 : number = 5;
        let var2 : number = 11;
        let var3 : number = 21;
        let var4 : number = 17;
        let var5 : number = ((this.ballRad + var1) * this.nHeight / 1000|0);
        let var6 : number = (this.ballOldX * this.nWidth / 1000|0);
        let var7 : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        this.ballbowled = this.ballbowled || this.ballX > this.bowlingCrease;
        if(this.ballVX >= 2 || this.ballVY >= 2 || this.p1XV + this.p1YV + this.p2XV + this.p2YV + this.p3YV !== 0 || this.ballX === 200 || this.p2X > this.runningCrease + (this.p2Diam / 2|0) && this.p2X < this.battingCrease - (this.p2Diam / 2|0)) {
            this.stillFrames = 0;
        } else if(this.stillFrames++ > 75) {
            this.promptMsg = " ";
        }
        if(this.ballY < this.ballRad + 5) {
            this.ballY = this.ballRad + 5;
            this.ballVY = (-this.ballVY * 2 / 3|0);
            this.ballVX = (this.ballVX * 19 / 20|0);
            ++this.bounces;
            if(!this.fP2Touched && this.bounces > 1 && !this.fHitBackWall) {
                this.fNoBall = true;
                this.drawPrompt$java_lang_String$int("No ball! (grubber)", 2);
            }
        }
        if(this.ballX > this.postPos && !this.fP2Touched) {
            this.fP2Touched = true;
        }
        if(this.ballY > 300 && this.ballX > this.battingCrease - (this.p2Diam / 2|0) && this.p2X >= this.battingCrease - (this.p2Diam / 2|0) && !this.fP2Touched && this.p2XMin > this.battingCrease - (this.p2Diam * 3 / 4|0)) {
            this.fNoBall = true;
            this.drawPrompt$java_lang_String$int("No ball! (too high)", 2);
        }
        if(!this.fEndGame) {
            let var8 : number = 2 * (this.ballX - this.p1X);
            let var9 : number = this.ballY - this.p1Y;
            let var10 : number = (<number>Math.sqrt(<number>(var8 * var8 + var9 * var9))|0);
            let var11 : number = this.ballVX - this.p1XV;
            let var12 : number = this.ballVY - this.p1YV;
            let var13 : number;
            if(var9 > 0 && var10 < this.p1Diam + this.ballRad && var10 > var1) {
                var13 = ((var8 * var11 + var9 * var12) / var10|0);
                this.ballX = this.p1X + (((this.p1Diam + this.ballRad) / 2|0) * var8 / var10|0);
                this.ballY = this.p1Y + ((this.p1Diam + this.ballRad) * var9 / var10|0);
                if(var13 <= 0) {
                    if(!this.p1Hold) {
                        this.ballVX += this.p1XV - (2 * var8 * var13 / var10|0);
                    } else {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    if(this.ballVX < -var2) {
                        this.ballVX = -var2;
                    }
                    if(this.ballVX > var2) {
                        this.ballVX = var2;
                    }
                    this.ballVY += this.p1YV - (2 * var9 * var13 / var10|0);
                    if(this.ballVY < -var3) {
                        this.ballVY = -var3;
                    }
                    if(this.ballVY > var3) {
                        this.ballVY = var3;
                    }
                }
                if(this.p1Touches > 0 && !this.fP2Touched && this.ballOldX === this.ballXMax && !this.fHitBackWall) {
                    this.drawPrompt$java_lang_String$int("No ball! (too many touches)", 2);
                    this.fNoBall = true;
                }
                if(this.fP2Touched) {
                    this.fP1Touched = true;
                }
                if(this.p1X !== this.runningCrease - (this.p1Diam / 2|0)) {
                    ++this.p1Touches;
                }
                if(this.fP2Touched && this.bounces === 0 && !this.fNoBall && !this.fHitBackWall && this.ballX >= this.p1X) {
                    this.promptMsg = this.COMM_CAUGHT[(<number>(<number>this.COMM_CAUGHT.length * Math.random())|0)];
                    this.thisBall = -this.wicketPenalty;
                }
            }
            if(!this.fP2Touched) {
                var8 = 2 * (this.ballX - this.p2X);
                var9 = this.ballY - this.p2Y;
                var10 = (<number>Math.sqrt(<number>(var8 * var8 + var9 * var9))|0);
                var11 = this.ballVX - this.p2XV;
                var12 = this.ballVY - this.p2YV;
                if(var9 > 0 && var10 < this.p2Diam + this.ballRad && var10 > var1 && this.p1Touches > 0) {
                    var13 = ((var8 * var11 + var9 * var12) / var10|0);
                    this.ballX = this.p2X + (((this.p2Diam + this.ballRad) / 2|0) * var8 / var10|0);
                    this.ballY = this.p2Y + ((this.p2Diam + this.ballRad) * var9 / var10|0);
                    if(var13 <= 0) {
                        this.ballVX += this.p2XV - (2 * var8 * var13 / var10|0);
                        if(this.ballVX < -var4) {
                            this.ballVX = -var4;
                        }
                        if(this.ballVX > var2) {
                            this.ballVX = var2;
                        }
                        this.ballVY += this.p2YV - (2 * var9 * var13 / var10|0);
                        if(this.ballVY < -var3) {
                            this.ballVY = -var3;
                        }
                        if(this.ballVY > var3) {
                            this.ballVY = var3;
                        }
                    }
                    this.fP2Touched = true;
                    this.bounces = 0;
                }
            }
            var8 = 2 * (this.ballX - this.p3X);
            var9 = this.ballY - this.p3Y;
            var10 = (<number>Math.sqrt(<number>(var8 * var8 + var9 * var9))|0);
            var11 = this.ballVX;
            var12 = this.ballVY - this.p3YV;
            if(var9 > 0 && var10 < this.p1Diam + this.ballRad && var10 > var1) {
                var13 = (((var8 * var11 + var9 * var12) / var10|0) * 2 / 3|0);
                this.ballX = this.p3X + (((this.p1Diam + this.ballRad) / 2|0) * var8 / var10|0);
                this.ballY = this.p3Y + ((this.p1Diam + this.ballRad) * var9 / var10|0);
                if(var13 <= 0) {
                    this.ballVX += (-2 * var8 * var13 / var10|0);
                    if(this.ballVX < -var4) {
                        this.ballVX = -var4;
                    }
                    if(this.ballVX > var2) {
                        this.ballVX = var2;
                    }
                    this.ballVY += this.p3YV - (2 * var9 * var13 / var10|0);
                    if(this.ballVY < -var3) {
                        this.ballVY = -var3;
                    }
                    if(this.ballVY > var3) {
                        this.ballVY = var3;
                    }
                }
                if(!this.fP1Touched && this.fP2Touched && this.bounces === 0 && !this.fNoBall) {
                    this.promptMsg = this.COMM_CTBEHIND[(<number>(<number>this.COMM_CTBEHIND.length * Math.random())|0)];
                    this.thisBall = -this.wicketPenalty;
                } else if(this.p2X < this.battingCrease - (this.p2Diam / 2|0) && this.p2X > this.runningCrease + (this.p2Diam / 2|0) || this.p2Y !== 0) {
                    if(this.p2XMin - (this.p2Diam / 2|0) > this.runningCrease && !this.fNoBall && !this.fP1Touched) {
                        this.promptMsg = this.COMM_STUMPED[(<number>(<number>this.COMM_STUMPED.length * Math.random())|0)];
                    } else {
                        this.promptMsg = this.COMM_RUNOUT[(<number>(<number>this.COMM_RUNOUT.length * Math.random())|0)];
                    }
                    this.thisBall = -this.wicketPenalty;
                }
                this.fP1Touched = true;
            }
            if(this.ballX < 5) {
                this.ballX = 5;
                this.ballVX = (-this.ballVX * 2 / 3|0);
                if(this.fP2Touched && this.bounces === 0 && !this.fHitBackWall) {
                    this.promptMsg = this.COMM_SIX[(<number>(<number>this.COMM_SIX.length * Math.random())|0)];
                    if(this.fP1Touched && Math.random() < 0.7) {
                        this.promptMsg = this.COMM_SIXTOUCHED[(<number>(<number>this.COMM_SIXTOUCHED.length * Math.random())|0)];
                    }
                    this.drawPrompt$java_lang_String$int(this.promptMsg, 1);
                    this.promptMsg = "";
                    this.thisBall += 6;
                } else if(this.fP2Touched && !this.fHitBackWall) {
                    this.promptMsg = this.COMM_FOUR[(<number>(<number>this.COMM_FOUR.length * Math.random())|0)];
                    if(this.fP1Touched && Math.random() < 0.7) {
                        this.promptMsg = this.COMM_FOURTOUCHED[(<number>(<number>this.COMM_FOURTOUCHED.length * Math.random())|0)];
                    }
                    this.drawPrompt$java_lang_String$int(this.promptMsg, 1);
                    this.promptMsg = "";
                    this.thisBall += 4;
                } else if(!this.fP2Touched) {
                    this.fNoBall = true;
                    this.drawPrompt$java_lang_String$int("No ball! (must bowl forwards)", 2);
                }
                if(this.fP2Touched) {
                    this.fHitBackWall = true;
                }
            }
            if(this.ballX > 995) {
                this.ballX = 995;
                this.ballVX = (-this.ballVX * 2 / 3|0);
                this.fHitBackWall = true;
            }
            if(this.ballX > this.postPos - this.ballRad && this.ballX < this.postPos + this.ballRad && this.ballY < 105 + this.ballRad) {
                if((this.p2X < this.battingCrease - (this.p2Diam / 2|0) && this.p2X > this.runningCrease + (this.p2Diam / 2|0) || this.p2Y !== 0) && this.fP1Touched && this.fP2Touched) {
                    this.promptMsg = this.COMM_RUNOUT[(<number>(<number>this.COMM_RUNOUT.length * Math.random())|0)];
                    this.thisBall = -this.wicketPenalty;
                } else if(!this.fNoBall && !this.fHitBackWall && this.p1Touches === 1) {
                    this.promptMsg = this.COMM_BOWLED[(<number>(<number>this.COMM_BOWLED.length * Math.random())|0)];
                    if(this.fP2Touched && Math.random() < 0.5) {
                        this.promptMsg = this.COMM_PLAYEDON[(<number>(<number>this.COMM_PLAYEDON.length * Math.random())|0)];
                    }
                    this.thisBall = -this.wicketPenalty;
                }
                this.fHitBackWall = true;
                if(this.ballVY < 0 && this.ballY > 105 + this.ballRad) {
                    this.ballVY *= -1;
                    this.ballY = 105 + this.ballRad;
                } else if(this.ballX < this.postPos) {
                    this.ballX = this.postPos - 17;
                    this.ballVX = ((this.ballVX >= 0?-this.ballVX:this.ballVX) * 3 / 4|0);
                } else {
                    this.ballX = this.postPos + 17;
                    this.ballVX = ((this.ballVX <= 0?-this.ballVX:this.ballVX) * 3 / 4|0);
                }
                this.fP2Touched = true;
            }
        }
        if(this.ballX > this.ballXMax) {
            this.ballXMax = this.ballX;
        }
        var6 = (this.ballX * this.nWidth / 1000|0);
        var7 = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(this.BALL_COL);
        this.screen.fillOval(var6 - var5, var7 - var5, 2 * var5, 2 * var5);
        this.drawScores();
        if(this.promptMsg.length > 0) {
            if(this.promptMsg.length > 1 && Math.random() < 0.3) {
                this.promptMsg = this.COMM_OUT_GENERIC[(<number>(<number>this.COMM_OUT_GENERIC.length * Math.random())|0)];
            }
            this.drawPrompt$java_lang_String$int(this.promptMsg, 0);
            this.getGraphics().drawImage(this.buffer, 0, 0, this);
            if(this.promptMsg.length > 1) {
                Thread.sleep$long(1500);
            }
            this.promptMsg = "";
            this.nextBall();
        }
    }

    /*public*/ sleep(var1 : number) {
        if(this.gameThread != null) {
            try {
                Thread.sleep$long(var1);
            } catch(var3) {
            };
        }
    }

    public drawPrompt$() {
        this.screen.setColor(this.COURT_COL);
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 6, this.nWidth, (this.nHeight / 5|0) - 10);
        this.drawPrompt$java_lang_String$int(this.promptMsg, 0);
    }

    public drawPrompt$java_lang_String$int(var1 : string, var2 : number) {
        let var3 : FontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("white"));
        this.screen.drawString(var1, ((this.nWidth - var3.stringWidth(var1)) / 2|0), (this.nHeight * 4 / 5|0) + var3.getHeight() * (var2 + 1) + 10);
    }

    public drawPrompt(var1? : any, var2? : any) : any {
        if(((typeof var1 === 'string') || var1 === null) && ((typeof var2 === 'number') || var2 === null)) {
            return <any>this.drawPrompt$java_lang_String$int(var1, var2);
        } else if(var1 === undefined && var2 === undefined) {
            return <any>this.drawPrompt$();
        } else throw new Error('invalid overload');
    }

    /*public*/ drawScores() {
        if(this.inns !== 0) {
            let var1 : Graphics = this.screen;
            let var2 : FontMetrics = var1.getFontMetrics();
            let var3 : number = 1;
            var1.setColor(this.SKY_COL);
            var1.fillRect(0, 0, (this.nWidth / 2|0), 3 * var2.getAscent() + 10);
            var1.setColor(Color.fromString("white"));
            let var4 : string = this.slimeColText[this.p2Col] + (this.p2Score + Math.floor(<number>this.thisBall));
            var1.drawString(var4, 10, (var2.getAscent() + 3) * var3 + 10);
            let var5 : number = var3 + 1;
            if(this.inns !== 1) {
                var4 = this.slimeColText[this.p1Col] + this.p1Score;
                var1.drawString(var4, 10, (var2.getAscent() + 3) * var5 + 10);
                ++var5;
            }
            if(this.ballCount < 6 * this.overs - 1) {
                var4 = "Over: " + (this.ballCount / 6|0);
                if(this.ballCount % 6 !== 0) {
                    var4 = var4 + "." + this.ballCount % 6;
                }
                var4 = var4 + " (" + this.overs + ")";
            } else if(this.ballCount === 6 * this.overs - 1) {
                var4 = "Last ball";
            } else {
                var4 = "Over: " + this.overs;
            }
            var1.drawString(var4, 10, (var2.getAscent() + 3) * var5 + 20);
            ++var5;
            if(this.p1X !== 200 || this.p2X !== 800 || this.fP1Touched || this.fP2Touched) {
            }
        }
    }

    /*public*/ drawWorm() {
        let var1 : Graphics = this.buffer.getGraphics();
        let var2 : FontMetrics = var1.getFontMetrics();
        let var5 : number = this.getMinScore(1);
        let var7 : number = this.getMinScore(2);
        let var11 : number = this.getMaxScore(1);
        let var13 : number = this.getMaxScore(2);
        let var3 : number = var5 < var7?var5:var7;
        let var9 : number = var11 > var13?var11:var13;
        if(var3 !== 0 || var9 !== 0) {
            let var15 : number = (this.nWidth * 4 / 5|0) - 5;
            let var16 : number = (this.nWidth / 5|0);
            let var17 : number = (<number>(5 + Math.floor(Math.floor(<number>((this.nHeight / 5|0))) * var9 / (var9 - var3)))|0);
            let var18 : number = (this.nHeight / 5|0);
            if(this.fEndOfOver) {
                var15 = (this.nWidth / 10|0) - 5;
                var16 = (this.nWidth * 4 / 5|0);
                var17 = (<number>(Math.floor(Math.floor(<number>((this.nHeight * 2 / 5|0))) * var9 / (var9 - var3)) + Math.floor(<number>((this.nHeight * 3 / 10|0))))|0);
                var18 = (this.nHeight * 2 / 5|0);
            }
            if(this.inns === 2) {
                var1.setColor(this.slimeColours[this.p1Col]);
                var1.drawString(this.slimeColAbbr[this.p1Col], var15 - var2.stringWidth(this.slimeColAbbr[this.p1Col]) - 5, var17 - (<number>(Math.floor(Math.floor((var9 + var3) / 2) * Math.floor(<number>var18) / (var9 - var3)))|0));
                var1.drawLine(var15, var17, var15 + (var16 / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p1bxb[0] / (var9 - var3)))|0));
                for(let var19 : number = 1; var19 < 6 * this.overs; ++var19) {
                    var1.drawLine(var15 + (var16 * var19 / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p1bxb[var19 - 1] / (var9 - var3)))|0), var15 + (var16 * (var19 + 1) / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p1bxb[var19] / (var9 - var3)))|0));
                };
                var1.setColor(this.slimeColours[this.p2Col]);
                var1.drawString(this.slimeColAbbr[this.p2Col], var15 - var2.stringWidth(this.slimeColAbbr[this.p2Col]) - 5, var17 - (<number>(Math.floor(Math.floor((var9 + var3) / 2) * Math.floor(<number>var18) / (var9 - var3)))|0) + var2.getAscent());
                var1.drawLine(var15, var17, var15 + (var16 / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p2bxb[0] / (var9 - var3)))|0));
                for(let var20 : number = 1; var20 < this.ballCount; ++var20) {
                    var1.drawLine(var15 + (var16 * var20 / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p2bxb[var20 - 1] / (var9 - var3)))|0), var15 + (var16 * (var20 + 1) / (6 * this.overs)|0), (<number>(Math.floor(<number>var17) - Math.floor(Math.floor(<number>var18) * this.p2bxb[var20] / (var9 - var3)))|0));
                };
                var1.setColor(Color.fromString("white"));
                var1.drawString(/* valueOf */new String(var9).toString(), var15 - 5 - var2.stringWidth(/* valueOf */new String(var9).toString()), var17 - (<number>(Math.floor(var9 * Math.floor(<number>var18) / (var9 - var3)))|0) + var2.getAscent());
                var1.drawString(/* valueOf */new String(var3).toString(), var15 - 5 - var2.stringWidth(/* valueOf */new String(var3).toString()), var17 - (<number>(Math.floor(var3 * Math.floor(<number>var18) / (var9 - var3)))|0));
                var1.drawLine(var15, var17 - (<number>(Math.floor(var9 * Math.floor(<number>var18) / (var9 - var3)))|0), var15, var17 - (<number>(Math.floor(var3 * Math.floor(<number>var18) / (var9 - var3)))|0));
                var1.drawLine(var15, var17, var15 + var16, var17);
            }
        }
    }

    public async run() {
        let var1 : Graphics = this.getGraphics();
        while((this.gameThread != null)) {
            if(this.__wait > 0) {
                --this.__wait;
            }
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.p3OldY = this.p3Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.MoveSlimers();
            this.DrawSlimers();
            var1.drawImage(this.buffer, 0, 0, <ImageObserver>null);
            if(this.ballCount === this.overs * 6 && !this.fNoBall) {
                this.fInPlay = false;
                if(this.inns === 1) {
                    this.promptMsg = "Click the mouse to continue...";
                } else {
                    this.DoFatality();
                    this.promptMsg = "Click team names to select teams, then choose an innings length to start!";
                    this.fEndGame = true;
                    if(this.p1ai) {
                        this.p1Col = 9;
                    }
                    if(this.p2ai) {
                        this.p2Col = 9;
                    }
                    this.p1ai = this.p2ai = false;
                }
                this.gameThread = null;
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var2) {
                };
            }
        };
        if(!this.fEndOfOver) {
            this.fInPlay = false;
        }
        this.repaint();
    }

    /*public*/ DoFatality() {
        this.getGraphics();
        if(this.p1Score > this.p2Score) {
            this.p1J();
            this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " wins!", 1);
        } else if(this.p2Score > this.p1Score) {
            this.p2J();
            this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " wins!", 1);
        } else {
            this.drawPrompt$java_lang_String$int("It\'s a tie!", 1);
        }
        this.p1ai = this.p2ai = false;
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ bowl() {
        if(this.__wait <= 0) {
            if(this.balltype === -1) {
                switch((this.difficulty)) {
                case 0:
                    this.balltype = 0;
                    break;
                case 1:
                    this.balltype = (<number>(4.0 * Math.random())|0);
                    break;
                case 2:
                    this.balltype = (<number>(2.0 * Math.random())|0) + 2;
                }
            }
            if(this.difficulty === 2 && this.p2X - (this.p2Diam / 2|0) < this.battingCrease - ((this.battingCrease - this.runningCrease) / 4|0)) {
                this.balltype = 1;
            }
            switch((this.balltype)) {
            case 0:
                if(this.p1X > this.runningCrease - (this.p1Diam * 5 / 6|0)) {
                    this.p1L();
                    return;
                }
                if(this.ballY < 200 && this.ballVY < 0) {
                    this.p1J();
                    return;
                }
                this.p1S();
                return;
            case 1:
                if(this.p1X > this.runningCrease - (this.p1Diam * 3 / 4|0)) {
                    this.p1L();
                } else {
                    this.p1S();
                }
                if(this.ballY < 320 && this.ballVY < 0) {
                    this.p1J();
                    return;
                }
                break;
            case 2:
                if(this.ballVY > 0 && this.p1X > this.runningCrease - (this.p1Diam * 5 / 6|0)) {
                    this.p1L();
                } else {
                    this.p1S();
                }
                if(this.ballY > 270 && this.ballVY > 0) {
                    this.p1J();
                    return;
                }
                break;
            case 3:
                if(this.p1X > this.runningCrease - (this.p1Diam * 2 / 3|0)) {
                    this.p1L();
                    return;
                }
                this.p1S();
                return;
            }
        }
    }

    /*public*/ field() {
        if(this.bounces === 0) {
            if(this.difficulty > 1 && this.ballX > this.p1X && this.ballVX < 0 && this.ballY > (this.p1Diam / 2|0) && Math.sqrt(<number>((this.ballX - this.p1X) * (this.ballX - this.p1X) + (this.ballY - this.p1Y) * (this.ballY - this.p1Y))) < 250.0) {
                this.p1J();
            }
            if(this.difficulty === 2 && this.ballX > this.postPos && Math.sqrt(<number>((this.ballX - this.p3X) * (this.ballX - this.p3X) + (this.ballY - this.p3Y) * (this.ballY - this.p3Y))) < 250.0) {
                this.p3J();
            }
        }
        if(this.difficulty < 2 && !this.fP2Touched && this.ballbowled) {
            this.p1S();
        } else if(this.p1X + (this.p1Diam / 2|0) > this.ballX) {
            this.p1L();
        } else if(this.p1X + this.p1Diam + (this.ballRad * 3 / 2|0) < this.postPos) {
            this.p1R();
        } else if((this.p2X + (this.p2Diam / 2|0) < this.battingCrease && this.p2X - (this.p2Diam / 2|0) > this.runningCrease || this.p2Y !== 0) && this.fP1Touched) {
            this.p1R();
        } else {
            this.p1S();
        }
        if(this.ballX > this.p1Diam && this.ballY < (this.p1Diam / 2|0) && this.ballVX <= 0 && !this.fHitBackWall && this.p1X - this.ballX < this.p1Diam && this.p1X > this.ballX && this.bounces > 0 && this.difficulty === 2) {
            this.p1J();
        }
    }

    /*public*/ playball() {
        let var1 : number = Math.sqrt(<number>((this.ballX - this.p2X) * (this.ballX - this.p2X) + (this.ballY - this.p2Y) * (this.ballY - this.p2Y)));
        let var3 : boolean = false;
        let var4 : number = 0;
        let var5 : number = this.ballY;
        for(let var6 : number = this.ballVY; var5 > 0; var5 += var6) {
            ++var4;
            --var6;
        };
        let var8 : number = this.ballX + this.ballVX * var4;
        let var7 : boolean = var8 < this.postPos - this.p2Diam && var8 >= this.p2X - var4 * 8;
        switch((this.difficulty)) {
        case 0:
            if(var1 < 400.0 && this.ballX - this.p2X < (this.p2Diam * 3 / 2|0) && this.ballX < this.p2X && this.ballY < this.p2Y + (this.p2Diam * 3 / 2|0)) {
                this.p2L();
            } else {
                this.p2S();
            }
            if(var1 < 350.0 && this.ballY > this.p2Diam * 2 && this.ballX > this.p2X - this.p2Diam) {
                this.p2J();
                return;
            }
            break;
        case 1:
        case 2:
            if(this.ballbowled && this.shottype === -1) {
                if(this.p2Score > this.p1Score && this.inns === 2 && var7) {
                    this.shottype = 1;
                } else if(var7 && Math.random() < 0.5) {
                    if(Math.random() < 0.75) {
                        this.shottype = 4;
                    } else {
                        this.shottype = 1;
                    }
                } else if(var8 <= this.battingCrease && Math.random() >= 0.6) {
                    this.shottype = 2;
                } else {
                    this.shottype = 3;
                }
            }
            switch((this.shottype)) {
            case 1:
                if(this.ballbowled && this.p2X - this.p2XV - (this.p2Diam / 2|0) > var8) {
                    this.p2L();
                    return;
                }
                this.p2S();
                return;
            case 2:
                if(this.ballbowled && this.p2X - this.p2XV - this.p2Diam > var8) {
                    this.p2L();
                    return;
                }
                this.p2S();
                if(this.ballX > this.p2X - (this.p2Diam * 2 / 3|0)) {
                    this.p2J();
                    return;
                }
                break;
            case 3:
                if(this.ballbowled && this.p2X + this.p2XV + 50 > var8) {
                    this.p2L();
                    return;
                }
                this.p2S();
                if(this.ballX > this.p2X - (this.p2Diam / 2|0)) {
                    this.p2J();
                    return;
                }
                break;
            case 4:
                if(!this.ballbowled || this.p2X - this.p2XV - (this.p2Diam / 2|0) <= var8 && this.ballX + 3 * this.ballVX <= this.p2X - (this.p2Diam / 2|0)) {
                    this.p2S();
                    return;
                }
                this.p2L();
                return;
            }
        }
    }

    /*public*/ running() {
        let var1 : boolean = false;
        if(this.ballX > this.postPos || this.ballX > this.p1X && (this.p1X - this.ballX < 400 || this.p1X - this.ballX < 300 && this.ballVX > 0)) {
            var1 = true;
        }
        if(this.ballX < this.runningCrease || this.p1X < this.runningCrease && this.ballVX < 0 && this.ballX < this.battingCrease) {
            var1 = false;
        }
        if(this.ballX < this.postPos && this.p1X < this.p2X && this.ballX > this.p2X && this.p2X - (this.p2Diam / 2|0) <= this.runningCrease) {
            var1 = false;
        }
        if(this.ballX < this.postPos && this.ballX - this.p2X > this.battingCrease - this.runningCrease) {
            var1 = false;
        }
        if(var1 && (this.p2X + (this.p2Diam / 2|0) >= this.battingCrease || this.p2X - (this.p2Diam / 2|0) <= this.runningCrease)) {
            this.p2S();
        } else if(var1) {
            if(this.p2X <= this.runningCrease + ((this.battingCrease - this.runningCrease) / 2|0) && this.difficulty >= 2) {
                this.p2L();
            } else {
                this.p2R();
            }
        } else if(!var1 && this.p2X - (this.p2Diam / 2|0) <= this.runningCrease && this.p2X === this.p2XMax) {
            this.p2R();
        } else {
            if(!var1 && this.p2X + (this.p2Diam / 2|0) >= this.battingCrease && this.p2X >= this.p2XMin) {
                this.p2L();
            }
        }
    }

    public constructor() {
        super();
        this.nWidth = 0;
        this.nHeight = 0;
        this.p1X = 0;
        this.p1Y = 0;
        this.p2X = 0;
        this.p2Y = 0;
        this.p3X = 0;
        this.p3Y = 0;
        this.p1Col = 0;
        this.p2Col = 0;
        this.slimeColours = null;
        this.slimeColours2 = null;
        this.slimeColText = null;
        this.slimeColAbbr = null;
        this.difficultyColours = null;
        this.difficultyText = null;
        this.difficulty = 0;
        this.p1OldX = 0;
        this.p1OldY = 0;
        this.p2OldX = 0;
        this.p2OldY = 0;
        this.p3OldY = 0;
        this.p1XV = 0;
        this.p1YV = 0;
        this.p2XV = 0;
        this.p2YV = 0;
        this.p3YV = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.ballVX = 0;
        this.ballVY = 0;
        this.ballOldX = 0;
        this.ballOldY = 0;
        this.screen = null;
        this.promptMsg = null;
        this.mousePressed = false;
        this.fCanChangeCol = false;
        this.fInPlay = false;
        this.p1Blink = 0;
        this.p2Blink = 0;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.gameThread = null;
        this.fEndGame = false;
        this.BALL_COL = null;
        this.COURT_COL = null;
        this.DAY_COL = null;
        this.NIGHT_COL = null;
        this.SKY_COL = null;
        this.bounces = 0;
        this.fEndOfOver = false;
        this.fHitBackWall = false;
        this.p1XMin = 0;
        this.p2XMin = 0;
        this.p2XMax = 0;
        this.ballXMax = 0;
        this.p1Touches = 0;
        this.ballCount = 0;
        this.postPos = 0;
        this.bowlingCrease = 0;
        this.runningCrease = 0;
        this.battingCrease = 0;
        this.p1Score = 0;
        this.p2Score = 0;
        this.inns = 0;
        this.wicketPenalty = 0;
        this.fNoBall = false;
        this.overs = 0;
        this.stillFrames = 0;
        this.buffer = null;
        this.thisBall = 0;
        this.thisOver = null;
        this.p1bxb = null;
        this.p2bxb = null;
        this.p1Hold = false;
        this.ballbowled = false;
        this.p1next = false;
        this.p2next = false;
        this.__wait = 0;
        this.p1ai = false;
        this.p2ai = false;
        this.balltype = 0;
        this.shottype = 0;
        this.AI_COL = 0;
        this.COMM_FOUR = null;
        this.COMM_FOURTOUCHED = null;
        this.COMM_SIX = null;
        this.COMM_SIXTOUCHED = null;
        this.COMM_STUMPED = null;
        this.COMM_RUNOUT = null;
        this.COMM_BOWLED = null;
        this.COMM_PLAYEDON = null;
        this.COMM_CAUGHT = null;
        this.COMM_CTBEHIND = null;
        this.COMM_OUT_GENERIC = null;
        this.p3X = 1000 - (this.p1Diam / 2|0);
        this.slimeColours = [Color.fromString("yellow"), new Color(0, 0, 128), new Color(164, 164, 255), Color.fromString("black"), new Color(0, 100, 0), new Color(0, 162, 0), new Color(0, 0, 210), new Color(128, 78, 0), Color.fromString("red"), Color.fromString("black")];
        this.slimeColours2 = [new Color(0, 100, 0), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("gray"), Color.fromString("white"), Color.fromString("yellow"), Color.fromString("yellow"), new Color(60, 160, 60), Color.fromString("yellow"), Color.fromString("white")];
        this.slimeColText = ["Australia ", "England ", "India ", "New Zealand ", "Pakistan ", "South Africa ", "Sri Lanka ", "West Indies ", "Zimbabwe ", "Computer"];
        this.slimeColAbbr = ["AUS", "ENG", "IND", "NZ", "PAK", "RSA", "SL", "WI", "ZIM", "AI"];
        this.difficultyColours = [Color.fromString("blue"), Color.fromString("green"), Color.fromString("red")];
        this.difficultyText = ["Grade", "Domestic", "International"];
        this.BALL_COL = Color.fromString("white");
        this.COURT_COL = new Color(0, 160, 0);
        this.DAY_COL = new Color(85, 85, 255);
        this.NIGHT_COL = new Color(0, 0, 68);
        this.SKY_COL = this.DAY_COL;
        this.fHitBackWall = false;
        this.postPos = 1000 - this.p1Diam - 5;
        this.bowlingCrease = 450;
        this.runningCrease = 450;
        this.battingCrease = this.postPos - (this.p2Diam / 2|0) - 20;
        this.inns = 1;
        this.wicketPenalty = 5;
        this.fNoBall = false;
        this.overs = 5;
        this.p1Hold = false;
        this.p1ai = false;
        this.p2ai = false;
        this.balltype = -1;
        this.shottype = -1;
        this.AI_COL = 9;
        this.COMM_FOUR = ["Along the carpet it goes for four.", "Back past the bowler for four.", "Picks the gap nicely and into the fence it goes for four.", "Shot!", "Four more added to the total.", "It\'s certainly a batsman\'s paradise out there today.", "... and the umpire waves his arm once more.", "Exactly not what the bowler had planned.", "Well it\'s bounced up off the rope and smacked some guy in the face!"];
        this.COMM_FOURTOUCHED = ["Terrible fielding effort there.", "The bowler won\'t be pleased with that effort.", "Well that should never have been a four."];
        this.COMM_SIX = ["He\'s carving them up like a Christmas cake!", "That\'s come right orf the meat of the bat.", "He\'s hit that one very hored indeed.", "He\'s smacked that one.", "He\'s gone for it... it\'s gone all the way!", "Must be playing on a road out there today.", "Looks like he\'s chasing Andrew Symonds\' record here..."];
        this.COMM_SIXTOUCHED = ["Oh no, he\'s done a Paul Reiffel!", "Well that\'s six more on top of the no ball, he can\'t be happy."];
        this.COMM_STUMPED = ["Stumped him!", "A fine example of wicket keeping there. Excellent stuff.", "There goes the red light! What quick hands this keeper has!"];
        this.COMM_RUNOUT = ["He\'s run out! What a tragedy!", "... and there\'s the red light. He\'s out.", "Allan Donald would be pleased with that effort.", "Well the fielder\'s decided to chance his arm, and it\'s come off!", "The bails were off in a flash, he never had a chance.", "Poor calling there, he deserved to get out.", "Well what else do you expect if you run like Ranatunga?"];
        this.COMM_BOWLED = ["Bowled him neck and crop.", "Tremendous delivery, he really had no idea about that.", "What a marvellous ball!", "That\'s a ripsnorter of a ball!", "I think that\'s just knocked Joe the stumpcameraman out.", "Well the bowler\'s certainly had his weeties this morning.", "There\'s the death rattle.", "That\'s gotta be a contender for today\'s fastest ball.", "Straight through the gate. The batsman won\'t be pleased with that.", "Completely bamboozled.", "A wonderful spell of bowling, this."];
        this.COMM_PLAYEDON = ["He\'s played on!", "A magnificent chop shot, oh wait, it\'s hit the stumps.", "He\'s done an Adam Gilchrist!"];
        this.COMM_CAUGHT = ["He\'s hit it straight down his throat.", "A safe pair of hands, he doesn\'t drop those.", "What a magnificent shot! No, he\'s been caught!", "A marvellous catch, that.", "... and he takes a straightforward catch.", "Well, they say \"catches win matches\".", "Caught, yes!", "Well, he\'s picked out the only fielder in front of the bat!", "Can\'t be happy with that shot.", "What a shame, we can\'t use the snickometer on that one it\'s so damned obvious."];
        this.COMM_CTBEHIND = ["... the keeper gobbles up the catch.", "... and the snickometer shows that that\'s clearly out.", "Excellent line and length, he\'s got another edge.", "Yes, there was some bat in that, he\'s gone!"];
        this.COMM_OUT_GENERIC = ["Got him, yes!", "It\'s all happening here!", "A marvellous effort, that!", "He\'s out.", "Oh dear.", "Gone!", "What a magnificent fielding side this team is.", "Yes, another one! He\'s a hero, this man!"];
    }
}
SlimeCricket2["__class"] = "SlimeCricket2";
SlimeCricket2["__interfaces"] = ["Runnable"];



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