import { getAllSpecialtypatient, postSpecialty, deleteSpecialty, putSpecialty } from "./services/specialtyservice.js";
import { deletePatient, postPatient, putPatient } from "./services/patientservice.js";
import { specialtyI, patientI } from "./model/interface.js";

import { recreateSpecialy, createSpecialty } from "./action/specialtyhandlers.js";;


const form: HTMLFormElement | null =
  document.querySelector('.specialties-form');

getAllSpecialtypatient().then(specialties => {
  state = specialties
  recreateSpecialy(specialties);
})

let state: specialtyI[] = []

form?.addEventListener('submit', (e) => handleSubmit(e))

function handleSubmit(e: SubmitEvent) {
  e.preventDefault()
  const nameinput = document.querySelector('.name-input') as HTMLInputElement;

  const physicianInput = document.querySelector('.physician-input') as HTMLInputElement;

  if (nameinput.value.length >= 5 && nameinput.value.length <= 100
    && physicianInput.value.length >= 10 && physicianInput.value.length <= 45) {


    const newspecialty: specialtyI = {
      id: null,
      name: nameinput.value,
      physicianInCharge: physicianInput.value,
      patients: []

    }

    postSpecialty(newspecialty).then(
      response => {
        if (response.status === 200) {
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
