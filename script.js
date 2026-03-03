let firstNumber = '';
let secondNumber = '';
let operator = null;
let shouldReset = false;

const display = document.getElementById("display");

// Basic math functions
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) {
        display.value = "Nice try 😏";
        resetAll();
        return null;
    }
    return a / b;
}

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);

    switch(op) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}

function appendDisplay(value) {

    // If it's a number or decimal
    if (!isNaN(value) || value === '.') {

        if (shouldReset) {
            firstNumber = '';
            shouldReset = false;
        }

        if (!operator) {
            if (value === '.' && firstNumber.includes('.')) return;
            firstNumber += value;
            display.value = firstNumber;
        } else {
            if (value === '.' && secondNumber.includes('.')) return;
            secondNumber += value;
            display.value = secondNumber;
        }

    } else {

        // Prevent starting with operator
        if (firstNumber === '') return;

        // If operator exists but no second number → replace operator
        if (operator && secondNumber === '') {
            operator = value;
            return;
        }

        // If full operation exists → calculate first
        if (operator && secondNumber !== '') {
            calculate();
        }

        operator = value;
        shouldReset = false;
    }
}

function calculate() {
    if (!operator || secondNumber === '') return;

    let result = operate(operator, firstNumber, secondNumber);
    if (result === null) return;

    result = Math.round(result * 1000000) / 1000000;

    display.value = result;

    firstNumber = result.toString();
    secondNumber = '';
    operator = null;
    shouldReset = true;
}

function clearDisplay() {
    display.value = '';
    resetAll();
}

function resetAll() {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    shouldReset = false;
}