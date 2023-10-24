const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

const Content = (props) => {
  return (
    <div>
      <Part name = {props.name[0]} exercises = {props.exercises[0]}/>
      <Part name = {props.name[1]} exercises = {props.exercises[1]}/>
      <Part name = {props.name[2]} exercises = {props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => (
  <p>Number of exercises: {props.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content name={[part1.name, part2.name, part3.name]} 
      exercises={[part1.exercises, part2.exercises, part3.exercises]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App