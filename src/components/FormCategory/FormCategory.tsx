import Grid from "@mui/material/Grid2";
import {Button, IconButton, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";

const initialCategories = {
    name:'',
    type:'',
};

const FormCategory = () => {
    const [formData, setFormData] = useState(initialCategories);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleModal(false));
    };

    const onChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const onChangeSelect = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({
            ...prev,
            type: e.target.value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        setFormData(initialCategories);
    };

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    width: "40%",
                    border: "3px solid #052f46",
                    borderRadius: "10px",
                    p: 4,
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "gray",
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <Typography
                    id="modal-title"
                    sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
                    variant="h4"
                >
                    Add Categories
                </Typography>
                <form onSubmit={onSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={onChangeTextField}
                                required
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Select
                                id="type"
                                value={formData.type}
                                onChange={onChangeSelect}
                                displayEmpty
                                fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                            >
                                <MenuItem value="" disabled>
                                    Select Type
                                </MenuItem>
                                <MenuItem value="income">Income</MenuItem>
                                <MenuItem value="expense">Expense</MenuItem>
                            </Select>
                        </Grid>
                        <Grid size={12} sx={{ textAlign: "center" }}>
                            <Button
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "#0D1117",
                                    color: "white",
                                    fontWeight: "bold",
                                    borderRadius: "50px",
                                    "&:hover": {
                                        backgroundColor: "#0a0d12",
                                    },
                                }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </>
    );
};

export default FormCategory;