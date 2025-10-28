import express from 'express';
import { Response, Request, NextFunction } from 'express'
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { NewPatientSchema } from '../utils';
import z from 'zod';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});

router.use(errorMiddleware)

export default router;