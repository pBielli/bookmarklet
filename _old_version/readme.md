# Bookmarklet Collection

Una collezione di bookmarklet utili per manipolare e interagire con le pagine web direttamente dal browser.

## Cos'è un Bookmarklet?

Un bookmarklet è un segnalibro che contiene codice JavaScript invece di un URL. Quando viene cliccato, esegue il codice JavaScript sulla pagina corrente, permettendo di aggiungere funzionalità o modificare il contenuto della pagina.

## Come Installare

1. Crea un nuovo segnalibro nel tuo browser
2. Come nome, inserisci una descrizione della funzionalità (es. "Table Extractor")
3. Come URL, incolla il codice JavaScript del bookmarklet che inizia con `javascript:`

### Esempio di Bookmarklet

```javascript
javascript:(function(){
    var s = document.createElement('script');
    s.src = "https://pbielli.github.io/bookmarklet/TableExtractors/infinity/run.js";
    document.head.appendChild(s);
})();
```

## Come Funziona

Il bookmarklet mostrato sopra:
1. Crea un nuovo elemento `<script>`
2. Imposta il suo attributo `src` per puntare al file JavaScript esterno
3. Aggiunge lo script al `<head>` del documento
4. Lo script viene quindi caricato ed eseguito, attivando la funzionalità desiderata

## Come Creare un Nuovo Bookmarklet

1. Scrivi il tuo codice JavaScript in un file separato (es. `run.js`)
2. Ospita il file su GitHub Pages o un altro servizio di hosting
3. Crea il bookmarklet usando questo template:
```javascript
javascript:(function(){
    var s = document.createElement('script');
    s.src = "URL_DEL_TUO_SCRIPT";
    document.head.appendChild(s);
})();
```
4. Sostituisci `URL_DEL_TUO_SCRIPT` con l'URL del tuo file JavaScript

## Best Practices

- Usa una IIFE (Immediately Invoked Function Expression) per evitare conflitti con variabili globali
- Minimizza il codice del bookmarklet per ridurne la dimensione
- Gestisci gli errori appropriatamente
- Verifica che lo script sia caricato correttamente
- Usa commenti nel codice per documentare le funzionalità

## Sicurezza

⚠️ **Attenzione**: I bookmarklet hanno accesso completo alla pagina web. Usa solo bookmarklet da fonti affidabili e verifica sempre il codice prima dell'utilizzo.

## Contribuire

Sentiti libero di contribuire a questo progetto:
1. Fai un fork del repository
2. Crea un nuovo branch per le tue modifiche
3. Invia una pull request

## Licenza

MIT License

Copyright (c) 2025 pBielli

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
