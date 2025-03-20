import { Area, Segment } from './segment-types'
// Importy plików JSON
import areasData from '../data/areas.json'
import segmentsData from '../data/segments.json'
import configData from '../data/config.json'

// Funkcja do wczytywania obszarów z pliku JSON
export function loadAreas(): Area[] {
  try {
    if (configData.dataSource !== 'json') {
      console.error('Nieprawidłowe źródło danych. Oczekiwano "json".')
      return []
    }
    
    return areasData as Area[]
  } catch (error) {
    console.error('Błąd podczas wczytywania obszarów:', error)
    return []
  }
}

// Funkcja do wczytywania segmentów z pliku JSON
export function loadSegments(): Segment[] {
  try {
    if (configData.dataSource !== 'json') {
      console.error('Nieprawidłowe źródło danych. Oczekiwano "json".')
      return []
    }
    
    return segmentsData as Segment[]
  } catch (error) {
    console.error('Błąd podczas wczytywania segmentów:', error)
    return []
  }
}

// Funkcja do wczytywania segmentów dla określonego obszaru
export function loadSegmentsByArea(areaId: string): Segment[] {
  const segments = loadSegments()
  return segments.filter(segment => segment.areaId === areaId)
}

// Funkcja do zapisywania obszarów do pliku JSON
// Ta funkcja będzie zaimplementowana w przyszłości, gdy będziemy mieli
// możliwość zapisywania danych do plików JSON po stronie klienta
export function saveAreas(areas: Area[]): boolean {
  console.log('Zapisywanie obszarów:', areas)
  // Tutaj będzie implementacja zapisywania do pliku
  return true
}

// Funkcja do zapisywania segmentów do pliku JSON
// Ta funkcja będzie zaimplementowana w przyszłości, gdy będziemy mieli
// możliwość zapisywania danych do plików JSON po stronie klienta
export function saveSegments(segments: Segment[]): boolean {
  console.log('Zapisywanie segmentów:', segments)
  // Tutaj będzie implementacja zapisywania do pliku
  return true
}

// Eksportujemy dane bezpośrednio, aby były dostępne w aplikacji
export const areas = loadAreas()
export const segments = loadSegments()
