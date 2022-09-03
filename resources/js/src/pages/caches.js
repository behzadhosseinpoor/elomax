// noinspection JSUnresolvedVariable,HtmlUnknownTarget

import React, {useEffect, useState} from "react";
import {useSettings} from "../contexts/settings";
import {Link} from "react-router-dom";
import {AppName} from "../constants/global";
import Sources from "../components/sources";
import Cache from "../components/cache";

const Caches = () => {
    const [activeSource, setActiveSource] = useState(window.Elomax.cache);
    const {actions} = useSettings();
    const route = "caches";

    useEffect(() => {
        actions.setActiveRoute({
            activeRoute: route
        })
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center py-3 mb-5">
                <Link to={`/${route}`}>
                    <img src="/vendor/elomax/logo.png" className="hover:opacity-70 transition-opacity duration-300 mr-5"
                         alt={AppName} width={180}/>
                </Link>
                <div className="flex justify-end flex-wrap">
                    <Sources sources={window.Elomax.caches} activeSource={activeSource} onChange={(source) => {
                        setActiveSource(source)
                    }}/>
                </div>
            </div>
            {activeSource && <Cache source={activeSource}/>}
        </div>
    );
};

export default Caches;
