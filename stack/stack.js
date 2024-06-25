function selectOperation() {
    var selectedOperation = document.getElementById("operationSelect").value;
    var inputFieldsDiv = document.getElementById("inputFields");
    // Clear previous input fields
    inputFieldsDiv.innerHTML = "";

    switch (selectedOperation) {
        case "infixToPostfix":
        case "postfixToInfix":
        case "infixToPrefix":
        case "prefixToInfix":
            inputFieldsDiv.innerHTML = '<input type="text" placeholder="Expression" id="expressionInput" class="input1">';
            break;
        case "postfixToPrefix":
        case "prefixToPostfix":
            inputFieldsDiv.innerHTML = '<input type="text" placeholder="Expression" id="expressionInput" class="input1">';
            break;
        default:
            break;
    }
}

let stepDelay = 1000; // Delay between each step (in milliseconds)


function performOperation() {
    var selectedOperation = document.getElementById("operationSelect").value;
    var inputExpression = document.getElementById("infixvalue").value;
    var outputElement = document.getElementById("output");
    var operatorsStackArea = document.getElementById("operatorsStack");
    var operandsResultArea = document.getElementById("operandsResult");

    // Clear previous output
    outputElement.innerHTML = "";
    operatorsStackArea.innerHTML = "";
    operandsResultArea.innerHTML = "";

    switch (selectedOperation) {
        case "infixToPostfix":
            infixToPostfixStepByStep(inputExpression);
            break;
        case "postfixToInfix":
            postfixToInfixStepByStep(inputExpression);
            break;
        case "infixToPrefix":
            infixToPrefixStepByStep(inputExpression);
            break;
        case "prefixToInfix":
            prefixToInfixStepByStep(inputExpression);
            break;
        case "postfixToPrefix":
            postfixToPrefixStepByStep(inputExpression);
            break;
        case "prefixToPostfix":
            prefixToPostfixStepByStep(inputExpression);
            break;
        default:
            break;
    }
}

function displaySteps(steps) {
    var operatorsStackArea = document.getElementById("operatorsStack");
    var operandsResultArea = document.getElementById("operandsResult");

    steps.forEach((step, index) => {
        setTimeout(() => {
            operatorsStackArea.innerHTML = ""; // Clear operators stack
            operandsResultArea.innerHTML = ""; // Clear operands result

            // Display operators stack
            step.stack.forEach(operator => {
                var operatorDiv = document.createElement("div");
                operatorDiv.textContent = operator;
                operatorsStackArea.appendChild(operatorDiv);
            });

            // Display operands result
            var resultDiv = document.createElement("div");
            resultDiv.textContent = step.postfix;
            operandsResultArea.appendChild(resultDiv);
        }, index * stepDelay);
    });
}

// Function to visualize infix to postfix conversion step by step
function infixToPostfixStepByStep(expression) {
    var stack = [];
    var postfix = '';
    var precedence = {
        '^': 3,
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1
    };

    var steps = [];

    for (var i = 0; i < expression.length; i++) {
        var char = expression[i];

        if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix += stack.pop();
                steps.push({ postfix: postfix, stack: stack.slice() }); // Store current postfix expression and stack
            }
            stack.pop(); // Remove '(' from stack
        } else if (precedence[char]) {
            while (stack.length && precedence[char] <= precedence[stack[stack.length - 1]]) {
                postfix += stack.pop();
                steps.push({ postfix: postfix, stack: stack.slice() }); // Store current postfix expression and stack
            }
            stack.push(char);
        } else {
            postfix += char;
            steps.push({ postfix: postfix, stack: stack.slice() }); // Store current postfix expression and stack
        }
    }

    while (stack.length) {
        postfix += stack.pop();
        steps.push({ postfix: postfix, stack: stack.slice() }); // Store current postfix expression and stack
    }

    // Display steps one by one
    displaySteps(steps);
}



