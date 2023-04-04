import React from 'react';
import { useHistory } from 'react-router-dom';
import './header.css'

const Header = () => {
    const history = useHistory()

    const linkArray = [
        {name: 'Login', link: '/login'}
    ]

  return (
    <nav className='nav'>
        <div>
            <img alt='webuild' scr=''/>
        </div>
        <div>
            {linkArray.map((el) => {
                return <a className='nav-link' href={el.link}>{el.name}</a>
            })}
        </div>
    </nav>
  )
}

export default Header