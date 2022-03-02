const ToggleSwitch = ({items, current_key, toggle_function}) => {

    const btnWidth = Math.floor(100 / items.length);
    const currentItemIndex = items.map((item) => item.key).indexOf(current_key);

    const clickFunc = (key) => {
        if (typeof toggle_function === 'function') {
            toggle_function(key);
        }
    }
    return (
        <div className="toggle-switch bg-global-blur">
            {items.map((item) => {
                const className = "toggle-switch__btn" + ((current_key === item.key) ? " toggle-switch__btn--active" : "");
                return (
                    <a
                        key={item.key}
                        className={className}
                        onClick={() => {
                            clickFunc(item.key)
                        }}
                        style={{'width': btnWidth + '%'}}
                    >
                        {item.value}
                    </a>
                )
            })}
            <div
                className="toggle-switch__current-back"
                style={
                    {
                        'width': btnWidth + '%',
                        'left': currentItemIndex * btnWidth + '%',
                    }
                }
            >
                <div className="toggle-switch__current-back__inner"/>
            </div>
        </div>
    )
}

export default ToggleSwitch;