import React, { useState } from "react";

export default function TaskBoard({
  activeEmployee,
  tasks,
  onAdd,
  onUpdate,
  onDelete,
  onToggle,
}) {
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length > 0
      ? Math.round((completedCount / tasks.length) * 100)
      : 0;

  const handleUpdate = (id) => {
    if (editValue.trim()) {
      onUpdate(id, editValue);
      setEditingTaskId(null);
    }
  };

  if (!activeEmployee)
    return <div className="board-empty">Select an employee</div>;

  return (
    <div className="board">
      <div className="board-header">
        <div>
          <h1>{activeEmployee.name}</h1>
          <p>
            {completedCount} / {tasks.length} tasks completed
          </p>
        </div>

        <div className="progress-pill">{progress}% Done</div>
      </div>

      <div className="task-creator">
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter" && taskInput.trim()) {
              onAdd(taskInput);
              setTaskInput("");
            }
          }}
        />
      </div>

      <div className="task-grid">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task-card ${task.completed ? "done" : ""}`}
          >
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
              />

              {editingTaskId === task.id ? (
                <input
                  className="task-edit-input"
                  autoFocus
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleUpdate(task.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleUpdate(task.id)
                  }
                />
              ) : (
                <span
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditValue(task.text);
                  }}
                >
                  {task.text}
                </span>
              )}
            </div>

            <div className="task-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditValue(task.text);
                }}
              >
                ✎
              </button>
              <button
                className="delete-task-btn"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
