interface DocAddFileModalScreenProps {
    onAddFile: (filepath: string, template: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    error: boolean;
    loading: boolean;
    email: string;
    name: string;
    templateOptions: { [key: string]: string };
}
