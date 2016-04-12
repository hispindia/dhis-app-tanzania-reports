/**
 * Created by Janaka on 3/2/2015.
 */
var dhisBaseURL = '';
var homeURL2 = new String();

$(document).ready(function(){
    dhisBaseURL=sessionStorage.getItem('dhisBaseURL');
    homeURL2=sessionStorage.getItem('homeURL2');
    var orgUnitCode=sessionStorage.getItem('orgUnitCode');
    var orgUnitName=sessionStorage.getItem('orgUnitName');
    var facilityLevel=sessionStorage.getItem('facilityLevel');
    var facilityType=sessionStorage.getItem('facilityType');
    var scorecardYear=sessionStorage.getItem('scorecardYear');
    var scorecardPeriod=sessionStorage.getItem('scorecardPeriod');
    var selectedQuarter=sessionStorage.getItem('selectedQuarter');
    var orgUnitType='';

    var orgUnitTypeGettingArray =orgUnitName.split("(");
    if(orgUnitTypeGettingArray[0]!=orgUnitName){
        orgUnitType=orgUnitTypeGettingArray[1].substring(0,orgUnitTypeGettingArray[1].length-1);
    }

    var dcName = sessionStorage.getItem('councilName');

    //alert( "DC Name " + dcName );

    $('#orgName').append(orgUnitName);
    $('#orgDC').append(dcName);
    $('#orgType').append(orgUnitType);
    $('#facilityLevel').append(facilityLevel);
    $('#facilityType').append(facilityType);
    $('#yy').append(scorecardYear);
    $('#selectedQuarter').append(selectedQuarter);



    var analyticsURL=dhisBaseURL+'/analytics?' + '&dimension=pe:' + scorecardPeriod+'&filter=ou:'+orgUnitCode;

    //----------------------------table01--------------------------//
/*    getMappedYesNoImages(analyticsURL,'gRNV8R4hmEv','#SF1');
    getMappedYesNoImages(analyticsURL,'wXkXxYGUNZ5','#SF2');
    getMappedYesNoImages(analyticsURL,'LgHfEa5Ng2n','#SF3');
    getMappedYesNoImages(analyticsURL,'IFWS4IG8iwu','#SF4');
    getMappedYesNoImages(analyticsURL,'EP73dzkDDDt','#SF5');
    getMappedYesNoImages(analyticsURL,'Af2BHlkhTQA','#SF6');
    getMappedYesNoImages(analyticsURL,'hXFdcf3n9Gi','#SF7');
    getMappedYesNoImages(analyticsURL,'R93VjYZhRwp','#SF8');
    getMappedYesNoImages(analyticsURL,'Bgy33kEhlkR','#SF9');
    getMappedYesNoImages(analyticsURL,'QMv1TLcEeoD','#SF10');
    getMappedYesNoImages(analyticsURL,'DXhDLU7VaTy','#SF11');
    getMappedYesNoImages(analyticsURL,'VklinlCD7Mo','#SF12');
    getMappedYesNoImages(analyticsURL,'g3qECtWaYBl','#SF13');
    getMappedYesNoImages(analyticsURL,'oa534d9BIB0','#SF14');
*/
    fillTable01(scorecardPeriod,orgUnitCode);

    //----------------------------table02--------------------------//
    //----------------------------table02--------------------------//
    getMappedYesNoImages(analyticsURL,'oXAvPcIZM1N','#A1');
    getMappedYesNoImages(analyticsURL,'UT8EOdbd5Ci','#A2');
    getMappedYesNoImages(analyticsURL,'jnW1fosHFWm','#A3','Y');


    //----------------------------table03--------------------------//
    getMappedYesNoImages(analyticsURL,'aJjilWSMTBr','#A31');
    getMappedYesNoImages(analyticsURL,'OBCjF5HqIEZ','#A32');
    getMappedYesNoImages(analyticsURL,'vMZzI2XzPiz','#A33');
    getMappedYesNoImages(analyticsURL,'vHUx2Y2wUoN','#A34');
    getMappedYesNoImages(analyticsURL,'WfChA42bFC0','#A35');
    getMappedYesNoImages(analyticsURL,'xyCMSsmtPaG','#A36');

    //----------------------------table04--------------------------//
    getMappedYesNoImages(analyticsURL,'F1PyRDkduss','#A22');
    getMappedYesNoImages(analyticsURL,'XbivkiwIoIX','#A23');
    getMappedYesNoImages(analyticsURL,'wW3h4ie7NWq','#A24');
    getMappedYesNoImages(analyticsURL,'DqwsayolNdV','#A25');
    getMappedYesNoImages(analyticsURL,'Em6HKgeq5lN','#A26');
    getMappedYesNoImages(analyticsURL,'wqQlAYV8okN','#A27');
    getMappedYesNoImages(analyticsURL,'B8wttLsWYsO','#A28');
    getMappedYesNoImages(analyticsURL,'zquWAzYv9d7','#A29');
    getMappedYesNoImages(analyticsURL,'RyzNpfU4Fq0','#A30');

    //----------------------------table05--------------------------//
    getMappedYesNoImages(analyticsURL,'HEMI4QXEdsB','#A13');
    getMappedYesNoImages(analyticsURL,'EG4cA9UksBx','#A14');
    getMappedYesNoImages(analyticsURL,'DvXp1f0wEwS','#A15');
    getMappedYesNoImages(analyticsURL,'bRIltUKIzhc','#A16');
    getMappedYesNoImages(analyticsURL,'PDBVemqa9bp','#A17');
    getMappedYesNoImages(analyticsURL,'TCtdHLta9yY','#A18');
    getMappedYesNoImages(analyticsURL,'rqiajgBYVSz','#A19');
    getMappedYesNoImages(analyticsURL,'LTkYlLMnKVW','#A20');
    getMappedYesNoImages(analyticsURL,'XDfxWbuPBRv','#A21');

    //----------------------------table06--------------------------//
    getMappedYesNoImages(analyticsURL,'w2GRkzWIIVW','#A4');
    getMappedYesNoImages(analyticsURL,'gaQFRXJcu9i','#A5');
    getMappedYesNoImages(analyticsURL,'I5NlliYTTEe','#A6');
    getMappedYesNoImages(analyticsURL,'LdtzXrYbwuH','#A7');
    getMappedYesNoImages(analyticsURL,'CJcvNRXF1LQ','#A8');
    getMappedYesNoImages(analyticsURL,'OgbOlRpNWh0','#A9');
    getMappedYesNoImages(analyticsURL,'LB3oozA6mVS','#A10');
    getMappedYesNoImages(analyticsURL,'wxnN0gdlywm','#A11');

    //----------------------------table07--------------------------//
  /*  getMappedValue(analyticsURL,'mCB18eWTud8','#L1');
    getMappedValue(analyticsURL,'kcnQbeHnPhl','#L2');
    getMappedValue(analyticsURL,'wSvIAdaNF4B','#L3');
    getMappedValue(analyticsURL,'jmnMC47nazx','#L4');
    getMappedValue(analyticsURL,'NNm4Wx73KVr','#L5');
    getMappedValue(analyticsURL,'CYowRKIGXUd','#L6');
    getMappedValue(analyticsURL,'Rruco55Q6e2','#L7');
    getMappedValue(analyticsURL,'amcacogaXNU','#L8');
    getMappedValue(analyticsURL,'LaKcrAfBV6K','#L9');
    getMappedValue(analyticsURL,'JcdeMQdl8GH','#L10');
    getMappedValue(analyticsURL,'pZ2EjgZZu6k','#L11');
    getMappedValue(analyticsURL,'rHTIIoryizb','#L12');
    getMappedValue(analyticsURL,'UZP08mcBy63','#L13');
    getMappedValue(analyticsURL,'xGLsQbmXNqg','#L14');

    //----------------------------table08--------------------------//
    getMappedResponse(analyticsURL,'zugp9nc0fdX','#R_1_1');
    getMappedResponse(analyticsURL,'nHmk8g87aHD','#R_1_2');
    getMappedResponse(analyticsURL,'Y1T882EAQJk','#R_1_3');
    getMappedResponse(analyticsURL,'TDDHinL6mZR','#R_1_4');
    getMappedResponse(analyticsURL,'jKAP02xsLIl','#R_2_1');
    getMappedResponse(analyticsURL,'PFm5b8iGmWu','#R_2_2');
    getMappedResponse(analyticsURL,'aYOQM5FgRIZ','#R_3_1');
    getMappedResponse(analyticsURL,'wtJXLmMGEm7','#R_3_2');

*/
    // getMappedYesNoImagesForCombinations(analyticsURL,'wEGqMFKYrk3_&_et4OHJ6uLZ5','#consistently_10');



    //$('#btnPrint').click(function() {
    //    var printContents = document.getElementById('printArea').innerHTML;
    //    var originalContents = document.body.innerHTML;
    //    document.body.innerHTML = printContents;
    //    window.print();
    //    document.body.innerHTML = originalContents;
    //});

});

