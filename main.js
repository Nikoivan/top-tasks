/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/task-widget/task-widget.js

class TaskWidget {
  constructor() {
    this.element = document.querySelector(".task-widget");
    this.filterform = this.element.querySelector(".search-form");
    this.filterText = this.element.querySelector(".search-input");
    this.taskList = this.element.querySelector(".task-list-all");
    this.pinnedTasks = this.element.querySelector(".task-list-pinned");
    this.onForm = this.onForm.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.toPinnedList = this.toPinnedList.bind(this);
    this.searchString = this.searchString.bind(this);
    this.filterform.addEventListener("submit", this.onForm);
    this.filterText.addEventListener("input", this.searchString);
    this.checkPinnedTasks();
  }
  noTasks(arg) {
    if (arg === "add") {
      if (this.noTasksInfo) {
        this.noTasksInfo.classList.remove("disable");
      } else {
        const li = document.createElement("li");
        li.classList.add("no-tasks");
        li.textContent = "No tasks found";
        this.noTasksInfo = li;
        this.taskList.append(li);
      }
    } else {
      if (this.noTasksInfo) {
        this.noTasksInfo.classList.add("disable");
      }
    }
  }
  checkTasks() {
    let tasks = [...this.taskList.querySelectorAll(".task")];
    tasks = tasks.filter(el => !el.classList.contains("disable"));
    if (tasks.length === 0) {
      this.noTasks("add");
    } else {
      this.noTasks("remove");
    }
  }
  toPinnedList(e) {
    const target = e.target;
    const task = target.closest(".task");
    if (target.classList.contains("pinned")) {
      target.classList.toggle("pinned");
      this.taskList.append(task);
    } else {
      target.classList.toggle("pinned");
      this.pinnedTasks.append(task);
    }
    this.checkPinnedTasks();
    this.checkTasks();
  }
  searchString() {
    const text = this.filterText.value;
    let tasks = [...this.taskList.querySelectorAll(".task")];
    if (text === "") {
      tasks.forEach(el => {
        if (el.classList.contains("disable")) {
          el.classList.remove("disable");
        }
      });
      this.noTasks("remove");
      return;
    }
    const noFilter = tasks.filter(el => el.querySelector(".task-title").textContent.includes(text));
    tasks = tasks.filter(el => !el.querySelector(".task-title").textContent.includes(text));
    tasks.forEach(el => el.classList.add("disable"));
    noFilter.forEach(el => el.classList.remove("disable"));
    this.checkTasks();
  }
  onForm(e) {
    e.preventDefault();
    const text = this.filterText.value;
    if (!text) {
      this.showError("Ошибка ввода. Укажите название задачи");
      return;
    }
    this.createTask(text);
  }
  checkPinnedTasks() {
    if (this.pinnedTasks.children.length === 0) {
      const noPinnedTasks = document.createElement("span");
      noPinnedTasks.classList.add("pinned-info");
      noPinnedTasks.textContent = "No pinned tasks";
      this.noPinnedTittle = noPinnedTasks;
      this.pinnedTasks.append(noPinnedTasks);
    } else if (this.pinnedTasks.children.length > 0 && this.noPinnedTittle) {
      this.noPinnedTittle.remove();
    }
  }
  createTask(text) {
    const task = document.createElement("div");
    task.classList.add("task");
    const taskTitle = document.createElement("h3");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = text;
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskInfo.append(taskTitle);
    const taskCheckBox = document.createElement("div");
    taskCheckBox.classList.add("task-checkout");
    taskCheckBox.addEventListener("click", this.toPinnedList);
    task.append(taskInfo);
    task.append(taskCheckBox);
    this.taskList.append(task);
    this.filterText.value = "";
    this.searchString();
  }
  showError(arg) {
    if (!this.popUp) {
      const popUp = this.createPopUp(arg);
      this.popUp = popUp;
      this.element.append(this.popUp);
    } else {
      this.popUp.classList.remove("disable");
    }
  }
  createPopUp(arg) {
    const popUpWrapper = document.createElement("div");
    popUpWrapper.classList.add("popup-wrapper");
    const closeImg = document.createElement("img");
    closeImg.classList.add("close");
    closeImg.addEventListener("click", this.closePopUp);
    const popUpContainer = document.createElement("div");
    popUpContainer.classList.add("popup");
    const message = document.createElement("span");
    message.textContent = arg;
    popUpContainer.append(closeImg);
    popUpContainer.append(message);
    popUpWrapper.append(popUpContainer);
    return popUpWrapper;
  }
  closePopUp() {
    this.popUp.classList.add("disable");
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const taskWidget = new TaskWidget();
console.log(taskWidget);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;