import GlobalNavigation from "../parts/GlobalNavigation";
import {RecoilRoot} from "recoil";
export default function LayoutDefault(page) {
    return (
        <RecoilRoot>
            <div className="wrap">
                <main>{page}</main>
                <GlobalNavigation/>
            </div>
        </RecoilRoot>
    )
}
