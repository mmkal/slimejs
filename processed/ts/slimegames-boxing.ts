import { Applet, Runnable, Color, Graphics, Thread, Image, FontMetrics, Random, ImageObserver, Event, Font, System, StringBuffer, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Boxing extends Applet implements Runnable {
    public recommended_width = 750;
    public recommended_height = 375;
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

    /*public*/ thirdColor : Color[];

    /*public*/ fourthColor : Color[];

    /*public*/ p1OldX : number;

    /*public*/ p2OldX : number;

    /*public*/ p1OldY : number;

    /*public*/ p2OldY : number;

    /*public*/ p1XV : number;

    /*public*/ p2XV : number;

    /*public*/ p1YV : number;

    /*public*/ p2YV : number;

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

    /*public*/ fSuperSlime2 : boolean;

    /*public*/ doubleBuffered : boolean;

    /*public*/ p1defend : boolean;

    /*public*/ p2defend : boolean;

    /*public*/ p1attack : boolean;

    /*public*/ p2attack : boolean;

    /*public*/ p1scores : boolean;

    /*public*/ p2scores : boolean;

    /*public*/ p1HP : number;

    /*public*/ p2HP : number;

    /*public*/ p1goingsuper : number;

    /*public*/ p2goingsuper : number;

    /*public*/ p1lookingleft : boolean;

    /*public*/ p2lookingleft : boolean;

    /*public*/ p1lookingright : boolean;

    /*public*/ p2lookingright : boolean;

    /*public*/ pointsX : number[];

    /*public*/ pointsY : number[];

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
        this.thirdColor = null;
        this.fourthColor = null;
        this.p1OldX = 0;
        this.p2OldX = 0;
        this.p1OldY = 0;
        this.p2OldY = 0;
        this.p1XV = 0;
        this.p2XV = 0;
        this.p1YV = 0;
        this.p2YV = 0;
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
        this.fSuperSlime2 = false;
        this.doubleBuffered = false;
        this.p1defend = false;
        this.p2defend = false;
        this.p1attack = false;
        this.p2attack = false;
        this.p1scores = false;
        this.p2scores = false;
        this.p1HP = 0;
        this.p2HP = 0;
        this.p1goingsuper = 0;
        this.p2goingsuper = 0;
        this.p1lookingleft = false;
        this.p2lookingleft = false;
        this.p1lookingright = false;
        this.p2lookingright = false;
        this.pointsX = null;
        this.pointsY = null;
        this.slimaryCols = [Color.fromString("cyan"), Color.fromString("red"), Color.fromString("green"), Color.fromString("white"), this.darkGreen, Color.fromString("white"), this.darkRed, this.darkRed, new Color(119, 41, 28), Color.fromString("yellow"), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), new Color(128, 128, 255), this.darkBlue, Color.fromString("white"), Color.fromString("red"), Color.fromString("white"), new Color(119, 41, 28), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), new Color(185, 30, 2), Color.fromString("white"), Color.fromString("red"), new Color(252, 239, 82), Color.fromString("white"), Color.fromString("red"), new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.fromString("white"), Color.fromString("blue")];
        this.secondaryCols = [Color.fromString("white"), Color.fromString("black"), Color.fromString("yellow"), new Color(128, 128, 255), Color.fromString("red"), Color.fromString("red"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), this.darkBlue, Color.fromString("green"), Color.fromString("blue"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), Color.fromString("blue"), Color.fromString("white"), Color.fromString("red"), this.darkGreen, Color.fromString("white"), new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.fromString("white"), Color.fromString("blue"), Color.fromString("red"), Color.fromString("white"), Color.fromString("black"), new Color(7, 177, 33), Color.fromString("red"), Color.fromString("black"), Color.fromString("blue")];
        this.thirdColor = [Color.fromString("red"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red")];
        this.fourthColor = [Color.fromString("black"), Color.fromString("white"), Color.fromString("white"), Color.fromString("black"), Color.fromString("white"), Color.fromString("black"), Color.fromString("white"), Color.fromString("black"), Color.fromString("black"), Color.fromString("white"), Color.fromString("white"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("white"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("black"), Color.fromString("white"), Color.fromString("black"), Color.fromString("black"), Color.fromString("white"), Color.fromString("black"), Color.fromString("black"), Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), Color.fromString("black"), Color.fromString("white")];
        this.frenzyCol = 0;
        this.SMILE_DIFF = 2;
        this.DAMPING = 7;
        this.MAX_TICKS_TOUCHING_GOAL = 60;
        this.worldCup = false;
        this.worldCupRound = 0;
        this.p1goingsuper = 0;
        this.p2goingsuper = 0;
        this.pointsX = [];
        this.pointsY = [];
        this.p2Col = 1;
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 8]);
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

    /*public*/ DrawGoals() {
    }

    /*public*/ DrawSlimers() {
        if(this.p1goingsuper >= 3) {
            this.fSuperSlime = true;
        } else {
            this.fSuperSlime = false;
        }
        if(this.p2goingsuper >= 3) {
            this.fSuperSlime2 = true;
        } else {
            this.fSuperSlime2 = false;
        }
        let var1 : number = (this.nWidth / 10|0);
        let var2 : number = (this.nHeight / 10|0);
        let var3 : number = (this.nWidth / 50|0);
        let var4 : number = (this.nHeight / 25|0);
        let var5 : number = 2000;
        let var6 : number = 4000;
        let var7 : number = (this.p1OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        let var8 : number = (7 * this.nHeight / 10|0) - (this.p1OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7 - 22, var8, var1 + 46, var2);
        var7 = (this.p2OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7 - 25, var8, var1 + 48, var2);
        var7 = (this.p1X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        if(this.p1lookingright) {
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
        } else if(this.p1lookingleft) {
            this.screen.setColor(this.fSuperSlime?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p1Col]);
            this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
            this.screen.setColor(this.secondaryCols[this.p1Col]);
            this.pointsX[0] = this.pointsX[2] = var7 + (var1 / 2|0);
            this.pointsX[1] = var7 + (var1 * 3 / 5|0);
            this.pointsX[3] = var7 + (var1 * 7 / 8|0);
            this.pointsY[0] = var8;
            this.pointsY[1] = this.pointsY[3] = var8 + (var2 / 2|0);
            this.pointsY[2] = var8 + var2;
            this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
        }
        let var9 : number = this.p1X + 38;
        let var10 : number = this.p1Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        let var11 : number = var7 - var5;
        let var12 : number = var8 - var6;
        let var13 : number = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        let var14 : boolean = Math.random() < 0.01;
        if(this.p1lookingright) {
            this.screen.setColor(this.thirdColor[this.p1Col]);
            if(this.p1defend) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 2, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 10, 25, 35);
            } else if(this.p1attack) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 2, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            } else {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 50, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            }
            this.screen.setColor(this.fourthColor[this.p1Col]);
            if(this.p1defend) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - -2, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 20, 15, 5);
            } else if(this.p1attack) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0), var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            } else {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 50, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            }
        } else if(this.p1lookingleft) {
            this.screen.setColor(this.thirdColor[this.p1Col]);
            if(this.p1defend) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 38 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 10, 25, 35);
            } else if(this.p1attack) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 48 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            } else {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 3 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            }
            this.screen.setColor(this.fourthColor[this.p1Col]);
            if(this.p1defend) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 33 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 20, 15, 5);
            } else if(this.p1attack) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 20 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            } else {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - -27 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            }
        }
        if(var14) {
            this.p1Blink = 5;
        }
        if(this.p1Blink === 0) {
            if(this.p1lookingright) {
                this.screen.setColor(Color.fromString("white"));
                this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
                if(var13 > 0 && !var14) {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.fillOval(var7 - (4 * var11 / var13|0) - 7, var8 - (1000 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
                }
            } else if(this.p1lookingleft) {
                this.screen.setColor(var14?Color.fromString("gray"):Color.fromString("white"));
                this.screen.fillOval(var7 - var3 - 40, var8 - var4, var3, var4);
                if(var13 > 0 && !var14) {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.fillOval(var7 - (4 * var11 / var13|0) - 17 - 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
                }
            }
        } else {
            --this.p1Blink;
        }
        let var15 : number;
        let var16 : number;
        let var17 : number;
        let var18 : number;
        let var19 : number;
        let var20 : number;
        let var21 : number;
        let var22 : number;
        let var23 : number;
        let var24 : number;
        if(this.p1HP > this.p2HP + 2) {
            var15 = (this.p1X * this.nWidth / 1000|0);
            var16 = (7 * this.nHeight / 10|0) - ((this.p1Y - 40) * this.nHeight / 1000|0);
            var17 = (this.nWidth / 20|0);
            var18 = (this.nHeight / 20|0);
            var19 = 0;
            var20 = (this.nWidth / 20|0);
            var21 = (this.nHeight / 20|0);
            var22 = (this.p1X * this.nWidth / 1000|0) - var20;
            var23 = (7 * this.nHeight / 10|0) - ((this.p1Y - 40) * this.nHeight / 1000|0);
            var24 = 0;
            if(this.p1lookingleft) {
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(var22, var23 + var24, var20, var21, -10, -150);
                    ++var24;
                } while((var24 < 3));
            } else if(this.p1lookingright) {
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
                    ++var19;
                } while((var19 < 3));
            }
        }
        var7 = (this.p2X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        if(this.p2lookingright) {
            this.screen.setColor(this.fSuperSlime2?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p2Col]);
            this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
            this.screen.setColor(this.secondaryCols[this.p2Col]);
            this.pointsX[0] = this.pointsX[2] = var7 + (var1 / 2|0);
            this.pointsX[1] = var7 + (var1 * 2 / 5|0);
            this.pointsX[3] = var7 + (var1 / 8|0);
            this.pointsY[0] = var8;
            this.pointsY[1] = this.pointsY[3] = var8 + (var2 / 2|0);
            this.pointsY[2] = var8 + var2;
            this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
        } else if(this.p2lookingleft) {
            this.screen.setColor(this.fSuperSlime2?this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length]:this.slimaryCols[this.p2Col]);
            this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
            this.screen.setColor(this.secondaryCols[this.p2Col]);
            this.pointsX[0] = this.pointsX[2] = var7 + (var1 / 2|0);
            this.pointsX[1] = var7 + (var1 * 3 / 5|0);
            this.pointsX[3] = var7 + (var1 * 7 / 8|0);
            this.pointsY[0] = var8;
            this.pointsY[1] = this.pointsY[3] = var8 + (var2 / 2|0);
            this.pointsY[2] = var8 + var2;
            this.screen.fillPolygon$int_A$int_A$int(this.pointsX, this.pointsY, 4);
        }
        var9 = this.p2X - 18;
        var10 = this.p2Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        var11 = var7 - var5;
        var12 = var8 - var6;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        var14 = Math.random() < 0.01;
        if(this.p2lookingright) {
            this.screen.setColor(this.thirdColor[this.p2Col]);
            if(this.p2defend) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 2 + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 10, 25, 35);
            } else if(this.p2attack) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 2 + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            } else {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 50 + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            }
            this.screen.setColor(this.fourthColor[this.p2Col]);
            if(this.p2defend) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - -2 + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 20, 15, 5);
            } else if(this.p2attack) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            } else {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 50 + 40, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            }
        } else if(this.p2lookingleft) {
            this.screen.setColor(this.thirdColor[this.p2Col]);
            if(this.p2defend) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 38, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 10, 25, 35);
            } else if(this.p2attack) {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 48, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            } else {
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - 3, var8 - (1000 / var13|0) - (3 * var4 / 4|0) - 2, 35, 25);
            }
            this.screen.setColor(this.fourthColor[this.p2Col]);
            if(this.p2defend) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 33, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 20, 15, 5);
            } else if(this.p2attack) {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - 20, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            } else {
                this.screen.fillRect(var7 - (4 * var11 / var13|0) - -27, var8 - (1000 / var13|0) - (3 * var4 / 4|0) + 3, 5, 15);
            }
        }
        if(var14) {
            this.p2Blink = 5;
        }
        if(this.p2Blink === 0) {
            this.screen.setColor(var14?Color.fromString("gray"):Color.fromString("white"));
            if(this.p2lookingleft) {
                this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            } else if(this.p2lookingright) {
                this.screen.fillOval(var7 - var3 + 40, var8 - var4, var3, var4);
            }
            if(var13 > 0 && !var14) {
                this.screen.setColor(Color.fromString("black"));
                if(this.p2lookingleft) {
                    this.screen.fillOval(var7 - (4 * var11 / var13|0) - 17, var8 - (1000 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
                } else if(this.p2lookingright) {
                    this.screen.fillOval(var7 - (4 * var11 / var13|0) - 17 + 50, var8 - (1000 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
                }
            }
        } else {
            --this.p2Blink;
        }
        if(this.p2HP > this.p1HP + 2) {
            var15 = (this.p2X * this.nWidth / 1000|0);
            var16 = (7 * this.nHeight / 10|0) - ((this.p2Y - 40) * this.nHeight / 1000|0);
            var17 = (this.nWidth / 20|0);
            var18 = (this.nHeight / 20|0);
            var19 = 0;
            var20 = (this.nWidth / 20|0);
            var21 = (this.nHeight / 20|0);
            var22 = (this.p2X * this.nWidth / 1000|0) - var20;
            var23 = (7 * this.nHeight / 10|0) - ((this.p2Y - 40) * this.nHeight / 1000|0);
            var24 = 0;
            if(this.p2lookingleft) {
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(var22, var23 + var24, var20, var21, -10, -150);
                    ++var24;
                } while((var24 < 3));
            } else if(this.p2lookingright) {
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
                    ++var19;
                } while((var19 < 3));
            }
        }
        if(this.p2HP <= 9) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(410, 35, 30, 28);
        }
        if(this.p2HP <= 8) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(441, 35, 30, 28);
        }
        if(this.p2HP <= 7) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(476, 35, 30, 28);
        }
        if(this.p2HP <= 6) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(511, 35, 30, 28);
        }
        if(this.p2HP <= 5) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(546, 35, 30, 28);
        }
        if(this.p2HP <= 4) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(581, 35, 30, 28);
        }
        if(this.p2HP <= 3) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(616, 35, 30, 28);
        }
        if(this.p2HP <= 2) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(651, 35, 30, 28);
        }
        if(this.p2HP <= 1) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(686, 35, 30, 28);
        }
        if(this.p2HP <= 0) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(721, 35, 30, 28);
        }
        if(this.p1HP <= 9) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(0, 35, 30, 28);
        }
        if(this.p1HP <= 8) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(31, 35, 30, 28);
        }
        if(this.p1HP <= 7) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(66, 35, 30, 28);
        }
        if(this.p1HP <= 6) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(101, 35, 30, 28);
        }
        if(this.p1HP <= 5) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(136, 35, 30, 28);
        }
        if(this.p1HP <= 4) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(171, 35, 30, 28);
        }
        if(this.p1HP <= 3) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(206, 35, 30, 28);
        }
        if(this.p1HP <= 2) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(241, 35, 30, 28);
        }
        if(this.p1HP <= 1) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(276, 35, 30, 28);
        }
        if(this.p1HP <= 0) {
            this.screen.setColor(Color.fromString("red"));
            this.screen.fillOval(311, 35, 30, 28);
        }
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
        var1.fillRect((this.nWidth / 2|0) - (var8 / 2|0) - 5, 80, var8 + 105, var5 + 22);
        var1.setColor(Color.fromString("white"));
        this.screen.drawString(var4, (this.nWidth / 2|0) - (var7 / 2|0), var2.getAscent() + 80);
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
        if(this.p1attack && this.p2attack && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 160 && this.p1X < this.p2X + 160) {
                    this.p1X = this.p2OldX - 160;
                    this.p2X = this.p1OldX + 160;
                }
            } else if(this.p2X > this.p1X - 160 && this.p2X < this.p1X + 160) {
                this.p1X = this.p2OldX + 160;
                this.p2X = this.p1OldX - 160;
            }
        }
        if(this.p1attack && !this.p2attack && !this.p2defend || !this.p1attack && !this.p1defend && this.p2attack && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 120 && this.p1X < this.p2X + 120) {
                    this.p1X = this.p2OldX - 120;
                    this.p2X = this.p1OldX + 120;
                }
            } else if(this.p2X > this.p1X - 120 && this.p2X < this.p1X + 120) {
                this.p1X = this.p2OldX + 120;
                this.p2X = this.p1OldX - 120;
            }
        }
        if(this.p1defend && !this.p2attack && !this.p2defend || !this.p1attack && !this.p1defend && this.p2defend && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 110 && this.p1X < this.p2X + 110) {
                    this.p1X = this.p2OldX - 110;
                    this.p2X = this.p1OldX + 110;
                }
            } else if(this.p2X > this.p1X - 110 && this.p2X < this.p1X + 110) {
                this.p1X = this.p2OldX + 110;
                this.p2X = this.p1OldX - 110;
            }
        }
        if(this.p1defend && this.p2defend && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 135 && this.p1X < this.p2X + 135) {
                    this.p1X = this.p2OldX - 135;
                    this.p2X = this.p1OldX + 135;
                }
            } else if(this.p2X > this.p1X - 135 && this.p2X < this.p1X + 135) {
                this.p1X = this.p2OldX + 135;
                this.p2X = this.p1OldX - 135;
            }
        }
        if(!this.p1defend && !this.p1attack && !this.p2defend && !this.p2attack && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 100 && this.p1X < this.p2X + 100) {
                    this.p1X = this.p2OldX - 100;
                    this.p2X = this.p1OldX + 100;
                }
            } else if(this.p2X > this.p1X - 100 && this.p2X < this.p1X + 100) {
                this.p1X = this.p2OldX + 100;
                this.p2X = this.p1OldX - 100;
            }
        }
        if(this.p1defend && this.p2attack || this.p1attack && this.p2defend && this.p1Y === this.p2Y) {
            if(this.p1X < this.p2X) {
                if(this.p1X > this.p2X - 150 && this.p1X < this.p2X + 150) {
                    this.p1X = this.p2OldX - 150;
                    this.p2X = this.p1OldX + 150;
                }
            } else if(this.p2X > this.p1X - 150 && this.p2X < this.p1X + 150) {
                this.p1X = this.p2OldX + 150;
                this.p2X = this.p1OldX - 150;
            }
        }
    }

    /*public*/ ReplayFrame(var1 : number, var2 : number, var3 : number, var4 : number, var5 : number, var6 : boolean) {
        if(var6) {
            this.p1OldX = this.p1OldY = this.p2OldX = this.p2OldY = -10000;
        } else {
            let var7 : number = var1 !== 0?var1 - 1:199;
            this.p1OldX = this.replayData[var7][0];
            this.p1OldY = this.replayData[var7][1];
            this.p2OldX = this.replayData[var7][2];
            this.p2OldY = this.replayData[var7][3];
        }
        this.p1X = this.replayData[var1][0];
        this.p1Y = this.replayData[var1][1];
        this.p2X = this.replayData[var1][2];
        this.p2Y = this.replayData[var1][3];
        this.p1Col = this.replayData[var1][4];
        this.p2Col = this.replayData[var1][5];
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

    /*public*/ SaveReplayData() {
        this.replayData[this.replayPos][0] = this.p1X;
        this.replayData[this.replayPos][1] = this.p1Y;
        this.replayData[this.replayPos][2] = this.p2X;
        this.replayData[this.replayPos][3] = this.p2Y;
        this.replayData[this.replayPos][4] = this.p1Col;
        this.replayData[this.replayPos][5] = this.p2Col;
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

    public checkScored() : boolean {
        return false;
    }

    /*public*/ controlP2v0() {
        let var1 : Random = new Random();
        let var2 : number = var1.nextInt(4) + 1;
        if(this.p2X < this.p1X) {
            if(var2 === 1) {
                this.p2XV = -this.SLIMEVEL;
                this.p2lookingleft = true;
                this.p2lookingright = false;
            } else {
                this.p2XV = this.SLIMEVEL;
                this.p2lookingleft = false;
                this.p2lookingright = true;
            }
        } else if(var2 === 1) {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
        } else {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
        }
        if(this.p1X > this.p2X - 160) {
            let var3 : number = var1.nextInt(10) + 1;
            if(var3 === 1) {
                this.p2attack = true;
                this.p2defend = false;
                if(this.p2X < this.p1X) {
                    if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                        this.p2scores = true;
                        ++this.p2goingsuper;
                        this.p1goingsuper = 0;
                    }
                } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                    this.p2scores = true;
                    ++this.p2goingsuper;
                    this.p1goingsuper = 0;
                }
            } else if(var3 === 2) {
                this.p2defend = true;
                this.p2attack = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            } else {
                this.p2attack = false;
                this.p2defend = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            }
        }
    }

    /*public*/ controlP2v1() {
        let var1 : Random = new Random();
        let var2 : number = var1.nextInt(3) + 1;
        if(this.p2X < this.p1X) {
            if(var2 === 1) {
                this.p2XV = -this.SLIMEVEL;
                this.p2lookingleft = true;
                this.p2lookingright = false;
            } else {
                this.p2XV = this.SLIMEVEL;
                this.p2lookingleft = false;
                this.p2lookingright = true;
            }
        } else if(var2 === 1) {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
        } else {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
        }
        if(this.p1X > this.p2X - 160) {
            let var3 : number = var1.nextInt(10) + 1;
            if(var3 >= 1 && var3 <= 2) {
                this.p2attack = true;
                this.p2defend = false;
                if(this.p2X < this.p1X) {
                    if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                        this.p2scores = true;
                        ++this.p2goingsuper;
                        this.p1goingsuper = 0;
                    }
                } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                    this.p2scores = true;
                    ++this.p2goingsuper;
                    this.p1goingsuper = 0;
                }
            } else if(var3 >= 3 && var3 <= 4) {
                this.p2defend = true;
                this.p2attack = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            } else {
                this.p2attack = false;
                this.p2defend = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            }
        }
    }

    /*public*/ controlP2v2() {
        let var1 : Random = new Random();
        let var2 : number = var1.nextInt(2) + 1;
        if(this.p2X < this.p1X) {
            if(var2 === 1) {
                this.p2XV = -this.SLIMEVEL;
                this.p2lookingleft = true;
                this.p2lookingright = false;
            } else {
                this.p2XV = this.SLIMEVEL;
                this.p2lookingleft = false;
                this.p2lookingright = true;
            }
        } else if(var2 === 1) {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
        } else {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
        }
        if(this.p1X > this.p2X - 160) {
            let var3 : number = var1.nextInt(10) + 1;
            if(var3 >= 1 && var3 <= 3) {
                this.p2attack = true;
                this.p2defend = false;
                if(this.p2X < this.p1X) {
                    if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                        this.p2scores = true;
                        ++this.p2goingsuper;
                        this.p1goingsuper = 0;
                    }
                } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                    this.p2scores = true;
                    ++this.p2goingsuper;
                    this.p1goingsuper = 0;
                }
            } else if(var3 >= 4 && var3 <= 5) {
                this.p2defend = true;
                this.p2attack = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            } else {
                this.p2attack = false;
                this.p2defend = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            }
        }
    }

    /*public*/ controlP2v3() {
        let var1 : Random = new Random();
        let var2 : number = var1.nextInt(4) + 1;
        if(this.p2X < this.p1X) {
            if(var2 === 1) {
                this.p2XV = -this.SLIMEVEL;
                this.p2lookingleft = true;
                this.p2lookingright = false;
            } else {
                this.p2XV = this.SLIMEVEL;
                this.p2lookingleft = false;
                this.p2lookingright = true;
            }
        } else if(var2 === 1) {
            this.p2XV = this.SLIMEVEL;
            this.p2lookingleft = false;
            this.p2lookingright = true;
        } else {
            this.p2XV = -this.SLIMEVEL;
            this.p2lookingleft = true;
            this.p2lookingright = false;
        }
        if(this.p1X > this.p2X - 160) {
            let var3 : number = var1.nextInt(10) + 1;
            if(var3 >= 1 && var3 <= 3) {
                this.p2attack = true;
                this.p2defend = false;
                if(this.p2X < this.p1X) {
                    if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                        this.p2scores = true;
                        ++this.p2goingsuper;
                        this.p1goingsuper = 0;
                    }
                } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                    this.p2scores = true;
                    ++this.p2goingsuper;
                    this.p1goingsuper = 0;
                }
            } else if(var3 >= 4 && var3 <= 6) {
                this.p2defend = true;
                this.p2attack = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            } else {
                this.p2attack = false;
                this.p2defend = false;
                if(this.p2scores) {
                    if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                        this.p1HP -= 2;
                    } else {
                        --this.p1HP;
                    }
                    this.p2scores = false;
                }
            }
        }
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
    }

    /*public*/ drawButtons() {
        let var1 : string[] = ["1 minute", "2 minutes", "4 minutes", "8 minutes", "Tournament"];
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

    /*public*/ drawScores() {
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillRect(0, 20, 340, 56);
        this.screen.setColor(Color.fromString("green"));
        this.screen.fillOval(0, 35, 30, 28);
        this.screen.fillOval(31, 35, 30, 28);
        this.screen.fillOval(66, 35, 30, 28);
        this.screen.fillOval(101, 35, 30, 28);
        this.screen.fillOval(136, 35, 30, 28);
        this.screen.fillOval(171, 35, 30, 28);
        this.screen.fillOval(206, 35, 30, 28);
        this.screen.fillOval(241, 35, 30, 28);
        this.screen.fillOval(276, 35, 30, 28);
        this.screen.fillOval(311, 35, 30, 28);
        this.screen.setColor(Color.fromString("black"));
        this.screen.fillRect(410, 20, 340, 56);
        this.screen.setColor(Color.fromString("green"));
        this.screen.fillOval(410, 35, 30, 28);
        this.screen.fillOval(441, 35, 30, 28);
        this.screen.fillOval(476, 35, 30, 28);
        this.screen.fillOval(511, 35, 30, 28);
        this.screen.fillOval(546, 35, 30, 28);
        this.screen.fillOval(581, 35, 30, 28);
        this.screen.fillOval(616, 35, 30, 28);
        this.screen.fillOval(651, 35, 30, 28);
        this.screen.fillOval(686, 35, 30, 28);
        this.screen.fillOval(721, 35, 30, 28);
        let var1 : Graphics = this.screen;
        let var2 : number = (this.nHeight / 20|0);
        let var3 : FontMetrics = this.screen.getFontMetrics();
        let var4 : number = var3.stringWidth("Replay...");
        var1.setColor(Color.fromString("blue"));
        var1.setColor(Color.fromString("white"));
        var1.drawString(this.slimeColText[this.p1Col] + " : ", 0, var2);
        let var5 : string = this.p2Score + " : " + this.slimeColText[this.p2Col];
        var1.drawString(this.slimeColText[this.p2Col] + " : ", 410, var2);
    }

    /*public*/ flip() {
        if(this.doubleBuffered) {
            this.getGraphics().drawImage(this.backBuffer, 0, 0, <ImageObserver>null);
        }
    }

    /*public*/ getBallBounceX() : number {
        return 0;
    }

    /*public*/ getBallMaxY() : number {
        return 0;
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            if(this.fCanChangeCol) {
                switch((var1.key)) {
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
                    this.p1lookingleft = true;
                    this.p1lookingright = false;
                    return false;
                case 66:
                case 98:
                    this.toggleBuffering();
                    return false;
                case 68:
                case 100:
                    this.p1XV = this.SLIMEVEL;
                    this.p1lookingleft = false;
                    this.p1lookingright = true;
                    return false;
                case 69:
                case 101:
                    if(this.p1Y === 0) {
                        this.p1YV = this.JUMPVEL;
                    }
                    return false;
                case 73:
                case 105:
                case 1004:
                    if(!this.worldCup) {
                        this.p2attack = true;
                        if(this.p2X < this.p1X) {
                            if(this.p2X > this.p1X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                                this.p2scores = true;
                                ++this.p2goingsuper;
                                this.p1goingsuper = 0;
                                return false;
                            }
                        } else if(this.p1X > this.p2X - 120 && (!this.p1defend && !this.p1attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                            this.p2scores = true;
                            ++this.p2goingsuper;
                            this.p1goingsuper = 0;
                            return false;
                        }
                        return false;
                    }
                    return false;
                case 74:
                case 106:
                case 1006:
                    if(!this.worldCup) {
                        this.p2XV = -this.SLIMEVEL;
                        this.p2lookingleft = true;
                        this.p2lookingright = false;
                    }
                    return false;
                case 75:
                case 107:
                case 1005:
                    if(!this.worldCup) {
                        this.p2defend = true;
                    }
                    return false;
                case 76:
                case 108:
                case 1007:
                    if(!this.worldCup) {
                        this.p2XV = this.SLIMEVEL;
                        this.p2lookingleft = false;
                        this.p2lookingright = true;
                    }
                    return false;
                case 83:
                case 115:
                    this.p1defend = true;
                    return false;
                case 85:
                case 117:
                    if(this.p2Y === 0 && !this.worldCup) {
                        this.p2YV = this.JUMPVEL;
                    }
                    return false;
                case 87:
                case 119:
                    this.p1attack = true;
                    if(this.p1X < this.p2X) {
                        if(this.p1X > this.p2X - 120 && (!this.p2defend && !this.p2attack || this.p1lookingright && this.p2lookingright) && this.p1Y === this.p2Y) {
                            this.p1scores = true;
                            ++this.p1goingsuper;
                            this.p2goingsuper = 0;
                        }
                    } else if(this.p2X > this.p1X - 120 && (!this.p2defend && !this.p2attack || this.p1lookingleft && this.p2lookingleft) && this.p1Y === this.p2Y) {
                        this.p1scores = true;
                        ++this.p1goingsuper;
                        this.p2goingsuper = 0;
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
            case 73:
            case 105:
            case 1004:
                if(!this.worldCup) {
                    this.p2attack = false;
                    if(this.p2scores) {
                        if(this.fSuperSlime2 && this.p2goingsuper >= 4) {
                            this.p1HP -= 2;
                        } else {
                            --this.p1HP;
                        }
                        this.p2scores = false;
                        return false;
                    }
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
                this.p2defend = false;
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
                this.p1defend = false;
                return false;
            case 87:
            case 119:
                this.p1attack = false;
                if(this.p1scores) {
                    if(this.fSuperSlime && this.p1goingsuper >= 4) {
                        this.p2HP -= 2;
                    } else {
                        --this.p2HP;
                    }
                    this.p1scores = false;
                }
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
            this.showStatus("Boxing Slime by Mohamed Seyam");
            this.requestFocus();
        }
        return false;
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

    public initStuff() {
        this.p1lookingright = true;
        this.p1lookingleft = false;
        this.p2lookingright = false;
        this.p2lookingleft = true;
        this.p1attack = false;
        this.p2attack = false;
        this.p1defend = false;
        this.p2defend = false;
        this.p1HP = 10;
        this.p2HP = 10;
        this.p1goingsuper = 0;
        this.p2goingsuper = 0;
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

    /*public*/ method_rn_Boxing_p_1(var1 : string) {
        System.out.println$java_lang_Object(var1);
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
                this.screen.drawString("Super Slime Boxing!", (this.nWidth / 2|0) - (var2.stringWidth("Super Slime Boxing!") / 2|0), (this.nHeight / 2|0) - var2.getHeight());
            } else {
                this.screen.drawString("Slime Boxing!", (this.nWidth / 2|0) - (var2.stringWidth("Slime Boxing!") / 2|0), (this.nHeight / 2|0) - var2.getHeight());
            }
            this.screen.setColor(Color.fromString("white"));
            var2 = this.screen.getFontMetrics();
            this.screen.drawString("Original Code by Quin Pendragon", (this.nWidth / 2|0) - (var2.stringWidth("Original Code by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 2);
            this.screen.drawString("Modified by Mohamed Seyam", (this.nWidth / 2|0) - (var2.stringWidth("Modified by Mohamed Seyam") / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 2 + 20);
            this.screen.drawString("October 11, 2003", (this.nWidth / 2|0) - (var2.stringWidth("October 11, 2003") / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 2 + 40);
        }
        this.flip();
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
            if(this.worldCup) {
                this.paint(this.getGraphics());
                do {
                    this.p2Col = (<number>(Math.random() * <number>this.slimaryCols.length / 4.0)|0) + (this.worldCupRound * this.slimaryCols.length / 4|0);
                } while((this.p1Col === this.p2Col));
                let var1 : string = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
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
                    this.promptBox("Tournament Final", var1);
                    this.gameLength = 300000;
                }
                try {
                    Thread.sleep$long(4000);
                } catch(var3) {
                };
                this.repaint();
                this.flip();
            }
            while((this.gameTime > 0 || this.worldCup && this.worldCupRound > 0 && this.p1HP === this.p2HP && this.p1HP > 0 && this.p2HP > 0)) {
                this.gameTime = this.startTime + Math.floor(<number>this.gameLength) - System.currentTimeMillis();
                if(this.gameTime < 0) {
                    this.gameTime = 0;
                }
                let var10000 : string;
                if(this.worldCup && !this.fExtraTime && this.gameTime <= 0 && this.worldCupRound > 0 && this.p1HP === this.p2HP) {
                    if(this.p1Score === 0) {
                        var10000 = " nil";
                    } else {
                        (new StringBuffer(" ")).append(this.p1Score).toString();
                    }
                    this.promptBox("Both players have the same amount of HP.", "And the game goes into extra time...");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var6) {
                    };
                    this.repaint();
                    this.flip();
                    this.startTime += 30000;
                    this.gameTime += 30000;
                    this.fExtraTime = true;
                } else if(this.gameTime <= 0 && this.fExtraTime && !this.fGoldenGoal && this.p1HP === this.p2HP) {
                    this.fGoldenGoal = true;
                    if(this.p1Score === 0) {
                        var10000 = " nil";
                    } else {
                        (new StringBuffer(" ")).append(this.p1Score).toString();
                    }
                    this.promptBox("Both players have the same HP again.", "The next player to land a punch will win the match!");
                    try {
                        Thread.sleep$long(4000);
                    } catch(var5) {
                    };
                    this.repaint();
                    this.flip();
                }
                this.SaveReplayData();
                this.p1OldX = this.p1X;
                this.p1OldY = this.p1Y;
                this.p2OldX = this.p2X;
                this.p2OldY = this.p2Y;
                this.MoveSlimers();
                this.DrawSlimers();
                this.DrawGoals();
                this.DrawStatus();
                if(this.p1HP <= 0 || this.p2HP <= 0) {
                    break;
                }
                this.flip();
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
                    this.startTime += System.currentTimeMillis() - var9;
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
                    this.promptMsg = this.slimeColText[this.p2Col] + " scores at the last second!";
                } else {
                    ++this.p1Score;
                    this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
                }
                this.drawPrompt();
            } else {
                this.drawPrompt$java_lang_String$int("And that\'s the end!", 0);
            }
            if(this.worldCup) {
                if(this.p1HP === this.p2HP) {
                    this.drawPrompt$java_lang_String$int("It\'s a draw at full time, here at Slime Arena!", 1);
                    this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
                    this.worldCup = false;
                    this.flip();
                } else if(this.p1HP >= this.p2HP) {
                    switch((this.worldCupRound)) {
                    case 0:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " qualifies for the Tournament!", 1);
                        break;
                    case 1:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                        break;
                    case 2:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                        break;
                    case 3:
                        this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " wins the Tournament!!!!!", 1);
                    }
                    if(this.worldCupRound === 3) {
                        this.worldCup = false;
                        this.promptBox("You win the Tournament!!!", "Congratulations!");
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
            } else if(this.p1HP === this.p2HP) {
                this.drawPrompt$java_lang_String$int("It\'s a draw at full time, here at Slime Arena!", 1);
            } else if(this.p1HP < this.p2HP) {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p2Col] + " def. " + this.slimeColText[this.p1Col], 1);
            } else if(this.p2HP < this.p1HP) {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + " def. " + this.slimeColText[this.p2Col], 1);
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

    /*public*/ toggleBuffering() {
        if(this.doubleBuffered != true) {
            this.screen = this.backBuffer.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        } else {
            this.screen = this.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        }
        this.repaint();
    }
}
Boxing["__class"] = "Boxing";
Boxing["__interfaces"] = ["Runnable"];



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