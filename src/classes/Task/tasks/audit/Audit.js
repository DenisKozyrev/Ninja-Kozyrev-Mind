import auditLibrary from './library';
import Task from '../../Task';
import _ from 'lodash';

export default class AuditTask extends Task {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.show();
        this.task.innerHTML = '\"' + "Type what you heard" + '\"';
        this.audioWordBlock = document.createElement('audio');
        this.audioWordBlock.setAttribute('controls', '');
        this.mediaBlock.appendChild(this.audioWordBlock);
        this.randomAudioWord = Object.keys(auditLibrary)[_.random(0, Object.keys(auditLibrary).length - 1)];
        this.audioWordBlock.src = this.randomAudioWord;
        this.listeningTaskResult = auditLibrary[this.randomAudioWord];
    }

    isSolved() {
        return this.listeningTaskResult === this.taskInput.value.toLowerCase();
    }
}