const testsContainer = document.querySelector('.tests');

testsContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('right-answer')) {
    target.querySelector('input').checked = true;
    target.closest('.quwestion').style.backgroundColor = 'lightgreen';
    target.style.backgroundColor = 'yellow';
    target.style.color = 'var(--color-dark)';      
    target.closest('.answers').querySelectorAll('.wrong-answer').forEach(button => {
      button.style.backgroundColor = 'var(--color-dark)';
      button.style.color = 'white';
    });
  } else if (target.classList.contains('wrong-answer')) {
    target.querySelector('input').checked = true;
    target.closest('.quwestion').style.backgroundColor = 'lightcoral';
    target.style.backgroundColor = 'pink';
    target.style.color = 'var(--color-dark)';
    target.closest('.answers').querySelectorAll('.right-answer').forEach(button => {
      button.style.backgroundColor = 'var(--color-dark)'; 
      button.style.color = 'white';
    });
  }
});




// const testsContainer = document.querySelector('.tests');

// testsContainer.addEventListener('click', (event) => {
//   const target = event.target;

//   if (target.classList.contains('right-answer')) {
//     // Set checked attribute to true for the clicked right answer
//     target.querySelector('input').checked = true;

//     // Style adjustments
//     target.closest('.quwestion').style.backgroundColor = 'lightgreen';
//     target.style.backgroundColor = 'yellow';
//     target.style.color = 'var(--color-dark)';

//     // Dim wrong answers visually
//     target.closest('.answers').querySelectorAll('.wrong-answer').forEach(button => {
//       button.style.backgroundColor = 'var(--color-dark)';
//       button.style.color = 'white';
//     });
//   } else if (target.classList.contains('wrong-answer')) {
//     // No change to checked attribute for wrong answers

//     // Style adjustments
//     target.closest('.quwestion').style.backgroundColor = 'lightcoral';
//     target.style.backgroundColor = 'pink';
//     target.style.color = 'var(--color-dark)';

//     // Dim right answers visually
//     target.closest('.answers').querySelectorAll('.right-answer').forEach(button => {
//       button.style.backgroundColor = 'var(--color-dark)';
//       button.style.color = 'white';
//     });
//   }
// });
