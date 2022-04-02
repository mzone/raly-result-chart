import RaceBib from "./RaceBib";

const SSTimeList = ({items, targetTime, click_item_function}) => {
    const SSTimeListItems = !Array.isArray(items) ? (
        <li>EMPTY</li>) : items.map((item, key) => SSTimeListItem(item, key, targetTime, click_item_function))
    return (
        <ul className="ss-time-list">
            {SSTimeListItems}
        </ul>
    )
}
const SSTimeListItem = (item, key, targetTime, click_item_function) => {
    const diffFloat = parseFloat((item.sec - targetTime).toFixed(1));
    const diffStyle = diffFloat === 0 ? '' : diffFloat > 0 ? 'diff--plus' : 'diff--minus';
    const diffMin = Math.floor(diffFloat / 60);
    const diffSec = (diffFloat - diffMin * 60).toFixed(1);
    const diffTimeStr = `${diffMin}:${diffSec}`;
    return (
        <li
            className="ss-time-list-item"
            key={`${item.car_no}_${key}`}
            onClick={(e) => {
                click_item_function(item, e);
            }}>
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
                    <div className={`diff ${diffStyle}`}>{diffTimeStr}</div>
                </div>
            </div>
        </li>
    )
}

export default SSTimeList;