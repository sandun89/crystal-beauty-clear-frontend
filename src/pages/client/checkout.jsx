import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
              navigate("/");
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
        <div className="w-full h-full flex flex-col items-center mt-[10px]">
          <div className="w-[400px] lg:w-[700px]">
            {cart.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[150px] lg:h-[100px] my-[5px] relative flex shadow-xl shadow-gray-200 border rounded border-gray-300 p-[4px]"
                >
                 
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
                          cart[index].quantity += 1;
                          setCart(cart);
                          setCartRefresh(!cartRefresh);
                        }}
                        className="w-[30px] h-[30px] flex justify-center items-center bg-gray-400 text-white text-[22px] rounded-full"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                      <h1 className="text-center text-gray-800">{item.quantity}</h1>
                      <button
                        onClick={() => {
                          cart[index].quantity -= 1;
                          cart[index].quantity = (cart[index].quantity <= 0) ? 1 : cart[index].quantity;
                          setCart(cart);
                          setCartRefresh(!cartRefresh);
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
            <Link to="/cart" className="w-[150px] bg-green-700 mx-[5px] text-center text-white border border-green-700 p-[8px] rounded hover:bg-green-200 hover:text-black cursor-pointer">Back to Cart</Link>
            <button
              onClick={ placeOrder }
              className="w-[150px] bg-green-700 mx-[5px] text-center text-white border border-green-700 p-[8px] rounded hover:bg-green-200 hover:text-black cursor-pointer"
            >
              Place Order
            </button>
          </div>
          </div>
        </div>
      );

    return (
      <div className="w-full h-full flex flex-col items-center mt-[10px]">
        <div className="w-[400px] lg:w-[700px]">
          {cart.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-[150px] lg:h-[100px] my-[5px] relative flex shadow-xl shadow-gray-200 border rounded border-gray-300 p-[4px]"
              >
                <img
                  src={item.image}
                  alt=""
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
                </div>
                <div className="w-[150px] h-[26px] rounded flex flex-row justify-between">
                  <button
                    onClick={() => {
                      cart[index].quantity += 1;
                      setCart(cart);
                      setCartRefresh(!cartRefresh);
                    }}
                    className="w-[30px] h-[30px] flex justify-center items-center bg-gray-400 text-white text-[22px] rounded-full"
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                  <h1 className="text-xl text-center w-[30px] mx-[10px]">{item.quantity}</h1>
                  <button
                    onClick={() => {
                      cart[index].quantity -= 1;
                      cart[index].quantity = (cart[index].quantity <= 0) ? 1 : cart[index].quantity;
                      setCart(cart);
                      setCartRefresh(!cartRefresh);
                    }}
                    className="w-[30px] h-[30px] flex justify-center items-center bg-gray-400 text-white text-[22px] rounded-full"
                  >
                    <i className="bi bi-dash"></i>
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