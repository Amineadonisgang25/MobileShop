import { NextPage, GetServerSideProps } from "next";
import ProductSheet from "@/components/product/productSheet";
import {type Category, ProductDetails,List} from "@/types";
import MainLayout from "@/components/mainLayout";

interface ProductSheetPageProps {
    productData: ProductDetails | null;
    categories: Category[]
}

const ProductSheetPage: NextPage<ProductSheetPageProps> = ({ productData, categories }) => {
    return (
        <>
            <MainLayout categories={categories}>
                <ProductSheet productData={productData} />
            </MainLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<ProductSheetPageProps> = async (context) => {
    try {
        const productId = context.query.details as string;
        // Fetch product data
        const res = await fetch(`http://localhost:3000/products/${productId}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch product data: ${res.statusText}`);
        }
        const data: ProductDetails = await res.json();

        // Find the product with the given name
        const productData = data || null;

        //test the categories and pass them as a props :
        const categoriesRes = await fetch('http://localhost:3000/categories');
        if (!categoriesRes.ok) {
            throw new Error(`Failed to fetch category data: ${categoriesRes.statusText}`);
        }
        const categories: Category[] = await categoriesRes.json();
        return {
            props: {
                productData,
                categories
            },
        };
    } catch (error) {
        console.error("Error fetching product data:", error);
        return {
            props: {
                productData: null,
                categories: []
            }
        };
    }
};

export default ProductSheetPage;
