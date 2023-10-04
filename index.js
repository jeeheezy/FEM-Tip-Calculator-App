const billInput = document.querySelector("input[name='bill']");
const peopleInput = document.querySelector("input[name=people-count]");
const tipInput = document.querySelectorAll("input[type=checkbox]");
const reset = document.querySelector(".button");
let currentTip;


// numericInput.addEventListener('keydown', function(event) {
//     // Allow numeric keys, backspace, and arrow keys
//     if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete/.test(event.key)) {
//       event.preventDefault();
//     }
//   });


function billInputValidation(event) {
    console.log("It works");
    if (!/[0-9]|Backspace|ArrowLeft|ArrowRight|Delete/.test(event.key)) {
        event.preventDefault
    }
    // need to add validation to only allow numbers and return value back into input
    // should trigger with keypress instead of change, see https://stackoverflow.com/questions/13525958/what-are-the-differences-between-keypress-and-change-in-javascript
    const bill = (Number(billInput)/100).toFixed(2);  
    // billInput.value = bill;  
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


billInput.addEventListener('input',billInputValidation);
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