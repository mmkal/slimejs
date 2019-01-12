import { InputStream, URL, BufferedReader, InputStreamReader, Long, System, Applet, Runnable, Graphics, Thread, Color, BufferedImage, Vector, Font, ImageObserver, FontMetrics, Event, Polygon, Image, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


abstract class Class_rn_c_1 {
    field_rn_c_void_13 : number;

    field_rn_c_else_14 : number;

    field_rn_c_do_15 : number;

    field_rn_c_if_16 : number;

    field_rn_c_g_17 : number;

    field_rn_c_e_18 : number;

    field_rn_c_byte_19 : number;

    field_rn_c_try_20 : number;

    field_rn_c_int_21 : number;

    field_rn_c_for_22 : number;

    field_rn_c_d_23 : number;

    field_rn_c_b_24 : number;

    field_rn_c_new_25 : boolean;

    field_rn_c_f_26 : boolean;

    /*public*/ field_rn_c_c_27 : number;

    /*public*/ field_rn_c_case_28 : Slime1P;

    public static field_rn_c_goto_29 : number = 0;

    public static field_rn_c_char_30 : number = 1;

    public static field_rn_c_long_31 : number = 2;

    public static field_rn_c_a_32 : number = 3;

    public method_rn_c_a_9(var1 : Slime1P, var2 : number) {
        this.field_rn_c_case_28 = var1;
        this.field_rn_c_c_27 = var2;
    }

    public method_rn_c_a_10(var1 : number[], var2 : boolean, var3 : boolean) {
        this.field_rn_c_void_13 = this.field_rn_c_c_27 === 2?var1[0]:1000 - var1[0];
        this.field_rn_c_else_14 = var1[1];
        this.field_rn_c_do_15 = this.field_rn_c_c_27 === 2?var1[2]:-var1[2];
        this.field_rn_c_if_16 = var1[3];
        this.field_rn_c_g_17 = this.field_rn_c_c_27 === 2?var1[4]:1000 - var1[8];
        this.field_rn_c_e_18 = this.field_rn_c_c_27 === 2?var1[5]:var1[9];
        this.field_rn_c_byte_19 = this.field_rn_c_c_27 === 2?var1[6]:-var1[10];
        this.field_rn_c_try_20 = this.field_rn_c_c_27 === 2?var1[7]:var1[11];
        this.field_rn_c_int_21 = this.field_rn_c_c_27 === 2?var1[8]:1000 - var1[4];
        this.field_rn_c_for_22 = this.field_rn_c_c_27 === 2?var1[9]:var1[5];
        this.field_rn_c_d_23 = this.field_rn_c_c_27 === 2?var1[10]:-var1[6];
        this.field_rn_c_b_24 = this.field_rn_c_c_27 === 2?var1[11]:var1[7];
        this.field_rn_c_new_25 = this.field_rn_c_c_27 === 2?var2:var3;
        this.field_rn_c_f_26 = this.field_rn_c_c_27 === 2?var3:var2;
    }

    public abstract method_rn_c_a_11();

    method_rn_c_a_12(var1 : number) {
        if(this.field_rn_c_c_27 === 1) {
            switch((var1)) {
            case 0:
                this.field_rn_c_case_28.method_rn_Slime1P_b_82();
                break;
            case 1:
                this.field_rn_c_case_28.method_rn_Slime1P_c_81();
                break;
            case 2:
                this.field_rn_c_case_28.method_rn_Slime1P_char_84();
                break;
            case 3:
                this.field_rn_c_case_28.method_rn_Slime1P_try_83();
            }
        } else if(this.field_rn_c_c_27 === 2) {
            switch((var1)) {
            case 0:
                this.field_rn_c_case_28.method_rn_Slime1P_e_85();
                break;
            case 1:
                this.field_rn_c_case_28.method_rn_Slime1P_j_86();
                break;
            case 2:
                this.field_rn_c_case_28.method_rn_Slime1P_long_88();
                break;
            case 3:
                this.field_rn_c_case_28.method_rn_Slime1P_else_87();
            }
        }
    }

    constructor() {
        this.field_rn_c_void_13 = 0;
        this.field_rn_c_else_14 = 0;
        this.field_rn_c_do_15 = 0;
        this.field_rn_c_if_16 = 0;
        this.field_rn_c_g_17 = 0;
        this.field_rn_c_e_18 = 0;
        this.field_rn_c_byte_19 = 0;
        this.field_rn_c_try_20 = 0;
        this.field_rn_c_int_21 = 0;
        this.field_rn_c_for_22 = 0;
        this.field_rn_c_d_23 = 0;
        this.field_rn_c_b_24 = 0;
        this.field_rn_c_new_25 = false;
        this.field_rn_c_f_26 = false;
        this.field_rn_c_c_27 = 0;
        this.field_rn_c_case_28 = null;
    }
}
Class_rn_c_1["__class"] = "Class_rn_c_1";


class Class_rn_g_7 {
    field_rn_g_do_73 : boolean = true;

    field_rn_g_a_74 : boolean = true;

    static field_rn_g_if_75 : string[]; public static field_rn_g_if_75_$LI$() : string[] { if(Class_rn_g_7.field_rn_g_if_75 == null) Class_rn_g_7.field_rn_g_if_75 = ['r', 'o', '>', '<', 'o', 'r', 'z']; return Class_rn_g_7.field_rn_g_if_75; };

    public static method_rn_g_a_65() : boolean {
        return true;
    }

    public static method_rn_g_a_66(var0 : Slime1P, var1 : number) : boolean {
        let var3 : number = 1000000;
        try {
            let var5 : InputStream = (new URL(var0.getCodeBase() + "highscores.php?min")).openStream();
            let var6 : BufferedReader = new BufferedReader(new InputStreamReader(var5));
            var3 = Long.parseLong(var6.readLine());
            var6.close();
            var5.close();
        } catch(var7) {
            System.out.println$java_lang_Object("Couldn\'t connect to server!\n" + var7);
            return false;
        };
        return var1 > var3;
    }

    public static method_rn_g_a_67(var0 : Slime1P, var1 : number, var3 : number, var5 : string) {
        try {
            let var6 : InputStream = (new URL(var0.getCodeBase() + "submitscore.php?scr=" + var1 + "&lev=" + var3 + "&nam=" + var5 + "&danno=" + Class_rn_g_7.field_rn_g_if_75_$LI$().join('') + "&chk=" + Class_rn_g_7.method_rn_g_a_70(Class_rn_g_7.method_rn_g_a_68(Class_rn_g_7.method_rn_g_if_69(var5)), var3, var1))).openStream();
            var6.close();
        } catch(var7) {
            System.out.println$java_lang_Object("Couldn\'t send high score!\n" + var7);
        };
    }

    /*public*/ static method_rn_g_a_68(var0 : string) : string {
        let var1 : string = var0.trim();
        if(var1.length > 20) {
            var1 = var1.substring(0, 20);
        }
        return var1;
    }

    /*public*/ static method_rn_g_if_69(var0 : string) : string {
        let var1 : number;
        let var2 : string;
        for(var2 = <string>new String(var0); (var1 = var2.indexOf(" ")) >= 0; var2 = var2.substring(0, var1) + var2.substring(var1 + 1)) {
        };
        return var2;
    }

    /*public*/ static method_rn_g_a_70(var0 : string, var1 : number, var3 : number) : number {
        let var5 : number = var3;
        for(let var7 : number = 0; Math.floor(<number>var7) < Class_rn_g_7.method_rn_g_a_71(var1) + 1; ++var7) {
            var5 = Class_rn_g_7.method_rn_g_if_72(var0, var1, var5);
        };
        return var5;
    }

    /*public*/ static method_rn_g_a_71(var0 : number) : number {
        return var0 * var0;
    }

    /*public*/ static method_rn_g_if_72(var0 : string, var1 : number, var3 : number) : number {
        let var5 : string[] = /* toCharArray */(var0).split('');
        let var6 : number = 0;
        for(let var8 : number = 0; var8 < var5.length; ++var8) {
            var6 += ((var5[var8]).charCodeAt(0) + var1) * var3 % (var1 + 6 + Math.floor(<number>var8));
        };
        return var6;
    }
}
Class_rn_g_7["__class"] = "Class_rn_g_7";


class Class_rn_h_8 {
    public constructor(var1 : number[][], var2 : number, var3 : number, var4 : number, var5 : number, var6 : Applet) {
        let var7 : number[][] = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([var1.length, var1[0].length]);
        for(let var8 : number = 0; var8 < var1.length; ++var8) {
            for(let var9 : number = 0; var9 < var1[0].length; ++var9) {
                var7[var8][var9] = var1[var8][var9];
            };
        };
        try {
            let var17 : URL = var6.getCodeBase();
            let var10 : string = "" + var2 + ":" + var3 + ":" + var4 + ":" + var5;
            let var11 : URL = new URL(var17 + "newreplay.php?data=" + var10);
            let var12 : BufferedReader = new BufferedReader(new InputStreamReader(var11.openStream()));
            let var13 : string = var12.readLine().trim();
            var11 = new URL(var17 + "savefield.php?id=" + var13 + "&field=initial&data=" + var10);
            var11.openStream();
            for(let var14 : number = 0; var14 < 6; ++var14) {
                var10 = "id=" + var13 + "&field=";
                switch((var14)) {
                case 0:
                    var10 = var10 + "p1x";
                    break;
                case 1:
                    var10 = var10 + "p1y";
                    break;
                case 2:
                    var10 = var10 + "p2x";
                    break;
                case 3:
                    var10 = var10 + "p2y";
                    break;
                case 4:
                    var10 = var10 + "ballX";
                    break;
                case 5:
                    var10 = var10 + "ballY";
                }
                var10 = var10 + "&data=" + var7[0][var14];
                for(let var15 : number = 1; var15 < var1.length; ++var15) {
                    var10 = var10 + ":" + (var7[var15][var14] - var7[var15 - 1][var14]);
                };
                var11 = new URL(var17 + "savefield.php?" + var10);
                var11.openStream();
            };
        } catch(var16) {
        };
    }
}
Class_rn_h_8["__class"] = "Class_rn_h_8";


export default class Slime1P extends Applet implements Runnable {
    public recommended_width = 750;
    public recommended_height = 375;
    /*public*/ nWidth : number;

    /*public*/ nHeight : number;

    /*public*/ p1X : number;

    /*public*/ p1Y : number;

    /*public*/ p2X : number;

    /*public*/ p2Y : number;

    /*public*/ p1Diam : number;

    /*public*/ p2Diam : number;

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

    /*public*/ mousePressed : boolean;

    /*public*/ fInPlay : boolean;

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

    /*public*/ fServerMoved : boolean;

    /*public*/ hitNetSinceTouched : boolean;

    /*public*/ gameThread : Thread;

    /*public*/ fEndGame : boolean;

    /*public*/ startTime : number;

    /*public*/ gameTime : number;

    /*public*/ crossedNetTime : number;

    /*public*/ pausedTime : number;

    /*public*/ paused : boolean;

    /*public*/ scoringRun : number;

    /*public*/ oldScoringRun : number;

    /*public*/ slimeColText : string[];

    /*public*/ slimeColours : Color[];

    /*public*/ loserText1 : string[];

    /*public*/ loserText2 : string[];

    /*public*/ SKY_COL : Color;

    /*public*/ COURT_COL : Color;

    /*public*/ BALL_COL : Color;

    /*public*/ p1Run : number;

    /*public*/ p2Run : number;

    /*public*/ p1Jump : number;

    /*public*/ p2Jump : number;

    /*public*/ pointsToWin : number = 6;

    /*public*/ aiMode : number = 0;

    /*public*/ field_rn_Slime1P_ai_109 : Class_rn_c_1;

    /*public*/ gameScore : number;

    /*public*/ gameOver : boolean;

    /*public*/ boundsP1select : number[] = [];

    /*public*/ boundsP2select : number[] = [];

    /*public*/ oneplayer : boolean = false;

    /*public*/ ballRad : number = 25;

    /*public*/ buffer : BufferedImage;

    /*public*/ redrawRegions : Vector;

    /*public*/ buffered : boolean = false;

    /*public*/ replayData : number[][];

    /*public*/ replayIndex : number;

    /*public*/ replayStart : number;

    /*public*/ replaying : boolean;

    public init() {
        let var1 : string = "oneslime.net";
        if(!/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var1,"oneslime.net"))) {
            try {
                this.getAppletContext().showDocument$URL$java_lang_String(new URL("http://oneslime.net/"), "_self");
            } catch(var5) {
            };
            throw Object.defineProperty(new Error("Couldn\'t initialise - server data missing."), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
        } else {
            System.out.println$java_lang_Object("One Slime: http://oneslime.net/");
            new Class_rn_e_3();
            new Class_rn_d_4();
            new Class_rn_b_5();
            new Class_rn_a_6();
            this.nWidth = this.size().width;
            this.nHeight = this.size().height;
            this.fInPlay = this.fEndGame = false;
            this.promptMsg = "Click the mouse to play!";
            this.buffer = new BufferedImage(this.nWidth, this.nHeight, 1);
            this.fInPlay = this.fEndGame = false;
            this.promptMsg = "Click the mouse to play!";
            this.screen = this.buffer.getGraphics();
            this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
            this.slimeColText = ["Inferior Human Controlled Slime ", "The Pathetic White Slime ", "Angry Red Slimons ", "The Slime Master ", "Psycho Slime ", "The Big Blue Boss "];
            this.slimeColours = [Color.fromString("yellow"), Color.fromString("white"), Color.fromString("red"), Color.fromString("black"), Color.fromString("blue"), Color.fromString("blue")];
            this.loserText1 = ["You are a loser!", this.slimeColText[2] + "gives you the gong!", this.slimeColText[3] + "says \"You are seriously inept.\"", this.slimeColText[4] + "laughs at the pathetic slow opposition.", this.slimeColText[5] + "devours you!"];
            this.loserText2 = ["Better luck next time.", "So who has the red face bombing out on level 2, huh?", "Congrats on reaching level 3.", "Congrats on reaching level 4!", "Yum."];
            this.p1Col = 0;
            this.p1Run = 8;
            this.p1Jump = 31;
            this.p1Diam = 100;
            this.gameScore = 0;
            this.gameOver = true;
            this.paused = false;
            this.method_rn_Slime1P_new_77();
            this.method_rn_Slime1P_for_80();
            this.redrawRegions = new Vector(0);
            this.method_rn_Slime1P_void_78();
            this.repaint();
            this.replayData = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([1000, 8]);
            try {
                System.out.println$java_lang_Object(this.getCodeBase());
                let var3 : InputStream = (new URL(this.getCodeBase() + "bler")).openStream();
                let var4 : BufferedReader = new BufferedReader(new InputStreamReader(var3));
                if(!/* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(var4.readLine(),"bler"))) {
                    var4.close();
                    var3.close();
                    throw Object.defineProperty(new Error("Couldn\'t connect to server!"), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.Exception'] });
                }
                var4.close();
                var3.close();
            } catch(var6) {
                System.out.println$java_lang_Object("Error...\n" + var6);
                new ServerCheck();
            };
        }
    }

    /*public*/ method_rn_Slime1P_new_77() {
        this.fP1PointsWon = this.fP2PointsWon = 0;
        this.p1Diam = this.p2Diam = 100;
        this.p2Run = 8;
        this.p2Jump = 31;
        this.fP2Fire = false;
        if(!this.oneplayer) {
            this.aiMode = 0;
        }
        switch((this.aiMode)) {
        case 0:
            this.field_rn_Slime1P_ai_109 = new Class_rn_d_4();
            this.fP2Fire = false;
            this.SKY_COL = Color.fromString("blue");
            this.COURT_COL = Color.fromString("gray");
            this.BALL_COL = Color.fromString("yellow");
            break;
        case 1:
            this.field_rn_Slime1P_ai_109 = new Class_rn_e_3();
            this.fP2Fire = false;
            this.SKY_COL = new Color(30, 80, 0);
            this.COURT_COL = Color.fromString("darkGray");
            this.BALL_COL = new Color(128, 128, 255);
            break;
        case 2:
            this.field_rn_Slime1P_ai_109 = new Class_rn_b_5();
            this.fP2Fire = false;
            this.SKY_COL = new Color(98, 57, 57);
            this.COURT_COL = new Color(0, 168, 0);
            this.BALL_COL = Color.fromString("white");
            break;
        case 3:
            this.field_rn_Slime1P_ai_109 = new Class_rn_b_5();
            this.fP2Fire = true;
            this.SKY_COL = Color.fromString("black");
            this.COURT_COL = Color.fromString("red");
            this.BALL_COL = Color.fromString("yellow");
            break;
        case 4:
            this.field_rn_Slime1P_ai_109 = new Class_rn_a_6();
            this.p2Diam = 150;
            this.fP2Fire = false;
            this.SKY_COL = Color.fromString("black");
            this.COURT_COL = Color.fromString("red");
            this.BALL_COL = Color.fromString("yellow");
        }
        if(this.oneplayer) {
            this.p2Col = this.aiMode + 1;
        } else {
            this.p2Col = this.p1Col;
        }
        this.field_rn_Slime1P_ai_109.method_rn_c_a_9(this, 2);
    }

    public update(var1 : Graphics) {
        if(this.buffered) {
            var1.drawImage(this.buffer, 0, 0, <ImageObserver>null);
        } else {
            this.method_rn_Slime1P_void_78();
        }
        this.redrawRegions = new Vector(0);
    }

    public paint(var1 : Graphics) {
        this.update(var1);
    }

    /*public*/ method_rn_Slime1P_void_78() {
        let var1 : Graphics;
        if(this.buffered) {
            var1 = this.buffer.getGraphics();
        } else {
            var1 = this.getGraphics();
        }
        this.nWidth = this.size().width;
        this.nHeight = this.size().height;
        var1.setColor(this.SKY_COL);
        var1.fillRect(0, 0, this.nWidth, (4 * this.nHeight / 5|0));
        var1.setColor(this.COURT_COL);
        var1.fillRect(0, (4 * this.nHeight / 5|0), this.nWidth, (this.nHeight / 5|0));
        var1.setColor(Color.fromString("white"));
        var1.fillRect((this.nWidth / 2|0) - 2, (7 * this.nHeight / 10|0), 4, (this.nHeight / 10|0) + 5);
        let var2 : FontMetrics = var1.getFontMetrics();
        let var3 : string;
        if(this.gameOver) {
            this.screen.setColor(Color.fromString("white"));
            let var4 : Font = var1.getFont();
            var1.setFont(this.screen.getFont());
            var3 = "Slime Volleyball: One Slime";
            var1.drawString(var3, (this.nWidth / 2|0) - (this.screen.getFontMetrics().stringWidth(var3) / 2|0), (this.nHeight / 3|0) - var2.getHeight());
            var1.setFont(var4);
            var1.setColor(Color.fromString("white"));
            var3 = "Written by Quin Pendragon and Daniel Wedge";
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + var2.getHeight() * 2);
            var3 = "http://oneslime.net/";
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + (var2.getHeight() * 7 / 2|0));
            var1.setColor(Color.fromString("white"));
            var3 = "Click here to start a one player game!";
            this.boundsP1select[0] = (this.nWidth / 4|0) - (var2.stringWidth(var3) / 2|0) - 10;
            this.boundsP1select[1] = (this.nHeight / 3|0) + var2.getHeight() * 5;
            this.boundsP1select[2] = this.boundsP1select[0] + var2.stringWidth(var3) + 20;
            this.boundsP1select[3] = this.boundsP1select[1] + var2.getHeight() * 3;
            var1.fillRect((this.nWidth / 4|0) - (var2.stringWidth(var3) / 2|0) - 10, (this.nHeight / 3|0) + var2.getHeight() * 5, var2.stringWidth(var3) + 20, var2.getHeight() * 3);
            var1.setColor(this.SKY_COL);
            if(this.aiMode !== 0) {
                var1.drawString(var3, (this.nWidth / 4|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + (var2.getHeight() * 13 / 2|0));
                var3 = "or press C to continue...";
                var1.drawString(var3, (this.nWidth / 4|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + (var2.getHeight() * 15 / 2|0));
            } else {
                var1.drawString(var3, (this.nWidth / 4|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + var2.getHeight() * 7);
            }
            var1.setColor(Color.fromString("white"));
            var3 = "Click here to start a two player game!";
            var1.fillRect((this.nWidth * 3 / 4|0) - (var2.stringWidth(var3) / 2|0) - 10, (this.nHeight / 3|0) + var2.getHeight() * 5, var2.stringWidth(var3) + 20, var2.getHeight() * 3);
            var1.setColor(this.SKY_COL);
            var1.drawString(var3, (this.nWidth * 3 / 4|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0) + var2.getHeight() * 7);
            this.boundsP2select[0] = (this.nWidth * 3 / 4|0) - (var2.stringWidth(var3) / 2|0) - 10;
            this.boundsP2select[1] = (this.nHeight / 3|0) + var2.getHeight() * 5;
            this.boundsP2select[2] = this.boundsP2select[0] + var2.stringWidth(var3) + 20;
            this.boundsP2select[3] = this.boundsP2select[1] + var2.getHeight() * 3;
            if(!this.replaying) {
                this.method_rn_Slime1P_goto_93();
                this.method_rn_Slime1P_byte_95();
            }
        } else if(!this.fInPlay) {
            var1.setColor(Color.fromString("white"));
            var3 = "Your score: " + this.gameScore;
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 2|0) - var2.getHeight());
            if(this.fP1PointsWon === 6) {
                var3 = "Level bonus: " + (1000 * this.fP1PointsWon / (this.fP1PointsWon + this.fP2PointsWon)|0) * this.method_rn_Slime1P_case_108() + " points";
                var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 2|0) + var2.getHeight());
                var3 = "Time bonus: " + Math.floor((this.gameTime < 300000?300000 - this.gameTime:0) / 1000) * Math.floor(<number>this.method_rn_Slime1P_case_108()) + " points";
                var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 2);
                if(this.fP2PointsWon === 0) {
                    var3 = "Flawless Victory: " + 1000 * this.method_rn_Slime1P_case_108() + " points";
                    var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 2|0) + var2.getHeight() * 3);
                }
            }
            var1.setFont(this.screen.getFont());
            var2 = this.screen.getFontMetrics();
            var3 = "Level " + (this.aiMode + 1) + " clear!";
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight / 3|0));
            var3 = "Click the mouse to continue...";
            var1.drawString(var3, (this.nWidth / 2|0) - (var2.stringWidth(var3) / 2|0), (this.nHeight * 4 / 5|0) + var2.getHeight() + 10);
            this.method_rn_Slime1P_goto_93();
        } else {
            this.method_rn_Slime1P_goto_93();
        }
    }

    /*public*/ method_rn_Slime1P_do_79() {
        if(!this.buffered) {
            this.redrawRegions.removeAllElements();
        } else {
            for(let var1 : number = 0; var1 < this.redrawRegions.size(); ++var1) {
                let var2 : number[] = <number[]>(<number[]>this.redrawRegions.get(var1));
                let var3 : number = var2[0];
                let var4 : number = var2[1];
                let var5 : number = var2[2];
                let var6 : number = var2[3];
                if(var3 < 0) {
                    var3 = 0;
                }
                if(var5 > this.nWidth) {
                    var5 = this.nWidth - 1;
                }
                if(var4 < 0) {
                    var4 = 0;
                }
                if(var6 > this.nHeight) {
                    var6 = this.nHeight - 1;
                }
                let var7 : number = var5 - var3;
                let var8 : number = var6 - var4;
                if(var7 > 0 && var8 > 0) {
                    let var9 : BufferedImage = this.buffer.getSubimage(var3, var4, var7, var8);
                    this.getGraphics().drawImage(var9, var3, var4, <ImageObserver>null);
                }
            };
            this.redrawRegions.removeAllElements();
        }
    }

    /*public*/ method_rn_Slime1P_for_80() {
        this.p1X = this.p1OldX = 200;
        this.p1Y = this.p1OldY = 0;
        this.p2X = this.p2OldX = 800;
        this.p2Y = this.p2OldY = 0;
        this.p1XV = 0;
        this.p1YV = 0;
        this.p2XV = 0;
        this.p2YV = 0;
        this.ballX = this.ballOldX = 200;
        this.ballY = this.ballOldY = 400;
        this.ballVX = 0;
        this.ballVY = 0;
        this.hitNetSinceTouched = false;
        this.fServerMoved = this.fP1Touched = this.fP2Touched = false;
        this.fP1Touches = this.fP2Touches = 0;
        this.repaint();
        this.promptMsg = "";
        this.replayStart = this.replayIndex = 0;
        this.replaying = false;
    }

    public async handleEvent(var1 : Event) : Promise<boolean> {
        switch((var1.id)) {
        case 401:
        case 403:
            switch((var1.key)) {
            case 32:
                this.mousePressed = true;
                return false;
            case 65:
            case 97:
                this.method_rn_Slime1P_c_81();
                return false;
            case 66:
            case 98:
                this.buffered = !this.buffered;
                this.method_rn_Slime1P_void_78();
                return false;
            case 67:
            case 99:
                if(this.gameOver) {
                    this.fEndGame = false;
                    this.fInPlay = true;
                    this.promptMsg = "";
                    this.gameOver = false;
                    this.gameScore = 0;
                    this.method_rn_Slime1P_for_80();
                    this.method_rn_Slime1P_new_77();
                    this.repaint();
                    this.gameThread = new Thread(this);
                    this.gameThread.start();
                }
                return false;
            case 68:
            case 100:
                this.method_rn_Slime1P_b_82();
                return false;
            case 73:
            case 105:
                if(!this.oneplayer) {
                    this.method_rn_Slime1P_long_88();
                }
                return false;
            case 74:
            case 106:
                if(!this.oneplayer) {
                    this.method_rn_Slime1P_e_85();
                }
                return false;
            case 75:
            case 107:
                if(this.oneplayer) {
                    this.fP1PointsWon = this.fP2PointsWon = 0;
                    this.fP1Fire = false;
                    this.gameScore = 0;
                    this.method_rn_Slime1P_new_77();
                    this.method_rn_Slime1P_for_80();
                    this.method_rn_Slime1P_void_78();
                    this.repaint();
                    this.startTime = System.currentTimeMillis();
                    this.paused = false;
                }
                return false;
            case 76:
            case 108:
                if(!this.oneplayer) {
                    this.method_rn_Slime1P_j_86();
                }
                return false;
            case 79:
            case 111:
                if(!this.paused) {
                    this.pausedTime = System.currentTimeMillis();
                    try {
                        this.getAppletContext().showDocument$URL$java_lang_String(new URL("http://oneslime.net/boss/launch.html"), "_blank");
                    } catch(var3) {
                        System.out.println$java_lang_Object(var3);
                    };
                    this.paused = true;
                } else {
                    this.startTime += System.currentTimeMillis() - this.pausedTime;
                    this.paused = false;
                }
                return false;
            case 80:
            case 112:
                if(!this.paused) {
                    this.pausedTime = System.currentTimeMillis();
                    this.paused = true;
                } else {
                    this.startTime += System.currentTimeMillis() - this.pausedTime;
                    this.paused = false;
                }
                return false;
            case 87:
            case 119:
                this.method_rn_Slime1P_char_84();
                return false;
            case 1004:
                if(this.oneplayer) {
                    this.method_rn_Slime1P_char_84();
                } else {
                    this.method_rn_Slime1P_long_88();
                }
                return false;
            case 1006:
                if(this.oneplayer) {
                    this.method_rn_Slime1P_c_81();
                } else {
                    this.method_rn_Slime1P_e_85();
                }
                return false;
            case 1007:
                if(this.oneplayer) {
                    this.method_rn_Slime1P_b_82();
                } else {
                    this.method_rn_Slime1P_j_86();
                }
                return false;
            default:
                return false;
            }
        case 402:
        case 404:
            switch((var1.key)) {
            case 65:
            case 97:
                if(this.p1XV < 0) {
                    this.method_rn_Slime1P_try_83();
                }
                return false;
            case 68:
            case 100:
                if(this.p1XV > 0) {
                    this.method_rn_Slime1P_try_83();
                }
                return false;
            case 74:
            case 106:
                if(this.p2XV < 0) {
                    this.method_rn_Slime1P_else_87();
                }
                return false;
            case 76:
            case 108:
                if(this.p2XV > 0) {
                    this.method_rn_Slime1P_else_87();
                }
                return false;
            case 1006:
                if(this.oneplayer && this.p1XV < 0) {
                    this.method_rn_Slime1P_try_83();
                } else if(!this.oneplayer && this.p2XV < 0) {
                    this.method_rn_Slime1P_else_87();
                    return false;
                }
                return false;
            case 1007:
                if(this.oneplayer && this.p1XV > 0) {
                    this.method_rn_Slime1P_try_83();
                } else if(!this.oneplayer && this.p2XV > 0) {
                    this.method_rn_Slime1P_else_87();
                    return false;
                }
                return false;
            default:
                return false;
            }
        case 501:
            if(this.gameOver) {
                if(var1.x > this.boundsP1select[0] && var1.y > this.boundsP1select[1] && var1.x < this.boundsP1select[2] && var1.y < this.boundsP1select[3]) {
                    this.oneplayer = true;
                } else {
                    if(var1.x <= this.boundsP2select[0] || var1.y <= this.boundsP2select[1] || var1.x >= this.boundsP2select[2] || var1.y >= this.boundsP2select[3]) {
                        break;
                    }
                    this.oneplayer = false;
                }
            }
            this.mousePressed = true;
            if(!this.fInPlay) {
                this.fEndGame = false;
                this.fInPlay = true;
                this.promptMsg = "";
                if(this.gameScore !== 0) {
                    if(this.aiMode < 5) {
                        ++this.aiMode;
                    } else {
                        this.aiMode = 0;
                    }
                }
                if(this.gameOver) {
                    this.aiMode = 0;
                    this.gameOver = false;
                    this.gameScore = 0;
                }
                this.method_rn_Slime1P_new_77();
                this.repaint();
                this.ballX = 200;
                this.gameThread = new Thread(this);
                this.gameThread.start();
            }
            break;
        case 503:
            this.showStatus("Slime Volleyball: One Slime: http://oneslime.net/");
        }
        return false;
    }

    public method_rn_Slime1P_c_81() {
        this.p1XV = this.fP1Fire?-2 * this.p1Run:-this.p1Run;
        if(this.p1X === 200 && this.ballX === 200 && !this.fP2Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public method_rn_Slime1P_b_82() {
        this.p1XV = this.fP1Fire?2 * this.p1Run:this.p1Run;
        if(this.p1X === 200 && this.ballX === 200 && !this.fP2Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public method_rn_Slime1P_try_83() {
        this.p1XV = 0;
    }

    public method_rn_Slime1P_char_84() {
        if(this.p1Y === 0) {
            this.p1YV = this.fP1Fire?(45 * this.p1Jump / 31|0):this.p1Jump;
        }
    }

    public method_rn_Slime1P_e_85() {
        this.p2XV = this.fP2Fire?-2 * this.p2Run:-this.p2Run;
        if(this.p2X === 800 && this.ballX === 800 && !this.fP1Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public method_rn_Slime1P_j_86() {
        this.p2XV = this.fP2Fire?2 * this.p2Run:this.p2Run;
        if(this.p2X === 800 && this.ballX === 800 && !this.fP1Touched && !this.fServerMoved) {
            this.fServerMoved = true;
        }
    }

    public method_rn_Slime1P_else_87() {
        this.p2XV = 0;
    }

    public method_rn_Slime1P_long_88() {
        if(this.p2Y === 0) {
            this.p2YV = this.fP2Fire?(45 * this.p2Jump / 31|0):this.p2Jump;
        }
    }

    /*public*/ method_rn_Slime1P_d_89() {
        if(this.oneplayer) {
            let var1 : number[] = [this.ballX, this.ballY, this.ballVX, this.ballVY, this.p1X, this.p1Y, this.p1XV, this.p1YV, this.p2X, this.p2Y, this.p2XV, this.p2YV];
            this.field_rn_Slime1P_ai_109.method_rn_c_a_10(var1, this.fP1Fire, this.fP2Fire);
            this.field_rn_Slime1P_ai_109.method_rn_c_a_11();
        }
    }

    /*public*/ method_rn_Slime1P_i_90() {
        this.method_rn_Slime1P_d_89();
        this.p1X += this.p1XV;
        if(this.p1X < (this.p1Diam / 2|0)) {
            this.p1X = (this.p1Diam / 2|0);
        }
        if(this.p1X > 495 - (this.p1Diam / 2|0)) {
            this.p1X = 495 - (this.p1Diam / 2|0);
        }
        if(this.p1YV !== 0) {
            this.p1Y += this.p1YV -= this.fP1Fire?4:2;
            if(this.p1Y < 0) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p2X += this.p2XV;
        if(this.p2X > 1000 - (this.p2Diam / 2|0)) {
            this.p2X = 1000 - (this.p2Diam / 2|0);
        }
        if(this.p2X < 505 + (this.p2Diam / 2|0)) {
            this.p2X = 505 + (this.p2Diam / 2|0);
        }
        if(this.p2YV !== 0) {
            this.p2Y += this.p2YV -= this.fP2Fire?4:2;
            if(this.p2Y < 0) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
    }

    /*public*/ method_rn_Slime1P_if_91() {
        let var1 : number[] = [];
        let var2 : Graphics;
        if(this.buffered) {
            var2 = this.buffer.getGraphics();
        } else {
            var2 = this.getGraphics();
        }
        let var3 : number = 5;
        let var4 : number = ((this.ballRad + var3) * this.nHeight / 1000|0);
        let var5 : number = (this.ballOldX * this.nWidth / 1000|0);
        let var6 : number = (4 * this.nHeight / 5|0) - (this.ballOldY * this.nHeight / 1000|0);
        var2.setColor(this.SKY_COL);
        var2.fillRect(var5 - var4, var6 - var4, 2 * var4, 2 * var4);
        let var7 : number = var5;
        let var8 : number = var6;
        this.superFlash = !this.superFlash;
        let var9 : number = (this.nWidth * this.p1Diam / 1000|0);
        let var10 : number = (this.nHeight * this.p1Diam / 1000|0);
        let var11 : number = (this.p1OldX * this.nWidth / 1000|0) - (var9 / 2|0);
        let var12 : number = (4 * this.nHeight / 5|0) - var10 - (this.p1OldY * this.nHeight / 1000|0);
        var2.setColor(this.SKY_COL);
        var2.fillRect(var11, var12, var9, var10);
        var1[0] = var11;
        var1[1] = var12;
        var1[2] = var11 + var9;
        var1[3] = var12 + var10;
        var9 = (this.nWidth * this.p1Diam / 1000|0);
        var10 = (this.nHeight * this.p1Diam / 1000|0);
        var11 = (this.p1X * this.nWidth / 1000|0) - (var9 / 2|0);
        var12 = (4 * this.nHeight / 5|0) - var10 - (this.p1Y * this.nHeight / 1000|0);
        var2.setColor(this.fP1Fire && this.superFlash?Color.fromString("white"):this.slimeColours[this.p1Col]);
        var2.fillArc(var11, var12, var9, 2 * var10, 0, 180);
        if(var11 < var1[0]) {
            var1[0] = var11;
        }
        if(var12 < var1[1]) {
            var1[1] = var12;
        }
        if(var11 + var9 > var1[2]) {
            var1[2] = var11 + var9;
        }
        if(var12 + var10 > var1[3]) {
            var1[3] = var12 + var10;
        }
        this.redrawRegions.add(var1);
        let var15 : number = this.p1X + (38 * this.p1Diam / 100|0);
        let var16 : number = this.p1Y - (60 * this.p1Diam / 100|0);
        var11 = (var15 * this.nWidth / 1000|0);
        var12 = (4 * this.nHeight / 5|0) - var10 - (var16 * this.nHeight / 1000|0);
        let var17 : number = var11 - var5;
        let var18 : number = var12 - var6;
        let var19 : number = (<number>Math.sqrt(<number>(var17 * var17 + var18 * var18))|0);
        let var20 : number = ((this.nWidth / 50|0) * this.p1Diam / 100|0);
        let var21 : number = ((this.nHeight / 25|0) * this.p1Diam / 100|0);
        var2.setColor(Color.fromString("white"));
        var2.fillOval(var11 - var20, var12 - var21, var20, var21);
        var2.setColor(Color.fromString("black"));
        var2.fillOval(var11 - (4 * var17 / var19|0) - (3 * var20 / 4|0), var12 - (4 * var18 / var19|0) - (3 * var21 / 4|0), (var20 / 2|0), (var21 / 2|0));
        var9 = (this.nWidth * this.p2Diam / 1000|0);
        var10 = (this.nHeight * this.p2Diam / 1000|0);
        var11 = (this.p2OldX * this.nWidth / 1000|0) - (var9 / 2|0);
        var12 = (4 * this.nHeight / 5|0) - var10 - (this.p2OldY * this.nHeight / 1000|0);
        var2.setColor(this.SKY_COL);
        var2.fillRect(var11, var12, var9, var10);
        var1 = [var11, var12, var11 + var9, var12 + var10];
        var9 = (this.nWidth * this.p2Diam / 1000|0);
        var10 = (this.nHeight * this.p2Diam / 1000|0);
        var11 = (this.p2X * this.nWidth / 1000|0) - (var9 / 2|0);
        var12 = (4 * this.nHeight / 5|0) - (this.p2Diam * this.nHeight / 1000|0) - (this.p2Y * this.nHeight / 1000|0);
        var2.setColor(this.fP2Fire && this.superFlash?Color.fromString("white"):this.slimeColours[this.p2Col]);
        if(var11 < var1[0]) {
            var1[0] = var11;
        }
        if(var12 < var1[1]) {
            var1[1] = var12;
        }
        if(var11 + var9 > var1[2]) {
            var1[2] = var11 + var9;
        }
        if(var12 + var10 > var1[3]) {
            var1[3] = var12 + var10;
        }
        this.redrawRegions.add(var1);
        var2.fillArc(var11, var12, var9, 2 * var10, 0, 180);
        var15 = this.p2X - (18 * this.p2Diam / 100|0);
        var16 = this.p2Y - (60 * this.p2Diam / 100|0);
        var11 = (var15 * this.nWidth / 1000|0);
        var12 = (4 * this.nHeight / 5|0) - var10 - (var16 * this.nHeight / 1000|0);
        var17 = var11 - var5;
        var18 = var12 - var6;
        var19 = (<number>Math.sqrt(<number>(var17 * var17 + var18 * var18))|0);
        var20 = ((this.nWidth / 50|0) * this.p2Diam / 100|0);
        var21 = ((this.nHeight / 25|0) * this.p2Diam / 100|0);
        var2.setColor(Color.fromString("white"));
        var2.fillOval(var11 - var20, var12 - var21, var20, var21);
        var2.setColor(Color.fromString("black"));
        var2.fillOval(var11 - (4 * var17 / var19|0) - (3 * var20 / 4|0), var12 - (4 * var18 / var19|0) - (3 * var21 / 4|0), (var20 / 2|0), (var21 / 2|0));
        if(!this.fP1Fire && !this.fP2Fire) {
            this.superFlash = false;
        }
        var5 = (this.ballX * this.nWidth / 1000|0);
        var6 = (4 * this.nHeight / 5|0) - (this.ballY * this.nHeight / 1000|0);
        var2.setColor(this.BALL_COL);
        var2.fillOval(var5 - var4, var6 - var4, 2 * var4, 2 * var4);
        var1 = [var7 - var4, var8 - var4, var7 + var4, var8 + var4];
        if(var5 - var4 < var1[0]) {
            var1[0] = var5 - var4;
        }
        if(var6 - var4 < var1[1]) {
            var1[1] = var6 - var4;
        }
        if(var5 + var4 > var1[2]) {
            var1[2] = var5 + var4;
        }
        if(var6 + var4 > var1[3]) {
            var1[3] = var6 + var4;
        }
        this.redrawRegions.add(var1);
    }

    /*public*/ method_rn_Slime1P_h_92() {
        let var1 : number = 5;
        let var2 : number = 15;
        let var3 : number = 22;
        this.ballY += --this.ballVY;
        this.ballX += this.ballVX;
        if(!this.fEndGame) {
            let var4 : number = 2 * (this.ballX - this.p1X);
            let var5 : number = this.ballY - this.p1Y;
            let var6 : number = (<number>Math.sqrt(<number>(var4 * var4 + var5 * var5))|0);
            let var7 : number = this.ballVX - this.p1XV;
            let var8 : number = this.ballVY - this.p1YV;
            let var9 : number;
            if(var5 > 0 && var6 < this.p1Diam + this.ballRad && var6 > var1) {
                var9 = ((var4 * var7 + var5 * var8) / var6|0);
                this.ballX = this.p1X + (((this.p1Diam + this.ballRad) / 2|0) * var4 / var6|0);
                this.ballY = this.p1Y + ((this.p1Diam + this.ballRad) * var5 / var6|0);
                if(var9 <= 0) {
                    this.ballVX += this.p1XV - (2 * var4 * var9 / var6|0);
                    if(this.ballVX < -var2) {
                        this.ballVX = -var2;
                    }
                    if(this.ballVX > var2) {
                        this.ballVX = var2;
                    }
                    this.ballVY += this.p1YV - (2 * var5 * var9 / var6|0);
                    if(this.ballVY < -var3) {
                        this.ballVY = -var3;
                    }
                    if(this.ballVY > var3) {
                        this.ballVY = var3;
                    }
                }
                if(this.fServerMoved) {
                    this.fP1Touched = true;
                    ++this.fP1Touches;
                    this.fP2Touches = 0;
                    this.fP1HitStill = this.p1YV === 0 && this.p1XV === 0;
                    this.hitNetSinceTouched = false;
                }
            }
            var4 = 2 * (this.ballX - this.p2X);
            var5 = this.ballY - this.p2Y;
            var6 = (<number>Math.sqrt(<number>(var4 * var4 + var5 * var5))|0);
            var7 = this.ballVX - this.p2XV;
            var8 = this.ballVY - this.p2YV;
            if(var5 > 0 && var6 < this.p2Diam + this.ballRad && var6 > var1) {
                var9 = ((var4 * var7 + var5 * var8) / var6|0);
                this.ballX = this.p2X + (((this.p2Diam + this.ballRad) / 2|0) * var4 / var6|0);
                this.ballY = this.p2Y + ((this.p2Diam + this.ballRad) * var5 / var6|0);
                if(var9 <= 0) {
                    this.ballVX += this.p2XV - (2 * var4 * var9 / var6|0);
                    if(this.ballVX < -var2) {
                        this.ballVX = -var2;
                    }
                    if(this.ballVX > var2) {
                        this.ballVX = var2;
                    }
                    this.ballVY += this.p2YV - (2 * var5 * var9 / var6|0);
                    if(this.ballVY < -var3) {
                        this.ballVY = -var3;
                    }
                    if(this.ballVY > var3) {
                        this.ballVY = var3;
                    }
                }
                if(this.fServerMoved) {
                    this.fP2Touched = true;
                    ++this.fP2Touches;
                    this.fP1Touches = 0;
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
    }

    /*public*/ method_rn_Slime1P_goto_93() {
        if(!this.replaying) {
            let var1 : Graphics = this.getGraphics();
            let var2 : FontMetrics = var1.getFontMetrics();
            let var3 : number = (this.nHeight / 15|0);
            let var4 : number = 20;
            let var5 : number;
            for(var5 = 0; var5 < 6; ++var5) {
                if(this.fP1PointsWon >= var5 + 1) {
                    var1.setColor(this.slimeColours[this.p1Col]);
                    var1.fillOval(var4, 30 - (var3 / 2|0), var3, var3);
                }
                var1.setColor(Color.fromString("white"));
                var1.drawOval(var4, 30 - (var3 / 2|0), var3, var3);
                var4 += var3 + 10;
            };
            var4 = this.nWidth - 20 - 6 * (var3 + 10);
            for(var5 = 0; var5 < 6; ++var5) {
                if(this.fP2PointsWon >= 6 - var5) {
                    var1.setColor(this.slimeColours[this.p2Col]);
                    var1.fillOval(var4, 30 - (var3 / 2|0), var3, var3);
                }
                var1.setColor(Color.fromString("white"));
                var1.drawOval(var4, 30 - (var3 / 2|0), var3, var3);
                var4 += var3 + 10;
            };
        }
    }

    /*public*/ method_rn_Slime1P_a_94(var1 : number) : string {
        let var3 : string = "";
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

    /*public*/ method_rn_Slime1P_byte_95() {
        let var1 : Graphics;
        if(this.buffered) {
            var1 = this.buffer.getGraphics();
        } else {
            var1 = this.getGraphics();
        }
        let var2 : number = (this.nHeight / 20|0);
        var1.setColor(this.SKY_COL);
        var1.setFont(this.screen.getFont());
        let var3 : FontMetrics = var1.getFontMetrics();
        let var4 : string = (this.oneplayer?"Score: " + this.gameScore:"") + (!this.fInPlay?"":" Time: " + this.method_rn_Slime1P_a_94((this.paused?this.pausedTime:System.currentTimeMillis()) - this.startTime));
        let var5 : number = var3.stringWidth(var4);
        let var6 : number = (this.nWidth / 2|0) - (var5 / 2|0) - 10;
        var1.fillRect(var6, 0, var5 + 20, var2 + 22);
        var1.setColor(Color.fromString("white"));
        let var7 : number = var3.stringWidth(var4);
        let var8 : number = (this.nWidth / 2|0) - (var7 / 2|0);
        let var9 : number = var3.getHeight() * 2;
        var1.drawString(var4, var8, var9);
        this.redrawRegions.add([var8, 0, var8 + var7, var9 + (var9 / 2|0)]);
    }

    public method_rn_Slime1P_int_96() {
        let var1 : Graphics;
        if(this.buffered) {
            var1 = this.buffer.getGraphics();
        } else {
            var1 = this.getGraphics();
        }
        var1.setFont(this.screen.getFont());
        this.screen.setColor(this.COURT_COL);
        this.screen.fillRect(0, (4 * this.nHeight / 5|0) + 6, this.nWidth, (this.nHeight / 5|0) - 10);
        this.method_rn_Slime1P_a_97(this.promptMsg, 0);
    }

    public method_rn_Slime1P_a_97(var1 : string, var2 : number) {
        let var3 : Graphics = this.getGraphics();
        var3.setFont(new Font(var3.getFont().getName(), 1, 15));
        let var4 : FontMetrics = var3.getFontMetrics();
        var3.setColor(Color.fromString("white"));
        let var5 : number = var4.stringWidth(var1);
        let var6 : number = ((this.nWidth - var5) / 2|0);
        let var7 : number = (this.nHeight * 4 / 5|0) + var4.getHeight() * (var2 + 1) + 10;
        var3.drawString(var1, var6, var7);
        this.method_rn_Slime1P_goto_93();
        this.method_rn_Slime1P_byte_95();
        this.redrawRegions.add([var6, var7, var6 + var5 + 1, var7 + var4.getHeight()]);
    }

    /*public*/ method_rn_Slime1P_a_98(var1 : number) {
        this.method_rn_Slime1P_a_99(var1, true);
    }

    /*public*/ method_rn_Slime1P_a_99(var1 : number, var2 : boolean) {
        let var3 : number = var1 !== 0?var1 - 1:this.replayData.length - 1;
        this.p1OldX = this.replayData[var3][0];
        this.p1OldY = this.replayData[var3][1];
        this.p2OldX = this.replayData[var3][2];
        this.p2OldY = this.replayData[var3][3];
        this.ballOldX = this.replayData[var3][4];
        this.ballOldY = this.replayData[var3][5];
        this.p1X = this.replayData[var1][0];
        this.p1Y = this.replayData[var1][1];
        this.p2X = this.replayData[var1][2];
        this.p2Y = this.replayData[var1][3];
        this.ballX = this.replayData[var1][4];
        this.ballY = this.replayData[var1][5];
        this.ballVX = 0;
        this.ballVY = 1;
        if(this.ballOldX === 0 && this.ballOldY === 0) {
            this.ballOldX = this.ballOldY = -500;
        }
        if(this.ballX === this.ballOldX && this.ballY === this.ballOldY) {
            this.ballOldX = this.ballOldY = -500;
        }
        this.method_rn_Slime1P_if_91();
        if(this.buffered) {
            this.getGraphics().drawImage(this.buffer, 0, 0, <ImageObserver>null);
        }
    }

    /*public*/ method_rn_Slime1P_g_100() {
        this.replayData[this.replayIndex][0] = this.p1X;
        this.replayData[this.replayIndex][1] = this.p1Y;
        this.replayData[this.replayIndex][2] = this.p2X;
        this.replayData[this.replayIndex][3] = this.p2Y;
        this.replayData[this.replayIndex][4] = this.ballX;
        this.replayData[this.replayIndex][5] = this.ballY;
        this.replayData[this.replayIndex][6] = this.p1Col;
        this.replayData[this.replayIndex][7] = this.p2Col;
        ++this.replayIndex;
        if(this.replayIndex >= this.replayData.length) {
            this.replayIndex = 0;
        }
        if(this.replayStart === this.replayIndex) {
            ++this.replayStart;
        }
        if(this.replayStart >= this.replayData.length) {
            this.replayStart = 0;
        }
    }

    /*public*/ method_rn_Slime1P_f_101() {
        this.replaying = true;
        this.method_rn_Slime1P_void_78();
        let var1 : Graphics = this.buffered?this.buffer.getGraphics():this.getGraphics();
        let var2 : FontMetrics = var1.getFontMetrics();
        let var3 : number = var2.getHeight();
        this.promptMsg = "Press space to continue...";
        this.mousePressed = false;
        let var4 : number = this.scoringRun;
        this.scoringRun = this.oldScoringRun;
        let var5 : number = this.replayStart;
        let var6 : boolean = false;
        while((!this.mousePressed)) {
            ++var5;
            if(var5 >= this.replayData.length) {
                var5 = 0;
            }
            if(var5 === this.replayIndex) {
                var1.setColor(Color.fromString("white"));
                var1.fillRect(20, 20, 20, 20);
                this.method_rn_Slime1P_a_107(1000, false);
                var6 = !var6;
                this.paint(var1);
                var1.setColor(this.SKY_COL);
                var1.fillRect(0, 0, this.nWidth, (this.nHeight / 20|0) + 22);
                if(this.replayIndex < this.replayStart) {
                    var5 += this.replayData.length;
                }
                while((var5 > this.replayStart)) {
                    var5 -= 5;
                    this.method_rn_Slime1P_void_78();
                    var1.setColor(Color.fromString("white"));
                    var1.fillPolygon$Polygon(new Polygon([20, 35, 35, 50, 50, 35, 35, 20], [30, 20, 30, 20, 40, 30, 40, 30], 8));
                    if(var5 < this.replayStart) {
                        var5 = this.replayStart;
                    }
                    this.method_rn_Slime1P_a_99(var5 % this.replayData.length, false);
                    this.method_rn_Slime1P_a_107(20, false);
                };
                this.method_rn_Slime1P_void_78();
                var1.setColor(Color.fromString("white"));
                var1.fillRect(20, 20, 20, 20);
                this.method_rn_Slime1P_a_98(this.replayStart);
                this.method_rn_Slime1P_a_107(500, false);
                this.method_rn_Slime1P_void_78();
            }
            this.method_rn_Slime1P_a_98(var5);
            try {
                Thread.sleep$long(var6?60:20);
            } catch(var8) {
            };
            var1.setColor(Color.fromString("white"));
            var1.fillPolygon$Polygon(new Polygon([20, 35, 20], [20, 30, 40], 3));
        };
        this.scoringRun = var4;
        this.promptMsg = "";
        this.paint(var1);
        this.replaying = false;
    }

    public async run() {
        this.replayIndex = this.replayStart = 0;
        this.method_rn_Slime1P_int_96();
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
        this.fP1Frames = 0;
        this.fP2Frames = 0;
        this.fP1Super = 0;
        this.fP2Super = 0;
        this.fP1HitStill = false;
        this.fP2HitStill = false;
        this.fServerMoved = false;
        this.method_rn_Slime1P_goto_93();
        this.fP1Touched = this.fP2Touched = false;
        this.hitNetSinceTouched = false;
        let var1 : boolean = false;
        let var2 : boolean = false;
        let var3 : boolean = false;
        this.gameOver = false;
        let var4 : Graphics = this.buffer.getGraphics();
        this.startTime = System.currentTimeMillis();
        this.method_rn_Slime1P_void_78();
        this.repaint();
        while((this.gameThread != null && !this.gameOver)) {
            if(!this.paused) {
                this.p1OldX = this.p1X;
                this.p1OldY = this.p1Y;
                this.p2OldX = this.p2X;
                this.p2OldY = this.p2Y;
                this.ballOldX = this.ballX;
                this.ballOldY = this.ballY;
                this.method_rn_Slime1P_i_90();
                this.method_rn_Slime1P_h_92();
                this.method_rn_Slime1P_byte_95();
                this.method_rn_Slime1P_goto_93();
                this.method_rn_Slime1P_if_91();
                this.method_rn_Slime1P_do_79();
                this.method_rn_Slime1P_g_100();
            }
            if(this.ballY < 35) {
                let var5 : number = System.currentTimeMillis();
                if(this.ballX > 500) {
                    ++this.fP1PointsWon;
                } else {
                    ++this.fP2PointsWon;
                }
                if(this.ballX > 500 || this.fP1Touches < 3 && (!this.hitNetSinceTouched || this.fP1Touches <= 0) && this.fP2Touched && (!this.fP1HitStill || this.fP1Touches <= 0)) {
                    if(this.ballX > 500 && (this.fP2Touches >= 3 || this.hitNetSinceTouched && this.fP2Touches > 0 || !this.fP1Touched || this.fP2HitStill && this.fP2Touches > 0)) {
                        ++this.fP2Clangers;
                        var1 = true;
                    }
                } else {
                    ++this.fP1Clangers;
                    var1 = true;
                }
                if(this.fP1Touched && !this.fP2Touched && this.ballX >= 500) {
                    ++this.fP1Aces;
                    var2 = true;
                    this.gameScore += 200 * this.method_rn_Slime1P_case_108();
                } else if(this.fP2Touched && !this.fP1Touched && this.ballX < 500) {
                    ++this.fP2Aces;
                    var2 = true;
                } else if(this.ballX > 500 && this.fP1Touches > 0) {
                    ++this.fP1Winners;
                    var3 = true;
                    this.gameScore += 100 * this.method_rn_Slime1P_case_108();
                } else if(this.ballX <= 500 && this.fP2Touches > 0) {
                    ++this.fP2Winners;
                    var3 = true;
                }
                if(this.ballX > 500 && !var3 && !var2) {
                    this.gameScore += 50 * this.method_rn_Slime1P_case_108();
                }
                if(this.oneplayer) {
                    this.promptMsg = this.ballX <= 500?this.slimeColText[this.p2Col]:this.slimeColText[this.p1Col];
                } else {
                    this.promptMsg = this.slimeColText[this.p1Col] + (this.ballX <= 500?"2 ":"1 ");
                }
                if(this.fP1PointsWon !== 6 && this.fP2PointsWon !== 6) {
                    if(var2) {
                        this.promptMsg = this.promptMsg + "aces the serve!";
                    } else if(var3) {
                        this.promptMsg = this.promptMsg + "scores a winner!";
                    } else if(this.ballX > 500 && !this.fP1Touched && this.fP2Touched || this.ballX <= 500 && this.fP1Touched && !this.fP2Touched) {
                        this.promptMsg = this.promptMsg + "laughs at his opponent\'s inability to serve!";
                    } else if(this.fP1PointsWon === this.fP2PointsWon) {
                        this.promptMsg = this.promptMsg + "draws level!";
                    } else if((this.ballX <= 500 || this.fP1PointsWon !== this.fP2PointsWon + 1) && (this.ballX > 500 || this.fP1PointsWon + 1 !== this.fP2PointsWon)) {
                        this.promptMsg = this.promptMsg + "scores!";
                    } else {
                        this.promptMsg = this.promptMsg + "takes the lead!";
                    }
                } else {
                    this.promptMsg = this.promptMsg + "wins!";
                }
                let var7 : number = this.ballX;
                this.method_rn_Slime1P_int_96();
                this.method_rn_Slime1P_goto_93();
                this.method_rn_Slime1P_byte_95();
                var1 = false;
                var2 = false;
                var3 = false;
                this.mousePressed = false;
                this.method_rn_Slime1P_a_107(1500, true);
                if(this.mousePressed) {
                    this.method_rn_Slime1P_g_100();
                    this.method_rn_Slime1P_f_101();
                }
                if(this.fP1PointsWon === 6 || this.fP2PointsWon === 6) {
                    this.method_rn_Slime1P_a_102();
                }
                this.promptMsg = "";
                this.method_rn_Slime1P_for_80();
                this.ballX = var7 >= 500?200:800;
                this.method_rn_Slime1P_void_78();
                this.repaint();
                this.startTime += System.currentTimeMillis() - var5;
            }
            if(this.gameThread != null) {
                this.method_rn_Slime1P_a_107(20, true);
            }
        };
        this.fEndGame = true;
        this.fInPlay = false;
        this.repaint();
    }

    /*public*/ method_rn_Slime1P_a_102() {
        if(!this.oneplayer) {
            this.method_rn_Slime1P_a_103(this.fP1PointsWon > this.fP2PointsWon);
        } else if(this.fP1PointsWon === 6) {
            this.gameTime = System.currentTimeMillis() - this.startTime;
            if(this.fP1PointsWon === 6) {
                this.gameScore += (1000 * this.fP1PointsWon / (this.fP1PointsWon + this.fP2PointsWon)|0) * this.method_rn_Slime1P_case_108();
                this.gameScore = (<number>(Math.floor(<number>this.gameScore) + Math.floor((this.gameTime < 300000?300000 - this.gameTime:0) / 1000) * Math.floor(<number>this.method_rn_Slime1P_case_108()))|0);
            }
            if(this.fP2PointsWon === 0) {
                this.gameScore += 1000 * this.method_rn_Slime1P_case_108();
            }
            if(this.aiMode === 4) {
                this.aiMode = 5;
                this.method_rn_Slime1P_if_104(true);
            }
        } else {
            this.method_rn_Slime1P_if_104(false);
        }
        this.fInPlay = false;
        this.gameThread = null;
        this.method_rn_Slime1P_void_78();
        this.repaint();
    }

    /*public*/ method_rn_Slime1P_a_103(var1 : boolean) {
        let var2 : FontMetrics = this.screen.getFontMetrics();
        this.method_rn_Slime1P_goto_93();
        this.method_rn_Slime1P_byte_95();
        let var3 : Graphics;
        if(this.buffered) {
            var3 = this.buffer.getGraphics();
        } else {
            var3 = this.getGraphics();
        }
        let var4 : FontMetrics = var3.getFontMetrics();
        var3.setColor(this.COURT_COL);
        let var5 : string[] = ["C\'mon player " + (var1?1:2) + ", I\'ll take you on!", "Inferior human controlled slime " + (var1?2:1) + " is insipid!", "Inferior human controlled slime " + (var1?2:1) + " is rubbish!", "Super inferior human controlled slime " + (var1?1:2) + " wins!", "You\'re both yellow cowards. Play me instead!"];
        let var6 : string = var5[(<number>(<number>var5.length * Math.random())|0)];
        var3.fillRect(((this.nWidth - var4.stringWidth(var6)) / 2|0) - 30, (this.nHeight / 2|0) - var4.getAscent() * 5, var4.stringWidth(var6) + 60, var4.getAscent() * 5 + var2.getAscent() * 2);
        var3.setColor(Color.fromString("white"));
        var3.drawString(var6, ((this.nWidth - var4.stringWidth(var6)) / 2|0), (this.nHeight / 2|0) - var4.getAscent() * 3);
        var3.setFont(this.screen.getFont());
        var3.drawString("GAME OVER", ((this.nWidth - var2.stringWidth("GAME OVER")) / 2|0), (this.nHeight / 2|0) + var2.getAscent());
        this.repaint();
        this.method_rn_Slime1P_a_107(3000, false);
        this.gameOver = true;
    }

    /*public*/ method_rn_Slime1P_if_104(var1 : boolean) {
        let var2 : FontMetrics = this.screen.getFontMetrics();
        this.method_rn_Slime1P_goto_93();
        this.method_rn_Slime1P_byte_95();
        let var3 : Graphics;
        if(this.buffered) {
            var3 = this.buffer.getGraphics();
        } else {
            var3 = this.getGraphics();
        }
        let var4 : FontMetrics = var3.getFontMetrics();
        if(!var1) {
            var3.setColor(this.COURT_COL);
            var3.fillRect(((this.nWidth - this.method_rn_Slime1P_a_106(var4.stringWidth(this.loserText1[this.aiMode]), var4.stringWidth(this.loserText2[this.aiMode]))) / 2|0) - 30, (this.nHeight / 2|0) - var4.getAscent() * 5, this.method_rn_Slime1P_a_106(var4.stringWidth(this.loserText1[this.aiMode]), var4.stringWidth(this.loserText2[this.aiMode])) + 60, var4.getAscent() * 5 + var2.getAscent() * 2);
            var3.setColor(Color.fromString("white"));
            var3.drawString(this.loserText1[this.aiMode], ((this.nWidth - var4.stringWidth(this.loserText1[this.aiMode])) / 2|0), (this.nHeight / 2|0) - var4.getAscent() * 3);
            var3.drawString(this.loserText2[this.aiMode], ((this.nWidth - var4.stringWidth(this.loserText2[this.aiMode])) / 2|0), (this.nHeight / 2|0) - var4.getAscent() * 2);
            var3.setFont(this.screen.getFont());
            var3.drawString("GAME OVER", ((this.nWidth - var2.stringWidth("GAME OVER")) / 2|0), (this.nHeight / 2|0) + var2.getAscent());
        } else {
            this.method_rn_Slime1P_a_105(var3);
            var3.setColor(Color.fromString("white"));
            var3.setFont(this.screen.getFont());
            var3.drawString("YOU WIN!", ((this.nWidth - var2.stringWidth("YOU WIN!")) / 2|0), (this.nHeight / 2|0));
            var3.drawString("The Slimes bow down before the new Slime King!", ((this.nWidth - var4.stringWidth("The Slimes bow down before the new Slime King!")) / 2|0), (this.nHeight / 2|0) + var4.getAscent());
        }
        if(this.buffered) {
            this.repaint();
        }
        try {
            if(Class_rn_g_7.method_rn_g_a_66(this, Math.floor(<number>this.gameScore))) {
                new NameFrame(this, Math.floor(<number>this.gameScore), this.aiMode);
            }
        } catch(var6) {
        };
        this.method_rn_Slime1P_a_107(3000, false);
        this.gameOver = true;
        this.method_rn_Slime1P_void_78();
        this.repaint();
    }

    /*public*/ method_rn_Slime1P_a_105(var1 : Graphics) {
    }

    /*public*/ method_rn_Slime1P_a_106(var1 : number, var2 : number) : number {
        return var1 > var2?var1:var2;
    }

    /*public*/ method_rn_Slime1P_a_107(var1 : number, var3 : boolean) {
        if(this.gameThread != null) {
            for(let var4 : number = 0; Math.floor(<number>var4) < Math.floor(var1 / 20); ++var4) {
                try {
                    let var10000 : Thread = this.gameThread;
                    Thread.sleep$long(20);
                } catch(var6) {
                };
            };
        }
    }

    /*public*/ method_rn_Slime1P_case_108() : number {
        return (<number>Math.pow(2.0, <number>this.aiMode)|0);
    }

    public destroy() {
        if(this.gameThread != null) {
            this.gameThread.stop();
            this.gameThread = null;
        }
    }

    constructor() {
        super();
        this.nWidth = 0;
        this.nHeight = 0;
        this.p1X = 0;
        this.p1Y = 0;
        this.p2X = 0;
        this.p2Y = 0;
        this.p1Diam = 0;
        this.p2Diam = 0;
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
        this.mousePressed = false;
        this.fInPlay = false;
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
        this.fServerMoved = false;
        this.hitNetSinceTouched = false;
        this.gameThread = null;
        this.fEndGame = false;
        this.startTime = 0;
        this.gameTime = 0;
        this.crossedNetTime = 0;
        this.pausedTime = 0;
        this.paused = false;
        this.scoringRun = 0;
        this.oldScoringRun = 0;
        this.slimeColText = null;
        this.slimeColours = null;
        this.loserText1 = null;
        this.loserText2 = null;
        this.SKY_COL = null;
        this.COURT_COL = null;
        this.BALL_COL = null;
        this.p1Run = 0;
        this.p2Run = 0;
        this.p1Jump = 0;
        this.p2Jump = 0;
        this.field_rn_Slime1P_ai_109 = null;
        this.gameScore = 0;
        this.gameOver = false;
        this.buffer = null;
        this.redrawRegions = null;
        this.replayData = null;
        this.replayIndex = 0;
        this.replayStart = 0;
        this.replaying = false;
    }
}
Slime1P["__class"] = "Slime1P";
Slime1P["__interfaces"] = ["Runnable"];



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


class Class_rn_f_2 extends Class_rn_c_1 {
    /*public*/ field_rn_f_m_37 : number = 0.85;

    /*public*/ field_rn_f_n_38 : number = -1;

    /*public*/ method_rn_f_long_33(var1 : number) : number {
        return var1 * var1;
    }

    /*public*/ method_rn_f_goto_34(var1 : number) : number {
        let var2 : number = 0;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= var1) {
                return var2;
            }
            ++var2;
        };
    }

    /*public*/ method_rn_f_else_35(var1 : number) : number {
        let var2 : number = this.method_rn_f_goto_34(var1);
        let var3 : number = this.field_rn_c_void_13;
        let var4 : number = this.field_rn_c_do_15;
        for(let var5 : number = 0; var5 < var2; ++var5) {
            var3 += var4;
            if(var3 < 0) {
                var3 = 0;
                var4 = -var4;
            } else if(var3 > 1000) {
                var3 = 1000;
                var4 = -var4;
            }
        };
        return var3;
    }

    public method_rn_c_a_11() {
        if(this.field_rn_c_void_13 < 500 && this.field_rn_f_n_38 !== -1) {
            this.field_rn_f_n_38 = -1;
        }
        let var1 : number = this.method_rn_f_else_35(125);
        let var2 : number = this.method_rn_f_goto_34(125);
        let var3 : number;
        if(this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 < 575) {
            var3 = 0;
        } else {
            var3 = 25 + (<number>(10.0 * Math.random())|0);
        }
        if((this.field_rn_c_do_15 !== 0 || this.field_rn_c_void_13 !== 800) && this.field_rn_f_n_38 === -1) {
            if(var1 < 500) {
                if(Math.abs(this.field_rn_c_int_21 - 666) < 20) {
                    this.method_rn_c_a_12(3);
                } else if(this.field_rn_c_int_21 > 666) {
                    this.method_rn_c_a_12(0);
                } else if(this.field_rn_c_int_21 < 666) {
                    this.method_rn_c_a_12(1);
                }
            } else {
                if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                    if(this.field_rn_c_for_22 !== 0 || this.field_rn_c_f_26 && Math.random() < 0.3) {
                        return;
                    }
                    if((this.field_rn_c_int_21 >= 900 && this.field_rn_c_void_13 > 830 || this.field_rn_c_int_21 <= 580 && this.field_rn_c_void_13 < 530) && Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 100) {
                        this.method_rn_f_try_36();
                    } else if(this.method_rn_f_long_33(this.field_rn_c_void_13 - this.field_rn_c_int_21) * 2 + this.method_rn_f_long_33(this.field_rn_c_else_14 - this.field_rn_c_for_22) < this.method_rn_f_long_33(170) && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_f_try_36();
                    } else if(this.field_rn_c_do_15 * this.field_rn_c_do_15 + this.field_rn_c_if_16 * this.field_rn_c_if_16 < 20 && this.field_rn_c_void_13 - this.field_rn_c_int_21 < 30 && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_f_try_36();
                    } else if(Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 150 && this.field_rn_c_else_14 > 50 && this.field_rn_c_else_14 < 400 && Math.random() < 0.666) {
                        this.method_rn_f_try_36();
                    }
                }
                if(this.field_rn_c_for_22 === 0 && this.field_rn_f_n_38 === -1) {
                    if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(var1 + var3 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(var1 + var3 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                } else if(this.field_rn_f_n_38 === -1) {
                    if(this.field_rn_c_int_21 < 575) {
                        return;
                    }
                    if(this.field_rn_c_int_21 > 900) {
                        this.method_rn_c_a_12(1);
                        return;
                    }
                    if(Math.abs(this.field_rn_c_int_21 - this.field_rn_c_void_13) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(this.field_rn_c_void_13 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(this.field_rn_c_void_13 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                }
            }
        } else {
            if(this.field_rn_f_n_38 === -1) {
                if(this.field_rn_c_g_17 > 250) {
                    this.field_rn_f_n_38 = 0;
                } else {
                    this.field_rn_f_n_38 = 1;
                }
                if(Math.random() < 0.35) {
                    this.field_rn_f_n_38 = (<number>(2.0 * Math.random())|0);
                }
            }
            switch((this.field_rn_f_n_38)) {
            case 0:
                if(this.field_rn_c_else_14 < 250 && this.field_rn_c_if_16 < -3) {
                    this.method_rn_c_a_12(1);
                    this.method_rn_c_a_12(2);
                }
                break;
            case 1:
                if(this.field_rn_c_else_14 < 250 && this.field_rn_c_if_16 < 0) {
                    this.method_rn_c_a_12(0);
                    this.method_rn_c_a_12(2);
                }
            }
        }
    }

    /*public*/ method_rn_f_try_36() {
        if(Math.random() < 0.85) {
            this.method_rn_c_a_12(2);
        }
    }
}
Class_rn_f_2["__class"] = "Class_rn_f_2";


class Class_rn_e_3 extends Class_rn_c_1 {
    /*public*/ field_rn_e_k_43 : number = 0.4;

    /*public*/ field_rn_e_l_44 : number = -1;

    /*public*/ method_rn_e_char_39(var1 : number) : number {
        return var1 * var1;
    }

    /*public*/ method_rn_e_case_40(var1 : number) : number {
        let var2 : number = 0;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= var1) {
                return var2;
            }
            ++var2;
        };
    }

    /*public*/ method_rn_e_byte_41(var1 : number) : number {
        let var2 : number = this.method_rn_e_case_40(var1);
        let var3 : number = this.field_rn_c_void_13;
        let var4 : number = this.field_rn_c_do_15;
        for(let var5 : number = 0; var5 < var2; ++var5) {
            var3 += var4;
            if(var3 < 0) {
                var3 = 0;
                var4 = -var4;
            } else if(var3 > 1000) {
                var3 = 1000;
                var4 = -var4;
            }
        };
        return var3;
    }

    public method_rn_c_a_11() {
        if(this.field_rn_c_void_13 < 500 && this.field_rn_e_l_44 !== -1) {
            this.field_rn_e_l_44 = -1;
        }
        let var1 : number = this.method_rn_e_byte_41(125);
        let var2 : number = this.method_rn_e_case_40(125);
        let var3 : number;
        if(this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 < 575) {
            var3 = 0;
        } else {
            var3 = 23 + (<number>(15.0 * Math.random())|0);
        }
        if((this.field_rn_c_do_15 !== 0 || this.field_rn_c_void_13 !== 800) && this.field_rn_e_l_44 === -1) {
            if(var1 < 500) {
                if(Math.abs(this.field_rn_c_int_21 - 800) < 20) {
                    this.method_rn_c_a_12(3);
                } else if(this.field_rn_c_int_21 > 800) {
                    this.method_rn_c_a_12(0);
                } else if(this.field_rn_c_int_21 < 800) {
                    this.method_rn_c_a_12(1);
                }
            } else {
                if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                    if(this.field_rn_c_for_22 !== 0 || this.field_rn_c_f_26 && Math.random() < 0.3) {
                        return;
                    }
                    if((this.field_rn_c_int_21 >= 900 && this.field_rn_c_void_13 > 830 || this.field_rn_c_int_21 <= 580 && this.field_rn_c_void_13 < 530) && Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 100) {
                        this.method_rn_e_new_42();
                    } else if(this.method_rn_e_char_39(this.field_rn_c_void_13 - this.field_rn_c_int_21) * 2 + this.method_rn_e_char_39(this.field_rn_c_else_14 - this.field_rn_c_for_22) < this.method_rn_e_char_39(170) && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_e_new_42();
                    } else if(this.field_rn_c_do_15 * this.field_rn_c_do_15 + this.field_rn_c_if_16 * this.field_rn_c_if_16 < 20 && this.field_rn_c_void_13 - this.field_rn_c_int_21 < 30 && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_e_new_42();
                    } else if(Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 150 && this.field_rn_c_else_14 > 50 && this.field_rn_c_else_14 < 400 && Math.random() < 0.5) {
                        this.method_rn_e_new_42();
                    }
                }
                if(this.field_rn_c_for_22 === 0 && this.field_rn_e_l_44 === -1) {
                    if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(var1 + var3 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(var1 + var3 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                } else if(this.field_rn_e_l_44 === -1) {
                    if(this.field_rn_c_int_21 < 575) {
                        return;
                    }
                    if(this.field_rn_c_int_21 > 900) {
                        this.method_rn_c_a_12(1);
                        return;
                    }
                    if(Math.abs(this.field_rn_c_int_21 - this.field_rn_c_void_13) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(this.field_rn_c_void_13 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(this.field_rn_c_void_13 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                }
            }
        } else {
            if(this.field_rn_e_l_44 === -1) {
                if(this.field_rn_c_g_17 > 250) {
                    this.field_rn_e_l_44 = 0;
                } else if(this.field_rn_c_g_17 < 200) {
                    this.field_rn_e_l_44 = 1;
                } else if(this.field_rn_c_g_17 < 250) {
                    this.field_rn_e_l_44 = 2;
                }
                if(Math.random() < 0.35) {
                    this.field_rn_e_l_44 = (<number>(3.0 * Math.random())|0);
                }
            }
            switch((this.field_rn_e_l_44)) {
            case 0:
                if(this.field_rn_c_else_14 < 300 && this.field_rn_c_if_16 < -3) {
                    this.method_rn_c_a_12(1);
                    this.method_rn_c_a_12(2);
                }
                break;
            case 1:
                if(this.field_rn_c_else_14 < 300 && this.field_rn_c_if_16 < 0) {
                    this.method_rn_c_a_12(0);
                    this.method_rn_c_a_12(2);
                }
                break;
            case 2:
                let var4 : number = 860;
                if(this.field_rn_c_if_16 > 12 && this.field_rn_c_int_21 < var4) {
                    this.method_rn_c_a_12(1);
                }
                if(this.field_rn_c_int_21 >= var4) {
                    this.method_rn_c_a_12(3);
                }
                if(this.field_rn_c_if_16 === -3 && this.field_rn_c_int_21 !== 800) {
                    this.method_rn_c_a_12(2);
                }
                if(this.field_rn_c_if_16 < -12 && this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 >= var4 - 15) {
                    this.method_rn_c_a_12(0);
                }
            }
        }
    }

    /*public*/ method_rn_e_new_42() {
        if(Math.random() < 0.4) {
            this.method_rn_c_a_12(2);
        }
    }
}
Class_rn_e_3["__class"] = "Class_rn_e_3";


class Class_rn_b_5 extends Class_rn_c_1 {
    /*public*/ field_rn_b_h_57 : number = -1;

    public method_rn_c_a_11() {
        if(this.field_rn_b_h_57 === -1 && (this.field_rn_c_void_13 !== 800 || this.field_rn_c_do_15 !== 0)) {
            let var2 : number = this.method_rn_b_if_53(this.field_rn_c_for_22 + this.field_rn_c_b_24 + 30);
            let var1 : number;
            if(var2 < 600) {
                var1 = 0;
            } else if(var2 < 700) {
                var1 = 10;
            } else {
                var1 = 20;
            }
            if(var2 < 450) {
                if(Math.abs(this.field_rn_c_int_21 - 666) < 10) {
                    this.method_rn_c_a_12(3);
                } else if(666 < this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(0);
                } else if(666 > this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(1);
                }
            } else if(Math.abs(this.field_rn_c_int_21 - var2 - var1) < 10) {
                this.method_rn_c_a_12(3);
            } else if(var2 + var1 < this.field_rn_c_int_21) {
                this.method_rn_c_a_12(0);
            } else if(var2 + var1 > this.field_rn_c_int_21) {
                this.method_rn_c_a_12(1);
            }
            if((this.field_rn_c_int_21 <= 900 || Math.random() >= 0.4) && var2 >= 620 && (this.field_rn_c_else_14 >= 130 || this.field_rn_c_if_16 >= 0) && (!this.field_rn_c_f_26 || Math.random() >= 0.6)) {
                if((this.field_rn_c_int_21 >= 900 && this.field_rn_c_void_13 > 830 || this.field_rn_c_int_21 <= 580 && this.field_rn_c_void_13 < 530) && Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 100) {
                    this.method_rn_c_a_12(2);
                } else if(this.method_rn_b_for_51(this.field_rn_c_void_13 - this.field_rn_c_int_21) * 2 + this.method_rn_b_for_51(this.field_rn_c_else_14 - this.field_rn_c_for_22) < this.method_rn_b_for_51(185) && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(2);
                } else if(this.field_rn_c_do_15 * this.field_rn_c_do_15 + this.field_rn_c_if_16 * this.field_rn_c_if_16 < 20 && this.field_rn_c_void_13 - this.field_rn_c_int_21 < 30 && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(2);
                } else if(Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < (this.field_rn_c_f_26?135:150) && this.field_rn_c_else_14 > 50 && this.field_rn_c_else_14 < 250) {
                    this.method_rn_c_a_12(2);
                }
            }
        } else {
            this.method_rn_b_do_55();
        }
    }

    /*public*/ method_rn_b_for_51(var1 : number) : number {
        return var1 * var1;
    }

    /*public*/ method_rn_b_do_52(var1 : number) : number {
        let var2 : number = 0;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= 0) {
                return var2;
            }
            ++var2;
        };
    }

    /*public*/ method_rn_b_if_53(var1 : number) : number {
        let var2 : number = this.field_rn_c_void_13;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= var1) {
                return var2;
            }
            var2 += this.field_rn_c_do_15;
            if(var2 <= 0) {
                var2 = 0;
                this.field_rn_c_do_15 = -this.field_rn_c_do_15;
            } else if(var2 >= 1000) {
                var2 = 1000;
                this.field_rn_c_do_15 = -this.field_rn_c_do_15;
            }
        };
    }

    /*public*/ method_rn_b_for_54() : number {
        let var1 : number = this.field_rn_c_int_21 - this.field_rn_c_void_13;
        let var2 : number = this.field_rn_c_for_22 - this.field_rn_c_else_14;
        return (<number>Math.sqrt(<number>(var1 * var1 + var2 * var2))|0);
    }

    /*public*/ method_rn_b_do_55() {
        if(this.field_rn_b_h_57 === -1) {
            if(Math.random() < 0.3) {
                if(this.field_rn_c_g_17 < 300 && !this.field_rn_c_f_26) {
                    this.field_rn_b_h_57 = 0;
                } else if(this.field_rn_c_g_17 > 200) {
                    this.field_rn_b_h_57 = 1;
                } else {
                    this.field_rn_b_h_57 = 2;
                }
            } else {
                this.field_rn_b_h_57 = 2;
            }
            if(this.field_rn_b_h_57 === -1 || Math.random() < 0.3) {
                this.field_rn_b_h_57 = (<number>(Math.random() * 3.0)|0);
            }
            if(this.field_rn_c_f_26 && this.field_rn_b_h_57 === 0) {
                this.field_rn_b_h_57 = 1 + (<number>(Math.random() * 2.0)|0);
            }
        }
        let var1 : number;
        switch((this.field_rn_b_h_57)) {
        case 0:
        case 1:
            let var2 : number = this.field_rn_b_h_57 === 0?860:840;
            if(this.field_rn_c_if_16 > 12 && this.field_rn_c_int_21 < var2) {
                this.method_rn_c_a_12(1);
            }
            if(this.field_rn_c_int_21 >= var2) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_if_16 === -3 && this.field_rn_c_int_21 !== 800) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_if_16 < -12 && this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 >= var2 - 15 && this.field_rn_b_h_57 === 0) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_void_13 < 700) {
                this.field_rn_b_h_57 = -1;
            }
            break;
        case 2:
            let var3 : number = 770;
            if(this.field_rn_c_if_16 > 12 && this.field_rn_c_int_21 > var3) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var3) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_if_16 === -2 && this.field_rn_c_int_21 !== 800) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_for_22 !== 0 && this.field_rn_c_void_13 > 800) {
                this.field_rn_b_h_57 = 3 + this.method_rn_b_if_56();
            }
            break;
        case 3:
            var1 = !this.field_rn_c_f_26?585:555;
            if(this.field_rn_c_int_21 > var1) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var1) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 <= (!this.field_rn_c_f_26?730:740)) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_void_13 < 540) {
                this.field_rn_b_h_57 = -1;
            }
            break;
        case 4:
            var1 = !this.field_rn_c_f_26?585:555;
            if(this.field_rn_c_int_21 > var1) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var1) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 <= (!this.field_rn_c_f_26?730:700)) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_void_13 < 600) {
                this.method_rn_c_a_12(1);
            }
            if(this.field_rn_c_void_13 < 580) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 < 540) {
                this.field_rn_b_h_57 = -1;
            }
        }
    }

    /*public*/ method_rn_b_if_56() : number {
        let var1 : boolean = false;
        if(this.field_rn_c_g_17 < 200) {
            var1 = Math.random() < 0.7;
        } else if(this.field_rn_c_g_17 > 300) {
            var1 = Math.random() < 0.3;
        } else {
            var1 = Math.random() < 0.5;
        }
        return var1?1:0;
    }
}
Class_rn_b_5["__class"] = "Class_rn_b_5";


