import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalState {
    isModalOpen: boolean;
    modalType: "category" | "transaction" | null;
}

const initialState: ModalState = {
    isModalOpen: false,
    modalType: null,
};

export const sliceModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal(
            state,
            action: PayloadAction<{ isOpen: boolean; modalType?: "category" | "transaction" | null }>
        ) {
            state.isModalOpen = action.payload.isOpen;
            state.modalType = action.payload.modalType ?? null;
        },
    },
});

export const { toggleModal } = sliceModal.actions;
export const modalReducer = sliceModal.reducer;