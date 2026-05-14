export type MenuId =
  | 'ecardex'
  | 'emergency'
  | 'progress'
  | 'operation'
  | 'consultation'
  | 'discharge'
  | 'lab'
  | 'other'
  | 'other_hospital'
  | 'prescription';

export interface Patient {
  id: string;
  chartNo: string;
  room: string;
  department: string;
  doctor: string;
  name: string;
  birthDate: string;
  gender: 'M' | 'F';
  age: number;
  address: string;
  diagnosis: string;
  chiefComplaint: string;
  onSet: string;
}

export interface NursingRecord {
  id: string;
  timestamp: string;
  content: string;
}

export interface LabResult {
  category: string;
  date: string;
  results: { [key: string]: string };
}
