'use strict';

class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' && item.type !== 'button');
        this.error = new Set();
    }

    init() {
        this.applyStylle();
        this.setPattern();
        this.elementsForm.forEach(elem => {
            elem.addEventListener('change', this.checkIt.bind(this));
        });
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({
                target: elem
            }));
            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },

            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method) {
            const method = this.method[elem.id];

            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id формы и методы');
        }
    }

    checkIt(event) {
        const target = event.target;

        if (this.isValid(target)) {
            console.log('SUC');
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            console.log('ERR');
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const divError = document.createElement('div');
        divError.textContent = 'Ошибка в этом поле';
        divError.classList.add('validator-error');
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStylle() {
        const style = document.createElement('style');
        style.textContent = `
    input.success {
    border: 2px solid green !important;
    }

    input.error {
    border: 2px solid red !important;
    }

    .validator-error {
    font-size: 12px !important;
    color: red !important;
    }
    `;
        document.head.append(style);
    }

    setPattern() {
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        }

        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }

        if (!this.pattern.text) {
            this.pattern.text = /^[А-Яа-я]+\ [А-Яа-я]+\ [А-Яа-я]+$/;
        }

    }
}