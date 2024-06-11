import { createSlice } from "@reduxjs/toolkit";
import orders from "../../database/orders"
import orderData from "../../database/orders";



const initialState = {
  completeorders: orders.filter((e)=>e.paid),
};

export const completeOrderSlice = createSlice({
  name: "completeorders",
  initialState,
  reducers: {
    addCompleteOrder: (state, action) => {
        state.completeorders.push(action.payload);
    },
    removeCompleteOrder: (state, action) => {
      const id = action.payload;
      const afterremove = state.activeorders.filter((e) => {
        return e.id != id;
      });
      state.activeorders = afterremove;
    },
  },
});

export const { addCompleteOrder, removeCompleteOrder } = completeOrderSlice.actions;
export default completeOrderSlice.reducer;
