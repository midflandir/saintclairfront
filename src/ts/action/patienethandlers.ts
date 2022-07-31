import { specialtyI, patientI } from "../model/interface.js";
import { deletePatient, postPatient, putPatient } from "../services/patientservice.js";
let state: specialtyI[] = []

export function hanldeAddpatient(specialty: specialtyI, div: HTMLDivElement, formpatient: HTMLFormElement) {

    const submitButtonadd = document.querySelectorAll('.add-patient-button')
    submitButtonadd.forEach(button => (button.classList.add('display_none')))

    const inputname: HTMLInputElement = document.createElement('input');
    inputname.className = `inputpatientname-${specialty.id}`
    inputname.placeholder = "Patient name"

    const inputage: HTMLInputElement = document.createElement('input');
    inputage.className = `inputpatientage-${specialty.id}`
    inputage.placeholder = "Patient age"

    const inputIdnumber: HTMLInputElement = document.createElement('input');
    inputIdnumber.className = `inputpatientidnumber-${specialty.id}`
    inputIdnumber.placeholder = "Patient Identification Number"

    const submitButton: HTMLButtonElement = document.createElement('button');
    submitButton.className = 'single-add-patient-button'
    submitButton.innerText = 'Add'

    formpatient.append(inputname, inputage, inputIdnumber, document.createElement('br'), submitButton)
    formpatient?.addEventListener('submit', (e) => handlepatientSubmit(e, specialty, div, formpatient))

}

export function handlepatientSubmit(e: SubmitEvent, specialty: specialtyI,
    div: HTMLDivElement, formpatient: HTMLFormElement) {

    e.preventDefault()
    const nameinput = document.querySelector(`.inputpatientname-${specialty.id}`) as HTMLInputElement;
    const inputage = document.querySelector(`.inputpatientage-${specialty.id}`) as HTMLInputElement;
    const inputIdnumber = document.querySelector(`.inputpatientidnumber-${specialty.id}`) as HTMLInputElement;

    if (nameinput.value.length >= 10 && nameinput.value.length <= 45
        && Number(inputage.value) > 0) {

        const newpatient: patientI = {
            id: null,
            name: nameinput.value,
            age: inputage.value,
            identificationNumber: inputIdnumber.value,
            date: [],
            numberOfApointments: 1
        }
        const newspecialtypatient: specialtyI = {
            id: specialty.id,
            name: null,
            physicianInCharge: null,
            patients: [newpatient]
        }

        postPatient(newspecialtypatient).then(
            response => {
                if (response.status === 200) {
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

export function insertpatients(patients: patientI[], specialtyContainer: HTMLDivElement, specialty: specialtyI) {
    patients.forEach(patient => insertsinglepatient(patient, specialtyContainer, specialty))
}

function insertsinglepatient(patient: patientI, specialtyContainer: HTMLDivElement, specialty: specialtyI) {

    const div: HTMLDivElement = document.createElement('div');
    div.className = `patient-${patient.id}`
    div.classList.add('single-patient-container')

    const name: HTMLHeadElement = document.createElement('p');
    name.className = `single-patient-name-${patient.id}`
    name.innerText = 'Patient name: ' + patient.name

    const agep: HTMLHeadElement = document.createElement('p');
    agep.className = `single-patient-name-${patient.id}`
    agep.innerText = 'Age: ' + patient.age

    const numberApointments: HTMLHeadElement = document.createElement('p');
    numberApointments.className = `single-patient-name-${patient.id}`
    numberApointments.innerText = 'Number of Apointments: ' + patient.numberOfApointments

    const pidentificantion: HTMLHeadElement = document.createElement('p');
    pidentificantion.className = `single-patient-name-${patient.id}`
    pidentificantion.innerText = 'Identification Number: ' + patient.identificationNumber


    patient.date?.forEach(date => recreatedates(date, div))

    const deleteButton: HTMLButtonElement = document.createElement('button')
    deleteButton.className = 'single-patient-delete-button'
    deleteButton.innerText = 'Delete patient'
    deleteButton.addEventListener('click', () => handleDeletePatient(div))

    const eadddateButton: HTMLButtonElement = document.createElement('button')
    eadddateButton.className = 'single-patient-add-date-button'
    eadddateButton.innerText = 'add date'
    eadddateButton.addEventListener('click', () => handleadddate(patient, div, specialty))

    div.append(name, pidentificantion, agep, numberApointments, eadddateButton, deleteButton)
    specialtyContainer.append(div)

}

export function handleadddate(patient: patientI, div: HTMLDivElement, specialty: specialtyI) {




    const newpatient: patientI = {
        id: patient.id,
        name: patient.name,
        age: patient.age,
        identificationNumber: patient.identificationNumber,
        date: patient.date,
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
            if (response.status === 200) {
                state.push(newspecialtypatient)

                insertsinglepatient(newpatient, div, specialty);

                const submitButtonadd = document.querySelectorAll('.add-patient-button')
                submitButtonadd.forEach(button => (button.classList.remove('display_none')))


            }
            window.location.reload();
        }
    )
}

function handleDeletePatient(div: HTMLDivElement) {
    const id: string = div.classList[0].split('-')[1]

    deletePatient(id).then(response => {
        if (response.status === 200) {
            div.remove()
            const newSate = state.filter(specialty => specialty.id !== parseInt(id))
            state = newSate
        }
    })
}


function recreatedates(date: string, div: HTMLDivElement) {

    const datep: HTMLHeadElement = document.createElement('p');
    datep.className = `single-patient-date`
    datep.innerText = 'Appoinment Date: ' + date
    div.append(datep)

}