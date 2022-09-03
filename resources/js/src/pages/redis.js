import React, {useEffect} from "react";
import {useSettings} from "../contexts/settings";

const Redis = () => {
    const {actions} = useSettings();

    useEffect(() => {
        actions.setActiveRoute({
            activeRoute: "redis"
        })
    }, []);

    return (
        <div>
            Redis
        </div>
    );
};

export default Redis;
