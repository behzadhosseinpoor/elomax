// noinspection JSUnresolvedVariable

import axios from "axios";

const API = axios.create({
    baseURL: window.Elomax.path,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const get = async (url, config = {}) => await API.get(url, config);

export const post = async (url, body, config = {}) =>
    await API.post(url, body, config);

export const put = async (url, body, config = {}) =>
    await API.put(url, body, config);

export const del = async (url, config = {}) =>
    await API.delete(url, config);

export default API;
