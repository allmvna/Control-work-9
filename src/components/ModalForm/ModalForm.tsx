import {Modal} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import FormCategory from "../FormCategory/FormCategory.tsx";
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";
import FormTransaction from "../FormTransaction/FormTransaction.tsx";
import Grid from "@mui/material/Grid2";

const ModalForm = () => {
    const { isModalOpen, modalType } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleModal({
            isOpen: false,
        }));
    };

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
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
                    {modalType === "category" && <FormCategory />}
                    {modalType === "transaction" && <FormTransaction />}
                </Grid>
            </Modal>
        </>
    );
};

export default ModalForm;