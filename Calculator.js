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
    if(type === "operatorInstant"){
        let operatorKeys = key.querySelectorAll("[data-type='operatorInstant']");
        operatorKeys.forEach(el => {el.dataset.state = ""});
        key.dataset.state = "selected";

        calculator.dataset.firstDigit = displayValue;
        calculator.dataset.operator = key.dataset.function;
        
        let firstDigit = calculator.dataset.firstDigit;
        let operator = calculator.dataset.operator;

        display.textContent = calculate(firstDigit,operator);
    }
    if(type === "equal"){
        let firstDigit = calculator.dataset.firstDigit;
        let secondDigit = displayValue;
        let operator = calculator.dataset.operator;

        display.textContent = calculate(firstDigit,operator,secondDigit);
    }

    if(type === "clear"){
        
        let erase = key.dataset.erase;

        if(erase === "clear-entry"){
            display.textContent = "0";
        }   
       else if(erase === "backSpace"){
            display.textContent = display.textContent.slice(0, -1);
            
            if(display.textContent === "") display.textContent = "0";
        }
        else if(erase === "clear-global"){
            display.textContent = "0";
            ghostDisplay.textContent = "";
        }
        
    }

    if(type === "changer"){
            display.textContent = -display.textContent;
    }
    calculator.dataset.previousKeyType = type;
    
})

function calculate(firstDigit,operator,secondDigit){
   firstDigit = parseFloat(firstDigit);
   secondDigit = parseFloat(secondDigit);
   let result = "";
    
    if(operator === "plus") result = firstDigit + secondDigit;
    if(operator === "minus") result = firstDigit - secondDigit;
    if(operator === "multiply")result = firstDigit * secondDigit;  
    if(operator === "divide") result = firstDigit / secondDigit;
    if(operator === "reciprocal") result = 1 / firstDigit;
    if(operator === "square") result = firstDigit ** 2;
    if(operator === "root-square") result = Math.sqrt(firstDigit);
    if(operator === "percentage") result = (secondDigit/100) * firstDigit;
        return result;
}