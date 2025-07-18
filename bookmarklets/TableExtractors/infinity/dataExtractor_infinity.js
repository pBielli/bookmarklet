class TableDataExtractor {
  constructor() {
    this.headers = [];
    this.rows = [];
    this.timeDelimiter = ' | '; // Carattere/i per separare gli orari
  }

  findTargetTable() {
    const tables = document.querySelectorAll('table[id$="_Grid1"]');
    return tables[0];
  }

  formatTimestamp(timestamp) {
    // Aggiunge : tra ore e minuti se non presente
    if (timestamp.length === 4) {
      return timestamp.slice(0, 2) + ':' + timestamp.slice(2);
    }
    return timestamp;
  }

  splitTimestamps(timeString) {
    if (!timeString) return '';
    
    // Rimuove spazi e caratteri non necessari
    timeString = timeString.trim();
    
    // Pattern per trovare gli orari (formato HH:MM o HHMM)
    const timePattern = /(\d{2}[:.]?\d{2})/g;
    const matches = timeString.match(timePattern);
    
    if (!matches) return timeString;
    
    // Formatta e unisce gli orari con il delimitatore
    return matches
      .map(time => this.formatTimestamp(time.replace('.', ':')))
      .join(this.timeDelimiter);
  }

  extractCellValue(cell) {
    if (!cell) return '';
    
    // Caso 1: Cerca il div con title all'interno della cella 
    const divWithTitle = cell.querySelector('div[title]');
    if (divWithTitle && divWithTitle.getAttribute('title')) {
      return divWithTitle.getAttribute('title').trim();
    }

    // Caso 2: Cerca div con align="center" che spesso contiene il valore principale
    const centerDiv = cell.querySelector('div[align="center"]');
    if (centerDiv) {
      const text = centerDiv.textContent.trim();
      // Se la colonna è "Timbrature", applica lo split degli orari
      if (this.currentHeader === 'Timbrature') {
        return this.splitTimestamps(text);
      }
      return text;
    }

    // Caso 3: Cerca dentro tabelle annidate
    const nestedCell = cell.querySelector('td[valign="middle"]');
    if (nestedCell) {
      const nestedDiv = nestedCell.querySelector('div');
      const text = (nestedDiv ? nestedDiv.textContent : nestedCell.textContent).trim();
      if (this.currentHeader === 'Timbrature') {
        return this.splitTimestamps(text);
      }
      return text;
    }

    // Caso 4: Cerca select per giustificativi e richieste
    const select = cell.querySelector('select');
    if (select) {
      const selectedOption = select.options[select.selectedIndex];
      return selectedOption ? selectedOption.text.trim() : '';
    }

    // Fallback: prendi il testo diretto della cella
    const text = cell.textContent.trim();
    if (this.currentHeader === 'Timbrature') {
      return this.splitTimestamps(text);
    }
    return text;
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
      if (rowIndex >= skipRows) {
        const cells = row.querySelectorAll('td');
        const rowData = {};
        cells.forEach((cell, index) => {
          if (headers[index]) {
            this.currentHeader = headers[index]; // Teniamo traccia dell'header corrente
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

  // [Il resto dei metodi rimane invariato...]
  toCSV() {
    const rows = [this.headers.join(',')];
    this.rows.forEach(row => {
      const rowData = this.headers.map(header => {
        // Escapa le virgole nei valori delle celle
        const value = row[header] || '';
        return value.includes(',') ? `"${value}"` : value;
      }).join(',');
      rows.push(rowData);
    });
    return rows.join('\n');
  }

  toJSON() {
    return JSON.stringify({ headers: this.headers, rows: this.rows }, null, 2);
  }

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

  displayExtractedData(data) {
    if (!data) {
      console.error('Nessun dato da visualizzare');
      return;
    }
    console.log('Headers:', data.headers);
    console.log('Rows:', data.rows);
    console.table(data.rows);
  }

  extractAndDisplay() {
    const tableData = this.extractTableData();
    this.displayExtractedData(tableData);
    return tableData;
  }
}