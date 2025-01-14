const inputBox = document.getElementById('input');
const listContainer = document.getElementById('list');
const addButton = document.getElementById('add-button');

// Add task when Enter key is pressed
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert('You must write something!');
        return;
    }
    
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement('span');
    span.innerHTML = '×';
    span.className = 'delete-btn';
    li.appendChild(span);
    
    inputBox.value = '';
    saveData();
}

// Event listener for adding tasks
addButton.addEventListener('click', addTask);

// Event listener for checking/removing tasks
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
    } 
    else if (e.target.tagName === 'SPAN') {
        // Add fade-out animation
        e.target.parentElement.style.opacity = '0';
        e.target.parentElement.style.transform = 'translateX(20px)';
        
        // Remove element after animation
        setTimeout(() => {
            e.target.parentElement.remove();
            saveData();
        }, 300);
    }
}, false);

// Function to save the list to localStorage
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

// Function to load saved tasks from localStorage
function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
}

// Display saved tasks on page load
showTask();