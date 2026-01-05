import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import TaskBoard from "./components/TaskBoard";
import "./components/Layout.css";

export default function App() {
  const [employees, setEmployees] = useState([{ id: 1, name: "Alice Johnson" }]);
  const [tasks, setTasks] = useState([]);
  const [activeId, setActiveId] = useState(1);

  // --- Employee CRUD ---
  const addEmp = (name) => setEmployees([...employees, { id: Date.now(), name }]);
  const updateEmp = (id, name) => setEmployees(employees.map(e => e.id === id ? {...e, name} : e));
  const deleteEmp = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
    setTasks(tasks.filter(t => t.empId !== id));
    if (activeId === id) setActiveId(null);
  };

  // --- Task CRUD ---
  const addTask = (text) => setTasks([...tasks, { id: Date.now(), empId: activeId, text, completed: false }]);
  const updateTask = (id, text) => setTasks(tasks.map(t => t.id === id ? {...t, text} : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));

  return (
    <div className="app-container">
      <EmployeeList 
        employees={employees} activeId={activeId} setActive={setActiveId}
        onAdd={addEmp} onUpdate={updateEmp} onDelete={deleteEmp} 
      />
      <TaskBoard 
        activeEmployee={employees.find(e => e.id === activeId)}
        tasks={tasks.filter(t => t.empId === activeId)}
        onAdd={addTask} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTask}
      />
    </div>
  );
}