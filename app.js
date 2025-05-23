// Пример данных для карточек
const cards = [
    {
        id: 1,
        title: "Загадка 1",
        text: "Человек заходит в комнату и умирает. Почему?",
        answer: "Он был в самолете, который разбился.",
        notes: []
    },
    // Добавьте больше карточек здесь
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
                ${card.notes.map(note => `<div class="note">${note}</div>`).join('')}
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
function addNote(cardId, note) {
    const card = cards.find(c => c.id === cardId);
    if (card) {
        card.notes.push(note);
        updateCard(cardId);
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