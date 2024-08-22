
function includeScript(src){
const script = document.createElement('script');
script.src = src;
document.head.appendChild(script);

}

// Includi la libreria XLSX tramite CDN
includeScript("https://unpkg.com/xlsx/dist/xlsx.full.min.js");

// Funzione per convertire un oggetto in Excel e scaricarlo
function convertObjectToExcel(obj, fileName, sheetName) {
    console.log(obj, fileName, sheetName);
        // Converti l'oggetto in un array di array (AOA) per il foglio di lavoro
        const headers = Object.keys(obj[0]); // Ottieni le chiavi come intestazioni
        const dati = [headers]; // Inizia con le intestazioni
        
        // Inserisci i valori degli oggetti
        obj.forEach(item => {
            dati.push(headers.map(header => item[header]));
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


