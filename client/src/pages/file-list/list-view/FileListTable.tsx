import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useClientTable } from "../../../hooks/useTable";
import Table from "../../../components/Table/Table";

export interface FileListTableProps {
    data: TableRow[];
    isLoading: boolean;
}

export interface TableRow {
    postId: string;
    content?: string;
}

const columnHelper = createColumnHelper<TableRow>();

const FileListTable = ({ data, isLoading }: FileListTableProps) => {
    const columns = [
        columnHelper.accessor("postId", {
            header: "ID",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return (
                    // TODO: implement detail page where Link directs to
                    <>
                        <Link to={"#"}>{cell.row.original.postId}</Link>
                    </>
                );
            }
        }),
        columnHelper.accessor("content", {
            header: "Content",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.content;
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
                <Table
                    table={table}
                    loading={isLoading}
                    onRowClick={() => {
                        //TODO: implement detail page where onClick of table row redirects to
                    }}
                />
            </div>
        </>
    );
};

export default FileListTable;
