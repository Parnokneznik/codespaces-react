import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      if (!tasks.includes(newTask)) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTask('');
        setError('');
      } else {
        setError('Tento úkol již existuje.');
      }
    }
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Backspace' && newTask === '') {
      // Remove the last task when Backspace is pressed and the input is empty
      const lastIndex = tasks.length - 1;
      if (lastIndex >= 0) {
        removeTask(lastIndex);
      }
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
        />
        <button onClick={addTask}>Přidat úkol</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => removeTask(index)}>Odstranit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
