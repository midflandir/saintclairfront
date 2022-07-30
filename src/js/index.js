import { getAllSpecialtypatient, postSpecialty /* postNote, deleteNote, putNote*/ } from "./action/action.js";
const form = document.querySelector('.specialties-form');
/*
export interface specialtyI{
    id:number|null,
    name:string,
    physicianInCharge:string,
    patients:patientI[] | null

}
export interface patientI{
      id:number,
      name:string,
      age:string,
      identificationNumber:string,
      date:string[],
      numberOfApointments:number

}*/
getAllSpecialtypatient().then(specialties => {
    state = specialties;
    recreateSpecialy(specialties);
});
let state = [];
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => handleSubmit(e));
function handleSubmit(e) {
    e.preventDefault();
    const nameinput = document.querySelector('.name-input');
    const physicianInput = document.querySelector('.physician-input');
    if (nameinput.value.length >= 5 && nameinput.value.length <= 100
        && physicianInput.value.length >= 10 && physicianInput.value.length <= 45) {
        const date = new Date();
        date.setHours(date.getHours() - 5);
        const newspecialty = {
            id: null,
            name: nameinput.value,
            physicianInCharge: physicianInput.value,
            patients: []
        };
        postSpecialty(newspecialty).then(response => {
            if (response.status === 200) {
                state.push(newspecialty);
                createSpecialty(newspecialty);
                nameinput.value = '';
                physicianInput.value = '';
            }
        });
    }
}
function createSpecialty(specialty) {
    var _a;
    const specialtyContainer = document.querySelector('.medicalspecialtylist-container');
    const div = document.createElement('div');
    div.className = 'single-specialty-container grid-container';
    div.classList.add(`specialty-${specialty.id}`);
    const h2 = document.createElement('h2');
    h2.className = `single-specialty-name-${specialty.id}`;
    h2.innerText = 'Specialty: ' + specialty.name;
    const reminderP = document.createElement('p');
    reminderP.className = `single-specialty-reminder-${specialty.id}`;
    reminderP.innerText = 'Physician In Charge: ' + specialty.physicianInCharge;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-specialty-delete-button';
    deleteButton.innerText = 'Delete Specialty';
    //deleteButton.addEventListener('click', ()=> handleDelete(div))
    const editButton = document.createElement('button');
    editButton.className = 'single-specialty-edit-button';
    editButton.innerText = 'Edit Specialty';
    // editButton.addEventListener('click', ()=> hanldeEdit(note))
    const insertpatientButton = document.createElement('button');
    insertpatientButton.className = 'add-patient-button';
    insertpatientButton.innerText = 'Add patient';
    // insertpatientButton.addEventListener('click', ()=> hanldeEdit(note))
    div.append(h2, reminderP, deleteButton, editButton, insertpatientButton);
    specialtyContainer.append(div);
    if (((_a = specialty.patients) === null || _a === void 0 ? void 0 : _a.length) && (specialty === null || specialty === void 0 ? void 0 : specialty.id)) {
        insertpatients(specialty.patients, specialty.id, div);
    }
}
function insertpatients(patients, specialtyid, specialtyContainer) {
    patients.forEach(patient => insertsinglepatient(patient, specialtyid, specialtyContainer));
}
function insertsinglepatient(patient, specialtyid, specialtyContainer) {
    const div = document.createElement('div');
    div.className = 'single-patient-container';
    div.classList.add(`specialty-${specialtyid}`);
    const name = document.createElement('p');
    name.className = `single-patient-name-${specialtyid}`;
    name.innerText = 'Patient name: ' + patient.name;
    const agep = document.createElement('p');
    agep.className = `single-patient-name-${specialtyid}`;
    agep.innerText = 'Age: ' + patient.age;
    const numberApointments = document.createElement('p');
    agep.className = `single-patient-name-${specialtyid}`;
    agep.innerText = 'Number of Apointments: ' + patient.numberOfApointments;
    const pidentificantion = document.createElement('p');
    pidentificantion.className = `single-patient-name-${specialtyid}`;
    pidentificantion.innerText = 'Identification Number: ' + patient.identificationNumber;
    patient.date.forEach(date => recreatedates(date, div));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-patient-delete-button';
    deleteButton.innerText = 'Delete patient';
    //deleteButton.addEventListener('click', ()=> handleDelete(div))
    const eadddateButton = document.createElement('button');
    eadddateButton.className = 'single-patient-add-date-button';
    eadddateButton.innerText = 'add date';
    // editButton.addEventListener('click', ()=> hanldeEdit(note))
    div.append(name, pidentificantion, agep, numberApointments, eadddateButton, deleteButton);
    specialtyContainer.append(div);
}
function recreateSpecialy(specialy) {
    specialy.forEach(specialy => createSpecialty(specialy));
}
function recreatedates(date, div) {
    const datep = document.createElement('p');
    datep.className = `single-patient-date`;
    datep.innerText = 'Date: ' + date;
    div.append(datep);
}
