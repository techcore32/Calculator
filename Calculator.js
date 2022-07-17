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
    const erase = key.dataset.erase;
    const {secondDigitStore} = calculator.dataset;
    
    if (display.textContent.length > 16){
        display.style.fontSize = "28px";
    }
    
     
    if(type === "numbers"){

        if(displayValue === "0"){
            display.textContent = keyValue;

            if(previousKeyType === "operator" || previousKey === "CE"){
 
                if(type === "numbers") 
                {
                   let state = buttons.querySelectorAll("[data-type='operator']");
                   state.forEach(el => {el.dataset.state = "unselected"});
                }
            }
            
        } 
        else if(previousKeyType === "operator"){
            display.textContent = keyValue;
            
            if(type === "numbers") 
            {
               let state = buttons.querySelectorAll("[data-type='operator']");
               state.forEach(el => {el.dataset.state = "unselected"});
            }
        }
        else if(previousKeyType === "operatorInstant"){
            display.textContent = keyValue;
        }
        else if(previousKeyType === "equal"){
            display.textContent = keyValue;
        }

        else{
            display.textContent = displayValue + keyValue;
            ghostDisplay.textContent = displayValue + keyValue; 
                  
        }
    }
    

    if (key.dataset.state === ""){
        if(type === "operator"){

            ghostDisplay.style.opacity = "1";

            let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
            operatorKeys.forEach(el => {el.dataset.state = ""});
       
            key.dataset.state = "selected";

            calculator.dataset.operator = key.dataset.function;
            calculator.dataset.firstDigit = displayValue;

            if(calculator.dataset.operator === "percentage"){
                ghostDisplay.textContent = displayValue
            }
            else{
            ghostDisplay.textContent = displayValue + " " + keyValue;
            }
         }
    }

    if(key.dataset.state === "unselected"){
    
        if(type === "operator"){ 
            
            let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
            operatorKeys.forEach(el => {el.dataset.state = ""});

            key.dataset.state = "selected"

            calculator.dataset.operator = previousOperator;
            let firstDigit;
            
        if(previousKey === "CE"){
            firstDigit = displayValue;
        }
        else{
            firstDigit = calculator.dataset.firstDigit;
        }

            let secondDigit = displayValue;
            let operator = calculator.dataset.operator;
            

            if(operator === "÷"){
                if(firstDigit === "0" && secondDigit === "0"){
                    display.textContent = "Undefined Result"
                }
                else if(secondDigit === "0"){
                    display.textContent = "Cannot divide by zero"
                }
                else{
                    display.textContent = calculate(firstDigit,operator,secondDigit);
                    ghostDisplay.textContent = calculate(firstDigit,operator,secondDigit) + 
                                               " " + keyValue;
                    calculator.dataset.firstDigit = calculate(firstDigit,operator,secondDigit);
                }
            }

            else{
                display.textContent = calculate(firstDigit,operator,secondDigit);
                
                if(operator === "%"){
                    ghostDisplay.textContent = "(" + secondDigit + " " + "/" + " " + "100" + ")" +
                                               " " +"×" + " " + firstDigit;
                    
                }
                else{
                    ghostDisplay.textContent = calculate(firstDigit,operator,secondDigit) + 
                                               " " +  keyValue;
                }

                calculator.dataset.firstDigit = calculate(firstDigit,operator,secondDigit);
            }            
        }
    }


    if(type === "operatorInstant"){
        ghostDisplay.style.opacity = "1";

        let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => {el.dataset.state = ""});

        calculator.dataset.firstDigit = displayValue;
        calculator.dataset.operator = key.dataset.function;

        let firstDigit = calculator.dataset.firstDigit;
        let operator = calculator.dataset.operator;
        
        if(operator === "reciprocal"){
            if(firstDigit === "0"){
                display.textContent = "Cannot divide by zero"
            }
            else{
                display.textContent = calculate(firstDigit,operator);
                ghostDisplay.textContent = "1" + " " + "÷" + " " + firstDigit;
                
            }
        }
        else if(operator === "changeSign"){
            if(firstDigit === "0"){
                ghostDisplay.textContent = "0";
            }
            else{
                display.textContent = calculate(firstDigit,operator);
                ghostDisplay.textContent =  "-" + "(" + firstDigit + ")";
            }
        }
        else{
            display.textContent = calculate(firstDigit,operator);

            if(operator === "square"){ 
                ghostDisplay.textContent = firstDigit + "⁽" + "²" + "⁾";
            }
            else if(operator === "root-square"){
                ghostDisplay.textContent =  "√" + "(" + firstDigit + ")";
            }

            if (display.textContent.length > 16){
                display.style.fontSize = "25px";
            }
        }

    }

    if(type === "equal"){
        let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
        operatorKeys.forEach(el => {el.dataset.state = ""});

        
        let firstDigit = calculator.dataset.firstDigit;
        let operator = calculator.dataset.operator;
        let secondDigit;
        if(previousKeyType === "operator") {
            return;
        }
        if(previousKeyType === "equal"){
            firstDigit =  calculator.dataset.firstDigit;
            secondDigit = secondDigitStore;
        }
        else{
            secondDigit = displayValue;
        }

         
        if(operator === "divide" || operator === "÷"){
            if(firstDigit === "0" && secondDigit === "0"){
                display.textContent = "Undefined Result"
            }
            else if(secondDigit === "0"){
                display.textContent = "Cannot divide by zero"
            }
            else{
                display.textContent = calculate(firstDigit,operator,secondDigit);
                ghostDisplay.textContent = firstDigit + " " + "÷" + " " + secondDigit + 
                                           " " + keyValue;
                calculator.dataset.firstDigit = calculate(firstDigit,operator,secondDigit);
            }
        }
        else{
            display.textContent = calculate(firstDigit,operator,secondDigit);

            if(operator === "plus" || operator === "+"){
                ghostDisplay.textContent =  firstDigit + " " + "+" + " " + secondDigit + 
                                            " " + keyValue;
            }
            if(operator === "minus" || operator === "-"){       
                ghostDisplay.textContent =  firstDigit + " " + "-" + " " + secondDigit + 
                                            " " + keyValue;
            }
            if(operator === "multiply" || operator === "×"){
                ghostDisplay.textContent =  firstDigit + " " + "×" + " " + secondDigit + 
                                            " " + keyValue;
            }
            if(operator === "percentage" || operator === "%"){
                ghostDisplay.textContent = "(" + secondDigit + " " + "/" + " " + "100" + 
                                           ")" + " " +"×" + " " + firstDigit + " " + keyValue;
            }
           
            calculator.dataset.firstDigit = calculate(firstDigit,operator,secondDigit);


        }
    }

    if(type === "clear"){

        if(erase === "clear-entry"){

            if(previousKeyType === "equal"){
                return;
            }
            else{
                display.textContent = "0";  
            }
        }   
 
        else if(erase  === "backSpace"){
    
            if(previousKeyType === "operator" || 
               previousKeyType === "equal"||
               previousKeyType === "operatorInstant"){return;}
            
            else{
                display.textContent = display.textContent.slice(0, -1);
            
                if(display.textContent === "" || display.textContent === "-" ) {
                display.textContent = "0";  
                }
            }

        }
       
        else if(erase === "clear-global"){
            display.textContent = "0";
            ghostDisplay.textContent = "0";
            ghostDisplay.style.opacity = "0";

            let operatorKeys = buttons.querySelectorAll("[data-type='operator']");
            operatorKeys.forEach(el => {el.dataset.state = ""});
        }
        
    }

    calculator.dataset.previousKeyType = type;
    calculator.dataset.previousKey = keyValue;

    if(previousKey === "+" || previousKey === "-" ||
       previousKey ==="×" || previousKey === "÷" || 
       previousKey === "%"){
            calculator.dataset.previousOperator = previousKey;
       }
    
    else if(previousKey !== "="){
       
        calculator.dataset.secondDigitStore =  displayValue;
    }

})

function calculate(firstDigit,operator,secondDigit){

    firstDigit = parseFloat(firstDigit);
   secondDigit = parseFloat(secondDigit);
   let result = "";
    
    if (operator === "+") result = firstDigit + secondDigit;
    if(operator === "-") result = firstDigit - secondDigit;
    if(operator === "×")result = firstDigit * secondDigit;  
    if(operator === "÷") {result = firstDigit / secondDigit;}
    if(operator === "%") result = (secondDigit/100) * firstDigit;

    if(operator === "plus") result = firstDigit + secondDigit;
    if(operator === "minus") result = firstDigit - secondDigit;
    if(operator === "multiply")result = firstDigit * secondDigit;  
    if(operator === "divide") result = firstDigit / secondDigit;
    if(operator === "percentage") result = (secondDigit/100) * firstDigit;
    

    if(operator === "reciprocal") result = 1 / firstDigit;
    if(operator === "square") result = firstDigit ** 2;
    if(operator === "root-square") result = Math.sqrt(firstDigit);
    if(operator === "changeSign") result = -1 * firstDigit ;

        return result;
}
