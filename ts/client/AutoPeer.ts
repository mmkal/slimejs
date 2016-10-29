import { Applet } from "./shims"

export default class AutoPeer {
    public connection: PeerJs.DataConnection = null;
    public peer: PeerJs.Peer = null;
    public peerOptions: PeerJs.PeerJSOption = null;
    public isHost = false;
    public isGuest = false;

    public ondatareceived: (data: any) => void = null;
    public onconnected: () => void = null;

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

    private handleNewConnection(connection: PeerJs.DataConnection) {
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
        });
    }

    public async connect() {
        this.log("Connecting...");
        this.peer = await this.register();
        this.log("Registered as host: " + this.peer.id);

        this.peer.on("connection", conn => this.handleNewConnection(conn));

        const otherHostId = await this.takeHostId();
        if (!otherHostId) {
            return this.log("No hosts online. You'll have to wait.");
        }

        const connectionToOther = this.peer.connect(otherHostId);
        this.handleNewConnection(connectionToOther);
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