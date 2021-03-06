import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import {useRecoilRefresher_UNSTABLE, useRecoilValue, useRecoilValueLoadable} from "recoil";
import {NextPage} from 'next'
import Entrants from "../states/entrants";
import SpecialStages from "../states/specialStages";
import {useEffect, useState} from "react";
import SSTimeList from "../parts/SSTimeList";
import Competition from "../states/competition";
import axios from "../utils/axios";
import ToggleSwitch from "../parts/ToggleSwitch";
import BtnPageBack from "../parts/BtnPageBack";
import SelectFilter from "../parts/SelectFilter";
import PageBodyHeader from "../parts/PageBodyHeader";
import SSList from "../parts/SSList";
import PageBodySideNavigation from "../parts/PageBodySideNavigation";
import {useRouter} from "next/router";

// @ts-ignore
const Times: NextPage = () => {

    const { cname, ss_no } = useRouter().query;
    const ssNo = ss_no;

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
            const res = await axios.get(`/api/results?cname=${cname}&ssNo=${ssNo}`);
            const {sections, overalls} = res.data;
            setResults(sections);
            setOverallResults(overalls);

            setSectionTargetTime(sections[0].sec);
            setOverallTargetTime(overalls[0].sec);
        } catch (e) {

            // TODO ???????????????????????????
        }
    }

    useEffect(() => {
        getSSData(ssNo);
    }, [ssNo]);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);
    const specialStagesLoadable = useRecoilValueLoadable(SpecialStages);
    const [SSList, setSSList] = useState<Array<any>>([]);

    interface SSDataProvider {
        no: Number,
        name: string,
    }

    const [SSData, setSSData] = useState<SSDataProvider>();
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
            // @ts-ignore
            // TODO check!!!
            setSSData(items.find((ss) => ss.no === ssNo * 1));
        } catch (e) {
            // TODO ????????????????????????
        }

        return () => {
            setSSList([]);
            setSSData({
                no: 0,
                name: ''
            });
        }
    }, [ssNo, specialStagesLoadable]);

    const toggleResultPage = (division) => {
        setResultDivision(division);
    }

    let clickRefreshWorking = false;
    const clickRefresh = async () => {
        if(clickRefreshWorking) {
            return;
        }
        try {
            clickRefreshWorking = true;
            const res = await axios.get(`/api/results/make-files.php?key=1&cname=${cname}&ss=${ssNo}`);
            console.log(res);// TODO DELETE
            clickRefreshWorking = false;
            getSSData(ssNo);

        } catch (e) {

            // TODO ???????????????????????????
        }
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

    const pageTitle = `SS${SSData?.no} ${SSData?.name}`;

    return (
        <>
            <PageHeader global_title={globalTitle} page_title={pageTitle}>
                {
                    {
                        'left': (
                            <BtnPageBack href="/"/>
                        ),
                        'right': (
                            <a onClick={clickRefresh}><i className="fa-solid fa-rotate-right"></i> ??????</a>
                        ),
                    }
                }
            </PageHeader>
            <PageBody page_name="times" max_width={`1400px`}>
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
                            <h4 className="result-list-item__title">SECTION</h4>
                            <SSTimeList items={sectionList} targetTime={sectionTargetTime}
                                        click_item_function={(item) => {
                                            setSectionTargetTime(item.sec);
                                        }}/>
                        </li>
                        <li className="result-list-item result-list-item--over-all">
                            <h4 className="result-list-item__title">OVER ALL</h4>
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

export default Times;
