const textField = document.querySelector<HTMLInputElement>('#input-field');
const button = document.querySelector<HTMLButtonElement>('#submit');
const todoContainer = document.querySelector<HTMLElement>('#todo-container');

type Todo = {
    value: string;
    isChecked: boolean;
    date: Date;
};

// Get todos from local storage and display them
const availableTodo: Todo[] = getLocally();
availableTodo.forEach((element) => {
    createTodo(element);
});

button?.addEventListener('click', (e): void => {
    e.preventDefault();

    if (!textField || !todoContainer) return;

    const todo: Todo = {
        value: textField.value,
        isChecked: false,
        date: new Date(),
    };

    // Save todo and update the UI
    if(createTodo(todo)){
        saveLocally(todo);
        textField.value = '';
    }
    
});

function createTodo(todo: Todo): number {
    if (!todoContainer || todo.value== null || todo.value == '') return 0;
    const todoElement = document.createElement('li');
    const checkbox = document.createElement('input');
    const id= Date.now();
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

function saveLocally(todo: Todo): void {
    const todos = getLocally();
    todos.push(todo);
    localStorage.setItem('Todos', JSON.stringify(todos));
}

function updateTodoInLocalStorage(updatedTodo: Todo): void {
    const todos = getLocally().map(todo =>
        todo.value === updatedTodo.value ? updatedTodo : todo
    );
    localStorage.setItem('Todos', JSON.stringify(todos));
}

function getLocally(): Todo[] {
    const todos = localStorage.getItem('Todos');
    return todos ? JSON.parse(todos) : [];
}
