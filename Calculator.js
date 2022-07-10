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
    const {previousKey} = calculator.dataset;
    const {previousOperator} = calculator.dataset;
    console.log(previousOperator);

    //is key a number?
    if(type === "numbers"){

        if(displayValue === "0"){
            display.textContent = keyValue;
            ghostDisplay.textContent = keyValue;
            
        } 
        else if(previousKeyType === "operator"){
            display.textContent = keyValue;
            ghostDisplay.textContent = keyValue;

            if(type === "numbers"  ) 
            {
               let state = buttons.querySelectorAll("[data-type='operator']");
               state.forEach(el => {el.dataset.state = "unselected"});
               calculator.dataset.nextKeyType = "operator";
               
               
            }
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
    if (key.dataset.state === ""){
        if(type === "operator"){
            let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
            operatorKeys.forEach(el => {el.dataset.state = ""});
       
            key.dataset.state = "selected";

            calculator.dataset.operator = key.dataset.function;
            calculator.dataset.firstDigit = displayValue;

         }
    }

    if(key.dataset.state === "unselected"){
    
        if(type === "operator"){ 

            calculator.dataset.operator = previousOperator;
            console.log(previousOperator);
            
            let firstDigit = calculator.dataset.firstDigit;
            let secondDigit = displayValue;
            let operator = calculator.dataset.operator;
                
            display.textContent = calculate(firstDigit,operator,secondDigit);
                
            calculator.dataset.firstDigit = calculate(firstDigit,operator,secondDigit);
            calculator.dataset.operator = key.dataset.function;    

            }
        }

    if(type === "operatorInstant"){


        calculator.dataset.firstDigit = displayValue;
        calculator.dataset.operator = key.dataset.function;
        
        let firstDigit = calculator.dataset.firstDigit;
        let operator = calculator.dataset.operator;

        display.textContent = calculate(firstDigit,operator);
    }

    if(type === "equal"){
        let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => {el.dataset.state = ""});

        let firstDigit = calculator.dataset.firstDigit;
        let secondDigit = displayValue;
        let operator = calculator.dataset.operator;

        display.textContent = calculate(firstDigit,operator,secondDigit);

        console.log(firstDigit);
        console.log(secondDigit);
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
    calculator.dataset.previousKey = keyValue;
    calculator.dataset.previousOperator = previousKey;

})

function calculate(firstDigit,operator,secondDigit){
   firstDigit = parseFloat(firstDigit);
   secondDigit = parseFloat(secondDigit);
   let result = "";
    
    if (operator === "+") result = firstDigit + secondDigit;
    if(operator === "-") result = firstDigit - secondDigit;
    if(operator === "×")result = firstDigit * secondDigit;  
    if(operator === "÷") result = firstDigit / secondDigit;
    if(operator === "%") result = (secondDigit/100) * firstDigit;

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