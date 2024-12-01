const checkBtn = document.getElementById('check-btn');
const textInput = document.getElementById('text-input');
const resultDiv = document.getElementById('result')
let inputValue;

document.getElementById("input-form").addEventListener("submit", function(event) {
    event.preventDefault()});

checkBtn.addEventListener('click', () => {
  inputValue = textInput.value;
  if (!inputValue) {
    alert("Please input a value");
  } else {
    const filteredArray = removeSpaces(inputValue);
    const reversedArray = removeSpaces(inputValue).reverse();
    const filteredString = filteredArray.join('').toLowerCase();
    const reversedString = reversedArray.join('').toLowerCase();
    displayResult(filteredString, reversedString);
  }
});

function removeSpaces(string) {
  const charArray = string.split('');
  return charArray.filter(char => /^[a-z0-9]$/i.test(char));
}

function displayResult(filteredString, reversedString) {
  if (filteredString === reversedString) {
    resultDiv.innerText = `${inputValue} is a palindrome`;
    console.log(filteredString);
    console.log(reversedString);
  } else {
    resultDiv.innerText = `${inputValue} is not a palindrome`;
    console.log(filteredString);
    console.log(reversedString);
  }
}