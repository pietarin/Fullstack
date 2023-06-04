import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
      <h2>Statistics</h2>
      <p>
        Good {good}
      </p>
      <p>
        Neutral {neutral}
      </p>
      <p>
        Bad {bad}
      </p>
      <p>
        All {total}
      </p>
      <p>
        Average {average}
      </p>
      <p>
        Positive {positive}
      </p>
    </div>
  )
}

export default App