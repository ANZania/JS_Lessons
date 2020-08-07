const num = 266219;

const multiplicateNums = (number) => {
    let result = 1;
    let numArray = number.toString().split('');

    numArray.forEach(element => {
        result *= element;
    });
    
    return(result);
};

const cubeNums = number =>  number ** 3;

const clipTwoChars = (number) => {
    numString = number.toString();

    return( numString[0] + numString[1] );
};


let multiplication = multiplicateNums( num );
let cubeMultiplication = cubeNums( multiplication );
let firstTwoChars = clipTwoChars( cubeMultiplication );

console.log( 'Произведение цифр числа: ' + multiplication );
console.log( 'Куб произведения цифр числа: ' + cubeMultiplication );
console.log( 'Первые 2 цифры: '  + firstTwoChars );