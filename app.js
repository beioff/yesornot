// Пример данных для карточек
const cards = [
    {
        id: 1,
        title: "Билл и Мери",
        text: "Жил-был парень Билл. У него была Мери, которую он очень любил. Однажды, когда Билл был в кафе, разразилась сильная гроза. Когда Билл вернулся домой, он увидел распахнутое окно и лежащую среди осколков стекла в луже воды мертвую Мери. Что произошло?",
        answer: "Аквариум с рыбкой Мэри упал и разбился.",
        notes: []
    },
    {
        id: 2,
        title: "Человек в пустыне",
        text: "В пустыне найден мертвый голый человек с половиной спички в руке. Что произошло?",
        answer: "Люди летели на воздушном шаре. Шар стал падать, чтобы сбросить груз, они выкинули свою одежду. Это не помогло, и они разыграли на спичках, кому из них прыгать.",
        notes: []
    },
    {
        id: 3,
        title: "Человек на рельсах",
        text: "Человек шел по рельсам и вдруг, увидел, что навстречу ему едет поезд. Тогда он побежал со всех ног навстречу приближающемуся поезду. Зачем?",
        answer: "Человек находился в тоннеле и, чтобы спастись, был вынужден бежать по путям навстречу поезду. Когда тоннель кончился, он смог спрыгнуть с рельсов в сторону. И благодаря этому остался жив.",
        notes: []
    },
    {
        id: 4,
        title: "Отравленный пунш",
        text: "Человек пришел на вечеринку и выпил немного пунша. Ушел он рано. Все участники вечеринки, которые пили пунш после него, умерли от отравления. Почему не умер он?",
        answer: "Яд содержался в кусочках льда, которые были положены в пунш. Первый человек выпил пунш, когда лед еще не растаял и достаточное количество яда не попало в пунш. Постепенно лед растаял, и яд смешался с пуншем.",
        notes: []
    },
    {
        id: 5,
        title: "Человек с 16 этажа",
        text: "Один человек живет на 16 этаже многоэтажного дома. Когда он спускается вниз, то всегда едет до первого этажа на лифте. Когда он поднимается один, то едет до 10 этажа на лифте, а дальше идет пешком. Если он заходит с кем-то в лифт, то поднимается на лифте до 16 этажа. В дождливую погоду он также всегда поднимается до 16 этажа на лифте. Почему он так странно себя ведет?",
        answer: "Этот человек лилипут. Он не дотягивается до кнопки 16 этажа, а может достать только до 10 этажа. Когда кто-то еще заходит в лифт вместе с ним, то этот человек нажимает кнопку за него. В дождливую погоду лилипут пользуется зонтиком, чтобы нажать на кнопку 16 этажа.",
        notes: []
    }
];

// Инициализация Swiper
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    effect: 'cards',
    cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 2,
    }
});

// Функция для создания карточки
function createCard(card) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    slide.innerHTML = `
        <div class="card-content">
            <h2 class="card-title">${card.title}</h2>
            <p class="card-text">${card.text}</p>
            <div class="notes-section">
                <div class="notes-list">
                    ${card.notes.map(note => `<div class="note">${note}</div>`).join('')}
                </div>
                <div class="note-input">
                    <input type="text" placeholder="Добавить заметку..." id="note-input-${card.id}">
                    <button onclick="addNote(${card.id})">+</button>
                </div>
            </div>
            <button class="show-answer-btn" onclick="toggleAnswer(${card.id})">Показать ответ</button>
            <div class="answer" id="answer-${card.id}">
                ${card.answer}
            </div>
        </div>
    `;
    
    return slide;
}

// Функция для показа/скрытия ответа
function toggleAnswer(cardId) {
    const answer = document.getElementById(`answer-${cardId}`);
    answer.classList.toggle('visible');
}

// Функция для добавления заметки
function addNote(cardId) {
    const input = document.getElementById(`note-input-${cardId}`);
    const note = input.value.trim();
    
    if (note) {
        const card = cards.find(c => c.id === cardId);
        if (card) {
            card.notes.push(note);
            input.value = '';
            updateCard(cardId);
        }
    }
}

// Функция для обновления карточки
function updateCard(cardId) {
    const card = cards.find(c => c.id === cardId);
    if (card) {
        const slide = createCard(card);
        const currentIndex = swiper.activeIndex;
        swiper.removeSlide(currentIndex);
        swiper.addSlide(currentIndex, slide);
    }
}

// Инициализация карточек
function initializeCards() {
    const wrapper = document.querySelector('.swiper-wrapper');
    cards.forEach(card => {
        const slide = createCard(card);
        wrapper.appendChild(slide);
    });
}

// Запуск инициализации
initializeCards(); 