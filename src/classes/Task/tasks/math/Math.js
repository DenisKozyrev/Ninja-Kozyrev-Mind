import Task from '../../Task';
import _ from 'lodash';

export default class MathTask extends Task {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.show();
    this.mathOperationsCollection = ['+', '-', '*', '/'];
    this.mathOperationsCollectionIndex = _.random(0, this.mathOperationsCollection.length - 1);
    if (this.mathOperationsCollectionIndex === 3) {
      this.taskExpression = (_.random(0, 50) + _.random(0, 50)) + " " + "/" + " " + 2;
    } else if (this.mathOperationsCollectionIndex === 2) {
      this.taskExpression = _.random(0, 50) + " " + "*" + " " + 3;
    } else {
      this.taskExpression = _.random(0, 50) + " " + this.mathOperationsCollection[this.mathOperationsCollectionIndex] + " " + _.random(0, 50);
    }
    this.task.innerHTML = "Solve The Task:<br>" + '\"' + this.taskExpression + '\"';
    this.taskExpressionResult = String(eval(this.taskExpression));
  }

  isSolved() {
    return this.taskInput.value === this.taskExpressionResult;
  }
}