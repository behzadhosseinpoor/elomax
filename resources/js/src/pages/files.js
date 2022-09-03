import React, {useEffect} from "react";
import {useSettings} from "../contexts/settings";

const Files = () => {
    const {actions} = useSettings();

    useEffect(() => {
        actions.setActiveRoute({
            activeRoute: "files"
        })
    }, []);

    return (
        <div>
            Files
        </div>
    );
};

export default Files;
