import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../../components/orderCard";
import { convertToTimeStamp } from "../../utils/helperUtils";


export default function MyOrders(){

    const [orders, setOrders] = useState({});
    const [ordersLoaded, setOrdersLoaded] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!ordersLoaded) {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setOrders(response.data)
            setOrdersLoaded(true);
          });
      }
    },[ordersLoaded]);

    return(
      <div className="w-full p-[5px]">
        <table className="w-full text-start">
          <thead className="border-y border-y-gray-400">
            <tr>
              <th className="p-[5px] text-start">Order ID</th>
              <th className="p-[5px] text-start">Date</th>
              <th className="p-[5px] text-start">Name</th>
              <th className="p-[5px] text-start">Contact</th>
              <th className="p-[5px] text-start">Status</th>
              <th className="p-[5px] text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              ordersLoaded && (
                orders.map((order, index)=>{
                  return (
                    <tr key={"tr" + index} className="border-b border-b-gray-300">
                      <td className="p-[4px]">{order.orderId}</td>
                      <td className="p-[4px]">{convertToTimeStamp(order.date)}</td>
                      <td className="p-[4px]">{order.name}</td>
                      <td className="p-[4px]">{order.phoneNumber}</td>
                      <td className="p-[4px]">{order.status}</td>
                      <td className="p-[4px]">A</td>
                    </tr>
                  )
                })
              )
            }
          </tbody>
        </table>
      </div>
    );

    return(
        <div className="w-full h-full">
            <div className="w-full h-auto flex flex-wrap justify-center">
                {
                    ordersLoaded && (
                        orders.map((order, index)=>{
                           return <OrderCard key={index} order={order}/>
                        })
                    )
                }
            </div>
        </div>
    )
}


