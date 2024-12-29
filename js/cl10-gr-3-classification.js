const itemsData = [
  {
    id: "rgb_item",
    label: `<p>RGB</p><img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Venn_diagram_rgb.svg/220px-Venn_diagram_rgb.svg.png" 
              alt="RGB diagram"
              draggable="false"
              width="120px"
            >`,
    category: "zone-rgb"
  },
  {
    id: "cmyk_item",
    label: `<p>CMYK</p><img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Polygraphic_Substractive_CMY.png/220px-Polygraphic_Substractive_CMY.png" 
              alt="CMYK diagram"
              draggable="false"
              width="120px"
            >`,
    category: "zone-cmyk"
  },
  {
    id: "lab_item",
    label: `<p>Lab</p><img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Color_space_CIE_1976_%28LUV%29%2B%28Lab%29%2BcolorTemp.png" 
              alt="LAB diagram"
              draggable="false"
              width="120px"
            >`,
    category: "zone-lab"
  },
  {
    id: "hsv_item",
    label: `<p>HSV</p><img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/HSV_color_solid_cylinder.png/1200px-HSV_color_solid_cylinder.png" 
              alt="HSV diagram"
              draggable="false"
              width="120px"
            >`,
    category: "zone-hsv"
  },
];

const totalItems = itemsData.length;
let correctCount = 0;

// Функция для перемешивания массива (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(itemsData);

// Создаём draggable-блоки в контейнере
const divContainer = document.getElementById("divContainer");
itemsData.forEach(item => {
  const div = document.createElement("div");
  div.id = item.id;
  div.innerHTML = item.label;
  div.className = "draggable-item";
  
  // === HTML5 Drag & Drop (Desktop) ===
  div.draggable = true;
  div.ondragstart = drag;

  // Добавляем в DOM
  divContainer.appendChild(div);

  // === Обработчики тач-событий (Mobile/Touch) ===
  div.addEventListener("touchstart", touchStart, { passive: false });
  div.addEventListener("touchmove", touchMove, { passive: false });
  div.addEventListener("touchend", touchEnd, { passive: false });

  // === Обработчики mouse-событий (Fallback для любых устройств без нативного DnD) ===
  div.addEventListener("mousedown", mouseDown, false);
});

// HTML5 Drag & Drop события
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  // Запоминаем ID того, что тянем (HTML5 drag)
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const draggedItem = document.getElementById(itemId);
  const dropZoneId = event.currentTarget.id;

  // Добавляем элемент в drop-зону
  event.currentTarget.appendChild(draggedItem);

  // Проверяем корректность
  checkCorrect(itemId, dropZoneId, draggedItem);
}

function checkCorrect(itemId, dropZoneId, draggedItem) {
  const itemData = itemsData.find(i => i.id === itemId);

  if (itemData.category === dropZoneId) {
    if (!draggedItem.classList.contains("correct")) {
      correctCount++;
    }
    draggedItem.classList.remove("incorrect");
    draggedItem.classList.add("correct");
  } else {
    if (draggedItem.classList.contains("correct")) {
      correctCount--;
    }
    draggedItem.classList.remove("correct");
    draggedItem.classList.add("incorrect");
  }

  // Если все на местах
  if (correctCount === totalItems) {
    document.getElementById("message-classification").style.display = "block";
  }
}

// -------------------------------------------------------------
// Блок кода для тач-событий (Mobile touch)
// -------------------------------------------------------------
let currentTouchItem = null; // «draggedItem»
let cloneEl = null;          // клон элемента, который двигаем
let offsetX = 0;
let offsetY = 0;

function touchStart(e) {
  const touch = e.changedTouches[0];
  currentTouchItem = e.currentTarget;

  // Создаём клон, чтобы двигать его за пальцем
  cloneEl = currentTouchItem.cloneNode(true);
  cloneEl.classList.add("drag-clone");
  document.body.appendChild(cloneEl);

  // Сдвиг относительно пальца
  const rect = currentTouchItem.getBoundingClientRect();
  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  // Проставим позицию клона сразу
  moveClone(touch.clientX, touch.clientY);

  // Останавливаем возможный скролл
  e.preventDefault();
}

