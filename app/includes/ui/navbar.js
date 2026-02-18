/**
 * Bookmarklet Navbar Loader
 * Sistema di navbar iniettabile in qualsiasi pagina web
 * Version: 2.0.0
 * Author: pBielli
 */

(function() {
    'use strict';
    
    // Configurazione
    const CONFIG = {
        baseUrl: 'https://pbielli.github.io/bookmarklet/app',
        repoOwner: 'pbielli',
        repoName: 'bookmarklet',
        navbarId: 'bookmarklet-navbar-injected',
        zIndex: 999999,
        animationDuration: 300
    };

    // Verifica se la navbar è già presente
    if (document.getElementById(CONFIG.navbarId)) {
        console.log('Navbar già presente, rimozione...');
        removeNavbar();
        return;
    }

    // Funzione per rimuovere la navbar
    function removeNavbar() {
        const navbar = document.getElementById(CONFIG.navbarId);
        if (navbar) {
            navbar.style.animation = `slideOut ${CONFIG.animationDuration}ms ease-out`;
            setTimeout(() => {
                navbar.remove();
                document.body.style.paddingTop = '0';
            }, CONFIG.animationDuration);
        }
    }

    // Carica le dipendenze necessarie
    function loadDependencies() {
        return new Promise((resolve, reject) => {
            const dependencies = [];

            if (!document.querySelector('link[href*="bootstrap"]')) {
                const bootstrapCSS = document.createElement('link');
                bootstrapCSS.rel = 'stylesheet';
                bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
                document.head.appendChild(bootstrapCSS);
                dependencies.push(new Promise(resolve => {
                    bootstrapCSS.onload = resolve;
                }));
            }

            if (typeof window.bootstrap === 'undefined') {
                const bootstrapJS = document.createElement('script');
                bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
                document.head.appendChild(bootstrapJS);
                dependencies.push(new Promise(resolve => {
                    bootstrapJS.onload = resolve;
                }));
            }

            Promise.all(dependencies).then(resolve).catch(reject);
        });
    }

    // Carica la configurazione dei bookmarklet
    async function loadBookmarklets() {
        try {
            const response = await fetch(`${CONFIG.baseUrl}/bookmarklets.json?v=${Date.now()}`);
            const data = await response.json();
            return data.bookmarklets.filter(b => b.enabled);
        } catch (error) {
            console.error('Errore nel caricamento bookmarklets:', error);
            return [];
        }
    }

    // Carica le informazioni di un bookmarklet
    async function loadBookmarkletInfo(bookmarkletId) {
        try {
            const response = await fetch(`${CONFIG.baseUrl}/bookmarklets/${bookmarkletId}/info.json?v=${Date.now()}`);
            return await response.json();
        } catch (error) {
            console.error(`Errore caricamento info per ${bookmarkletId}:`, error);
            return null;
        }
    }

    // Carica info repo da GitHub API (ultima modifica + dati creatore)
    async function loadRepoInfo() {
        try {
            const response = await fetch(`https://api.github.com/repos/${CONFIG.repoOwner}/${CONFIG.repoName}`);
            if (!response.ok) throw new Error('GitHub API error');
            const data = await response.json();

            const pushedAt = new Date(data.pushed_at);
            const formattedDate = pushedAt.toLocaleDateString('it-IT', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
            const formattedTime = pushedAt.toLocaleTimeString('it-IT', {
                hour: '2-digit', minute: '2-digit'
            });

            return {
                lastUpdate: `${formattedDate} ${formattedTime}`,
                ownerLogin: data.owner.login,
                ownerAvatar: data.owner.avatar_url,
                ownerUrl: data.owner.html_url,
                repoUrl: data.html_url,
                version: data.default_branch || 'main'
            };
        } catch (error) {
            console.warn('Impossibile caricare info repo da GitHub API:', error);
            return null;
        }
    }

    // Crea la struttura HTML della navbar
    function createNavbarHTML(bookmarklets, repoInfo) {
        const navbar = document.createElement('nav');
        navbar.id = CONFIG.navbarId;
        navbar.className = 'navbar navbar-expand-lg navbar-dark bg-dark';
        navbar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: ${CONFIG.zIndex};
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            animation: slideIn ${CONFIG.animationDuration}ms ease-out;
        `;

        const container = document.createElement('div');
        container.className = 'container-fluid';

        // Brand
        const brand = document.createElement('a');
        brand.className = 'navbar-brand';
        brand.href = '#';
        brand.innerHTML = '📚 Bookmarklets';
        brand.style.cursor = 'pointer';
        brand.onclick = (e) => {
            e.preventDefault();
            window.open(repoInfo?.repoUrl || CONFIG.baseUrl, '_blank');
        };

        // Toggle button per mobile
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'navbar-toggler';
        toggleBtn.type = 'button';
        toggleBtn.setAttribute('data-bs-toggle', 'collapse');
        toggleBtn.setAttribute('data-bs-target', '#navbarContent');
        toggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>';

        // Contenitore collapsible
        const collapse = document.createElement('div');
        collapse.className = 'collapse navbar-collapse';
        collapse.id = 'navbarContent';

        // Menu bookmarklet — raggruppato per categoria (come registry.js populateNavbar)
        const menu = document.createElement('ul');
        menu.className = 'navbar-nav me-auto mb-2 mb-lg-0';

        // Raggruppa per categoria
        const categories = {};
        bookmarklets.forEach(bm => {
            const cat = bm.category || 'Altro';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(bm);
        });

        // Un dropdown Bootstrap per ogni categoria
        Object.keys(categories).forEach(category => {
            const li = document.createElement('li');
            li.className = 'nav-item dropdown';

            const toggle = document.createElement('a');
            toggle.className = 'nav-link dropdown-toggle';
            toggle.href = '#';
            toggle.setAttribute('role', 'button');
            toggle.setAttribute('data-bs-toggle', 'dropdown');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = category;

            const dropdownMenu = document.createElement('ul');
            dropdownMenu.className = 'dropdown-menu dropdown-menu-dark';

            categories[category].forEach(bm => {
                const item = document.createElement('li');
                const a = document.createElement('a');
                a.className = 'dropdown-item';
                a.href = '#';
                a.textContent = `${bm.icon || '📌'} ${bm.name}`;
                a.onclick = (e) => {
                    e.preventDefault();
                    executeBookmarklet(bm.id);
                };
                item.appendChild(a);
                dropdownMenu.appendChild(item);
            });

            li.appendChild(toggle);
            li.appendChild(dropdownMenu);
            menu.appendChild(li);
        });

        // === SEZIONE DESTRA: info repo + creatore + chiudi ===
        const rightSection = document.createElement('div');
        rightSection.className = 'd-flex align-items-center gap-2';

        // Info versione e ultima modifica (come index.html)
        if (repoInfo) {
            const infoText = document.createElement('div');
            infoText.className = 'navbar-text text-light';
            infoText.style.fontFamily = "'Courier New', monospace";
            infoText.innerHTML = `<small>🕐 ${repoInfo.lastUpdate}</small>`;
            rightSection.appendChild(infoText);
        }

        // Bottone creatore repo con avatar
        if (repoInfo?.ownerLogin) {
            const creatorBtn = document.createElement('a');
            creatorBtn.href = repoInfo.ownerUrl;
            creatorBtn.target = '_blank';
            creatorBtn.rel = 'noopener noreferrer';
            creatorBtn.title = `Creatore: ${repoInfo.ownerLogin}`;
            creatorBtn.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 6px;
                text-decoration: none;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 20px;
                padding: 3px 10px 3px 3px;
                color: white;
                font-size: 0.85rem;
                transition: background 0.2s;
                cursor: pointer;
            `;
            creatorBtn.onmouseover = () => creatorBtn.style.background = 'rgba(255,255,255,0.2)';
            creatorBtn.onmouseout = () => creatorBtn.style.background = 'rgba(255,255,255,0.1)';

            const avatar = document.createElement('img');
            avatar.src = repoInfo.ownerAvatar;
            avatar.alt = repoInfo.ownerLogin;
            avatar.style.cssText = 'width:24px; height:24px; border-radius:50%; object-fit:cover;';

            const loginSpan = document.createElement('span');
            loginSpan.textContent = repoInfo.ownerLogin;

            creatorBtn.appendChild(avatar);
            creatorBtn.appendChild(loginSpan);
            rightSection.appendChild(creatorBtn);
        }

        // Bottone chiusura
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-sm btn-outline-light';
        closeBtn.textContent = '✕ Chiudi';
        closeBtn.onclick = removeNavbar;
        rightSection.appendChild(closeBtn);

        collapse.appendChild(menu);
        collapse.appendChild(rightSection);

        container.appendChild(brand);
        container.appendChild(toggleBtn);
        container.appendChild(collapse);
        navbar.appendChild(container);

        return navbar;
    }

    // Esegue un bookmarklet
    function executeBookmarklet(bookmarkletId) {
        const script = document.createElement('script');
        script.src = `${CONFIG.baseUrl}/bookmarklets/${bookmarkletId}/main.js?v=${Date.now()}`;
        script.onerror = () => {
            alert(`Errore nel caricamento del bookmarklet: ${bookmarkletId}`);
        };
        document.head.appendChild(script);
    }

    // Aggiungi gli stili per le animazioni
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }

            #${CONFIG.navbarId} .nav-link:hover {
                background-color: rgba(255,255,255,0.1);
                border-radius: 4px;
            }

            #${CONFIG.navbarId} .navbar-brand:hover {
                color: #ffc107 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Funzione principale di inizializzazione
    async function init() {
        try {
            // Mostra loader
            const loader = document.createElement('div');
            loader.id = 'bookmarklet-loader';
            loader.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                z-index: ${CONFIG.zIndex + 1};
                font-family: Arial, sans-serif;
            `;
            loader.textContent = 'Caricamento bookmarklet navbar...';
            document.body.appendChild(loader);

            // Carica dipendenze e dati in parallelo dove possibile
            await loadDependencies();

            const [bookmarkletList, repoInfo] = await Promise.all([
                loadBookmarklets(),
                loadRepoInfo()
            ]);

            // Carica info per ogni bookmarklet
            const bookmarkletsWithInfo = await Promise.all(
                bookmarkletList.map(async (b) => {
                    const info = await loadBookmarkletInfo(b.id);
                    return {
                        id: b.id,
                        name: info?.name || b.id,
                        icon: info?.icon || '📌',
                        ...info
                    };
                })
            );

            // Inietta stili
            injectStyles();

            // Crea e inserisci navbar
            const navbar = createNavbarHTML(bookmarkletsWithInfo, repoInfo);
            document.body.insertBefore(navbar, document.body.firstChild);

            // Aggiungi padding al body per evitare sovrapposizioni
            const navbarHeight = navbar.offsetHeight;
            document.body.style.paddingTop = `${navbarHeight}px`;
            document.body.style.transition = 'padding-top 0.3s ease';

            // Rimuovi loader
            loader.remove();

            console.log('Bookmarklet navbar caricata con successo!');
        } catch (error) {
            console.error('Errore inizializzazione navbar:', error);
            alert('Errore nel caricamento della navbar dei bookmarklet');
            const loader = document.getElementById('bookmarklet-loader');
            if (loader) loader.remove();
        }
    }

    // Avvia l'inizializzazione
    init();
})();