var getMappedValue=function(analyticsURL,dimension,cellID){
    analyticsURL=analyticsURL+'&dimension=dx:'+dimension;
    var value=0;
    $.ajax({
        url: analyticsURL,
        dataType: "json",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(analyticsURL)
            console.log(response);
            for(var items in response.rows){
                value +=parseInt(response.rows[items][2]);
            }
            console.log('VALUE: '+value);
            $(cellID).append(value);
        }
    });

}

var getMappedResponse=function(analyticsURL,dimension,cellID){
    analyticsURL=analyticsURL+'&dimension=dx:'+dimension;
    var value='';
    $.ajax({
        url: analyticsURL,
        dataType: "json",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(analyticsURL)
            console.log(response);
            for(var items in response.rows){
                value +=response.rows[items][2];
            }
            console.log('VALUE: '+value);
            $(cellID).append(value);
        }
    });

}

var getMappedYesNoImages=function(analyticsURL,dimension,cellID,flipImages){
    analyticsURL=analyticsURL+'&dimension=dx:'+dimension;
    console.log(analyticsURL);
    var answer='';
    var status=false;
    $.ajax({
        url: analyticsURL,
        dataType: "json",
        async:false,
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            for(var items in response.rows){
                answer=response.rows[items][2];
                status=true;
            }
            if(status){

                if((answer=='Y' ||answer=='1')||(answer=='NOA'||answer=='1')) {
                    if(flipImages=='Y'){
                        $(cellID).append('<img src="assets/img/cancel_48.png" width="24px" height="24px">');
                    }
                    else{
                        $(cellID).append('<img src="assets/img/accepted_48.png" width="24px" height="24px">');
                    }

                }
                else if(answer=='N'||answer=='0'){
                    if(flipImages=='Y') {
                        $(cellID).append('<img src="assets/img/accepted_48.png" width="24px" height="24px">');
                    }
                    else{
                        $(cellID).append('<img src="assets/img/cancel_48.png" width="24px" height="24px">');
                    }
                }
                else if(answer=='DN'||answer=='0.01'){
                    $(cellID).append('<img src="assets/img/dn_48.png" width="22px" height="22px">');
                }
            }

        }
    });
}

