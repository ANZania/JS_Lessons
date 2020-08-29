const registrationBtn = document.getElementById('reg');
const loginBtn = document.getElementById('login');
const list = document.getElementById('id-list');
const userNameBlock = document.getElementById('username');
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

let userData = JSON.parse(localStorage.getItem('userData'));

let userName = JSON.parse(localStorage.getItem('userName'));
if (userData === null) {
    userData = [];
};
if (userName === null) {
    userName = 'Аноним';
};

const registration = () => {
    let newUser = {};
    let userName;
    do {
        userName = prompt('Введите свои имя и фамилию через пробел:');
    } while (!validate(userName));

    newUser.firstName = userName.slice(0, userName.indexOf(' '));
    newUser.lastName = userName.slice(userName.indexOf(' ') + 1);
    newUser.login = prompt('Введите логин:');
    newUser.password = prompt('Введите пароль:');

    newUser.date = getDate();

    userData.push(newUser);
    localStorage.setItem('userData', JSON.stringify(userData));
    render();
    
};

const login = () => {
    let userLogin = prompt('Введите ваш логин');
    let userPassword = prompt('Введите ваш пароль');
    let isAuthorised = false;

    userData.forEach( (element) => {
        if (element.login === userLogin && element.password === userPassword) {
            userNameBlock.textContent = element.firstName;
            localStorage.setItem('userName', JSON.stringify(element.firstName));
            isAuthorised = true;
        };
    });
    
    if (!isAuthorised) {
        alert('Пользователь не найден');
    };
}

const getDate = () => {
    let regDate = new Date ();
    let regMonth = months[regDate.getMonth()];

    let userString = regDate.getDay() + ' ' + regMonth + ' ' + regDate.getFullYear() + ' г., ' + addZero(regDate.getHours()) + ':' + addZero(regDate.getMinutes()) + ':' + addZero(regDate.getSeconds());

    return userString;
};

const addZero = (number) => {
    if (( '' + number ).length === 1 ) {
        number = '0' + number;
        return number;

    } else {
        return number;
    }
};

const validate = (userName) => {
    userName = userName.trim();
    
    if (/^[а-яё]+ [а-яё]+$/i.test(userName)) {
        return true;
    } else {
        return false;
    }
};

const isNumber = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


const render = () => {
    list.textContent = '';
    userNameBlock.textContent = userName;
    for (let key in userData) {
        const li = document.createElement('li');
        li.classList.add('user-line');
    
        li.innerHTML = `
        Имя: ${userData[key].firstName}, фамилия: ${userData[key].lastName}, зарегистрирован: ${userData[key].date}
        <button class = 'del'> Удалить </button>
        `;
    
        const btnDel = li.querySelector('.del');
    
        btnDel.addEventListener('click', () => {
            userData.splice(key, 1);
            localStorage.setItem('userData', JSON.stringify(userData));
            render();
        });
    
    list.append(li);
    }
};

render();
registrationBtn.addEventListener('click', registration);
loginBtn.addEventListener('click', login);