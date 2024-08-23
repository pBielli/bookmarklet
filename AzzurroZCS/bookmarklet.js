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