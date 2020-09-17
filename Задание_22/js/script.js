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
                <button class="change"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>`;
            li.style.minHeight = '0px';
            li.style.opacity = '0%';
        li.insertAdjacentHTML('beforeend', htmlContent);

        if (todo.animAppear) {
            this.animateAppear(li);
            todo.animAppear = false;
        } else {
            li.style.minHeight = '50px';
            li.style.opacity = '100%';
        }
        
        
        const editButton = li.querySelector('.change');

        if (todo.editable) {
            editButton.classList.remove('change');
            editButton.classList.add('todo-check-mark');
            li.contentEditable = true;
            setTimeout(() => {
                li.focus();
            }, 0);
            
            li.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    todo.editable = false;
                    todo.value = li.textContent.trim();
                    this.render();
                }
            })
        } else {
            editButton.classList.remove('change');
            editButton.classList.add('todo-edit');
            li.contentEditable = false;
        } 

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
                editable: false,
                animAppear: false,
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
                this.animateDelete(item);           
            }
        });
        setTimeout(() => {
            this.render();
        }, 200)
    }

    completeItem(item) {
        this.todoData.forEach((element) => {
            if (this.equalsItem(element, item)) {
                element.completed = !element.completed;
                item.animAppear = true;
                this.animateDelete(item, 500);          
            }
            setTimeout(() => {
                this.render();
            }, 250)
        });
    } 

    editItem(item) {
        this.todoData.forEach((element) => {
            if (this.equalsItem(element, item)) {
                element.editable = true;
                const button = item.querySelector('.todo-edit');
                button.classList.remove('todo-edit');
                button.classList.add('.todo-check-mark')
            }
            this.render();
        })
    }

    unEditItem(item) {
        this.todoData.forEach((element) => {
            if (this.equalsItem(element, item)) {
                element.editable = false;
                element.value = item.textContent.trim()
                const button = item.querySelector('.todo-check-mark');
                button.classList.remove('todo-check-mark');
                button.classList.add('.todo-edit')
            }
            this.render();
        })
    }

    animateDelete(item, duration = 400) {

        let start = performance.now();
        let height = 50;
        const draw = (timeFraction) => {
            item.textContent = '';
            item.style.lineHeight = '0px';
            let resultHeight = Math.floor(height * (1 - timeFraction)) + 'px';
            let resultOpacity = Math.floor(100 * (1 - timeFraction)) + '%';
            item.style.minHeight = resultHeight;
            item.style.opacity = resultOpacity;
        
        }
        
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            if (timeFraction > 0) {
                draw(timeFraction);
            }
        
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        
        });
    }
    animateAppear(item, duration = 400) {

        let start = performance.now();
        let height = 0;
        const draw = (timeFraction) => {
            let resultHeight = Math.floor(height * timeFraction) + 'px';
            let resultOpacity = Math.floor(100 * timeFraction) + '%';
            item.style.minHeight = resultHeight;
            item.style.opacity = resultOpacity;
        
        }
        
        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            if (timeFraction > 0) {
                draw(timeFraction);
            }
        
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        
        });
    }

    handler(event) {
         let target = event.target;
         let item = target.closest('.todo-item');
         if (target.matches('.todo-complete')) {
             this.completeItem(item);
         } else if (target.matches('.todo-remove')) {
             this.deleteItem(item);
         } else if (target.matches('.todo-edit')) {
             this.editItem(item);
         } else if (target.matches('.todo-check-mark')) {
             this.unEditItem(item);
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