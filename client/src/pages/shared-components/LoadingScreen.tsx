import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
    return (
        <Box
            height="50%"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingScreen;
