// noinspection JSUnresolvedVariable

import React from "react";
import ReactDOM from "react-dom/client";
import ContextsProvider from "./contexts/provider";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import RoutesInstance from "./routes";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextsProvider>
            <ToastContainer/>
            <BrowserRouter basename={`/${window.Elomax.path ?? ""}`}>
                <RoutesInstance/>
            </BrowserRouter>
        </ContextsProvider>
    </React.StrictMode>
);

