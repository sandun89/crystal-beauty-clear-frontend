import { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../../components/orderCard";
import { convertToTimeStamp } from "../../utils/helperUtils";


export default function MyOrders(){

    const [orders, setOrders] = useState({});
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [order, setOrder] = useState({});
    const[modalIsDisplay, setModalDisplay] = useState(false);

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

    return (
      <div className="w-full h-full overflow-y-scroll p-[5px]">
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
            {ordersLoaded &&
              orders.map((order, index) => {
                return (
                  <tr key={"tr" + index} className="border-b border-b-gray-300">
                    <td className="p-[4px]">{order.orderId}</td>
                    <td className="p-[4px]">
                      {convertToTimeStamp(order.date)}
                    </td>
                    <td className="p-[4px]">{order.name}</td>
                    <td className="p-[4px]">{order.phoneNumber}</td>
                    <td className="p-[4px]">{order.status}</td>
                    <td className="p-[4px]">
                      <button
                      className="bg-amber-700 p-[5px] w-[75px] rounded text-white"
                        onClick={() => {
                          setOrder(order);
                          setModalDisplay(true);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* order modal */}
        {modalIsDisplay && (
          <div className="fixed top-[75px] left-0 w-full h-full flex justify-center items-center rounded backdrop-blur-sm">
            <div className="w-[450px] border border-gray-300 shadow-2xl rounded relative">
              <button
                onClick={() => {
                  setModalDisplay(false);
                }}
                className="absolute w-[32px] aspect-square top-[-16px] right-[-16px] border rounded-full"
              >
                <i className="bi bi-x-lg"></i>
              </button>
              <OrderCard order={order} />
            </div>
          </div>
        )}
      </div>
    );
}


