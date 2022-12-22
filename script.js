'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Ambresh Kumar Saini',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Atharva Singh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Avinash Pratap Singh',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Vedant Shukla',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMov = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMov(account1.movements);

const calcPrintBalance = function (movements) {
  const calcBalance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${calcBalance}€`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// calcDisplaySummary(account1.movements);

const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
console.log(accounts);

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome Back! ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Display Movements
    displayMov(currentAccount.movements);

    //Display balance
    calcPrintBalance(currentAccount.movements);

    //Display summary
    calcDisplaySummary(currentAccount.movements);
  }
});

// LECTURES

/////////////////////////////////////////////////
//SLICE - it doesn't affects actual arrays => actually it makes copy of that part
let ar = ['a', 'b', 'c', 'd', 'e'];
console.log(ar.slice());
console.log(ar.slice(2));
console.log(ar.slice(2, 4)); //here both ar indeces copy from ind 2 - 3
console.log(ar.slice(-2), ar.slice(-1));
console.log(ar.slice(1, -2));

//SPLICE - it affects actual array
ar.splice(-1);
console.log(ar);
ar.splice(1, 2); //while here first one is index & other one is length
console.log(ar);
// console.log(ar.splice(3));
// console.log(ar);

//REVERSE
ar = ['a', 'b', 'c', 'd', 'e'];
console.log(ar.reverse());
console.log(ar); //it affects actual array
let arr = ar;

//CONCAT
ar = ['a', 'b', 'c', 'd', 'e'];
console.log(ar.concat(arr));
console.log([...ar, ...arr]);

//JOIN
console.log(ar.join(' * '));

//FOR-EACH LOOP
//Arrays
let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
movements.forEach(function (movement) {
  if (movement > 0) console.log(`You deposited ${movement}`);
  else console.log(`You withdrew ${Math.abs(movement)}`);
});

// Order should be element => index => array
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

//Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//The Map Method
movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurtoUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurtoUsd;
});
//-----------------------OR-----------------------------
const movementsUSD1 = movements.map(mov => mov * eurtoUsd);
console.log(movements);
console.log(movementsUSD1);

//The Filter Method
console.log(movements);
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);
const withd = movements.filter(mov => mov < 0);
console.log(withd);

//The Reduce Method
console.log(movements);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

//Maximum Value --> The Reduce Method
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

//The Magic of Chaining Method
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurtoUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//The Find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jonas Schmedtmann');
console.log(account);

///////////////////////////////////////////////////////
// Numbers, Dates & Times
console.log('---Numbers, Dates & Times---');

console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number('23'));
console.log(+'23'); // type-coercion using '+'

// Parsing 
console.log(Number.parseInt('30px'));
console.log(Number.parseInt('e23'));

console.log(Number.parseFloat('2.5rem'));
console.log(Number.parseInt('2.5rem'));

//Check if value is not a number
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(Number.parseInt('e23')));
console.log(Number.isNaN(23 / 0));

//Check if value is a Number
console.log(Number.isFinite(2));
console.log(Number.isFinite(23 / 0));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20'));

console.log(Number.isFinite(20));
console.log(Number.isInteger('20'));
console.log(Number.isFinite(+'20'));

//Maths and Rounding 
console.log(Math.sqrt(25));
console.log( 25 ** 1/2);  //Actually it is 25^(1/2)
console.log( 25 ** 2); 
console.log(2 ** 3);

console.log(Math.max(5,8,9,111,121));
console.log(Math.max(5,8,'9px',111,121));
console.log(Math.min(5,8,111,121));

console.log(Math.PI * Number.parseFloat('10rem') ** 2);

console.log(Math.random()* 6 );
console.log(Math.trunc(Math.random() *10)+1) ; //Math.trunc() neglect the decimal part

//Random between two number
const randomInt = (min,max) => Math.trunc(Math.random() * (max - min) + 1)+ min;   //0...1 -> 0...(max-min) -> min...max

console.log(randomInt (10, 20));

// Rounding Intergers
console.log(Math.trunc(23.3));

console.log(Math.round(23.3));
console.log(Math.round(23.6));

console.log(Math.ceil(23.3));
console.log(Math.floor(23.9));

// Rounding Decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2));
























