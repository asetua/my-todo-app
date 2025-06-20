const API_URL = "https://my-todo-app-r7ut.onrender.com/api/todos";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority-select");
const todoList = document.getElementById("todo-list");

// Load existing todos
async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const createdAt = new Date(todo.createdAt).toLocaleString();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${todo.title}</strong><br>
      <em style="color: ${
        todo.priority === "High"
          ? "red"
          : todo.priority === "Low"
          ? "green"
          : "orange"
      }">[${todo.priority}]</em><br>
      <small>Created: ${createdAt}</small><br>
      <button onclick="deleteTodo('${todo._id}')">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = todoInput.value;
  const priority = prioritySelect.value;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, priority }),
  });

  todoInput.value = "";
  fetchTodos();
});

// Delete todo
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}

// Initial load
fetchTodos();
