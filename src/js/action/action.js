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
