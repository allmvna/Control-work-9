import {configureStore} from "@reduxjs/toolkit";
import {modalReducer} from "../containers/slices/sliceModal/sliceModal.tsx";
import {categoryReducer} from "../containers/slices/sliceCategory/sliceCategory.tsx";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    category:categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;