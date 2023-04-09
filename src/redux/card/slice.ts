import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type cart = {
  id: number,
  uri: string,
  price: number,
  title: string,
  quantity: number
}

type CartWithoutQuantity = Omit<cart, 'quantity'>;

type TodoState = {
  List: Array<cart>
}


const initialState: TodoState = {
  List: []
}

export const cardSlice = createSlice({
  initialState,
  name: 'cardSlice',
  reducers: {
    addCart: (state, { payload }: PayloadAction<CartWithoutQuantity>) => {
      const { id } = payload;

      const isItemToCard = state.List.some((item) => item.id === id);
      if (isItemToCard) {
        const indexItemToCard = state.List.findIndex((item) => item.id === id);
        const newList = [...state.List];

        newList[indexItemToCard] = {
          ...newList[indexItemToCard],
          quantity: newList[indexItemToCard].quantity + 1
        }

        state.List = [...newList];
        return;
      }

      state.List = [{ quantity: 1, ...payload }, ...state.List];
    },
    deleteCart: (state, { payload }: PayloadAction<number>) => {
      const indexItemToCard = state.List.findIndex((item) => item.id === payload)
      const listNew = [...state.List];
      listNew.splice(indexItemToCard, 1);
      state.List = listNew;
    }
  }
})

export default cardSlice.reducer

export const { addCart, deleteCart } = cardSlice.actions
