import anagramLibrary from './library';
import Task from '../../Task';

export default class AnagranTask extends Task {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.show();
        this.task.innerHTML = "Arrange in the right order";
        this.dragDropRandomWord = Object.keys(anagramLibrary)[_.random(0, Object.keys(anagramLibrary).length - 1)];
        this.dragDropRandomWordLetters = this.dragDropRandomWord.split('').sort(function () {
            return Math.random() - 0.5;
        });;
        this.dragDropRandomWordLetters.forEach((letter) => {
            this.letterBlock = document.createElement('div');
            this.letterBlock.classList.add('anagram-letter-blocks');
            this.letterBlock.innerHTML = letter;
            this.mediaBlock.appendChild(this.letterBlock);
        });
        $(function () {
            $('#mediaBlock').sortable();
            $('#mediaBlock').disableSelection();
        });
        this.dragDropTaskResult = anagramLibrary[this.dragDropRandomWord];
    }


    handleAnswerButtonClick() {
        this.addAnswer();
        super.handleAnswerButtonClick();
    }

    show() {
        super.show();
        this.hideTaskInput()
    }

    addAnswer() {
        this.dragDropLetters = document.querySelectorAll('.anagram-letter-blocks');
        this.taskInput.value = "";
        this.dragDropInput = "";
        this.dragDropLetters.forEach((letterBlock) => {
            this.dragDropInput = this.dragDropInput + letterBlock.innerHTML;
        });
        this.taskInput.value = this.dragDropInput;
    }

    isSolved() {
        return this.dragDropTaskResult === this.taskInput.value;
    }

    hideTaskInput() {
        this.taskInput.style.visibility = 'hidden';
    }
}