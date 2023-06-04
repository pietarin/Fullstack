import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="Good" />
      <Button handleClick={() => handleNeutralClick()} text="Neutral" />
      <Button handleClick={() => handleBadClick()} text="Bad" />
      <h2>Statistics</h2>
      <p>
        good {good}
      </p>
      <p>
        neutral {neutral}
      </p>
      <p>
        bad {bad}
      </p>
    </div>
  )
}

export default App