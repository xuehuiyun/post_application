import { SvgIcon, SvgIconProps } from "@mui/material";

const SuccessIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon
            viewBox="0 0 14 14"
            style={{ width: "14px", height: "14px" }}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 7C0 3.1339 3.1346 0 7 0C10.8654 0 14 3.1339 14 7C14 10.8661 10.8654 14 7 14C3.1346 14 0 10.8661 0 7ZM3.9459 6.9048L5.6 8.5589L10.0541 4.1048L10.9459 4.9952L5.6 10.3411L3.0541 7.7952L3.9459 6.9048Z"
                fill="#00B359"
            />
        </SvgIcon>
    );
};

export default SuccessIcon;
