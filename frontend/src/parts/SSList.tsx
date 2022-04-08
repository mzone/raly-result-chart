import Link from 'next/link';

const SSList = ({items}) => {

    const days = !Array.isArray(items) ? (<li>EMPTY</li>) : items.map((day, index) => {

        const SSLIstItems = !Array.isArray(day) ? (
            <li>EMPTY</li>) : day.map((SS) => SSLIstItem(SS.no, SS.name, SS.dist))
        return (
            <li className="ss-list-day-item" key={index}>
                <div className="ss-list-day-item__day-label">Day {index + 1}</div>
                <ul>
                    {SSLIstItems}
                </ul>
            </li>
        )
    });
    return (
        <ul className="ss-list">
            {days}
        </ul>
    )
}
const SSLIstItem = (no, name, dist) => {
    return (
        <li key={no}>
            <Link href={"/Times/" + no}>
                <a className="ss-list-item">
                    <div className="ss-list-item__no">SS {no}</div>
                    <div className="ss-list-item__name">{name}</div>
                    <div className="ss-list-item__dist text-sub">{dist}<span
                        className="ss-list-item__dist__unit">km</span>
                    </div>
                    <div className="ss-list-item__icon">
                        <i className="fas fa-chevron-right"/>
                    </div>
                </a>
            </Link>
        </li>
    )
}

export default SSList;