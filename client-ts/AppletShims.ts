import AutoPeer from "./AutoPeer"

export class ShimmedImage {
    root: HTMLElement = null;
    constructor(root: HTMLElement) {
        this.root = root;
    } 
    getGraphics(): ShimmedGraphics {
        return new ShimmedGraphics(document.querySelector("canvas")["getContext"]("2d"));
    }
}
export class ShimmedFont {
    private name: string = null;
    private v1: number = 0;
    private v2: number = 0;
    constructor(name: string, v1: number, v2: number) {
        this.name = name;
        this.v1 = v1;
        this.v2 = v2;
    }
    getName(): string {
        return this.name;
    }
}
export class ShimmedEvent {
    id: number;
    key: number;
    x: number;
    y: number;
}
export class ShimmedGraphics {
    public ctx: CanvasRenderingContext2D = null;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    getFontMetrics(): ShimmedFontMetrics {
        return new ShimmedFontMetrics();
    }
    
    setColor(c: ShimmedColor): void {
        this.ctx.strokeStyle = c.stringRepresentation;
        this.ctx.fillStyle = c.stringRepresentation;
    }

    fillRect(v1: number, v2: number, v3: number, v4: number): void {
        this.ctx.fillRect(v1, v2, v3, v4);
    }

    drawString(v: string, p1: any, p2: any): void {
        this.ctx.strokeText(v, p1, p2);
    }

    private arcPath(x: number, y: number, width: number, height: number, startAngleDegrees: number, endAngleDegrees: number): void {
        this.ctx.beginPath();
        var centreX = x + width / 2;
        var centreY = y + height / 2;
        var radiusX = width / 2;
        var radiusY = height / 2;
        var startAngleRadians = startAngleDegrees * Math.PI / 180;
        var endAngleRadians = endAngleDegrees * Math.PI / 180;
        var anticlockwise = endAngleRadians >= 0;
        if (startAngleRadians < 0 && endAngleRadians < 0) {
            this.ctx.arc(centreX, centreY - radiusX / 2, radiusX, -endAngleRadians, -startAngleRadians, true);
        }else {
            this.ctx.arc(centreX, centreY, radiusX, startAngleRadians, endAngleRadians, endAngleRadians >= 0);
        }
    }

    fillArc(x: number, y: number, width: number, height: number, startAngleDegrees: number, endAngleDegrees: number): void {
        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
        this.ctx.fill();
    }

    fillPolygon(pointsX: number[], pointsY: number[], v: number): void {
        this.ctx.beginPath();
        this.ctx.moveTo(pointsX[0], pointsY[0]);
        for (var i = 1; i < v; i++) {
            this.ctx.lineTo(pointsX[i], pointsY[i]);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    fillOval(x: number, y: number, width: number, height: number): void {
        this.fillArc(x, y, width, height, 0, 360);
    }

    drawArc(x: number, y: number, width: number, height: number, startAngleDegrees: number, endAngleDegrees: number): void {
        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
        this.ctx.stroke();
    }

    drawLine(i1: number, v1: number, i2: number, v2: number): void {
        this.ctx.moveTo(i1, v1);
        this.ctx.lineTo(i2, v2);
        this.ctx.stroke();
    }

    getFont(): ShimmedFont {
        return new ShimmedFont(this.ctx.font, 0, 0);
    }

    setFont(font: ShimmedFont): void {
        this.ctx.font = font.getName();
    }

    drawImage(backBuffer: ShimmedImage, v1: number, v2: number, p: any): void {

    }
}
export class ShimmedColor {
    public stringRepresentation: string = null;
    constructor(r: number, g: number, b: number)
    {
        this.stringRepresentation = `rgb(${r}, ${g}, ${b})`;
    }
    static fromString(v: string): ShimmedColor
    {
        var color = new ShimmedColor(0,0,0);
        color.stringRepresentation = v;
        return color;
    }
}
export class ShimmedFontMetrics {
    stringWidth(v: string): number {
        return v.length * 10;
    }
    getHeight(): number {
        return 10;
    }
    getAscent(): number {
        return 10;
    }
}
export class ShimmedSize {
    height: number = 0;
    width: number = 0;
}
class ShimmedAppletCore {
    canvasEl: HTMLCanvasElement = null;
    constructor() {
        this.canvasEl = document.querySelector("canvas");
    }
    size(): ShimmedSize {
        var size = new ShimmedSize();
        size.width = this.canvasEl.width;
        size.height = this.canvasEl.height;
        return size;
    }
    showStatus(text: string): void {
        var screen = this.getGraphics();
        screen.setColor(ShimmedColor.fromString("Green"));
        screen.drawString(text, 10, 10);
    }
    requestFocus(): void { 
    }
    getGraphics(): ShimmedGraphics {
        return new ShimmedGraphics(this.canvasEl.getContext("2d"));
    }
    createImage(nWidth: number, nHeight: number): ShimmedImage {
        if (document.querySelector("canvas")) {
            return new ShimmedImage(document.body);
        }
        var div = document.createElement("div");
        var canv = document.createElement("canvas");
        canv.width = nWidth;
        canv.height = nHeight;
        div.appendChild(canv);
        document.body.appendChild(div);
        return new ShimmedImage(div);
    }
    repaint() {
        throw new Error("not implemented");
    }
}
export abstract class ShimmedApplet extends ShimmedAppletCore {
    guestSendTask: any = null;
    autoPeer = new AutoPeer("vxv7ldsv1h71ra4i");

    abstract init(): void;
    abstract run(): Promise<void>;

    public abstract handleEvent(wevent: ShimmedEvent) : Promise<boolean>;
    
    restoreFromRemote(game: ShimmedApplet) {
        Object.getOwnPropertyNames(this).forEach(propName => {
            var propType = typeof(this[propName]);
            if (propType === "number" || propType === "boolean" || propType === "string" || propName === "pointsX" || propName === "pointsY" || propName === "replayData") {
                this[propName] = game[propName];
            }
        });
        const _this: any = this;
        _this.paint && _this.paint(_this.getGraphics());
        _this.DrawSlimers && _this.DrawSlimers();
        _this.DrawGoals && _this.DrawGoals();
        _this.DrawStatus && _this.DrawStatus();
    }

    public start() {
        this.init();
        this.run();
        window["activeGame"] = this;
    }
    registerEventListeners(game: ShimmedApplet) {
        document.body.onmousedown = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 501;
            wevent.x = ev.clientX;
            wevent.y = ev.clientY;
            game.handleEvent(wevent);
        }
        document.body.onkeypress = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            game.handleEvent(wevent);
        }
        document.body.onkeyup = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            game.onEvent(wevent);
        }
    }
    private _screen: ShimmedGraphics = null;
    get screen(): ShimmedGraphics {
        this.updateGuest();
        return this._screen;
    }
    set screen(value: ShimmedGraphics) {
        this._screen = value; 
    }

    public async onEvent(event0: ShimmedEvent) {
        //event0.key = this.mapKeyCode(event0.key);
        if (this.autoPeer.connectionToHost) {
            this.autoPeer.connectionToHost.send(event0); 
            return;
        }
        await this.handleEvent(event0);
    }

    updateGuest() {
        if (this.autoPeer.connectionToGuest === null) return;
        if (this.guestSendTask) return;

        var state = this;
        this.autoPeer.connectionToGuest.send(state);
        this.guestSendTask = setTimeout(() => {
            this.autoPeer.connectionToGuest.send(this);
            this.guestSendTask = null;
        }, 0);
    }
}
export class ShimmedThread {
    constructor(private runnable: ShimmedRunnable) {
    }
    public static sleep(ms: number) {
        return new Promise(res => setTimeout(res, ms));
    }
    public start() {
        this.runnable.run();
    }
    public stop() {
    }
}
export interface ShimmedRunnable {
    run();
}
export class ShimmedSystem {
    public static out = {
        println: console.log
    }
    public static currentTimeMillis() {
        return Date.now();
    }
}