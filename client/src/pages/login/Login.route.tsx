import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../hooks/useUserProfile";
import { handleLogin } from "../../utils/login";
import LoginScreen from "./Login.screen";

const LoginRoute = () => {
    console.log("here");
    const { isLoggedIn } = useUserProfile();

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/hc");
        }
    }, [isLoggedIn]);

    return <LoginScreen onLoginClick={() => handleLogin()} />;
};

export default LoginRoute;
