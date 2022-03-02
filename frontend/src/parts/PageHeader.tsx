import {useRecoilValue} from "recoil";
import Competition from "../states/competition";

export default function PageHeader({global_title=null, page_title=null, children=null}) {
    return (
        <div className="page-header-wrap">
            <div className="page-header">
                <div className="page-header__left">
                    {children ? children.left : null}
                </div>
                <div className="page-header__center">
                    <h1 className="page-header__center__global-title">
                        {global_title ? global_title : null}
                    </h1>
                    <h2 className="page-header__center__page-title">
                        {page_title ? page_title : null}
                    </h2>
                </div>
                <div className="page-header__right">
                    {children ? children.right : null}
                </div>

                <div className="page-header__checker-pattern">
                    <img src="/checker-pattern.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
