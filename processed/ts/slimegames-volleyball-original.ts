import { Applet, Runnable, Thread, Graphics, Event, Color, Font, BufferedImage, Image, Frame, Element, GridLayout, TextField, Button, Panel, Label } from "../../ts/client/shims"

EndOfShimDeclarations["__class"] = "EndOfShimDeclarations";


export default class slime extends Applet implements Runnable {
    public recommended_width = 600;
    public recommended_height = 350;
    field_rn_slime_th_1 : Thread;

    gra : Graphics;

    XSIZE : number;

    YSIZE : number;

    SLIMESIZE : number;

    BALLSIZE : number;

    NETSIZEX : number;

    NETSIZEY : number;

    GROUNDSIZE : number;

    EYESIZE : number;

    BLACKEYESIZE : number;

    WINSCORE : number;

    field_rn_slime_G_2 : number;

    comLevel : number;

    paintFlag : number;

    comserv : number;

    field_rn_slime_px_3 : number[] = [0, 0, 0];

    field_rn_slime_py_4 : number[] = [0, 0, 0];

    pvx : number[] = [0, 0, 0];

    pvy : number[] = [0, 0, 0];

    field_rn_slime_bx_5 : number;

    field_rn_slime_by_6 : number;

    bvx : number;

    bvy : number;

    score : number[] = [];

    jumpFlag : number[] = [];

    service : number;

    moveX : number;

    jump : number;

    comjump : number;

    mDown : number;

    public init() {
        this.XSIZE = 600;
        this.YSIZE = 400;
        this.SLIMESIZE = 35;
        this.BALLSIZE = 10;
        this.NETSIZEX = 6;
        this.NETSIZEY = 50;
        this.GROUNDSIZE = 50;
        this.EYESIZE = 8;
        this.BLACKEYESIZE = 4;
        this.WINSCORE = 6;
        this.field_rn_slime_G_2 = 0.05;
        this.mDown = 0;
        this.paintFlag = 0;
        this.comserv = 0;
        this.gra = this.getGraphics();
    }

    public paint(var1 : Graphics) {
        switch((this.paintFlag)) {
        case 1:
            this.ShowTitle();
            return;
        case 2:
            this.DrawAll();
            this.DrawScore();
            return;
        default:
        }
    }

    public start() {
        if(this.field_rn_slime_th_1 == null) {
            this.field_rn_slime_th_1 = new Thread(this);
            this.field_rn_slime_th_1.start();
        }
    }

    public stop() {
        if(this.field_rn_slime_th_1 != null) {
            this.field_rn_slime_th_1.stop();
            this.field_rn_slime_th_1 = null;
        }
    }

    public keyDown(var1 : Event, var2 : number) : boolean {
        if(var2 !== 1006 && var2 !== 52) {
            if(var2 === 1007 || var2 === 54) {
                this.moveX = 1;
            }
        } else {
            this.moveX = -1;
        }
        if(var2 === 32) {
            this.jump = 1;
        }
        return true;
    }

    public keyUp(var1 : Event, var2 : number) : boolean {
        if(var2 === 1006 || var2 === 1007 || var2 === 52 || var2 === 54) {
            this.moveX = 0;
        }
        if(var2 === 32) {
            this.jump = 0;
        }
        return true;
    }

    public mouseUp(var1 : Event, var2 : number, var3 : number) : boolean {
        this.mDown = 1;
        return true;
    }

    public async run() {
        this.Setup();
    }

    Setup() {
        let var2 : boolean = false;
        let var3 : number;
        do {
            this.paintFlag = 1;
            this.ShowTitle();
            this.WaitClickMouse();
            this.paintFlag = 0;
            this.comLevel = this.SelectComLevel();
            let var1 : number = this.Main();
            var3 = this.ShowWinner(var1);
        } while((var3 === 0));
    }

