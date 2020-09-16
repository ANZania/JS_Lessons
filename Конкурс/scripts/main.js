//  объявление массива с данными и получение элементов страницы 

let dataBase = [];
const headerButton = document.querySelector('.header-button');
const catalogHeroes = document.querySelector('.catalog-heroes');

// Валидация инпута периода жизни

const valdateDate = () => {
    const dateInput = document.querySelectorAll('.date-input');
    dateInput.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^\d]/g, '');
        });
    });
};

// Рендер карточек

const renderCard = (data) => {
    
    data.forEach(item => {
        const li = document.createElement('li');
        const realName = item.realName ? item.realName : item.name;
        const yearBirth = item.birthDay ? item.birthDay : '????';
        const yearDeath = item.deathDay ? item.deathDay : '????';
        const citizenshipName = item.citizenship ? item.citizenship : 'Unknown';
        const speciesName = item.species ? item.species[0].toUpperCase() + item.species.substr(1) : 'Unknown';
        
        li.insertAdjacentHTML('beforeend', `
            <img src="${item.photo}" alt="" class="img-hero">
            <div class="info-hero">
                <div class="header-hero">
                    <div class="hero-name">${item.name}</div>
                    <div class="date-hero">${yearBirth} - ${yearDeath}</div>
                </div>
                <div class="hero-list">
                    <div class="list-title">
                        <div class="title-hero real-name-hero-title">Real name:</div>
                        <div class="title-hero status-hero-title">Status:</div>
                        <div class="title-hero gender-hero-title">Gender:</div>
                        <div class="title-hero citizenship-hero-title">Citizenship:</div>
                        <div class="title-hero spice-hero-title">Spice:</div>
                        <div class="title-hero films-hero-title">Films:</div>
                    </div>
                    <div class="list-value">
                        <div class="value-hero real-name-hero-value" title="${realName}">${realName}</div>
                        <div class="value-hero status-hero-value">${item.status[0].toUpperCase() + item.status.substr(1)}</div>
                        <div class="value-hero gender-hero-value">${item.gender[0].toUpperCase() + item.gender.substr(1)}</div>
                        <div class="value-hero citizenship-hero-value">${citizenshipName}</div>
                        <div class="value-hero spice-hero-value">${speciesName}</div>
                        <div class="value-hero films-hero-value"></div>
                    </div>
                </div>
            </div>
        `);
        li.classList.add('card-hero');
        catalogHeroes.append(li);
        const filmValue = li.querySelector('.films-hero-value');
        if (item.movies) {
            item.movies.forEach(i => {
                const div = document.createElement('div');
                div.classList.add('films-hero-value');
                div.textContent = i;
                filmValue.append(div);
            });
        }
        filmValue.style.height = '105px';
        filmValue.style.overflow = 'auto';
    }); 
};

// Фильтр карточек

const filterCard = (data) => {
    const gender = document.getElementsByName('gender');
    let dateInputFrom = document.querySelectorAll('.date-input')[0];
    let dateInputTo = document.querySelectorAll('.date-input')[1];
    let species = document.getElementById('species');
    let filmInput = document.querySelector('.film-input');
    let citizenship = document.getElementById('citizenship');
    let status = document.getElementById('status');
    let genderValue;
    gender.forEach(item => {
        if (item.checked) {
            genderValue = item.value;
        }
    });

    let newDataBase = [];
    
    data.forEach(item => { 
        if (genderValue) {
            if (!(item.gender.toLowerCase() === genderValue)) {
                return;
            }
        }

        if (species.value) {
            if (!(item.species && item.species.toLowerCase() === species.value.toLowerCase())) {
                return;
            }
        }

        if (citizenship.value) {
            if (!(item.citizenship && item.citizenship.toLowerCase() === citizenship.value.toLowerCase())) {
                return;
            }
        }

        if (status.value) {
            if (!(item.status && item.status.toLowerCase() === status.value.toLowerCase())) {
                return;
            }
        }

        if (dateInputFrom.value) {
            if (item.birthDay && parseInt(item.birthDay) > parseInt(dateInputFrom.value)) {
                if (item.deathDay) {
                    if (!(parseInt(item.deathDay) > parseInt(dateInputFrom.value))) {
                        return;
                    }
                }
            } else {
                return;
            }
        }

        if (dateInputTo.value) {
            if (!(item.deathDay && parseInt(item.deathDay) < parseInt(dateInputTo.value))) {
                
                return;
            }
        }

        if (filmInput.value) {
            let counter = 0;
            if (item.movies) {
                item.movies.forEach(elem => {
                    if (elem && elem.toLowerCase().includes(filmInput.value.toLowerCase())) {
                        counter++;
                    }
                });
                if (counter === 0) {
                    return;
                }
            } else {
                return;
            }
        }

        newDataBase.push(item);
    });

    catalogHeroes.textContent = '';

    console.log(newDataBase);
    if (newDataBase.length === 0) {
        alert('Простите, но ни один герой с такими параметрами не был найден');
        renderCard(data);

        dateInputFrom.value = '';
        dateInputTo.value = '';
        species.value = '';
        filmInput.value = '';
        citizenship.value = '';
        status.value = '';

        gender.forEach((item) => {
            item.checked = false;
        })
    } else {
        renderCard(newDataBase);
    }

};

// Создание и отправление запроса

const addRequest = () => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            dataBase = JSON.parse(request.response);
            renderCard(dataBase);
            document.querySelector('form').addEventListener('submit', (event) => {
                event.preventDefault();
                filterCard(dataBase);
            });
        } else {
            console.log('Error');
        }
    });
    request.open('GET', './dbHeroes.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
}

valdateDate();
addRequest();

