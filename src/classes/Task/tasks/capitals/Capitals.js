import capitalsLibrary from './library';
import Task from '../../Task';
import _ from 'lodash';

export default class CapitalsTask extends Task {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.show();
        this.task.innerHTML = "Enter the capital of this country";
        this.randomEdibleItem = Object.keys(capitalsLibrary)[_.random(0, Object.keys(capitalsLibrary).length - 1)];
        this.countryFlagImg = document.createElement('img');
        this.countryFlagImg.src = this.randomEdibleItem;
        this.mediaBlock.appendChild(this.countryFlagImg);
        this.capitalsTaskResult = capitalsLibrary[this.randomEdibleItem];
    }

    isSolved() {
        return this.capitalsTaskResult === this.taskInput.value.toLowerCase();
    }

}