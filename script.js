const state = {
  idCounter: 0,
  todos: [
    { id: 1, description: "Aufgabe 1", done: false },
    { id: 2, description: "Aufgabe 2", done: true },
    { id: 3, description: "Aufgabe 3", done: false },
    { id: 4, description: "Aufgabe 4", done: false },
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

//toDo hinzufügen
const InputNewToDo = document.querySelector("#input-new-todo");
const buttonAddToDo = document.querySelector("#button-add-todo");
buttonAddToDo.addEventListener("click", () => {
  const newToDo = {};
  //Prüfung: erstes toDo, dass der Nutzer hinzufügt?
  if (state.idCounter === 0) {
    state.todos = [];
  }

  //neues toDoObjekt erstellen
  newToDo.id = state.idCounter;
  newToDo.description = InputNewToDo.value.trimEnd();
  newToDo.done = false;

  const isDuplicate = duplicateCheck(newToDo.description);
  if (isDuplicate === false) {
    //toDo zum State hinzufügen
    state.todos.push(newToDo);
    state.idCounter += 1;

    //Ausgabe neu rendern
    console.log(state.todos);
    renderToDos();
    InputNewToDo.value = "";
  } else {
    alert("Diese Aufgabe hast du bereits auf deiner Liste eingetragen!");
  }
});

function duplicateCheck(newToDoDscr) {
  let isDuplicate = false;

  state.todos.forEach((toDoElement) => {
    console.log(toDoElement);
    if (toDoElement.description.toLowerCase() === newToDoDscr.toLowerCase()) {
      isDuplicate = true;
    }
    console.log("isDuplicate: ", isDuplicate);
  });
  return isDuplicate;
}
