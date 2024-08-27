async function run_() {
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

function includeResource(src, type = 'script') {
    const param = "v";
    const flag=src.indexOf('?')> 0;
    const timestamp = new Date().getTime();
    const separator = (flag) ? '&' : '?';
    const versionParam = param + ((flag && src.indexOf(param,src.indexOf('?')) > 0) ? '_extra' : '') + '=' + timestamp;

    if (type === 'script') {
        const script = document.createElement('script');
        script.src = src + separator + versionParam;
        console.log(`includeScript -> ${script.src}`);
        document.head.appendChild(script);
    } else if (type === 'css') {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src + separator + versionParam;
        console.log(`includeCSS -> ${link.href}`);
        document.head.appendChild(link);
    } else {
        console.error('Unsupported resource type:', type);
    }
}
// Funzione per inizializzare la navbar
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
                { type: 'button', title: 'Download Excel', onclick: function() { run_();alert('Download eseguito!'); } },
            ]
        }
    ];

    insertNavbar(logoSrc,logoAlt,navItems);
}

// Includi la libreria XLSX tramite CDN -
const srv="https://pbielli.github.io/bookmarklet";

includeResource(srv+"/AzzurroZCS/EnergyDataProcessor.js","script");
includeResource(srv+"/Utils/excel_functions.js","script");
includeResource(srv+"/Utils/image_functions.js","script");
includeResource(srv+"/Utils/utils.js","script");
includeResource(srv+"/Bootstrap/navbar.js","script");

includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js","script");
includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css","css");

setTimeout(()=>{initNavbar(console);alert(1)},2000);