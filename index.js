const billInput = document.querySelector("input[name='bill']");
const peopleInput = document.querySelector("input[name=people-count]");
const tipInput = document.querySelectorAll("input[type=checkbox]");
const reset = document.querySelector(".button");
let currentTip;
let currentValue = "0";
let cursorPosition;
// let cursorPosition = 0;

function billInputValidation(event) {
    cursorPosition = this.selectionStart;
    if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete/.test(event.key)) {
        event.preventDefault();
    } 
    const pressedValue = event.key
    if (currentValue == "0") {
        // separate function for 0 here
        if (currentValue == "0") {
            this.setSelectionRange(4, 4);
        }
    }
    else {
        if (/[0-9]/.test(event.key)) {
            event.preventDefault()
            const billLength = currentValue.length;
            let tempValue;
            if (currentValue.includes(".")) {
                currentValue.replace(".","");
            }
            // because using slice, if decimal was to be included then it might get included or excluded in slice which could alter the proper position according to cursor and insertion
            // this works if working after decimal
            if (cursorPosition >= billLength-2) {
                tempValue = currentValue.slice(0, cursorPosition) + pressedValue + currentValue.slice(cursorPosition -1)
            }
            // this works if working before decimal
            else {
                tempValue = currentValue.slice(0, cursorPosition) + pressedValue + currentValue.slice(cursorPosition);
            }
            const newValue = (Number(tempValue)/100).toFixed(2);
            billInput.value = newValue
            currentValue = newValue
            if (cursorPosition != billInput.value.length) {
                this.setSelectionRange(cursorPosition+1,cursorPosition+1);
            }
            
            // const newCursorPosition = this.selectionEnd + 1;
            // this.setSelectionRange(newCursorPosition, newCursorPosition)
        }
        if (/Backspace|Delete/.test(event.key)) {
            event.preventDefault();
            if (currentValue.includes(".")) {
                currentValue.replace(".","");
            }
            // currentValue = currentValue.slice(0, -1);
            // currentValue = currentValue.slice(0, cursorPosition-1) + currentValue.slice(cursorPosition)
            currentValue = currentValue.substring(0, cursorPosition) + currentValue.substring(cursorPosition,currentValue.length)
            const newValue = (Number(currentValue)/100).toFixed(2);
            billInput.value = newValue
            if (billInput.value == '0.00') {
                billInput.value = "";
            }
            // const newCursorPosition = this.selectionEnd + 1;
            // this.setSelectionRange(newCursorPosition, newCursorPosition)
        }
    }
    if (/ArrowLeft/.test(event.key)) {
        if (cursorPosition != 0) {
            cursorPosition = cursorPosition - 1;
            // this.setSelectionRange(newCursorPosition, newCursorPosition)
        }
    }
    if (/ArrowRight/.test(event.key)) {
        if (cursorPosition != billInput.value.length) {
            cursorPosition = cursorPosition + 1;
        // this.setSelectionRange(newCursorPosition, newCursorPosition)
        }
    }
    console.log(cursorPosition);
}

function updateBill(event) {

}

function oneCheckbox(event) {
    console.log(event);
    tipInput.forEach((tip) => {
        if (tip !== event.target) {
            console.log(tip);
            tip.checked = false;
        }
    })
}

function splitBill() {
    const cost = Number(billInput)
    const count = parseInt(peopleInput)
    tipInput.forEach((tip) => {
        if (tip.checked) {
            if (tip.value == "Custom") {
                currentTip = customTipCalc()
                // for tip calculations also don't forget to consider string vs number as done in billInputValidation
            } else {
                currentTip= cost * (parseFloat(tip.value)/100);
            }
        } else {
            currentTip = 0;
        }
    })
}

function customTipCalc() {
    return // whatever value is input
}

function tipFunctions(e) {
    oneCheckbox(e);
    splitBill();
}

function clickCursorPosition (e) {
    cursorPosition = this.selectionStart;
    console.log(this)
    console.log(cursorPosition);
}


// billInput.addEventListener('keydown', function(event) {
//     // if (!/[0-9\b\d\.\-\+]/.test(event.key)) {
//     //     event.preventDefault();
//     //   }
//     if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete/.test(event.key)) {
//         event.preventDefault();
//     }
// })
billInput.addEventListener('click', cursorPosition);
billInput.addEventListener('keydown',billInputValidation);
// peopleInput.addEventListener('input',splitBill);
tipInput.forEach((tip) => {
    tip.addEventListener('change', tipFunctions)
})

// https://stackoverflow.com/questions/12114570/how-to-align-texts-inside-of-an-input
// https://stackoverflow.com/questions/917610/put-icon-inside-input-element-in-a-form
// https://stackoverflow.com/questions/58606047/how-to-use-on-addeventlistener-on-radio-button-in-plain-javascript
// https://stackoverflow.com/questions/9709209/html-select-only-one-checkbox-in-a-group
// https://stackoverflow.com/questions/31706611/why-does-the-html-input-with-type-number-allow-the-letter-e-to-be-entered-in
// https://stackoverflow.com/questions/56467473/differences-between-input-and-keypress-events
// should trigger with keypress instead of change, see https://stackoverflow.com/questions/13525958/what-are-the-differences-between-keypress-and-change-in-javascript