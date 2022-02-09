import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import LayoutWrap from "./layouts/LayoutWrap";
import Featured from "./pages/featured";
import Archives from "./pages/archives";
import Error404 from "./pages/errors/error404";


ReactDOM.render(
    <BrowserRouter>
        <LayoutWrap>
            <Routes>
                <Route path="/" element={<Featured/>}/>
                <Route path="/archives" element={<Archives/>}/>
                <Route path="*" element={<Error404/>}/>
                <Route path="/:id" element={<Error404/>}/>
            </Routes>
        </LayoutWrap>
    </BrowserRouter>
    , document.getElementById('app')
);
