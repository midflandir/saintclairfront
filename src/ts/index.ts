import { getAllSpecialtypatient, postSpecialty, deleteSpecialty, deletePatient, postPatient, putPatient, putSpecialty} from "./action/action.js";
import { specialtyI,patientI} from "./model/interface.js";
const form: HTMLFormElement |null =
document.querySelector('.specialties-form');

getAllSpecialtypatient().then(specialties => {
  state = specialties
  recreateSpecialy(specialties);
})

let state:specialtyI[] = []

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e:SubmitEvent){
  e.preventDefault()
  const nameinput = document.querySelector('.name-input') as HTMLInputElement;

  const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;

  if(nameinput.value.length >= 5 && nameinput.value.length <=100
    && physicianInput.value.length >= 10 && physicianInput.value.length <= 45 ){


    const newspecialty: specialtyI = {
      id: null,
      name: nameinput.value,
      physicianInCharge: physicianInput.value,
      patients: []

    }

    postSpecialty(newspecialty).then(
      response => {
        if(response.status === 200){
          state.push(newspecialty)

          createSpecialty(newspecialty);
          nameinput.value = '';
          physicianInput.value = '';
          window.location.reload();
        }
      }
    )
  }
}

function createSpecialty(specialty:specialtyI){
  const specialtyContainer = document.querySelector('.medicalspecialtylist-container') as HTMLDivElement

  const div:HTMLDivElement = document.createElement('div');
  div.className = `specialty-${specialty.id}`
  div.classList.add(`single-specialty-container` )
  div.classList.add(`grid-container`)

  const h2:HTMLHeadElement = document.createElement('h2');
  h2.className = `single-specialty-name-${specialty.id}`
  h2.innerText = 'Specialty: ' + specialty.name

  const reminderP:HTMLParagraphElement = document.createElement('p')
  reminderP.className = `single-specialty-physician-${specialty.id}`
  reminderP.innerText = 'Physician In Charge: ' + specialty.physicianInCharge

  const deleteButton:HTMLButtonElement = document.createElement('button')
  deleteButton.className = 'single-specialty-delete-button'
  deleteButton.innerText = 'Delete Specialty'
  deleteButton.addEventListener('click', ()=> handleDeleteSpecialty(div))

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'single-specialty-edit-button'
  editButton.innerText = 'Edit Specialty'
  editButton.addEventListener('click', ()=> hanldeEditspecialty(specialty))

  const formpatient:HTMLFormElement = document.createElement('form');
  formpatient.className = `patientform-${specialty.id}`

 const insertpatientButton:HTMLButtonElement = document.createElement('button')
 insertpatientButton.className = 'add-patient-button'
 insertpatientButton.innerText = 'Add patient'
 insertpatientButton.addEventListener('click', ()=> hanldeAddpatient(specialty, div, formpatient))


  div.append(h2, reminderP, deleteButton, editButton, insertpatientButton, formpatient)
  specialtyContainer.append(div)

  if( specialty.patients?.length && specialty?.id){
    insertpatients(specialty.patients, div, specialty)
   }

}



function hanldeEditspecialty(specialty:specialtyI){

  const nameInput = document.querySelector('.name-input') as HTMLInputElement;
  const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;
  const submitButton = document.querySelector('.specialties-form-button') as HTMLButtonElement
  submitButton.classList.add('display_none')

  const editButton:HTMLButtonElement = document.createElement('button')
  editButton.className = 'form-edit-button'
  editButton.innerText = 'Edit';
  editButton.addEventListener('click', () => executeEdition(specialty, nameInput, physicianInput))

  const formContainer = document.querySelector('.form-container');
  formContainer?.append(editButton)

  nameInput.value = specialty.name!;
  physicianInput.value = specialty.physicianInCharge!;
}

