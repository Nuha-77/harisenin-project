// =====================
// TIME
// =====================
function showTime() {
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleDateString() + " | " + now.toLocaleTimeString();
}
setInterval(showTime, 1000);

// =====================
// PROFILE (INLINE EDIT)
// =====================
let profileData = JSON.parse(localStorage.getItem("profile")) || {
  name: "Nuha Muhammad Iqbal Maulana",
  role: "Student of Harisenin FSD 19 Program"
};

function renderProfile() {
  document.getElementById("nameInput").value = profileData.name;
  document.getElementById("roleInput").value = profileData.role;
}

function saveProfile() {
  profileData = {
    name: document.getElementById("nameInput").value,
    role: document.getElementById("roleInput").value
  };

  localStorage.setItem("profile", JSON.stringify(profileData));
}

// event
const nameInput = document.getElementById("nameInput");
const roleInput = document.getElementById("roleInput");

nameInput.addEventListener("input", saveProfile);
roleInput.addEventListener("input", saveProfile);

// =====================
// TODO SYSTEM
// =====================
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let done = JSON.parse(localStorage.getItem("done")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("done", JSON.stringify(done));
}

function render() {
  const todoList = document.getElementById("todoList");
  const doneList = document.getElementById("doneList");

  todoList.innerHTML = "";
  doneList.innerHTML = "";

  document.getElementById("emptyTodo").style.display = todos.length ? "none" : "block";
  document.getElementById("emptyDone").style.display = done.length ? "none" : "block";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority);

    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="completeTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    todoList.appendChild(li);
  });

  done.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("done");

    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="deleteDone(${index})">✖</button>
    `;

    doneList.appendChild(li);
  });
}

// tambah
function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  todos.push({
    text: input.value,
    priority: priority
  });

  input.value = "";
  input.focus();

  save();
  render();
}

// selesai
function completeTask(index) {
  done.push(todos[index]);
  todos.splice(index, 1);
  save();
  render();
}

// hapus
function deleteTask(index) {
  todos.splice(index, 1);
  save();
  render();
}

function deleteDone(index) {
  done.splice(index, 1);
  save();
  render();
}

// hapus semua
function deleteAll() {
  if (confirm("Hapus semua tugas?")) {
    todos = [];
    done = [];
    save();
    render();
  }
}

// enter
document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") addTask();
});

// INIT
render();
renderProfile();