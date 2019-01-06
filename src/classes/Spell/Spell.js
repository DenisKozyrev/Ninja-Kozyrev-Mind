import './spell.css';
import Keys from '../../constants/keys';
import healingSpellImg from './images/healing-spell.png';
import rageSpellImg from './images/rage-spell.png';

export default class Spell {
    constructor() {
        this.container = document.getElementById('spellWindowConteiner');
        this.conteinerInit();
        this.initAttack();
        this.initHeal();
        this.onTypeSet = function () {};
        this.type = '';
    }

    conteinerInit() {
        this.spellWindow = document.getElementById('spellWindow');
        this.chooseSpellButton = document.getElementById('chooseSpellButton');
        this.rageSpellImg = document.getElementById('rageSpellImg');
        this.rageSpellImg.src = rageSpellImg;
        this.healingSpellImg = document.getElementById('healingSpellImg');
        this.healingSpellImg.src = healingSpellImg;
        this.chooseSpellButton.addEventListener('click', this.handleChooseSpellClick.bind(this));
        this.spellWindow.addEventListener('keydown', this.handleSpellWindowButtons.bind(this))
    }

    initAttack() {
        this.attackSpellButton = document.getElementById('attackSpell');
        this.attackSpellButton.addEventListener('click', this.handleAttackSpellClick.bind(this));
    };

    initHeal() {
        this.healingSpellButton = document.getElementById('healingSpell');
        this.healingSpellButton.addEventListener('click', this.handleHealingSpellClick.bind(this));
    };

    handleChooseSpellClick() {
        this.container.style.display = 'flex';
        this.attackSpellButton.focus();
    };

    handleSpellWindowButtons(event) {
        if (event.keyCode === Keys.LEFTARROW) {
            this.attackSpellButton.style.transform = 'translateY(-10px)'
            this.healingSpellButton.style.transform = 'translateY(0)'
        } else if (event.keyCode === Keys.RIGHTARROW) {
            this.healingSpellButton.style.transform = 'translateY(-10px)'
            this.attackSpellButton.style.transform = 'translateY(0)'
        }
    }

    handleAttackSpellClick() {
        this.container.style.display = 'none';
        this.type = 'attack';
        this.onTypeSet();
    };

    handleHealingSpellClick() {
        this.container.style.display = 'none';
        this.type = 'health';
        this.onTypeSet();
    };

    isAttack() {
        return this.type === 'attack';
    }
}