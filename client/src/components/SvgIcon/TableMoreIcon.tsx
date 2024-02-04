import { SvgIcon, SvgIconProps } from "@mui/material";

const MoreIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 18 18"
            style={{ width: "18px", height: "18px" }}
            fill="none"
            {...props}
        >
            <circle cx="4" cy="9" r="1" fill="black"></circle>
            <circle cx="14" cy="9" r="1" fill="black"></circle>
            <circle cx="9" cy="9" r="1" fill="black"></circle>
        </SvgIcon>
    );
};

export default MoreIcon;
