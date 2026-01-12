import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Package, MapPin, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import OrderConfirmation from "./OrderConfirmation";
const Checkout = () => {
  const { cartTotal, clearCart, Cart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    City: "",
    Zip: "",
  });

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  useEffect(() => {
    console.log("cart:", Cart);
  }, []);

  console.log("sahipping data =", deliveryDetails);

  if (isConfirmed)
    return <OrderConfirmation deliveryDetails={deliveryDetails} />;

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <h2 className="text-5xl font-extrabold text-white mb-10 tracking-tight ">
          Finalize Order
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10  ">
          <div
            className="lg:col-span-2 p-8 bg-gray-900 rounded-2xl shadow-2xl border
        border-gray-800"
          >
            <h3
              className="text-3xl font-bold text-orange-400 mb-6 flex items-center 
            space-x-3 border-b border-b border-gray-700 pb-4 
            "
            >
              <MapPin className="w-7 h-7 text-orange-500" />
              <span>Shipping Information</span>
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {Object.keys(deliveryDetails).map((key) => (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-semibold text-gray-300 
             capitalize mb-1 "
                  >
                    {key === "Zip" ? "Pin Code" : key}
                  </label>
                  <input
                    type={key === "Zip" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={deliveryDetails[key]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-5 py-3 border border-gray-700 rounded-xl shadow-inner text-white bg-gray-800 
                    placeholder-gray-500"
                  />
                </div>
              ))}

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full mt-8 py-4 bg-orange-600 text-white font-extrabold text-xl rounded-full 
                                    shadow-lg shadow-orange-800/50 cursor-pointer hover:bg-orange-700 transition duration-300
                                    flex items-center justify-center space-x-2 transform hover:ring-4 hover:ring-pink-600/50
                                    uppercase tracking-wider"
                >
                  {/* <Zap className="w-6 h-6" /> */}
                  <span>₹ Pay and Confirm Order (₹{cartTotal.toFixed(2)})</span>
                </button>
              </div>
            </form>
          </div>
          {/* Order Summary in Checkout */}
          <div
            className="lg:col-span-1 p-8 bg-gray-900 rounded-2xl border-1/4 sticky top-20
          h-fit border border-gray-800 "
          >
            <h3
              className="text-3xl font-bold text-white mb-5 border-b border-gray-700 pb-3 flex items-center 
            space-x-2"
            >
              <Package className="w-6 h-6 text-orange-400" />

              <span>Summary</span>
            </h3>

            <div className="space-y-4 text-gray-400">
              {Cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-base border-b border-gray-800
                pb-2"
                >
                  <span>{item.name}</span>
                  <span>{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-gray-400 ">
              <div className="flex justify-between text-xl ">
                <span>SubTotal :</span>
                <span className="font-semibold text-white ">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xl ">
                <span>Shipping (Express) :</span>
                <span className="font-semibold text-green-400 ">Free</span>
              </div>

              <div className="flex justify-between pt-6 border-t border-gray-700 ">
                <span className="text-2xl font-extrabold text-white ">
                  Estimated Total :
                </span>
                <span className="text-2xl font-extrabold text-orange-400 ">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>
              <Link
                to={"/checkout"}
                onClick={() => addToCart(product)}
                className="w-full mt-8 py-4 bg-orange-600 text-white font-extrabold text-xl rounded-full 
                                    shadow-lg shadow-orange-800/50 cursor-pointer hover:bg-orange-700 transition duration-300
                                    flex items-center justify-center space-x-2 transform hover:ring-4 hover:ring-pink-600/50
                                    uppercase tracking-wider"
              >
                <Zap className="w-6 h-6" />
                <span>Proceed Securly </span>
              </Link>
              <p className="text-xs text-gray-500 text-center mt-4">
                All transaction are encrypted and secure{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
