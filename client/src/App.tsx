import { Box } from "@mui/material";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import useUserProfile from "./hooks/useUserProfile";
import LoginRoute from "./pages/login/Login.route";
import HC from "./pages/hc";

function RequireAuth({
    navigateAfterAuth,
    children
}: {
    children?: React.ReactNode;
    navigateAfterAuth?: string;
}) {
    const { isLoggedIn } = useUserProfile();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace={true} />;
    }

    if (navigateAfterAuth) {
        return <Navigate to={navigateAfterAuth} />;
    }

    return <> {children} </>;
}

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route
                    index
                    element={<Navigate to={"/admin/hc"} replace={true} />}
                />
                <Route path="login" element={<LoginRoute />} />
                <Route path="admin">
                    <Route
                        path="hc"
                        index
                        element={
                            <RequireAuth>
                                <HC />
                            </RequireAuth>
                        }
                    ></Route>
                </Route>
            </Route>
        )
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <RouterProvider router={routes} />
        </Box>
    );
}

export default App;
