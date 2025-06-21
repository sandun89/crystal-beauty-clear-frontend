import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import UserInfo from "./userInfo";
import CartButton from "./cartButton";

export default function Header(){
    return(
        <header className="w-full h-[75px] bg-accent text-white flex justify-center items-center relative">
            <div className="w-[400px] flex justify-evenly text-xl">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/review"}>Reviews</Link>
                <CartButton/>
                <UserInfo/>
            </div>
        </header>
    );
}