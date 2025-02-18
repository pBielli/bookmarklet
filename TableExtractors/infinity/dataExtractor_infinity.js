class TableDataExtractor {
    constructor() {
      this.headers = [];
      this.rows = [];
    }
  
    findTargetTable() {
      // Cerca tutte le tabelle che hanno un ID che termina con '_Grid1'
      const tables = document.querySelectorAll('table[id$="_Grid1"]');
      return tables[0]; // Ritorna la prima tabella trovata
    }
  
    extractCellValue(cell) {
      // Estrae il valore da una cella navigando la struttura annidata
      if (!cell) return '';
      
      // Caso 1: Cerca il div con title all'interno della cella
      const divWithTitle = cell.querySelector('div[title]');
      if (divWithTitle && divWithTitle.getAttribute('title')) {
        return divWithTitle.getAttribute('title').trim();
      }
  
      // Caso 2: Cerca div con align="center" che spesso contiene il valore principale
      const centerDiv = cell.querySelector('div[align="center"]');
      if (centerDiv) {
        return centerDiv.textContent.trim();
      }
  
      // Caso 3: Cerca dentro tabelle annidate
      const nestedCell = cell.querySelector('td[valign="middle"]');
      if (nestedCell) {
        const nestedDiv = nestedCell.querySelector('div');
        if (nestedDiv) {
          return nestedDiv.textContent.trim();
        }
        return nestedCell.textContent.trim();
      }
  
      // Caso 4: Cerca select per giustificativi e richieste
      const select = cell.querySelector('select');
      if (select) {
        const selectedOption = select.options[select.selectedIndex];
        return selectedOption ? selectedOption.text.trim() : '';
      }
  
      // Fallback: prendi il testo diretto della cella
      return cell.textContent.trim();
    }
  
    extractTableData(skipRows = 11) {
        const table = this.findTargetTable();
        if (!table) {
          console.error('Tabella non trovata!');
          return null;
        }
      
        // Otteniamo le intestazioni
        const headers = [];
        const headerRow = table.querySelector('tr.grid_title');
        if (headerRow) {
          const headerCells = headerRow.querySelectorAll('td.grid_cell_title');
          headerCells.forEach(cell => {
            const headerText = this.extractCellValue(cell);
            headers.push(headerText);
          });
        }
      
        // Otteniamo tutte le righe dei dati, escludendo quelle da saltare
        const dataRows = table.querySelectorAll('tr:not(.grid_title)');
        const data = [];
        let rowIndex = 0;
      
        dataRows.forEach(row => {
          // Salta le prime 'skipRows' righe
          if (rowIndex >= skipRows) {
            const cells = row.querySelectorAll('td');
            const rowData = {};
            cells.forEach((cell, index) => {
              if (headers[index]) {
                rowData[headers[index]] = this.extractCellValue(cell);
              }
            });
            if (Object.keys(rowData).length > 0) {
              data.push(rowData);
            }
          }
          rowIndex++;
        });
      
        this.headers = headers;
        this.rows = data;
      
        return { headers: this.headers, rows: this.rows };
      }
      
  
    // Metodo per esportare in CSV
    toCSV() {
      const rows = [this.headers.join(',')];
      this.rows.forEach(row => {
        const rowData = this.headers.map(header => row[header] || '').join(',');
        rows.push(rowData);
      });
      return rows.join('\n');
    }
  
    // Metodo per esportare in JSON
    toJSON() {
      return JSON.stringify({ headers: this.headers, rows: this.rows }, null, 2);
    }
  
    // Metodo per esportare in XML
    toXML() {
      let xml = '<table>\n';
      xml += '  <headers>\n';
      this.headers.forEach(header => {
        xml += `    <header>${header}</header>\n`;
      });
      xml += '  </headers>\n';
  
      xml += '  <rows>\n';
      this.rows.forEach(row => {
        xml += '    <row>\n';
        this.headers.forEach(header => {
          xml += `      <${header}>${row[header]}</${header}>\n`;
        });
        xml += '    </row>\n';
      });
      xml += '  </rows>\n';
      xml += '</table>';
      return xml;
    }
  
    // Metodo per esportare in HTML
    toHTML() {
      let html = '<table border="1">\n  <thead><tr>';
      this.headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
      html += '</tr></thead>\n  <tbody>\n';
  
      this.rows.forEach(row => {
        html += '    <tr>';
        this.headers.forEach(header => {
          html += `<td>${row[header]}</td>`;
        });
        html += '</tr>\n';
      });
  
      html += '  </tbody>\n</table>';
      return html;
    }
  
    // Funzione di utilità per visualizzare i dati estratti
    displayExtractedData(data) {
      if (!data) {
        console.error('Nessun dato da visualizzare');
        return;
      }
      console.log('Headers:', data.headers);
      console.log('Rows:', data.rows);
      console.table(data.rows);
    }
  
    // Funzione di estrazione e visualizzazione
    extractAndDisplay() {
      const tableData = this.extractTableData();
      this.displayExtractedData(tableData);
      return tableData; // Per uso futuro
    }
  }
  