import { queryClient } from "../main";

function getPopupFeatures() {
    const left = window.outerWidth / 2 - 260;
    return `toolbar=no,scrollbars=yes,resizable=no,top=50,left=${left},width=640,height=720`;
}

let timer: number = 0;

export function handleLogin() {
    const loginWindow = window.open(`/login`, "login", getPopupFeatures());
    window.clearInterval(timer);
    timer = window.setInterval(function () {
        if (loginWindow?.closed) {
            clearInterval(timer);

            Promise.resolve(
                queryClient.invalidateQueries({
                    queryKey: ["userSession"]
                })
            ).catch((err) => {
                console.log(
                    "Failed to invalidate userSession query key: ",
                    err
                );
            });
        }
    }, 500);
}

export function handleLogout() {
    window.location.assign("/logout");
}
