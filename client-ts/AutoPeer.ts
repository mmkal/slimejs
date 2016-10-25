import { ShimmedApplet, ShimmedEvent } from "./AppletShims"

export default class AutoPeer {
    public connectionToHost: PeerJs.DataConnection = null;
    public connectionToGuest: PeerJs.DataConnection = null;
    public peerOptions: PeerJs.PeerJSOption = null;
    private localPeers = new Set<string>();
    public get isAlreadyConnected() {
        return !!this.connectionToHost || !!this.connectionToGuest;
    }

    private hostPrefix = "host1";

    private static instance: AutoPeer = null;
    /** Get the AutoPeer instance. This will throw if there's no instance, so make sure it's initialised before calling this. */
    public static Get() {
        if (!AutoPeer.instance) {
            throw new Error("No instance of AutoPeer exists");
        }
        return AutoPeer.instance;
    }
    /** Create and return the AutoPeer instance. */
    public static Create(apiKey: string) {
        if (AutoPeer.instance) {
            throw new Error(`There's already an AutoPeer instance.`);
        }

        return AutoPeer.instance = new AutoPeer(apiKey);
    }

    private constructor(apiKey: string) {
        this.peerOptions = {
            key: apiKey
        };
    }

    private log(text: string) {
        console.log(text);
        document.querySelector(".peerjs-log").textContent = text;
    }

    public disconnect() {
        [this.connectionToGuest, this.connectionToHost].filter(conn => !!conn).forEach(conn => conn.close());
        this.connectionToGuest = null;
        this.connectionToHost = null;
    }

    public async connect(game: ShimmedApplet) {
        let hostPeer: PeerJs.Peer = null;
        for (let id = 0; id < 3; id++) {
            if (this.isAlreadyConnected) {
                return;
            }

            const connectionToHost = await this.connectToHost(id);
            if (this.isAlreadyConnected) {
                return;
            }
            if (connectionToHost) {
                game.showStatus("Connected");
                connectionToHost.serialization = "json";
                this.connectionToHost = connectionToHost;
                connectionToHost.on("data", (hostGameState: ShimmedApplet) => {
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
                    connectionToGuest.on("data", (evt: ShimmedEvent) => {
                        game.onEvent(evt);
                    });
                });
            }
        }
    }

    private connectToHost(id: number): Promise<PeerJs.DataConnection> {
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
                conn["once"]("data", (success: boolean) => {
                    clearTimeout(tooSlowTimeout);
                    if (success) {
                        this.log("Connection to " + connectionDebugInfo + " successful.");
                        complete(conn);
                    } else {
                        this.log("Connection to " + connectionDebugInfo + " rejected/failed.");
                        complete(null);
                    }
                });
            });
        }).then((conn: PeerJs.DataConnection) => {
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

    private connectToGuest(hostPeer: PeerJs.Peer): Promise<PeerJs.DataConnection> {
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