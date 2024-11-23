import {Button, CircularProgress, MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import Grid from "@mui/material/Grid2";
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    addTransaction,
    ITransaction,
    updateTransaction
} from "../../containers/slices/sliceTransaction/sliceTransaction.tsx";
import {useNavigate, useParams} from 'react-router-dom';
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";

const initialTransactionState: ITransaction = {
    id: '',
    category: '',
    type: '',
    amount: 0,
};

const FormTransaction = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialTransactionState);
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.category);
    const transaction = useAppSelector(state => state.transaction.transactions.find(t => t.id === id));
    const { isLoading  } = useAppSelector((state) => state.transaction);

    useEffect(() => {
        if (id && transaction) {
            setFormData(transaction);
        } else if (id && !transaction) {
        }
    }, [id, transaction]);

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

    const onChangeCategory = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({
            ...prev,
            category: e.target.value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            await dispatch(updateTransaction(formData));
        } else {
            await dispatch(addTransaction(formData));
        }
        setFormData(initialTransactionState);
        navigate('/');
        dispatch(toggleModal({ isOpen: false}));
    };

    return (
        <>
                <Typography
                    id="modal-title"
                    sx={{ mb: 2, textAlign: "center", fontWeight: "bold", color: 'black' }}
                    variant="h4"
                >
                    {id ? "Edit Transaction" : "Add Transaction"}
                </Typography>
                <form onSubmit={onSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="amount"
                                label="Amount"
                                variant="outlined"
                                name="amount"
                                value={formData.amount}
                                onChange={onChangeTextField}
                                required
                                type="number"
                                sx={{
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Select
                                id="category"
                                value={formData.category}
                                onChange={onChangeCategory}
                                displayEmpty
                                fullWidth
                                sx={{ backgroundColor: "white", borderRadius: "10px" }}
                            >
                                <MenuItem value="" disabled>
                                    Select Category
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
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
                        <Grid size={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    backgroundColor: '#0D1117',
                                    color: 'white',
                                    borderRadius: '10px',
                                    padding: '10px',
                                    fontWeight: 'bold',
                                }}
                            >
                                {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : 'Save'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
        </>
    );
};

export default FormTransaction;
