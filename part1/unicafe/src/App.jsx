import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ category, number }) => <p>{category}: {number}</p>
const Statistics = ({ good, neutral, bad }) => {
  const average = (good - bad) / (good + neutral + bad)
  const positive = ((good) / (good + neutral + bad)) * 100
  if (good + neutral + bad > 0)
    return <>
      <StatisticLine category="good" number={good}></StatisticLine>
      <StatisticLine category="neutral" number={neutral}></StatisticLine>
      <StatisticLine category="bad" number={bad}></StatisticLine>
      <StatisticLine category="average" number={average}></StatisticLine>
      <StatisticLine category="positive" number={positive + " %"}></StatisticLine>
    </>
  else
    return <p>No feedback given</p>
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
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App