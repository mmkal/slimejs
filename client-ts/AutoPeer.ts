import { ShimmedApplet, ShimmedEvent } from "./AppletShims"

export default class AutoPeer0 {
    public connectionToHost: PeerJs.DataConnection = null;
    public connectionToGuest: PeerJs.DataConnection = null;
    public peerOptions: PeerJs.PeerJSOption = null;
    private localPeers = new Set<string>();
    public get isAlreadyConnected() {
        return !!this.connectionToHost || !!this.connectionToGuest;
    }

    private hostPeer: PeerJs.Peer;
    private readonly server = "https://glen-pine.hyperdev.space/";

    private constructor(apiKey: string) {
        this.peerOptions = {
            key: apiKey
        };
        $.get(this.server + "ping").then(pong => {
            this.log("Server is awake, and says: " + pong);
        });
    }

    private static instance: AutoPeer0 = null;
    /** Get the AutoPeer0 instance. This will throw if there's no instance, so make sure it's initialised before calling this. */
    public static Get() {
        if (!AutoPeer0.instance) {
            throw new Error("No instance of AutoPeer0 exists");
        }
        return AutoPeer0.instance;
    }
    /** Create and return the AutoPeer0 instance. */
    public static Create(apiKey: string) {
        if (AutoPeer0.instance) {
            throw new Error(`There's already an AutoPeer0 instance.`);
        }

        return AutoPeer0.instance = new AutoPeer0(apiKey);
    }

    private createId(prefix: string) {
        return prefix + Math.random().toString().substring(2);
    }

    private log(text: string) {
        console.log(text);
        const logEl = document.getElementById("peerjs-log")
        if (logEl) logEl.innerText += "\r\n" + text;
    }

    private async validateConnection(connection: PeerJs.DataConnection) {
        await this.deleteHostId(this.hostPeer.id);
        if (this.isAlreadyConnected) {
            connection.close();
            return null;
        }
        connection.on("close", () => {
            this.log("You've been kicked. Try refreshing.");
        });
        return connection;
    }

    private async registerAsHost() {
        const hostPeer = new Peer(this.createId("host"), this.peerOptions);
        const success = await $.post(this.server + "host?" + $.param({ id: hostPeer.id }));
        return hostPeer;
    }

    private async deleteHostId(id?: string) {
        return await $.post(this.server + "deletehost?" + $.param({ id }));
    }

    private async takeHostId() {
        return await $.post(this.server + "takehost?" + $.param({ me: this.hostPeer.id }));
    }

    private async connectToOtherHost(otherHostId: string) {
        const peer = new Peer(this.createId("guest"), this.peerOptions);
        let conn = peer.connect(otherHostId);

        conn = await this.validateConnection(conn);

        return conn;
    }

    public async connect(game: ShimmedApplet) {
        this.log("connecting...");
        this.hostPeer = await this.registerAsHost();
        this.log("Registered as " + this.hostPeer.id);
        this.hostPeer.on("connection", async (connection) => {
            this.log(connection.peer + " is trying to connect. Opening connection...");
            connection.on("data", d => this.log("Received some data from " + connection.peer + ": " + d));
            connection.on("open", async () => {
                this.log("Connection with " + connection.peer + " opened.");
                this.connectionToGuest = await this.validateConnection(connection);
                if (!this.connectionToGuest) {
                    return this.log(connection.peer + " was bullshit. Maybe you're already connected to someone?");
                }
                this.log("Now connected. You are host.");
                connection.send("host is alive");
            });
        });

        const otherHostId = await this.takeHostId();
        if (!otherHostId) {
            this.log("No hosts online. You'll have to wait.");
            return;
        }
        
        this.log("Found other host id: " + otherHostId);

        const connection = await this.connectToOtherHost(otherHostId);
        this.log("Found a connection to " + connection.peer + ". Opening...");
        connection.on("open", async () => {
            this.log("Connection with " + connection.peer + " opened.");
            connection.on("data", d => this.log("Received some data from " + connection.peer + ": " + d));
            this.connectionToHost = await this.validateConnection(connection);
            if (!this.connectionToHost) {
                    return this.log(connection.peer + " was bullshit. Maybe you're already connected to someone?");
            }
            this.log("Now connected. You are guest");
            connection.send("guest is alive");
        });
    }

    public async disconnect() {
        this.connectionToGuest && this.connectionToGuest.close();
        this.connectionToHost && this.connectionToHost.close();
        
        this.connectionToGuest = null;
        this.connectionToHost = null;

        this.hostPeer && this.deleteHostId(this.hostPeer.id);
    }
}