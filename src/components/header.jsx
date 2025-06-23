import { Link, useLocation } from "react-router-dom";
import UserInfo from "./userInfo";
import CartButton from "./cartButton";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuclass, setMenuClass] = useState("");
  const currentPath = location.pathname;

  useEffect(() => {
    const mClass = ((window.innerWidth >= 768) || (menuVisible)) ? "header-item-wrap" : "hidden"; //set initial menu class
    setMenuClass(mClass);

    const handleClick = (evt) => {
      if (evt.target.classList.contains("header-item")){
        setMenuVisible(false)
      }
    }

    //add event listner for capture menu click event
    window.addEventListener("click", handleClick);
    return() => {
      window.removeEventListener("click", handleClick)
    }
  },[menuVisible]);

  return (
    <header className="header">
      <div
        onClick={() => {
          const status = menuVisible ? false : true;
          setMenuVisible(status);
        }}
        className="m-icon flex-center"
      >
        <i class="bi bi-list"></i>
      </div>
      <div className={menuclass}>
        <Link
          to={"/"}
          className={currentPath === "/" ? "header-item-active" : "header-item"}
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className={
            currentPath === "/products" ? "header-item-active" : "header-item"
          }
        >
          Products
        </Link>
        <Link
          to={"/contact"}
          className={
            currentPath === "/contact" ? "header-item-active" : "header-item"
          }
        >
          Contact
        </Link>
      </div>
      <div className="w-full h-[75px] flex items-center justify-end">
          <CartButton />
          <UserInfo />
      </div>
    </header>
  );
}
