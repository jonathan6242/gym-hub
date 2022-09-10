function Price({ salePrice, originalPrice, productPage, cart, quantity = 1 }) {
  return (
    <>
      {
        salePrice ? (
          <>
            <span>
              ${(quantity * salePrice / 100).toFixed(2)}
            </span>
            {!cart && <>&nbsp;&nbsp;</>}
            <span className={`line-through text-secondary
            ${productPage ? 'text-base' : ''}
            ${cart ? 'text-sm' : ''}`}>
              ${(quantity * originalPrice / 100).toFixed(2)}
            </span>
          </>
        ) : (
          <>    
            ${(quantity * originalPrice / 100).toFixed(2)}
          </>
        )
      }
    </>
  )
}
export default Price