import './JournalItem.css';

function Button({ title, text, date }) {
    return (
        <>
            <h2 className="journal-item__header">{title}</h2>
            <div className="journal-item__body">
                <div className="journal-item__date">
                    {date instanceof Date
                        ? date.toLocaleString('ru-RU', {
                              year: '2-digit',
                              month: 'numeric',
                              day: 'numeric',
                          })
                        : 'today'}
                </div>
                <div className="journal-item__text">{text}</div>
            </div>
        </>
    );
}

export default Button;
