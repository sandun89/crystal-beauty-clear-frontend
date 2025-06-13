import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { generateUniqueId } from "../../utils/helperUtils";
import { mediaUpload } from "../../utils/mediaUpload";


export default function EditProduct(){

    const navigate = useNavigate("")
    const locationData = useLocation();
    if (locationData.state == null) {
       toast.error("Please Select a Product to Edit");
       navigate("/admin/products");
       return;
    }
    
    const prData = locationData.state;
    const [productId, setProductId] = useState(prData.productId);
    const [name, setName] = useState(prData.name);
    const [altName, setAltNames] = useState(prData.altName.join(", "));
    const [price, setPrice] = useState(prData.price);
    const [labledPrice, setLabeledPrice] = useState(prData.labledPrice);
    const [description, setDescription] = useState(prData.description);
    const [stock, setStock] = useState(prData.stock);
    const [images, setImages] = useState([]);

    async function handleSubmit(){

      const promisesArr = [];
      for (let i = 0; i < images.length; i++) {
        const promise = mediaUpload(images[i]);
        promisesArr[i] = promise;
      }

      try {
        let imgUrls = await Promise.all(promisesArr);
        
        if (images.length == 0) {
          imgUrls = prData.images;          
        }
        const altNamesArray = altName.split(",");
        const product = {
          productId: productId,
          name: name,
          altName: altNamesArray,
          price: price,
          labledPrice: labledPrice,
          description: description,
          stock: stock,
          images: imgUrls
        };
        const token = localStorage.getItem("authToken");
        await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/product/" + productId, product, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          toast.success("Product Updated Successfully");
          navigate("/admin/products");
      } catch (error) {
        console.log(error)
        toast.error("Product Update Failed");
      }
    }
    
    return (
      <div className="w-full h-full flex justify-center items-center rounded-lg">
        <div className="w-[500px] h-[550px] flex flex-col items-center rounded-lg shadow-lg shadow-blue-400 backdrop-blur-lg">
          <h1 className="text-2xl my-[10px]">Edit Product</h1>
          <input
            value={productId}
            type="text"
            placeholder="Product ID"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
            readOnly
            disabled
          />
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Product Name"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <input
            value={altName}
            onChange={(e) => {
              setAltNames(e.target.value);
            }}
            type="text"
            placeholder="Alternative Names"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <input
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            placeholder="Price"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <input
            value={labledPrice}
            onChange={(e) => {
              setLabeledPrice(e.target.value);
            }}
            type="number"
            placeholder="Labled Price"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="Description"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <input
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
            type="number"
            placeholder="Stock"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <input 
            type="file"
            multiple
            onChange={(e) => {
              setImages(e.target.files)
            }}
            placeholder="Product Images"
            className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"
          />
          <div className="w-[90%] my-[8px] flex justify-between items-center">
            <button
              onClick={handleSubmit}
              className="w-[48%] h-[40px] p-[5px] rounded-lg text-center text-white bg-green-600 hover:bg-green-700 cursor-pointer"
            >
              Update Product
            </button>
            <Link
              to="/admin/products"
              className="w-[48%] h-[40px] p-[5px] rounded-lg text-center text-white bg-red-500 hover:bg-red-600"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    );
}