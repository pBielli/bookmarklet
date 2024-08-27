if (typeof BTS_NAVBARJS !== 'undefined')
    throw new Error("Script yet included!");
    
var BTS_NAVBARJS=true;

// Funzione per creare la navbar
function createNavbar(logoSrc, logoAlt) {
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

    const container = document.createElement('div');
    container.classList.add('container-fluid');
    navbar.appendChild(container);

    // Crea il logo
    const logo = document.createElement('a');
    logo.classList.add('navbar-brand');
    logo.href = '#';
    const logoImage = document.createElement('img');
    logoImage.src = logoSrc;
    logoImage.alt = logoAlt;
    logoImage.style.width = '150px'; // Modifica la dimensione come necessario
    logo.appendChild(logoImage);
    container.appendChild(logo);

    // Crea il bottone per il menu collassabile
    const navbarToggler = document.createElement('button');
    navbarToggler.classList.add('navbar-toggler');
    navbarToggler.type = 'button';
    navbarToggler.setAttribute('data-bs-toggle', 'collapse');
    navbarToggler.setAttribute('data-bs-target', '#navbarNav');
    navbarToggler.setAttribute('aria-controls', 'navbarNav');
    navbarToggler.setAttribute('aria-expanded', 'false');
    navbarToggler.setAttribute('aria-label', 'Toggle navigation');
    navbarToggler.innerHTML = '<span class="navbar-toggler-icon"></span>';
    container.appendChild(navbarToggler);

    // Crea la sezione collapsible
    const collapse = document.createElement('div');
    collapse.classList.add('collapse', 'navbar-collapse');
    collapse.id = 'navbarNav';
    container.appendChild(collapse);

    // Crea il contenitore per i link della navbar
    const navbarNav = document.createElement('ul');
    navbarNav.classList.add('navbar-nav');
    collapse.appendChild(navbarNav);

    return { navbar, navbarNav };
}

// Funzione per creare un elemento della navbar
function createNavbarElement(element) {
    switch (element.type) {
        case 'button':
            return createButton(element);
        case 'link':
            return createLink(element);
        case 'separator':
            return createSeparator();
        case 'dropdown':
            return createDropdown(element);
        default:
            throw new Error('Tipo di elemento non supportato');
    }
}

function createButton(button) {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    
    const btn = document.createElement('button');
    btn.classList.add('btn', 'nav-link');
    btn.textContent = button.title;
    btn.onclick = button.onclick;
    
    li.appendChild(btn);
    return li;
}

function createLink(link) {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.href = link.href;
    a.textContent = link.title;
    
    li.appendChild(a);
    return li;
}

function createSeparator() {
    const li = document.createElement('li');
    li.classList.add('nav-item');
    
    const separator = document.createElement('hr');
    separator.classList.add('dropdown-divider');
    
    li.appendChild(separator);
    return li;
}

function createDropdown(dropdown) {
    const li = document.createElement('li');
    li.classList.add('nav-item', 'dropdown');
    
    const a = document.createElement('a');
    a.classList.add('nav-link', 'dropdown-toggle');
    a.href = '#';
    a.id = `${dropdown.title.replace(/\s+/g, '')}Dropdown`;
    a.setAttribute('role', 'button');
    a.setAttribute('data-bs-toggle', 'dropdown');
    a.setAttribute('aria-expanded', 'false');
    a.textContent = dropdown.title;
    
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.setAttribute('aria-labelledby', a.id);

    // Aggiungi elementi al dropdown
    dropdown.elements.forEach(subElement => {
        const dropdownItem = createNavbarElement(subElement);
        dropdownMenu.appendChild(dropdownItem);
    });

    li.appendChild(a);
    li.appendChild(dropdownMenu);

    // Gestione dropdown annidati
    li.addEventListener('click', function (event) {
        if (event.target.classList.contains('dropdown-toggle')) {
            event.stopPropagation(); // Previene la chiusura del dropdown padre
        }
    });

    return li;
}

// Funzione per inizializzare la navbar
function initNavbar() {
    // Configurazioni
    const logoSrc = 'https://www.cemambiente.it/wp-content/themes/cemAmbiente/img/logo_50.png'; // Modifica con il percorso del tuo logo
    // const logoSrc = 'https://avatars.githubusercontent.com/u/40484128?v=4';
    const logoAlt = 'Logo PAT';

    // Definisci gli elementi della navbar
    const navItems = [
        { type: 'link', title: 'Bookmarklets', href: 'https://github.com/pBielli/bookmarklet' },
        {
            type: 'dropdown', title: 'Comandi AzzurroZCS', elements: [
                { type: 'link', title: 'AzzurroZCS', href: 'https://zcsazzurrosystemsweb.com/customer/e438305f-c279/overview' },
                { type: 'separator' },
                { type: 'button', title: 'Download Excel', onclick: function() { run_();alert('Download eseguito!'); } },
            ]
        }
    ];

    // Crea la navbar
    const { navbar, navbarNav } = createNavbar(logoSrc, logoAlt);

    // Aggiungi gli elementi alla navbar
    navItems.forEach(item => {
        const element = createNavbarElement(item);
        navbarNav.appendChild(element);
    });

    // Aggiungi la navbar al body
    document.body.prepend(navbar);
}
