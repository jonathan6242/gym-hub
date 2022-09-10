function Highlight({icon, title, text}) {
  return (
    <div className="flex-1 text-center flex flex-col items-center space-y-4">
      <div className="text-2xl">
        {icon}
      </div>
      <div className="text-xs md:text-sm font-semibold uppercase tracking-widest">
        {title}
      </div>
      <div className="text-sm md:text-base max-w-xs md:max-w-sm leading-loose">{text}</div>
    </div>
  )
}
export default Highlight