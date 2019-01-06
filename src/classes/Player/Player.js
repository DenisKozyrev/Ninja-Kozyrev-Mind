import './player.css';
import './animation.css';
import './animationSprites.css';
import './audio/attackSpellAudio.mp3';
import './audio/deadAudio.mp3';
import './audio/healthAudio.mp3';

export default class Player {
  constructor() {
    this.firstName = document.getElementById('playerFirstName');
    this.lastName = document.getElementById('playerLastName');
    this.fullName = document.getElementById('playerName');
    this.playerBlock = document.getElementById('playerBlock');
    this.healthPointsBlock = document.getElementById('playerHealthPoints');
    this.hpGreenLine = document.getElementById('playerHpGreenLine');
    this.attackAudio = new Audio('./assets/audio/attackSpellAudio.mp3');
    this.deadAudio = new Audio('./assets/audio/deadAudio.mp3');
    this.healAudio = new Audio('./assets/audio/healthAudio.mp3');
  }

  render() {
    this.reset();
    this.fullName.innerHTML = `${this.firstName.value} ${this.lastName.value}`;
    this.healthPointsBlock.innerHTML = `${this.healthPoints}hp`;
    this.playerInit();
    this.addIdleCondition()
  }

  playerInit() {
    if (!localStorage.hasOwnProperty(this.fullName.innerHTML)) {
      localStorage.setItem(
        this.fullName.innerHTML,
        0
      );
    }
  }

  attack() {
    this.attackAudioPlay();
    this.addAttackCondition();
    this.removeIdleCondition();
    return new Promise(resolve => {
      const handleAttackAnimationEnd = () => {
        this.removeAttackCondition();
        this.addIdleCondition();
        this.playerBlock.removeEventListener("webkitAnimationEnd", handleAttackAnimationEnd);
        resolve();
      };
      this.playerBlock.addEventListener("webkitAnimationEnd", handleAttackAnimationEnd);
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
        this.playerBlock.addEventListener("webkitAnimationEnd", () => {
          this.removeDamageCondition();
          this.addIdleCondition();
        });
      }
    });
  }


  heal() {
    this.healthIncrease();
    this.healAudioPlay();
    this.removeIdleCondition();
    this.addHealthCondition();
    this.playerBlock.addEventListener("webkitAnimationEnd", () => {
      this.removeHealthCondition();
      this.addIdleCondition();
    });
  }

  dead() {
    this.deadAudioPlay();
    this.removeIdleCondition();
    this.addDeadCondition();
    return new Promise(resolve => {
      const handleDeadAnimationEnd = () => {
        this.playerBlock.removeEventListener("webkitAnimationEnd", handleDeadAnimationEnd);
        resolve();
      };
      this.playerBlock.addEventListener("webkitAnimationEnd", handleDeadAnimationEnd);
    });
  }

  healthDecrease() {
    this.healthPoints -= 20;
    this.healthPointsLine -= 50;
    this.healthPointsBlock.innerHTML = `${this.healthPoints}hp`;
    this.hpGreenLine.style.width = `${this.healthPointsLine}px`;
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
    this.removeHealthCondition();
    this.removeDamageCondition();
    this.removeAttackCondition();
    this.removeIdleCondition();
    this.removeDeadCondition();
    this.healthPoints = 100;
    this.healthPointsLine = 250;
    this.hpGreenLine.style.width = '250px';
    this.hpGreenLine.classList.add('character-health-render');
  }

  addIdleCondition() {
    this.playerBlock.classList.add('player-idle-sprite');
    this.playerBlock.classList.add('player-idle-animation');
  }

  addAttackCondition() {
    this.playerBlock.classList.add('player-attack-animation');
    this.playerBlock.classList.add('player-attack-sprite');
  }

  addHealthCondition() {
    this.playerBlock.classList.add('player-health-sprite');
    this.playerBlock.classList.add('player-health-animation');
  }

  addDamageCondition() {
    this.playerBlock.classList.add('player-damage-sprite');
    this.playerBlock.classList.add('player-damage-animation');
  }

  addDeadCondition() {
    this.playerBlock.classList.add('player-dead-sprite');
    this.playerBlock.classList.add('player-dead-animation');
  }

  removeIdleCondition() {
    this.playerBlock.classList.remove('player-idle-sprite');
    this.playerBlock.classList.remove('player-idle-animation');
  }

  removeAttackCondition() {
    this.playerBlock.classList.remove('player-attack-sprite');
    this.playerBlock.classList.remove('player-attack-animation');
  }

  removeHealthCondition() {
    this.playerBlock.classList.remove('player-health-sprite');
    this.playerBlock.classList.remove('player-health-animation');
  }

  removeDamageCondition() {
    this.playerBlock.classList.remove('player-damage-sprite');
    this.playerBlock.classList.remove('player-damage-animation');
  }

  removeDeadCondition() {
    this.playerBlock.classList.remove('player-dead-sprite');
    this.playerBlock.classList.remove('player-dead-animation');
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