import {
    Button as MUIButton,
    ButtonProps as MUIButtonProps
} from "@mui/material";

interface ButtonProps {
    type: "primary" | "default";
    size: "medium" | "small";
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: MUIButtonProps["onClick"];
    sx?: MUIButtonProps["sx"];
}

const Button = ({
    children,
    onClick,
    type = "default",
    size = "medium",
    disabled = false,
    sx
}: ButtonProps) => {
    const isPrimary = type === "primary";
    const isSmall = size === "small";

    return (
        <MUIButton
            variant="contained"
            disableElevation={true}
            disableRipple={true}
            onClick={onClick}
            disabled={disabled}
            sx={[
                {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #C8C8CA",
                    fontSize: "14px",
                    lineHeight: "16px",
                    letterSpacing: "-0.1px",
                    color: "#000000",
                    padding: "10px 22px",
                    height: "36px",
                    borderRadius: "4px",
                    textTransform: "none",
                    whiteSpace: "noWrap",
                    "&:hover": {
                        backgroundColor: "#F1F3FF",
                        borderColor: "#0E2AD1",
                        color: "#0E2AD1"
                    },
                    "&:active": {
                        backgroundColor: "#DBE0FF",
                        borderColor: "#001AC1"
                    },
                    "&.Mui-disabled": {
                        backgroundColor: "#FFFFFF",
                        color: "#B3B3B3",
                        borderColor: "#E0E0E0"
                    }
                },
                isSmall && {
                    padding: "4px 22px",
                    height: "24px"
                },
                isPrimary && {
                    backgroundColor: "#0E2AD1",
                    borderColor: "#0E2AD1",
                    color: "#FFFFFF",
                    "&:hover": {
                        backgroundColor: "#4337E0",
                        borderColor: "#4337E0",
                        color: "#FFFFFF"
                    },
                    "&:active": {
                        backgroundColor: "#001AC1",
                        borderColor: "#001AC1"
                    },
                    "&.Mui-disabled": {
                        color: "#A7A7A7",
                        backgroundColor: "#EEEEEE",
                        borderColor: "#E0E0E0"
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {children}
        </MUIButton>
    );
};

export default Button;
