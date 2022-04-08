import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import SpecialStages from "../states/specialStages";
import Competition from "../states/competition";
import {NextPage} from "next";

const Index: NextPage = () => {

    const globalTitle = useRecoilValue(Competition);
    const specialStages = useRecoilValueLoadable(SpecialStages);


    return (
        <>
            <PageHeader global_title={globalTitle} page_title="TIME"/>

            <PageBody>
                <SSList items={specialStages.contents}/>
            </PageBody>
        </>
    )
};

export default Index;