import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/slice";
import galleriesReducer from "./gallery/slice";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    auth: userReducer,
    galleries: galleriesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
