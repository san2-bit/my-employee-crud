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

  return (
    <div className="app-container">
      <EmployeeList
        employees={employees}
        activeId={activeId}
        setActive={setActiveId}
        onAdd={(name) =>
          setEmployees([...employees, { id: Date.now(), name }])
        }
        onUpdate={(id, name) =>
          setEmployees(
            employees.map((e) =>
              e.id === id ? { ...e, name } : e
            )
          )
        }
        onDelete={(id) => {
          setEmployees(employees.filter((e) => e.id !== id));
          setTasks(tasks.filter((t) => t.empId !== id));
        }}
      />

      <TaskBoard
        activeEmployee={employees.find((e) => e.id === activeId)}
        tasks={tasks.filter((t) => t.empId === activeId)}
        onAdd={(text) =>
          setTasks([
            ...tasks,
            {
              id: Date.now(),
              empId: activeId,
              text,
              completed: false,
            },
          ])
        }
        onUpdate={(id, text) =>
          setTasks(
            tasks.map((t) =>
              t.id === id ? { ...t, text } : t
            )
          )
        }
        onDelete={(id) =>
          setTasks(tasks.filter((t) => t.id !== id))
        }
        onToggle={(id) =>
          setTasks(
            tasks.map((t) =>
              t.id === id
                ? { ...t, completed: !t.completed }
                : t
            )
          )
        }
      />
    </div>
  );
}
