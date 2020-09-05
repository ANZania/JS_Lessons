'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);

        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    addToStorage() {
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        let htmlContent = `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`
        li.insertAdjacentHTML('beforeend', htmlContent);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }

    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            alert('Нельзя добавить пустое дело!')
        }
        this.input.value = '';
    }

    equalsItem = (element, item) => {
        if (element.key === item.key ){
            return true;
        } else {
            return false;
        }
    }

    generateKey() {
        return Math.random().toString(36).substr(2, 15) + Math.random().toString(36).substr(2, 15);
    }

    deleteItem(item) {
        this.todoData.forEach((element) => {
            if (this.equalsItem(element, item)) {
                this.todoData.delete(element.key);            
            }
            this.render();
        });
    }

    completeItem(item) {
        this.todoData.forEach((element) => {
            if (this.equalsItem(element, item)) {
                element.completed = !element.completed;            
            }
            this.render();
        });
    } 

    handler(event) {
         let target = event.target;
         let item = target.closest('.todo-item');
         if (target.matches('.todo-complete')) {
             this.completeItem(item);
         } else if (target.matches('.todo-remove')) {
             this.deleteItem(item);
         };
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.todoContainer.addEventListener('click', this.handler.bind(this));
        this.render();
    }

};

const todo = new Todo ('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init(); 