import { GetServerSideProps, NextPage } from 'next';
import ProductList from '@/components/productList';
import {type Category, List, Product, ProductDetails, Products} from '@/types';
import MainLayout from "@/components/mainLayout";
import { useRouter } from "next/router";
interface ProductsPageProps {
    products: Product[];
    categories: List
}
const Search: NextPage<ProductsPageProps> = ({ products,categories }) => {
    const router = useRouter();
    const { q } = router.query; // Retrieve the query parameter
    const queryName = q ? `Search Results for "${q}"` : 'All Products'; // Check if the query exists and format the name
    return (
        <>
            <MainLayout categories={categories.categories}>
                <div className="product-big-title-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product-bit-title text-center">
                                    <h2>{queryName}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList products={products}/>
            </MainLayout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {q} = context.query;
    const query = (q as string || "").toLowerCase();
    const res = await fetch(`http://localhost:3000/products?q=${query}`);
    const allProducts: ProductDetails[] = await res.json();

    //fetching categories data :
    const categoriesRes = await fetch('http://localhost:3000/categories');
    if (!categoriesRes.ok) {
        throw new Error(`Failed to fetch category data: ${categoriesRes.statusText}`);
    }
    const categories: Category[] = await categoriesRes.json();

    return {
        props: {
            products: allProducts,
            categories: categories
        },
    };
};

export default Search;
