 
 "use strict";

import { sockObject } from "/socks.js";
 
 
 ////////// start of the pattern math of the program: 
 function calculateFleegleHeel() {
    console.log('function: calculateFleegleHeel executed');
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
    fleegleHeelSock['COsts'] = CO_sts;
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
            fleegleHeelSock['footBeforeGusset_measurement'] = foot_before_gusset_cm;
        }
    } else if (sockObject.measuringSystem == 'inches') {
        foot_before_gusset_inches = (foot_before_gusset_inches = (foot_before_gusset_rows * (gaugeSize)) / gaugeRows); 
        if (foot_before_gusset_inches % 1 !== 0) {
            foot_before_gusset_inches = Math.round(foot_before_gusset_inches);
            fleegleHeelSock['footBeforeGusset_inches'] = foot_before_gusset_inches;
            fleegleHeelSock['footBeforeGusset_measurement'] = foot_before_gusset_inches;

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
    $('#patternMeasurements').html(`Your gauge: ${sockObject.gaugeSize} ${sockObject.measuringSystem} = ${sockObject.gaugeSts} sts & ${sockObject.gaugeRows} rows. <br> Your foot measurements: ${sockObject.footLength} ${sockObject.measuringSystem} in length and ${sockObject.footWidth} ${sockObject.measuringSystem} in circumference (width). <br>`);
    $('#h3-patternNotes').html('Notes:');
    $('#patternNotes').html('This socks are knitted in the rnd, starting at the toe and ending with the cuff. You can use 1 circular knitting needle, 2 circular knitting needles or double pointed needles. <br>');
    $('#h3-patternInstuctions').html('Pattern Instructions');
    // $('#patternInstructions')
    addH4Title ('#patternInstructions', 'TOE', 'yes');
    add_p (`Using Judy's Magic Cast On, CO ${fleegleHeelSock.halfCOsts} sts on each needle, so that you have a total of ${fleegleHeelSock.COsts} sts. <br>`)
    add_p ("Put a st marker to indicate the beg of rnd.");
    add_p ("<b>R1:</b> knit both needles. ");
    add_p ("<b>R2:</b> k1, M1R, knit to last st on needle, M1L, k1 (rep on the 2nd needle) ");
    add_p (`Rep rnds 1 and 2 until there are ${fleegleHeelSock.footSts} sts in total (${fleegleHeelSock.halfFootSts} sts on each needle)`);  
    addH4Title ('#patternInstructions', 'FOOT', 'yes');
    add_p (`Continue knitting in Stockinette St for ${fleegleHeelSock.footBeforeGussetRows} rnds, measuring from the toe cast on to your needles. Aproximately ${fleegleHeelSock.footBeforeGusset_measurement} ${sockObject.measuringSystem}).`);
    add_p (``);
    add_p (``);
    add_p (``);
    add_p (``);
    add_p (``);
    add_p (``);

}