class Class_rn_a_6 extends Class_rn_c_1 {
    /*public*/ field_rn_a_o_64 : number = -1;

    public method_rn_c_a_11() {
        if(this.field_rn_a_o_64 === -1 && (this.field_rn_c_void_13 !== 800 || this.field_rn_c_do_15 !== 0)) {
            let var2 : number = this.method_rn_a_void_60(this.field_rn_c_for_22 + this.field_rn_c_b_24 + 30);
            let var1 : number;
            if(var2 < 600) {
                var1 = 0;
            } else if(var2 < 700) {
                var1 = 10;
            } else {
                var1 = 20;
            }
            if(var2 < 450) {
                if(Math.abs(this.field_rn_c_int_21 - 666) < 10) {
                    this.method_rn_c_a_12(3);
                } else if(666 < this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(0);
                } else if(666 > this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(1);
                }
            } else if(Math.abs(this.field_rn_c_int_21 - var2 - var1) < 10) {
                this.method_rn_c_a_12(3);
            } else if(var2 + var1 < this.field_rn_c_int_21) {
                this.method_rn_c_a_12(0);
            } else if(var2 + var1 > this.field_rn_c_int_21) {
                this.method_rn_c_a_12(1);
            }
            if((this.field_rn_c_int_21 <= 900 || Math.random() >= 0.4) && var2 >= 720 && (this.field_rn_c_else_14 >= 150 || this.field_rn_c_if_16 <= -3)) {
                if((this.field_rn_c_int_21 >= 900 && this.field_rn_c_void_13 > 830 || this.field_rn_c_int_21 <= 580 && this.field_rn_c_void_13 < 530) && Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 100) {
                    this.method_rn_c_a_12(2);
                } else if(this.method_rn_a_c_58(this.field_rn_c_void_13 - this.field_rn_c_int_21) * 2 + this.method_rn_a_c_58(this.field_rn_c_else_14 - this.field_rn_c_for_22) < this.method_rn_a_c_58(185) && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(2);
                } else if(this.field_rn_c_do_15 * this.field_rn_c_do_15 + this.field_rn_c_if_16 * this.field_rn_c_if_16 < 20 && this.field_rn_c_void_13 - this.field_rn_c_int_21 < 30 && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                    this.method_rn_c_a_12(2);
                } else if(Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 150 && this.field_rn_c_else_14 > 50 && this.field_rn_c_else_14 < 250) {
                    this.method_rn_c_a_12(2);
                }
            }
        } else {
            this.method_rn_a_case_62();
        }
    }

