'use strict'

const main = function () {
    let number = Math.round( Math.random() * 100 );
    let userNum,
        startCond;


    const isStart = function () {
        startCond = confirm( 'Начать игру? ' );
        return startCond;
    };

    const isNum = function ( number ) {
        return !isNaN( number );
    };

    const inputUserNum = function  () {
        userNum = prompt( 'Угадайте число от 1 до 100' );
        if ( userNum === null ) {
            startCond = false;
            return;

        } else if ( !isNum( userNum ) ) {
            alert( 'Введите число!' );
            inputUserNum();
        };

        return;
    };

    const checkUserNum = function () {
        inputUserNum();
        if ( startCond === false ) {
            return;
        } else if ( +userNum === number ) {
            startCond = false;
            return alert( 'Вы угадали!' );
        } else {
            if ( userNum > number ) {
                alert( 'Загаданное число меньше' );
            } else if ( userNum < number ) {
                alert( 'Загаданное число больше' );
            };

            checkUserNum();
        };
    };

    if ( !isStart() ) {
        alert( 'Игра окончена' );
    } else {
        const start = function () {
            checkUserNum();
            if ( startCond === false ) {
                return;
            }
        }

        start();
        if ( startCond === false ) {
            alert( 'Игра окончена' );
        }
    };
};
main()