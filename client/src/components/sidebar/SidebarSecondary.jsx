import SidebarTabSecondary from "./SidebarTabSecondary"

function SidebarSecondary({ name, open, setOpen, columns }) {
  return (
    <div className={`fixed z-40 inset-y-0 left-0 w-[90vw] max-w-[400px] bg-white
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
      {
        columns.map((column, index) => (
          <SidebarTabSecondary 
            name={column.name}
            items={column.items}
            key={index}
          />
        ))
      }
    </div>
  )
}
export default SidebarSecondary
