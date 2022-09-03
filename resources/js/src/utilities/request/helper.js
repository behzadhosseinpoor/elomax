import {toast} from "react-toastify";

export const ResponseHandler = (res, callbackFunction) => {
    const {status, result, message} = res;

    if (status === 200) {
        if (message) {
            toast.success(message);
        }
        callbackFunction && callbackFunction(result);
        return;
    }

    if (message) {
        toast.error(message);
    }
};
