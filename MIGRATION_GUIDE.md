# 🔄 Guida alla Migrazione - Nuova Struttura Bookmarklet

Questa guida ti aiuterà a migrare dalla vecchia struttura alla nuova organizzazione modulare.

## 📊 Panoramica delle Modifiche

### Prima (Struttura Vecchia)
```
bookmarklet/
├── bookmarklets/
│   ├── Amazon/
│   ├── AzzurroZCS/
│   ├── Wildix/
│   └── data.json
├── core/
│   └── core.js
└── includes/
    ├── Bootstrap/
    └── Utils/
```

### Dopo (Struttura Nuova)
```
bookmarklet/
├── index.html              # 🆕 Entry point
├── config.json             # 🆕 Config globale
├── core/
│   ├── loader.js          # 🆕 Sistema caricamento
│   ├── registry.js        # 🆕 Registro bookmarklet
│   └── core.js
├── includes/
│   ├── ui/                # 🆕 Componenti UI
│   ├── libs/              # Librerie esterne
│   └── utils/             # Utilities
└── bookmarklets/
    ├── _template/         # 🆕 Template standard
    ├── amazon/            # Rinominato (lowercase)
    ├── azzurro-zcs/       # Rinominato
    └── wildix/
```

---

## 🛠️ Passi per la Migrazione

### STEP 1: Backup
```bash
# Crea un backup della struttura attuale
cp -r bookmarklet bookmarklet_backup_$(date +%Y%m%d)
```

### STEP 2: Crea Nuovi File Core

#### 2.1 Crea `index.html`
- Copia il file `/home/claude/index.html` nella root del repository
- Questo sarà il nuovo entry point principale

#### 2.2 Crea `config.json`
- Copia il file `/home/claude/config.json` nella root
- Aggiorna i valori con i tuoi dati specifici:
  - `project.repository`: il tuo repo GitHub
  - `project.baseUrl`: l'URL GitHub Pages
  - `git.apiUrl`: l'URL API del tuo repo

#### 2.3 Crea sistema Core
```bash
# Crea le nuove directory
mkdir -p core
mkdir -p includes/ui
mkdir -p includes/libs
mkdir -p bookmarklets/_template

# Copia i nuovi file core
cp /home/claude/core/loader.js core/
cp /home/claude/core/registry.js core/

# Mantieni il vecchio core.js se necessario
# mv core/core.js core/core.legacy.js
```

#### 2.4 Crea UI e Stili
```bash
cp /home/claude/includes/ui/styles.css includes/ui/
```

---

### STEP 3: Migra i Bookmarklet Esistenti

#### 3.1 Rinomina le cartelle (lowercase e kebab-case)
```bash
cd bookmarklets/

# Amazon → amazon
mv Amazon amazon

# AzzurroZCS → azzurro-zcs
mv AzzurroZCS azzurro-zcs

# Wildix → wildix
mv Wildix wildix
```

#### 3.2 Crea `info.json` per ogni bookmarklet

**Esempio per Amazon:**
```json
{
  "name": "Amazon Tools",
  "version": "1.0.0",
  "description": "Strumenti per Amazon",
  "category": "E-Commerce",
  "icon": "📦",
  "author": "pBielli",
  "dependencies": {
    "bootstrap": true,
    "exceljs": false
  }
}
```

Salva come `bookmarklets/amazon/info.json`

**Esempio per AzzurroZCS:**
```json
{
  "name": "Azzurro ZCS Suite",
  "version": "2.0.0",
  "description": "Suite completa per gestione Azzurro ZCS",
  "category": "Business Tools",
  "icon": "⚡",
  "author": "pBielli",
  "dependencies": {
    "bootstrap": true,
    "exceljs": true
  }
}
```

Salva come `bookmarklets/azzurro-zcs/info.json`

**Esempio per Wildix:**
```json
{
  "name": "Wildix On/Off",
  "version": "1.0.0",
  "description": "Toggle Wildix status",
  "category": "Communication",
  "icon": "📞",
  "author": "pBielli",
  "dependencies": {
    "bootstrap": false,
    "exceljs": false
  }
}
```

Salva come `bookmarklets/wildix/info.json`

#### 3.3 Rinomina e adatta main.js

Per ogni bookmarklet, assicurati di avere un file `main.js` standardizzato:

```bash
# Se hai già un file principale (es. bookmarklet.html o run.js)
cd bookmarklets/amazon
mv bookmarklet.html main.js  # oppure run.js → main.js
```

Modifica `main.js` per usare il ResourceLoader:

```javascript
(async function() {
    'use strict';
    
    const CONFIG = {
        name: 'Amazon Tools',
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
        // Se necessario Bootstrap:
        // await window.ResourceLoader.loadBootstrap();
    }

    // Logica principale
    async function main() {
        await loadDependencies();
        
        // === LA TUA LOGICA QUI ===
        console.log('Bookmarklet Amazon avviato!');
    }

    main();
})();
```

