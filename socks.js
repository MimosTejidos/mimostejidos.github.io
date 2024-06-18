"use strict"; 

// START of declaring GLOBAL variables:
// general or theme variables:

let sockObject = {};

let measuringSystemMenu;
let InfoFields;
let gaugeSize;
let gaugeSts;
let gaugeRows;

// socks general variables:
let measurementSystemMenu;
let measuringSystem;
let gaugeSizeField;
// let gaugeSizeLabel;
// let gaugeStsLabel;
// let gaugeRowsLabel;
// let gaugeSizeField;
let gaugeStsField;
let gaugeRowsField;

// let gaugeInfoFields;
// let footInfoFields;
let footLengthField;
let footWidthField;

let footLength;
let footWidth;

let heelType1;
let heelType1_selected;
let fleegleHeel_radio;
let shortRowHeel_radio;
let shortRowHeelTypesDiv;
let heelType2;
let wrapANDturn_SR;
let german_SR;
let garter_SR;
let all_radio_elements;
// let infoFields = {'gauge': [], 'foot': []};
let allInfoFields;
let storeValuesBtn;

let foot_sts;
let HALF_CO_sts;
let CO_sts;
let HALF_foot_sts;
let gusset_inc_sts;
let HALF_gusset_inc_sts;
let gusset_inc_rows;
let total_foot_rows;
let foot_before_gusset_rows;
let foot_before_gusset_cm;
let foot_before_gusset_inches;
let afterGussetHeelNeedleSts;
let heelNeedleStMarker;
let R1BackAndForth;
let R1sts;
let Rend_k_sts;
let Rend_sts;
let R1HeelNeedle;
let R1InstepNeedle;
let R1BothNeedlesSts;
let R2BothNeedlesSts;
let CuffRepeats

function getGeneralDOMelements () {
    submitBtn = document.querySelector('#submitBtn');
    disableButton(submitBtn);
    resetButton = document.querySelector('#resetButton');
    disableButton(resetButton);
    measuringSystemMenu = document.querySelector('#measuring-system-selection');
    gaugeSizeField = document.querySelector('#gaugeSize');
    gaugeStsField = document.querySelector('#gaugeSts');
    gaugeRowsField = document.querySelector('#gaugeRows');
    storeValuesBtn = document.querySelector('#storeValuesBtn');
}


window.onload = initSock();

function initSock() {
    console.log('function: initSock. Page loaded, the DOM is ready');
    getMainIndexDOMelements();
    getGeneralDOMelements();
    getSockPatternDOMelements();
    specificThemeStylingForSocks();
    addEventListeners();
    disableInputFields();
} //end of sock init function 

function getSockPatternDOMelements () {
    console.log('function: getSockPatternDOMelements');
    allInfoFields = document.querySelectorAll('.infoInput');
    footLengthField = document.querySelector('#footLength');
    footWidthField = document.querySelector('#footWidth');
    heelType1 = document.querySelectorAll('.heelType1');
    heelType2 = document.querySelectorAll('.heelType2SR');
    all_radio_elements = document.querySelectorAll('.radioInput');
    fleegleHeel_radio = document.querySelector('#fleegle-heel');
    shortRowHeel_radio = document.querySelector('#short-row-heel');
    shortRowHeelTypesDiv = document.querySelector('#short-row-heel-types');
    patternParagraphs = document.querySelector('.pattern');
    // wrapANDturn_SR;
    // german_SR;
    // garter_SR;
}

function addEventListeners () {
    measuringSystemMenu.addEventListener('change', measurementSystem);
    resetButton.addEventListener('click', resetAll);
    darkLightCheckbox.addEventListener('change', specificThemeStylingForSocks);
    for (let i = 0; i < heelType1.length; i ++) {
        heelType1[i].addEventListener('click', heelType1Selection);
    }
    heelType1Selection();
    for (let i = 0; i < heelType2.length; i ++) {
        heelType2[i].addEventListener('click', heelType2Selection);
    }
    storeValuesBtn.addEventListener('click', storeInfo());
    submitBtn.addEventListener('click', checkAllFieldsHaveBeenFilled);  
}

function heelType1Selection () {
    console.log('function: heelType1Selection executed.');
    for (let i = 0; i < heelType1.length; i ++) {
        if (heelType1[i].checked) {
            sockObject['heelType1'] = heelType1[i].id;
        }
    }
    heelType2Selection();
}

function showShortRowOptions () {
    if (shortRowHeel_radio == 'checked') {
        console.log('short row heel option selected ----');
        enableButton(shortRowHeelTypesDiv);
    }
}

function heelType2Selection () {
    if (sockObject['heelType1'] == 'fleegle-heel') {
        sockObject['heelType2'] = 'none';
        hideButton(shortRowHeelTypesDiv);
    }
    if (sockObject['heelType1'] == 'short-row-heel') {
        enableButton(shortRowHeelTypesDiv);
        for (let i = 0; i < heelType2.length; i++) {
            if(heelType2[i].checked) {
                sockObject['heelType2'] = heelType2[i].id;
            }
        }
    }
    console.log(sockObject);
}

