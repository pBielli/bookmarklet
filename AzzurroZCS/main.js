function includeScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}
function run_() {
    clear();
    var energyDataProcessor, energyData;
    alert("AVVIO");

    // Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();
    console.log(energyData);

}
// Includi la libreria XLSX tramite CDN
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@9bf405b103a5ee2a81f3625e00d4f4ed6d0c827f/AzzurroZCS/EnergyDataProcessor.js");
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@9bf405b103a5ee2a81f3625e00d4f4ed6d0c827f/Utils/excel_functions.js");
