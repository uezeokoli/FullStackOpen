const Course = (props) => {
    const {course} = props
    return(
      <div>
        <Header text={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  const Header = (props) => {
    return(
  
      <h3>{props.text}</h3>
      )
    }
  
  const Content = (props) => {
    const {parts} = props
    return(
      <div>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      </div>
      )
  }
  
  const Total = (props) => {
    const {parts} = props
    let total = parts.reduce((total, curr) => {
      return (Number.isInteger(total) ? total : total.exercises) + curr.exercises
    })
    return(
      <div>
        <b>total of {total} {total == 1 ? "excercise": "exercises"} </b>
      </div>
      )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part} {props.exercises}</p>
      </div>
    )
  }
export default Course