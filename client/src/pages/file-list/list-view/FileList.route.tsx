import { useNavigate } from "react-router-dom";
import useCMSFileList from "../../../hooks/useFileList";
import FileListScreen from "./FileList.screen";
import FileListTable from "./FileListTable";

const FileListRoute = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useCMSFileList();

    return (
        <FileListScreen
            isLoading={isLoading}
            children={
                <FileListTable
                    data={data ?? []}
                    isLoading={isLoading}
                    handlers={{
                        onAddFile: () => {},
                        onClone: () => {},
                        onDelete: () => {}
                    }}
                />
            }
        />
    );
};

export default FileListRoute;
