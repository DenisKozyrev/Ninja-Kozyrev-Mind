import translationLibrary from "./library";
import Task from '../../Task';
import _ from 'lodash';

export default class TranslationTask extends Task {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.show();
        this.randomWord = Object.keys(translationLibrary)[_.random(0, Object.keys(translationLibrary).length - 1)];
        this.task.innerHTML = "Translate a word into Russian:<br>" + " " + '\"' + this.randomWord + '\"';
        this.transateTaskResult = translationLibrary[this.randomWord];
    }

    isSolved() {
        return this.transateTaskResult.includes(this.taskInput.value.toLowerCase());
    }
}