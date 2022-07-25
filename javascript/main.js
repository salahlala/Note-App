let addBtn = document.querySelector(".main");
let container = document.querySelector(".container");

let noteCheck = JSON.parse(localStorage.getItem("noteDetails"));
// check if local storage have items
if (noteCheck) {
  noteCheck.forEach((note) => showElement(note));
}

addBtn.addEventListener("click", () => {
  showElement();
});

// handle show the elemnts function
function showElement(text = "") {
  // create the time
  let day = new Date();
  let date = day.toDateString();
  // create note div
  let note = document.createElement("div");
  note.className = "note";

  note.innerHTML = `
  <div class="title">
    <div class="time"> 
      ${date}
    </div>
    <div> 
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash-can delete"></i>
    </div>
  </div>
  <div class="content ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
  `;
  container.appendChild(note);
  let editBtn = note.querySelector(".edit");
  let deleteBtn = note.querySelector(".delete");
  let textArea = note.querySelector("textarea");
  let textContent = note.querySelector(".content");

  textArea.value = text;
  textContent.innerHTML = text;

  // handle delete function
  deleteBtn.addEventListener("click", () => {
    note.remove();
    callLocal();
  });
  // add toggle class to the element
  editBtn.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    textContent.classList.toggle("hidden");
  });
  // change value on the input
  textArea.addEventListener("input", (e) => {
    let { value } = e.target;
    textContent.innerHTML = marked(value);
    callLocal();
  });
}
// handle set local storage function
function callLocal() {
  let notes = document.querySelectorAll("textarea");
  let arrNote = [];
  notes.forEach((note) => arrNote.push(note.value));
  localStorage.setItem("noteDetails", JSON.stringify(arrNote));
}
