import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import CartContext from "../context/CartContext"
import ModalContext from "../context/ModalContext"
import MegaMenu from "./MegaMenu"
import NavbarLink from "./NavbarLink"
import Sidebar from "./sidebar/Sidebar"

function Navbar() {
  const { sidebarOpen, setSidebarOpen } = useContext(ModalContext)
  const { numberOfItems } = useContext(CartContext)

  return (
    <>
      <div className="h-16 md:h-[68px]"></div>
      <nav className="fixed z-30 top-0 inset-x-0 bg-primary text-white uppercase">
        <div className="container mx-auto max-w-6xl px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex items-center">
              {/* Hamburger Menu - Below 768px */}
              <button
                onClick={() => setSidebarOpen(true)}
              >
                <i className="fa-solid fa-bars text-2xl md:hidden"></i>
              </button>
              {/* Links - Above 768px */}
              <div className="hidden md:flex items-center space-x-10">
                <NavbarLink 
                  to='/collections/clothing'
                  menu={(
                    <MegaMenu
                      columns={[
                        {
                          name: `Men's Collection`,
                          items: [
                            'Shirts & Tops',
                            'Hoodies & Jackets',
                            'Shorts & Pants'
                          ]
                        },
                        {
                          name: `Women's Collection`,
                          items: [
                            'Shirts & Tops',
                            'Sports Bras',
                            'Pants & Leggings'
                          ]
                        }
                      ]}
                    />
                  )}
                >
                  Clothing
                </NavbarLink>
                <NavbarLink 
                  to='/collections/equipment'
                  menu={(
                    <MegaMenu
                      columns={[
                        {
                          name: `Weight Training`,
                          items: [
                            'Home Gym',
                            'Weight Plates',
                            'Medicine Balls & Kettlebells',
                          ]
                        },
                        {
                          name: `Calisthenics`,
                          items: [
                            'Pull Up Bars',
                            'Resistance Bands',
                            'Weight Vests'
                          ]
                        },
                        {
                          name: `Running`,
                          items: [
                            'Running Shoes',
                            'Running Accessories'
                          ]
                        }
                      ]}
                    />
                  )}
                >
                  Equipment
                </NavbarLink>
              </div>
            </div>
            {/* Logo */}
            <Link to='/' className="text-2xl md:text-3xl font-bold flex items-center space-x-2">
              <span>GYMHUB</span> 
            </Link>

            {/* Cart */}
            <div className="flex-1 flex items-center justify-end">
              <Link
                to='/cart'
                className="relative"
              >
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                {/* Cart Length */}
                {
                  numberOfItems() > 0 && (
                    <div className="cart__length absolute -bottom-1 -right-3 w-5 h-5 rounded-full text-xs bg-accent font-medium flex items-center justify-center">
                      {numberOfItems()}
                    </div>
                  )
                }
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar />
    </>
  )
}
export default Navbar