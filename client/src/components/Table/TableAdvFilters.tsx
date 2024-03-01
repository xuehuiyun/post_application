import { Box, BoxProps, Typography } from "@mui/material";
import Button from "../Button";

export interface AdvancedFilterItem {
    label: string;
    filter: React.ReactNode | React.ReactNode[];
}

interface AdvancedFilterContainerProps {
    sx?: BoxProps["sx"];
    items: AdvancedFilterItem[];
    onClearFilter: React.MouseEventHandler<HTMLButtonElement>;
    onApplyFilter: React.MouseEventHandler<HTMLButtonElement>;
}

const AdvancedFilterContainer = ({
    sx,
    items,
    onClearFilter,
    onApplyFilter
}: AdvancedFilterContainerProps) => {
    return (
        <Box
            sx={[
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    gap: "36px",
                    padding: "30px",
                    bgcolor: "#fafafa",
                    marginBottom: "20px"
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {Array.isArray(items) && items.length > 1 && (
                <>
                    <Box
                        sx={[
                            {
                                display: "flex",
                                flexDirection: "row",
                                gap: "150px"
                            }
                        ]}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "150px 1fr 150px 150px 1fr",
                                rowGap: "36px",
                                flexGrow: 1
                            }}
                        >
                            {items.map((cur, i) => {
                                return (
                                    <>
                                        <Typography
                                            width={"150px"}
                                            fontFamily={"fantasy"}
                                            fontSize={"14px"}
                                            marginTop={"auto"}
                                            marginBottom={"auto"}
                                            marginRight={"35px"}
                                        >
                                            {cur.label}
                                        </Typography>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            {cur.filter}
                                        </Box>
                                        {/* Center divider */}
                                        {i % 2 === 0 ? <div></div> : ""}
                                    </>
                                );
                            })}
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <Button
                            size="medium"
                            type="default"
                            onClick={onClearFilter}
                        >
                            Clear Filter
                        </Button>
                        <Button
                            size="medium"
                            type="default"
                            onClick={onApplyFilter}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </>
            )}
            {(!Array.isArray(items) || items.length === 1) && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "minmax(200px, 50%) minmax(200px, 50%)",
                        gap: "32px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex"
                        }}
                    >
                        <Typography
                            width={"150px"}
                            fontFamily={"fantasy"}
                            fontSize={"14px"}
                            marginTop={"auto"}
                            marginBottom={"auto"}
                            marginRight={"35px"}
                        >
                            {items[0].label}
                        </Typography>
                        <Box sx={{ width: "100%" }}>{items[0].filter}</Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            flexGrow: 1,
                            alignItems: "center",
                            gap: "10px"
                        }}
                    >
                        <Button
                            size="medium"
                            type="default"
                            onClick={onClearFilter}
                        >
                            Clear Filter
                        </Button>
                        <Button
                            size="medium"
                            type="default"
                            onClick={onApplyFilter}
                        >
                            Apply Filters
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AdvancedFilterContainer;
