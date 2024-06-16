import CarouselImage from "@/components/carousel";
import Brand from "@/components/brand";
import Blogs from "@/components/blogs";
import type { GetStaticProps } from "next";
import MainLayout from "@/components/mainLayout";
import { NextPage } from "next";
import type { List, Category , Product} from "@/types"

interface HomePageProps extends List {
    topSellers: Product[];
    topNews: Product[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
    try {
        const res = await fetch('http://localhost:3000/categories');
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.statusText}`);
        }
        const fetchedCategories: Category[] = await res.json();

        //fetch top seller and top common :
        const topSellersRes = await fetch("http://localhost:3000/top-sellers-products");
        const topSellers:Product[] = await topSellersRes.json();
        const topNewRes = await fetch("http://localhost:3000/top-new-products");
        const topNew:Product[] = await topNewRes.json();

        return {
            props: { categories: fetchedCategories , topSellers: topSellers, topNews: topNew},
            revalidate: 60 * 60 // 1 hour in seconds, adjust as needed
        };
    } catch (error) {
        return {
            props: { categories: []  , topSellers: [],topNews: []}
        };
    }
}
const Home: NextPage<HomePageProps> = (props) => {
    return (
        <>
            <MainLayout categories={props.categories} >
                <CarouselImage/>
                <Brand/>
                <Blogs topSellers={props.topSellers} topNew={props.topNews} />
            </MainLayout>
        </>
    );
}

export default Home;
