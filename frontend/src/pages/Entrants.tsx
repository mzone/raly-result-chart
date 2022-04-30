import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";
import {useRecoilValue, useRecoilValueLoadable} from "recoil";
import EntrantsState from "../states/entrants";
import Competition from "../states/competition";
import {NextPage} from "next";

const Entrants: NextPage = () => {

    const globalTitle = useRecoilValue(Competition);

    const entrantsLoadable = useRecoilValueLoadable(EntrantsState);

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="ENTRANT"/>

            <PageBody max_width={`576px`}>
                <EntrantList items={entrantsLoadable.contents}/>
            </PageBody>
        </>
    )
};

export default Entrants;