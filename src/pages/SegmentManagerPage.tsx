import React from 'react'
import { SegmentManager } from '../components/SegmentManager'
import { ActiveSegment } from '../lib/segment-types'
import { Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SegmentManagerPage() {
  // Example of active segments that could be passed to the SegmentManager
  const activeSegments: ActiveSegment[] = [
    { id: 'active-1', segmentId: 'segment-1', value: '', visible: true, order: 0 },
    { id: 'active-2', segmentId: 'segment-2', value: '', visible: true, order: 1 }
  ]
  
  // Handler for toggling segments
  const handleSegmentToggle = (segmentId: string, active: boolean) => {
    console.log(`Segment ${segmentId} toggled to ${active ? 'active' : 'inactive'}`)
    // In a real app, you would update your state or database here
  }
  
  return (
    <div className="min-h-screen bg-black text-green-500 flex flex-col">
      <header className="border-b border-green-900 p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Terminal className="h-6 w-6 mr-2" />
            {">_ ProfileCoder_v1.0"}
          </h1>
          <Link to="/" className="text-green-500 hover:text-green-400">
            Powrót do głównej
          </Link>
        </div>
      </header>
      <div className="container mx-auto py-6">
        <SegmentManager 
          activeSegments={activeSegments}
          onSegmentToggle={handleSegmentToggle}
        />
      </div>
    </div>
  )
}
