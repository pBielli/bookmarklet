// === CONFIG ===
const BASE_URL = "https://pbielli.github.io/bookmarklet/";
const UTILS_URL = `${BASE_URL}/includes/Utils/utils.js`;

// === BOOTSTRAP ===
includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "script");
includeResource("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "css");

// === UTILS ===
!document.querySelector(`script[src="${UTILS_URL}"]`) &&
    document.head.appendChild(Object.assign(document.createElement('script'), { src: UTILS_URL, id: "bookmarklet_utils" }));

document.querySelector(`script[src="${UTILS_URL}"]`).addEventListener("load", () => {
    startup();
});

// === STARTUP ===
async function startup() {
    // Includi risorse comuni
    includeResource(`${BASE_URL}/includes/Bootstrap/navbar.js`, "script");

    // Attendi il caricamento della navbar
    await wait(1000);

    // Costruisci la navbar dinamicamente
    buildDynamicNavbar();
}

// === FUNZIONE PRINCIPALE ===
async function buildDynamicNavbar() {
    const currentHost = window.location.hostname;
    const logoSrc = 'https://www.cemambiente.it/wp-content/themes/cemAmbiente/img/logo_50.png';
    const logoAlt = 'Logo PAT';

    const dataUrl = `${BASE_URL}/bookmarklets/data.json`;

    try {
        const response = await fetch(dataUrl);
        const paths = await response.json();

        const bookmarkletDropdown = {
            type: "dropdown",
            title: "Bookmarklets disponibili",
            elements: [],
        };

        for (const path of paths) {
            const infoUrl = `${BASE_URL}/bookmarklets/${path}/info.json`;
            try {
                const infoResponse = await fetch(infoUrl);
                const info = await infoResponse.json();

                if (isSiteCompatible(currentHost, info.sitiCompatibili)) {
                    const jsFiles = await listJSFiles(path);

                    bookmarkletDropdown.elements.push({
                        type: "button",
                        title: info.nome,
                        onclick: () => {
                            jsFiles.forEach(jsFile => {
                                includeResource(`${BASE_URL}/bookmarklets/${path}/${jsFile}`, "script");
                            });
                            alert(`Caricati script per: ${info.nome}`);
                        }
                    });
                }
            } catch (err) {
                console.warn(`Errore nel caricamento di info.json per ${path}:`, err);
            }
        }

        const navItems = [
            { type: "link", title: "Repository", href: "https://github.com/pBielli/bookmarklet" },
            bookmarkletDropdown,
        ];

        insertNavbar(logoSrc, logoAlt, navItems);

    } catch (err) {
        console.error("Errore nel caricamento di data.json:", err);
    }
}

// === STRUMENTI ===

// Verifica compatibilità dell'host con le maschere specificate
function isSiteCompatible(host, patterns) {
    return patterns.some(pattern => {
        if (pattern === "*" || pattern === ".*") return true;
        pattern = pattern.replace(/\./g, "\\.").replace(/\*/g, ".*");
        const regex = new RegExp(`^${pattern}$`, "i");
        return regex.test(host);
    });
}

// Lista dei file JS in una directory remota (simulata)
async function listJSFiles(path) {
    // Da ottimizzare in futuro: se vuoi precisione, usa un file manifest invece
    const knownFiles = {
        "Amazon/manageRH": ["add_rh.js", "manage_rh.js", "select_rh.js", "use_rh.js"],
        "AzzurroZCS": ["EnergyDataProcessor.js", "main.js"],
        "TableExtractors/infinity": ["dataExtractor_infinity.js", "run.js"],
        "TableExtractors/relax": ["extractor_cl.js"],
        "Wildix": ["onoff.js"]
    };

    return knownFiles[path] || [];
}

// Aspetta N millisecondi
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
