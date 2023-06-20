const Persons = (props) => {

    const handleClick = id => {
        props.deletePerson(id)
    }

    return (
        <div>
            <ul>
                {props.personsToShow.map(person =>
                    <li key={person.name}>{person.name} {person.number} <button onClick={() => handleClick(person.id)}>Delete</button></li>
                )}
            </ul>
        </div>
    )
}

export default Persons