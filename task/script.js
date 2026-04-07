function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if (text === "") return;
    let task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = "task-" + Date.now();
    task.innerText = text;
    //drag
    task.addEventListener("dragstart", drag);
    //delete button
    let del = document.createElement("span");
    del.innerText = "❌";
    del.onclick = () => task.remove();
    task.appendChild(del);
    document.querySelector(".column").appendChild(task);
    input.value = "";
}
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}
function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    let task = document.getElementById(data);
    event.currentTarget.appendChild(task);
}