javascript:(function(){
    var script=document.createElement('script');
    script.src="https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@379dcc8c48cd69f77c1ae6592782032ede2aaf3b/AzzurroZCS/main.min.js";
    script.onload=function(){
        setTimeout(function(){
        console.clear();
        console.log("RUN:");
        run_(console);
        console.log("fine");},2000);
    };
    document.head.appendChild(script);
})();
javascript:(function(){var script=document.createElement('script');script.src="https://cdn.jsdelivr.net/gh/pBielli/bookmarklet@f54d1e7f9d3a71cfd4ec583a0575dbe2615653ab/AzzurroZCS/main.min.js";script.onload=function(){setTimeout(function(){console.clear();console.log('RUN:');run_(console);console.log('fine');},2000);};document.head.appendChild(script);})();