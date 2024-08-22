function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
function run_() {
    var energyDataProcessor, energyData;
    alert("AVVIO");

    // Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();
    console.log(energyData);

}
// Includi la libreria XLSX tramite CDN
includeScript("https://raw.githubusercontent.com/pBielli/bookmarklet/main/AzzurroZCS/EnergyDataProcessor.js");
includeScript("https://raw.githubusercontent.com/pBielli/bookmarklet/main/Utils/excel_functions.js");

clear();
setTimeout(run_, 2500);