import React, { useCallback } from 'react'
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer'
import { useDiagram } from '../context/DiagramContext'

export default function Diagram() {
  const { nodes: ctxNodes, edges: ctxEdges, setEdges: setCtxEdges } = useDiagram()

  const onConnect = useCallback((params) => {
    const id = `e${Date.now()}`
    const newEdge = { id, ...params }
    setCtxEdges(prev => [...prev, newEdge])
  }, [setCtxEdges])

  return (
    <div style={{width:'100%', height:'100%'}}>
      <ReactFlow nodes={ctxNodes} edges={ctxEdges} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}