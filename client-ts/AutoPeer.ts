import { Applet } from "./AppletShims"

export default class AutoPeer {
    public connection: PeerJs.DataConnection = null;
    public peer: PeerJs.Peer = null;
    public peerOptions: PeerJs.PeerJSOption = null;
    public isHost = false;
    public isGuest = false;

    private readonly server = "https://glen-pine.hyperdev.space/";

    private constructor(apiKey: string) {
        this.peerOptions = {
            key: apiKey
        };
        $.get(this.server + "ping").then(pong => {
            this.log("Server is awake, and says: " + pong);
        });
    }

    private static instance: AutoPeer = null;
    /** Get the AutoPeer0 instance. This will throw if there's no instance, so make sure it's initialised before calling this. */
    public static Get() {
        if (!AutoPeer.instance) {
            throw new Error("No instance of AutoPeer0 exists");
        }
        return AutoPeer.instance;
    }
    /** Create and return the AutoPeer0 instance. */
    public static Create(apiKey: string) {
        if (AutoPeer.instance) {
            throw new Error(`There's already an AutoPeer0 instance.`);
        }

        return AutoPeer.instance = new AutoPeer(apiKey);
    }

    private log(text: string) {
        console.log(text);
        const logEl = document.getElementById("peerjs-log")
        if (logEl) logEl.innerText += "\r\n" + text;
    }

    private async register() {
        const peer = new Peer(Date.now().toString(), this.peerOptions);
        await $.post(this.server + "host?" + $.param({ id: peer.id }));
        return peer;
    }

    private async deleteHostId(id?: string) {
        return await $.post(this.server + "deletehost?" + $.param({ id }));
    }

    private async takeHostId() {
        return await $.post(this.server + "takehost?" + $.param({ me: this.peer.id }));
    }

    private handleNewConnection(connection: PeerJs.DataConnection, applet: Applet) {
        this.log(`Connection to ${connection.peer} established. Opening...`);
        connection["once"]("data", d => this.log("Received some data from " + connection.peer + ": " + d));
        connection.on("open", async () => {
            this.log(`Connection to ${connection.peer} opened.`);
            await this.deleteHostId(this.peer.id);
            if (this.connection) {
                this.log(`New connection to ${connection.peer} arrived but we're already connected to ${this.connection.peer}. Closing the new connection.`)
                connection.close();
                return;
            }
            connection.on("close", () => {
                this.log(`Connection with ${connection.peer} was closed. Try refreshing.`);
            });
            this.isHost = Number(this.peer.id) < Number(connection.peer);
            this.isGuest = !this.isHost;
            this.log(`Now connected to ${connection.peer}. You are ${this.isHost ? "host" : "guest"}.`);
            const dataHandler = this.isHost ? ev => applet.onEvent(ev) : state => applet.restoreFromRemote(state);
            connection.on("data", dataHandler); 
            connection.serialization = "json";
            connection.send("Hi I'm " + this.peer.id);
            this.connection = connection;
        });
    }

    public async connect(applet: Applet) {
        this.log("Connecting...");
        this.peer = await this.register();
        this.log("Register as host: " + this.peer.id);

        this.peer.on("connection", conn => this.handleNewConnection(conn, applet));

        const otherHostId = await this.takeHostId();
        if (!otherHostId) {
            return this.log("No hosts online. You'll have to wait.");
        }

        const connectionToOther = this.peer.connect(otherHostId);
        this.handleNewConnection(connectionToOther, applet);
    }

    public async disconnect() {
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
        if (this.peer) {
            await this.deleteHostId(this.peer.id);
        }
    }
}