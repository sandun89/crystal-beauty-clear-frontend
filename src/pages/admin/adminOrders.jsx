import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import OrderCard from "../../components/orderCard";

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
        toast.success("Order Status Changed Successfully");
        setLoaded(false);
      }).catch((error) => {
        console.log(error)
      })
    }
     
    return(
      <div className="w-full h-full p-2 rounded-lg">
        <div className="w-full h-full overflow-y-scroll">
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
                                              <select onChange={ (evt)=> {
                                                changeOrderStatus(order.orderId, evt.target.value);
                                              }} value={order.status}>
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
                                                className="text-xl w-[32px] aspect-square flex items-center justify-center text-white bg-blue-600 rounded border border-blue-600 cursor-pointer hover:bg-blue-100 hover:text-black"
                                              >
                                                <i className="bi bi-eye"></i>
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
                       <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center rounded backdrop-blur-md">
                                   <div className="w-[450px] h-[500px] rounded relative">
                                     <button
                                       onClick={() => {
                                         setModalDisplay(false);
                                       }}
                                       className="absolute w-[32px] aspect-square top-[-16px] right-[-16px] border rounded-full"
                                     >
                                       <i className="bi bi-x-lg"></i>
                                     </button>
                                     <OrderCard order={displayOrder} />
                                   </div>
                                 </div>
                    }
                </div>
                :
                <Loader/>
            }
        </div>
        </div>
    );
}