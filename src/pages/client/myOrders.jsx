import { useEffect, useState } from "react";
import axios from "axios";


export default function MyOrders(){

    const [orders, setOrders] = useState();
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
            console.log(response);
            setOrders(response.data.orders)
            setOrdersLoaded(true);
          });
      }
    },[ordersLoaded]);

    return(
        <div className="w-full h-full">
            <div className="w-full h-auto flex flex-wrap justify-center">
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
                <OrderCard/>
            </div>
            {/* <table className="w-full">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date Requested</th>
                        <th>Contact Number</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ordersLoaded && (
                            orders.map((order, index)=>{

                            })
                        )
                    }
                </tbody>
            </table> */}
        </div>
    )
}

export function OrderCard(){
    return(
        <div className="w-[350px] h-auto m-[15px] p-[10px] rounded border border-gray-400 shadow-xl ">
            <h1 className="my-[4px] font-bold">Order ID: ORD1212132132</h1>
            <hr className="text-gray-300" />
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[20%] font-semibold me-[8px] text-start">Name</h1>
                <h1 className="w-[80%] text-start">Customer Name</h1>
            </div>
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[20%] font-semibold me-[8px] text-start">Address</h1>
                <h1 className="w-[80%] text-start">dksakddk, dsdds;s;d, dsa;sad;, dasd</h1>
            </div>
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[20%] font-semibold me-[8px] text-start">Date</h1>
                <h1 className="w-[80%] text-start">10.06.2025</h1>
            </div>
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[20%] font-semibold me-[8px] text-start">Status</h1>
                <h1 className="w-[80%] text-start">Pending</h1>
            </div>
            <hr className="text-gray-300 my-[10px]" />
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[80%] font-semibold me-[8px] text-start">Items Count</h1>
                <h1 className="w-[20%] text-start">5</h1>
            </div>
            <div className="w-full mt-[10px] flex">
                <h1 className="w-[80%] font-semibold me-[8px] text-start">Total</h1>
                <h1 className="w-[20%] text-start">10000</h1>
            </div>
            <div className="w-full text-center my-[20px]">
                <button className="p-[5px] w-[50%] border rounded-full">View Items</button>
            </div>
        </div>
    );
}