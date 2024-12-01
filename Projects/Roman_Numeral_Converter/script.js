const convertBtn = document.getElementById('convert-btn');
const numInput = document.getElementById('number');
const output = document.getElementById('output');

const romanNumerals = [
  {
    name: 'units',
    one: 'I',
    five: 'V'
  },
  {
    name: 'tens',
    one: 'X',
    five: 'L'
  },
  {
    name: 'hundreds',
    one: 'C',
    five: 'D',
  },
  {
    name: 'thousands',
    one: 'M',
  }
];

const isInputAcceptable = () => {
  if (!numInput.value) {
    output.innerText = "Please enter a valid number";
    return false;
  } else if (numInput.value < 0) {
    output.innerText = "Please enter a number greater than or equal to 1";
    return false;
  } else if (numInput.value > 3999) {
    output.innerText = "Please enter a number less than or equal to 3999";
    return false;
  }
  return true;
};

const filterInput = () => {
  numInput.value = numInput.value.replace(/[^0-9]/g, '');
};

const numsToChars = (num, index) => {
  let convertedNum = '';
    if (num <= 3) {
      convertedNum = romanNumerals[index].one.repeat(num);
    } else if (num === 4) {
      convertedNum = romanNumerals[index].one + romanNumerals[index].five;
    } else if (num === 5) {
      convertedNum = romanNumerals[index].five;
    } else if (num === 9) {
      convertedNum = romanNumerals[index].one + romanNumerals[index + 1].one;
    } else if (num > 5) {
      convertedNum = romanNumerals[index].five + romanNumerals[index].one.repeat(num % 5);
    }

  return convertedNum;
  }

const convert = () => {
  if (!isInputAcceptable()) {
    return;
  };
  filterInput();

  const numArr = numInput.value.split('').reverse();
  const thousands = parseInt(numArr[3]) || '';
  const hundreds = parseInt(numArr[2]) || '';
  const tens = parseInt(numArr[1]) || '';
  const units = parseInt(numArr[0]);

  const conThousands = numsToChars(thousands, 3);
  const conHundreds = numsToChars(hundreds, 2);
  const conTens = numsToChars(tens, 1);
  const conUnits = numsToChars(units, 0);

  output.innerText = conThousands + conHundreds + conTens + conUnits;
};

convertBtn.addEventListener('click', convert);
numInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    convert();
    return;
  }
})