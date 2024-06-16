import ProductList from "@/components/productList";
import type { List, Category, Product } from "@/types";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import MainLayout from "@/components/mainLayout";
import { useRouter } from "next/router";
interface CategoryPageProps extends List {
    products: Product[];
    categories: Category[]
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async (context) => {
    const category = context.params?.category as string;
    try {
        // Fetch category data
        const categoriesRes = await fetch('http://localhost:3000/categories');
        if (!categoriesRes.ok) {
            throw new Error(`Failed to fetch category data: ${categoriesRes.statusText}`);
        }
        const categories: Category[] = await categoriesRes.json();
        const matchedCategory = categories.find(cat => cat.name === category);
        const productListId = matchedCategory ? matchedCategory.productListId : null;

        // Fetch product data
        const productsRes = await fetch(`http://localhost:3000/products-lists/${productListId}`);
        if (!productsRes.ok) {
            throw new Error(`Failed to fetch products data: ${productsRes.statusText}`);
        }
        const data: {id:number , name: string , items: Product[] } = await productsRes.json();

        // Combine category and product data
        const categoryWithProducts: CategoryPageProps = {
            categories: categories,
            products: []
        };
        categoryWithProducts.products = data?.items ||[];

        return {
            props: categoryWithProducts,
            revalidate: 60 * 60 // 1 hour in seconds, adjust as needed
        };
    } catch (error) {
        return {
            props: {
                categories: [],
                products: []
            }
        };
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    try {
        const res = await fetch('http://localhost:3000/categories');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const categories: Category[] = await res.json();

        // Generate the paths for each category
        const paths = categories.map(category => ({
            params: { category: category.name } // assuming your category object has a 'name' property
        }));

        return {
            paths,
            fallback: false // or 'blocking' if you want to
        };
    } catch (error) {
        return {
            paths: [],
            fallback: false
        };
    }
}

const CategoryPage: NextPage<CategoryPageProps> = (props) => {
    const router = useRouter();
    const category = router.query.category;
    return (
        <>
            <MainLayout categories={props.categories}>
                <div className="product-big-title-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product-bit-title text-center">
                                    <h2>{category}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ProductList products={props.products} />
            </MainLayout>
        </>
    );
}

export default CategoryPage;
