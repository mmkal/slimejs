class WImage {
    root: HTMLElement = null;
    constructor(root: HTMLElement) {
        this.root = root;
    } 
    getGraphics(): Graphics {
        if(!!true) return new Graphics(document.querySelector("canvas")["getContext"]("2d"));
        return this.root.querySelector("canvas")["getContext"]("2d");
    }
}
class Font {
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
class NString {
    public static Concat(things: any){
        var vals = [];
        for (var i = 0; i < arguments.length; i++) {
            vals.push(arguments[i]);
        }
        return vals.join("");
    }
}
class WEvent {
    id: number;
    key: number;
    x: number;
    y: number;
}
class Graphics {
    public ctx: CanvasRenderingContext2D = null;
    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    getFontMetrics(): FontMetrics {
        return new FontMetrics();
    }
    
    setColor(c: Color): void {
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

    getFont(): Font {
        return new Font(this.ctx.font, 0, 0);
    }

    setFont(font: Font): void {
        this.ctx.font = font.getName();
    }

    drawImage(backBuffer: WImage, v1: number, v2: number, p: any): void {

    }
}
class Color {
    public stringRepresentation: string = null;
    constructor(r: number, g: number, b: number)
    {
        this.stringRepresentation = `rgb(${r}, ${g}, ${b})`;
    }
    static fromString(v: string): Color
    {
        var color = new Color(0,0,0);
        color.stringRepresentation = v;
        return color;
    }
}
class FontMetrics {
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
class Size {
    height: number = 0;
    width: number = 0;
}
class Applet {
    canvasEl: HTMLCanvasElement = null;
    constructor(canvasEl: HTMLCanvasElement)
    {
        this.canvasEl = canvasEl;
    }
    size(): Size
    {
        var size = new Size();
        size.width = this.canvasEl.width;
        size.height = this.canvasEl.height;
        return size;
    }
    showStatus(text: string): void
    {
        var screen = this.getGraphics();
        screen.setColor(Color.fromString("Green"));
        screen.drawString(text, 10, 10);
    }
    requestFocus(): void
    {
        
    }
    getGraphics(): Graphics
    {
        return new Graphics(this.canvasEl.getContext("2d"));
    }
    createImage(nWidth: number, nHeight: number): WImage
    {
        if (document.querySelector("canvas")) {
            return new WImage(document.body);
        }
        var div = document.createElement("div");
        var canv = document.createElement("canvas");
        canv.width = nWidth;
        canv.height = nHeight;
        div.appendChild(canv);
        document.body.appendChild(div);
        return new WImage(div);
    }
}
abstract class SlimeGame extends Applet {
    guestSendTask: number = null;
    autoPeer = new AutoPeer("vxv7ldsv1h71ra4i");

    abstract init(): void;
    abstract run(): Promise<void>;
    abstract handleEventCore(wevent: WEvent);
    abstract restoreFromRemote(game: SlimeGame);
    public start() {
        this.init();
        this.run();
        window["activeGame"] = this;
    }
    registerEventListeners(game: SlimeGame) {
        document.body.onmousedown = ev => {
            var wevent = new WEvent();
            wevent.id = 501;
            wevent.x = ev.clientX;
            wevent.y = ev.clientY;
            game.handleEvent(wevent);
        }
        document.body.onkeypress = ev => {
            var wevent = new WEvent();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            game.handleEvent(wevent);
        }
        document.body.onkeyup = ev => {
            var wevent = new WEvent();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            game.handleEvent(wevent);
        }
    }
    private _screen: Graphics = null;
    get screen(): Graphics {
        this.updateGuest();
        return this._screen;
    }
    set screen(value: Graphics) {
        this._screen = value; 
    }

    async handleEvent(event0: WEvent) {
        //event0.key = this.mapKeyCode(event0.key);
        if (this.autoPeer.connectionToHost) {
            this.autoPeer.connectionToHost.send(event0); 
            return;
        }
        await this.handleEventCore(event0);
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

    // TODO make sure works
    // mapKeyCode(keyCode: number) {
    //     if (this.autoPeer.connectionToHost) {
    //         keyCode = wasdToJikl[keyCode] || keyCode;
    //     }
    //     if (this.autoPeer.connectionToGuest) {
    //         keyCode = jiklToWasd[keyCode] || keyCode;
    //     }
    //     return keyCode;
    // }
}