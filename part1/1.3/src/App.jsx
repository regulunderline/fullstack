const Part = (props) => {
  return (
    <div>
      <p>{props.p} {props.e}</p>
    </div>
  )
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}  
const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} e={props.e1}/>
      <Part p={props.p2} e={props.e2}/>
      <Part p={props.p3} e={props.e3}/>
    </div>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content p1={part1.name} p2={part2.name} p3={part3.name} e1={part1.exercises} e2={part2.exercises} e3={part3.exercises}/>
      <Total total={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App