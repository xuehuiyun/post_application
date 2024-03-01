import {
    Box,
    FormControl,
    FormControlProps,
    FormControlProps as MuiFormControl,
    OutlinedInputProps as MuiOutlinedInputProps,
    OutlinedInput
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

interface InputProps {
    type: "normal" | "error" | "disabled";
    disabled: MuiFormControl["disabled"];
    onClick?: FormControlProps["onClick"];
    variant?: "filled" | "outlined" | "standard";
    onBlur?: FormControlProps["onBlur"];
    label?: string;
    subText?: string;
    errText?: string;
    largeWidth?: boolean;
    placeholderText?: string;
    rows?: number;
    multiline?: MuiOutlinedInputProps["multiline"];
    onChange: MuiOutlinedInputProps["onChange"];
    value: string;
    sx?: MuiFormControl["sx"];
}

const BorderColors: Record<InputProps["type"], string> = {
    error: "#FF0016",
    disabled: "#E0E0E0",
    normal: "#0E2AD1"
};

const InputField = ({
    disabled = false,
    onClick,
    label,
    type,
    placeholderText,
    subText,
    onBlur,
    errText,
    onChange,
    value,
    variant,
    multiline,
    largeWidth,
    rows,
    sx
}: InputProps) => {
    const isError = type === "error";
    const isDisabled = type === "disabled";

    return (
        <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
            <FormControl
                variant={variant}
                disabled={disabled}
                onClick={onClick}
                onBlur={onBlur}
                sx={[
                    {
                        "& .MuiOutlinedInput-root": {
                            "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid",
                                    borderColor: BorderColors[type]
                                }
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid",
                                    borderColor: BorderColors[type]
                                }
                            }
                        },
                        "& .MuiInputBase-root": {
                            fontFamily: "fantasy",
                            fontSize: "14px",
                            width: "100%",
                            height: "100%",
                            padding: "12px",
                            borderColor: "#C8C8CA"
                        },

                        "& .MuiOutlinedInput-input": {
                            padding: "0px",
                            color: "#C8C8CA",
                            "&:focus": {
                                color: "#333"
                            }
                        },
                        "& .MuiFormHelperText-root": {
                            marginLeft: 0
                        }
                    },
                    isError && {
                        "& .MuiOutlinedInput-root": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#FF0016"
                            },
                            "&:hover": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#FF0016"
                                }
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "1px solid",
                                    borderColor: BorderColors[type]
                                }
                            }
                        }
                    },
                    isDisabled && {
                        "& .MuiInputBase-root": {
                            backgroundColor: "#EEEEEE",
                            "&:hover fieldset": {
                                borderColor: "#E0E0E0"
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#E0E0E0"
                            }
                        }
                    },
                    !!largeWidth && {
                        "& .MuiOutlinedInput-root": {
                            height: "36px",
                            width: "550px"
                        }
                    },
                    !!multiline && {
                        "& .MuiOutlinedInput-root": {
                            height: "auto"
                        }
                    }
                ]}
            >
                <FormHelperText
                    sx={{
                        color: type === "error" ? "#FF0016" : "#6E6E6E",
                        marginTop: 0
                    }}
                >
                    {label}
                </FormHelperText>
                <OutlinedInput
                    multiline={multiline}
                    onChange={onChange}
                    value={value}
                    rows={rows}
                    placeholder={placeholderText}
                />
            </FormControl>
            <FormHelperText
                sx={{
                    color: type === "error" ? "#FF0016" : "#333",
                    marginTop: 0
                }}
            >
                {subText}
            </FormHelperText>
            {isError && (
                <FormHelperText sx={{ color: "#FF0016", marginTop: 0 }}>
                    {errText}
                </FormHelperText>
            )}
        </Box>
    );
};

export default InputField;
