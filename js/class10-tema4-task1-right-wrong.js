    // Функция для перемешивания массива (Fisher–Yates shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
  
      document.addEventListener('DOMContentLoaded', function() {
        // Находим все блоки с вопросами
        const questions = document.querySelectorAll('.quwestion');
  
        questions.forEach(question => {
          // 1) ПЕРЕМЕШИВАЕМ ОТВЕТЫ
          const answersList = question.querySelector('.answers');
          // Получаем все li с классом .list
          const listItems = Array.from(answersList.querySelectorAll('li.list'));
          
          // Перемешиваем массив li
          shuffle(listItems);
  
          // Удаляем старые li
          listItems.forEach(li => answersList.removeChild(li));
  
          // Добавляем обратно уже перемешанные li
          listItems.forEach(li => answersList.appendChild(li));
  
          // 2) ЛОГИКА ПРИ НАЖАТИИ НА КНОПКИ
          // Находим параграфы «Правильно!» и «Не правильно...»
          const correctParagraph = question.querySelector('.correct');
          const incorrectParagraph = question.querySelector('.incorrect');
  
          // Находим все кнопки
          const buttons = answersList.querySelectorAll('button');
  
          // Навешиваем обработчик на каждую кнопку
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              // ---- Если нажали на правильный ответ
              if (button.classList.contains('right-answer')) {
                // 2.1) Снимаем подсветку только со всех "wrong-answer"
                buttons.forEach(b => {
                  if (b.classList.contains('wrong-answer')) {
                    b.classList.remove('wrong-highlight');
                  }
                });
                // Снимаем подсветку с ul, если она розовая
                if (answersList.classList.contains('wrong-highlight')) {
                  answersList.classList.remove('wrong-highlight');
                }
  
                // 2.2) Показываем «Правильно!», скрываем «Не правильно...»
                correctParagraph.classList.remove('hidden');
                incorrectParagraph.classList.add('hidden');
  
                // Подсвечиваем текущую кнопку и ul зелёным
                button.classList.add('right-highlight-button');
                answersList.classList.add('right-highlight');
              } 
              // ---- Если нажали на неправильный ответ
              else if (button.classList.contains('wrong-answer')) {
                // 2.3) Снимаем подсветку только со всех "right-answer"
                buttons.forEach(b => {
                  if (b.classList.contains('right-answer')) {
                    b.classList.remove('right-highlight-button');
                  }
                });
                // Снимаем подсветку с ul, если она зелёная
                if (answersList.classList.contains('right-highlight')) {
                  answersList.classList.remove('right-highlight');
                }
  
                // 2.4) Показываем «Не правильно...», скрываем «Правильно!»
                correctParagraph.classList.add('hidden');
                incorrectParagraph.classList.remove('hidden');
  
                // Подсвечиваем текущую кнопку и ul розовым
                button.classList.add('wrong-highlight');
                answersList.classList.add('wrong-highlight');
              }
            });
          });
        });
      });


/*
Функция shuffle() для перемешивания массива.
Сначала мы находим все <li> внутри ul.answers и складываем их в массив liItems.
Вызываем shuffle(liItems), а затем в цикле forEach заново добавляем их в answersList.
Обработчики событий для кнопок ставятся уже после перемешивания списка.


        Перемешивание
Для каждого вопроса получаем все элементы <li class="list"> в массив listItems.
Функция shuffle(listItems) меняет местами элементы случайным образом.
Затем мы удаляем их из DOM (removeChild) и вставляем обратно уже в перемешанном порядке.
        Подсветка
При клике на «правильную» кнопку:
Сначала убираем розовую подсветку у всех кнопок wrong-answer.
Снимаем розовую подсветку у списка, если она была.
Отображаем текст «Правильно!», скрываем «Не правильно...»,
И добавляем зелёную подсветку к текущей кнопке и к <ul>.
При клике на «неправильную» кнопку:
Сначала убираем зелёную подсветку у всех кнопок right-answer.
Снимаем зелёную подсветку у списка, если она была.
Отображаем текст «Не правильно...», скрываем «Правильно!».
И добавляем розовую подсветку к текущей кнопке и к <ul>.
*/