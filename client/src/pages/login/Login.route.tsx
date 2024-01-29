import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";
import { handleLogin } from "../../utils/login";
import LoginScreen from "./Login.screen";

const LoginRoute = () => {
    const { isLoggedIn, isLoading } = useUserProfile();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/admin");
        }
    }, [isLoggedIn]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <LoginScreen onLoginClick={() => handleLogin()} />;
};

export default LoginRoute;
