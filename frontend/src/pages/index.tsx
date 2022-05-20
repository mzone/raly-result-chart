import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {NextPage} from "next";
import SpecialStages from "../states/specialStages";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import Competition from "../states/competition";

const Index: NextPage = () => {
    const globalTitle = useRecoilValue(Competition);
    const specialStages = useRecoilValueLoadable(SpecialStages);
    return (
        <>
            <PageHeader global_title={globalTitle} page_title="TIME"/>

            <PageBody max_width={`576px`}>
                <SSList items={specialStages.contents}/>
            </PageBody>
        </>
    )
};

export default Index;