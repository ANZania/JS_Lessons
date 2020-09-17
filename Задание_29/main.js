
const input = document.querySelector('.input-value');
const output = document.querySelector('.output-value');
const button = document.querySelector('button');
const selectInput = document.getElementById('input');
const selectOutput = document.getElementById('output');

const addFetch = () => {
    return fetch('https://api.exchangeratesapi.io/latest');
};

const konvert = (data) => {
    let result;
    if (selectInput.value === 'EUR' && selectOutput.value !== 'EUR') {
        result = (input.value * data.rates[selectOutput.value]).toFixed(3);
    } else if (selectOutput.value !== 'EUR') {
        result = ((input.value / data.rates[selectInput.value]) * data.rates[selectOutput.value]).toFixed(3);
    } else if (selectOutput.value === 'EUR' && selectInput.value !== 'EUR') {
        result = (input.value * (1 / data.rates[selectInput.value])).toFixed(3);
    } else {
        result = input.value.toFixed(3);
    }
    output.value = result;
};

addFetch()
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('Status network is not 200');
        }
        return response.json();
    })
    .then((response) => {
        button.addEventListener('click', () => {
           konvert(response);
        });
    });