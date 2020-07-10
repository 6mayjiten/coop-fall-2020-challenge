class EventSourcer {
  constructor() {
    this.value = 0;
    this.numbers = [];
    this.actions = [];
    this.redoArr = [];
    this.redoActions = [];
  }

  add(num) {
    this.value += num;
    this.numbers.push(num);
    this.actions.push('Add');
    this.redoArr.shift();
    this.redoActions.shift();
  }
  subtract(num) {
    this.value -= num;
    this.numbers.push(num);
    this.actions.push('Sub');
    this.redoArr.shift();
    this.redoActions.shift();
  }
  undo() {
    if(this.numbers && this.numbers.length>0) {
      let num = this.numbers.pop();
      let action = this.actions.pop();
      this.redoArr.push(num);
      this.redoActions.push(action);
      action === 'Add' ? this.value -= num : this.value += num;
    }
  }
  redo() {
    if(this.redoArr && this.redoArr.length>0) {
      let num = this.redoArr.pop();
      let action = this.redoActions.pop();
      this.numbers.push(num);
      this.actions.push(action);
      action === 'Add' ? this.value += num : this.value -= num;
    }
  }
  bulk_undo(num) {
    let length = this.numbers.length;
    for(let i= 1; i<=length;i++){
      let num1 = this.numbers.pop();
      let action = this.actions.pop();
      this.redoArr.push(num1);
      this.redoActions.push(action);
      action === 'Add'? this.value -= num1:this.value+=num1;
      if(i === num){
        break;
      }
    }
  }
  bulk_redo(num) {
    let length = this.redoArr.length;
    if(this.redoArr && this.redoArr.length>0) {
      for (let i = 1; i <= length; i++) {
        let num1 = this.redoArr.pop();
        let action = this.redoActions.pop();
        this.numbers.push(num1);
        this.actions.push(action);
        action === 'Add' ? this.value += num1 : this.value -= num1;
        if(i === num){
          break;
        }
      }
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
