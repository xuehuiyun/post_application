import { useState, useEffect } from "react";

const useUserProfile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if a session cookie exists
        const sessionCookie = getCookie("cookiename");

        // Update the state based on the presence of the session cookie
        setIsLoggedIn(!!sessionCookie);
    }, []); // Empty dependency array means this effect runs once when the component mounts
    console.log("is logged in: ", isLoggedIn);
    return { isLoggedIn };
};

// Function to get a cookie by name
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