    ShowTitle() {
        this.DrawBG();
        this.gra.setColor(Color.fromString("white"));
        this.gra.setFont(new Font("TimesRoman", 1, 64));
        this.gra.drawString("Slime Volley Ball", 20, 150);
        this.gra.setFont(new Font("TimesRoman", 1, 32));
        this.gra.drawString("CLICK MOUSE", 350, 250);
    }

    WaitClickMouse() {
        this.mDown = 0;
        try {
            do {
                Thread.sleep$long(1);
            } while((this.mDown === 0));
        } catch(var1) {
        };
        this.mDown = 0;
    }

    SelectComLevel() : number {
        return 1;
    }

    ShowWinner(var1 : number) : number {
        this.gra.setFont(new Font("TimesRoman", 1, 50));
        this.gra.setColor(Color.fromString("white"));
        let var2 : number;
        if(var1 === 1) {
            var2 = 2;
            this.gra.drawString("You Win!", 200, 100);
        } else {
            var2 = 1;
            this.gra.drawString("You lose.", 200, 100);
        }
        for(let var3 : number = 0; var3 < 3; ++var3) {
            this.pvy[var1] = -80.0 * this.field_rn_slime_G_2;
            this.field_rn_slime_py_4[var1] = <number>(this.YSIZE - this.GROUNDSIZE);
            do {
                this.gra.setColor(new Color(100, 100, 255));
                this.gra.fillRect((<number>this.field_rn_slime_px_3[var1]|0) - this.SLIMESIZE, (<number>this.field_rn_slime_py_4[var1]|0) - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE);
                this.field_rn_slime_py_4[var1] += this.pvy[var1];
                this.pvy[var1] += this.field_rn_slime_G_2 * 2.0;
                this.DrawSlime(var2);
                try {
                    Thread.sleep$long(5);
                } catch(var4) {
                };
            } while((this.pvy[var1] < 80.0 * this.field_rn_slime_G_2));
        };
        this.gra.setColor(new Color(100, 100, 255));
        this.gra.fillRect((<number>this.field_rn_slime_px_3[var1]|0) - this.SLIMESIZE, (<number>this.field_rn_slime_py_4[var1]|0) - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE);
        this.field_rn_slime_py_4[var1] = <number>(this.YSIZE - this.GROUNDSIZE);
        this.DrawSlime(var2);
        return 1;
    }

    Main() : number {
        this.score[1] = 0;
        this.score[2] = 0;
        this.service = 1;
        this.DrawBG();
        this.DrawScore();
        let var1 : number;
        do {
            if(this.service === 2) {
                this.comserv = (<number>(Math.random() * 4.0 + 1.0)|0);
            }
            var1 = this.Game(this.service);
            ++this.score[var1];
            this.DrawScore();
            if(var1 === 1) {
                this.DrawSlime(2);
            } else if(var1 === 2) {
                this.DrawSlime(1);
            }
            try {
                Thread.sleep$long(2000);
            } catch(var2) {
            };
            this.service = var1;
        } while((this.score[1] !== this.WINSCORE && this.score[2] !== this.WINSCORE));
        return var1;
    }

    Game(var1 : number) : number {
        this.field_rn_slime_px_3[1] = <number>(this.SLIMESIZE + this.SLIMESIZE);
        this.field_rn_slime_px_3[2] = <number>(this.XSIZE - this.SLIMESIZE - this.SLIMESIZE);
        this.field_rn_slime_py_4[1] = <number>(this.YSIZE - this.GROUNDSIZE);
        this.field_rn_slime_py_4[2] = <number>(this.YSIZE - this.GROUNDSIZE);
        this.pvx[1] = 0.0;
        this.pvx[2] = 0.0;
        this.pvy[1] = 0.0;
        this.pvy[2] = 0.0;
        this.jumpFlag[1] = 0;
        this.jumpFlag[2] = 0;
        this.field_rn_slime_bx_5 = this.field_rn_slime_px_3[var1];
        this.field_rn_slime_by_6 = this.field_rn_slime_py_4[var1] - <number>this.SLIMESIZE - <number>this.SLIMESIZE;
        this.bvx = 0.0;
        this.bvy = -50.0 * this.field_rn_slime_G_2;
        let var2 : number = 0;
        this.DrawAll();
        this.paintFlag = 2;
        try {
            Thread.sleep$long(100);
        } catch(var4) {
        };
        do {
            try {
                Thread.sleep$long(8);
                this.MoveBall();
                this.MoveSlime(1);
                this.MoveSlime(2);
                this.CheckHit();
                var2 = this.CheckPoint();
                this.DrawAll();
            } catch(var3) {
            };
        } while((var2 === 0));
        this.paintFlag = 0;
        return var2;
    }

    MoveBall() {
        this.field_rn_slime_bx_5 += this.bvx;
        this.field_rn_slime_by_6 += this.bvy;
        this.bvy += this.field_rn_slime_G_2;
        if(this.field_rn_slime_bx_5 < <number>this.BALLSIZE) {
            this.field_rn_slime_bx_5 = <number>this.BALLSIZE;
            this.bvx = -this.bvx;
        } else if(this.field_rn_slime_bx_5 > <number>(this.XSIZE - this.BALLSIZE)) {
            this.field_rn_slime_bx_5 = <number>(this.XSIZE - this.BALLSIZE);
            this.bvx = -this.bvx;
        }
        if(this.field_rn_slime_bx_5 > <number>((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0) - this.BALLSIZE) && this.field_rn_slime_bx_5 < <number>((this.XSIZE / 2|0) + (this.NETSIZEX / 2|0) + this.BALLSIZE)) {
            if(this.field_rn_slime_by_6 > <number>(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY)) {
                if(this.bvx < 0.0) {
                    this.field_rn_slime_bx_5 = <number>((this.XSIZE / 2|0) + (this.NETSIZEX / 2|0) + this.BALLSIZE + 1);
                    this.bvx = -this.bvx;
                    return;
                }
                if(this.bvx > 0.0) {
                    this.field_rn_slime_bx_5 = <number>((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0) - this.BALLSIZE - 1);
                    this.bvx = -this.bvx;
                    return;
                }
            } else if(this.field_rn_slime_by_6 <= <number>(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY) && this.field_rn_slime_by_6 > <number>(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY - this.BALLSIZE)) {
                this.field_rn_slime_by_6 = <number>(this.YSIZE - this.GROUNDSIZE - this.NETSIZEY - this.BALLSIZE);
                this.bvy = -Math.abs(this.bvy);
            }
        }
    }

    CheckHit() {
        for(let var3 : number = 1; var3 <= 2; ++var3) {
            if(this.field_rn_slime_by_6 <= this.field_rn_slime_py_4[var3]) {
                let var1 : number = (this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) * (this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) + (this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6) * (this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6);
                var1 = Math.sqrt(var1);
                if(var1 <= <number>(this.SLIMESIZE + this.BALLSIZE)) {
                    this.HitBall(var3);
                }
            } else if(Math.abs(this.field_rn_slime_py_4[var3] - this.field_rn_slime_by_6) < <number>this.BALLSIZE && Math.abs(this.field_rn_slime_px_3[var3] - this.field_rn_slime_bx_5) < <number>(this.SLIMESIZE + this.BALLSIZE)) {
                this.HitBall2();
            }
        };
    }

    HitBall(var1 : number) {
        if(this.comserv !== 0) {
            this.comserv = 0;
        }
        let var6 : number = Math.sqrt(this.bvx * this.bvx + this.bvy * this.bvy);
        let var2 : number = (this.field_rn_slime_bx_5 - this.field_rn_slime_px_3[var1]) / <number>(this.SLIMESIZE + this.BALLSIZE);
        let var4 : number = (this.field_rn_slime_by_6 - this.field_rn_slime_py_4[var1]) / <number>(this.SLIMESIZE + this.BALLSIZE);
        this.bvx += var2 * (var6 + 80.0 * this.field_rn_slime_G_2);
        if(this.bvx < -100.0 * this.field_rn_slime_G_2) {
            this.bvx = -100.0 * this.field_rn_slime_G_2;
        } else if(this.bvx > 100.0 * this.field_rn_slime_G_2) {
            this.bvx = 100.0 * this.field_rn_slime_G_2;
        }
        if(this.jumpFlag[var1] === 0) {
            this.bvy = var4 * 80.0 * this.field_rn_slime_G_2;
        } else {
            this.bvy = var4 * 10.0 * this.field_rn_slime_G_2;
        }
        this.field_rn_slime_bx_5 += this.bvx * 2.0;
        this.field_rn_slime_by_6 += this.bvy * 2.0;
    }

