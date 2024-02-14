import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";
import { handleLogin } from "../../utils/login";
import LoginScreen from "./Login.screen";

const LoginRoute = () => {
    const { data, isLoading } = useUserProfile();
    const loggedIn = !!data;

    const navigate = useNavigate();
    console.log("is logged in?: ", loggedIn, data);
    useEffect(() => {
        if (loggedIn) {
            navigate("/admin");
        }
    }, [loggedIn]);

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
