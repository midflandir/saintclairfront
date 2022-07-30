import { specialtyI, patientI} from "../model/interface.js";

export async function getAllSpecialtypatient() {
  const response:Response = await fetch('http://localhost:9090/api/v1/hospital/allmedicalspecialty')

  const data:specialtyI[] = await response.json()

  return data
}

export async function postSpecialty(specialty:specialtyI){

    const response:Response = await fetch('http://localhost:9090/api/v1/hospital/registerspecialty',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(specialty)
    })

    return response;
  }


export async function deleteSpecialty(id:string){

  const response:Response = await fetch(`http://localhost:9090/api/v1/hospital/deletespecialty/${id}`,
  {
    method: 'DELETE'
  })

  return response;
}


export async function deletePatient(id:string){

    const response:Response = await fetch(`http://localhost:9090/api/v1/hospital/deletepatient/${id}`,
    {
      method: 'DELETE'
    })

    return response;
  }
/*
export async function putNote(note:noteI){
  const response:Response = await fetch('http://localhost:8081/api/v1/update/note',
  {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  return response;
}*/

/*
export async function postNote(note:noteI){
  const response:Response = await fetch('http://localhost:8081/api/v1/save/note',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })

  return response;
}
*/