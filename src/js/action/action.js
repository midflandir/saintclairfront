var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getAllSpecialtypatient() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:9090/api/v1/hospital/allmedicalspecialty');
        const data = yield response.json();
        return data;
    });
}
export function postSpecialty(specialty) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:9090/api/v1/hospital/registerspecialty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        });
        return response;
    });
}
export function postPatient(specialty) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:9090/api/v1/hospital/registerpatient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        });
        return response;
    });
}
export function deleteSpecialty(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:9090/api/v1/hospital/deletespecialty/${id}`, {
            method: 'DELETE'
        });
        return response;
    });
}
export function deletePatient(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:9090/api/v1/hospital/deletepatient/${id}`, {
            method: 'DELETE'
        });
        return response;
    });
}
export function putPatient(specialty) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:9090/api/v1/hospital/adddatepatient', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        });
        return response;
    });
}
