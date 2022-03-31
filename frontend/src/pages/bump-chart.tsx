import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import Competition from "../states/competition";
import dynamic from "next/dynamic";
import Entrants from "../states/entrants";
import {useEffect, useState} from "react";
import SpecialStages from "../states/specialStages";
import axios from "../utils/axios";


const bumpChart = () => {

    const ssList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const globalTitle = useRecoilValue(Competition);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);
    const specialStagesLoadable = useRecoilValueLoadable(SpecialStages);
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

    const data = entrants.map((item, key) => {
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

    // const data = [
    //     {
    //         id: "奴田原",
    //         data: [
    //             {
    //                 x: 1,
    //                 y: 7
    //             },
    //             {
    //                 x: 2,
    //                 y: 11
    //             },
    //             {
    //                 x: 3,
    //                 y: 2
    //             },
    //         ]
    //     },
    //     {
    //         id: "2",
    //         data: [
    //             {
    //                 x: 1,
    //                 y: 6
    //             },
    //             {
    //                 x: 2,
    //                 y: 9
    //             },
    //             {
    //                 x: 3,
    //                 y: 7
    //             },
    //         ]
    //     },
    //
    //     {
    //         id: "3",
    //         data: [
    //             {
    //                 x: 1,
    //                 y: 2
    //             },
    //             {
    //                 x: 2,
    //                 y: 3
    //             },
    //
    //             {
    //                 x: 3,
    //                 y: null
    //             },
    //         ]
    //     },
    // ];

    const BumpChart = dynamic(() => import("../parts/BumpChart"), {
        ssr: false
    })

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="BUMP"/>
            <PageBody>
                <div className={'bump-chart-wrap'} style={{height: entrants.length * 30 + 'px', width: ssList.length * 50 + 'px'}}>
                    <BumpChart data={data}/>
                </div>
            </PageBody>
        </>
    )
};

export default bumpChart;