    HitBall2() {
        this.bvy = Math.abs(this.bvy);
    }

    CheckPoint() : number {
        let var1 : number = 0;
        if(this.field_rn_slime_by_6 > <number>(this.YSIZE - this.GROUNDSIZE - this.BALLSIZE)) {
            if(this.field_rn_slime_bx_5 < <number>((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0))) {
                var1 = 2;
            } else {
                var1 = 1;
            }
        }
        return var1;
    }

    MoveSlime(var1 : number) {
        let var2 : number = 0;
        let var3 : number = 0;
        if(this.jumpFlag[var1] === 0) {
            if(var1 === 1) {
                var2 = this.GetKey();
                var3 = this.GetJump();
            } else if(var1 === 2) {
                var2 = this.MoveCom2();
                var3 = this.ComJump();
            }
            this.pvx[var1] = <number>var2 * 1.5;
            this.jumpFlag[var1] = var3;
            if(var3 === 1) {
                this.pvy[var1] = -80.0 * this.field_rn_slime_G_2;
            }
        }
        this.field_rn_slime_px_3[var1] += this.pvx[var1];
        if(var1 === 1) {
            if(this.field_rn_slime_px_3[var1] < <number>this.SLIMESIZE) {
                this.field_rn_slime_px_3[var1] = <number>this.SLIMESIZE;
            } else if(this.field_rn_slime_px_3[var1] > <number>((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0) - this.SLIMESIZE)) {
                this.field_rn_slime_px_3[var1] = <number>((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0) - this.SLIMESIZE);
            }
        } else if(var1 === 2) {
            if(this.field_rn_slime_px_3[var1] < <number>((this.XSIZE / 2|0) + (this.NETSIZEX / 2|0) + this.SLIMESIZE)) {
                this.field_rn_slime_px_3[var1] = <number>((this.XSIZE / 2|0) + (this.NETSIZEX / 2|0) + this.SLIMESIZE);
            } else if(this.field_rn_slime_px_3[var1] > <number>(this.XSIZE - this.SLIMESIZE)) {
                this.field_rn_slime_px_3[var1] = <number>(this.XSIZE - this.SLIMESIZE);
            }
        }
        if(this.jumpFlag[var1] === 1) {
            this.field_rn_slime_py_4[var1] += this.pvy[var1];
            this.pvy[var1] += this.field_rn_slime_G_2 * 2.0;
            if(this.field_rn_slime_py_4[var1] >= <number>(this.YSIZE - this.GROUNDSIZE)) {
                this.field_rn_slime_py_4[var1] = <number>(this.YSIZE - this.GROUNDSIZE);
                this.jumpFlag[var1] = 0;
            }
        }
    }

    GetKey() : number {
        return this.moveX;
    }

    GetJump() : number {
        return this.jump;
    }

