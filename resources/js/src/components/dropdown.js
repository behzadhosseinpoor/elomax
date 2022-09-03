import {Fragment} from "react"
import {Menu, Transition} from "@headlessui/react";
import {BsArrowDownShort} from "react-icons/bs";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ")
}

export default function Dropdown({selected, items, onChange}) {
    return (
        <Menu as="div" className="relative inline-block text-left cursor-pointer">
            <div>
                <Menu.Button
                    className="inline-flex w-full justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-none">
                    {selected}
                    <BsArrowDownShort className="mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 mt-2 w-20 origin-top-right rounded-md bg-white focus:outline-none">
                    <div className="py-1">
                        {items.map((item, index) => {
                            return (
                                <Menu.Item key={index} onClick={() => onChange(item)}>
                                    {({active}) => (
                                        <span className={classNames(
                                            active ? "bg-gray-50" : "",
                                            "block px-4 py-2 text-sm"
                                        )}>
                                        {item}
                                    </span>
                                    )}
                                </Menu.Item>
                            );
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}