import { useState } from "react";
import useCartStore from "./stores/cartStore"; // Import the zustand store
import products from "./data/products-new.json"; // Your product list
import { Link, useNavigate } from "react-router-dom";

export default function ChooseProduct() {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart); // Get the current cart

  const [qty, setQty] = useState({});
  const [option, setOption] = useState({});
  const [openCartModal, setOpenCartModal] = useState(false);

  // Generate a unique ID for each product
  const productList = products.map((p, i) => ({
    ...p,
    uid: `${i}-${p.item.replace(/\s+/g, "-")}`,
  }));

  const handleQtyChange = (uid, value) => {
    setQty((prev) => ({
      ...prev,
      [uid]: value,
    }));
  };

  const handleOptionChange = (uid, value) => {
    setOption((prev) => ({
      ...prev,
      [uid]: value,
    }));
  };

  const handleAdd = (product) => {
    const selectedOption = option[product.uid] || "pack";
    const quantity = selectedOption === "pack" ? qty[product.uid] || 1 : 1;

    addToCart({
      id: product.uid,
      item: product.item,
      option: selectedOption,
      qty: Number(quantity),
      packPrice: product.packPrize,
      casePrice: product.casePrice,
      packSize: product.packsize,
      packing: product.packing,
    });
  };

  return (
    <section className="p-4">
      <div className="grid grid-cols-4 gap-4 max-w-[1000px] mx-auto">
        <div className="col-span-4 flex gap-4 my-4">
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            ⬅ Back
          </button>

          <Link to="/checkout" className="btn btn-secondary">
            Proceed to Checkout
          </Link>

          {/* View Cart Button */}
          <button
            className="btn btn-accent"
            onClick={() => setOpenCartModal(true)}
          >
            View Cart ({cart.length})
          </button>
        </div>

        {/* PRODUCT LIST */}
        {productList.map((product) => {
          const selectedOption = option[product.uid] || "pack";

          return (
            <div key={product.uid} className="p-2 border rounded">
              {/* <iframe
                src={`https://drive.google.com/file/d/${product.id}/preview`}
                className="w-full"
                allow="autoplay"
              ></iframe> */}

              <h1 className="font-semibold mt-2">{product.item}</h1>

              <p className="text-sm text-gray-600">
                Pack: {product.packing} pcs | Size: {product.packsize}
              </p>
              <p className="text-sm">Pack Price: ₱{product.packPrize}</p>
              <p className="text-sm">Case Price: ₱{product.casePrice}</p>

              <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span>Buy:</span>
                  <select
                    className="select select-sm"
                    value={selectedOption}
                    onChange={(e) =>
                      handleOptionChange(product.uid, e.target.value)
                    }
                  >
                    <option value="pack">Pack</option>
                    <option value="case">Case</option>
                  </select>
                </div>

                {selectedOption === "pack" && (
                  <div className="flex items-center gap-2">
                    <span>QTY:</span>
                    <input
                      type="number"
                      min="1"
                      className="input input-sm w-20"
                      value={qty[product.uid] || 1}
                      onChange={(e) =>
                        handleQtyChange(product.uid, e.target.value)
                      }
                    />
                  </div>
                )}

                <button
                  className="btn btn-primary btn-sm mt-2"
                  onClick={() => handleAdd(product)}
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}

        {/* CART MODAL */}
        {openCartModal && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Cart Items</h3>

              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <ul className="space-y-3">
                  {cart.map((item) => (
                    <li
                      key={item.id + item.option}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <div>
                        <p className="font-semibold">{item.item}</p>
                        <p className="text-sm text-gray-600">
                          {item.option.toUpperCase()} × {item.qty}
                        </p>
                      </div>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => removeFromCart(item.id, item.option)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="modal-action">
                <button className="btn" onClick={() => setOpenCartModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </section>
  );
}
