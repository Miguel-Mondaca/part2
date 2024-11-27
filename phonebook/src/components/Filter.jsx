const Filter = ({ value, onChange }) => {
    return (
        <div>
            Filter names: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Filter