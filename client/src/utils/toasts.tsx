import { enqueueSnackbar } from "notistack";
import { ToastProps } from "../components/Toast";

declare module "notistack" {
    interface OptionsObject {
        title?: string;
    }
}

export function successNotification(message: string, title?: string) {
    enqueueToast(message, "success", title);
}

export function errorNotification(message: string, title?: string) {
    enqueueToast(message, "error", title);
}

export function infoNotification(message: string, title?: string) {
    enqueueToast(message, "info", title);
}

export function warningNotification(message: string, title?: string) {
    enqueueToast(message, "warning", title);
}

function enqueueToast(
    message: string,
    type: ToastProps["variant"],
    title?: string
) {
    enqueueSnackbar(message, {
        variant: type,
        persist: true,
        title
    });
}
