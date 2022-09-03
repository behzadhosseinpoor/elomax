import React, {useEffect, useState} from "react";
import axios from "axios";
import {get} from "../utilities/request";
import {ResponseHandler} from "../utilities/request/helper";
import StaticDataTable from "./static-data-table";

const Cache = ({source}) => {
    const [list, setList] = useState([]);
    const [listLoading, setListLoading] = useState(false);
    const onSuccessList = (data) => {
        setList(data);
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken;
        const src = cancelToken.source();

        (async () => {
            try {
                setList([]);
                setListLoading(true);

                const {data} = await get(`/api/caches?store=${source}`, {
                    cancelToken: src.token,
                });

                ResponseHandler(data, onSuccessList);
            } catch (err) {
                if (!err.response?.data) return;

                ResponseHandler(err.response.data);
            } finally {
                setListLoading(false);
            }
        })();

        return () => {
            src.cancel();
        };
    }, [source]);

    return (
        <StaticDataTable data={list} columns={[
            {
                accessorKey: "key",
                header: "Key",
                footer: "Key",
            }
        ]}/>
    );
};

export default Cache;
