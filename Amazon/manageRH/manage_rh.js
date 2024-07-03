javascript:(function() {
    // Creazione della nuova finestra
    var newWindow = window.open('', '', 'width=600,height=400');
    newWindow.document.write('<html><head><title>Gestione Filtri rh</title></head><body></body></html>');
    newWindow.document.body.innerHTML = `
        <h1>Gestione Filtri rh</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valore</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody id="rhTableBody"></tbody>
        </table>
        <button id="addRhButton">Aggiungi Filtro</button>
        <script>
            // Funzione per aggiornare la tabella
            function updateTable() {
                var tableBody = document.getElementById('rhTableBody');
                tableBody.innerHTML = '';
                var keys = Object.keys(localStorage);
                var rhKeys = keys.filter(function(key) {
                    return key.startsWith('amazonRhValue_');
                });
                rhKeys.forEach(function(key) {
                    var rhName = key.replace('amazonRhValue_', '');
                    var rhValue = localStorage.getItem(key);
                    var row = document.createElement('tr');
                    row.innerHTML = '<td>' + rhName + '</td><td>' + rhValue + '</td>' +
                                    '<td><button onclick="editRh(\\'' + rhName + '\\')">Modifica</button>' +
                                    '<button onclick="deleteRh(\\'' + rhName + '\\')">Elimina</button></td>';
                    tableBody.appendChild(row);
                });
            }
            // Funzione per aggiungere un nuovo filtro
            document.getElementById('addRhButton').onclick = function() {
                var rhName = prompt('Inserisci il nome del filtro:');
                var rhValue = prompt('Inserisci il valore del filtro:');
                if (rhName && rhValue) {
                    localStorage.setItem('amazonRhValue_' + rhName, rhValue);
                    updateTable();
                }
            };
            // Funzione per modificare un filtro esistente
            window.editRh = function(rhName) {
                var rhValue = localStorage.getItem('amazonRhValue_' + rhName);
                var newRhValue = prompt('Modifica il valore del filtro:', rhValue);
                if (newRhValue) {
                    localStorage.setItem('amazonRhValue_' + rhName, newRhValue);
                    updateTable();
                }
            };
            // Funzione per eliminare un filtro esistente
            window.deleteRh = function(rhName) {
                localStorage.removeItem('amazonRhValue_' + rhName);
                updateTable();
            };
            // Inizializzazione della tabella
            updateTable();
        </script>
    `;
})();
