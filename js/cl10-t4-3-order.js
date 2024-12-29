/**
   * Массив шагов в правильном порядке
   * Можно добавить поле id, или код, или текст, по которому потом будем проверять.
   */
const steps = [
    { text: "<html>", correctIndex: 0 },
    { text: "<head>", correctIndex: 1 },
    { text: "<title>Назва веб-документа</title>", correctIndex: 2 },
    { text: "</head>", correctIndex: 3 },
    { text: "<body>", correctIndex: 4 },
    { text: "Тут вміст сторінки веб-документа.", correctIndex: 5 },
    { text: "</body>", correctIndex: 6 },
    { text: "</html>", correctIndex: 7 }
  ];

  /**
   * Функция для случайного перемешивания массива
   */
  function shuffleArray(array) {
    // Тасование Фишера–Йетса
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Перемешиваем исходные шаги
  const shuffledSteps = shuffleArray([...steps]);

  // Ссылка на родительский контейнер
  const container = document.getElementById("shuffle-container");
  const message = document.getElementById("message-order");

  /**
   * Создаём div-элементы для каждого шага
   */
  shuffledSteps.forEach((stepData, index) => {
    const div = document.createElement("div");
    div.classList.add("draggable-block");
    div.setAttribute("draggable", "true");
    // Можно хранить правильный индекс в data-атрибуте
    div.dataset.correctIndex = stepData.correctIndex;
    div.textContent = stepData.text;
    container.appendChild(div);

    // Для мобильной версии добавим обработку touch-событий
    addTouchHandlers(div);
  });

  // Добавляем DnD (Drag&Drop) для ПК
  let draggedElement = null;

  container.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("draggable-block")) {
      draggedElement = e.target;
      e.dataTransfer.effectAllowed = "move";
    }
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault(); // обязательно, чтобы drop работал
    // подсветка
    if (e.target.classList.contains("draggable-block") && e.target !== draggedElement) {
      e.target.classList.add("drag-over");
    }
  });

  container.addEventListener("dragleave", (e) => {
    if (e.target.classList.contains("draggable-block")) {
      e.target.classList.remove("drag-over");
    }
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("draggable-block") && e.target !== draggedElement) {
      // Меняем местами draggedElement и e.target
      e.target.classList.remove("drag-over");
      // Определяем, какой элемент выше/ниже
      const blocks = [...container.querySelectorAll(".draggable-block")];
      const dropIndex = blocks.indexOf(e.target);
      const dragIndex = blocks.indexOf(draggedElement);

      if (dragIndex < dropIndex) {
        container.insertBefore(draggedElement, e.target.nextSibling);
      } else {
        container.insertBefore(draggedElement, e.target);
      }
      draggedElement = null;

      // Проверяем порядок после каждого drop
      checkOrder();
    }
  });

  container.addEventListener("dragend", () => {
    draggedElement = null;
  });

  /**
   * Проверяем правильный ли порядок
   */
  function checkOrder() {
    const blocks = [...container.querySelectorAll(".draggable-block")];
    let isCorrect = true;

    blocks.forEach((block, index) => {
      const correctIndex = parseInt(block.dataset.correctIndex, 10);
      if (correctIndex !== index) {
        isCorrect = false;
      }
    });

    if (isCorrect) {
      // Красим в зелёный и показываем сообщение
      blocks.forEach((block) => block.classList.add("correct-order"));
      message.style.display = "block";
    } else {
      // Убираем зелёный цвет и скрываем сообщение
      blocks.forEach((block) => block.classList.remove("correct-order"));
      message.style.display = "none";
    }
  }

  /**
   * Функция для добавления touch-событий (мобильные)
   */
  function addTouchHandlers(element) {
    let startY = 0;
    let currentBlock = null;

    element.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      startY = touch.clientY;
      currentBlock = e.currentTarget;
      // стилизуем, что элемент «поднят»
      currentBlock.style.opacity = "0.6";
    });

    element.addEventListener("touchmove", (e) => {
      e.preventDefault(); // отключаем скролл страницы при перетаскивании
      const touch = e.touches[0];
      const moveY = touch.clientY;
      const delta = moveY - startY;

      // Находим блок, над которым «проходим»
      const allBlocks = [...container.querySelectorAll(".draggable-block")];
      let targetBlock = null;
      for (let block of allBlocks) {
        const rect = block.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;
        if (moveY < middleY) {
          targetBlock = block;
          break;
        }
      }

      // Если обнаружили блок, которого пересекли, — определяем его индекс
      if (targetBlock && targetBlock !== currentBlock) {
        const targetIndex = allBlocks.indexOf(targetBlock);
        const currentIndex = allBlocks.indexOf(currentBlock);

        // Если тянем вниз
        if (delta > 0 && targetIndex > currentIndex) {
          container.insertBefore(currentBlock, targetBlock.nextSibling);
        } 
        // Если тянем вверх
        else if (delta < 0 && targetIndex < currentIndex) {
          container.insertBefore(currentBlock, targetBlock);
        }
      }
    });

    element.addEventListener("touchend", () => {
      if (currentBlock) {
        currentBlock.style.opacity = "1";
      }
      currentBlock = null;
      checkOrder();
    });
  }