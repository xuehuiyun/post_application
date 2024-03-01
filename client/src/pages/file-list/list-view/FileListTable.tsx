import { Row, createColumnHelper } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import { useClientTable } from "../../../hooks/useTable";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import Search from "../../../components/Search";
import TableModal from "../../../components/Table/TableModal";
import Button from "../../../components/Button";

export interface FileListTableProps {
    data: TableRow[];
    isLoading: boolean;
    handlers: {
        onAddFile: () => void;
        onClone: (file: Row<TableRow>) => void;
        onDelete: (file: Row<TableRow>) => void;
    };
}

export interface TableRow {
    postId: string;
    author: string;
    title: string;
    content?: string;
}

const columnHelper = createColumnHelper<TableRow>();

const FileListTable = ({ data, isLoading, handlers }: FileListTableProps) => {
    const navigate = useNavigate();

    const [advStatusFilter, setAdvStatusFilter] = useState<string[]>([]);
    const [advFilterOpen, setAdvFilterOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const columns = [
        columnHelper.accessor("postId", {
            header: "ID",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return (
                    <>
                        <Link to={"#"}>{cell.row.original.postId}</Link>
                    </>
                );
            }
        }),
        columnHelper.accessor("title", {
            header: "Title",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.title;
            }
        }),
        columnHelper.accessor("content", {
            header: "Content",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.content;
            }
        }),
        columnHelper.accessor("author", {
            header: "Author",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.author;
            }
        }),
        columnHelper.display({
            header: " ",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ row }) => {
                return (
                    <TableModal
                        valueOne={"Clone"}
                        valueTwo={"Delete"}
                        onClickOne={() => {
                            handlers.onClone(row);
                        }}
                        onClickTwo={() => {
                            handlers.onDelete(row);
                        }}
                    />
                );
            }
        })
    ];

    const table = useClientTable({ columns, data: data });
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start ",
                        paddingBottom: "8px",
                        gap: "10px",
                        marginLeft: "15px"
                    }}
                >
                    {" "}
                    <Search
                        type="medium"
                        value={searchValue}
                        handleClear={() => {
                            setSearchValue("");
                            table.getColumn("postId")?.setFilterValue("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                table
                                    .getColumn("postId")
                                    ?.setFilterValue(searchValue);
                            }
                        }}
                        onChange={(e: any) => {
                            setSearchValue(e.target.value);
                        }}
                        label={"Search"}
                    />
                    <div
                        style={{
                            marginLeft: "auto",
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <Button
                            type="default"
                            size="medium"
                            onClick={handlers.onAddFile}
                            sx={{
                                marginRight: "15px"
                            }}
                        >
                            Add File
                        </Button>
                    </div>
                </div>
                <Table
                    table={table}
                    loading={isLoading}
                    onRowClick={(row) => {
                        navigate(`/admin/file/detail/${row.original.postId}`);
                    }}
                />
            </div>
        </>
    );
};

export default FileListTable;
