

  export interface specialtyI{
    id:number|null,
    name:string,
    physicianInCharge:string,
    patients:patientI[] | null

}
export interface patientI{
      id:number,
      name:string,
      age:string,
      identificationNumber:string,
      date:string[],
      numberOfApointments:number

}
