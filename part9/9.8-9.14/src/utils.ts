import { NewPatient, Gender } from './types';
import z from 'zod';

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