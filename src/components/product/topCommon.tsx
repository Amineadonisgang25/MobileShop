'use client';
import { usePathname } from 'next/navigation';
import React, {useState,useEffect} from "react";
import { useCookie} from '@/context/CookieContext';
const TopCommon = (props) => {
    const location = usePathname();
    const isPathLong = location.length > 1;
    const [showAll , setShowAll] = useState(false);
    const [recently , setRecentlyViewed] = useState([]);
    const { cookie, getRecentlyViewed} = useCookie();

    const handleClickViewAll = () => {
        setShowAll(true);
    }
    const array = props.products && props.products.length > 0 ? props.products : [];

    useEffect(()=> {
        async function recentlyViewed (){
            let data = await getRecentlyViewed();
            setRecentlyViewed((data));
        }
        recentlyViewed();
    },[cookie])

    return (
        <>
            <h2 className={isPathLong ? "sidebar-title" : "product-wid-title"}>
                {props.name}
            </h2>
            <button
                onClick={handleClickViewAll}
                className="wid-view-more"
                style={{display: isPathLong ? 'none' : 'block'}}
            >
                View All
            </button>
            <ul>
                {showAll && array.map((item) =>
                    <div className="single-wid-product" key={item.id}>
                        <img className="product-thumb" src={`/products-img/${item.imageName}`}/>
                        <h2>{item.name}</h2>
                        <div className="product-wid-rating">
                        </div>
                        <div className="product-wid-price">
                            <ins>
                                {item.price - item.discountRate}
                            </ins>
                            <del>
                                {item.price}
                            </del>
                        </div>

                    </div>
                )}
                {!showAll && array.slice(0, 3).map((item) =>
                    <div className="single-wid-product" key={item.id}>
                        <img className="product-thumb" src={`/products-img/${item.imageName}`}/>
                        <h2>{item.name}</h2>
                        <div className="product-wid-rating">
                            <i className="fa fa-star"> </i>
                        </div>
                        <div className="product-wid-price">
                            <ins>
                                {item.price - item.discountRate}
                            </ins>
                            <del>
                                {item.price}
                            </del>
                        </div>

                    </div>
                )}

                {array.length===0 && recently.length>0 && recently.slice(0,3).map((item) =>
                    <div className="single-wid-product" key={item.id}>
                        <img className="product-thumb" src={`/products-img/${item.imageName}`}/>
                        <h2>{item.name}</h2>
                        <div className="product-wid-rating">
                            <i className="fa fa-star"> </i>
                        </div>
                        <div className="product-wid-price">
                            <ins>
                                {item.price - item.discountRate}
                            </ins>
                            <del>
                                {item.price}
                            </del>
                        </div>

                    </div>
                )}

            </ul>
        </>
    );
}
export default TopCommon;