---

### STEP 4: Aggiorna il Registry

Modifica `core/registry.js` aggiungendo i tuoi bookmarklet nella funzione `discoverBookmarklets()`:

```javascript
async discoverBookmarklets() {
    const bookmarkletFolders = [
        'amazon',
        'azzurro-zcs',
        'wildix'
        // Aggiungi qui nuovi bookmarklet
    ];
    // ...resto del codice
}
```

---

### STEP 5: Crea il Template

Copia il template nella cartella `_template`:

```bash
cp /home/claude/bookmarklets/_template/info.json bookmarklets/_template/
cp /home/claude/bookmarklets/_template/main.js bookmarklets/_template/
cp /home/claude/bookmarklets/_template/README.md bookmarklets/_template/
```

---

### STEP 6: Riorganizza Includes

```bash
# Sposta utilities
mkdir -p includes/utils
mv includes/Utils/excel_functions.js includes/utils/
mv includes/Utils/image_functions.js includes/utils/
mv includes/Utils/utils.js includes/utils/

# Sposta Bootstrap (se necessario)
mkdir -p includes/libs/bootstrap
mv includes/Bootstrap/* includes/libs/bootstrap/

# Rimuovi vecchie cartelle
rm -rf includes/Utils
rm -rf includes/Bootstrap
```

---

### STEP 7: Test

1. **Avvia un server locale:**
```bash
# Opzione 1: Python
python -m http.server 8000

# Opzione 2: Node.js
npx http-server -p 8000
```

2. **Apri il browser:**
```
http://localhost:8000/index.html
```

3. **Verifica:**
   - La navbar mostra tutti i bookmarklet
   - Le card sono visualizzate correttamente
   - Cliccando su un bookmarklet, appare il dettaglio
   - Il codice del bookmarklet è generato correttamente

---

### STEP 8: Deploy su GitHub Pages

```bash
git add .
git commit -m "🚀 Migrazione a nuova struttura modulare"
git push origin main
```

Attendi che GitHub Pages si aggiorni (~1 minuto), poi visita:
```
https://TUO_USERNAME.github.io/bookmarklet/
```

---

## ✅ Checklist Migrazione

- [ ] Backup creato
- [ ] `index.html` copiato e configurato
- [ ] `config.json` creato e personalizzato
- [ ] `core/loader.js` e `core/registry.js` creati
- [ ] `includes/ui/styles.css` creato
- [ ] Cartelle bookmarklet rinominate (lowercase)
- [ ] `info.json` creato per ogni bookmarklet
- [ ] `main.js` standardizzato per ogni bookmarklet
- [ ] Template `_template/` creato
- [ ] Includes riorganizzati
- [ ] Test locale completato
- [ ] Deploy su GitHub Pages
- [ ] Navbar funzionante
- [ ] Bookmarklet testati e funzionanti

---

## 🎯 Vantaggi della Nuova Struttura

✅ **Entry point unico** (`index.html`) con interfaccia professionale
✅ **Auto-discovery**: aggiungi un bookmarklet e appare automaticamente
✅ **Standardizzazione**: tutti i bookmarklet seguono lo stesso pattern
✅ **Configurazione centralizzata** in `config.json`
✅ **Sistema di caricamento intelligente** (ResourceLoader)
✅ **Template pronto**: crea nuovi bookmarklet in 2 minuti
✅ **Versionamento automatico**: info da GitHub API
✅ **Navbar dinamica** con menu a tendina per categoria

---

## 🆕 Come Aggiungere un Nuovo Bookmarklet

1. **Copia il template:**
```bash
cp -r bookmarklets/_template bookmarklets/mio-nuovo-bookmarklet
```

2. **Modifica `info.json`:**
```json
{
  "name": "Mio Nuovo Tool",
  "description": "Fa cose incredibili",
  "category": "Utilities",
  "icon": "🎨"
}
```

3. **Scrivi la logica in `main.js`:**
```javascript
async function main() {
    await loadDependencies();
    console.log('Il mio bookmarklet!');
    // La tua logica qui
}
```

4. **Aggiungi al registry:**
Apri `core/registry.js` e aggiungi `'mio-nuovo-bookmarklet'` all'array.

5. **Fatto!** Apparirà automaticamente nella navbar e nella griglia.

---

## 🐛 Troubleshooting

**Problema: Bookmarklet non appare nella navbar**
- Verifica che `info.json` sia valido
- Controlla che il nome della cartella sia in `core/registry.js`
- Verifica la console per errori

**Problema: Errore caricamento dipendenze**
- Controlla che `config.json` sia valido
- Verifica i path in `baseUrl`
- Controlla la console del browser

**Problema: Codice bookmarklet non funziona**
- Verifica che il path in `main.js` sia corretto
- Controlla che ResourceLoader sia caricato
- Testa localmente prima di deployare

---

## 📞 Supporto

Per problemi o domande, apri una issue su GitHub.

**Buona migrazione! 🚀**
