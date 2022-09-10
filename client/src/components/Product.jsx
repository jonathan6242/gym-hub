import { Link } from "react-router-dom"
import Price from "./Price"
import Rating from "./Rating"

function Product({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="relative flex flex-col"
    >
      {
        product.salePrice && (
          <div className={`absolute px-2 py-1 bg-accent uppercase text-white text-xs md:text-sm font-semibold z-10 tracking-wide
          ${product.collections.includes('clothing') ? 'top-1 left-1 md:top-2 md:left-2' : 'top-0 left-0'}
          `}>
            Sale
          </div>
        )
      }
      {/* Product Image */}
      <figure 
        className={`relative z-0 aspect-square bg-white flex items-center justify-center overflow-hidden`}
      >
        <img
          src={product.url}
          className={`w-full ${product.collections.includes('clothing') ? 'object-cover' : 'object-contain m-3'}`} 
          alt=""
        />
      </figure>
      {/* Product Description */}
      <div className="flex flex-col aspect-[2/1] border-t pt-4">
        <div className="font-semibold md:text-lg">
          {product.name}
        </div>
        {/* Rating */}
        <span className="text-accent text-xs md:text-sm mt-2">
          <Rating rating={product.rating} />
        </span>
        {/* Price */}
        <span className="mt-1 md:text-lg">
          <Price 
            salePrice={product.salePrice}
            originalPrice={product.originalPrice}
          />
        </span>

      </div>
    </Link>
  )
}
export default Product