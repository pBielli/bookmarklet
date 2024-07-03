javascript:(function() {
    var rhValue = localStorage.getItem('amazonRhValue_selected');
    if (rhValue) {
        var url = window.location.href;
        var urlParts = url.split("?");
        if (urlParts.length > 1) {
            var queryParams = urlParts[1].split("&");
            var rhFound = false;
            for (var i = 0; i < queryParams.length; i++) {
                var param = queryParams[i].split("=");
                if (param[0] === "rh") {
                    param[1] = rhValue;
                    queryParams[i] = param.join("=");
                    rhFound = true;
                    break;
                }
            }
            if (!rhFound) {
                queryParams.push("rh=" + rhValue);
            }
            urlParts[1] = queryParams.join("&");
            window.location.href = urlParts.join("?");
        } else {
            window.location.href = url + "?rh=" + rhValue;
        }
    } else {
        alert('Nessun valore rh selezionato.');
    }
})();