    /*public*/ method_rn_a_c_58(var1 : number) : number {
        return var1 * var1;
    }

    /*public*/ method_rn_a_b_59(var1 : number) : number {
        let var2 : number = 0;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= 0) {
                return var2;
            }
            ++var2;
        };
    }

    /*public*/ method_rn_a_void_60(var1 : number) : number {
        let var2 : number = this.field_rn_c_void_13;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= var1) {
                return var2;
            }
            var2 += this.field_rn_c_do_15;
            if(var2 <= 0) {
                var2 = 0;
                this.field_rn_c_do_15 = -this.field_rn_c_do_15;
            } else if(var2 >= 1000) {
                var2 = 1000;
                this.field_rn_c_do_15 = -this.field_rn_c_do_15;
            }
        };
    }

    /*public*/ method_rn_a_char_61() : number {
        let var1 : number = this.field_rn_c_int_21 - this.field_rn_c_void_13;
        let var2 : number = this.field_rn_c_for_22 - this.field_rn_c_else_14;
        return (<number>Math.sqrt(<number>(var1 * var1 + var2 * var2))|0);
    }

    /*public*/ method_rn_a_case_62() {
        if(this.field_rn_a_o_64 === -1) {
            if(Math.random() < 0.3) {
                if(this.field_rn_c_g_17 < 300) {
                    this.field_rn_a_o_64 = 0;
                } else if(this.field_rn_c_g_17 > 200) {
                    this.field_rn_a_o_64 = 1;
                } else {
                    this.field_rn_a_o_64 = 2;
                }
            } else {
                this.field_rn_a_o_64 = 2;
            }
            if(this.field_rn_a_o_64 === -1 || Math.random() < 0.3) {
                this.field_rn_a_o_64 = (<number>(Math.random() * 3.0)|0);
            }
        }
        let var1 : number;
        switch((this.field_rn_a_o_64)) {
        case 0:
        case 1:
            let var2 : number = this.field_rn_a_o_64 === 0?860:840;
            if(this.field_rn_c_if_16 > 12 && this.field_rn_c_int_21 < var2) {
                this.method_rn_c_a_12(1);
            }
            if(this.field_rn_c_int_21 >= var2) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_if_16 === -3 && this.field_rn_c_int_21 !== 800) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_if_16 < -12 && this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 >= var2 - 15 && this.field_rn_a_o_64 === 0) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_void_13 < 700) {
                this.field_rn_a_o_64 = -1;
            }
            break;
        case 2:
            var1 = 770;
            if(this.field_rn_c_if_16 > 12 && this.field_rn_c_int_21 > var1) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var1) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_if_16 === -2 && this.field_rn_c_int_21 !== 800) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_for_22 !== 0 && this.field_rn_c_void_13 > 800) {
                this.field_rn_a_o_64 = 3 + this.method_rn_a_byte_63();
            }
            break;
        case 3:
            var1 = 585;
            if(this.field_rn_c_int_21 > var1) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var1) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 <= 730) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_void_13 < 600) {
                this.method_rn_c_a_12(1);
            }
            if(this.field_rn_c_void_13 < 580) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 < 540) {
                this.field_rn_a_o_64 = -1;
            }
        case 4:
            var1 = 585;
            if(this.field_rn_c_int_21 > var1) {
                this.method_rn_c_a_12(0);
            }
            if(this.field_rn_c_int_21 <= var1) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 <= 755) {
                this.method_rn_c_a_12(2);
            }
            if(this.field_rn_c_void_13 < 600) {
                this.method_rn_c_a_12(1);
            }
            if(this.field_rn_c_void_13 < 580) {
                this.method_rn_c_a_12(3);
            }
            if(this.field_rn_c_void_13 < 540) {
                this.field_rn_a_o_64 = -1;
            }
        }
    }

    /*public*/ method_rn_a_byte_63() : number {
        let var1 : number = 0;
        if(this.field_rn_c_g_17 < 200) {
            var1 = 1;
        } else if(this.field_rn_c_g_17 > 300) {
            var1 = 0;
        }
        if(Math.random() < 0.35) {
            var1 = 1 - var1;
        }
        return var1;
    }
}
Class_rn_a_6["__class"] = "Class_rn_a_6";


