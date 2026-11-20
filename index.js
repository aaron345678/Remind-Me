const textarea = document.querySelector('input');
const addButton = document.getElementById('addButton');
const todoContainer = document.querySelector('.TaskContainer')
const socket = io()
let todolist = []

function updateUI() {
    let newInnerHTML = ''
    todolist.forEach((todoElement, index) => {
        newInnerHTML += `<div class="Task" data-index="${index}">
            <p>${todoElement}</p>
            <div class ="btnContainer">
                <button class="writeBtn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="iconBtn">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
        `
    })
    todoContainer.innerHTML = newInnerHTML
}

socket.on('todos_update', (data) => {
    todolist = data.todos
    updateUI()
})

function addToDo() {
    if(!textarea.value) {
        return;
    }
    socket.emit('add_todo', { text: textarea.value })
    textarea.value = ''
}

function removeToDo(index) {
    socket.emit('remove_todo', { index })
}

function editToDo(index) {
    const newValue = prompt('Edit task:', todolist[index])
    if (newValue === null || !newValue.trim()) {
        return
    }
    socket.emit('edit_todo', { index, text: newValue })
}

addButton.addEventListener('click', addToDo)

todoContainer.addEventListener('click', (event) => {
    const taskEl = event.target.closest('.Task')
    if (!taskEl) {
        return
    }
    const index = Number(taskEl.dataset.index)
    if (event.target.closest('.iconBtn')) {
        removeToDo(index)
    } else if (event.target.closest('.writeBtn')) {
        editToDo(index)
    }
})
