// Утилиты DOM
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'className') {
            element.className = value;
        } else {
            element.setAttribute(key, value);
        }
    });

    if (typeof content === 'string') {
        element.textContent = content;
    } else if (Array.isArray(content)) {
        content.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
        });
    } else if (content instanceof Node) {
        element.appendChild(content);
    }

    return element;
}

// Создаем всю структуру
function initApp() {
    // Header
    const header = createElement('header');
    const navContainer = createElement('div', { className: 'nav-container' });

    const logo = createElement('div', { className: 'logo' }, 'PORSCHE');
    const nav = createElement('nav');
    const ul = createElement('ul');

    ['models', 'history', 'technology'].forEach(route => {
        const li = createElement('li');
        const a = createElement('a', {
            href: `#${route}`,
            className: 'nav-link'
        }, getBreadcrumbText(route));
        li.appendChild(a);
        ul.appendChild(li);
    });

    const searchInput = createElement('input', {
        type: 'text',
        className: 'search-input',
        placeholder: 'Поиск моделей...',
        id: 'searchInput'
    });

    nav.appendChild(ul);
    navContainer.appendChild(logo);
    navContainer.appendChild(nav);
    navContainer.appendChild(searchInput);
    header.appendChild(navContainer);

    // Breadcrumbs
    const breadcrumbs = createElement('div', {
        className: 'breadcrumbs',
        id: 'breadcrumbs'
    });

    // Main content
    const main = createElement('main', { id: 'content' });

    // Footer
    const footer = createElement('footer');
    footer.appendChild(createElement('p', {}, 'Porsche Universe © 2024. Все права защищены.'));

    // Добавляем всё в body
    document.body.appendChild(header);
    document.body.appendChild(breadcrumbs);
    document.body.appendChild(main);
    document.body.appendChild(footer);

    // Инициализируем приложение
    setupSearch();
    handleRouteChange();

    // Навигация
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href').slice(1));
        }
    });

    window.addEventListener('hashchange', handleRouteChange);
}

// Остальные функции без изменений (роутинг, рендеры и т.д.)
const routes = {
    'models': renderModelsPage,
    'history': renderHistoryPage,
    'technology': renderTechnologyPage,
    'model': renderModelDetail
};

function navigateTo(hash) {
    window.location.hash = hash;
    handleRouteChange();
}

function handleRouteChange() {
    const hash = window.location.hash.slice(1) || 'models';
    const content = document.getElementById('content');
    const [route, param] = hash.split('/');

    content.innerHTML = '';

    if (routes[route]) {
        routes[route](param);
    } else {
        routes.models();
    }

    updateBreadcrumbs(hash);
}

function updateBreadcrumbs(currentRoute) {
    const breadcrumbs = document.getElementById('breadcrumbs');
    breadcrumbs.innerHTML = '';

    const parts = currentRoute.split('/');
    let path = '';

    parts.forEach((part, index) => {
        if (!part) return;

        path += index === 0 ? part : `/${part}`;
        const breadcrumbText = getBreadcrumbText(part);

        const breadcrumb = createElement('a', {
            href: `#${path}`,
            className: 'breadcrumb'
        }, breadcrumbText);

        breadcrumbs.appendChild(breadcrumb);

        if (index < parts.length - 1 && parts[index + 1]) {
            breadcrumbs.appendChild(createElement('span', {
                className: 'separator'
            }, ' > '));
        }
    });
}

function getBreadcrumbText(route) {
    const breadcrumbMap = {
        'models': 'Модели',
        'history': 'История',
        'technology': 'Технологии',
        '911': '911 Carrera',
        'taycan': 'Taycan',
        'cayenne': 'Cayenne',
        'panamera': 'Panamera'
    };
    return breadcrumbMap[route] || route;
}

function renderModelsPage() {
    const content = document.getElementById('content');

    const title = createElement('h1', {}, 'Модельный ряд Porsche');
    content.appendChild(title);

    const grid = createElement('div', { className: 'models-grid' });

    porscheData.models.forEach(model => {
        const card = createElement('div', { className: 'model-card' });

        const image = createElement('img', {
            className: 'model-image',
            src: model.image,
            alt: model.name
        });

        const info = createElement('div', { className: 'model-info' });

        const name = createElement('h3', { className: 'model-name' }, model.name);
        const price = createElement('p', { className: 'model-price' }, `от $${model.price.toLocaleString()}`);
        const desc = createElement('p', {}, model.description);

        const button = createElement('button', {
            className: 'btn btn-primary',
            onclick: () => navigateTo(`model/${model.id}`)
        }, 'Подробнее');

        info.appendChild(name);
        info.appendChild(price);
        info.appendChild(desc);
        info.appendChild(button);

        card.appendChild(image);
        card.appendChild(info);
        grid.appendChild(card);
    });

    content.appendChild(grid);
}

function renderModelDetail(modelId) {
    const content = document.getElementById('content');
    const model = porscheData.models.find(m => m.id === modelId);

    if (!model) {
        navigateTo('models');
        return;
    }

    const title = createElement('h1', {}, model.name);
    content.appendChild(title);

    const image = createElement('img', {
        src: model.image,
        alt: model.name,
        style: 'width: 100%; height: 300px; object-fit: cover; border-radius: 8px;'
    });

    const specs = createElement('div', { className: 'model-info' });
    specs.appendChild(createElement('h3', {}, 'Характеристики'));

    Object.entries(model.specs).forEach(([key, value]) => {
        specs.appendChild(createElement('p', {}, `${key}: ${value}`));
    });

    content.appendChild(image);
    content.appendChild(specs);
}

function renderHistoryPage() {
    const content = document.getElementById('content');

    const title = createElement('h1', {}, 'История Porsche');
    content.appendChild(title);

    porscheData.history.forEach(item => {
        const event = createElement('div', { className: 'result-item' });
        event.appendChild(createElement('h3', {}, item.year));
        event.appendChild(createElement('p', {}, item.event));
        content.appendChild(event);
    });
}

function renderTechnologyPage() {
    const content = document.getElementById('content');

    const title = createElement('h1', {}, 'Технологии Porsche');
    content.appendChild(title);

    porscheData.technology.forEach(tech => {
        const item = createElement('div', { className: 'result-item' });
        item.appendChild(createElement('h3', {}, tech.name));
        item.appendChild(createElement('p', {}, tech.description));
        content.appendChild(item);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

function performSearch(query) {
    if (!query.trim()) {
        handleRouteChange();
        return;
    }

    const content = document.getElementById('content');
    content.innerHTML = '';

    const results = createElement('div', { className: 'search-results' });
    results.appendChild(createElement('h2', {}, `Результаты поиска: "${query}"`));

    porscheData.models.forEach(model => {
        if (model.name.toLowerCase().includes(query.toLowerCase()) ||
            model.description.toLowerCase().includes(query.toLowerCase())) {
            const item = createElement('div', { className: 'result-item' });
            item.appendChild(createElement('h3', {}, model.name));
            item.appendChild(createElement('p', {}, model.description));
            item.appendChild(createElement('button', {
                className: 'btn btn-outline',
                onclick: () => navigateTo(`model/${model.id}`)
            }, 'Посмотреть'));
            results.appendChild(item);
        }
    });

    content.appendChild(results);
}

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);