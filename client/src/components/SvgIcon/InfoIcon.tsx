import { SvgIcon, SvgIconProps } from "@mui/material";

const InfoIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 14 14"
            style={{ width: "14px", height: "14px" }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0C3.1346 0 0 3.1339 0 7C0 10.8661 3.1346 14 7 14C10.8654 14 14 10.8661 14 7C14 3.1339 10.8654 0 7 0ZM7.63028 5.67007H5.60658V6.93007H6.36958V9.17007H4.90028V10.4301H9.10028V9.17007H7.63028V5.67007ZM7.875 3.85C7.875 4.333 7.483 4.725 7 4.725C6.517 4.725 6.125 4.333 6.125 3.85C6.125 3.367 6.517 2.975 7 2.975C7.483 2.975 7.875 3.367 7.875 3.85Z"
                fill="#0E2AD1"
            />
        </SvgIcon>
    );
};

export default InfoIcon;
