import {
    Alert as MUIAlert,
    AlertTitle as MUIAlertTitle,
    Typography
} from "@mui/material/";

import { forwardRef } from "react";
import {
    CancelIcon,
    ErrorIcon,
    InfoIcon,
    SuccessIcon,
    WarningIcon
} from "../SvgIcon";

import { CustomContentProps, closeSnackbar } from "notistack";

export interface ToastProps extends CustomContentProps {
    message: string;
    title?: string;
}

const BorderColors: Record<ToastProps["variant"], string> = {
    error: "#FF8587",
    success: "#B7EA8F",
    warning: "#FFE48F",
    info: "#4337E0",
    default: "#4337E0"
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
    ({ variant, id, message, style, title }: ToastProps, ref) => {
        const type = variant === "default" ? "info" : variant;

        return (
            <MUIAlert
                severity={type}
                ref={ref}
                style={style}
                iconMapping={{
                    error: <ErrorIcon />,
                    warning: <WarningIcon />,
                    success: <SuccessIcon />,
                    info: <InfoIcon />
                }}
                slots={{
                    closeIcon: CancelIcon
                }}
                slotProps={{
                    closeButton: {
                        disableRipple: true
                    }
                }}
                onClose={() => {
                    closeSnackbar(id);
                }}
                variant={"outlined"}
                sx={{
                    background: "#FFFFFF",
                    boxShadow: `
                        0px 3px 6px -4px rgba(0, 0, 0, 0.12), 
                        0px 6px 16px rgba(0, 0, 0, 0.08), 
                        0px 9px 28px 8px rgba(0, 0, 0, 0.05)
                    `,
                    borderRadius: "4px",
                    padding: "0 0",
                    minHeight: "40px",
                    width: "280px",

                    border: "1px solid",
                    borderColor: BorderColors[type],
                    color: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "#FFFFFF",

                    // svg icon wrapper styling
                    "& .MuiAlert-icon": {
                        width: "14px",
                        height: "14px",
                        padding: "0 0",
                        margin: "13px 11px 13px 15px"
                    },
                    // svg icon styling
                    // remove all styling on icon
                    "& .MuiSvgIcon-root": {
                        all: "unset"
                    },
                    // textbox/message area styling
                    "& .MuiAlert-message": {
                        padding: "0 0",
                        margin: "9px 0 9px 0",
                        "& .MuiTypography-root": {
                            lineHeight: "22px",
                            fontSize: "14px",
                            padding: 0,
                            margin: 0
                        }
                    },
                    // cancel button
                    "& .MuiAlert-action": {
                        "& .MuiButtonBase-root": {
                            padding: "0 0",
                            height: "12px",
                            width: "12px"
                        },
                        padding: "0 0",
                        margin: "15px 14px 15px auto"
                    }
                }}
            >
                <MUIAlertTitle>
                    {title ? (
                        <>
                            <Typography fontWeight={700} fontFamily={"fantasy"}>
                                {title}
                            </Typography>
                            <Typography>{message}</Typography>
                        </>
                    ) : (
                        message
                    )}
                </MUIAlertTitle>
            </MUIAlert>
        );
    }
);

export default Toast;
