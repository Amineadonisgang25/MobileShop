import {NextPage} from "next";
import type {List} from "@/types"

const Categorie : NextPage<List>  = ({categories}) => {
    return (
        <div>
            <h2 className="footer-wid-title">Categories</h2>
            <ul>
                {categories?.map((item) => <li key={item.id}><a href="">{item.name}</a></li>)}
            </ul>
        </div>
    );
}

export default Categorie;