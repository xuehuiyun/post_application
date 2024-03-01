import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const DownIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#A7A7A7"
            {...props}
        >
            <path fill="none" d="M3 6L9 12L15 6" />
        </SvgIcon>
    );
};
export default DownIcon;
