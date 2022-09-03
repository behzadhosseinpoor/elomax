import SettingsProvider from "./settings";

const Provider = ({children}) => {
    return (
        <>
            <SettingsProvider>
                {children}
            </SettingsProvider>
        </>
    );
};

export default Provider;
