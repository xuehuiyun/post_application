import { Box, CircularProgress } from "@mui/material";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import useUserProfile from "./hooks/useUserProfile";
import LoginRoute from "./pages/login/Login.route";
import FileListRoute from "./pages/file-list/list-view/FileList.route";

function RequireAuth({
    navigateAfterAuth,
    children
}: {
    children?: React.ReactNode;
    navigateAfterAuth?: string;
}) {
    const { isLoggedIn, isLoading } = useUserProfile();
    if (isLoading) {
        return <CircularProgress />;
    }
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
                    element={<Navigate to={"/admin"} replace={true} />}
                />
                <Route path="login" element={<LoginRoute />} />
                <Route path="admin">
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <Navigate to={"/admin/list"} replace={true} />{" "}
                            </RequireAuth>
                        }
                    />
                    <Route path="list" element={<FileListRoute />} />
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
