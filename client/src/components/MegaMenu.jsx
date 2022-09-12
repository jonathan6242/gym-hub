import { useEffect } from "react"
import { Link } from "react-router-dom"

function MegaMenu({ columns }) {
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
    <div className="hidden md:block">
      <div className="fixed z-40 top-[68px] inset-x-0 hidden group-hover:flex justify-center text-primary bg-white border-b">
        <div className="w-full max-w-6xl px-6 py-8 flex space-x-20">
          {
            columns.map((column, index) => (
              <div className="flex flex-col space-y-5" key={index}>
                <a 
                  href={nameToLink(column.name, column.name)} 
                  className="text-sm tracking-[1px] font-semibold"
                >
                  {column.name}
                </a>
                <div className="flex flex-col items-start space-y-2 normal-case tracking-wide">
                  {
                    column.items.map((item, index) => (
                      <a 
                        href={nameToLink(item, column.name)}
                        className="hover:opacity-75 duration-200"
                        key={index}
                      >
                        {item}
                      </a>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
export default MegaMenu