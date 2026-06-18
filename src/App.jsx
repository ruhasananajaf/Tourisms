import { Routes, Route } from 'react-router-dom'
import Layout from './Components/layout/Layout'
import Home from './Pages/Home'
import About from './Pages/About'
import Services from './Pages/Services'
import RentACar from './Pages/RentACar'
import Blogs from './Pages/Blogs'
import Contact from './Pages/Contact'
import Destination from './Pages/Destination'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
         <Route path="destination" element={<Destination />} />
        <Route path="services" element={<Services />} />
        <Route path="rent-a-car" element={<RentACar />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}
