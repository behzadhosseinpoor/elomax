// noinspection ES6CheckImport

import React from "react";
import {Link, Outlet} from "react-router-dom";
import {BsClipboardData, BsFiles, BsGrid} from "react-icons/bs";
import {useSettings} from "../contexts/settings";

const AppLayout = () => {
    const {activeRoute} = useSettings();
    const features = [{
        name: "Caches",
        icon: <BsClipboardData/>,
        path: "caches"
    }, {
        name: "Files",
        icon: <BsFiles/>,
        path: "files"
    }, {
        name: "Redis",
        icon: <BsGrid/>,
        path: "redis"
    }];

    return (
        <div className="flex text-md m-5 text-gray-700 flex-col sm:flex-row">
            <div className="features flex flex-row sm:flex-col flex-wrap">
                {features.map((feature, index) => {
                    return (
                        <Link
                            to={`/${feature.path}`}
                            key={index}
                            className={`flex items-center flex-col justify-center py-3 px-5 rounded-md border border-gray-200 cursor-pointer mb-5 mr-5 hover:bg-white hover:text-indigo-600 duration-300 transition-colors shadow-md ${activeRoute === feature.path ? 'bg-white text-indigo-600' : 'bg-gray-100'}`}>
                            {feature.icon}
                            <span className="mt-2 text-sm">{feature.name}</span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex-1">
                <Outlet/>
            </div>
        </div>
    );
};

export default AppLayout;
