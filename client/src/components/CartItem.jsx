import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import CartContext from "../context/CartContext";
import Price from "./Price"

function CartItem({ item }) {
  const { changeQuantity, removeFromCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    changeQuantity(quantity, item.id)
  }, [quantity])

  return (
    <>
      {/* Cart Item - Above 768px */}
      <div className="w-full hidden md:flex">
        <div className="w-3/5 flex space-x-6">
          <figure className="aspect-[3/4] w-24 flex items-start flex-shrink-0">
            <img 
              src={item.url} 
              alt={item.name} 
              className="w-full object-contain"
            />
          </figure>
          <div className="flex flex-col items-start space-y-1 pr-4">
            {/* Product Name */}
            <div className="font-semibold">{item.name}</div>
            <div>${((item.salePrice || item.originalPrice) / 100).toFixed(2)}</div>
          </div>
        </div>
        <div className="w-2/5 flex flex-col items-start space-y-3">
          <div className="flex border h-8">
            <button 
              className="w-8 text-[10px] leading-8"
              onClick={() => {
                if(quantity > 0) {
                  setQuantity(quantity - 1)
                }
              }}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <input 
              type="text"
              className="w-9 p-2 outline-1 text-sm text-center leading-8"
              value={quantity}
              onChange={(e) => {
                if(+e.target.value !== 0 && Number.isInteger(+e.target.value)) {
                  setQuantity(+e.target.value);
                } else if(e.target.value === "") {
                  setQuantity('')
                } else {
                  setQuantity(1)
                }
              }}
              onBlur={() => {if(quantity === "") setQuantity(1)}}
            />
            <button
              className="w-8 text-[10px] leading-8"
              onClick={() => setQuantity(quantity + 1)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div 
            className="w-[100px] text-center text-xs text-secondary 
            underline underline-offset-2 cursor-pointer"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </div>
        </div>
        <div className="w-24 text-right">
          <div className="flex flex-col leading-relaxed">
            <Price 
              originalPrice={item.originalPrice}
              salePrice={item.salePrice}
              cart
              quantity={quantity}
            />
            {/* <span>$65.00</span>
            <div className="text-sm text-secondary line-through">$80.00</div> */}
          </div>
        </div>
      </div>
      {/* Cart Item - Below 768px */}
      <div className="flex md:hidden space-x-6">
        <figure className="aspect-[3/4] w-24 flex items-start flex-shrink-0">
          <img 
            src={item.url} 
            alt={item.name}
            className="w-full object-contain"
          />
        </figure>
        <div className="flex flex-col">
          <div className="font-semibold">
            {item.name}
          </div>
          <div className="mt-1">
            <Price 
              originalPrice={item.originalPrice}
              salePrice={item.salePrice}
              quantity={quantity}
            />
          </div>
          <div className="flex items-center mt-2 flex-wrap gap-3">
            <div className="flex border h-8">
              <button 
                className="w-8 text-[10px] leading-8"
                onClick={() => {
                  if(quantity > 0) {
                    setQuantity(quantity - 1)
                  }
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input 
                type="text"
                className="w-9 p-2 outline-1 text-sm text-center leading-8"
                value={quantity}
                onChange={(e) => {
                  if(+e.target.value !== 0 && Number.isInteger(+e.target.value)) {
                    setQuantity(+e.target.value);
                  } else if(e.target.value === "") {
                    setQuantity('')
                  } else {
                    setQuantity(1)
                  }
                }}
                onBlur={() => {if(quantity === "") setQuantity(1)}}
              />
              <button
                className="w-8 text-[10px] leading-8"
                onClick={() => setQuantity(quantity + 1)}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            <div 
              className="text-center text-xs text-secondary 
              underline underline-offset-2 cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CartItem