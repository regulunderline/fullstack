const Course = ({course}) => {
    return(
        <div>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
            </ul>
        </div>
    )
}

export default Course