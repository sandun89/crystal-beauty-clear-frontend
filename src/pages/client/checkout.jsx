import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { emptyCart } from "../../utils/cart"


export default function CheckoutPage(){
    const location = useLocation();
    const [cart, setCart] = useState(location.state.items);
    const [cartRefresh, setCartRefresh] = useState(false);
    const [orderData, setOrderData] = useState({
      name: "",
      address: "",
      phoneNumber: "",
      billItems: []
    });
    const navigate = useNavigate();

    async function placeOrder(){
      orderData.billItems = []

      for (let i = 0; i < cart.length; i++) {
        const billItem = cart[i];
        orderData.billItems[i] = {
          productId: billItem.productId,
          quantity: billItem.quantity
        };
      }
     
      const token = localStorage.getItem("authToken");
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/order", orderData, {
            headers: {
              Authorization: "Bearer " + token,
            },
          }).then(
            (response) => {
              toast.success("Order Placed Successfully");
              emptyCart();
              window.location.href = "/";
            }).catch((error)=> {
              console.log(error);
              toast.error("Order Placement Failed");
            })
    }

    function handleChange(evt) {
      const {name, value} = evt.target;
      setOrderData((prev) => ({...prev, [name]: value}));
    }

    function getTotal(){
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total;
    }

    function getTotalForLabledPrice(){
      let total = 0;
      cart.forEach((item) => {
        total += item.labledPrice * item.quantity;
      });
      return total;
    }

    return (
      <div className="w-full h-full flex justify-center p-[20px]">
        <div className="w-[700px]">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-[110px] my-[5px] shadow-xl shadow-blue-200 flex justify-between items-center relative"
              >
                <button
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCartLoaded(false);
                  }}
                  className="absolute right-[-50px] rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-red-500 cursor-pointer shadow-red-400"
                >
                  <i class="bi bi-trash"></i>
                </button>
                <img
                  src={item.image}
                  alt=""
                  className="h-full aspect-square object-cover rounded"
                />
                <div className="h-full max-w-[400px] w-[450px] ml-[5px] overflow-hidden">
                  <h1 className="text-xl font-bold">{item.name}</h1>
                  <h2 className="text-lg text-gray-500">
                    {item.altName.join(" | ")}
                  </h2>
                  <h2 className="text-lg text-gray-500">
                    {item.price.toFixed(2)}
                  </h2>
                </div>
                <div className="h-full w-[100px] flex justify-center items-center">
                  <button
                    onClick={() => {
                      cart[index].quantity += 1;
                      setCart(cart);
                      setCartRefresh(!cartRefresh);
                    }}
                    className="bg-gray-500 text-white rounded-full p-[8px] cursor-pointer"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                  <h1 className="text-xl mx-[10px]">{item.quantity}</h1>
                  <button
                    onClick={() => {
                      cart[index].quantity -= 1;
                      cart[index].quantity = (cart[index].quantity <= 0) ? 1 : cart[index].quantity;
                      setCart(cart);
                      setCartRefresh(!cartRefresh);
                    }}
                    className="bg-gray-500 text-white rounded-full p-[8px] cursor-pointer"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                </div>
                <div className="h-full w-[100px] flex justify-center items-center">
                  <h1 className="text-xl">{(item.price * item.quantity).toFixed(2)}</h1>
                </div>
              </div>
            );
          })}
          <div className="w-full flex justify-end mt-4">
            <h1 className="w-[150px] text-xl text-start">Total</h1>
            <h1 className="w-[200px] text-xl text-end pr-2">
              {getTotalForLabledPrice().toFixed(2)}
            </h1>
          </div>
          <div className="w-full flex justify-end mt-2">
            <h1 className="w-[150px] text-xl text-start">Discount</h1>
            <h1 className="w-[200px] text-xl text-end pr-2 border-b-[2px]">
              {(getTotalForLabledPrice() - getTotal()).toFixed(2)}
            </h1>
          </div>
          <div className="w-full flex justify-end mt-2">
            <h1 className="w-[150px] text-xl text-start">Net Total</h1>
            <h1 className="w-[200px] text-xl text-end pr-2 border-b-[6px] border-double">
              {getTotal().toFixed(2)}
            </h1>
          </div>
          <div className="w-full flex justify-end mt-[10px]">
            <h1 className="w-[150px] text-xl text-start">Customer Name</h1>
            <input onChange={handleChange} name="name" type="text" className="w-[200px] border-b-[2px] text-xl text-end focus:outline-none" />
          </div>
          <div className="w-full flex justify-end mt-[10px]">
            <h1 className="w-[150px] text-xl text-start">Address</h1>
            <input onChange={handleChange} name="address" type="text" className="w-[200px] border-b-[2px] text-xl text-end focus:outline-none" />
          </div>
          <div className="w-full flex justify-end mt-[10px]">
            <h1 className="w-[150px] text-xl text-start">Phone Number</h1>
            <input onChange={handleChange} name="phoneNumber" type="text" className="w-[200px] border-b-[2px] text-xl text-end focus:outline-none" />
          </div>
          <div className="w-full flex justify-end mt-[10px]">
            <button
              onClick={ placeOrder }
              className="w-[150px] bg-green-700 text-white border border-green-700 p-[8px] rounded hover:bg-green-200 hover:text-black cursor-pointer"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    );
}