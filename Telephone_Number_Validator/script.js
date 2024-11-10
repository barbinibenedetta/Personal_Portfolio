const checkBtn = document.getElementById('check-btn');
const clearBtn = document.getElementById('clear-btn');
const userInput = document.getElementById('user-input');
const resultsDiv = document.getElementById('results-div');

const regex = /^1?\s*(\(\d{3}\)|\d{3})\s*-?\d{3}\s*-?\d{4}$/;
const checkFun = () => {
  if (regex.test(userInput.value)) {
    resultsDiv.innerText = `Valid US number: ${userInput.value}`
  } else {
    resultsDiv.innerText = `Invalid US number: ${userInput.value}`
  }
};

checkBtn.addEventListener('click', () => {
  if (!userInput.value) {
    alert('Please provide a phone number');
  } else {
    checkFun();
  }
});

clearBtn.addEventListener('click', () => {
  resultsDiv.innerText = '';
  userInput.value = '';
});