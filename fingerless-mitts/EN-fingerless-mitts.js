"use strict";

// START of declaring GLOBAL variables:
// general or theme variables:
let darkLightModeSwitch;
let darkLightCheckbox;
let darkSwitch;
let lightSwitch;
let darkCheckbox
let theme;
let topButton;
let submitButton;
let resetButton;
let gaugeInfoFields;
let InfoFields;
let measuringSystemMenu;
let measuringSystem;
let gaugeSize;
let gaugeSts;
let gaugeRows;
let gaugeSizeLabel;
let gaugeStsLabel;
let gaugeRowsLabel;
let gaugeSizeField;
let gaugeStsField;
let gaugeRowsField;
let userNotes;
let element;
let elements;
let patternParagraphs;
let patternInstructions;
let patternInstructionsTitle;
let patternMeasurements;
let patternMeasurementsP;
let patternMeasurementsTitle;
let patternNotes;
let patternNotesTitle;
let topNav;
let oldTheme;
let footer;
// mitts specific varialbles:
let wristCircumferenceField;
let palmCircumferenceField;
let fingersDistanceField;
let wristCircumferenceLabel;
let palmCircumferenceLabel;
let fingersDistanceLabel;
let wristCircumference;
let palmCircumference;
let fingersDistance;
let W_sts;
let rows_beforeGusset;
let length_beforeGusset;
let allFingers;
let allFingers_sts;
let inc_sts;
let thumb_sts;
let palm_sts;
let foot_before_gusset_cm;
let foot_before_gusset_inches;
let foot_before_gusset_rows;
let upperPalmRnds;
let upperPalmRibbing;
let upperThumbRibbing;

// END of declaring GLOBAL variables.

// light-dark THEME:
window.onload = initTheme();

function initTheme() {
    console.log('page loaded, the DOM is ready');
    getThemeDOMelements();
    //scroll to top button:
    topButton = document.querySelector('#topButton');
    topButton.addEventListener('click', topFunction);
    darkLightCheckbox.addEventListener('change', darkLightMode);
    // light/dark theme local storage:
    if (localStorage.theme !== undefined) {
        console.log('init theme, retrieving local storage.')
        theme = localStorage.getItem("theme");
        console.log(`retrieved theme from local storage = ${theme}`)
        if (theme === 'light-mode dark-mode') {
                darkLightCheckbox.checked = true;
            darkLightMode()
        } /* else {
            darkLightCheckbox.checked = false;
        } */
    }
} //end of theme init function 

function getThemeDOMelements() {
    console.log('function EXECUTED: getThemeDOMelements');
    submitButton = document.querySelector('#submitButton');
    submitButton.disabled = true;
    resetButton = document.querySelector('#resetButton');
    resetButton.disabled = true;
    gaugeInfoFields = document.querySelectorAll('.gaugeInfoInput');
    gaugeSizeField = document.querySelector('#gaugeSize');
    InfoFields = document.querySelectorAll('.InfoInput');
    measuringSystemMenu = document.querySelector('#measuring-system-selection')
    gaugeSizeLabel = document.querySelector('#gaugeSizeLabel');
    gaugeStsLabel = document.querySelector('#gaugeStsLabel');
    gaugeRowsLabel = document.querySelector('#gaugeRowsLabel');
    patternParagraphs = document.querySelector('.pattern');
    measuringSystemMenu.addEventListener('change', getMeasuringSystemChoice);
    resetButton.addEventListener('click', resetAll);
    darkLightModeSwitch = document.querySelector('.switch');
    darkLightCheckbox = document.getElementById("theme-selection");
    getMittsDOMelements()
} //end of getThemeDOMelements function

// light/dark mode toggle:
function darkLightMode() {
    // if (localStorage.theme === undefined) {
        if (darkLightCheckbox.checked) {
            theme = "light-mode dark-mode";
            darkLightCheckbox.value = "dark-mode";
        } else {
            theme = "light-mode";
            darkLightCheckbox.value = "light-mode";
        }
    // } 
    console.log(`function EXECUTED: darkLightMode. Theme = ${theme}`);
    element = document.body;
    element.classList.toggle('dark-mode');
    elements = document.getElementsByClassName('light-mode');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('dark-mode');
      }
    lightSwitch = document.querySelector('#light');
    darkSwitch = document.querySelector('#dark');
    darkSwitch.classList.toggle('dark-selected');
    lightSwitch.classList.toggle('light-selected');
    // footer = document.getElementById('footer');
    //     footer.classList.toggle('dark-mode');
    if (theme != localStorage.theme) {
        console.log("localStorage.theme != theme");
        new_localStorage_Theme();
    }
  } // end of darkLightMode funtion.

