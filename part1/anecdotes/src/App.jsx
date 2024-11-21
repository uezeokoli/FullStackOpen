import { useState } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState({votes: 0, index: 0})

  const handleClickAnecdote = () => {
    let random_index = Math.floor(Math.random()*10)%anecdotes.length
    setSelected(random_index)
  }

  const handleClickVote = () => {
    let new_votes = []
    for (let i = 0; i < anecdotes.length; i++){
      let val = (i == selected? votes[i] + 1: votes[i])
      if (val > mostVotes.votes){
        setMostVotes({votes: val, index: i})
      }
      new_votes.push(val)
    }
    setVotes(new_votes)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <Votes votes={votes[selected]}/>
      <Button onClick={handleClickVote} text="vote"/>
      <Button onClick={handleClickAnecdote} text="next anecdote"/>
      <Header text="Anecdote with most votes"/>
      {(mostVotes.votes == 0 ? "No votes yet": anecdotes[mostVotes.index])}
      {
        mostVotes.votes > 0 && (<Votes votes={mostVotes.votes}/>  )
      }
    </div>
  )
}

const Button = (props) =>{
  return(
      <button onClick={props.onClick}>{props.text}</button>
  )
}

const Votes = (props) => {
  return(
    <div>
      has {props.votes} {(props.votes == 1 ? "vote": "votes")}
    </div>
  )
}

const Header = (props) => <h1>{props.text}</h1>
export default App
