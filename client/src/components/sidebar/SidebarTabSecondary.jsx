import { useState } from "react"
import SidebarTertiary from "./SidebarTertiary";

function SidebarTabSecondary({ name, items }) {
  const [sidebarTertiaryOpen, setSidebarTertiaryOpen] = useState(false);

  return (
    <>
      <div 
        className="flex items-center justify-between px-6 py-4 border-b cursor-pointer"
        onClick={() => setSidebarTertiaryOpen(true)}
      >
        <div className="flex flex-col space-y-1">
          <span className="uppercase font-semibold">
            { name }
          </span>
          <div className="text-sm text-secondary line-clamp-1">
            { items.join(", ") }
          </div>
        </div>
        <i className="fa-solid fa-angle-right text-xl"></i>
      </div>
      <SidebarTertiary 
        open={sidebarTertiaryOpen}
        setOpen={setSidebarTertiaryOpen}
        name={name}
        items={items}
      />
    </>
  )
}
export default SidebarTabSecondary