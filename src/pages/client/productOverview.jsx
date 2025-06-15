import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductOverview(){

    const params = useParams();

    if (params.id == null) {
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("lodaing"); //loaded, error

    
    return(
        <h1>Product overview</h1>
    )
}