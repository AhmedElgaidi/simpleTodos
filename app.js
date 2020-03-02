// DOM refrences
const addForm = document.querySelector('.add');
const todosList = document.querySelector('.todos');
const searchForm  = document.querySelector('.search');
const searchInput = document.querySelector('.search input');

//  Function to add an item to our list
const generateTemplate = todo => {
    // create a template 
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    todosList.innerHTML += html;

    if(todosList.length != 0) {
        searchInput.classList.remove('hidden')
    }
};

// Add event listener to our form
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim()   // to remove the white space
    if(todo.length != 0) {
        generateTemplate(todo);
        addForm.reset()         // to reset all mentioned form input fields
    }
});

// Delete item from our list
todosList.addEventListener('click', event => { // for performance, Use delegation event
    if(event.target.classList.contains('delete')) {
        event.target.parentElement.remove();// remove parent element (li)
    }
});

// A function for filtering the todos list
const filterTodos = (term) => {
    if(term !=0) {
    // for filtered li
    Array.from(todosList.children)      // All li
        .filter(todo => { // create new array     => only item which give true is add
            return !todo.textContent.toLowerCase().includes(term);// if li contains this term, it will be add to the array
        })
        .forEach(todo => todo.classList.add('filtered'));
    // for matched li
    Array.from(todosList.children)
        .filter(todo => {
            return todo.textContent.toLowerCase().includes('term')
        })
        .forEach(todo => todo.classList.remove('matched'))
    }else {
        Array.from(todosList.children)
            .forEach(todo => todo.classList.remove('filtered')).add('matched')
    }
};

// search for an item   => key up event
searchForm.addEventListener('submit', e => {
    e.preventDefault();
});
searchInput.addEventListener('keyup', e => {
    e.preventDefault();
    const term = searchInput.value.trim().toLowerCase();
    filterTodos(term);
});
