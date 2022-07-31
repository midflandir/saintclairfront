import { specialtyI } from "../model/interface.js";

export async function getAllSpecialtypatient() {
    const response: Response = await fetch('http://localhost:9090/api/v1/hospital/allmedicalspecialty')

    const data: specialtyI[] = await response.json()

    return data
}

export async function postSpecialty(specialty: specialtyI) {

    const response: Response = await fetch('http://localhost:9090/api/v1/hospital/registerspecialty',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        })

    return response;
}

export async function putSpecialty(specialty: specialtyI) {

    const response: Response = await fetch('http://localhost:9090/api/v1/hospital/updatespecialty',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(specialty)
        })

    return response;
}





export async function deleteSpecialty(id: string) {

    const response: Response = await fetch(`http://localhost:9090/api/v1/hospital/deletespecialty/${id}`,
        {
            method: 'DELETE'
        })

    return response;
}
