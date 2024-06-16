"use client";
import React,{useEffect} from "react";
import TopCommon from "@/components/product/topCommon";
import { useCookie} from '@/context/CookieContext';
export default function Product({ topSellers, topNew }) {
        const { cookie, getRecentlyViewed } = useCookie();
        const [recentlyViewed, setRecentlyViewed] = React.useState([]);

        useEffect(()=> {
            async function recentlyViewed (){
                const data = await getRecentlyViewed();
                setRecentlyViewed((data));
            }
            recentlyViewed();
        },[cookie])

        return (
            <div className="product-widget-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <TopCommon name="Top Sellers" products={topSellers} />
                        </div>
                        <div className="col-md-4">
                            <TopCommon name="Recently Viewed" products={recentlyViewed}/>
                        </div>
                        <div className="col-md-4">
                            <TopCommon name="Top New" products={topNew} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }