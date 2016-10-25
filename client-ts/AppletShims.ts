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
    constructor(public name: string, public modifier: number, public size: number) {
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

    target: ShimmedButton;

    // todo: check the right values for these on java Event
    static LEFT = 74;
    static RIGHT = 76;
    static UP = 73;
    static DOWN = 107;
    static KEY_ACTION = 401;
    static KEY_ACTION_RELEASE = 402;
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

    fillPolygon(polygon: ShimmedPolygon); 
    fillPolygon(pointsX: number[], pointsY: number[], v: number);
    fillPolygon() {
        let pointsX: number[];
        let pointsY: number[];
        let v: number;
        if (arguments.length === 3) {
            pointsX = arguments[0];
            pointsY = arguments[1];
            v = arguments[2];
        } else {
            const polygon: ShimmedPolygon = arguments[0];
            pointsX = polygon.xs;
            pointsY = polygon.ys;
            v = polygon.n;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(pointsX[0], pointsY[0]);
        for (var i = 1; i < v; i++) {
            this.ctx.lineTo(pointsX[i], pointsY[i]);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawOval(x: number, y: number, width: number, height: number) {
        this.drawArc(x, y, width, height, 0, 360);
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
        return new ShimmedFont(this.ctx.font, 0, Number(/\d+/.exec(this.ctx.font)[0]));
    }

    setFont(font: ShimmedFont): void {
        this.ctx.font = this.ctx.font.replace(/\d+/, font.size.toString());
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
    constructor(public width: number, public height: number) {
    }
}
abstract class ShimmedAppletCore {
    protected isInitialised = false;
    canvasEl: HTMLCanvasElement = null;
    constructor() {
        this.canvasEl = document.querySelector("canvas");
    }

    abstract paint(graphics: ShimmedGraphics): void;

    size(): ShimmedSize {
        return new ShimmedSize(this.getWidth(), this.getHeight());
    }
    getWidth() {
        return this.canvasEl.width;
    }
    getHeight() {
        return this.canvasEl.height;
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
        if (!this.isInitialised) return;
        this.paint(this.getGraphics());
    }
    public getCodeBase() {
        return new ShimmedURL(window.location.href + "?");
    }
    public getDocumentBase() {
        return new ShimmedDocumentBase();
    }
    public getAppletContext() {
        return new ShimmedAppletContext();
    }
}
export abstract class ShimmedApplet extends ShimmedAppletCore {
    private guestSendTask: any = null;
    private autoPeer = AutoPeer.Get();

    abstract init(): void;
    abstract run(): Promise<void>;

    public abstract handleEvent(wevent: ShimmedEvent) : Promise<boolean>;

    public start() {
        this.init();
        this.isInitialised = true;
        this.registerEventListeners();
        this.repaint();
    }

    private registerEventListeners() {
        const game = this;
        this.canvasEl.onmousedown = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 501;
            wevent.x = ev.offsetX;
            wevent.y = ev.offsetY;
            this.onEvent(wevent);
        };
        document.body.onkeypress = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            this.onEvent(wevent);
        };
        document.body.onkeyup = ev => {
            var wevent = new ShimmedEvent();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            this.onEvent(wevent);
        };
    }
    private _screen: ShimmedGraphics = null;
    public get screen(): ShimmedGraphics {
        this.updateGuest();
        return this._screen;
    }
    public set screen(value: ShimmedGraphics) {
        this._screen = value; 
    }

    public onEvent(event0: ShimmedEvent) {
        if (this.autoPeer.isGuest) {
            this.autoPeer.connection.send(event0); 
            //return;
        }
        this.handleEvent(event0);
    }
    
    public restoreFromRemote(state: ShimmedApplet) {
        Object.keys(state).forEach(k => this[k] = state[k]);
        this.repaint();
        this.run();
    }

    private updateGuest() {
        if (!this.autoPeer.isHost) return;
        if (this.guestSendTask) return;

        function getState(applet: ShimmedApplet) {
            const state = {};
            Object.getOwnPropertyNames(applet).forEach(propName => {
                const propType = typeof(applet[propName]);
                if (propType === "number" || propType === "boolean" || propType === "string" || propName === "pointsX" || propName === "pointsY" || propName === "replayData") {
                    state[propName] = applet[propName];
                }
            });
            return state;
        }
        this.autoPeer.connection.send(getState(this));
        this.guestSendTask = setTimeout(() => {
            this.autoPeer.connection.send(getState(this));
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
export class ShimmedPrintStream {
    public print(s: any) { console.log(s); }    
    public println(s?: any) { console.log(s); }    
}
export class ShimmedSystem {
    public static out = new ShimmedPrintStream();
    public static currentTimeMillis() {
        return Date.now();
    }
}
export class ShimmedAppletContext {
    showDocument(url: ShimmedURL, str: string) { }
}
export class ShimmedDocumentBase {
    public getHost() {
        return "slimetennis.com";
    }
}
export class ShimmedURL {
    constructor(public location: string) {
    }
    public openStream() {
        return new ShimmedInputStream();
    }
    public toString() {
        return this.location;
    }
}
export class ShimmedBufferedImage extends ShimmedImage {
    constructor(public x: number, public y: number, public z: number) {
        super(null);
    }
    public getSubimage(x: number, y: number, w: number, h: number): ShimmedBufferedImage {
        return this;
    }
} 
export class ShimmedVector {
    private arr = new Array<number[]>();
    constructor(n: number) {
    }
    public get(i: number) {
        return this.arr[i];
    }
    public size() {
        return this.arr.length;
    }
    public add(numbers: number[]) {
        this.arr.push(numbers);
    }
    public removeAllElements() {
        this.arr = [];
    }
}
export class ShimmedElement {
    public add(el: ShimmedElement) {
    }
}
export class ShimmedFrame extends ShimmedElement {
    public setTitle(s: string) {
    }
    public pack() {
    }
    public show() {
    }
    public dispose() {
    }
    public setLayout(layout: ShimmedGridLayout) {
    }
}
export class ShimmedTextField extends ShimmedElement {
    constructor(size: number) {
        super();
    }
    public getText(): string {
        console.error("not implemented");
        return "?????????????";    
    }
}
export class ShimmedButton extends ShimmedElement {
    constructor(public label: string) {
        super();
    }
}
export class ShimmedPolygon {
    constructor(public xs: number[], public ys: number[], public n: number) {
    }
}
export class ShimmedInputStream {
    public close() {}
}
export class ShimmedBufferedReader {
    constructor(public reader: ShimmedInputStreamReader) {
    }
    public readLine(): string {
        return null;
    }
    public close() {
    }
}
export class ShimmedInputStreamReader {
    constructor(public stream: ShimmedInputStream) {
    }
}
export class ShimmedPanel extends ShimmedElement {
}
export class ShimmedLabel extends ShimmedElement {
    constructor(public text: string) {
        super();
    }
}
export class ShimmedGridLayout {
    constructor(public x: number, public y: number) {
    }
}
export class ShimmedLong {
    public static parseLong(s: string) {
        return Number(s);
    }
}
export class ShimmedChars {
    public static charCodeArray(s: string) {
        return s.split("").map(c => c.charCodeAt(0));
    }
}