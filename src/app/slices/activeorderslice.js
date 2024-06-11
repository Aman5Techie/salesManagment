import { createSlice } from "@reduxjs/toolkit";
import orders from "../../database/orders";
import { current, produce } from "immer";
import _ from "lodash";

const initialState = {
  activeorders: orders.filter((e) => !e.paid),
};

export const userinfoSlice = createSlice({
  name: "activeorder",
  initialState,
  reducers: {
    addactiveOrder: (state, action) => {
      state.activeorders.push(action.payload);
    },
    removeActiveOrder: (state, action) => {

      const id = action.payload;
      const orderdata = _.cloneDeep(current(state.activeorders));
      let orderData = orderdata.filter((i) => i.id !== id);
      state.activeorders = orderData;
    },
    changeActiveOrder(state, actions) {
      const data = actions.payload;
      const comingData = data.data;
      const orderdata = _.cloneDeep(current(state.activeorders));
      console.log(data);
      let orderData = orderdata.find((i) => i.id === data.id);
      for (let key in comingData) {
        if (comingData[key] !== null) {
          orderData[key] = comingData[key];
        }
      }
      state.activeorders = orderdata;
    },
  },
});

export const { addactiveOrder, removeActiveOrder, changeActiveOrder } =
  userinfoSlice.actions;
export default userinfoSlice.reducer;
