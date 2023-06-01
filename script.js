let state = {
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

  if (state.todos.length === 0) {
    toDoList.innerHTML = "Du hast derzeit keine Aufgaben. Genieß die Sonne =)";
  }

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

getState();
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
const buttonAddToDo = document.querySelector("#button-add-todo");
buttonAddToDo.addEventListener("click", () => {
  addNewToDo();
});
document.addEventListener("keydown", (event) => {
  if (event.code === "Enter") {
    addNewToDo();
  }
});

function addNewToDo() {
  const InputNewToDo = document.querySelector("#input-new-todo");
  //Prüfung: ToDo nicht leer?
  if (InputNewToDo.value.trimEnd().length === 0) {
    alert("Bitte schreibe eine Aufgabe auf, die du erledigen möchtest");
  } else {
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
      renderToDos();
      InputNewToDo.value = "";
    } else {
      alert("Diese Aufgabe hast du bereits auf deiner Liste eingetragen!");
      InputNewToDo.value = "";
    }
  }
  saveState();
}

function duplicateCheck(newToDoDscr) {
  let isDuplicate = false;

  state.todos.forEach((toDoElement) => {
    if (toDoElement.description.toLowerCase() === newToDoDscr.toLowerCase()) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
}

//alle to Do löschen
const buttonDeleteAll = document.querySelector("#button-delete-all");
buttonDeleteAll.addEventListener("click", () => {
  idCounter = 0;
  state.todos = [];
  saveState();
  renderToDos();
});

//erledigte löschen
const buttonDeleteDone = document.querySelector("#button-delete-done");
buttonDeleteDone.addEventListener("click", () => {
  state.todos = state.todos.filter((toDoElement) => toDoElement.done === false);
  saveState();
  renderToDos();
});

function saveState() {
  window.localStorage.setItem("myState", JSON.stringify(state));
}

function getState() {
  const myState = window.localStorage.getItem("myState");

  if (myState === null) {
    return;
  } else {
    state = JSON.parse(myState);
    console.log("get state: ", JSON.parse(myState).todos);
  }
}
