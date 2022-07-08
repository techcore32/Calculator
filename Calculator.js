const calculator = document.getElementById("globalContainer")
const display = calculator.querySelector(".display-numbers");
const ghostDisplay = calculator.querySelector(".ghostDisplay");
const buttons = calculator.querySelector(".buttonsContainer");


buttons.addEventListener("click", e => {
    if(!e.target.closest("button")) return;

    const key  = e.target;
    const keyValue = key.textContent;
    const displayValue = display.textContent;
    const {type} = key.dataset;
    const {previousKeyType} = calculator.dataset;
   
    //is key a number?
    if(type === "numbers"){

        if(displayValue === "0"){
            display.textContent = keyValue;
            ghostDisplay.textContent = keyValue;
        }
        else if(previousKeyType === "operator"){
            display.textContent = keyValue;
            ghostDisplay.textContent = keyValue;
        }
        else if(previousKeyType === "equal"){
            display.textContent = keyValue;
        }
        else{
            display.textContent = displayValue + keyValue;
            ghostDisplay.textContent = displayValue + keyValue;
        }
    }

    //is key an operator?
    if(type === "operator"){
        let operatorKeys = key.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => {el.dataset.state = ""});
        key.dataset.state = "selected";

        calculator.dataset.firstDigit = displayValue;
        calculator.dataset.operator = key.dataset.function;
    }

    if(type === "equal"){
        let firstDigit = parseInt(calculator.dataset.firstDigit);
        let secondDigit = parseInt(displayValue);
        let operator = calculator.dataset.operator;

        let result = "";
    
        
        if(operator === "plus") result = firstDigit + secondDigit;
        if(operator === "minus") result = firstDigit - secondDigit;
        if(operator === "multiply")result = firstDigit * secondDigit;  
        if(operator === "divide") result = firstDigit / secondDigit;

        display.textContent = result;
    }

    if(type === "clear"){
        display.textContent = "0";
        ghostDisplay.textContent = "";
    }
    calculator.dataset.previousKeyType = type;
})