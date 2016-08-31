/// <reference path="../SlimeGame.ts" />

class WorldCupSoccerSlime extends SlimeGame {
    private isStarted: boolean = false;
    private nWidth: number = 0;
    private nHeight: number = 0;
    private p1Score: number = 0;
    private p2Score: number = 0;
    private p1X: number = 0;
    private p2X: number = 0;
    private p1Y: number = 0;
    private p2Y: number = 0;
    private p1Col: number = 0;
    private p2Col: number = 0;
    private slimeColText: string[] = [
        "Argentina", "Belgium", "Australia", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland", 
        "Saudi Arabia", "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", "England", "Germany"
    ];
    private darkRed: Color = null;
    private darkGreen: Color = null;
    private darkBlue: Color = null;
    private slimaryCols: Color[] = null;
    private secondaryCols: Color[] = null;
    private p1OldX: number = 0;
    private p2OldX: number = 0;
    private p1OldY: number = 0;
    private p2OldY: number = 0;
    private p1XV: number = 0;
    private p2XV: number = 0;
    private p1YV: number = 0;
    private p2YV: number = 0;
    private ballX: number = 0;
    private ballY: number = 0;
    private ballVX: number = 0;
    private ballVY: number = 0;
    private ballOldX: number = 0;
    private ballOldY: number = 0;
    private promptMsg: string = null;
    private replayData: number[][] = null;
    private replayPos: number = 0;
    private replayStart: number = 0;
    private mousePressed: boolean = false;
    private fCanChangeCol: boolean = false;
    private fInPlay: boolean = false;
    private p1Blink: number = 0;
    private p2Blink: number = 0;
    private fP1Sticky: boolean = false;
    private fP2Sticky: boolean = false;
    private fP1Touched: boolean = false;
    private fP2Touched: boolean = false;
    private p1TouchingGoal: number = 0;
    private p2TouchingGoal: number = 0;
    private gameThread: string = null;
    private fEndGame: boolean = false;
    private fPlayOn: boolean = false;
    private nScoreX: number = 0;
    private startTime: number = 0;
    private gameTime: number = 0;
    private scoringRun: number = 0;
    private frenzyCol: number = 0;
    private playOnTicks: number = 0;
    private backBuffer: WImage = null;
    private static SMILE_DIFF: number = 2;
    private static DAMPING: number = 7;
    private static MAX_TICKS_TOUCHING_GOAL: number = 60;
    private JUMPVEL: number = 0;
    private SLIMEVEL: number = 0;
    private GRAVITY: number = 0;
    private gameLength: number = 0;
    private worldCup: boolean = false;
    private worldCupRound: number = 0;
    private fExtraTime: boolean = false;
    private fGoldenGoal: boolean = false;
    private fSuperSlime: boolean = false;
    private doubleBuffered: boolean = false;
    private pointsX: number[] = null;
    private pointsY: number[] = null;

    restoreFromRemote(game: SlimeGame) {
        Object.getOwnPropertyNames(this).forEach(propName => {
            var propType = typeof(this[propName]);
            if (propType === "number" || propType === "boolean" || propType === "string" || propName === "pointsX" || propName === "pointsY" || propName === "replayData") {
                this[propName] = game[propName];
            }
        });
        this.paint(super.getGraphics());
        this.DrawSlimers();
        this.DrawGoals();
        this.DrawStatus();
    }

    initStuff(): void
    {
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
        this.ballOldX = (this.ballX = 500);
        this.ballOldY = (this.ballY = 200);
        this.ballVX = 0;
        this.ballVY = 0;
        this.replayStart = (this.replayPos = 0);
        this.fP1Touched = (this.fP2Touched = false);
        this.playOnTicks = 10;
        this.fPlayOn = false;
        this.fExtraTime = false;
        this.fGoldenGoal = false;
        this.JUMPVEL = (this.fSuperSlime ? 65 : 31);
        this.SLIMEVEL = (this.fSuperSlime ? 16 : 8);
        this.GRAVITY = (this.fSuperSlime ? 8 : 2);
    }
    private drawButtons(): void
    {
        var array: string[] = [
            "1 minute", "2 minutes", "4 minutes", "8 minutes", "World Cup"
        ];
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        var color: Color = new Color(0, 0, 128);
        for (var i: number = 0; i < 5; i = i + 1)
        {
            this.screen.setColor(color);
            this.screen.fillRect((2 * i + 1) * this.nWidth / 10 - this.nWidth / 12, this.nHeight * 2 / 10, this.nWidth / 6, this.nHeight / 10);
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString(array[i], (2 * i + 1) * this.nWidth / 10 - fontMetrics.stringWidth(array[i]) / 2, this.nHeight * 5 / 20 + fontMetrics.getHeight() / 2);
        }
        this.flip();
    }