// Function to convert postfix expression to infix step by step
function postfixToInfixStepByStep(expression) {
    var stack = [];
    var steps = [];

    for (var i = 0; i < expression.length; i++) {
        var char = expression[i];

        if (isOperand(char)) {
            stack.push(char);
            steps.push({ infix: stack.join(''), stack: stack.slice() }); // Store current infix expression and stack
        } else {
            var operand2 = stack.pop();
            var operand1 = stack.pop();
            var infixExpression = '(' + operand1 + char + operand2 + ')';
            stack.push(infixExpression);
            steps.push({ infix: infixExpression, stack: stack.slice() }); // Store current infix expression and stack
        }
    }

    // Final infix expression will be at the top of the stack
    displaySteps(steps);
}


// Function to convert infix expression to prefix step by step
function infixToPrefixStepByStep(expression) {
    var reversedExpression = expression.split('').reverse().join('');
    var reversedPostfix = infixToPostfixStepByStep(reversedExpression);
    var prefixExpression = reversedPostfix.split('').reverse().join('');
    displaySteps([{ prefix: prefixExpression }]);
}




// Function to convert prefix expression to infix step by step
function prefixToInfixStepByStep(expression) {
    var stack = [];
    var steps = [];

    for (var i = expression.length - 1; i >= 0; i--) {
        var char = expression[i];

        if (isOperand(char)) {
            stack.push(char);
            steps.push({ infix: stack.join(''), stack: stack.slice() }); // Store current infix expression and stack
        } else {
            var operand1 = stack.pop();
            var operand2 = stack.pop();
            var infixExpression = '(' + operand1 + char + operand2 + ')';
            stack.push(infixExpression);
            steps.push({ infix: stack.join(''), stack: stack.slice() }); // Store current infix expression and stack
        }
    }

    // Final infix expression will be at the top of the stack
    displaySteps(steps);
}


// Function to convert postfix expression to prefix step by step
function postfixToPrefixStepByStep(expression) {
    var reversedExpression = expression.split('').reverse().join('');
    var reversedPrefix = postfixToInfixStepByStep(reversedExpression);
    var prefixExpression = reversedPrefix.split('').reverse().join('');
    displaySteps([{ prefix: prefixExpression }]);
}

// Function to convert prefix expression to postfix step by step
function prefixToPostfixStepByStep(expression) {
    var stack = [];
    var postfix = '';
    var steps = [];

    for (var i = expression.length - 1; i >= 0; i--) {
        var char = expression[i];

        if (isOperand(char)) {
            stack.push(char);
            steps.push({ postfix: stack.join(''), stack: stack.slice() }); // Store current postfix expression and stack
        } else {
            var operand1 = stack.pop();
            var operand2 = stack.pop();
            var postfixExpression = operand1 + operand2 + char;
            stack.push(postfixExpression);
            steps.push({ postfix: stack.join(''), stack: stack.slice() }); // Store current postfix expression and stack
        }
    }

    // Final postfix expression will be at the top of the stack
    displaySteps(steps);
}

// Function to convert postfix expression to prefix step by step
// Function to convert postfix expression to prefix step by step
// Function to convert postfix expression to prefix step by step
function postfixToPrefixStepByStep(expression) {
    var stack = [];
    var prefix = '';
    var steps = [];
  
    for (var i = 0; i < expression.length; i++) {
      var char = expression[i];
  
      if (isOperand(char)) {
        stack.push(char);
        steps.push({ prefix: stack.join(''), stack: stack.slice() }); // Create a copy of the stack
      } else {
        var operand2 = stack.pop();
        var operand1 = stack.pop();
        var prefixExpression = char + operand1 + operand2;
        stack.push(prefixExpression);
        steps.push({ prefix: stack.join(''), stack: stack.slice() }); // Create a copy of the stack
      }
    }
    
    displaySteps(steps); // Display the steps
}


  

    // Final prefix expression will be at the top of the stack
    displaySteps(steps);



// Helper function to check if a character is an operand
function isOperand(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}
