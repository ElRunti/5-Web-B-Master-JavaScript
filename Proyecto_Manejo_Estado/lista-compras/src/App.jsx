import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ListaCompras from './ListaCompras'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Lista de compras</h1>
    {
    }
    <ListaCompras/>
    </>
  )
}

export default App
