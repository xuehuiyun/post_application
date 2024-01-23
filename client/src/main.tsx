import {
    QueryCache,
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <>
                <App />
            </>
        </QueryClientProvider>
    </React.StrictMode>
);
