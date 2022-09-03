import React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import Dropdown from "./dropdown";
import {GrCaretNext, GrCaretPrevious, GrDown, GrNext, GrPrevious, GrUp} from "react-icons/gr";

function StaticDataTable({data, columns}) {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState('');
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <input value={globalFilter} onChange={(elem) => setGlobalFilter(elem.target.value)}
                       placeholder="Filter Records"
                       className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-none"/>
                <Dropdown selected={table.getState().pagination.pageSize} items={[10, 20, 30, 40, 50]}
                          onChange={(size) => table.setPageSize(Number(size))}/>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: <GrDown className="inline-block ml-2"/>,
                                                desc: <GrUp className="inline-block ml-2"/>,
                                            }[header.column.getIsSorted()] ?? null}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                    <tfoot className="bg-gray-100">
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}
                                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </tfoot>
                </table>
            </div>
            <div className="flex items-center justify-between flex-wrap mt-4 text-xs text-gray-700">
                <div>
                    {"Showing " + table.getRowModel().rows.length + " of " + data.length}
                </div>
                <div className="flex items-center">
                    <div>
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1}
                        </strong>
                        {' '}of{' '}
                        <strong>
                            {table.getPageCount()}
                        </strong>
                        {' '}
                    </span>
                    </div>
                    <button onClick={() => table.setPageIndex(0)}
                            className="disabled:opacity-30 ml-4 h-8 w-8 rounded shadow-md bg-white transition duration-300"
                            disabled={!table.getCanPreviousPage()}>
                        <GrCaretPrevious className="mx-auto"/>
                    </button>
                    <button onClick={() => table.previousPage()}
                            className="disabled:opacity-30 ml-4 h-8 w-8 rounded shadow-md bg-white transition duration-300"
                            disabled={!table.getCanPreviousPage()}>
                        <GrPrevious className="mx-auto"/>
                    </button>
                    <button onClick={() => table.nextPage()}
                            className="disabled:opacity-30 ml-4 h-8 w-8 rounded shadow-md bg-white transition duration-300"
                            disabled={!table.getCanNextPage()}>
                        <GrNext className="mx-auto"/>
                    </button>
                    <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            className="disabled:opacity-30 ml-4 h-8 w-8 rounded shadow-md bg-white transition duration-300"
                            disabled={!table.getCanNextPage()}>
                        <GrCaretNext className="mx-auto"/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default StaticDataTable;
