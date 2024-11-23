import {Modal} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import FormCategory from "../FormCategory/FormCategory.tsx";
import {toggleModal} from "../../containers/slices/sliceModal/sliceModal.tsx";

const ModalForm = () => {
    const { isModalOpen } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(toggleModal(false));
    };

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <FormCategory/>
            </Modal>
        </>
    );
};

export default ModalForm;