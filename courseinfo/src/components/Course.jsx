const Header = ({ course }) =>
  <h1>{course}</h1>

const Part = ({ part }) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Total = ({ parts }) => (
  <p>
    <strong>Total of exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)} </strong>
  </p>
)

export default Course