function touchMove(e) {
  const touch = e.changedTouches[0];
  if (!cloneEl) return;
  
  moveClone(touch.clientX, touch.clientY);
  e.preventDefault();
}

function touchEnd(e) {
  if (!cloneEl) return;
  const touch = e.changedTouches[0];

  // Определяем, над какой зоной отпустили
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

  // Удаляем клон
  cloneEl.remove();
  cloneEl = null;

  if (dropTarget) {
    const dropZone = findDropZone(dropTarget);
    if (dropZone) {
      dropZone.appendChild(currentTouchItem);
      checkCorrect(currentTouchItem.id, dropZone.id, currentTouchItem);
    }
  }

  currentTouchItem = null;
  offsetX = 0;
  offsetY = 0;
}

function moveClone(x, y) {
  cloneEl.style.left = (x - offsetX) + "px";
  cloneEl.style.top = (y - offsetY) + "px";
}

// Вспомогательная функция - ищем родительскую drop-зону
function findDropZone(el) {
  if (!el) return null;
  if (el.classList && el.classList.contains("drop-zone")) {
    return el;
  }
  return findDropZone(el.parentElement);
}

// -------------------------------------------------------------
// Блок кода для mouse-событий (Fallback Drag)
// -------------------------------------------------------------
let isMouseDown = false;
let currentMouseItem = null;
let mouseCloneEl = null;
let mouseOffsetX = 0;
let mouseOffsetY = 0;

function mouseDown(e) {
  // Если уже идёт нативный drag (HTML5), можно прерывать
  // Но для надёжности лучше остановить «dragstart» через event.preventDefault()
  // если хотим полностью перейти на кастомную реализацию.
  
  // Сохраняем элемент, по которому кликнули
  currentMouseItem = e.currentTarget;
  isMouseDown = true;

  // Создаём клон
  mouseCloneEl = currentMouseItem.cloneNode(true);
  mouseCloneEl.classList.add("drag-clone");
  document.body.appendChild(mouseCloneEl);

  // Считаем смещение относительно верхнего левого угла элемента
  const rect = currentMouseItem.getBoundingClientRect();
  mouseOffsetX = e.clientX - rect.left;
  mouseOffsetY = e.clientY - rect.top;

  // Ставим позицию клона
  moveMouseClone(e.clientX, e.clientY);

  // Навешиваем глобальные слушатели, чтобы «ловить» движение везде
  document.addEventListener("mousemove", mouseMove, false);
  document.addEventListener("mouseup", mouseUp, false);

  e.preventDefault();
}

function mouseMove(e) {
  if (!isMouseDown || !mouseCloneEl) return;
  moveMouseClone(e.clientX, e.clientY);
  e.preventDefault();
}

function mouseUp(e) {
  if (!isMouseDown) return;
  isMouseDown = false;

  // Определяем, над каким элементом отпустили мышь
  const dropTarget = document.elementFromPoint(e.clientX, e.clientY);

  // Удаляем клон
  if (mouseCloneEl) {
    mouseCloneEl.remove();
    mouseCloneEl = null;
  }

  if (dropTarget) {
    const dropZone = findDropZone(dropTarget);
    if (dropZone) {
      dropZone.appendChild(currentMouseItem);
      checkCorrect(currentMouseItem.id, dropZone.id, currentMouseItem);
    }
  }

  // Сбрасываем
  currentMouseItem = null;
  mouseOffsetX = 0;
  mouseOffsetY = 0;

  // Убираем глобальные слушатели
  document.removeEventListener("mousemove", mouseMove, false);
  document.removeEventListener("mouseup", mouseUp, false);

  e.preventDefault();
}

function moveMouseClone(x, y) {
  mouseCloneEl.style.left = (x - mouseOffsetX) + "px";
  mouseCloneEl.style.top = (y - mouseOffsetY) + "px";
}