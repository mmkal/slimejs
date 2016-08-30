/// <reference path="typings/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var guestSendTask = null;
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
class AutoPeer {
    constructor(apiKey) {
        this.connectionToHost = null;
        this.connectionToGuest = null;
        this.peerOptions = { key: "" };
        this.localPeers = new Set();
        this.peerOptions = { key: apiKey };
    }
    get isAlreadyConnected() {
        return !!this.connectionToHost || !!this.connectionToGuest;
    }
    connect2(game) {
        return __awaiter(this, void 0, void 0, function* () {
            let hostPeer = null;
            let conn = null;
            for (let id = 0; conn === null && id < 3; id++) {
                if (this.isAlreadyConnected) {
                    return;
                }
                conn = yield this.tryConnectToHost(id);
                if (conn === null && hostPeer === null) {
                    const hostId = "host" + id;
                    console.log(hostId + " seems to be an available host id, I'll establish myself as that.");
                    hostPeer = new Peer("host" + id, this.peerOptions);
                }
            }
            if (conn) {
                conn.serialization = "json";
                this.connectionToHost = conn;
                conn.on("data", (hostGameState) => {
                    game.restoreFromRemote(hostGameState);
                });
                return;
            }
            console.log("Establishing self as host");
            conn = yield this.connectToGuest(hostPeer);
            if (conn) {
                conn.serialization = "json";
                this.connectionToGuest = conn;
                conn.on("data", (wevent) => {
                    game.handleEvent(wevent);
                });
            }
            if (!conn) {
                console.error("Couldn't connect as guest or host. Try refreshing.");
            }
        });
    }
    connect88(game) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Trying to find an existing host...");
            let conn = yield this.findHost();
            if (conn) {
                conn.serialization = "json";
                this.connectionToHost = conn;
                conn.on("data", (hostGameState) => {
                    game.restoreFromRemote(hostGameState);
                });
                return;
            }
            console.log("Establishing self as host");
            conn = yield this.tryBecomeHost();
            if (conn) {
                conn.serialization = "json";
                this.connectionToGuest = conn;
                conn.on("data", (wevent) => {
                    game.handleEvent(wevent);
                });
            }
        });
    }
    tryConnectToHost(id) {
        const hostId = "host" + id;
        const guestId = "guest" + Math.random().toString().substring(2);
        this.localPeers.add(guestId);
        const connectionDebugInfo = hostId + " as " + guestId;
        var peer = new Peer(guestId, this.peerOptions);
        peer;
        console.log("Trying to connect to " + connectionDebugInfo);
        return new Promise((complete, error) => {
            const conn = peer.connect(hostId);
            const tooSlowTimeout = setTimeout(() => {
                console.log("Too slow to connect to " + connectionDebugInfo);
                complete(null);
            }, 3000);
            conn.on("open", () => {
                console.log("Connection opened to " + connectionDebugInfo);
                conn.on("data", (success) => {
                    clearTimeout(tooSlowTimeout);
                    if (success) {
                        console.log("Connection to " + connectionDebugInfo + " successful.");
                        complete(conn);
                    }
                    else {
                        console.log("Connection to " + connectionDebugInfo + " rejected/failed.");
                        complete(null);
                    }
                });
            });
        }).then((conn) => {
            if (conn) {
                console.log("I am " + peer.id + " and I am now connected to " + conn.peer);
            }
            else {
                console.log("Destroying peer " + peer.id);
                peer.destroy();
                peer.disconnect();
            }
            return conn;
        });
    }
    findHost() {
        return __awaiter(this, void 0, void 0, function* () {
            let conn = null;
            for (let id = 0; conn === null && id < 3; id++) {
                conn = yield this.tryConnectToHost(id);
            }
            return conn;
        });
    }
    connectToGuest(hostPeer) {
        if (this.isAlreadyConnected) {
            return;
        }
        console.log("Waiting for guest connections");
        return new Promise((complete, error) => {
            hostPeer.on("connection", conn => {
                if (this.localPeers.has(conn.peer)) {
                    console.log("Tried to connect to self. Ignoring connection.");
                    return;
                }
                conn.on("open", () => {
                    if (this.isAlreadyConnected) {
                        console.log("Guest tried to open connection but I'm already connected, rejecting.");
                        conn.send(false);
                        return;
                    }
                    console.log("Guest opened connection, accepting...");
                    conn.send(true);
                    console.log("I am " + hostPeer.id + " and I am now connected to " + conn.peer);
                    complete(conn);
                });
            });
        });
    }
    tryBecomeHost() {
        return __awaiter(this, void 0, Promise, function* () {
            let peer = null;
            for (let id = 0; peer === null && id < 3; id++) {
                let conn = yield this.tryConnectToHost(id);
                if (conn === null) {
                    const hostId = "host" + id;
                    console.log(hostId + " seems to be an available host id, I'll establish myself as that.");
                    peer = new Peer("host" + id, this.peerOptions);
                }
            }
            if (peer === null) {
                throw "Too many hosts already!";
            }
            return yield this.connectToGuest(peer);
        });
    }
}
var autoPeer = new AutoPeer("tlr3fwfyk1g1ra4i");
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
    constructor(p, v1, v2) {
        this.p = null;
        this.v1 = 0;
        this.v2 = 0;
        this.p = p;
        this.v1 = v1;
        this.v2 = v2;
    }
    getName() {
        return this.p;
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
        this.ctx["ellipse"](centreX, centreY, radiusX, radiusY, 0, startAngleRadians, endAngleRadians, true);
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
    registerEventListeners(wcss) {
        document.body.onmousedown = ev => {
            var wevent = new WEvent();
            wevent.id = 501;
            wevent.x = ev.clientX;
            wevent.y = ev.clientY;
            wcss.handleEvent(wevent);
        };
        document.body.onkeypress = ev => {
            var wevent = new WEvent();
            wevent.id = 401;
            wevent.key = ev.keyCode;
            wcss.handleEvent(wevent);
        };
        document.body.onkeyup = ev => {
            var wevent = new WEvent();
            wevent.id = 402;
            wevent.key = ev.keyCode;
            wcss.handleEvent(wevent);
        };
    }
    size() {
        var size = new Size();
        size.width = this.canvasEl.width;
        size.height = this.canvasEl.height;
        return size;
    }
    showStatus(a = null, b = null) {
        console.log(a + " " + b);
    }
    requestFocus() {
    }
    getGraphics() {
        return new Graphics(this.canvasEl.getContext("2d"));
    }
    createImage(nWidth, nHeight) {
        var div = document.createElement("div");
        var canv = document.createElement("canvas");
        canv.width = nWidth;
        canv.height = nHeight;
        div.appendChild(canv);
        document.body.appendChild(div);
        return new WImage(div);
    }
}
class WorldCupSoccerSlime extends Applet {
    constructor() {
        super(document.querySelector("canvas"));
        this.isStarted = false;
        this.nWidth = 0;
        this.nHeight = 0;
        this.p1Score = 0;
        this.p2Score = 0;
        this.p1X = 0;
        this.p2X = 0;
        this.p1Y = 0;
        this.p2Y = 0;
        this.p1Col = 0;
        this.p2Col = 0;
        this.slimeColText = [
            "Argentina", "Belgium", "Australia", "Cameroon", "P.R. of China", "Costa Rica", "Croatia", "Denmark", "Eucador", "Mexico", "France", "USA", "Italy", "Japan", "Russia", "Paraguay", "Poland", "Portugal", "Ireland",
            "Saudi Arabia", "Senegal", "Slovenia", "Spain", "Seth Efrica", "South Corea", "Sveden", "Tunisia", "Turkey", "Uruguay", "Brazil", "England", "Germany"
        ];
        this.darkRed = null;
        this.darkGreen = null;
        this.darkBlue = null;
        this.slimaryCols = null;
        this.secondaryCols = null;
        this.p1OldX = 0;
        this.p2OldX = 0;
        this.p1OldY = 0;
        this.p2OldY = 0;
        this.p1XV = 0;
        this.p2XV = 0;
        this.p1YV = 0;
        this.p2YV = 0;
        this.ballX = 0;
        this.ballY = 0;
        this.ballVX = 0;
        this.ballVY = 0;
        this.ballOldX = 0;
        this.ballOldY = 0;
        this.screen88 = null;
        this._screen = null;
        this.promptMsg = null;
        this.replayData = null;
        this.replayPos = 0;
        this.replayStart = 0;
        this.mousePressed = false;
        this.fCanChangeCol = false;
        this.fInPlay = false;
        this.p1Blink = 0;
        this.p2Blink = 0;
        this.fP1Sticky = false;
        this.fP2Sticky = false;
        this.fP1Touched = false;
        this.fP2Touched = false;
        this.p1TouchingGoal = 0;
        this.p2TouchingGoal = 0;
        this.gameThread = null;
        this.fEndGame = false;
        this.fPlayOn = false;
        this.nScoreX = 0;
        this.startTime = 0;
        this.gameTime = 0;
        this.scoringRun = 0;
        this.frenzyCol = 0;
        this.playOnTicks = 0;
        this.backBuffer = null;
        this.JUMPVEL = 0;
        this.SLIMEVEL = 0;
        this.GRAVITY = 0;
        this.gameLength = 0;
        this.worldCup = false;
        this.worldCupRound = 0;
        this.fExtraTime = false;
        this.fGoldenGoal = false;
        this.fSuperSlime = false;
        this.doubleBuffered = false;
        this.pointsX = null;
        this.pointsY = null;
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
        this.pointsX = new Array(4);
        for (var _ai = 0; _ai < this.pointsX.length; ++_ai)
            this.pointsX[_ai] = 0;
        this.pointsY = new Array(4);
        for (var _ai = 0; _ai < this.pointsY.length; ++_ai)
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
    static go() {
        var wcss = new WorldCupSoccerSlime();
        wcss.init();
        wcss.run();
    }
    get screen() {
        this.updateGuest();
        return this._screen;
    }
    set screen(value) {
        this._screen = value;
    }
    updateGuest() {
        if (autoPeer.connectionToGuest === null)
            return;
        if (guestSendTask)
            return;
        var state = this;
        autoPeer.connectionToGuest.send(state);
        guestSendTask = setTimeout(() => {
            autoPeer.connectionToGuest.send(state);
            guestSendTask = null;
        }, 4);
    }
    restoreFromRemote(wcss) {
        Object.getOwnPropertyNames(this).forEach(propName => {
            var propType = typeof (this[propName]);
            if (propType === "number" || propType === "boolean" || propType === "string" || propName === "pointsX" || propName === "pointsY" || propName === "replayData") {
                this[propName] = wcss[propName];
            }
        });
        this.paint(super.getGraphics());
        this.DrawSlimers();
        this.DrawGoals();
        this.DrawStatus();
    }
    mapKeyCode(keyCode) {
        if (autoPeer.connectionToHost) {
            keyCode = wasdToJikl[keyCode] || keyCode;
        }
        if (autoPeer.connectionToGuest || this.worldCup) {
            keyCode = jiklToWasd[keyCode] || keyCode;
        }
        return keyCode;
    }
    initStuff() {
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
    drawButtons() {
        var array = [
            "1 minute", "2 minutes", "be guest", "be host", "World Cup"
        ];
        var fontMetrics = this.screen.getFontMetrics();
        var color = new Color(0, 0, 128);
        for (var i = 0; i < 5; i = i + 1) {
            this.screen.setColor(color);
            this.screen.fillRect((2 * i + 1) * this.nWidth / 10 - this.nWidth / 12, this.nHeight * 2 / 10, this.nWidth / 6, this.nHeight / 10);
            this.screen.setColor(Color.fromString("white"));
            this.screen.drawString(array[i], (2 * i + 1) * this.nWidth / 10 - fontMetrics.stringWidth(array[i]) / 2, this.nHeight * 5 / 20 + fontMetrics.getHeight() / 2);
        }
        this.flip();
    }
    setupAsGuest() {
        var peer = new Peer("guest", { key: "tlr3fwfyk1g1ra4i" });
        var conn = peer.connect("host");
        conn.serialization = "json";
        conn.on("open", () => {
            console.log("I am " + peer.id + " and I am connected to host");
            autoPeer.connectionToHost = conn;
            conn.on("data", (wcss) => {
                this.restoreFromRemote(wcss);
            });
        });
    }
    setupAsHost() {
        var peer = new Peer("host", { key: "tlr3fwfyk1g1ra4i" });
        peer.on("connection", conn => {
            conn.on("open", () => {
                console.log("I am " + peer.id + " and I am connected to guest");
                autoPeer.connectionToGuest = conn;
                conn.on("data", (wevent) => {
                    this.handleEvent(wevent);
                });
            });
        });
    }
    testButton(i, j) {
        var result;
        for (var k = 0; k < 5; k = k + 1) {
            var flag = i > (2 * k + 1) * this.nWidth / 10 - this.nWidth / 12 && i < (2 * k + 1) * this.nWidth / 10 + this.nWidth / 12 && j > this.nHeight * 2 / 10 && j < this.nHeight * 3 / 10;
            if (flag) {
                if (k === 0) {
                    autoPeer.connect2(this);
                    return;
                }
                if (k === 2) {
                    this.setupAsGuest();
                    return;
                }
                if (k === 3) {
                    this.setupAsHost();
                    return;
                }
                var flag2 = k === 4;
                if (flag2) {
                    this.gameLength = 120000;
                    this.worldCup = true;
                }
                else {
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
    handleEvent(event0) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            //event0.key = this.mapKeyCode(event0.key);
            if (autoPeer.connectionToHost) {
                autoPeer.connectionToHost.send(event0);
                return;
            }
            var id = event0.id;
            var flag = id === 503;
            if (flag) {
                _super("showStatus").call(this, "Slime Volleyball 2-Player: Soccer Slime, by Quin Pendragon: tartarus.uwa.edu.au/~fractoid", null);
                _super("requestFocus").call(this);
            }
            else {
                var flag2 = id === 501;
                if (flag2) {
                    this.mousePressed = true;
                    var flag3 = this.fInPlay || !this.testButton(event0.x, event0.y);
                    if (!flag3) {
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
                        this.paint(_super("getGraphics").call(this));
                        yield this.ThreadSleep(100);
                        this.gameThread = "something";
                        yield this.run();
                    }
                }
                else {
                    var flag4 = id === 401 || id === 403;
                    if (flag4) {
                        yield this.HandleCanChangeColKeypressStuff(event0);
                        var flag5 = this.fEndGame;
                        if (!flag5) {
                            var text = yield this.HandleInGameKeyPress(event0);
                        }
                    }
                    else {
                        var flag6 = id === 402 || id === 404;
                        if (flag6) {
                            var a = this.HandleKeyRelease(event0);
                            var flag7 = a === "label0";
                            if (!flag7) {
                                var flag8 = this.p2XV > 0 && !this.worldCup;
                                if (flag8) {
                                    this.p2XV = 0;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    HandleKeyRelease(event0) {
        var key = event0.key;
        var flag = key === 83 || key === 115;
        var result;
        if (flag) {
            this.fP1Sticky = false;
            result = "label0";
        }
        else {
            var flag2 = key === 75 || key === 107 || key === 1005;
            if (flag2) {
                this.fP2Sticky = false;
                result = "label0";
            }
            else {
                var flag3 = key === 65 || key === 97;
                if (flag3) {
                    var flag4 = this.p1XV < 0;
                    if (flag4) {
                        this.p1XV = 0;
                    }
                    result = "label0";
                }
                else {
                    var flag5 = key === 68 || key === 100;
                    if (flag5) {
                        var flag6 = this.p1XV > 0;
                        if (flag6) {
                            this.p1XV = 0;
                        }
                        result = "label0";
                    }
                    else {
                        var flag7 = key === 74 || key === 106 || key === 1006;
                        if (flag7) {
                            var flag8 = this.p2XV < 0 && !this.worldCup;
                            if (flag8) {
                                this.p2XV = 0;
                            }
                            result = "label0";
                        }
                        else {
                            var flag9 = key === 76 || key === 108 || key === 1007;
                            if (flag9) {
                                result = null;
                            }
                            else {
                                result = null;
                            }
                        }
                    }
                }
            }
        }
        return result;
    }
    HandleInGameKeyPress(event0) {
        return __awaiter(this, void 0, void 0, function* () {
            var key = event0.key;
            var flag = key === 83 || key === 115;
            var result;
            if (flag) {
                this.fP1Sticky = true;
                result = "label0";
            }
            else {
                var flag2 = key === 75 || key === 107 || key === 1005;
                if (flag2) {
                    var flag3 = !this.worldCup;
                    if (flag3) {
                        this.fP2Sticky = true;
                    }
                    result = "label0";
                }
                else {
                    var flag4 = key === 65 || key === 97;
                    if (flag4) {
                        this.p1XV = -this.SLIMEVEL;
                        result = "label0";
                    }
                    else {
                        var flag5 = key === 68 || key === 100;
                        if (flag5) {
                            this.p1XV = this.SLIMEVEL;
                            result = "label0";
                        }
                        else {
                            var flag6 = key === 87 || key === 119;
                            if (flag6) {
                                var flag7 = this.p1Y === 0;
                                if (flag7) {
                                    this.p1YV = this.JUMPVEL;
                                }
                                result = "label0";
                            }
                            else {
                                var flag8 = key === 74 || key === 106 || key === 1006;
                                if (flag8) {
                                    var flag9 = !this.worldCup;
                                    if (flag9) {
                                        this.p2XV = -this.SLIMEVEL;
                                    }
                                    result = "label0";
                                }
                                else {
                                    var flag10 = key === 76 || key === 108 || key === 1007;
                                    if (flag10) {
                                        var flag11 = !this.worldCup;
                                        if (flag11) {
                                            this.p2XV = this.SLIMEVEL;
                                        }
                                        result = "label0";
                                    }
                                    else {
                                        var flag12 = key === 73 || key === 105 || key === 1004;
                                        if (flag12) {
                                            var flag13 = this.p2Y === 0 && !this.worldCup;
                                            if (flag13) {
                                                this.p2YV = this.JUMPVEL;
                                            }
                                            result = null;
                                        }
                                        else {
                                            var flag14 = key === 66 || key === 98;
                                            if (flag14) {
                                                yield this.toggleBuffering();
                                                result = null;
                                            }
                                            else {
                                                var flag15 = key === 32;
                                                if (flag15) {
                                                    this.mousePressed = true;
                                                    result = null;
                                                }
                                                else {
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
        });
    }
    clearAndRepaint() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _super("getGraphics").call(this).ctx.clearRect(0, 0, _super("size").call(this).width, _super("size").call(this).height);
            yield this.paint(_super("getGraphics").call(this));
        });
    }
    HandleCanChangeColKeypressStuff(event0) {
        return __awaiter(this, void 0, void 0, function* () {
            var flag = !this.fCanChangeCol;
            if (!flag) {
                var key = event0.key;
                var flag2 = key === 83;
                if (flag2) {
                }
                var flag3 = key === 115;
                if (flag3) {
                    do {
                        this.p1Col = ((this.p1Col === this.slimaryCols.length - 1) ? 0 : (this.p1Col + 1));
                    } while (this.p1Col === this.p2Col);
                    this.drawScores();
                    yield this.clearAndRepaint();
                }
                else {
                    var flag4 = key === 87;
                    if (flag4) {
                    }
                    var flag5 = key === 119;
                    if (flag5) {
                        do {
                            this.p1Col = ((this.p1Col !== 0) ? (this.p1Col - 1) : (this.slimaryCols.length - 1));
                        } while (this.p1Col === this.p2Col);
                        this.drawScores();
                        yield this.clearAndRepaint();
                    }
                    else {
                        var flag6 = key === 75;
                        if (flag6) {
                        }
                        var flag7 = key === 107;
                        if (flag7) {
                        }
                        var flag8 = key === 1005;
                        if (flag8) {
                            do {
                                this.p2Col = ((this.p2Col === this.slimaryCols.length - 1) ? 0 : (this.p2Col + 1));
                            } while (this.p2Col === this.p1Col);
                            this.drawScores();
                            yield this.clearAndRepaint();
                        }
                        else {
                            var flag9 = key === 73;
                            if (flag9) {
                            }
                            var flag10 = key === 105;
                            if (flag10) {
                            }
                            var flag11 = key === 1004;
                            if (flag11) {
                                do {
                                    this.p2Col = ((this.p2Col !== 0) ? (this.p2Col - 1) : (this.slimaryCols.length - 1));
                                } while (this.p1Col === this.p2Col);
                                this.drawScores();
                                yield this.clearAndRepaint();
                            }
                            else {
                                var flag12 = key === 54;
                                if (flag12) {
                                    this.fSuperSlime = !this.fSuperSlime;
                                    yield this.clearAndRepaint();
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    DrawSlimers() {
        var num = this.nWidth / 10;
        var num2 = this.nHeight / 10;
        var num3 = this.nWidth / 50;
        var num4 = this.nHeight / 25;
        var num5 = this.ballX * this.nWidth / 1000;
        var num6 = 4 * this.nHeight / 5 - this.ballY * this.nHeight / 1000;
        var num7 = this.p1OldX * this.nWidth / 1000 - num / 2;
        var num8 = 7 * this.nHeight / 10 - this.p1OldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 2 * this.nHeight / 5, this.nWidth, 2 * this.nHeight / 5);
        // this.screen.fillRect(num7, num8, num, num2);
        num7 = this.p2OldX * this.nWidth / 1000 - num / 2;
        num8 = 7 * this.nHeight / 10 - this.p2OldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 2 * this.nHeight / 5, this.nWidth, 2 * this.nHeight / 5);
        // this.screen.fillRect(num7, num8, num, num2);
        var flag = !this.fEndGame;
        if (flag) {
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
        var num9 = this.p1X + 38;
        var num10 = this.p1Y - 60;
        num7 = num9 * this.nWidth / 1000;
        num8 = 7 * this.nHeight / 10 - num10 * this.nHeight / 1000;
        var num11 = num7 - num5;
        var num12 = num8 - num6;
        var num13 = Math.sqrt((num11 * num11 + num12 * num12));
        var flag2 = WorldCupSoccerSlime.Mathrandom() < 0.01;
        var flag3 = flag2;
        if (flag3) {
            this.p1Blink = 5;
        }
        var flag4 = this.p1Blink === 0;
        if (flag4) {
            this.screen.setColor(Color.fromString("white"));
            this.screen.fillOval(num7 - num3, num8 - num4, num3, num4);
            var flag5 = num13 > 0 && !flag2;
            if (flag5) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(num7 - 4 * num11 / num13 - 3 * num3 / 4, num8 - 4 * num12 / num13 - 3 * num4 / 4, num3 / 2, num4 / 2);
            }
        }
        else {
            this.p1Blink = this.p1Blink - 1;
        }
        var flag6 = this.p1Score > this.p2Score + 2;
        if (flag6) {
            var j = this.p1X * this.nWidth / 1000;
            var num14 = 7 * this.nHeight / 10 - (this.p1Y - 40) * this.nHeight / 1000;
            var j2 = this.nWidth / 20;
            var l = this.nHeight / 20;
            var num15 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(j, num14 + num15, j2, l, 150, 30);
            } while ((num15 = num15 + 1) < 3);
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
        num13 = Math.sqrt((num11 * num11 + num12 * num12));
        flag2 = (WorldCupSoccerSlime.Mathrandom() < 0.01);
        var flag7 = flag2;
        if (flag7) {
            this.p2Blink = 5;
        }
        var flag8 = this.p2Blink === 0;
        if (flag8) {
            this.screen.setColor(flag2 ? Color.fromString("gray") : Color.fromString("white"));
            this.screen.fillOval(num7 - num3, num8 - num4, num3, num4);
            var flag9 = num13 > 0 && !flag2;
            if (flag9) {
                this.screen.setColor(Color.fromString("black"));
                this.screen.fillOval(num7 - 4 * num11 / num13 - 3 * num3 / 4, num8 - 4 * num12 / num13 - 3 * num4 / 4, num3 / 2, num4 / 2);
            }
        }
        else {
            this.p2Blink = this.p2Blink - 1;
        }
        var flag10 = this.p2Score > this.p1Score + 2;
        if (flag10) {
            var num16 = this.nWidth / 20;
            var l2 = this.nHeight / 20;
            var j3 = this.p2X * this.nWidth / 1000 - num16;
            var num17 = 7 * this.nHeight / 10 - (this.p2Y - 40) * this.nHeight / 1000;
            var num18 = 0;
            do {
                this.screen.setColor(Color.fromString("black"));
                this.screen.drawArc(j3, num17 + num18, num16, l2, 150, 10);
            } while ((num18 = num18 + 1) < 3);
        }
        this.DrawGoals();
    }
    paint(g) {
        this.nWidth = super.size().width;
        this.nHeight = super.size().height;
        this.screen.setColor(Color.fromString("blue"));
        this.screen.fillRect(0, 0, this.nWidth, 4 * this.nHeight / 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, 4 * this.nHeight / 5, this.nWidth, this.nHeight / 5);
        this.screen.setColor(Color.fromString("white"));
        this.drawScores();
        var flag = !this.fInPlay;
        if (flag) {
            this.DrawSlimers();
            this.drawButtons();
        }
        this.DrawGoals();
        this.drawPrompt();
        var flag2 = !this.fInPlay;
        if (flag2) {
            var fontMetrics = this.screen.getFontMetrics();
            this.screen.setColor(Color.fromString("white"));
            var flag3 = this.fSuperSlime;
            if (flag3) {
                this.screen.drawString("Super Soccer Slime!", this.nWidth / 2 - fontMetrics.stringWidth("Super Soccer Slime!") / 2, this.nHeight / 2 - fontMetrics.getHeight());
            }
            else {
                this.screen.drawString("Soccer Slime!", this.nWidth / 2 - fontMetrics.stringWidth("Soccer Slime!") / 2, this.nHeight / 2 - fontMetrics.getHeight());
            }
            this.screen.setColor(Color.fromString("white"));
            fontMetrics = this.screen.getFontMetrics();
            this.screen.drawString("Written by Quin Pendragon", this.nWidth / 2 - fontMetrics.stringWidth("Written by Quin Pendragon") / 2, this.nHeight / 2 + fontMetrics.getHeight() * 2);
        }
        this.flip();
    }
    destroy() {
        this.gameThread = null;
    }
    ReplayFrame(i, j, k, l, i1, flag) {
        return __awaiter(this, void 0, void 0, function* () {
            if (flag) {
                this.ballX = -1000;
                this.ballOldX = 500;
                this.ballY = -1000;
                this.ballOldY = 500;
                this.p1OldX = (this.p1OldY = (this.p2OldX = (this.p2OldY = -10000)));
            }
            else {
                var num = (i === 0) ? 199 : (i - 1);
                this.p1OldX = this.replayData[num][0];
                this.p1OldY = this.replayData[num][1];
                this.p2OldX = this.replayData[num][2];
                this.p2OldY = this.replayData[num][3];
                var flag2 = i === 0;
                if (flag2) {
                    this.ballOldX = 500;
                    this.ballOldY = 200;
                }
                else {
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
            var flag3 = i / 10 % 2 > 0;
            if (flag3) {
                this.screen.setColor(Color.fromString("red"));
                this.screen.drawString("Replay...", j, k);
            }
            else {
                this.screen.setColor(Color.fromString("blue"));
                this.screen.fillRect(j, k - i1, l, i1 * 2);
            }
            this.DrawSlimers();
            this.DrawGoals();
            yield this.ThreadSleep(20);
        });
    }
    ThreadSleep(v) {
        return new Promise((complete, error) => {
            setTimeout(() => complete(0), v);
        });
    }
    padWithZeroes(num, maxFigures) {
        var padding = "";
        for (var i = 0; i < maxFigures - 1; i++) {
            padding += "0";
        }
        return (padding + (num >>> 0)).slice(-maxFigures);
    }
    MakeTime(l) {
        var num = l / 10 % 100;
        var num2 = l / 1000 % 60;
        var num3 = l / 60000 % 60;
        return `${this.padWithZeroes(num3, 2)}:${this.padWithZeroes(num2, 2)}:${this.padWithZeroes(num, 2)}`;
    }
    MoveSlimers() {
        var flag = this.worldCup;
        if (flag) {
            var num = this.worldCupRound;
            var flag2 = num === 0;
            if (flag2) {
                this.controlP2v0();
            }
            var flag3 = num === 1;
            if (flag3) {
                this.controlP2v1();
            }
            var flag4 = num === 2;
            if (flag4) {
                this.controlP2v2();
            }
            var flag5 = num === 3;
            if (flag5) {
                this.controlP2v3();
            }
        }
        this.p1X = this.p1X + this.p1XV;
        var flag6 = this.p1X < 50;
        if (flag6) {
            this.p1X = 50;
        }
        var flag7 = this.p1X > 950;
        if (flag7) {
            this.p1X = 950;
        }
        var flag8 = this.p1YV !== 0;
        if (flag8) {
            this.p1Y = this.p1Y + (this.p1YV = this.p1YV - this.GRAVITY);
            var flag9 = this.p1Y < 0;
            if (flag9) {
                this.p1Y = 0;
                this.p1YV = 0;
            }
        }
        this.p2X = this.p2X + this.p2XV;
        var flag10 = this.p2X > 950;
        if (flag10) {
            this.p2X = 950;
        }
        var flag11 = this.p2X < 50;
        if (flag11) {
            this.p2X = 50;
        }
        var flag12 = this.p2YV !== 0;
        if (flag12) {
            this.p2Y = this.p2Y + (this.p2YV = this.p2YV - this.GRAVITY);
            var flag13 = this.p2Y < 0;
            if (flag13) {
                this.p2Y = 0;
                this.p2YV = 0;
            }
        }
    }
    MoveBall() {
        var num = 30 * this.nHeight / 1000;
        var num2 = this.ballOldX * this.nWidth / 1000;
        var num3 = 4 * this.nHeight / 5 - this.ballOldY * this.nHeight / 1000;
        this.screen.setColor(Color.fromString("blue"));
        if (num3 - num < 3 * this.nHeight / 5) {
            this.screen.fillOval(num2 - num - 2, num3 - num - 2, num * 2 + 4, num * 2 + 4);
        }
        else {
            this.screen.fillOval(num2 - num, num3 - num, num * 2, num * 2);
        }
        var arg_8A_0 = this.ballY;
        var num4 = this.ballVY - 1;
        this.ballVY = num4;
        this.ballY = arg_8A_0 + num4;
        this.ballX = this.ballX + this.ballVX;
        var flag = !this.fEndGame;
        if (flag) {
            var num5 = (this.ballX - this.p1X) * 2;
            var num6 = this.ballY - this.p1Y;
            var num7 = num5 * num5 + num6 * num6;
            var num8 = this.ballVX - this.p1XV;
            var num9 = this.ballVY - this.p1YV;
            var flag2 = num6 > 0 && num7 < 15625 && num7 > 25;
            if (flag2) {
                var num10 = Math.sqrt(num7);
                var num11 = (num5 * num8 + num6 * num9) / num10;
                this.ballX = this.p1X + num5 * 63 / num10;
                this.ballY = this.p1Y + num6 * 125 / num10;
                var flag3 = num11 <= 0;
                if (flag3) {
                    var flag4 = !this.fP1Sticky;
                    if (flag4) {
                        this.ballVY = this.ballVY + (this.p1YV - 2 * num6 * num11 / num10);
                        this.ballVX = this.ballVX + (this.p1XV - 2 * num5 * num11 / num10) * 7 / 10;
                    }
                    else {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    var flag5 = this.ballVX < -15;
                    if (flag5) {
                        this.ballVX = -15;
                    }
                    var flag6 = this.ballVX > 15;
                    if (flag6) {
                        this.ballVX = 15;
                    }
                    var flag7 = this.ballVY < -22;
                    if (flag7) {
                        this.ballVY = -22;
                    }
                    var flag8 = this.ballVY > 22;
                    if (flag8) {
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
            var flag9 = num6 > 0 && num7 < 15625 && num7 > 25;
            if (flag9) {
                var num12 = Math.sqrt(num7);
                var num13 = (num5 * num8 + num6 * num9) / num12;
                this.ballX = this.p2X + num5 * 63 / num12;
                this.ballY = this.p2Y + num6 * 125 / num12;
                var flag10 = num13 <= 0;
                if (flag10) {
                    var flag11 = !this.fP2Sticky;
                    if (flag11) {
                        this.ballVX = this.ballVX + (this.p2XV - 2 * num5 * num13 / num12) * 7 / 10;
                        this.ballVY = this.ballVY + (this.p2YV - 2 * num6 * num13 / num12);
                    }
                    else {
                        this.ballVX = 0;
                        this.ballVY = 0;
                    }
                    var flag12 = this.ballVX < -15;
                    if (flag12) {
                        this.ballVX = -15;
                    }
                    var flag13 = this.ballVX > 15;
                    if (flag13) {
                        this.ballVX = 15;
                    }
                    var flag14 = this.ballVY < -22;
                    if (flag14) {
                        this.ballVY = -22;
                    }
                    var flag15 = this.ballVY > 22;
                    if (flag15) {
                        this.ballVY = 22;
                    }
                }
                this.fP2Touched = true;
            }
            var flag16 = this.ballX < 15;
            if (flag16) {
                this.ballX = 15;
                this.ballVX = -this.ballVX;
            }
            var flag17 = this.ballX > 985;
            if (flag17) {
                this.ballX = 985;
                this.ballVX = -this.ballVX;
            }
            var flag18 = this.ballX <= 50 || this.ballX >= 950;
            if (flag18) {
                var flag19 = (this.ballY > 200 && this.ballOldY < 200) || (this.ballY < 200 && this.ballOldY >= 200);
                if (flag19) {
                    this.ballY = 200;
                    this.ballVY = this.ballVY * -1;
                }
                var flag20 = this.ballY > 180 && this.ballY < 220;
                if (flag20) {
                    var flag21 = this.ballX > 40 && this.ballX < 50 && this.ballVX < 0;
                    if (flag21) {
                        this.ballX = 50;
                        this.ballVX = this.ballVX * -1;
                    }
                    var flag22 = this.ballX < 960 && this.ballX > 950 && this.ballVX > 0;
                    if (flag22) {
                        this.ballX = 950;
                        this.ballVX = this.ballVX * -1;
                    }
                }
            }
            var flag23 = this.ballY < 34;
            if (flag23) {
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
    DrawGoals() {
        this.screen.setColor(Color.fromString("white"));
        this.screen.fillRect(this.nWidth / 20, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, 5, 200 * this.nHeight / 1000);
        this.screen.fillRect(this.nWidth - this.nWidth / 20 - 5, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, 5, 200 * this.nHeight / 1000);
        this.screen.fillRect(0, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);
        this.screen.fillRect(this.nWidth * 9 / 10, 4 * this.nHeight / 5 + 2, this.nWidth / 10, 2);
        for (var i = 0; i < this.nWidth / 20; i = i + 5) {
            this.screen.drawLine(i, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, i, 4 * this.nHeight / 5);
            this.screen.drawLine(this.nWidth - i, 4 * this.nHeight / 5 - 200 * this.nHeight / 1000, this.nWidth - i, 4 * this.nHeight / 5);
        }
        for (var j = 4 * this.nHeight / 5 - this.nHeight / 5; j < 4 * this.nHeight / 5; j = j + 5) {
            this.screen.drawLine(0, j, this.nWidth / 20, j);
            this.screen.drawLine(this.nWidth, j, this.nWidth - this.nWidth / 20, j);
        }
        var num = (60 - this.p1TouchingGoal) * this.nWidth / 120;
        this.screen.setColor(this.secondaryCols[this.p1Col]);
        this.screen.fillRect(0, this.nHeight - 5, num, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(num, this.nHeight - 5, this.nWidth / 2 - num, 5);
        var num2 = this.nWidth - (60 - this.p2TouchingGoal) * this.nWidth / 120;
        this.screen.setColor(this.secondaryCols[this.p2Col]);
        this.screen.fillRect(num2, this.nHeight - 5, this.nWidth, 5);
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(this.nWidth / 2, this.nHeight - 5, num2 - this.nWidth / 2, 5);
    }
    DrawStatus() {
        var graphics = this.screen;
        var fontMetrics = this.screen.getFontMetrics();
        var text = null;
        var v = this.MakeTime(this.gameTime);
        var num = this.nHeight / 20;
        var num2 = 0;
        var num3 = fontMetrics.stringWidth(v);
        var flag = this.worldCup;
        if (flag) {
            var num4 = this.worldCupRound;
            var flag2 = num4 === 1;
            if (flag2) {
                text = "Quarter Finals";
            }
            else {
                var flag3 = num4 === 2;
                if (flag3) {
                    text = "Semi-Finals";
                }
                else {
                    var flag4 = num4 === 3;
                    if (flag4) {
                        text = "Final";
                    }
                    else {
                        text = "Qualifying";
                    }
                }
            }
            var flag5 = this.fGoldenGoal;
            if (flag5) {
                text = text + " [Golden Goal]";
            }
            else {
                var flag6 = this.fExtraTime;
                if (flag6) {
                    text = text + " [Extra Time]";
                }
            }
            num2 = fontMetrics.stringWidth(text);
        }
        var num5 = (num2 <= num3) ? num3 : num2;
        graphics.setColor(Color.fromString("blue"));
        graphics.fillRect(this.nWidth / 2 - num5 / 2 - 5, 0, num5 + 10, num + 22);
        graphics.setColor(Color.fromString("white"));
        this.screen.drawString(v, this.nWidth / 2 - num3 / 2, fontMetrics.getAscent() + 20);
        var flag7 = text !== null;
        if (flag7) {
            this.screen.drawString(text, this.nWidth / 2 - num2 / 2, fontMetrics.getAscent() + 20 - fontMetrics.getHeight());
        }
    }
    drawPrompt(s, i) {
        if (arguments.length === 0) {
            this.drawPrompt_0();
            return;
        }
        this.drawPrompt_1(s, i);
    }
    drawPrompt_0() {
        this.screen.setColor(Color.fromString("gray"));
        this.screen.fillRect(0, 4 * this.nHeight / 5 + 6, this.nWidth, this.nHeight / 5 - 10);
        this.drawPrompt(this.promptMsg, 0);
    }
    drawPrompt_1(s, i) {
        var fontMetrics = this.screen.getFontMetrics();
        this.screen.setColor(Color.fromString("lightGray"));
        this.screen.drawString(s, (this.nWidth - fontMetrics.stringWidth(s)) / 2, this.nHeight * 4 / 5 + fontMetrics.getHeight() * (i + 1) + 10);
    }
    promptBox(s, s1) {
        var fontMetrics = this.screen.getFontMetrics();
        var num = fontMetrics.stringWidth(s);
        var num2 = fontMetrics.stringWidth(s1);
        var num3 = (num <= num2) ? num2 : num;
        this.screen.setColor(Color.fromString("darkGray"));
        this.screen.fillRect(this.nWidth / 2 - num3 / 2 - 20, this.nHeight * 2 / 5, num3 + 40, this.nHeight / 5);
        this.screen.setColor(Color.fromString("white"));
        this.screen.drawString(s, this.nWidth / 2 - num / 2, this.nHeight * 9 / 20);
        this.screen.drawString(s1, this.nWidth / 2 - num2 / 2, this.nHeight * 11 / 20);
        this.flip();
    }
    SaveReplayData() {
        this.replayData[this.replayPos][0] = this.p1X;
        this.replayData[this.replayPos][1] = this.p1Y;
        this.replayData[this.replayPos][2] = this.p2X;
        this.replayData[this.replayPos][3] = this.p2Y;
        this.replayData[this.replayPos][4] = this.ballX;
        this.replayData[this.replayPos][5] = this.ballY;
        this.replayData[this.replayPos][6] = this.p1Col;
        this.replayData[this.replayPos][7] = this.p2Col;
        this.replayPos = this.replayPos + 1;
        var flag = this.replayPos >= 200;
        if (flag) {
            this.replayPos = 0;
        }
        var flag2 = this.replayStart === this.replayPos;
        if (flag2) {
            this.replayStart = this.replayStart + 1;
        }
        var flag3 = this.replayStart >= 200;
        if (flag3) {
            this.replayStart = 0;
        }
    }
    drawScores() {
        var graphics = this.screen;
        var num = this.nHeight / 20;
        var fontMetrics = this.screen.getFontMetrics();
        fontMetrics.stringWidth("Replay...");
        graphics.setColor(Color.fromString("blue"));
        graphics.fillRect(0, 0, this.nWidth, num + 22);
        graphics.setColor(Color.fromString("white"));
        graphics.drawString(this.slimeColText[this.p1Col] + " : " + this.p1Score, this.nWidth / 20, num);
        var v = this.p2Score + " : " + this.slimeColText[this.p2Col];
        graphics.drawString(v, this.nWidth - this.nWidth / 20 - fontMetrics.stringWidth(v), num);
    }
    checkScored() {
        var flag = this.ballY < 200 && (this.ballX < 40 || this.ballX > 960);
        var result;
        if (flag) {
            this.nScoreX = this.ballX;
            this.fPlayOn = true;
            this.playOnTicks = 10;
            result = true;
        }
        else {
            result = false;
        }
        return result;
    }
    static Mathrandom() {
        return Math.random();
    }
    static SystemcurrentTimeMillis() {
        return Date.now();
    }
    run() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            this.worldCupRound = 0;
            do {
                this.initStuff();
                this.replayPos = (this.replayStart = 0);
                this.scoringRun = 0;
                this.fP1Touched = (this.fP2Touched = false);
                this.gameTime = 0;
                this.startTime = WorldCupSoccerSlime.SystemcurrentTimeMillis();
                this.fEndGame = false;
                this.fCanChangeCol = false;
                this.mousePressed = false;
                this.gameTime = this.gameLength;
                this.fInPlay = true;
                this.fEndGame = false;
                var flag = this.worldCup;
                if (flag) {
                    this.paint(_super("getGraphics").call(this));
                    do {
                        this.p2Col = (WorldCupSoccerSlime.Mathrandom() * this.slimaryCols.length / 4.0) + this.worldCupRound * this.slimaryCols.length / 4 >>> 0;
                    } while (this.p1Col === this.p2Col);
                    var s = this.slimeColText[this.p1Col] + " vs. " + this.slimeColText[this.p2Col];
                    var num = this.worldCupRound;
                    var flag2 = num === 0;
                    if (flag2) {
                        this.promptBox("Qualifying Round", s);
                        this.gameLength = 30000;
                    }
                    else {
                        var flag3 = num === 1;
                        if (flag3) {
                            this.promptBox("Quarter Finals", s);
                            this.gameLength = 120000;
                        }
                        else {
                            var flag4 = num === 2;
                            if (flag4) {
                                this.promptBox("Semi-Finals", s);
                                this.gameLength = 120000;
                            }
                            else {
                                var flag5 = num === 3;
                                if (flag5) {
                                    this.promptBox("World Cup Final", s);
                                    this.gameLength = 300000;
                                }
                            }
                        }
                    }
                    yield this.ThreadSleep(4000);
                    yield this.clearAndRepaint();
                    this.flip();
                }
                while (this.gameTime > 0 || (this.worldCup && this.worldCupRound > 0 && this.p1Score === this.p2Score)) {
                    this.gameTime = this.startTime + this.gameLength - WorldCupSoccerSlime.SystemcurrentTimeMillis();
                    var flag6 = this.gameTime < 0;
                    if (flag6) {
                        this.gameTime = 0;
                    }
                    var flag7 = this.worldCup && !this.fExtraTime && this.gameTime <= 0 && this.worldCupRound > 0 && this.p1Score === this.p2Score;
                    if (flag7) {
                        var text = (this.p1Score !== 0) ? (" " + this.p1Score) : " nil";
                        this.promptBox(NString.Concat([
                            "The score is ", this.slimeColText[this.p1Col], text, ", ", this.slimeColText[this.p2Col], text, "."
                        ]), "And the game goes into extra time...");
                        yield this.ThreadSleep(4000);
                        yield this.clearAndRepaint();
                        this.flip();
                        this.startTime = this.startTime + 30000;
                        this.gameTime = this.gameTime + 30000;
                        this.fExtraTime = true;
                    }
                    else {
                        var flag8 = this.gameTime <= 0 && this.fExtraTime && !this.fGoldenGoal && this.p1Score === this.p2Score;
                        if (flag8) {
                            this.fGoldenGoal = true;
                            var text2 = (this.p1Score !== 0) ? (" " + this.p1Score) : " nil";
                            this.promptBox(NString.Concat([
                                "The score is ", this.slimeColText[this.p1Col], text2, ", ", this.slimeColText[this.p2Col], text2, ", and the game goes into Golden Goal."
                            ]), "The next player to score will win the match!");
                            yield this.ThreadSleep(4000);
                            yield this.clearAndRepaint();
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
                    var flag9 = this.p1X < 150;
                    if (flag9) {
                        this.p1TouchingGoal = this.p1TouchingGoal + 1;
                    }
                    else {
                        this.p1TouchingGoal = 0;
                    }
                    var flag10 = this.p2X > 850;
                    if (flag10) {
                        this.p2TouchingGoal = this.p2TouchingGoal + 1;
                    }
                    else {
                        this.p2TouchingGoal = 0;
                    }
                    var flag11 = this.fPlayOn;
                    if (flag11) {
                        this.playOnTicks = this.playOnTicks - 1;
                    }
                    else {
                        this.fPlayOn = this.checkScored();
                    }
                    var flag12 = this.playOnTicks === 0 || this.p1TouchingGoal > 60 || this.p2TouchingGoal > 60;
                    if (flag12) {
                        var num2 = WorldCupSoccerSlime.SystemcurrentTimeMillis();
                        var flag13 = this.p1TouchingGoal > 60;
                        if (flag13) {
                            this.p2Score = this.p2Score + 1;
                            this.promptMsg = this.slimeColText[this.p1Col] + " pinged for goal hanging!";
                        }
                        else {
                            var flag14 = this.p2TouchingGoal > 60;
                            if (flag14) {
                                this.p1Score = this.p1Score + 1;
                                this.promptMsg = this.slimeColText[this.p2Col] + " pinged for goal hanging!";
                            }
                            else {
                                var flag15 = this.nScoreX < 500;
                                if (flag15) {
                                    this.p2Score = this.p2Score + 1;
                                    this.promptMsg = this.slimeColText[this.p2Col] + " Scores!";
                                }
                                else {
                                    this.p1Score = this.p1Score + 1;
                                    this.promptMsg = this.slimeColText[this.p1Col] + " Scores!";
                                }
                            }
                        }
                        this.drawPrompt();
                        this.drawPrompt("Click mouse for replay...", 1);
                        this.flip();
                        this.mousePressed = false;
                        var flag16 = this.gameThread !== null;
                        if (flag16) {
                            yield this.ThreadSleep(2500);
                        }
                        var flag17 = this.mousePressed;
                        if (flag17) {
                            this.SaveReplayData();
                            yield this.DoReplay();
                        }
                        this.promptMsg = "";
                        this.drawPrompt();
                        this.playOnTicks = 10;
                        this.fPlayOn = false;
                        this.startTime = this.startTime + (WorldCupSoccerSlime.SystemcurrentTimeMillis() - num2);
                        this.ballX = 490 + ((WorldCupSoccerSlime.Mathrandom() * 20.0) >>> 0);
                        this.ballY = 190 + ((WorldCupSoccerSlime.Mathrandom() * 20.0) >>> 0);
                        this.ballVX = 0;
                        this.ballVY = 0;
                        this.p1X = 200;
                        this.p1Y = 0;
                        this.p1YV = 0;
                        this.p2X = 800;
                        this.p2Y = 0;
                        this.p2YV = 0;
                        this.replayStart = (this.replayPos = 0);
                        yield this.clearAndRepaint();
                    }
                    var flag18 = this.gameThread !== null;
                    if (flag18) {
                        var flag19 = this.fPlayOn;
                        if (flag19) {
                            yield this.ThreadSleep(120);
                        }
                        else {
                            yield this.ThreadSleep(20);
                        }
                    }
                }
                this.fEndGame = true;
                var flag20 = this.fPlayOn;
                if (flag20) {
                    var flag21 = this.nScoreX < 500;
                    if (flag21) {
                        this.p2Score = this.p2Score + 1;
                        this.promptMsg = this.slimeColText[this.p2Col] + " scores at the final whistle!";
                    }
                    else {
                        this.p1Score = this.p1Score + 1;
                        this.promptMsg = this.slimeColText[this.p1Col] + " scores at the final whistle!";
                    }
                    this.drawPrompt();
                }
                else {
                    this.drawPrompt("And that's the final whistle!", 0);
                }
                var flag22 = this.worldCup;
                if (flag22) {
                    var flag23 = this.p1Score === this.p2Score;
                    if (flag23) {
                        this.drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
                        this.promptBox("You played well, but a draw is not enough.", "You have been eliminated.");
                        this.worldCup = false;
                        this.flip();
                    }
                    else {
                        var flag24 = this.p1Score >= this.p2Score;
                        if (flag24) {
                            var num3 = this.worldCupRound;
                            var flag25 = num3 === 0;
                            if (flag25) {
                                this.drawPrompt(this.slimeColText[this.p1Col] + " qualifies for the world cup!", 1);
                            }
                            var flag26 = num3 === 1;
                            if (flag26) {
                                this.drawPrompt(this.slimeColText[this.p1Col] + " proceeds to the semi-finals!", 1);
                            }
                            var flag27 = num3 === 2;
                            if (flag27) {
                                this.drawPrompt(this.slimeColText[this.p1Col] + " is through to the final!!!", 1);
                            }
                            var flag28 = num3 === 3;
                            if (flag28) {
                                this.drawPrompt(this.slimeColText[this.p1Col] + " wins the WORLD CUP!!!!!", 1);
                            }
                            var flag29 = this.worldCupRound === 3;
                            if (flag29) {
                                this.worldCup = false;
                                this.promptBox("You win the world cup!!!", "Congratulations!");
                            }
                            else {
                                this.worldCupRound = this.worldCupRound + 1;
                            }
                        }
                        else {
                            var num4 = this.worldCupRound;
                            var flag30 = num4 === 0;
                            if (flag30) {
                            }
                            var flag31 = num4 === 1;
                            if (flag31) {
                                this.promptBox("You have been eliminated.", "Goodbye.");
                            }
                            var flag32 = num4 === 2;
                            if (flag32) {
                                this.promptBox("You have been knocked out of the semifinals.", "You played well.");
                            }
                            var flag33 = num4 === 3;
                            if (flag33) {
                                this.promptBox("You came second.", "Are you satisfied with that?");
                            }
                            this.worldCup = false;
                        }
                    }
                }
                else {
                    var flag34 = this.p1Score === this.p2Score;
                    if (flag34) {
                        this.drawPrompt("It's a draw at full time, here at Slime Stadium!", 1);
                    }
                    else {
                        var flag35 = this.p1Score < this.p2Score;
                        if (flag35) {
                            this.drawPrompt(NString.Concat([
                                this.slimeColText[this.p2Col], " (", this.p2Score, ")    def. ", this.slimeColText[this.p1Col], " (", this.p1Score, ")"
                            ]), 1);
                        }
                        else {
                            this.drawPrompt(NString.Concat([
                                this.slimeColText[this.p1Col], " (", this.p1Score, ")    def. ", this.slimeColText[this.p2Col], " (", this.p2Score, ")"
                            ]), 1);
                        }
                    }
                }
                this.flip();
                if (this.isStarted) {
                    yield this.ThreadSleep(5000);
                }
                this.initStuff();
                this.isStarted = true;
            } while (this.worldCup);
            this.fCanChangeCol = true;
            this.fInPlay = false;
            yield this.clearAndRepaint();
        });
    }
    init() {
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
    toggleBuffering() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            var flag = this.doubleBuffered = !this.doubleBuffered;
            if (flag) {
                this.screen = this.backBuffer.getGraphics();
                this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
            }
            else {
                this.screen = _super("getGraphics").call(this);
                this.screen.setFont(new Font(this.screen.getFont().getName(), 1, 15));
            }
            yield this.clearAndRepaint();
        });
    }
    DoReplay() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            var fontMetrics = this.screen.getFontMetrics();
            var num = fontMetrics.stringWidth("Replay...");
            var height = fontMetrics.getHeight();
            var j = this.nWidth / 2 - num / 2;
            var k = this.nHeight / 2 - height;
            this.promptMsg = "Click the mouse to continue...";
            this.mousePressed = false;
            var num2 = this.replayPos - 1;
            while (!this.mousePressed) {
                var flag = (num2 = num2 + 1) >= 200;
                if (flag) {
                    num2 = 0;
                }
                var flag2 = num2 === this.replayPos;
                if (flag2) {
                    yield this.ThreadSleep(1000);
                    num2 = this.replayStart;
                    this.paint(_super("getGraphics").call(this));
                }
                yield this.ReplayFrame(num2, j, k, num, height, false);
                this.flip();
            }
            this.promptMsg = "";
            this.paint(_super("getGraphics").call(this));
        });
    }
    flip() {
        var flag = this.doubleBuffered;
        if (flag) {
            super.getGraphics().drawImage(this.backBuffer, 0, 0, null);
        }
    }
    getBallBounceX() {
        var num = this.ballVY + Math.sqrt((this.ballVY * this.ballVY + 2 * this.ballY));
        var num2 = this.ballX + num * this.ballVX;
        var flag = num2 < 0;
        if (flag) {
            num2 = -num2;
        }
        var flag2 = num2 > 1000;
        if (flag2) {
            num2 = 1000 - num2;
        }
        return num2;
    }
    getBallMaxY() {
        var flag = this.ballVY < 0;
        var result;
        if (flag) {
            result = this.ballY;
        }
        else {
            result = this.ballY + this.ballVY * this.ballVY / 2;
        }
        return result;
    }
    controlP2v0() {
        this.p2XV = 0;
        var flag = this.ballX > this.p2X + 5 && this.ballX < 960;
        if (flag) {
            this.fP2Sticky = true;
        }
        var flag2 = this.ballX > this.p2X - 10;
        if (flag2) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag3 = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag3) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag4 = this.ballX + 50 < this.p2X;
        if (flag4) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag5 = this.ballX > this.p2X + 50 && this.p2YV === 0 && this.ballY > 10 && this.ballY < 150;
        if (flag5) {
            this.p2YV = this.JUMPVEL;
        }
        var flag6 = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag6) {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    controlP2v1() {
        this.p2XV = 0;
        var ballBounceX = this.getBallBounceX();
        var ballMaxY = this.getBallMaxY();
        var flag = ballBounceX > 900;
        if (flag) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag2 = ballBounceX + 20 < this.p2X;
        if (flag2) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag3 = this.ballX > this.p2X - 10;
        if (flag3) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag4 = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag4) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag5 = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag5) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag6 = this.ballX > this.p2X && this.ballX < 960;
        if (flag6) {
            this.fP2Sticky = true;
        }
        var flag7 = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag7) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag8 = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag8) {
            var flag9 = this.p2X < 900;
            if (flag9) {
                this.p2XV = this.SLIMEVEL;
            }
            var flag10 = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag10) {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag11 = this.p2YV === this.JUMPVEL;
        if (flag11) {
            var flag12 = ballMaxY < 110;
            if (flag12) {
                this.p2YV = 0;
            }
            var flag13 = this.ballX < this.p2X - 400;
            if (flag13) {
                this.p2YV = 0;
            }
            var flag14 = this.ballY < 80;
            if (flag14) {
                this.p2YV = 0;
            }
            var flag15 = this.ballX < 900 && this.p2X > 900;
            if (flag15) {
                this.p2YV = 0;
            }
            var flag16 = this.p2X < 150;
            if (flag16) {
                this.p2YV = 0;
            }
        }
        var flag17 = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag17) {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    controlP2v2() {
        var ballBounceX = this.getBallBounceX();
        var ballMaxY = this.getBallMaxY();
        var flag = this.p2X < 790;
        if (flag) {
            this.p2XV = this.SLIMEVEL;
        }
        else {
            var flag2 = this.p2X > 830;
            if (flag2) {
                this.p2XV = -this.SLIMEVEL;
            }
            else {
                this.p2XV = 0;
            }
        }
        var flag3 = ballBounceX > 900;
        if (flag3) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag4 = ballBounceX + 20 < this.p2X;
        if (flag4) {
            this.fP2Sticky = false;
            this.p2XV = -this.SLIMEVEL;
        }
        var flag5 = this.ballX > this.p2X - 10;
        if (flag5) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag6 = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag6) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag7 = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag7) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag8 = this.ballX > this.p2X && this.ballX < 960;
        if (flag8) {
            this.fP2Sticky = true;
        }
        var flag9 = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag9) {
            this.p2XV = this.SLIMEVEL;
        }
        var flag10 = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag10) {
            var flag11 = this.p2X < 900;
            if (flag11) {
                this.p2XV = this.SLIMEVEL;
            }
            var flag12 = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag12) {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag13 = this.p2YV === this.JUMPVEL;
        if (flag13) {
            var flag14 = ballMaxY < 110;
            if (flag14) {
                this.p2YV = 0;
            }
            var flag15 = this.ballX < this.p2X - 400;
            if (flag15) {
                this.p2YV = 0;
            }
            var flag16 = this.ballY < 80;
            if (flag16) {
                this.p2YV = 0;
            }
            var flag17 = this.ballX < 900 && this.p2X > 900;
            if (flag17) {
                this.p2YV = 0;
            }
        }
        var flag18 = this.p2YV === 0 && this.p2X < 400 && ballBounceX > 500 && ballMaxY > 50;
        if (flag18) {
            this.p2YV = this.JUMPVEL;
        }
        var flag19 = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / this.SLIMEVEL;
        if (flag19) {
            this.p2XV = -this.SLIMEVEL;
        }
    }
    controlP2v3() {
        var num = this.SLIMEVEL * 4 / 3;
        var ballBounceX = this.getBallBounceX();
        var ballMaxY = this.getBallMaxY();
        var flag = this.p2X < 790;
        if (flag) {
            this.p2XV = num;
        }
        else {
            var flag2 = this.p2X > 830;
            if (flag2) {
                this.p2XV = -num;
            }
            else {
                this.p2XV = 0;
            }
        }
        var flag3 = ballBounceX > 900;
        if (flag3) {
            this.p2XV = num;
        }
        var flag4 = ballBounceX + 20 < this.p2X;
        if (flag4) {
            this.fP2Sticky = false;
            this.p2XV = -num;
        }
        var flag5 = this.ballX > this.p2X - 10;
        if (flag5) {
            this.p2XV = num;
        }
        var flag6 = this.ballX + 30 > this.p2X && this.p2YV === 0;
        if (flag6) {
            this.fP2Sticky = false;
            this.p2YV = this.JUMPVEL;
        }
        var flag7 = ballBounceX > this.p2X + 50 && this.p2YV === 0;
        if (flag7) {
            this.p2XV = num;
        }
        var flag8 = this.ballX > this.p2X && this.ballX < 960;
        if (flag8) {
            this.fP2Sticky = true;
        }
        var flag9 = this.p2YV === 0 && this.ballX > this.p1X - 120 && this.ballX < this.p1X + 120 && this.ballY > this.p1Y && this.ballY < this.p1Y + 100 && this.p1Y > 0;
        if (flag9) {
            this.p2XV = num;
        }
        var flag10 = (this.p2Score >= this.p1Score && ballBounceX < 200 && this.p2X > this.p1X) || (ballBounceX < this.p1X + 50 && ballBounceX > this.p1X - 50 && this.ballVY / 4 === 0 && this.p1X < 400 && this.p2X < 848);
        if (flag10) {
            var flag11 = this.p2X < 900;
            if (flag11) {
                this.p2XV = num;
            }
            var flag12 = this.ballX > 800 && ballBounceX > 950 && this.p2YV === 0 && ballMaxY > 40;
            if (flag12) {
                this.p2YV = this.JUMPVEL;
            }
        }
        var flag13 = this.p2YV === this.JUMPVEL;
        if (flag13) {
            var flag14 = ballMaxY < 110;
            if (flag14) {
                this.p2YV = 0;
            }
            var flag15 = this.ballX < this.p2X - 400;
            if (flag15) {
                this.p2YV = 0;
            }
            var flag16 = this.ballY < 80;
            if (flag16) {
                this.p2YV = 0;
            }
            var flag17 = this.ballX < 900 && this.p2X > 900;
            if (flag17) {
                this.p2YV = 0;
            }
            var flag18 = this.p2XV > 0 && ballMaxY > 200 && ballBounceX > this.p2X + 300;
            if (flag18) {
                this.p2YV = 0;
            }
        }
        var flag19 = this.p2YV === 0 && this.p2X < 400 && ballBounceX > this.p2X + 400 && ballMaxY > 50;
        if (flag19) {
            this.p2YV = this.JUMPVEL;
        }
        var flag20 = this.p2TouchingGoal > 0 && 60 - this.p2TouchingGoal < 3 + (this.p2X - 850) / num;
        if (flag20) {
            this.p2XV = -num;
        }
    }
    p(s) {
        console.log(s);
    }
}
WorldCupSoccerSlime.SMILE_DIFF = 2;
WorldCupSoccerSlime.DAMPING = 7;
WorldCupSoccerSlime.MAX_TICKS_TOUCHING_GOAL = 60;
//# sourceMappingURL=WorldCupSoccerSlime.js.map