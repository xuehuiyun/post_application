import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const DeleteButtonIcon = (props: SvgIconProps): JSX.Element => {
    return (
        <SvgIcon
            width="18"
            height="18"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M7.77762 7.77753L2.22223 2.22217" />
            <path d="M2.22223 7.77769L7.77778 2.22217" />
        </SvgIcon>
    );
};
export default DeleteButtonIcon;
