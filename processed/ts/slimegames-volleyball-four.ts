import { Applet, Runnable, Image, AudioClip, Color, Graphics, Thread, FontMetrics, Event, Font, System, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Slime2P2 extends Applet implements Runnable {
    public recommended_width = 700;
    public recommended_height = 350;
    /*public*/ image : Image;

    /*public*/ ScoreSound : AudioClip;

    /*public*/ TouchSlime1 : AudioClip;

    /*public*/ TouchSlime2 : AudioClip;

    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ topScore : number = 10;

    /*public*/ nScore : number;

    /*public*/ nPointsScored : number;

    /*public*/ p1X : number;

    /*public*/ p2X : number;

    /*public*/ p3X : number;

    /*public*/ p4X : number;

    /*public*/ p1Y : number;

    /*public*/ p2Y : number;

    /*public*/ p3Y : number;

    /*public*/ p4Y : number;

    /*public*/ p1Col : number;

    /*public*/ p2Col : number;

    /*public*/ p3Col : number;

    /*public*/ p4Col : number;

    /*public*/ slimeColours : Color[];

    /*public*/ slimeColText : string[] = ["Team Slimonds ", "Team Green Magic ", "The Golden Boyz ", "Gaw\'s Troop ", "The Masters "];

    /*public*/ p1OldX : number;

    /*public*/ p2OldX : number;

    /*public*/ p3OldX : number;

    /*public*/ p4OldX : number;

    /*public*/ p1OldY : number;

    /*public*/ p2OldY : number;

    /*public*/ p3OldY : number;

    /*public*/ p4OldY : number;

    /*public*/ p1XV : number;

    /*public*/ p2XV : number;

    /*public*/ p3XV : number;

    /*public*/ p4XV : number;

    /*public*/ p1YV : number;

    /*public*/ p2YV : number;

    /*public*/ p3YV : number;

    /*public*/ p4YV : number;

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

    /*public*/ p3Blink : number;

    /*public*/ p4Blink : number;

    /*public*/ fP1Touched : boolean;

    /*public*/ fP2Touched : boolean;

    /*public*/ fP3Touched : boolean;

    /*public*/ fP4Touched : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ startTime : number;

    /*public*/ gameTime : number;

    /*public*/ scoringRun : number;

    /*public*/ frenzyCol : number = 0;

    /*public*/ scoringRunForSuper : number = 12;

    public constructor() {
        super();
        this.image = null;
        this.ScoreSound = null;
        this.TouchSlime1 = null;
        this.TouchSlime2 = null;
        this.nWidth = 0;
        this.nHeight = 0;
        this.nScore = 0;
        this.nPointsScored = 0;
        this.p1X = 0;
        this.p2X = 0;
        this.p3X = 0;
        this.p4X = 0;
        this.p1Y = 0;
        this.p2Y = 0;
        this.p3Y = 0;
        this.p4Y = 0;
        this.p1Col = 0;
        this.p2Col = 0;
        this.p3Col = 0;
        this.p4Col = 0;
        this.slimeColours = null;
        this.p1OldX = 0;
        this.p2OldX = 0;
        this.p3OldX = 0;
        this.p4OldX = 0;
        this.p1OldY = 0;
        this.p2OldY = 0;
        this.p3OldY = 0;
        this.p4OldY = 0;
        this.p1XV = 0;
        this.p2XV = 0;
        this.p3XV = 0;
        this.p4XV = 0;
        this.p1YV = 0;
        this.p2YV = 0;
        this.p3YV = 0;
        this.p4YV = 0;
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
        this.p3Blink = 0;
        this.p4Blink = 0;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.fP3Touched = false;
        this.fP4Touched = false;
        this.gameThread = null;
        this.fEndGame = false;
        this.startTime = 0;
        this.gameTime = 0;
        this.scoringRun = 0;
        this.p2Col = this.p3Col = 1;
        this.p1Col = this.p4Col = 0;
        this.slimeColours = [Color.fromString("red"), Color.fromString("green"), Color.fromString("yellow"), Color.fromString("white"), Color.fromString("black")];
    }

    /*public*/ DoFatality() {
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
        var7 = (this.p4OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p4OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7, var8, var1, var2);
        var7 = (this.p2OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7, var8, var1, var2);
        var7 = (this.p3OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p3OldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(var7, var8, var1, var2);
        this.MoveBall();
        var7 = (this.p1X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun <= -12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
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
        var7 = (this.p4X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p4Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun <= -12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p1Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
        var9 = this.p4X + 38;
        var10 = this.p4Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        var11 = var7 - var5;
        var12 = var8 - var6;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        var14 = Math.random() < 0.01;
        if(var14) {
            this.p4Blink = 5;
        }
        if(this.p4Blink === 0) {
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
                this.screen.setColor(Color.fromString("red"));
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
            }
        } else {
            --this.p4Blink;
        }
        var7 = (this.p2X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun >= 12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
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
        var7 = (this.p3X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p3Y * this.nHeight / 1000|0);
        this.screen.setColor(this.scoringRun >= 12?this.slimeColours[this.frenzyCol = (this.frenzyCol + 1) % this.slimeColours.length]:this.slimeColours[this.p2Col]);
        this.screen.fillArc(var7, var8, var1, 2 * var2, 0, 180);
        var9 = this.p3X - 18;
        var10 = this.p3Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        var11 = var7 - var5;
        var12 = var8 - var6;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        var14 = Math.random() < 0.01;
        if(var14) {
            this.p3Blink = 5;
        }
        if(this.p3Blink === 0) {
            this.screen.setColor(var14?Color.fromString("gray"):Color.fromString("white"));
            this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
            if(var13 > 0 && !var14) {
                this.screen.setColor(Color.fromString("red"));
                this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
            }
        } else {
            --this.p3Blink;
        }
        let var15 : number;
        let var16 : number;
        let var17 : number;
        let var18 : number;
        let var19 : number;
        if(this.nScore > 8) {
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
            var15 = (this.p4X * this.nWidth / 1000|0);
            var16 = (7 * this.nHeight / 10|0) - ((this.p4Y - 40) * this.nHeight / 1000|0);
            var17 = (this.nWidth / 20|0);
            var18 = (this.nHeight / 20|0);
            var19 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(var15, var16 + var19, var17, var18, -30, -150);
                ++var19;
            } while((var19 < 3));
        } else {
            if(this.nScore < 2) {
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
                var15 = (this.nWidth / 20|0);
                var16 = (this.nHeight / 20|0);
                var17 = (this.p3X * this.nWidth / 1000|0) - var15;
                var18 = (7 * this.nHeight / 10|0) - ((this.p3Y - 40) * this.nHeight / 1000|0);
                var19 = 0;
                do {
                    this.screen.setColor(Color.fromString("black"));
                    this.screen.drawArc(var17, var18 + var19, var15, var16, -10, -150);
                    ++var19;
                } while((var19 < 3));
            }
        }
    }

    /*public*/ DrawStatus() {
        let var1 : Graphics = this.screen;
        let var2 : number = (this.nHeight / 20|0);
        var1.setColor(Color.fromString("blue"));
        let var3 : FontMetrics = this.screen.getFontMetrics();
        let var4 : number = (this.nWidth / 2|0) + ((this.nScore - 5) * this.nWidth / 24|0);
        let var5 : string = "Points: " + this.nPointsScored + "   Elapsed: " + this.MakeTime(this.gameTime);
        let var6 : number = var3.stringWidth(var5);
        var1.fillRect(var4 - (var6 / 2|0) - 5, 0, var6 + 10, var2 + 22);
        var1.setColor(Color.fromString("white"));
        this.screen.drawString(var5, var4 - (var6 / 2|0), var3.getAscent() + 20);
    }

    /*public*/ MakeTime(var1 : number) : string {
        let var3 : number = Math.floor(var1 / 10) % 100;
        let var5 : number = Math.floor(var1 / 1000) % 60;
        let var7 : number = Math.floor(var1 / 60000) % 60;
        let var9 : number = Math.floor(var1 / 3600000);
        let var11 : string = "";
        if(var9 < 10) {
            var11 = var11 + "0";
        }
        var11 = var11 + var9;
        var11 = var11 + ":";
        if(var7 < 10) {
            var11 = var11 + "0";
        }
        var11 = var11 + var7;
        var11 = var11 + ":";
        if(var5 < 10) {
            var11 = var11 + "0";
        }
        var11 = var11 + var5;
        var11 = var11 + ":";
        if(var3 < 10) {
            var11 = var11 + "0";
        }
        var11 = var11 + var3;
        return var11;
    }

    /*public*/ MoveBall() {
        let var1 : number = (30 * this.nHeight / 1000|0);
        let var2 : number = (this.ballOldX * this.nWidth / 1000|0);
        let var3 : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
        this.ballY += --this.ballVY;
        this.ballX = (<number>(<number>this.ballX + 1.5 * <number>this.ballVX)|0);
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
                    this.ballVX += this.p1XV - (2 * var4 * var10 / var9|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p1YV - (2 * var5 * var10 / var9|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP1Touched = true;
                if(this.TouchSlime1 != null) {
                    this.TouchSlime1.play();
                }
            }
            var4 = (this.ballX - this.p4X) * 2;
            var5 = this.ballY - this.p4Y;
            var6 = var4 * var4 + var5 * var5;
            var7 = this.ballVX - this.p4XV;
            var8 = this.ballVY - this.p4YV;
            if(var5 > 0 && var6 < 15625 && var6 > 25) {
                var9 = (<number>Math.sqrt(<number>var6)|0);
                var10 = ((var4 * var7 + var5 * var8) / var9|0);
                this.ballX = this.p4X + (var4 * 63 / var9|0);
                this.ballY = this.p4Y + (var5 * 125 / var9|0);
                if(var10 <= 0) {
                    this.ballVX += this.p4XV - (2 * var4 * var10 / var9|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p4YV - (2 * var5 * var10 / var9|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP4Touched = true;
                if(this.TouchSlime1 != null) {
                    this.TouchSlime1.play();
                }
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
                    this.ballVX += this.p2XV - (2 * var4 * var10 / var9|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p2YV - (2 * var5 * var10 / var9|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP2Touched = true;
                if(this.TouchSlime2 != null) {
                    this.TouchSlime2.play();
                }
            }
            var4 = (this.ballX - this.p3X) * 2;
            var5 = this.ballY - this.p3Y;
            var6 = var4 * var4 + var5 * var5;
            var7 = this.ballVX - this.p3XV;
            var8 = this.ballVY - this.p3YV;
            if(var5 > 0 && var6 < 15625 && var6 > 25) {
                var9 = (<number>Math.sqrt(<number>var6)|0);
                var10 = ((var4 * var7 + var5 * var8) / var9|0);
                this.ballX = this.p3X + (var4 * 63 / var9|0);
                this.ballY = this.p3Y + (var5 * 125 / var9|0);
                if(var10 <= 0) {
                    this.ballVX += this.p3XV - (2 * var4 * var10 / var9|0);
                    if(this.ballVX < -15) {
                        this.ballVX = -15;
                    }
                    if(this.ballVX > 15) {
                        this.ballVX = 15;
                    }
                    this.ballVY += this.p3YV - (2 * var5 * var10 / var9|0);
                    if(this.ballVY < -22) {
                        this.ballVY = -22;
                    }
                    if(this.ballVY > 22) {
                        this.ballVY = 22;
                    }
                }
                this.fP3Touched = true;
                if(this.TouchSlime2 != null) {
                    this.TouchSlime2.play();
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
        var2 = (this.ballX * this.nWidth / 1000|0);
        var3 = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
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
            this.p1Y += this.p1YV -= this.scoringRun <= -12?4:2;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p4X += this.p4XV;
        if(this.p4X < 50) {
            this.p4X = 50;
        }
        if(this.p4X > 445) {
            this.p4X = 445;
        }
        if(this.p4YV !== 0) {
            this.p4Y += this.p4YV -= this.scoringRun <= -12?4:2;
            if(this.p4Y < 0) {
                this.p4Y = 0;
                this.p4YV = 0;
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
            this.p2Y += this.p2YV -= this.scoringRun >= 12?4:2;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
        this.p3X += this.p3XV;
        if(this.p3X > 950) {
            this.p3X = 950;
        }
        if(this.p3X < 555) {
            this.p3X = 555;
        }
        if(this.p3YV !== 0) {
            this.p3Y += this.p3YV -= this.scoringRun >= 12?4:2;
            if(this.p3Y < 0) {
                this.p3Y = 0;
                this.p3YV = 0;
            }
        }
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
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
        let var1 : Graphics = this.screen;
        let var2 : number = (this.nHeight / 20|0);
        var1.setColor(Color.fromString("blue"));
        var1.fillRect(0, 0, this.nWidth, var2 + 22);
        let var4 : number;
        for(let var3 : number = 0; var3 < this.nScore; ++var3) {
            var4 = ((var3 + 1) * this.nWidth / 24|0);
            var1.setColor(this.slimeColours[this.p1Col]);
            var1.fillOval(var4, 20, var2, var2);
            var1.setColor(Color.fromString("white"));
            var1.drawOval(var4, 20, var2, var2);
        };
        for(var4 = 0; var4 < 10 - this.nScore; ++var4) {
            let var5 : number = this.nWidth - ((var4 + 1) * this.nWidth / 24|0) - var2;
            var1.setColor(this.slimeColours[this.p2Col]);
            var1.fillOval(var5, 20, var2, var2);
            var1.setColor(Color.fromString("white"));
            var1.drawOval(var5, 20, var2, var2);
        };
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            if(!this.fEndGame) {
                switch((var1.key)) {
                case 52:
                    this.p3XV = this.scoringRun <= -12?-16:-8;
                    break;
                case 53:
                case 1005:
                    if(this.fCanChangeCol) {
                        do {
                            this.p2Col = this.p3Col = this.p2Col !== 4?this.p2Col + 1:0;
                        } while((this.p2Col === this.p1Col));
                        this.drawScores();
                        break;
                    }
                case 32:
                    this.mousePressed = true;
                    break;
                case 54:
                    this.p3XV = this.scoringRun <= -12?16:8;
                    break;
                case 56:
                    if(this.p3Y === 0) {
                        this.p3YV = this.scoringRun <= -12?45:31;
                    }
                    break;
                case 65:
                case 97:
                    this.p1XV = this.scoringRun <= -12?-16:-8;
                    break;
                case 68:
                case 100:
                    this.p1XV = this.scoringRun <= -12?16:8;
                    break;
                case 73:
                case 105:
                    if(this.p4Y === 0) {
                        this.p4YV = this.scoringRun >= 12?45:31;
                    }
                    break;
                case 74:
                case 106:
                    this.p4XV = this.scoringRun >= 12?-16:-8;
                    break;
                case 75:
                case 83:
                case 107:
                case 115:
                    if(this.fCanChangeCol) {
                        do {
                            this.p1Col = this.p4Col = this.p1Col !== 4?this.p1Col + 1:0;
                        } while((this.p1Col === this.p2Col));
                        this.drawScores();
                    }
                    break;
                case 76:
                case 108:
                    this.p4XV = this.scoringRun >= 12?16:8;
                    break;
                case 87:
                case 119:
                    if(this.p1Y === 0) {
                        this.p1YV = this.scoringRun <= -12?45:31;
                    }
                    break;
                case 1004:
                    if(this.p2Y === 0) {
                        this.p2YV = this.scoringRun >= 12?45:31;
                    }
                    break;
                case 1006:
                    this.p2XV = this.scoringRun >= 12?-16:-8;
                    break;
                case 1007:
                    this.p2XV = this.scoringRun >= 12?16:8;
                }
            }
            break;
        case 402:
        case 404:
            switch((var1.key)) {
            case 52:
                if(this.p3XV < 0) {
                    this.p3XV = 0;
                }
                return false;
            case 54:
                if(this.p3XV > 0) {
                    this.p3XV = 0;
                }
                return false;
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
                if(this.p4XV < 0) {
                    this.p4XV = 0;
                }
                return false;
            case 76:
            case 108:
                if(this.p4XV > 0) {
                    this.p4XV = 0;
                }
                return false;
            case 1006:
                if(this.p2XV < 0) {
                    this.p2XV = 0;
                }
                return false;
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
                this.p3X = 600;
                this.p3Y = 0;
                this.p2X = 800;
                this.p2Y = 0;
                this.p4X = 400;
                this.p4Y = 0;
                this.p1XV = 0;
                this.p1YV = 0;
                this.p2XV = 0;
                this.p2YV = 0;
                this.p3XV = 0;
                this.p3YV = 0;
                this.p4XV = 0;
                this.p4YV = 0;
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
            this.showStatus("Modified by: Brad Neish, Eddie Rabenda, Chris Jochem, and Brian Pegram.");
        }
        return false;
    }

    public init() {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.nScore = 5;
        this.TouchSlime1 = this.getAudioClip(this.getCodeBase(), "exclamation.au");
        this.TouchSlime2 = this.getAudioClip(this.getCodeBase(), "doiinggg.au");
        this.image = this.getImage(this.getCodeBase(), "slimevolleyball.jpg");
        this.ScoreSound = this.getAudioClip(this.getCodeBase(), "down.au");
        this.fInPlay = this.fEndGame = false;
        this.fCanChangeCol = true;
        this.promptMsg = "Click the mouse to play...";
        this.screen = this.getGraphics();
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
    }

    public paint(var1 : Graphics) {
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        var1.setColor(Color.fromString("blue"));
        var1.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        var1.setColor(Color.fromString("gray"));
        var1.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        var1.setColor(Color.fromString("white"));
        var1.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        this.drawScores();
        this.drawPrompt();
        if(!this.fInPlay) {
            this.image.getHeight(this);
            var1.drawImage(this.image, 0, 0, this);
        }
    }

    public async run() {
        this.p1Col = 0;
        this.p2Col = 1;
        this.scoringRun = 0;
        this.fP1Touched = this.fP2Touched = false;
        this.nPointsScored = 0;
        this.startTime = System.currentTimeMillis();
        while((this.nScore !== 0 && this.nScore !== 10 && this.gameThread != null)) {
            this.gameTime = System.currentTimeMillis() - this.startTime;
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.p3OldX = this.p3X;
            this.p3OldY = this.p3Y;
            this.p4OldX = this.p4X;
            this.p4OldY = this.p4Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.MoveSlimers();
            this.DrawSlimers();
            this.DrawStatus();
            if(this.ballY < 35) {
                if(this.ScoreSound != null) {
                    this.ScoreSound.play();
                }
                let var1 : number = System.currentTimeMillis();
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
                if(!this.fP1Touched && !this.fP2Touched && !this.fP3Touched && !this.fP4Touched) {
                    this.promptMsg = "What can I say?";
                } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) === 12) {
                    this.promptMsg = this.promptMsg + "is on fire!";
                } else if((this.ballX <= 500 || !this.fP1Touched && !this.fP4Touched || this.fP2Touched || this.fP3Touched) && (this.ballX > 500 || this.fP1Touched || this.fP4Touched || !this.fP2Touched && !this.fP3Touched)) {
                    if(this.ballX > 500 && !this.fP1Touched && !this.fP4Touched && (this.fP2Touched || this.fP3Touched) || this.ballX <= 500 && (this.fP1Touched || this.fP4Touched) && !this.fP2Touched && !this.fP3Touched) {
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
                let var3 : boolean = this.nScore !== 0 && this.nScore !== 10;
                let var4 : number = this.ballX;
                this.drawPrompt();
                if(this.gameThread != null) {
                    try {
                        Thread.sleep$long(2500);
                    } catch(var6) {
                    };
                }
                this.promptMsg = "";
                this.drawPrompt();
                this.fCanChangeCol = true;
                if(var3) {
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p1XV = 0;
                    this.p1YV = 0;
                    this.p2XV = 0;
                    this.p2YV = 0;
                    this.p3X = 600;
                    this.p3Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p4X = 400;
                    this.p4Y = 0;
                    this.ballX = var4 >= 500?200:800;
                    this.ballY = 400;
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.fP1Touched = this.fP2Touched = false;
                    this.repaint();
                }
                this.startTime += System.currentTimeMillis() - var1;
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var5) {
                };
            }
        };
        this.fEndGame = true;
        this.fInPlay = false;
        this.promptMsg = "Click the mouse to play...";
        this.repaint();
    }
}
Slime2P2["__class"] = "Slime2P2";
Slime2P2["__interfaces"] = ["Runnable"];



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