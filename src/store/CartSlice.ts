// store/CartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCart } from '@/store/cartThunks';
import {Product, ProductValue} from '@/types'; // Assuming you have defined Product type

interface CartState {
    totalQuantity: number;
    items: ProductValue[];
    totalPrice: number;
}

const initialState: CartState = {
    totalQuantity: 0,
    items: [],
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<Partial<CartState>>) => {
            state.items = action.payload.items ?? [];
            state.totalQuantity = action.payload.totalQuantity ?? 0;
            state.totalPrice = action.payload.totalPrice ?? 0;
        },
        addItemToCart: (state, action: PayloadAction<ProductValue>) => {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.total = existingItem.quantity * (newItem.price - newItem.discountRate);
            } else {
                newItem.quantity = 1;
                newItem.total = newItem.price - newItem.discountRate;
                state.items.push(newItem);
            }
            state.totalQuantity++;
            state.totalPrice += newItem.price - newItem.discountRate;
        },
        deleteItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
            const itemId = action.payload.id;
            const existingItem = state.items.find((item) => item.id === itemId);
            if (existingItem) {
                const itemPrice = existingItem.price - existingItem.discountRate;
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                    existingItem.total = existingItem.quantity * itemPrice;
                    state.totalQuantity--;
                    state.totalPrice -= itemPrice;
                } else {
                    state.items = state.items.filter((item) => item.id !== itemId);
                    state.totalQuantity--;
                    state.totalPrice -= itemPrice;
                }
            }
        },
        removeItemFromCart: (state, action: PayloadAction<{ id: number }>) => {
            const itemId = action.payload.id;
            const existingItemIndex = state.items.findIndex((item) => item.id === itemId);
            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.total;
                state.items.splice(existingItemIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCart.fulfilled, (state) => {
                state.updateCartPending = null;
            })
            .addCase(updateCart.rejected, (state, action) => {
                console.error('Error updating the cart:', action.payload);
                state.updateCartPending = null;
            });
    },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
