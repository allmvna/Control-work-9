import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Category {
    name: string;
    type: string;
}

interface CategoryState {
    isModalOpen: boolean;
    selectedCategory: Category | null;
}

const initialState: CategoryState = {
    isModalOpen: false,
    selectedCategory: null,
};

export const sliceModal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        selectedCategory(state, action: PayloadAction<Category | null>) {
            state.selectedCategory = action.payload;
        },
        toggleModal(state, action: PayloadAction<boolean>) {
            state.isModalOpen = action.payload;
        },
    },
});

export const { selectedCategory, toggleModal } = sliceModal.actions;
export const modalReducer = sliceModal.reducer;