var getMappedYesNoImagesForCombinations=function(analyticsURL,dimensions,cellID){
    var dimensionsArr=dimensions.split('_&_');
    var answer='';
    var status=false;
    for(var i=0;i<dimensionsArr.length;i++){
        var analyticsURLNew=analyticsURL+'&dimension=dx:'+dimensionsArr[i];
        console.log(analyticsURLNew);
        $.ajax({
            url: analyticsURLNew,
            dataType: "json",
            async:false,
            data: {
                format: "json"
            },
            success: function (response) {
                console.log(response);
                for(var items in response.rows){
                    if(response.rows[items][2]=='Y'||response.rows[items][2]=='1'){
                        answer=response.rows[items][2];
                        status=true;
                    }

                }
            }
        });
    }
    if(status){
        if(answer=='Y'||answer=='1') {
            $(cellID).append('<img src="assets/img/accepted_48.png" width="24px" height="24px">');
        }
        else {
            $(cellID).append('<img src="assets/img/cancel_48.png" width="24px" height="24px">');
        }
    }
}

var getMappedDEValueReturn = function( analyticsURL, filters)
{
    var value = new Number(0);

    if(filters != null)
    {
        analyticsURL = analyticsURL + filters;
    }

    analyticsURL = analyticsURL;

    console.log(analyticsURL);

    $.ajax({
        url: analyticsURL,
        dataType: "json",
        async:false,
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(response);
            for(var items in response.rows){
                value +=parseInt(response.rows[items][2]);
            }
            console.log(analyticsURL);
            console.log('VALUE: '+value);
        }

    });
    return value;
}

var getMappedFormulaValue = function (analyticsURL, formula, cellID) {

    var re = /\+|\-|\*|\//;
    var DXFilterArray = formula.split(re);
    console.log("O: " +  DXFilterArray);
    for(var item in  DXFilterArray)
    {
        var formulaItem =  DXFilterArray[item];
        if(isNaN(formulaItem))
        {
            formulaItem = formulaItem.replace('[','');
            formulaItem = formulaItem.replace(']','');
            formulaItem = formulaItem.replace('(','');
            formulaItem = formulaItem.replace(')','');
            var categoryFilters = formulaItem;

            formula = formula.replace(formulaItem,getMappedDEValueReturn(analyticsURL,categoryFilters));
            console.log("FF: "+formula);
        }
        formula = formula.replace('[','(');
        formula = formula.replace(']',')');
    }
    var finalVal=eval(formula);
    $(cellID).append(finalVal);
}