function localStorage_Theme () {
    // light/dark theme local storage:
    console.log("checking THEME local storage:");
    console.log('saved theme: ' + localStorage.theme);
    if (localStorage.theme !== undefined) {
    oldTheme = localStorage.getItem("theme");
    console.log(`saved theme at local storage: ${oldTheme}`) 
    theme = oldTheme;
    } else {
        if (darkLightCheckbox.checked) {
            // theme = "light-mode dark-mode"
            darkLightCheckbox.value = "light-mode dark-mode"
        } else {
            // theme = "light-mode"
            darkLightCheckbox.value = "light-mode"
        }
        theme = darkLightCheckbox.value;
        localStorage.setItem("theme", theme);
        console.log(`saving.. theme at local storage: ${theme} / localStorage.theme = ${localStorage.theme}.`)
    }
}

function new_localStorage_Theme () {
    if (darkLightCheckbox.checked) {
        // theme = "light-mode dark-mode"
        darkLightCheckbox.value = "light-mode dark-mode"
    } else {
        // theme = "light-mode"
        darkLightCheckbox.value = "light-mode"
    }
    theme = darkLightCheckbox.value;
    localStorage.setItem("theme", theme);
    console.log(`saving new theme: ${theme} / localStorage.theme = ${localStorage.theme}.`)

}

function disableInputFields() {
    console.log('function EXECUTED: disableInputFields')
    for (let i = 0; i < gaugeInfoFields.length; i++) {
        gaugeInfoFields[i].disabled = true;
        // console.log('gaugeInfoFields['+ i +'] inside disableInputFields function, disabled?' + gaugeInfoFields[i].disabled)
      }
      for (let i = 0; i < InfoFields.length; i++) {
        InfoFields[i].disabled = true;
        // console.log('footInfoFields['+ i +'] inside disableInputFields function, disabled?' + footInfoFields[i].disabled)
      }
} //end of disableInputFields funtion

function enableSwatchSize() {
    console.log('function EXECUTED: enableSwatchSize');
    if (measuringSystem == "cm") {
        gaugeSizeLabel.innerHTML = '<input type="number" name="gaugeSwatchSize" id="gaugeSize" class="gaugeInfoInput" min="1" placeholder="swatch size" required>' + ' ¿Cuántos ' + measuringSystem + ' tiene tu muestra?'

    } else if (measuringSystem = "inches") {
        gaugeSizeLabel.innerHTML = '<input type="number" name="gaugeSwatchSize" id="gaugeSize" class="gaugeInfoInput" min="1" placeholder="swatch size" required>' + ' ¿Cuántas ' + measuringSystem + ' tiene tu muestra?'
    }
    gaugeSizeField = document.querySelector('#gaugeSize');
    gaugeSize = gaugeSizeField.value;
    gaugeSizeField.disabled = false;
    gaugeSizeField.addEventListener('change', writeInputFields);
} //end of enableSwatchSize function

// scroll to top button
// When the user scrolls down 15px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}
// When the user clickss on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}//end of scroll to top button
// END of light-dark THEME.

window.onload = initMitts();

function initMitts() {
// getMittsDOMelements()
measuringSystemMenu.addEventListener('change', getMeasuringSystemChoice);
resetButton.addEventListener('click', resetAll);
gaugeSizeField.addEventListener('change', writeInputFields);
}

function getMittsDOMelements() {
    console.log('function EXECUTED: getMittsDOMelements in fingerless-mitts.js');
  submitButton.disabled = true;
  resetButton.disabled = true;
  wristCircumferenceField = document.querySelector('#wristCircumference');
  palmCircumferenceField = document.querySelector('#palmCircumference');
  fingersDistanceField = document.querySelector('#fingersDistance');
  wristCircumferenceLabel = document.querySelector('#wristCircumferenceLabel');
  palmCircumferenceLabel = document.querySelector('#palmCircumferenceLabel');
  fingersDistanceLabel = document.querySelector('#fingersDistanceLabel');
  disableInputFields();
} //end of getMittsDOMelements function

