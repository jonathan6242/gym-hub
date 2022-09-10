import { useState } from "react";
import SidebarSecondary from "./SidebarSecondary";

function SidebarTab({ 
  name, 
  columns = [
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
  ] }) 
{
  const [sidebarSecondaryOpen, setSidebarSecondaryOpen] = useState(false);

  return (
    <>
      <div 
        className="flex items-center justify-between px-6 py-4 border-b cursor-pointer"
        onClick={() => setSidebarSecondaryOpen(true)}
      >
        <div className="flex flex-col space-y-1">
          <span className="uppercase font-semibold">
            { name }
          </span>
          <div className="text-sm text-secondary line-clamp-1">
            { columns.map(column => column.name).join(", ")}
          </div>
        </div>
        <i className="fa-solid fa-angle-right text-xl"></i>
      </div>
      <SidebarSecondary 
        open={sidebarSecondaryOpen}
        setOpen={setSidebarSecondaryOpen}
        name={name}
        columns={columns}
      />
    </>
  )
}
export default SidebarTab