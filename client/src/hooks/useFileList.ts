import { useQuery } from "@tanstack/react-query";
import zodFetch from "../utils/zodFetch";
import { PostGetListResponseSchema } from "../../../server/interface/post.interface";

export default function useCMSFileList() {
    const cmsFileListQuery = useQuery({
        queryKey: ["cmsFileList"],
        queryFn: async () => {
            const response = await zodFetch(
                PostGetListResponseSchema,
                `/api/post/list`
            );

            return response?.Data;
        }
    });

    return {
        data: cmsFileListQuery.data,
        isLoading: cmsFileListQuery.isPending,
        isError: cmsFileListQuery.isError
    };
}
