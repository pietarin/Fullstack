import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <>
    <td>{props.text}</td><td>{props.value}</td>
  </>
)

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <tr><StatisticLine text="Good" value={props.good} /></tr>
            <tr><StatisticLine text="Neutral" value={props.neutral} /></tr>
            <tr><StatisticLine text="Bad" value={props.bad} /></tr>
            <tr><StatisticLine text="All" value={props.total} /></tr>
            <tr><StatisticLine text="Average" value={props.average} /></tr>
            <tr><StatisticLine text="Positive" value={props.positive} /></tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    const updatedTotal = (updatedGood + neutral + bad)
    setAverage((updatedGood - bad) / updatedTotal)
    setPositive(updatedGood / updatedTotal)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral + good + bad)
    const updatedTotal = (updatedNeutral + good + bad)
    setAverage((good - bad) / updatedTotal)
    setPositive(good / updatedTotal)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(updatedBad + neutral + good)
    const updatedTotal = (updatedBad + neutral + good)
    setAverage((good - updatedBad) / updatedTotal)
    setPositive(good / updatedTotal)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="Good" />
      <Button handleClick={() => handleNeutralClick()} text="Neutral" />
      <Button handleClick={() => handleBadClick()} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App