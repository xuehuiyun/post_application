import { useIsMutating, useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import zodFetch from "../utils/zodFetch";
import {
    PostCreateItemBody,
    PostCreateItemResponseSchema,
    PostDeleteItemResponseSchema
} from "../../../server/interface/post.interface";
import { errorNotification, successNotification } from "../utils/toasts";

export default function useFileMutation() {
    const invalidateQueries = async () => {
        void queryClient.invalidateQueries({
            queryKey: ["fileList"]
        });
    };

    const saveFileMutation = useMutation({
        mutationKey: ["fileMutation", "save"],
        mutationFn: async (fileBody: PostCreateItemBody) => {
            const response = await zodFetch(
                PostCreateItemResponseSchema,
                `/api/post/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(fileBody)
                }
            );
            return response;
        },
        onSuccess: async (response, variables) => {
            void invalidateQueries();
            successNotification(
                `Successfully saved ${variables.title as string}`,
                "Save File"
            );
        },
        onError: (err, variables) => {
            console.log(err);
            errorNotification(
                `Failed to save: ${variables.title}.`,
                "Save File"
            );
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await zodFetch(
                PostDeleteItemResponseSchema,
                `/api/post/delete?primaryKey=${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            return response;
        },
        onSuccess: async (_, variables) => {
            await invalidateQueries();
            successNotification(
                `Successfully deleted: ${variables}.`,
                "Delete File"
            );
        },
        onError: async (_, variables) => {
            errorNotification(`Failed to delete: ${variables}`, "Delete File");
        }
    });

    const numberOfFileMutations = useIsMutating({
        mutationKey: ["fileMutation"]
    });

    return {
        saveFile: async (fileContent: PostCreateItemBody) => {
            return await saveFileMutation.mutateAsync(fileContent);
        },
        deleteFile: async (id: string) => {
            return await deleteMutation.mutateAsync(id);
        },
        isLoading: numberOfFileMutations > 0,
        isError: saveFileMutation.isError
    };
}
