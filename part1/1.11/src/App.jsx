import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
    <tr><td>{text} {value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad>0){
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good+neutral+bad}/>
          <StatisticLine text="average" value={(good-bad)/(good+bad+neutral)}/>
          <StatisticLine text="positive" value={[100*good/(good+neutral+bad), '%']}/>
        </tbody>
      </table>
      )
  }
  else {
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = (good, neutral, bad) => {
    setGood(good)
    setBad(bad)
    setNeutral(neutral)  
}

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => Button(good+1, neutral, bad)}>good</button>
      <button onClick={() => Button(good, neutral+1, bad)}>neutral</button>
      <button onClick={() => Button(good, neutral, bad+1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App