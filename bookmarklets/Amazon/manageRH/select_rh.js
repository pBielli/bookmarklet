javascript:(function() {
    var keys = Object.keys(localStorage);
    var rhKeys = keys.filter(function(key) {
        return key.startsWith('amazonRhValue_');
    });
    if (rhKeys.length === 0) {
        alert('Nessun filtro rh salvato trovato.');
        return;
    }
    var options = rhKeys.map(function(key) {
        return key.replace('amazonRhValue_', '');
    }).join('\n');
    var selectedRhName = prompt('Seleziona un filtro rh:\n' + options, '');
    if (selectedRhName) {
        var selectedRhValue = localStorage.getItem('amazonRhValue_' + selectedRhName);
        if (selectedRhValue) {
            localStorage.setItem('amazonRhValue_selected', selectedRhValue);
            alert('Filtro rh selezionato: ' + selectedRhName);
        } else {
            alert('Filtro rh non trovato.');
        }
    }
})();
