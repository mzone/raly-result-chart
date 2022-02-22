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
            <div>
                <div>{item.no}</div>
                <div>{item.className}</div>
            </div>

            <div>{item.drName}</div>
            <div>{item.coDrName}</div>
            <div>{item.carName}</div>
            <div>{item.enginType}</div>
            <div>{item.group}</div>
            <div>{item.teamName}</div>
        </li>
    )
}

export default EntrantList;