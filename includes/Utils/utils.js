// Funzione per generare l'URL con il parametro di versione
function generateVersionedUrl(src) {
    const versionParam = `v=${new Date().getTime()}`;
    const separator = src.includes('?') ? '&' : '?';
    return `${src}${separator}${versionParam}`;
}

// Funzione per caricare uno script
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

// Funzione per caricare un CSS
function loadCSS(src) {
    const fullSrc = generateVersionedUrl(src);  // Chiamata alla funzione per aggiungere la versione
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = fullSrc;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

// Funzione per verificare se la risorsa è già stata inclusa
function isResourceIncluded(src, type) {
    const elements = type === 'script'
        ? document.getElementsByTagName('script')
        : document.getElementsByTagName('link');

    return Array.from(elements).some(element => 
        type === 'script' ? element.src.includes(src) : element.href.includes(src)
    );
}

// Funzione principale per includere la risorsa
function includeResource(src, type = 'script') {
    // Verifica se la risorsa è già inclusa
    if (isResourceIncluded(src, type)) {
        console.log(`Resource already included: ${src}`);
        return Promise.resolve();
    }

    // Carica la risorsa in base al tipo
    const loadResource = type === 'script' ? loadScript(src) : loadCSS(src);

    return loadResource
        .then(() => console.log(`${type.toUpperCase()} loaded successfully: ${src}`))
        .catch((error) => console.error(`Error loading ${type}: ${src}`, error));
}

function downloadFile(content, fileName = "download", fileType = "text/plain") {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

