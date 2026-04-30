import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import SignUpForm from '@/components/common/SignUpForm'
import Cart from '@/components/cart/Cart'
import FadeUpAnimation from '@/components/common/FadeUpAnimation'

export function MainLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FadeUpAnimation>
        <SignUpForm />
      </FadeUpAnimation>
      <Cart />
      <FadeUpAnimation>
        <Footer />
      </FadeUpAnimation>
    </>
  )
}