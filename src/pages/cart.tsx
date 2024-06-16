import {type GetStaticProps, NextPage} from "next";
import Cart from "@/components/cart";
import React from "react";
import MainLayout from "@/components/mainLayout";
import type {Category, List} from "@/types";

interface  CartProps {
    categories: Category[]
}
export const getStaticProps: GetStaticProps<CartProps> = async () => {
    try {
        const res = await fetch('http://localhost:3000/categories');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const categories: Category[] = await res.json();
        return {
            props: { categories },
            revalidate: 60 * 60 // 1 hour in seconds, adjust as needed
        };
    } catch (error) {
        return {
            props: { categories: [] }
        };
    }
}


const CartPage : NextPage<List> =  (props) =>  {
    return (
        <>
           <MainLayout categories={props.categories}>
               <Cart/>
           </MainLayout>
        </>
    );
}
export default CartPage;