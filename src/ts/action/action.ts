import { specialtyI } from "../model/interface.js";

export async function getAllSpecialtypatient() {
  const response:Response = await fetch('http://localhost:9090/api/v1/hospital/allmedicalspecialty')

  const data:specialtyI[] = await response.json()

  return data
}
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

export async function deleteNote(id:string){
  const response:Response = await fetch(`http://localhost:8081/api/v1/delete/note/${id}`,
  {
    method: 'DELETE'
  })

  return response;
}

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