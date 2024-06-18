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
let G_size_stored;
let G_sts_stored;
let G_rows_stored;
let foot_Length_stored;
let foot_Width_stored;

let fleegleHeelSock = {};
let shortRowHeel = {};

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
    retrieveStoredInfo();
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
    saveInfo();
    writeInputFields();
} 

function writeInputFields() {
    console.log('function: writeInputFields');
    disableButton(measuringSystemMenu);
    gaugeSize = $('#gauge.Size').value;
    saveInfo();
    $('#gaugeStsLabel').html(`<input type="number" name="gaugeSts" id="gaugeSts" class="gaugeInfoInput" min="1" placeholder="sts" required> sts in ${gaugeSize} ${sockObject.measuringSystem}.`);
    $('#gaugeRowsLabel').html(`<input type="number" name="gaugeRows" id="gaugeRows" class="gaugeInfoInput" min="1" placeholder="rows" required> rows in ${gaugeSize} ${sockObject.measuringSystem}.`);
    $('#footLengthLabel').html(`<label for="footLength"> The <b> length </b> of your foot: <input type="number" name="footLength" id="footLength" class="footInfoInput" min="1" placeholder="foot length" required> </label> ${sockObject.measuringSystem}.`);
    $('#footWidthLabel').html(`<label for="footWidth"> The <b> width </b> of your foot (circumference): <input type="number" name="footWidth" id="footWidth" class="footInfoInput" min="1" placeholder="foot width" required> </label> ${sockObject.measuringSystem}.`);
    enableButton(resetButton);
    enableButton(submitBtn);
    enableButton(storeValuesBtn);
} 

