import { Chip, ChipProps } from "@mui/material";

import ThickCancelIcon from "../SvgIcon/ThickCancelIcon";

interface TagProps {
    label: string;
    onDelete?: ChipProps["onDelete"];
    disabled?: boolean;
    sx?: ChipProps["sx"];
}

const Tag = ({ label, sx, disabled, onDelete }: TagProps) => {
    return (
        <Chip
            label={label}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onDelete={!disabled ? onDelete : undefined}
            deleteIcon={!disabled ? <ThickCancelIcon /> : undefined}
            variant="outlined"
            sx={[
                {
                    height: "20px",
                    borderRadius: "10px",
                    maxWidth: "200px",
                    "& .MuiSvgIcon-root": {
                        stroke: "#C8C8CA",
                        "&:hover": {
                            stroke: "#000000"
                        }
                    }
                },
                onDelete && {
                    "& .MuiChip-label": {
                        padding: "0px",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                    },
                    "& .MuiChip-deleteIcon": {
                        height: "10px",
                        width: "10px"
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        />
    );
};

export default Tag;
