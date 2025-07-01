import { useState } from "react";
import { convertToTimeStamp } from "../utils/helperUtils";

export default function OrderCard(props) {
  const order = props.order;
  console.log(order)

    return (
      <div className="w-full h-auto rounded-lg border border-gray-200 shadow-2xl bg-white p-[10px]">
        <h1 className="font-semibold">Order Details</h1>
        <div className="w-full border border-gray-300 rounded p-[4px] mt-[5px] mb-[10px] text-left">
          <table className="w-full">
            <tbody>
              <tr>
                <th>Order Id</th>
                <td>{order.orderId}</td>
              </tr>
              <tr>
                <th>Order Date</th>
                <td>{new Date(order.date).toDateString()}</td>
              </tr>
              <tr>
                <th>Customer</th>
                <td>{order.name}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{order.address}</td>
              </tr>
              <tr>
                <th>Contact</th>
                <td>{order.phoneNumber}</td>
              </tr>
              <tr>
                <th>Order Status</th>
                <td>{order.status}</td>
              </tr>
            </tbody>
          </table>
          </div>

          <h1 className="font-semibold">Billing Items Details</h1>
          <div className="w-full border border-gray-300 rounded p-[4px] my-[5px] text-left">
            <table className="w-full">
              <thead>
                <tr className="border-b border-b-gray-300 text-sm pb-[5px]">
                  {/* <th>Product ID</th> */}
                  <th className="text-start py-[4px]">Product Name</th>
                  <th className="text-start py-[4px]">Price</th>
                  <th className="text-start py-[4px]">Quantity</th>
                  <th className="text-start py-[4px]">Sub Total</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {
                  order.billItems.map((item, index)=>{
                    return (
                        <tr key={index}>
                          {/* <td>{item.productId}</td> */}
                          <td className="py-[4px] border-b border-b-gray-400">{item.productName}</td>
                          <td className="py-[4px] border-b border-b-gray-400">{item.price}</td>
                          <td className="py-[4px] border-b border-b-gray-400">{item.quantity}</td>
                          <td className="py-[4px] border-b border-b-gray-400">{item.price * item.quantity}</td>
                        </tr>
                    );
                  })
                }
                <tr className="border-b ">
                  <th colSpan="3" className="text-start p-[4px]">Total</th>
                  <td className="mt-[4px]">{order.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    );

  return (
    <div className={viewClass}>
      <h1 className="my-[4px] font-bold">Order ID: {order.orderId}</h1>

      {/* order details */}
      <div className="w-full my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
        <h1 className="border-b-1 border-gray-300">Order Details</h1>
        <div className="w-full mt-[10px] flex">
          <h1 className="w-[40%] font-semibold me-[8px] text-start">
            Timestamp
          </h1>
          <h1 className="w-[60%] text-start">
            {convertToTimeStamp(order.date)}
          </h1>
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
          <h1 className="w-[40%] font-semibold me-[8px] text-start">
            Items Count
          </h1>
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
            <h1 className="w-[40%] font-semibold me-[8px] text-start">
              Customer
            </h1>
            <h1 className="w-[60%] text-start">{order.name}</h1>
          </div>
          <div className="w-full my-[10px] flex">
            <h1 className="w-[40%] font-semibold me-[8px] text-start">
              Address
            </h1>
            <h1 className="w-[60%] text-start">{order.address}</h1>
          </div>
          <div className="w-full my-[10px] flex">
            <h1 className="w-[40%] font-semibold me-[8px] text-start">
              Contact
            </h1>
            <h1 className="w-[60%] text-start">{order.phoneNumber}</h1>
          </div>
        </div>
      )}

      <div className="w-full text-center my-[20px]">
        {detailView ? (
          <button
            onClick={() => {
              setDetailView(false);
            }}
            className="absolute w-[35px] h-[35px] top-[5px] right-[5px] bg-red-500 border rounded"
          >
            X
          </button>
        ) : (
          <button
            onClick={() => {
              setDetailView(true);
            }}
            className="p-[5px] w-[80%] border rounded"
          >
            View Details
          </button>
        )}
      </div>

      {/* items summary */}
      {detailView && (
        <div className="w- my-[10px] flex flex-col rounded bg-gray-50 border border-gray-300 shadow-lg p-[5px]">
          <h1 className="border-b-1 border-gray-300">Items Details</h1>
          {order.billItems.map((billItem, index) => {
            return <ItemDetails key={index} billItem={billItem} />;
          })}
        </div>
      )}
    </div>
  );
}

// item detail sub card
export function ItemDetails(props) {
  const billItem = props.billItem;
  return (
    <div className="w-full p-[5px] my-[10px] flex items-center border-b border-b-gray-300">
      <img src={billItem.image} className="w-[5%] aspect-square" />
      <div className="flex flex-col w-[50%] ms-[20px]">
        <h1 className="text-start font-semibold">{billItem.productId}</h1>
        <h1 className="text-start text-gray-500">{billItem.productName}</h1>
      </div>
      <div className="w-[10%]">{billItem.price}</div>
      <div className="w-[10%]">{billItem.quantity}</div>
      <div className="w-[10%] font-semibold">
        {billItem.price * billItem.quantity}
      </div>
    </div>
  );
}
