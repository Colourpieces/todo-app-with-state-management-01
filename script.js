const state = {
  todos: [
    { description: "Aufgabe 1", done: false },
    { description: "Aufgabe 2", done: true },
    { description: "Aufgabe 3", done: false },
    { description: "Aufgabe 4", done: false },
  ],
};

function renderToDos() {
  const toDoList = document.querySelector("#list");

  toDoList.innerHTML = ""; //Liste leeren

  //toDos einzeln ausgeben
  state.todos.forEach((toDoElement) => {
    //HTML Elemente erstellen
    const toDoLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //
    toDoLi.toDoObj = toDoElement;
    //console.log("toDoElement:" + toDoElement + ": " + toDoElement.done);
    console.log("Element", toDoElement);

    //Inhalte zuweisen
    checkbox.checked = toDoElement.done;
    const toDoText = document.createTextNode(toDoElement.description);

    //Inhalte an List-Element anhängen
    toDoLi.appendChild(checkbox);
    toDoLi.appendChild(toDoText);

    //Inhalte ausgeben
    toDoList.appendChild(toDoLi);
  });
}

renderToDos();

const toDoList = document.querySelector("#list");
toDoList.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.toDoObj;

  todo.done = checkbox.checked;
  //console.log(state.todos);
  //console.log("checkbox.checked: " + checkbox.checked);

  //console.log(e.target.parentElement);
  console.log(e.target.value);
});
