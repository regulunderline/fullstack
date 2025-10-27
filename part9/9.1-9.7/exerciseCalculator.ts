interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: 1 | 2 | 3,
  ratingDescription: 'you should try better' | 'not too bad but could be better' | 'you\'re doing well',
  target: number,
  average: number
}

const parseArgs = (args: string[]): { hours: number[], target: number } => {
  if (args.length < 4) throw new Error('Not enough arguments');
  args.splice(0,2);
  const target: number = Number(args.shift());
  const hours: number[] = args.map(arg => Number(arg));

  if (!hours.some(arg => isNaN(arg)) &&!isNaN(target)) {
    return { hours, target };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength: number = hours.length;
  const average: number = hours.reduce( (sum, h) => sum + h, 0)/periodLength;
  const trainingDays: number = hours.filter(h => h !== 0).length;
  const success: boolean = average>=target;
  const rating: 1 | 2 | 3 = success ? 3 : average/target>.5 ? 2 : 1;
  const ratingDescription: 'you should try better' | 'not too bad but could be better' | 'you\'re doing well' = success 
    ? 'you\'re doing well'
    : average/target>.5 
      ? 'not too bad but could be better'
      : 'you should try better';
  return { 
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { hours, target } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}