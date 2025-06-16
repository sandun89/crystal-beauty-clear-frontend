import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

export default function Header(){
    return(
        <header className="w-full h-[75px] bg-red-400 flex justify-center items-center relative">
            <div className="w-[400px] flex justify-evenly text-xl">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/review"}>Reviews</Link>
                <Link to={"/cart"} className="text-3xl absolute right-[25px]"><BsCart4 /></Link>
            </div>
        </header>
    );
}