function writeInputFields() {
    console.log("function EXECUTED: writeInputFields")
  measuringSystemMenu.disabled = true;
  gaugeSize = document.querySelector('#gaugeSize').value;
  gaugeStsLabel.innerHTML = '<input type="number" name="gaugeSts" id="gaugeSts" class="gaugeInfoInput" min="1" placeholder="sts" required> ' + ' puntos en  ' + gaugeSize + ' ' + measuringSystem + '.';
  gaugeStsField = document.querySelector('#gaugeSts');
  console.log('Gauge sts value: ' + gaugeSts);
  gaugeRowsLabel.innerHTML = '<input type="number" name="gaugeRows" id="gaugeRows" class="gaugeInfoInput" min="1" placeholder="rows" required>' + '  hileras en ' + gaugeSize + ' ' + measuringSystem + '.';
  gaugeRowsField = document.querySelector('#gaugeRows'); 
  console.log('Gauge rows value: ' + gaugeRows);
  wristCircumferenceLabel.innerHTML = 'La circunferencia de tu MUÑECA: <input type="number" name="wristCircumference" id="wristCircumference" class="InfoInput" min="1" placeholder="wrist circumference" required> ' + measuringSystem; 
  wristCircumferenceField = document.querySelector('#wristCircumference');
  palmCircumferenceLabel.innerHTML = 'TLa circunferencia de tu PALMA: <input type="number" name="palmCircumference" id="palmCircumference" class="InfoInput" min="1" placeholder="palm circumference" required> ' + measuringSystem; 
  palmCircumferenceField = document.querySelector('#palmCircumference');
  fingersDistanceLabel.innerHTML = 'La distancia entre el pulgar y los nudillos: <input type="number" name="fingersDistance" id="fingersDistance" class="InfoInput" min="1" placeholder="distance between thumb and fingers" required> ' + measuringSystem;
  fingersDistanceField = document.querySelector('#fingersDistance');
  resetButton.disabled = false;
  enableInputFields();
} // end of writeInputFields function

function enableInputFields() {
    console.log('function EXECUTED: enableInputFields')
    for (let i = 0; i < gaugeInfoFields.length; i++) {
        gaugeInfoFields[i].disabled = false;
        // console.log('gaugeInfoFields['+ i +'] inside enableInputFields function, disabled?' + gaugeInfoFields[i].disabled)
      }
      for (let i = 0; i < InfoFields.length; i++) {
        InfoFields[i].disabled = false;
        // console.log('InfoFields['+ i +'] inside enableInputFields function, disabled?' + InfoFields[i].disabled)
      }
    measuringSystemMenu.disabled = true;
    console.log('measuringSytemMenu inside enableInputFields function, disabled? ' + measuringSystemMenu.disabled)
    submitButton.disabled = false;
    submitButton.addEventListener('click', checkAllFieldsHaveBeenFilled);  
} // end of enableInputFields funtion

function getMeasuringSystemChoice(){
    console.log('function EXECUTED: getMeasuringSystemChoice ')
  measuringSystem = document.querySelector('#measuring-system-selection').value;
  if (measuringSystem == "cm")   {
      enableSwatchSize();
      console.log('cm or inches?: ' + measuringSystem);
  } else if (measuringSystem == "inches") {
      enableSwatchSize();
      console.log('cm or inches?: ' + measuringSystem);
  } else {
      alert('Please choose between the metric or the imperial system');
      console.log('cm or inches?: ' + measuringSystem);
  }} //end of getMeasuringSystemChoice function

