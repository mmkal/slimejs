import Volleyball from "../generated-ts/volleyball";
import Soccer from "../generated-ts/soccer";
import Cricket from "../generated-ts/cricket";
import Tennis from "../generated-ts/tennis";

import AutoPeer from "./AutoPeer";
import { ShimmedApplet } from "./AppletShims";

window.onload = () => {
    const autoPeer = AutoPeer.Create("vxv7ldsv1h71ra4i");
    const connect = document.getElementById("connect") as HTMLButtonElement;
    const gamesEl = document.getElementById("games");

    const games: { [key: string]: any } = { Volleyball, Soccer, Cricket, Tennis };

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
        autoPeer.disconnect();
        
        const oldCanvas = document.querySelector("canvas");
        const newCanvas = document.createElement("canvas");
        Array.from(oldCanvas.attributes).forEach(attr => newCanvas.setAttribute(attr.name, attr.value));
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);

        const game = new games[name]();
        connect.onclick = () => autoPeer.connect(game);
        game.start();
    }
};