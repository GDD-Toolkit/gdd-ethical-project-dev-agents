import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProgressBar from "./components/progressBar.tsx"

function App() {

  return (
    <>
      <ProgressBar page={1} total={3} />
      <ProgressBar page={2} total={5} />
    </>
  )
}

export default App