function checkAllFieldsHaveBeenFilled() {
    console.log('Gauge size value: ' + gaugeSize);
    gaugeSts = gaugeStsField.value;
    console.log('Gauge sts value: ' + gaugeSts);
    gaugeRows = gaugeRowsField.value;
    console.log('Gauge rows value: ' + gaugeRows);
    wristCircumference = wristCircumferenceField.value;
    palmCircumference = palmCircumferenceField.value;
    fingersDistance = fingersDistanceField.value;
    console.log(`W: ${wristCircumference} / P: ${palmCircumference} / D: ${fingersDistance}`);
    let x = 0;
    console.log('original x = ' + x)
      if (gaugeSize > 0) {
          x ++;
          console.log('gauge size, x: ' + x);
        } 
     if (gaugeSts > 0) { //it doesnt enter this if nor any of the following ifs, why?
             x ++;
             console.log('gauge sts x: ' + x);
     }

     if (gaugeRows > 0) {
              x ++;
             console.log('gauge rows x: ' + x);
     }
     if (wristCircumference > 0) {
        x ++;
     }
     if (palmCircumference > 0) { //
        x ++;
     }
     if (fingersDistance > 0) { 
        x ++;
     }
    console.log('final x = ' + x);
    console.log('checkAllFieldsHaveBeenFilled funtion EXECUTED')
    if (x < 5) {
        alert('Check that you have completed all the information');
        console.log('Check that you have completed all the information');
        submitButton.addEventListener('click', checkAllFieldsHaveBeenFilled); 
    } else  if (x >= 5){ 
        getSubmitedValues();
    }
} // end of checkAllFieldsHaveBeenFilled

function getSubmitedValues() {
    console.log('function EXECUTED: getSubmitedValues')
    submitButton.disabled = true;
    console.log('SubmitButton inside getSubmitedValues function, disabled?' + submitButton.disabled)
    gaugeSize = document.querySelector('#gaugeSize').value;
    gaugeSts = document.querySelector('#gaugeSts').value;
    gaugeRows = document.querySelector('#gaugeRows').value;
    wristCircumference = document.querySelector('#wristCircumference').value;
    palmCircumference = document.querySelector('#palmCircumference').value;
    fingersDistance = document.querySelector('#fingersDistance').value;
    userNotes = document.querySelector('#userNotes').value;
    document.querySelector('#buttonInstructions').innerHTML = "";
    seeSubmitedValues();
      if (measuringSystem == "cm") {
          measuringSystem = "cm";
          console.log('this pattern will be in CM, from getSubmitedValues');
        //   calculateInCm();
        calculateFingerlessMittsPattern();
      } else if (measuringSystem == "inches") {
          measuringSystem = "inches"
          console.log('this pattern will be in INCHES, from getSubmitedValues');
        //  calculateInInches();
         calculateFingerlessMittsPattern();
      }
    disableInputFields();
    //  seeSubmitedValues();
} //end of getSubmitedValues function

function seeSubmitedValues() {
    console.log('function EXECUTED: seeSubmitedValues');
    console.log(`cm or inches?: ${measuringSystem}`);
    console.log(`Gauge Size: ${gaugeSize} ${measuringSystem}`);
    console.log(`Gauge Sts: ${gaugeSts} sts`);
    console.log(`Gauge Rows: ${gaugeRows} rows`);
    console.log(`wristCircumference: ${wristCircumference} ${measuringSystem}`);
    console.log(`palmCircumference:  ${palmCircumference} ${measuringSystem}`);
    console.log(`fingersDistance: ${fingersDistance} ${measuringSystem}`);
    console.log('');
    calculateFingerlessMittsPattern()
} //end of seeSubmitedValues function

function resetAll() {
    console.log('topNav: ' + topNav);
    console.log('function EXECUTED: resetAll');
    measuringSystemMenu.disabled = false;
    submitButton.disabled = true;
   
console.log('topNav.childElementCount: ' + topNav.childElementCount);
const topNava = document.querySelectorAll(".topNava");
console.log('topNava.length: ' + topNava.length);
     for (let i = 0; i < topNava.length; i++) {
        console.log('i: ' + i);
         topNava[i].remove();
     }
    console.log('topNav: ' + topNav);
} // end of resetAll function



