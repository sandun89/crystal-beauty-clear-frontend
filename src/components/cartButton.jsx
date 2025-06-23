import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getCart } from "../utils/cart";

export default function CartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const cart = getCart();
    setItemCount(cart.length);
    setRefresh(false);

    const handleClick = () => {
      setRefresh(true)
    }
    window.addEventListener("click", handleClick);
    return() => {
      window.removeEventListener("click", handleClick)
    }
  }, [refresh]);

  return (
    <Link to="/cart" className="text-3xl me-[5px] rounded-full relative">
      <BsCart4 />
      { itemCount != 0 &&
        <h2 className="absolute w-[20px] h-[20px] text-[12px] flex justify-center items-center rounded-full text-black bg-white top-[-5px] right-[-5px]">
          {itemCount}
        </h2>
      }
    </Link>
  );
}
