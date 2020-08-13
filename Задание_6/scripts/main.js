'use strict'

const main = function () {
    let number = Math.ceil( Math.random() * 100 ) + 1;
    let userNum,
        startCond,
        attempt,
        attemptLost,
        win;

    const nextTry = function () {
        let isContinue = confirm( 'Хотите попробовать ещё раз?' );

        if ( isContinue ) {
            main();

        } else {
            alert( 'Игра окончена' );

        };
    };

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
        if ( attempt > 0 ) {
            inputUserNum();
            if ( startCond === false ) {
                return;
            } else if ( +userNum === number ) {
                startCond = false;
                win = true;

                return alert( 'Вы угадали!' );

            } else {
                if ( userNum > number ) {
                    attempt -= 1;
                    alert( 'Загаданное число меньше. \nКоличество ваших попыток: ' + attempt );

                } else if ( userNum < number ) {
                    attempt -= 1;
                    alert( 'Загаданное число больше. \nКоличество ваших попыток: ' + attempt );

                };

                checkUserNum();
            };
        } else {
            attemptLost = true;
            return alert( 'У вас закончились попытки!' );
        }
    };

    if ( !isStart() ) {
        alert( 'Игра окончена' );

    } else {
        const start = function () {
            attempt = 10;

            checkUserNum();
            if ( startCond === false ) {
                return;
            }
        };

        start();
        
        if ( attemptLost ) {
            nextTry();

        } else if ( startCond === false && !win === true ) {
            alert( 'Игра окончена' );

        } else if ( win === true ) {
            nextTry();
        };
    };
};

main()