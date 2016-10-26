import games from "../generated-ts/games";

import AutoPeer from "./AutoPeer";
import { Applet } from "./AppletShims";

window.onload = () => {
    const autoPeer = AutoPeer.Create("vxv7ldsv1h71ra4i");
    const connect = document.getElementById("connect") as HTMLButtonElement;
    const gamesEl = document.getElementById("games");

    const gameNames = Object.keys(games);
    gameNames.forEach(name => {
        const button = document.createElement("button");
        button.textContent = name;
        button.onclick = () => startGame(name);
        gamesEl.appendChild(button);
    });
    startGame(gameNames[0]);

    function startGame(name: string) {
        Array.from(gamesEl.querySelectorAll("button")).forEach((b: HTMLButtonElement) => b.disabled = (b.textContent === name));
        const disconnection = autoPeer.disconnect();
        
        const oldCanvas = document.querySelector("canvas");
        const newCanvas = document.createElement("canvas");
        Array.from(oldCanvas.attributes).forEach(attr => newCanvas.setAttribute(attr.name, attr.value));
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);

        const game: Applet = new games[name]();
        connect.onclick = async () => {
            await disconnection;
            autoPeer.connect(game);
        };
        game.start();
        document.title = name;
    }
};