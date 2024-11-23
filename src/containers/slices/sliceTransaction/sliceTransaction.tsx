import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosAPI from "../../../axiosAPI.ts";

export interface ITransaction {
    id: string;
    category: string;
    type: string;
    amount: number;
    categoryName?: string;
}

interface TransactionState {
    transactions: ITransaction[];
    isLoading: boolean;
    error: boolean;
}

const initialState: TransactionState = {
    transactions: [],
    isLoading: false,
    error: false,
};

interface TransactionResponse {
    [id: string]: ITransaction;
}

interface ICategory {
    id: string;
    name: string;
}

export const addTransaction = createAsyncThunk('transaction/addTransaction', async (transaction: ITransaction) => {
    const { data } = await axiosAPI.post('/transactions.json', transaction);
    return { ...transaction, id: data.name };
});

export const fetchTransaction = createAsyncThunk('transaction/fetchTransaction', async () => {

    const { data: transactionData } = await axiosAPI.get<TransactionResponse>('transactions.json');
    const transactions = Object.entries(transactionData).map(([key, value]) => ({
        ...value,
        id: key,
    }));

    const { data: categoryData } = await axiosAPI.get<ICategory>('/categories.json');

    const categoryMap = Object.entries(categoryData).reduce((acc, [key, value] ) => {
        acc[key] = value.name;
        return acc;
    }, {} as Record<string, string>);

    const transactionName = transactions.map(transaction => ({
        ...transaction,
        categoryName: categoryMap[transaction.category] || 'Unknown Category',
    }));

    return transactionName;
});

export const deleteTransaction = createAsyncThunk('transaction/deleteTransaction', async (id: string) => {
    await axiosAPI.delete(`/transactions/${id}.json`);
    return id;
});

export const updateTransaction = createAsyncThunk('transaction/updateTransaction', async (transaction: ITransaction) => {
    await axiosAPI.put(`/transactions/${transaction.id}.json`, transaction);
    return transaction;
});


const sliceTransaction = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions.push(action.payload);
            })
            .addCase(addTransaction.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(fetchTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = action.payload;
            })
            .addCase(fetchTransaction.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.transactions = state.transactions.filter(category => category.id !== action.payload);
            })
            .addCase(deleteTransaction.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(updateTransaction.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {
                state.isLoading = false;

                const index = state.transactions.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.transactions[index] = action.payload;
                }
            })
            .addCase(updateTransaction.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const transactionReducer = sliceTransaction.reducer;
