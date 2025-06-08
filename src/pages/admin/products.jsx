import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa";

export default function AdminProductsPage(){

    const [products, setProducts] = useState([]);

    useEffect(
        () => {
          axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
            .then((response) => {
              setProducts(response.data)
            })
            .catch((error) => {
              console.log(error);
            });  
        },
        []
    )
      

    return (
      <div className="w-full h-full p-2 rounded-lg relative">
        <Link to="/admin/addProduct" className="bg-green-700 text-white p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-700 absolute right-5 bottom-5">
            <FaPlus />
        </Link>
        <div className="backdrop-blur-lg rounded-lg shadow-lg shadow-blue-400">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2">Product ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Labeled Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index} className="border-b-1 border-gray-400 text-center cursor-pointer hover:bg-blue-800 hover:text-white">
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.labledPrice}</td>
                  <td>{product.stock}</td>
                  <td>{product.productId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    );
}