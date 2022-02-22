import PageHeader from "../parts/PageHeader";
import Link from 'next/link'
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {useRecoilState} from "recoil";
import SpecialStages from "../states/specialStages";

const index = () => {

    const [specialStages] = useRecoilState(SpecialStages);

    return (
        <>
            <PageHeader>
                {{
                    left: (
                        <Link href="/">
                            <a>
                                <i className="fa-solid fa-arrow-left"/> aa
                            </a>
                        </Link>
                    ),
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