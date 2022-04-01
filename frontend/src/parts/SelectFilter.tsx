const SelectFilter = ({items, current_key, change_event_function}) => {

    return (
        <div className="select-order-filter">
            <i className="select-order-filter__icon fa-solid fa-list"/>
            <select
                onChange={(e) => {
                change_event_function(e.target.value);
            }}>
                <option value="ALL">ALL</option>
                <optgroup label="----"/>
                {items.map((item) => {
                    return (
                        <option
                            key={item.key}
                        >
                            {item.value}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default SelectFilter;