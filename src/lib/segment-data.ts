import { Area, Segment } from './segment-types'
import { loadAreas, loadSegments, loadSegmentsByArea } from './data-loader'

// Eksportujemy dane wczytane z plików JSON
export const areas: Area[] = loadAreas()
export const segments: Segment[] = loadSegments()

// Funkcje pomocnicze do pobierania segmentów dla określonego obszaru
export function getSegmentsByArea(areaId: string): Segment[] {
  return loadSegmentsByArea(areaId)
}

// Funkcja do pobierania segmentu po ID
export function getSegmentById(segmentId: string): Segment | undefined {
  return segments.find(segment => segment.id === segmentId)
}

// Funkcja do pobierania obszaru po ID
export function getAreaById(areaId: string): Area | undefined {
  return areas.find(area => area.id === areaId)
}
