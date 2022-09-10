function Footer() {
  return (
    <div className="bg-primary">
      <div className="container mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col items-center space-y-16 lg:space-y-0 lg:flex-row lg:items-start justify-between text-white uppercase">
          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold">
            GymHub
          </div>
          {/* Columns */}
          <div className="flex flex-col text-center space-y-8 md:space-y-0 md:flex-row md:space-x-16 md:text-left">
            {/* Column 1 */}
            <div className="flex flex-col space-y-5">
              <div className="text-xs tracking-widest font-semibold">Support</div>
              <div className="flex flex-col items-center md:items-start space-y-2 text-sm">
                <div className="cursor-not-allowed">
                  FAQs
                </div>
                <div className="cursor-not-allowed">
                  Return & exchange
                </div>
                <div className="cursor-not-allowed">
                  Shipping costs
                </div>
                <div className="cursor-not-allowed">
                  Contact us
                </div>
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col space-y-5">
              <div className="text-xs tracking-widest font-semibold">My account</div>
              <div className="flex flex-col items-center md:items-start space-y-2 text-sm">
                <div className="cursor-not-allowed">
                  Login
                </div>
                <div className="cursor-not-allowed">
                  Register
                </div>
              </div>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col space-y-5">
              <div className="text-xs tracking-widest font-semibold">Information</div>
              <div className="flex flex-col items-center md:items-start space-y-2 text-sm">
                <div className="cursor-not-allowed">
                  About us
                </div>
                <div className="cursor-not-allowed">
                  Career
                </div>
                <div className="cursor-not-allowed">
                  Terms & conditions
                </div>
                <div className="cursor-not-allowed">
                  Privacy policy
                </div>
              </div>
              
            </div>
          </div>
          {/* Socials */}
          <div className="flex items-center space-x-6 text-2xl">
            <i className="fa-brands fa-facebook cursor-pointer"></i>
            <i className="fa-brands fa-twitter cursor-pointer"></i>
            <i className="fa-brands fa-instagram cursor-pointer"></i>
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer