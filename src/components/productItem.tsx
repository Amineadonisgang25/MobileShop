"use client";
import React from 'react';
import {Product} from "@/types";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import {cartActions} from "@/store/CartSlice";
import {useEffect,useState} from "react";
import {useSelector} from "react-redux";
import { useCookie} from '@/context/CookieContext';

interface Props {
    item: Product;
}

export default function ProductItem ({item}:Props) {

    const [cartId, setCartId] = useState(null);
    const [product , setProduct] = useState([]);
    const currentPath = usePathname();
    const dispatch = useAppDispatch();
    const cart = useSelector((state) => state.cart );
    const { cookie, setCookieValue} = useCookie();


    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCartId  = localStorage.getItem('cartId');
            setCartId(storedCartId);
        }
    }, []);

    useEffect(() => {
        const updateCart = async () => {
            try {
                const res = await fetch(`http://localhost:3000/carts/${cartId}`, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                        totalPrice: cart.totalPrice
                    })
                });
                if (!res.ok) {
                    throw new Error('Failed to update the cart');
                }
            } catch (error) {
                console.error('Error updating the cart:', error);
            }
        };
        if (cartId && cart.items.length > 0) {
            updateCart();
        }
    }, [cart.items, cart.totalQuantity, cart.totalPrice, cartId]);

    const handleClick = (id) => {
        if (id){
            const currentProductIds = cookie;
            const index = currentProductIds.split("/").indexOf(id.toString());
            if (index !== 0) {
                let updatedProductIds = id+ "/" + currentProductIds;
                setCookieValue('productsId', updatedProductIds);
            }
        }
    }
    const handleClickCartUpdate = (Obj)  => {
        dispatch(cartActions.addItemToCart(Obj));
    }

    return (
        <div className="col-md-3 col-sm-3" key={item?.id}>
            <div className="single-shop-product">
                <div className="product-upper">
                    <img src={`products-img/${item?.imageName}`} alt={item?.name} width="100" />
                </div>
                <h2>
                    <Link href={`${currentPath}/${item?.id}`} onClick={() => handleClick(item.id)}>{item?.name} </Link>
                </h2>
                <div className="product-carousel-price">
                    <ins>${item?.price - item?.discountRate}</ins>
                    <del>${item?.price}</del>
                </div>
                <div>
                    <a  className="add_to_cart_button" onClick={() => handleClickCartUpdate(item)}>Add to cart</a>
                </div>
            </div>
        </div>
    );
};