function executeEdition(specialty:specialtyI, nameInput:HTMLInputElement, physician:HTMLInputElement){
  if(nameInput.value.length >= 5 && nameInput.value.length <=100
    && physician.value.length >= 10 && physician.value.length <= 45 ){
  const specialtyEdited:specialtyI = {
    id:specialty.id,
    name:nameInput.value,
    physicianInCharge:physician.value,
    patients:[]
  }
  putSpecialty(specialtyEdited).then(response => {
    if(response.status === 200){
      /*const newState:specialtyI[] = state.map(specialty => specialty.id === specialtyEdited.id?specialtyEdited:specialty)
      state = newState;

      const h2Title = document.querySelector(`.single-specialty-name-${specialty.id}`) as HTMLHeadingElement
      h2Title.innerText = 'Specialty: ' + specialtyEdited.name!
      const pReminder = document.querySelector(`.single-specialty-physician-${specialty.id}`) as HTMLParagraphElement
      pReminder.innerText = 'Physician In Charge: ' + specialtyEdited.physicianInCharge!

      nameInput.value = ''
      physician.value = ''
      const submitButton = document.querySelector('.specialties-form-button') as HTMLButtonElement
      submitButton.classList.remove('display_none')

      const editButton = document.querySelector('.form-edit-button') as HTMLButtonElement

      editButton.remove()

      */window.location.reload();
    }
  })

    }

}
function hanldeAddpatient(specialty:specialtyI, div:HTMLDivElement, formpatient:HTMLFormElement){



    const submitButtonadd = document.querySelectorAll('.add-patient-button')
    submitButtonadd.forEach(button => (button.classList.add('display_none')))

    const inputname:HTMLInputElement = document.createElement('input');
    inputname.className = `inputpatientname-${specialty.id}`
    inputname.placeholder = "Patient name"

    const inputage:HTMLInputElement = document.createElement('input');
    inputage.className = `inputpatientage-${specialty.id}`
    inputage.placeholder = "Patient age"

    const inputIdnumber:HTMLInputElement = document.createElement('input');
    inputIdnumber.className = `inputpatientidnumber-${specialty.id}`
    inputIdnumber.placeholder = "Patient Identification Number"

    const submitButton:HTMLButtonElement = document.createElement('button');
    submitButton.className = 'single-add-patient-button'
    submitButton.innerText = 'Add'
    //submitButton.addEventListener('click', ()=> handlepatientSubmit(div))

    formpatient.append(inputname, inputage, inputIdnumber, document.createElement('br'), submitButton)
    formpatient?.addEventListener('submit', (e) => handlepatientSubmit(e, specialty, div, formpatient))
   // div.append(formpatient)

  }



  function handlepatientSubmit(e:SubmitEvent, specialty:specialtyI,
    div:HTMLDivElement, formpatient:HTMLFormElement){

  e.preventDefault()
  const nameinput = document.querySelector(`.inputpatientname-${specialty.id}`) as HTMLInputElement;
  const inputage = document.querySelector(`.inputpatientage-${specialty.id}`) as HTMLInputElement;
  const inputIdnumber = document.querySelector(`.inputpatientidnumber-${specialty.id}`) as HTMLInputElement;


  if(nameinput.value.length >= 10 && nameinput.value.length <=45
    && Number(inputage.value) > 0 ){



    const newpatient: patientI = {
          id:null,
          name:nameinput.value,
          age:inputage.value,
          identificationNumber:inputIdnumber.value,
          date:[],
          numberOfApointments:1
    }
    const newspecialtypatient: specialtyI = {
      id: specialty.id,
      name: null,
      physicianInCharge: null,
      patients: [newpatient]

    }

    postPatient(newspecialtypatient).then(
      response => {
        if(response.status === 200){
            state.push(newspecialtypatient)

          insertsinglepatient(newpatient, div, specialty);
          nameinput.value = '';

          formpatient.remove()
          const submitButtonadd = document.querySelectorAll('.add-patient-button')
          submitButtonadd.forEach(button => (button.classList.remove('display_none')))

          window.location.reload();
        }
      }
    )
  }
  }











function insertpatients(patients:patientI[], specialtyContainer:HTMLDivElement, specialty:specialtyI){
    patients.forEach(patient => insertsinglepatient(patient, specialtyContainer, specialty))
}


function insertsinglepatient(patient:patientI, specialtyContainer:HTMLDivElement, specialty:specialtyI){


    const div:HTMLDivElement = document.createElement('div');
    div.className = `patient-${patient.id}`
    div.classList.add('single-patient-container')

    const name:HTMLHeadElement = document.createElement('p');
    name.className = `single-patient-name-${patient.id}`
    name.innerText = 'Patient name: ' + patient.name

    const agep:HTMLHeadElement = document.createElement('p');
    agep.className = `single-patient-name-${patient.id}`
    agep.innerText = 'Age: ' + patient.age

    const numberApointments:HTMLHeadElement = document.createElement('p');
    numberApointments.className = `single-patient-name-${patient.id}`
    numberApointments.innerText = 'Number of Apointments: ' + patient.numberOfApointments

    const pidentificantion:HTMLHeadElement = document.createElement('p');
    pidentificantion.className = `single-patient-name-${patient.id}`
    pidentificantion.innerText = 'Identification Number: ' + patient.identificationNumber


    patient.date?.forEach(date => recreatedates(date, div))

    const deleteButton:HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-patient-delete-button'
    deleteButton.innerText = 'Delete patient'
    deleteButton.addEventListener('click', ()=> handleDeletePatient(div))

    const eadddateButton:HTMLButtonElement = document.createElement('button')
    eadddateButton.className = 'single-patient-add-date-button'
    eadddateButton.innerText = 'add date'
    eadddateButton.addEventListener('click', ()=> handleadddate(patient, div, specialty))

    div.append(name, pidentificantion, agep, numberApointments, eadddateButton, deleteButton)
    specialtyContainer.append(div)

}



function handleadddate(patient:patientI, div:HTMLDivElement, specialty:specialtyI){




    const newpatient: patientI = {
          id:patient.id,
          name:patient.name,
          age:patient.age,
          identificationNumber:patient.identificationNumber,
          date:patient.date,
          numberOfApointments: patient.numberOfApointments
    }
    const newspecialtypatient: specialtyI = {
      id: specialty.id,
      name: null,
      physicianInCharge: null,
      patients: [newpatient]

    }

    putPatient(newspecialtypatient).then(
      response => {
        if(response.status === 200){
            state.push(newspecialtypatient)

          insertsinglepatient(newpatient, div, specialty);

          const submitButtonadd = document.querySelectorAll('.add-patient-button')
          submitButtonadd.forEach(button => (button.classList.remove('display_none')))


        }
        window.location.reload();
      }
    )
  }

function recreateSpecialy(specialy:specialtyI[]){
    specialy.forEach(specialy => createSpecialty(specialy))
  }

function recreatedates(date:string, div:HTMLDivElement){

    const datep:HTMLHeadElement = document.createElement('p');
    datep.className = `single-patient-date`
    datep.innerText = 'Appoinment Date: ' + date
    div.append(datep)

}

function handleDeleteSpecialty(div:HTMLDivElement){
    const id:string = div.classList[0].split('-')[1]

    deleteSpecialty(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newSate = state.filter(specialty => specialty.id !== parseInt(id))
        state = newSate
      }
    })
  }

  function handleDeletePatient(div:HTMLDivElement){
    const id:string = div.classList[0].split('-')[1]

    deletePatient(id).then(response => {
      if(response.status === 200){
        div.remove()
        const newSate = state.filter(specialty => specialty.id !== parseInt(id))
        state = newSate
      }
    })
  }

