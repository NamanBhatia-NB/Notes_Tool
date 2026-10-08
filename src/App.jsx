import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notes from './components/Notes.jsx';

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
