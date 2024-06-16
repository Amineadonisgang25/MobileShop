// store/cartThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the input parameters type for the thunk
interface UpdateCartParams {
    items: Array<{ id: number; name: string; price: number; discountRate: number; quantity?: number; total?: number }>;
    totalQuantity: number;
    totalPrice: number;
}

// Define the return type for the fulfilled state
interface UpdateCartFulfilled {
    items: Array<{ id: number; name: string; price: number; discountRate: number; quantity?: number; total?: number }>;
    totalQuantity: number;
    totalPrice: number;
}

// Define the thunk
export const updateCart = createAsyncThunk<UpdateCartFulfilled, UpdateCartParams, { rejectValue: string }>(
    'cart/updateCart',
    async ({ items, totalQuantity, totalPrice }, { rejectWithValue }) => {
        try {
            const cartId = localStorage.getItem('cartId'); // Assuming cartId is fetched here
            if (!cartId) {
                throw new Error('Cart ID not found');
            }

            const res = await fetch(`http://localhost:3000/carts/${cartId}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items,
                    totalQuantity,
                    totalPrice
                })
            });

            if (!res.ok) {
                throw new Error('Failed to update the cart');
            }

            return { items, totalQuantity, totalPrice };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
