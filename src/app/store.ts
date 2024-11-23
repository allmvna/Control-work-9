import {configureStore} from "@reduxjs/toolkit";
import {modalReducer} from "../containers/slices/sliceModal/sliceModal.tsx";
import {categoryReducer} from "../containers/slices/sliceCategory/sliceCategory.tsx";
import {transactionReducer} from "../containers/slices/sliceTransaction/sliceTransaction.tsx";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    category:categoryReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;