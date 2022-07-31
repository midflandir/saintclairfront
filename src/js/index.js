import { getAllSpecialtypatient, postSpecialty, deleteSpecialty, deletePatient, postPatient, putPatient } from "./action/action.js";
const form = document.querySelector('.specialties-form');
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
                window.location.reload();
            }
        });
    }
}
function createSpecialty(specialty) {
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
    reminderP.className = `single-specialty-reminder-${specialty.id}`;
    reminderP.innerText = 'Physician In Charge: ' + specialty.physicianInCharge;
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-specialty-delete-button';
    deleteButton.innerText = 'Delete Specialty';
    deleteButton.addEventListener('click', () => handleDeleteSpecialty(div));
    const editButton = document.createElement('button');
    editButton.className = 'single-specialty-edit-button';
    editButton.innerText = 'Edit Specialty';
    //editButton.addEventListener('click', ()=> hanldeEditspecialty(specialty))
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
function hanldeAddpatient(specialty, div, formpatient) {
    const submitButtonadd = document.querySelectorAll('.add-patient-button');
    submitButtonadd.forEach(button => (button.classList.add('display_none')));
    const inputname = document.createElement('input');
    inputname.className = `inputpatientname-${specialty.id}`;
    inputname.placeholder = "Patient name";
    const inputage = document.createElement('input');
    inputage.className = `inputpatientage-${specialty.id}`;
    inputage.placeholder = "Patient age";
    const inputIdnumber = document.createElement('input');
    inputIdnumber.className = `inputpatientidnumber-${specialty.id}`;
    inputIdnumber.placeholder = "Patient Identification Number";
    const submitButton = document.createElement('button');
    submitButton.className = 'single-specialty-delete-button';
    submitButton.innerText = 'Add';
    //submitButton.addEventListener('click', ()=> handlepatientSubmit(div))
    formpatient.append(inputname, inputage, inputIdnumber, document.createElement('br'), submitButton);
    formpatient === null || formpatient === void 0 ? void 0 : formpatient.addEventListener('submit', (e) => handlepatientSubmit(e, specialty, div, formpatient));
    // div.append(formpatient)
}
function handlepatientSubmit(e, specialty, div, formpatient) {
    e.preventDefault();
    const nameinput = document.querySelector(`.inputpatientname-${specialty.id}`);
    const inputage = document.querySelector(`.inputpatientage-${specialty.id}`);
    const inputIdnumber = document.querySelector(`.inputpatientidnumber-${specialty.id}`);
    if (nameinput.value.length >= 10 && nameinput.value.length <= 45
        && Number(inputage.value) > 0) {
        const newpatient = {
            id: null,
            name: nameinput.value,
            age: inputage.value,
            identificationNumber: inputIdnumber.value,
            date: [],
            numberOfApointments: 1
        };
        const newspecialtypatient = {
            id: specialty.id,
            name: null,
            physicianInCharge: null,
            patients: [newpatient]
        };
        postPatient(newspecialtypatient).then(response => {
            if (response.status === 200) {
                state.push(newspecialtypatient);
                insertsinglepatient(newpatient, div, specialty);
                nameinput.value = '';
                formpatient.remove();
                const submitButtonadd = document.querySelectorAll('.add-patient-button');
                submitButtonadd.forEach(button => (button.classList.remove('display_none')));
                window.location.reload();
            }
        });
    }
}
function insertpatients(patients, specialtyContainer, specialty) {
    patients.forEach(patient => insertsinglepatient(patient, specialtyContainer, specialty));
}
function insertsinglepatient(patient, specialtyContainer, specialty) {
    var _a;
    const div = document.createElement('div');
    div.className = `patient-${patient.id}`;
    div.classList.add('single-patient-container');
    const name = document.createElement('p');
    name.className = `single-patient-name-${patient.id}`;
    name.innerText = 'Patient name: ' + patient.name;
    const agep = document.createElement('p');
    agep.className = `single-patient-name-${patient.id}`;
    agep.innerText = 'Age: ' + patient.age;
    const numberApointments = document.createElement('p');
    numberApointments.className = `single-patient-name-${patient.id}`;
    numberApointments.innerText = 'Number of Apointments: ' + patient.numberOfApointments;
    const pidentificantion = document.createElement('p');
    pidentificantion.className = `single-patient-name-${patient.id}`;
    pidentificantion.innerText = 'Identification Number: ' + patient.identificationNumber;
    (_a = patient.date) === null || _a === void 0 ? void 0 : _a.forEach(date => recreatedates(date, div));
    const deleteButton = document.createElement('button');
    deleteButton.className = 'single-patient-delete-button';
    deleteButton.innerText = 'Delete patient';
    deleteButton.addEventListener('click', () => handleDeletePatient(div));
    const eadddateButton = document.createElement('button');
    eadddateButton.className = 'single-patient-add-date-button';
    eadddateButton.innerText = 'add date';
    eadddateButton.addEventListener('click', () => handleadddate(patient, div, specialty));
    div.append(name, pidentificantion, agep, numberApointments, eadddateButton, deleteButton);
    specialtyContainer.append(div);
}
function handleadddate(patient, div, specialty) {
    const newpatient = {
        id: patient.id,
        name: patient.name,
        age: patient.age,
        identificationNumber: patient.identificationNumber,
        date: patient.date,
        numberOfApointments: patient.numberOfApointments
    };
    const newspecialtypatient = {
        id: specialty.id,
        name: null,
        physicianInCharge: null,
        patients: [newpatient]
    };
    putPatient(newspecialtypatient).then(response => {
        if (response.status === 200) {
            state.push(newspecialtypatient);
            insertsinglepatient(newpatient, div, specialty);
            const submitButtonadd = document.querySelectorAll('.add-patient-button');
            submitButtonadd.forEach(button => (button.classList.remove('display_none')));
        }
        window.location.reload();
    });
}
function recreateSpecialy(specialy) {
    specialy.forEach(specialy => createSpecialty(specialy));
}
function recreatedates(date, div) {
    const datep = document.createElement('p');
    datep.className = `single-patient-date`;
    datep.innerText = 'Appoinment Date: ' + date;
    div.append(datep);
}
function handleDeleteSpecialty(div) {
    const id = div.classList[0].split('-')[1];
    deleteSpecialty(id).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter(specialty => specialty.id !== parseInt(id));
            state = newSate;
        }
    });
}
function handleDeletePatient(div) {
    const id = div.classList[0].split('-')[1];
    deletePatient(id).then(response => {
        if (response.status === 200) {
            div.remove();
            const newSate = state.filter(specialty => specialty.id !== parseInt(id));
            state = newSate;
        }
    });
}
