import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav.jsx'
import Foot from './components/foot.jsx'
import Contacts from './pages/contacts.jsx';
import Home from './pages/home.jsx';
import Video from './pages/room.jsx';
import About from './pages/About.jsx'

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Video/>} />
          {/* just put / in href and anchor takes you to home page after routing  */}
          <Route path="c" element={<Contacts />} />
          <Route path="a" element={<About />} />
        </Routes>
      </BrowserRouter>
      <Foot />
    </>

  )
}
export default App;