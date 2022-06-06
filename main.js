// Setting up defaults and selecting buttons
let currentNumber = ''
let previousNumber = ''
let operator = ''
let result = ''
let isCleared = false
const current_display = document.querySelector('.currentNumber')
const previous_display = document.querySelector('.previousNumber')
const numberButtons = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('#op')

window.addEventListener('keydown', function(e){
    keyboardHandler(e)
})

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

// Function to take input and display when number key is clicked
function numberHandler(number){
    if (currentNumber.length <= 14){
        currentNumber += number
        current_display.textContent = currentNumber
    }
}

operators.forEach(operator => operator.addEventListener('click', function(){
    operatorHandler(operator.innerHTML)
    console.log(operator.innerHTML)
}))

// Function logic when any operator key is clicked
function operatorHandler(op){
    if (currentNumber != ''){
        operator = op
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

// Function when equals key is clicked
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

// Function to display results after calculation
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

// Logic for AC button
function allClear(){
    currentNumber = ''
    previousNumber = ''
    operator = ''
    current_display.textContent = '0'
    previous_display.textContent = ''
    isCleared = true
}

// Logic for C button
function clear(){
    currentNumber = String(currentNumber)
    currentNumber = currentNumber.slice(0, -1)
    current_display.textContent = currentNumber
}

// Logic for decimal button
function decimal(){
    if (!currentNumber.includes('.')){
        currentNumber += '.'
        current_display.textContent = currentNumber
    }
}

function keyboardHandler(e){
    console.log(e.key);
    if (e.key >=0 && e.key <=9){
        numberHandler(e.key)
    }

    if (e.key === '+') {
        operatorHandler(e.key)
        return
    }
    if (e.key === '-') {
        operatorHandler('−')
        return
    }

    if (e.key === '/') {
        operatorHandler('÷')
        return
    }

    if (e.key === '*' || e.key === 'x') {
        operatorHandler('×')
        return
    }

    if (e.key === 'Enter' || e.key ===  '=' && currentNumber != '' && previousNumber != ''){
        calculate()
    }

    if (e.key === 'Backspace') clear()
    if (e.key === ' ') allClear()
}