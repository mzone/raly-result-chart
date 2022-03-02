const RaceBib = ({className, no}) => {
    return (
        <div className="race-bib">
            <div className="race-bib__class-name">{className}</div>
            <div className="race-bib__no">{no}</div>
        </div>
    )
}

export default RaceBib;