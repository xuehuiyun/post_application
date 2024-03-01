import { SvgIcon, SvgIconProps } from "@mui/material";

const TableAscSortIcon = (props: SvgIconProps & { active: boolean }) => {
    const { active, ...rest } = props;

    return (
        <SvgIcon
            viewBox="0 0 10 5"
            style={{ width: "10px", height: "5px" }}
            width="10"
            height="5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path d="M0 5L5 0L10 5H0Z" fill={active ? "#0e2ad1" : "#c8c8c8"} />
        </SvgIcon>
    );
};

export default TableAscSortIcon;
