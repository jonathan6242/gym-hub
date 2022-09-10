import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import Pagination from "../components/Pagination";
import Product from "../components/Product";

function Collection() {
  const [products, setProducts] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const { category } = useParams();
  const dropdownRef = useRef();
  const dropdownRefMobile = useRef();

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = 
  products
    ?.sort((a, b) => {
      if(sortBy === 'Featured') return a.id - b.id
      if(sortBy === 'Price, low to high') return (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
      if(sortBy === 'Price, high to low') return (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
      if(sortBy === 'Rating') return b.rating - a.rating
    })?.slice(indexOfFirstProduct, indexOfLastProduct)

  const categoryToTitle = (category) => {
    switch(category.toLowerCase()) {
      case 'clothing':
        return 'Clothing'
      case 'equipment':
        return 'Equipment'
      case 'men':
        return `Men's Clothing`
      case 'women':
        return `Women's Clothing`
      case 'men-shirts-tops':
        return `Men's Shirts & Tops`
      case 'men-hoodies-jackets':
        return `Men's Hoodies & Jackets`
      case 'men-shorts-pants':
        return `Men's Shorts & Pants`
      case 'women-shirts-tops':
        return `Women's Shirts & Tops`
      case `women-sports-bras`:
        return `Women's Sports Bras`
      case 'women-pants-leggings':
        return `Women's Pants & Leggings`
      case 'weight-training':
        return 'Weight Training'
      case 'calisthenics':
        return 'Calisthenics'
      case 'boxing-mma':
        return 'Boxing & MMA'
      case 'weight-plates':
        return 'Weight Plates'
      case 'medicine-balls-kettlebells':
        return 'Medicine Balls & Kettlebells'
      case 'home-gym':
        return 'Home Gym'
      case 'pull-up-bars':
        return 'Pull Up Bars'
      case 'resistance-bands':
        return 'Resistance Bands'
      case 'weight-vests':
        return 'Weight Vests'
      case 'running':
        return 'Running'
      case 'running-shoes':
        return 'Running Shoes'
      case 'running-accessories':
        return 'Running Accessories'
    }
  }

  const paginate = (number) => {
    setCurrentPage(number)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    async function getProducts() {
      setProducts(null)
      setCurrentPage(1);
      const { data }= await axios.get(`/products/${category}`)
      setTimeout(() => {
        setProducts(data)
      }, 600)
    }
    getProducts();
  }, [category])

  useEffect(() => {
    const hideDropdown = (e) => {
      if(
        !e.target.classList.contains('dropdown')
        && !dropdownRef?.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', hideDropdown)
    return () => {
      document.removeEventListener('click', hideDropdown)
    }
  }, [])

  return (
    <div className="container mx-auto max-w-6xl px-3 sm:px-6 pb-12 flex-1">
      <div className="py-9 md:py-16 text-center text-3xl md:text-5xl font-bold">
        {categoryToTitle(category)}
      </div>
      <div className="flex justify-end mb-4 px-2">
          {/* Dropdown Menu */}
          <div 
            className="dropdown relative flex items-center h-6 cursor-pointer select-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            ref={dropdownRef}
          >
            <div 
              className="flex items-center"
            >
              <span className="text-secondary mr-4 md:mr-2">
                Sort by
              </span>
              <span className="font-semibold mr-3 hidden md:block">
                {sortBy}
              </span>
              <div className={`w-2 h-2 border-t-[2px] border-l-[2px] border-black
              ${dropdownOpen ? 'rotate-45 translate-y-[2px]' 
                : '-rotate-[135deg] -translate-y-[2px]'} duration-200 ease`}></div>
            </div>
            {/* Dropdown Menu - Above 768px */}
            {
              dropdownOpen && (
                <div 
                  className="dropdown absolute top-8 md:top-10 right-0 overflow-hidden border bg-white z-20 p-4 md:px-8 md:py-6 space-y-2 text-secondary
                  hidden md:flex cursor-default flex-col items-start w-56"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="leading-relaxed cursor-pointer"
                    onClick={() => {
                      setSortBy('Featured')
                      setDropdownOpen(false)
                    }}
                  >
                    Featured
                    {
                      sortBy === 'Featured' && (
                        <i className="fa-solid fa-check ml-2 text-black text-sm"></i>
                      )
                    }
                  </div>
                  <div
                    className="leading-relaxed cursor-pointer"
                    onClick={() => {
                      setSortBy('Price, low to high')
                      setDropdownOpen(false)
                    }}
                  >
                    Price, low to high
                    {
                      sortBy === 'Price, low to high' && (
                        <i className="fa-solid fa-check ml-2 text-black text-sm"></i>
                      )
                    }
                  </div>
                  <div
                    className="leading-relaxed cursor-pointer"
                    onClick={() => {
                      setSortBy('Price, high to low')
                      setDropdownOpen(false)
                    }}
                  >
                    Price, high to low
                    {
                      sortBy === 'Price, high to low' && (
                        <i className="fa-solid fa-check ml-2 text-black text-sm"></i>
                      )
                    }
                  </div>
                  <div
                    className="leading-relaxed cursor-pointer"
                    onClick={() => {
                      setSortBy('Rating')
                      setDropdownOpen(false)
                    }}
                  >
                    Rating
                    {
                      sortBy === 'Rating' && (
                        <i className="fa-solid fa-check ml-2 text-black text-sm"></i>
                      )
                    }
                  </div>
                </div>
              )
            }
          </div>
          {/* Dropdown Menu - Below 768px */}
          <div 
            className={`fixed md:hidden inset-x-0 bottom-0 bg-white flex flex-col z-40
            rounded-t-lg ${dropdownOpen ? 'translate-y-0' : 'translate-y-full'}
            duration-200 ease`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-6 py-4 flex justify-center items-center border-b">
              <span className="font-semibold">Sort by</span>
              <i 
                className="fa-solid fa-times absolute right-6 text-xl cursor-pointer"
                onClick={() => setDropdownOpen(false)}
              ></i>
            </div>
            <div className="p-6 space-y-4">
              <div
                className="flex justify-center items-center leading-relaxed"
                onClick={() => {
                  setSortBy('Featured')
                  setDropdownOpen(false)
                }}
              >
                <span className="relative flex items-center">
                  Featured
                  {
                    sortBy === 'Featured' && (
                      <i className="fa-solid fa-check text-black text-sm
                      absolute -right-6"></i>
                    )
                  }
                </span> 
              </div>
              <div
                className="flex justify-center items-center leading-relaxed"
                onClick={() => {
                  setSortBy('Price, low to high')
                  setDropdownOpen(false)
                }}
              >
                <span className="relative flex items-center">
                  Price, low to high
                  {
                    sortBy === 'Price, low to high' && (
                      <i className="fa-solid fa-check text-black text-sm
                      absolute -right-6"></i>
                    )
                  }
                </span> 
              </div>
              <div
                className="flex justify-center items-center leading-relaxed"
                onClick={() => {
                  setSortBy('Price, high to low')
                  setDropdownOpen(false)
                }}
              >
                <span className="relative flex items-center">
                  Price, high to low
                  {
                    sortBy === 'Price, high to low' && (
                      <i className="fa-solid fa-check text-black text-sm
                      absolute -right-6"></i>
                    )
                  }
                </span> 
              </div>
              <div
                className="flex justify-center items-center leading-relaxed"
                onClick={() => {
                  setSortBy('Rating')
                  setDropdownOpen(false)
                }}
              >
                <span className="relative flex items-center">
                  Rating
                  {
                    sortBy === 'Rating' && (
                      <i className="fa-solid fa-check text-black text-sm
                      absolute -right-6"></i>
                    )
                  }
                </span> 
              </div>
            </div>
          </div>
          {/* Black Background - Below 768px */}
          <div 
            className={`fixed md:hidden inset-0 z-30 bg-black/50 duration-200 ease
            ${dropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setDropdownOpen(false)}
          ></div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6
      md:gap-x-6 md:gap-y-12">
        {
          products ? currentProducts
          .sort((a, b) => {
            if(sortBy === 'Featured') return a.id - b.id
            if(sortBy === 'Price, low to high') return (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
            if(sortBy === 'Price, high to low') return (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
            if(sortBy === 'Rating') return b.rating - a.rating
          })
          .map(product => (
            <Product product={product} key={product.id} />
          )) : (
            new Array(12).fill(0).map((_, index) => (
            <div className="flex flex-col space-y-6" key={index}>
              {/* Product Image */}
              <div className="relative z-0 aspect-square bg-background"></div>
              {/* Product Description */}
              <div className="flex flex-col aspect-[2/1]">
                <div className="font-semibold text-sm bg-background">
                  &nbsp;
                </div>
                {/* Rating */}
                <span className="text-accent text-sm mt-2 bg-background w-32">
                  &nbsp;
                </span>
                {/* Price */}
                <span className="mt-2 text-sm bg-background w-32 md:w-48">
                  &nbsp;
                </span>
              </div>
            </div>
            ))
          )
        }

      </div>
      {/* Pagination */}
      {
        products?.length > productsPerPage && (
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )
      }
    </div>
  )
}
export default Collection