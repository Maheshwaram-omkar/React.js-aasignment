import React, { createContext, useContext, useState } from 'react'

const DiagramContext = createContext()

export function DiagramProvider({ children }) {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const loadFromMetadata = (metadata) => {
    setNodes(metadata.nodes || [])
    setEdges(metadata.edges || [])
  }

  return (
    <DiagramContext.Provider value={{ nodes, setNodes, edges, setEdges, loadFromMetadata }}>
      {children}
    </DiagramContext.Provider>
  )
}

export const useDiagram = () => useContext(DiagramContext)