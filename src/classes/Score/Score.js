import './scoreTable.css';

export default class Score {
    constructor() {
        this.scoreTable = document.getElementById('scoreTable');
        this.gameFild = document.getElementById('gameFild');
        this.spellWindowConteiner = document.getElementById('spellWindowConteiner');
        this.tableWindow = document.getElementById('tableWindow');
    }

    render() {
        this.scoreTable.innerHTML = "";
        this.localObjectCollection = Object.entries(localStorage).sort((a, b) => b[1] - a[1]);
        if (this.localObjectCollection.length > 10) {
            this.localObjectCollection.splice(10);
        }
        this.localObjectCollection.forEach(player => {
            this.playerScoreInfoRow = document.createElement("tr");
            this.playerScoreFullName = document.createElement("td");
            this.playerScoreRound = document.createElement("td");
            this.scoreTable.appendChild(this.playerScoreInfoRow);
            this.playerScoreInfoRow.appendChild(this.playerScoreFullName);
            this.playerScoreInfoRow.appendChild(this.playerScoreRound);
            this.playerScoreFullName.innerHTML = player[0];
            if (player[1] == 1) {
                this.playerScoreRound.innerHTML = player[1] + " " + "Monster";
            } else {
                this.playerScoreRound.innerHTML = player[1] + " " + "Monsters";
            }
        });
    }

    show() {
        this.gameFild.style.display = "none";
        this.spellWindowConteiner.style.display = "none";
        this.tableWindow.style.display = "flex";
        this.render();
    }

    hide() {
        this.tableWindow.style.display = "none";
    }
}