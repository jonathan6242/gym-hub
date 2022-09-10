import { useContext } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import CartItem from "../components/CartItem"
import CartContext from "../context/CartContext"

function Cart() {
  const { cart } = useContext(CartContext)
  const total = () => {
    let amount = 0;
    for(let item of cart) {
      amount += ((item.salePrice || item.originalPrice) / 100) * item.quantity;
    }
    return amount;
  }
  const checkout = async () => {
    fetch('https://gym-hub-ecommerce.herokuapp.com/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: cart.map(product => ({ id: product.id, quantity: product.quantity }))
      })
    }).then(res => {
      if(res.ok) return res.json();
      return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
      window.location = url;
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <div className="container mx-auto max-w-6xl px-3 sm:px-6 pb-12 flex flex-col flex-1">
      <div className={`text-center text-3xl md:text-4xl font-bold
      ${cart.length > 0 ? 'py-9 md:py-16' : 'pt-9 md:pt-16'}`}>
        Cart
      </div>
      {
        cart.length > 0 ? (
          <div className="flex flex-col gap-y-16 lg:flex-row lg:gap-x-16">
            {/* Cart Content - Above 768px */}
            <div className="flex-1 hidden md:flex flex-col">
              <div className="w-full flex pb-4 border-b text-xs text-left text-secondary tracking-widest font-semibold uppercase">
                <div className="w-3/5">Product</div>
                <div className="w-2/5">Quantity</div>
                <div className="w-24 text-right">Total</div>
              </div>
              <div className="w-full flex flex-col pt-8">
                {
                  cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))
                }
              </div>
            </div>
            {/* Cart Content - Below 768px */}
            <div className="flex flex-col space-y-6 md:hidden">
              {
                cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))
              }
            </div>
            {/* Checkout Aside  */}
            <div className="w-full lg:w-80 bg-background p-6 md:p-10 flex flex-col space-y-8 self-start">
              <div className="space-y-2">
                <div className="flex justify-between text-base text-secondary">
                  <span>Subtotal</span>
                  <span>${(total() * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base text-secondary">
                  <span>Tax</span>
                  <span>${(total() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total().toFixed(2)}</span>
                </div>
              </div>
              <div 
                className="relative group bg-accent py-4 uppercase text-white text-center
                text-sm font-semibold tracking-widest cursor-pointer overflow-hidden"
                onClick={checkout}
              >
                <span className="relative z-10">Checkout</span> 
                <div className="absolute inset-0 bg-[#ea7610] translate-y-full
                group-hover:translate-y-0 duration-150 ease">
          
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 text-center text-lg md:text-xl text-secondary">
              Your cart is empty at the moment.
            </div>
            <Link 
              className="relative group bg-accent mt-6 p-4 uppercase text-white text-center text-sm font-semibold tracking-widest cursor-pointer overflow-hidden block
              self-center"
              to='/'
            >
              <span className="relative z-10">Start Shopping</span> 
              <div className="absolute inset-0 bg-[#ea7610] translate-y-full
              group-hover:translate-y-0 duration-150 ease">
        
              </div>
            </Link>
          </>
        )
      }

    </div>
  )
}
export default Cart