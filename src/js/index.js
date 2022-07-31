import { getAllSpecialtypatient, postSpecialty } from "./services/specialtyservice.js";
import { recreateSpecialy, createSpecialty } from "./action/specialtyhandlers.js";
;
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
