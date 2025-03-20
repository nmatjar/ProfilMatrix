import React from 'react'
import { SegmentManager } from '../components/SegmentManager'
import { ActiveSegment } from '../lib/segment-types'

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
    <div className="container mx-auto py-6">
      <SegmentManager 
        activeSegments={activeSegments}
        onSegmentToggle={handleSegmentToggle}
      />
    </div>
  )
}
