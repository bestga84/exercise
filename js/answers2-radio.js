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
    target.innerHTML = "&#10060;";
  }
});
//==============================================================


/*
const testsContainer = document.querySelector('.tests');

testsContainer.addEventListener('click', (event) => {
  const target = event.target;
  const checkbox = target.closest('label'); // Find the closest label element

  // Check if clicked element is a label within the answers container
  if (checkbox && checkbox.classList.contains('answers-checkbox')) {
    const checkboxInput = checkbox.querySelector('input');

    // Update checked state for the checkbox
    checkboxInput.checked = !checkboxInput.checked; // Toggle checked state

    // Check if all checkboxes (right and wrong) are checked
    const allChecked = checkbox.closest('.quwestion-checkbox').querySelectorAll('input:checked');
    const totalCheckboxes = checkbox.closest('.quwestion-checkbox').querySelectorAll('input');
    const allSelected = allChecked.length === totalCheckboxes.length;

    // Update background color based on all selections
    checkbox.closest('.quwestion').style.backgroundColor = allSelected ? 'lightgreen' : 'var(--color_dark)';

    // No need to style individual checkboxes as they are part of the label
  }
});
*/




// ==============================================================

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
