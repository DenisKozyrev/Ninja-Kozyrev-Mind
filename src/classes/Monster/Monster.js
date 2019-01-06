import _ from 'lodash';

import './monster.css';
import './animation.css';
import './animationSprites.css';
import './audio/attackSpellAudio.mp3';
import './audio/deadAudio.mp3';
import './audio/healthAudio.mp3';

export default class Monster {
    constructor() {
        this.fullNameBlock = document.getElementById('monsterName');
        this.nameCollection = [
            ['Slyunyavyiy', 'Moydodyirnyiy', 'Zlovonnyiy', 'Podmyishachnyiy', 'Podnozhnyiy'],
            ['Giperslizen', 'Kamnezmey', 'Tigrokruis', 'Svinozayats', 'Zloboglaz'],
            ['Artem', 'Denis', 'Andrey', 'Yura', 'Vanya']
        ];
        this.healthPointsBlock = document.getElementById('monsterHealthPoints');
        this.hpGreenLine = document.getElementById('monsterHpGreenLine');
        this.monsterBlock = document.getElementById('monsterBlock');
        this.monsterSpritesCollection = ['robot', 'dino', 'freeknight', 'jack', 'dog', 'cat'];
        this.attackAudio = new Audio('./assets/audio/attackSpellAudio.mp3');
        this.deadAudio = new Audio('./assets/audio/deadAudio.mp3');
        this.healAudio = new Audio('./assets/audio/healthAudio.mp3');
    }

    render() {
        this.reset()
        this.monsterSprite = this.monsterSpritesCollection[_.random(0, this.monsterSpritesCollection.length - 1)];
        this.monsterName = this.nameCollection[0][_.random(0, this.nameCollection[0].length - 1)] + " " + this.nameCollection[1][_.random(0, this.nameCollection[1].length - 1)] + " " + this.nameCollection[2][_.random(0, this.nameCollection[2].length - 1)];
        this.fullNameBlock.innerHTML = this.monsterName;
        this.healthPointsBlock.innerHTML = `${this.healthPoints}hp`;
        this.addIdleCondition();
    }

    attack() {
        this.attackAudioPlay();
        this.removeIdleCondition()
        this.addAttackCondition();
        return new Promise(resolve => {
            const handleAttackAnimationEnd = () => {
                this.removeAttackCondition();
                this.addIdleCondition();
                this.monsterBlock.removeEventListener("webkitAnimationEnd", handleAttackAnimationEnd);
                resolve();
            };
            this.monsterBlock.addEventListener("webkitAnimationEnd", handleAttackAnimationEnd);
        });
    }

    damage() {
        this.healthDecrease();
        return new Promise(resolve => {
            if (this.healthPoints === 0) {
                resolve();
            } else {
                this.removeIdleCondition();
                this.addDamageCondition();
                this.monsterBlock.addEventListener("webkitAnimationEnd", () => {
                    this.removeDamageCondition()
                    this.addIdleCondition();
                });
            };
        });
    }

    heal() {
        this.healthIncrease();
        this.healAudioPlay();
        this.addHealthCondition();
        this.monsterBlock.addEventListener("webkitAnimationEnd", () => {
            this.removeHealthCondition();
            this.addIdleCondition();
        });
    }


    dead() {
        this.deadAudioPlay();
        this.removeIdleCondition()
        this.addDeadCondition();
        return new Promise(resolve => {
            const handleDeadAnimationEnd = () => {
                this.monsterBlock.removeEventListener("webkitAnimationEnd", handleDeadAnimationEnd);
                resolve();
            };
            this.monsterBlock.addEventListener("webkitAnimationEnd", handleDeadAnimationEnd);
        });
    }

    healthDecrease() {
        this.healthPoints -= 20;
        this.healthPointsLine -= 50;
        this.healthPointsBlock.innerHTML = `${this.healthPoints}hp`;
        this.hpGreenLine.style.width = `${this.healthPointsLine}px`;
        this.hpGreenLine.classList.remove('character-health-render');
    }

    healthIncrease() {
        if (this.healthPoints >= 100) {
            return;
        };
        this.healthPoints += 20;
        this.healthPointsLine += 50;
        this.healthPointsBlock.innerHTML = `${this.healthPoints}hp`;
        this.hpGreenLine.style.width = `${this.healthPointsLine}px`;
    }

    reset() {
        this.removeDeadCondition();
        this.removeIdleCondition();
        this.removeHealthCondition();
        this.removeAttackCondition();
        this.healthPoints = 100;
        this.healthPointsLine = 250;
        this.hpGreenLine.style.width = '250px'
        this.hpGreenLine.classList.add('character-health-render');
    }

    addHealthCondition() {
        this.monsterBlock.classList.add(`${this.monsterSprite}-health-sprite`);
        this.monsterBlock.classList.add('monster-health-animation');
    }
    addDamageCondition() {
        this.monsterBlock.classList.add(`${this.monsterSprite}-damage-sprite`);
        this.monsterBlock.classList.add('monster-damage-animation');
    }

    addAttackCondition() {
        this.monsterBlock.classList.add('monster-attack-animation');
        this.monsterBlock.classList.add(`${this.monsterSprite}-attack-sprite`);
    }

    addIdleCondition() {
        this.monsterBlock.classList.add(`${this.monsterSprite}-idle-sprite`);
        this.monsterBlock.classList.add('monster-idle-animation');
    }

    addDeadCondition() {
        this.monsterBlock.classList.add(`${this.monsterSprite}-dead-sprite`);
        this.monsterBlock.classList.add('monster-dead-animation');
    }

    removeIdleCondition() {
        this.monsterBlock.classList.remove(`${this.monsterSprite}-idle-sprite`);
        this.monsterBlock.classList.remove('monster-idle-animation');
    }

    removeHealthCondition() {
        this.monsterBlock.classList.remove(`${this.monsterSprite}-health-sprite`);
        this.monsterBlock.classList.remove('monster-health-animation');
    }

    removeDamageCondition() {
        this.monsterBlock.classList.remove(`${this.monsterSprite}-damage-sprite`);
        this.monsterBlock.classList.remove('monster-damage-animation');
    }

    removeAttackCondition() {
        this.monsterBlock.classList.remove(`${this.monsterSprite}-attack-sprite`);
        this.monsterBlock.classList.remove('monster-attack-animation');
    }
    removeDeadCondition() {
        this.monsterBlock.classList.remove(`${this.monsterSprite}-dead-sprite`);
        this.monsterBlock.classList.remove('monster-dead-animation');
    }

    attackAudioPlay() {
        this.attackAudio.play();
    }

    deadAudioPlay() {
        this.deadAudio.play();
    }

    healAudioPlay() {
        this.healAudio.play();
    }

}