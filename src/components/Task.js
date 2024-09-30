// src/components/Task.js
import React from 'react';

const Task = ({ task, index, onToggle, onDelete, onEdit }) => {
    return (
        <li className={task.completed ? 'completed' : ''}>
            <span onClick={() => onToggle(index)}>{task.text}</span>
            <div className="button-group">
                <button onClick={() => onEdit(index)}>Edit</button>
                <button onClick={() => onDelete(index)}>Delete</button>
            </div>
        </li>
    );
};

export default Task;
