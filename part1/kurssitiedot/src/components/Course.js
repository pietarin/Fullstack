const Course = (props) => {
    return (
      <>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </>
    )
  }
  
  const Header = (props) => {
    return (
      <>
        <h2>{props.course.name}</h2>
      </>
    )
  }
  
  const Content = (props) => {
    return (
      <>
        {props.course.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
        }
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Total = (props) => {
    let totalAmount = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <b>total of {totalAmount} exercises</b>
    )
  }
  
  export default Course