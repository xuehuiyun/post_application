import { SvgIcon, SvgIconProps } from "@mui/material";

const TablePaginationIcon = (props: SvgIconProps & { disabled: boolean }) => {
    const { disabled, ...rest } = props;

    return (
        <SvgIcon
            style={{
                width: "6px",
                height: "10px"
            }}
            viewBox="0 0 6 10"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M5 9L1 5L5 1"
                fill="none"
                stroke={disabled ? "#E0E0E0" : "#000000"}
            />
        </SvgIcon>
    );
};

export default TablePaginationIcon;
