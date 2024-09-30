// src/components/AddTodo.js
import React, { useState, useEffect } from 'react';

const AddTodo = ({ onAdd, taskToEdit, onEdit, resetTask }) => {
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTaskText(taskToEdit.text);
        }
    }, [taskToEdit]);

    const handleAdd = () => {
        if (taskText.trim() === '') return;
        if (taskToEdit) {
            onEdit(taskToEdit.index, taskText);
        } else {
            onAdd(taskText);
        }
        setTaskText('');
        resetTask(); 
    };

    return (
        <div className="input-container">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task..."
            />
            <button onClick={handleAdd}>{taskToEdit ? 'Edit' : 'Add'}</button>
        </div>
    );
};

export default AddTodo;
