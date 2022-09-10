import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Price from "../components/Price";
import Product from "../components/Product";
import Rating from "../components/Rating";
import CartContext from "../context/CartContext";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState(null);

  const { cart, addToCart } = useContext(CartContext)
  const { id } = useParams();
  const productOnCart = cart.filter(item => +item?.id === +product?.id).length > 0

  useEffect(() => {
    async function getProduct() {
      setProduct(null);
      const { data } = await axios.get(`/product/${id}`)
      setTimeout(() => {
        setProduct(data)
      }, 300)
    }
    async function getRecommended() {
      setRecommended(null);
      const { data } = await axios.get(`/product/${id}/recommended`)
      setTimeout(() => {
        setRecommended(data)
      }, 300)
    }
    getProduct();
    getRecommended();
  }, [id])

  return (
    <div className="flex flex-col flex-1 container mx-auto max-w-6xl px-3 sm:px-6 pt-6 pb-16">
      <div className="flex flex-col lg:flex-row w-full">
        {/* Product Image */}
        <div className="lg:flex-1 flex items-center lg:justify-center p-4">
          {
            product ? <img src={product?.url} alt="" className="max-h-96 lg:max-h-full lg:max-w-sm" />
            : (
              <div className="w-full aspect-[4/5] bg-background max-h-96 max-w-xs lg:max-h-full lg:max-w-sm">
              </div>
            )
          }
          
        </div>
        {/* Product Information */}
        {
          product ? (
            <div className="lg:flex-1 p-4 flex flex-col">
              <div className="flex flex-col space-y-6 pb-4 border-b">
                <div className="text-3xl font-bold">
                  {product?.name}
                </div>
                <div className="text-2xl">
                  <Price
                    salePrice={product?.salePrice}
                    originalPrice={product?.originalPrice}
                    productPage
                  />
                </div>
              </div>
              <div className="pt-6 space-y-6">
                <div className="text-accent">
                  {
                    product && (
                      <Rating rating={product?.rating} />
                    )
                  }
                </div>
                {/* Product Description */}
                <div>
                  <div className="font-semibold text-lg">Description</div>
                  <p className="mt-2 leading-loose">
                    {product?.description}
                  </p>
                </div>
                {/* Add To Cart Button */}
                {
                  !productOnCart ? (
                    <div 
                      className="relative group bg-accent py-4 uppercase text-white text-center
                      text-sm font-semibold tracking-widest cursor-pointer overflow-hidden"
                      onClick={() => addToCart(product)}
                    >
                      <span className="relative z-10">Add to cart</span> 
                      <div className="absolute inset-0 bg-[#ea7610] translate-y-full
                      group-hover:translate-y-0 duration-150 ease">
                
                      </div>
                    </div>
                  ) : (
                    <Link 
                      className="relative group bg-accent py-4 uppercase text-white text-center text-sm font-semibold tracking-widest cursor-pointer overflow-hidden block"
                      to='/cart'
                    >
                      <span className="relative z-10">Checkout</span> 
                      <div className="absolute inset-0 bg-[#ea7610] translate-y-full
                      group-hover:translate-y-0 duration-150 ease">
                
                      </div>
                    </Link>
                  )
                }

              </div>
            
            </div>
          ) : (
            <div className="lg:flex-1 p-4 flex flex-col">
              <div className="flex flex-col space-y-6 pb-6 border-b border-transparent">
                <div className="h-8 font-bold bg-background max-w-[350px] lg:max-w-full lg:w-auto">
                  &nbsp;
                </div>
                <div className="h-6 bg-background w-48">
                  &nbsp;
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="bg-background w-48 self-start h-6">
                  &nbsp;
                </div>
                {/* Product Description */}
                <div>
                  <p className="mt-4 h-48 bg-background">
                    &nbsp;
                  </p>
                </div>
                {/* Add To Cart Button */}
                <div className="relative group bg-background py-4 uppercase text-white text-center
                text-sm font-semibold tracking-widest cursor-pointer overflow-hidden">
                  &nbsp;
                </div>
              </div>
            
            </div>
          )
        }
        {/* Product Information Skeleton */}

      </div>
      <div className="p-4 flex flex-col space-y-8 mt-8">
        {
          recommended ? (
            <div className="text-2xl font-bold">
              You may also like
            </div>
          ) : (
            <div className="text-2xl font-bold w-48 bg-background">
              &nbsp;
            </div>
          )
        }
    
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6
        md:gap-x-6 md:gap-y-12">
          {
            recommended ? (recommended.map(product => (
              <Product product={product} key={product.id} />
            ))) : (
              new Array(4).fill(0).map((_, index) => (
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
      </div>
    </div>
  )

  return (
    <div className="lg:flex-1 p-4 flex flex-col">
      <div className="flex flex-col space-y-6 pb-4 border-b">
        <div className="text-3xl font-bold">
          {product?.name}
        </div>
        <div className="text-2xl">
          <Price
            salePrice={product?.salePrice}
            originalPrice={product?.originalPrice}
            productPage
          />
        </div>
      </div>
      <div className="pt-6 space-y-6">
        <div className="text-accent">
          {
            product && (
              <Rating rating={product?.rating} />
            )
          }
        </div>
        {/* Product Description */}
        <div>
          <div className="font-semibold text-lg">Description</div>
          <p className="mt-2 leading-loose">
            {product?.description}
          </p>
        </div>
        {/* Add To Cart Button */}
        <div className="relative group bg-accent py-4 uppercase text-white text-center
        text-sm font-semibold tracking-widest cursor-pointer overflow-hidden">
          <span className="relative z-10">Add to cart</span> 
          <div className="absolute inset-0 bg-[#ea7610] translate-y-full
          group-hover:translate-y-0 duration-150 ease">
    
          </div>
        </div>
      </div>
    
    </div>
    )
}

export default ProductPage