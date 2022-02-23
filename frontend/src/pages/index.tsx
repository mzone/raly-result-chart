import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {useRecoilValueLoadable} from "recoil";
import SpecialStages from "../states/specialStages";

const index = () => {

    const specialStages = useRecoilValueLoadable(SpecialStages);

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
                <SSList items={specialStages.contents}/>
            </PageBody>
        </>
    )
};

export default index;