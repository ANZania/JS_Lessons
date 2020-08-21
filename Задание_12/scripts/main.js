'use strict'


const headerInput = document.querySelector('.header-input');
const todoContainer = document.querySelector('.todo-container');
const todoControl = document.querySelector('.todo-control');
const todoList = document.getElementById('todo');
const todoCompleted = document.getElementById('completed');

let todoData = JSON.parse(localStorage.getItem('todoData'));
if (todoData === null) {
    todoData = [];
};

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach( function(item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>
        `;

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        };

        const todoComplete = li.querySelector('.todo-complete');

        todoComplete.addEventListener('click', function () {
            item.completed = !item.completed;
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });

        const todoRemove = li.querySelector('.todo-remove');

        todoRemove.addEventListener('click', function () {
            todoData = todoData.filter(function (elem) {
                if (elem.value !== item.value) {
                    return elem;
                };
            });
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        });
    });
};

todoControl.addEventListener( 'submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim() !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        }
        todoData.push(newTodo);
        headerInput.value = '';
    };
    localStorage.setItem('todoData', JSON.stringify(todoData));
    render();
} );

render();
