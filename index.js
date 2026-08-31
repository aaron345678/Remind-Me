const textarea = document.querySelector('input');
const addButton = document.getElementById('addButton');
const todoContainer = document.querySelector('.TaskContainer')
let todolist = []

console.log(todoContainer.innerHTML)
console.log('printed')
console.log(textarea.value); 
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
function addToDo() {
    if(!textarea.value) {
        return;
    } 
    console.log("Added TODO: ",textarea.value)
    todolist.push(textarea.value)
    textarea.value = ''
    updateUI()
}
function removeToDo(index) {
    todolist.splice(index, 1)
    updateUI()
}

function editToDo(index) {
    const newValue = prompt('Edit task:', todolist[index])
    if (newValue === null || !newValue.trim()) {
        return
    }
    todolist[index] = newValue
    updateUI()
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