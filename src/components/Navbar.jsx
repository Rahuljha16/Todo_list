import React from 'react'
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-violet-800 text-white py-4'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTasks</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all duration-100 flex '><IoMdHome/>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-100'>You task</li>
        </ul>
    </nav>
  )
}

export default Navbar