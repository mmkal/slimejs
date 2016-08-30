class SlimeCricket2 extends SlimeGame
{
	private static p1Diam: number = 75;
	private static p2Diam: number = 75;
	private static ballRad: number = 13;
	private nWidth: number = 0;
	private nHeight: number = 0;
	private p1X: number = 0;
	private p1Y: number = 0;
	private p2X: number = 0;
	private p2Y: number = 0;
	private p3X: number = 963;
	private p3Y: number = 0;
	private p1Col: number = 0;
	private p2Col: number = 0;
	private slimeColours: Color[] = [
		Color.fromString("yellow"), new Color(0, 0, 128), new Color(164, 164, 255), Color.fromString("black"), new Color(0, 100, 0), new Color(0, 162, 0), new Color(0, 0, 210), new Color(128, 78, 0), Color.fromString("red"), Color.fromString("black")
	];
	private slimeColours2: Color[] = [
		new Color(0, 100, 0), Color.fromString("red"), Color.fromString("yellow"), Color.fromString("gray"), Color.fromString("white"), Color.fromString("yellow"), Color.fromString("yellow"), new Color(60, 160, 60), Color.fromString("yellow"), Color.fromString("white")
	];
	private slimeColText: string[] = [
		"Australia ", "England ", "India ", "New Zealand ", "Pakistan ", "South Africa ", "Sri Lanka ", "West Indies ", "Zimbabwe ", "Computer"
	];
	private slimeColAbbr: string[] = [
		"AUS", "ENG", "IND", "NZ", "PAK", "RSA", "SL", "WI", "ZIM", "AI"
	];
	private difficultyColours: Color[] = [
		Color.fromString("blue"), Color.fromString("green"), Color.fromString("red")
	];
	private difficultyText: string[] = [
		"Grade", "Domestic", "International"
	];
	private difficulty: number = 0;
	private p1OldX: number = 0;
	private p1OldY: number = 0;
	private p2OldX: number = 0;
	private p2OldY: number = 0;
	private p3OldY: number = 0;
	private p1XV: number = 0;
	private p1YV: number = 0;
	private p2XV: number = 0;
	private p2YV: number = 0;
	private p3YV: number = 0;
	private ballX: number = 0;
	private ballY: number = 0;
	private ballVX: number = 0;
	private ballVY: number = 0;
	private ballOldX: number = 0;
	private ballOldY: number = 0;
	private promptMsg: string = null;
	private mousePressed: boolean = false;
	private fCanChangeCol: boolean = false;
	private fInPlay: boolean = false;
	private p1Blink: number = 0;
	private p2Blink: number = 0;
	private fP1Touched: boolean = false;
	private fP2Touched: boolean = false;
	private gameThread: string = null;
	private fEndGame: boolean = false;
	private BALL_COL: Color = Color.fromString("white");
	private COURT_COL: Color = new Color(0, 160, 0);
	private static DAY_COL: Color = new Color(85, 85, 255);
	private NIGHT_COL: Color = new Color(0, 0, 68);
	private SKY_COL: Color = SlimeCricket2.DAY_COL;
	private bounces: number = 0;
	private fEndOfOver: boolean = false;
	private fHitBackWall: boolean = false;
	private p1XMin: number = 0;
	private p2XMin: number = 0;
	private p2XMax: number = 0;
	private ballXMax: number = 0;
	private p1Touches: number = 0;
	private ballCount: number = 0;
	private static postPos: number = 920;
	private bowlingCrease: number = 450;
	private runningCrease: number = 450;
	private battingCrease: number = 863;
	private p1Score: number = 0;
	private p2Score: number = 0;
	private inns: number = 1;
	private wicketPenalty: number = 5;
	private fNoBall: boolean = false;
	private overs: number = 5;
	private stillFrames: number = 0;
	private buffer: WImage = null;
	private thisBall: number = 0;
	private thisOver: string = null;
	private p1bxb: number[] = null;
	private p2bxb: number[] = null;
	private p1Hold: boolean = false;
	private ballbowled: boolean = false;
	private p1next: boolean = false;
	private p2next: boolean = false;
	private wait: number = 0;
	private p1ai: boolean = false;
	private p2ai: boolean = false;
	private balltype: number = -1;
	private shottype: number = -1;
	private static AI_COL: number = 9;
	private COMM_FOUR: string[] = [
		"Along the carpet it goes for four.", "Back past the bowler for four.", "Picks the gap nicely and into the fence it goes for four.", "Shot!", "Four more added to the total.", "It's certainly a batsman's paradise out there today.", "... and the umpire waves his arm once more.", "Exactly not what the bowler had planned.", "Well it's bounced up off the rope and smacked some guy in the face!"
	];
	private COMM_FOURTOUCHED: string[] = [
		"Terrible fielding effort there.", "The bowler won't be pleased with that effort.", "Well that should never have been a four."
	];
	private COMM_SIX: string[] = [
		"He's carving them up like a Christmas cake!", "That's come right orf the meat of the bat.", "He's hit that one very hored indeed.", "He's smacked that one.", "He's gone for it... it's gone all the way!", "Must be playing on a road out there today.", "Looks like he's chasing Andrew Symonds' record here..."
	];
	private COMM_SIXTOUCHED: string[] = [
		"Oh no, he's done a Paul Reiffel!", "Well that's six more on top of the no ball, he can't be happy."
	];
	private COMM_STUMPED: string[] = [
		"Stumped him!", "A fine example of wicket keeping there. Excellent stuff.", "There goes the red light! What quick hands this keeper has!"
	];
	private COMM_RUNOUT: string[] = [
		"He's run out! What a tragedy!", "... and there's the red light. He's out.", "Allan Donald would be pleased with that effort.", "Well the fielder's decided to chance his arm, and it's come off!", "The bails were off in a flash, he never had a chance.", "Poor calling there, he deserved to get out.", "Well what else do you expect if you run like Ranatunga?"
	];
	private COMM_BOWLED: string[] = [
		"Bowled him neck and crop.", "Tremendous delivery, he really had no idea about that.", "What a marvellous ball!", "That's a ripsnorter of a ball!", "I think that's just knocked Joe the stumpcameraman out.", "Well the bowler's certainly had his weeties this morning.", "There's the death rattle.", "That's gotta be a contender for today's fastest ball.", "Straight through the gate. The batsman won't be pleased with that.", "Completely bamboozled.", "A wonderful spell of bowling, this."
	];
	private COMM_PLAYEDON: string[] = [
		"He's played on!", "A magnificent chop shot, oh wait, it's hit the stumps.", "He's done an Adam Gilchrist!"
	];
	private COMM_CAUGHT: string[] = [
		"He's hit it straight down his throat.", "A safe pair of hands, he doesn't drop those.", "What a magnificent shot! No, he's been caught!", "A marvellous catch, that.", "... and he takes a straightforward catch.", "Well, they say \"catches win matches\".", "Caught, yes!", "Well, he's picked out the only fielder in front of the bat!", "Can't be happy with that shot.", "What a shame, we can't use the snickometer on that one it's so damned obvious."
	];
	private COMM_CTBEHIND: string[] = [
		"... the keeper gobbles up the catch.", "... and the snickometer shows that that's clearly out.", "Excellent line and length, he's got another edge.", "Yes, there was some bat in that, he's gone!"
	];
	private COMM_OUT_GENERIC: string[] = [
		"Got him, yes!", "It's all happening here!", "A marvellous effort, that!", "He's out.", "Oh dear.", "Gone!", "What a magnificent fielding side this team is.", "Yes, another one! He's a hero, this man!"
	];
	init(): void
	{
		this.nWidth = super.size().width;
		this.nHeight = super.size().height;
		this.buffer = super.createImage(this.nWidth, this.nHeight);
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

        super.registerEventListeners(this);
	}

    restoreFromRemote(game: SlimeGame) {
        Object.getOwnPropertyNames(this).forEach(propName => {
            var propType = typeof(this[propName]);
            if (propType === "number" || propType === "boolean" || propType === "string" || propName === "p1bxb" || propName === "p2bxb") {
                this[propName] = game[propName];
            }
        });
        this.paint(super.getGraphics());
        this.DrawSlimers();
    }

	paint(_g: Graphics, excludeGround: boolean = false): void
	{
		var graphics: Graphics = this.buffer.getGraphics();
		this.nWidth = super.size().width;
		this.nHeight = super.size().height;
		graphics.setColor(this.SKY_COL);
		graphics.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
		if (!excludeGround) {
			graphics.setColor(this.COURT_COL);
			graphics.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
		}
		graphics.setColor(Color.fromString("white"));
		graphics.fillRect(this.nWidth * 920 / 1000 - 2, this.nHeight * 7 / 10, 3, this.nHeight / 10);
		graphics.fillRect(this.nWidth * this.bowlingCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
		graphics.fillRect(this.nWidth * this.runningCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
		graphics.fillRect(this.nWidth * this.battingCrease / 1000 - 1, this.nHeight * 4 / 5, 2, 5);
		this.drawPrompt();
		var flag: boolean = !this.fInPlay && this.fEndGame;
		if (flag)
		{
			var fontMetrics: FontMetrics = this.screen.getFontMetrics();
			this.screen.setColor(Color.fromString("white"));
			this.screen.drawString("Slime Cricket 2: World Cup Edition BETA", this.nWidth / 2 - fontMetrics.stringWidth("Slime Cricket 2: World Cup Edition BETA") / 2, this.nHeight / 2 - fontMetrics.getHeight() * 7);
			this.screen.drawString("This is not the final version of the game!", this.nWidth / 2 - fontMetrics.stringWidth("This is not the final version of the game!") / 2, this.nHeight / 2 - fontMetrics.getHeight() * 6);
			this.screen.setColor(this.slimeColours[this.p2Col]);
			this.screen.fillRect(this.nWidth / 4 - fontMetrics.stringWidth(this.slimeColText[this.p2Col]) / 2 - 10, this.nHeight / 2 - fontMetrics.getAscent() * 2, fontMetrics.stringWidth(this.slimeColText[this.p2Col]) + 20, fontMetrics.getAscent() * 2);
			this.screen.setColor(this.slimeColours2[this.p2Col]);
			this.screen.drawString(this.slimeColText[this.p2Col], this.nWidth / 4 - fontMetrics.stringWidth(this.slimeColText[this.p2Col]) / 2, this.nHeight / 2 - fontMetrics.getAscent() / 2);
			this.screen.setColor(this.slimeColours[this.p1Col]);
			this.screen.fillRect(this.nWidth / 2 - fontMetrics.stringWidth(this.slimeColText[this.p1Col]) / 2 - 10, this.nHeight / 2 - fontMetrics.getAscent() * 2, fontMetrics.stringWidth(this.slimeColText[this.p1Col]) + 20, fontMetrics.getAscent() * 2);
			this.screen.setColor(this.slimeColours2[this.p1Col]);
			this.screen.drawString(this.slimeColText[this.p1Col], this.nWidth / 2 - fontMetrics.stringWidth(this.slimeColText[this.p1Col]) / 2, this.nHeight / 2 - fontMetrics.getAscent() / 2);
			this.screen.setColor(this.difficultyColours[this.difficulty]);
			this.screen.fillRect(this.nWidth * 3 / 4 - fontMetrics.stringWidth(this.difficultyText[this.difficulty]) / 2 - 10, this.nHeight / 2 - fontMetrics.getAscent() * 2, fontMetrics.stringWidth(this.difficultyText[this.difficulty]) + 20, fontMetrics.getAscent() * 2);
			this.screen.setColor(Color.fromString("white"));
			this.screen.drawString(this.difficultyText[this.difficulty], this.nWidth * 3 / 4 - fontMetrics.stringWidth(this.difficultyText[this.difficulty]) / 2, this.nHeight / 2 - fontMetrics.getAscent() / 2);
			graphics.setColor(Color.fromString("white"));
			this.screen.setColor(this.SKY_COL);
			for (var i: number = 0; i < 5; i = i + 1)
			{
				graphics.fillRect(this.nWidth / 4 + i * this.nWidth / 10 + 5, this.nHeight * 2 / 3 - fontMetrics.getAscent() * 3 / 2, this.nWidth / 10 - 10, 2 * fontMetrics.getAscent());
				this.screen.drawString(i + 1 + " overs", this.nWidth * 3 / 10 + i * this.nWidth / 10 - fontMetrics.stringWidth(i + 1 + " overs") / 2, this.nHeight * 2 / 3);
			}
			fontMetrics = graphics.getFontMetrics();
			graphics.setColor(Color.fromString("white"));
			graphics.drawString("Written by Wedgey and Fractoid", this.nWidth / 2 - fontMetrics.stringWidth("Written by Wedgey and Fractoid") / 2, this.nHeight / 2 - fontMetrics.getHeight() * 6);
			graphics.drawString("with input from Browny, Chucky and Damo", this.nWidth / 2 - fontMetrics.stringWidth("with input from Browny, Chucky and Damo") / 2, this.nHeight / 2 - fontMetrics.getHeight() * 5);
			this.drawScores();
			graphics.drawString("Bowling first", this.nWidth / 4 - fontMetrics.stringWidth("Bowling first") / 2, this.nHeight / 2 - fontMetrics.getAscent() * 3);
			graphics.drawString("Batting first", this.nWidth / 2 - fontMetrics.stringWidth("Batting first") / 2, this.nHeight / 2 - fontMetrics.getAscent() * 3);
			graphics.drawString("Difficulty", this.nWidth * 3 / 4 - fontMetrics.stringWidth("Difficulty") / 2, this.nHeight / 2 - fontMetrics.getAscent() * 3);
			graphics.drawString("Click on innings length to start...", this.nWidth / 2 - fontMetrics.stringWidth("Click on innings length to start...") / 2, this.nHeight * 2 / 3 - fontMetrics.getHeight() * 2);
			this.screen.setColor(this.SKY_COL);
		}
		else
		{
			var flag2: boolean = !this.fInPlay && !this.fEndGame && !this.fEndOfOver;
			if (flag2)
			{
				var fontMetrics2: FontMetrics = this.screen.getFontMetrics();
				this.screen.setColor(Color.fromString("white"));
				this.screen.drawString("Change of innings", this.nWidth / 2 - fontMetrics2.stringWidth("Change of innings") / 2, this.nHeight / 2 - fontMetrics2.getHeight() * 5);
				this.drawScores();
			}
			else
			{
				var flag3: boolean = this.fEndOfOver;
				if (flag3)
				{
					var fontMetrics3: FontMetrics = this.screen.getFontMetrics();
					this.screen.setColor(Color.fromString("white"));
					var flag4: boolean = this.inns === 2;
					if (flag4)
					{
						this.drawScores();
						this.screen.drawString("Over", this.nWidth / 2 - fontMetrics3.stringWidth("Over") / 2, fontMetrics3.getHeight());
						this.screen.drawString("Last over: " + this.thisOver, this.nWidth / 2 - fontMetrics3.stringWidth("Last over: " + this.thisOver) / 2, fontMetrics3.getHeight() * 2);
						this.drawWorm();
						this.screen.drawString("After " + this.ballCount / 6 + ((this.ballCount / 6 === 1) ? " over..." : " overs..."), this.nWidth / 2 - fontMetrics3.stringWidth("After " + this.ballCount / 6 + ((this.ballCount / 6 === 1) ? " over..." : " overs...")) / 2, fontMetrics3.getHeight() * 4);
						this.screen.drawString(this.slimeColText[this.p2Col].toUpperCase(), this.nWidth / 3, fontMetrics3.getHeight() * 5);
						this.screen.drawString(NString.Concat([this.p2Score]), this.nWidth * 2 / 3 - fontMetrics3.stringWidth(NString.Concat([this.p2Score])), fontMetrics3.getHeight() * 5);
						this.screen.drawString(NString.Concat([
							this.slimeColText[this.p1Col], " (", this.p1Score, ")"
						]), this.nWidth / 3, fontMetrics3.getHeight() * 6);
						this.screen.drawString(NString.Concat([this.p1bxb[this.ballCount - 1]]), this.nWidth * 2 / 3 - fontMetrics3.stringWidth(NString.Concat([this.p1bxb[this.ballCount - 1]])), fontMetrics3.getHeight() * 6);
					}
					var flag5: boolean = this.inns === 1;
					if (flag5)
					{
						this.drawScores();
						this.screen.drawString("Over", this.nWidth / 2 - fontMetrics3.stringWidth("Over") / 2, this.nHeight / 2 - fontMetrics3.getHeight() * 3);
						this.screen.drawString("Last over: " + this.thisOver, this.nWidth / 2 - fontMetrics3.stringWidth("Last over: " + this.thisOver) / 2, this.nHeight / 2 - fontMetrics3.getHeight());
					}
				}
				else
				{
					this.drawScores();
					this.drawWorm();
				}
			}
		}
		_g.drawImage(this.buffer, 0, 0, null);
	}
	private Mathrandom(): number
	{
		return Math.random();
	}
    private async clearAndRepaint() {
       // super.getGraphics().ctx.clearRect(0, 0, super.size().width, super.size().height);
        await this.paint(super.getGraphics());
    }
	async handleEventCore(wevent: WEvent)
	{
		var id: number = wevent.id;
		var flag: boolean = id === 503;
		if (flag)
		{
			super.showStatus("Slime Cricket 2: by Wedgey: http://www.student.uwa.edu.au/~wedgey/slimec/");
		}
		var flag2: boolean = id === 501;
		if (flag2)
		{
			this.mousePressed = true;
			var flag3: boolean = this.fEndOfOver;
			if (flag3)
			{
				this.gameThread = "new Thread(this);";
				setTimeout(() => this.run(), 4);
				this.thisOver = "";
				this.fEndOfOver = false;
				this.promptMsg = "";
				await this.clearAndRepaint()
			}
			else
			{
				var flag4: boolean = !this.fInPlay;
				if (flag4)
				{
					var flag5: boolean = this.fEndGame;
					if (flag5)
					{
						var fontMetrics: FontMetrics = this.screen.getFontMetrics();
						var flag6: boolean = wevent.y > this.nHeight * 2 / 3 - fontMetrics.getAscent() * 3 / 2 && wevent.y < this.nHeight * 2 / 3 + fontMetrics.getAscent() / 2;
						if (flag6)
						{
							var num: number = 0;
							while (num < 5 && !this.fInPlay)
							{
								var flag7: boolean = wevent.x > this.nWidth / 4 + num * this.nWidth / 10 + 5 && wevent.x < this.nWidth / 4 + (num + 1) * this.nWidth / 10 - 5;
								if (flag7)
								{
									this.fEndGame = false;
									this.fInPlay = true;
									this.p1ai = (this.p2ai = false);
									var flag8: boolean = this.p1Col === 9;
									if (flag8)
									{
										this.p2ai = true;
										while ((this.p1Col = <number>((this.Mathrandom() * <number>this.slimeColours.length)) >>> 0) === this.p2Col)
										{
										}
									}
									var flag9: boolean = this.p2Col === 9;
									if (flag9)
									{
										this.p1ai = true;
										while ((this.p2Col = <number>((this.Mathrandom() * <number>this.slimeColours.length)) >>> 0) === this.p1Col)
										{
										}
									}
									this.inns = 1;
									this.p1Score = (this.p2Score = 0);
									var num2: number = this.p1Col;
									this.p1Col = this.p2Col;
									this.p2Col = num2;
									this.SKY_COL = SlimeCricket2.DAY_COL;
									this.overs = num + 1;
									this.p1bxb = new Array<number>(this.overs * 6);
									this.p2bxb = new Array<number>(this.overs * 6);
									for (var i: number = 0; i < this.overs * 6; i = i + 1)
									{
										this.p1bxb[i] = (this.p2bxb[i] = 0);
									}
								}
								num = num + 1;
							}
						}
						else
						{
							var flag10: boolean = wevent.y > this.nHeight / 2 - fontMetrics.getAscent() * 2 && wevent.y < this.nHeight / 2;
							if (flag10)
							{
								var flag11: boolean = wevent.x > this.nWidth / 4 - fontMetrics.stringWidth(this.slimeColText[this.p2Col]) / 2 - 10 && wevent.x < this.nWidth / 4 + fontMetrics.stringWidth(this.slimeColText[this.p2Col]) / 2 + 10;
								if (flag11)
								{
									do
									{
										this.p2Col = ((this.p2Col !== this.slimeColours.length - 1) ? (this.p2Col + 1) : 0);
									}
									while (this.p1Col === this.p2Col);
									await this.clearAndRepaint()
								}
								else
								{
									var flag12: boolean = wevent.x > this.nWidth / 2 - fontMetrics.stringWidth(this.slimeColText[this.p1Col]) / 2 - 10 && wevent.x < this.nWidth / 2 + fontMetrics.stringWidth(this.slimeColText[this.p1Col]) / 2 + 10;
									if (flag12)
									{
										do
										{
											this.p1Col = ((this.p1Col !== this.slimeColours.length - 1) ? (this.p1Col + 1) : 0);
										}
										while (this.p1Col === this.p2Col);
										await this.clearAndRepaint()
									}
									else
									{
										var flag13: boolean = wevent.x > this.nWidth * 3 / 4 - fontMetrics.stringWidth(this.difficultyText[this.difficulty]) / 2 - 10 && wevent.x < this.nWidth * 3 / 4 + fontMetrics.stringWidth(this.difficultyText[this.difficulty]) / 2 + 10;
										if (flag13)
										{
											this.difficulty = (this.difficulty + 1) % this.difficultyText.length;
											await this.clearAndRepaint()
										}
									}
								}
							}
						}
					}
					else
					{
						this.fInPlay = true;
						this.inns = this.inns + 1;
						var num3: number = this.p1Col;
						this.p1Col = this.p2Col;
						this.p2Col = num3;
						var num4: number = this.p1Score;
						this.p1Score = this.p2Score;
						this.p2Score = num4;
						var array: number[] = this.p1bxb;
						this.p1bxb = this.p2bxb;
						this.p2bxb = array;
						var flag14: boolean = this.Mathrandom() < 0.8;
						if (flag14)
						{
							this.SKY_COL = this.NIGHT_COL;
						}
						var flag15: boolean = this.p1ai;
						this.p1ai = this.p2ai;
						this.p2ai = flag15;
					}
					var flag16: boolean = this.fInPlay;
					if (flag16)
					{
						this.ballCount = -1;
						this.thisOver = "";
						this.promptMsg = "";
						this.thisBall = 0;
						await this.nextBall();
						this.gameThread = "new Thread(this);";
						setTimeout(() => this.run(), 4);
					}
				}
			}
		}
		var flag17: boolean = id === 403 || id === 401;
		var result: boolean;
		if (flag17)
		{
			var flag18: boolean = this.fEndGame;
			if (flag18)
			{
				result = true;
			}
			else
			{
				var key: number = wevent.key;
				var flag19: boolean = key === 65 || key === 97;
				if (flag19)
				{
					var flag20: boolean = !this.p1ai;
					if (flag20)
					{
						this.p1L();
					}
				}
				var flag21: boolean = key === 68 || key === 100;
				if (flag21)
				{
					var flag22: boolean = !this.p1ai;
					if (flag22)
					{
						this.p1R();
					}
				}
				var flag23: boolean = key === 87 || key === 119;
				if (flag23)
				{
					var flag24: boolean = !this.p1ai;
					if (flag24)
					{
						this.p1J();
					}
				}
				var flag25: boolean = key === 83 || key === 115;
				if (flag25)
				{
					this.p1next = true;
					var flag26: boolean = !this.fEndOfOver && this.p1next && this.p2next;
					if (flag26)
					{
						await this.nextBall();
					}
				}
				var flag27: boolean = key === 81 || key === 69 || key === 113 || key === 101;
				if (flag27)
				{
					var flag28: boolean = !this.p1ai;
					if (flag28)
					{
						this.p3J();
					}
				}
				var flag29: boolean = key === 37 || key === 106 || key === 74;
				if (flag29)
				{
					var flag30: boolean = !this.p2ai;
					if (flag30)
					{
						this.p2L();
					}
				}
				var flag31: boolean = key === 39 || key === 108 || key === 76;
				if (flag31)
				{
					var flag32: boolean = !this.p2ai;
					if (flag32)
					{
						this.p2R();
					}
				}
				var flag33: boolean = key === 38 || key === 105 || key === 73;
				if (flag33)
				{
					var flag34: boolean = !this.p2ai;
					if (flag34)
					{
						this.p2J();
					}
				}
				var flag35: boolean = key === 40 || key === 75 || key === 107;
				if (flag35)
				{
					this.p2next = true;
					var flag36: boolean = !this.fEndOfOver && this.p1next && this.p2next;
					if (flag36)
					{
						await this.nextBall();
					}
				}
				var flag37: boolean = key === 32;
				if (flag37)
				{
					this.mousePressed = true;
				}
				result = true;
			}
		}
		else
		{
			var flag38: boolean = id === 404 || id === 402;
			if (flag38)
			{
				var key2: number = wevent.key;
				var flag39: boolean = key2 === 65 || key2 === 97;
				if (flag39)
				{
					var flag40: boolean = this.p1XV < 0 && !this.p1ai;
					if (flag40)
					{
						this.p1S();
					}
				}
				var flag41: boolean = key2 === 68 || key2 === 100;
				if (flag41)
				{
					var flag42: boolean = this.p1XV > 0 && !this.p1ai;
					if (flag42)
					{
						this.p1S();
					}
				}
				var flag43: boolean = key2 === 83 || key2 === 115;
				if (flag43)
				{
					this.p1Hold = false;
				}
				var flag44: boolean = key2 === 37 || key2 === 106 || key2 === 74;
				if (flag44)
				{
					var flag45: boolean = this.p2XV < 0 && !this.p2ai;
					if (flag45)
					{
						this.p2S();
					}
				}
				var flag46: boolean = key2 === 39 || key2 === 108 || key2 === 76;
				if (flag46)
				{
					var flag47: boolean = this.p2XV > 0 && !this.p2ai;
					if (flag47)
					{
						this.p2S();
					}
				}
				result = true;
			}
			else
			{
				result = false;
			}
		}
		return result;
	}
	private p1L(): void
	{
		this.p1XV = -8;
	}
	private p1R(): void
	{
		this.p1XV = 8;
	}
	private p1J(): void
	{
		var flag: boolean = this.p1Y === 0;
		if (flag)
		{
			this.p1YV = 31;
		}
	}
	private p1S(): void
	{
		this.p1XV = 0;
	}
	private p2L(): void
	{
		this.p2XV = -8;
	}
	private p2R(): void
	{
		this.p2XV = 8;
	}
	private p2J(): void
	{
		var flag: boolean = this.p2Y === 0;
		if (flag)
		{
			this.p2YV = 31;
		}
	}
	private p2S(): void
	{
		this.p2XV = 0;
	}
	private p3J(): void
	{
		var flag: boolean = this.p3Y === 0;
		if (flag)
		{
			this.p3YV = 31;
		}
	}
	private async nextBall()
	{
		this.wait = 50;
		this.p1XMin = (this.p1X = this.runningCrease - 37);
		this.p2XMin = (this.p2XMax = (this.p2X = this.battingCrease + 20));
		this.ballVX = (this.ballVY = (this.p1Y = (this.p2Y = (this.p2XV = (this.p2YV = (this.p3Y = (this.p3YV = (this.p1XV = (this.p1YV = 0)))))))));
		this.ballXMax = (this.ballX = this.runningCrease - 37);
		this.ballY = 400;
		this.balltype = -1;
		this.shottype = -1;
		this.p1next = (this.p2next = false);
		this.ballbowled = false;
		this.fP1Touched = (this.fP2Touched = false);
		this.bounces = 0;
		this.p1Touches = 0;
		var flag: boolean = this.fNoBall;
		if (flag)
		{
			this.thisBall = this.thisBall + 1;
		}
		var flag2: boolean = this.ballCount >= 0;
		if (flag2)
		{
			this.p2bxb[this.ballCount] = (this.p2Score = this.p2Score + <number>this.thisBall);
			var flag3: boolean = this.fNoBall;
			if (flag3)
			{
				this.thisOver = this.thisOver + "N";
			}
			var flag4: boolean = this.thisBall === -this.wicketPenalty || this.thisBall === -this.wicketPenalty + 1;
			if (flag4)
			{
				this.thisOver = this.thisOver + "W";
			}
			else
			{
				var flag5: boolean = this.thisBall === 0;
				if (flag5)
				{
					this.thisOver = this.thisOver + ".";
				}
				else
				{
					var flag6: boolean = !this.fNoBall || (this.thisBall !== -this.wicketPenalty + 1 && this.thisBall > 0);
					if (flag6)
					{
						this.thisOver = this.thisOver + ((!this.fNoBall) ? this.thisBall : (this.thisBall - 1));
					}
				}
			}
			this.thisOver = this.thisOver + " ";
		}
		this.thisBall = 0;
		var flag7: boolean = !this.fNoBall;
		if (flag7)
		{
			this.ballCount = this.ballCount + 1;
			var flag8: boolean = this.ballCount % 6 === 0 && this.ballCount !== 0 && this.ballCount !== this.overs * 6;
			if (flag8)
			{
				this.fEndOfOver = true;
				this.gameThread = null;
				this.promptMsg = "Click the mouse to continue...";
			}
		}
		this.fNoBall = false;
		this.fHitBackWall = false;
		this.stillFrames = 0;
		await this.clearAndRepaint()
	}
	private getMinScore(player: number): number
	{
		var num: number = 0;
		for (var i: number = 0; i < this.overs * 6; i = i + 1)
		{
			var flag: boolean = ((player === 1) ? this.p1bxb[i] : this.p2bxb[i]) < num;
			if (flag)
			{
				num = ((player === 1) ? this.p1bxb[i] : this.p2bxb[i]);
			}
		}
		return num;
	}
	private getMaxScore(player: number): number
	{
		var num: number = 0;
		for (var i: number = 0; i < this.overs * 6; i = i + 1)
		{
			var flag: boolean = ((player === 1) ? this.p1bxb[i] : this.p2bxb[i]) > num;
			if (flag)
			{
				num = ((player === 1) ? this.p1bxb[i] : this.p2bxb[i]);
			}
		}
		return num;
	}
	private MoveSlimers(): void
	{
		var flag: boolean = this.p1ai;
		if (flag)
		{
			var flag2: boolean = !this.ballbowled;
			if (flag2)
			{
				this.bowl();
			}
			else
			{
				this.field();
			}
		}
		var flag3: boolean = this.p2ai;
		if (flag3)
		{
			var flag4: boolean = !this.fP2Touched && !this.fHitBackWall;
			if (flag4)
			{
				this.playball();
			}
			else
			{
				this.running();
			}
		}
		this.p1X = this.p1X + this.p1XV;
		var flag5: boolean = this.p1X < 37;
		if (flag5)
		{
			this.p1X = 37;
		}
		var flag6: boolean = this.p1X > 878;
		if (flag6)
		{
			this.p1X = 878;
		}
		var flag7: boolean = this.p1YV !== 0;
		if (flag7)
		{
			this.p1Y = this.p1Y + (this.p1YV = this.p1YV - 2);
			var flag8: boolean = this.p1Y < 0;
			if (flag8)
			{
				this.p1Y = 0;
				this.p1YV = 0;
			}
		}
		var flag9: boolean = this.ballX === 200 && this.ballVX === 200 && this.p1X < this.p1XMin;
		if (flag9)
		{
			this.p1XMin = this.p1X;
		}
		this.p2X = this.p2X + this.p2XV;
		var flag10: boolean = this.p2X > 878;
		if (flag10)
		{
			this.p2X = 878;
		}
		var flag11: boolean = this.p2X < 37;
		if (flag11)
		{
			this.p2X = 37;
		}
		var flag12: boolean = this.p2YV != 0;
		if (flag12)
		{
			this.p2Y = this.p2Y + (this.p2YV = this.p2YV - 2);
			var flag13: boolean = this.p2Y < 0;
			if (flag13)
			{
				this.p2Y = 0;
				this.p2YV = 0;
			}
		}
		var flag14: boolean = this.p2X < this.p2XMin && this.p2Y === 0;
		if (flag14)
		{
			this.p2XMin = this.p2X;
		}
		else
		{
			var flag15: boolean = this.p2X > this.p2XMax && this.p2Y === 0;
			if (flag15)
			{
				this.p2XMax = this.p2X;
			}
		}
		var flag16: boolean = this.p2X - 37 <= this.runningCrease && this.p2XMax + 37 >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y === 0;
		if (flag16)
		{
			this.thisBall = this.thisBall + 1;
			this.p2XMin = (this.p2XMax = this.p2X);
			this.drawScores();
		}
		else
		{
			var flag17: boolean = this.p2XMin - 37 <= this.runningCrease && this.p2X + 37 >= this.battingCrease && (this.fP2Touched || this.fHitBackWall) && this.p2Y === 0;
			if (flag17)
			{
				this.thisBall = this.thisBall + 1;
				this.p2XMin = (this.p2XMax = this.p2X);
				this.drawScores();
			}
		}
		var flag18: boolean = this.p3YV != 0;
		if (flag18)
		{
			this.p3Y = this.p3Y + (this.p3YV = this.p3YV - 2);
		}
		var flag19: boolean = this.p3Y < 0;
		if (flag19)
		{
			this.p3Y = 0;
			this.p3YV = 0;
		}
	}
	private async DrawSlimers()
	{
        await this.paint(super.getGraphics(), true);
		var num: number = this.ballX * this.nWidth / 1000;
		var num2: number = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
		var num3: number = this.nWidth * 75 / 1000;
		var num4: number = this.nHeight * 75 / 1000;
		var num5: number = this.p1OldX * this.nWidth / 1000 - num3 / 2;
		var num6: number = 4 * this.nHeight / 5 - num4 - this.p1OldY * this.nHeight / 1000;
		this.screen.setColor(this.SKY_COL);
		this.screen.fillRect(num5, num6, num3, num4);
		num3 = this.nWidth * 75 / 1000;
		num4 = this.nHeight * 75 / 1000;
		num5 = this.p2OldX * this.nWidth / 1000 - num3 / 2;
		num6 = 4 * this.nHeight / 5 - num4 - this.p2OldY * this.nHeight / 1000;
		this.screen.fillRect(num5, num6, num3, num4);
		num3 = this.nWidth / 10;
		num4 = this.nHeight / 10;
		num5 = this.p3X * this.nWidth / 1000 - num3 / 2;
		num6 = 4 * this.nHeight / 5 - num4 - this.p3OldY * this.nHeight / 1000;
		this.screen.fillRect(num5, num6, num3, num4);
		var num7: number = 5;
		var num8: number = (13 + num7) * this.nHeight / 1000;
		this.screen.fillOval(num - num8, num2 - num8, 2 * num8, 2 * num8);
		this.screen.setColor(Color.fromString("white"));
		this.screen.fillRect(this.nWidth * 920 / 1000 - 2, this.nHeight * 7 / 10, 3, this.nHeight / 10);
		num3 = this.nWidth * 75 / 1000;
		num4 = this.nHeight * 75 / 1000;
		num5 = this.p1X * this.nWidth / 1000 - num3 / 2;
		num6 = 4 * this.nHeight / 5 - num4 - this.p1Y * this.nHeight / 1000;
		this.screen.setColor(this.slimeColours2[this.p1Col]);
		this.screen.fillArc(num5, num6, num3, 2 * num4, 0, 180);
		this.screen.setColor(this.slimeColours[this.p1Col]);
		//this.screen.fillArc(num5, num6, num3, 2 * num4, 53, 74);
		this.screen.fillRect(num5 + num3 / 5, num6 + num4 / 5, num3 * 3 / 5, num4 * 4 / 5);
		var num9: number = this.p1X + 28;
		var num10: number = this.p1Y - 45;
		num5 = num9 * this.nWidth / 1000;
		num6 = 4 * this.nHeight / 5 - num4 - num10 * this.nHeight / 1000;
		var num11: number = num5 - num;
		var num12: number = num6 - num2;
		var num13: number = <number>Math.sqrt(<number>(num11 * num11 + num12 * num12));
		var flag: boolean = num13 === 0;
		if (flag)
		{
			num13 = 1;
		}
		var num14: number = this.nWidth / 50 * 75 / 100;
		var num15: number = this.nHeight / 25 * 75 / 100;
		this.screen.setColor(Color.fromString("white"));
		this.screen.fillOval(num5 - num14, num6 - num15, num14, num15);
		this.screen.setColor(Color.fromString("black"));
		this.screen.fillOval(num5 - 4 * num11 / num13 - 3 * num14 / 4, num6 - 4 * num12 / num13 - 3 * num15 / 4, num14 / 2, num15 / 2);
		num3 = this.nWidth * 75 / 1000;
		num4 = this.nHeight * 75 / 1000;
		num5 = this.p2X * this.nWidth / 1000 - num3 / 2;
		num6 = 4 * this.nHeight / 5 - 75 * this.nHeight / 1000 - this.p2Y * this.nHeight / 1000;
		this.screen.setColor(this.slimeColours2[this.p2Col]);
		this.screen.fillArc(num5, num6, num3, 2 * num4, 0, 180);
		this.screen.setColor(this.slimeColours[this.p2Col]);
		//this.screen.fillArc(num5, num6, num3, 2 * num4, 53, 74);
		this.screen.fillRect(num5 + num3 / 5, num6 + num4 / 5, num3 * 3 / 5, num4 * 4 / 5);
		num9 = this.p2X - 13;
		num10 = this.p2Y - 45;
		num5 = num9 * this.nWidth / 1000;
		num6 = 4 * this.nHeight / 5 - num4 - num10 * this.nHeight / 1000;
		num11 = num5 - num;
		num12 = num6 - num2;
		num13 = <number>Math.sqrt(<number>(num11 * num11 + num12 * num12));
		var flag2: boolean = num13 === 0;
		if (flag2)
		{
			num13 = 1;
		}
		num14 = this.nWidth / 50 * 75 / 100;
		num15 = this.nHeight / 25 * 75 / 100;
		this.screen.setColor(Color.fromString("white"));
		this.screen.fillOval(num5 - num14, num6 - num15, num14, num15);
		this.screen.setColor(Color.fromString("black"));
		this.screen.fillOval(num5 - 4 * num11 / num13 - 3 * num14 / 4, num6 - 4 * num12 / num13 - 3 * num15 / 4, num14 / 2, num15 / 2);
		num3 = this.nWidth * 75 / 1000;
		num4 = this.nHeight * 75 / 1000;
		num5 = this.p3X * this.nWidth / 1000 - num3 / 2;
		num6 = 4 * this.nHeight / 5 - 75 * this.nHeight / 1000 - this.p3Y * this.nHeight / 1000;
		this.screen.setColor(this.slimeColours2[this.p1Col]);
		this.screen.fillArc(num5, num6, num3, 2 * num4, 0, 180);
		this.screen.setColor(this.slimeColours[this.p1Col]);
		//this.screen.fillArc(num5, num6, num3, 2 * num4, 53, 74);
		this.screen.fillRect(num5 + num3 / 5, num6 + num4 / 5, num3 * 3 / 5, num4 * 4 / 5);
		num9 = this.p3X - 13;
		num10 = this.p3Y - 45;
		num5 = num9 * this.nWidth / 1000;
		num6 = 4 * this.nHeight / 5 - num4 - num10 * this.nHeight / 1000;
		num11 = num5 - num;
		num12 = num6 - num2;
		num13 = <number>Math.sqrt(<number>(num11 * num11 + num12 * num12));
		var flag3: boolean = num13 === 0;
		if (flag3)
		{
			num13 = 1;
		}
		num14 = this.nWidth / 50 * 75 / 100;
		num15 = this.nHeight / 25 * 75 / 100;
		this.screen.setColor(Color.fromString("white"));
		this.screen.fillOval(num5 - num14, num6 - num15, num14, num15);
		this.screen.setColor(Color.fromString("black"));
		this.screen.fillOval(num5 - 4 * num11 / num13 - 3 * num14 / 4, num6 - 4 * num12 / num13 - 3 * num15 / 4, num14 / 2, num15 / 2);
		await this.MoveBall();
	}
	private async MoveBall()
	{
		var num: number = 5;
		var num2: number = 11;
		var num3: number = 21;
		var num4: number = 17;
		var num5: number = (13 + num) * this.nHeight / 1000;
		var num6: number = this.ballOldX * this.nWidth / 1000;
		var num7: number = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
		var arg_6F_0: number = this.ballY;
		var num8: number = this.ballVY - 1;
		this.ballVY = num8;
		this.ballY = arg_6F_0 + num8;
		this.ballX = this.ballX + this.ballVX;
		this.ballbowled = (this.ballbowled || this.ballX > this.bowlingCrease);
		var flag: boolean = this.ballVX < 2 && this.ballVY < 2 && this.p1XV + this.p1YV + this.p2XV + this.p2YV + this.p3YV === 0 && this.ballX !== 200 && (this.p2X <= this.runningCrease + 37 || this.p2X >= this.battingCrease - 37);
		if (flag)
		{
			num8 = this.stillFrames;
			this.stillFrames = num8 + 1;
			var flag2: boolean = num8 > 75;
			if (flag2)
			{
				this.promptMsg = " ";
			}
		}
		else
		{
			this.stillFrames = 0;
		}
		var flag3: boolean = this.ballY < 18;
		if (flag3)
		{
			this.ballY = 18;
			this.ballVY = -this.ballVY * 2 / 3;
			this.ballVX = this.ballVX * 19 / 20;
			this.bounces = this.bounces + 1;
			var flag4: boolean = !this.fP2Touched && this.bounces > 1 && !this.fHitBackWall;
			if (flag4)
			{
				this.fNoBall = true;
				this.drawPrompt("No ball! (grubber)", 2);
			}
		}
		var flag5: boolean = this.ballX > 920 && !this.fP2Touched;
		if (flag5)
		{
			this.fP2Touched = true;
		}
		var flag6: boolean = this.ballY > 300 && this.ballX > this.battingCrease - 37 && this.p2X >= this.battingCrease - 37 && !this.fP2Touched && this.p2XMin > this.battingCrease - 56;
		if (flag6)
		{
			this.fNoBall = true;
			this.drawPrompt("No ball! (too high)", 2);
		}
		var flag7: boolean = !this.fEndGame;
		if (flag7)
		{
			var num9: number = 2 * (this.ballX - this.p1X);
			var num10: number = this.ballY - this.p1Y;
			var num11: number = <number>Math.sqrt(<number>(num9 * num9 + num10 * num10));
			var num12: number = this.ballVX - this.p1XV;
			var num13: number = this.ballVY - this.p1YV;
			var flag8: boolean = num10 > 0 && num11 < 88 && num11 > num;
			if (flag8)
			{
				var num14: number = (num9 * num12 + num10 * num13) / num11;
				this.ballX = this.p1X + 44 * num9 / num11;
				this.ballY = this.p1Y + 88 * num10 / num11;
				var flag9: boolean = num14 <= 0;
				if (flag9)
				{
					var flag10: boolean = !this.p1Hold;
					if (flag10)
					{
						this.ballVX = this.ballVX + (this.p1XV - 2 * num9 * num14 / num11);
					}
					else
					{
						this.ballVX = 0;
						this.ballVY = 0;
					}
					var flag11: boolean = this.ballVX < -num2;
					if (flag11)
					{
						this.ballVX = -num2;
					}
					var flag12: boolean = this.ballVX > num2;
					if (flag12)
					{
						this.ballVX = num2;
					}
					this.ballVY = this.ballVY + (this.p1YV - 2 * num10 * num14 / num11);
					var flag13: boolean = this.ballVY < -num3;
					if (flag13)
					{
						this.ballVY = -num3;
					}
					var flag14: boolean = this.ballVY > num3;
					if (flag14)
					{
						this.ballVY = num3;
					}
				}
				var flag15: boolean = this.p1Touches > 0 && !this.fP2Touched && this.ballOldX === this.ballXMax && !this.fHitBackWall;
				if (flag15)
				{
					this.drawPrompt("No ball! (too many touches)", 2);
					this.fNoBall = true;
				}
				var flag16: boolean = this.fP2Touched;
				if (flag16)
				{
					this.fP1Touched = true;
				}
				var flag17: boolean = this.p1X !== this.runningCrease - 37;
				if (flag17)
				{
					this.p1Touches = this.p1Touches + 1;
				}
				var flag18: boolean = this.fP2Touched && this.bounces === 0 && !this.fNoBall && !this.fHitBackWall && this.ballX >= this.p1X;
				if (flag18)
				{
					this.promptMsg = this.COMM_CAUGHT[(this.COMM_CAUGHT.length * this.Mathrandom()) >>> 0];
					this.thisBall = -this.wicketPenalty;
				}
			}
			var flag19: boolean = !this.fP2Touched;
			if (flag19)
			{
				num9 = 2 * (this.ballX - this.p2X);
				num10 = this.ballY - this.p2Y;
				num11 = <number>Math.sqrt(<number>(num9 * num9 + num10 * num10));
				num12 = this.ballVX - this.p2XV;
				num13 = this.ballVY - this.p2YV;
				var flag20: boolean = num10 > 0 && num11 < 88 && num11 > num && this.p1Touches > 0;
				if (flag20)
				{
					var num15: number = (num9 * num12 + num10 * num13) / num11;
					this.ballX = this.p2X + 44 * num9 / num11;
					this.ballY = this.p2Y + 88 * num10 / num11;
					var flag21: boolean = num15 <= 0;
					if (flag21)
					{
						this.ballVX = this.ballVX + (this.p2XV - 2 * num9 * num15 / num11);
						var flag22: boolean = this.ballVX < -num4;
						if (flag22)
						{
							this.ballVX = -num4;
						}
						var flag23: boolean = this.ballVX > num2;
						if (flag23)
						{
							this.ballVX = num2;
						}
						this.ballVY = this.ballVY + (this.p2YV - 2 * num10 * num15 / num11);
						var flag24: boolean = this.ballVY < -num3;
						if (flag24)
						{
							this.ballVY = -num3;
						}
						var flag25: boolean = this.ballVY > num3;
						if (flag25)
						{
							this.ballVY = num3;
						}
					}
					this.fP2Touched = true;
					this.bounces = 0;
				}
			}
			num9 = 2 * (this.ballX - this.p3X);
			num10 = this.ballY - this.p3Y;
			num11 = <number>Math.sqrt(<number>(num9 * num9 + num10 * num10));
			num12 = this.ballVX;
			num13 = this.ballVY - this.p3YV;
			var flag26: boolean = num10 > 0 && num11 < 88 && num11 > num;
			if (flag26)
			{
				var num16: number = (num9 * num12 + num10 * num13) / num11 * 2 / 3;
				this.ballX = this.p3X + 44 * num9 / num11;
				this.ballY = this.p3Y + 88 * num10 / num11;
				var flag27: boolean = num16 <= 0;
				if (flag27)
				{
					this.ballVX = this.ballVX + -2 * num9 * num16 / num11;
					var flag28: boolean = this.ballVX < -num4;
					if (flag28)
					{
						this.ballVX = -num4;
					}
					var flag29: boolean = this.ballVX > num2;
					if (flag29)
					{
						this.ballVX = num2;
					}
					this.ballVY = this.ballVY + (this.p3YV - 2 * num10 * num16 / num11);
					var flag30: boolean = this.ballVY < -num3;
					if (flag30)
					{
						this.ballVY = -num3;
					}
					var flag31: boolean = this.ballVY > num3;
					if (flag31)
					{
						this.ballVY = num3;
					}
				}
				var flag32: boolean = !this.fP1Touched && this.fP2Touched && this.bounces === 0 && !this.fNoBall;
				if (flag32)
				{
					this.promptMsg = this.COMM_CTBEHIND[(this.COMM_CTBEHIND.length * this.Mathrandom()) >>> 0];
					this.thisBall = -this.wicketPenalty;
				}
				else
				{
					var flag33: boolean = (this.p2X < this.battingCrease - 37 && this.p2X > this.runningCrease + 37) || this.p2Y > 0;
					if (flag33)
					{
						var flag34: boolean = this.p2XMin - 37 > this.runningCrease && !this.fNoBall && !this.fP1Touched;
						if (flag34)
						{
							this.promptMsg = this.COMM_STUMPED[(this.COMM_STUMPED.length * this.Mathrandom()) >>> 0];
						}
						else
						{
							this.promptMsg = this.COMM_RUNOUT[(this.COMM_RUNOUT.length * this.Mathrandom()) >>> 0];
						}
						this.thisBall = -this.wicketPenalty;
					}
				}
				this.fP1Touched = true;
			}
			var flag35: boolean = this.ballX < 5;
			if (flag35)
			{
				this.ballX = 5;
				this.ballVX = -this.ballVX * 2 / 3;
				var flag36: boolean = this.fP2Touched && this.bounces === 0 && !this.fHitBackWall;
				if (flag36)
				{
					this.promptMsg = this.COMM_SIX[(this.COMM_SIX.length * this.Mathrandom()) >>> 0];
					var flag37: boolean = this.fP1Touched && this.Mathrandom() < 0.7;
					if (flag37)
					{
						this.promptMsg = this.COMM_SIXTOUCHED[(this.COMM_SIXTOUCHED.length * this.Mathrandom()) >>> 0];
					}
					this.drawPrompt(this.promptMsg, 1);
					this.promptMsg = "";
					this.thisBall = this.thisBall + 6;
				}
				else
				{
					var flag38: boolean = this.fP2Touched && !this.fHitBackWall;
					if (flag38)
					{
						this.promptMsg = this.COMM_FOUR[(this.COMM_FOUR.length * this.Mathrandom()) >>> 0];
						var flag39: boolean = this.fP1Touched && this.Mathrandom() < 0.7;
						if (flag39)
						{
							this.promptMsg = this.COMM_FOURTOUCHED[(this.COMM_FOURTOUCHED.length * this.Mathrandom()) >>> 0];
						}
						this.drawPrompt(this.promptMsg, 1);
						this.promptMsg = "";
						this.thisBall = this.thisBall + 4;
					}
					else
					{
						var flag40: boolean = !this.fP2Touched;
						if (flag40)
						{
							this.fNoBall = true;
							this.drawPrompt("No ball! (must bowl forwards)", 2);
						}
					}
				}
				var flag41: boolean = this.fP2Touched;
				if (flag41)
				{
					this.fHitBackWall = true;
				}
			}
			var flag42: boolean = this.ballX > 995;
			if (flag42)
			{
				this.ballX = 995;
				this.ballVX = -this.ballVX * 2 / 3;
				this.fHitBackWall = true;
			}
			var flag43: boolean = this.ballX > 907 && this.ballX < 933 && this.ballY < 118;
			if (flag43)
			{
				var flag44: boolean = ((this.p2X < this.battingCrease - 37 && this.p2X > this.runningCrease + 37) || this.p2Y !== 0) && this.fP1Touched && this.fP2Touched;
				if (flag44)
				{
					this.promptMsg = this.COMM_RUNOUT[(this.COMM_RUNOUT.length * this.Mathrandom()) >>> 0];
					this.thisBall = -this.wicketPenalty;
				}
				else
				{
					var flag45: boolean = !this.fNoBall && !this.fHitBackWall && this.p1Touches === 1;
					if (flag45)
					{
						this.promptMsg = this.COMM_BOWLED[(this.COMM_BOWLED.length * this.Mathrandom()) >>> 0];
						var flag46: boolean = this.fP2Touched && this.Mathrandom() < 0.5;
						if (flag46)
						{
							this.promptMsg = this.COMM_PLAYEDON[(this.COMM_PLAYEDON.length * this.Mathrandom()) >>> 0];
						}
						this.thisBall = -this.wicketPenalty;
					}
				}
				this.fHitBackWall = true;
				var flag47: boolean = this.ballVY < 0 && this.ballY > 118;
				if (flag47)
				{
					this.ballVY = this.ballVY * -1;
					this.ballY = 118;
				}
				else
				{
					var flag48: boolean = this.ballX < 920;
					if (flag48)
					{
						this.ballX = 903;
						this.ballVX = ((this.ballVX >= 0) ? (-this.ballVX) : this.ballVX) * 3 / 4;
					}
					else
					{
						this.ballX = 937;
						this.ballVX = ((this.ballVX <= 0) ? (-this.ballVX) : this.ballVX) * 3 / 4;
					}
				}
				this.fP2Touched = true;
			}
		}
		var flag49: boolean = this.ballX > this.ballXMax;
		if (flag49)
		{
			this.ballXMax = this.ballX;
		}
		num6 = this.ballX * this.nWidth / 1000;
		num7 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
		this.screen.setColor(this.BALL_COL);
		this.screen.fillOval(num6 - num5, num7 - num5, 2 * num5, 2 * num5);
		this.drawScores();
		var flag50: boolean = this.promptMsg.length > 0;
		if (flag50)
		{
			var flag51: boolean = this.promptMsg.length > 1 && this.Mathrandom() < 0.3;
			if (flag51)
			{
				this.promptMsg = this.COMM_OUT_GENERIC[(this.COMM_OUT_GENERIC.length * this.Mathrandom()) >>> 0];
			}
			this.drawPrompt(this.promptMsg, 0);
			super.getGraphics().drawImage(this.buffer, 0, 0, this);
			var flag52: boolean = this.promptMsg.length > 1;
			if (flag52)
			{
				await this.sleep(1500);
			}
			this.promptMsg = "";
			await this.nextBall();
		}
	}
	private sleep(ms: number) {
        return new Promise((complete, error) => {
            setTimeout(() => complete(0), ms);
        });
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
		this.screen.setColor(this.COURT_COL);
		this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
		this.drawPrompt(this.promptMsg, 0);
	}
	private drawPrompt_1(s: string, i: number): void
	{
		var fontMetrics: FontMetrics = this.screen.getFontMetrics();
		this.screen.setColor(Color.fromString("white"));
		this.screen.drawString(s, (this.nWidth - fontMetrics.stringWidth(s)) / 2, this.nHeight * 4 / 5 + fontMetrics.getHeight() * (i + 1) + 10);
	}
	private drawScores(): void
	{
		var flag: boolean = this.inns === 0;
		if (!flag)
		{
			var graphics: Graphics = this.screen;
			var fontMetrics: FontMetrics = graphics.getFontMetrics();
			var num: number = 1;
			graphics.setColor(this.SKY_COL);
			graphics.fillRect(0, 0, this.nWidth / 2, 3 * fontMetrics.getAscent() + 10);
			graphics.setColor(Color.fromString("white"));
			var text: string = this.slimeColText[this.p2Col] + (this.p2Score + <number>this.thisBall);
			graphics.drawString(text, 10, (fontMetrics.getAscent() + 3) * num + 10);
			num = num + 1;
			var flag2: boolean = this.inns !== 1;
			if (flag2)
			{
				text = this.slimeColText[this.p1Col] + this.p1Score;
				graphics.drawString(text, 10, (fontMetrics.getAscent() + 3) * num + 10);
				num = num + 1;
			}
			var flag3: boolean = this.ballCount < 6 * this.overs - 1;
			if (flag3)
			{
				text = "Over: " + this.ballCount / 6;
				var flag4: boolean = this.ballCount % 6 > 0;
				if (flag4)
				{
					text = text + "." + this.ballCount % 6;
				}
				text = NString.Concat([
					text, " (", this.overs, ")"
				]);
			}
			else
			{
				var flag5: boolean = this.ballCount === 6 * this.overs - 1;
				if (flag5)
				{
					text = "Last ball";
				}
				else
				{
					text = "Over: " + this.overs;
				}
			}
			graphics.drawString(text, 10, (fontMetrics.getAscent() + 3) * num + 20);
			num = num + 1;
			var flag6: boolean = this.p1X !== 200 || this.p2X !== 800 || this.fP1Touched || this.fP2Touched;
			if (flag6)
			{
			}
		}
	}
	private drawWorm(): void
	{
		var graphics: Graphics = this.buffer.getGraphics();
		var fontMetrics: FontMetrics = graphics.getFontMetrics();
		var minScore: number = this.getMinScore(1);
		var minScore2: number = this.getMinScore(2);
		var maxScore: number = this.getMaxScore(1);
		var maxScore2: number = this.getMaxScore(2);
		var num: number = (minScore < minScore2) ? minScore : minScore2;
		var num2: number = (maxScore > maxScore2) ? maxScore : maxScore2;
		var flag: boolean = num === 0 && num2 === 0;
		if (!flag)
		{
			var num3: number = this.nWidth * 4 / 5 - 5;
			var num4: number = this.nWidth / 5;
			var num5: number = <number>(5 + <number>(this.nHeight / 5) * num2 / (num2 - num));
			var num6: number = this.nHeight / 5;
			var flag2: boolean = this.fEndOfOver;
			if (flag2)
			{
				num3 = this.nWidth / 10 - 5;
				num4 = this.nWidth * 4 / 5;
				num5 = <number>(<number>(this.nHeight * 2 / 5) * num2 / (num2 - num) + <number>(this.nHeight * 3 / 10));
				num6 = this.nHeight * 2 / 5;
			}
			var flag3: boolean = this.inns === 2;
			if (flag3)
			{
				graphics.setColor(this.slimeColours[this.p1Col]);
				graphics.drawString(this.slimeColAbbr[this.p1Col], num3 - fontMetrics.stringWidth(this.slimeColAbbr[this.p1Col]) - 5, num5 - <number>((num2 + num) / 2 * <number>num6 / (num2 - num)));
				graphics.drawLine(num3, num5, num3 + num4 / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p1bxb[0] / (num2 - num)));
				for (var i: number = 1; i < 6 * this.overs; i = i + 1)
				{
					graphics.drawLine(num3 + num4 * i / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p1bxb[i - 1] / (num2 - num)), num3 + num4 * (i + 1) / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p1bxb[i] / (num2 - num)));
				}
				graphics.setColor(this.slimeColours[this.p2Col]);
				graphics.drawString(this.slimeColAbbr[this.p2Col], num3 - fontMetrics.stringWidth(this.slimeColAbbr[this.p2Col]) - 5, num5 - <number>((num2 + num) / 2 * <number>num6 / (num2 - num)) + fontMetrics.getAscent());
				graphics.drawLine(num3, num5, num3 + num4 / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p2bxb[0] / (num2 - num)));
				for (var j: number = 1; j < this.ballCount; j = j + 1)
				{
					graphics.drawLine(num3 + num4 * j / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p2bxb[j - 1] / (num2 - num)), num3 + num4 * (j + 1) / (6 * this.overs), <number>(<number>num5 - <number>num6 * this.p2bxb[j] / (num2 - num)));
				}
				graphics.setColor(Color.fromString("white"));
				graphics.drawString(NString.Concat(num2), num3 - 5 - fontMetrics.stringWidth(NString.Concat(num2)), num5 - <number>(num2 * <number>num6 / (num2 - num)) + fontMetrics.getAscent());
				graphics.drawString(NString.Concat(num), num3 - 5 - fontMetrics.stringWidth(NString.Concat(num)), num5 - <number>(num * <number>num6 / (num2 - num)));
				graphics.drawLine(num3, num5 - <number>(num2 * <number>num6 / (num2 - num)), num3, num5 - <number>(num * <number>num6 / (num2 - num)));
				graphics.drawLine(num3, num5, num3 + num4, num5);
			}
		}
	}
	async run()
	{
		var graphics: Graphics = super.getGraphics();
		while (this.gameThread !== null)
		{
			var flag: boolean = this.wait > 0;
			if (flag)
			{
				this.wait = this.wait - 1;
			}
			this.p1OldX = this.p1X;
			this.p1OldY = this.p1Y;
			this.p2OldX = this.p2X;
			this.p2OldY = this.p2Y;
			this.p3OldY = this.p3Y;
			this.ballOldX = this.ballX;
			this.ballOldY = this.ballY;
			this.MoveSlimers();
			await this.DrawSlimers();
			graphics.drawImage(this.buffer, 0, 0, null);
			var flag2: boolean = this.ballCount === this.overs * 6 && !this.fNoBall;
			if (flag2)
			{
				this.fInPlay = false;
				var flag3: boolean = this.inns === 1;
				if (flag3)
				{
					this.promptMsg = "Click the mouse to continue...";
				}
				else
				{
					this.DoFatality();
					this.promptMsg = "Click team names to select teams, then choose an innings length to start!";
					this.fEndGame = true;
					var flag4: boolean = this.p1ai;
					if (flag4)
					{
						this.p1Col = 9;
					}
					var flag5: boolean = this.p2ai;
					if (flag5)
					{
						this.p2Col = 9;
					}
					this.p1ai = (this.p2ai = false);
				}
				this.gameThread = null;
			}
			await this.sleep(20);
		}
		var flag6: boolean = !this.fEndOfOver;
		if (flag6)
		{
			this.fInPlay = false;
		}
		await this.clearAndRepaint()
	}
	private DoFatality(): void
	{
		var graphics: Graphics = super.getGraphics();
		var flag: boolean = this.p1Score > this.p2Score;
		if (flag)
		{
			this.p1J();
			this.drawPrompt(this.slimeColText[this.p1Col] + " wins!", 1);
		}
		else
		{
			var flag2: boolean = this.p2Score > this.p1Score;
			if (flag2)
			{
				this.p2J();
				this.drawPrompt(this.slimeColText[this.p1Col] + " wins!", 1);
			}
			else
			{
				this.drawPrompt("It's a tie!", 1);
			}
		}
		this.p1ai = (this.p2ai = false);
	}
	destroy(): void
	{
		this.gameThread = null;
	}
	private bowl(): void
	{
		var flag: boolean = this.wait > 0;
		if (!flag)
		{
			var flag2: boolean = this.balltype === -1;
			if (flag2)
			{
				var flag3: boolean = this.difficulty === 0;
				if (flag3)
				{
					this.balltype = 0;
				}
				var flag4: boolean = this.difficulty === 1;
				if (flag4)
				{
					this.balltype = (4.0 * this.Mathrandom()) >>> 0;
				}
				var flag5: boolean = this.difficulty === 2;
				if (flag5)
				{
					this.balltype = (2.0 * this.Mathrandom()) >>> 0 + 2;
				}
			}
			var flag6: boolean = this.difficulty === 2 && this.p2X - 37 < this.battingCrease - (this.battingCrease - this.runningCrease) / 4;
			if (flag6)
			{
				this.balltype = 1;
			}
			var flag7: boolean = this.balltype === 0;
			if (flag7)
			{
				var flag8: boolean = this.p1X > this.runningCrease - 62;
				if (flag8)
				{
					this.p1L();
				}
				else
				{
					var flag9: boolean = this.ballY < 200 && this.ballVY < 0;
					if (flag9)
					{
						this.p1J();
					}
					else
					{
						this.p1S();
					}
				}
			}
			var flag10: boolean = this.balltype === 1;
			if (flag10)
			{
				var flag11: boolean = this.p1X > this.runningCrease - 56;
				if (flag11)
				{
					this.p1L();
				}
				else
				{
					this.p1S();
				}
				var flag12: boolean = this.ballY < 320 && this.ballVY < 0;
				if (flag12)
				{
					this.p1J();
				}
			}
			var flag13: boolean = this.balltype === 2;
			if (flag13)
			{
				var flag14: boolean = this.ballVY > 0 && this.p1X > this.runningCrease - 62;
				if (flag14)
				{
					this.p1L();
				}
				else
				{
					this.p1S();
				}
				var flag15: boolean = this.ballY > 270 && this.ballVY > 0;
				if (flag15)
				{
					this.p1J();
				}
			}
			var flag16: boolean = this.balltype === 3;
			if (flag16)
			{
				var flag17: boolean = this.p1X > this.runningCrease - 50;
				if (flag17)
				{
					this.p1L();
				}
				else
				{
					this.p1S();
				}
			}
		}
	}
	private field(): void
	{
		var flag: boolean = this.bounces === 0;
		if (flag)
		{
			var flag2: boolean = this.difficulty > 1;
			if (flag2)
			{
				var flag3: boolean = this.ballX > this.p1X && this.ballVX < 0 && this.ballY > 37 && Math.sqrt(<number>((this.ballX - this.p1X) * (this.ballX - this.p1X) + (this.ballY - this.p1Y) * (this.ballY - this.p1Y))) < 250.0;
				if (flag3)
				{
					this.p1J();
				}
			}
			var flag4: boolean = this.difficulty === 2;
			if (flag4)
			{
				var flag5: boolean = this.ballX > 920 && Math.sqrt(<number>((this.ballX - this.p3X) * (this.ballX - this.p3X) + (this.ballY - this.p3Y) * (this.ballY - this.p3Y))) < 250.0;
				if (flag5)
				{
					this.p3J();
				}
			}
		}
		var flag6: boolean = this.difficulty < 2 && !this.fP2Touched && this.ballbowled;
		if (flag6)
		{
			this.p1S();
		}
		else
		{
			var flag7: boolean = this.p1X + 37 > this.ballX;
			if (flag7)
			{
				this.p1L();
			}
			else
			{
				var flag8: boolean = this.p1X + 75 + 19 < 920;
				if (flag8)
				{
					this.p1R();
				}
				else
				{
					var flag9: boolean = ((this.p2X + 37 < this.battingCrease && this.p2X - 37 > this.runningCrease) || this.p2Y !== 0) && this.fP1Touched;
					if (flag9)
					{
						this.p1R();
					}
					else
					{
						this.p1S();
					}
				}
			}
		}
		var flag10: boolean = this.ballX > 75 && this.ballY < 37 && this.ballVX <= 0 && !this.fHitBackWall && this.p1X - this.ballX < 75 && this.p1X > this.ballX && this.bounces > 0 && this.difficulty === 2;
		if (flag10)
		{
			this.p1J();
		}
	}
	private playball(): void
	{
		var num: number = Math.sqrt(<number>((this.ballX - this.p2X) * (this.ballX - this.p2X) + (this.ballY - this.p2Y) * (this.ballY - this.p2Y)));
		var num2: number = 0;
		var i: number = this.ballY;
		var num3: number = this.ballVY;
		while (i > 0)
		{
			num2 = num2 + 1;
			i = i + (num3 = num3 - 1);
		}
		var num4: number = this.ballX + this.ballVX * num2;
		var flag: boolean = num4 < 845 && num4 >= this.p2X - num2 * 8;
		var flag2: boolean = this.difficulty === 0;
		if (flag2)
		{
			var flag3: boolean = num < 400.0 && this.ballX - this.p2X < 112 && this.ballX < this.p2X && this.ballY < this.p2Y + 112;
			if (flag3)
			{
				this.p2L();
			}
			else
			{
				this.p2S();
			}
			var flag4: boolean = num < 350.0 && this.ballY > 150 && this.ballX > this.p2X - 75;
			if (flag4)
			{
				this.p2J();
			}
		}
		var flag5: boolean = this.difficulty === 1 || this.difficulty === 2;
		if (flag5)
		{
			var flag6: boolean = this.ballbowled && this.shottype === -1;
			if (flag6)
			{
				var flag7: boolean = (this.p2Score > this.p1Score && this.inns === 2) && flag;
				if (flag7)
				{
					this.shottype = 1;
				}
				else
				{
					var flag8: boolean = flag && this.Mathrandom() < 0.5;
					if (flag8)
					{
						var flag9: boolean = this.Mathrandom() < 0.75;
						if (flag9)
						{
							this.shottype = 4;
						}
						else
						{
							this.shottype = 1;
						}
					}
					else
					{
						var flag10: boolean = num4 > this.battingCrease || this.Mathrandom() < 0.6;
						if (flag10)
						{
							this.shottype = 3;
						}
						else
						{
							this.shottype = 2;
						}
					}
				}
			}
			var flag11: boolean = this.shottype === 1;
			if (flag11)
			{
				var flag12: boolean = this.ballbowled && this.p2X - this.p2XV - 37 > num4;
				if (flag12)
				{
					this.p2L();
				}
				else
				{
					this.p2S();
				}
			}
			var flag13: boolean = this.shottype === 2;
			if (flag13)
			{
				var flag14: boolean = this.ballbowled && this.p2X - this.p2XV - 75 > num4;
				if (flag14)
				{
					this.p2L();
				}
				else
				{
					this.p2S();
					var flag15: boolean = this.ballX > this.p2X - 50;
					if (flag15)
					{
						this.p2J();
					}
				}
			}
			var flag16: boolean = this.shottype === 3;
			if (flag16)
			{
				var flag17: boolean = this.ballbowled && this.p2X + this.p2XV + 50 > num4;
				if (flag17)
				{
					this.p2L();
				}
				else
				{
					this.p2S();
					var flag18: boolean = this.ballX > this.p2X - 37;
					if (flag18)
					{
						this.p2J();
					}
				}
			}
			var flag19: boolean = this.shottype === 4;
			if (flag19)
			{
				var flag20: boolean = this.ballbowled && (this.p2X - this.p2XV - 37 > num4 || this.ballX + 3 * this.ballVX > this.p2X - 37);
				if (flag20)
				{
					this.p2L();
				}
				else
				{
					this.p2S();
				}
			}
		}
	}
	private running(): void
	{
		var flag: boolean = false;
		var flag2: boolean = this.ballX > 920 || (this.ballX > this.p1X && (this.p1X - this.ballX < 400 || (this.p1X - this.ballX < 300 && this.ballVX > 0)));
		if (flag2)
		{
			flag = true;
		}
		var flag3: boolean = this.ballX < this.runningCrease || (this.p1X < this.runningCrease && this.ballVX < 0 && this.ballX < this.battingCrease);
		if (flag3)
		{
			flag = false;
		}
		var flag4: boolean = this.ballX < 920 && this.p1X < this.p2X && this.ballX > this.p2X && this.p2X - 37 <= this.runningCrease;
		if (flag4)
		{
			flag = false;
		}
		var flag5: boolean = this.ballX < 920 && this.ballX - this.p2X > this.battingCrease - this.runningCrease;
		if (flag5)
		{
			flag = false;
		}
		var flag6: boolean = flag && (this.p2X + 37 >= this.battingCrease || this.p2X - 37 <= this.runningCrease);
		if (flag6)
		{
			this.p2S();
		}
		else
		{
			var flag7: boolean = flag;
			if (flag7)
			{
				var flag8: boolean = this.p2X > this.runningCrease + (this.battingCrease - this.runningCrease) / 2 || this.difficulty < 2;
				if (flag8)
				{
					this.p2R();
				}
				else
				{
					this.p2L();
				}
			}
			else
			{
				var flag9: boolean = !flag && this.p2X - 37 <= this.runningCrease && this.p2X === this.p2XMax;
				if (flag9)
				{
					this.p2R();
				}
				else
				{
					var flag10: boolean = !flag && this.p2X + 37 >= this.battingCrease && this.p2X >= this.p2XMin;
					if (flag10)
					{
						this.p2L();
					}
				}
			}
		}
	}
	constructor()
	{
        super(<HTMLCanvasElement>document.querySelector("canvas"));
	}
}