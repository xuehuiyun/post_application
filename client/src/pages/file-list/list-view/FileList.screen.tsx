import { Typography } from "@mui/material";
import LoadingScreen from "../../shared-components/LoadingScreen";

interface FileListScreenProps {
    isLoading: boolean;
    children?: React.ReactNode;
}

const FileListScreen = (props: FileListScreenProps) => {
    const { isLoading, children } = props;
    return (
        <>
            <Typography
                sx={{
                    fontSize: "48px",
                    fontFamily: "fantasy",
                    fontWeight: "700",
                    marginBottom: "24px"
                }}
            >
                Doc
            </Typography>
            {isLoading ? <LoadingScreen /> : children}
        </>
    );
};

export default FileListScreen;
