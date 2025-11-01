const porscheData = {
    models: [
        {
            id: '911',
            name: '911 Carrera',
            price: 120000,
            image: 'img/carrera.jpg',
            specs: {
                engine: '3.0L Twin-Turbo',
                power: '385 л.с.',
                acceleration: '4.2 сек',
                topspeed: '293 км/ч'
            },
            colors: ['#000000', '#FFFFFF', '#CC0000', '#1a1a1a'],
            description: 'Легендарный спортивный автомобиль'
        },
        {
            id: 'taycan',
            name: 'Taycan Turbo',
            price: 150000,
            image: 'img/Taycan.png',
            specs: {
                engine: 'Электродвигатель',
                power: '625 л.с.',
                acceleration: '3.2 сек',
                topspeed: '260 км/ч'
            },
            colors: ['#000000', '#2E86AB', '#1a1a1a', '#666666'],
            description: 'Электрический спорткар будущего'
        },
        {
            id: 'cayenne',
            name: 'Cayenne Turbo',
            price: 110000,
            image: 'img/cayenne.png',
            specs: {
                engine: '4.0L V8 Twin-Turbo',
                power: '550 л.с.',
                acceleration: '4.1 сек',
                topspeed: '286 км/ч'
            },
            colors: ['#000000', '#2D3047', '#1a1a1a', '#839788'],
            description: 'Мощный SUV премиум-класса'
        },
        {
            id: 'panamera',
            name: 'Panamera 4S',
            price: 105000,
            image: 'img/Panamera.png',
            specs: {
                engine: '2.9L V6 Twin-Turbo',
                power: '440 л.с.',
                acceleration: '4.4 сек',
                topspeed: '289 км/ч'
            },
            colors: ['#000000', '#FFFFFF', '#1a1a1a', '#5D737E'],
            description: 'Роскошный спортивный седан'
        }
    ],
    history: [
        { year: 1948, event: 'Первый Porsche 356' },
        { year: 1963, event: 'Представлен Porsche 911' },
        { year: 2002, event: 'Запуск Cayenne' },
        { year: 2019, event: 'Премьера Taycan' }
    ],
    technology: [
        { name: 'PDK', description: 'Преселективная коробка передач' },
        { name: 'PASM', description: 'Адаптивная подвеска' },
        { name: 'PTV', description: 'Управление крутящим моментом' }
    ]
};

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
        element.innerHTML = content;
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

// Роутинг
const routes = {
    'models': renderModelsPage,
    'history': renderHistoryPage,
    'technology': renderTechnologyPage,
    'configurator': renderConfigurator,
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

// Breadcrumbs
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
        'configurator': 'Конфигуратор',
        '911': '911 Carrera',
        'taycan': 'Taycan',
        'cayenne': 'Cayenne',
        'panamera': 'Panamera'
    };
    return breadcrumbMap[route] || route;
}

// Страницы
function renderModelsPage() {
    const content = document.getElementById('content');

    const title = createElement('h1', {}, 'Модельный ряд Porsche');
    content.appendChild(title);

    const grid = createElement('div', { className: 'models-grid' });

    porscheData.models.forEach(model => {
        const card = createElement('div', { className: 'model-card' });

        const image = createElement('div', { className: 'model-image' }, model.name);
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

    const configBtn = createElement('button', {
        className: 'btn btn-primary',
        onclick: () => navigateTo('configurator')
    }, 'Сконфигурировать');

    content.appendChild(image);
    content.appendChild(specs);
    content.appendChild(configBtn);
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

function renderConfigurator() {
    const content = document.getElementById('content');

    const title = createElement('h1', {}, 'Конфигуратор Porsche');
    content.appendChild(title);

    const configurator = createElement('div', { className: 'configurator' });

    const steps = createElement('div', { className: 'config-steps' });
    ['Модель', 'Цвет', 'Колеса', 'Интерьер'].forEach((step, index) => {
        steps.appendChild(createElement('div', {
            className: `config-step ${index === 0 ? 'active' : ''}`
        }, step));
    });

    const colorOptions = createElement('div', { className: 'color-options' });
    ['#000000', '#FFFFFF', '#CC0000', '#1a1a1a', '#2E86AB'].forEach(color => {
        colorOptions.appendChild(createElement('div', {
            className: 'color-option',
            style: `background: ${color}`,
            onclick: function () {
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
            }
        }));
    });

    const saveBtn = createElement('button', {
        className: 'btn btn-primary',
        onclick: saveConfiguration
    }, 'Сохранить конфигурацию');

    configurator.appendChild(steps);
    configurator.appendChild(createElement('h3', {}, 'Выберите цвет'));
    configurator.appendChild(colorOptions);
    configurator.appendChild(saveBtn);

    content.appendChild(configurator);
}

// Поиск
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

    // Поиск по моделям
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

// LocalStorage
function saveConfiguration() {
    const config = {
        model: '911 Carrera',
        color: '#000000',
        timestamp: new Date().toISOString()
    };

    const savedConfigs = JSON.parse(localStorage.getItem('porscheConfigs') || '[]');
    savedConfigs.push(config);
    localStorage.setItem('porscheConfigs', JSON.stringify(savedConfigs));

    alert('Конфигурация сохранена!');
}

document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    handleRouteChange();

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href').slice(1));
        });
    });

    window.addEventListener('hashchange', handleRouteChange);
});