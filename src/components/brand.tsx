import {NextPage} from "next";

const Brand :NextPage =  () => {
    return(
        <div className="brands-area">
            <div className="zigzag-bottom"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="brand-wrapper">
                            <div className="brand-list">
                                <img src="img/brand1.png"/>
                                <img src="img/brand2.png"/>
                                <img src="img/brand3.png"/>
                                <img src="img/brand4.png"/>
                                <img src="img/brand5.png"/>
                                <img src="img/brand6.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
        ;
}

export default Brand;