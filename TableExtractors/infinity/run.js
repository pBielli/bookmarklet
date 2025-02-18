
alert("script caricato!")
loadScript=(url)=>{ document.head.appendChild(Object.assign(document.createElement('script'), { src: url, type: 'text/javascript', async: true })); }
loadScript("https://pbielli.github.io/bookmarklet/TableExtractors/infinity/dataExtractor_infinity.js")
const extractor = new TableDataExtractor();
extractor.extractAndDisplay();
extractor.toCSV()

javascript:(function(){var s=document.createElement('script');s.src="main.js";document.head.appendChild(s)})();