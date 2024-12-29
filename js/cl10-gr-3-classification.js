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

// Перемешиваем (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(itemsData);

// Создаём draggable-блоки
const divContainer = document.getElementById("divContainer");
itemsData.forEach(item => {
  const div = document.createElement("div");
  div.id = item.id;
  div.innerHTML = item.label;
  div.className = "draggable-item";
  div.draggable = true;
  div.ondragstart = drag;
  divContainer.appendChild(div);

  // Добавляем обработчики тач-событий для мобильных устройств
  div.addEventListener("touchstart", touchStart, { passive: false });
  div.addEventListener("touchmove", touchMove, { passive: false });
  div.addEventListener("touchend", touchEnd, { passive: false });
});

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  // Запоминаем ID того, что тянем
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text");
  const draggedItem = document.getElementById(itemId);
  const dropZoneId = event.currentTarget.id;

  // Добавляем элемент в drop-зону
  event.currentTarget.appendChild(draggedItem);

  checkCorrect(itemId, dropZoneId, draggedItem);
}

function checkCorrect(itemId, dropZoneId, draggedItem) {
  // Проверяем, верно ли
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

// -- Блок кода для тач-событий на мобильных устройствах --
let currentTouchItem = null;    // как будто «draggedItem»
let cloneEl = null;            // клон элемента, который двигаем
let offsetX = 0;
let offsetY = 0;

function touchStart(e) {
  // Берём первый палец
  const touch = e.changedTouches[0];
  // Сохраняем «целевой» элемент
  currentTouchItem = e.currentTarget;

  // Создаём клон, чтобы двигать его за пальцем
  cloneEl = currentTouchItem.cloneNode(true);
  cloneEl.classList.add("drag-clone");
  document.body.appendChild(cloneEl);

  // Сдвиг, чтобы палец не всегда был в левом верхнем углу
  const rect = currentTouchItem.getBoundingClientRect();
  offsetX = touch.clientX - rect.left;
  offsetY = touch.clientY - rect.top;

  // Скрываем оригинальный элемент (если хочется, чтобы он «пропал»)
  // currentTouchItem.style.opacity = "0.2";

  // Проставим позицию клона
  moveClone(touch.clientX, touch.clientY);
  
  // Останавливаем возможный скролл
  e.preventDefault();
}

function touchMove(e) {
  const touch = e.changedTouches[0];
  if (!cloneEl) return;

  // Двигаем клон за пальцем
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

  // currentTouchItem.style.opacity = "1.0"; // восстанавливаем видимость, если скрывали

  // Если «зона сброса» найдена
  if (dropTarget) {
    // Ищем ближайший родитель drop-зоны
    const dropZone = findDropZone(dropTarget);
    if (dropZone) {
      // Добавляем элемент в эту drop-зону
      dropZone.appendChild(currentTouchItem);

      // Проверяем корректность
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
  if (el.classList.contains("drop-zone")) {
    return el;
  }
  return findDropZone(el.parentElement);
}