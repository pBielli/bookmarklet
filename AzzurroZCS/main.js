//funzione per includere le risorse e inserire la navbar
function startup(){
    // Includi la libreria XLSX tramite CDN -
    const srv="https://pbielli.github.io/bookmarklet";

    includeResource(srv+"/AzzurroZCS/EnergyDataProcessor.js","script");
    includeResource(srv+"/Utils/excel_functions.js","script");
    includeResource(srv+"/Utils/image_functions.js","script");
    includeResource(srv+"/Utils/utils.js","script");
    includeResource(srv+"/Bootstrap/navbar.js","script");

    includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js","script");
    includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css","css");

    setTimeout(()=>{initNavbar();},1000);
}
// Funzione per estrarre i dati dalla pagna e salvarli in un file excel
async function downloadData() {
    var energyDataProcessor, energyData;
    var fileName=`EnergyData - ${document.getElementById("mat-input-6").value}`;
    var canvas=document.querySelector("lib-monthly-yearly-energy-overview #energy-overview canvas");
   
// Esecuzione del codice
    energyDataProcessor = new EnergyDataProcessor();
    energyData = energyDataProcessor.processEnergyData();

    console.clear();
    console.log("energyData:",energyData);
    // Converti l'oggetto in Excel
    const excelBuffer = await convertObjectToExcel(energyData, 'energyData');

    // Aggiungi l'immagine al file Excel
    const updatedExcelBuffer = await appendImageToExcel(excelBuffer, canvas, 'energyData', { col: 0, row: 8 },{ width: 1452, height: 400 });

    // Scarica il file Excel aggiornato
    downloadExcel(updatedExcelBuffer, fileName);
}
// Funzione per inserire la navbar
function initNavbar() {
    // Configurazioni
    const logoSrc = 'https://www.cemambiente.it/wp-content/themes/cemAmbiente/img/logo_50.png'; // Modifica con il percorso del tuo logo
    // const logoSrc = 'https://avatars.githubusercontent.com/u/40484128?v=4';
    const logoAlt = 'Logo PAT';

    // Definisci gli elementi della navbar
    const navItems = [
        { type: 'link', title: 'Bookmarklets', href: 'https://github.com/pBielli/bookmarklet' },
        {
            type: 'dropdown', title: 'Comandi AzzurroZCS', elements: [
                { type: 'link', title: 'AzzurroZCS', href: 'https://zcsazzurrosystemsweb.com/customer/e438305f-c279/overview' },
                { type: 'separator' },
                { type: 'button', title: 'Download Excel', onclick: function() { downloadData(); } },
            ]
        }
    ];

    insertNavbar(logoSrc,logoAlt,navItems);
}

//LO SCRIPT
//include il file utils - contiene includeResource()
var utils="https://pbielli.github.io/bookmarklet/Utils/utils.js";
!document.querySelector(`script[src="${utils}"]`) && document.head.appendChild(Object.assign(document.createElement('script'), { src: utils ,id:"bookmarklet_utils"}));

//controlla che utils.js sia stato caricato ed include le risorse necessarie
document.querySelector(`script[src="${utils}"]`).addEventListener("load", (event) => {
    startup()
  });