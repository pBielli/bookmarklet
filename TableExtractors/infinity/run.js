function loadScript(fullSrc) {
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
    var content = extractor.toCSV();

    downloadFile(content, "data.csv", "text/csv");
    alert("estrazione completata");
}

loadScript("https://pbielli.github.io/bookmarklet/Utils/utils.js")
    .then(() =>
        loadScript("https://pbielli.github.io/bookmarklet/TableExtractors/infinity/dataExtractor_infinity.js")
            .then(() => run())
            .catch(e => alert('Errore nel caricamento di "dataExtractor_infinity.js": ' + (e.message || e)))
    )
    .catch(e => {
        alert('Errore nel caricamento di "utils.js": ' + (e.message || e));
        console.error(e);
    });
