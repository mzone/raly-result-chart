import RaceBib from "./RaceBib";

const EntrantList = ({items}) => {
    const itemObjs = !Array.isArray(items) ? (<li>EMPTY</li>) : items.map((item) => EntrantLIstItem(item));
    return (
        <ul className="entrant-list">
            {itemObjs}
        </ul>
    )
}
const EntrantLIstItem = (item) => {
    return (
        <li key={item.no} className="entrant-list-item">
            <div className="entrant-list-item__race-bib">
                <RaceBib className={item.className} no={item.no}/>
            </div>
            <div className="entrant-list-item-body">
                <div className="entrant-list-item-body__team-name">{item.teamName}</div>
                <div className="entrant-list-item-body__car-name">{item.carName}</div>
                <div className="entrant-list-item-body__members">
                    <dl>
                        <dt>Dr.</dt>
                        <dd>{item.drName}</dd>
                    </dl>
                    <dl>
                        <dt>Co-Dr.</dt>
                        <dd>{item.coDrName}</dd>
                    </dl>
                </div>

                <div className="entrant-list-item-body__car-info">
                    <div className="entrant-list-item-body__car-info__car-model">{item.carModel}</div>
                    <div className="entrant-list-item-body__car-info__group">{item.group}</div>
                </div>
            </div>
        </li>
    )
}

export default EntrantList;