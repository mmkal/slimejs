import AutoPeer from "./AutoPeer";

export class Image {
    root: HTMLElement = null;
    constructor(root: HTMLElement) {
        this.root = root;
    } 
    getGraphics(): Graphics {
        return new Graphics(document.querySelector("canvas")["getContext"]("2d"));
    }
    getHeight(applet: Applet) {
    }
}
export class Font {
    constructor(public name: string, public modifier: number, public size: number) {
    }
    getName(): string {
        return this.name;
    }
}
export class Event {
    id: number;
    key: number;
    x: number;
    y: number;

    target: Button;

    // todo: check the right values for these on java Event
    static LEFT = 74;
    static RIGHT = 76;
    static UP = 73;
    static DOWN = 107;
    static KEY_ACTION = 401;
    static KEY_ACTION_RELEASE = 402;
}
export class Graphics {
    constructor(public ctx: CanvasRenderingContext2D) {
    }

    getFontMetrics(): FontMetrics {
        return new FontMetrics();
    }
    
    private color: Color = Color.fromString("white");
    setColor(color: Color): void {
        this.ctx.strokeStyle = color.name;
        this.ctx.fillStyle = color.name;
        this.color = color;
    }

    private background = { color: "", size: 0 }
    fillRect(x: number, y: number, w: number, h: number): void {
        const size = w * h;
        if (size >= this.background.size) {
            this.background.color = this.color.name;
            this.background.size = size;
        }
        else if (this.color.name === this.background.color) {
            x--;
            y--;
            w++;
            h++;
        }
        this.ctx.fillRect(x, y, w, h);
    }

