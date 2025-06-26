import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex'>
        <span className='logo'>iTask</span>
        <ul className='nav-item flex' >
            <li className='li-item1'>home</li>
            <li className='li-item1'>Your Task</li>
        </ul>        
    </nav>
  )
}

export default Navbar
