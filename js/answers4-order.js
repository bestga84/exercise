const parent = document.getElementById('parent');
const draggables = document.querySelectorAll('.draggable');
        
function randomPosition(element) {
    const parentRect = parent.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
        
    const maxX = parentRect.width - elementRect.width;
    const maxY = parentRect.height - elementRect.height;
        
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
        
    element.style.left = randomX + 'px';
    element.style.top = randomY + 'px';
    // element.style.position = 'absolute';
    element.style.position = 'relative';
}
        
// ===================================================

draggables.forEach(draggable => {
    randomPosition(draggable);
    draggable.addEventListener('mousedown', onDragStart);
});

let dragged;

function onDragStart(event) {
    dragged = event.target;
    // Получаем начальные координаты курсора относительно элемента
    dragged.style.position = 'absolute';
    dragged.style.zIndex = 1000;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
}

function onDrag(event) {
    // Вычисляем новые координаты элемента
    dragged.style.left = event.clientX - dragged.offsetWidth / 2 + 'px';
    dragged.style.top = event.clientY - dragged.offsetHeight / 2 + 'px';
}

function onDragEnd() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
}