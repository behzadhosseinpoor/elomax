// noinspection ES6CheckImport

import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Caches from "./pages/caches";
import Redis from "./pages/redis";
import Files from "./pages/files";

const RoutesInstance = () => {
    return (
        <Routes>
            <Route path="" element={<AppLayout/>}>
                <Route path="" element={<Navigate replace to="caches"/>}/>
                <Route path="caches" element={<Caches/>}/>
                <Route path="files" element={<Files/>}/>
                <Route path="redis" element={<Redis/>}/>
                <Route path="*" element={<Navigate replace to=""/>}/>
            </Route>
        </Routes>
    );
};

export default RoutesInstance;

