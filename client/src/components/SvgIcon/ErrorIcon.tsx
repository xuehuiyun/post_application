import { SvgIcon, SvgIconProps } from "@mui/material";

const ErrorIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 14 14"
            fill="none"
            style={{ width: "14px", height: "14px" }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 7C0 3.1346 3.1346 0 7 0C10.8654 0 14 3.1346 14 7C14 10.8661 10.8654 14 7 14C3.1346 14 0 10.8661 0 7ZM7.00021 6.10876L9.35431 3.75466L10.2454 4.64506L7.89061 6.99986L10.2454 9.35466L9.35431 10.2451L7.00021 7.89096L4.64541 10.2451L3.75431 9.35466L6.10911 6.99986L3.75431 4.64506L4.64541 3.75466L7.00021 6.10876Z"
                fill="#FF0016"
            />
        </SvgIcon>
    );
};

export default ErrorIcon;
