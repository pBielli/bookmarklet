function includeScript(src){
    const script = document.createElement('script');
    script.src = src;
        document.head.appendChild(script);
    }
    
// Includi la libreria XLSX tramite CDN
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet/AzzurroZCS/EnergyDataProcessor.js");
includeScript("https://cdn.jsdelivr.net/gh/pBielli/bookmarklet/Utils/excel_functions.js");

clear();
var energyDataProcessor, energyData;
alert("AVVIO");

setTimeout(()=>{
// Esecuzione del codice
energyDataProcessor = new EnergyDataProcessor();
energyData=energyDataProcessor.processEnergyData();
console.log(energyData);

},2500)