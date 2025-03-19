import React, { useState, useEffect } from 'react'
import { SegmentManager } from '../components/SegmentManager'
import '../styles/SegmentManager.css'
import { ActiveSegment } from '../lib/segment-types'
import { getAllSegments } from '../lib/segment-service'
import { useToast } from '../components/ui/use-toast'

export default function SegmentManagerPage() {
  const { toast } = useToast()
  const [activeSegments, setActiveSegments] = useState<ActiveSegment[]>([])
  
  // Inicjalizacja aktywnych segmentów z localStorage
  useEffect(() => {
    const savedSegments = localStorage.getItem('activeSegments')
    if (savedSegments) {
      try {
        const parsed = JSON.parse(savedSegments)
        setActiveSegments(parsed)
        console.log('Loaded active segments:', parsed)
      } catch (e) {
        console.error('Błąd podczas ładowania aktywnych segmentów:', e)
        // Inicjalizacja domyślnymi segmentami, jeśli localStorage jest uszkodzony
        initializeDefaultSegments()
      }
    } else {
      // Jeśli brak zapisanych segmentów, inicjalizuj domyślnymi
      initializeDefaultSegments()
    }
  }, [])
  
  // Inicjalizacja domyślnych segmentów
  const initializeDefaultSegments = () => {
    const segments = getAllSegments()
    const defaultActiveSegments: ActiveSegment[] = segments.map((segment, index) => ({
      id: `active-${segment.id}`,
      segmentId: segment.id,
      value: segment.defaultValue?.toString() || '',
      visible: true, // Domyślnie wszystkie segmenty są widoczne
      order: index
    }))
    
    setActiveSegments(defaultActiveSegments)
    localStorage.setItem('activeSegments', JSON.stringify(defaultActiveSegments))
    console.log('Initialized default segments:', defaultActiveSegments)
  }
  
  // Obsługa przełączania segmentów
  const handleSegmentToggle = (segmentId: string, active: boolean) => {
    console.log('Toggling segment in SegmentManagerPage:', segmentId, active);
    
    const updatedSegments = activeSegments.map(segment => {
      if (segment.segmentId === segmentId) {
        return { ...segment, visible: active };
      }
      return segment;
    });
    
    // Jeśli nie znaleziono segmentu, dodaj go
    if (!activeSegments.some(s => s.segmentId === segmentId)) {
      updatedSegments.push({
        id: `active-${segmentId}`,
        segmentId: segmentId,
        value: '',
        visible: active,
        order: activeSegments.length
      });
    }
    
    console.log('Updated segments:', updatedSegments);
    setActiveSegments(updatedSegments);
    localStorage.setItem('activeSegments', JSON.stringify(updatedSegments));
    
    toast({
      title: active ? "Segment aktywowany" : "Segment dezaktywowany",
      description: `Segment ${segmentId} został ${active ? 'włączony' : 'wyłączony'}`,
    });
  };
  
  return (
    <div className="page segment-manager-page">
      <h1>Zarządzanie Segmentami</h1>
      <p>Włącz lub wyłącz segmenty, które mają być widoczne w kodzie profilu.</p>
      <SegmentManager 
        activeSegments={activeSegments} 
        onSegmentToggle={handleSegmentToggle} 
      />
    </div>
  )
}
