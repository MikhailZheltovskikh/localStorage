const form = document.getElementById("addForm");
const itemsList = document.getElementById("items");
const filter = document.getElementById("filter");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach(function (item) {
  renderItem(item);
});

form.addEventListener("submit", addItem);
itemsList.addEventListener("click", removeItem);
filter.addEventListener("keyup", filterItems);

function renderItem(taskText) {
  // Создаем элемент для новой задачи
  const newElement = document.createElement("li");
  newElement.className = "list-group-item";

  // Добавим текст в новый элемент
  const newTextNode = document.createTextNode(taskText);
  newElement.appendChild(newTextNode);

  // Создаем кнопку
  const deleteBtn = document.createElement("button");
  // Добавляем текст
  deleteBtn.appendChild(document.createTextNode("Удалить"));
  // Добавляем CSS class
  deleteBtn.className = "btn btn-light btn-sm float-right";
  // Добавляем data атрибут
  deleteBtn.dataset.action = "delete";

  // Помещаем кнопку внутрь тега li
  newElement.appendChild(deleteBtn);

  // Добавляем новую задачу в список со всеми задачами
  itemsList.prepend(newElement);
}

// Добавление новой задачи функция
function addItem(e) {
  // Отменяем отправку формы
  e.preventDefault();

  // Находим инпут с текстом для новой задачи
  const newItemInput = document.getElementById("newItemText");
  // Получаем текст из инпута
  const newItemText = newItemInput.value;

  renderItem(newItemText);

  // дабвление задачи в localstorage
  tasks.push(newItemText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Очистим поле добавления новой задачи
  newItemInput.value = "";
}

// Удаление элемента - ф-я
function removeItem(e) {
  if (e.target.hasAttribute("data-action") && e.target.getAttribute("data-action") == "delete") {
    if (confirm("Удалить задачу?")) {
      e.target.parentNode.remove();
    }
  }
  const textNode = e.target.closest(".list-group-item").firstChild.textContent;
  const index = tasks.findIndex(function(item){
     if(textNode === item){
        return true
     }

  })
  if(index !== -1){
     tasks.splice(index, 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Фильтрация списка дел ф-я
function filterItems(e) {
  // Получаем фразу для поиска и переводим ее в нижний регистр
  const searchedText = e.target.value.toLowerCase();

  // 1. Получаем списко всех задач
  const items = itemsList.querySelectorAll("li");

  // 2. Перебираем циклом все найденные теги li с задачами
  items.forEach(function (item) {
    // Получаем текст задачи из списка и переводим его в нижний регистр
    const itemText = item.firstChild.textContent.toLowerCase();

    // Проверяем вхождение искомой подстроки в текст задачи
    if (itemText.indexOf(searchedText) != -1) {
      // Если вхождение есть - показываем элемент с задачей
      item.style.display = "block";
    } else {
      // Если вхождения нет - скрываем элемент с задачей
      item.style.display = "none";
    }
  });
}
