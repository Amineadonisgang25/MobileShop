'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cartActions } from "@/store/CartSlice";
import { updateCart } from "@/store/cartThunks";
import { roundNumber } from "@/utils/formatUtils";
import Link from "next/link";

export default function Cart() {
    const [cartData, setCartData] = useState(false);
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart);
    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;

    const handleIncreaseQuantity = (item: any) => {
        console.log(item.price,item.discountRate , item.total);
        dispatch(cartActions.addItemToCart(item));
        dispatch(updateCart({
            items: cart.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 , total: item.total + item.price - item.discountRate } : i),
            totalQuantity: cart.totalQuantity + 1,
            totalPrice: cart.totalPrice + item.price - item.discountRate
        }));
    };

    const handleDecreaseQuantity = (item: any) => {
        if (item.quantity > 1) {
            dispatch(cartActions.deleteItemFromCart(item));
            dispatch(updateCart({
                items: cart.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 , total:item.total - item.price + item.discountRate } : i),
                totalQuantity: cart.totalQuantity - 1,
                totalPrice: cart.totalPrice - item.price + item.discountRate
            }));
        } else {
            handleRemoveItem(item);
        }
    };

    const handleRemoveItem = (item: any) => {
        dispatch(cartActions.removeItemFromCart(item));
        dispatch(updateCart({
            items: cart.items.filter(i => i.id !== item.id),
            totalQuantity: cart.totalQuantity - item.quantity,
            totalPrice: cart.totalPrice - item.total
        }));
    };

    useEffect(() => {
        const fetchCart = async () => {
            if (cartId) {
                try {
                    const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    setCartData(true);
                    dispatch(cartActions.setCart(data));
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };
        if (!cartData) {
            fetchCart();
        }
    }, [cartData, cartId, dispatch]);
    return (
        <>
            <div className="single-product-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-content-right">
                                <div className="woocommerce">
                                    <table cellSpacing="0" className="shop_table cart">
                                        <thead>
                                        <tr>
                                            <th className="product-remove">&nbsp;</th>
                                            <th className="product-thumbnail">&nbsp;</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {cart.items.map((item) => (
                                            <tr className="cart_item" key={item.id}>
                                                <td className="product-remove">
                                                    <a title="Remove this item" className="remove" href="#"
                                                       onClick={() => handleRemoveItem(item)}
                                                    >×</a>
                                                </td>
                                                <td className="product-thumbnail">
                                                    <a href="single-product.html">
                                                        <img width="145" height="145" alt={item.name}
                                                             className="shop_thumbnail" src={`products-img/${item.imageName}`}/>
                                                    </a>
                                                </td>
                                                <td className="product-name">
                                                    <a href="single-product.html">{item.name}</a>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">{item.price}€</span>
                                                </td>
                                                <td className="product-quantity">
                                                    <div className="quantity buttons_added">
                                                        <input type="button" className="minus" value="-"
                                                               onClick={() => handleDecreaseQuantity(item)}
                                                        />
                                                        <input type="number" size="4" className="input-text qty text"
                                                               title="Qty" value={item.quantity} min="0" step="1"/>
                                                        <input type="button" className="plus" value="+"
                                                               onClick={() => handleIncreaseQuantity(item)}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="product-subtotal">
                                                    <span
                                                        className="amount">{(item.price - item.discountRate) * item.quantity}€</span>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="actions" colSpan="6">
                                                <Link href="/checkout" className="checkout-button button alt wc-forward">
                                                    Checkout
                                                </Link>
                                            </td>
                                        </tr>
                                        </tbody>

                                    </table>


                                    <div className="cart-collaterals">


                                        <div className="cross-sells">
                                            <h2>You may be interested in...</h2>
                                            <ul className="products">
                                                <li className="product">
                                                    <a href="single-product.html">
                                                        <img width="325" height="325" alt="T_4_front"
                                                             className="attachment-shop_catalog wp-post-image"
                                                             src="img/product-2.jpg"/>
                                                        <h3>Ship Your Idea</h3>
                                                        <span className="price"><span className="amount">20.00 €</span></span>
                                                    </a>

                                                    <a className="add_to_cart_button" data-quantity="1"
                                                       data-product_sku=""
                                                       data-product_id="22" rel="nofollow" href="single-product.html">Add
                                                        to
                                                        Cart</a>
                                                </li>

                                                <li className="product">
                                                    <a href="single-product.html">
                                                        <img width="325" height="325" alt="T_4_front"
                                                             className="attachment-shop_catalog wp-post-image"
                                                             src="img/product-4.jpg"/>
                                                        <h3>Ship Your Idea</h3>
                                                        <span className="price"><span className="amount">20.00 €</span></span>
                                                    </a>

                                                    <a className="add_to_cart_button" data-quantity="1"
                                                       data-product_sku=""
                                                       data-product_id="22" rel="nofollow" href="single-product.html">Add
                                                        to
                                                        Cart</a>
                                                </li>
                                            </ul>
                                        </div>


                                        <div className="cart_totals ">
                                            <h2>Cart Totals</h2>

                                            <table cellSpacing="0">
                                                <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>Cart Subtotal</th>
                                                    <td><span className="amount">{cart.totalPrice} €</span></td>
                                                </tr>

                                                <tr className="shipping">
                                                    <th>Taxe (20%)</th>
                                                    <td>{roundNumber(cart.totalPrice * 0.2)}  €</td>
                                                </tr>

                                                <tr className="order-total">
                                                    <th>Order Total</th>
                                                    <td><strong><span className="amount">{roundNumber(cart.totalPrice + 0.2*cart.totalPrice)} €</span></strong></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
