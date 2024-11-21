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

const StatisticLine = (props) => {
  if (props.text == "positive"){
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{props.value} %</td>
      </tr>
    )
  }
  return(
    <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
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
      <table>
        <tbody>
          <StatisticLine text="good" value={Feedback.good}/>
          <StatisticLine text="neutral" value={Feedback.neutral}/>
          <StatisticLine text="bad" value={Feedback.bad}/>
          <StatisticLine text="all" value={Feedback.total}/>
          <StatisticLine text="average" value={Feedback.score/Feedback.total}/>
          <StatisticLine text="positive" value={(Feedback.good/Feedback.total)*100}/>
        </tbody>
      </table>
    )
}

export default App
