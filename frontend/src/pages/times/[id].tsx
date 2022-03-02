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
import axios from "axios";
import ToggleSwitch from "../../parts/ToggleSwitch";
import BtnPageBack from "../../parts/BtnPageBack";
import SelectFilter from "../../parts/SelectFilter";

const ssTimeId: NextPage = (res) => {

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

    const router = useRouter();
    const [ssNo, setSsNo] = useState<number>(1);
    const [results, setResults] = useState<Array<any>>([]);
    const [overallResults, setOverallResults] = useState<Array<any>>([]);
    const [resultDivision, setResultDivision] = useState<string>(TOGGLE_SWITCH_DIVISION_STAGE);
    const [selectedClassFilter, setSelectedClassFilter] = useState<string>(TOGGLE_SWITCH_DIVISION_STAGE);

    const globalTitle = useRecoilValue(Competition);
    useEffect(() => {
        if (router.asPath !== router.route) {
            setSsNo(Number(router.query.id));
        }
        const resultsRow = getSSTime(ssNo);
        setResults([...Array(100)].map((_, i) => i));
        setOverallResults([...Array(100)].map((_, i) => i));

    }, [router]);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);
    const specialStages = useRecoilValueLoadable(SpecialStages);
    const [classList, setClassList] = useState<Array<any>>([]);
    const [selectedClass, setSelectedClass] = useState<string>('ALL');

    useEffect(() => {
        if (entrantsLoadable.state !== "hasValue") {
            return;
        }
        const items = typeof entrantsLoadable.contents === 'object' ? entrantsLoadable.contents : [];
        const classList = Array.from(new Set(items.map((item) => item.className)));
        setClassList(classList.map((item) => {
            return {'key': item, 'value': item}
        }));
    }, [entrantsLoadable]);

    const toggleResultPage = (division) => {
        setResultDivision(division);
    }


    const resultListStyle = {
        'left': toggleSwitchItems.map((item) => item.key).indexOf(resultDivision) * -100 + '%'
    };


    useEffect(() => {
        async () => {
            try {
                const res = await axios.get('http://localhost:8888/api/entrants/?cname=rallyTango2021');
                return res.data.entrants;
            } catch (error) {
                throw error;
            }
        }
    }, [entrantsLoadable]);

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="SS1 Tsunotsuki1">
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
                            <SSTimeList items={results}/>
                        </li>
                        <li className="over-all">
                            <SSTimeList items={overallResults}/>
                        </li>
                    </ul>
                </div>
            </PageBody>
        </>
    );
}

const getSSTime = async (id) => {
    try {
        const res = await axios.get('http://localhost:8888/api/entrants/?cname=rallyTango2021');
        return res.data.entrants;
    } catch (error) {
        throw error;
    }
}

export default ssTimeId;
