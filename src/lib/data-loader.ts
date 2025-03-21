import { Area, Segment } from './segment-types'
// Importy plików JSON
import areasData from '../data/areas.json'
import configData from '../data/config.json'

// Importy segmentów dla poszczególnych obszarów
import workOrganizationSegments from '../data/segments/work-organization.json'
import locationMobilitySegments from '../data/segments/location-mobility.json'
import workEnvironmentSegments from '../data/segments/work-environment.json'
import workTimeSegments from '../data/segments/work-time.json'
import workStyleSegments from '../data/segments/work-style.json'
import workConditionsSegments from '../data/segments/work-conditions.json'
import workDevelopmentSegments from '../data/segments/work-development.json'
import workValuesSegments from '../data/segments/work-values.json'
import personalTraitsSegments from '../data/segments/personal-traits.json'
import techStackSegments from '../data/segments/tech-stack.json'
import workIntimacySegments from '../data/segments/work-intimacy.json'
import umiejetnosciCyfroweSegments from '../data/segments/umiejetnosci-cyfrowe.json'
import automatyzacjaLowcodeSegments from '../data/segments/automatyzacja-lowcode.json'
import narzedziaKreatywneSegments from '../data/segments/narzedzia-kreatywne.json'

// Funkcja do wczytywania obszarów z pliku JSON
export function loadAreas(): Area[] {
  try {
    if (configData.dataSource !== 'json') {
      console.error('Nieprawidłowe źródło danych. Oczekiwano "json".')
      return []
    }
    
    return areasData as Area[]
  } catch (error) {
    // Błąd podczas wczytywania obszarów
    return []
  }
}

// Funkcja do wczytywania segmentów z plików JSON
export function loadSegments(): Segment[] {
  try {
    if (configData.dataSource !== 'json') {
      console.error('Nieprawidłowe źródło danych. Oczekiwano "json".')
      return []
    }
    
    // Łączymy segmenty ze wszystkich plików
    const allSegments = [
      ...workOrganizationSegments,
      ...workIntimacySegments,
      ...locationMobilitySegments,
      ...workEnvironmentSegments,
      ...workTimeSegments,
      ...workStyleSegments,
      ...workConditionsSegments,
      ...workDevelopmentSegments,
      ...workValuesSegments,
      ...personalTraitsSegments,
      ...techStackSegments,
      ...umiejetnosciCyfroweSegments,
      ...automatyzacjaLowcodeSegments,
      ...narzedziaKreatywneSegments
    ] as Segment[]
    
    return allSegments
  } catch (error) {
    // Błąd podczas wczytywania segmentów
    return []
  }
}

// Funkcja do wczytywania segmentów dla określonego obszaru
export function loadSegmentsByArea(areaId: string): Segment[] {
  try {
    switch (areaId) {
      case 'work-organization':
        return workOrganizationSegments as Segment[]
      case 'location-mobility':
        return locationMobilitySegments as Segment[]
      case 'work-environment':
        return workEnvironmentSegments as Segment[]
      case 'work-time':
        return workTimeSegments as Segment[]
      case 'work-style':
        return workStyleSegments as Segment[]
      case 'work-conditions':
        return workConditionsSegments as Segment[]
      case 'work-development':
        return workDevelopmentSegments as Segment[]
      case 'work-values':
        return workValuesSegments as Segment[]
      case 'personal-traits':
        return personalTraitsSegments as Segment[]
      case 'tech-stack':
        return techStackSegments as Segment[]
      case 'umiejetnosci-cyfrowe':
        return umiejetnosciCyfroweSegments as Segment[]
      case 'automatyzacja-lowcode':
        return automatyzacjaLowcodeSegments as Segment[]
      case 'narzedzia-kreatywne':
        return narzedziaKreatywneSegments as Segment[]
      default:
        // Nieznany obszar
        return []
    }
  } catch (error) {
    // Błąd podczas wczytywania segmentów dla obszaru
    return []
  }
}

// Funkcja do zapisywania obszarów do pliku JSON
// Ta funkcja będzie zaimplementowana w przyszłości, gdy będziemy mieli
// możliwość zapisywania danych do plików JSON po stronie klienta
export function saveAreas(areas: Area[]): boolean {
  // Zapisywanie obszarów
  // Tutaj będzie implementacja zapisywania do pliku
  return true
}

// Funkcja do zapisywania segmentów do pliku JSON
// Ta funkcja będzie zaimplementowana w przyszłości, gdy będziemy mieli
// możliwość zapisywania danych do plików JSON po stronie klienta
export function saveSegments(segments: Segment[]): boolean {
  // Zapisywanie segmentów
  // Tutaj będzie implementacja zapisywania do pliku
  return true
}

// Eksportujemy dane bezpośrednio, aby były dostępne w aplikacji
export const areas = loadAreas()
export const segments = loadSegments()
