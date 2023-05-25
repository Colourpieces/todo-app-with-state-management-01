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

    //Referenz auf toDoElement im neuen Attribut toDoObj speichern
    toDoLi.toDoObj = toDoElement;

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

//Status ToDos im State aktualisieren (erledigt/unerledigt)
const toDoList = document.querySelector("#list");
toDoList.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.toDoObj;

  todo.done = checkbox.checked;
});
