import {configureStore} from "@reduxjs/toolkit";
import {modalReducer} from "../containers/slices/sliceModal/sliceModal.tsx";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;