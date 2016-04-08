/**
 * Created by gaurav on 18/9/14.
 */

if (!jQuery) {
    throw new Error("Bootstrap requires jQuery");
}

var baseURL = new String();
var homeURL = new String();

var orgUnitCodeList = new Array();

var orgUnitIDList = new Array();

var commCareFacilityList = new Array();
var orgUnitCodeToIdMapping = [];
var unMappedOrgUnitList = [];

var numOfFormsImported = 0;

var dataFormName = 'Complete a data collection';

var addOrgUnitToDHIS = function(orgUnitCode)
{
    var jsonOrgUnitObject = '{'
        + '"name":"'+orgUnitCode+'",'
        + '"code": "'+orgUnitCode+'",'
        + '"shortName": "'+orgUnitCode+'",'
        + '"openingDate": "'+moment().format('YYYYMMDD')+'"'
        + '}';

    var dataElementURL = baseURL+"/organisationUnits";

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        async: false,
        data: jsonOrgUnitObject,
        url: dataElementURL,
        success: function (response) {
            console.log('OrgUnit Import response: '+response.status)
        },
        error: function (request, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};


var syncOrgUnits = function(formData){

    $('#getFormAlertDiv').hide();
    $('#waitAlertDiv').show();

    var orgUnitUpdateCount = 0;

    var totalFormCount = 0;

    fetchDHISOrgUnitList();

   // console.log('Pre-OU Code List: '+orgUnitCodeList);
   // console.log('Pre-OU ID List: '+orgUnitIDList);

    for(var item in formData.objects)
    {
        /** @namespace formData.objects */
        if(formData.objects[item].form['@name']==dataFormName)
        {

            ++totalFormCount;
            var facility_name = formData.objects[item].form.OptionsID;
            if(_.indexOf(commCareFacilityList,facility_name,false) == -1) {
                commCareFacilityList.push(facility_name);
            }

        }
    }

    console.log('No. of total forms: '+totalFormCount);

    for(var orgUnit in commCareFacilityList)
    {
        if(_.indexOf(orgUnitCodeList,commCareFacilityList[orgUnit],false) == -1)
        {
            ++orgUnitUpdateCount;
            addOrgUnitToDHIS(commCareFacilityList[orgUnit]);
        }
    }

    if(orgUnitUpdateCount>0)
    {
        $('#alertContent').append(orgUnitUpdateCount + " new facilities found, please review after import.");
    }
    else
    {
        $('#alertContent').append("No new facilities updates found.");
    }

    $('#alertDiv').show();

    fetchDHISOrgUnitList();

   // console.log('Post-OU Code List: '+orgUnitCodeList);
  //  console.log('Post-OU ID List: '+orgUnitIDList);

    $('#importAlertContent').append('Data import started. Please wait, this might take a while.');
    $('#importAlertContent').show();

    readCommCareForm(formData);
};


var readCommCareForm = function (formData) {

    //------CommCare form parsing code---------//

    console.log('No. of Facilities: '+commCareFacilityList.length+"["+commCareFacilityList+"]");

    var attributeComboMap = new Map();

    //-------Set attribute id map-----------//

    attributeComboMap.set("1","Vb6FbQ3BvE7");
    attributeComboMap.set("2","IiCwn3H09ny");
    attributeComboMap.set("3","tUBGtlx6SZP");
    attributeComboMap.set("4","sc3VO0NogbU");
    attributeComboMap.set("5","OJN7bHx50Mu");
    attributeComboMap.set("6","Se0ltKvmQWJ");
    attributeComboMap.set("7","ui4wHqg9IT6");
    attributeComboMap.set("8","D2gEO5bwyFB");
    attributeComboMap.set("9","vpZ5u7mg6fb");
    attributeComboMap.set("10","N2qJXlKqGnw");


    for(var item in formData.objects)
    {
        var commCareValueMap = new Map();
        var received_on = new String();
        var orgUnitID = new String();

        /** @namespace formData.objects */
        if(formData.objects[item].form['@name']==dataFormName )
        {
           //if(typeof formData.objects[item].form.Gp_Admin.RoundNo !== 'undefined')
           //{

               var facility_optionsId = formData.objects[item].form.OptionsID;
            var facility_name = facility_optionsId;
               /** @namespace formData.objects[item].received_on */
               received_on = formData.objects[item].received_on;

               var periodString = moment(received_on).format('YYYY') + 'Q' + moment(received_on).format('Q');

               if(_.indexOf(orgUnitCodeList,facility_name,false) != -1) {
                   orgUnitID = orgUnitIDList[_.indexOf(orgUnitCodeList,facility_name,false)];
               }

            //Importing filter dimension org unit
                if (orgUnitCodeToIdMapping[facility_optionsId] != undefined){
                    orgUnitID = orgUnitCodeToIdMapping[facility_optionsId];
                } else {
                    unMappedOrgUnitList.push(facility_name);

                }

               //-----------------Data-Element Maps-----------------//

               //-------------- /Gp_QoC/ ----------------//
               commCareValueMap.set('zugp9nc0fdX',formData.objects[item].form.Gp_QoC.QA1);
               commCareValueMap.set('nHmk8g87aHD',formData.objects[item].form.Gp_QoC.QA2);
               commCareValueMap.set('Y1T882EAQJk',formData.objects[item].form.Gp_QoC.QA3);
               commCareValueMap.set('TDDHinL6mZR',formData.objects[item].form.Gp_QoC.QA4);
               commCareValueMap.set('jKAP02xsLIl',formData.objects[item].form.Gp_QoC.QC1);
               commCareValueMap.set('PFm5b8iGmWu',formData.objects[item].form.Gp_QoC.QC2);
               commCareValueMap.set('aYOQM5FgRIZ',formData.objects[item].form.Gp_QoC.QI1);
               commCareValueMap.set('wtJXLmMGEm7',formData.objects[item].form.Gp_QoC.QI2);

               //-------------- /Gp_SOR_Admit/ ----------------//
               commCareValueMap.set('XNV6X8j6H7X',formData.objects[item].form.Gp_SOR_Admit.A1_lab_ward_open);
               commCareValueMap.set('qCuqJtq1PVl',formData.objects[item].form.Gp_SOR_Admit.A2_labour_ward_admitted);
               commCareValueMap.set('Jbysoy31EAB',formData.objects[item].form.Gp_SOR_Admit["A3_referred_elsewhere_yes-bad"]);

               //-------------- /Gp_SOR_Staff/ ----------------//
               commCareValueMap.set('gV7Nat1PJjl',formData.objects[item].form.Gp_SOR_Staff.S4_assist_routine);
               commCareValueMap.set('ZsMGAcnsoy1',formData.objects[item].form.Gp_SOR_Staff.S5_assist_vaginal);
               commCareValueMap.set('D0ch3nZo8f8',formData.objects[item].form.Gp_SOR_Staff.S6_A3_manual_placenta);
               commCareValueMap.set('BYHrQx3uAct',formData.objects[item].form.Gp_SOR_Staff.S7_MVA);
               commCareValueMap.set('grkq7QH1q8v',formData.objects[item].form.Gp_SOR_Staff.S8_newbon_resus);
               commCareValueMap.set('vsnjDw0hGrC',formData.objects[item].form.Gp_SOR_Staff.S9_caesarean);
               commCareValueMap.set('sgv0STHj5Xm',formData.objects[item].form.Gp_SOR_Staff.S10_anaesthesia);
               commCareValueMap.set('cKfUj9wZGrn',formData.objects[item].form.Gp_SOR_Staff.S11_lab_tech);
               commCareValueMap.set('WoJlrC1wWlM',formData.objects[item].form.Gp_SOR_Staff.S13_blood_staff);

               //-------------- /Gp_SOR_Drugs/ ----------------//
               commCareValueMap.set('qlDdyWhcace',formData.objects[item].form.Gp_SOR_Drugs.D12_ParOx);
               commCareValueMap.set('AflI0uxUmwb',formData.objects[item].form.Gp_SOR_Drugs.D13_Mag_Sul);
               commCareValueMap.set('dy2JggDmzvA',formData.objects[item].form.Gp_SOR_Drugs.D14_Inj_amp);
               commCareValueMap.set('foKWHZVpaij',formData.objects[item].form.Gp_SOR_Drugs.D15_Misoprostol);
               commCareValueMap.set('tBkXt2wfqkx',formData.objects[item].form.Gp_SOR_Drugs.D16_gentamycin);
               commCareValueMap.set('PuEZkR8rWKG',formData.objects[item].form.Gp_SOR_Drugs.D17_Ceph);
               commCareValueMap.set('pwZfrlXXPgt',formData.objects[item].form.Gp_SOR_Drugs.D18_Metro);
               commCareValueMap.set('e3UYcBqvsWh',formData.objects[item].form.Gp_SOR_Drugs.D19_Spinal_an);
               commCareValueMap.set('W9Bwsf9QG5o',formData.objects[item].form.Gp_SOR_Drugs.D20_General_an);

               //-------------- /Gp_SOR_Equip/ ----------------//
               commCareValueMap.set('tVRum8os2RW',formData.objects[item].form.Gp_SOR_Equip.E21_syr_needle);
               commCareValueMap.set('WcpHZmUHzgF',formData.objects[item].form.Gp_SOR_Equip.E22_IC_can);
               commCareValueMap.set('kXnPfG8cmDF',formData.objects[item].form.Gp_SOR_Equip.E23_gloves);
               commCareValueMap.set('IrBLKuU5paj',formData.objects[item].form.Gp_SOR_Equip.E24_Del_kit);
               commCareValueMap.set('wB71TA0O9n2',formData.objects[item].form.Gp_SOR_Equip.E25_MVA_kit);
               commCareValueMap.set('NdHZx5tMbK7',formData.objects[item].form.Gp_SOR_Equip.E26_DC_kit);
               commCareValueMap.set('TLckhq3GveP',formData.objects[item].form.Gp_SOR_Equip.E27_MVE);
               commCareValueMap.set('L54RMqM5Gaw',formData.objects[item].form.Gp_SOR_Equip.E28_Amb_bag);
               commCareValueMap.set('SJSnxFm2CKS',formData.objects[item].form.Gp_SOR_Equip.E29_butf_nedle);

               //-------------- /Gp_SOR_Other/ ----------------//
               commCareValueMap.set('wEGqMFKYrk3',formData.objects[item].form.Gp_SOR_Other.O30_blood_fridge_pow);
               commCareValueMap.set('et4OHJ6uLZ5',formData.objects[item].form.Gp_SOR_Other.O31_blood_stored);
               commCareValueMap.set('OflOeEYQzNk',formData.objects[item].form.Gp_SOR_Other.O32_adeq_beds);
               commCareValueMap.set('H3XvyqbJyzr',formData.objects[item].form.Gp_SOR_Other.O33_toliet);
               commCareValueMap.set('pDeUyTO4eHi',formData.objects[item].form.Gp_SOR_Other.O34_sink);
               commCareValueMap.set('gxMZx4a40cu',formData.objects[item].form.Gp_SOR_Other.O35_Electric);
               commCareValueMap.set('bAAiiTlBvXa',formData.objects[item].form.Gp_SOR_Other.O36_Placenta_pit);

               //-------------- /Gp_SFs/ ----------------//
               commCareValueMap.set('gRNV8R4hmEv',formData.objects[item].form.Gp_SFs.SF1);
               commCareValueMap.set('QCC4S6KxnYb.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('QCC4S6KxnYb.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW1);
               commCareValueMap.set('rFEs2SfgaOx',formData.objects[item].form.Gp_SFs.SFO1);

               commCareValueMap.set('wXkXxYGUNZ5',formData.objects[item].form.Gp_SFs.SF2);
               commCareValueMap.set('yScg2fh1OeM.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('yScg2fh1OeM.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW2);
               commCareValueMap.set('LADwd4zPugR',formData.objects[item].form.Gp_SFs.SFO2);

               commCareValueMap.set('LgHfEa5Ng2n',formData.objects[item].form.Gp_SFs.SF3);
               commCareValueMap.set('z7nglKoPBvC.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('z7nglKoPBvC.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW3);
               commCareValueMap.set('fz8lI4pMP6K',formData.objects[item].form.Gp_SFs.SFO3);

               commCareValueMap.set('IFWS4IG8iwu',formData.objects[item].form.Gp_SFs.SF4);
               commCareValueMap.set('inPkXBF5H15.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('inPkXBF5H15.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW4);
               commCareValueMap.set('NQ56KptXZ7u',formData.objects[item].form.Gp_SFs.SFO4);

               commCareValueMap.set('EP73dzkDDDt',formData.objects[item].form.Gp_SFs.SF5);
               commCareValueMap.set('LXJh13BPIa1.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('LXJh13BPIa1.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW5);
               commCareValueMap.set('OOKgqaGdqy6',formData.objects[item].form.Gp_SFs.SFO5);

               commCareValueMap.set('Af2BHlkhTQA',formData.objects[item].form.Gp_SFs.SF6);
               commCareValueMap.set('rNKEOo43aCW.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('rNKEOo43aCW.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW6);
               commCareValueMap.set('GrKGQTx4Qn2',formData.objects[item].form.Gp_SFs.SFO6);

               commCareValueMap.set('hXFdcf3n9Gi',formData.objects[item].form.Gp_SFs.SF7);
               commCareValueMap.set('feiLAUvVICT.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('feiLAUvVICT.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW7);
               commCareValueMap.set('OdUYv018Dli',formData.objects[item].form.Gp_SFs.SFO7);

               commCareValueMap.set('R93VjYZhRwp',formData.objects[item].form.Gp_SFs.SF8);
               commCareValueMap.set('I5BdJkpqdKa.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('I5BdJkpqdKa.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW8);
               commCareValueMap.set('iCRKZGs0ITY',formData.objects[item].form.Gp_SFs.SFO8);

               commCareValueMap.set('Bgy33kEhlkR',formData.objects[item].form.Gp_SFs.SF9);
               commCareValueMap.set('tNKFbznJNOX.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('tNKFbznJNOX.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW9);
               commCareValueMap.set('OudgvmAiZ1f',formData.objects[item].form.Gp_SFs.SFO9);

               commCareValueMap.set('QMv1TLcEeoD',formData.objects[item].form.Gp_SFs.SF10);
               commCareValueMap.set('MBC7HfzLUOF.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('MBC7HfzLUOF.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW10);
               commCareValueMap.set('UNlELqo1qRS',formData.objects[item].form.Gp_SFs.SFO10);

               commCareValueMap.set('DXhDLU7VaTy',formData.objects[item].form.Gp_SFs.SF11);
               commCareValueMap.set('DNGZ5wwTXA3.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('DNGZ5wwTXA3.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW11);
               commCareValueMap.set('JTdhsYY7AIc',formData.objects[item].form.Gp_SFs.SFO11);

               commCareValueMap.set('VklinlCD7Mo',formData.objects[item].form.Gp_SFs.SF12);
               commCareValueMap.set('tE4myWDf1r1.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('tE4myWDf1r1.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW12);
               commCareValueMap.set('l2e3cVV8P77',formData.objects[item].form.Gp_SFs.SFO12);

               commCareValueMap.set('g3qECtWaYBl',formData.objects[item].form.Gp_SFs.SF13);
               commCareValueMap.set('TLsv1ekMJx3.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('TLsv1ekMJx3.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW13);
               commCareValueMap.set('X8GBXbgdK1s',formData.objects[item].form.Gp_SFs.SFO13);

               commCareValueMap.set('oa534d9BIB0',formData.objects[item].form.Gp_SFs.SF14);
               commCareValueMap.set('WN98nXqKl1G.jp72QGRdpw5',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.WwC3AyjphJp',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.GMwD9XBnev0',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.dvpTsMaAeH4',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.QL7xqNDNEcy',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.oBy3616jbBN',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.RTCnejeyKo6',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.drTWtqlAqaC',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('WN98nXqKl1G.jgn29xwLC0p',formData.objects[item].form.Gp_SFs.SFW14);
               commCareValueMap.set('cfrKro5mUeT',formData.objects[item].form.Gp_SFs.SFO14);

               //-------------- /Gp_outcomes/ ----------------//
               commCareValueMap.set('mCB18eWTud8',formData.objects[item].form.Gp_outcomes.C1);
               commCareValueMap.set('gPiQKKplnM0',formData.objects[item].form.Gp_outcomes.O1_blank);
               commCareValueMap.set('kcnQbeHnPhl',formData.objects[item].form.Gp_outcomes.C2);
               commCareValueMap.set('xkjuxy2chky',formData.objects[item].form.Gp_outcomes.O2_blank);
               commCareValueMap.set('wSvIAdaNF4B',formData.objects[item].form.Gp_outcomes.C3);
               commCareValueMap.set('qYxmT6UT5XJ',formData.objects[item].form.Gp_outcomes.O3_blank);
               commCareValueMap.set('jmnMC47nazx',formData.objects[item].form.Gp_outcomes.C4);
               commCareValueMap.set('YfCeFf1OgeA',formData.objects[item].form.Gp_outcomes.O4_blank);
               commCareValueMap.set('NNm4Wx73KVr',formData.objects[item].form.Gp_outcomes.C5);
               commCareValueMap.set('ZzDhBX21K1i',formData.objects[item].form.Gp_outcomes.O5_blank);
               commCareValueMap.set('CYowRKIGXUd',formData.objects[item].form.Gp_outcomes.C6);
               commCareValueMap.set('pk8JAamA1F6',formData.objects[item].form.Gp_outcomes.O6_blank);
               commCareValueMap.set('Rruco55Q6e2',formData.objects[item].form.Gp_outcomes.C8);
               commCareValueMap.set('PEs0oe7wLvs',formData.objects[item].form.Gp_outcomes.O8_blank);
               commCareValueMap.set('amcacogaXNU',formData.objects[item].form.Gp_outcomes.C9);
               commCareValueMap.set('YqSvdZSV71Y',formData.objects[item].form.Gp_outcomes.O9_blank);
               commCareValueMap.set('LaKcrAfBV6K',formData.objects[item].form.Gp_outcomes.C10);
               commCareValueMap.set('Fz8Y1S4Avlq',formData.objects[item].form.Gp_outcomes.O10_blank);
               commCareValueMap.set('JcdeMQdl8GH',formData.objects[item].form.Gp_outcomes.C11);
               commCareValueMap.set('fT0Oqo2wJHA',formData.objects[item].form.Gp_outcomes.O11_blank);
               commCareValueMap.set('pZ2EjgZZu6k',formData.objects[item].form.Gp_outcomes.C13);
               commCareValueMap.set('KCK0opC0KKK',formData.objects[item].form.Gp_outcomes.O13_blank);
               commCareValueMap.set('rHTIIoryizb',formData.objects[item].form.Gp_outcomes.C14);
               commCareValueMap.set('uNLS2Juyzpj',formData.objects[item].form.Gp_outcomes.O14_blank);
               commCareValueMap.set('UZP08mcBy63',formData.objects[item].form.Gp_outcomes.C15);
               commCareValueMap.set('i6sx9j6Sywb',formData.objects[item].form.Gp_outcomes.O15_blank);
               commCareValueMap.set('xGLsQbmXNqg',formData.objects[item].form.Gp_outcomes.Other_Issues);

               //-------------- /Gp_Admin/ ----------------//
               commCareValueMap.set('zmTu3srM43Y',formData.objects[item].form.Gp_Admin.Resp);
               commCareValueMap.set('O3nkGeC6uNm',formData.objects[item].form.Gp_Admin.Resp_No);
               commCareValueMap.set('SA8MHKq5UMP',formData.objects[item].form.Gp_Admin.RoundNo);

               //---------------------------------------------------//

               var dataValueList = "{"
                   +'"dataValues": [';

               var count = 0;
               //  console.log(count);

               commCareValueMap.forEach(function(value, key) {
                   ++count;
                   //   console.log("COUNT :"+count);
                   //   console.log("SIZE :"+commCareValueMap.size)
                   if(key != undefined)
                   {

                       if(key.indexOf('.') != -1){

                           if(value >= 1 && value <= 8 || value == -9){
                               value = "true";
                           }

                           var deCateComboId = key.split('.');
                           var deId  = deCateComboId[0];
                           var categoryComboId = deCateComboId[1];
                           dataValueList = dataValueList.concat('{"dataElement": "'+deId+'", "categoryOptionCombo": "'+categoryComboId+'", "period": "'+periodString+'", '+'"orgUnit": "'+orgUnitID+'" ,"value": "'+value+'"}');
                       }
                       else
                       {
                           dataValueList = dataValueList.concat('{"dataElement": "'+key+'","period": "'+periodString+'", '+'"orgUnit": "'+orgUnitID+'" ,"value": "'+value+'"}');
                       }
                   }

                   if(count<commCareValueMap.size)
                   {
                       dataValueList = dataValueList.concat(",");
                   }
               }, commCareValueMap);

               dataValueList = dataValueList.concat("]"
                   +"}"
               );

               console.log("DVS: "+dataValueList);

               var dataValueURL = baseURL+"/dataValueSets";

               $.ajax({
                   type: "POST",
                   dataType: "json",
                   contentType: "application/json",
                   async: false,
                   data: dataValueList,
                   url: dataValueURL,
                   success: function (response) {
                       console.log('Data-value Import response: '+response.status);
                       ++numOfFormsImported;
                   },
                   error: function (request, textStatus, errorThrown) {
                       console.log(textStatus);
                       console.log(errorThrown);
                   }
               });

           //}

        }
    }

    $('#importAlertDiv').hide();
    $('#importAlertContent').empty();
    $('#importAlertContent').append('Data import complete, total '+numOfFormsImported+' forms imported. Thanks for your patience.');
    $('#importAlertDiv').show();
    $('#linkDiv').show();

    //------------------------------------------------------------------//

};



var fetchDHISOrgUnitList = function () {

    var dhisOrgUnitURL = baseURL+"/organisationUnits.jsonp?paging=false&fields=code,id,name";

    $.ajax({
        type: "GET",
        dataType: "jsonp",
        contentType: "application/json",
        async: false,
        url: dhisOrgUnitURL,
        success: function (data) {

            var orgUnitList = data["organisationUnits"];

            for (var item in orgUnitList) {
                orgUnitCodeToIdMapping[orgUnitList[item].code] = orgUnitList[item].id;

                if (orgUnitList[item].code != null)
                {
                    orgUnitCodeList.push(String(orgUnitList[item].code));
                }
                else
                {
                    orgUnitCodeList.push("NULL");
                }
                orgUnitIDList.push(String(orgUnitList[item].id));
            }
        }
    });

};

var getCommCareFormData = function(commCareFormURL, commCareUserID, commCarePassword, startDate, endDate){

    commCareFormURL = commCareFormURL +"&"+'received_on_start='+startDate+"&"+'received_on_end='+endDate;

    $.ajax({
        type: "GET",
        url: commCareFormURL,
        async: false,
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        headers: {
            "Authorization": "Basic " + btoa(commCareUserID + ":" + commCarePassword)
        },
        success: function (jsonData) {

            console.log(jsonData);

            syncOrgUnits(jsonData);

        },
        error: function (request, textStatus, errorThrown) {
            console.log(request.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        }

    });
};

$(document).ready(function () {

    var startDate = '';
    var endDate = '';

    var commCareFormURL = "https://www.commcarehq.org/a/tanzania/api/v0.4/form/?limit=1000"; //?received_on_start="+startDate+"received_on_end="+endDate;
    var commCareUserID = "harsh.atal@gmail.com";
    var commCarePassword = "Hisp123";

    $('#startDate').datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $('#endDate').datepicker({
        autoclose: true,
        todayHighlight: true
    });

    $("#endDate").datepicker("setDate", new Date());


    $.ajaxSetup({
        async: false
    });

    jQuery.getJSON("manifest.webapp", function (json) {

        homeURL = json.activities.dhis.href;

        baseURL = json.activities.dhis.href + "/api";
        console.log('base API URL ' + baseURL);
        console.log('base Home URL ' + homeURL);
    });

    $.ajaxSetup({
        async: true
    });

    $('#startDate').datepicker();
    $('#endDate').datepicker();

    $('#btn-import').click(function () {
        if($('#startDate').val()!="" && $('#endDate').val()!="")
        {
            var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
            var todayDate = new Date(moment(new Date()).format('YYYY-MM-DD'));
            var selStartDate = new Date(moment($('#startDate').val()).format('YYYY-MM-DD'));
            var selEndDate = new Date(moment($('#endDate').val()).format('YYYY-MM-DD'));

            var firstDiffDays = Math.abs((selStartDate.getTime() - todayDate.getTime())/(oneDay));
            var secondDiffDays = Math.abs((selEndDate.getTime() - todayDate.getTime())/(oneDay));

            if( selStartDate > todayDate )
            {
                //alert(" start date greater than today date" );
                $('#selectPeriodAlert').hide();
                $('#selectEndDateAlert').show();
            }

            else if( selEndDate > todayDate )
            {
                //alert(" end date greater than today date" );
                $('#selectPeriodAlert').hide();
                $('#selectEndDateAlert').show();
            }
            else
            {
                console.log('SD: ' + moment($('#startDate').val()).format('YYYY-MM-DD') + " to " + 'ED: ' + moment($('#endDate').val()).format('YYYY-MM-DD'));
                $('#selectEndDateAlert').hide();
                $('#selectPeriodAlert').hide();

                getCommCareFormData(commCareFormURL, commCareUserID, commCarePassword, moment($('#startDate').val()).format('YYYY-MM-DD'), moment($('#endDate').val()).format('YYYY-MM-DD'));
            }
        }
        else
        {
            $('#selectPeriodAlert').show();
            $('#selectEndDateAlert').hide();
        }
    });

});


