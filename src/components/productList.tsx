import ProductItem from "./productItem";
import { Product } from "@/types";
import React from "react";
import {NextPage} from "next";

interface Props {
    products: Product[];
}


const ProductList: NextPage<Props> = ({ products }) => {
    return (
            <div>
                <div className="single-product-area">
                    <div className="zigzag-bottom"></div>
                    <div className="container">
                        <div className="row">
                            {products?.map((item) => (
                                <ProductItem key={item.id}
                                             item={item}/>
                            ))}
                            {products?.length ===0  && <h1>No Item to show</h1>}
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ProductList;
