function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

function run_(console) {
    var energyDataProcessor, energyData;

    // Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();

    console.clear();
    console.log("energyData:",energyData);
    console.log("Inizio conversione in file excel...");
    convertObjectToExcel(energyData, 'esempio_file', 'energyData');
    console.log("Fine.");

}
// Includi la libreria XLSX tramite CDN
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@b27902ebdd6b3a8098ace921b28acdd4410f0ed0/AzzurroZCS/EnergyDataProcessor.min.js");
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@e6045ed2af8bde195e84509ae23666eb84c4a854/Utils/excel_functions.min.js");
