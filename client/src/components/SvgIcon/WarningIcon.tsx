import { SvgIcon, SvgIconProps } from "@mui/material";

const WarningIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 14 14"
            style={{ width: "14px", height: "14px" }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 0C3.1346 0 0 3.1346 0 7C0 10.8661 3.1346 14 7 14C10.8654 14 14 10.8661 14 7C14 3.1346 10.8654 0 7 0ZM6.36986 10.5001H7.63056V9.10014H6.36986V10.5001ZM7.63056 7.70014H6.36986V3.50014H7.63056V7.70014Z"
                fill="#FCC81D"
            />
        </SvgIcon>
    );
};

export default WarningIcon;
