import PageHeader from "../parts/PageHeader";
import PageBody from "../parts/PageBody";
import {useRecoilValue} from "recoil";
import Competition from "../states/competition";

const bumpChart = () => {

    const globalTitle = useRecoilValue(Competition);

    return (
        <>
            <PageHeader global_title={globalTitle} page_title="BUMP"/>
            <PageBody>
                テスト
            </PageBody>
        </>
    )
};

export default bumpChart;
