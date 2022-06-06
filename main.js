let currentNumber = ''
let previousNumber = ''
let operator = ''
let result = ''
let isCleared = false
const current_display = document.querySelector('.currentNumber')
const previous_display = document.querySelector('.previousNumber')
const numberButtons = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('#op')

const decimalButton = document.querySelector('.decimal')
decimalButton.addEventListener('click', function(){
    decimal()
})

const allClearButton = document.querySelector('#all-clear')
allClearButton.addEventListener('click', function(){
    allClear()
})
const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', function(){
    clear()
})

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
    if (currentNumber != ''){
        operator = op.innerHTML
        console.log(operator)

        if (isCleared){
            previousNumber = currentNumber
        }
        if (!result){
            previousNumber = currentNumber
        }
        previous_display.textContent = previousNumber + " " + operator
            currentNumber = ''
    }
    // operator = op.innerHTML
    // console.log(operator)

    // if (isCleared){
    //     previousNumber = currentNumber
    // }
    // if (!result){
    //     previousNumber = currentNumber
    // }
    // previous_display.textContent = previousNumber + " " + operator
    // currentNumber = ''
}

function calculate(){
    currentNumber = Number(currentNumber)
    previousNumber = Number(previousNumber)

    if (operator === '+'){
        result = previousNumber + currentNumber
        previousNumber = result
        // isCleared = false
    }
    else if (operator === '−'){
        result = previousNumber - currentNumber
        previousNumber = result
        // isCleared = false
    }
    else if (operator === '÷'){
        if (currentNumber > 0){
            result = previousNumber / currentNumber
            previousNumber = result
            // isCleared = false
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
        // isCleared = false
    }
    
    displayResult(result)
    isCleared = false

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

function allClear(){
    currentNumber = ''
    previousNumber = ''
    operator = ''
    current_display.textContent = '0'
    previous_display.textContent = ''
    isCleared = true
}

function clear(){
    currentNumber = String(currentNumber)
    currentNumber = currentNumber.slice(0, -1)
    current_display.textContent = currentNumber
}

function decimal(){
    if (!currentNumber.includes('.')){
        currentNumber += '.'
        current_display.textContent = currentNumber
    }
}