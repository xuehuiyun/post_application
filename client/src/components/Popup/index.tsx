import {
    Box,
    CircularProgress,
    Dialog,
    ButtonProps as MUIButtonProps,
    DialogProps as MUIDialogProps
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../Button";

interface PopUpProps {
    title: string | React.ReactNode;
    open: boolean;
    loading?: boolean;
    closeButtonLabel?: string;
    confirmButtonLabel?: string;
    editButtonLabel?: string;
    editButtonDisabled?: boolean;
    confirmButtonDisabled?: boolean;
    TransitionProps?: MUIDialogProps["TransitionProps"];
    children: React.ReactNode;
    onClose: MUIDialogProps["onClose"];
    onCancel: MUIButtonProps["onClick"];
    onConfirm?: MUIButtonProps["onClick"];
    onEdit?: MUIButtonProps["onClick"];
    size?: "small" | "medium" | "fullscreen";
    sx?: MUIDialogProps["sx"];
}

const Popup = ({
    closeButtonLabel,
    confirmButtonLabel,
    editButtonLabel,
    confirmButtonDisabled,
    editButtonDisabled,
    open,
    title,
    children,
    loading,
    onEdit,
    onClose,
    onCancel,
    onConfirm,
    size = "small",
    sx,
    ...props
}: PopUpProps) => {
    return (
        <Dialog
            sx={[
                {
                    "& .MuiDialog-paper": {
                        maxHeight: "calc(100vh - 64px)",
                        maxWidth: "calc(100vw - 64px)"
                    },
                    "& .MuiDialogTitle-root": {
                        "&:nth-child(1)": {
                            fontFamily: "fantasy",
                            fontSize: "18px",
                            lineHeight: "27px"
                        }
                    },
                    "& .MuiDialogActions-root": {
                        mt: "13px",
                        mb: "13px",
                        mr: "20px"
                    }
                },
                size === "small" && {
                    "& .MuiDialog-paper": {
                        width: "600px"
                    }
                },
                size === "medium" && {
                    "& .MuiDialog-paper": {
                        width: "960px"
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
            open={open}
            onClose={onClose}
            fullWidth={size === "fullscreen"}
            {...props}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent
                sx={{
                    py: "34.5px",
                    px: "28px"
                }}
                dividers
            >
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "200px"
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    children
                )}
            </DialogContent>
            <DialogActions>
                {closeButtonLabel && (
                    <Button onClick={onCancel} size="medium" type="default">
                        {closeButtonLabel}
                    </Button>
                )}
                {confirmButtonLabel && (
                    <Button
                        onClick={onConfirm}
                        disabled={confirmButtonDisabled ?? loading}
                        size="medium"
                        type="primary"
                    >
                        {confirmButtonLabel}
                    </Button>
                )}
                {editButtonLabel && (
                    <Button
                        onClick={onEdit}
                        disabled={editButtonDisabled ?? loading}
                        size="medium"
                        type="primary"
                    >
                        {editButtonLabel}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Popup;
