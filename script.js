'use strict';

class Calculator{
    constructor(prevDisplayElement,currDisplayElement){
        this.prevDisplayElement = prevDisplayElement;
        this.currDisplayElement = currDisplayElement;
        this.clear();
    }
    clear(){
        this.prevOperand = '';
        this.currOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1); 
    }
    appendNumber(number){
        if(number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }
    chooseOperator(operation){
        if(this.currOperand === '') return;
        if(this.prevOperand !==''){
            this.compute();
        }
        this.operation = operation; 
        this.currOperand = this.currOperand.toString() + ' ' + operation.toString();
        this.prevOperand = this.currOperand;
        this.currOperand = '';
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                computation = prev / curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '%':
                computation = prev % curr;
                break;
        }
        this.currOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }
    updateDisplay(){
        this.currDisplayElement.innerText = this.currOperand;
        this.prevDisplayElement.innerText = this.prevOperand;
    }
}
const numberButtons = document.querySelectorAll('[data-numbers]');
const operationButtons = document.querySelectorAll('[data-operations]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]');
const prevDisplayElement = document.querySelector('[data-prev-display]');
const currDisplayElement = document.querySelector('[data-curr-display]');

const calculator = new Calculator(prevDisplayElement,currDisplayElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
})

equalButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
