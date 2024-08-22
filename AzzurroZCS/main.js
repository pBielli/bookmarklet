function includeScript(src){
    const script = document.createElement('script');
    script.src = src;
        document.head.appendChild(script);
    }
    
// Includi la libreria XLSX tramite CDN
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet/AzzurroZCS/EnergyDataProcessor.js");

clear();
// Esecuzione del codice
var energyDataProcessor = new EnergyDataProcessor();
console.log(energyDataProcessor.processEnergyData());