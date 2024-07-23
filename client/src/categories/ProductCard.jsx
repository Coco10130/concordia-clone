import { useEffect, useState, useContext } from "react";
import axios from "../axios";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProductCard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user, token, loading, updateUserProfile } = useContext(UserContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get("/api/auth/products");

        setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [user, loading]);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      if (user && token) {
        const quantity = 1;

        const payload = {
          quantity: quantity,
        };

        const { data } = await axios.post(`/api/cart/${productId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          if (data.user) {
            updateUserProfile(data.user);
          }
          toast.success(data.success);
        } else {
          toast.error(data.message);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {products.map((product, index) => (
        <div
          key={index}
          className="card w-80 glass mx-4 hover:scale-105 duration-300 m-2"
        >
          <figure className="px-10 pt-10">
            <img
              src={`/images/${product.image}`}
              alt="Image"
              className="rounded-xl h-[12rem] w-[20rem]"
            />
          </figure>
          <div className="card-body font-inder w-full">
            <div className="mx-auto w-auto">
              <h2 className="card-title text-lg truncate">
                {product.productName.length > 20
                  ? product.productName.substring(0, 20) + "..."
                  : product.productName}
              </h2>
            </div>
            <div className="flex flex-row items-end gap-x-[5rem]">
              <p>₱ {product.price}</p>
              <p>Quantity: {product.price}</p>
            </div>
            <div className="card-actions mx-auto">
              <button
                onClick={(e) => handleAddToCart(e, product._id)}
                className="btn bg-blue-500 border-none text-white hover:bg-white hover:text-blue-500 mt-4"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
