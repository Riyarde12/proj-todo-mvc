'use strict';

function onInit() {
    renderTodos();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    console.log('Removing Todo', todoId);

    removeTodo(todoId);
    renderTodos();
}

function renderTodos() {
    const todos = getTodosForDisplay();
    console.log('todos', todos);

    if (!todos.length) {
        document.querySelector('.todo-list').innerHTML = '';
        var elH2 = document.querySelector('.massage-no-todos');
        if (gFilterBy === 'DONE') elH2.innerText = 'No done Todos';
        else if (gFilterBy === 'ACTIVE') elH2.innerText = 'No active Todos';
        else if (gFilterBy === 'ALL') elH2.innerText = 'No todos';
    } else {
        var elH2 = document.querySelector('.massage-no-todos');
        var strHTMLs = todos.map(todo =>
            `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt} 
            <span>${todo.createdAt}</span>
            <span>${todo.importance}</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
                </li>`);
        document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
        elH2.innerText = '';
        document.querySelector('.todos-total-count').innerText = getTodosCount();
        document.querySelector('.todos-active-count').innerText = getActiveTodosCount();

    }

}

function onToggleTodo(todoId) {
    console.log('Toggling', todoId);
    toggleTodo(todoId)

    renderTodos()
}

function onAddTodo() {
    const elTxt = document.querySelector('input[name=todoTxt]');
    const txt = elTxt.value.trim();
    const elImportance = document.querySelector('input[name=importance]');
    const importance = elImportance.value;
    if (!txt) return;

    addTodo(txt, importance);

    elTxt.value = '';
    elImportance.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);

    setFilter(filterBy);
    renderTodos();

}

function onSort(sortBy) {
    console.log('sortBy', sortBy);

    sortTodos(sortBy);
    renderTodos();
}

