/**
 * Sistema di caricamento dinamico delle risorse
 * Gestisce il caricamento intelligente di script, CSS e librerie esterne
 */

const ResourceLoader = {
    loadedResources: new Set(),
    config: null,
    baseUrl : '/bookmarklet/app',

    /**
     * Inizializza il loader con la configurazione
     */
    async init() {
        try {
            const response = await fetch(`${this.baseUrl}/config.json`);
            this.config = await response.json();
        } catch (error) {
            console.warn('⚠️ Config non disponibile per ResourceLoader');
        }
    },

    /**
     * Carica uno script JavaScript
     */
    loadScript(src, options = {}) {
        const fullSrc = this.addVersionParam(src, options.nocache);
        
        // Controlla se già caricato
        if (this.loadedResources.has(fullSrc) && !options.force) {
            console.log(`✅ Script già caricato: ${src}`);
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = fullSrc;
            
            if (options.async) script.async = true;
            if (options.defer) script.defer = true;
            
            script.onload = () => {
                this.loadedResources.add(fullSrc);
                console.log(`✅ Script caricato: ${src}`);
                resolve();
            };
            
            script.onerror = () => {
                console.error(`❌ Errore caricamento script: ${src}`);
                reject(new Error(`Failed to load script: ${src}`));
            };
            
            document.head.appendChild(script);
        });
    },

    /**
     * Carica un foglio di stile CSS
     */
    loadCSS(href, options = {}) {
        const fullHref = this.addVersionParam(href, options.nocache);
        
        // Controlla se già caricato
        if (this.loadedResources.has(fullHref) && !options.force) {
            console.log(`✅ CSS già caricato: ${href}`);
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fullHref;
            
            link.onload = () => {
                this.loadedResources.add(fullHref);
                console.log(`✅ CSS caricato: ${href}`);
                resolve();
            };
            
            link.onerror = () => {
                console.error(`❌ Errore caricamento CSS: ${href}`);
                reject(new Error(`Failed to load CSS: ${href}`));
            };
            
            document.head.appendChild(link);
        });
    },

    /**
     * Carica più risorse in parallelo
     */
    async loadMultiple(resources) {
        const promises = resources.map(resource => {
            if (resource.type === 'script') {
                return this.loadScript(resource.src, resource.options);
            } else if (resource.type === 'css') {
                return this.loadCSS(resource.href, resource.options);
            }
        });

        return Promise.all(promises);
    },

    /**
     * Carica tutte le dipendenze comuni (utils, Bootstrap, etc.)
     */
    async loadCommonDependencies() {
        const baseUrl = this.config?.project?.baseUrl || '';
        
        const resources = [
            // Utils
            { type: 'script', src: `${baseUrl}/includes/utils/utils.js` },
            { type: 'script', src: `${baseUrl}/includes/utils/excel_functions.js` },
            { type: 'script', src: `${baseUrl}/includes/utils/image_functions.js` },
            
            // UI
            { type: 'css', href: `${baseUrl}/includes/ui/styles.css` }
        ];

        try {
            await this.loadMultiple(resources);
            console.log('✅ Dipendenze comuni caricate');
        } catch (error) {
            console.error('❌ Errore caricamento dipendenze comuni:', error);
        }
    },

    /**
     * Carica Bootstrap (se non già presente)
     */
    async loadBootstrap() {
        if (!this.config?.includes?.bootstrap?.enabled) return;

        const { css, js } = this.config.includes.bootstrap;
        
        try {
            await this.loadCSS(css);
            await this.loadScript(js);
            console.log('✅ Bootstrap caricato');
        } catch (error) {
            console.error('❌ Errore caricamento Bootstrap:', error);
        }
    },

    /**
     * Carica ExcelJS (se non già presente)
     */
    async loadExcelJS() {
        if (!this.config?.includes?.excelJs?.enabled) return;

        const { url } = this.config.includes.excelJs;
        
        try {
            await this.loadScript(url);
            console.log('✅ ExcelJS caricato');
        } catch (error) {
            console.error('❌ Errore caricamento ExcelJS:', error);
        }
    },

    /**
     * Aggiunge parametro di versione per evitare cache
     */
    addVersionParam(url, nocache = false) {
        if (!nocache) return url;
        
        const separator = url.includes('?') ? '&' : '?';
        const timestamp = new Date().getTime();
        return `${url}${separator}v=${timestamp}`;
    },

    /**
     * Verifica se una risorsa è già stata caricata
     */
    isLoaded(src) {
        // Cerca negli script già caricati
        const scripts = Array.from(document.getElementsByTagName('script'));
        const links = Array.from(document.getElementsByTagName('link'));
        
        return scripts.some(s => s.src.includes(src)) || 
               links.some(l => l.href.includes(src)) ||
               this.loadedResources.has(src);
    }
};

// Export per uso globale
window.ResourceLoader = ResourceLoader;

// Inizializza automaticamente
ResourceLoader.init();
