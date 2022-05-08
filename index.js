const inputElement = document.querySelector(".new-task-input");
const btnAddTask = document.querySelector("button");
const tasksContainer = document.querySelector(".task-container");

let validateInput = () => inputElement.value.trim().length > 0;

const addTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => completed(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");

  deleteItem.addEventListener("click", () =>
    deleteClick(taskItemContainer, taskContent)
  );

  tasksContainer.appendChild(taskItemContainer);
  taskItemContainer.appendChild(taskContent);
  taskContent.appendChild(deleteItem);

  inputElement.value = "";

  updateLocal();
};

const completed = (taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const checkingTaskClicked = task.firstChild.isSameNode(taskContent);

    if (checkingTaskClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocal();
};

const deleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;

  for (const task of tasks) {
    const checkingTaskClicked = task.firstChild.isSameNode(taskContent);

    if (checkingTaskClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocal();
};

const addTaskChange = () => {
  const inputIsValid = validateInput;

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocal = () => {
  const tasks = tasksContainer.childNodes;

  const local = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(local));
};

const refreshTasksLocal = () => {
  const taskFromLocal = JSON.parse(localStorage.getItem("tasks"));

  if (!taskFromLocal) return;

  for (const task of taskFromLocal) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => completed(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener("click", () =>
      deleteClick(taskItemContainer, taskContent)
    );

    tasksContainer.appendChild(taskItemContainer);
    taskItemContainer.appendChild(taskContent);
    taskContent.appendChild(deleteItem);
  }
};

refreshTasksLocal();

btnAddTask.addEventListener("click", () => addTask());

inputElement.addEventListener("change", () => addTaskChange());
