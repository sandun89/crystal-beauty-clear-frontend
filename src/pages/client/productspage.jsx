import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  const [productList, setProductList] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!productsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
        .then((response) => {
          setProductList(response.data);
          setProductsLoaded(true);
        });
    }
  }, [productsLoaded]);

  function searchProducts() {
    if (search.length > 0) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/search/" + search)
        .then((response) => {
          setProductList(response.data.products);
        });
    }
  }

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-center items-center my-[10px]">
        <input
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          type="text"
          value={search}
          className="sch"
          placeholder="Enter Product Name"
        />
        <button
          onClick={() => {
            searchProducts();
          }}
          className="sch-btn"
        >
          <i className="bi bi-search"></i>
        </button>
        <button
          onClick={() => {
            setSearch("");
            setProductsLoaded(false);
          }}
          className="sch-btn"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      {productsLoaded ? (
        <div className="w-full h-full flex flex-wrap justify-center">
          {productList.map((product, index) => {
            return <ProductCard key={product.productId} product={product} />;
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
