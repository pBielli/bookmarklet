function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

async function run_(console) {
    var energyDataProcessor, energyData;
    var fileName=`EnergyData - ${document.getElementById("mat-input-6").value}`;
    var canvas=document.querySelector("lib-monthly-yearly-energy-overview #energy-overview canvas");
   
// Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();

    
    console.clear();
    console.log("energyData:",energyData);
    console.log("Inizio conversione in file excel...");

    // Converti l'oggetto in Excel
    const excelBuffer = await convertObjectToExcel(energyData, 'energyData');

    console.log("Aggiunta img al file excel...");
   // Aggiungi l'immagine al file Excel
   const updatedExcelBuffer = await appendImageToExcel(excelBuffer, canvas, 'energyData', 'A30');


    // Scarica il file Excel aggiornato
    downloadExcel(updatedExcelBuffer, fileName);
    console.log("Fine.");

}
// Includi la libreria XLSX tramite CDN
includeScript("/AzzurroZCS/EnergyDataProcessor.min.js");
includeScript("/Utils/excel_functions.min.js");
includeScript("/Utils/utils.min.js");
