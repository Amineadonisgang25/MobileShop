import {type GetStaticProps, NextPage} from "next";
import MainLayout from "../components/mainLayout";
import Checkout from "@/components/checkout";
import type {Category} from "@/types";
interface  CheckoutProps {
    categories: Category[]
}

export const getStaticProps: GetStaticProps<CheckoutProps> = async () => {
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

const CheckoutPage : NextPage<CheckoutProps> =  (props) =>  {
    return (<>
        <>
            <MainLayout categories={props.categories}>
                <Checkout/>
            </MainLayout>
        </>
    </>)
}
export default CheckoutPage;