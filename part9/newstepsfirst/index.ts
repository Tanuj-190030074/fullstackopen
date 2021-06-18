import express from 'express';
import { parseBmiArgs, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());



app.get('/bmi', (req, res) => {
  let args: string[] = [];
  if (req.query.height && typeof req.query.height === 'string') {
    args = args.concat(req.query.height);
  }
  if (req.query.weight && typeof req.query.weight === 'string') {
    args = args.concat(req.query.weight);
  }
  try {
    const { height, weight } = parseBmiArgs(args);
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.post('/calculator', (req, res) => {
  if (req.body && req.body.daily_exercises && req.body.target) {
    if (Array.isArray(req.body.daily_exercises)
      && req.body.daily_exercises.every((item: unknown) => typeof item === "number")
      && typeof req.body.target == 'number') {
      res.json(calculateExercises(req.body.daily_exercises, req.body.target));
    } else {
      res.json({ error: 'malformatted parameters' });
    }
  } else {
    res.json({ error: 'parameters missing' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});