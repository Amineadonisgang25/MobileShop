import React from "react";
import { ProductDetails as ProductDetailsType } from "@/types";
import {useRouter} from "next/router";
import Link from "next/link";

interface ProductDetailsProps {
    product: ProductDetailsType;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const Alpha = useRouter();

    return (
        <div className="col-md-8">
            <div className="product-content-right">
                <div className="product-breadcroumb">
                    <Link href="/">Home</Link>
                     <Link href={`/${Alpha.query.category}`}>{Alpha.query.category}</Link>
                     <Link href={`/${Alpha.query.category}/${product.id}`}> {product.name}</Link>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="product-images">
                            <div className="product-main-img">
                                <img src={`/products-img/${product.imageName}`} alt=""/>
                            </div>
                            <div className="product-gallery">
                                <img src="" alt=""/>
                                <img src="" alt=""/>
                                <img src="" alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="product-inner">
                            <h2 className="product-name">{product.name}</h2>
                            <div className="product-inner-price">
                                <ins>{product.price - product.discountRate}</ins>
                                <del>{product.price}</del>
                            </div>

                            <form action="" className="cart">
                                <div className="quantity">
                                    <input type="number"  className="input-text qty text"
                                           title="Qty" value="1"
                                           name="quantity" min="1" step="1"/>
                                </div>
                                <button className="add_to_cart_button" type="submit">Add to cart
                                </button>
                            </form>

                            <div className="product-inner-category">
                                <h2>product Description</h2>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
