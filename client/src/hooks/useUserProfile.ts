import { useQuery } from "@tanstack/react-query";
import zodFetch from "../utils/zodFetch";
import { GetUserProfileResponseSchema } from "../../../server/interface/user.interface";

export default function useUserProfile() {
    const query = useQuery({
        queryKey: ["userSession"],
        staleTime: Infinity,
        refetchOnMount: false, // don't need to continuously fetch on mount
        queryFn: async () => {
            const response = await zodFetch(
                GetUserProfileResponseSchema,
                "/api/user/profile"
            );
            return response?.Data;
        }
    });

    return {
        data: query.data,
        isLoading: query.isPending,
        isError: query.isError
    };
}
