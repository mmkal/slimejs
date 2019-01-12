import { Applet, Runnable, Color, Graphics, Thread, Image, FontMetrics, Event, System, Font, ImageObserver, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class WorldCupSoccerSlime extends Applet implements Runnable {
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

    /*public*/ slimeColText : string[] = ["Argentina", "Belgium", "Australia", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland", "Saudi Arabia", "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", "England", "Germany"];

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
        this.JUMPVEL = this.fSuperSlime?65:31;
        this.SLIMEVEL = this.fSuperSlime?16:8;
        this.GRAVITY = this.fSuperSlime?8:2;
    }

    /*public*/ drawButtons() {
        let var1 : string[] = ["1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"];
        let var2 : FontMetrics = this.screen.getFontMetrics();
        let var3 : Color = new Color(0, 0, 128);
        for(let var4 : number = 0; var4 < 5; ++var4) {
            this.screen.setColor(var3);
            this.screen.fillRect(((2 * var4 + 1) * this.nWidth / 10|0) - (this.nWidth / 12|0), (this.nHeight * 2 / 10|0), (this.nWidth / 6|0), (this.nHeight / 10|0));
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString(var1[var4], ((2 * var4 + 1) * this.nWidth / 10|0) - (var2.stringWidth(var1[var4]) / 2|0), (this.nHeight * 5 / 20|0) + (var2.getHeight() / 2|0));
        };
        this.flip();
    }

    /*public*/ testButton(var1 : number, var2 : number) : boolean {
        for(let var3 : number = 0; var3 < 5; ++var3) {
            if(var1 > ((2 * var3 + 1) * this.nWidth / 10|0) - (this.nWidth / 12|0) && var1 < ((2 * var3 + 1) * this.nWidth / 10|0) + (this.nWidth / 12|0) && var2 > (this.nHeight * 2 / 10|0) && var2 < (this.nHeight * 3 / 10|0)) {
                if(var3 === 4) {
                    this.gameLength = 120000;
                    this.worldCup = true;
                } else {
                    this.gameLength = (1 << var3) * 60000;
                    this.worldCup = false;
                }
                return true;
            }
        };
        return false;
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            if(this.fCanChangeCol) {
                switch((var1.key)) {
                case 54:
                    this.fSuperSlime = !this.fSuperSlime;
                    this.repaint();
                    break;
                case 73:
                case 105:
                case 1004:
                    do {
                        this.p2Col = this.p2Col === 0?this.slimaryCols.length - 1:this.p2Col - 1;
                    } while((this.p1Col === this.p2Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 75:
                case 107:
                case 1005:
                    do {
                        this.p2Col = this.p2Col !== this.slimaryCols.length - 1?this.p2Col + 1:0;
                    } while((this.p2Col === this.p1Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 83:
                case 115:
                    do {
                        this.p1Col = this.p1Col !== this.slimaryCols.length - 1?this.p1Col + 1:0;
                    } while((this.p1Col === this.p2Col));
                    this.drawScores();
                    this.repaint();
                    break;
                case 87:
                case 119:
                    while((true)) {
                        this.p1Col = this.p1Col === 0?this.slimaryCols.length - 1:this.p1Col - 1;
                        if(this.p1Col !== this.p2Col) {
                            this.drawScores();
                            this.repaint();
                            break;
                        }
                    };
                }
            }
            if(!this.fEndGame) {
                switch((var1.key)) {
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
                    if(this.p2Y === 0 && !this.worldCup) {
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
                        this.fP2Sticky = true;
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
                    this.fP1Sticky = true;
                    return false;
                case 87:
                case 119:
                    if(this.p1Y === 0) {
                        this.p1YV = this.JUMPVEL;
                    }
                }
            }
            break;
        case 402:
        case 404:
            switch((var1.key)) {
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
            if(!this.fInPlay && this.testButton(var1.x, var1.y)) {
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
                } catch(var2) {
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
        let var1 : number = (this.nWidth / 10|0);
        let var2 : number = (this.nHeight / 10|0);
        let var3 : number = (this.nWidth / 50|0);
        let var4 : number = (this.nHeight / 25|0);
        let var5 : number = (this.ballX * this.nWidth / 1000|0);
        let var6 : number = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        let var7 : number = (this.p1OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        let var8 : number = (7 * this.nHeight / 10|0) - (this.p1OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7, var8, var1, var2);
        var7 = (this.p2OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7, var8, var1, var2);
        if(!this.fEndGame) {
            this.MoveBall();
        }
        var7 = (this.p1X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.fSuperSlime?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p1Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.pointsX[0] = this.pointsX[2] = var7 + (var1 / 2|0);
        this.pointsX[1] = var7 + (var1 * 2 / 5|0);
        this.pointsX[3] = var7 + (var1 / 8|0);
        this.pointsY[0] = var8;
        this.pointsY[1] = this.pointsY[3] = var8 + (var2 / 2|0);
        this.pointsY[2] = var8 + var2;
        this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
        let var9 : number = this.p1X + 38;
        let var10 : number = this.p1Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        let var11 : number = var7 - var5;
        let var12 : number = var8 - var6;
        let var13 : number = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        let var14 : boolean = Math.random() < 0.01;
        if(var14) {
            this.p1Blink = 5;
        }
        if(this.p1Blink === 0) {
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
            }
        } else {
            --this.p1Blink;
        }
        let var15 : number;
        let var16 : number;
        let var17 : number;
        let var18 : number;
        let var19 : number;
        if(this.p1Score > this.p2Score + 2) {
            var15 = (this.p1X * this.nWidth / 1000|0);
            var16 = (7 * this.nHeight / 10|0) - ((this.p1Y - 40) * this.nHeight / 1000|0);
            var17 = (this.nWidth / 20|0);
            var18 = (this.nHeight / 20|0);
            var19 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
                ++var19;
            } while((var19 < 3));
        }
        var7 = (this.p2X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(this.fSuperSlime?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p2Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.pointsX[0] = this.pointsX[2] = var7 + (var1 / 2|0);
        this.pointsX[1] = var7 + (var1 * 3 / 5|0);
        this.pointsX[3] = var7 + (var1 * 7 / 8|0);
        this.pointsY[0] = var8;
        this.pointsY[1] = this.pointsY[3] = var8 + (var2 / 2|0);
        this.pointsY[2] = var8 + var2;
        this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
        var9 = this.p2X - 18;
        var10 = this.p2Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        var11 = var7 - var5;
        var12 = var8 - var6;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        var14 = Math.random() < 0.01;
        if(var14) {
            this.p2Blink = 5;
        }
        if(this.p2Blink === 0) {
            this.screen.setColor(var14?Color.fromString("gray"):Color.fromString("white"));
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
            }
        } else {
            --this.p2Blink;
        }
        if(this.p2Score > this.p1Score + 2) {
            var15 = (this.nWidth / 20|0);
            var16 = (this.nHeight / 20|0);
            var17 = (this.p2X * this.nWidth / 1000|0) - var15;
            var18 = (7 * this.nHeight / 10|0) - ((this.p2Y - 40) * this.nHeight / 1000|0);
            var19 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(var17, var18 + var19, var15, var16, -10, -150);
                ++var19;
            } while((var19 < 3));
        }
    }

    public paint(var1 : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.screen.setColor(Color.fromString("blue"));
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
            let var2 : FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            if(this.fSuperSlime) {
                this.screen.drawString("Super Soccer Slime!", (this.nWidth / 2|0) - (var2.stringWidth("Super Soccer Slime!") / 2|0), (this.nHeight / 2|0) - var2.getHeight());
            } else {
                this.screen.drawString("Soccer Slime!", (this.nWidth / 2|0) - (var2.stringWidth("Soccer Slime!") / 2|0), (this.nHeight / 2|0) - var2.getHeight());
            }
            this.screen.setColor(Color.fromString("white"));
            var2 = this.screen.getFontMetrics();
            this.screen.drawString("Written by Quin Pendragon", (this.nWidth / 2|0) - (var2.stringWidth("Written by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 2);
        }
        this.flip();
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ ReplayFrame(var1 : number, var2 : number, var3 : number, var4 : number, var5 : number, var6 : boolean) {
        if(var6) {
            this.ballX = -1000;
            this.ballOldX = 500;
            this.ballY = -1000;
            this.ballOldY = 500;
            this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
        } else {
            let var7 : number = var1 !== 0?var1 - 1:199;
            this.p1OldX = this.replayData[var7][0];
            this.p1OldY = this.replayData[var7][1];
            this.p2OldX = this.replayData[var7][2];
            this.p2OldY = this.replayData[var7][3];
            if(var1 === 0) {
                this.ballOldX = 500;
                this.ballOldY = 200;
            } else {
                this.ballOldX = this.replayData[var7][4];
                this.ballOldY = this.replayData[var7][5];
            }
        }
        this.p1X = this.replayData[var1][0];
        this.p1Y = this.replayData[var1][1];
        this.p2X = this.replayData[var1][2];
        this.p2Y = this.replayData[var1][3];
        this.ballX = this.replayData[var1][4];
        this.ballY = this.replayData[var1][5];
        this.p1Col = this.replayData[var1][6];
        this.p2Col = this.replayData[var1][7];
        this.ballVX = 0;
        this.ballVY = 1;
        if((var1 / 10|0) % 2 > 0) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.drawString("Replay...", var2, var3);
        } else {
            this.screen.setColor(Color.fromString("blue"));
            this.screen.fillRect(var2, var3 - var5, var4, var5 * 2);
        }
        this.DrawSlimers();
        this.DrawGoals();
        try {
            Thread.sleep$long(20);
        } catch(var8) {
        };
    }

    /*public*/ MakeTime(var1 : number) : string {
        let var3 : number = Math.floor(var1 / 10) % 100;
        let var5 : number = Math.floor(var1 / 1000) % 60;
        let var7 : number = Math.floor(var1 / 60000) % 60;
        let var9 : string = "";
        if(var7 < 10) {
            var9 = var9 + "0";
        }
        var9 = var9 + var7;
        var9 = var9 + ":";
        if(var5 < 10) {
            var9 = var9 + "0";
        }
        var9 = var9 + var5;
        var9 = var9 + ":";
        if(var3 < 10) {
            var9 = var9 + "0";
        }
        var9 = var9 + var3;
        return var9;
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
        this.fExtraTime = false;
        this.fGoldenGoal = false;
        this.fSuperSlime = false;
        this.doubleBuffered = false;
        this.pointsX = null;
        this.pointsY = null;
        this.slimaryCols = [Color.fromString("cyan"), Color.fromString("red"), Color.fromString("green"), this.darkGreen, Color.fromString("white"), this.darkRed, this.darkRed, new Color(119, 41, 28), Color.fromString("yellow"), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), new Color(128, 128, 255), this.darkBlue, Color.fromString("white"), Color.fromString("red"), Color.fromString("white"), new Color(119, 41, 28), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), new Color(185, 30, 2), Color.fromString("white"), Color.fromString("red"), new Color(252, 239, 82), Color.fromString("white"), Color.fromString("red"), new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.fromString("white")];
        this.secondaryCols = [Color.fromString("white"), Color.fromString("black"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), this.darkBlue, Color.fromString("green"), Color.fromString("blue"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), Color.fromString("blue"), Color.fromString("white"), Color.fromString("red"), this.darkGreen, Color.fromString("white"), new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.fromString("white"), Color.fromString("blue"), Color.fromString("red"), Color.fromString("white"), Color.fromString("black"), new Color(7, 177, 33), Color.fromString("red"), Color.fromString("black")];
        this.SMILE_DIFF = 2;
        this.DAMPING = 7;
        this.MAX_TICKS_TOUCHING_GOAL = 60;
        this.worldCup = false;
        this.pointsX = [];
        this.pointsY = [];
        this.p2Col = 1;
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 8]);
    }

    /*public*/ MoveBall() {
        let var1 : number = (30 * this.nHeight / 1000|0);
        let var2 : number = (this.ballOldX * this.nWidth / 1000|0);
        let var3 : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(!this.fEndGame) {
            let var4 : number = (this.ballX - this.p1X) * 2;
            let var5 : number = this.ballY - this.p1Y;
            let var6 : number = var4 * var4 + var5 * var5;
            let var7 : number = this.ballVX - this.p1XV;
            let var8 : number = this.ballVY - this.p1YV;
            let var9 : number;
            let var10 : number;
            if(var5 > 0 && var6 < 15625 && var6 > 25) {
                var9 = (<number>Math.sqrt(<number>var6)|0);
                var10 = ((var4 * var7 + var5 * var8) / var9|0);
                this.ballX = this.p1X + (var4 * 63 / var9|0);
                this.ballY = this.p1Y + (var5 * 125 / var9|0);
                if(var10 <= 0) {
                    if(!this.fP1Sticky) {
                        this.ballVY += this.p1YV - (2 * var5 * var10 / var9|0);
                        this.ballVX += ((this.p1XV - (2 * var4 * var10 / var9|0)) * 7 / 10|0);
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
            var4 = (this.ballX - this.p2X) * 2;
            var5 = this.ballY - this.p2Y;
            var6 = var4 * var4 + var5 * var5;
            var7 = this.ballVX - this.p2XV;
            var8 = this.ballVY - this.p2YV;
            if(var5 > 0 && var6 < 15625 && var6 > 25) {
                var9 = (<number>Math.sqrt(<number>var6)|0);
                var10 = ((var4 * var7 + var5 * var8) / var9|0);
                this.ballX = this.p2X + (var4 * 63 / var9|0);
                this.ballY = this.p2Y + (var5 * 125 / var9|0);
                if(var10 <= 0) {
                    if(!this.fP2Sticky) {
                        this.ballVX += ((this.p2XV - (2 * var4 * var10 / var9|0)) * 7 / 10|0);
                        this.ballVY += this.p2YV - (2 * var5 * var10 / var9|0);
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
        var2 = (this.ballX * this.nWidth / 1000|0);
        var3 = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
    }

    /*public*/ DrawGoals() {
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillRect((this.nWidth / 20|0), (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), 5, (200 * this.nHeight / 1000|0));
        this.screen.fillRect(this.nWidth - (this.nWidth / 20|0) - 5, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), 5, (200 * this.nHeight / 1000|0));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 2, (this.nWidth / 10|0), 2);
        this.screen.fillRect((this.nWidth * 9 / 10|0), (4 * this.nHeight / 5|0) + 2, (this.nWidth / 10|0), 2);
        for(let var1 : number = 0; var1 < (this.nWidth / 20|0); var1 += 5) {
            this.screen.drawLine(var1, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), var1, (4 * this.nHeight / 5|0));
            this.screen.drawLine(this.nWidth - var1, (4 * this.nHeight / 5|0) - (200 * this.nHeight / 1000|0), this.nWidth - var1, (4 * this.nHeight / 5|0));
        };
        for(let var2 : number = (4 * this.nHeight / 5|0) - (this.nHeight / 5|0); var2 < (4 * this.nHeight / 5|0); var2 += 5) {
            this.screen.drawLine(0, var2, (this.nWidth / 20|0), var2);
            this.screen.drawLine(this.nWidth, var2, this.nWidth - (this.nWidth / 20|0), var2);
        };
        let var3 : number = ((60 - this.p1TouchingGoal) * this.nWidth / 120|0);
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.screen.fillRect(0, this.nHeight - 5, var3, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(var3, this.nHeight - 5, (this.nWidth / 2|0) - var3, 5);
        let var4 : number = this.nWidth - ((60 - this.p2TouchingGoal) * this.nWidth / 120|0);
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.screen.fillRect(var4, this.nHeight - 5, this.nWidth, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect((this.nWidth / 2|0), this.nHeight - 5, var4 - (this.nWidth / 2|0), 5);
    }

    /*public*/ DrawStatus() {
        let var1 : Graphics = this.screen;
        let var2 : FontMetrics = this.screen.getFontMetrics();
        let var3 : string = null;
        let var4 : string = this.MakeTime(this.gameTime);
        let var5 : number = (this.nHeight / 20|0);
        let var6 : number = 0;
        let var7 : number = var2.stringWidth(var4);
        if(this.worldCup) {
            switch((this.worldCupRound)) {
            case 1:
                var3 = "Quarter Finals";
                break;
            case 2:
                var3 = "Semi-Finals";
                break;
            case 3:
                var3 = "Final";
                break;
            default:
                var3 = "Qualifying";
            }
            if(this.fGoldenGoal) {
                var3 = var3 + " [Golden Goal]";
            } else if(this.fExtraTime) {
                var3 = var3 + " [Extra Time]";
            }
            var6 = var2.stringWidth(var3);
        }
        let var8 : number = var6 > var7?var6:var7;
        var1.setColor(Color.fromString("blue"));
        var1.fillRect((this.nWidth / 2|0) - (var8 / 2|0) - 5, 0, var8 + 10, var5 + 22);
        var1.setColor(Color.fromString("white"));
        this.screen.drawString(var4, (this.nWidth / 2|0) - (var7 / 2|0), var2.getAscent() + 20);
        if(var3 != null) {
            this.screen.drawString(var3, (this.nWidth / 2|0) - (var6 / 2|0), var2.getAscent() + 20 - var2.getHeight());
        }
    }

    public drawPrompt$() {
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 6, this.nWidth, (this.nHeight / 5|0) - 10);
        this.drawPrompt$java_lang_String$int(this.promptMsg, 0);
    }

    public drawPrompt$java_lang_String$int(var1 : string, var2 : number) {
        let var3 : FontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("lightGray"));
        this.screen.drawString(var1, ((this.nWidth - var3.stringWidth(var1)) / 2|0), (this.nHeight * 4 / 5|0) + var3.getHeight() * (var2 + 1) + 10);
    }

    public drawPrompt(var1? : any, var2? : any) : any {
        if(((typeof var1 === 'string') || var1 === null) && ((typeof var2 === 'number') || var2 === null)) {
            return <any>this.drawPrompt$java_lang_String$int(var1, var2);
        } else if(var1 === undefined && var2 === undefined) {
            return <any>this.drawPrompt$();
        } else throw new Error('invalid overload');
    }

    /*public*/ promptBox(var1 : string, var2 : string) {
        let var3 : FontMetrics = this.screen.getFontMetrics();
        let var4 : number = var3.stringWidth(var1);
        let var5 : number = var3.stringWidth(var2);
        let var6 : number = var4 > var5?var4:var5;
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect((this.nWidth / 2|0) - (var6 / 2|0) - 20, (this.nHeight * 2 / 5|0), var6 + 40, (this.nHeight / 5|0));
        this.screen.setColor(Color.fromString("white"));
        this.screen.drawString(var1, (this.nWidth / 2|0) - (var4 / 2|0), (this.nHeight * 9 / 20|0));
        this.screen.drawString(var2, (this.nWidth / 2|0) - (var5 / 2|0), (this.nHeight * 11 / 20|0));
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
        let var1 : Graphics = this.screen;
        let var2 : number = (this.nHeight / 20|0);
        let var3 : FontMetrics = this.screen.getFontMetrics();
        var3.stringWidth("Replay...");
        var1.setColor(Color.fromString("blue"));
        var1.fillRect(0, 0, this.nWidth, var2 + 22);
        var1.setColor(Color.fromString("white"));
        var1.drawString(this.slimeColText[this.p1Col] + " : " + this.p1Score, (this.nWidth / 20|0), var2);
        let var4 : string = this.p2Score + " : " + this.slimeColText[this.p2Col];
        var1.drawString(var4, this.nWidth - (this.nWidth / 20|0) - var3.stringWidth(var4), var2);
    }

    public checkScored() : boolean {
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
            let var1 : string;
            if(this.worldCup) {
                this.paint(this.getGraphics());
                do {
                    this.p2Col = (<number>(Math.random() * <number>this.slimaryCols.length / 4.0)|0) + (this.worldCupRound * this.slimaryCols.length / 4|0);
                } while((this.p1Col === this.p2Col));
                var1 = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
                switch((this.worldCupRound)) {
                case 0:
                    this.promptBox("Qualifying Round", var1);
                    this.gameLength = 30000;
                    break;
                case 1:
                    this.promptBox("Quarter Finals", var1);
                    this.gameLength = 120000;
                    break;
                case 2:
                    this.promptBox("Semi-Finals", var1);
                    this.gameLength = 120000;
                    break;
                case 3:
                    this.promptBox("World Cup Final", var1);
                    this.gameLength = 300000;
                }
                try {
                    Thread.sleep$long(4000);
                } catch(var3) {
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
                    var1 = this.p1Score === 0?" nil":" " + this.p1Score;
                    this.promptBox("The score is " + this.slimeColText[this.p1Col] + var1 + ", " + this.slimeColText[this.p2Col] + var1 + ".", "And the game goes into extra time...");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var8) {
                    };
                    this.repaint();
                    this.flip();
                    this.startTime += 30000;
                    this.gameTime += 30000;
                    this.fExtraTime = true;
                } else if(this.gameTime <= 0 && this.fExtraTime && !this.fGoldenGoal && this.p1Score === this.p2Score) {
                    this.fGoldenGoal = true;
                    var1 = this.p1Score === 0?" nil":" " + this.p1Score;
                    this.promptBox("The score is " + this.slimeColText[this.p1Col] + var1 + ", " + this.slimeColText[this.p2Col] + var1 + ", and the game goes into Golden Goal.", "The next player to score will win the match!");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var7) {
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
                    let var9 : number = System.currentTimeMillis();
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
                        } catch(var6) {
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
                    this.startTime += System.currentTimeMillis() - var9;
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
                    } catch(var5) {
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
            } catch(var4) {
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
        let var1 : FontMetrics = this.screen.getFontMetrics();
        let var2 : number = var1.stringWidth("Replay...");
        let var3 : number = var1.getHeight();
        let var4 : number = (this.nWidth / 2|0) - (var2 / 2|0);
        let var5 : number = (this.nHeight / 2|0) - var3;
        this.promptMsg = "Click the mouse to continue...";
        this.mousePressed = false;
        let var6 : number = this.replayPos - 1;
        while((!this.mousePressed)) {
            ++var6;
            if(var6 >= 200) {
                var6 = 0;
            }
            if(var6 === this.replayPos) {
                try {
                    Thread.sleep$long(1000);
                } catch(var7) {
                };
                var6 = this.replayStart;
                this.paint(this.getGraphics());
            }
            this.ReplayFrame(var6, var4, var5, var2, var3, false);
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
        let var1 : number = this.ballVY + (<number>Math.sqrt(<number>(this.ballVY * this.ballVY + 2 * this.ballY))|0);
        let var2 : number = this.ballX + var1 * this.ballVX;
        if(var2 < 0) {
            var2 = -var2;
        }
        if(var2 > 1000) {
            var2 = 1000 - var2;
        }
        return var2;
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
        let var1 : number = this.getBallBounceX();
        let var2 : number = this.getBallMaxY();
        if(var1 > 900) {
            this.p2XV = this.SLIMEVEL;
        }
        if(var1 + 20 < this.p2X) {
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
        if(var1 > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.p2Score >= this.p1Score && var1 < 200 && this.p2X > this.p1X || var1 < this.p1X + 50 && var1 > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = this.SLIMEVEL;
            }
            if(this.ballX > 800 && var1 > 950 && this.p2YV === 0 && var2 > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(var2 < 110) {
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
        let var1 : number = this.getBallBounceX();
        let var2 : number = this.getBallMaxY();
        if(this.p2X < 790) {
            this.p2XV = this.SLIMEVEL;
        } else if(this.p2X > 830) {
            this.p2XV = -this.SLIMEVEL;
        } else {
            this.p2XV = 0;
        }
        if(var1 > 900) {
            this.p2XV = this.SLIMEVEL;
        }
        if(var1 + 20 < this.p2X) {
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
        if(var1 > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = this.SLIMEVEL;
        }
        if(this.p2Score >= this.p1Score && var1 < 200 && this.p2X > this.p1X || var1 < this.p1X + 50 && var1 > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = this.SLIMEVEL;
            }
            if(this.ballX > 800 && var1 > 950 && this.p2YV === 0 && var2 > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(var2 < 110) {
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
        if(this.p2YV === 0 && this.p2X < 400 && var1 > 500 && var2 > 50) {
            this.p2YV = this.JUMPVEL;
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / this.SLIMEVEL|0)) {
            this.p2XV = -this.SLIMEVEL;
        }
    }

    /*public*/ controlP2v3() {
        let var1 : number = (this.SLIMEVEL * 4 / 3|0);
        let var2 : number = this.getBallBounceX();
        let var3 : number = this.getBallMaxY();
        if(this.p2X < 790) {
            this.p2XV = var1;
        } else if(this.p2X > 830) {
            this.p2XV = -var1;
        } else {
            this.p2XV = 0;
        }
        if(var2 > 900) {
            this.p2XV = var1;
        }
        if(var2 + 20 < this.p2X) {
            this.fP2Sticky = false;
            this.p2XV = -var1;
        }
        if(this.ballX > this.p2X - 10) {
            this.p2XV = var1;
        }
        if(this.ballX + 30 > this.p2X && this.p2YV === 0) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        if(var2 > this.p2X + 50 && this.p2YV === 0) {
            this.p2XV = var1;
        }
        if(this.ballX > this.p2X && this.ballX < 960) {
            this.fP2Sticky = true;
        }
        if(this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0) {
            this.p2XV = var1;
        }
        if(this.p2Score >= this.p1Score && var2 < 200 && this.p2X > this.p1X || var2 < this.p1X + 50 && var2 > this.p1X - 50 && (this.ballVY / 4|0) === 0 && this.p1X < 400 && this.p2X < 848) {
            if(this.p2X < 900) {
                this.p2XV = var1;
            }
            if(this.ballX > 800 && var2 > 950 && this.p2YV === 0 && var3 > 40) {
                this.p2YV = this.JUMPVEL;
            }
        }
        if(this.p2YV === this.JUMPVEL) {
            if(var3 < 110) {
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
            if(this.p2XV > 0 && var3 > 200 && var2 > this.p2X + 300) {
                this.p2YV = 0;
            }
        }
        if(this.p2YV === 0 && this.p2X < 400 && var2 > this.p2X + 400 && var3 > 50) {
            this.p2YV = this.JUMPVEL;
        }
        if(this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + ((this.p2X - 850) / var1|0)) {
            this.p2XV = -var1;
        }
    }

    /*public*/ method_rn_WorldCupSoccerSlime_p_1(var1 : string) {
        System.out.println$java_lang_Object(var1);
    }
}
WorldCupSoccerSlime["__class"] = "WorldCupSoccerSlime";
WorldCupSoccerSlime["__interfaces"] = ["Runnable"];



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