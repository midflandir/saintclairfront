import { specialtyI } from "../model/interface.js";

export async function deletePatient(id: string) {

    const response: Response = await fetch(`http://localhost:9090/api/v1/hospital/deletepatient/${id}`,
        {
            method: 'DELETE'
        })

    return response;
}

export async function putPatient(specialty: specialtyI) {

    const response: Response = await fetch('http://localhost:9090/api/v1/hospital/adddatepatient',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        })

    return response;
}


export async function postPatient(specialty: specialtyI) {

    const response: Response = await fetch('http://localhost:9090/api/v1/hospital/registerpatient',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        })

    return response;
}
