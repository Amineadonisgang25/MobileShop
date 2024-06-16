import {NextPage} from "next";
import Store from "@/components/footer/store";
import Categorie from "@/components/footer/categorie";
import NewsLetter from "@/components/footer/newsLetter";
import type {List} from "@/types"

const Footer :NextPage<List> = ({categories}) => {
    return (
        <div className="footer-top-area">
            <div className="zigzag-bottom"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6">
                        <div className="footer-about-us"><Store/></div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="footer-menu"><Categorie categories={categories}/></div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="footer-newsletter"><NewsLetter/></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;