

class EnergyDataProcessor {
    constructor() {
        this.energyCards = []; // Oggetto per memorizzare le card di energia
        this.energyData = [];  // Oggetto per memorizzare i risultati elaborati
    }

    // Funzione per estrarre e convertire i valori dal testo
    parseValue(value) {
        return parseFloat(value.replace(',', '.').trim()) || 0; // Gestione valori non numerici
    }

    // Funzione per aggiungere elementi al dizionario delle energyCards
    addEnergyCard(title, element) {
        var subtitle = element.querySelector(".energy-card-subtitle").innerText.trim();
        var key = title + " - " + subtitle;
        this.energyCards[key] = element;
    }

    // Funzione per aggiornare i dati per una specifica categoria
    updateEnergyData(category, min, max, media, totale) {
        if (!this.energyData[category]) {
            this.energyData[category] = {}; // Inizializza la categoria se non esiste
        }

        this.energyData[category] = {
            min: min,
            max: max,
            media: media,
            totale: totale
        };
    }

    // Funzione per analizzare i dati di una singola card e aggiornarli in energyData
    analyzeCardData(title, card) {
        var min = this.parseValue(card.querySelector('.energy-card-row.white .energy-card-value')?.textContent || '0');
        var max = this.parseValue(card.querySelector('.energy-card-row:not(.white) .energy-card-value')?.textContent || '0');
        var media = this.parseValue(card.querySelectorAll('.energy-card-row.white')[1]?.querySelector('.energy-card-value')?.textContent || '0');
        var totale = this.parseValue(card.querySelectorAll('.energy-card-row:not(.white)')[1]?.querySelector('.energy-card-value')?.textContent || '0');

        this.updateEnergyData(title, min, max, media, totale);
    }

    // Funzione per selezionare tutte le card di energia e organizzare i dati
    collectEnergyCards() {
        document.querySelectorAll('.energy-card').forEach((card) => {
            var title = card.querySelector('.energy-card-title').textContent.trim();
            
            if (card.childNodes.length > 2) {
                // Card completa
                this.energyCards[title] = card;
            } else {
                // Card con sottoelementi
                var children = card.lastChild.childNodes;
                this.addEnergyCard(title, children[0]);
                this.addEnergyCard(title, children[1]);
            }
        });
    }

    // Funzione principale per elaborare i dati di energia
    processEnergyData() {
        this.collectEnergyCards();

        Object.keys(this.energyCards).forEach((title) => {
            this.analyzeCardData(title, this.energyCards[title]);
        });

        return this.energyData; // Mostra i risultati elaborati
    }
}