function calculateFingerlessMittsPattern() {
    if (measuringSystem == 'cm') {
        W_sts = ((wristCircumference - 1) * gaugeSts) / gaugeSize;
        W_sts = Math.round(W_sts)
    } else if (measuringSystem == 'inches') {
        W_sts = ((wristCircumference - 0.393701) * gaugeSts) / gaugeSize; // 1 cm = 0.393701 inches.
        W_sts = Math.round(W_sts)
    }
    if (W_sts < 2) {
        alert('The measurements are invalid, please try again.')
        enableSwatchSize;
        enableInputFields;
    } else {   
        if ((W_sts % 2) !== 0) { //W_sts debe ser par
            W_sts = Math.round(W_sts + 1);
        }
        console.log(`W_sts debe ser un número PAR: ${W_sts}`)
        if (W_sts < 2) {
            alert('your wrist measurement or your gauge sts are invalid.')
        }
        rows_beforeGusset = (((fingersDistance / 4) * gaugeRows)/ gaugeSize);
        if (rows_beforeGusset % 1!== 0 ) {
            rows_beforeGusset = Math.round(rows_beforeGusset)-1;
        }
        console.log(`rows_beforeGusset debe ser un nro. REDONDO: ${rows_beforeGusset}`);
        if (rows_beforeGusset < 1) {
            alert("With the given measurements you won't have any plain stockinette stitches section before starting the gusset for your thumb. You will go from the ribbed cuff straight to the gusset increases.")
        }
        length_beforeGusset = ((rows_beforeGusset * gaugeSize) / gaugeRows);
        console.log(`length_beforeGusset = ${length_beforeGusset} ${measuringSystem}`);
        allFingers = Math.round((palmCircumference / 4)) * 5
        allFingers_sts = allFingers * gaugeSts / gaugeSize;
        while ((allFingers_sts % 2) !== 0) {
            allFingers_sts = Math.round(allFingers_sts) + 1;
        }
        console.log(`allFingers_sts debe ser un nro. PAR: ${allFingers_sts}`)
        if (allFingers_sts < 2) {
            alert('the given measurements are invalid.')
        } 
        inc_sts = allFingers_sts - W_sts; //inc_sts debe ser un nro. par
        console.log(`inc_sts debe ser un nro. PAR: ${inc_sts}`);
        
        thumb_sts = allFingers_sts / 5;
        while ((thumb_sts % 2) !== 0) {
            thumb_sts = Math.round(thumb_sts) + 1;
        }
        console.log(`thumb_sts debe ser un nro. PAR: ${thumb_sts}`);
        if (inc_sts < 2 || thumb_sts < 2) {
            alert(`you don't have enough difference between your wrist (${wristCircumference} ${measuringSystem} and your palm (${palmCircumference} ${measuringSystem}) circumference for your stitch gauge (${gaugeSts} in ${gaugeSize} ${measuringSystem}) to make increases for the thumb.`)
        }
        palm_sts = allFingers_sts - thumb_sts;
        console.log(`palm_sts = ${palm_sts}`)
        try {
            if (measuringSystem == 'cm') {
                foot_before_gusset_cm = (foot_before_gusset_rows * gaugeSize) / gaugeRows;
                if (foot_before_gusset_cm % 1 !== 0) {
                foot_before_gusset_cm = Math.round(foot_before_gusset_cm);
                }
            } else if (measuringSystem == 'inches') {
            console.log('stop 2 inches')
                foot_before_gusset_inches = (foot_before_gusset_inches = (foot_before_gusset_rows * (gaugeSize)) / gaugeRows); 
                if (foot_before_gusset_inches % 1 !== 0) {
                foot_before_gusset_inches = Math.round(foot_before_gusset_inches);
            }
            }
            console.log('stop 3')
        } catch (error) {
            console.log(error);
            console.log(error.message);
        }
        if (measuringSystem == 'cm') {
            upperPalmRnds = ((fingersDistance - 1) * gaugeRows) / gaugeSize;
        } else if (measuringSystem = 'inches') {
            upperPalmRnds = ((fingersDistance - 0.4) * gaugeRows) / gaugeSize;
        }
        if (upperPalmRnds % 1 !== 0) {
            upperPalmRnds = Math.round(upperPalmRnds);
        }
        if (measuringSystem == 'cm') {
            upperPalmRibbing = ((fingersDistance - 1.5) * gaugeRows) / gaugeSize;
        } else if (measuringSystem = 'inches') {
            upperPalmRibbing = ((fingersDistance - 0.6) * gaugeRows) / gaugeSize;
        }
        if (upperPalmRibbing % 1 !== 0) {
            upperPalmRibbing = Math.round(upperPalmRibbing);
        }
        if (measuringSystem == 'cm') {
           upperThumbRibbing = ((fingersDistance - 2.5) * gaugeRows) / gaugeSize;
        } else if (measuringSystem = 'inches') {
            upperThumbRibbing = ((fingersDistance - 1) * gaugeRows) / gaugeSize;
        }
        if (upperThumbRibbing % 1 !== 0) {
            upperThumbRibbing = Math.round(upperThumbRibbing);
        }
    writeFingerlessMittsPattern();}
} // end of the calculateIn CM and Inches function

