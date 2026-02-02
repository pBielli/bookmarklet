javascript:(function() {
    var url = window.location.href;
    var urlParts = url.split("?");
    if (urlParts.length > 1) {
        var queryParams = urlParts[1].split("&");
        for (var i = 0; i < queryParams.length; i++) {
            var param = queryParams[i].split("=");
            if (param[0] === "rh") {
                var rhValue = param[1];
                var rhName = prompt('Inserisci un nome per questo filtro:', '');
                if (rhName) {
                    localStorage.setItem('amazonRhValue_' + rhName, rhValue);
                    alert('Parametro rh salvato con nome: ' + rhName);
                }
                return;
            }
        }
        alert('Parametro rh non trovato.');
    } else {
        alert('Nessun parametro trovato nell\'URL.');
    }
})();
