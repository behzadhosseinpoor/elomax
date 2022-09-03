import {createContext, useContext, useState} from "react";

const SettingsContextDefault = {
    activeRoute: ""
};

const SettingsContext = createContext(SettingsContextDefault);

const SettingsProvider = ({children}) => {
    const [activeRoute, setActiveRoute] = useState(SettingsContextDefault);

    return (
        <SettingsContext.Provider
            value={{
                ...activeRoute,
                actions: {
                    setActiveRoute
                },
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);

export default SettingsProvider;