function saveInfo () {
    console.log('function: saveInfo executed');
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

function storeInfo () {
    localStorage.setItem('G_size_local', sockObject.gaugeSize);
    localStorage.setItem('G_sts_local', sockObject.gaugeSts);
    localStorage.setItem('G_rows_local', sockObject.gaugeRows);
    localStorage.setItem('foot_Length_local', sockObject.footLength);
    localStorage.setItem('foot_Width_local', sockObject.footWidth);
}

function retrieveStoredInfo () {
    if (localStorage.G_size_local !== undefined) {
        console.log(`retrieving G_size`);
        G_size_stored = localStorage.getItem(G_size_local);
        $('#gaugeSize').value = G_size_stored;
    }
    if (localStorage.G_sts_local !== undefined) {
        console.log(`retrieving G_sts: `);
        G_sts_stored = localStorage.getItem(G_sts_local);
        $('#gaugeSts').value = G_sts_stored;
    }
    if (localStorage.G_rows_local !== undefined) {
        console.log(`retrieving G_rows`);
        G_rows_stored = localStorage.getItem(G_rows_local);
        $('#gaugeRows').value = G_rows_stored;
    }
    if (localStorage.foot_Length_local !== undefined) {
        foot_Length_stored = localStorage.getItem(foot_Length_local);
        $('#footLength').value = foot_Length_stored;
    }
    if (localStorage['foot_Width_local'] !== undefined) {
        foot_Width_stored = localStorage.getItem(foot_Width_local)
        $('#footWidth').value = foot_Width_stored;
    }
}

function submitValues () {
    disableButton(storeValuesBtn);
    disableButton(submitBtn);
    document.querySelector('#buttonInstructions').innerHTML = "";
    saveInfo();
    checkAllFieldsHaveBeenFilled();
    storeInfo();
    // determineWhichSockPattern();
}

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
    if (sockObject.gaugeSts == undefined || sockObject.gaugeSts <= 2 || sockObject.gaugeSts == '') {
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
        storeInfo();
        determineWhichSockPattern();
    }
}
function determineWhichSockPattern () {
    console.log('function: determineWhichSockPattern executed')
    if (sockObject.heelType1 == 'fleegle-heel') {
        console.log(`Toe-up sock with fleegle heel in ${sockObject.measuringSystem}`);
        calculateFleegleHeel();
    } else if (sockObject.heelType1 == 'short-row-heel') {
        console.log(`Toe-up sock with short row heel in ${sockObject.measuringSystem}`);
        if (sockObject.heelType2 == 'type2-wrap-and-turnSR') {
            console.log(`Type of short row heel: Wrap & Turn`);
        } else if (sockObject.heelType2 == 'type2-garterSR') {
            console.log(`Type of short row heel: W & T in garter stitch`);
        } else if (sockObject.heelType2 == 'type2-germanSR') {
            console.log(`Type of short row heel: German short rows`);
        }
    }
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


  ////////// start of the pattern math of the program: 
function calculateFleegleHeel() {
    foot_sts = ((sockObject.footWidth * sockObject.gaugeSts) / sockObject.gaugeSize) *0.9;
    foot_sts = Math.round(foot_sts);
    if ((foot_sts % 8) !== 0) {
        foot_sts = Math.floor(foot_sts);
        while ((foot_sts % 8) !== 0) {
            foot_sts = foot_sts - 1;
        }
        foot_sts = Math.round(foot_sts);
    }
    HALF_CO_sts = foot_sts / 4;
    // if ((HALF_CO_sts % 4) !== 0) {
    //     HALF_CO_sts = Math.floor(HALF_CO_sts);
    //     while ((HALF_CO_sts % 4) !== 0) {
    //         HALF_CO_sts = HALF_CO_sts-1;
    //     }
    //     HALF_CO_sts = Math.round(HALF_CO_sts);
    // }
    if (HALF_CO_sts < 2) {
    alert('The measurements are invalid, please try again.')
    enableSwatchSizeField();
    enableInputFields();
    } else {foot_sts = HALF_CO_sts * 4;
        // console.log("HALFCOsts: " + HALF_CO_sts );
        fleegleHeelSock['halfCOsts'] = HALF_CO_sts;
        while (foot_sts % 2 !== 0) {
            foot_sts = Math.floor(foot_sts)-1;
        }
    }
    // console.log("footSts: " + foot_sts);
    fleegleHeelSock['footSts'] = foot_sts;
    HALF_CO_sts = foot_sts / 4;
    CO_sts = HALF_CO_sts * 2;
    // HALF_foot_sts = foot_sts / 2;
    HALF_foot_sts = CO_sts;
    // console.log("HALFfootSts: " + HALF_foot_sts)
    fleegleHeelSock['halfFootSts'] = HALF_foot_sts
    gusset_inc_sts = HALF_foot_sts - 2;
    while (gusset_inc_sts % 2 !== 0) {
        gusset_inc_sts = gusset_inc_sts - 1;
    }
    while ((gusset_inc_sts + HALF_foot_sts) % 4 !== 0) {
        // gusset_inc_sts = gusset_inc_sts + 1;
        gusset_inc_sts++;
    }
    fleegleHeelSock['gussetIncSts'] = gusset_inc_sts;
    HALF_gusset_inc_sts = gusset_inc_sts / 2;
    fleegleHeelSock['halfGussetIncSts'] = HALF_gusset_inc_sts;
    gusset_inc_rows = gusset_inc_sts;

    fleegleHeelSock['gussetIncRows'] = gusset_inc_rows;
    if (sockObject.measuringSystem == 'cm') {
        let total_foot_rows_cm;
        total_foot_rows_cm = ((sockObject.footLength - 0.75) * sockObject.gaugeRows) / sockObject.gaugeSize;
        while (total_foot_rows_cm % 2!== 0 ) {
            total_foot_rows_cm = Math.round(total_foot_rows_cm)-1;
        }
        fleegleHeelSock['totalFootRows_cm'] = total_foot_rows_cm
        total_foot_rows = total_foot_rows_cm;
    } else if (sockObject.measuringSystem == 'inches') {
        let total_foot_rows_inches;
        total_foot_rows_inches = ((sockObject.footLength - 0.3) * sockObject.gaugeRows) / sockObject.gaugeSize;
        while (total_foot_rows_inches % 2!== 0 ) {
            total_foot_rows_inches = Math.round(total_foot_rows_inches)-1;
        }
        fleegleHeelSock['totalFootRows_inches'] = total_foot_rows_inches;
        total_foot_rows = total_foot_rows_inches;
    }

    // total_foot_rows = ((sockObject.footLength - (sockObject.footLength*0.05)) * sockObject.gaugeRows) / sockObject.gaugeSize;
    // while (total_foot_rows % 1!== 0 ) {
    //     total_foot_rows = Math.round(total_foot_rows)-1;
    // }
    fleegleHeelSock['totalFootRows'] = total_foot_rows

    foot_before_gusset_rows = total_foot_rows - gusset_inc_rows;
    fleegleHeelSock['footBeforeGussetRows'] = foot_before_gusset_rows;
    if (sockObject.measuringSystem == 'cm') {
        foot_before_gusset_cm = (foot_before_gusset_rows * gaugeSize) / gaugeRows;
        if (foot_before_gusset_cm % 1 !== 0) {
            foot_before_gusset_cm = Math.round(foot_before_gusset_cm);
            fleegleHeelSock['footBeforeGusset_cm'] = foot_before_gusset_cm;
        }
    } else if (sockObject.measuringSystem == 'inches') {
        foot_before_gusset_inches = (foot_before_gusset_inches = (foot_before_gusset_rows * (gaugeSize)) / gaugeRows); 
        if (foot_before_gusset_inches % 1 !== 0) {
            foot_before_gusset_inches = Math.round(foot_before_gusset_inches);
            fleegleHeelSock['footBeforeGusset_inches'] = foot_before_gusset_inches;
        }
    }
    afterGussetHeelNeedleSts = HALF_foot_sts + gusset_inc_sts;

    fleegleHeelSock['afterGussetHeelNeedleSts'] = afterGussetHeelNeedleSts;
    heelNeedleStMarker = afterGussetHeelNeedleSts / 2;
    fleegleHeelSock['heelNeedleStMarker'] = heelNeedleStMarker;
    R1BackAndForth = heelNeedleStMarker + 2;
    fleegleHeelSock['R1backADNforth'] = R1BackAndForth;
    R1sts = R1BackAndForth + 2;
    fleegleHeelSock['R1sts'] = R1sts;
    Rend_k_sts = heelNeedleStMarker - 1;
    fleegleHeelSock['Rend_kSts'] = Rend_k_sts;
    Rend_sts = R1BackAndForth;
    fleegleHeelSock['RendSts'] = Rend_sts;
    R1HeelNeedle = Rend_sts;
    fleegleHeelSock['R1HeelNeedle'] = R1HeelNeedle;
    R1InstepNeedle = Rend_sts-1;
    fleegleHeelSock['R1InspepNeedle'] = R1InstepNeedle;
    R1BothNeedlesSts = R1HeelNeedle + R1InstepNeedle;
    fleegleHeelSock['R1BothNeedlesSts'] = R1BothNeedlesSts;
    R2BothNeedlesSts = R1BothNeedlesSts - 2;
    fleegleHeelSock['R2BothNeedlesSts'] = R2BothNeedlesSts;
    CuffRepeats = R2BothNeedlesSts / 4
    fleegleHeelSock['CuffRepeats'] = CuffRepeats;
    console.log('fleegleHeelSock object:');
    console.log(fleegleHeelSock);
    writeFleegleHeelSockPattern();
    
} // end of the calculateIn CM and Inches function for fleegle heel sock

// accessory functions to write the fleegle heel pattern:

function writeFleegleHeelSockPattern() {
    console.log('function: writeFleegleHeelSockPattern executed');
    $('#h3-patternMeasurements').html('Your Measurements');
    $('#patternMeasurements').html(`Your gauge: ${sockObject.gaugeSize} ${sockObject.measuringSystem} = ${sockObject.gaugeSts} sts & ${sockObject.gaugeRows} rows. <br> Your foot measurements: ${sockObject.footLength} ${sockObject.measuringSystem} in length and ${sockObject.footWidth} ${sockObject.measuringSystem} in circumference (width). <br>`)
}

function writePattern() {
   console.log('writePattern function EXECUTED')
   $('#patternNotes').html('')
patternMeasurementsTitle = document.querySelector('#h3-patternMeasurements');
   patternMeasurementsTitle.innerHTML = 'Your Measurements'
patternMeasurementsP = document.querySelector('#patternMeasurements');
   patternMeasurementsP.innerHTML =  "Your gauge: " + gaugeSize + " " + measuringSystem + " = " + gaugeSts + " sts and " + gaugeRows + " rows. <br>" + "Your foot measurements: " + footLength + " " + measuringSystem + " (length) and " + footWidth + " " + measuringSystem + " (width). " + " <br>"
patternNotesTitle = document.querySelector('#h3-patternNotes');
   patternNotesTitle.innerHTML = 'Notes:'
patternNotes = document.querySelector('#patternNotes');
   patternNotes.innerHTML = 'This socks are knitted in the rnd, starting at the toe and ending with the cuff. You can use 1 circular knitting needle, 2 circular knitting needles or double pointed needles. <br>'
   patternInstructionsTitle = document.querySelector('#h3-patternInstuctions');
   patternInstructionsTitle.innerHTML = 'Pattern Instructions';
patternInstructions = document.querySelector('#patternInstructions');
addH4Titles('TOE', 'yes');
addParagraph("Using Judy's Magic Cast On, CO " + HALF_CO_sts + " sts on each needle, so that you have a total of " + CO_sts + " sts. <br>");
addParagraph("Put a st marker to indicate the beg of rnd.");
addParagraph("<b>R1:</b> knit both needles. ");
addParagraph("<b>R2:</b> k1, M1R, knit to last st on needle, M1L, k1 (rep on the other needle) ");
addParagraph("Rep rnds 1 and 2 until there are " + foot_sts + " sts in total (" + HALF_foot_sts + " on each needle) ")
addH4Titles('FOOT', 'yes');
if (measuringSystem == 'cm') {
   // addParagraph("Continue knitting in Stockinette St until your piece measures " + foot_before_gusset_cm + ' ' + measuringSystem + " from the toe to your needles. (that would be aprox " + foot_before_gusset_rows + " rnds). ");
   addParagraph("Continue knitting in Stockinette St for  " + foot_before_gusset_rows + " rnds  from the toe to your needles. (that would be aprox " + foot_before_gusset_cm + ' ' + measuringSystem + "). ");
} else if (measuringSystem == 'inches') {
   // addParagraph("Continue knitting in Stockinette St until your piece measures approximately " + foot_before_gusset_inches + ' ' + measuringSystem + " from the toe to your needles. (that would be aprox " + foot_before_gusset_rows + " rnds). ");
   addParagraph("Continue knitting in Stockinette St for  " + foot_before_gusset_rows + " rnds  from the toe to your needles. (that would be aprox " + foot_before_gusset_inches + ' ' + measuringSystem + "). ");
}
addParagraph("The sts on the 1st needle are the SOLE sts (where we'll make the HEEL), the ones on the 2nd needle are the INSTEP sts. ");
addH4Titles('GUSSET', 'yes');
addParagraph("Beg increasing on the sole (while working in Stockinette St for the instep) as follows: ");
addParagraph("<b>R1:</b> (heel needle): k1, M1L, k to last st on needle, M1R, k1; <br> (instep needle): knit.");
addParagraph("<b>R2:</b> knit ");
addParagraph("Rep rnds 1 and 2 until the heel needle has " + afterGussetHeelNeedleSts + " sts.");
addH4Titles('HEEL', 'yes')
addParagraph("Start working back and forth to make a fleegle heel.");
addParagraph("<b>R1:</b> k " + R1BackAndForth + ", k2tog, k1. Turn. (" + R1sts + " sts)");
addParagraph("<b>R2:</b> sl1(wyif), p5, p2tog, p1. Turn. (8 sts)");
addParagraph("<b>R3:</b> sl1(wyib), k6, k2tog, k1. Turn (9 sts)");
addParagraph("<b>R4:</b> sl1(wyif), p7, p2tog, p1. Turn. (10 sts)");
addParagraph("Continue knitting in this manner until there is a row like the one that follows: sl1(wyib), k" + Rend_k_sts + ", k2tog, k1. (" + Rend_sts + " sts)");
addParagraph("Knit the sts on the instep needle. Then continue knittng in the rnd.");
addParagraph("<b>R1:</b> (heel needle): k1, k2tog, k to end of needle (" +  R1HeelNeedle + " sts); <br> (instep needle): knit (" + R1InstepNeedle + " sts). That way you have a total of " + R1BothNeedlesSts + " sts.");
addParagraph("<b>R2:</b> (heel needle): k1, SSK, knit to last 3 sts, k2tog, k1 (" + R1InstepNeedle + " sts); <br> (instep needle): knit " + R1InstepNeedle + " sts. You'll have a total of " + R2BothNeedlesSts + " sts.");
addH4Titles('CUFF', 'yes')
addParagraph("Optional: work in Stockinette Stitch for as long as you want before making the rib."); 
addParagraph("*k2, p2*  rep from * to * " + CuffRepeats + " times, for as many rnds as necessary to achieve the desired elastic cuff length.");
addParagraph("Once you've reached the desired length BO (with an elastic bind off method).");
addParagraph("I like to use Jeny's Stretchy Bind OFf")
addParagraph('Enjoy your new socks!');
addH4Titles('Your Personal Notes for this pattern: ', 'no', 'notes', 'no');
addParagraph(userNotes, 'notes' , 'yes');
const breaks = document.createElement('hr');
patternInstructions.appendChild(breaks);
document.querySelector('.row').style = "flex-direction: column-reverse;";
topFunction()
window.onscroll = function() {scrollFunction()};
body.innerHTML = "";
// document.getElementsByTagName('fieldset').style.visibility = "hidden";
//try with a for loop for all the fieldset elements
// document.getElementById('gauge-fieldset').style.visibility = "hidden";
// document.getElementById('measurements-fieldset').style.visibility = "hidden";
} //end of the writePatternInCM function


function addH4Titles(title, topNavTitle, specialClass, hasExtraClasses) {
   const title4 = document.createElement('h4');
   title4.innerHTML = title;
   patternInstructions.appendChild(title4);
   console.log('addH4Titles function EXECUTED for: ' + title);
   title4.classList.add('light-mode');
   title4.classList.add('morePadding');
   if ( topNavTitle === 'yes') {
       title4.setAttribute('id', title)
       topNav = document.querySelector('.topNav');
       const aNav = document.createElement('a');
       aNav.innerHTML = title;
       topNav.appendChild(aNav);
       aNav.setAttribute('href', "#" + title);
       aNav.classList.add('topNava');
       aNav.classList.add('light-mode');
   }
   // if (hasExtraClasses === 'yes') {
   //     title4.classList.add(specialClass)
   // }  //it seems to never be used
} 

function addParagraph(text, specialClass, classes) {
   const para = document.createElement('p');
   para.innerHTML = text;
   patternInstructions.appendChild(para);
   if (classes === "yes") {
       para.classList.add(specialClass);
   }
} //end of addParagraph function

function addBreak() {
   const title4 = document.createElement('h4');
   title4.innerHTML = title;
   patternInstructions.appendChild(title4);
   console.log('addH4Titles function EXECUTED for: ' + title);
   title4.classList.add('light-mode');
} // end of break function
