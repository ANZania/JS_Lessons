'use strict'

const advertisement = document.querySelector('.adv');
const booksCollection = document.querySelector('.books');

const book1 = document.querySelectorAll('.book')[1];
const book2 = document.querySelectorAll('.book')[0];
const book3 = document.querySelectorAll('.book')[4];
const book4 = document.querySelectorAll('.book')[3];
const book5 = document.querySelectorAll('.book')[5];
const book6 = document.querySelectorAll('.book')[2];
const head3 = book3.getElementsByTagName('h2')[0];

const chapters2 = book2.getElementsByTagName('ul');
const chapters5 = book5.getElementsByTagName('ul');
const chapters6 = book6.getElementsByTagName('ul');

const paragraph = document.createElement('li');
paragraph.textContent = 'Глава 8: За пределами ES6';

book1.remove();
book2.remove();
book3.remove();
book4.remove();
book5.remove();
book6.remove();

booksCollection.insertAdjacentElement('beforeend', book1);
booksCollection.insertAdjacentElement('beforeend', book2);
booksCollection.insertAdjacentElement('beforeend', book3);
booksCollection.insertAdjacentElement('beforeend', book4);
booksCollection.insertAdjacentElement('beforeend', book5);
booksCollection.insertAdjacentElement('beforeend', book6);

chapters2[0].children[9].after(chapters2[0].children[2]);
chapters2[0].children[7].after(chapters2[0].children[3]);
chapters2[0].children[7].after(chapters2[0].children[3]);
chapters2[0].children[7].after(chapters2[0].children[4]);

chapters5[0].children[4].after(chapters5[0].children[2]);
chapters5[0].children[1].after(chapters5[0].children[9]);
chapters5[0].children[8].after(chapters5[0].children[6]);

chapters6[0].children[8].after(paragraph);

head3.getElementsByTagName('a')[0].textContent = 'Книга 3. this и Прототипы Объектов';
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
advertisement.remove();