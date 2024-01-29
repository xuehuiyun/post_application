import { SvgIcon, SvgIconProps } from "@mui/material";

const TableFilterIcon = (props: SvgIconProps & { active: boolean }) => {
    const { active, fill, ...rest } = props;

    return (
        <SvgIcon
            style={{ width: "16px", height: "14px" }}
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke={active ? "#0e2ad1" : "#c8c8c8"}
            {...rest}
        >
            <path
                d="M1.0915 1C0.994068 1 0.970685 1.05652 1.03959 1.12566L6.63477 6.73957C6.70368 6.80871 6.76001 6.94521 6.76001 7.04297V10.4199C6.76001 10.5177 6.81634 10.6542 6.88525 10.7233L9.11475 12.9603C9.18366 13.0294 9.23999 13.006 9.23999 12.9082V7.04297C9.23999 6.94521 9.29632 6.80871 9.36523 6.73957L14.9604 1.12566C15.0293 1.05652 15.0059 1 14.9085 1H1.0915Z"
                fill={
                    !active ? (fill === "none" ? "none" : "#c8c8c8") : "#0e2ad1"
                }
            />
        </SvgIcon>
    );
};

export default TableFilterIcon;
