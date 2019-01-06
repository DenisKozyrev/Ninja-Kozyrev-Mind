import edibleInedibleLibrary from './library';
import Task from '../../Task';
import _ from 'lodash';

export default class EdibleInedibleTask extends Task {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.show();
        this.task.innerHTML = "Enter name of an edible item";
        this.randomEdibleItem = Object.keys(edibleInedibleLibrary)[_.random(0, Object.keys(edibleInedibleLibrary).length - 1)];
        edibleInedibleLibrary[this.randomEdibleItem].forEach((elem) => {
            this.edableImage = document.createElement('img');
            this.edableImage.src = elem;
            this.mediaBlock.appendChild(this.edableImage);
        });
        this.edibleInedibleResult = this.randomEdibleItem;
    }

    isSolved() {
        return this.edibleInedibleResult === this.taskInput.value.toLowerCase();
    }

}