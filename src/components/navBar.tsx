import Link from "next/link";
import {NextPage} from "next";

type Categorie = {
    id: string
    name: string
    productListId: string
}
type List = {
    data: [Categorie]
}
const  NavBar : NextPage <List>=   ({data}) => {
    return (
        <div className="mainmenu-area">
            <div className="container">
                <div className="row">
                    <div className="navbar">
                        <ul className="nav navbar-nav navbar-expand">
                            {data.map((item:Categorie) => (
                                <li key={item.id}>
                                    <Link href={`/${item.name}`}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default NavBar;

