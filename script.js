let currentDisplay = "0";
let currentOperator = document.getElementById("+");
let operatorArr = [];
let resetNext = false;

$("#numDisplay").html(currentDisplay);

function updateDisplay(input) {
  currentDisplay = input;
  $("#numDisplay").html(currentDisplay);
}

function operate(arr) {
  let operator = "";
  if (arr[1] == "x") {
    operator = "*";
  } else if (arr[1] == "÷") {
    operator = "/";
  } else {
    operator = arr[1];
  }
  const sol = eval(arr[0] + operator + currentDisplay);
  return Math.floor(10000000 * sol) / 10000000;
}

$("#button-wrapper")
  .children()
  .each(function () {
    this.onclick = function () {
      // if a number is typed
      if ($(this).hasClass("num")) {
        // if number is being entered after operator
        if (resetNext) {
          updateDisplay(this.id);
          resetNext = false;
        } else if (currentDisplay.length < 8) {
          if (currentDisplay == 0) {
            updateDisplay(this.id);
          } else {
            updateDisplay(currentDisplay + this.id);
          }
        }
        // if an operator is typed
      } else if ($(this).hasClass("operator")) {
        if (this.id == "=") {
          //perform operation
          const equalsAnswer = operate(operatorArr);

          if (equalsAnswer > 99999999) {
            updateDisplay("ERR");
          } else {
            updateDisplay(equalsAnswer);
          }

          currentOperator.style.backgroundColor = "";
          operatorArr = [];
          //if it's an operator other than the equals sign
        } else {
          currentOperator.style.backgroundColor = "";
          currentOperator = this;
          this.style.backgroundColor = "orange";

          //store previous value and operator in array
          if (operatorArr.length == 2) {
            let tempSol = operate(operatorArr);
            currentDisplay = tempSol;
            updateDisplay(currentDisplay);
          }
          operatorArr = [currentDisplay, currentOperator.id];
          resetNext = true;
        }
        // if a clear or all clear is typed
      } else if (this.id == "C") {
        updateDisplay("0");
      } else if (this.id == "AC") {
        updateDisplay("0");
        currentOperator.style.backgroundColor = "";
        operatorArr = [];
      }
    };
  });
