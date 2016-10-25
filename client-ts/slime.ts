import Volleyball from "../generated-ts/volleyball";
import Soccer from "../generated-ts/soccer";
import Cricket from "../generated-ts/cricket";
import Tennis from "../generated-ts/tennis";

import AutoPeer from "./AutoPeer";
import { ShimmedApplet } from "./AppletShims";

window.onload = () => {
    const autoPeer = AutoPeer.Create("vxv7ldsv1h71ra4i");
    const connect = document.getElementById("connect") as HTMLButtonElement;

    const games: { [key: string]: any } = { Volleyball, Soccer, Cricket, Tennis };
    function startGame(name: string) {
        const buttons = Array.from(document.querySelectorAll("#games button"));
        buttons.forEach((b: HTMLButtonElement) => b.disabled = (b.textContent === name));
        autoPeer.disconnect();
        connect.onclick = () => autoPeer.connect(games[name]);
        
        const oldCanvas = document.querySelector("canvas");
        const newCanvas = document.createElement("canvas");
        Array.from(oldCanvas.attributes).forEach(attr => newCanvas.setAttribute(attr.name, attr.value));
        oldCanvas.parentNode.insertBefore(newCanvas, oldCanvas);
        oldCanvas.parentNode.removeChild(oldCanvas);

        const game = new games[name]();
        game.start();

        if (name === "Soccer" || name == "Cricket") game.run(); 
    }

    Object.keys(games).forEach(name => {
        const game: ShimmedApplet = games[name];
        const button = document.createElement("button");
        button.textContent = name;
        button.onclick = () => startGame(name);
        document.getElementById("games").appendChild(button);
    });
    startGame("Soccer");
};