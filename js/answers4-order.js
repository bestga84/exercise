const parent = document.getElementById('parent');
const draggables = document.querySelectorAll('.draggable');
const messageElement = document.getElementById('message-order'); // Элемент для сообщения

// Функция случайного расположения элементов
function randomPosition(element) {
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    const maxX = parentRect.width - elementRect.width;
    const maxY = parentRect.height - elementRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    element.style.left = randomX + 'px';
    element.style.top = randomY + 'px';
    element.style.position = 'relative';
}

// Добавление событий для всех draggable элементов
draggables.forEach(draggable => {
    randomPosition(draggable);
    draggable.addEventListener('mousedown', onDragStart);
    draggable.addEventListener('touchstart', onDragStartTouch);
});

// Функция для случайной сортировки
function checkOrder() {
    const sorted = Array.from(draggables).sort((a, b) => {
        const aTop = a.getBoundingClientRect().top;
        const bTop = b.getBoundingClientRect().top;
        return aTop - bTop;
    });

    let isOrdered = true;

    // Проверяем, что элементы идут в правильном порядке по вертикали
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] !== draggables[i]) {
            isOrdered = false;
            break;
        }
    }

    // Подсвечиваем элементы, если они идут по порядку
    if (isOrdered) {
        sorted.forEach(element => {
            element.style.backgroundColor = 'green';  // Подсветка зеленым
        });
        
        // Показываем сообщение "Правильно!"
        messageElement.style.display = 'block';  // Показываем сообщение
    } else {
        draggables.forEach(element => {
            element.style.backgroundColor = '';  // Убираем подсветку
        });
        
        // Скрываем сообщение
        messageElement.style.display = 'none';  // Скрываем сообщение
    }
}

let dragged;

function onDragStart(event) {
    dragged = event.target;
    dragged.style.position = 'absolute';
    dragged.style.zIndex = 1000;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
}

function onDragStartTouch(event) {
    dragged = event.target;
    dragged.style.position = 'absolute';
    dragged.style.zIndex = 1000;

    const touch = event.touches[0];
    dragged.startX = touch.clientX;
    dragged.startY = touch.clientY;

    document.addEventListener('touchmove', onDragTouch);
    document.addEventListener('touchend', onDragEndTouch);
    event.preventDefault();  // Предотвращаем стандартное поведение
}

function onDrag(event) {
    dragged.style.left = event.clientX - dragged.offsetWidth / 2 + 'px';
    dragged.style.top = event.clientY - dragged.offsetHeight / 2 + 'px';
    checkOrder(); // Проверяем порядок на каждом движении
}

function onDragTouch(event) {
    const touch = event.touches[0];
    dragged.style.left = touch.clientX - dragged.offsetWidth / 2 + 'px';
    dragged.style.top = touch.clientY - dragged.offsetHeight / 2 + 'px';
    checkOrder(); // Проверяем порядок на каждом движении
}

function onDragEnd() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
    checkOrder(); // Проверяем порядок после завершения перетаскивания
}

function onDragEndTouch() {
    document.removeEventListener('touchmove', onDragTouch);
    document.removeEventListener('touchend', onDragEndTouch);
    checkOrder(); // Проверяем порядок после завершения перетаскивания
}







/*
=======================================================================
Объяснение изменений:
События для мобильных устройств:

Добавлены обработчики для событий touchstart, touchmove, и touchend.
touchstart используется для начала перетаскивания (аналогично mousedown).
touchmove используется для отслеживания перемещения элемента, аналогично mousemove.
touchend используется для завершения перетаскивания, аналогично mouseup.
Обработка касания:

В onDragStartTouch сохраняется начальная позиция касания с помощью event.touches[0].
В onDragTouch вычисляются новые позиции с учетом касания на экране и смещения элемента.
В onDragEndTouch удаляются слушатели событий для завершения перетаскивания.
Предотвращение стандартного поведения:

В onDragStartTouch добавлен вызов event.preventDefault(), чтобы предотвратить прокрутку страницы или другие стандартные действия при перетаскивании.
=======================================================================
Объяснение изменений:
Функция checkOrder:

Функция сортирует все элементы draggable по вертикальной позиции (top), а затем проверяет, находятся ли они в правильном порядке.
Если элементы расположены по порядку (сверху вниз, как они должны быть в HTML), они подсвечиваются зеленым цветом. Если порядок нарушен, подсветка убирается.
Проверка порядка:

При каждом перетаскивании (как в случае с mousemove, так и с touchmove), а также после завершения перетаскивания (в mouseup и touchend), вызывается функция checkOrder, которая проверяет порядок элементов и применяет подсветку.
Подсветка элементов:

Когда элементы располагаются в правильном порядке, их фон становится зеленым.
Если порядок нарушен, подсветка убирается.
Как это работает:
При каждом перемещении элементов с помощью мыши или сенсорного экрана проверяется, находятся ли элементы в правильном порядке. Если они выстраиваются по порядку (сверху вниз), то их фон подсвечивается зеленым. Если порядок нарушается, подсветка исчезает.
=======================================================================
Объяснение изменений:
Элемент для сообщения:

В HTML добавлен элемент <div id="message-order"> с текстом "Правильно!". Этот элемент будет отображаться, если все блоки будут расположены по порядку.
Показ/скрытие сообщения:

В функции checkOrder добавлено условие, которое проверяет, находятся ли элементы в правильном порядке.
Если порядок правильный, то блоки подсвечиваются зеленым, и сообщение "Правильно!" показывается с помощью messageElement.style.display = 'block'.
Если порядок нарушен, то подсветка убирается, и сообщение скрывается с помощью messageElement.style.display = 'none'.
Стилизация сообщения:

Сообщение будет отображаться с зеленым текстом и жирным шрифтом. Это можно изменить в CSS по вашему желанию.
=======================================================================
*/