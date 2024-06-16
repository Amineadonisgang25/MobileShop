'use client';
import { Carousel } from 'react-responsive-carousel';
import { items } from "../../public/Items.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default  function CarouselImage  () {
    const { responsive } = items;
    return(
        <div>
            <Carousel>
                {responsive.map((item) => (
                    <div key={item.id} >
                        <div >
                            <img src={item.imageUrl} alt="slides" />
                        </div>
                        <div>
                            <h2>{item.title}</h2>
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
        ;
}
