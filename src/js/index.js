import { getAllNotes, /* postNote, deleteNote, putNote*/ } from "./action/action.js";
const form = document.querySelector('.reminders-form');
getAllNotes().then(notes => {
    state = notes;
    recreateNotes(notes);
});
let state = [];
/*
form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const nameinput = document.querySelector('.name-input') as HTMLInputElement;
  const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;
  if(nameinput.value&&physicianInput.value){
    const date = new Date()
    date.setHours(date.getHours() - 5)

    const newNote: noteI = {
      id: null,
      name: nameinput.value,
      physicianInCharge: physicianInput.value,
      patients:null

    }

    postNote(newNote).then(
      response => {
        if(response.status === 200){
          state.push(newNote)

          createReminder(newNote);
          nameinput.value = '';
          physicianInput.value = '';
        }
      }
    )
  }
}*/
function createReminder(note) {
    const notesContainer = document.querySelector('.medicalspecialtylist-container');
    const div = document.createElement('div');
    div.className = 'single-note-container';
    div.classList.add(`note-${note.id}`);
    const h2 = document.createElement('h2');
    h2.className = `single-note-name-${note.id}`;
    h2.innerText = 'Specialty: ' + note.name;
    const reminderP = document.createElement('p');
    reminderP.className = `single-note-reminder-${note.id}`;
    reminderP.innerText = 'Physician In Charge: ' + note.physicianInCharge;
    /*const dateP:HTMLParagraphElement = document.createElement('p')
    dateP.className = `single-note-date-${note.id}`
    dateP.innerText = note.date
  */
    note.patients.id;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-note-delete-button';
    deleteButton.innerText = 'X';
    //deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = 'single-note-edit-button';
    editButton.innerText = 'edit';
    // editButton.addEventListener('click', ()=> hanldeEdit(note))
    div.append(h2, reminderP, /* dateP,*/ deleteButton, editButton);
    notesContainer.append(div);
}
function recreateNotes(notes) {
    notes.forEach(note => createReminder(note));
}
