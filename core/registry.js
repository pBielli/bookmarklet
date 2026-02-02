/**
 * Sistema di Registro Bookmarklet
 * Legge automaticamente tutti i bookmarklet dalla cartella /bookmarklets
 * e popola la navbar e la griglia
 */

const BookmarkletRegistry = {
    bookmarklets: [],
    config: null,
    baseUrl: '',

    /**
     * Inizializza il registry
     */
    async init() {
        try {
            // Carica configurazione
            await this.loadConfig();

            // Carica lista cartelle bookmarklet
            await this.loadBookmarkletList();

            // Scopri tutti i bookmarklet
            await this.discoverBookmarklets();

            // Popola UI
            this.populateNavbar();
            this.populateGrid();

            // Carica info Git (versione e ultimo update)
            if (this.config.git.enabled) {
                await this.loadGitInfo();
            }

            console.log('✅ Registry inizializzato con', this.bookmarklets.length, 'bookmarklet');
        } catch (error) {
            console.error('❌ Errore inizializzazione registry:', error);
        }
    },

    /**
     * Carica la configurazione globale
     */
    async loadConfig() {
        try {
            const response = await fetch('config.json');
            this.config = await response.json();
            this.baseUrl = this.config.project.baseUrl;
        } catch (error) {
            console.error('⚠️ Impossibile caricare config.json, uso valori di default');
            this.config = {
                project: { version: '1.0.0' },
                git: { enabled: false },
                ui: { navbar: { showVersion: true, showLastUpdate: true } }
            };
        }
    },
    async loadBookmarkletList() {
        try {
            const response = await fetch('bookmarklets.json');
            const bookmarklets_json = await response.json();
            // Usa direttamente l'attributo `bookmarklets` dal json
            this.bookmarklets = bookmarklets_json.bookmarklets || [];
            this.baseUrl = this.config.project.baseUrl;
        } catch (error) {
            console.error('⚠️ Impossibile caricare bookmarklets.json, uso valori di default', error);
            this.bookmarklets = [
                { id: 'Amazon' },
                { id: 'Azzurro-zcs' },
                { id: 'wildix' }
                // Aggiungi qui nuove cartelle bookmarklet
            ];
        }
    },

    /**
     * Scopre automaticamente tutti i bookmarklet
     * Cerca tutte le cartelle in /bookmarklets che contengono info.json
     */
    async discoverBookmarklets() {
        // const bookmarkletFolders = [
        //     'amazon',
        //     'azzurro-zcs',
        //     'wildix'
        //     // Aggiungi qui nuove cartelle bookmarklet
        // ];

        // Ora `this.bookmarklets` contiene gli elementi definiti in bookmarklets.json
        for (let i = 0; i < this.bookmarklets.length; i++) {
            const entry = this.bookmarklets[i] || {};
            const folder = entry.id;
            const defaultEntry = {
                id: folder,
                path: `bookmarklets/${folder}`,
                ...entry
            };
            if (!folder) continue;
            try {
                const infoPath = `bookmarklets/${folder}/info.json`;
                const response = await fetch(infoPath);

                if (response.ok) {
                    const info = await response.json();

                    // Sostituisci/integra l'entry esistente con i dati di info.json
                    this.bookmarklets[i] = { ...defaultEntry, ...info };
                    
                } else {
                    // Mantieni l'entry originale ma assicura il campo path
                    this.bookmarklets[i] = { ...defaultEntry };
                }
            } catch (error) {
                console.warn(`⚠️ Impossibile caricare ${folder}:`, error);
                this.bookmarklets[i] = { ...defaultEntry };
            }
        }
        // Ordina per categoria e nome
        
    },

    /**
     * Popola la navbar con i bookmarklet raggruppati per categoria
     */
    populateNavbar() {
        const menu = document.getElementById('bookmarklet-menu');
        if (!menu) return;

        // Raggruppa per categoria
        const categories = {};
        this.bookmarklets.forEach(bm => {
            if (!categories[bm.category]) {
                categories[bm.category] = [];
            }
            categories[bm.category].push(bm);
        });

        // Crea dropdown per ogni categoria
        Object.keys(categories).forEach(category => {
            const dropdown = document.createElement('li');
            dropdown.className = 'nav-item dropdown';

            dropdown.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" role="button" 
                   data-bs-toggle="dropdown" aria-expanded="false">
                    ${category}
                </a>
                <ul class="dropdown-menu">
                    ${categories[category].map(bm => `
                        <li>
                            <a class="dropdown-item" href="#" 
                               onclick="BookmarkletRegistry.showDetail('${bm.id}'); return false;">
                                ${bm.icon || '📌'} ${bm.name}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;

            menu.appendChild(dropdown);
        });
    },

    /**
     * Popola la griglia principale con card dei bookmarklet
     */
    populateGrid() {
        const grid = document.getElementById('bookmarklet-grid');
        if (!grid) return;

        this.bookmarklets.forEach(bm => {
            const card = document.createElement('div');
            card.className = 'col-md-4 mb-4';

            card.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">
                            <span class="fs-3">${bm.icon || '📌'}</span>
                            ${bm.name}
                        </h5>
                        <p class="card-text text-muted small">${bm.category}</p>
                        <p class="card-text">${bm.description}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-primary btn-sm w-100" 
                                onclick="BookmarkletRegistry.showDetail('${bm.id}')">
                            📖 Dettagli & Codice
                        </button>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    },

    /**
     * Mostra i dettagli di un bookmarklet specifico
     */
    showDetail(id) {
        const bm = this.bookmarklets.find(b => b.id === id);
        if (!bm) return;

        const detailSection = document.getElementById('bookmarklet-detail');
        const titleEl = document.getElementById('detail-title');
        const descEl = document.getElementById('detail-description');
        const codeEl = document.getElementById('detail-code');

        titleEl.textContent = `${bm.icon || '📌'} ${bm.name}`;
        descEl.textContent = bm.description;

        // Genera il codice del bookmarklet
        const bookmarkletCode = this.generateBookmarkletCode(bm);
        codeEl.textContent = bookmarkletCode;

        // Mostra la sezione
        detailSection.style.display = 'block';
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Setup copy button
        const copyBtn = document.getElementById('copy-code-btn');
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(bookmarkletCode);
            copyBtn.textContent = '✅ Copiato!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copia Codice';
            }, 2000);
        };
    },

    /**
     * Genera il codice del bookmarklet
     */
    generateBookmarkletCode(bm) {
        const mainScript = `${this.baseUrl}/${bm.path}/main.js`;

        return `javascript:(function(){
    var s = document.createElement('script');
    s.src = '${mainScript}?v=' + new Date().getTime();
    document.head.appendChild(s);
})();`;
    },

    /**
     * Carica informazioni da GitHub API
     */
    async loadGitInfo() {
        try {
            const response = await fetch(this.config.git.apiUrl);
            const data = await response.json();

            // Aggiorna versione (dalla config)
            const versionEl = document.getElementById('repo-version');
            if (versionEl) {
                versionEl.textContent = `v${this.config.project.version}`;
            }

            // Aggiorna ultimo update (da GitHub)
            const updateEl = document.getElementById('last-update');
            if (updateEl) {
                const lastUpdate = new Date(data.updated_at);
                const formatted = lastUpdate.toLocaleDateString('it-IT');
                updateEl.textContent = `Aggiornato: ${formatted}`;
            }
        } catch (error) {
            console.warn('⚠️ Impossibile caricare info Git:', error);
        }
    }
};

// Export per uso globale
window.BookmarkletRegistry = BookmarkletRegistry;