var fillTable01=function(scorecardPeriod,orgUnitCode){
    var dataSetURL=dhisBaseURL+'/dataValueSets.json?dataSet=Z5O2GMkWTw5&period='+scorecardPeriod+'&orgUnit='+orgUnitCode;
    $.ajax({
        url: dataSetURL,
        dataType: "json",
        data: {
            format: "json"
        },
        success: function (response) {
            console.log(dataSetURL)
            console.log(response);
            /** @namespace response.dataValues */
            for(var i=0;i<response.dataValues.length;i++){
                /** @namespace response.dataValues.dataElement */
                /** @namespace response.dataValues.categoryOptionCombo */
                /** @namespace response.dataValues.value */
                //console.log(response.dataValues[i].dataElement);
                if(response.dataValues[i].dataElement=='k8XNOyS3HVQ'){
                    //SF1
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF1_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF1_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF1_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF1_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF1_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF1_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF1_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF1_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF1_9',response.dataValues[i].value);
                    }

                }
                if(response.dataValues[i].dataElement=='kupRao4A6d8'){
                    //SF2
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF2_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF2_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF2_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF2_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF2_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF2_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF2_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF2_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF2_9',response.dataValues[i].value);
                    }

                }
                if(response.dataValues[i].dataElement=='dpqUSrzzSxZ'){
                    //SF3
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF3_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF3_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF3_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF3_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF3_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF3_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF3_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF3_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF3_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='u3v7YNC05JV'){
                    //SF4
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF4_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF4_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF4_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF4_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF4_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF4_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF4_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF4_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF4_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='Z8sHfQ9AxQu'){
                    //SF5
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF5_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF5_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF5_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF5_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF5_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF5_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF5_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF5_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF5_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='bLFouVSiz52'){
                    //SF6
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF6_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF6_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF6_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF6_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF6_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF6_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF6_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF6_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF6_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='iQcIuEReQ2J'){
                    //SF7
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF7_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF7_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF7_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF7_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF7_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF7_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF7_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF7_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF7_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='zcfKLO4WVtJ'){
                    //SF8
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF8_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF8_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF8_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF8_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF8_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF8_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF8_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF8_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF8_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='hTFFXLeaslb'){
                    //SF9
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF9_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF9_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF9_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF9_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF9_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF9_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF9_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF9_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF9_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='J1NPoUOUhCm'){
                    //SF10
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF10_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF10_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF10_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF10_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF10_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF10_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF10_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF10_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF10_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='EIIzST83MpP'){
                    //SF11
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF11_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF11_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF11_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF11_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF11_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF11_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF11_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF11_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF11_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='i9lMz1Rqv0D'){
                    //SF12
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF12_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF12_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF12_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF12_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF12_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF12_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF12_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF12_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF12_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='xnQ3fxObMKG'){
                    //SF13
                    if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF13_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF13_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF13_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF13_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF13_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF13_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF13_7',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                        //8
                        appendImageToPart2('#SF13_8',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                        //9
                        appendImageToPart2('#SF13_9',response.dataValues[i].value);
                    }
                }
                if(response.dataValues[i].dataElement=='DMYfYBbw3RX'){
                    //SF14
                        if(response.dataValues[i].categoryOptionCombo=='lWhGoNCiuVF'){
                        //1
                        appendImageToPart2('#SF14_1',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='ap4rdB8OzAq'){
                        //2
                        appendImageToPart2('#SF14_2',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='MrfL5A5ajwF'){
                        //3
                        appendImageToPart2('#SF14_3',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='pVxB2OBEN1u'){
                        //4
                        appendImageToPart2('#SF14_4',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='XHHE71O6wTx'){
                        //5
                        appendImageToPart2('#SF14_5',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='d3fKJ1o6Jvl'){
                        //6
                        appendImageToPart2('#SF14_6',response.dataValues[i].value);
                    }
                    if(response.dataValues[i].categoryOptionCombo=='VypPDZJV0qA'){
                        //7
                        appendImageToPart2('#SF14_7',response.dataValues[i].value);
                    }
                    /*     if(response.dataValues[i].categoryOptionCombo=='drTWtqlAqaC'){
                     //8
                     appendImageToPart2('#SF14_8',response.dataValues[i].value);
                     }
                     if(response.dataValues[i].categoryOptionCombo=='jgn29xwLC0p'){
                     //9
                     appendImageToPart2('#SF14_9',response.dataValues[i].value);
                     }*/
                }

            }
        }
    });
}

var appendImageToPart2=function(cellID,value){
    if(value=='true'||value=='T'||value=='1'){
        $(cellID).append('<img src="assets/img/cancel_48.png" width="24px" height="24px">');
    }

}

// return to dashBoard
function goToDashBoardFromScoreCard()
{
    homeURL2 = sessionStorage.getItem('homeURL2');
    console.log( homeURL2);
    //alert(homeURL2);
    document.getElementById('scoreCardDashBoardURL').href = homeURL2;
}