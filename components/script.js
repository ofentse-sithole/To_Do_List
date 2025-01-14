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


// Adding Javascript for cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

// Gradient of dark blue to lighter blue colors
const colors = [
  "#001f4d", // Darkest blue
  "#003366",
  "#004080",
  "#0059b3",
  "#0073e6",
  "#1a8cff",
  "#4da6ff",
  "#80bfff",
  "#b3d9ff", // Light blue
  "#cce6ff",
  "#e6f2ff",
  "#f0f8ff"  // Lightest blue
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
