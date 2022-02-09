import React from "react";
import {Link} from "react-router-dom";

import RHeader from "../components/_r-header";

const LayoutMain = ({children}: { children: any }) => {
    return (
        <div>
            <RHeader/>
            <Link to="/">feature</Link>
            <Link to="/archives">archives</Link>
            <h1>KillerNews!!!</h1>
            <div>{children}</div>
        </div>
    )
}

export default LayoutMain