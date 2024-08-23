function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
function test(console) {
    
    console.clear();
    console.log("TEST");
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
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@68abbc2a543cca49833b1f8cae3a0b6fc11ed5b3/Utils/excel_functions.js");