    drawString(text: string, x: number, y: number): void {
        this.ctx.strokeText(text, x, y);
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

        if (this.color.name === this.background.color) {
            radiusX++;
        }

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

    fillPolygon(polygon: Polygon); 
    fillPolygon(pointsX: number[], pointsY: number[], numSides: number);
    fillPolygon() {
        let polygon: Polygon;
        if (arguments.length === 1) {
            polygon = arguments[0];
        } else {
            polygon = new Polygon(arguments[0], arguments[1], arguments[2]);
        }
        this.ctx.beginPath();
        this.ctx.moveTo(polygon.xs[0], polygon.ys[0]);
        for (var i = 1; i < polygon.n; i++) {
            this.ctx.lineTo(polygon.xs[i], polygon.ys[i]);
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

    drawLine(xFrom: number, yFrom: number, xTo: number, yTo: number): void {
        this.ctx.moveTo(xFrom, yFrom);
        this.ctx.lineTo(xTo, yTo);
        this.ctx.stroke();
    }
    drawRect(x: number, y: number, w: number, h: number) {
        this.drawLine(x, y, x + w, y);
        this.drawLine(x + w, y, x + w, y + h);
        this.drawLine(x + w, y + h, x, y + h);
        this.drawLine(x, y + h, x, y);
    }

    getFont(): Font {
        return new Font(this.ctx.font, 0, Number(/\d+/.exec(this.ctx.font)[0]));
    }

    setFont(font: Font): void {
        this.ctx.font = this.ctx.font.replace(/\d+/, font.size.toString());
    }

    drawImage(backBuffer: Image, v1: number, v2: number, p: any): void {
    }
}
export class Color {
    public name: string = null;
    constructor(r: number, g: number, b: number) {
        this.name = `rgb(${r}, ${g}, ${b})`;
    }
    static fromString(v: string): Color {
        var color = new Color(0,0,0);
        color.name = v;
        return color;
    }
}
export class FontMetrics {
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
export class Size {
    constructor(public width: number, public height: number) {
    }
}
abstract class AppletCore {
    protected isInitialised = false;
    canvasEl: HTMLCanvasElement = null;
    protected readonly graphics: Graphics;
    constructor() {
        this.canvasEl = document.querySelector("canvas");
        this.graphics = new Graphics(this.canvasEl.getContext("2d"));
    }

    abstract paint(graphics: Graphics): void;

    size(): Size {
        return new Size(this.getWidth(), this.getHeight());
    }
    getImage(url: URL, path: string);
    getImage() {
        return new Image(document.body);
    }
    getWidth() {
        return this.canvasEl.width;
    }
    getHeight() {
        return this.canvasEl.height;
    }
    showStatus(text: string): void {
        var screen = this.getGraphics();
        screen.setColor(Color.fromString("Green"));
        screen.drawString(text, 10, 10);
    }
    requestFocus(): void { 
    }
    getGraphics(): Graphics {
        return this.graphics;
    }
    createImage(nWidth: number, nHeight: number): Image {
        if (document.querySelector("canvas")) {
            return new Image(document.body);
        }
        var div = document.createElement("div");
        var canv = document.createElement("canvas");
        canv.width = nWidth;
        canv.height = nHeight;
        div.appendChild(canv);
        document.body.appendChild(div);
        return new Image(div);
    }
    repaint() {
        if (!this.isInitialised) return;
        this.paint(this.getGraphics());
    }
    public getCodeBase() {
        return new URL(window.location.href + "?");
    }
    public getDocumentBase() {
        return new DocumentBase();
    }
    public getAppletContext() {
        return new AppletContext();
    }
    public getAudioClip(url: URL, name: string) {
        return new AudioClip();
    }
}
interface DrawCall {
    method: string;
    arguments: any[];
}
export abstract class Applet extends AppletCore {

    private guestSendTask: any = null;
    private autoPeer = AutoPeer.Get();

    abstract init(): void;
    abstract run(): Promise<void>;

    public start() {
        this.init();
        this.isInitialised = true;
        this.registerEventListeners();
        this.repaint();

        // bit of a hack: volleyball-original has a start() method defined which needs to be called. Call it.
        const _this: any = this;
        if (_this.start && _this.start !== Applet.prototype.start) {
            _this.start();
        }
    }

    private registerEventListeners() {
        const game = this;
        this.canvasEl.onmousedown = ev => {
            var wevent = new Event();
            wevent.id = 501;
            wevent.x = ev.offsetX;
            wevent.y = ev.offsetY;
            this.handleEvent(wevent);
        };
        document.body.onkeypress = ev => {
            var wevent = new Event();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            this.handleEvent(wevent);
        };
        document.body.onkeyup = ev => {
            var wevent = new Event();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            this.handleEvent(wevent);
        };
        this.autoPeer.onconnected = () => {
            if (this.autoPeer.isGuest) {
                this.handleEvent = async (evt) => this.autoPeer.connection.send(evt);
            } else {
                this.captureDrawCalls();
            }
        }
        this.autoPeer.ondatareceived = data => {
            this.autoPeer.isGuest ? this.handleDrawCalls(data) : this.handleEvent(data);
        };
    }

    private drawCalls = new Array<DrawCall>();
    private captureDrawCalls() {
        Object.getOwnPropertyNames(Graphics.prototype).forEach(method => {
            const original: Function = this.graphics[method];
            if (method.startsWith("get") || typeof original !== "function") return;

            this.graphics[method] = (a, b, c, d, e, f, g, h, i ,j) => {
                const args = [a, b, c, d, e, f, g, h, i, j];
                original.apply(this.graphics, args);
                this.drawCalls.push({ method: method, arguments: args });
                this.sendDrawCalls();
            };
        });
    }
    private drawCallSendTimeout: number = null;
    private sendDrawCalls() {
        if (this.drawCallSendTimeout) return;
        this.autoPeer.connection.send(this.drawCalls.splice(0, this.drawCalls.length));
        this.drawCallSendTimeout = requestAnimationFrame(() => {
            this.autoPeer.connection.send(this.drawCalls.splice(0, this.drawCalls.length));
            this.drawCallSendTimeout = null;
        });
    }

    private handleDrawCalls(calls: Array<DrawCall>): void {
        const graphics: { [method: string]: Function } = this.graphics as any;
        calls && graphics && calls.forEach(call => {
            graphics[call.method].apply(graphics, call.arguments);
        });
    }

    public handleEvent(wevent: Event) : Promise<boolean> {
        const _this: any = this;
        switch (wevent.id) {
            case 401:
            _this.keyDown(wevent, wevent.key);
            break;
            case 402:
            _this.keyUp(wevent, wevent.key);
            break;
            case 501:
            _this.mouseUp(wevent, wevent.x, wevent.y);
            break;
        }
        return Promise.resolve(false);
    }

    public screen: Graphics = null;
}
export class Thread {
    constructor(private runnable: Runnable) {
    }
    public static sleep(ms: number, b?: boolean) {
        return new Promise(res => setTimeout(res, ms));
    }
    public start() {
        this.runnable.run();
    }
    public stop() {
    }
}
export interface Runnable {
    run();
}
export class PrintStream {
    public print(s: any) { console.log(s); }    
    public println(s?: any) { console.log(s); }    
}
export class System {
    public static out = new PrintStream();
    public static currentTimeMillis() {
        return Date.now();
    }
}
export class AppletContext {
    showDocument(url: URL, str?: string) { }
}
export class DocumentBase {
    public getHost() {
        return "slimetennis.com";
    }
}
export class URL {
    constructor(public location: string) {
    }
    public openStream() {
        return new InputStream();
    }
    public toString() {
        return this.location;
    }
}
export class BufferedImage extends Image {
    constructor(public x: number, public y: number, public z: number) {
        super(null);
    }
    public getSubimage(x: number, y: number, w: number, h: number): BufferedImage {
        return this;
    }
} 
export class Vector {
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
export class Element {
    public add(el: Element) {
    }
}
export class Frame extends Element {
    public setTitle(s: string) {
    }
    public pack() {
    }
    public show() {
    }
    public dispose() {
    }
    public setLayout(layout: GridLayout) {
    }
}
export class TextField extends Element {
    constructor(size: number) {
        super();
    }
    public getText(): string {
        console.error("not implemented");
        return "?????????????";    
    }
}
export class Button extends Element {
    constructor(public label: string) {
        super();
    }
}
export class Polygon {
    constructor(public xs: number[], public ys: number[], public n: number) {
    }
}
export class InputStream {
    public close() {}
}
export class BufferedReader {
    constructor(public reader: InputStreamReader) {
    }
    public readLine(): string {
        return null;
    }
    public close() {
    }
}
export class InputStreamReader {
    constructor(public stream: InputStream) {
    }
}
export class Panel extends Element {
}
export class Label extends Element {
    constructor(public text: string) {
        super();
    }
}
export class GridLayout {
    constructor(public x: number, public y: number) {
    }
}
export class Long {
    public static parseLong(s: string) {
        return Number(s);
    }
}
export class Chars {
    public static charCodeArray(s: string): any[] {
        return s.split("").map(c => c.charCodeAt(0));
    }
}
export class ImageObserver {
}
export class Random {
    public nextInt(max: number) {
        return Math.floor(Math.random() * max);
    }
}
export class AudioClip {
    public play() {
    }
}
export class StringBuffer {
     constructor(initial?: any) {
         if (typeof initial !== "undefined") this.append(initial);
     }
     private pieces = new Array<string>();
     public append(text: any): StringBuffer {
         this.pieces.push(text);
         return this;
    }
    public toString() {
        return this.pieces.join("");
	}
}