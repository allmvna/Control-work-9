import Grid from "@mui/material/Grid2";
import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {addCategory, ICategory, updateCategory} from "../../containers/slices/sliceCategory/sliceCategory.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";

const initialCategories: ICategory = {
    id: '',
    name:'',
    type:'',
};

const FormCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialCategories);
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.category.categories);
    const category = categories.find(c => c.id === id);
    const { isLoading } = useAppSelector((state) => state.category);

    useEffect(() => {
        if (id && category) {
            setFormData(category);
        }
    }, [id, category]);

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
        if (id) {
            await dispatch(updateCategory(formData));
        } else {
            await dispatch(addCategory(formData));
        }
        setFormData(initialCategories);
        navigate("/categories");
        dispatch(toggleModal({ isOpen: false}));
        };

    return (
        <>
        <Typography
            sx={{ mb: 2, textAlign: "center", fontWeight: "bold", color: 'black' }}
            variant="h4"
        >
            {id ? "Edit Category" : "Add Category"}
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
                                <MenuItem value="Income">Income</MenuItem>
                                <MenuItem value="Expense">Expense</MenuItem>
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
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : 'Save'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </>
    );
};

export default FormCategory;