import { useContext } from "react"
import ModalContext from "../../context/ModalContext"
import SidebarTab from "./SidebarTab"

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(ModalContext)

  return (
    <>
      <div className={`fixed z-30 inset-y-0 left-0 w-[90vw] max-w-[400px] bg-white overflow-x-hidden duration-300 ease
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}>
        <div className="px-6 py-4 border-b">
          <button
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>
        <SidebarTab 
          name="Clothing"
          columns = {[
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
        <SidebarTab 
          name="Equipment"
          columns = {[
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
                'Running Accessories',
              ]
            }
          ]}
        />
      </div>
      <div 
        className={`fixed inset-0 z-10 bg-black/50 ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
    </>
  )
}
export default Sidebar