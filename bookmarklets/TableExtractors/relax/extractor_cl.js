class TableDataExtractor {
    constructor(gridElement) {
        this.gridElement = gridElement;
        this.data = [];
    }

    extractData() {
        // Get all row elements
        const rows = this.gridElement.querySelectorAll('[role="row"]');
        const headers = [];
        
        // Extract headers
        rows[0].querySelectorAll('[role="columnheader"]').forEach(header => {
            headers.push(header.getAttribute('data-field'));
        });

        // Extract data from each row
        rows.forEach((row, index) => {
            // Skip header row
            if (index === 0) return;
            
            const rowData = {};
            const cells = row.querySelectorAll('[role="cell"]');
            
            cells.forEach((cell, cellIndex) => {
                const field = headers[cellIndex];
                // Extract text content, removing currency symbols and handling numbers
                let value = cell.textContent.trim();
                
                // Handle currency values
                if (value.includes('€')) {
                    value = value.replace('€', '').trim();
                    value = value.replace('.', '').replace(',', '.');
                    value = parseFloat(value);
                }
                
                rowData[field] = value;
            });
            
            if (Object.keys(rowData).length > 0) {
                this.data.push(rowData);
            }
        });

        return this;
    }

    toJSON() {
        return JSON.stringify(this.data, null, 2);
    }

    toCSV() {
        if (this.data.length === 0) return '';
        
        const headers = Object.keys(this.data[0]);
        const csvRows = [];
        
        // Add headers
        csvRows.push(headers.join(','));
        
        // Add data rows
        this.data.forEach(row => {
            const values = headers.map(header => {
                const value = row[header];
                // Handle values that contain commas
                return typeof value === 'string' && value.includes(',') ? 
                    `"${value}"` : value;
            });
            csvRows.push(values.join(','));
        });
        
        return csvRows.join('\n');
    }

    toXML() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<transactions>\n';
        
        this.data.forEach(row => {
            xml += '  <transaction>\n';
            Object.entries(row).forEach(([key, value]) => {
                xml += `    <${key}>${value}</${key}>\n`;
            });
            xml += '  </transaction>\n';
        });
        
        xml += '</transactions>';
        return xml;
    }

    toHTML() {
        if (this.data.length === 0) return '';
        
        const headers = Object.keys(this.data[0]);
        let html = '<table border="1">\n<thead>\n<tr>\n';
        
        // Add headers
        headers.forEach(header => {
            html += `  <th>${header}</th>\n`;
        });
        html += '</tr>\n</thead>\n<tbody>\n';
        
        // Add data rows
        this.data.forEach(row => {
            html += '<tr>\n';
            headers.forEach(header => {
                html += `  <td>${row[header]}</td>\n`;
            });
            html += '</tr>\n';
        });
        
        html += '</tbody>\n</table>';
        return html;
    }
}