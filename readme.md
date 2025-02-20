# Bookmarklet Table Extractor

Un tool semplice ma potente per estrarre dati dalle tabelle delle pagine web usando bookmarklet.

## Cos'è un Bookmarklet?

Un bookmarklet è un segnalibro speciale che contiene codice JavaScript invece di un URL. Quando viene cliccato, esegue il codice JavaScript sulla pagina web corrente.

## Come Installare

1. Crea un nuovo segnalibro nel tuo browser
2. Come nome, inserisci "Table Extractor" (o il nome che preferisci)
3. Come URL, copia e incolla il seguente codice:
```javascript
javascript:(function(){var s=document.createElement('script');s.src="https://pbielli.github.io/bookmarklet/TableExtractors/infinity/run.js";document.head.appendChild(s)})();
```

## Come Funziona

1. Naviga su una pagina web che contiene una tabella che vuoi estrarre
2. Clicca sul bookmarklet nella tua barra dei segnalibri
3. Il script verrà caricato e processerà automaticamente le tabelle presenti nella pagina

### Dettagli Tecnici

Il bookmarklet funziona in questo modo:
1. Crea un nuovo elemento `<script>`
2. Imposta l'URL del script esterno
3. Aggiunge lo script all'head del documento
4. Lo script principale viene quindi eseguito ed estrae i dati dalle tabelle

## Sviluppo

Per creare un nuovo bookmarklet:

1. Crea il tuo script principale (esempio: `run.js`)
2. Ospita lo script su un server (come GitHub Pages)
3. Usa questo template per creare il bookmarklet:
```javascript
javascript:(function(){
    var s = document.createElement('script');
    s.src = "URL_DEL_TUO_SCRIPT";
    document.head.appendChild(s);
})();
```

## Sicurezza

- Il bookmarklet carica codice da un dominio esterno, assicurati di usare HTTPS
- Verifica sempre il codice sorgente prima di installare bookmarklet da fonti sconosciute
- È consigliato hostare lo script su un dominio che controlli personalmente

## Contribuire

Sentiti libero di aprire issues o pull requests per migliorare il progetto.

## Licenza

[Inserisci qui la tua licenza]
