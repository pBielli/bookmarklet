var js = document.createElement("script");
var URLbase = "https://raw.githubusercontent.com/pBielli/bookmarklet/main/";
js.type = "text/javascript";
js.src = URLbase+"Utils/utils.js";
document.body.appendChild(js);

includeResource(URLbase+"/bookmarklets/TableExtractors/relax/extractor_cl.js", "script");