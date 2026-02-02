(function() {
  // Funzione per caricare CSS
  function loadCSS(href) {
    return new Promise((resolve, reject) => {
      if(document.querySelector(`link[href="${href}"]`)) return resolve(); // evita doppio load
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Funzione per caricare JS
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if(document.querySelector(`script[src="${src}"]`)) return resolve(); // evita doppio load
      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  // Funzione principale
  async function init() {
    try {
      // Carica Bootstrap
      await loadCSS("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js");

      // Carica core
      await loadScript("core/loader.js");
      await loadScript("core/registry.js");
      // Se questo è navbar.js stesso, non serve ricaricare se stesso

      // Inizializzazione
      if(window.BookmarkletRegistry?.init) {
        BookmarkletRegistry.init();
      } else {
        console.warn("BookmarkletRegistry non trovato, init non eseguita");
      }
    } catch(err) {
      console.error("Errore nel caricamento dei script:", err);
    }
  }

  // Esegui subito
  init();
})();
