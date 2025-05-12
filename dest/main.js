"use strict";
const textField = document.querySelector('#input-field');
const button = document.querySelector('#submit');
const todoContainer = document.querySelector('#todo-container');
// Get todos from local storage and display them
const availableTodo = getLocally();
availableTodo.forEach((element) => {
    createTodo(element);
});
button === null || button === void 0 ? void 0 : button.addEventListener('click', (e) => {
    e.preventDefault();
    if (!textField || !todoContainer)
        return;
    const todo = {
        value: textField.value,
        isChecked: false,
        date: new Date(),
    };
    // Save todo and update the UI
    if (createTodo(todo)) {
        saveLocally(todo);
        textField.value = '';
    }
});
function createTodo(todo) {
    if (!todoContainer || todo.value == null || todo.value == '')
        return 0;
    const todoElement = document.createElement('li');
    const checkbox = document.createElement('input');
    const id = Date.now();
    checkbox.type = 'checkbox';
    checkbox.checked = todo.isChecked;
    checkbox.setAttribute('id', `${id}`);
    // Toggle the checkbox state and update local storage
    checkbox.addEventListener('change', () => {
        todo.isChecked = checkbox.checked;
        updateTodoInLocalStorage(todo);
    });
    const label = document.createElement('label');
    label.innerText = todo.value;
    label.setAttribute('for', `${id}`);
    todoElement.appendChild(checkbox);
    todoElement.appendChild(label);
    todoContainer.appendChild(todoElement);
    return 1;
}
function saveLocally(todo) {
    const todos = getLocally();
    todos.push(todo);
    localStorage.setItem('Todos', JSON.stringify(todos));
}
function updateTodoInLocalStorage(updatedTodo) {
    const todos = getLocally().map(todo => todo.value === updatedTodo.value ? updatedTodo : todo);
    localStorage.setItem('Todos', JSON.stringify(todos));
}
function getLocally() {
    const todos = localStorage.getItem('Todos');
    return todos ? JSON.parse(todos) : [];
}
