import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";
import {useRecoilValueLoadable} from "recoil";
import Entrants from "../states/entrants";


const entrantsPage = () => {

    const entrantsLoadable = useRecoilValueLoadable(Entrants);

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
                <EntrantList items={entrantsLoadable.contents}/>
            </PageBody>
        </>
    )
};

export default entrantsPage;