function measurementSystem () {
    console.log('function: measurementSystem executed');
    measuringSystem = document.querySelector('#measuring-system-selection').value;
    if (measuringSystem == "cm" || measuringSystem == "inches")   {
        sockObject['measurementSystem'] = measuringSystem;
        enableButton(gaugeSizeField)
        $('#gaugeSizeLabel').html(`<input type="number" name="gaugeSwatchSize" id="gaugeSize" class="gaugeInfoInput" min="1" placeholder="swatch size" required> How many <b> ${measuringSystem} </b> are in your swatch.`);
        gaugeSizeField.addEventListener('change', writeInputFields);
        document.getElementById('gaugeSize').addEventListener('focusout', enableSwatchSizeField);
    } else {
        alert('Please choose between the metric or the imperial system');
    }
}

function enableSwatchSizeField() {
    console.log('function: enableSwatchSizeField   -------');
    // enableInputFields();
    // writeInputFields();
} 

function writeInputFields() {
    console.log('function: writeInputFields');
    disableButton(measuringSystemMenu);
    gaugeSize = $('#gauge.Size').value;
    $('#gaugeStsLabel').html(`<input type="number" name="gaugeSts" id="gaugeSts" class="gaugeInfoInput" min="1" placeholder="sts" required> sts in ${gaugeSize} ${measuringSystem}.`);
    $('#gaugeRowsLabel').html(`<input type="number" name="gaugeRows" id="gaugeRows" class="gaugeInfoInput" min="1" placeholder="rows" required> rows in ${gaugeSize} ${measuringSystem}.`);
    $('#footLengthLabel').html(`<label for="footLength"> The <b> length </b> of your foot: <input type="number" name="footLength" id="footLength" class="footInfoInput" min="1" placeholder="foot length" required> </label> ${measuringSystem}.`);
    $('#footWidthLabel').html(`<label for="footWidth"> The <b> width </b> of your foot (circumference): <input type="number" name="footWidth" id="footWidth" class="footInfoInput" min="1" placeholder="foot width" required> </label> ${measuringSystem}.`);
    enableButton(resetButton)
    enableButton(submitBtn);
} 


function storeInfo () {
    console.log('function: storeInfo executed');
    sockObject['gaugeFor'] = `${gaugeSize} ${measuringSystem}`;
    sockObject['gaugeSize'] = gaugeSize;
    sockObject['gaugeSts'] = gaugeSts;
    sockObject['gaugeRows'] = gaugeRows;
    sockObject['gauge'] = `${sockObject['gaugeFor']} = ${sockObject['gaugeSts']} sts & ${sockObject['gaugeRows']} rows}`
    sockObject['footLength'] = footLength;
    sockObject['footWidth'] = footWidth;
    console.log(sockObject);
}

function getSubmitedValues() {
    console.log('Submit button fired');
    console.log('function: getSubmitedValues')
    disableButton(submitBtn);
    gaugeSize = document.querySelector('#gaugeSize').value;
    gaugeSts = document.querySelector('#gaugeSts').value;
    gaugeRows = document.querySelector('#gaugeRows').value;
    footLength = document.querySelector('#footLength').value;
    footWidth = document.querySelector('#footWidth').value;
    userNotes = document.querySelector('#userNotes').value;

    storeInfo()

    document.querySelector('#buttonInstructions').innerHTML = "";
    // document.getElementById('gaugeSts').addEventListener('focusout', localStorage_Sts); //// NOT WORKING

    seeSubmitedValues();
        if (measuringSystem == "cm") {
            measuringSystem = "cm";
            console.log('this pattern will be in CM, from getSubmitedValues');
        //   calculateInCm();
        // calculatePattern();
        } else if (measuringSystem == "inches") {
            measuringSystem = "inches"
            console.log('this pattern will be in INCHES, from getSubmitedValues');
        //  calculateInInches();
            // calculatePattern ()
        }
    disableInputFields();
    //  seeSubmitedValues();
    console.log(sockObject)
} //enf of getSubmitedValues function

function resetAll() {
    if (topNav != undefined) {
        console.log('topNav: ' + topNav);
        console.log('topNav.childElementCount: ' + topNav.childElementCount);
        const topNava = document.querySelectorAll(".topNava");
        console.log('topNava.length: ' + topNava.length);
        for (let i = 0; i < topNava.length; i++) {
            console.log('i: ' + i);
            topNava[i].remove();
        }
        console.log('topNav: ' + topNav);
        let writtenpattern = document.querySelector('#written-sock-pattern');
        writtenpattern.remove();
    }
    console.log('resetAll function EXECUTED');
    enableButton(measuringSystemMenu);
    disableButton(submitBtn);
} 

/* ----------------------- */

function disableInputFields() {
    // console.log(allInfoFields);
    console.log('function: disableInputFields EXECUTED');
    try {
        for (let i = 0; i < allInfoFields.length; i++) {
            console.log(`i: ${i}`);
            disableButton(allInfoFields[i]);
            // debugger;
        }
    } catch (error) {
        console.log(`error in disableInputFields function`);
        console.log(error);
        return;

    }
    // console.log(allInfoFields);
} 

