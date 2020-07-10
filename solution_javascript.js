class EventSourcer {
  constructor() {
    this.value = 0;
    this.numbers = [];
    this.actions = [];
    this.redo = [];
    this.redoActions = [];
  }

  add(num) {
    this.value += num;
    this.numbers.push(num);
    this.actions.push('Add');
    this.redo.shift();
    this.redoActions.shift();
  }
  subtract(num) {
    this.value -= num;
    this.numbers.push(num);
    this.actions.push('Sub');
    this.redo.shift();
    this.redoActions.shift();
  }
  undo() {
    if(this.numbers && this.numbers.length>0) {
      let num = this.numbers.pop();
      let action = this.actions.pop();
      this.redo.push(num);
      this.redoActions.push(action);
      action === 'Add' ? this.value -= num : this.value += num;
    }
  }
  redo() {
    if(this.redo && this.redo.length>0) {
      let num = this.redo.pop();
      let action = this.redoActions.pop();
      this.numbers.push(num);
      this.actions.push(action);
      action === 'Add' ? this.value -= num : this.value += num;
    }
  }
  bulk_undo(num) {
    let length = this.numbers.length;
    for(let i= 1; i<=length;i++){
      let num = this.numbers.pop();
      let action = this.actions.pop();
      this.redo.push(num);
      this.redoActions.push(action);
      action === 'Add'? this.value -= num:this.value+=num;
      if(i === num){
        break;
      }
    }
  }
  bulk_redo(num) {
    if(this.redo && this.redo.length>0) {
      for (let i = 0; i < this.redo.length; i++) {
        let num = this.redo[i];
        let action = this.redoActions[i];
        this.numbers.push(num);
        this.actions.push(action);
        action === 'Add' ? this.value += num : this.value -= num;
      }
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
