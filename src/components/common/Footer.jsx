import Link from 'next/link'

import { ROUTES } from '@/constants'

const Footer = () => {
  return (
    <footer>
      <div className='bg-light-coffee py-10 text-white px-4'>
        <div className="ct-container lg:grid lg:grid-cols-2 lg:gap-10 mx-auto">
          <div>
            <Link href='/' className='text-3xl font-bold'>CoffeeShop</Link>
            <p className='mt-2 max-w-100'>The most versatile furniture system ever created. Designed to fit your life, made to move and grow.</p>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className="menu">
              <h3 className='text-lg mb-2'>Menu</h3>
              <ul>
                <li className='ct-link-footer-item'><Link href={ROUTES.HOMEPAGE}>Home</Link></li>
                <li className='ct-link-footer-item'><Link href={ROUTES.PRODUCTS_PAGE}>Our Product</Link></li>
                <li className='ct-link-footer-item'><Link href={ROUTES.ABOUT_PAGE}>About</Link></li>
                <li className='ct-link-footer-item'><Link href={ROUTES.BLOG_PAGE}>Blog</Link></li>
                <li className='ct-link-footer-item'><Link href={ROUTES.CONTACT_PAGE}>Contact</Link></li>
              </ul>
            </div>
            <div className="contact">
              <h3 className='text-lg mb-2'>Contact Us</h3>
              <ul>
                <li className='ct-link-footer-item'><Link href='#'>Facebook</Link></li>
                <li className='ct-link-footer-item'><Link href='#'>Instagram</Link></li>
                <li className='ct-link-footer-item'><Link href='#'>Pinterest</Link></li>
                <li className='ct-link-footer-item'><Link href='#'>Twitter</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-light-coffee/50 text-center py-2'>Copyright by Webflow</div>
    </footer>
  )
}

export default Footer