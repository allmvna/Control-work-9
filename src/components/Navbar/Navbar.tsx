import {
    AppBar,
    Box,
    Button,
    Container,
    Toolbar,
    Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 5 }}>
                <AppBar
                    position="static"
                    sx={{
                        padding: "10px",
                        borderBottom: "2px solid #30363D",
                        backgroundColor: '#0D1117',
                    }}
                >
                    <Toolbar>
                        <Container
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                to="/"
                                variant="h5"
                                component={NavLink}
                                sx={{
                                    flexGrow: 1,
                                    textDecoration: "none",
                                    color: "#ffff",
                                }}
                            >
                                Finance Tracker
                            </Typography>
                            <Box>
                                <Button
                                    to="/categories"
                                    variant="outlined"
                                    component={NavLink}
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#0997fd',
                                            boxShadow: '0 0 10px #FFC107',
                                        },
                                    }}
                                >
                                    Categories
                                </Button>
                            </Box>
                            <Button
                                to="/add"
                                variant="outlined"
                                component={NavLink}
                                sx={{
                                    ml: 2,
                                    borderColor: 'white',
                                    color: 'white',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        borderColor: '#0997fd',
                                        boxShadow: '0 0 10px #FFC107',
                                    },
                                }}
                            >
                                Add
                            </Button>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;