import React, { useState } from "react";

export default function EmployeeList({ employees, activeId, setActive, onAdd, onUpdate, onDelete }) {
    const [newName, setNewName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

const handleUpdate = (id) => {
    if (editValue.trim()) {
        onUpdate(id, editValue);
        setEditingId(null);
}
};

return (
    <div className="sidebar">
    <h3>Staff Directory</h3>
    <div className="add-box">
        <input 
        value={newName} 
        onChange={(e) => setNewName(e.target.value)} 
        placeholder="Add Employee..." />
        <button onClick={() => { if(newName) { onAdd(newName); setNewName(""); } }}>+</button>
    </div>

    <ul className="emp-list">
        {employees.map((emp) => (
        <li key={emp.id} className={activeId === emp.id ? "active" : ""} onClick={() => setActive(emp.id)}>
            {editingId === emp.id ? (
            <input 
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleUpdate(emp.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleUpdate(emp.id)}/>
            ) : (
            <div className="emp-row">
                <span>{emp.name}</span>
                <div className="btn-group">
                <button onClick={(e) => { e.stopPropagation(); setEditingId(emp.id); setEditValue(emp.name); }}>✎</button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}>×</button>
                </div>
            </div>
            )}
        </li>
        ))}
    </ul>
    </div>
);
}