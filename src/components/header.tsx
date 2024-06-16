'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useAppDispatch } from "@/store/hooks";
import {cartActions} from "@/store/CartSlice";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import styles from './header.module.css'; // Assuming you have a CSS module
import axios from 'axios';



export default function  Header()  {
    const location = usePathname();
    //set cookie that will be treated in client side
    const [cookie] = useCookies();
    const [cartId, setCartId] = useState<string | null>(null);
    const [cartData , setCartData] =useState(false);
    const dispatch = useAppDispatch();
    const cart = useSelector((state) => state.cart);
    const [searchQuery, setSearchQuery] = useState('');
    //used to update the state of each
    const [connected , setConnected] = useState(false);
    const router = useRouter();
    const handleSearch = () => {
        if (searchQuery) {
            router.push(`/search?q=${searchQuery}`);
        }
    };
    //click on logIn button Action
    const handleLogInPage = () => {
        if (cookie["authenticated-token"]){
            router.push('/');
        }else {
            console.log(router.query);
            router.push('/login')

        }
    };
    //click on logOut button Action
    const handleLogOutAction =  async () => {
        try {
            await axios.post('/api/logout');
            cookie.remove('authenticated-token'); // Ensure cookie is removed client-side as well
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    useEffect(() => {
        if(cookie["authenticated-token"]){
            setConnected(true);
        }
        else  {setConnected(false)
        }
    }, [cookie]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCartId = localStorage.getItem('cartId');
            if (storedCartId) {
                setCartId(storedCartId);
            } else {
                const fetchCartId = async () => {
                    console.log("hello");
                    try {
                        const response = await fetch("http://localhost:3000/carts", {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const data = await response.json();
                        setCartId(data.id);
                        localStorage.setItem('cartId', data.id);
                    } catch (error) {
                        console.error('Error fetching cart ID:', error);
                    }
                };
                fetchCartId();
            }
        }
    }, []);

    useEffect(()=>{
        const fetchCart = async () => {
            if (cartId ) {
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
    },[cartData]);



    return (
        <div className="site-branding-area">
            <div className="container">
                <div className="row">
                    <div className="col-sm-3">
                        <h1>
                            <Link href="/">
                                <img src='/img/logo.png' alt="logo"/>
                            </Link>
                        </h1>
                    </div>
                    <div className="col-sm-4">
                        {location !== '/cart' && location !== '/checkout' && location !== '/login' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Search Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <input
                                    type="button"
                                    value="Search"
                                    onClick={handleSearch}
                                />
                            </>
                        )}
                    </div>

                    {location !== '/login' && (
                    <div className="col-sm-3">
                        <div className="shopping-item">
                            <Link href="/cart">
                                Cart:
                                <span className="cart-amunt">{cart.totalPrice} €</span>
                                <i className="fa fa-shopping-cart"></i>
                                <span className="product-count">{cart.totalQuantity}</span>
                            </Link>
                        </div>
                    </div> )}

                    {/*add login and logout button inside the header*/}
                    {location != '/login' && (
                    <div className="col-sm-2">
                        <div className={styles.signInContainer}>
                            {connected ? (
                                <div>
                                    <input type="text" value="User Connected" readOnly
                                           className={styles.alreadyConnected}/>
                                    {location != '/checkout' && (
                                        <input type="button" value="Log Out" onClick={handleLogOutAction}
                                               className={styles.logOutButton}/>)}
                                </div>
                            ) : (
                                <input type="button" value="Sign In" onClick={handleLogInPage}
                                       className={styles.signInButton}/>
                            )}
                        </div>
                    </div>)}

                    {location == '/login' && (
                        <div className="col-sm-2">
                        <div className={styles.signInContainer}>
                                    <input type="button" value="Sign Up"
                                           className={styles.signInButton}/>
                            </div>
                        </div> )}

                </div>
            </div>
        </div>
    );
};
