import { NewPatient, Gender } from './types';
import z from 'zod'

// const isString = (text: unknown): text is string => {
//   return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date));
// };

// const isGender = (param: string): param is Gender => {
//   return Object.values(Gender).map(g => g.toString()).includes(param);
// };

// const parseName = (name: unknown): string => {
//   if (!isString(name) || name.length < 2) {
//       throw new Error('Incorrect or missing name: ' + name);
//   }
//   return name;
// };

// const parseOccupation = (occupation: unknown): string => {
//   if (!isString(occupation) || occupation.length < 3) {
//       throw new Error('Incorrect or missing occupation: ' + occupation);
//   }
//   return occupation;
// };

// const parseSsn = (ssn: unknown): string => {
//   if (!isString(ssn) || ssn.length < 1) {
//     throw new Error('Incorrect or missing ssn');
//   }

//   return ssn;
// };

// const parseDateOfBirth = (date: unknown): string => {
//   if (!isString(date) || !isDate(date)) {
//       throw new Error('Incorrect or missing Date Of Birth: ' + date);
//   }
//   return date;
// };

// const parseGender = (gender: unknown): Gender => {
//   if (!isString(gender) || !isGender(gender)) {
//       throw new Error('Incorrect or missing gender: ' + gender);
//   }
//   return gender;
// };

// const toNewPatient = (object: unknown): NewPatient => {
//   if ( !object || typeof object !== 'object' ) {
//     throw new Error('Incorrect or missing data');
//   }

//   if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object)  {
//     const newPatient: NewPatient = {
//       name: parseName(object.name),
//       gender: parseGender(object.gender),
//       dateOfBirth: parseDateOfBirth(object.dateOfBirth),
//       occupation: parseOccupation(object.occupation),
//       ssn: parseSsn(object.ssn)
//     };

//     return newPatient;
//   }

//   throw new Error('Incorrect data: some fields are missing');
// };

export const NewPatientSchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().date(),
  occupation: z.string(),
  ssn: z.string()
});

export const toNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

export default toNewPatient;