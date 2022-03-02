import RaceBib from "./RaceBib";

const SSTimeList = ({items}) => {
    const SSTimeListItems = !Array.isArray(items) ? (
        <li>EMPTY</li>) : items.map((item) => SSTimeListItem(item))
    return (
        <ul className="ss-time-list">
            {SSTimeListItems}
        </ul>
    )
}
const SSTimeListItem = (item) => {
    return (
        <li className="ss-time-list-item" key={item}>
            <div className="ss-time-list-item__pos">
                <div className="pos">1</div>
                <div className="class-pos">1</div>
            </div>
            <div className="ss-time-list-item__body">
                <div className="ss-time-list-item__body__race-bib-wrap">
                    <RaceBib no="1" className="JN-1"/>
                </div>
                <div className="ss-time-list-item__body__names">
                    <div className="dr">今西正和</div>
                    <div className="co-dr">小西健也</div>
                </div>
                <div className="ss-time-list-item__body__times">
                    <div className="time">99:59:59.999</div>
                    <div className="diff">99:59:59.999</div>
                </div>
            </div>
        </li>
    )
}

export default SSTimeList;