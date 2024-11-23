import {Alert, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import ModalForm from "../../components/ModalForm/ModalForm.tsx";
import {toggleModal} from "../slices/sliceModal/sliceModal.tsx";
import {deleteCategory, fetchCategory} from "../slices/sliceCategory/sliceCategory.tsx";
import {useEffect} from "react";
import Loader from "../../UI/Loader/Loader.tsx";

const Category = () => {
    const dispatch = useAppDispatch();
    const { categories, error, isLoading  } = useAppSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const handleOpenCategory = () => {
        dispatch(toggleModal({ isOpen: true, modalType: "category" }));
    };

    function deleteThisCategory(id: string) {
        dispatch(deleteCategory(id));
    }

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: '20px',

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
                        onClick={handleOpenCategory}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">No data. Try again!</Alert>
            ) : (
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid size={12} key={category.id}>
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
                                        {category.name}
                                    </Typography>
                                    <CardActions sx={{ marginLeft: "auto" }}>
                                        <Typography
                                            sx={{
                                                fontSize: 20,
                                                fontWeight: 600,
                                                ml: 1,
                                                mr: 3,
                                                color: category.type === 'Income' ? 'green' : (category.type === 'Expense' ? 'red' : 'black')
                                            }}
                                        >
                                            {category.type}
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
                                                dispatch(toggleModal({ isOpen: true, modalType: 'category' }));
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
                                            onClick={() => deleteThisCategory(category.id)}

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

export default Category;