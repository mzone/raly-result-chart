import PageHeader from "../../parts/PageHeader";
import PageBody from "../../parts/PageBody";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
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
import PageBodyHeader from "../../parts/PageBodyHeader";

// @ts-ignore
const SsTimeId: NextPage = ({ssNo}) => {

    //const CNAME = "rallyTango2021";
    const CNAME = "karatsu2022";

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
    const [overallResults, setOverallResults] = useState<Array<any>>([]);
    const [resultDivision, setResultDivision] = useState<string>(TOGGLE_SWITCH_DIVISION_STAGE);
    const [sectionTargetTime, setSectionTargetTime] = useState<Number>(0);
    const [overallTargetTime, setOverallTargetTime] = useState<Number>(0);

    const globalTitle = useRecoilValue(Competition);

    const getSSData = async (ssNo) => {
        if (!ssNo || isNaN(ssNo)) {
            throw Error();
        }
        try {
            const res = await axios.get(`/api/results?cname=${CNAME}&ssNo=${ssNo}`);
            const {sections, overalls} = res.data;
            setResults(sections);
            setOverallResults(overalls);

            setSectionTargetTime(sections[0].sec);
            setOverallTargetTime(overalls[0].sec);
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

        try {
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
    }, [ssNo, specialStagesLoadable]);

    const toggleResultPage = (division) => {
        setResultDivision(division);
    }

    const sectionList = results.map((result) => {
        return {...result, entrant: entrants.find((entrant) => entrant.no * 1 === result.car_no * 1)}
    }).filter((item) => selectedClass === 'ALL' ? true : item.entrant.className === selectedClass);

    const overallList = overallResults.map((result) => {
        return {...result, entrant: entrants.find((entrant) => entrant.no * 1 === result.car_no * 1)}
    }).filter((item) => selectedClass === 'ALL' ? true : item.entrant.className === selectedClass);


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
                <PageBodyHeader>
                    <div className="toggle-switch-wrap">
                        <ToggleSwitch
                            items={toggleSwitchItems}
                            current_key={resultDivision}
                            toggle_function={toggleResultPage}
                        />
                    </div>
                    <div>
                        <form>
                            <SelectFilter items={classList} current_key={selectedClass}
                                          change_event_function={(selected) => {
                                              setSelectedClass(selected);
                                          }}/>
                        </form>
                    </div>
                </PageBodyHeader>

                <div className="result-list-wrap">
                    <ul className="result-list" style={resultListStyle}>
                        <li className="result-list-item result-list-item--stage">
                            <SSTimeList items={sectionList} targetTime={sectionTargetTime}
                                        click_item_function={(item) => {
                                            setSectionTargetTime(item.sec);
                                        }}/>
                        </li>
                        <li className="result-list-item result-list-item--over-all">
                            <SSTimeList items={overallList} targetTime={overallTargetTime}
                                        click_item_function={(item) => {
                                            setOverallTargetTime(item.sec);
                                        }}/>
                        </li>
                    </ul>
                </div>
            </PageBody>
        </>
    );
}

SsTimeId.getInitialProps = ({query}) => {
    const {id} = query;
    return {ssNo: id};
}


export default SsTimeId;
