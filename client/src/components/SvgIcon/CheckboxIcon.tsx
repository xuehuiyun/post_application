import { SvgIcon, SvgIconProps } from "@mui/material";

interface CheckboxIconProps extends SvgIconProps {
    disabled: boolean;
}

const CheckboxIcon = (props: CheckboxIconProps) => {
    const color = props.disabled ? "#E0E0E0" : "#0E2AD1";
    const bgColor = props.disabled ? "#EEEEEE" : "#0E2AD1";
    const innerColor = props.disabled ? "#E0E0E0" : "#FFFFFF";

    return (
        <SvgIcon viewBox="0 0 18 18" {...props}>
            <rect
                x="0.5"
                y="0.5"
                width="17"
                height="17"
                rx="1.5"
                fill={bgColor}
                stroke={color}
            />
            <path
                d="M3.10645 9.5L6.75104 13L15.1287 5"
                stroke={innerColor}
                fill="none"
                strokeWidth="2"
            />
        </SvgIcon>
    );
};

export default CheckboxIcon;
