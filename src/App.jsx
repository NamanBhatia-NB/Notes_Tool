import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Notes from './components/Notes.jsx';
import Footer from './components/Footer.jsx';


function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element:  <Home />
    },
    {
      path: '/notes',
      element: <Notes />
    }
  ])

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
