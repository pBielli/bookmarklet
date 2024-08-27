if (typeof UTILS_XLSXFUNCTIONSJS !== 'undefined')
    throw new Error("Script yet included!");
    
var UTILS_XLSXFUNCTIONSJS=true;


function includeScript(src){
const script = document.createElement('script');
script.src = src;
document.head.appendChild(script);

}

// Includi la libreria XLSX tramite CDN
includeScript("https://unpkg.com/exceljs/dist/exceljs.min.js");

// Funzione per convertire un oggetto in Excel e scaricarlo
async function convertObjectToExcel(obj, sheetName) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // Ottieni i nomi degli oggetti (le chiavi principali dell'oggetto)
    const nomiOggetti = Object.keys(obj);

    // Verifica che ci siano effettivamente oggetti da processare
    if (nomiOggetti.length === 0) {
        console.error("L'oggetto fornito è vuoto.");
        return;
    }

    // Ottieni le chiavi per le intestazioni dalla prima entry
    const headers = Object.keys(obj[nomiOggetti[0]]);

    // Aggiungi la colonna "nome oggetto" come prima intestazione
    const dati = [['---', ...headers]];

    // Inserisci i dati nell'array, includendo anche il nome dell'oggetto come prima colonna
    nomiOggetti.forEach(nomeOggetto => {
        const valori = obj[nomeOggetto];
        const riga = [nomeOggetto, ...headers.map(header => valori[header])];
        dati.push(riga);
    });

    // Aggiungi i dati al foglio di lavoro
    worksheet.addRows(dati);

    // Salva il file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}

// Funzione per creare un file Excel con un'immagine
// Funzione per aggiungere un'immagine a un file Excel esistente
async function appendImageToExcel(buffer, canvas, sheetName, cellAddress={ col: 0, row: 0 },dimensions={ width: 600, height: 400 }) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(sheetName);

    // Converti il canvas in Base64
    const base64Image = canvasImageToBase64(canvas);

    // Aggiungi una nuova immagine
    const imageId = workbook.addImage({
        base64: base64Image,
        extension: 'png',
    });

    // Inserisci l'immagine in una cella specifica
    worksheet.addImage(imageId, {
        tl: cellAddress, // Indica la posizione della cella (es. 'A1')
        ext: dimensions, // Dimensioni dell'immagine in pixel
    });

    // Restituisci il buffer aggiornato del workbook
    return await workbook.xlsx.writeBuffer();
}

// Funzione per scaricare il file Excel
function downloadExcel(buffer, fileName = "file") {
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



