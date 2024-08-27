function includeResource(src, type = 'script') {
    const param = "v";
    const timestamp = new Date().getTime();
    const separator = (src.indexOf('?') > 0) ? '&' : '?';
    const versionParam = param + ((src.indexOf(param) > 0) ? '_extra' : '') + '=' + timestamp;

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
includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js","script");
includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css","css");