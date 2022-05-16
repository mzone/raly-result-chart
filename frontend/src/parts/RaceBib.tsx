import {useRecoilValueLoadable} from "recoil";
import ClassColors from "../states/ClassColors";


const isLightColor = (hexColor) => {
    hexColor = hexColor.replace('#', '');
    const brightness =
        (parseInt(hexColor.substr(0, 2), 16) * 0.299) + // Red
        (parseInt(hexColor.substr(2, 2), 16) * 0.587) + // Green
        (parseInt(hexColor.substr(4, 2), 16) * 0.114)   // Blue

    return brightness >= 140;
}

const RaceBib = ({className, no}) => {
    const ClassColorsLoadable = useRecoilValueLoadable(ClassColors);

    let style = {};

    if (ClassColorsLoadable.state === "hasValue") {
        const bgColor = ClassColorsLoadable.contents.find((item) => item.class_name === className);

        if (bgColor) {
            style['backgroundColor'] = bgColor.color;
            style['color'] = isLightColor(bgColor.color) ? "#000000" : "#FFFFFF";
        }
    }

    return (
        <div className="race-bib">
            <div className="race-bib__class-name" style={style}>{className}</div>
            <div className="race-bib__no">{no}</div>
        </div>
    )
}

export default RaceBib;