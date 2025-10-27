interface Values {
  height: number;
  weight: number;
}

const toNumbers = (height: unknown, weight: unknown): Values => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / height / height * 10000;
  switch(true) {
    case bmi<18.5:
      return('Underweight');
    case bmi<24.9:
      return('Normal range');
    case bmi<29.9:
      return('Overwight');
    default:
      return('Obese');
  }
};

const bmiCalculator = (givenHeight: unknown, givenWeight: unknown): { code: 200 | 400, message: string } => {
  try {
    const { height, weight } = toNumbers(givenHeight, givenWeight);
    const message: string = calculateBmi(height, weight);
    return { code: 200, message };
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return { code: 400, message: errorMessage };
  }
};

if (require.main === module) {
  const args = process.argv;
  if (args.length < 4) {
    console.log('Not enough arguments');
  } else {
    if (args.length > 4) {
      console.log('Too many arguments');
    } else {
      const { message } = bmiCalculator(args[2], args[3]);
      console.log(message);
    }
  }
}

export default bmiCalculator;