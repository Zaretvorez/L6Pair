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