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
      <Link to="/admin/addProduct" className="btn-add-product">
        <i className="bi bi-plus"></i>
      </Link>
      { loaded ? (
      <div className="w-full h-full ">
          <table id="tbl-product" className="w-full">
            <thead id="product-tbl-head">
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Labeled Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index} className="product-tbl-row">
                    <td>{product.name}</td>
                    <td>{product.productId}</td>
                    <td>{product.price}</td>
                    <td>{product.labledPrice}</td>
                    <td>{product.stock}</td>
                    <td>
                      <div className="w-full h-full flex justify-center">
                        <button
                          className="btn-i-sm btn-edit-product"
                          onClick={() => {
                            navigate("/admin/editProduct", {
                              state: product,
                            });
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn-i-sm btn-del-product"
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
      </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}
