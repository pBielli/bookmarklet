function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
function run_() {
    var energyDataProcessor, energyData;

    // Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();

    clear();
    console.log("energyData:",energyData);
    console.log("Inizio conversione in file excel...");
    convertObjectToExcel(energyData, 'esempio_file', 'energyData');
    console.log("Fine.");

}
// Includi la libreria XLSX tramite CDN
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@7381b69dd514365d2f1d449849917996c8ba356b/AzzurroZCS/EnergyDataProcessor.js");
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@68abbc2a543cca49833b1f8cae3a0b6fc11ed5b3/Utils/excel_functions.js");
