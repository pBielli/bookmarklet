if (typeof UTILS_FUNCTIONSJS !== 'undefined')
    throw new Error("Script yet included!");
    
var UTILS_FUNCTIONSJS=true;


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