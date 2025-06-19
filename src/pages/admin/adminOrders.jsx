import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { MdClose } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

export default function AdminOrders(){

    const[orders, setOrders] = useState([]);
    const[loaded, setLoaded] = useState(false);
    const[modalIsDisplay, setModalDisplay] = useState(false);
    const[displayOrder, setDisplayOrder] = useState(null);

    useEffect(
        () => {
            if (!loaded) {
                const token = localStorage.getItem("authToken");
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setOrders(response.data);
                        setLoaded(true);
                    }
                )
            }
        }, [loaded]
    );

    function changeOrderStatus(orderId, status){
      const token = localStorage.getItem("authToken");
      axios.put(import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId, {
        status: status
      },{
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(()=>{
        toast.success("Order Status Changed Successfully")
      })
    }
     
    return(
        <div className="w-full h-full">
            {
                loaded ?
                <div className="w-full h-full rounded-2xl">
                    <table className="w-full text-center rounded-2xl backdrop-blur-2xl">
                        <thead>
                            <tr>
                                <th className="p-2">Order ID</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Phone No.</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Total</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(
                                    (order, index) => {
                                        return (
                                          <tr
                                            key={index}
                                            className="border-b-[2px] border-gray-500 cursor-pointer hover:bg-gray-100"
                                          >
                                            <td className="p-2">
                                              {order.orderId}
                                            </td>
                                            <td className="p-2">
                                              {order.email}
                                            </td>
                                            <td className="p-2">
                                              {order.name}
                                            </td>
                                            <td className="p-2">
                                              {order.address}
                                            </td>
                                            <td className="p-2">
                                              {order.phoneNumber}
                                            </td>
                                            <td className="p-2">
                                              <select onChange={ (evt)=> {}} value={order.status}>
                                                <option value="Pending">
                                                  Pending
                                                </option>
                                                <option value="Processing">
                                                  Processing
                                                </option>
                                                <option value="Delivered">
                                                  Delivered
                                                </option>
                                                <option value="Cancelled">
                                                  Cancelled
                                                </option>
                                              </select>
                                            </td>
                                            <td className="p-2">
                                              {order.total.toFixed(2)}
                                            </td>
                                            <td className="p-2">
                                              {new Date(
                                                order.date
                                              ).toDateString()}
                                            </td>
                                            <td className="p-2">
                                              <button
                                                onClick={() => {
                                                  setModalDisplay(true);
                                                  setDisplayOrder(order);
                                                }}
                                                className="text-2xl text-white bg-blue-600 p-[4px] rounded border border-blue-600 cursor-pointer hover:bg-blue-100 hover:text-black"
                                              >
                                                <IoEyeOutline />
                                              </button>
                                            </td>
                                          </tr>
                                        );
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    {
                        modalIsDisplay && 
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[4px]">
                            <div className="w-[600px] h-[600px] max-h-[600px] relative bg-white">
                                <button onClick={()=>{setModalDisplay(false)}} className="w-[40px] h-[40px] absolute top-[-20px] right-[-20px] flex justify-center items-center cursor-pointer rounded-full border-[1px] border-red-500 p-[10px] bg-red-500 text-white hover:bg-red-100 hover:text-black">
                                    <MdClose />
                                </button>
                                <div className="w-full h-[150px] p-[5px] text-lg">
                                    <h1 className="py-[4px]">Order ID: {displayOrder.orderId}</h1>
                                    <h1 className="py-[4px]">Order Date: {new Date(displayOrder.date).toDateString()}</h1>
                                    <h1 className="py-[4px]">Order Status: {displayOrder.status}</h1>
                                    <h1 className="py-[4px]">Order Total: {displayOrder.total.toFixed(2)}</h1>
                                </div>
                                <div className="w-full h-[450px] max-h-[450px] p-[10px] overflow-y-scroll">
                                  {
                                    displayOrder.billItems.map((item, index) => {
                                      return(
                                        <div key={index} className="w-full h-[100px] my-[5px] flex bg-white shadow-2xl">
                                          <img src={item.image} className="w-[100px] h-full aspect-square object-cover" alt="" />
                                          <div className="w-[450px] h-full ms-[10px]">
                                            <h1 className="text-xl">{item.productName}</h1>
                                            <h1 className="text-lg">{item.price.toFixed(2)}</h1>
                                            <h1 className="text-lg">{item.quantity}</h1>
                                          </div>
                                        </div>
                                      );
                                    })
                                  }
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <Loader/>
            }
        </div>
    );
}