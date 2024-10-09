import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle task submission
  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (taskText.trim()) {
      const newTask = { text: taskText.trim(), completed: false };
      setTasks([...tasks, newTask]);
      setTaskText(''); // Clear input
    }
  };

  // Handle task deletion
  const deleteTask = (taskToDelete) => {
    setTasks(tasks.filter(task => task.text !== taskToDelete));
  };

  // Handle task completion toggle
  const toggleTaskCompletion = (taskToToggle) => {
    setTasks(tasks.map(task =>
      task.text === taskToToggle ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul id="taskList">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.text)}
            />
            {task.text}
            <button className="delete-btn" onClick={() => deleteTask(task.text)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
