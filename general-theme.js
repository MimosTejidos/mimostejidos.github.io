"use strict";

// START of declaring GLOBAL variables:
let styleObject = {};

let darkLightModeSwitch;
let darkLightCheckbox;
let darkSwitch;
let lightSwitch;
let darkCheckbox
let theme;
let topButton;
let submitBtn;
let resetButton;

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

// pattern specific variables:

let patternObject = {};

// socks specific variables:
// let footInfoFields;
// let footLengthField;
// let footWidthField;
// let footLengthLabel;
// let footWidthLabel;
// let footLength;
// let footWidth;
// let foot_sts;
// let HALF_CO_sts;
// let CO_sts;
// let HALF_foot_sts;
// let gusset_inc_sts;
// let HALF_gusset_inc_sts;
// let gusset_inc_rows;
// let total_foot_rows;
// let foot_before_gusset_rows;
// let foot_before_gusset_cm;
// let foot_before_gusset_inches;
// let afterGussetHeelNeedleSts;
// let heelNeedleStMarker;
// let R1BackAndForth;
// let R1sts;
// let Rend_k_sts;
// let Rend_sts;
// let R1HeelNeedle;
// let R1InstepNeedle;
// let R1BothNeedlesSts;
// let R2BothNeedlesSts;
// let CuffRepeats



window.onload = initTheme();

function initTheme() {
    console.log('function: initTheme. Page loaded, the DOM is ready');
    getMainIndexDOMelements();
    darkLightCheckbox.addEventListener('change', darkLightMode);
        // light/dark theme local storage:
        if (localStorage.theme !== undefined) {
            console.log('init theme, retrieving local storage.')
            theme = localStorage.getItem("theme");
            console.log(`retrieved theme from local storage = ${theme}`)
            if (theme === 'light-mode dark-mode') {
                darkLightCheckbox.checked = true;
                styleObject.storedTheme = 'dark-mode';
                darkLightMode()
            } else {
                styleObject.storedTheme = 'light-mode';
            }
            // console.log(`styleObject.[storedTheme] = ${styleObject.storedTheme}`);
        }
    //scroll to top button:
    topButton = document.querySelector('#topButton');
    // topButton.addEventListener('click', topFunction);

} //end of theme init function 

function getMainIndexDOMelements () {
    console.log('function: getMainIndexDOMelements');
    darkLightModeSwitch = document.querySelector('.switch');
    darkLightCheckbox = document.getElementById("light-dark-checkbox");

}

// light/dark mode toggle:
function darkLightMode() {
    // console.log('function EXECUTED: darkLightMode');
    // if (localStorage.theme === undefined) {
        if (darkLightCheckbox.checked) {
            theme = "light-mode dark-mode";
            darkLightCheckbox.value = "dark-mode";
        } else {
            theme = "light-mode";
            darkLightCheckbox.value = "light-mode";
        }
        styleObject.theme = darkLightCheckbox.value;
        // console.log(`styleObject:`);
        // console.log(styleObject);
    // } 
    // console.log(`Theme = ${theme}`);
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
        // console.log("localStorage.theme != theme");
        new_localStorage_Theme();
    }
  } // end of darkLightMode funtion.

function localStorage_Theme () {
    // console.log('function EXECUTED: localStorage_Theme');
    // light/dark theme local storage:
    // console.log("checking THEME local storage:");
    // console.log('saved theme: ' + localStorage.theme);
    if (localStorage.theme !== undefined) {
    oldTheme = localStorage.getItem("theme");
    console.log(`saved theme at local storage: ${oldTheme}`) 
    theme = oldTheme;
    } else {
        if (darkLightCheckbox.checked) {
            darkLightCheckbox.value = "light-mode dark-mode"
        } else {
            darkLightCheckbox.value = "light-mode"
        }
        theme = darkLightCheckbox.value;
        localStorage.setItem("theme", theme);
        console.log(`saving theme at local storage: ${theme} / localStorage.theme = ${localStorage.theme}.`)
    }
}

function new_localStorage_Theme () {
    console.log('function: new_localStorage_Theme');
    if (darkLightCheckbox.checked) {
        darkLightCheckbox.value = "light-mode dark-mode"
    } else {
        darkLightCheckbox.value = "light-mode"
    }
    theme = darkLightCheckbox.value;
    localStorage.setItem("theme", theme);
    console.log(`saving new theme: ${theme} / localStorage.theme = ${localStorage.theme}.`)

}


// scroll to top button
// When the user scrolls down 15px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     console.log('function: scrollFunction');
//   if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
//     topButton.style.display = "block";
//   } else {
//     topButton.style.display = "none";
//   }
// }

// When the user clickss on the button, scroll to the top of the document
// function topFunction() {
//     console.log('function EXECUTED: topFunction');
//   document.body.scrollTop = 0;
//   document.documentElement.scrollTop = 0;
// }//end of scroll to top button
// END of light-dark THEME.



