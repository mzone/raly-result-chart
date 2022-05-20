import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import Competition from "../states/competition";
import Entrants from "../states/entrants";
import SpecialStages from "../states/specialStages";
import {useEffect} from "react";
import axios from "../utils/axios";

export default function PageBody({children = null, page_name = null, max_width = null}) {

    const { cname } = useRouter().query;

    const [competition, setCompetition] = useRecoilState(Competition);
    const [entrants, setEntrants] = useRecoilState(Entrants);
    const [specialStages, setSpecialStages] = useRecoilState(SpecialStages);

    useEffect(() => {
        if(typeof cname !== 'undefined' ) {
            // @ts-ignore
            // TODO check!!!
            setCompetition(cname);

            (async () => {
                const specialStagesRes = await axios.get(`/api/specialStages/?cname=${cname}`);
                setSpecialStages(specialStagesRes.data);

                const entrantsRes = await axios.get(`/api/entrants/?cname=${cname}`);
                setEntrants(entrantsRes.data.entrants);
            })();
        }
    }, [cname]);

    const isTwoColumns = children.hasOwnProperty('side');

    //クラス名設定
    let classNameList = ["page-body"];
    if (page_name) classNameList.push(`page-body--${page_name}`);
    if (isTwoColumns) classNameList.push(`page-body--two-columns`);
    const className = classNameList.join(" ");

    //スタイル設定
    const style = {};
    if (max_width) style['maxWidth'] = `${max_width}`;

    //カラムコンテンツ設定
    const bodyContent = isTwoColumns ?
        (
            <>
            <div className="page-body__inner__side">{children.side}</div>
            <div className="page-body__inner__main">{children.main}</div>
            </>
        ) :
        children;

    return (
        <div className={className}>
            <div className="page-body__inner" style={style}>
                {bodyContent}
            </div>
        </div>
    )
}
