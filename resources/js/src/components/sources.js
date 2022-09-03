import React from "react";
import {BsHddStack} from "react-icons/bs";

const Sources = ({sources, activeSource, onChange}) => {
    return (
        <>
            {sources.map((source, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => onChange(source)}
                        className={`flex justify-center items-center rounded-md border border-gray-200 cursor-pointer py-1 px-3 ml-2 hover:bg-white hover:text-indigo-600 duration-300 transition-colors shadow-md ${activeSource === source ? 'bg-white text-indigo-600' : 'bg-gray-100'}`}>
                        <BsHddStack/>
                        <span className="ml-1 text-sm">{source}</span>
                    </div>
                );
            })}
        </>
    );
};

export default Sources;
