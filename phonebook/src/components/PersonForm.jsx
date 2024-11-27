const PersonForm = ({ onSubmit, newName, newNumber, handleNewName, handleNewNumber }) => {
    return (
        <form onSubmit={onSubmit}>
            <div> Name: <input value={newName} onChange={handleNewName} /> </div>
            <br />
            <div> Number: <input value={newNumber} onChange={handleNewNumber} /> </div>
            <br />
            <div> <button type="submit">Add</button> </div>
        </form>
    )
}

export default PersonForm