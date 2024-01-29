import { SvgIcon, SvgIconProps } from "@mui/material";

interface OutlinedCheckboxIconProps extends SvgIconProps {
    disabled: boolean;
}

const OutlinedCheckboxIcon = (props: OutlinedCheckboxIconProps) => {
    const color = props.disabled ? "#E0E0E0" : "#C8C8CA";
    const bgColor = props.disabled ? "#EEEEEE" : "#FFFFFF";

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
        </SvgIcon>
    );
};

export default OutlinedCheckboxIcon;