    MoveCom() : number {
        let var1 : number = 0;
        this.comjump = 0;
        if(this.field_rn_slime_bx_5 < <number>((this.XSIZE / 2|0))) {
            if(this.field_rn_slime_px_3[2] < <number>((this.XSIZE / 2|0) + (this.XSIZE / 5|0))) {
                var1 = 1;
            } else if(this.field_rn_slime_px_3[2] > <number>((this.XSIZE / 2|0) + (this.XSIZE / 5|0))) {
                var1 = -1;
            }
        }
        if(this.field_rn_slime_bx_5 > <number>((this.XSIZE / 2|0) - this.SLIMESIZE * 3)) {
            let var4 : number = <number>this.YSIZE - <number>this.GROUNDSIZE - this.field_rn_slime_by_6 - <number>this.SLIMESIZE / 1.5;
            let var6 : number = (Math.sqrt(this.bvy * this.bvy + 2.0 * this.field_rn_slime_G_2 * var4) - this.bvy) / this.field_rn_slime_G_2;
            let var2 : number = this.field_rn_slime_bx_5 + this.bvx * var6;
            if(var2 > <number>this.XSIZE) {
                var2 = 2.0 * <number>this.XSIZE - var2;
            }
            if(var2 < <number>((this.XSIZE / 2|0) + (this.XSIZE / 4|0))) {
                if(Math.abs(this.bvx) < 30.0 * this.field_rn_slime_G_2 && this.bvy > (8.0 + (this.field_rn_slime_py_4[2] - this.field_rn_slime_by_6) * 2.0 * this.field_rn_slime_G_2) * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - this.field_rn_slime_py_4[2]) > <number>this.SLIMESIZE * 2.5) {
                    this.comjump = 1;
                    if(this.bvx > 20.0 * this.field_rn_slime_G_2 && this.field_rn_slime_px_3[2] < this.field_rn_slime_bx_5 - <number>this.BALLSIZE) {
                        var1 = 1;
                    } else if(this.bvx < -20.0 * this.field_rn_slime_G_2 && this.field_rn_slime_px_3[2] > this.field_rn_slime_bx_5 + <number>this.BALLSIZE) {
                        var1 = -1;
                    } else {
                        var1 = 0;
                    }
                    if(var2 < <number>((this.XSIZE / 2|0)) && this.jumpFlag[1] === 0) {
                        this.comjump = 0;
                    }
                } else if(Math.abs(this.bvx) < 20.0 * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - this.field_rn_slime_py_4[2]) > <number>this.SLIMESIZE * 2.5) {
                    if(this.field_rn_slime_px_3[2] - <number>this.BALLSIZE < this.field_rn_slime_bx_5) {
                        var1 = 1;
                    } else if(this.field_rn_slime_px_3[2] - <number>this.BALLSIZE > this.field_rn_slime_bx_5) {
                        var1 = -1;
                    }
                } else if(this.field_rn_slime_px_3[2] - <number>((this.BALLSIZE / 3|0)) < var2) {
                    var1 = 1;
                } else if(this.field_rn_slime_px_3[2] - <number>((this.BALLSIZE / 3|0)) > var2) {
                    var1 = -1;
                } else {
                    var1 = 0;
                }
            } else if(this.field_rn_slime_px_3[2] - <number>((this.BALLSIZE / 2|0)) < var2) {
                var1 = 1;
            } else if(this.field_rn_slime_px_3[2] - <number>((this.BALLSIZE / 2|0)) > var2) {
                var1 = -1;
            } else {
                var1 = 0;
            }
        }
        return var1;
    }

    ComJump() : number {
        if(this.comjump === 1) {
            this.comjump = 0;
            return 1;
        } else {
            return 0;
        }
    }

    DrawAll() {
        this.DrawBG();
        this.DrawSlime(0);
        this.DrawBall();
    }

    DrawBG() {
        let var1 : Color = new Color(100, 100, 255);
        this.gra.setColor(var1);
        this.gra.fillRect(0, 50, this.XSIZE, this.YSIZE - this.GROUNDSIZE - 50);
        var1 = new Color(180, 140, 160);
        this.gra.setColor(var1);
        this.gra.fillRect(0, this.YSIZE - this.GROUNDSIZE, this.XSIZE, this.GROUNDSIZE);
        this.gra.setColor(Color.fromString("white"));
        this.gra.fillRect((this.XSIZE / 2|0) - (this.NETSIZEX / 2|0), this.YSIZE - this.GROUNDSIZE - this.NETSIZEY, this.NETSIZEX, this.NETSIZEY);
    }

    DrawSlime(var1 : number) {
        for(let var10 : number = 1; var10 <= 2; ++var10) {
            let var2 : number = (<number>this.field_rn_slime_px_3[var10]|0);
            let var3 : number = (<number>this.field_rn_slime_py_4[var10]|0);
            if(var10 === 1) {
                this.gra.setColor(Color.fromString("red"));
            } else if(var10 === 2) {
                this.gra.setColor(Color.fromString("blue"));
            }
            this.gra.fillArc(var2 - this.SLIMESIZE, var3 - this.SLIMESIZE, this.SLIMESIZE * 2, this.SLIMESIZE * 2, 0, 180);
            if(var10 === 1) {
                var2 += (this.SLIMESIZE / 2|0);
            } else if(var10 === 2) {
                var2 -= (this.SLIMESIZE / 2|0);
            }
            var3 -= (this.SLIMESIZE * 3 / 5|0);
            this.gra.setColor(Color.fromString("white"));
            this.gra.fillArc(var2 - this.EYESIZE, var3 - this.EYESIZE, this.EYESIZE * 2, this.EYESIZE * 2, 0, 360);
            this.gra.setColor(Color.fromString("black"));
            if(var1 !== var10) {
                let var4 : number = this.field_rn_slime_bx_5 - <number>var2;
                let var6 : number = this.field_rn_slime_by_6 - <number>var3;
                let var8 : number = Math.sqrt(var4 * var4 + var6 * var6);
                var2 += (<number>(var4 * <number>(this.BLACKEYESIZE + 1) / var8)|0);
                var3 += (<number>(var6 * <number>(this.BLACKEYESIZE + 1) / var8)|0);
                this.gra.fillArc(var2 - this.BLACKEYESIZE, var3 - this.BLACKEYESIZE, this.BLACKEYESIZE * 2, this.BLACKEYESIZE * 2, 0, 360);
            } else {
                this.gra.drawLine(var2 - this.EYESIZE + 2, var3 - this.EYESIZE + 2, var2 + this.EYESIZE - 2, var3 + this.EYESIZE - 2);
                this.gra.drawLine(var2 - this.EYESIZE + 2, var3 + this.EYESIZE - 2, var2 + this.EYESIZE - 2, var3 - this.EYESIZE + 2);
            }
        };
    }

    DrawBall() {
        this.gra.setColor(Color.fromString("yellow"));
        this.gra.fillArc((<number>this.field_rn_slime_bx_5|0) - this.BALLSIZE, (<number>this.field_rn_slime_by_6|0) - this.BALLSIZE, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
    }

    DrawScore() {
        this.gra.setColor(new Color(100, 100, 255));
        this.gra.fillRect(0, 0, this.XSIZE, 50);
        this.gra.setColor(Color.fromString("white"));
        this.gra.setFont(new Font("TimesRoman", 1, 28));
        this.gra.drawString("RED ", 30, 46);
        this.gra.drawString("BLUE", 30 + (this.XSIZE / 2|0), 46);
        this.gra.setColor(Color.fromString("yellow"));
        for(let var1 : number = 1; var1 <= this.WINSCORE; ++var1) {
            if(this.score[1] < var1) {
                this.gra.drawArc(80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
            } else {
                this.gra.fillArc(80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
            }
            if(this.score[2] < var1) {
                this.gra.drawArc((this.XSIZE / 2|0) + 80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
            } else {
                this.gra.fillArc((this.XSIZE / 2|0) + 80 + var1 * this.BALLSIZE * 3, 26, this.BALLSIZE * 2, this.BALLSIZE * 2, 0, 360);
            }
        };
    }

    MoveCom2() : number {
        let var3 : number = 0;
        let var4 : boolean = false;
        let var23 : number = <number>this.YSIZE - <number>this.GROUNDSIZE - this.field_rn_slime_by_6 - <number>this.SLIMESIZE;
        let var25 : number = (Math.sqrt(this.bvy * this.bvy + 2.0 * this.field_rn_slime_G_2 * var23) - this.bvy) / this.field_rn_slime_G_2;
        let var21 : number = this.field_rn_slime_bx_5 + this.bvx * var25;
        if(var21 > <number>this.XSIZE) {
            var21 = 2.0 * <number>this.XSIZE - var21;
        }
        if(var21 < 0.0) {
            var21 = -var21;
        }
        let var5 : number = this.field_rn_slime_px_3[1];
        let var7 : number = this.field_rn_slime_px_3[2];
        let var13 : number = this.field_rn_slime_py_4[1];
        let var15 : number = this.field_rn_slime_py_4[2];
        let var1 : number = this.jumpFlag[1];
        let var2 : number = this.jumpFlag[2];
        let var29 : number = this.bvx;
        let var31 : number = this.bvy + this.field_rn_slime_G_2 * var25;
        let var33 : number = Math.sqrt(var29 * var29 * var31 * var31);
        if(var7 < <number>((this.XSIZE / 2|0) + (this.XSIZE / 5|0))) {
            var3 = 1;
        } else if(var7 > <number>((this.XSIZE / 2|0) + (this.XSIZE / 5|0))) {
            var3 = -1;
        }
        let var9 : number = <number>(this.SLIMESIZE + this.BALLSIZE) * this.bvx / (var33 + 80.0 * this.field_rn_slime_G_2);
        if(var21 > <number>((this.XSIZE / 2|0) - this.SLIMESIZE * 2)) {
            if(var21 > <number>((this.XSIZE / 2|0) + (this.XSIZE / 4|0))) {
                if(var21 + var9 + <number>((this.BALLSIZE / 2|0)) > var7) {
                    var3 = 1;
                } else if(var21 + var9 + <number>((this.BALLSIZE / 2|0)) < var7) {
                    var3 = -1;
                } else {
                    var3 = 0;
                }
            } else if(Math.abs(this.bvx) < 30.0 * this.field_rn_slime_G_2) {
                if(var5 < <number>((this.XSIZE / 3|0)) && Math.abs(this.field_rn_slime_by_6 - var15) > <number>this.SLIMESIZE * 2.5) {
                    if(this.field_rn_slime_bx_5 + <number>this.BALLSIZE + this.bvx * 10.0 > var7) {
                        var3 = 1;
                    } else if(this.field_rn_slime_bx_5 + <number>this.BALLSIZE + this.bvx * 10.0 < var7) {
                        var3 = -1;
                    } else {
                        var3 = 0;
                    }
                } else if(var21 + var9 + <number>(this.BALLSIZE * 2) > var7) {
                    var3 = 1;
                } else if(var21 + var9 + <number>(this.BALLSIZE * 2) < var7) {
                    var3 = -1;
                } else {
                    var3 = 0;
                }
            } else if(var21 + var9 + <number>((this.BALLSIZE / 6|0)) > var7) {
                var3 = 1;
            } else if(var21 + var9 + <number>((this.BALLSIZE / 6|0)) < var7) {
                var3 = -1;
            } else {
                var3 = 0;
            }
            if(this.field_rn_slime_bx_5 < <number>((this.XSIZE / 2|0)) && Math.abs(var5 - this.field_rn_slime_bx_5) < <number>this.SLIMESIZE && var1 !== 0 && var7 < <number>((this.XSIZE / 2|0) + (this.XSIZE / 4|0)) && this.field_rn_slime_bx_5 > <number>((this.XSIZE / 3|0))) {
                var3 = -1;
                var4 = true;
            }
            if(Math.abs(this.bvx) < 25.0 * this.field_rn_slime_G_2 && this.bvy > (8.0 + (var15 - this.field_rn_slime_by_6) * 2.0 * this.field_rn_slime_G_2) * this.field_rn_slime_G_2 && Math.abs(this.field_rn_slime_by_6 - var15) > <number>this.SLIMESIZE * 2.5 && var7 < <number>((this.XSIZE / 2|0) + (this.XSIZE / 4|0)) && this.bvx * 20.0 + this.field_rn_slime_bx_5 < var7 + <number>this.BALLSIZE && this.bvx * 20.0 + this.field_rn_slime_bx_5 > var7 - <number>this.SLIMESIZE) {
                if(var5 < <number>this.XSIZE / 2.7) {
                    var4 = true;
                    var3 = 0;
                } else if(var1 === 1) {
                    var4 = true;
                    var3 = 0;
                }
            }
        }
        var9 = var7 - <number>this.SLIMESIZE * 1.5 - this.field_rn_slime_bx_5;
        if(var9 > 0.0 && var7 < <number>((this.XSIZE / 2|0) + (this.XSIZE / 4|0))) {
            var25 = var9 / this.bvx;
            let var17 : number = this.field_rn_slime_by_6 + var25 * this.bvy + this.field_rn_slime_G_2 * var25 * var25 / 2.0;
            if(var17 > var15 - <number>this.NETSIZEY - <number>this.SLIMESIZE * 1.5 && var17 < var15 - <number>this.NETSIZEY) {
                if(var25 > 20.0 && var25 < 30.0) {
                    let var11 : number = var9 - 60.0;
                    if(var11 > 0.0 && var7 < <number>((this.XSIZE / 2|0) + this.XSIZE + 4) + 60.0) {
                        let var27 : number = var11 / this.bvx;
                        let var19 : number = this.field_rn_slime_by_6 + var27 * this.bvy + this.field_rn_slime_G_2 * var27 * var27 / 2.0;
                        if(var19 > var15 - <number>this.NETSIZEY - <number>this.SLIMESIZE * 1.5 && var19 < var15 - <number>this.NETSIZEY && var27 > 13.0 && var27 < 15.0) {
                            var3 = -1;
                            var4 = true;
                        }
                    } else {
                        var3 = -1;
                    }
                } else if(var25 > 7.0 && var25 < 10.0) {
                    var3 = 0;
                    var4 = true;
                }
            }
        }
        if(this.comserv !== 0) {
            switch((this.comserv)) {
            case 1:
                if(var21 + <number>(this.BALLSIZE * 2) < var7) {
                    var3 = -1;
                } else if(var21 + <number>(this.BALLSIZE * 2) > var7) {
                    var3 = 1;
                } else {
                    var3 = 0;
                }
                break;
            case 2:
                if(var21 + <number>this.BALLSIZE * 2.5 < var7) {
                    var3 = -1;
                } else if(var21 + <number>this.BALLSIZE * 2.5 > var7) {
                    var3 = 1;
                } else {
                    var3 = 0;
                }
            case 3:
            default:
                break;
            case 4:
                if(var21 - <number>this.BALLSIZE < var7) {
                    var3 = -1;
                } else if(var21 - <number>this.BALLSIZE > var7) {
                    var3 = 1;
                } else {
                    var3 = 0;
                }
            }
        }
        if(var4 && this.comserv === 0) {
            this.comjump = 1;
        }
        return var3;
    }

    constructor() {
        super();
        this.field_rn_slime_th_1 = null;
        this.gra = null;
        this.XSIZE = 0;
        this.YSIZE = 0;
        this.SLIMESIZE = 0;
        this.BALLSIZE = 0;
        this.NETSIZEX = 0;
        this.NETSIZEY = 0;
        this.GROUNDSIZE = 0;
        this.EYESIZE = 0;
        this.BLACKEYESIZE = 0;
        this.WINSCORE = 0;
        this.field_rn_slime_G_2 = 0;
        this.comLevel = 0;
        this.paintFlag = 0;
        this.comserv = 0;
        this.field_rn_slime_bx_5 = 0;
        this.field_rn_slime_by_6 = 0;
        this.bvx = 0;
        this.bvy = 0;
        this.service = 0;
        this.moveX = 0;
        this.jump = 0;
        this.comjump = 0;
        this.mDown = 0;
    }
}
slime["__class"] = "slime";
slime["__interfaces"] = ["Runnable"];



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