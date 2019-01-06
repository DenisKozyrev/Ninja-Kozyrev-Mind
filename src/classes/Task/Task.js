import '../Task/task.css';
import Keys from '../../constants/keys'

export default class Task {
    constructor() {
        this.taskAnswerButton = document.getElementById('taskButton');
        this.taskWindowConteiner = document.getElementById('taskWindowConteiner');
        this.mediaBlock = document.getElementById('mediaBlock');
        this.task = document.getElementById('taskHeading');
        this.taskInput = document.getElementById('taskInput');
        this.taskAnswerButton.addEventListener('click', this.handleAnswerButtonClick.bind(this));
        this.taskInput.addEventListener('keydown', this.handleAnswerButtonKeydown.bind(this));
        this.onAnswer = function () {};
    }


    handleAnswerButtonClick() {
        if (this.taskInput.value !== "") {
            this.onAnswer();
            this.taskInput.value = "";
        } else {
            this.taskInput.focus();
        }
    }

    handleAnswerButtonKeydown(event) {
        if (event.keyCode === Keys.ENTER) {
            this.handleAnswerButtonClick()
        }
    }

    show() {
        this.taskWindowConteiner.style.display = "flex";
        this.mediaBlock.innerHTML = "";
        this.taskInput.value = "";
        this.task.style.fontSize = '40px';
        this.taskInput.style.visibility = 'visible';
        this.taskInput.focus();
    }

    isSolved() {
        return true;
    }

    hide() {
        this.taskWindowConteiner.style.display = "none";
    }

}