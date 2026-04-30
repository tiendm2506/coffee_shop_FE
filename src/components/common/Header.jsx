import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import { BsBag } from 'react-icons/bs'
import { CiMenuFries } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { useScroll } from 'framer-motion'

import { openCart } from '@/store/cartSlice'
import { useScreenMedia } from '@/hooks'
import { ROUTES } from '@/constants'

const Header = () => {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useDispatch()
  const isDesktop = useScreenMedia('(min-width: 1024px)')
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const carts = useSelector((state) => state.cart.items)

  const handleToggleMenu = () => {
    setShowMenu(!showMenu)
  }
  const handleOpenCart=() => {
    dispatch(openCart())
  }

  useEffect(() => {
    const elmHeader = headerRef.current
    const observer = new ResizeObserver(() => {
      setHeaderHeight(elmHeader.offsetHeight)
    })
    if (elmHeader) observer.observe(elmHeader)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isDesktop) setShowMenu(true)
  }, [isDesktop])

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <header className={cx(
      'p-4 transition-all duration-300 z-40 fixed top-0 left-0 w-full',
      scrolled ? ' bg-secondary' : 'bg-light-coffee'
    )} ref={headerRef}>
      <nav className='ct-container mx-auto flex flex-row justify-between items-center'>
        <div className='logo basis-2/6 text-center text-xl font-semibold cursor-pointer text-white lg:basis-1/6'>Coffee shop</div>
        <ul className={cx(
          'uppercase text-sm text-white font-bold absolute left-0 z-10 w-full overflow-hidden transition-all duration-300 px-4',
          'lg:flex basis-4/6 lg:items-center lg:justify-end lg:gap-8 lg:static lg:bg-transparent lg:p-0',
          scrolled ? 'bg-secondary' : 'bg-light-coffee'
        )}
        style={{ top: headerHeight, height: showMenu ? menuRef.current?.scrollHeight : 0 }}
        ref={menuRef}
        >
          <li className='ct-top-menu-item'><Link href={ROUTES.HOMEPAGE}>Home</Link></li>
          <li className='ct-top-menu-item'><Link href={ROUTES.PRODUCTS_PAGE}>Our products</Link></li>
          <li className='ct-top-menu-item'><Link href={ROUTES.BLOG_PAGE}>Blog</Link></li>
          <li className='ct-top-menu-item'><Link href={ROUTES.ABOUT_PAGE}>About</Link></li>
          <li className='ct-top-menu-item'><Link href={ROUTES.CONTACT_PAGE}>Contact</Link></li>
        </ul>
        <ul className='basis-3/6 flex justify-end items-baseline uppercase text-sm text-gray-500 font-medium lg:basis-1/6'>
          <li className='ct-top-menu-item' onClick={handleOpenCart}>
            <button className='flex items-center text-white cursor-pointer'>
              <BsBag size={18} />
              <span className='mx-1 uppercase font-bold'>Cart</span>
              <span className='w-5 h-5 rounded-full bg-amber-400 inline-flex justify-center items-center font-bold text-[12px] text-black'>{carts?.length}</span>
            </button>
          </li>
        </ul>
        <div className='lg:hidden basis-1/6 flex items-center px-4'>
          <CiMenuFries size={18} onClick={handleToggleMenu} color='white' />
        </div>
      </nav>
    </header>
  )
}

export default Header