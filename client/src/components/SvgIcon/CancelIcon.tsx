import { SvgIcon, SvgIconProps } from "@mui/material";

const CancelIcon = (props: SvgIconProps): JSX.Element => {
    return (
        <SvgIcon
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M13.9997 13.9996L4 4" stroke="black" />
            <path d="M4 14L14 4.00006" stroke="black" />
        </SvgIcon>
    );
};

export default CancelIcon;
