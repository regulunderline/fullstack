const Course = ({course}) => {
    
    return(  
        <div>
            <h2>{course.name}</h2>
            <ul>
                {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
            </ul>
            <h3>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>
        </div>
    )
}

export default Course