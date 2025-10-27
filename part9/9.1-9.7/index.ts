import express from 'express';
import bmiCalculator from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query.height || !req.query.weight){
    res.status(400);
    res.send('error: malformatted parameters');
  }
  const response = bmiCalculator(req.query.height, req.query.weight);
  res.status(response.code);
  res.send(response.message);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if(!daily_exercises || !target){
    res.status(400);
    res.send({
      error: "parameters missing"
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hours: number[] = daily_exercises.map( (e: any ) => Number(e));
  const targetNumber: number = Number(target);
  if(hours.some((h: number) => isNaN(h)) || isNaN(targetNumber)){
    res.status(400);
    res.send({
      error: "malformatted parameters"
    });
  }

  const result = calculateExercises(hours, targetNumber);

  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});