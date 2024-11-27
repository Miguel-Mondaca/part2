const Notification = ({ message }) => {
    if (!message.text) {
        return null
    }

    return (
        <div className={
            message.type === 'added' ? 'added' :
                message.type === 'updated' ? 'updated' :
                    message.type === 'deleted' ? 'deleted' :
                        'error'}>
            {message.text}
        </div>
    )
}

export default Notification