function writeFingerlessMittsPattern() {
    try {
        console.log('function EXECUTED: writeFingerlessMittsPattern')
    patternMeasurementsTitle = document.querySelector('#h3-patternMeasurements');
        patternMeasurementsTitle.innerHTML = 'Your Measurements'
    patternMeasurementsP = document.querySelector('#patternMeasurements');
        patternMeasurementsP.innerHTML =  `Gauge:  ${gaugeSize}  ${measuringSystem}  =  ${gaugeSts} sts & ${gaugeRows} rnds. "<br>" 
        WRIST circumference: ${wristCircumference}   ${measuringSystem}. "<br>"
        PALM circumference: ${palmCircumference}  ${measuringSystem}. "<br>"
        The distance between your thumb and the knuckles of your fingers: ${fingersDistance} ${measuringSystem}.`
        addH4Titles('Your personal comments for this fingerless mittens pattern: ', 'no', 'notes', 'no');
        addParagraph(userNotes, 'notes' , 'yes');
    patternNotesTitle = document.querySelector('#h3-patternNotes');
        patternNotesTitle.innerHTML = 'Notes:'
    patternNotes = document.querySelector('#patternNotes');
        patternNotes.innerHTML = `This fingerless mitts are worked in the round, starting at the cuff and ending at the fingers. You can use 1 circular knitting needle, 2 circular knitting needles or double pointed needles. <br>`
    patternInstructionsTitle = document.querySelector('#h3-patternInstructions');
        patternInstructionsTitle.innerHTML = 'Instrucciones';
    patternInstructions = document.querySelector('#patternInstructions');
    addH4Titles('ABBREVIATIONS', 'yes');
    addParagraph(`BO: bind off`);
    addParagraph(`BM: border marker`);
    addParagraph(`CO: cast on`);
    addParagraph(`k: knit`);
    addParagraph(`k2tog: knit 2 sts together (right leaning decrease)`);
    addParagraph(`M1L: make 1 left (left leaning increase)`);
    addParagraph(`M1R: make 1 right (right leaning increase)`);
    addParagraph(`p: purl`);
    addParagraph(`pm: place marker`);
    addParagraph(`PU: pick up`);
    addParagraph(`rnd/s: round/s`);
    addParagraph(`sm: slip marker`);
    addParagraph(`SSK: slip, slip, knit (left leaning decrease)`);
    addParagraph(`st/s: stitch/es`);
    addH4Titles('CUFF', 'yes');
    addParagraph(`Using the elastic cast on of your choice, CO a total of ${W_sts} sts.`);
    addParagraph("Place BM to indicate the beginning of the round.");
    addParagraph(`*k1, p1* until reaching the desired length for the cuff. (${W_sts} sts).`)
    addParagraph(``);
    addH4Titles('PALM', 'yes');
    addParagraph(`Work in Stockinette stitch for ${rows_beforeGusset} rounds. Aproximately ${Math.round(length_beforeGusset)} ${measuringSystem} from the cuff.`);
    addH4Titles('THUMB INCREASES', 'yes');
    addParagraph(`Keep working in Stockinette stitch while doing the increases to fit the thumb: `);
    addParagraph(`<b>R1 (increase rnd):</b> k${(W_sts/2)-1}, M1R, pm, k2, pm, M1L, k${(W_sts/2)-1}.`);
    addParagraph(`<b>R2-3: </b> Work in Stockinette stitch, without increases, for 2 rnds.`);
    addParagraph(`<b>R4:</b> k${(W_sts/2)}, M1R, sm, k2, sm, M1L, k${(W_sts/2)}.`);
    addParagraph(`<b>R5-6:</b> Work in Stockinette stitch, without increases, for 2 rnds.`);
    addParagraph(`Repeat the last 3 rounds until you have a total of ${allFingers_sts} sts. You should have done ${(inc_sts)/2}increasing rnds, ending with 2 Stockinette stitch rnds.`);
    addH4Titles('PUT THUMB STITCHES ON HOLD', 'yes');
    addParagraph(`We are going to put the sts for the thumb on hold (using scrap yarn) and continue working the mitt for the rest of your fingers. Once we've bind off the palm we'll pick up the sts left on hold and do the thumb.`);
    addParagraph(`K${palm_sts/2}, put the ${thumb_sts} sts for the thumb on hold, CO 2 sts, k${palm_sts/2} sts (${palm_sts + 2} sts).`);
    addParagraph(`K${palm_sts/2 - 2}, SSK, k2, k2tog, k${palm_sts/2 - 2}. (${palm_sts} sts).`);
    addH4Titles('UPPER PALM', 'yes');
    addParagraph(`Work in Stockinette stitch for ${upperPalmRnds} rnds. (${palm_sts} sts).`);
    addParagraph(`Ribbing: *k1, p1*  for ${upperPalmRibbing} rnds. (${palm_sts} sts).`);
    addParagraph(`Do a elastic BO.`);
    addH4Titles('THUMB', 'yes');
    addParagraph(`Put the (${thumb_sts} sts left on hold back onto working needles.`);
    addParagraph(`<b> R1: </b> k${thumb_sts}, PU 2 sts from the CO border, PU 2 sts from the CO edge, PU 2 sts from the CO border. (${thumb_sts + 6} sts).`);
    addParagraph(`<b> R2: </b> k${thumb_sts - 1}, SSK, k4, k2tog. El comienzo de la vuelta se desplaza 1 punto hacia la izquierda (${thumb_sts + 4} sts).`);
    addParagraph(`<b> R3: </b> k${thumb_sts - 2} sts, SSK, k2, k2tog. (${thumb_sts + 2} sts).`);
    addParagraph(`<b> R4: </b> Work 1 rnd in Stockinette stitch. (${thumb_sts + 2} sts).`);
    addParagraph(`Ribbing: *k1, p1* for ${upperThumbRibbing} rnds. (${thumb_sts + 2} sts).`);
    addParagraph(`Do an elastic BO.`);

    
    const breaks = document.createElement('hr');
    patternInstructions.appendChild(breaks);
    document.querySelector('.row').style = "flex-direction: column-reverse;";
    console.log("end of writeFingerlessMittsPattern function");
    //body.innerHTML = "";
    console.log(`stop to debug`);
    } catch (error) {
        console.log(error);
        console.log(error.message);
    } finally {
        enableInputFields();
        resetButton.disabled = false;
        submitButton.disabled = false;
        topFunction();
        window.onscroll = function() {scrollFunction()};
    }
} //end of the writeFingerlessMittsPattern function


 function addH4Titles(title, id, specialClass, classes) {
    const title4 = document.createElement('h4');
    title4.innerHTML = title;
    patternInstructions.appendChild(title4);
    console.log('function EXECUTED: addH4Titles for: ' + title);
    title4.classList.add('light-mode');
    title4.classList.add('morePadding');
    if ( id === 'yes') {
        title4.setAttribute('id', title)
        topNav = document.querySelector('.topNav');
        const aNav = document.createElement('a');
        aNav.innerHTML = title;
        topNav.appendChild(aNav);
        aNav.setAttribute('href', "#" + title);
        aNav.classList.add('topNava');
        aNav.classList.add('light-mode');
    }
    if (classes === 'yes') {
        title4.classList.add(specialClass)
    }
 } 

function addParagraph(text, specialClass, classes) {
    const para = document.createElement('p');
    para.innerHTML = text;
    patternInstructions.appendChild(para);
    if (classes === "yes") {
        para.classList.add(specialClass);
    }
} //end of addParagraph function

