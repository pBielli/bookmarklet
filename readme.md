# 🔖 Bookmarklet Collection

Una collezione moderna e modulare di bookmarklet per migliorare la tua esperienza di navigazione web.

**Versione:** 2.0.0  
**Autore:** pBielli  
**Repository:** [https://github.com/pBielli/bookmarklet](https://github.com/pBielli/bookmarklet)

---

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Demo Live](#-demo-live)
- [Installazione Rapida](#-installazione-rapida)
- [Come Usare la Navbar](#-come-usare-la-navbar)
- [Come Aggiungere un Bookmarklet](#-come-aggiungere-un-bookmarklet)
- [Bookmarklet Disponibili](#-bookmarklet-disponibili)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Sviluppo](#-sviluppo)
- [Licenza](#-licenza)

---

## ✨ Caratteristiche

- 🎯 **Modular Architecture**: Ogni bookmarklet è auto-contenuto e indipendente
- 🔄 **Auto-Update**: Sistema di aggiornamento automatico via GitHub
- 🎨 **Modern UI**: Interfaccia Bootstrap 5 responsive
- 📦 **Gestione Dipendenze**: Caricamento automatico di Bootstrap, ExcelJS e altre librerie
- 🌐 **Cross-Browser**: Compatibile con Chrome, Firefox, Edge, Safari
- 🚀 **Navbar Iniettabile**: Barra di navigazione che può essere caricata su qualsiasi pagina web
- 📱 **Responsive**: Perfettamente utilizzabile su desktop e mobile

---

## 🌐 Demo Live

Visita la pagina del progetto: [https://pbielli.github.io/bookmarklet/app](https://pbielli.github.io/bookmarklet/app)

---

## 🚀 Installazione Rapida

### Metodo 1: Navbar Universale (Raccomandato)

La navbar ti permette di accedere a tutti i bookmarklet da qualsiasi pagina web con un solo click!

**Passo 1:** Crea un nuovo segnalibro nel tuo browser  
**Passo 2:** Dai un nome al segnalibro (es. "🔖 My Bookmarklets")  
**Passo 3:** Incolla questo codice come URL del segnalibro:

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://pbielli.github.io/bookmarklet/app/core/navbar.js?v='+new Date().getTime();document.head.appendChild(s);})();
```

**Passo 4:** Salva il segnalibro

### Metodo 2: Bookmarklet Singoli

Per installare un singolo bookmarklet, sostituisci `FOLDER_NAME` con il nome della cartella del bookmarklet desiderato:

```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://pbielli.github.io/bookmarklet/app/bookmarklets/FOLDER_NAME/main.js?v='+new Date().getTime();document.head.appendChild(s);})();
```

**Esempio per Azzurro ZCS:**
```javascript
javascript:(function(){var s=document.createElement('script');s.src='https://pbielli.github.io/bookmarklet/app/bookmarklets/azzurro-zcs/main.js?v='+new Date().getTime();document.head.appendChild(s);})();
```

---

## 🎯 Come Usare la Navbar

### Attivazione della Navbar

1. **Vai su qualsiasi pagina web** dove vuoi usare i bookmarklet
2. **Clicca sul segnalibro** "🔖 My Bookmarklets" che hai creato
3. **La navbar apparirà** in cima alla pagina con tutti i bookmarklet disponibili

### Funzionalità della Navbar

- **📌 Menu Bookmarklet**: Clicca su qualsiasi bookmarklet per eseguirlo
- **🔖 Brand**: Clicca sul logo per aprire la pagina del progetto
- **✕ Chiudi**: Bottone per rimuovere la navbar dalla pagina
- **📱 Responsive**: Menu hamburger su dispositivi mobili

### Vantaggi della Navbar

✅ **Un solo segnalibro** invece di decine  
✅ **Accesso rapido** a tutti i tuoi strumenti  
✅ **Aggiornamenti automatici** dei bookmarklet  
✅ **Interfaccia consistente** su tutte le pagine  
✅ **Facile da rimuovere** quando non serve  

### Esempio di Utilizzo

```
1. Sei su una pagina Amazon
2. Clicchi sul segnalibro della navbar
3. Compare la barra in cima
4. Clicchi su "📦 Amazon Tools"
5. Il bookmarklet si esegue sulla pagina
6. Quando hai finito, clicchi "✕ Chiudi"
```

---

## 📝 Come Aggiungere un Bookmarklet

### Passo 1: Crea la Struttura

Crea una nuova cartella in `bookmarklets/` con il nome del tuo bookmarklet (usa kebab-case):

```
bookmarklets/
└── my-new-bookmarklet/
    ├── info.json
    ├── main.js
    └── README.md (opzionale)
```

### Passo 2: Configura `info.json`

Crea il file `info.json` con le informazioni del bookmarklet:

```json
{
    "name": "Nome del Bookmarklet",
    "version": "1.0.0",
    "description": "Descrizione breve di cosa fa il bookmarklet",
    "category": "Categoria (es: Business Tools, E-commerce, Utilities)",
    "icon": "📌",
    "author": "TuoNome",
    "dependencies": {
        "bootstrap": true,
        "exceljs": false,
        "customLibs": []
    },
    "permissions": {
        "requiresLogin": false,
        "domains": ["*.example.com", "example.com"]
    },
    "files": {
        "main": "main.js",
        "styles": null,
        "assets": []
    },
    "modules": [],
    "configuration": {
        "configurable": false,
        "settings": {}
    }
}
```

### Passo 3: Scrivi `main.js`

Il file principale deve essere auto-contenuto e seguire questo pattern:

```javascript
/**
 * My New Bookmarklet
 * Version: 1.0.0
 * Author: TuoNome
 */

(function() {
    'use strict';
    
    // Verifica se già caricato
    if (window.MyBookmarkletLoaded) {
        console.log('Bookmarklet già caricato');
        return;
    }
    window.MyBookmarkletLoaded = true;

    // Configurazione
    const CONFIG = {
        baseUrl: 'https://pbielli.github.io/bookmarklet/app',
        version: '1.0.0'
    };

    // Carica dipendenze se necessarie
    function loadDependencies() {
        return new Promise((resolve) => {
            // Carica Bootstrap, ExcelJS, ecc.
            resolve();
        });
    }

    // Logica principale
    async function init() {
        console.log('Inizializzazione bookmarklet...');
        
        await loadDependencies();
        
        // Il tuo codice qui
        alert('Bookmarklet funzionante!');
    }

    // Avvia
    init().catch(error => {
        console.error('Errore bookmarklet:', error);
    });
})();
```

### Passo 4: Registra il Bookmarklet

Aggiungi il tuo bookmarklet al file `bookmarklets.json`:

```json
{
    "bookmarklets": [
        {
            "id": "my-new-bookmarklet",
            "enabled": true,
            "priority": 10
        }
    ]
}
```

### Passo 5: (Opzionale) Crea README.md

Puoi creare un README.md specifico nella cartella del bookmarklet per documentazione dettagliata.

### Passo 6: Test

1. Apri il progetto localmente o su GitHub Pages
2. Verifica che il bookmarklet appaia nella navbar
3. Testa l'esecuzione del bookmarklet
4. Controlla la console per eventuali errori

### Best Practices

✅ **Usa nomi descrittivi** per ID e nomi file  
✅ **Gestisci gli errori** con try-catch  
✅ **Evita conflitti** controllando se già caricato  
✅ **Usa namespace** per evitare collisioni globali  
✅ **Commenta il codice** per facilitare manutenzione  
✅ **Testa su browser diversi** prima di pubblicare  
✅ **Versiona correttamente** seguendo semantic versioning  

---

## 📦 Bookmarklet Disponibili

### 1. 📦 Amazon Tools
**Descrizione**: Strumenti per la gestione e analisi dei dati Amazon  
**Categoria**: E-commerce  
**Domini**: `*.amazon.com`, `*.amazon.it`

### 2. 📊 Azzurro ZCS Suite
**Descrizione**: Suite completa per la gestione di dati e risorse umane  
**Categoria**: Business Tools  
**Moduli**:
- Gestione RH
- Energy Data Processor

**Domini**: `*.azzurrozcs.com`

### 3. 📞 Wildix Tools
**Descrizione**: Strumenti per integrazione con piattaforma Wildix  
**Categoria**: Communication  
**Domini**: `*.wildix.com`

---

## 📁 Struttura del Progetto

```
bookmarklet/
├── index.html              # Pagina principale
├── config.json             # Configurazione globale
├── bookmarklets.json       # Registro bookmarklet
├── info.json              # Informazioni progetto
├── main.js                # Script principale pagina
├── README.md              # Questo file
├── MIGRATION_GUIDE.md     # Guida migrazione
│
├── core/                  # Core system
│   ├── loader.js         # Sistema caricamento
│   ├── registry.js       # Gestione registro
│   └── navbar.js         # Sistema navbar iniettabile
│
├── includes/              # Librerie condivise
│   └── ui/
│       └── styles.css    # Stili globali
│
└── bookmarklets/          # Collezione bookmarklet
    ├── amazon/
    │   ├── info.json
    │   └── main.js
    │
    ├── azzurro-zcs/
    │   ├── info.json
    │   ├── main.js
    │   ├── EnergyDataProcessor.js
    │   └── manageRH/
    │       ├── info.json
    │       ├── add_rh.js
    │       ├── manage_rh.js
    │       ├── select_rh.js
    │       └── use_rh.js
    │
    ├── wildix/
    │   ├── info.json
    │   └── main.js
    │
    └── _template/         # Template per nuovi bookmarklet
        ├── info.json
        └── README.md
```

---

## 🛠 Sviluppo

### Requisiti

- Git
- Browser moderno
- Editor di testo / IDE
- (Opzionale) Server locale per test

### Setup Locale

```bash
# Clone repository
git clone https://github.com/pBielli/bookmarklet.git
cd bookmarklet

# Se usi un server locale (opzionale)
python -m http.server 8000
# oppure
npx http-server
```

Poi apri `http://localhost:8000` nel browser.

### Workflow di Sviluppo

1. Crea un branch per la feature
```bash
git checkout -b feature/my-new-bookmarklet
```

2. Sviluppa il bookmarklet seguendo la guida sopra

3. Testa localmente

4. Commit e push
```bash
git add .
git commit -m "Add: My New Bookmarklet"
git push origin feature/my-new-bookmarklet
```

5. Crea Pull Request su GitHub

### Debug

- Usa **Console del Browser** (F12) per vedere log ed errori
- Verifica il **Network Tab** per controllare il caricamento file
- Testa su **browser differenti** (Chrome, Firefox, Edge, Safari)
- Usa `console.log()` liberamente durante lo sviluppo

---

## 🔧 Configurazione

### config.json

Modifica `config.json` per personalizzare il progetto:

```json
{
    "project": {
        "name": "Bookmarklet Collection",
        "version": "2.0.0",
        "author": "pBielli",
        "repository": "https://github.com/pBielli/bookmarklet",
        "baseUrl": "https://pbielli.github.io/bookmarklet/app"
    },
    "ui": {
        "navbar": {
            "showVersion": true,
            "showLastUpdate": true,
            "logoText": "🔖 Bookmarklets"
        },
        "theme": "dark"
    }
}
```

---

## 🤝 Contribuire

I contributi sono benvenuti! Per contribuire:

1. Fork del repository
2. Crea un branch per la tua feature
3. Commit delle modifiche
4. Push al branch
5. Apri una Pull Request

---

## 📄 Licenza

MIT License - Copyright (c) 2025 pBielli

---

## 🐛 Problemi Noti

- Alcuni siti con CSP (Content Security Policy) stringente potrebbero bloccare l'iniezione
- Su mobile, alcuni bookmarklet potrebbero richiedere più tap per attivarsi
- La navbar potrebbe sovrapporsi a elementi fixed di alcuni siti

---

## 📞 Supporto

- **Issues**: [GitHub Issues](https://github.com/pBielli/bookmarklet/issues)
- **Email**: [Contattami su GitHub](https://github.com/pBielli)
- **Documentation**: Controlla la cartella del singolo bookmarklet per README specifici

---

## 🎉 Crediti

Sviluppato con ❤️ da **pBielli**

Tecnologie utilizzate:
- Bootstrap 5.3.0
- ExcelJS 4.3.0
- GitHub Pages
- Vanilla JavaScript

---

## 📈 Roadmap

- [ ] Sistema di configurazione UI per bookmarklet
- [ ] Export/Import configurazioni
- [ ] Statistiche utilizzo
- [ ] Dark/Light mode switch
- [ ] Supporto multi-lingua
- [ ] API per integrazione terze parti

---

**Ultima modifica:** Febbraio 2026  
**Versione README:** 2.0.0
