# 📚 Bookmarklet Collection

Una collezione modulare e organizzata di bookmarklet per manipolare e interagire con pagine web direttamente dal browser.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Bookmarklets](https://img.shields.io/badge/bookmarklets-3+-orange)

---

## 🌟 Caratteristiche

- **🎯 Entry Point Unificato**: Interfaccia web con navbar dinamica
- **📦 Auto-Discovery**: I bookmarklet vengono rilevati automaticamente
- **🔧 Sistema Modulare**: Aggiungi nuovi bookmarklet in 2 minuti
- **⚡ Caricamento Intelligente**: Gestione automatica delle dipendenze
- **🎨 UI Professionale**: Interfaccia Bootstrap responsive
- **📊 Info da GitHub**: Versione e ultimo aggiornamento automatici
- **🛠️ Template Pronto**: Struttura standardizzata per nuovi bookmarklet

---

## 🚀 Demo Live

**👉 [Apri la Collection](https://pbielli.github.io/bookmarklet/)**

---

## 📋 Bookmarklet Disponibili

### ⚡ Business Tools
- **Azzurro ZCS Suite** - Suite completa per gestione dati e RH
  - Gestione Risorse Umane
  - Energy Data Processor

### 📦 E-Commerce
- **Amazon Tools** - Strumenti per Amazon

### 📞 Communication
- **Wildix On/Off** - Toggle rapido stato Wildix

---

## 🎯 Quick Start

### 1️⃣ Visita il Sito
Vai su [https://pbielli.github.io/bookmarklet/](https://pbielli.github.io/bookmarklet/)

### 2️⃣ Scegli un Bookmarklet
Sfoglia la griglia o usa il menu a tendina nella navbar

### 3️⃣ Copia il Codice
Clicca su "Dettagli & Codice" e copia il codice generato

### 4️⃣ Crea il Segnalibro
1. Crea un nuovo segnalibro nel browser
2. Incolla il codice come URL
3. Clicca quando sei sulla pagina desiderata

---

## 🛠️ Per Sviluppatori

### Struttura del Progetto

```
bookmarklet/
├── index.html                  # Entry point principale
├── config.json                 # Configurazione globale
├── README.md
├── MIGRATION_GUIDE.md          # Guida migrazione
│
├── core/                       # Sistema core
│   ├── loader.js              # Caricamento risorse
│   ├── registry.js            # Registro bookmarklet
│   └── core.js                # Logica principale
│
├── includes/                   # Risorse condivise
│   ├── ui/
│   │   ├── navbar.js          # Componente navbar
│   │   └── styles.css         # Stili globali
│   ├── libs/                  # Librerie esterne
│   └── utils/                 # Utilities comuni
│       ├── utils.js
│       ├── excel_functions.js
│       └── image_functions.js
│
├── bookmarklets/              # Bookmarklet
│   ├── _template/             # Template per nuovi
│   ├── amazon/
│   ├── azzurro-zcs/
│   └── wildix/
│
└── assets/                    # Risorse statiche
```

### Aggiungere un Nuovo Bookmarklet

#### Metodo Rapido (2 minuti) ⚡

```bash
# 1. Copia il template
cp -r bookmarklets/_template bookmarklets/mio-bookmarklet

# 2. Modifica info.json
cd bookmarklets/mio-bookmarklet
nano info.json
```

```json
{
  "name": "Mio Tool",
  "description": "Fa cose incredibili",
  "category": "Utilities",
  "icon": "🎨"
}
```

```bash
# 3. Scrivi la logica in main.js
nano main.js
```

```javascript
(async function() {
    const CONFIG = {
        name: 'Mio Tool',
        baseUrl: 'https://pbielli.github.io/bookmarklet'
    };

    // Carica dipendenze
    async function loadDeps() {
        // ... (usa il template)
    }

    async function main() {
        await loadDeps();
        console.log('🎯 Il mio bookmarklet!');
        // La tua logica qui
    }

    main();
})();
```

```bash
# 4. Aggiungi al registry
nano core/registry.js
# Aggiungi 'mio-bookmarklet' all'array bookmarkletFolders

# 5. Commit e push
git add .
git commit -m "✨ Aggiungo Mio Tool"
git push
```

**Fatto!** Il bookmarklet apparirà automaticamente su GitHub Pages.

---

## 📚 Documentazione

### File `info.json`

Ogni bookmarklet deve avere un file `info.json`:

```json
{
  "name": "Nome Visualizzato",
  "version": "1.0.0",
  "description": "Breve descrizione",
  "category": "Categoria",
  "icon": "🎨",
  "author": "Tuo Nome",
  "dependencies": {
    "bootstrap": true,
    "exceljs": false,
    "customLibs": []
  },
  "permissions": {
    "requiresLogin": false,
    "domains": ["*"]
  }
}
```

### File `main.js`

Il file principale deve essere una IIFE che:

1. Carica il `ResourceLoader`
2. Inizializza le dipendenze necessarie
3. Esegue la logica del bookmarklet

```javascript
(async function() {
    'use strict';
    
    // Config
    const CONFIG = {
        name: 'Nome',
        baseUrl: 'https://pbielli.github.io/bookmarklet'
    };

    // Carica ResourceLoader
    async function loadResourceLoader() {
        if (window.ResourceLoader) return;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${CONFIG.baseUrl}/core/loader.js?v=${Date.now()}`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Carica dipendenze
    async function loadDependencies() {
        await loadResourceLoader();
        await window.ResourceLoader.init();
        await window.ResourceLoader.loadCommonDependencies();
    }

    // Main
    async function main() {
        await loadDependencies();
        
        // === LA TUA LOGICA QUI ===
        console.log('Bookmarklet avviato!');
    }

    main();
})();
```

### Utilities Disponibili

Il sistema fornisce utilities comuni in `/includes/utils/`:

#### `utils.js`
- `loadScript(src)` - Carica script JS
- `loadCSS(href)` - Carica CSS
- `includeResource(src, type)` - Include risorsa con check duplicati
- `downloadFile(content, fileName, fileType)` - Download file

#### `excel_functions.js`
- `exportToExcel(data, filename)` - Esporta dati in Excel
- `addImageToExcel(workbook, sheet, imageBase64, cell)` - Aggiunge immagini
- `downloadExcel(buffer, fileName)` - Download file Excel

#### `image_functions.js`
- `canvasImageToBase64(canvas)` - Canvas → Base64
- `downloadBase64Img(img, fileName)` - Download immagine Base64
- `downloadCanvasImg(canvas, fileName)` - Download immagine Canvas

---

## 🔧 Configurazione

Modifica `config.json` per personalizzare:

```json
{
  "project": {
    "name": "Nome Progetto",
    "version": "2.0.0",
    "repository": "https://github.com/USERNAME/REPO",
    "baseUrl": "https://USERNAME.github.io/REPO"
  },
  "git": {
    "enabled": true,
    "checkUpdates": true
  }
}
```

---

## 🧪 Test Locale

```bash
# Opzione 1: Python
python -m http.server 8000

# Opzione 2: Node.js
npx http-server -p 8000

# Apri browser
open http://localhost:8000/index.html
```

---

## 📖 Guide

- **[Migration Guide](MIGRATION_GUIDE.md)** - Come migrare dalla vecchia struttura
- **[Template Guide](bookmarklets/_template/README.md)** - Come usare il template
- **[API Documentation](docs/API.md)** - Documentazione API (coming soon)

---

## 🤝 Contribuire

1. Fork del repository
2. Crea un branch per le modifiche (`git checkout -b feature/nuova-feature`)
3. Commit delle modifiche (`git commit -m '✨ Aggiungo nuova feature'`)
4. Push del branch (`git push origin feature/nuova-feature`)
5. Apri una Pull Request

---

## 📝 Convenzioni

- **Nomi cartelle**: lowercase, kebab-case (`mio-bookmarklet`)
- **Categorie**: `Business Tools`, `E-Commerce`, `Utilities`, `Communication`, ecc.
- **Icons**: Emoji Unicode (`📦`, `⚡`, `🎯`, ecc.)
- **Versioning**: Semantic Versioning (`MAJOR.MINOR.PATCH`)

---

## 📄 Licenza

MIT License - Copyright (c) 2025 pBielli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🌟 Star History

Se trovi utile questo progetto, lascia una ⭐ su GitHub!

---

## 📞 Supporto

- **Issues**: [GitHub Issues](https://github.com/pBielli/bookmarklet/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pBielli/bookmarklet/discussions)
- **Email**: [Contattami](mailto:your-email@example.com)

---

**Made with ❤️ by pBielli**
