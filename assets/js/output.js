/**
 * Created by Janaka on 2/25/2015.
 */

var facilityLevel='';
var facilityType='';
var dhisBaseURL = new String();
var homeURL = new String();
$(document).ready(function () {

    var loadForm = function(){

        selectedReportType = $('#reportSelect option:selected').val();

        console.log('Selected report type: '+selectedReportType);

        if(selectedReportType === 'districtScoreCard')
        {
            $('#districtReport').show();
            $('#facilityReport').hide();
        }
        else if(selectedReportType === 'facilityScoreCard')
        {
            $('#districtReport').hide();
            $('#facilityReport').show();
        }
        else
        {
            $('#districtReport').hide();
            $('#facilityReport').hide();
        }
    };

    $('#reportSelect').selectpicker('refresh');

    loadForm();

    //-------------Facility ScoreCard Parameters------------//

    $('#facilityCouncilSelect').selectpicker('refresh');
    $('#facilitySelect').selectpicker('refresh');
    $('#startQuarterSelect').selectpicker('refresh');
    $('#startYearPicker').datetimepicker({
        pickTime: false,
        format: "YYYY",
        viewMode: "years",
        minViewMode: "years",
        defaultDate: new Date()
    });

    $('#endQuarterSelect').selectpicker('refresh');
    $('#endYearPicker').datetimepicker({
        pickTime: false,
        format: "YYYY",
        viewMode: "years",
        minViewMode: "years",
        defaultDate: new Date()
    });

    //-------------District ScoreCard Parameters------------//

    $('#councilSelect').selectpicker('refresh');
    $('#yearPicker').datetimepicker({
        pickTime: false,
        format: "YYYY",
        viewMode: "years",
        minViewMode: "years",
        defaultDate: new Date()
    });
    $('#quarterSelect').selectpicker('refresh');


    $.ajaxSetup({
        async: false
    });

    jQuery.getJSON("manifest.webapp", function (json) {
        console.log(json.toString());
        dhisBaseURL = json.activities.dhis.href + "/api";
        homeURL = json.activities.dhis.href;
        console.log(json.activities.dhis.href + "/api");
    });

    $.ajaxSetup({
        async: true
    });

    //dhisBaseURL='http://178.79.144.205:29092/quic/api';
    //homeURL='http://178.79.144.205:29092/quic';
    $('#facilitySelect').selectpicker('refresh');
    $('#councilSelect').selectpicker('refresh');
    $('#selectedQuarter').selectpicker('refresh');

    //$.ajax({
    //    url: dhisBaseURL+"/categories/rqqGB5csk0t.jsonp?paging=false",
    //    dataType: "jsonp",
    //    data: {
    //        format: "json"
    //    },
    //    success: function (response) {
    //        /** @namespace response.categoryOptions */
    //
    //        for (var item in response.categoryOptions) {
    //            $('#roundSelect')
    //                .append('<option id=\'' + response.categoryOptions[item].id + '\' value=\'' + response.categoryOptions[item].id + '\'>' + response.categoryOptions[item].name + '</option>');
    //        }
    //        $('#roundSelect').selectpicker('refresh');
    //    }
    //
    //
    //});
    $.ajax({
        url: dhisBaseURL+"/organisationUnits/B5tjww4qchx.json?paging=false&includeDescendants=true&fields=id,name,level",
        data: {
            format: "json"
        },
        success: function (response) {
            /** @namespace response.organisationUnits */
            for (var item in response.organisationUnits) {
                var response2 = response.organisationUnits[item];

                        /** @namespace response2.level */
                        var lvl=response2.level;

                        if(lvl=='3'){
                            $('#councilSelect').append('<option id=\'' + response2.id + '\' value=\'' + response2.id + '\'>' + response2.name + '</option>');
                        }
                        $('#councilSelect').selectpicker('refresh');
                    }
        }
    });

   // $('#councilSelect option').eq('nPpOwbeLMeI').prop('selected', true);

    $('#councilSelect').change(function () {
        document.getElementById('msgs').innerHTML='';
        var selectedCouncil=document.getElementById('councilSelect').value;
        var y = document.getElementById("facilitySelect");
        var x = document.getElementById("facilitySelect").length;
        for(var i=0;i<x;i++){
            y.remove(y);
        }
        $('#facilitySelect').append('<option value="">Select Facility</option>');

        if(selectedCouncil!=''){
            $.ajax({
                url: dhisBaseURL+"/organisationUnits/"+selectedCouncil+".jsonp?paging=false",
                dataType: "jsonp",
                data: {
                    format: "json"
                },
                success: function (response2) {
                     for(var i=0;i<response2.children.length;i++) {
                        console.log(response2.children[i].id);
                        $('#facilitySelect').append('<option id=\'' + response2.children[i].id + '\' value=\'' + response2.children[i].id + '\'>' + response2.children[i].name + '</option>');
                    }
                    $('#facilitySelect').selectpicker('refresh');
                }
            });
        }
        else{
            $('#facilitySelect').selectpicker('refresh');

        }
    });
    //noinspection JSUnresolvedFunction
    $('#yearPicker').datetimepicker({
        pickTime: false,
        format: "YYYY",
        viewMode: "years",
        minViewMode: "years",
        defaultDate: new Date()
    });

    $('#genButton').click(function () {
        var selectedCouncil=$('#councilSelect option:selected').text();
        var selectedFacility = $('#facilitySelect option:selected').text();
        var orgUnitCode;
        var orgUnitName;
        //var scorecardPeriod = moment($('#year').val()).format('YYYY');
        var scorecardPeriod = moment($('#startYear').val()).format('YYYY');
        //var scorecardYear=moment($('#year').val()).format("YYYY");
        var scorecardYear=moment($('#startYear').val()).format("YYYY");
        var selectedQuarter= $('#quarterSelect option:selected').val();

        if(selectedCouncil!="Select Council"){
            if(selectedFacility!='Select Facility'){
                orgUnitCode=$('#facilitySelect option:selected').val();
                orgUnitName=$('#facilitySelect option:selected').text();
            }
            else{
                orgUnitCode=$('#councilSelect option:selected').val();
                orgUnitName=$('#councilSelect option:selected').text();
            }
            var levelAndType=new Array(2);
            levelAndType[0]='';
            levelAndType[1]='';
            $.ajax({
                url: dhisBaseURL+"/organisationUnits/"+orgUnitCode+".jsonp?paging=false",
                dataType: "jsonp",
                async:false,
                data: {
                    format: "json"
                },
                success: function (response2) {
                    /** @namespace response2.attributeValues */
                    for (var j=0;j<response2.attributeValues.length;j++){
                        levelAndType[j]=response2.attributeValues[j].value;
                    }

                }
            });


            var councilName = $('#councilSelect option:selected').text();

            console.log('orgUnitCode :'+orgUnitCode);
            console.log('orgUnitName :'+orgUnitName);
            console.log('facilityLevel :'+levelAndType[0]);
            console.log('facilityType :'+levelAndType[1]);
            sessionStorage.setItem('dhisBaseURL', dhisBaseURL);
            sessionStorage.setItem('homeURL', homeURL);
            sessionStorage.setItem('orgUnitCode', orgUnitCode);
            sessionStorage.setItem('orgUnitName', orgUnitName);
            sessionStorage.setItem('scorecardYear', scorecardYear);
            sessionStorage.setItem('selectedQuarter', selectedQuarter);

            sessionStorage.setItem('scorecardPeriod',scorecardPeriod+"Q"+selectedQuarter);
            sessionStorage.setItem('facilityLevel', levelAndType[0]);
            sessionStorage.setItem('facilityType', levelAndType[1]);

            sessionStorage.setItem('councilName', councilName);
            sessionStorage.setItem('homeURL2',homeURL);
            //console.log(dhisBaseURL+'/analytics?&dimension=pe:'+month+'&filter=ou:'+orgUnitCode+'&dimension=dx:XNV6X8j6H7X');

            window.location.href ="scorecard.html";
        }
        else{
            document.getElementById('msgs').innerHTML='<div class="alert alert-danger" role="alert">Please select a facility</div>';
        }
    });
});
