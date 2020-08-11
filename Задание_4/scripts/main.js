const argument = 'Съешь ещё этих мягких французских булок, да выпей чаю';

function DoTask4 ( data ) {
    if ( !( typeof( data )  === 'string') ) {
        console.log( 'Аргумент не является строкой' );
    } else {
        data = data.trim();
        if ( data.length > 30 ) {
            data = data.substring( 0,29 ) + '...';
        };
        return data;
    };
};

console.log('Результат: ', DoTask4( argument ));