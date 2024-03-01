import { CssBaseline } from "@mui/material";
import {
    QueryCache,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import { queryClientAtom } from "jotai-tanstack-query";
import { Provider } from "jotai/react";
import { useHydrateAtoms } from "jotai/react/utils";
import ReactDOM from "react-dom/client";

import React from "react";
import App from "./App";
import { SnackbarProvider } from "notistack";
import Toast from "./components/Toast";

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            // Intended behavior: Data should be refetched after some fixed period only (or refetched due to a mutation).
            // We don't want background updates so set staleTime to infinity and cacheTime to desired expire time.
            staleTime: Infinity,
            gcTime: FIVE_MINUTES_IN_MS,
            retry: 1
        }
    },
    queryCache: new QueryCache({
        // For query errors we need to provide a global handler on the queryCache instead of having error callbacks on each query.
        // Query callbacks are deprecated: https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose
        onError: (error, query) => {
            if (
                typeof error === "object" &&
                error != null &&
                "cause" in error
            ) {
                if (error.cause === 404) {
                    window.location.href = "/notfound";
                }

                if (
                    error.cause === 401 &&
                    // only redirect to /unauthorized when we're not on the /signin page or if the error originated from a non-user session based query
                    window.location.pathname !== "/signin" &&
                    query.queryHash !== '["userSession"]'
                ) {
                    window.location.href = "/unauthorized";
                }
            }
        }
    })
});

const HydrateAtoms = ({ children }: { children: JSX.Element }) => {
    useHydrateAtoms([[queryClientAtom, queryClient]]);
    return children;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider>
                <CssBaseline />
                <HydrateAtoms>
                    <>
                        <SnackbarProvider
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            Components={{
                                success: Toast,
                                default: Toast,
                                error: Toast,
                                info: Toast,
                                warning: Toast
                            }}
                        >
                            <App />
                        </SnackbarProvider>
                    </>
                </HydrateAtoms>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
