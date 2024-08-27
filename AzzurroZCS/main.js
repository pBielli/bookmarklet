function includeScript(src) {
    const param="v";
    const script = document.createElement('script');
    script.src = src + ((src.indexOf('?')>0)?'&':'?')
                    + param+((src.indexOf(param)>0)?'_extra':'')
                    + '=' + new Date().getTime();
    console.log(`includeScript -> ${script.src}`)
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
    const updatedExcelBuffer = await appendImageToExcel(excelBuffer, canvas, 'energyData', { col: 0, row: 8 },{ width: 1452, height: 400 });

    // Scarica il file Excel aggiornato
    downloadExcel(updatedExcelBuffer, fileName);
    console.log("Fine.");
}
// Includi la libreria XLSX tramite CDN -
const srv="https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@8ddd641b4d619ccab130fb6361eabe34d2fbc1b1";
includeScript(srv+"/AzzurroZCS/EnergyDataProcessor.min.js");
includeScript(srv+"/Utils/excel_functions.js");
includeScript(srv+"/Utils/image_functions.js");
includeScript(srv+"/Utils/utils.min.js");