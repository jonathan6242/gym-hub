function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
  const pageNumbers = [];

  for(let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center pt-6">
      <ul className="flex space-x-1">
        {pageNumbers.map(number => (
          <li 
            key={number}
            className={`w-8 h-8 leading-8 text-center cursor-pointer
            ${currentPage === number ? 'text-white bg-accent' : ''}`}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination