'use strict'


// Задание 1

let arr = ['2345', '1234', '5000', '28', '6721334', '44065', '2144'];
let result = [];

for ( let i = 0; i < arr.length; i++ ) {
    let firstNum = arr[i][0];

    if ( firstNum === '2' || firstNum === '4' ) {
        result.push( arr[i] );
    }
};

console.log( result.join( ', ' ) );


// Задание 2

for ( let number = 1; number < 101; number++ ) {
    let multiplier = 2;

    for ( multiplier; multiplier < number; multiplier++ ) {
        if ( number % multiplier === 0) {
            break;
        };
    };
    if ( multiplier === number && multiplier != 2) {
        console.log( number + ' - делители этого числа: ' + '1' + number );
    };
}