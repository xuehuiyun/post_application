import { Box, Menu, MenuItem, MenuProps as MuiMenuProps } from "@mui/material";
import { useState } from "react";
import { TableMoreIcon } from "../SvgIcon";

interface TableModalProps {
    valueOne: string;
    valueTwo?: string;
    disableValueOne?: boolean;
    disableValueTwo?: boolean;
    onClickOne: (event: React.MouseEvent<HTMLElement>) => void;
    onClickTwo?: (event: React.MouseEvent<HTMLElement>) => void;
    sx?: MuiMenuProps["sx"];
}

const TableModal = (props: TableModalProps) => {
    const {
        sx,
        valueOne,
        valueTwo,
        onClickOne,
        onClickTwo,
        disableValueOne,
        disableValueTwo
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleToggle = (event: any) => {
        event.preventDefault();
        if (anchorEl === null) {
            setAnchorEl(event.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };

    return (
        <Box
            sx={[
                {
                    cursor: "pointer",
                    paddingRight: "20px"
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <TableMoreIcon
                sx={{
                    cursor: "pointer"
                }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    handleToggle(e);
                }}
            />
            <Menu
                onClick={(e) => e.stopPropagation()}
                open={open}
                onClose={handleToggle}
                anchorEl={anchorEl}
            >
                <MenuItem
                    disabled={disableValueOne}
                    onClick={(e) => {
                        onClickOne(e);
                        setAnchorEl(null);
                    }}
                >
                    {valueOne}
                </MenuItem>
                {valueTwo ?? onClickTwo ? (
                    <MenuItem
                        disabled={disableValueTwo}
                        onClick={(e) => {
                            if (onClickTwo) {
                                onClickTwo(e);
                                setAnchorEl(null);
                            }
                        }}
                    >
                        {valueTwo}
                    </MenuItem>
                ) : (
                    <div></div>
                )}
            </Menu>
        </Box>
    );
};

export default TableModal;
