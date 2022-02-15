const SSList = ({items}) => {
    const days = items.map((day, index) => {
        const SSLIstItems = day.map((SS) => SSLIstItem(SS.no, SS.name, SS.dist))
        return (
            <li key={index}>
                Day {index + 1}
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
            <div>SS {no}</div>
            <div>Name {name}</div>
            <div>Dist {dist}</div>
        </li>
    )
}

export default SSList;