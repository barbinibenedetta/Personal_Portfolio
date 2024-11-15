let price = 4.99;
let cid = [
  ['PENNY', 0],
  ['NICKEL', 0.1],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 10],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

class Register {
  constructor(name) {
    this.name = name;
    this.coins = {
      cid: cid,
      value: {
        PENNY: 0.01,
        NICKEL: 0.05,
        DIME: 0.1,
        QUARTER: 0.25,
        ONE: 1,
        FIVE: 5,
        TEN: 10,
        TWENTY: 20,
        'ONE HUNDRED': 100,
      },
      count: {},
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
      const cashInRegister = this.coins.cid.find(item => item[0] === coin)[1];
      this.coins.count[coin] = Math.floor(cashInRegister / this.coins.value[coin]);
    })
    console.log(this.coins.count);
  }

  changeinCoins() {
    this.countCoins();
    this.coins.cid.forEach((coin, index) => {

    });
  }

  displayChange() {
    Object.keys(this.coins.count).forEach(coin => {
      if (this.coins.count[coin] > 0) {
        changeContainer.innerHTML += `

        `
      }
    })
  }

  handleEdgeCases() {
    if (parseFloat(cashInput.value) < price) {
      alert('Customer does not have enough money to purchase the item');
      return false;
    } else if (parseFloat(cashInput.value) === price) {
      changeContainer.innerText = "No change due - customer paid with exact cash";
      return false;
    } else if (this.change() > this.totalCash()) {
      changeContainer.innerHTML = `Status: INSUFFICIENT_FUNDS<br>`;
      return false;
    } //else if (this.change() <= this.totalCash() && this.change() > )
    
    return true;
  }

}

//document objects
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeContainer = document.getElementById('change-due');

const register = new Register;

purchaseBtn.addEventListener('click', () => {
  if(register.handleEdgeCases()) {
    register.displayChange();
  }
});