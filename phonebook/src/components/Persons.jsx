const Persons = ({ personsToShow, deleteName }) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id} className='person-item'>
          {person.name}: {person.number}{' '}
          <button onClick={() => deleteName(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons