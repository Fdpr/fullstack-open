const Course = ({course}) => {
    console.log(course.parts.map(part => part.exercises))
    return <div>
        <h1>{course.name}</h1>
        {course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        <p>{course.parts.map(part => part.exercises).reduce((acc, val) => acc + val)}</p>
    </div>
}

export default Course