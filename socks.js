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
let gaugeStsField;
let gaugeRowsField;

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
    // storeValuesBtn.addEventListener('click', storeInfo);
    submitBtn.addEventListener('click', submitValues);  
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
        sockObject['measuringSystem'] = measuringSystem;
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
    enableInputFields();
    storeInfo();
    writeInputFields();
} 

function writeInputFields() {
    console.log('function: writeInputFields');
    disableButton(measuringSystemMenu);
    gaugeSize = $('#gauge.Size').value;
    storeInfo();
    $('#gaugeStsLabel').html(`<input type="number" name="gaugeSts" id="gaugeSts" class="gaugeInfoInput" min="1" placeholder="sts" required> sts in ${gaugeSize} ${sockObject.measuringSystem}.`);
    $('#gaugeRowsLabel').html(`<input type="number" name="gaugeRows" id="gaugeRows" class="gaugeInfoInput" min="1" placeholder="rows" required> rows in ${gaugeSize} ${sockObject.measuringSystem}.`);
    $('#footLengthLabel').html(`<label for="footLength"> The <b> length </b> of your foot: <input type="number" name="footLength" id="footLength" class="footInfoInput" min="1" placeholder="foot length" required> </label> ${sockObject.measuringSystem}.`);
    $('#footWidthLabel').html(`<label for="footWidth"> The <b> width </b> of your foot (circumference): <input type="number" name="footWidth" id="footWidth" class="footInfoInput" min="1" placeholder="foot width" required> </label> ${sockObject.measuringSystem}.`);
    enableButton(resetButton);
    enableButton(submitBtn);
    enableButton(storeValuesBtn);
} 

function storeInfo () {
    console.log('function: storeInfo executed');
    gaugeSize = document.querySelector('#gaugeSize').value;
    gaugeSts = document.querySelector('#gaugeSts').value;
    gaugeRows = document.querySelector('#gaugeRows').value;
    footLength = document.querySelector('#footLength').value;
    footWidth = document.querySelector('#footWidth').value;
    userNotes = document.querySelector('#userNotes');
    sockObject['gaugeFor'] = `${gaugeSize} ${measuringSystem}`;
    sockObject['gaugeSize'] = gaugeSize;
    sockObject['gaugeSts'] = gaugeSts;
    sockObject['gaugeRows'] = gaugeRows;
    sockObject['gauge'] = `${sockObject['gaugeFor']} = ${sockObject['gaugeSts']} sts & ${sockObject['gaugeRows']} rows`
    sockObject['footLength'] = footLength;
    sockObject['footWidth'] = footWidth;
    sockObject['userNotes'] = userNotes.value;
    console.log(sockObject);
}

function submitValues () {
    // checkAllFieldsHaveBeenFilled
    disableButton(storeValuesBtn);
    disableButton(submitBtn);
    document.querySelector('#buttonInstructions').innerHTML = "";
    storeInfo();
    checkAllFieldsHaveBeenFilled();
    // calculatePattern();
    // determineWhatPattern();
    determineWhichSockPattern();
}

// function getSubmitedValues() {
//     console.log('Submit button fired');
//     console.log('function: getSubmitedValues')
//     // disableButton(submitBtn);
//     // gaugeSize = document.querySelector('#gaugeSize').value;
//     // gaugeSts = document.querySelector('#gaugeSts').value;
//     // gaugeRows = document.querySelector('#gaugeRows').value;
//     // footLength = document.querySelector('#footLength').value;
//     // footWidth = document.querySelector('#footWidth').value;
//     // userNotes = document.querySelector('#userNotes').value;

//     // storeInfo()

//     // document.querySelector('#buttonInstructions').innerHTML = "";
//     // document.getElementById('gaugeSts').addEventListener('focusout', localStorage_Sts); //// NOT WORKING

//     seeSubmitedValues();
//         if (measuringSystem == "cm") {
//             measuringSystem = "cm";
//             console.log('this pattern will be in CM, from getSubmitedValues');
//         //   calculateInCm();
//         // calculatePattern();
//         } else if (measuringSystem == "inches") {
//             measuringSystem = "inches"
//             console.log('this pattern will be in INCHES, from getSubmitedValues');
//         //  calculateInInches();
//             // calculatePattern ()
//         }
//     disableInputFields();
//     //  seeSubmitedValues();
//     console.log(sockObject)
// } //enf of getSubmitedValues function

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
        disableButton(storeValuesBtn);
        disableButton(submitBtn);
        for (let i = 0; i < allInfoFields.length; i++) {
            disableButton(allInfoFields[i]);
        }
    } catch (error) {
        console.log(`error in disableInputFields function`);
        console.log(error);
        return;

    }
    // console.log(allInfoFields);
} 

function enableInputFields () {
    console.log('function: enableInputFields executed')
        for (let i = 0; i < allInfoFields.length; i++) {
        enableButton(allInfoFields[i]);
    }
}



function checkAllFieldsHaveBeenFilled() {
    console.log('function: checkAllFieldsHaveBeenFilled EXECUTED')
    if (sockObject.gaugeSts == undefined || sockObject.gaugeSts <= 0 || sockObject.gaugeSts == '') {
        alert (`Please complete the information from your gauge swatch. How many stiches do you have in ${gaugeSize} ${measuringSystem}?`)
        enableButton(submitBtn);
    } else if (sockObject.gaugeRows == undefined || sockObject.gaugeRows <= 0 || sockObject.gaugeRows == '') {
        alert (`Please complete the information from your gauge swatch. How many rows do you have in ${gaugeSize} ${measuringSystem}?`)
        enableButton(submitBtn);
    } else if (sockObject.footLength == undefined || sockObject.footLength <= 0 || sockObject.footLength == '') {
        alert (`Please complete your measurements. What is the length of your foot?`)
        enableButton(submitBtn);
    } else if (sockObject.footWidth == undefined || sockObject.footWidth <= 0 || sockObject.footWidth == '') {
        alert (`Please complete your measurements. What is the width of your foot?`)
        enableButton(submitBtn);
    } else {
        console.log('allFieldsHaveBeenFilled');
        console.log(sockObject);
        determineWhichSockPattern();
    }
    // validateForm();
    // if (sockObject.gaugeSts !== undefined) {
    //     if (sockObject.gaugeRows !== undefined ) {
    //         if (sockObject.footLength !== undefined ) {
    //             if (sockObject.footWidth !== undefined) {
    //                 // calculatePattern();
    //                 determineWhichSockPattern();
    //             } else {
    //                 alert (`Please complete your measurements. What is the width of your foot?`)
    //             }
    //         } else {
    //             alert (`Please complete your measurements. What is the length of your foot?`)
    //         }
    //     } else {
    //         alert (`Please complete the information from your gauge swatch. How many rows do you have in ${gaugeSize} ${measuringSystem}.`)
    //     }
    // } else {
    //     alert (`Please complete the information from your gauge swatch. How many stiches do you have in ${gaugeSize} ${measuringSystem}.`)
    // }
    // console.log(sockObject);
}

function determineWhichSockPattern () {
    console.log('function: determineWhichSockPattern executed')
}

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

