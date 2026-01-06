import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import TaskBoard from "./components/TaskBoard";
import "./components/Layout.css";

export default function App() {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : [{ id: 1, name: "Sanath" }];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [employees, tasks]);

  const addEmp = (name) => setEmployees([...employees, { id: Date.now(), name }]);
  const updateEmp = (id, name) => setEmployees(employees.map(e => e.id === id ? {...e, name} : e));
  const deleteEmp = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
    setTasks(tasks.filter(t => t.empId !== id));
    if (activeId === id) setActiveId(null);
  };

  const addTask = (text) => setTasks([...tasks, { id: Date.now(), empId: activeId, text, completed: false }]);
  const updateTask = (id, text) => setTasks(tasks.map(t => t.id === id ? {...t, text} : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  return (
  <div className="main-wrapper">
    <header className="main-app-header">
      <h1>Employee Management System</h1>
    </header>
      
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
    </div>
  );
}