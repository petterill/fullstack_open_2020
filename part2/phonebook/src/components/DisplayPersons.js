import React from 'react'
import Person from './Person'

const DisplayPersons = ({ persons, drop }) => {
  return (
      <div>
        {persons.map((person) => 
          <Person key={person.id} person={person} drop={drop} /> 
        )}
      </div>
  )
}


export default DisplayPersons
