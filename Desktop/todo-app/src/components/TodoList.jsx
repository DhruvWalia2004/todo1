import React, { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // ➕ Add a new task
  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  // ✅ Toggle task complete/incomplete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ❌ Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-12 border border-gray-100">
      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">
        📝 To-Do List
      </h2>

      {/* Input + Add Button */}
      <div className="flex mb-6 shadow-sm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-200 rounded-l-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter a task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-5 py-5 rounded-r-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-gray-400 text-center italic">No tasks yet ✨</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition"
            >
              {/* Checkbox + Text */}
              <label className="flex items-center space-x-5 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-7 h-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <span
                  className={`text-md transition-all duration-200 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-700"
                  }`}
                >
                  {task.text}
                </span>
              </label>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400 hover:text-red-600 text-lg ml-3"
                title="Delete"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}