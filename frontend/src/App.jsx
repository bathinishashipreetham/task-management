import { useEffect, useState } from "react";
import background from "./assets/bg.png";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API_URL = "http://127.0.0.1:5000/tasks";

  const fetchTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      setTitle("");
      setDescription("");
      fetchTasks();
    });
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(fetchTasks);
  };

  const toggleComplete = (task) => {
    fetch(`${API_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    }).then(fetchTasks);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          maxWidth: "1100px",
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Task Manager
        </h1>

        {/* Add Task Row */}
        <div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, padding: "12px", borderRadius: "8px" }}
          />

          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ flex: 2, padding: "12px", borderRadius: "8px" }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "12px 25px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {/* Task Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: task.completed ? "#e6ffe6" : "#ffffff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              }}
            >
              <h3
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </h3>

              <p>{task.description}</p>

              <p>
                <strong>Status:</strong>{" "}
                {task.completed ? "Completed ✅" : "Pending ⏳"}
              </p>

              <div style={{ marginTop: "15px" }}>
                <button
                  onClick={() => toggleComplete(task)}
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Toggle
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No tasks found
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
