import {NextPage} from "next";

const NewsLetter : NextPage = () => {
    return(
        <>
            <h2 className="footer-wid-title">Newsletter</h2>
            <p>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your
                inbox!</p>
            <div className="newsletter-form">
                <form >
                    <input type="email" placeholder="Type your email"/>
                    <input type="submit" value="SUBSCRIBE"/>
                </form>
            </div>
        </>
    );
}

export default NewsLetter;