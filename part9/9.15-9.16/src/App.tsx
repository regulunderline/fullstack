import React from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => <h1>{name}</h1>

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3> 
          <p><i>{part.description}</i></p>
        </div>
      )
    case "group":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3> 
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>submit to {part.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p><i>{part.description}</i></p>
          <p>required skills: {part.requirements.map((skill, index: number) => <React.Fragment key={index}>{skill} </React.Fragment>)}</p>
        </div>
      )
    default:
      <h3>Unknown type of course part</h3>
  }
}

const Content = ({ parts }: { parts: CoursePart[] }) => 
  <div>
    {parts.map((part, index: number) => <Part part={part} key={index} />)}
  </div>

const Total = ({ total }: { total: number }) => <p>Number of exercises {total}</p>

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;