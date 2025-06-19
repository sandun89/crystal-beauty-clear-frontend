import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import { MdClose } from "react-icons/md";

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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(
                                    (order, index) => {
                                        return (
                                          <tr
                                            key={index}
                                            onClick={() => {
                                              setModalDisplay(true);
                                              setDisplayOrder(order);
                                            }}
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
                                              {order.status}
                                            </td>
                                            <td className="p-2">
                                              {order.total.toFixed(2)}
                                            </td>
                                            <td className="p-2">
                                              {new Date(
                                                order.date
                                              ).toDateString()}
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
                                <div className="w-full h-[150px] text-lg">
                                    <h1 className="py-[4px]">Order ID: {displayOrder.orderId}</h1>
                                    <h1 className="py-[4px]">Order Date: {new Date(displayOrder.date).toDateString()}</h1>
                                    <h1 className="py-[4px]">Order Status: {displayOrder.status}</h1>
                                    <h1 className="py-[4px]">Order Total: {displayOrder.total.toFixed(2)}</h1>
                                </div>
                                <div className="w-full h-[450px] bg-red-200"></div>
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