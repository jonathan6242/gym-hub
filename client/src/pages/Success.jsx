import { useContext, useEffect } from "react";
import { Link } from "react-router-dom"
import CartContext from "../context/CartContext"

function Success() {
  const { setCart } = useContext(CartContext);

  return (
    <div className="container mx-auto max-w-6xl px-3 sm:px-6 pb-12 
    flex flex-col items-center flex-1">
      <div className="pt-9 md:pt-16 text-center text-3xl md:text-4xl font-bold">
        Success!
      </div>
      <div className="mt-6 text-center text-lg md:text-xl text-secondary">
        Your order has been placed. Thank you for your purchase.
      </div>
      <Link 
        className="relative group bg-accent mt-6 p-4 px-8 uppercase text-white text-center text-sm font-semibold tracking-widest cursor-pointer overflow-hidden block"
        to='/'
      >
        <span className="relative z-10">Continue Shopping</span> 
        <div className="absolute inset-0 bg-[#ea7610] translate-y-full
        group-hover:translate-y-0 duration-150 ease">
  
        </div>
      </Link>
    </div>
  )
}
export default Success