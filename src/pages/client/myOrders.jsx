import { useEffect, useState } from "react";
import axios from "axios";
import { convertToTimeStamp } from "../../utils/helperUtils";


export default function MyOrders(){

    const [orders, setOrders] = useState({});
    const [ordersLoaded, setOrdersLoaded] = useState(false);
    const [showDetail, setShowDetail] = useState(null);

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
            setOrders(response.data.orders)
            setOrdersLoaded(true);
          });
      }
    },[ordersLoaded]);

    function showDetails(){

    }

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

export function OrderCard(props){

    const [detailView, setDetailView] = useState(false);
    const order = props.order; console.log(order)

    const viewClass = detailView
      ? "absolute w-[98%] h-[98%] my-[10px] rounded border border-gray-400 backdrop-blur-lg p-[10px]"
      : "w-[80%] lg:w-[300px] h-auto m-[15px] p-[10px] rounded border border-gray-400 shadow-xl";

    return(
        // <div className="w-[80%] lg:w-[300px] h-auto m-[15px] p-[10px] rounded border border-gray-400 shadow-xl">
        <div className={viewClass}>
            <h1 className="my-[4px] font-bold">Order ID: {order.orderId}</h1>
            
            {/* order details */}
            <div className="w-full my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
                <h1 className="border-b-1 border-gray-300">Order Details</h1>
                <div className="w-full mt-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Timestamp</h1>
                    <h1 className="w-[60%] text-start">{convertToTimeStamp(order.date)}</h1>
                </div>
                <div className="w-full mt-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Status</h1>
                    <h1 className="w-[60%] text-start">{order.status}</h1>
                </div>
            </div>

            {/* billing details */}
            <div className="w- my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
                <h1 className="border-b-1 border-gray-300">Bill Details</h1>
                <div className="w-full mt-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Items Count</h1>
                    <h1 className="w-[60%] text-start">{order.billItems.length}</h1>
                </div>
                <div className="w-full mt-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Total</h1>
                    <h1 className="w-[60%] text-start">{order.total}</h1>
                </div>
            </div>

            {/* customer details */}
            {detailView && (
            <div className="w- my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
                <h1 className="border-b-1 border-gray-300">Customer Details</h1>
                <div className="w-full my-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Customer</h1>
                    <h1 className="w-[60%] text-start">{order.name}</h1>
                </div>
                <div className="w-full my-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Address</h1>
                    <h1 className="w-[60%] text-start">{order.address}</h1>
                </div>
                <div className="w-full my-[10px] flex">
                    <h1 className="w-[40%] font-semibold me-[8px] text-start">Contact</h1>
                    <h1 className="w-[60%] text-start">{order.phoneNumber}</h1>
                </div>
            </div>
            )}

            <div className="w-full text-center my-[20px]">
                {
                    (detailView) ? (
                        <button onClick={()=>{setDetailView(false)}} className="absolute w-[35px] h-[35px] top-[5px] right-[5px] bg-red-500 border rounded">X</button>
                    ) : (
                        <button onClick={()=>{setDetailView(true)}} className="p-[5px] w-[80%] border rounded">View Details</button>
                    )
                }
            </div>

            {/* items summary */}
            {detailView && (
            <div className="w- my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
                <h1 className="border-b-1 border-gray-300">Items Details</h1>
                
            </div>
            )}
        </div>
    );
}