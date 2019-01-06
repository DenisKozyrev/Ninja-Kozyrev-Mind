import Game from './classes/Game/Game';

window.onload = function () {
    this.loadingSpriteBlock.style.display = "none";
    this.contentWrapper.style.display = "flex";
    const game = new Game();
};