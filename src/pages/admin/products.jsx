import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          setProducts(response.data);
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loaded]);

  async function deleteProduct(id) {
    const token = localStorage.getItem("authToken");
    if (token == null) {
      toast.error("Please Login to Delete Product");
      return;
    }

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/product/" + id,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setLoaded(false);
      toast.success("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Product Delete Error");
      return;
    }
  }

  return (
    <div className="w-full h-full p-2 rounded-lg relative">
      <Link
        to="/admin/addProduct"
        className="bg-green-700 text-white w-[60px] aspect-square flex items-center justify-center z-50 p-[12px] text-3xl rounded-full cursor-pointer hover:bg-gray-400 hover:text-gray-700 absolute right-5 bottom-5"
      >
        <i className="bi bi-plus"></i>
      </Link>
      <div className="w-full h-full backdrop-blur-lg rounded-lg shadow-lg shadow-blue-400">
        {loaded && (
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2">Product ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Labeled Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b-1 border-gray-400 text-center cursor-pointer hover:bg-blue-300 hover:text-white"
                  >
                    <td className="p-2">{product.productId}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2">{product.labledPrice}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.productId}</td>
                    <td className="p-2">
                      <div className="w-full h-full flex justify-center">
                        <button
                        className="w-[32px] p-[4px] border bg-green-500 rounded mx-[4px]"
                          onClick={() => {
                            navigate("/admin/editProduct", {
                              state: product,
                            });
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                        className="w-[32px] p-[4px] border bg-red-500 rounded mx-[4px]"
                          onClick={() => {
                            deleteProduct(product.productId);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {!loaded && <Loader />}
      </div>
    </div>
  );
}
