import axiosAPI from "../../../axiosAPI.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface ICategory {
    id: string;
    name: string;
    type: string;
}

interface CategoryState{
    categories: ICategory[];
    isLoading: boolean;
    error: boolean;
}


const initialState : CategoryState = {
    categories: [],
    isLoading: false,
    error: false,
};

interface CategoryResponse {
    [id: string]: ICategory;
}

export const addCategory = createAsyncThunk('category/addCategory', async (category: ICategory) => {
    const { data } = await axiosAPI.post('/categories.json', category);
    return { ...category, id: data.name };
});

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
    const { data } = await axiosAPI.get<CategoryResponse>('categories.json');

    return Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
    }));
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id: string) => {
    await axiosAPI.delete(`/categories/${id}.json`);
    return id;
});

export const updateCategory = createAsyncThunk('category/updateCategory', async (category: ICategory) => {
    await axiosAPI.put(`/categories/${category.id}.json`, category);
    return category;
});



export const sliceCategory = createSlice({
    name: 'contact',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload);
            })
            .addCase(addCategory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchCategory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = state.categories.filter(category => category.id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isLoading = false;

                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(updateCategory.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },

});

export const categoryReducer = sliceCategory.reducer;