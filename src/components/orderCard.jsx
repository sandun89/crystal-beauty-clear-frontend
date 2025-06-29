import { useState } from "react";
import { convertToTimeStamp } from "../utils/helperUtils";

export default function OrderCard(props) {
  const [detailView, setDetailView] = useState(false);
  const order = props.order;

  const viewClass = detailView
    ? "fixed w-[98%] h-auto my-[10px] rounded border border-gray-400 backdrop-blur-lg p-[10px]"
    : "w-[80%] lg:w-[300px] h-auto m-[15px] p-[10px] rounded border border-gray-400 shadow-xl";

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
