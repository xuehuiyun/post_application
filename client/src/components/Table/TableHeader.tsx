import { Box, IconButton } from "@mui/material";
import { ReactNode } from "react";
import { TableFilterIcon } from "../SvgIcon";

export interface TableHeaderProps {
    AdvFilter?: ReactNode;
    Filter?: ReactNode;
    PageButton?: ReactNode;
    showAdvFilter: boolean;
    setShowAdvFilter: (value: boolean) => void;
}

const TableHeader = ({
    AdvFilter,
    Filter,
    PageButton,
    showAdvFilter,
    setShowAdvFilter
}: TableHeaderProps) => {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginTop: "36px",
                    marginBottom: "16px",
                    gap: "10px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-end"
                    }}
                >
                    {/* open adv filter button */}
                    {AdvFilter && (
                        <IconButton
                            sx={{
                                border: "1px solid #C8C8CA",
                                width: "36px",
                                height: "36px",
                                borderRadius: "4px"
                            }}
                            disableRipple
                            onClick={(e) => {
                                setShowAdvFilter(!showAdvFilter);
                            }}
                        >
                            <TableFilterIcon
                                active={showAdvFilter}
                                fill="none"
                                stroke="rgba(0, 0, 0, 0.54)"
                            />
                        </IconButton>
                    )}

                    {/* filter */}
                    {Filter}
                </Box>
                {PageButton}
            </Box>
            {showAdvFilter && AdvFilter}
        </>
    );
};

export default TableHeader;
