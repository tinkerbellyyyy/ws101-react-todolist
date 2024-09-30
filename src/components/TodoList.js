// src/components/TodoList.js
import React, { useState, useEffect } from 'react';
import AddTodo from './AddToDo';
import Task from './Task';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
            setTasks(storedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskText) => {
        const newTask = { text: taskText, completed: false };
        setTasks([...tasks, newTask]);
    };

    const editTask = (index, newText) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, text: newText };
            }
            return task;
        });
        setTasks(newTasks);
        setTaskToEdit(null); 
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const startEditing = (index) => {
        setTaskToEdit({ ...tasks[index], index });
    };

    const resetTask = () => {
        setTaskToEdit(null);
    };

    return (
        <div className="todo-container">
            <h1>My To-Do List</h1>
            <AddTodo onAdd={addTask} taskToEdit={taskToEdit} onEdit={editTask} resetTask={resetTask} />
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('pending')}>Pending</button>
            </div>
            <ul className="task-list">
                {filteredTasks.map((task, index) => (
                    <Task
                        key={index}
                        task={task}
                        index={index}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={startEditing}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
