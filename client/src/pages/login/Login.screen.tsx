import { Box, Button, Typography } from "@mui/material";
// import Button from "../../components/Button";

// import SamsungLogo from "../../assets/logo.png";

interface LoginScreenProps {
    onLoginClick: () => void;
}

const LoginScreen = ({ onLoginClick }: LoginScreenProps) => {
    return (
        <Box
            sx={{
                height: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Box
                sx={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
                    boxSizing: "borderBox",
                    color: "rgb(0, 0, 0)",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    fontFamily: "SamsungOne400",
                    fontSize: "14px",
                    fontWeight: "400",
                    lineHeight: "21px",
                    overflowX: "hidden",
                    overflowY: "hidden",
                    textAlign: "left",
                    width: "500px"
                }}
            >
                <Box
                    sx={{
                        alignItems: "center",
                        borderBottomColor: "rgb(0, 0, 0)",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                        boxSizing: "borderBox",
                        color: "rgb(0, 0, 0)",
                        display: "flex",
                        justifyContent: "center",
                        lineHeight: "21px",
                        padding: "35px 35px 20px",
                        textAlign: "left"
                    }}
                >
                    {/* <img src={SamsungLogo} alt="SamsungDevelopersLogo" /> */}
                </Box>

                <Box
                    sx={{
                        padding: "35px 35px 20px"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "24px",
                            textAlign: "center"
                        }}
                    >
                        Samsung Developer Admin Portal
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            marginTop: "50px",
                            marginBottom: "16px",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Button
                            onClick={onLoginClick}
                            sx={{
                                width: "72px"
                            }}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginScreen;
