// const testsContainer = document.querySelector('.tests');

// testsContainer.addEventListener('click', (event) => {
//   const target = event.target;
//   const checkbox = target.closest('label');

//   // Handle checkbox clicks
//   if (checkbox && checkbox.classList.contains('answers-checkbox')) {
//     const checkboxInput = checkbox.querySelector('input');
//     checkboxInput.checked = !checkboxInput.checked; // Toggle checked state

//     // Reset styles if checkbox is unchecked
//     if (!checkboxInput.checked) {
//       target.closest('.quwestion').style.backgroundColor = ''; // Reset background color
//       target.style.backgroundColor = '';
//       target.style.color = '';
//     }
//   }

//   // Handle right answer clicks (unchanged)
//   if (target.classList.contains('right-answer')) {
//     const question = target.closest('.quwestion');
//     const clickedAnswerInput = target.querySelector('input');

//     clickedAnswerInput.checked = !clickedAnswerInput.checked;

//     question.style.backgroundColor = clickedAnswerInput.checked ? 'lightgreen' : 'var(--color-dark)';
//     target.style.backgroundColor = clickedAnswerInput.checked ? 'yellow' : 'var(--color-dark)';
//     target.style.color = 'var(--color-dark)';

//     const wrongAnswers = question.querySelectorAll('.wrong-answer');
//     wrongAnswers.forEach(button => {
//       button.style.backgroundColor = 'var(--color-dark)';
//       button.style.color = 'white';
//     });
//   }

//   // Handle wrong answer clicks (unchanged)
//   // You can add similar logic for wrong answers if needed
// });




// =============================================
// Хороший и нужный код
const testsContainer = document.querySelector('.tests');

const itemTextRight = document.createElement("p");
itemTextRight.style.width = "auto";
const itemTextWrong = document.createElement("p");
itemTextWrong.style.width = "auto";

testsContainer.addEventListener('click', (event) => {
    const target = event.target;
    const checkbox = target.closest('label'); 

    if (checkbox && checkbox.classList.contains('answers-checkbox')) {
        checkbox.querySelector('input').checked = true;


    // const rightAnswers = checkbox.closest('.quwestion-checkbox').querySelectorAll('.right-answer input');
    // const areAllRightAnswersChecked = Array.from(rightAnswers).every(input => input.checked);
    }

    if (target.classList.contains('right-answer')) {
        if (checkbox.querySelector('input').checked == false) {
            target.closest('.quwestion').style.backgroundColor = 'lightgreen';
            target.style.backgroundColor = 'yellow';
            target.style.color = 'var(--color-dark)';      
            target.closest('.answers').querySelectorAll('.wrong-answer').forEach(button => {
                button.style.backgroundColor = 'var(--color-dark)';
                button.style.color = 'white';
            });
        } else {
          target.closest('.quwestion').style.backgroundColor = '';
          target.style.backgroundColor = 'var(--color-dark)';
          target.style.color = 'white';
        }

        itemTextWrong.remove();
        itemTextRight.innerHTML = "&#9989;";
        target.closest('.paragraph')
        target.append(itemTextRight);
        
    } else if (target.classList.contains('wrong-answer')) {
        if (checkbox.querySelector('input').checked == false) {
            target.closest('.quwestion').style.backgroundColor = 'lightcoral';
            target.style.backgroundColor = 'pink';
            target.style.color = 'var(--color-dark)';
            target.closest('.answers').querySelectorAll('.right-answer').forEach(button => {
                button.style.backgroundColor = 'var(--color-dark)'; 
                button.style.color = 'white';
            });
        } else {
          target.closest('.quwestion').style.backgroundColor = '';
          target.style.backgroundColor = 'var(--color-dark)';
          target.style.color = 'white';
        }

        itemTextRight.remove();
        itemTextWrong.innerHTML = "&#10060;";
        target.closest('.paragraph')
        target.append(itemTextWrong);
    }



  // if (areAllRightAnswersChecked) {
  //   checkbox.closest('.quwestion').style.backgroundColor = 'lightgreen'; 
  // } else {
  //   checkbox.closest('.quwestion').style.backgroundColor = ''; 
  // }
});


// ===========================================================
// Интересный код

// const testsContainer = document.querySelector('.tests');

// testsContainer.addEventListener('click', (event) => {
//   const target = event.target;
//   const checkbox = target.closest('label');

//   // Handle checkbox clicks
//   if (checkbox && checkbox.classList.contains('answers-checkbox')) {
//     const checkboxInput = checkbox.querySelector('input');
//     checkboxInput.checked = !checkboxInput.checked; // Toggle checked state
//   }

//   // Handle right answer clicks
//   if (target.classList.contains('right-answer')) {
//     const question = target.closest('.quwestion');
//     const clickedAnswerInput = target.querySelector('input');

//     // Toggle checked state for the clicked right answer
//     clickedAnswerInput.checked = !clickedAnswerInput.checked;

//     question.style.backgroundColor = clickedAnswerInput.checked ? 'lightgreen' : 'var(--color-dark)';
//     target.style.backgroundColor = clickedAnswerInput.checked ? 'yellow' : 'var(--color-dark)';
//     target.style.color = 'var(--color-dark)';

//     const wrongAnswers = question.querySelectorAll('.wrong-answer');
//     wrongAnswers.forEach(button => {
//       button.style.backgroundColor = 'var(--color-dark)'; // Gray out wrong answers
//       button.style.color = 'white';
//     });
//   }
// });






