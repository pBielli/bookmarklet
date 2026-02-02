javascript:(function() {
    function createDialog() {
        let dialog = document.createElement("div");
        dialog.innerHTML = `
            <div style="
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: white; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                text-align: center; z-index: 10000; font-family: Arial, sans-serif;">
                <p style="margin-bottom: 15px; font-size: 16px;">Scegli quali righe mostrare:</p>
                <button id="btnOn" style="padding: 10px 15px; margin-right: 10px; font-size: 14px; cursor: pointer;">ON</button>
                <button id="btnOff" style="padding: 10px 15px; font-size: 14px; cursor: pointer;">OFF</button>
            </div>
        `;
        document.body.appendChild(dialog);

        document.getElementById("btnOn").addEventListener("click", function() {
            filterTable(true);
            document.body.removeChild(dialog);
        });

        document.getElementById("btnOff").addEventListener("click", function() {
            filterTable(false);
            document.body.removeChild(dialog);
        });
    }

    function filterTable(showActive) {
        let table = document.getElementById("allDevicesTable");
        if (!table) {
            alert("Tabella non trovata!");
            return;
        }

        let rows = table.getElementsByTagName("tr");

        for (let row of rows) {
            let statusIcon = row.querySelector('td:nth-child(2) i');
            if (statusIcon) {
                let isActive = statusIcon.classList.contains("status-available");
                row.style.display = (showActive === isActive) ? "" : "none";
            }
        }
    }

    createDialog();
})();
