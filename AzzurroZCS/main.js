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
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@3516c0b72611a4f0ee86ebb9f46f723958e87960/AzzurroZCS/EnergyDataProcessor.js");
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@379dcc8c48cd69f77c1ae6592782032ede2aaf3b/Utils/excel_functions.js");
