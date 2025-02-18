function loadScript(src) {
    const fullSrc = generateVersionedUrl(src);  // Chiamata alla funzione per aggiungere la versione
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = fullSrc;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function run() {
    const extractor = new TableDataExtractor();
    extractor.extractAndDisplay();
    var content = extractor.toCSV()

    downloadFile(content, "data.csv", fileType = "text/csv")
    alert("estrazione completata")
}
// loadScript=(url)=>{ document.head.appendChild(Object.assign(document.createElement('script'), { src: url, type: 'text/javascript', async: true })); }
loadScript("https://pbielli.github.io/bookmarklet/TableExtractors/utils/utils.js")
    .then(() =>
        loadScript("https://pbielli.github.io/bookmarklet/TableExtractors/infinity/dataExtractor_infinity.js")
            .then(() => run())
            .catch(e => alert('Errore nel caricamento:' + e))
        )
    .catch(e => alert('Errore nel caricamento:' + e));