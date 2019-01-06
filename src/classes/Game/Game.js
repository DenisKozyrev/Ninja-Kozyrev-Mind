import './assets/css/game.css';
import './assets/css/animation.css';
import './assets/css/backgroundImages.css';
import '../../landing/landingPage.css';
import './assets/audio/gameSoundtreck.mp3';

import taskFactory, {
    taskTypes
} from '../Task/tasks/taskFactory';
import Rounds from '../../constants/rounds';
import Backgrounds from '../../constants/backgrounds';
import Player from '../Player/Player';
import Monster from '../Monster/Monster';
import Spell from '../Spell/Spell';
import Score from '../Score/Score';
import Keys from '../../constants/keys';

export default class Game {
    constructor() {
        this.player = new Player();
        this.monster = new Monster();
        this.spell = new Spell();
        this.spell.onTypeSet = () => {
            this.task = taskFactory(taskTypes.getRandomTaskType());
            this.task.onAnswer = () => {
                this.taskSolveCheck();
            };
        };
        this.score = new Score();

        this.currentRound = Rounds.INITIAL_ROUND;

        this.init();
    }
    
    init() {
        this.gameSoundtreck = new Audio('./assets/audio/gameSoundtreck.mp3');

        this.musicMuteButton = document.getElementById('musicMuteButton');
        this.loadingSpriteBlock = document.getElementById('loadingSpriteBlock');
        this.checkinBlock = document.getElementById('checkinBlock');
        this.playerProfilePage = document.getElementById('playerProfilePage');
        this.playerFirstName = document.getElementById('playerFirstName');
        this.playerLastName = document.getElementById('playerLastName');
        this.gameFild = document.getElementById('gameFild');
        this.roundHeading = document.getElementById('roundHeading');
        this.startAgainButton = document.getElementById('startAgainButton');
        this.profileForm = document.getElementById('profileForm');
        this.newGameButton = document.getElementById('newGameButton');
        this.aboutButton = document.getElementById('aboutButton');
        this.startGameButtonsBlock = document.getElementById('startGameButtonsBlock');

        this.aboutButton.addEventListener('click', this.handleOpenLandingPage.bind(this));
        this.newGameButton.addEventListener('click', this.handleShowProfilePage.bind(this));
        this.profileForm.addEventListener('submit', this.handleProfileFormValidation.bind(this));
        this.startGameButtonsBlock.addEventListener('keydown', this.handleStartGameButtons.bind(this));
        this.startAgainButton.addEventListener('click', this.handleStartNewGame.bind(this));
    }


    start() {
        this.playGameSoundtreck();
        this.hideProfilePage();
        this.handleShowGameFild();
        this.reset();
        this.player.render();
        this.monster.render();
        this.roundHeading.innerHTML = `Round ${this.currentRound + 1}`;
    }

    newRound() {
        this.currentRound += 1;
        this.changeBackground();
        this.monster.render();
        this.roundHeading.innerHTML = `Round ${this.currentRound + 1}`;
    }


    changeBackground() {
        this.gameFild.classList.remove(`game-fild-background${this.currentBackground}`)
        if (this.currentBackground === Backgrounds.LASTBACKGROUND) {
            this.currentBackground = Backgrounds.FIRSTBACKGROUND;
        } else {
            this.currentBackground += Backgrounds.NEXTBACKGROUND;
        };
        this.gameFild.classList.add(`game-fild-background${this.currentBackground}`);
    }

    taskSolveCheck() {
        this.task.hide();
        if (this.spell.isAttack()) {
            if (this.task.isSolved()) {
                this.player.attack().then(() => {
                    this.monster.damage()
                        .then(() => {
                            this.monster.dead()
                                .then(() => {
                                    this.newRound()
                                });
                        });
                });
            } else {
                this.monster.attack().then(() => {
                    this.player.damage()
                        .then(() => {
                            this.player.dead()
                                .then(() => {
                                    localStorage[this.player.fullName.innerHTML] = this.currentRound;
                                    this.score.show();
                                })
                        });
                });
            }
        } else {
            if (this.task.isSolved()) {
                this.player.heal();
            } else {
                this.monster.heal();
            }
        }
    }

    playGameSoundtreck() {
        this.musicMuteButton.addEventListener('click', () => {
            this.musicMuteButton.classList.toggle('volume-off');
            this.gameSoundtreck.muted = !this.gameSoundtreck.muted;
        });
        this.gameSoundtreck.loop = true;
        this.gameSoundtreck.volume = 0.1;
        this.gameSoundtreck.play();
    }

    reset() {
        this.currentRound = Rounds.INITIAL_ROUND;
        this.currentBackground = Backgrounds.FIRSTBACKGROUND;
    }

    handleShowProfilePage() {
        this.startGameButtonsBlock.style.display = "none";
        this.checkinBlock.style.display = "block";
        this.playerFirstName.focus();
    }

    hideProfilePage() {
        this.playerProfilePage.style.display = "none";
    }

    handleShowGameFild() {
        this.gameFild.style.display = "flex";
    }

    handleProfileFormValidation() {
        if (this.playerFirstName.value != "" && this.playerLastName.value != "") {
            this.start();
        };
        event.preventDefault();
    }

    handleStartNewGame() {
        this.score.hide();
        this.start();
    }

    handleStartGameButtons(event) {
        if (event.keyCode === Keys.UPARROW) {
            this.aboutButton.focus()
        } else if (event.keyCode === Keys.DOWNARROW) {
            this.newGameButton.focus();
        }
    }

    handleOpenLandingPage() {
        location.href = 'index.html'
    }
}