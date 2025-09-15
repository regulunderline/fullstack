import { useState } from 'react'

const Average = ({good, neutral, bad}) => {
  if (good+neutral+bad !== 0){
    return (
      <div>
      <p>average {(good-bad)/(good+neutral+bad)}</p>
      </div>
    )}
  return (
    <div>
      <p>average 0</p>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad>0){
    return(
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good+neutral+bad}</p>
        <Average good={good} neutral={neutral} bad={bad}/>
        <Positive good={good} neutral={neutral} bad={bad}/>
      </div>
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

const Positive = ({good, neutral, bad}) => {
  if (good+neutral+bad !== 0){
    return (
      <div>
      <p>positive {100*good/(good+neutral+bad)} %</p>
      </div>
    )}
  return (
    <div>
      <p>positive 0 %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good+1)}>good</button>
      <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      <button onClick={() => setBad(bad+1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App