class Class_rn_d_4 extends Class_rn_c_1 {
    /*public*/ field_rn_d_i_49 : number = 0.85;

    /*public*/ field_rn_d_j_50 : number = -1;

    /*public*/ method_rn_d_try_45(var1 : number) : number {
        return var1 * var1;
    }

    /*public*/ method_rn_d_new_46(var1 : number) : number {
        let var2 : number = 0;
        let var3 : number = this.field_rn_c_else_14;
        let var4 : number = this.field_rn_c_if_16;
        while((true)) {
            --var4;
            if((var3 += var4) <= var1) {
                return var2;
            }
            ++var2;
        };
    }

    /*public*/ method_rn_d_int_47(var1 : number) : number {
        let var2 : number = this.method_rn_d_new_46(var1);
        let var3 : number = this.field_rn_c_void_13;
        let var4 : number = this.field_rn_c_do_15;
        for(let var5 : number = 0; var5 < var2; ++var5) {
            var3 += var4;
            if(var3 < 0) {
                var3 = 0;
                var4 = -var4;
            } else if(var3 > 1000) {
                var3 = 1000;
                var4 = -var4;
            }
        };
        return var3;
    }

    public method_rn_c_a_11() {
        if(this.field_rn_c_void_13 < 500 && this.field_rn_d_j_50 !== -1) {
            this.field_rn_d_j_50 = -1;
        }
        let var1 : number = this.method_rn_d_int_47(125);
        let var2 : number = this.method_rn_d_new_46(125);
        let var3 : number;
        if(this.field_rn_c_for_22 !== 0 && this.field_rn_c_int_21 < 575) {
            var3 = 0;
        } else {
            var3 = 25 + (<number>(10.0 * Math.random())|0);
        }
        if((this.field_rn_c_do_15 !== 0 || this.field_rn_c_void_13 !== 800) && this.field_rn_d_j_50 === -1) {
            if(var1 < 500) {
                if(Math.abs(this.field_rn_c_int_21 - 666) < 20) {
                    this.method_rn_c_a_12(3);
                } else if(this.field_rn_c_int_21 > 666) {
                    this.method_rn_c_a_12(0);
                } else if(this.field_rn_c_int_21 < 666) {
                    this.method_rn_c_a_12(1);
                }
            } else {
                if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                    if(this.field_rn_c_for_22 !== 0 || this.field_rn_c_f_26 && Math.random() < 0.3) {
                        return;
                    }
                    if((this.field_rn_c_int_21 >= 900 && this.field_rn_c_void_13 > 830 || this.field_rn_c_int_21 <= 580 && this.field_rn_c_void_13 < 530) && Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 100) {
                        this.method_rn_d_int_48();
                    } else if(this.method_rn_d_try_45(this.field_rn_c_void_13 - this.field_rn_c_int_21) * 2 + this.method_rn_d_try_45(this.field_rn_c_else_14 - this.field_rn_c_for_22) < this.method_rn_d_try_45(170) && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_d_int_48();
                    } else if(this.field_rn_c_do_15 * this.field_rn_c_do_15 + this.field_rn_c_if_16 * this.field_rn_c_if_16 < 20 && this.field_rn_c_void_13 - this.field_rn_c_int_21 < 30 && this.field_rn_c_void_13 !== this.field_rn_c_int_21) {
                        this.method_rn_d_int_48();
                    } else if(Math.abs(this.field_rn_c_void_13 - this.field_rn_c_int_21) < 150 && this.field_rn_c_else_14 > 50 && this.field_rn_c_else_14 < 400 && Math.random() < 0.666) {
                        this.method_rn_d_int_48();
                    }
                }
                if(this.field_rn_c_for_22 === 0 && this.field_rn_d_j_50 === -1) {
                    if(Math.abs(this.field_rn_c_int_21 - var1) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(var1 + var3 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(var1 + var3 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                } else if(this.field_rn_d_j_50 === -1) {
                    if(this.field_rn_c_int_21 < 575) {
                        return;
                    }
                    if(this.field_rn_c_int_21 > 900) {
                        this.method_rn_c_a_12(1);
                        return;
                    }
                    if(Math.abs(this.field_rn_c_int_21 - this.field_rn_c_void_13) < var3) {
                        this.method_rn_c_a_12(3);
                    } else if(this.field_rn_c_void_13 < this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(0);
                    } else if(this.field_rn_c_void_13 > this.field_rn_c_int_21) {
                        this.method_rn_c_a_12(1);
                    }
                }
            }
        } else {
            if(this.field_rn_d_j_50 === -1) {
                if(this.field_rn_c_g_17 > 250) {
                    this.field_rn_d_j_50 = 0;
                } else {
                    this.field_rn_d_j_50 = 1;
                }
                if(Math.random() < 0.35) {
                    this.field_rn_d_j_50 = (<number>(2.0 * Math.random())|0);
                }
            }
            switch((this.field_rn_d_j_50)) {
            case 0:
                if(this.field_rn_c_else_14 < 300 && this.field_rn_c_if_16 < -3) {
                    this.method_rn_c_a_12(1);
                    this.method_rn_c_a_12(2);
                }
                break;
            case 1:
                if(this.field_rn_c_else_14 < 300 && this.field_rn_c_if_16 < 0) {
                    this.method_rn_c_a_12(0);
                    this.method_rn_c_a_12(2);
                }
            }
        }
    }

    /*public*/ method_rn_d_int_48() {
        if(Math.random() < 0.85) {
            this.method_rn_c_a_12(2);
        }
    }
}
Class_rn_d_4["__class"] = "Class_rn_d_4";


class ServerCheck extends Frame {
    field_rn_ServerCheck_ok_76 : Button;

    public constructor() {
        super();
        this.field_rn_ServerCheck_ok_76 = null;
        this.setLayout(new GridLayout(4, 1));
        let var1 : Panel = new Panel();
        var1.add(new Label("Couldn\'t connect to server!"));
        this.add(var1);
        let var2 : Panel = new Panel();
        var2.add(new Label("Your high scores may not be saved on the server."));
        this.add(var2);
        let var3 : Panel = new Panel();
        var3.add(new Label("To fix this, close all browser windows and try again."));
        this.setTitle("Error!");
        this.field_rn_ServerCheck_ok_76 = new Button("Damn. Oh well if that\'s how it is...");
        this.add(var3);
        this.add(this.field_rn_ServerCheck_ok_76);
        this.pack();
        this.show();
    }

    public action(var1 : Event, var2 : any) : boolean {
        if(var1.target === this.field_rn_ServerCheck_ok_76) {
            this.dispose();
        }
        return false;
    }
}
ServerCheck["__class"] = "ServerCheck";


class NameFrame extends Frame {
    /*public*/ app : Slime1P;

    /*public*/ name : TextField;

    /*public*/ field_rn_NameFrame_ok_110 : Button;

    /*public*/ score : number;

    /*public*/ level : number;

    public constructor(var1? : any, var2? : any, var4? : any) {
        if(((var1 != null && var1 instanceof <any>Slime1P) || var1 === null) && ((typeof var2 === 'number') || var2 === null) && ((typeof var4 === 'number') || var4 === null)) {
            let __args = Array.prototype.slice.call(arguments);
            super();
            this.app = null;
            this.name = null;
            this.field_rn_NameFrame_ok_110 = null;
            this.score = 0;
            this.level = 0;
            this.app = null;
            this.name = null;
            this.field_rn_NameFrame_ok_110 = null;
            this.score = 0;
            this.level = 0;
            (() => {
                this.app = var1;
                this.score = var2;
                this.level = var4;
                this.setLayout(new GridLayout(2, 1));
                let var5 : Panel = new Panel();
                var5.add(new Label("Your score: " + var2));
                this.add(var5);
                let var6 : Panel = new Panel();
                var6.add(new Label("Enter your name:"));
                this.name = new TextField(20);
                var6.add(this.name);
                this.field_rn_NameFrame_ok_110 = new Button("OK");
                var6.add(this.field_rn_NameFrame_ok_110);
                this.add(var6);
                this.setTitle("New High Score!");
                this.pack();
                this.show();
            })();
        } else if(var1 === undefined && var2 === undefined && var4 === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            super();
            this.app = null;
            this.name = null;
            this.field_rn_NameFrame_ok_110 = null;
            this.score = 0;
            this.level = 0;
            this.app = null;
            this.name = null;
            this.field_rn_NameFrame_ok_110 = null;
            this.score = 0;
            this.level = 0;
        } else throw new Error('invalid overload');
    }

    public action(var1 : Event, var2 : any) : boolean {
        if(var1.target === this.field_rn_NameFrame_ok_110) {
            Class_rn_g_7.method_rn_g_a_67(this.app, this.score, Math.floor(<number>this.level), this.name.getText());
            this.dispose();
        }
        return false;
    }
}
NameFrame["__class"] = "NameFrame";




Class_rn_g_7.field_rn_g_if_75_$LI$();