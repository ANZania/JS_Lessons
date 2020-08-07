let money = 30000;
let income = 'фриланс';
let addExpenses = 'интернет, такси, коммуналка, продукты';
let deposit = true;
let mission = 250000;
let period = 12;
let budgetDay = money / 30;

console.log( 'money is ' + typeof money );
console.log( 'income is ' + typeof income );
console.log( 'deposit is ' + typeof deposit );

console.log( 'addExpenses length: ' + addExpenses.length );

console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );

console.log( addExpenses.toLowerCase().split(', ') );

console.log( 'budgetDay: ' + budgetDay );
