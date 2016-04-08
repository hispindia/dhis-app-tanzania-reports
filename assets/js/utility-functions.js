/**
 * Created by hisp on 29/12/15.
 */
function printPage(){
    var printContents = document.getElementById('printArea').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}