    private testButton(i: number, j: number): boolean
    {
        var result: boolean;
        for (var k: number = 0; k < 5; k = k + 1)
        {
            var flag: boolean = i > (2 * k + 1) * this.nWidth / 10 - this.nWidth / 12 && i < (2 * k + 1) * this.nWidth / 10 + this.nWidth / 12 && j > this.nHeight * 2 / 10 && j < this.nHeight * 3 / 10;
            if (flag)
            {
                var flag2: boolean = k === 4;
                if (flag2)
                {
                    this.gameLength = 120000;
                    this.worldCup = true;
                }
                else
                {
                    this.gameLength = (1 << k) * 60000;
                    this.worldCup = false;
                }
                result = true;
                return result;
            }
        }
        result = false;
        return result;
    }
    async handleEventCore(event0: WEvent)
    {
        var id: number = event0.id;
        var flag: boolean = id === 503;
        if (flag)
        {
            super.showStatus("Slime Volleyball 2-Player: Soccer Slime, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid");
            super.requestFocus();
        }
        else
        {
            var flag2: boolean = id === 501;
            if (flag2)
            {
                this.mousePressed = true;
                var flag3: boolean = this.fInPlay || !this.testButton(event0.x, event0.y);
                if (!flag3)
                {
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
                    this.paint(super.getGraphics());
                    await this.ThreadSleep(100);
                    this.gameThread = "something";
                    await this.run();
                }
            }
            else
            {
                var flag4: boolean = id === 401 || id === 403;
                if (flag4)
                {
                    await this.HandleCanChangeColKeypressStuff(event0);
                    var flag5: boolean = this.fEndGame;
                    if (!flag5)
                    {
                        var text: string = await this.HandleInGameKeyPress(event0);
                    }
                }
                else
                {
                    var flag6: boolean = id === 402 || id === 404;
                    if (flag6)
                    {
                        var a: string = this.HandleKeyRelease(event0);
                        var flag7: boolean = a === "label0";
                        if (!flag7)
                        {
                            var flag8: boolean = this.p2XV > 0 && !this.worldCup;
                            if (flag8)
                            {
                                this.p2XV = 0;
                            }
                        }
                    }
                }
            }
        }
    }
    private HandleKeyRelease(event0: WEvent): string
    {
        var key: number = event0.key;
        var flag: boolean = key === 83 || key === 115;
        var result: string;
        if (flag)
        {
            this.fP1Sticky = false;
            result = "label0";
        }
        else
        {
            var flag2: boolean = key === 75 || key === 107 || key === 1005;
            if (flag2)
            {
                this.fP2Sticky = false;
                result = "label0";
            }
            else
            {
                var flag3: boolean = key === 65 || key === 97;
                if (flag3)
                {
                    var flag4: boolean = this.p1XV < 0;
                    if (flag4)
                    {
                        this.p1XV = 0;
                    }
                    result = "label0";
                }
                else
                {
                    var flag5: boolean = key === 68 || key === 100;
                    if (flag5)
                    {
                        var flag6: boolean = this.p1XV > 0;
                        if (flag6)
                        {
                            this.p1XV = 0;
                        }
                        result = "label0";
                    }
                    else
                    {
                        var flag7: boolean = key === 74 || key === 106 || key === 1006;
                        if (flag7)
                        {
                            var flag8: boolean = this.p2XV < 0 && !this.worldCup;
                            if (flag8)
                            {
                                this.p2XV = 0;
                            }
                            result = "label0";
                        }
                        else
                        {
                            var flag9: boolean = key === 76 || key === 108 || key === 1007;
                            if (flag9)
                            {
                                result = null;
                            }
                            else
                            {
                                result = null;
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    private async HandleInGameKeyPress(event0: WEvent)
    {
        var key: number = event0.key;
        var flag: boolean = key === 83 || key === 115;
        var result: string;
        if (flag)
        {
            this.fP1Sticky = true;
            result = "label0";
        }
        else
        {
            var flag2: boolean = key === 75 || key === 107 || key === 1005;
            if (flag2)
            {
                var flag3: boolean = !this.worldCup;
                if (flag3)
                {
                    this.fP2Sticky = true;
                }
                result = "label0";
            }
            else
            {
                var flag4: boolean = key === 65 || key === 97;
                if (flag4)
                {
                    this.p1XV = -this.SLIMEVEL;
                    result = "label0";
                }
                else
                {
                    var flag5: boolean = key === 68 || key === 100;
                    if (flag5)
                    {
                        this.p1XV = this.SLIMEVEL;
                        result = "label0";
                    }
                    else
                    {
                        var flag6: boolean = key === 87 || key === 119;
                        if (flag6)
                        {
                            var flag7: boolean = this.p1Y === 0;
                            if (flag7)
                            {
                                this.p1YV = this.JUMPVEL;
                            }
                            result = "label0";
                        }
                        else
                        {
                            var flag8: boolean = key === 74 || key === 106 || key === 1006;
                            if (flag8)
                            {
                                var flag9: boolean = !this.worldCup;
                                if (flag9)
                                {
                                    this.p2XV = -this.SLIMEVEL;
                                }
                                result = "label0";
                            }
                            else
                            {
                                var flag10: boolean = key === 76 || key === 108 || key === 1007;
                                if (flag10)
                                {
                                    var flag11: boolean = !this.worldCup;
                                    if (flag11)
                                    {
                                        this.p2XV = this.SLIMEVEL;
                                    }
                                    result = "label0";
                                }
                                else
                                {
                                    var flag12: boolean = key === 73 || key === 105 || key === 1004;
                                    if (flag12)
                                    {
                                        var flag13: boolean = this.p2Y === 0 && !this.worldCup;
                                        if (flag13)
                                        {
                                            this.p2YV = this.JUMPVEL;
                                        }
                                        result = null;
                                    }
                                    else
                                    {
                                        var flag14: boolean = key === 66 || key === 98;
                                        if (flag14)
                                        {
                                            await this.toggleBuffering();
                                            result = null;
                                        }
                                        else
                                        {
                                            var flag15: boolean = key === 32;
                                            if (flag15)
                                            {
                                                this.mousePressed = true;
                                                result = null;
                                            }
                                            else
                                            {
                                                result = null;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    private async clearAndRepaint() {
        super.getGraphics().ctx.clearRect(0, 0, super.size().width, super.size().height);
        await this.paint(super.getGraphics());
    }
    private async HandleCanChangeColKeypressStuff(event0: WEvent)
    {
        var flag: boolean = !this.fCanChangeCol;
        if (!flag)
        {
            var key: number = event0.key;
            var flag2: boolean = key === 83;
            if (flag2)
            {
            }
            var flag3: boolean = key === 115;
            if (flag3)
            {
                do
                {
                    this.p1Col = ((this.p1Col === this.slimaryCols.length - 1) ? 0 : (this.p1Col + 1));
                }
                while (this.p1Col === this.p2Col);
                this.drawScores();
                await this.clearAndRepaint();
            }
            else
            {
                var flag4: boolean = key === 87;
                if (flag4)
                {
                }
                var flag5: boolean = key === 119;
                if (flag5)
                {
                    do
                    {
                        this.p1Col = ((this.p1Col !== 0) ? (this.p1Col - 1) : (this.slimaryCols.length - 1));
                    }
                    while (this.p1Col === this.p2Col);
                    this.drawScores();
                    await this.clearAndRepaint();
                }
                else
                {
                    var flag6: boolean = key === 75;
                    if (flag6)
                    {
                    }
                    var flag7: boolean = key === 107;
                    if (flag7)
                    {
                    }
                    var flag8: boolean = key === 1005;
                    if (flag8)
                    {
                        do
                        {
                            this.p2Col = ((this.p2Col === this.slimaryCols.length - 1) ? 0 : (this.p2Col + 1));
                        }
                        while (this.p2Col === this.p1Col);
                        this.drawScores();
                        await this.clearAndRepaint();
                    }
                    else
                    {
                        var flag9: boolean = key === 73;
                        if (flag9)
                        {
                        }
                        var flag10: boolean = key === 105;
                        if (flag10)
                        {
                        }
                        var flag11: boolean = key === 1004;
                        if (flag11)
                        {
                            do
                            {
                                this.p2Col = ((this.p2Col !== 0) ? (this.p2Col - 1) : (this.slimaryCols.length - 1));
                            }
                            while (this.p1Col === this.p2Col);
                            this.drawScores();
                            await this.clearAndRepaint();
                        }
                        else
                        {
                            var flag12: boolean = key === 54;
                            if (flag12)
                            {
                                this.fSuperSlime = !this.fSuperSlime;
                                await this.clearAndRepaint();
                            }
                        }
                    }
                }
            }
        }
    }
    private DrawSlimers(): void
    {
        var num: number = this.nWidth / 10;
        var num2: number = this.nHeight / 10;
        var num3: number = this.nWidth / 50;
        var num4: number = this.nHeight / 25;
        var num5: number = this.ballX * this.nWidth / 1000;
        var num6: number = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
        var num7: number = this.p1OldX * this.nWidth / 1000 - num / 2;
        var num8: number = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 2 * this.nHeight / 5, this.nWidth, 2 * this.nHeight / 5);
        // this.screen.fillRect(num7, num8, num, num2);
        num7 = this.p2OldX * this.nWidth / 1000 - num / 2;
        num8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 2 * this.nHeight / 5, this.nWidth, 2 * this.nHeight / 5);
        // this.screen.fillRect(num7, num8, num, num2);
        var flag: boolean = !this.fEndGame;
        if (flag)
        {
            this.MoveBall();
        }
        num7 = this.p1X * this.nWidth / 1000 - num / 2;
        num8 = 7 * this.nHeight / 10 - this.p1Y * this.nHeight / 1000;
        this.screen.setColor(this.fSuperSlime ? this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length] : this.slimaryCols[this.p1Col]);
        this.screen.fillArc(num7, num8, num, 2 * num2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.pointsX[0] = (this.pointsX[2] = num7 + num / 2);
        this.pointsX[1] = num7 + num * 2 / 5;
        this.pointsX[3] = num7 + num / 8;
        this.pointsY[0] = num8;
        this.pointsY[1] = (this.pointsY[3] = num8 + num2 / 2);
        this.pointsY[2] = num8 + num2;
        this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
        var num9: number = this.p1X + 38;
        var num10: number = this.p1Y - 60;
        num7 = num9 * this.nWidth / 1000;
        num8 = 7 * this.nHeight / 10 - num10 * this.nHeight / 1000;
        var num11: number = num7 - num5;
        var num12: number = num8 - num6;
        var num13: number = <number>Math.sqrt(<number>(num11 * num11 + num12 * num12));
        var flag2: boolean = Math.random() < 0.01;
        var flag3: boolean = flag2;
        if (flag3)
        {
            this.p1Blink = 5;
        }
        var flag4: boolean = this.p1Blink === 0;
        if (flag4)
        {
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillOval(num7 - num3, num8 - num4, num3, num4);
            var flag5: boolean = num13 > 0 && !flag2;
            if (flag5)
            {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(num7 - 4 * num11 / num13 - 3 * num3 / 4, num8 - 4 * num12 / num13 - 3 * num4 / 4, num3 / 2, num4 / 2);
            }
        }
        else
        {
            this.p1Blink = this.p1Blink - 1;
        }
        var flag6: boolean = this.p1Score > this.p2Score + 2;
        if (flag6)
        {
            var j: number = this.p1X * this.nWidth / 1000;
            var num14: number = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
            var j2: number = this.nWidth / 20;
            var l: number = this.nHeight / 20;
            var num15: number = 0;
            do
            {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(j, num14 + num15, j2, l, -30, -150);
            }
            while ((num15 = num15 + 1) < 3);
        }
        num7 = this.p2X * this.nWidth / 1000 - num / 2;
        num8 = 7 * this.nHeight / 10 - this.p2Y * this.nHeight / 1000;
        this.screen.setColor(this.fSuperSlime ? this.slimaryCols[this.frenzyCol = (this.frenzyCol + 1) % this.slimaryCols.length] : this.slimaryCols[this.p2Col]);
        this.screen.fillArc(num7, num8, num, 2 * num2, 0, 180);
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.pointsX[0] = (this.pointsX[2] = num7 + num / 2);
        this.pointsX[1] = num7 + num * 3 / 5;
        this.pointsX[3] = num7 + num * 7 / 8;
        this.pointsY[0] = num8;
        this.pointsY[1] = (this.pointsY[3] = num8 + num2 / 2);
        this.pointsY[2] = num8 + num2;
        this.screen.fillPolygon(this.pointsX, this.pointsY, 4);
        num9 = this.p2X - 18;
        num10 = this.p2Y - 60;
        num7 = num9 * this.nWidth / 1000;
        num8 = 7 * this.nHeight / 10 - num10 * this.nHeight / 1000;
        num11 = num7 - num5;
        num12 = num8 - num6;
        num13 = <number>Math.sqrt(<number>(num11 * num11 + num12 * num12));
        flag2 = (Math.random() < 0.01);
        var flag7: boolean = flag2;
        if (flag7)
        {
            this.p2Blink = 5;
        }
        var flag8: boolean = this.p2Blink === 0;
        if (flag8)
        {
            this.screen.setColor(flag2 ? Color.fromString("gray") : Color.fromString("white"));
            this.screen.fillOval(num7 - num3, num8 - num4, num3, num4);
            var flag9: boolean = num13 > 0 && !flag2;
            if (flag9)
            {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(num7 - 4 * num11 / num13 - 3 * num3 / 4, num8 - 4 * num12 / num13 - 3 * num4 / 4, num3 / 2, num4 / 2);
            }
        }
        else
        {
            this.p2Blink = this.p2Blink - 1;
        }
        var flag10: boolean = this.p2Score > this.p1Score + 2;
        if (flag10)
        {
            var num16: number = this.nWidth / 20;
            var l2: number = this.nHeight / 20;
            var j3: number = this.p2X * this.nWidth / 1000 - num16;
            var num17: number = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
            var num18: number = 0;
            do
            {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(j3, num17 + num18, num16, l2, -10, -150);
            }
            while ((num18 = num18 + 1) < 3);
        }
        this.DrawGoals();
    }
    paint(g: Graphics): void
    {
        this.nWidth = super.size().width;
        this.nHeight = super.size().height;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
        this.screen.setColor(Color.fromString("white"));
        this.drawScores();
        var flag: boolean = !this.fInPlay;
        if (flag)
        {
            this.DrawSlimers();
            this.drawButtons();
        }
        this.DrawGoals();
        this.drawPrompt();
        var flag2: boolean = !this.fInPlay;
        if (flag2)
        {
            var fontMetrics: FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            var flag3: boolean = this.fSuperSlime;
            if (flag3)
            {
                this.screen.drawString("Super Soccer Slime!", this.nWidth / 2 - fontMetrics.stringWidth("Super Soccer Slime!") / 2, this.nHeight / 2 - fontMetrics.getHeight());
            }
            else
            {
                this.screen.drawString("Soccer Slime!", this.nWidth / 2 - fontMetrics.stringWidth("Soccer Slime!") / 2, this.nHeight / 2 - fontMetrics.getHeight());
            }
            this.screen.setColor(Color.fromString("white"));
            fontMetrics = this.screen.getFontMetrics();
            this.screen.drawString("Written by Quin Pendragon", this.nWidth / 2 - fontMetrics.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + fontMetrics.getHeight() * 2);
        }
        this.flip();
    }
    destroy(): void
    {
        this.gameThread = null;
    }
    private async ReplayFrame(i: number, j: number, k: number, l: number, i1: number, flag: boolean)
    {
        if (flag)
        {
            this.ballX = -1000;
            this.ballOldX = 500;
            this.ballY = -1000;
            this.ballOldY = 500;
            this.p1OldX = (this.p1OldY = (this.p2OldX = (this.p2OldY = -10000)));
        }
        else
        {
            var num: number = (i === 0) ? 199 : (i - 1);
            this.p1OldX = this.replayData[num][0];
            this.p1OldY = this.replayData[num][1];
            this.p2OldX = this.replayData[num][2];
            this.p2OldY = this.replayData[num][3];
            var flag2: boolean = i === 0;
            if (flag2)
            {
                this.ballOldX = 500;
                this.ballOldY = 200;
            }
            else
            {
                this.ballOldX = this.replayData[num][4];
                this.ballOldY = this.replayData[num][5];
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
        var flag3: boolean = i / 10 % 2 > 0;
        if (flag3)
        {
            this.screen.setColor(Color.fromString("red"));
            this.screen.drawString("Replay...", j, k);
        }
        else
        {
            this.screen.setColor(Color.fromString("blue"));
            this.screen.fillRect(j, k - i1, l, i1 * 2);
        }
        this.DrawSlimers();
        this.DrawGoals();
        await this.ThreadSleep(20);
    }
    private ThreadSleep(v: number): Promise<number>
    {
        return new Promise((complete, error) => {
            setTimeout(() => complete(0), v);
        });
    }
    private padWithZeroes(num: number, maxFigures: number) {
        var padding = "";
        for (var i = 0; i < maxFigures - 1; i++) {
            padding += "0";
        }
        return (padding + (num >>> 0)).slice(-maxFigures);
    }
    private MakeTime(l: number): string
    {
        var num: number = l / 10 % 100;
        var num2: number = l / 1000 % 60;
        var num3: number = l / 60000 % 60;
        return `${this.padWithZeroes(num3, 2)}:${this.padWithZeroes(num2, 2)}:${this.padWithZeroes(num, 2)}`;
    }
    private MoveSlimers(): void
    {
        var flag: boolean = this.worldCup;
        if (flag)
        {
            var num: number = this.worldCupRound;
            var flag2: boolean = num === 0;
            if (flag2)
            {
                this.controlP2v0();
            }
            var flag3: boolean = num === 1;
            if (flag3)
            {
                this.controlP2v1();
            }
            var flag4: boolean = num === 2;
            if (flag4)
            {
                this.controlP2v2();
            }
            var flag5: boolean = num === 3;
            if (flag5)
            {
                this.controlP2v3();
            }
        }
        this.p1X = this.p1X + this.p1XV;
        var flag6: boolean = this.p1X < 50;
        if (flag6)
        {
            this.p1X = 50;
        }
        var flag7: boolean = this.p1X > 950;
        if (flag7)
        {
            this.p1X = 950;
        }
        var flag8: boolean = this.p1YV !== 0;
        if (flag8)
        {
            this.p1Y = this.p1Y + (this.p1YV = this.p1YV - this.GRAVITY);
            var flag9: boolean = this.p1Y < 0;
            if (flag9)
            {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p2X = this.p2X + this.p2XV;
        var flag10: boolean = this.p2X > 950;
        if (flag10)
        {
            this.p2X = 950;
        }
        var flag11: boolean = this.p2X < 50;
        if (flag11)
        {
            this.p2X = 50;
        }
        var flag12: boolean = this.p2YV !== 0;
        if (flag12)
        {
            this.p2Y = this.p2Y + (this.p2YV = this.p2YV - this.GRAVITY);
            var flag13: boolean = this.p2Y < 0;
            if (flag13)
            {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
    }
    constructor()
    {
        super(<HTMLCanvasElement>document.querySelector("canvas"));
        this.darkRed = new Color(128, 0, 0);
        this.darkGreen = new Color(0, 128, 0);
        this.darkBlue = new Color(0, 0, 128);
        this.slimaryCols = [
            Color.fromString("cyan"), Color.fromString("red"), Color.fromString("green"), this.darkGreen, Color.fromString("white"), this.darkRed, this.darkRed, new Color(119, 41, 28), Color.fromString("yellow"), Color.fromString("green"), Color.fromString("white"), Color.fromString("white"), new Color(128, 128, 255), this.darkBlue, Color.fromString("white"), Color.fromString("red"), Color.fromString("white"), new Color(119, 41, 28), Color.fromString("green"), 
            Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), new Color(185, 30, 2), Color.fromString("white"), Color.fromString("red"), new Color(252, 239, 82), Color.fromString("white"), Color.fromString("red"), new Color(16, 180, 180), new Color(241, 245, 71), new Color(230, 230, 230), Color.fromString("white")
        ];
        this.secondaryCols = [
            Color.fromString("white"), Color.fromString("black"), Color.fromString("yellow"), Color.fromString("red"), Color.fromString("red"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), this.darkBlue, Color.fromString("green"), Color.fromString("blue"), this.darkBlue, Color.fromString("white"), Color.fromString("white"), Color.fromString("blue"), Color.fromString("white"), Color.fromString("red"), this.darkGreen, Color.fromString("white"), 
            new Color(128, 255, 128), new Color(255, 128, 0), this.darkGreen, this.darkBlue, new Color(13, 131, 10), Color.fromString("white"), Color.fromString("blue"), Color.fromString("red"), Color.fromString("white"), Color.fromString("black"), new Color(7, 177, 33), Color.fromString("red"), Color.fromString("black")
        ];
        this.worldCup = false;
        this.pointsX = new Array<number>(4);
        for (var _ai: number = 0; _ai < this.pointsX.length; ++_ai)
            this.pointsX[_ai] = 0;
        this.pointsY = new Array<number>(4);
        for (var _ai: number = 0; _ai < this.pointsY.length; ++_ai)
            this.pointsY[_ai] = 0;
        this.p2Col = 1;
        this.replayData = [];
        for (var i = 0; i < 200; i++) {
            var arr = [];
            for (var j = 0; j < 8; j++) {
                arr.push(0);
            }
            this.replayData.push(arr);
        }
    }
    private MoveBall(): void
    {
        var num: number = 30 * this.nHeight / 1000;
        var num2: number = this.ballOldX * this.nWidth / 1000;
        var num3: number = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        if (num3 - num < 3 * this.nHeight / 5) {
            this.screen.fillOval(num2 - num - 2, num3 - num -2, num * 2 + 4, num * 2 + 4);
        } else {
            this.screen.fillOval(num2 - num, num3 - num, num * 2, num * 2);
        }
        var arg_8A_0: number = this.ballY;
        var num4: number = this.ballVY - 1;
        this.ballVY = num4;
        this.ballY = arg_8A_0 + num4;
        this.ballX = this.ballX + this.ballVX;
        var flag: boolean = !this.fEndGame;
        if (flag)
        {
            var num5: number = (this.ballX - this.p1X) * 2;
            var num6: number = this.ballY - this.p1Y;
            var num7: number = num5 * num5 + num6 * num6;
            var num8: number = this.ballVX - this.p1XV;
            var num9: number = this.ballVY - this.p1YV;
            var flag2: boolean = num6 > 0 && num7 < 15625 && num7 > 25;
            if (flag2)
            {
                var num10: number = <number>Math.sqrt(<number>num7);
                var num11: number = (num5 * num8 + num6 * num9) / num10;
                this.ballX = this.p1X + num5 * 63 / num10;
                this.ballY = this.p1Y + num6 * 125 / num10;
                var flag3: boolean = num11 <= 0;
                if (flag3)
                {
                    var flag4: boolean = !this.fP1Sticky;
                    if (flag4)
                    {
                        this.ballVY = this.ballVY + (this.p1YV - 2 * num6 * num11 / num10);
                        this.ballVX = this.ballVX + (this.p1XV - 2 * num5 * num11 / num10) * 7 / 10;
                    }
                    else
                    {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    var flag5: boolean = this.ballVX < -15;
                    if (flag5)
                    {
                        this.ballVX = -15;
                    }
                    var flag6: boolean = this.ballVX > 15;
                    if (flag6)
                    {
                        this.ballVX = 15;
                    }
                    var flag7: boolean = this.ballVY < -22;
                    if (flag7)
                    {
                        this.ballVY = -22;
                    }
                    var flag8: boolean = this.ballVY > 22;
                    if (flag8)
                    {
                        this.ballVY = 22;
                    }
                }
                this.fP1Touched = true;
            }
            num5 = (this.ballX - this.p2X) * 2;
            num6 = this.ballY - this.p2Y;
            num7 = num5 * num5 + num6 * num6;
            num8 = this.ballVX - this.p2XV;
            num9 = this.ballVY - this.p2YV;
            var flag9: boolean = num6 > 0 && num7 < 15625 && num7 > 25;
            if (flag9)
            {
                var num12: number = <number>Math.sqrt(<number>num7);
                var num13: number = (num5 * num8 + num6 * num9) / num12;
                this.ballX = this.p2X + num5 * 63 / num12;
                this.ballY = this.p2Y + num6 * 125 / num12;
                var flag10: boolean = num13 <= 0;
                if (flag10)
                {
                    var flag11: boolean = !this.fP2Sticky;
                    if (flag11)
                    {
                        this.ballVX = this.ballVX + (this.p2XV - 2 * num5 * num13 / num12) * 7 / 10;
                        this.ballVY = this.ballVY + (this.p2YV - 2 * num6 * num13 / num12);
                    }
                    else
                    {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    var flag12: boolean = this.ballVX < -15;
                    if (flag12)
                    {
                        this.ballVX = -15;
                    }
                    var flag13: boolean = this.ballVX > 15;
                    if (flag13)
                    {
                        this.ballVX = 15;
                    }
                    var flag14: boolean = this.ballVY < -22;
                    if (flag14)
                    {
                        this.ballVY = -22;
                    }
                    var flag15: boolean = this.ballVY > 22;
                    if (flag15)
                    {
                        this.ballVY = 22;
                    }
                }
                this.fP2Touched = true;
            }
            var flag16: boolean = this.ballX < 15;
            if (flag16)
            {
                this.ballX = 15;
                this.ballVX = -this.ballVX;
            }
            var flag17: boolean = this.ballX > 985;
            if (flag17)
            {
                this.ballX = 985;
                this.ballVX = -this.ballVX;
            }
            var flag18: boolean = this.ballX <= 50 || this.ballX >= 950;
            if (flag18)
            {
                var flag19: boolean = (this.ballY > 200 && this.ballOldY < 200) || (this.ballY < 200 && this.ballOldY >= 200);
                if (flag19)
                {
                    this.ballY = 200;
                    this.ballVY = this.ballVY * -1;
                }
                var flag20: boolean = this.ballY > 180 && this.ballY < 220;
                if (flag20)
                {
                    var flag21: boolean = this.ballX > 40 && this.ballX < 50 && this.ballVX < 0;
                    if (flag21)
                    {
                        this.ballX = 50;
                        this.ballVX = this.ballVX * -1;
                    }
                    var flag22: boolean = this.ballX < 960 && this.ballX > 950 && this.ballVX > 0;
                    if (flag22)
                    {
                        this.ballX = 950;
                        this.ballVX = this.ballVX * -1;
                    }
                }
            }
            var flag23: boolean = this.ballY < 34;
            if (flag23)
            {
                this.ballY = 34;
                this.ballVY = -this.ballVY * 7 / 10;
                this.ballVX = this.ballVX * 7 / 10;
            }
        }
        num2 = this.ballX * this.nWidth / 1000;
        num3 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("yellow"));
        this.screen.fillOval(num2 - num, num3 - num, num * 2, num * 2);
    }
    private DrawGoals(): void
    {
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillRect(this.nWidth / 20, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, 5, 200 * this.nHeight / 1000);
        this.screen.fillRect(this.nWidth - this.nWidth / 20 - 5, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, 5, 200 * this.nHeight / 1000);
        this.screen.fillRect(0, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);
        this.screen.fillRect(this.nWidth * 9 / 10, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);
        for (var i: number = 0; i < this.nWidth / 20; i = i + 5)
        {
            this.screen.drawLine(i, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, i, 4 * this.nHeight / 5);
            this.screen.drawLine(this.nWidth - i, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, this.nWidth - i, 4 * this.nHeight / 5);
        }
        for (var j: number = 4 * this.nHeight / 5 - this.nHeight / 5; j < 4 * this.nHeight / 5; j = j + 5)
        {
            this.screen.drawLine(0, j, this.nWidth / 20, j);
            this.screen.drawLine(this.nWidth, j, this.nWidth - this.nWidth / 20, j);
        }
        var num: number = (60 - this.p1TouchingGoal) * this.nWidth / 120;
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.screen.fillRect(0, this.nHeight - 5, num, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(num, this.nHeight - 5, this.nWidth / 2 - num, 5);
        var num2: number = this.nWidth - (60 - this.p2TouchingGoal) * this.nWidth / 120;
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.screen.fillRect(num2, this.nHeight - 5, this.nWidth, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(this.nWidth / 2, this.nHeight - 5, num2 - this.nWidth / 2, 5);
    }
    private DrawStatus(): void
    {
        var graphics: Graphics = this.screen;
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        var text: string = null;
        var v: string = this.MakeTime(this.gameTime);
        var num: number = this.nHeight / 20;
        var num2: number = 0;
        var num3: number = fontMetrics.stringWidth(v);
        var flag: boolean = this.worldCup;
        if (flag)
        {
            var num4: number = this.worldCupRound;
            var flag2: boolean = num4 === 1;
            if (flag2)
            {
                text = "Quarter Finals";
            }
            else
            {
                var flag3: boolean = num4 === 2;
                if (flag3)
                {
                    text = "Semi-Finals";
                }
                else
                {
                    var flag4: boolean = num4 === 3;
                    if (flag4)
                    {
                        text = "Final";
                    }
                    else
                    {
                        text = "Qualifying";
                    }
                }
            }
            var flag5: boolean = this.fGoldenGoal;
            if (flag5)
            {
                text = text + " [Golden Goal]";
            }
            else
            {
                var flag6: boolean = this.fExtraTime;
                if (flag6)
                {
                    text = text + " [Extra Time]";
                }
            }
            num2 = fontMetrics.stringWidth(text);
        }
        var num5: number = (num2 <= num3) ? num3 : num2;
        graphics.setColor(Color.fromString("blue"));
        graphics.fillRect(this.nWidth / 2 - num5 / 2 - 5, 0, num5 + 10, num + 22);
        graphics.setColor(Color.fromString("white"));
        this.screen.drawString(v, this.nWidth / 2 - num3 / 2, fontMetrics.getAscent() + 20);
        var flag7: boolean = text !== null;
        if (flag7)
        {
            this.screen.drawString(text, this.nWidth / 2 - num2 / 2, fontMetrics.getAscent() + 20 - fontMetrics.getHeight());
        }
    }
    drawPrompt(): void;
    drawPrompt(s: string, i: number): void;
    drawPrompt(s?: string, i?: number): void
    {
        if (arguments.length === 0)
        {
            this.drawPrompt_0();
            return;
        }
        this.drawPrompt_1(s, i);
    }
    private drawPrompt_0(): void
    {
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
        this.drawPrompt(this.promptMsg, 0);
    }
    private drawPrompt_1(s: string, i: number): void
    {
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("lightGray"));
        this.screen.drawString(s, (this.nWidth - fontMetrics.stringWidth(s)) / 2, this.nHeight * 4 / 5 + fontMetrics.getHeight() * (i + 1) + 10);
    }
    private promptBox(s: string, s1: string): void
    {
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        var num: number = fontMetrics.stringWidth(s);
        var num2: number = fontMetrics.stringWidth(s1);
        var num3: number = (num <= num2) ? num2 : num;
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect(this.nWidth / 2 - num3 / 2 - 20, this.nHeight * 2 / 5, num3 + 40, this.nHeight / 5);
        this.screen.setColor(Color.fromString("white"));
        this.screen.drawString(s, this.nWidth / 2 - num / 2, this.nHeight * 9 / 20);
        this.screen.drawString(s1, this.nWidth / 2 - num2 / 2, this.nHeight * 11 / 20);
        this.flip();
    }
    private SaveReplayData(): void
    {
        this.replayData[this.replayPos][0] = this.p1X;
        this.replayData[this.replayPos][1] = this.p1Y;
        this.replayData[this.replayPos][2] = this.p2X;
        this.replayData[this.replayPos][3] = this.p2Y;
        this.replayData[this.replayPos][4] = this.ballX;
        this.replayData[this.replayPos][5] = this.ballY;
        this.replayData[this.replayPos][6] = this.p1Col;
        this.replayData[this.replayPos][7] = this.p2Col;
        this.replayPos = this.replayPos + 1;
        var flag: boolean = this.replayPos >= 200;
        if (flag)
        {
            this.replayPos = 0;
        }
        var flag2: boolean = this.replayStart === this.replayPos;
        if (flag2)
        {
            this.replayStart = this.replayStart + 1;
        }
        var flag3: boolean = this.replayStart >= 200;
        if (flag3)
        {
            this.replayStart = 0;
        }
    }
    private drawScores(): void
    {
        var graphics: Graphics = this.screen;
        var num: number = this.nHeight / 20;
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        fontMetrics.stringWidth("Replay...");
        graphics.setColor(Color.fromString("blue"));
        graphics.fillRect(0, 0, this.nWidth, num + 22);
        graphics.setColor(Color.fromString("white"));
        graphics.drawString(this.slimeColText[this.p1Col] + " : " + this.p1Score, this.nWidth / 20, num);
        var v: string = this.p2Score + " : " + this.slimeColText[this.p2Col];
        graphics.drawString(v, this.nWidth - this.nWidth / 20 - fontMetrics.stringWidth(v), num);
    }
    checkScored(): boolean
    {
        var flag: boolean = this.ballY < 200 && (this.ballX < 40 || this.ballX > 960);
        var result: boolean;
        if (flag)
        {
            this.nScoreX = this.ballX;
            this.fPlayOn = true;
            this.playOnTicks = 10;
            result = true;
        }
        else
        {
            result = false;
        }
        return result;
    }
    async run()
    {
        this.worldCupRound = 0;
        do
        {
            this.initStuff();
            this.replayPos = (this.replayStart = 0);
            this.scoringRun = 0;
            this.fP1Touched = (this.fP2Touched = false);
            this.gameTime = 0;
            this.startTime = Date.now();
            this.fEndGame = false;
            this.fCanChangeCol = false;
            this.mousePressed = false;
            this.gameTime = <number>this.gameLength;
            this.fInPlay = true;
            this.fEndGame = false;
            var flag: boolean = this.worldCup;
            if (flag)
            {
                this.paint(super.getGraphics());
                do
                {
                    this.p2Col = <number>(Math.random() * <number>this.slimaryCols.length / 4.0) + this.worldCupRound * this.slimaryCols.length / 4 >>> 0;
                }
                while (this.p1Col === this.p2Col);
                var s: string = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
                var num: number = this.worldCupRound;
                var flag2: boolean = num === 0;
                if (flag2)
                {
                    this.promptBox("Qualifying Round", s);
                    this.gameLength = 30000;
                }
                else
                {
                    var flag3: boolean = num === 1;
                    if (flag3)
                    {
                        this.promptBox("Quarter Finals", s);
                        this.gameLength = 120000;
                    }
                    else
                    {
                        var flag4: boolean = num === 2;
                        if (flag4)
                        {
                            this.promptBox("Semi-Finals", s);
                            this.gameLength = 120000;
                        }
                        else
                        {
                            var flag5: boolean = num === 3;
                            if (flag5)
                            {
                                this.promptBox("World Cup Final", s);
                                this.gameLength = 300000;
                            }
                        }
                    }
                }
                await this.ThreadSleep(4000);
                await this.clearAndRepaint();
                this.flip();
            }
            while (this.gameTime > 0 || (this.worldCup && this.worldCupRound > 0 && this.p1Score === this.p2Score))
            {
                this.gameTime = this.startTime + <number>this.gameLength - Date.now();
                var flag6: boolean = this.gameTime < 0;
                if (flag6)
                {
                    this.gameTime = 0;
                }
                var flag7: boolean = this.worldCup && !this.fExtraTime && this.gameTime <= 0 && this.worldCupRound > 0 && this.p1Score === this.p2Score;
                if (flag7)
                {
                    var text: string = (this.p1Score !== 0) ? (" " + this.p1Score) : " nil";
                    this.promptBox(NString.Concat([
                        "The score is ", this.slimeColText[this.p1Col], text, ", ", this.slimeColText[this.p2Col], text, "."
                    ]), "And the game goes into extra time...");
                    await this.ThreadSleep(4000);
                    await this.clearAndRepaint();
                    this.flip();
                    this.startTime = this.startTime + 30000;
                    this.gameTime = this.gameTime + 30000;
                    this.fExtraTime = true;
                }
                else
                {
                    var flag8: boolean = this.gameTime <= 0 && this.fExtraTime && !this.fGoldenGoal && this.p1Score === this.p2Score;
                    if (flag8)
                    {
                        this.fGoldenGoal = true;
                        var text2: string = (this.p1Score !== 0) ? (" " + this.p1Score) : " nil";
                        this.promptBox(NString.Concat([
                            "The score is ", this.slimeColText[this.p1Col], text2, ", ", this.slimeColText[this.p2Col], text2, ", and the game goes into Golden Goal."
                        ]), "The next player to score will win the match!");
                        await this.ThreadSleep(4000);
                        await this.clearAndRepaint();
                        this.flip();
                    }
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
                var flag9: boolean = this.p1X < 150;
                if (flag9)
                {
                    this.p1TouchingGoal = this.p1TouchingGoal + 1;
                }
                else
                {
                    this.p1TouchingGoal = 0;
                }
                var flag10: boolean = this.p2X > 850;
                if (flag10)
                {
                    this.p2TouchingGoal = this.p2TouchingGoal + 1;
                }
                else
                {
                    this.p2TouchingGoal = 0;
                }
                var flag11: boolean = this.fPlayOn;
                if (flag11)
                {
                    this.playOnTicks = this.playOnTicks - 1;
                }
                else
                {
                    this.fPlayOn = this.checkScored();
                }
                var flag12: boolean = this.playOnTicks === 0 || this.p1TouchingGoal > 60 || this.p2TouchingGoal > 60;
                if (flag12)
                {
                    var num2: number = Date.now();
                    var flag13: boolean = this.p1TouchingGoal > 60;
                    if (flag13)
                    {
                        this.p2Score = this.p2Score + 1;
                        this.promptMsg = this.slimeColText[this.p1Col] + " pinged for goal hanging!";
                    }
                    else
                    {
                        var flag14: boolean = this.p2TouchingGoal > 60;
                        if (flag14)
                        {
                            this.p1Score = this.p1Score + 1;
                            this.promptMsg = this.slimeColText[this.p2Col] + " pinged for goal hanging!";
                        }
                        else
                        {
                            var flag15: boolean = this.nScoreX < 500;
                            if (flag15)
                            {
                                this.p2Score = this.p2Score + 1;
                                this.promptMsg = this.slimeColText[this.p2Col] + " Scores!";
                            }
                            else
                            {
                                this.p1Score = this.p1Score + 1;
                                this.promptMsg = this.slimeColText[this.p1Col] + " Scores!";
                            }
                        }
                    }
                    this.drawPrompt();
                    this.drawPrompt("Click mouse for replay...", 1);
                    this.flip();
                    this.mousePressed = false;
                    var flag16: boolean = this.gameThread !== null;
                    if (flag16)
                    {
                        await this.ThreadSleep(2500);
                    }
                    var flag17: boolean = this.mousePressed;
                    if (flag17)
                    {
                        this.SaveReplayData();
                        await this.DoReplay();
                    }
                    this.promptMsg = "";
                    this.drawPrompt();
                    this.playOnTicks = 10;
                    this.fPlayOn = false;
                    this.startTime = this.startTime + (Date.now() - num2);
                    this.ballX = 490 + ((Math.random() * 20.0) >>> 0);
                    this.ballY = 190 + ((Math.random() * 20.0) >>> 0);
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p1YV = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p2YV = 0;
                    this.replayStart = (this.replayPos = 0);
                    await this.clearAndRepaint();
                }
                var flag18: boolean = this.gameThread !== null;
                if (flag18)
                {
                    var flag19: boolean = this.fPlayOn;
                    if (flag19)
                    {
                        await this.ThreadSleep(120);
                    }
                    else
                    {
                        await this.ThreadSleep(20);
                    }
                }
            }
            this.fEndGame = true;
            var flag20: boolean = this.fPlayOn;
            if (flag20)
            {
                var flag21: boolean = this.nScoreX < 500;
                if (flag21)
                {
                    this.p2Score = this.p2Score + 1;
                    this.promptMsg = this.slimeColText[this.p2Col] + " scores at the final whistle!";
                }
                else
                {
                    this.p1Score = this.p1Score + 1;
                    this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
                }
                this.drawPrompt();
            }
            else
            {
                this.drawPrompt("And that's the final whistle!", 0);
            }
            var flag22: boolean = this.worldCup;
            if (flag22)
            {
                var flag23: boolean = this.p1Score === this.p2Score;
                if (flag23)
                {
                    this.drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
                    this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
                    this.worldCup = false;
                    this.flip();
                }
                else
                {
                    var flag24: boolean = this.p1Score >= this.p2Score;
                    if (flag24)
                    {
                        var num3: number = this.worldCupRound;
                        var flag25: boolean = num3 === 0;
                        if (flag25)
                        {
                            this.drawPrompt(this.slimeColText[this.p1Col] + " qualifies for the world cup!", 1);
                        }
                        var flag26: boolean = num3 === 1;
                        if (flag26)
                        {
                            this.drawPrompt(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                        }
                        var flag27: boolean = num3 === 2;
                        if (flag27)
                        {
                            this.drawPrompt(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                        }
                        var flag28: boolean = num3 === 3;
                        if (flag28)
                        {
                            this.drawPrompt(this.slimeColText[this.p1Col] + " wins the WORLD CUP!!!!!", 1);
                        }
                        var flag29: boolean = this.worldCupRound === 3;
                        if (flag29)
                        {
                            this.worldCup = false;
                            this.promptBox("You win the world cup!!!", "Congratulations!");
                        }
                        else
                        {
                            this.worldCupRound = this.worldCupRound + 1;
                        }
                    }
                    else
                    {
                        var num4: number = this.worldCupRound;
                        var flag30: boolean = num4 === 0;
                        if (flag30)
                        {
                        }
                        var flag31: boolean = num4 === 1;
                        if (flag31)
                        {
                            this.promptBox("You have been eliminated.", "Goodbye.");
                        }
                        var flag32: boolean = num4 === 2;
                        if (flag32)
                        {
                            this.promptBox("You have been knocked out of the semifinals.", "You played well.");
                        }
                        var flag33: boolean = num4 === 3;
                        if (flag33)
                        {
                            this.promptBox("You came second.", "Are you satisfied with that?");
                        }
                        this.worldCup = false;
                    }
                }
            }
            else
            {
                var flag34: boolean = this.p1Score === this.p2Score;
                if (flag34)
                {
                    this.drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
                }
                else
                {
                    var flag35: boolean = this.p1Score < this.p2Score;
                    if (flag35)
                    {
                        this.drawPrompt(NString.Concat([
                            this.slimeColText[this.p2Col], " (", this.p2Score, ")    def. ", this.slimeColText[this.p1Col], " (", this.p1Score, ")"
                        ]), 1);
                    }
                    else
                    {
                        this.drawPrompt(NString.Concat([
                            this.slimeColText[this.p1Col], " (", this.p1Score, ")    def. ", this.slimeColText[this.p2Col], " (", this.p2Score, ")"
                        ]), 1);
                    }
                }
            }
            this.flip();
            if (this.isStarted) {
                await this.ThreadSleep(5000);
            }
            this.initStuff();
            this.isStarted = true;
        }
        while (this.worldCup);
        this.fCanChangeCol = true;
        this.fInPlay = false;
        await this.clearAndRepaint();
    }
    init(): void
    {
        this.nWidth = super.size().width;
        this.nHeight = super.size().height;
        this.fInPlay = (this.fEndGame = false);
        this.fCanChangeCol = true;
        this.initStuff();
        this.promptMsg = "Click on an option to play...";
        this.backBuffer = super.createImage(this.nWidth, this.nHeight);
        this.screen = super.getGraphics();
        this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));

        super.registerEventListeners(this);
    }
    private async toggleBuffering()
    {
        var flag: boolean = this.doubleBuffered = !this.doubleBuffered;
        if (flag)
        {
            this.screen = this.backBuffer.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        }
        else
        {
            this.screen = super.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
        }
        await this.clearAndRepaint();
    }
    private async DoReplay()
    {
        var fontMetrics: FontMetrics = this.screen.getFontMetrics();
        var num: number = fontMetrics.stringWidth("Replay...");
        var height: number = fontMetrics.getHeight();
        var j: number = this.nWidth / 2 - num / 2;
        var k: number = this.nHeight / 2 - height;
        this.promptMsg = "Click the mouse to continue...";
        this.mousePressed = false;
        var num2: number = this.replayPos - 1;
        while (!this.mousePressed)
        {
            var flag: boolean = (num2 = num2 + 1) >= 200;
            if (flag)
            {
                num2 = 0;
            }
            var flag2: boolean = num2 === this.replayPos;
            if (flag2)
            {
                await this.ThreadSleep(1000);
                num2 = this.replayStart;
                this.paint(super.getGraphics());
            }
            await this.ReplayFrame(num2, j, k, num, height, false);
            this.flip();
        }
        this.promptMsg = "";
        this.paint(super.getGraphics());
    }
    private flip(): void
    {
        var flag: boolean = this.doubleBuffered;
        if (flag)
        {
            super.getGraphics().drawImage(this.backBuffer, 0, 0, null);
        }
    }
    private getBallBounceX(): number
    {
        var num: number = this.ballVY + <number>Math.sqrt(<number>(this.ballVY * this.ballVY + 2 * this.ballY));
        var num2: number = this.ballX + num * this.ballVX;
        var flag: boolean = num2 < 0;
        if (flag)
        {
            num2 = -num2;
        }
        var flag2: boolean = num2 > 1000;
        if (flag2)
        {
            num2 = 1000 - num2;
        }
        return num2;
    }
    private getBallMaxY(): number
    {
        var flag: boolean = this.ballVY < 0;
        var result: number;
        if (flag)
        {
            result = this.ballY;
        }
        else
        {
            result = this.ballY + this.ballVY * this.ballVY / 2;
        }
        return result;
    }
    private controlP2v0(): void
    {
        this.p2XV = 0;
        var flag: boolean = this.ballX > this.p2X + 5 && this.ballX < 960;
        if (flag)
        {
            this.fP2Sticky = true;
        }
        var flag2: boolean = this.ballX > this.p2X - 10;
        if (flag2)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag3: boolean = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag3)
        {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag4: boolean = this.ballX + 50 < this.p2X;
        if (flag4)
        {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag5: boolean = this.ballX > this.p2X + 50 && this.p2YV === 0 && this.ballY > 10 && this.ballY < 150;
        if (flag5)
        {
            this.p2YV = this.JUMPVEL;
        }
        var flag6: boolean = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag6)
        {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    private controlP2v1(): void
    {
        this.p2XV = 0;
        var ballBounceX: number = this.getBallBounceX();
        var ballMaxY: number = this.getBallMaxY();
        var flag: boolean = ballBounceX > 900;
        if (flag)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag2: boolean = ballBounceX + 20 < this.p2X;
        if (flag2)
        {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag3: boolean = this.ballX > this.p2X - 10;
        if (flag3)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag4: boolean = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag4)
        {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag5: boolean = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag5)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag6: boolean = this.ballX > this.p2X && this.ballX < 960;
        if (flag6)
        {
            this.fP2Sticky = true;
        }
        var flag7: boolean = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag7)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag8: boolean = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag8)
        {
            var flag9: boolean = this.p2X < 900;
            if (flag9)
            {
                this.p2XV = this.SLIMEVEL;
            }
            var flag10: boolean = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag10)
            {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag11: boolean = this.p2YV === this.JUMPVEL;
        if (flag11)
        {
            var flag12: boolean = ballMaxY < 110;
            if (flag12)
            {
                this.p2YV = 0;
            }
            var flag13: boolean = this.ballX < this.p2X - 400;
            if (flag13)
            {
                this.p2YV = 0;
            }
            var flag14: boolean = this.ballY < 80;
            if (flag14)
            {
                this.p2YV = 0;
            }
            var flag15: boolean = this.ballX < 900 && this.p2X > 900;
            if (flag15)
            {
                this.p2YV = 0;
            }
            var flag16: boolean = this.p2X < 150;
            if (flag16)
            {
                this.p2YV = 0;
            }
        }
        var flag17: boolean = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag17)
        {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    private controlP2v2(): void
    {
        var ballBounceX: number = this.getBallBounceX();
        var ballMaxY: number = this.getBallMaxY();
        var flag: boolean = this.p2X < 790;
        if (flag)
        {
            this.p2XV = this.SLIMEVEL;
        }
        else
        {
            var flag2: boolean = this.p2X > 830;
            if (flag2)
            {
                this.p2XV = -this.SLIMEVEL;
            }
            else
            {
                this.p2XV = 0;
            }
        }
        var flag3: boolean = ballBounceX > 900;
        if (flag3)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag4: boolean = ballBounceX + 20 < this.p2X;
        if (flag4)
        {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag5: boolean = this.ballX > this.p2X - 10;
        if (flag5)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag6: boolean = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag6)
        {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag7: boolean = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag7)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag8: boolean = this.ballX > this.p2X && this.ballX < 960;
        if (flag8)
        {
            this.fP2Sticky = true;
        }
        var flag9: boolean = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag9)
        {
            this.p2XV = this.SLIMEVEL;
        }
        var flag10: boolean = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag10)
        {
            var flag11: boolean = this.p2X < 900;
            if (flag11)
            {
                this.p2XV = this.SLIMEVEL;
            }
            var flag12: boolean = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag12)
            {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag13: boolean = this.p2YV === this.JUMPVEL;
        if (flag13)
        {
            var flag14: boolean = ballMaxY < 110;
            if (flag14)
            {
                this.p2YV = 0;
            }
            var flag15: boolean = this.ballX < this.p2X - 400;
            if (flag15)
            {
                this.p2YV = 0;
            }
            var flag16: boolean = this.ballY < 80;
            if (flag16)
            {
                this.p2YV = 0;
            }
            var flag17: boolean = this.ballX < 900 && this.p2X > 900;
            if (flag17)
            {
                this.p2YV = 0;
            }
        }
        var flag18: boolean = this.p2YV === 0 && this.p2X < 400 && ballBounceX > 500 && ballMaxY > 50;
        if (flag18)
        {
            this.p2YV = this.JUMPVEL;
        }
        var flag19: boolean = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag19)
        {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    private controlP2v3(): void
    {
        var num: number = this.SLIMEVEL * 4 / 3;
        var ballBounceX: number = this.getBallBounceX();
        var ballMaxY: number = this.getBallMaxY();
        var flag: boolean = this.p2X < 790;
        if (flag)
        {
            this.p2XV = num;
        }
        else
        {
            var flag2: boolean = this.p2X > 830;
            if (flag2)
            {
                this.p2XV = -num;
            }
            else
            {
                this.p2XV = 0;
            }
        }
        var flag3: boolean = ballBounceX > 900;
        if (flag3)
        {
            this.p2XV = num;
        }
        var flag4: boolean = ballBounceX + 20 < this.p2X;
        if (flag4)
        {
            this.fP2Sticky = false;
            this.p2XV = -num;
        }
        var flag5: boolean = this.ballX > this.p2X - 10;
        if (flag5)
        {
            this.p2XV = num;
        }
        var flag6: boolean = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag6)
        {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag7: boolean = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag7)
        {
            this.p2XV = num;
        }
        var flag8: boolean = this.ballX > this.p2X && this.ballX < 960;
        if (flag8)
        {
            this.fP2Sticky = true;
        }
        var flag9: boolean = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag9)
        {
            this.p2XV = num;
        }
        var flag10: boolean = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag10)
        {
            var flag11: boolean = this.p2X < 900;
            if (flag11)
            {
                this.p2XV = num;
            }
            var flag12: boolean = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag12)
            {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag13: boolean = this.p2YV === this.JUMPVEL;
        if (flag13)
        {
            var flag14: boolean = ballMaxY < 110;
            if (flag14)
            {
                this.p2YV = 0;
            }
            var flag15: boolean = this.ballX < this.p2X - 400;
            if (flag15)
            {
                this.p2YV = 0;
            }
            var flag16: boolean = this.ballY < 80;
            if (flag16)
            {
                this.p2YV = 0;
            }
            var flag17: boolean = this.ballX < 900 && this.p2X > 900;
            if (flag17)
            {
                this.p2YV = 0;
            }
            var flag18: boolean = this.p2XV > 0 && ballMaxY > 200 && ballBounceX > this.p2X + 300;
            if (flag18)
            {
                this.p2YV = 0;
            }
        }
        var flag19: boolean = this.p2YV === 0 && this.p2X < 400 && ballBounceX > this.p2X + 400 && ballMaxY > 50;
        if (flag19)
        {
            this.p2YV = this.JUMPVEL;
        }
        var flag20: boolean = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / num;
        if (flag20)
        {
            this.p2XV = -num;
        }
    }
    private p(s: string): void
    {
        console.log(s);
    }
}
