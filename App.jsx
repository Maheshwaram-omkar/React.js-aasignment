import React from 'react'
import { DiagramProvider } from './context/DiagramContext'
import Sidebar from './components/Sidebar'
import Diagram from './components/Diagram'

export default function App() {
  return (
    <DiagramProvider>
      <div className='app'>
        <div className='sidebar'><Sidebar /></div>
        <div className='canvas'><Diagram /></div>
      </div>
    </DiagramProvider>
  )
}