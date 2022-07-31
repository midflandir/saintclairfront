import { hanldeAddpatient, insertpatients } from "./patienethandlers.js";
import { deleteSpecialty, putSpecialty } from "../services/specialtyservice.js";
let state = [];
export function createSpecialty(specialty) {
    var _a;
    const specialtyContainer = document.querySelector('.medicalspecialtylist-container');
    const div = document.createElement('div');
    div.className = `specialty-${specialty.id}`;
    div.classList.add(`single-specialty-container`);
    div.classList.add(`grid-container`);
    const h2 = document.createElement('h2');
    h2.className = `single-specialty-name-${specialty.id}`;
    h2.innerText = 'Specialty: ' + specialty.name;
    const reminderP = document.createElement('p');
    reminderP.className = `single-specialty-physician-${specialty.id}`;
    reminderP.innerText = 'Physician In Charge: ' + specialty.physicianInCharge;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-specialty-delete-button';
    deleteButton.innerText = 'Delete Specialty';
    deleteButton.addEventListener('click', () => handleDeleteSpecialty(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-specialty-edit-button';
    editButton.innerText = 'Edit Specialty';
    editButton.addEventListener('click', () => hanldeEditspecialty(specialty));
    const formpatient = document.createElement('form');
    formpatient.className = `patientform-${specialty.id}`;
    const insertpatientButton = document.createElement('button');
    insertpatientButton.className = 'add-patient-button';
    insertpatientButton.innerText = 'Add patient';
    insertpatientButton.addEventListener('click', () => hanldeAddpatient(specialty, div, formpatient));
    div.append(h2, reminderP, deleteButton, editButton, insertpatientButton, formpatient);
    specialtyContainer.append(div);
    if (((_a = specialty.patients) === null || _a === void 0 ? void 0 : _a.length) && (specialty === null || specialty === void 0 ? void 0 : specialty.id)) {
        insertpatients(specialty.patients, div, specialty);
    }
}
export function hanldeEditspecialty(specialty) {
    const nameInput = document.querySelector('.name-input');
    const physicianInput = document.querySelector('.physician-input');
    const submitButton = document.querySelector('.specialties-form-button');
    submitButton.classList.add('display_none');
    const editButton = document.createElement('button');
    editButton.className = 'form-edit-button';
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => executeEdition(specialty, nameInput, physicianInput));
    const formContainer = document.querySelector('.form-container');
    formContainer === null || formContainer === void 0 ? void 0 : formContainer.append(editButton);
    nameInput.value = specialty.name;
    physicianInput.value = specialty.physicianInCharge;
}
export function executeEdition(specialty, nameInput, physician) {
    if (nameInput.value.length >= 5 && nameInput.value.length <= 100
        && physician.value.length >= 10 && physician.value.length <= 45) {
        const specialtyEdited = {
            id: specialty.id,
            name: nameInput.value,
            physicianInCharge: physician.value,
            patients: []
        };
        putSpecialty(specialtyEdited).then(response => {
            if (response.status === 200) {
                window.location.reload();
            }
        });
    }
}
export function recreateSpecialy(specialy) {
    specialy.forEach(specialy => createSpecialty(specialy));
}
export function handleDeleteSpecialty(div) {
    const id = div.classList[0].split('-')[1];
    deleteSpecialty(id).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter(specialty => specialty.id !== parseInt(id));
            state = newSate;
        }
    });
}
