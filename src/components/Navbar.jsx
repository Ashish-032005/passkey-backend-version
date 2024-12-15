import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="myContainer flex items-center px-4 justify-between h-14 py-5">
        <div className="logo font-bold text text-2xl">
            
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>Key/&gt;</span>
            
        </div>
        <button className='text-white bg-green-700 my-5 rounded-full flex justify-between items-center ring-white ring-1'>
          <img className='invert w-10 p-1' src="icons/github.png" alt="" />
          <span className='font-bold px-2'><a href="https://github.com/Ashish-032005">GitHub</a></span>
        </button>
        </div>
    </nav>
  )
}

export default Navbar