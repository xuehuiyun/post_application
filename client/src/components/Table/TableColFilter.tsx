import { Box, BoxProps, Menu, Typography } from "@mui/material";
import TableColFilterIcon from "../SvgIcon/TableColFilterIcon";
import { useState } from "react";
import Input from "../Input";
import Checkbox from "../Checkbox";
import { Column } from "@tanstack/react-table";
import Button from "../Button";

interface TableColFilterProps {
    column: Column<any, unknown>;
    anchorEl: HTMLElement | null;
    onFilterIconClick: (event: React.MouseEvent<HTMLElement>) => void;
    onFilterClose: () => void;
    sx?: BoxProps["sx"];
}

const TableColFilter = (props: TableColFilterProps) => {
    const { column, onFilterIconClick, onFilterClose, anchorEl, sx } = props;

    const [searchInput, setSearchInput] = useState("");

    return (
        <Box
            sx={[
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& svg": {
                        cursor: "pointer"
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <Box
                sx={{
                    display: "inline-flex"
                }}
                onClick={onFilterIconClick}
            >
                <TableColFilterIcon active={column.getIsFiltered()} />
            </Box>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={onFilterClose}
                sx={{
                    "& .MuiList-root": {
                        padding: "0px"
                    }
                }}
            >
                <Box
                    sx={{
                        background: "#FFFFFF",
                        boxShadow:
                            "0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)",
                        borderRadius: "4px",
                        padding: "10px 10px"
                    }}
                >
                    <Input
                        onChange={(e) => {
                            setSearchInput(e.target.value);
                        }}
                        disabled={false}
                        type={"normal"}
                        value={searchInput}
                        placeholderText=""
                        sx={{
                            marginBottom: "17px"
                        }}
                    />
                    {Array.from(column.getFacetedUniqueValues().keys())
                        .filter((value) =>
                            value
                                .toLowerCase()
                                .startsWith(searchInput.toLowerCase())
                        )
                        .map((value) => {
                            const isChecked = (
                                column.getFilterValue() as string[]
                            )?.includes(value);

                            return (
                                <Box
                                    key={value}
                                    sx={{
                                        marginBottom: "18px"
                                    }}
                                    onClick={() =>
                                        column.setFilterValue(
                                            (old: string[]) => {
                                                const filters = new Set(old);

                                                if (filters.has(value)) {
                                                    filters.delete(value);
                                                } else {
                                                    filters.add(value);
                                                }

                                                return filters.size > 0
                                                    ? Array.from(filters)
                                                    : undefined;
                                            }
                                        )
                                    }
                                >
                                    <Checkbox checked={isChecked} />
                                    <Typography
                                        sx={{
                                            display: "inline-block",
                                            marginLeft: "7px",
                                            font: "SamsungOne400",
                                            fontWeight: isChecked
                                                ? "700"
                                                : "400"
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                </Box>
                            );
                        })}
                    <Button
                        size="medium"
                        type="default"
                        sx={{ width: "100%", marginTop: "10px" }}
                        onClick={() => column.setFilterValue(undefined)}
                    >
                        Reset Filters
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default TableColFilter;
