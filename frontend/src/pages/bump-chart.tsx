import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import Competition from "../states/competition";
import dynamic from "next/dynamic";
import Entrants from "../states/entrants";
import {useEffect, useState} from "react";
import SpecialStages from "../states/specialStages";
import axios from "../utils/axios";
import SelectFilter from "../parts/SelectFilter";
import PageBodyHeader from "../parts/PageBodyHeader";


const bumpChart = () => {

    const globalTitle = useRecoilValue(Competition);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);
    const specialStagesLoadable = useRecoilValueLoadable(SpecialStages);
    const [selectedClass, setSelectedClass] = useState<string>('ALL');
    const [entrants, setEntrants] = useState<Array<any>>([]);
    const [classList, setClassList] = useState<Array<any>>([]);
    const [SSList, setSSList] = useState<Array<any>>([]);
    const [posData, setPosData] = useState<Array<any>>([]);
    const [bumpData, setBumpData] = useState<Array<any>>([]);
    useEffect(() => {
        if (entrantsLoadable.state !== "hasValue") {
            return;
        }
        const items = typeof entrantsLoadable.contents === 'object' ? entrantsLoadable.contents : [];
        const classList = Array.from(new Set(items.map((item) => item.className)));
        setEntrants(items);
        setClassList(classList.map((item) => {
            return {'key': item, 'value': item}
        }));
    }, [entrantsLoadable]);

    useEffect(() => {
        if (specialStagesLoadable.state !== "hasValue") {
            return;
        }
        const result = typeof specialStagesLoadable.contents === 'object' ? specialStagesLoadable.contents : [];

        try {
            const items = [...result[0], ...result[1]];
            setSSList(items);
            getPosData(items.map((ss)=>ss.no));
        } catch (e) {
            // TODO エラーダイアログ
        }

        return () => {
            setSSList([]);
        }
    }, [specialStagesLoadable]);

    const getPosData = async (ssList) => {
        if (!ssList) {
            throw Error();
        }
        try {
            const res = await axios.get(`/api/bumps?cname=rallyTango2021&ssNo=${ssList.join(',')}`);
            setPosData(res.data);


        } catch (e) {

            // TODO アラートダイアログ
        }
    }

    const data = entrants.filter((item) => selectedClass === 'ALL' ? true : item.className === selectedClass).map((item, key) => {
        const poses = posData.filter((ssPos)=>ssPos.car_no === item.no);
        return {
            id: `${item.no} ${item.drName}`,
            data: SSList.map((ss) => {
                const posData = poses.find((p)=>p.ssNo == ss.no);
                return {
                    x: ss.no,
                    y: posData && posData.pos != 0 ? posData.pos * 1 : null,
                }
            })
        }
    });

    const BumpChart = dynamic(() => import("../parts/BumpChart"), {
        ssr: false
    })

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="BUMP"/>
            <PageBody>

                <PageBodyHeader>
                    <div>&nbsp;</div>
                    <div>
                        <form>
                            <SelectFilter items={classList} current_key={selectedClass} change_event_function={(selectClass) => {
                                setSelectedClass(selectClass);
                            }}/>
                        </form>
                    </div>
                </PageBodyHeader>

                <div className={'bump-chart-wrap'} style={{height: entrants.length * 30 + 'px'}}>
                    <BumpChart data={data}/>
                </div>
            </PageBody>
        </>
    )
};

export default bumpChart;
