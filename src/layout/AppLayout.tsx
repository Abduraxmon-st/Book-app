import { Outlet } from 'react-router-dom'
import { FooterNavigation, Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-full xl:max-w-97.5 mx-auto pb-22">
        <Outlet />
      </main>
      <FooterNavigation />
      <Footer />
    </>
  )
}
