import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import Entrants from "../states/entrants";
import Competition from "../states/competition";


const entrantsPage = () => {

    const globalTitle = useRecoilValue(Competition);

    const entrantsLoadable = useRecoilValueLoadable(Entrants);

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="ENTRANT"/>

            <PageBody>
                <EntrantList items={entrantsLoadable.contents}/>
            </PageBody>
        </>
    )
};

export default entrantsPage;