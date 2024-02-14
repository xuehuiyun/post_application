import { Box, BoxProps, CircularProgress } from "@mui/material";
import { Row, Table, flexRender } from "@tanstack/react-table";
import { useState } from "react";
import { TableAscSortIcon, TableDescSortIcon } from "../SvgIcon";
import TableColFilter from "./TableColFilter";

interface TableProps<TData> {
    table: Table<TData>;
    onRowClick?: (row: Row<TData>) => void;
    loading?: boolean;
    sx?: BoxProps["sx"];
}

const TableBody = <TData,>(props: TableProps<TData>) => {
    const [colFilterAnchorEl, setColFilterAnchorEl] = useState<null | {
        anchor: HTMLElement;
        id: string;
    }>(null);

    const { table, sx, onRowClick, loading } = props;

    return (
        <Box
            sx={[
                {
                    overflow: "auto",
                    width: "100%",
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "-0.1px",
                    color: "#000000",
                    "& table": {
                        borderSpacing: "0px",
                        width: "100%"
                    },
                    "& thead": {
                        fontFamily: "fantasy",
                        borderTop: "1px solid #C8C8CA",
                        borderBottom: "1px solid #E5E5E5",
                        backgroundColor: "#FAFAFA",
                        textAlign: "left",
                        height: "56px",
                        "& th": {
                            borderTop: "1px solid #C8C8CA",
                            position: "relative",
                            "&:first-child": {
                                paddingLeft: "20px"
                            },
                            "&:not(:first-child)": {
                                paddingLeft: "16px"
                            },
                            "&:not(:last-child)::after": {
                                content: '""',
                                position: "absolute",
                                height: "32px",
                                right: "0px",
                                top: "12px",
                                width: "1px",
                                backgroundColor: "#000000",
                                opacity: "0.1"
                            }
                        }
                    },
                    "& tbody": {
                        "& tr": {
                            "&:hover": {
                                backgroundColor: "#F2F5FF",
                                cursor: onRowClick ? "pointer" : "default"
                            },
                            "&:first-child": {
                                "& td": {
                                    borderTop: "1px solid #E5E5E5"
                                }
                            },
                            "& td": {
                                fontFamily: "fantasy",
                                padding: "18px 0 17px 0",
                                borderBottom: "1px solid #E5E5E5",
                                "&:first-child": {
                                    paddingLeft: "20px"
                                },
                                "&:not(:first-child)": {
                                    paddingLeft: "16px"
                                }
                            }
                        },
                        "& .errorMsg": {
                            "&:hover": {
                                backgroundColor: "white"
                            }
                        }
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            width: "100%",
                                            paddingRight: "8px"
                                        }}
                                    >
                                        <Box>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </Box>

                                        {header.column.getCanSort() && (
                                            <Box
                                                sx={{
                                                    display: "inline-flex",
                                                    marginLeft: "auto",
                                                    marginTop: "auto",
                                                    marginBottom: "auto",
                                                    flexDirection: "column",
                                                    gap: "4px",
                                                    "& svg": {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                            >
                                                <TableAscSortIcon
                                                    onClick={() => {
                                                        if (
                                                            header.column.getIsSorted() ===
                                                            "asc"
                                                        ) {
                                                            header.column.clearSorting();
                                                        } else {
                                                            header.column.toggleSorting(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                    active={
                                                        header.column.getIsSorted() ===
                                                        "asc"
                                                    }
                                                />
                                                <TableDescSortIcon
                                                    onClick={() => {
                                                        if (
                                                            header.column.getIsSorted() ===
                                                            "desc"
                                                        ) {
                                                            header.column.clearSorting();
                                                        } else {
                                                            header.column.toggleSorting(
                                                                true
                                                            );
                                                        }
                                                    }}
                                                    active={
                                                        header.column.getIsSorted() ===
                                                        "desc"
                                                    }
                                                />
                                            </Box>
                                        )}

                                        {header.column.getCanFilter() && (
                                            <TableColFilter
                                                sx={{
                                                    marginLeft: "auto",
                                                    marginTop: "auto",
                                                    marginBottom: "auto"
                                                }}
                                                column={header.column}
                                                anchorEl={
                                                    colFilterAnchorEl &&
                                                    colFilterAnchorEl.id ===
                                                        header.column.id
                                                        ? colFilterAnchorEl.anchor
                                                        : null
                                                }
                                                onFilterClose={() =>
                                                    setColFilterAnchorEl(null)
                                                }
                                                onFilterIconClick={(
                                                    event: React.MouseEvent<HTMLElement>
                                                ) => {
                                                    setColFilterAnchorEl(
                                                        colFilterAnchorEl
                                                            ? null
                                                            : {
                                                                  anchor: event.currentTarget,
                                                                  id: header
                                                                      .column.id
                                                              }
                                                    );
                                                }}
                                            />
                                        )}
                                    </Box>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {loading ? (
                    <tr className="errorMsg">
                        <td
                            colSpan={table.getAllColumns().length}
                            style={{
                                textAlign: "center",
                                borderTop: "none",
                                borderBottom: "none"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "200px"
                                }}
                            >
                                <CircularProgress />
                            </div>
                        </td>
                    </tr>
                ) : (
                    <tbody>
                        {!loading &&
                            (table.getRowModel().rows.length === 0 ? (
                                <tr className="errorMsg">
                                    <td
                                        colSpan={table.getAllColumns().length}
                                        style={{
                                            textAlign: "center",
                                            borderTop: "none",
                                            borderBottom: "none"
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%"
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: "0",
                                                    textAlign: "center"
                                                }}
                                            >
                                                No result found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() => {
                                            if (onRowClick) {
                                                onRowClick(row);
                                            }
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ))}
                    </tbody>
                )}
            </table>
        </Box>
    );
};

export default TableBody;
