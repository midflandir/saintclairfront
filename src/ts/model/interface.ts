

export interface specialtyI {
  id: number | null,
  name: string | null,
  physicianInCharge: string | null,
  patients: patientI[] | null

}
export interface patientI {
  id: number | null,
  name: string,
  age: string,
  identificationNumber: string,
  date: string[] | null,
  numberOfApointments: number | null

}
