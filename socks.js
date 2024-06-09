// "use strict";

// START of declaring GLOBAL variables:
// let styleObject = {storedTheme: ''};

// socks general variables:
let footInfoFields;
let footLengthField;
let footWidthField;
let footLengthLabel;
let footWidthLabel;
let footLength;
let footWidth;

let heelType1;
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

}

function specificThemeStylingForSocks () {
    if (styleObject.theme === 'dark-mode') {
        all_radio_elements.classList.add('dark-mode-radio');
    } else if ((styleObject.theme !== 'dark-mode')) {
        all_radio_elements.classList.add('light-mode-radio');
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