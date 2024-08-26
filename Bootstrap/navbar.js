function nvbr() {
    // Configurazioni
    const logoSrc = 'https://www.cemambiente.it/wp-content/themes/cemAmbiente/img/logo_50.png'; // Modifica con il percorso del tuo logo
    const logoAlt = 'Logo CEM'; // Testo alternativo per il logo
    const navItems = [
        { title: 'Dropdown 1', items: ['Option 1', 'Option 2'] },
        { title: 'Dropdown 2', items: ['Option A', 'Option B'] }
    ];
    
    // Crea la navbar
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

    // Crea il contenitore della navbar
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

    // Aggiungi i pulsanti a discesa
    navItems.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('nav-item', 'dropdown');
        
        const a = document.createElement('a');
        a.classList.add('nav-link', 'dropdown-toggle');
        a.href = '#';
        a.id = `${item.title.replace(/\s+/g, '')}Dropdown`;
        a.setAttribute('role', 'button');
        a.setAttribute('data-bs-toggle', 'dropdown');
        a.setAttribute('aria-expanded', 'false');
        a.textContent = item.title;

        const dropdownMenu = document.createElement('ul');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.setAttribute('aria-labelledby', a.id);
        
        item.items.forEach(subItem => {
            const dropdownItem = document.createElement('li');
            const dropdownLink = document.createElement('a');
            dropdownLink.classList.add('dropdown-item');
            dropdownLink.href = '#';
            dropdownLink.textContent = subItem;
            dropdownItem.appendChild(dropdownLink);
            dropdownMenu.appendChild(dropdownItem);
        });

        li.appendChild(a);
        li.appendChild(dropdownMenu);
        navbarNav.appendChild(li);
    });

    // Aggiungi la navbar al body
    document.body.prepend(navbar);
}
