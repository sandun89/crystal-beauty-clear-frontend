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
                        <thead id="order-tbl-head">
                            <tr>
                                <th>Order ID</th>
                                <th>Email</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Phone No.</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="order-tbl-body">
                            {
                                orders.map(
                                    (order, index) => {
                                        return (
                                          <tr
                                            key={index}
                                          >
                                            <td>
                                              {order.orderId}
                                            </td>
                                            <td>
                                              {order.email}
                                            </td>
                                            <td>
                                              {order.name}
                                            </td>
                                            <td>
                                              {order.address}
                                            </td>
                                            <td>
                                              {order.phoneNumber}
                                            </td>
                                            <td>
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
                                            <td>
                                              {order.total.toFixed(2)}
                                            </td>
                                            <td>
                                              {new Date(
                                                order.date
                                              ).toDateString()}
                                            </td>
                                            <td>
                                              <button
                                                onClick={() => {
                                                  setModalDisplay(true);
                                                  setDisplayOrder(order);
                                                }}
                                                className="btn-i-sm btn-view-order"
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