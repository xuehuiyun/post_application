import { Typography } from "@mui/material";
import LoadingScreen from "../../shared-components/LoadingScreen";
import ScreenWrapper from "../../shared-components/ScreenWrapper";

interface FileListScreenProps {
    isLoading: boolean;
    children?: React.ReactNode;
}

const FileListScreen = (props: FileListScreenProps) => {
    const { isLoading, children } = props;
    return (
        <>
            <ScreenWrapper>
                <Typography
                    sx={{
                        fontSize: "48px",
                        fontFamily: "fantasy",
                        fontWeight: "700",
                        marginBottom: "24px",
                        marginLeft: "15px"
                    }}
                >
                    File List
                </Typography>
                {isLoading ? <LoadingScreen /> : children}
            </ScreenWrapper>
        </>
    );
};

export default FileListScreen;
