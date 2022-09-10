import { useContext } from "react";
import { Link } from "react-router-dom";
import ModalContext from "../../context/ModalContext";

function SidebarTertiary({ name, open, setOpen, items }) {
  const { setSidebarOpen } = useContext(ModalContext)

  const nameToLink = (name, columnName = '') => {
    let link;
    if(name.includes('&')) {
      link = name.toLowerCase().split(' ').filter(word => word !== '&').join('-')
    } else {
      link = name.toLowerCase().split(' ').join('-')
    }
    if(name === columnName) {
      if(name.toLowerCase().includes(`women's`)) {
        link = 'women';
      } else if(name.toLowerCase().includes(`men's`)) {
        link = 'men';
      }
    } else if(columnName.toLowerCase().includes(`women's`)) {
      link = 'women-' + link
    } else if(columnName.toLowerCase().includes(`men's`)) {
      link = 'men-' + link
    }
    return `/collections/${link}`
  }

  return (
    <div className={`fixed z-50 inset-y-0 left-0 w-[90vw] max-w-[400px] bg-white
    ${open ? 'translate-x-0' : 'translate-x-full'} duration-300 ease`}>
      <div 
        className="px-6 py-4 border-b flex items-center space-x-3 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <i 
          className="fa-solid fa-angle-left text-2xl cursor-pointer"
        ></i>
        <span className="uppercase font-semibold">
          { name }
        </span> 
      </div>
      <Link 
        to={nameToLink(name, name)}
        className="flex items-center justify-between px-6 py-4 border-b cursor-pointer"
        onClick={() => setSidebarOpen(false)}
      >
        View All
      </Link>
      {
        items.map((item, index) => (
        <Link 
          to={nameToLink(item, name)}
          className="flex items-center justify-between px-6 py-4 border-b cursor-pointer"
          onClick={() => setSidebarOpen(false)}
          key={index}
        >  
          { item }
        </Link>
        ))
      }
    </div>
  )
}
export default SidebarTertiary