// function enableInputFields () {
//     console.log('function: enableInputFields executed')
//     for (let i = 0; allInfoFields.length; i++) {
//         enableButton(allInfoFields[i]);
//     }
// }



function checkAllFieldsHaveBeenFilled() {
    console.log('function: checkAllFieldsHaveBeenFilled EXECUTED')

    gaugeSts = gaugeStsField.value;
    sockObject['gaugeSts'] = gaugeSts;
    gaugeRows = gaugeRowsField.value;
    sockObject['gaugeRows'] = gaugeRows;
    footLength = footLengthField.value;
    sockObject['footLength'] = footLength;
    footWidth = footWidthField.value;
    sockObject['footWidth'] = footWidth

    console.log(sockObject);
}

function validateForm() {
    let formElements = [document.forms["sockForm"]["gaugeSwatchSize"], 
    document.forms["sockForm"]["gaugeSts"], 
    document.forms["sockForm"]["gaugeRows" ],
    document.forms["sockForm"]["footLength"],
    document.forms["sockForm"]["footWidth"],
    document.forms["sockForm"]["userNotes"],
    document.forms["sockForm"]["heel-type1" ],
    document.forms["sockForm"]["heel-type2-SR"],
    document.forms["sockForm"]["measuring-system"]    ]
    // let x = document.forms["sockForm"]["gaugeSwatchSize"].value;
    for (let i = 0; i < formElements.length; i++) {
        let x = formElements[i].value;
        if (x == "") {
            // alert(`empty string:  ${formElements[i]}`);
            console.log(`empty string:  ${formElements[i]}`)
            console.log( formElements[i])
            // return false;
        } else if (x = 'undefined') {
            // alert(`undefined element: ${formElements[i]}`);
            console.log(`undefined element: ${formElements[i]}`);
            console.log(formElements[i]);

        } else {
            // alert(`valid element: ${formElements[i]} = ${x}`)
            console.log(`valid element: ${formElements[i]} = ${x}`)
        }
    }

  }

// function isFormEmpty(form) { 
//     for (let i = 0; i < form.elements.length; i++) { 
//         if (form.elements[i].value) { 
//             console.log(form.elents[i].value);
//             return false; // Form is not empty 
//         } 
//         } 
//         return true; // Form is empty 
//     } 

//     // Usage:
//     let j = 0;
//     if (j > 10) {
//         const myForm = document.getElementById('sockForm'); 
//         const isEmpty = isFormEmpty(myForm); 
//         console.log(isEmpty); 
//     }



function seeSubmitedValues() {
    console.log('seeSubmitedValues function EXECUTED');
console.log('cm or inches?: ' + measuringSystem);
console.log('Gauge Size: ' + gaugeSize);
console.log('Gauge Sts: ' + gaugeSts);
console.log('Gauge Rows: ' + gaugeRows);
console.log('footLength: ' + footLength);
console.log('footWidth: ' + footWidth);
console.log('');
//  if (measuringSystem == "inches") {
//      calculateInInches();
//  } else if (measuringSystem == "cm") {
//      calculateInCm();
//  }
calculatePattern();
} //end of seeSubmitedValues function

// accessory functions:
function enableButton (button) {
    try {
        button.disabled = false;
        button.classList.remove('disabled');
        button.classList.remove('hidden');
    } catch (error) {
        console.log(`error in enableButton function`);
        return;
        console.log(error);
    }
}

function disableButton (button) {
    try {
        button.disabled = true;
        button.classList.add('disabled');
    } catch (error) {
        console.log(`error in disableButton function`);
        return;
        console.log(error);
    }
}

function hideButton (button) {
    button.disabled = true;
    button.classList.add('hidden');
}

function specificThemeStylingForSocks () {
    for (let i = 0; i < all_radio_elements.length; i++) {
        if (styleObject.theme === 'dark-mode') {
            all_radio_elements[i].classList.add('dark-mode-radio');
            all_radio_elements[i].classList.remove('light-mode-radio');
        } else if ((styleObject.theme !== 'dark-mode')) {
            all_radio_elements[i].classList.add('light-mode-radio');
            all_radio_elements[i].classList.remove('dark-mode-radio');
        }
    }
}
// end of accessory funcitons

function listAllEventListeners() {
    const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
    allElements.push(document);
    allElements.push(window);
  
    const types = [];
  
    for (let ev in window) {
      if (/^on/.test(ev)) types[types.length] = ev;
    }
  
    let elements = [];
    for (let i = 0; i < allElements.length; i++) {
      const currentElement = allElements[i];
      for (let j = 0; j < types.length; j++) {
        if (typeof currentElement[types[j]] === 'function') {
          elements.push({
            "node": currentElement,
            "type": types[j],
            "func": currentElement[types[j]].toString(),
          });
        }
      }
    }
  
    return elements.sort(function(a,b) {
      return a.type.localeCompare(b.type);
    });
  }

