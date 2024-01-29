import { useEffect, useState } from "react";

const useUserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const sessionCookie = getCookie("SDP_SSID");
            setIsLoggedIn(!!sessionCookie);
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timeoutId);
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
