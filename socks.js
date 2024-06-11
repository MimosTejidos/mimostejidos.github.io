"use strict";

// START of declaring GLOBAL variables:
let sockObject = {};

// socks general variables:
let footInfoFields;
let footLengthField;
let footWidthField;
let footLengthLabel;
let footWidthLabel;
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
    console.log('function EXECUTED: initTheme. Page loaded, the DOM is ready');
    getSockPatternDOMelements();
    addEventListeners();
    specificThemeStylingForSocks();


} //end of sock init function 

function getSockPatternDOMelements () {
    console.log('function EXECUTED: getSockPatternDOMelements');
    submitButton = document.querySelector('#submitButton');
    disableButton(submitButton);
    resetButton = document.querySelector('#resetButton');
    disableButton(resetButton);
    gaugeInfoFields = document.querySelectorAll('.gaugeInfoInput');
    InfoFields = document.querySelectorAll('.InfoInput');
    measuringSystemMenu = document.querySelector('#measuring-system-selection')
    gaugeSizeLabel = document.querySelector('#gaugeSizeLabel');
    gaugeStsLabel = document.querySelector('#gaugeStsLabel');
    gaugeRowsLabel = document.querySelector('#gaugeRowsLabel');
    patternParagraphs = document.querySelector('.pattern');

    heelType1 = document.querySelectorAll('.heelType1');
    heelType2 = document.querySelectorAll('.heelType2SR');

    all_radio_elements = document.querySelectorAll('.radioInput');
    fleegleHeel_radio = document.querySelector('#fleegle-heel');
    shortRowHeel_radio = document.querySelector('#short-row-heel');
    shortRowHeelTypesDiv = document.querySelector('#short-row-heel-types');

    // wrapANDturn_SR;
    // german_SR;
    // garter_SR;
}

function addEventListeners () {
    measuringSystemMenu.addEventListener('change', getMeasuringSystemChoice);
    resetButton.addEventListener('click', resetAll);
    darkLightCheckbox.addEventListener('change', specificThemeStylingForSocks);
    for (let i = 0; i < heelType1.length; i ++) {
        heelType1[i].addEventListener('click', heelType1Selection);
    }
    heelType1Selection();
    for (let i = 0; i < heelType2.length; i ++) {
        heelType2[i].addEventListener('click', heelType2Selection);
    }

}

function heelType1Selection () {
    console.log('FUNCTION heelType1Selection executed.');
    for (let i = 0; i < heelType1.length; i ++) {
        if (heelType1[i].checked) {
            console.log(`if (heelType1[i].checked)`);
            sockObject['heelType1'] = heelType1[i].id;
        }
    }
        heelType2Selection();
        console.log('sockObject = {}');
        console.log(sockObject);
}

function heelType2Selection () {

    if (sockObject['heelType1'] == 'fleegle-heel') {
        sockObject['heelType2'] = 'none';
        hideButton(shortRowHeelTypesDiv);
    }
    if (sockObject['heelType1'] == 'short-row-heel') {
        // console.log('if type1: short-row-heel');
        enableButton(shortRowHeelTypesDiv);
        for (let i = 0; i < heelType2.length; i++) {
            if(heelType2[i].checked) {
                // console.log(`if (heelType2[i].checked)`);
                sockObject['heelType2'] = heelType2[i].id;
            }
        }
    }
    console.log('sockObject = {}');
    console.log(sockObject);
}

function specificThemeStylingForSocks () {
    // console.log('all_radio_elements:');
    // console.log(all_radio_elements);
    for (let i = 0; i < all_radio_elements.length; i++) {
        if (styleObject.theme === 'dark-mode') {
            all_radio_elements[i].classList.add('dark-mode-radio');
            all_radio_elements[i].classList.remove('light-mode-radio');
        } else if ((styleObject.theme !== 'dark-mode')) {
            all_radio_elements[i].classList.add('light-mode-radio');
            all_radio_elements[i].classList.remove('dark-mode-radio');
        }
    }
    console.log('all_radio_elements:');
    console.log(all_radio_elements);
}

function showShortRowOptions () {
    if (shortRowHeel_radio == 'checked') {
        console.log('short row heel option selected ----');
        enableButton(shortRowHeelTypesDiv);
    }
}

function enableButton (button) {
    button.classList.remove('disabled');
    button.classList.remove('hidden');
}

function disableButton (button) {
    button.disabled = true;
    button.classList.add('disabled');
}

function hideButton (button) {
    button.classList.add('hidden');
}

function getMeasuringSystemChoice(){
    console.log('getMeasuringSystemChoice function EXECUTED')
    measuringSystem = document.querySelector('#measuring-system-selection').value;
    if (measuringSystem == "cm")   {
        enableSwatchSize();
        //   console.log('cm or inches?: ' + measuringSystem);
    } else if (measuringSystem == "inches") {
        enableSwatchSize();
        //   console.log('cm or inches?: ' + measuringSystem);
    } else {
        alert('Please choose between the metric or the imperial system');
        //   console.log('cm or inches?: ' + measuringSystem);
    }
    document.getElementById('gaugeSize').addEventListener('focusout', localStorage_GaugeSize);
} //end of getMeasuringSystemChoice function

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
    measuringSystemMenu.disabled = false;
    submitButton.disabled = true;
} // end of resetAll function