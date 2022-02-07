'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'ALL';
var gSoringBy;
_createTodos();

function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos;

    return gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'DONE' ||
        !todo.isDone && gFilterBy === 'ACTIVE'
    );
}

function removeTodo(todoId) {
    if (confirm('Delete?')) {
        const idx = gTodos.findIndex(todo => todo.id === todoId);
        gTodos.splice(idx, 1);
        _saveTodosToStorage();
    } return
}

function toggleTodo(todoId) {
    var todo = gTodos.find(todo => todo.id === todoId);
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance);
    gTodos.unshift(todo);

    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length;
}

function getActiveTodosCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone);
    return activeTodos.length;
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function sortTodos(sortBy) {

    switch (sortBy) {
        case 'CREATED':
            gTodos.sort((t1, t2) => t1.createdAt - t2.createdAt);
            break;
        case 'TXT':
            gTodos.sort((t1, t2) => (t1.txt.toUpperCase() > t2.txt.toUpperCase()) ? 1 : -1);
            break;
        case 'IMPORTANCE':
            gTodos.sort((t1, t2) => t1.importance - t2.importance);
            break;
        default:
            break;
    }

}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML', 1),
            _createTodo('Study CSS', 3),
            _createTodo('Master Javascript', 2),
        ];
        _saveTodosToStorage();
    }
}

function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: importance,
    };
    return todo;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}




