import { Link } from "react-router-dom";

export default function Header(){
    return(
        <header className="w-full h-[75px] bg-red-400 flex justify-center items-center">
            <div className="w-[400px] flex justify-evenly text-xl">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>Products</Link>
                <Link to={"/contact"}>Contact</Link>
                <Link to={"/review"}>Reviews</Link>
            </div>
        </header>
    );
}