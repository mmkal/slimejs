/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const games_index_1 = __webpack_require__(1);
	const AutoPeer_1 = __webpack_require__(2);
	const shims_1 = __webpack_require__(3);
	window.onload = () => {
	    const autoPeer = AutoPeer_1.default.Create("vxv7ldsv1h71ra4i");
	    const connect = document.getElementById("connect");
	    const gamesEl = document.getElementById("games");
	    const gameNames = Object.keys(games_index_1.default);
	    gameNames.forEach(name => {
	        const button = document.createElement("button");
	        button.textContent = name;
	        button.onclick = () => startGame(name);
	        gamesEl.appendChild(button);
	    });
	    startGame(gameNames.filter(g => g.indexOf("soccer") > -1)[0] || gameNames[0]);
	    function startGame(name) {
	        Array.from(gamesEl.querySelectorAll("button")).forEach((b) => b.disabled = (b.textContent === name));
	        const disconnection = autoPeer.disconnect();
	        const oldCanvas = document.querySelector("canvas");
	        const newCanvas = document.createElement("canvas");
	        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);
	        const game = new games_index_1.default[name]();
	        Array.from(oldCanvas.attributes).forEach(attr => newCanvas.setAttribute(attr.name, attr.value));
	        ["recommended_width", "recommended_height"].forEach(prop => {
	            if (game[prop]) {
	                newCanvas.setAttribute(prop.replace("recommended_", ""), game[prop]);
	            }
	        });
	        connect.onclick = () => __awaiter(this, void 0, void 0, function* () {
	            yield disconnection;
	            autoPeer.connect();
	        });
	        shims_1.Applet.prototype.start.call(game);
	        document.title = name;
	    }
	};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	class AutoPeer {
	    constructor(apiKey) {
	        this.connection = null;
	        this.peer = null;
	        this.peerOptions = null;
	        this.isHost = false;
	        this.isGuest = false;
	        this.ondatareceived = null;
	        this.onconnected = null;
	        this.server = "https://slimejs.herokuapp.com/";
	        this.peerOptions = {
	            key: apiKey
	        };
	        $.get(this.server + "ping").then(pong => {
	            this.log("Server is awake, and says: " + pong);
	        });
	    }
	    /** Get the AutoPeer instance. This will throw if there's no instance, so make sure it's initialised before calling this. */
	    static Get() {
	        if (!AutoPeer.instance) {
	            throw new Error("No instance of AutoPeer exists");
	        }
	        return AutoPeer.instance;
	    }
	    /** Create and return the AutoPeer instance. */
	    static Create(apiKey) {
	        if (AutoPeer.instance) {
	            throw new Error(`There's already an AutoPeer instance.`);
	        }
	        return AutoPeer.instance = new AutoPeer(apiKey);
	    }
	    log(text) {
	        console.log(text);
	        const logEl = document.getElementById("peerjs-log");
	        if (logEl)
	            logEl.innerText += "\r\n" + text;
	    }
	    register() {
	        return __awaiter(this, void 0, void 0, function* () {
	            const peer = new Peer(Date.now().toString(), this.peerOptions);
	            yield $.post(this.server + "host?" + $.param({ id: peer.id }));
	            return peer;
	        });
	    }
	    deleteHostId(id) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield $.post(this.server + "deletehost?" + $.param({ id }));
	        });
	    }
	    takeHostId() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return yield $.post(this.server + "takehost?" + $.param({ me: this.peer.id }));
	        });
	    }
	    handleNewConnection(connection) {
	        this.log(`Connection to ${connection.peer} established. Opening...`);
	        connection["once"]("data", d => this.log("Received some data from " + connection.peer + ": " + d));
	        connection.on("open", () => __awaiter(this, void 0, void 0, function* () {
	            this.log(`Connection to ${connection.peer} opened.`);
	            yield this.deleteHostId(this.peer.id);
	            if (this.connection) {
	                this.log(`New connection to ${connection.peer} arrived but we're already connected to ${this.connection.peer}. Closing the new connection.`);
	                connection.close();
	                return;
	            }
	            connection.on("close", () => {
	                this.log(`Connection with ${connection.peer} was closed. Try refreshing.`);
	            });
	            this.isHost = Number(this.peer.id) < Number(connection.peer);
	            this.isGuest = !this.isHost;
	            this.log(`Now connected to ${connection.peer}. You are ${this.isHost ? "host" : "guest"}.`);
	            connection.serialization = "json";
	            connection.send("Hi I'm " + this.peer.id);
	            this.connection = connection;
	            this.onconnected && this.onconnected();
	            this.connection.on("data", data => {
	                this.ondatareceived && this.ondatareceived(data);
	            });
	            this.connection.on("close", () => {
	                this.connection = null;
	            });
	        }));
	    }
	    connect() {
	        return __awaiter(this, void 0, void 0, function* () {
	            this.log("Connecting...");
	            this.peer = yield this.register();
	            this.log("Registered as host: " + this.peer.id);
	            this.peer.on("connection", conn => this.handleNewConnection(conn));
	            const otherHostId = yield this.takeHostId();
	            if (!otherHostId) {
	                return this.log("No hosts online. You'll have to wait.");
	            }
	            const connectionToOther = this.peer.connect(otherHostId);
	            this.handleNewConnection(connectionToOther);
	        });
	    }
	    disconnect() {
	        return __awaiter(this, void 0, void 0, function* () {
	            if (this.connection) {
	                this.connection.close();
	                this.connection = null;
	            }
	            if (this.peer) {
	                yield this.deleteHostId(this.peer.id);
	            }
	        });
	    }
	}
	AutoPeer.instance = null;
	exports.default = AutoPeer;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	const AutoPeer_1 = __webpack_require__(2);
	class Image {
	    constructor(root) {
	        this.root = null;
	        this.root = root;
	    }
	    getGraphics() {
	        return new Graphics(document.querySelector("canvas")["getContext"]("2d"));
	    }
	    getHeight(applet) {
	    }
	}
	exports.Image = Image;
	class Font {
	    constructor(name, modifier, size) {
	        this.name = name;
	        this.modifier = modifier;
	        this.size = size;
	    }
	    getName() {
	        return this.name;
	    }
	}
	exports.Font = Font;
	class Event {
	}
	// todo: check the right values for these on java Event
	Event.LEFT = 74;
	Event.RIGHT = 76;
	Event.UP = 73;
	Event.DOWN = 107;
	Event.KEY_ACTION = 401;
	Event.KEY_ACTION_RELEASE = 402;
	exports.Event = Event;
	class Graphics {
	    constructor(ctx) {
	        this.ctx = ctx;
	        this.color = Color.fromString("white");
	        this.background = { color: "", size: 0 };
	    }
	    getFontMetrics() {
	        return new FontMetrics();
	    }
	    setColor(color) {
	        this.ctx.strokeStyle = color.name;
	        this.ctx.fillStyle = color.name;
	        this.color = color;
	    }
	    fillRect(x, y, w, h) {
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
	    drawString(text, x, y) {
	        this.ctx.strokeText(text, x, y);
	    }
	    arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees) {
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
	        }
	        else {
	            this.ctx.arc(centreX, centreY, radiusX, startAngleRadians, endAngleRadians, endAngleRadians >= 0);
	        }
	    }
	    fillArc(x, y, width, height, startAngleDegrees, endAngleDegrees) {
	        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
	        this.ctx.fill();
	    }
	    fillPolygon() {
	        let polygon;
	        if (arguments.length === 1) {
	            polygon = arguments[0];
	        }
	        else {
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
	    drawOval(x, y, width, height) {
	        this.drawArc(x, y, width, height, 0, 360);
	    }
	    fillOval(x, y, width, height) {
	        this.fillArc(x, y, width, height, 0, 360);
	    }
	    drawArc(x, y, width, height, startAngleDegrees, endAngleDegrees) {
	        this.arcPath(x, y, width, height, startAngleDegrees, endAngleDegrees);
	        this.ctx.stroke();
	    }
	    drawLine(xFrom, yFrom, xTo, yTo) {
	        this.ctx.moveTo(xFrom, yFrom);
	        this.ctx.lineTo(xTo, yTo);
	        this.ctx.stroke();
	    }
	    drawRect(x, y, w, h) {
	        this.drawLine(x, y, x + w, y);
	        this.drawLine(x + w, y, x + w, y + h);
	        this.drawLine(x + w, y + h, x, y + h);
	        this.drawLine(x, y + h, x, y);
	    }
	    getFont() {
	        return new Font(this.ctx.font, 0, Number(/\d+/.exec(this.ctx.font)[0]));
	    }
	    setFont(font) {
	        this.ctx.font = this.ctx.font.replace(/\d+/, font.size.toString());
	    }
	    drawImage(backBuffer, v1, v2, p) {
	    }
	}
	exports.Graphics = Graphics;
	class Color {
	    constructor(r, g, b) {
	        this.name = null;
	        this.name = `rgb(${r}, ${g}, ${b})`;
	    }
	    static fromString(v) {
	        var color = new Color(0, 0, 0);
	        color.name = v;
	        return color;
	    }
	}
	exports.Color = Color;
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
	exports.FontMetrics = FontMetrics;
	class Size {
	    constructor(width, height) {
	        this.width = width;
	        this.height = height;
	    }
	}
	exports.Size = Size;
	class AppletCore {
	    constructor() {
	        this.isInitialised = false;
	        this.canvasEl = null;
	        this.canvasEl = document.querySelector("canvas");
	        this.graphics = new Graphics(this.canvasEl.getContext("2d"));
	    }
	    size() {
	        return new Size(this.getWidth(), this.getHeight());
	    }
	    getImage() {
	        return new Image(document.body);
	    }
	    getWidth() {
	        return this.canvasEl.width;
	    }
	    getHeight() {
	        return this.canvasEl.height;
	    }
	    showStatus(text) {
	        var screen = this.getGraphics();
	        screen.setColor(Color.fromString("Green"));
	        screen.drawString(text, 10, 10);
	    }
	    requestFocus() {
	    }
	    getGraphics() {
	        return this.graphics;
	    }
	    createImage(nWidth, nHeight) {
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
	        if (!this.isInitialised)
	            return;
	        this.paint(this.getGraphics());
	    }
	    getCodeBase() {
	        return new URL(window.location.href + "?");
	    }
	    getDocumentBase() {
	        return new DocumentBase();
	    }
	    getAppletContext() {
	        return new AppletContext();
	    }
	    getAudioClip(url, name) {
	        return new AudioClip();
	    }
	}
	class Applet extends AppletCore {
	    constructor() {
	        super(...arguments);
	        this.guestSendTask = null;
	        this.autoPeer = AutoPeer_1.default.Get();
	        this.drawCalls = new Array();
	        this.drawCallSendTimeout = null;
	        this.screen = null;
	    }
	    start() {
	        this.init();
	        this.isInitialised = true;
	        this.registerEventListeners();
	        this.repaint();
	        // bit of a hack: volleyball-original has a start() method defined which needs to be called. Call it.
	        const _this = this;
	        if (_this.start && _this.start !== Applet.prototype.start) {
	            _this.start();
	        }
	    }
	    registerEventListeners() {
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
	                this.handleEvent = (evt) => __awaiter(this, void 0, void 0, function* () { return this.autoPeer.connection.send(evt); });
	            }
	            else {
	                this.captureDrawCalls();
	            }
	        };
	        this.autoPeer.ondatareceived = data => {
	            this.autoPeer.isGuest ? this.handleDrawCalls(data) : this.handleEvent(data);
	        };
	    }
	    captureDrawCalls() {
	        Object.getOwnPropertyNames(Graphics.prototype).forEach(method => {
	            const original = this.graphics[method];
	            if (method.startsWith("get") || typeof original !== "function")
	                return;
	            this.graphics[method] = (a, b, c, d, e, f, g, h, i, j) => {
	                const args = [a, b, c, d, e, f, g, h, i, j];
	                original.apply(this.graphics, args);
	                this.drawCalls.push({ method: method, arguments: args });
	                this.sendDrawCalls();
	            };
	        });
	    }
	    sendDrawCalls() {
	        if (this.drawCallSendTimeout)
	            return;
	        this.autoPeer.connection.send(this.drawCalls.splice(0, this.drawCalls.length));
	        this.drawCallSendTimeout = requestAnimationFrame(() => {
	            this.autoPeer.connection.send(this.drawCalls.splice(0, this.drawCalls.length));
	            this.drawCallSendTimeout = null;
	        });
	    }
	    handleDrawCalls(calls) {
	        const graphics = this.graphics;
	        calls && graphics && calls.forEach(call => {
	            graphics[call.method].apply(graphics, call.arguments);
	        });
	    }
	    handleEvent(wevent) {
	        const _this = this;
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
	}
	exports.Applet = Applet;
	class Thread {
	    constructor(runnable) {
	        this.runnable = runnable;
	    }
	    static sleep(ms, b) {
	        return new Promise(res => setTimeout(res, ms));
	    }
	    start() {
	        this.runnable.run();
	    }
	    stop() {
	    }
	}
	exports.Thread = Thread;
	class PrintStream {
	    print(s) { console.log(s); }
	    println(s) { console.log(s); }
	}
	exports.PrintStream = PrintStream;
	class System {
	    static currentTimeMillis() {
	        return Date.now();
	    }
	}
	System.out = new PrintStream();
	exports.System = System;
	class AppletContext {
	    showDocument(url, str) { }
	}
	exports.AppletContext = AppletContext;
	class DocumentBase {
	    getHost() {
	        return "slimetennis.com";
	    }
	}
	exports.DocumentBase = DocumentBase;
	class URL {
	    constructor(location) {
	        this.location = location;
	    }
	    openStream() {
	        return new InputStream();
	    }
	    toString() {
	        return this.location;
	    }
	}
	exports.URL = URL;
	class BufferedImage extends Image {
	    constructor(x, y, z) {
	        super(null);
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    getSubimage(x, y, w, h) {
	        return this;
	    }
	}
	exports.BufferedImage = BufferedImage;
	class Vector {
	    constructor(n) {
	        this.arr = new Array();
	    }
	    get(i) {
	        return this.arr[i];
	    }
	    size() {
	        return this.arr.length;
	    }
	    add(numbers) {
	        this.arr.push(numbers);
	    }
	    removeAllElements() {
	        this.arr = [];
	    }
	}
	exports.Vector = Vector;
	class Element {
	    add(el) {
	    }
	}
	exports.Element = Element;
	class Frame extends Element {
	    setTitle(s) {
	    }
	    pack() {
	    }
	    show() {
	    }
	    dispose() {
	    }
	    setLayout(layout) {
	    }
	}
	exports.Frame = Frame;
	class TextField extends Element {
	    constructor(size) {
	        super();
	    }
	    getText() {
	        console.error("not implemented");
	        return "?????????????";
	    }
	}
	exports.TextField = TextField;
	class Button extends Element {
	    constructor(label) {
	        super();
	        this.label = label;
	    }
	}
	exports.Button = Button;
	class Polygon {
	    constructor(xs, ys, n) {
	        this.xs = xs;
	        this.ys = ys;
	        this.n = n;
	    }
	}
	exports.Polygon = Polygon;
	class InputStream {
	    close() { }
	}
	exports.InputStream = InputStream;
	class BufferedReader {
	    constructor(reader) {
	        this.reader = reader;
	    }
	    readLine() {
	        return null;
	    }
	    close() {
	    }
	}
	exports.BufferedReader = BufferedReader;
	class InputStreamReader {
	    constructor(stream) {
	        this.stream = stream;
	    }
	}
	exports.InputStreamReader = InputStreamReader;
	class Panel extends Element {
	}
	exports.Panel = Panel;
	class Label extends Element {
	    constructor(text) {
	        super();
	        this.text = text;
	    }
	}
	exports.Label = Label;
	class GridLayout {
	    constructor(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	}
	exports.GridLayout = GridLayout;
	class Long {
	    static parseLong(s) {
	        return Number(s);
	    }
	}
	exports.Long = Long;
	class Chars {
	    static charCodeArray(s) {
	        return s.split("").map(c => c.charCodeAt(0));
	    }
	}
	exports.Chars = Chars;
	class ImageObserver {
	}
	exports.ImageObserver = ImageObserver;
	class Random {
	    nextInt(max) {
	        return Math.floor(Math.random() * max);
	    }
	}
	exports.Random = Random;
	class AudioClip {
	    play() {
	    }
	}
	exports.AudioClip = AudioClip;
	class StringBuffer {
	    constructor(initial) {
	        this.pieces = new Array();
	        if (typeof initial !== "undefined")
	            this.append(initial);
	    }
	    append(text) {
	        this.pieces.push(text);
	        return this;
	    }
	    toString() {
	        return this.pieces.join("");
	    }
	}
	exports.StringBuffer = StringBuffer;


/***/ })
/******/ ]);
//# sourceMappingURL=slime.js.map