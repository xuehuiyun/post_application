import {
    Box,
    FormHelperText,
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps
} from "@mui/material";
import { CancelIcon, SearchIcon } from "../SvgIcon";

interface SearchProps {
    type: "small" | "medium";
    subText?: string;
    value: string;
    onChange: TextFieldProps["onChange"];
    onKeyDown?: TextFieldProps["onKeyDown"];
    handleClear: Function;
    label?: string;
    sx?: TextFieldProps["sx"];
}

const Search = ({
    value,
    type,
    sx,
    onChange,
    handleClear,
    label,
    onKeyDown
}: SearchProps) => {
    const isMedium = type === "medium";

    return (
        <Box
            sx={[{ position: "relative" }, ...(Array.isArray(sx) ? sx : [sx])]}
        >
            <FormHelperText
                sx={{
                    position: "absolute",
                    top: "-20px",
                    margin: "0px"
                }}
            >
                {label}
            </FormHelperText>
            <TextField
                value={value}
                placeholder={"Search"}
                variant="outlined"
                onChange={onChange}
                onKeyDown={onKeyDown}
                InputLabelProps={{
                    shrink: true
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: value !== "" && (
                        <InputAdornment position="end">
                            <IconButton
                                disableRipple
                                onClick={(e) => {
                                    handleClear();
                                }}
                            >
                                <CancelIcon
                                    sx={{ height: "15px", width: "15px" }}
                                />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                sx={[
                    // small default
                    {
                        width: "240px",
                        "& .MuiOutlinedInput-root": {
                            height: "24px",
                            fontSize: "14px",
                            padding: "10px",
                            "& fieldset": {
                                border: "1px solid",
                                borderRadius: "4px",
                                borderColor: "#C8C8CA"
                            },
                            "&:hover fieldset": {
                                borderColor: "#C8C8CA"
                            },
                            "&.Mui-focused fieldset": {
                                border: "1px solid",
                                borderColor: "#0E2AD1"
                            }
                        }
                    },
                    isMedium && {
                        "& .MuiOutlinedInput-root": {
                            fontSize: "14px",
                            height: "36px"
                        }
                    }
                ]}
            />
        </Box>
    );
};

export default Search;
