import PageHeader from "../../parts/PageHeader";
import PageBody from "../../parts/PageBody";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import {useRouter} from 'next/router'
import {NextPage} from 'next'
import Entrants from "../../states/entrants";
import SpecialStages from "../../states/specialStages";
import {useEffect, useState} from "react";
import SSTimeList from "../../parts/SSTimeList";
import Competition from "../../states/competition";
import axios from "../../utils/axios";
import ToggleSwitch from "../../parts/ToggleSwitch";
import BtnPageBack from "../../parts/BtnPageBack";
import SelectFilter from "../../parts/SelectFilter";

// @ts-ignore
const ssTimeId: NextPage = ({ssNo}) => {

    const TOGGLE_SWITCH_DIVISION_STAGE = '1';
    const TOGGLE_SWITCH_DIVISION_OVER_ALL = '2';
    const toggleSwitchItems = [
        {
            key: TOGGLE_SWITCH_DIVISION_STAGE,
            value: 'STAGE'
        },
        {
            key: TOGGLE_SWITCH_DIVISION_OVER_ALL,
            value: 'OVER ALL'
        }
    ];

    const [results, setResults] = useState<Array<any>>([]);
    const [resultCallbackCount, setResultCallbackCount] = useState<number>(0);
    const [overallResults, setOverallResults] = useState<Array<any>>([]);
    const [overallResultCallbackCount, setOverallResultCallbackCount] = useState<number>(0);

    const [resultDivision, setResultDivision] = useState<string>(TOGGLE_SWITCH_DIVISION_STAGE);
    const [selectedClassFilter, setSelectedClassFilter] = useState<string>(TOGGLE_SWITCH_DIVISION_STAGE);

    const globalTitle = useRecoilValue(Competition);

    const getSSData = async (ssNo) => {
        if (!ssNo || isNaN(ssNo)) {
            throw Error();
        }
        try {
            const res = await axios.get(`/api/results?cname=rallyTango2021&ssNo=${ssNo}`);
            const {m, ms} = res.data;
            setResults(ms);
            setOverallResults(m);

            setResultCallbackCount(resultCallbackCount + 1);
            setOverallResultCallbackCount(overallResultCallbackCount + 1);
        } catch (e) {

            // TODO アラートダイアログ
        }
    }

    useEffect(() => {
        getSSData(ssNo);
    }, [ssNo]);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);
    const specialStagesLoadable = useRecoilValueLoadable(SpecialStages);
    const [SSList, setSSList] = useState<Array<any>>([]);
    const [SSData, setSSData] = useState<Object>({});
    const [entrants, setEntrants] = useState<Array<any>>([]);
    const [classList, setClassList] = useState<Array<any>>([]);
    const [selectedClass, setSelectedClass] = useState<string>('ALL');

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

        try{
        const items = [...result[0], ...result[1]];
        setSSList(items);
        setSSData(items.find((ss) => ss.no === ssNo * 1));
        } catch (e) {
            // TODO エラーダイアログ
        }

        return () => {
            setSSList([]);
            setSSData({});
        }
    }, [specialStagesLoadable]);

    const toggleResultPage = (division) => {
        setResultDivision(division);
    }


    const resultListStyle = {
        'left': toggleSwitchItems.map((item) => item.key).indexOf(resultDivision) * -100 + '%'
    };

    return (
        <>
            <PageHeader global_title={globalTitle} page_title={`SS${SSData?.no} ${SSData?.name}`}>
                {
                    {
                        'left': (
                            <BtnPageBack href="/"/>
                        )
                    }
                }
            </PageHeader>
            <PageBody page_name="times">

                <div className="sub-header">
                    <div className="toggle-switch-wrap">
                        <ToggleSwitch
                            items={toggleSwitchItems}
                            current_key={resultDivision}
                            toggle_function={toggleResultPage}
                        />
                    </div>
                    <div>
                        <form>
                            <SelectFilter items={classList} current_key={selectedClass} change_event_function={() => {
                            }}/>
                        </form>
                    </div>
                </div>

                <div className="result-list-wrap">
                    <ul className="result-list" style={resultListStyle}>
                        <li className="stage">
                            <SSTimeList items={results.map((result) => {
                                return {...result, entrant: entrants.find((entrant) => entrant.no === result.car_no)}
                            })}/>
                        </li>
                        <li className="over-all">

                            <SSTimeList items={overallResults.map((result) => {
                                return {...result, entrant: entrants.find((entrant) => entrant.no === result.car_no)}
                            })}/>
                        </li>
                    </ul>
                </div>
            </PageBody>
        </>
    );
}

ssTimeId.getInitialProps = ({query}) => {
    const {id} = query;
    return {ssNo: id};
}


export default ssTimeId;