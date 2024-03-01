import { useQuery } from "@tanstack/react-query";
import zodFetch from "../utils/zodFetch";
import { PostGetListResponseSchema } from "../../../server/interface/post.interface";

export default function useFileList() {
    const fileListQuery = useQuery({
        queryKey: ["fileList"],
        queryFn: async () => {
            const response = await zodFetch(
                PostGetListResponseSchema,
                `/api/post/list`
            );

            return response?.Data;
        }
    });

    return {
        data: fileListQuery.data,
        isLoading: fileListQuery.isPending,
        isError: fileListQuery.isError
    };
}
