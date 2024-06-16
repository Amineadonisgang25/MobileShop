import { NextPage } from "next";
import ProductDetails from "@/components/product/productDetails";
import { ProductDetails as ProductDetailsType } from "@/types";
import TopCommon from "../../components/product/topCommon";



interface ProductSheetProps {
    productData: ProductDetailsType | null;
}

const ProductSheet: NextPage<ProductSheetProps> = ({ productData }) => {
    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="single-product-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="single-sidebar">
                                <TopCommon name="Recently Viewed" products={[]}/>
                            </div>
                            <div className="single-sidebar">
                                <h2 className="sidebar-title">Others brands</h2>
                                <ul>
                                    <li><a href="">Sony</a></li>
                                    <li><a href="">Samsung</a></li>
                                    <li><a href="">LG</a></li>
                                </ul>
                            </div>
                        </div>
                        <ProductDetails product={productData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductSheet;
