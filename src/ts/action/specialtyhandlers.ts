import { specialtyI } from "../model/interface.js";
import { hanldeAddpatient, insertpatients } from "./patienethandlers.js"
import { deleteSpecialty, putSpecialty } from "../services/specialtyservice.js";

let state: specialtyI[] = []

export function createSpecialty(specialty: specialtyI) {
    const specialtyContainer = document.querySelector('.medicalspecialtylist-container') as HTMLDivElement

    const div: HTMLDivElement = document.createElement('div');
    div.className = `specialty-${specialty.id}`
    div.classList.add(`single-specialty-container`)
    div.classList.add(`grid-container`)

    const h2: HTMLHeadElement = document.createElement('h2');
    h2.className = `single-specialty-name-${specialty.id}`
    h2.innerText = 'Specialty: ' + specialty.name

    const reminderP: HTMLParagraphElement = document.createElement('p')
    reminderP.className = `single-specialty-physician-${specialty.id}`
    reminderP.innerText = 'Physician In Charge: ' + specialty.physicianInCharge

    const deleteButton: HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-specialty-delete-button'
    deleteButton.innerText = 'Delete Specialty'
    deleteButton.addEventListener('click', () => handleDeleteSpecialty(div))

    const editButton: HTMLButtonElement = document.createElement('button')
    editButton.className = 'single-specialty-edit-button'
    editButton.innerText = 'Edit Specialty'
    editButton.addEventListener('click', () => hanldeEditspecialty(specialty))

    const formpatient: HTMLFormElement = document.createElement('form');
    formpatient.className = `patientform-${specialty.id}`

    const insertpatientButton: HTMLButtonElement = document.createElement('button')
    insertpatientButton.className = 'add-patient-button'
    insertpatientButton.innerText = 'Add patient'
    insertpatientButton.addEventListener('click', () => hanldeAddpatient(specialty, div, formpatient))


    div.append(h2, reminderP, deleteButton, editButton, insertpatientButton, formpatient)
    specialtyContainer.append(div)

    if (specialty.patients?.length && specialty?.id) {
        insertpatients(specialty.patients, div, specialty)
    }

}



export function hanldeEditspecialty(specialty: specialtyI) {

    const nameInput = document.querySelector('.name-input') as HTMLInputElement;
    const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;
    const submitButton = document.querySelector('.specialties-form-button') as HTMLButtonElement
    submitButton.classList.add('display_none')

    const editButton: HTMLButtonElement = document.createElement('button')
    editButton.className = 'form-edit-button'
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(specialty, nameInput, physicianInput))

    const formContainer = document.querySelector('.form-container');
    formContainer?.append(editButton)

    nameInput.value = specialty.name!;
    physicianInput.value = specialty.physicianInCharge!;
}

export function executeEdition(specialty: specialtyI, nameInput: HTMLInputElement, physician: HTMLInputElement) {
    if (nameInput.value.length >= 5 && nameInput.value.length <= 100
        && physician.value.length >= 10 && physician.value.length <= 45) {
        const specialtyEdited: specialtyI = {
            id: specialty.id,
            name: nameInput.value,
            physicianInCharge: physician.value,
            patients: []
        }
        putSpecialty(specialtyEdited).then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        })

    }

}

export function recreateSpecialy(specialy: specialtyI[]) {
    specialy.forEach(specialy => createSpecialty(specialy))
}



export function handleDeleteSpecialty(div: HTMLDivElement) {
    const id: string = div.classList[0].split('-')[1]

    deleteSpecialty(id).then(response => {
        if (response.status === 200) {
            div.remove()
            const newSate = state.filter(specialty => specialty.id !== parseInt(id))
            state = newSate
        }
    })
}



