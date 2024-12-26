const testsContainer = document.querySelector('.tests');

const itemTextRight = document.createElement("p");
itemTextRight.style.width = "auto";
const itemTextWrong = document.createElement("p");
itemTextWrong.style.width = "auto";

testsContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('right-answer')) {
    target.closest('.quwestion').style.backgroundColor = 'lightgreen';
    target.style.backgroundColor = 'yellow';
    target.style.color = 'var(--color-dark)';
    target.closest('.answers').querySelectorAll('.wrong-answer').forEach(button => {
      button.style.backgroundColor = 'var(--color-dark)';   // #f0f0f0
      button.style.color = 'white';
    });

    itemTextWrong.remove();
    itemTextRight.innerHTML = "&#9989;";
    target.closest('.paragraph')
    target.append(itemTextRight);

  } else if (target.classList.contains('wrong-answer')) {
    target.closest('.quwestion').style.backgroundColor = 'lightcoral';
    target.style.backgroundColor = 'pink';
    target.style.color = 'var(--color-dark)';  
    target.closest('.answers').querySelectorAll('.right-answer').forEach(button => {
      button.style.backgroundColor = 'var(--color-dark)'; 
      button.style.color = 'white';      
    });
    // target.innerHTML = "&#10060;";

    // target.closest('.paragraph');
    itemTextRight.remove();
    itemTextWrong.innerHTML = "&#10060;";
    target.closest('.paragraph')
    target.append(itemTextWrong);
  }
});



/*
//const testsContainer = document.querySelector('.tests');
const countRightAnswers = document.querySelector('.count-right-answers');
//const countWrongAnswers = document.querySelector('.count-wrong-answers');

let correctAnswers = 0; // Переменная для подсчета правильных ответов
//let wrongAnswers = 0;

testsContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('right-answer')) {
        correctAnswers++; // Увеличиваем счетчик при правильном ответе
        // ... остальной код для подсветки
        if (correctAnswers < 0) {
            countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: 0`;
        } else {
            countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: ${correctAnswers}`;
        }
        //countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: ${correctAnswers}`;
    } else if (target.classList.contains('wrong-answer')) {
        // ... остальной код для подсветки
        //wrongAnswers++;
        //countWrongAnswers.textContent = `Кількість разів натиснуто на неправильні відповіді: ${wrongAnswers}`;
        correctAnswers--;
        if (correctAnswers < 0) {
            countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: 0`;
        } else {
            countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: ${correctAnswers}`;
        }
        //countRightAnswers.textContent = `Кількість разів натиснуто на правильні відповіді: ${correctAnswers}`;
    }
});
*/
/*
// Функция для отображения результата (можно вызвать по событию или по таймеру)
function showRightResult() {
    countRightAnswers.textContent = `Кількість правильних відповідей: ${correctAnswers}`;
  //alert(`Количество правильных ответов: ${correctAnswers}`);
}
  */