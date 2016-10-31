import games from "../../out/ts/games-index";

import AutoPeer from "./AutoPeer";
import { Applet } from "./shims";

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
    startGame(gameNames.filter(g => g.indexOf("soccer") > -1)[0] || gameNames[0]);

    function startGame(name: string) {
        Array.from(gamesEl.querySelectorAll("button")).forEach((b: HTMLButtonElement) => b.disabled = (b.textContent === name));
        const disconnection = autoPeer.disconnect();
        
        const oldCanvas = document.querySelector("canvas");
        const newCanvas = document.createElement("canvas");
        oldCanvas.parentNode.replaceChild(newCanvas, oldCanvas);

        const game: Applet = new games[name]();

        Array.from(oldCanvas.attributes).forEach(attr => newCanvas.setAttribute(attr.name, attr.value));
        ["recommended_width", "recommended_height"].forEach(prop => {
            if (game[prop]) {
                newCanvas.setAttribute(prop.replace("recommended_", ""), game[prop]);
            }
        });

        connect.onclick = async () => {
            await disconnection;
            autoPeer.connect();
        };
        Applet.prototype.start.call(game);
        document.title = name;
    }
};