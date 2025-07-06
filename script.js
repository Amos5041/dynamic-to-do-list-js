document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't re-save
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Retrieve tasks array from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Add a task to the list and optionally to Local Storage
    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert('Please enter a task.');
            return;
        }

        // Create <li> and button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        // Remove from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const tasks = getStoredTasks().filter(task => task !== taskText);
            saveTasks(tasks);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        taskInput.value = '';
    }

    // Add task on button click
    addButton.addEventListener('click', function () {
        addTask(taskInput.value);
    });

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks when the page is ready
    loadTasks();
});
