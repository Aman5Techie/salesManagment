import { configureStore } from "@reduxjs/toolkit";
import userreducer from "./slices/userslice";
import activereducer from "./slices/activeorderslice";
import completereducer from "./slices/completedorderslice";
const store = configureStore({
  reducer: {userreducer,activereducer,completereducer},
});

export default store;
