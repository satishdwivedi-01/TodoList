
const Nav = () => {
  return (
    <nav className="h-16 flex justify-between bg-slate-600 text-gray-300">
        <h1 className="m-3 mx-8 font-bold text-xl">TodoLIST</h1>
        
        <ul className="flex gap-6 mx-8 m-3 p-2">
            <li className="cursor-pointer  hover:text-lg transition-all">todo</li>
            <li className="cursor-pointer hover:text-lg transition-all w-12">Home</li>
        </ul>
    </nav>
  )
}

export default Nav