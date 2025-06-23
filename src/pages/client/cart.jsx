import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  getCart,
  getTotal,
  getTotalForLabledPrice,
  removeFromCart,
} from "../../utils/cart";

export default function CartView() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartLoaded == false) {
      const cart = getCart();
      setCart(cart);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="w-full h-full flex flex-col items-center mt-[10px]">
      <div className="w-[400px] lg:w-[700px]">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[150px] lg:h-[100px] my-[5px] relative flex shadow-xl shadow-gray-200 border rounded border-gray-300 p-[4px]"
            >
              <button
                onClick={() => {
                  removeFromCart(item.productId);
                  setCartLoaded(false);
                }}
                className="absolute cursor-pointer w-[30px] h-[30px] top-[5px] right-[10px] lg:right-[-40px] lg:top-[35px] flex justify-center items-center text-white bg-red-500 rounded-full border border-red-500"
              >
                <i className="bi bi-trash"></i>
              </button>
              <img
                src={item.image}
                className="h-[100px] lg:h-full rounded-lg aspect-square object-cover"
              />
              <div className="w-full p-[4px] flex flex-col lg:flex-row lg:items-center">
                <div className="w-full lg:w-[400px] h-[95px] overflow-hidden mb-[10px] border-b border-gray-200 lg:border-none">
                  <h1 className="font-bold lg:text-xl">{item.name}</h1>
                  <h1 className="text-gray-500 lg:text-lg">
                    {item.altName.join(" | ")}
                  </h1>
                  <h2 className="text-gray-500 lg:text-lg">
                    {item.price.toFixed(2)}
                  </h2>
                </div>
                <div className="w-[150px] h-[26px] rounded flex flex-row justify-between">
                  <button
                    onClick={() => {
                      addToCart(item, 1);
                      setCartLoaded(false);
                    }}
                    className="w-[30px] h-[30px] flex justify-center items-center bg-gray-400 text-white text-[22px] rounded-full"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <h1 className="text-center text-gray-800">{item.quantity}</h1>
                  <button
                    onClick={() => {
                      addToCart(item, -1);
                      setCartLoaded(false);
                    }}
                    className="w-[30px] h-[30px] flex justify-center items-center bg-gray-400 text-white text-[22px] rounded-full"
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <h1 className="ms-[10px] w-[50px] text-lg">
                    {item.price * item.quantity}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-full flex justify-end mt-2">
          <h1 className="w-[100px] text-xl text-end">Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2">
            {getTotalForLabledPrice().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end mt-2">
          <h1 className="w-[100px] text-xl text-end">Discount</h1>
          <h1 className="w-[100px] text-xl text-end pr-2 border-b-[2px]">
            {(getTotalForLabledPrice() - getTotal()).toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end mt-2">
          <h1 className="w-[100px] text-xl text-end">Net Total</h1>
          <h1 className="w-[100px] text-xl text-end pr-2 border-b-[4px] border-double">
            {getTotal().toFixed(2)}
          </h1>
        </div>
        <div className="w-full flex justify-end mt-[10px]">
          <button
            onClick={() => {
              navigate("/checkout", { state: { items: cart } });
            }}
            className="w-[150px] bg-green-700 text-white border border-green-700 p-[8px] rounded hover:bg-green-200 hover:text-black cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );


  // return (
  //   <div className="w-full h-full flex justify-center p-[20px]">
  //     <div className="w-[700px]">
  //       {cart.map((item, index) => {
  //         return (
  //           <div
  //             key={index}
  //             className="w-full h-[110px] my-[5px] shadow-xl shadow-blue-200 flex justify-between items-center relative"
  //           >
  //             <button
  //               onClick={() => {
  //                 removeFromCart(item.productId);
  //                 setCartLoaded(false);
  //               }}
  //               className="absolute right-[-50px] rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-red-500 cursor-pointer shadow-red-400"
  //             >
  //               <i class="bi bi-trash"></i>
  //             </button>
  //             <img
  //               src={item.image}
  //               alt=""
  //               className="h-full aspect-square object-cover rounded"
  //             />
  //             <div className="h-full max-w-[400px] w-[450px] ml-[5px] overflow-hidden">
  //               <h1 className="text-xl font-bold">{item.name}</h1>
  //               <h2 className="text-lg text-gray-500">
  //                 {item.altName.join(" | ")}
  //               </h2>
  //               <h2 className="text-lg text-gray-500">
  //                 {item.price.toFixed(2)}
  //               </h2>
  //             </div>
  //             <div className="h-full w-[100px] flex justify-center items-center">
  //               <button
  //                 onClick={() => {
  //                   addToCart(item, 1);
  //                   setCartLoaded(false);
  //                 }}
  //                 className="bg-gray-500 text-white rounded-full p-[8px] cursor-pointer"
  //               >
  //                 <i class="bi bi-plus"></i>
  //               </button>
  //               <h1 className="text-xl mx-[10px]">{item.quantity}</h1>
  //               <button
  //                 onClick={() => {
  //                   addToCart(item, -1);
  //                   setCartLoaded(false);
  //                 }}
  //                 className="bg-gray-500 text-white rounded-full p-[8px] cursor-pointer"
  //               >
  //                 <i class="bi bi-dash"></i>
  //               </button>
  //             </div>
  //             <div className="h-full w-[100px] flex justify-center items-center">
  //               <h1 className="text-xl">{item.price * item.quantity}</h1>
  //             </div>
  //           </div>
  //         );
  //       })}
  //       <div className="w-full flex justify-end mt-2">
  //         <h1 className="w-[100px] text-xl text-end">Total</h1>
  //         <h1 className="w-[100px] text-xl text-end pr-2">
  //           {getTotalForLabledPrice().toFixed(2)}
  //         </h1>
  //       </div>
  //       <div className="w-full flex justify-end mt-2">
  //         <h1 className="w-[100px] text-xl text-end">Discount</h1>
  //         <h1 className="w-[100px] text-xl text-end pr-2 border-b-[2px]">
  //           {(getTotalForLabledPrice() - getTotal()).toFixed(2)}
  //         </h1>
  //       </div>
  //       <div className="w-full flex justify-end mt-2">
  //         <h1 className="w-[100px] text-xl text-end">Net Total</h1>
  //         <h1 className="w-[100px] text-xl text-end pr-2 border-b-[4px] border-double">
  //           {getTotal().toFixed(2)}
  //         </h1>
  //       </div>
  //       <div className="w-full flex justify-end mt-[10px]">
  //         <button
  //           onClick={() => {
  //             navigate("/checkout", { state: { items: cart } });
  //           }}
  //           className="w-[150px] bg-green-700 text-white border border-green-700 p-[8px] rounded hover:bg-green-200 hover:text-black cursor-pointer"
  //         >
  //           Checkout
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
