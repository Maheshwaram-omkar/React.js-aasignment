import React, { useState } from 'react'
import { useDiagram } from '../context/DiagramContext'

export default function Sidebar() {
  const { nodes, setNodes, edges, setEdges, loadFromMetadata } = useDiagram()
  const [jsonText, setJsonText] = useState('')

  const loadSample = async () => {
    try {
      const res = await fetch('/src/data/sample-metadata.json')
      const j = await res.json()
      loadFromMetadata(j)
    } catch (e) { console.error(e) }
  }

  const importJson = () => {
    try {
      const j = JSON.parse(jsonText)
      loadFromMetadata(j)
    } catch (e) { alert('Invalid JSON') }
  }

  const addNode = () => {
    const id = String(Date.now())
    const newNode = { id, position: { x: 50 + nodes.length*40, y: 50 + nodes.length*30 }, data: { label: `Node ${nodes.length+1}` }, type: 'default' }
    setNodes([...nodes, newNode])
  }

  const addEdge = () => {
    if (nodes.length < 2) return alert('Need at least 2 nodes')
    const newEdge = { id: `e${Date.now()}`, source: nodes[0].id, target: nodes[nodes.length-1].id }
    setEdges([...edges, newEdge])
  }

  return (
    <div className='sidebar'>
      <h3>Sidebar</h3>
      <button onClick={loadSample}>Load sample metadata</button>
      <button onClick={addNode}>Add node</button>
      <button onClick={addEdge}>Add edge</button>
      <hr />
      <textarea value={jsonText} onChange={e => setJsonText(e.target.value)} rows={8} style={{width:'100%'}} placeholder='Paste metadata JSON here'></textarea>
      <button onClick={importJson}>Import JSON</button>
      <hr />
      <div>
        <h4>Nodes ({nodes.length})</h4>
        <ul>{nodes.map(n => <li key={n.id}>{n.data?.label || n.id}</li>)}</ul>
        <h4>Edges ({edges.length})</h4>
        <ul>{edges.map(e => <li key={e.id}>{e.source} → {e.target}</li>)}</ul>
      </div>
    </div>
  )
}