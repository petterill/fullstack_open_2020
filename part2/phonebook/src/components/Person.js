import React from 'react'

const Person = ({ person, drop} ) => {
  return (
    <div>
    	{person.name} {person.number}
    	<button onClick={() => drop(person.id)}>delete</button>

    </div>
    )
}

export default Person
