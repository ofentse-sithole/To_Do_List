const inputBox = document.getElementById('input');
const listContainer = document.getElementById('list');
const addButton = document.getElementById('add-button');

// Add task when Enter key is pressed
inputBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function createTaskElement(taskText, isCompleted = false) {
  let li = document.createElement('li');
  li.innerHTML = taskText;
  if (isCompleted) {
      li.classList.add('completed');
  }

  // Create button container
  let buttonGroup = document.createElement('div');
  buttonGroup.className = 'button-group';

  // Create completed button
  let completedButton = document.createElement('button');
  completedButton.innerHTML = isCompleted ? 'Undo' : 'Completed';
  completedButton.className = 'completed-btn';
  completedButton.addEventListener('click', function() {
      li.classList.toggle('completed');
      if (li.classList.contains('completed')) {
          completedButton.innerHTML = 'Undo';
      } else {
          completedButton.innerHTML = 'Completed';
      }
      saveData();
  });
  
  // Create delete button
  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', function() {
      li.remove();
      saveData();
  });

  // Add buttons to button group
  buttonGroup.appendChild(completedButton);
  buttonGroup.appendChild(deleteButton);
  
  // Add button group to list item
  li.appendChild(buttonGroup);

  return li;
}

// Function to add a new task
function addTask() {
    if (inputBox.value.trim() === '') {
        alert('You must write something!');
        return;
    }
    
    let li = createTaskElement(inputBox.value);
    listContainer.appendChild(li);
    
    inputBox.value = '';
    saveData();
}

// Event listener for adding tasks
addButton.addEventListener('click', addTask);

// Function to save tasks to localStorage
function saveData() {
    const tasks = [];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load saved tasks from localStorage
function showTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    listContainer.innerHTML = ''; // Clear existing tasks
    
    tasks.forEach(task => {
        const li = createTaskElement(task.text, task.completed);
        listContainer.appendChild(li);
    });
}

// Display saved tasks on page load
showTask();

// CSS for completed tasks and buttons
const style = document.createElement('style');
style.innerHTML = `
    .completed {
        text-decoration: line-through;
    }
    .completed-btn, .delete-btn {
        margin-left: 10px;
        cursor: pointer;
    }
    .completed-btn {
        background-color: #4CAF50; /* Green */
        color: white;
        border: none;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
    }
    .completed-btn:hover {
        background-color: white;
        color: black;
        border: 2px solid #4CAF50;
    }
    .delete-btn {
        background-color: #f44336; /* Red */
        color: white;
        border: none;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 14px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
    }
    .delete-btn:hover {
        background-color: white;
        color: black;
        border: 2px solid #f44336;
    }
`;
document.head.appendChild(style);