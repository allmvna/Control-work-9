import {Alert, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {deleteTransaction, fetchTransaction} from "../slices/sliceTransaction/sliceTransaction.tsx";
import Loader from "../../UI/Loader/Loader.tsx";
import ModalForm from "../../components/ModalForm/ModalForm.tsx";
import {toggleModal} from "../slices/sliceModal/sliceModal.tsx";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { transactions, isLoading, error } = useAppSelector((state) => state.transaction);

    useEffect(() => {
        dispatch(fetchTransaction());
    }, [dispatch]);

    const deleteThisTransaction = async (id: string) => {
        await dispatch(deleteTransaction(id));
    };

    return (
        <>
            <Typography variant="h4" color="black" textAlign='center' sx={{fontWeight: '600' }}>
                Transactions
            </Typography>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">No data. Try again!</Alert>
            ) : (
            <Grid container spacing={2} sx={{mt: 3}}>
                {transactions.map((transaction) => (
                    <Grid size={12} key={transaction.id}>
                        <Card
                            sx={{
                                minWidth: 275,
                                backgroundColor: "inherit",
                                border: "3px solid",
                                borderRadius: "10px",
                                p: 1,
                            }}
                        >
                            <CardContent
                                sx={{
                                    backgroundColor: "white",
                                    mb: 1,
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Grid size={12}
                                      sx={{
                                          display: "flex",
                                          alignItems: "center"
                                      }}>
                                    <Typography sx={{fontSize: 20, fontWeight: 600, ml: 1}}>
                                        {transaction.categoryName}
                                    </Typography>
                                    <CardActions sx={{ marginLeft: "auto" }}>
                                        <Typography sx={{fontSize: 20, fontWeight: 600, mr: 3}}>{transaction.amount} KGS</Typography>
                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                ml: 1,
                                                mr: 3,
                                                color: transaction.type === 'Income' ? 'green' : (transaction.type === 'Expense' ? 'red' : 'black')
                                            }}
                                        >
                                            {transaction.type}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            sx={{ mr: 2,
                                                backgroundColor: '#1e012b',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onClick={() => {
                                                dispatch(toggleModal({ isOpen: true, modalType: 'transaction' }));
                                            }}
                                        >
                                            <DriveFileRenameOutlineIcon/>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ mr: 2,
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                                '&:hover': {
                                                    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)',
                                                    transform: 'scale(1.05)',
                                                },
                                            }}
                                            onClick={() => deleteThisTransaction(transaction.id)}

                                        >
                                            <DeleteIcon/>
                                        </Button>
                                    </CardActions>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            )}
            <ModalForm/>
        </>
    );
};

export default MainPage;