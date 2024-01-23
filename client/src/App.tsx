import { Box } from "@mui/material";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Navigate to={"/"} replace={true} />} />
                {/**
                 * TODO: signin route implemented here
                 */}
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
