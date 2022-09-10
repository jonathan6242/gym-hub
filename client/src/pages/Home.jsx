import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Highlight from "../components/Highlight";
import Product from "../components/Product";
import Equipment from "../assets/equipment.jpg"

function Home() {
  const [bestsellers, setBestsellers] = useState(null);
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    async function getBestsellers() {
      setBestsellers(null)
      const { data }= await axios.get(`/products/bestsellers`)
      setTimeout(() => {
        setBestsellers(data)
      }, 600)
    }
    async function getOffers() {
      setOffers(null)
      const { data }= await axios.get(`/offers`)
      setTimeout(() => {
        setOffers(data.slice(0, 8))
      }, 600)
    }
    getBestsellers();
    getOffers();
  }, [])

  return (
    <div className="flex-1">
      <div
        className="home__header relative bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto max-w-6xl px-6 py-4 flex flex-col items-center">
          <div className="my-40 md:my-32 flex flex-col items-center text-center relative">
            {/* Secondary */}
            <span className="text-xs md:text-sm text-white uppercase mb-4 md:mb-8 font-semibold tracking-widest">
              Gym equipment and clothing
            </span>
            {/* Slogan */}
            <div className="text-white font-bold mb-12 text-4xl md:text-6xl
            max-w-lg md:max-w-3xl">
              Unleash your best performance.
            </div>
            {/* Button */}
            <Link 
              className="relative group bg-white p-4 px-8 uppercase text-center text-xs md:text-sm font-semibold tracking-widest cursor-pointer overflow-hidden block"
              to='/collections/equipment'
            >
              <span className="relative z-10">Browse Equipment</span> 
              <div className="absolute inset-0 bg-background translate-y-full
              group-hover:translate-y-0 duration-150 ease">
        
              </div>
            </Link>
          </div>
        </div>
        {/* <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" /> */}
      </div>
      {/* Bestselling Products */}
      <section id="bestsellers" className="py-9 md:py-16">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col text-center">
          <span className="text-xs md:text-sm uppercase mb-4 md:mb-8 font-semibold tracking-widest">
            Designed for performance
          </span>
          <div className="font-bold mb-12 text-3xl md:text-5xl">
            Our Bestsellers
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6
          md:gap-x-6 md:gap-y-12">
            {
              bestsellers ? bestsellers
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
        </div>
      </section>
      {/* Highlights */}
      <section id="highlights" className="py-10">
        <div className="container mx-auto max-w-6xl px-6 flex gap-12
        flex-col lg:flex-row">
          <Highlight
            icon={<i className="fa-solid fa-box"></i>}
            title="Easy and quick delivery"
            text="Reliable & tracked worldwide shipping within 6 days to your door."
          />
          <Highlight
            icon={<i className="fa-solid fa-earth-americas"></i>}
            title="Join the global movement"
            text="Join a community of over 121,000 athletes around the world."
          />
          <Highlight
            icon={<i className="fa-solid fa-person-running"></i>}
            title="By athletes for athletes"
            text="Products carefully designed with the purpose of serving your workout."
          />
        </div>
      </section>
      {/* Latest offers */}
      <section id="offers" className="py-9 md:py-16">
        <div className="container mx-auto max-w-6xl px-6 flex flex-col text-center">
          <span className="text-xs md:text-sm uppercase mb-4 md:mb-8 font-semibold tracking-widest">
            Cheap and affordable
          </span>
          <div className="font-bold mb-12 text-3xl md:text-5xl">
            Latest Offers
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6
          md:gap-x-6 md:gap-y-12">
            {
              offers ? offers
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
        </div>
      </section>
      {/* Explore */}
      <section id="explore" className="py-9 md:py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[500px] lg:h-[600px] auto-rows-fr">
            <Link
              to='/collections/women'
              className="relative group flex overflow-hidden aspect-[2/1] md:aspect-auto"
            >
              <img 
                src="https://cdn.shopify.com/s/files/1/1693/6097/files/11th_AUG_Shop_Womens_1440x.jpg?v=1660202242" 
                alt=""
                className="object-cover h-full w-full object-top group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center group-hover:bg-white/30">
                <div className="w-full text-white text-center px-6 uppercase font-semibold text-2xl sm:text-3xl lg:text-4xl group-hover:text-black">
                  womens
                </div>
              </div>
            </Link>
            <Link
              to="/collections/men"
              className="relative group flex overflow-hidden aspect-[2/1] md:aspect-auto"
            >
              <img 
                src="https://cdn.shopify.com/s/files/1/1693/6097/files/11th_AUG_Shop_Mens_1440x.jpg?v=1660143323"
                alt=""
                className="object-cover h-full w-full object-top group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center
              group-hover:bg-white/30">
                <div className="w-full text-white text-center px-6 uppercase font-semibold text-2xl sm:text-3xl lg:text-4xl group-hover:text-black">
                  mens
                </div>
              </div>
              
            </Link>
            <Link
              to="/collections/equipment"
              className="relative group overflow-hidden aspect-[2/1] md:aspect-auto md:col-span-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1620188526357-ff08e03da266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="object-cover h-full w-full object-top group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center group-hover:bg-white/30">
                <div className="w-full text-white text-center px-6 uppercase font-semibold text-2xl sm:text-3xl lg:text-4xl group-hover:text-black">
                  equipment
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home