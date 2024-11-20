import {useState} from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Feedback = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: good + neutral + bad,
    score: good - bad
  }

  const handleClickGood = () => {
    setGood(good + 1)  
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)  
  }

  const handleClickBad = () => {
    setBad(bad + 1)  
  }
  
  return (
    <div>
      <Header text ="give feedback"/>
      <Button text = "good" onClick={handleClickGood}/>
      <Button text = "neutral" onClick={handleClickNeutral}/>
      <Button text = "bad" onClick={handleClickBad}/>
      <Header text ="statistics"/>
      <Statistics Feedback={Feedback}/>
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const Button = (props) => {
  return(
      <button onClick ={props.onClick}>{props.text}</button>
  )
}

const Statistics = (props) => {
  const Feedback = props.Feedback
  if (Feedback.total === 0) {
    return(
      <div>No feedback given</div>
    )
  }
    return(
      <div>
        <div>good {Feedback.good}</div>
        <div>neutral {Feedback.neutral}</div>
        <div>bad {Feedback.bad}</div>
        <div>all {Feedback.total}</div>
        <div>average {Feedback.score/Feedback.total}</div>
        <div>positive {Feedback.good/Feedback.total} %</div>
    </div>
    )
}

export default App
