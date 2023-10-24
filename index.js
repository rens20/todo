const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");
let tasks = [];

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let category = document.getElementById("category").value;
    let dueDate = document.getElementById("due-date").value;
    let currentDate = new Date();
    let taskDetails = `${category}: ${inputBox.value} (Due: ${dueDate})`;

    let task = {
      details: taskDetails,
      dueDate: dueDate,
    };

    tasks.push(task);
    updateList();

    inputBox.value = "";

    // Add notification here
    let notificationTime = new Date(dueDate);
    if (notificationTime > currentDate) {
      const timeDiff = notificationTime - currentDate;
      setTimeout(() => {
        alert(`Your task ${inputBox.value} is due now!`);
      }, timeDiff);
    }
  }
  saveData();
}

// Function to update the list
function updateList() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.details;
    list.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);
  });
}

// Function to handle task clicks and deletion
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    const index = Array.from(e.target.parentNode.parentNode.children).indexOf(
      e.target.parentNode
    );
    tasks.splice(index, 1);
    updateList();
    saveData();
  }
});

// Event listener for the Add Task button
button.addEventListener("click", addTask);

// Function to save the data to local storage
function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load the data from local storage
function loadData() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    updateList();
  }
}

// Event listener for the page load event
window.addEventListener("load", loadData);

// Event listener for the beforeunload event
window.addEventListener("beforeunload", function (e) {
  saveData();
  e.preventDefault();
  e.returnValue = "";
});
