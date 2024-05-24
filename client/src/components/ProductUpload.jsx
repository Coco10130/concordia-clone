import { useState, useRef, useContext } from "react";
import axios from "../axios";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const ProductUpload = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [category, setCategory] = useState();
  const imageRef = useRef();
  const { token } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const image = imageRef.current.files[0];

      formData.append("image", image);
      formData.append("productName", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);

      const { data } = await axios.post("/api/product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.success);
        setName("");
        setPrice("");
        setQuantity("");
        setCategory("");
        imageRef.current.value = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full h-auto p-4 text-slate-950"
      >
        <div className="py-1 sm:py-2 md:py-3">
          <input
            required
            type="text"
            placeholder="Enter Product Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-6">
          <div className="py-1 sm:py-2 md:py-3">
            <input
              required
              type="text"
              placeholder="Enter Price"
              className="input input-bordered w-full md:max-w-xs"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="py-1 sm:py-2 md:py-3">
            <input
              required
              type="text"
              placeholder="Enter Quantity"
              className="input input-bordered w-full md:max-w-xs"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="py-1 sm:py-2 md:py-3">
          <input
            type="file"
            required
            className="file-input w-full"
            ref={imageRef}
          />
        </div>

        <div className="flex justify-center py-1 sm:py-2 md:py-3">
          <label aria-required className="text-white p-2">
            Category
          </label>
          <select
            required
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-[15rem] rounded-lg p-2"
          >
            <option value="">Select</option>
            <option value="trumpet">Trumpet</option>
            <option value="guitar">Guitar</option>
            <option value="saxophone">Saxophone</option>
            <option value="Piano">Piano</option>
          </select>
        </div>

        <div className="flex justify-end py-1 sm:py-2 md:py-3">
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 duration-300 w-28 py-3 rounded-2xl"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductUpload;
