import PageHeader from "../parts/PageHeader";
import Link from 'next/link'
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {useRecoilValue} from "recoil";
import SpecialStages from "../states/specialStages";

const index = () => {

    const specialStages = useRecoilValue(SpecialStages);

    return (
        <>
            <PageHeader>
                {{
                    center: (
                        <>
                            <div>TOYOTA GAZOO Rally Challenge 2017 Rd7 takaoka</div>
                            <div>2017.08.29 - 08.30</div>
                        </>
                    )
                }}
            </PageHeader>

            <PageBody>
                <SSList items={specialStages}/>
            </PageBody>
        </>
    )
};

export default index;