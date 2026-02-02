/**
 * BOOKMARKLET TEMPLATE
 * Rinomina questo file e personalizza la logica
 */

(async function() {
    'use strict';
    
    // Configurazione base
    const CONFIG = {
        name: 'Nome Bookmarklet',
        version: '1.0.0',
        baseUrl: 'https://pbielli.github.io/bookmarklet'
    };

    console.log(`🚀 Avvio ${CONFIG.name} v${CONFIG.version}`);

    // === CARICAMENTO DIPENDENZE ===
    
    /**
     * Carica il ResourceLoader se non già presente
     */
    async function loadResourceLoader() {
        if (window.ResourceLoader) {
            console.log('✅ ResourceLoader già disponibile');
            return;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `${CONFIG.baseUrl}/core/loader.js?v=${Date.now()}`;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Carica le dipendenze comuni necessarie
     */
    async function loadDependencies() {
        try {
            await loadResourceLoader();
            
            // Inizializza ResourceLoader
            if (!window.ResourceLoader.config) {
                await window.ResourceLoader.init();
            }

            // Carica dipendenze comuni
            await window.ResourceLoader.loadCommonDependencies();
            
            // Carica Bootstrap se necessario
            // await window.ResourceLoader.loadBootstrap();
            
            // Carica ExcelJS se necessario
            // await window.ResourceLoader.loadExcelJS();
            
            console.log('✅ Dipendenze caricate');
        } catch (error) {
            console.error('❌ Errore caricamento dipendenze:', error);
            throw error;
        }
    }

    // === LOGICA PRINCIPALE ===
    
    /**
     * Funzione principale del bookmarklet
     */
    async function main() {
        try {
            // Esempio: Carica dipendenze
            await loadDependencies();
            
            // === QUI INSERISCI LA TUA LOGICA ===
            
            console.log('🎯 Bookmarklet eseguito con successo!');
            
            // Esempio di utilizzo delle funzioni comuni
            // const data = extractTableData();
            // await exportToExcel(data, 'export');
            
            // === FINE LOGICA ===
            
        } catch (error) {
            console.error('❌ Errore nell\'esecuzione:', error);
            alert(`Errore: ${error.message}`);
        }
    }

    // === FUNZIONI HELPER ===
    
    /**
     * Esempio: Estrae dati da una tabella
     */
    function extractTableData() {
        const tables = document.querySelectorAll('table');
        if (tables.length === 0) {
            throw new Error('Nessuna tabella trovata nella pagina');
        }
        
        // Logica di estrazione...
        return [];
    }

    // === AVVIO ===
    
    // Esegui la funzione principale
    main();
    
})();
