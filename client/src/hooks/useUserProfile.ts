import { useEffect, useState } from "react";

const useUserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            const sessionCookie = getCookie("SESSION_COOKIE");
            setIsLoggedIn(!!sessionCookie);
            setIsLoading(false);
        };
        checkSession();

        const intervalId = setInterval(checkSession, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return { isLoading, isLoggedIn };
};

const getCookie = (name: string) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};

export default useUserProfile;
