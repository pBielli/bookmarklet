
function includeScript(src){
const script = document.createElement('script');
script.src = src;
document.head.appendChild(script);

}

// Includi la libreria XLSX tramite CDN
includeScript("https://unpkg.com/xlsx/dist/xlsx.full.min.js");

// Funzione per convertire un oggetto in Excel e scaricarlo
function convertObjectToExcel(obj, fileName, sheetName) {

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

    // Crea un nuovo foglio di lavoro
    const foglioDiLavoro = XLSX.utils.aoa_to_sheet(dati);

    // Crea una nuova cartella di lavoro
    const cartellaDiLavoro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(cartellaDiLavoro, foglioDiLavoro, sheetName);

    // Converte la cartella di lavoro in un file Excel (formato .xlsx)
    const fileExcel = XLSX.write(cartellaDiLavoro, { bookType: 'xlsx', type: 'binary' });

    // Funzione per trasformare i dati binari in un Blob
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }

    // Crea un Blob e scarica il file
    const blob = new Blob([s2ab(fileExcel)], { type: "application/octet-stream" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



