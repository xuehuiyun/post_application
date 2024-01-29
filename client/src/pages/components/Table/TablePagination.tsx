import { Box, Typography } from "@mui/material";
import { Table } from "@tanstack/react-table";
import Dropdown from "../Dropdown";
import { TablePaginationIcon } from "../SvgIcon";

interface TablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOpts: number[];
    total: number;
}

const TablePagination = <TData,>(props: TablePaginationProps<TData>) => {
    const { table, pageSizeOpts, total } = props;

    const options: { [key: string]: string } = {};
    pageSizeOpts.forEach((cur) => {
        options[`${cur}`] = `${cur}`;
    });

    const page = table.getState().pagination.pageIndex;
    const pageSize = table.getState().pagination.pageSize;

    const canGoPrevPage = table.getCanPreviousPage();
    const canGoNextPage = table.getCanNextPage();

    const curRangeMax = Math.min(page * pageSize + pageSize, total);
    const curRangeMin = total > 0 ? page * pageSize + 1 : 0;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "end",
                marginTop: "30px"
            }}
        >
            <Typography
                sx={{
                    textAlign: "center",
                    fontFamily: "SamsungOne400",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "-0.1px",
                    alignSelf: "center"
                }}
            >
                Rows per page:
            </Typography>
            <Dropdown
                type={"normal"}
                selected={[table.getState().pagination.pageSize.toString()]}
                onSelectedChange={(newVal) =>
                    table.setPageSize(Number(newVal.target.value))
                }
                placeHolderValue="Rows per page"
                options={options}
                sx={{
                    "& .MuiInputBase-root": {
                        width: "78px",
                        height: "24px",
                        marginLeft: "7px",
                        fontSize: "14px"
                    }
                }}
            />
            <Typography
                sx={{
                    textAlign: "center",
                    marginLeft: "20px",
                    fontFamily: "SamsungOne400",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "18px",
                    letterSpacing: "-0.1px",
                    alignSelf: "center"
                }}
            >
                {curRangeMin} - {curRangeMax} of {total}
            </Typography>
            <div
                onClick={() => {
                    if (canGoPrevPage) {
                        table.previousPage();
                    }
                }}
                style={{
                    width: "18px",
                    height: "18px",
                    background: "#FFFFFF",
                    border: "1px solid #E0E0E0",
                    borderRadius: "2px",
                    cursor: "pointer",

                    marginLeft: "16px",
                    marginRight: "8px",
                    alignSelf: "center",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <TablePaginationIcon disabled={!canGoPrevPage} />
            </div>
            <div
                onClick={() => {
                    if (canGoNextPage) {
                        table.nextPage();
                    }
                }}
                style={{
                    width: "18px",
                    height: "18px",
                    background: "#FFFFFF",
                    border: "1px solid #E0E0E0",
                    borderRadius: "2px",
                    cursor: "pointer",

                    alignSelf: "center",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <TablePaginationIcon
                    disabled={!canGoNextPage}
                    sx={{
                        transform: "rotate(180deg)"
                    }}
                />
            </div>
        </Box>
    );
};

export default TablePagination;
