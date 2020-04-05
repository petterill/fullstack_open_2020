import React from 'react';


  const Header = ({ name }) => {
    return (
    <div>
      <h2>{name}</h2>
    </div>
    )
  }

  const Content = ({ parts }) => {
    return (
    <div>
        {parts.map((part) =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
          )}
    </div>
    )
  }

  const Part = ({ part, exercises }) => {
    return (
      <div>
        <p>
          {part} {exercises}
        </p>
      </div>
      )
  }

  const Total = ({ parts }) => {
   const total = parts.reduce((s, p) => s + p.exercises, 0)

   return (
     <div>
       <p><b>Total of {total} exercises</b></p>
     </div>
    )
  }
  

const Course = ({ course }) => {
  return (
    <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
    </div>
  )
}


export default Course;
