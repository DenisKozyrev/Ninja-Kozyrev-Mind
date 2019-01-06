import riddleLibrary from './library';
import Task from '../../Task';
import _ from 'lodash';

export default class RiddleTask extends Task {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.show();
        this.randomRiddle = Object.keys(riddleLibrary)[_.random(0, Object.keys(riddleLibrary).length - 1)];
        this.task.innerHTML = "Guess a riddle:<br>" + " " + '\"' + this.randomRiddle + '\"';
        this.riddleTaskResult = riddleLibrary[this.randomRiddle];
    }

    show() {
        super.show();
        this.task.style.fontSize = '30px';
    }

    isSolved() {
        return this.taskInput.value.toLowerCase() === this.riddleTaskResult;
    }
}