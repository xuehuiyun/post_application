import { Box } from "@mui/material";

export default function ScreenWrapper({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Box
            sx={{
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
            }}
        >
            {children}
        </Box>
    );
}
