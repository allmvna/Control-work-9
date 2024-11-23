import {Button, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useAppDispatch} from "../../app/hooks.ts";
import ModalForm from "../../components/ModalForm/ModalForm.tsx";
import {toggleModal} from "../slices/sliceModal/sliceModal.tsx";

const Category = () => {
    const dispatch = useAppDispatch();

    const openModal = () => {
        dispatch(toggleModal(true));
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",

                }}>
                <Grid size={6}>
                    <Typography variant="h4" color="black" textAlign='center' sx={{fontWeight: '600' }}>
                        Categories
                    </Typography>
                </Grid>
                <Grid size={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        size="large"
                        variant="contained"
                        sx={{
                            background: "#0D1117",
                            color: "white",
                            borderRadius: "50px",
                            padding: "12px 24px",
                            fontWeight: "bold",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            "&:hover": {
                                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
                                transform: "scale(1.05)",
                            },
                        }}
                        onClick={openModal}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
            <ModalForm/>
        </>
    );
};

export default Category;