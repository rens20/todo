const inputBox = document.getElementById("input-box");
const button = document.querySelector("button");
const list = document.getElementById("list-container");
 
function addTask() {
  if (inputBox.value === "") {
    alert("you must write something!");
  } else {
    let category = document.getElementById("category").value;
    let li = document.createElement("li");
    let dueDate = document.getElementById("due-date").value;
     let currentDate = new Date();
    let taskDetails = `${category}: ${inputBox.value} (Due: ${dueDate})`;
    li.innerHTML = taskDetails;
    list.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "x";
    li.appendChild(span);


    // Add notification here
    let notificationTime = new Date(dueDate);
    if (notificationTime > currentDate) {
      const timeDiff = notificationTime - currentDate;
      setTimeout(() => {
       alert(`Your task ${inputBox.value} is due now!`);
    }, timeDiff);
    }
  }
  saveDate();
}
// Function to handle task clicks and deletion
list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    // Toggle the checked class for the task
    e.target.classList.toggle("checked");
    // Save the updated data
    saveData();
  } else if (e.target.tagName === "SPAN") {
    // Remove the task if the delete button is clicked
    e.target.parentElement.remove();
    // Save the updated data
    saveData();
  }
});

// Event listener for the Add Task button
button.addEventListener("click", addTask);

// Function to save the data to local storage
function saveData() {
  localStorage.setItem("data", list.innerHTML);
}

// Function to show tasks on page load
function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    list.innerHTML = savedData;
  }
}

// Event listener for the page load event
window.addEventListener("load", showTask);

// Event listener for the beforeunload event
window.addEventListener("beforeunload", function (e) {
  notifications.forEach(notification => clearTimeout(notification));
  e.preventDefault();
  e.returnValue = '';
});
