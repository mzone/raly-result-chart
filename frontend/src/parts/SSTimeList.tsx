import RaceBib from "./RaceBib";

const SSTimeList = ({items}) => {
    const SSTimeListItems = !Array.isArray(items) ? (
        <li>EMPTY</li>) : items.map((item, key) => SSTimeListItem(item, key))
    return (
        <ul className="ss-time-list">
            {SSTimeListItems}
        </ul>
    )
}
const SSTimeListItem = (item, key) => {
    return (
        <li className="ss-time-list-item" key={`${item.car_no}_${key}`}>
            <div className="ss-time-list-item__pos">
                <div className="pos">{item.pos !== 0 ? item.pos : '-'}</div>
                <div className="class-pos">{item.class_pos}</div>
            </div>
            <div className="ss-time-list-item__body">
                <div className="ss-time-list-item__body__race-bib-wrap">
                    <RaceBib no={item.car_no} className={item?.entrant?.className}/>
                </div>
                <div className="ss-time-list-item__body__names">
                    <div className="dr">{item?.entrant?.drName}</div>
                    <div className="co-dr">{item?.entrant?.coDrName}</div>
                </div>
                <div className="ss-time-list-item__body__times">
                    <div className="time">{item.time}</div>
                    <div className="diff">99:59:59.999</div>
                </div>
            </div>
        </li>
    )
}

export default SSTimeList;