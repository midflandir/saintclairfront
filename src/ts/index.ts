import { getAllNotes,/* postNote, deleteNote, putNote*/} from "./action/action.js";

const form: HTMLFormElement |null =
document.querySelector('.reminders-form');

export interface noteI{
    id:number|null,
    name:string,
    physicianInCharge:string,
    patients:patient | null

}
export interface patient{
      id:number,
      pname:string,
      age:string,
      identificationNumber:string,
      date:string[]

}

getAllNotes().then(notes => {
  state = notes
  recreateNotes(notes);
})

let state:noteI[] = []
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

function createReminder(note:noteI){
  const notesContainer = document.querySelector('.medicalspecialtylist-container') as HTMLDivElement

  const div:HTMLDivElement = document.createElement('div');
  div.className = 'single-note-container'
  div.classList.add(`note-${note.id}`)

  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = `single-note-name-${note.id}`
  h2.innerText = 'Specialty: ' + note.name

  const reminderP:HTMLParagraphElement = document.createElement('p')
  reminderP.className = `single-note-reminder-${note.id}`
  reminderP.innerText = 'Physician In Charge: ' + note.physicianInCharge

  /*const dateP:HTMLParagraphElement = document.createElement('p')
  dateP.className = `single-note-date-${note.id}`
  dateP.innerText = note.date
*/
note.patients.id

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = 'single-note-delete-button'
  deleteButton.innerText = 'X'
  //deleteButton.addEventListener('click', ()=> handleDelete(div))

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-note-edit-button'
  editButton.innerText = 'edit'
 // editButton.addEventListener('click', ()=> hanldeEdit(note))

  div.append(h2, reminderP,/* dateP,*/ deleteButton, editButton)
  notesContainer.append(div)
}


function recreateNotes(notes:noteI[]){
  notes.forEach(note => createReminder(note))
}

