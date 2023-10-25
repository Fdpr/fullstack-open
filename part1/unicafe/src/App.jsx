import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick = {handleClick}>{text}</button>
const Display = ({category, number}) => <p>{category}: {number}</p>
const Statistics = ({good, neutral, bad}) => {
  const average = (good - bad) / (good + neutral + bad)
  const positive = ((good) / (good + neutral + bad)) * 100

  return <>
    <Display category="average" number={average}></Display>
    <Display category="positive" number={positive + " %"}></Display>
  </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <h1>statistics</h1>
      <Display category="good" number={good}></Display>
      <Display category="neutral" number={neutral}></Display>
      <Display category="bad" number={bad}></Display>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App