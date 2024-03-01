import { SvgIcon, SvgIconProps } from "@mui/material";

interface IndeterminateCheckboxIconProps extends SvgIconProps {
    disabled: boolean;
}
const IndeterminateCheckboxIcon = (props: IndeterminateCheckboxIconProps) => {
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
            <path d="M3 9.5H15" stroke={innerColor} strokeWidth="2" />
        </SvgIcon>
    );
};

export default IndeterminateCheckboxIcon;
