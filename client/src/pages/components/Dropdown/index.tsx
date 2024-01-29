import {
    ChipProps,
    FormControl,
    FormControlProps,
    FormHelperText,
    ListItemText,
    MenuItem,
    SelectProps as MuiSelectProps,
    Select,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import Checkbox from "../Checkbox";
import DownIcon from "../SvgIcon/DownIcon";
import Tag from "../Tag";

export interface DropdownProps {
    sx?: FormControlProps["sx"];
    options: { [key: string]: string };
    disabled?: boolean;
    selected: string[] | string;
    onSelectedChange: MuiSelectProps["onChange"];
    onDelete?: ChipProps["onDelete"];
    placeHolderValue?: string;
    label?: string;
    subText?: string;
    type: "error" | "disabled" | "normal";
    multiple?: MuiSelectProps["multiple"];
    endAdornment?: React.ReactNode;
    tag?: boolean;
}

function countOverflowingChildren(
    parentRef: React.RefObject<HTMLDivElement>
): number {
    let overflowCount = 0;
    if (parentRef.current) {
        const parent = parentRef.current;
        const parentLocation = parent.getBoundingClientRect();
        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children[i];
            const childLocation = child.getBoundingClientRect();
            if (
                childLocation.right > parentLocation.right ||
                childLocation.bottom > parentLocation.bottom
            ) {
                overflowCount++;
            }
        }
    }
    return overflowCount;
}

const Dropdown = ({
    sx,
    options,
    disabled,
    selected,
    onSelectedChange,
    onDelete,
    placeHolderValue,
    label,
    subText,
    type,
    multiple,
    tag,
    endAdornment
}: DropdownProps) => {
    const isError = type === "error";
    const isDisabled = type === "disabled";

    const [overflowCount, setOverflowCount] = useState(0);
    const parentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOverflowCount(countOverflowingChildren(parentRef));
    }, [selected]);

    function handleRenderValue(
        selected: string[],
        placeHolderValue: string,
        multiple?: boolean,
        tag?: boolean
    ) {
        if (!selected) {
            return (
                <Typography
                    sx={{
                        fontFamily: "SamsungOne400",
                        fontSize: "14px",
                        height: "100%",
                        color: "#C8C8CA",
                        padding: "10px 0"
                    }}
                >
                    {placeHolderValue}
                </Typography>
            );
        } else if (multiple && tag) {
            return (
                <Box className="dropdown-selected-tag-count-box">
                    <Box ref={parentRef}>
                        {selected.map((value) => (
                            <Tag
                                onDelete={onDelete}
                                key={value}
                                label={options[value]}
                            />
                        ))}
                    </Box>
                    {overflowCount > 0 && (
                        <Typography
                            sx={{
                                textJustify: "center",
                                height: "20px",
                                fontFamily: "SamsungOne400",
                                fontSize: "14px"
                            }}
                        >
                            +{overflowCount} more |
                        </Typography>
                    )}
                    {overflowCount < 1 && (
                        <Typography
                            sx={{
                                visibility: "hidden",
                                height: "20px"
                            }}
                        >
                            +{overflowCount} more |
                        </Typography>
                    )}
                </Box>
            );
        } else if (multiple) {
            const returnVal = selected.map((val) => {
                return options[val];
            });
            return returnVal.join(", ");
        } else {
            return options[selected[0]];
        }
    }

    return (
        <FormControl
            variant="outlined"
            margin="none"
            disabled={isDisabled}
            sx={[
                {
                    "&.MuiPopover-root": {
                        bgcolor: "blue",
                        "& .MuiPaper-root": {
                            bgcolor: "red"
                        }
                    },
                    "& .MuiOutlinedInput-root": {
                        // border color
                        "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #C8C8CA"
                            }
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #0E2AD1"
                            },
                            "& .MuiSelect-select": {
                                ".MuiTypography-root": {
                                    // place holder
                                    color: "#000000"
                                }
                            },
                            "& .MuiSvgIcon-root": {
                                stroke: "black"
                            }
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #C8C8CA"
                        },
                        "& .MuiSelect-select": {
                            padding: "0px",
                            "& .dropdown-selected-tag-count-box": {
                                height: "20px",
                                display: "flex",
                                marginRight: "24px",
                                "& .MuiBox-root": {
                                    height: "20px",
                                    width: "100%",
                                    display: "flex",
                                    flexFlow: "wrap",
                                    gap: 0.5,
                                    overflow: "hidden"
                                }
                            }
                        }
                    },
                    "& .MuiInputBase-root": {
                        // size
                        width: "240px",
                        height: "36px",
                        padding: "12px"
                    }
                },
                isError && {
                    "& .MuiOutlinedInput-root": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid red"
                        },
                        "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid red"
                            }
                        },
                        "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid red"
                            }
                        }
                    },
                    "& .MuiFormHelperText-root: nth-child(3)": {
                        color: "red"
                    }
                },
                isDisabled && {
                    "& .MuiInputBase-root": {
                        bgcolor: "#EEEEEE"
                    },
                    "& .MuiOutlinedInput-root": {
                        // border color
                        "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                                border: "1px solid #E0E0E0"
                            }
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "1px solid #E0E0E0"
                        }
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "4px"
                }}
            >
                <FormHelperText sx={{ margin: "0px" }}>{label}</FormHelperText>
                {endAdornment}
            </div>
            <Select
                disabled={disabled}
                multiple={multiple}
                displayEmpty
                MenuProps={{
                    PaperProps: {
                        sx: [
                            {
                                marginTop: "2px",
                                maxHeight: "240px",
                                bgcolor: "#FFFFFF",
                                "& .MuiMenuItem-root": {
                                    bgcolor: "#FFFFFF",
                                    padding: "10px",
                                    "&:hover": {
                                        bgcolor: "#F2F5FF"
                                    },
                                    "&.Mui-selected": {
                                        bgcolor: "transparent"
                                    }
                                }
                            },
                            {
                                "& .MuiMenuItem-root": {
                                    "&.Mui-selected": {
                                        "& .MuiTypography-root": {
                                            fontFamily: "SamsungOne700"
                                        }
                                    }
                                }
                            }
                        ]
                    }
                }}
                onChange={onSelectedChange}
                IconComponent={DownIcon}
                value={selected}
                renderValue={(selected) => {
                    return handleRenderValue(
                        typeof selected === "string" ? [selected] : selected,
                        placeHolderValue ?? "",
                        multiple,
                        tag
                    );
                }}
            >
                {Object.keys(options).map((key) => (
                    <MenuItem key={key} value={key}>
                        {multiple && (
                            <Checkbox
                                sx={{ marginRight: "10px" }}
                                checked={selected.includes(key)}
                            />
                        )}
                        <ListItemText primary={options[key]} />
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ margin: "0px" }}>{subText}</FormHelperText>
        </FormControl>
    );
};

export default Dropdown;
