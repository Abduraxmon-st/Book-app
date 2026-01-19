import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/navbar'
import { Footer } from '../components/footer'

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-97.5 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
