var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var wasdToJikl = {
    83: 75,
    65: 74,
    68: 76,
    87: 73
};
for (let ks in wasdToJikl) {
    let k = parseInt(ks);
    let v = wasdToJikl[k];
    wasdToJikl[k + 32] = v + 32;
}
var jiklToWasd = {};
for (let ks in wasdToJikl) {
    let k = parseInt(ks);
    let v = wasdToJikl[k];
    jiklToWasd[v] = k;
}
class WImage {
    constructor(root) {
        this.root = null;
        this.root = root;
    }
    getGraphics() {
        if (!!true)
            return new Graphics(document.querySelector("canvas")["getContext"]("2d"));
        return this.root.querySelector("canvas")["getContext"]("2d");
    }
}
class Font {
    constructor(name, v1, v2) {
        this.name = null;
        this.v1 = 0;
        this.v2 = 0;
        this.name = name;
        this.v1 = v1;
        this.v2 = v2;
    }
    getName() {
        return this.name;
    }
}
class NString {
    static Concat(things) {
        var vals = [];
        for (var i = 0; i < arguments.length; i++) {
            vals.push(arguments[i]);
        }
        return vals.join("");
    }
}
class WEvent {
}
class Graphics {
    constructor(ctx) {
        this.ctx = null;
        this.ctx = ctx;
    }
    getFontMetrics() {
        return new FontMetrics();
    }
    setColor(c) {
        this.ctx.strokeStyle = c.stringRepresentation;
        this.ctx.fillStyle = c.stringRepresentation;
    }
    fillRect(v1, v2, v3, v4) {
        this.ctx.fillRect(v1, v2, v3, v4);
    }
    drawString(v, p1, p2) {
        this.ctx.strokeText(v, p1, p2);
    }
    arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees) {
        this.ctx.beginPath();
        var centreX = x + width / 2;
        var centreY = y + height / 2;
        var radiusX = width / 2;
        var radiusY = height / 2;
        var startAngleRadians = startAngleDegrees * Math.PI / 180;
        var endAngleRadians = endAngleDegrees * Math.PI / 180;
        // TODO make this work properly
        this.ctx.arc(centreX, centreY, radiusX, startAngleRadians, endAngleRadians, true);
        //this.ctx["ellipse"](centreX, centreY, radiusX, radiusY, 0, startAngleRadians, endAngleRadians, true);
    }
    fillArc(x, y, width, height, startAngleDegrees, endAngleDegrees) {
        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
        this.ctx.fill();
    }
    fillPolygon(pointsX, pointsY, v) {
        this.ctx.beginPath();
        this.ctx.moveTo(pointsX[0], pointsY[0]);
        for (var i = 1; i < v; i++) {
            this.ctx.lineTo(pointsX[i], pointsY[i]);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
    fillOval(x, y, width, height) {
        this.fillArc(x, y, width, height, 0, 360);
    }
    drawArc(x, y, width, height, startAngleDegrees, endAngleDegrees) {
        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
        this.ctx.stroke();
    }
    drawLine(i1, v1, i2, v2) {
        this.ctx.moveTo(i1, v1);
        this.ctx.lineTo(i2, v2);
        this.ctx.stroke();
    }
    getFont() {
        return new Font(this.ctx.font, 0, 0);
    }
    setFont(font) {
        this.ctx.font = font.getName();
    }
    drawImage(backBuffer, v1, v2, p) {
    }
}
class Color {
    constructor(r, g, b) {
        this.stringRepresentation = null;
        this.stringRepresentation = `rgb(${r}, ${g}, ${b})`;
    }
    static fromString(v) {
        var color = new Color(0, 0, 0);
        color.stringRepresentation = v;
        return color;
    }
}
class FontMetrics {
    stringWidth(v) {
        return v.length * 10;
    }
    getHeight() {
        return 10;
    }
    getAscent() {
        return 10;
    }
}
class Size {
    constructor() {
        this.height = 0;
        this.width = 0;
    }
}
class Applet {
    constructor(canvasEl) {
        this.canvasEl = null;
        this.canvasEl = canvasEl;
    }
    size() {
        var size = new Size();
        size.width = this.canvasEl.width;
        size.height = this.canvasEl.height;
        return size;
    }
    showStatus(text) {
        var screen = this.getGraphics();
        screen.setColor(Color.fromString("Green"));
        screen.drawString(text, 10, 10);
    }
    requestFocus() {
    }
    getGraphics() {
        return new Graphics(this.canvasEl.getContext("2d"));
    }
    createImage(nWidth, nHeight) {
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
class SlimeGame extends Applet {
    constructor(...args) {
        super(...args);
        this.guestSendTask = null;
        this.autoPeer = new AutoPeer("vxv7ldsv1h71ra4i");
        this._screen = null;
    }
    start() {
        this.init();
        this.run();
        window["activeGame"] = this;
    }
    registerEventListeners(game) {
        document.body.onmousedown = ev => {
            var wevent = new WEvent();
            wevent.id = 501;
            wevent.x = ev.clientX;
            wevent.y = ev.clientY;
            game.handleEvent(wevent);
        };
        document.body.onkeypress = ev => {
            var wevent = new WEvent();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            game.handleEvent(wevent);
        };
        document.body.onkeyup = ev => {
            var wevent = new WEvent();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            game.handleEvent(wevent);
        };
    }
    get screen() {
        this.updateGuest();
        return this._screen;
    }
    set screen(value) {
        this._screen = value;
    }
    handleEvent(event0) {
        return __awaiter(this, void 0, void 0, function* () {
            //event0.key = this.mapKeyCode(event0.key);
            if (this.autoPeer.connectionToHost) {
                this.autoPeer.connectionToHost.send(event0);
                return;
            }
            yield this.handleEventCore(event0);
        });
    }
    updateGuest() {
        // TODO make autopeer a property
        if (this.autoPeer.connectionToGuest === null)
            return;
        if (this.guestSendTask)
            return;
        var state = this;
        this.autoPeer.connectionToGuest.send(state);
        this.guestSendTask = setTimeout(() => {
            this.autoPeer.connectionToGuest.send(this);
            this.guestSendTask = null;
        }, 0);
    }
    // TODO make sure works
    mapKeyCode(keyCode) {
        if (this.autoPeer.connectionToHost) {
            keyCode = wasdToJikl[keyCode] || keyCode;
        }
        if (this.autoPeer.connectionToGuest) {
            keyCode = jiklToWasd[keyCode] || keyCode;
        }
        return keyCode;
    }
}
//# sourceMappingURL=SlimeGame.js.map