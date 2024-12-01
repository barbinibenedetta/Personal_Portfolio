let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

class Register {
  constructor(name) {
    this.name = name;
    this.coins = {
      value: {
        'PENNY': 0.01,
        'NICKEL': 0.05,
        'DIME': 0.1,
        'QUARTER': 0.25,
        'ONE': 1,
        'FIVE': 5,
        'TEN': 10,
        'TWENTY': 20,
        'ONE HUNDRED': 100,
      },
      count: {},
      change: {},
    };
  }

  totalCash() {
    return cid.reduce((amount, coin) => amount + coin[1], 0);
  }

  change() {
    return parseFloat(cashInput.value) - price;
  }

  countCoins() {
    Object.keys(this.coins.value).forEach(coin => {
      const cashInRegister = cid.find(item => item[0] === coin)[1];
      this.coins.count[coin] = Math.floor(cashInRegister / this.coins.value[coin]);
    })
  }

  changeInCoins() {
    this.countCoins();
    let change = this.change();
    for (let i = Object.keys(this.coins.value).length - 1; i >= 0; i--) {
      const coinsInRegisterCount = this.coins.count[cid[i][0]];
      const coinValue = this.coins.value[cid[i][0]];
      const maxNumOfCoins = Math.floor(change / coinValue);

      if (maxNumOfCoins <= coinsInRegisterCount) {
        this.coins.change[cid[i][0]] = maxNumOfCoins;
        this.coins.count[cid[i][0]] -= maxNumOfCoins;
        //{change = change % coinValue} with due adjustments to avoid float calc errors
        change = Math.round((change * 100) % (coinValue * 100)) / 100;
      } else {
        this.coins.change[cid[i][0]] = coinsInRegisterCount;
        this.coins.count[cid[i][0]] -= coinsInRegisterCount;
        change = (change * 100 - cid[i][1] * 100) / 100;
      }
    }
  }

  availableChangeInCoins() {
    this.changeInCoins();
    let result = 0;

    for (const key in this.coins.change) {
      result += this.coins.change[key] * this.coins.value[key];
    }
    return result;
  }

  displayChange() {
    for (let i = Object.keys(this.coins.change).length - 1; i >= 0; i--) {
      const countChangeCoins = this.coins.change[cid[i][0]];
      const coinKey = cid[i][0];
      const coinValue = this.coins.value[cid[i][0]];
      if (countChangeCoins > 0) {
        changeContainer.innerHTML += `${coinKey}: $${countChangeCoins * coinValue}<br>`;
      }
    }
  }

  handleEdgeCases() {
    if (!parseFloat(cashInput.value)) {
      alert('Please enter a valid number');
      return false;
    } else if (parseFloat(cashInput.value) < price) {
      alert('Customer does not have enough money to purchase the item');
      return false;
    } else if (parseFloat(cashInput.value) === price) {
      changeContainer.innerText = "No change due - customer paid with exact cash";
      return false;
    } else if (this.change() > this.totalCash()) {
      changeContainer.innerHTML = `Status: INSUFFICIENT_FUNDS<br>`;
      return false;
    } else if (this.change() <= this.totalCash() && this.change() > this.availableChangeInCoins()) {
      changeContainer.innerHTML = `Status: INSUFFICIENT_FUNDS<br>`;
      return false;
    }
    
    return true;
  }

}

//document objects
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeContainer = document.getElementById('change-due');
const cashRegister = document.getElementById('cash-register-p');
const priceSpan = document.getElementById('price-span');

const register = new Register;

const updateCashRegister = (obj) => {
  priceSpan.innerText = price;
  cashRegister.innerHTML = `Pennies: $${obj['PENNY'] * register.coins.value['PENNY']}<br>
    Nickels: $${obj['NICKEL'] * register.coins.value['NICKEL']}<br>
    Dimes: $${obj['DIME'] * register.coins.value['DIME']}<br>
    Quarters: $${obj['QUARTER'] * register.coins.value['QUARTER']}<br>
    Ones: $${obj['ONE'] * register.coins.value['ONE']}<br>
    Fives: $${obj['FIVE'] * register.coins.value['FIVE']}<br>
    Tens: $${obj['TEN'] * register.coins.value['TEN']}<br>
    Twenties $${obj['TWENTY'] * register.coins.value['TWENTY']}<br>
    Hundreds $${obj['ONE HUNDRED'] * register.coins.value['ONE HUNDRED']}<br>`
};
register.countCoins();
updateCashRegister(register.coins.count);

const eventListenerFun = () => {
  if(register.handleEdgeCases()) {
    changeContainer.innerHTML = `Status: OPEN<br>`;
    updateCashRegister(register.coins.count);
    if (Object.values(register.coins.count).every(value => value === 0)) {
      changeContainer.innerHTML = `Status: CLOSED<br>`;
    }
    register.displayChange();
  }
}

purchaseBtn.addEventListener('click', () => {
  eventListenerFun();
});

cashInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    eventListenerFun();
  }
});