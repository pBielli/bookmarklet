function includeResource(src, type = 'script') {
    const param = "v";
    const flag = src.indexOf('?') > 0;
    const timestamp = new Date().getTime();
    const separator = (flag) ? '&' : '?';
    const versionParam = param + ((flag && src.indexOf(param, src.indexOf('?')) > 0) ? '_extra' : '') + '=' + timestamp;

    // Funzione per verificare se la risorsa è già stata inclusa
    function isResourceIncluded(src, type) {
        if (type === 'script') {
            return Array.from(document.getElementsByTagName('script')).some(script => script.src.includes(src));
        } else if (type === 'css') {
            return Array.from(document.getElementsByTagName('link')).some(link => link.rel === 'stylesheet' && link.href.includes(src));
        }
        return false;
    }

    // Controlla se la risorsa è già inclusa
    if (isResourceIncluded(src, type)) {
        console.log(`Resource already included: ${src}`);
        return;  // Se la risorsa è già inclusa, esci dalla funzione
    }

    // Aggiungi la risorsa solo se non è già inclusa
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
