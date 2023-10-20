const billInput = document.querySelector("input[name='bill']");
const peopleInput = document.querySelector("input[name=people-count]");
const tipInput = document.querySelectorAll("input[type=checkbox]");
const customTipInput = document.querySelector("input[name='custom-tip']");
const reset = document.querySelector(".reset");
let currentTip = 0;
let tipPerPerson;
let costPerPerson;
let errorFlag = false;
let resetFlag = false;

function monetaryInputValidation(event, input) {
    if (!/[0-9]|Backspace|Delete/.test(event.key)) {
        event.preventDefault();
    } 
    const pressedValue = event.key
    if (/[0-9]/.test(event.key)) {
        event.preventDefault()
        if (input.value.includes(".")) {
            input.value = input.value.replace(".","");
        }
        input.value = input.value + pressedValue
        const newValue = (Number(input.value)/100).toFixed(2);
        input.value = newValue
    }
    if (/Backspace|Delete/.test(event.key)) {
        event.preventDefault();
        if (input.value.includes(".")) {
            input.value = input.value.replace(".","");
        }
        input.value = input.value.slice(0, -1);
        const newValue = (Number(input.value)/100).toFixed(2);
        input.value = newValue;
        if (input.value == '0.00') {
            input.value = "";
        }
    }
}

function peopleInputValidation(event) {
    if (!/[0-9]|Backspace|Delete/.test(event.key)) {
        event.preventDefault();
    }
    const pressedValue = event.key;
    event.preventDefault();
    if (/[0-9]/.test(event.key)) {
        peopleInput.value = parseInt(peopleInput.value + pressedValue);
    }
    if (/Backspace|Delete/.test(event.key)) {
        peopleInput.value = peopleInput.value.slice(0, -1);
    }
    if (peopleInput.value == 0) {
        if (errorFlag == false) {
            peopleInput.style.outlineColor = "red";
            const errorText = document.createElement("p");
            errorText.innerHTML = "Can't be zero";
            errorText.style.display = "inline";
            errorText.style.color = "red";
            errorText.classList.add("people-text-child");
            errorText.classList.add("error");
            document.querySelector(".people-text-child").insertAdjacentElement("afterend", errorText);
            errorFlag = true;
        }
    }
    if (peopleInput.value != 0) {
        clearZeroPeopleError();
    }
}

function clearZeroPeopleError() {
    document.querySelector(".error")?.remove();
    peopleInput.style.outlineColor = "var(--strong-cyan)";
    errorFlag = false;
}

function calculateTip() {
    let tipFound = false;
    for (let tip of tipInput) {
        if (tip.checked) {
            if (tip.value === "Custom") {
                document.querySelector("label[for='Custom']").style.display = "none"
                customTipInput.style.display = "block"
            } else {
                clearCustomTip()
                currentTip = Number(billInput.value) * (parseFloat(tip.value)/100);
            }
            tipFound = true;
            resetFlag = true;
            break;        
        }
    } 
    if (!tipFound) {
        clearCustomTip();
        currentTip = 0;
        resetFlag = false;
    }
}

function clearCustomTip() {
    customTipInput.style.display = "none"
    customTipInput.value = "";
    document.querySelector("label[for='Custom']").style.display = "block"
    resetFlag = false;
    resetEval();
}

function splitBill () {
    calculateTip();
    resetEval();
    if (customTipInput.style.display === "block") {
        currentTip = Number(customTipInput.value)
    }
    if (peopleInput.value === "" || peopleInput.value === "0") {
        tipPerPerson = "$0.00";
        costPerPerson = "$0.00";
    }
    else {
        tipPerPerson = "$" + (currentTip/Number(peopleInput.value)).toFixed(2);
        costPerPerson = "$" + ((currentTip + Number(billInput.value))/Number(peopleInput.value)).toFixed(2);
    }
    document.querySelector(".tip").innerHTML = tipPerPerson;
    document.querySelector(".total").innerHTML = costPerPerson;
}

function resetEval() {
    if (billInput.value == "" && peopleInput.value == "" && resetFlag == false){
        reset.classList.add("no-reset")
    } else {
      reset.classList.remove("no-reset")
    }
}

function resetAll() {
    billInput.value = "";
    peopleInput.value = "";
    tipInput.forEach(tip => {
        tip.checked = false;
    })
    clearZeroPeopleError();
    clearCustomTip();
    document.querySelector(".tip").innerHTML = "$0.00";
    document.querySelector(".total").innerHTML = "$0.00";
    resetFlag = false;
    reset.classList.add("no-reset");
}

function oneCheckbox(event) {
    tipInput.forEach(tip => {
        if (tip !== event.target) {
            tip.checked = false;
        }
    })
}

function tipFunctions(e) {
    oneCheckbox(e);
    splitBill();
    customTipInput.focus();
}

function billFunctions(e) {
    monetaryInputValidation(e, billInput);
    splitBill();
}

billInput.addEventListener('keydown', billFunctions);
peopleInput.addEventListener('keydown', peopleInputValidation);
peopleInput.addEventListener('focusout', () =>{
    if (peopleInput.value === "0") {
        peopleInput.value = "";
    }
    if (peopleInput.value === "") {
        clearZeroPeopleError();
    }
});
peopleInput.addEventListener('keydown', splitBill);
tipInput.forEach((tip) => {
    tip.addEventListener('change', tipFunctions)
})
customTipInput.addEventListener('keydown', e => {
    monetaryInputValidation(e, customTipInput);
})
customTipInput.addEventListener('focusout', ()=> {
    if (customTipInput.value == "") {
        clearCustomTip();
        document.querySelector("#Custom").checked = false;
    }
})
customTipInput.addEventListener('keydown', splitBill);
reset.addEventListener('click', resetAll)

// https://stackoverflow.com/questions/12114570/how-to-align-texts-inside-of-an-input
// https://stackoverflow.com/questions/917610/put-icon-inside-input-element-in-a-form
// https://stackoverflow.com/questions/58606047/how-to-use-on-addeventlistener-on-radio-button-in-plain-javascript
// https://stackoverflow.com/questions/9709209/html-select-only-one-checkbox-in-a-group
// https://stackoverflow.com/questions/31706611/why-does-the-html-input-with-type-number-allow-the-letter-e-to-be-entered-in
// https://stackoverflow.com/questions/56467473/differences-between-input-and-keypress-events
// should trigger with keypress instead of change, see https://stackoverflow.com/questions/13525958/what-are-the-differences-between-keypress-and-change-in-javascript