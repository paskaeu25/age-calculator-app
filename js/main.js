'use strict';
// Target input elements
const submitBtn = document.querySelector('#submit');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const errorElements = document.querySelectorAll('.error');
const dayError = document.querySelector('#day-error');
const monthError = document.querySelector('#month-error');
const yearError = document.querySelector('#year-error');

// target result elements
const dayResult = document.querySelector('#day-result');
const monthResult = document.querySelector('#month-result');
const yearResult = document.querySelector('#year-result');

// add event listener to submit btn
submitBtn.addEventListener('click', calculateAge);

// write function which will be triggered with event listener


function calculateAge() {
// in function:
    // set current date
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // grab input values
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;
    
    
    function startCalc() {
        // perform calculations
        let calcDay = currentDay - day;
        let calcMonth = currentMonth + 1 - month;
        let calcYear = currentYear - year;

        // handle negative day result
        if (calcDay < 0) {
            calcMonth--;
            const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate()
            calcDay = prevMonthDays + calcDay;
        }

        // Handle negative month result
        if (calcMonth < 0) {
            calcYear--; // Decrement year
            calcMonth = calcMonth + 12; // Adjust month value
        }

        // update results values
        dayResult.textContent = calcDay;
        monthResult.textContent = calcMonth;
        yearResult.textContent = calcYear;
    }

    // add error scenarios

// - Receive validation errors if:
//   - Any field is empty when the form is submitted

if (!day || !month || !year) {
    errorElements.forEach(function(errorElement) {
      errorElement.classList.remove('hidden');
    });
  } else {
    errorElements.forEach(function(errorElement) {
      errorElement.classList.add('hidden');
    });
  
    if (day < 1 || day > 31) {
      dayError.classList.remove('hidden');
      dayError.textContent = 'Must be a valid day.';
    }
  
    if (month < 1 || month > 12) {
      monthError.classList.remove('hidden');
      monthError.textContent = 'Must be a valid month.';
    }
  
    if (year > currentYear) {
      yearError.classList.remove('hidden');
      yearError.textContent = 'Must be in the past.';
    }
  
    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year <= currentYear) {
      startCalc();
      submitBtn.style.background = 'black';
    }
  }
  

//   - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
}


