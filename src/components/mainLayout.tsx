import {NextPage} from "next";
import Header from "./header";
import Link from "next/link";
import type {List,Category} from "@/types"
import Footer from "@/components/footer";
import {useRouter} from "next/router";

const MainLayout: NextPage<List & { children: React.ReactNode }> = ({ categories, children }) => {
    const router = useRouter();

    return (
        <>
            <Header/>
            {router.pathname !== "/cart" && router.pathname !== "/checkout"  && (
                <div className="mainmenu-area">
                    <div className="container">
                        <div className="row">
                            <div className="navbar">
                                <ul className="nav navbar-nav navbar-expand">
                                    {categories?.map((item: Category) => (
                                        <li key={item.id}>
                                            <Link href={`/${item.name}`}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <main>
                {children}
            </main>
            <Footer categories={categories} />
        </>
    );
};

export default MainLayout;
