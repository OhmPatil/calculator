let currentNumber = ''
let previousNumber = ''
let operator = ''
let result = ''
const current_display = document.querySelector('.currentNumber')
const previous_display = document.querySelector('.previousNumber')
const numberButtons = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('#op')
const allClearButton = document.querySelector('#all-clear')
const clearButton = document.querySelector('#clear')

const equalsButton = document.querySelector('#equals')
equalsButton.addEventListener('click', function(){
    if (currentNumber != '' && previousNumber != '') calculate()
})

numberButtons.forEach(button => button.addEventListener('click', function(){
    numberHandler(button.dataset.number)
}))

function numberHandler(number){
    if (currentNumber.length <= 14){
        currentNumber += number
        current_display.textContent = currentNumber
    }
}

operators.forEach(operator => operator.addEventListener('click', function(){
    operatorHandler(operator)
}))

function operatorHandler(op){
    operator = op.innerHTML
    console.log(operator)

    if (!result){
        previousNumber = currentNumber
    }
    previous_display.textContent = previousNumber + " " + operator
    currentNumber = ''
}

function calculate(){
    currentNumber = Number(currentNumber)
    previousNumber = Number(previousNumber)

    if (operator === '+'){
        result = previousNumber + currentNumber
        previousNumber = result
    }
    else if (operator === '−'){
        result = previousNumber - currentNumber
        previousNumber = result
    }
    else if (operator === '÷'){
        if (currentNumber > 0){
            result = previousNumber / currentNumber
            previousNumber = result
        }
        else{
            result = 'lmao nice try'
            currentNumber = ''
            previousNumber = ''
        }
    }
    else if (operator === '×'){
        result = previousNumber * currentNumber
        previousNumber = result
    }
    
    displayResult(result)
}

function displayResult(result){
    previous_display.textContent = ''
    result = String(result)
    if (result.length > 12){
        current_display.textContent = result.slice(0, 13) + '..'
    }
    else current_display.textContent = result
    console.log(previousNumber);
    console.log(currentNumber);
}