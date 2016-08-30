/// <reference path="typings/index.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class AutoPeer {
    constructor(apiKey) {
        this.connectionToHost = null;
        this.connectionToGuest = null;
        this.peerOptions = null;
        this.localPeers = new Set();
        this.hostPrefix = "host1";
        this.peerOptions = {
            key: apiKey
        };
        this.connectButton = $("<button>connect</button>");
        this.connectButton.click(ev => {
            this.connect(window["activeGame"]);
        });
        this.logDiv = $("<div></div>");
        $(document.body).ready(() => {
            $(document.body).append(this.connectButton);
            $(document.body).append(this.logDiv);
        });
    }
    get isAlreadyConnected() {
        return !!this.connectionToHost || !!this.connectionToGuest;
    }
    log(text) {
        console.log(text);
        this.logDiv.text(text);
    }
    connect(game) {
        return __awaiter(this, void 0, void 0, function* () {
            let hostPeer = null;
            for (let id = 0; id < 3; id++) {
                if (this.isAlreadyConnected) {
                    return;
                }
                const connectionToHost = yield this.connectToHost(id);
                if (this.isAlreadyConnected) {
                    return;
                }
                if (connectionToHost) {
                    game.showStatus("Connected");
                    connectionToHost.serialization = "json";
                    this.connectionToHost = connectionToHost;
                    connectionToHost.on("data", (hostGameState) => {
                        game.restoreFromRemote(hostGameState);
                    });
                    return;
                }
                if (!hostPeer) {
                    const hostId = this.hostPrefix + id;
                    this.log(hostId + " seems to be an available host id, I'll establish myself as that.");
                    hostPeer = new Peer(this.hostPrefix + id, this.peerOptions);
                    this.connectToGuest(hostPeer).then(connectionToGuest => {
                        if (this.isAlreadyConnected) {
                            return;
                        }
                        if (connectionToGuest === null) {
                            throw "Failed to connect to guest. Try refreshing";
                        }
                        game.showStatus("Connected");
                        connectionToGuest.serialization = "json";
                        this.connectionToGuest = connectionToGuest;
                        connectionToGuest.on("data", (wevent) => {
                            game.handleEvent(wevent);
                        });
                    });
                }
            }
        });
    }
    connectToHost(id) {
        const hostId = this.hostPrefix + id;
        const guestId = "guest" + Math.random().toString().substring(2);
        this.localPeers.add(guestId);
        const connectionDebugInfo = hostId + " as " + guestId;
        var peer = new Peer(guestId, this.peerOptions);
        this.log("Trying to connect to " + connectionDebugInfo);
        return new Promise((complete, error) => {
            const conn = peer.connect(hostId);
            const tooSlowTimeout = setTimeout(() => {
                this.log("Too slow to connect to " + connectionDebugInfo);
                complete(null);
            }, 3000);
            conn.on("open", () => {
                this.log("Connection opened to " + connectionDebugInfo);
                conn["once"]("data", (success) => {
                    clearTimeout(tooSlowTimeout);
                    if (success) {
                        this.log("Connection to " + connectionDebugInfo + " successful.");
                        complete(conn);
                    }
                    else {
                        this.log("Connection to " + connectionDebugInfo + " rejected/failed.");
                        complete(null);
                    }
                });
            });
        }).then((conn) => {
            if (conn) {
                this.log("I am " + peer.id + " and I am now connected to " + conn.peer);
            }
            else {
                this.log("Destroying peer " + peer.id);
                peer.destroy();
                peer.disconnect();
            }
            return conn;
        });
    }
    connectToGuest(hostPeer) {
        if (this.isAlreadyConnected) {
            return;
        }
        this.log("Waiting for guest connections");
        return new Promise((complete, error) => {
            hostPeer.on("connection", conn => {
                if (this.localPeers.has(conn.peer)) {
                    this.log("Tried to connect to self. Ignoring connection.");
                    return;
                }
                conn.on("open", () => {
                    if (this.isAlreadyConnected) {
                        this.log("Guest tried to open connection but I'm already connected, rejecting.");
                        conn.send(false);
                        return;
                    }
                    this.log("Guest opened connection, accepting...");
                    conn.send(true);
                    this.log("I am " + hostPeer.id + " and I am now connected to " + conn.peer);
                    complete(conn);
                });
            });
        });
    }
}
//# sourceMappingURL=AutoPeer.js.map