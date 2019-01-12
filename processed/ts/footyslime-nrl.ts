import { Applet, Runnable, Graphics, Thread, Color, Image, Font, URL, System, FontMetrics, Event, Polygon, ImageObserver, BufferedImage, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class Slime2P extends Applet implements Runnable {
    public recommended_width = 750;
    public recommended_height = 375;
    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ p1X : number;

    /*public*/ p1Y : number;

    /*public*/ p2X : number;

    /*public*/ p2Y : number;

    /*public*/ p1Col : number;

    /*public*/ p2Col : number;

    /*public*/ p1OldX : number;

    /*public*/ p1OldY : number;

    /*public*/ p2OldX : number;

    /*public*/ p2OldY : number;

    /*public*/ p1XV : number;

    /*public*/ p1YV : number;

    /*public*/ p2XV : number;

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

    /*public*/ fInPlay : boolean;

    /*public*/ p1Blink : number;

    /*public*/ p2Blink : number;

    /*public*/ fP1Fire : boolean;

    /*public*/ fP2Fire : boolean;

    /*public*/ superFlash : boolean;

    /*public*/ fP1Touched : boolean;

    /*public*/ fP2Touched : boolean;

    /*public*/ fP1Touches : number;

    /*public*/ fP2Touches : number;

    /*public*/ fP1TouchesTot : number;

    /*public*/ fP2TouchesTot : number;

    /*public*/ fP1Clangers : number;

    /*public*/ fP2Clangers : number;

    /*public*/ fP1Aces : number;

    /*public*/ fP2Aces : number;

    /*public*/ fP1Winners : number;

    /*public*/ fP2Winners : number;

    /*public*/ fP1PointsWon : number;

    /*public*/ fP2PointsWon : number;

    /*public*/ fP1HitStill : boolean;

    /*public*/ fP2HitStill : boolean;

    /*public*/ fP1Frames : number;

    /*public*/ fP2Frames : number;

    /*public*/ fP1Super : number;

    /*public*/ fP2Super : number;

    /*public*/ fP1Streak : number;

    /*public*/ fP2Streak : number;

    /*public*/ fSelectedColours : boolean;

    /*public*/ fServerMoved : boolean;

    /*public*/ hitNetSinceTouched : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ startTime : number;

    /*public*/ gameTime : number;

    /*public*/ realStartTime : number;

    /*public*/ crossedNetTime : number;

    /*public*/ scoringRun : number;

    /*public*/ oldScoringRun : number;

    /*public*/ scoringRunForSuper : number = 6;

    /*public*/ slimeColText : string[];

    /*public*/ slimeColours : Color[];

    /*public*/ slimeColours2 : Color[];

    /*public*/ SKY_COL : Color;

    /*public*/ COURT_COL : Color;

    /*public*/ BALL_COL : Color;

    /*public*/ nightTime : boolean = false;

    /*public*/ psycho : boolean = false;

    /*public*/ backwards : boolean = false;

    /*public*/ timer : boolean = false;

    /*public*/ buffered : boolean = false;

    /*public*/ field_rn_Slime2P_pw_1 : string[];

    /*public*/ nyt : string = "night";

    /*public*/ psy : string = "super";

    /*public*/ bck : string = "toast";

    /*public*/ tim : string = "clock";

    /*public*/ wnd : string = "windy";

    /*public*/ hl2 : string = "2mins";

    /*public*/ hl3 : string = "3mins";

    /*public*/ hl4 : string = "4mins";

    /*public*/ hl5 : string = "5mins";

    /*public*/ bfr : string = "uffer";

    /*public*/ GAME_LENGTH : number = 120000;

    /*public*/ holdingOn : boolean = false;

    /*public*/ HOLDING_LENGTH : number = 5000;

    /*public*/ firstHalf : boolean;

    /*public*/ windOn : boolean = false;

    /*public*/ wind : number;

    /*public*/ maxWind : number = 30;

    /*public*/ NUM_PARTICLES : number = 60;

    /*public*/ particle_size : number = 3;

    /*public*/ particle_x : number[];

    /*public*/ particle_y : number[];

    /*public*/ particle_weight : number[];

    /*public*/ floor : number;

    /*public*/ buffer : Image;

    /*public*/ baseFont : Font;

    public constructor() {
        super();
        this.nWidth = 0;
        this.nHeight = 0;
        this.p1X = 0;
        this.p1Y = 0;
        this.p2X = 0;
        this.p2Y = 0;
        this.p1Col = 0;
        this.p2Col = 0;
        this.p1OldX = 0;
        this.p1OldY = 0;
        this.p2OldX = 0;
        this.p2OldY = 0;
        this.p1XV = 0;
        this.p1YV = 0;
        this.p2XV = 0;
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
        this.fInPlay = false;
        this.p1Blink = 0;
        this.p2Blink = 0;
        this.fP1Fire = false;
        this.fP2Fire = false;
        this.superFlash = false;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.fP1Touches = 0;
        this.fP2Touches = 0;
        this.fP1TouchesTot = 0;
        this.fP2TouchesTot = 0;
        this.fP1Clangers = 0;
        this.fP2Clangers = 0;
        this.fP1Aces = 0;
        this.fP2Aces = 0;
        this.fP1Winners = 0;
        this.fP2Winners = 0;
        this.fP1PointsWon = 0;
        this.fP2PointsWon = 0;
        this.fP1HitStill = false;
        this.fP2HitStill = false;
        this.fP1Frames = 0;
        this.fP2Frames = 0;
        this.fP1Super = 0;
        this.fP2Super = 0;
        this.fP1Streak = 0;
        this.fP2Streak = 0;
        this.fSelectedColours = false;
        this.fServerMoved = false;
        this.hitNetSinceTouched = false;
        this.gameThread = null;
        this.fEndGame = false;
        this.startTime = 0;
        this.gameTime = 0;
        this.realStartTime = 0;
        this.crossedNetTime = 0;
        this.scoringRun = 0;
        this.oldScoringRun = 0;
        this.slimeColText = null;
        this.slimeColours = null;
        this.slimeColours2 = null;
        this.SKY_COL = null;
        this.COURT_COL = null;
        this.BALL_COL = null;
        this.field_rn_Slime2P_pw_1 = null;
        this.firstHalf = false;
        this.wind = 0;
        this.particle_x = null;
        this.particle_y = null;
        this.particle_weight = null;
        this.floor = 0;
        this.buffer = null;
        this.baseFont = null;
        this.particle_x = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.NUM_PARTICLES);
        this.particle_y = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.NUM_PARTICLES);
        this.particle_weight = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.NUM_PARTICLES);
        this.floor = 280;
    }

    public init() {
        let var1 : string = "footyslime.com";
        if(!/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var1,"footyslime.com"))) {
            try {
                this.getAppletContext().showDocument$URL$java_lang_String(new URL("http://footyslime.com/"), "_self");
            } catch(var6) {
                System.out.println$java_lang_Object("Couldn\'t initialise!");
                throw Object.defineProperty(new Error("Couldn\'t initialise!"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
            };
        }
        this.SKY_COL = new Color(85, 85, 255);
        this.COURT_COL = new Color(0, 168, 0);
        this.BALL_COL = Color.fromString("yellow");
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        this.fInPlay = this.fEndGame = false;
        this.promptMsg = "Click the mouse to play...";
        this.screen = this.getGraphics();
        this.baseFont = this.screen.getFont();
        this.screen.setFont(new Font(this.baseFont.getName(), 1, 15));
        this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([200, 6]);
        this.firstHalf = true;
        let var2 : number = (this.nWidth / 10|0);
        let var3 : number = (2 * this.nHeight / 10|0);
        for(let var4 : number = 0; var4 < this.NUM_PARTICLES; ++var4) {
            this.particle_x[var4] = (<number>(Math.random() * <number>this.nWidth)|0);
            this.particle_y[var4] = (<number>(-Math.random() * 50.0)|0);
            this.particle_weight[var4] = <number>(Math.random() * 0.95 + 0.05);
        };
        this.slimeColText = ["Bronco Slime ", "Canterbury Bullslime ", "Cowboy Slime ", "Dragon McSlimer ", "Slimy Eel Slime ", "Knight Slimer ", "Panther Slime ", "Rabbitoh Slime ", "Raider of the Lost Slime ", "Rooster Slime ", "Womanly Slime ", "Shark Slime ", "Stormy Slime ", "Tiger Slime ", "Warrior Slime "];
        this.slimeColours = [new Color(96, 10, 44), Color.fromString("white"), Color.fromString("white"), Color.fromString("white"), Color.fromString("yellow"), new Color(0, 48, 149), Color.fromString("black"), new Color(140, 78, 0), new Color(167, 216, 11), new Color(23, 33, 86), new Color(106, 10, 35), new Color(0, 173, 227), new Color(117, 22, 158), new Color(25, 25, 25), new Color(48, 34, 37)];
        this.slimeColours2 = [new Color(231, 155, 36), new Color(0, 34, 135), new Color(6, 40, 79), new Color(185, 0, 0), new Color(0, 30, 76), new Color(237, 37, 64), new Color(0, 133, 152), new Color(225, 8, 30), new Color(0, 35, 154), Color.fromString("red"), Color.fromString("white"), new Color(31, 28, 28), new Color(161, 161, 162), new Color(255, 135, 10), new Color(212, 211, 205)];
        this.field_rn_Slime2P_pw_1 = /* toCharArray */(".....").split('');
        this.buffer = this.createImage(this.nWidth, this.nHeight);
        if(this.buffered) {
            this.buffered = false;
            for(let var5 : number = 0; var5 < this.bfr.length; ++var5) {
                this.pwAddChar(/* toCharArray */(this.bfr).split('')[var5]);
            };
        }
    }

    public paint(var1 : Graphics) {
        let var2 : Graphics = this.buffered?this.buffer.getGraphics():this.getGraphics();
        var2.setColor(this.SKY_COL);
        var2.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        var2.setColor(this.COURT_COL);
        var2.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        var2.setColor(Color.fromString("white"));
        var2.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        this.drawScores();
        this.drawPrompt();
        if(!this.fInPlay) {
            let var3 : FontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            if(this.fP1PointsWon + this.fP2PointsWon > 0) {
                if(this.firstHalf) {
                    this.screen.drawString("NRL Slime Volleyball!", (this.nWidth / 2|0) - (var3.stringWidth("NRL Slime Volleyball!") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 5);
                }
                var2.setColor(Color.fromString("white"));
                var3 = var2.getFontMetrics();
                if(!this.firstHalf) {
                    var2.drawString("First half stats:", (this.nWidth / 2|0) - (var3.stringWidth("First half stats:") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 4);
                } else {
                    var2.drawString("Last game\'s stats:", (this.nWidth / 2|0) - (var3.stringWidth("Last game\'s stats:") / 2|0), (this.nHeight / 2|0) - var3.getHeight() * 4);
                }
                let var4 : string[] = ["Possession", "Touches", "Points won", "Winners", "Aces", "Clangers", "Super Slimes", "Longest streak"];
                let var5 : string[][] = [["" + Math.floor(100 * this.fP1Frames / (this.fP1Frames + this.fP2Frames)) + "%", "" + this.fP1TouchesTot, "" + this.fP1PointsWon, "" + this.fP1Winners, "" + this.fP1Aces, "" + this.fP1Clangers, "" + this.fP1Super, "" + this.fP1Streak], ["" + (100 - Math.floor(100 * this.fP1Frames / (this.fP1Frames + this.fP2Frames))) + "%", "" + this.fP2TouchesTot, "" + this.fP2PointsWon, "" + this.fP2Winners, "" + this.fP2Aces, "" + this.fP2Clangers, "" + this.fP2Super, "" + this.fP2Streak]];
                let var6 : number = 0;
                for(let var7 : number = 0; var7 < var4.length; ++var7) {
                    var6 = Math.max(var6, var3.stringWidth(var4[var7]));
                };
                for(let var8 : number = 0; var8 < var4.length; ++var8) {
                    var2.drawString(var4[var8], (this.nWidth / 2|0) - (var3.stringWidth(var4[var8]) / 2|0), (this.nHeight / 2|0) + var3.getHeight() * (var8 - 2));
                    var2.drawString(var5[0][var8], (this.nWidth / 2|0) - var6 - (var3.stringWidth(var5[0][var8]) / 2|0), (this.nHeight / 2|0) + var3.getHeight() * (var8 - 2));
                    var2.drawString(var5[1][var8], (this.nWidth / 2|0) + var6 - (var3.stringWidth(var5[1][var8]) / 2|0), (this.nHeight / 2|0) + var3.getHeight() * (var8 - 2));
                };
                this.drawPrompt$java_lang_String$int(!this.firstHalf?"Swap sides and click the mouse to continue...":"Click the mouse to start another game!", 0);
            } else {
                this.screen.drawString("NRL Slime Volleyball!", (this.nWidth / 2|0) - (var3.stringWidth("NRL Slime Volleyball!") / 2|0), (this.nHeight / 2|0) - var3.getHeight());
                var2.setColor(Color.fromString("white"));
                var3 = var2.getFontMetrics();
                var2.drawString("Code base by Quin Pendragon", (this.nWidth / 2|0) - (var3.stringWidth("Code base by Quin Pendragon") / 2|0), (this.nHeight / 2|0) + var3.getHeight() * 2);
                var2.drawString("Mod by Daniel Wedge", (this.nWidth / 2|0) - (var3.stringWidth("Mod by Daniel Wedge") / 2|0), (this.nHeight / 2|0) + var3.getHeight() * 3);
                var2.drawString("Wind particles by Tim Lightfoot", (this.nWidth / 2|0) - (var3.stringWidth("Wind particles by Tim Lightfoot") / 2|0), (this.nHeight / 2|0) + var3.getHeight() * 4);
            }
        }
        if(this.buffered) {
            var1.drawImage(this.buffer, 0, 0, this);
        }
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            if(!this.fEndGame) {
                if(!this.fSelectedColours) {
                    this.pwAddChar(String.fromCharCode(var1.key));
                }
                switch((var1.key)) {
                case 32:
                    this.mousePressed = true;
                    break;
                case 65:
                case 97:
                    if(!this.backwards) {
                        this.moveP1Left();
                    } else {
                        this.moveP1Right();
                    }
                    break;
                case 68:
                case 100:
                    if(!this.backwards) {
                        this.moveP1Right();
                    } else {
                        this.moveP1Left();
                    }
                    break;
                case 73:
                case 105:
                    this.moveP2Jump();
                    break;
                case 74:
                case 106:
                    if(!this.backwards) {
                        this.moveP2Left();
                    } else {
                        this.moveP2Right();
                    }
                    break;
                case 75:
                case 107:
                    if(!this.fSelectedColours) {
                        this.changeP2Col();
                    }
                    break;
                case 76:
                case 108:
                    if(!this.backwards) {
                        this.moveP2Right();
                    } else {
                        this.moveP2Left();
                    }
                    break;
                case 83:
                case 115:
                    if(!this.fSelectedColours) {
                        this.changeP1Col();
                    }
                    break;
                case 87:
                case 119:
                    this.moveP1Jump();
                }
            }
            break;
        case 402:
        case 404:
            switch((var1.key)) {
            case 65:
            case 97:
                if(this.p1XV * (this.backwards?-1:1) < 0) {
                    this.moveP1Stop();
                }
                return false;
            case 68:
            case 100:
                if(this.p1XV * (this.backwards?-1:1) > 0) {
                    this.moveP1Stop();
                }
                return false;
            case 74:
            case 106:
                if(this.p2XV * (this.backwards?-1:1) < 0) {
                    this.moveP2Stop();
                }
                return false;
            case 76:
            case 108:
                if(this.p2XV * (this.backwards?-1:1) > 0) {
                    this.moveP2Stop();
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
                this.hitNetSinceTouched = false;
                this.promptMsg = "";
                this.repaint();
                this.gameThread = new Thread(this);
                this.gameThread.start();
            } else if(!this.fSelectedColours) {
                this.fInPlay = true;
                this.replayStart = 0;
                this.replayPos = 0;
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
                this.hitNetSinceTouched = false;
                this.promptMsg = "";
                this.fP1Touched = false;
                this.fP2Touched = false;
                this.fServerMoved = false;
                this.drawPrompt();
                this.DrawStatus();
                this.repaint();
                this.startTime = System.currentTimeMillis();
                this.realStartTime = this.startTime;
                this.fSelectedColours = true;
            }
            break;
        case 503:
            this.showStatus("NRL Slime Volleyball: http://footyslime.com/nrl/");
        }
        return false;
    }

    /*public*/ pwAddChar(var1 : string) {
        for(let var2 : number = 0; var2 < 4; this.field_rn_Slime2P_pw_1[var2++] = this.field_rn_Slime2P_pw_1[var2]) {
        };
        this.field_rn_Slime2P_pw_1[4] = var1;
        let var3 : string = (this.field_rn_Slime2P_pw_1.join('')).toLowerCase();
        let var4 : boolean = false;
        if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.nyt))) {
            var4 = true;
            this.nightTime = !this.nightTime;
            this.SKY_COL = this.nightTime?new Color(0, 0, 70):new Color(85, 85, 255);
            this.COURT_COL = this.nightTime?new Color(0, 100, 0):new Color(0, 168, 0);
            this.BALL_COL = this.nightTime?Color.fromString("white"):Color.fromString("yellow");
            this.repaint();
            this.promptMsg = this.nightTime?"... and the lights come on at Slime Stadium!":"The Slime Sun has risen!";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.psy))) {
            var4 = true;
            this.psycho = !this.psycho;
            this.promptMsg = this.psycho?"Can\'t get to the ball fast enough?":"Can\'t handle the pace?";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.bck))) {
            var4 = true;
            this.backwards = !this.backwards;
            this.promptMsg = this.backwards?"Slime God Clive blesses you!":"Don\'t like challenges, huh?";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.tim))) {
            var4 = true;
            this.timer = !this.timer;
            this.promptMsg = this.timer?"Don\'t like the uncertainty of time on? Pathetic.":"Welcome back from the other side.";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.wnd))) {
            var4 = true;
            this.windOn = !this.windOn;
            this.promptMsg = !this.windOn?"Can\'t handle the challenge?":"Yeah, wind is good.";
            if(!this.windOn) {
                this.unDrawParticles();
            }
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.bfr))) {
            var4 = true;
            this.buffered = !this.buffered;
            this.screen = this.buffered?this.buffer.getGraphics():this.getGraphics();
            this.screen.setFont(new Font(this.baseFont.getName(), 1, 15));
            if(this.fInPlay) {
                this.promptMsg = this.buffered?"Double buffering is on.":"Do not adjust your set... the Slimes are flickery.";
            }
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.hl2))) {
            var4 = true;
            this.GAME_LENGTH = 120000;
            this.promptMsg = "Halves now two minutes long.";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.hl3))) {
            var4 = true;
            this.GAME_LENGTH = 180000;
            this.promptMsg = "Halves now three minutes long.";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.hl4))) {
            var4 = true;
            this.GAME_LENGTH = 240000;
            this.promptMsg = "Halves now four minutes long.";
        } else if(/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var3,this.hl5))) {
            var4 = true;
            this.GAME_LENGTH = 300000;
            this.promptMsg = "Halves now five minutes long.";
        }
        if(var4) {
            this.fServerMoved = true;
            this.drawPrompt();
        }
    }

    public moveP1Left() {
        this.p1XV = this.scoringRun > -6 && !this.psycho?-8:-16;
        if(this.p1X === 200 && this.ballX === 200 && !this.fP2Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public moveP1Right() {
        this.p1XV = this.scoringRun > -6 && !this.psycho?8:16;
        if(this.p1X === 200 && this.ballX === 200 && !this.fP2Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public moveP1Stop() {
        this.p1XV = 0;
    }

    public moveP1Jump() {
        if(this.p1Y === 0) {
            this.p1YV = this.scoringRun > -6 && !this.psycho?31:45;
        }
    }

    public changeP1Col() {
        do {
            this.p1Col = (this.p1Col + 1) % this.slimeColText.length;
        } while((this.p1Col === this.p2Col));
    }

    public moveP2Left() {
        this.p2XV = this.scoringRun < 6 && !this.psycho?-8:-16;
        if(this.p2X === 800 && this.ballX === 800 && !this.fP1Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public moveP2Right() {
        this.p2XV = this.scoringRun < 6 && !this.psycho?8:16;
        if(this.p2X === 800 && this.ballX === 800 && !this.fP1Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public moveP2Stop() {
        this.p2XV = 0;
    }

    public moveP2Jump() {
        if(this.p2Y === 0) {
            this.p2YV = this.scoringRun < 6 && !this.psycho?31:45;
        }
    }

    /*public*/ changeP2Col() {
        do {
            this.p2Col = (this.p2Col + 1) % this.slimeColText.length;
        } while((this.p2Col === this.p1Col));
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
            this.p1Y += this.p1YV -= this.scoringRun > -6 && !this.psycho?2:4;
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
            this.p2Y += this.p2YV -= this.scoringRun < 6 && !this.psycho?2:4;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
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
        this.screen.setColor(this.SKY_COL);
        this.screen.fillRect(var7, var8, var1, var2);
        var7 = (this.p2OldX * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2OldY * this.nHeight / 1000|0);
        this.screen.setColor(this.SKY_COL);
        this.screen.fillRect(var7, var8, var1, var2);
        this.MoveBall();
        var7 = (this.p1X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p1Y * this.nHeight / 1000|0);
        this.fP1Fire = this.scoringRun <= -6 || this.psycho;
        this.fP2Fire = this.scoringRun >= 6 || this.psycho;
        if(this.fP1Fire || this.fP2Fire || this.psycho) {
            this.superFlash = !this.superFlash;
        }
        this.DrawStrip(this.screen, var7, var8, var1, var2, this.p1Col);
        let var9 : number = this.p1X + 38;
        let var10 : number = this.p1Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        let var11 : number = var7 - var5;
        let var12 : number = var8 - var6;
        let var13 : number = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
        if(var13 > 0) {
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
        }
        var7 = (this.p2X * this.nWidth / 1000|0) - (var1 / 2|0);
        var8 = (7 * this.nHeight / 10|0) - (this.p2Y * this.nHeight / 1000|0);
        this.DrawStrip(this.screen, var7, var8, var1, var2, this.p2Col);
        var9 = this.p2X - 18;
        var10 = this.p2Y - 60;
        var7 = (var9 * this.nWidth / 1000|0);
        var8 = (7 * this.nHeight / 10|0) - (var10 * this.nHeight / 1000|0);
        var11 = var7 - var5;
        var12 = var8 - var6;
        var13 = (<number>Math.sqrt(<number>(var11 * var11 + var12 * var12))|0);
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillOval(var7 - var3, var8 - var4, var3, var4);
        if(var13 > 0) {
            this.screen.setColor(Color.fromString("black"));
            this.screen.fillOval(var7 - (4 * var11 / var13|0) - (3 * var3 / 4|0), var8 - (4 * var12 / var13|0) - (3 * var4 / 4|0), (var3 / 2|0), (var4 / 2|0));
        }
        if(Math.abs(this.scoringRun) < 6 && !this.psycho) {
            this.superFlash = false;
        }
    }

    /*public*/ DrawStrip(var1 : Graphics, var2 : number, var3 : number, var4 : number, var5 : number, var6 : number) {
        let var7 : boolean = false;
        if(var6 === this.p1Col && (this.fP1Fire || this.psycho) || var6 === this.p2Col && (this.fP2Fire || this.psycho)) {
            var7 = this.superFlash;
        }
        var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
        var1.fillArc(var2, var3, var4, 2 * var5, 0, 180);
        var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
        switch((var6)) {
        case 0:
        case 2:
        case 4:
        case 5:
        case 6:
        case 8:
        case 11:
        case 13:
            var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
            var1.fillArc(var2, var3, var4, 2 * var5, 0, 180);
            var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
            var1.fillPolygon$Polygon(new Polygon([var2 + (var4 / 5|0), var2 + (4 * var4 / 5|0), var2 + (4 * var4 / 5|0), var2 + (var4 / 5|0)], [(<number>(0.2 * <number>var5 + <number>var3)|0), (<number>(0.2 * <number>var5 + <number>var3)|0), var3 + var5, var3 + var5], 4));
            var1.fillArc(var2, var3, var4, 2 * var5, 53, 74);
            if(var6 === 2) {
                var1.setColor(var7?this.slimeColours[var6]:this.slimeColours2[var6]);
                var1.fillArc(var2, var3, var4, 2 * var5, 0, 19);
                var1.fillArc(var2, var3, var4, 2 * var5, 161, 19);
                var1.fillRect((<number>(0.029 * <number>var4 + <number>var2)|0), var3 + (2 * var5 / 3|0), (<number>(0.942 * <number>var4)|0), (var5 / 3|0));
            }
            break;
        case 1:
        case 3:
        case 9:
        case 12:
        case 14:
            var1.fillArc(var2, var3, var4, 2 * var5, 40, 100);
            if(var6 === 9) {
                var1.setColor(Color.fromString("white"));
            } else if(var6 === 12) {
                var1.setColor(new Color(0, 28, 87));
            } else {
                var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
            }
            var1.fillArc(var2, var3, var4, 2 * var5, 70, 40);
            break;
        case 7:
            var1.fillArc(var2, var3, var4, 2 * var5, 19, 23);
            var1.fillArc(var2, var3, var4, 2 * var5, 138, 23);
            var1.fillRect((<number>(0.128 * <number>var4 + <number>var2)|0), var3 + (var5 / 3|0), (<number>(0.744 * <number>var4)|0), (2 * var5 / 3|0));
            var1.setColor(var7?this.slimeColours2[var6]:this.slimeColours[var6]);
            var1.fillArc(var2, var3, var4, 2 * var5, 0, 19);
            var1.fillArc(var2, var3, var4, 2 * var5, 161, 19);
            var1.fillRect((<number>(0.029 * <number>var4 + <number>var2)|0), var3 + (2 * var5 / 3|0), (<number>(0.942 * <number>var4)|0), (var5 / 3|0));
            break;
        case 10:
            var1.setColor(Color.fromString("white"));
            var1.drawLine((<number>(0.128 * <number>var4 + <number>var2)|0), var3 + (var5 / 3|0), (<number>(0.872 * <number>var4 + <number>var2)|0), var3 + (var5 / 3|0));
            var1.drawLine((<number>(0.029 * <number>var4 + <number>var2)|0), var3 + (2 * var5 / 3|0), (<number>(0.971 * <number>var4 + <number>var2)|0), var3 + (2 * var5 / 3|0));
        }
    }

    /*public*/ doWind() {
        if(this.windOn && Math.random() >= 0.9) {
            this.wind += (<number>(2.0 - 4.0 * Math.random())|0);
            if(this.wind > 30) {
                this.wind = 30;
            } else if(this.wind < -30) {
                this.wind = -30;
            }
        }
    }

    /*public*/ MoveBall() {
        let var1 : number = (30 * this.nHeight / 1000|0);
        let var2 : number = (this.ballOldX * this.nWidth / 1000|0);
        let var3 : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        this.screen.setColor(this.SKY_COL);
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(this.windOn && this.fServerMoved) {
            this.ballX *= 10;
            this.ballX += this.wind;
            this.ballX /= 10;
        }
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
                if(this.fServerMoved) {
                    this.fP1Touched = true;
                    ++this.fP1Touches;
                    ++this.fP1TouchesTot;
                    this.fP2Touches = 0;
                    this.fP1HitStill = this.p1YV === 0 && this.p1XV === 0;
                    this.hitNetSinceTouched = false;
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
                if(this.fServerMoved) {
                    this.fP2Touched = true;
                    this.fP1Touches = 0;
                    ++this.fP2Touches;
                    ++this.fP2TouchesTot;
                    this.fP2HitStill = this.p2YV === 0 && this.p2XV === 0;
                    this.hitNetSinceTouched = false;
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
                    this.hitNetSinceTouched = true;
                } else {
                    this.ballX = 520;
                    this.ballVX = this.ballVX <= 0?-this.ballVX:this.ballVX;
                    this.hitNetSinceTouched = true;
                }
            }
        }
        var2 = (this.ballX * this.nWidth / 1000|0);
        var3 = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        this.screen.setColor(this.BALL_COL);
        this.screen.fillOval(var2 - var1, var3 - var1, var1 * 2, var1 * 2);
    }

    /*public*/ drawScores() {
        let var1 : Graphics = this.screen;
        let var2 : FontMetrics = var1.getFontMetrics();
        let var3 : number = (this.nHeight / 25|0);
        let var4 : number = (this.nHeight / 15|0);
        var1.setColor(this.SKY_COL);
        var1.fillRect(0, 0, this.nWidth, var4 + 22);
        let var5 : number = 20;
        for(let var6 : number = 0; var6 < (this.fP1PointsWon / 10|0); ++var6) {
            var1.setColor(this.slimeColours[this.p1Col]);
            var1.fillOval(var5, 30 - (var4 / 2|0), var4, var4);
            var1.setColor(this.slimeColours2[this.p1Col]);
            var1.drawOval(var5, 30 - (var4 / 2|0), var4, var4);
            var5 += (var4 / 2|0);
        };
        if(this.fP1PointsWon >= 20) {
            var1.drawString("" + (this.fP1PointsWon / 10|0), var5 - (var2.stringWidth("" + (this.fP1PointsWon / 10|0)) / 2|0), 30 + (var2.getAscent() / 2|0));
        }
        if(this.fP1PointsWon > 10) {
            var5 += (var4 / 2|0) + 10;
        }
        for(let var7 : number = 0; var7 < this.fP1PointsWon % 10; ++var7) {
            var1.setColor(this.slimeColours[this.p1Col]);
            var1.fillOval(var5, 30 - (var3 / 2|0), var3, var3);
            var1.setColor(this.slimeColours2[this.p1Col]);
            var1.drawOval(var5, 30 - (var3 / 2|0), var3, var3);
            var5 += var3 + 5;
        };
        var5 = this.nWidth - 20 - ((this.fP2PointsWon / 10|0) * var4 / 2|0) - (this.fP2PointsWon % 10 === 0?(var4 / 2|0) + 10:0) - this.fP2PointsWon % 10 * var3 - (this.fP2PointsWon % 10 > 0?this.fP2PointsWon % 10 - 1:0) * 5;
        if(this.fP2PointsWon > 10 && this.fP2PointsWon % 10 !== 0) {
            var5 -= (var4 / 2|0) + 10;
        }
        for(let var8 : number = 0; var8 < (this.fP2PointsWon / 10|0); ++var8) {
            var1.setColor(this.slimeColours[this.p2Col]);
            var1.fillOval(var5, 30 - (var4 / 2|0), var4, var4);
            var1.setColor(this.slimeColours2[this.p2Col]);
            var1.drawOval(var5, 30 - (var4 / 2|0), var4, var4);
            var5 += (var4 / 2|0);
        };
        if(this.fP2PointsWon >= 20) {
            var1.drawString("" + (this.fP2PointsWon / 10|0), var5 - (var2.stringWidth("" + (this.fP2PointsWon / 10|0)) / 2|0), 30 + (var2.getAscent() / 2|0));
        }
        if(this.fP2PointsWon > 10) {
            var5 += (var4 / 2|0) + 10;
        }
        for(let var9 : number = 0; var9 < this.fP2PointsWon % 10; ++var9) {
            var1.setColor(this.slimeColours[this.p2Col]);
            var1.fillOval(var5, 30 - (var3 / 2|0), var3, var3);
            var1.setColor(this.slimeColours2[this.p2Col]);
            var1.drawOval(var5, 30 - (var3 / 2|0), var3, var3);
            var5 += var3 + 5;
        };
    }

    /*public*/ MakeTime(var1 : number) : string {
        let var3 : string = "";
        var1 = Math.floor(<number>(2400000.0 * <number>var1 / <number>this.GAME_LENGTH));
        let var4 : number = Math.floor(var1 / 10) % 100;
        let var6 : number = Math.floor(var1 / 1000) % 60;
        let var8 : number = Math.floor(var1 / 60000) % 60;
        let var10 : number = Math.floor(var1 / 3600000);
        var3 = var3 + var8 + ":";
        if(var6 < 10) {
            var3 = var3 + "0";
        }
        var3 = var3 + var6;
        return var3;
    }

    /*public*/ DrawStatus() {
        let var1 : Graphics = this.screen;
        let var2 : FontMetrics = var1.getFontMetrics();
        let var3 : string;
        if(this.fSelectedColours) {
            var3 = (this.firstHalf?"1st":"2nd") + " half: " + this.MakeTime(this.timer?this.GAME_LENGTH - this.gameTime:System.currentTimeMillis() - this.realStartTime);
        } else {
            var3 = this.slimeColText[this.p1Col] + "v " + this.slimeColText[this.p2Col];
        }
        if(this.gameTime > this.GAME_LENGTH) {
            var3 = (this.firstHalf?"1st":"2nd") + " half: Final point!";
        }
        let var4 : number = var2.getHeight() * 3;
        let var5 : number = var2.stringWidth(var3);
        let var6 : number = (this.nWidth / 2|0) - (var5 / 2|0) - 10;
        var1.setColor(this.SKY_COL);
        if(this.fSelectedColours) {
            var1.fillRect(var6, 0, var5 + 20, var4 + 22);
        } else {
            var1.fillRect(0, 0, this.nWidth, var4 + 22);
        }
        var1.setColor(Color.fromString("white"));
        var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), var2.getHeight() * 2);
        if(this.windOn) {
            if(this.wind < 0) {
                var3 = "<< " + -this.wind + " km/h";
            } else if(this.wind > 0) {
                var3 = this.wind + " km/h >>";
            } else {
                var3 = "no wind";
            }
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), var2.getHeight() * 3);
        }
        if(!this.fSelectedColours) {
            var1.setColor(Color.fromString("red"));
            var3 = "WARM UP ONLY";
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), var2.getHeight() * 4);
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

    /*public*/ SaveReplayData() {
        this.replayData[this.replayPos][0] = this.p1X;
        this.replayData[this.replayPos][1] = this.p1Y;
        this.replayData[this.replayPos][2] = this.p2X;
        this.replayData[this.replayPos][3] = this.p2Y;
        this.replayData[this.replayPos][4] = this.ballX;
        this.replayData[this.replayPos][5] = this.ballY;
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

    /*public*/ ReplayFrame(var1 : number) {
        let var2 : number = var1 !== 0?var1 - 1:199;
        this.p1OldX = this.replayData[var2][0];
        this.p1OldY = this.replayData[var2][1];
        this.p2OldX = this.replayData[var2][2];
        this.p2OldY = this.replayData[var2][3];
        this.ballOldX = this.replayData[var2][4];
        this.ballOldY = this.replayData[var2][5];
        this.p1X = this.replayData[var1][0];
        this.p1Y = this.replayData[var1][1];
        this.p2X = this.replayData[var1][2];
        this.p2Y = this.replayData[var1][3];
        this.ballX = this.replayData[var1][4];
        this.ballY = this.replayData[var1][5];
        this.ballVX = 0;
        this.ballVY = 1;
        this.DrawSlimers();
        if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
        }
    }

    public async run() {
        this.replayPos = this.replayStart = 0;
        if(this.firstHalf) {
            this.fSelectedColours = false;
            this.p1Col = 0;
            this.p2Col = 1;
            this.promptMsg = "Select a slime and click the mouse when warmed up.";
            this.drawPrompt();
            this.superFlash = false;
            this.scoringRun = 0;
            this.fP1Touches = 0;
            this.fP2Touches = 0;
            this.fP1TouchesTot = 0;
            this.fP2TouchesTot = 0;
            this.fP1Clangers = 0;
            this.fP2Clangers = 0;
            this.fP1Aces = 0;
            this.fP2Aces = 0;
            this.fP1Winners = 0;
            this.fP2Winners = 0;
            this.fP1PointsWon = 0;
            this.fP2PointsWon = 0;
            this.fP1Frames = 0;
            this.fP2Frames = 0;
            this.fP1Super = 0;
            this.fP2Super = 0;
            this.fP1Streak = 0;
            this.fP2Streak = 0;
            this.wind = (<number>(30.0 - 60.0 * Math.random())|0);
        } else {
            this.ballX = 200;
            this.scoringRun = 0;
            this.superFlash = false;
            let var1 : number = this.p1Col;
            this.p1Col = this.p2Col;
            this.p2Col = var1;
            var1 = this.fP1Touches;
            this.fP1Touches = this.fP2Touches;
            this.fP2Touches = var1;
            var1 = this.fP1TouchesTot;
            this.fP1TouchesTot = this.fP2TouchesTot;
            this.fP2TouchesTot = var1;
            var1 = this.fP1Clangers;
            this.fP1Clangers = this.fP2Clangers;
            this.fP2Clangers = var1;
            var1 = this.fP1Aces;
            this.fP1Aces = this.fP2Aces;
            this.fP2Aces = var1;
            var1 = this.fP1Winners;
            this.fP1Winners = this.fP2Winners;
            this.fP2Winners = var1;
            var1 = this.fP1PointsWon;
            this.fP1PointsWon = this.fP2PointsWon;
            this.fP2PointsWon = var1;
            let var2 : number = this.fP1Frames;
            this.fP1Frames = this.fP2Frames;
            this.fP2Frames = var2;
            var1 = this.fP1Super;
            this.fP1Super = this.fP2Super;
            this.fP2Super = var1;
            var1 = this.fP1Streak;
            this.fP1Streak = this.fP2Streak;
            this.fP2Streak = var1;
            this.repaint();
        }
        this.fP1HitStill = false;
        this.fP2HitStill = false;
        this.fServerMoved = false;
        this.crossedNetTime = 0;
        this.drawScores();
        this.fP1Touched = this.fP2Touched = false;
        this.hitNetSinceTouched = false;
        let var9 : boolean = false;
        let var8 : boolean = false;
        let var3 : boolean = false;
        this.startTime = System.currentTimeMillis();
        this.realStartTime = this.startTime;
        while((this.gameThread != null)) {
            if(!this.fSelectedColours) {
                this.startTime = System.currentTimeMillis() - this.gameTime;
                this.realStartTime = this.startTime;
            } else {
                this.gameTime = System.currentTimeMillis() - this.startTime;
            }
            this.SaveReplayData();
            if(!this.fServerMoved) {
                this.crossedNetTime = System.currentTimeMillis();
            } else if(this.crossedNetTime < 0 && this.ballX > 500 - (3 * this.nHeight / 50|0) || this.crossedNetTime > 0 && this.ballX < 500 + (3 * this.nHeight / 50|0)) {
                this.crossedNetTime = this.ballX <= 500?-System.currentTimeMillis():System.currentTimeMillis();
                this.drawPrompt();
            }
            this.p1OldX = this.p1X;
            this.p1OldY = this.p1Y;
            this.p2OldX = this.p2X;
            this.p2OldY = this.p2Y;
            this.ballOldX = this.ballX;
            this.ballOldY = this.ballY;
            this.DrawStatus();
            if(this.windOn) {
                this.doWind();
                this.unDrawParticles();
                this.updateParticles();
                this.drawParticles();
                this.screen.setColor(Color.fromString("white"));
                this.screen.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
            }
            this.MoveSlimers();
            this.DrawSlimers();
            if(this.buffered) {
                this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
            }
            if(this.fServerMoved && this.fSelectedColours) {
                if(this.ballX < 500 - (3 * this.nHeight / 50|0)) {
                    ++this.fP1Frames;
                } else if(this.ballX > 500 + (3 * this.nHeight / 50|0)) {
                    ++this.fP2Frames;
                }
            }
            if(!this.fSelectedColours && this.ballY < 35) {
                Thread.sleep$long$boolean(1000, false);
                this.p1X = 200;
                this.p1Y = 0;
                this.p2X = 800;
                this.p2Y = 0;
                this.p1XV = 0;
                this.p1YV = 0;
                this.p2XV = 0;
                this.p2YV = 0;
                this.ballX = this.ballX >= 500?200:800;
                this.ballY = 400;
                this.ballVX = 0;
                this.ballVY = 0;
                this.fServerMoved = false;
                this.fP1Touched = this.fP2Touched = false;
                this.repaint();
            } else {
                let var4 : number;
                if(this.fSelectedColours && this.holdingOn && Math.abs(this.crossedNetTime) + 5000 < System.currentTimeMillis() && this.ballY >= 35) {
                    var4 = System.currentTimeMillis();
                    this.promptMsg = "BALL... YES!";
                    this.drawPrompt();
                    this.promptMsg = "";
                    this.drawPrompt$java_lang_String$int("Holding the ball against " + (this.ballX <= 500?this.slimeColText[this.p1Col]:this.slimeColText[this.p2Col]) + "!!", 1);
                    this.drawPrompt$java_lang_String$int("Press space for replay...", 2);
                    if(this.buffered) {
                        this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
                    }
                    this.mousePressed = false;
                    if(this.ballX > 500) {
                        ++this.fP1PointsWon;
                        ++this.fP2Clangers;
                    } else {
                        ++this.fP2PointsWon;
                        ++this.fP1Clangers;
                    }
                    this.oldScoringRun = this.scoringRun;
                    if(this.ballX <= 500 && this.scoringRun >= 0) {
                        ++this.scoringRun;
                        if(this.scoringRun > this.fP2Streak) {
                            this.fP2Streak = this.scoringRun;
                        }
                    } else if(this.ballX > 500 && this.scoringRun <= 0) {
                        --this.scoringRun;
                        if(-this.scoringRun > this.fP1Streak) {
                            this.fP1Streak = -this.scoringRun;
                        }
                    } else if(this.ballX <= 500 && this.scoringRun <= 0) {
                        this.scoringRun = 1;
                        if(this.scoringRun > this.fP2Streak) {
                            this.fP2Streak = this.scoringRun;
                        }
                    } else if(this.ballX > 500 && this.scoringRun >= 0) {
                        this.scoringRun = -1;
                        if(-this.scoringRun > this.fP1Streak) {
                            this.fP1Streak = -this.scoringRun;
                        }
                    }
                    this.drawScores();
                    this.DrawStatus();
                    Thread.sleep$long$boolean(1000, true);
                    if(this.mousePressed) {
                        this.SaveReplayData();
                        this.DoReplay();
                    }
                    this.promptMsg = "";
                    this.drawPrompt();
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p1XV = 0;
                    this.p1YV = 0;
                    this.p2XV = 0;
                    this.p2YV = 0;
                    this.ballX = this.ballX >= 500?200:800;
                    this.ballY = 400;
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.replayStart = this.replayPos = 0;
                    this.fP1Touched = this.fP2Touched = false;
                    this.fServerMoved = false;
                    if(this.GAME_LENGTH <= this.gameTime) {
                        this.endHalf();
                    }
                    this.repaint();
                } else if(this.fSelectedColours && this.holdingOn && Math.abs(this.crossedNetTime) + 5000 - 1000 < System.currentTimeMillis() && this.ballY >= 35) {
                    this.promptMsg = "BALL...";
                    if(this.buffered) {
                        this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
                    }
                    this.drawPrompt();
                    this.promptMsg = "";
                } else if(this.ballY < 35) {
                    var4 = System.currentTimeMillis();
                    if(this.ballX > 500) {
                        ++this.fP1PointsWon;
                    } else {
                        ++this.fP2PointsWon;
                    }
                    this.oldScoringRun = this.scoringRun;
                    if(this.ballX <= 500 && this.scoringRun >= 0) {
                        ++this.scoringRun;
                        if(this.scoringRun > this.fP2Streak) {
                            this.fP2Streak = this.scoringRun;
                        }
                    } else if(this.ballX > 500 && this.scoringRun <= 0) {
                        --this.scoringRun;
                        if(-this.scoringRun > this.fP1Streak) {
                            this.fP1Streak = -this.scoringRun;
                        }
                    } else if(this.ballX <= 500 && this.scoringRun <= 0) {
                        this.scoringRun = 1;
                        if(this.scoringRun > this.fP2Streak) {
                            this.fP2Streak = this.scoringRun;
                        }
                    } else if(this.ballX > 500 && this.scoringRun >= 0) {
                        this.scoringRun = -1;
                        if(-this.scoringRun > this.fP1Streak) {
                            this.fP1Streak = -this.scoringRun;
                        }
                    }
                    if(this.ballX > 500 || this.fP1Touches < 3 && (!this.hitNetSinceTouched || this.fP1Touches <= 0) && this.fP2Touched && (!this.fP1HitStill || this.fP1Touches <= 0)) {
                        if(this.ballX > 500 && (this.fP2Touches >= 3 || this.hitNetSinceTouched && this.fP2Touches > 0 || !this.fP1Touched || this.fP2HitStill && this.fP2Touches > 0)) {
                            ++this.fP2Clangers;
                            var9 = true;
                        }
                    } else {
                        ++this.fP1Clangers;
                        var9 = true;
                    }
                    if(this.fP1Touched && !this.fP2Touched && this.ballX >= 500) {
                        ++this.fP1Aces;
                        var8 = true;
                    } else if(this.fP2Touched && !this.fP1Touched && this.ballX < 500) {
                        ++this.fP2Aces;
                        var8 = true;
                    } else if(this.ballX > 500 && this.fP1Touches > 0) {
                        ++this.fP1Winners;
                        var3 = true;
                    } else if(this.ballX <= 500 && this.fP2Touches > 0) {
                        ++this.fP2Winners;
                        var3 = true;
                    }
                    if(Math.abs(this.scoringRun) > 6) {
                        this.promptMsg = "Super " + (this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col]);
                    } else {
                        this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
                    }
                    if(!this.fP1Touched && !this.fP2Touched) {
                        this.promptMsg = "What can I say?";
                    } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) === 5) {
                        this.promptMsg = this.promptMsg + "is heating up!";
                    } else if((this.scoringRun < 0?-this.scoringRun:this.scoringRun) === 6) {
                        this.promptMsg = this.promptMsg + "is on fire!";
                        if(this.scoringRun < 0) {
                            ++this.fP1Super;
                        } else {
                            ++this.fP2Super;
                        }
                    } else if((this.ballX <= 500 || !this.fP1Touched || this.fP2Touched) && (this.ballX > 500 || this.fP1Touched || !this.fP2Touched)) {
                        if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                            this.promptMsg = (this.ballX < 500?this.slimeColText[this.p1Col]:this.slimeColText[this.p2Col]) + "can\'t serve!";
                        } else if(this.fP1PointsWon === this.fP2PointsWon) {
                            this.promptMsg = this.promptMsg + "draws level!";
                        } else if((this.ballX <= 500 || this.fP1PointsWon !== this.fP2PointsWon + 1) && (this.ballX > 500 || this.fP1PointsWon + 1 !== this.fP2PointsWon)) {
                            this.promptMsg = this.promptMsg + "scores!";
                        } else {
                            this.promptMsg = this.promptMsg + "takes the lead!";
                        }
                    } else {
                        this.promptMsg = this.promptMsg + "aces the serve!";
                    }
                    let var6 : number = this.ballX;
                    this.drawPrompt();
                    if((-this.scoringRun >= this.fP1Streak || this.scoringRun >= this.fP2Streak) && Math.abs(this.scoringRun) >= 3) {
                        this.drawPrompt$java_lang_String$int("" + this.fP1Streak + " << Longest streak >> " + this.fP2Streak, 2);
                    } else if(var9) {
                        this.drawPrompt$java_lang_String$int("" + this.fP1Clangers + " << Clangers >> " + this.fP2Clangers, 2);
                    } else if(var8) {
                        this.drawPrompt$java_lang_String$int("" + this.fP1Aces + " << Aces >> " + this.fP2Aces, 2);
                    } else if(var3) {
                        this.drawPrompt$java_lang_String$int("" + this.fP1Winners + " << Winners >> " + this.fP2Winners, 2);
                    } else {
                        this.drawPrompt$java_lang_String$int("" + this.fP1PointsWon + " << Points won >> " + this.fP2PointsWon, 2);
                    }
                    var9 = false;
                    var8 = false;
                    var3 = false;
                    this.drawPrompt$java_lang_String$int("Press space for replay...", 1);
                    this.mousePressed = false;
                    this.drawScores();
                    this.DrawStatus();
                    if(this.buffered) {
                        this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
                    }
                    Thread.sleep$long$boolean(1000, true);
                    if(this.mousePressed) {
                        this.SaveReplayData();
                        this.DoReplay();
                    }
                    this.promptMsg = "";
                    this.drawPrompt();
                    this.p1X = 200;
                    this.p1Y = 0;
                    this.p2X = 800;
                    this.p2Y = 0;
                    this.p1XV = 0;
                    this.p1YV = 0;
                    this.p2XV = 0;
                    this.p2YV = 0;
                    this.ballX = var6 >= 500?200:800;
                    this.ballY = 400;
                    this.ballVX = 0;
                    this.ballVY = 0;
                    this.replayStart = this.replayPos = 0;
                    this.fP1Touched = this.fP2Touched = false;
                    this.fServerMoved = false;
                    if(this.GAME_LENGTH <= this.gameTime) {
                        this.endHalf();
                    }
                    this.repaint();
                }
            }
            if(this.gameThread != null) {
                try {
                    Thread.sleep$long(20);
                } catch(var7) {
                };
            }
        };
        this.fEndGame = true;
        this.fInPlay = false;
        this.promptMsg = "";
        this.repaint();
    }

    /*public*/ endHalf() {
        if(this.firstHalf) {
            this.gameTime = 0;
            this.firstHalf = false;
            this.promptMsg = "It\'s half time.";
            this.drawPrompt();
            if(this.buffered) {
                this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
            }
            this.promptMsg = "";
        } else {
            this.promptMsg = "";
            this.drawPrompt();
            this.drawPrompt$java_lang_String$int("... and that\'s the game.", 0);
            if(this.buffered) {
                this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
            }
            this.promptMsg = "";
            Thread.sleep$long$boolean(1000, false);
            if(this.fP1PointsWon > this.fP2PointsWon) {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p1Col] + "Wins!", 1);
            } else if(this.fP2PointsWon > this.fP1PointsWon) {
                this.drawPrompt$java_lang_String$int(this.slimeColText[this.p2Col] + "Wins!", 1);
            } else {
                this.drawPrompt$java_lang_String$int("It\'s a draw!", 1);
            }
            if(this.buffered) {
                this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
            }
            this.gameTime = 0;
            this.firstHalf = true;
        }
        Thread.sleep$long$boolean(3000, false);
        this.p1X = 200;
        this.p1Y = 0;
        this.p2X = 800;
        this.p2Y = 0;
        this.p1XV = 0;
        this.p1YV = 0;
        this.p2XV = 0;
        this.p2YV = 0;
        this.ballX = this.firstHalf?200:800;
        this.ballY = 400;
        this.ballVX = 0;
        this.ballVY = 0;
        this.replayStart = this.replayPos = 0;
        this.fP1Touched = this.fP2Touched = false;
        this.fServerMoved = false;
        this.repaint();
        this.gameThread = null;
    }

    /*public*/ DoReplay() {
        let var1 : FontMetrics = this.screen.getFontMetrics();
        let var2 : number = var1.getHeight();
        this.promptMsg = "Press space to continue...";
        this.mousePressed = false;
        let var3 : number = this.scoringRun;
        this.scoringRun = this.oldScoringRun;
        let var4 : number = this.replayStart;
        let var5 : boolean = false;
        this.drawCourt(this.screen);
        while((!this.mousePressed)) {
            ++var4;
            if(var4 >= 200) {
                var4 = 0;
            }
            if(var4 === this.replayPos) {
                this.screen.setColor(Color.fromString("white"));
                this.screen.fillRect(20, 20, 20, 20);
                Thread.sleep$long$boolean(1000, false);
                var5 = !var5;
                this.paint(this.screen);
                this.screen.setColor(this.SKY_COL);
                this.screen.fillRect(0, 0, this.nWidth, (this.nHeight / 20|0) + 22);
                if(this.replayPos < this.replayStart) {
                    var4 += 200;
                }
                while((var4 > this.replayStart)) {
                    var4 -= 5;
                    this.drawCourt(this.screen);
                    this.screen.setColor(Color.fromString("white"));
                    this.screen.fillPolygon$Polygon(new Polygon([20, 35, 35, 50, 50, 35, 35, 20], [30, 20, 30, 20, 40, 30, 40, 30], 8));
                    if(var4 < this.replayStart) {
                        var4 = this.replayStart;
                    }
                    this.ReplayFrame(var4 % 200);
                    Thread.sleep$long$boolean(20, false);
                };
                this.drawCourt(this.screen);
                this.screen.setColor(Color.fromString("white"));
                this.screen.fillRect(20, 20, 20, 20);
                this.ReplayFrame(this.replayStart);
                Thread.sleep$long$boolean(500, false);
                this.drawCourt(this.screen);
            }
            this.ReplayFrame(var4);
            try {
                Thread.sleep$long(var5?60:20);
            } catch(var7) {
            };
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillPolygon$Polygon(new Polygon([20, 35, 20], [20, 30, 40], 3));
            this.screen.drawString(var5?"Slow motion replay":"Replay", 60, 35 - (var2 / 2|0));
        };
        this.scoringRun = var3;
        this.promptMsg = "";
        this.paint(this.screen);
    }

    /*public*/ drawCourt(var1 : Graphics) {
        var1.setColor(this.SKY_COL);
        var1.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        var1.setColor(this.COURT_COL);
        var1.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        var1.setColor(Color.fromString("white"));
        var1.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        this.drawPrompt();
    }

    /*public*/ unDrawParticles() {
        this.screen.setColor(this.SKY_COL);
        for(let var1 : number = 0; var1 < this.NUM_PARTICLES; ++var1) {
            this.screen.fillOval(this.particle_x[var1], this.particle_y[var1], this.particle_size, this.particle_size);
        };
    }

    /*public*/ updateParticles() {
        for(let var1 : number = 0; var1 < this.NUM_PARTICLES; ++var1) {
            this.particle_x[var1] = (<number>(<number>this.particle_x[var1] + this.particle_weight[var1] * <number>this.wind / 3.0)|0);
            let var2 : number = (<number>(this.particle_weight[var1] * 3.0)|0);
            this.particle_y[var1] += var2 > 0?var2:1;
            if(this.particle_x[var1] < 0 || this.particle_x[var1] > this.nWidth || this.particle_y[var1] > this.floor) {
                if(Math.random() > <number>Math.abs(<number>this.wind / 60.0)) {
                    this.particle_x[var1] = (<number>(Math.random() * <number>this.nWidth)|0);
                    this.particle_y[var1] = 0;
                } else if(this.wind > 0) {
                    this.particle_x[var1] = -1;
                    this.particle_y[var1] = (<number>(Math.random() * <number>this.floor)|0);
                } else {
                    this.particle_x[var1] = this.nWidth + 1;
                    this.particle_y[var1] = (<number>(Math.random() * <number>this.floor)|0);
                }
            }
        };
    }

    /*public*/ drawParticles() {
        for(let var2 : number = 0; var2 < this.NUM_PARTICLES; ++var2) {
            let var1 : number = (<number>(170.0 * this.particle_weight[var2])|0);
            this.screen.setColor(new Color(85 + var1, 85 + var1, 255));
            this.screen.fillOval(this.particle_x[var2], this.particle_y[var2], this.particle_size, this.particle_size);
        };
    }

    /*public*/ sleep(var1 : number, var3 : boolean) {
        if(this.gameThread != null) {
            for(let var4 : number = 0; Math.floor(<number>var4) < Math.floor(var1 / 20); ++var4) {
                try {
                    Thread.sleep$long(20);
                } catch(var6) {
                };
                if(var3) {
                    this.DrawStatus();
                    if(this.windOn) {
                        this.doWind();
                        this.unDrawParticles();
                        this.updateParticles();
                        this.drawParticles();
                        this.screen.setColor(Color.fromString("white"));
                        this.screen.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
                    }
                }
            };
        }
    }

    public destroy() {
        this.gameThread.stop();
        this.gameThread = null;
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