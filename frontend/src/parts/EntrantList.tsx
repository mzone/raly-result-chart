const EntrantList = ({items}) => {
    const itemObjs = items.map((item) => EntrantLIstItem(item));
    return (
        <ul className="ss-list">
            {itemObjs}
        </ul>
    )
}
const EntrantLIstItem = (item) => {
    return (
        <li key={item.no}>
            <div>{item.className}</div>
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