import { Segment } from './segment-types'
import { getAllSegments, getAllAreas } from './segment-service'
import { segments, areas } from './segment-data'

// Interfejs dla sparsowanego segmentu DNA
export interface ParsedDNASegment {
  area: string
  areaName: string
  emoji: string
  codes: {
    code: string
    value: string
    decodedValue: string
    description: string
    segmentEmoji?: string
  }[]
}

// Funkcja do generowania kodu segmentu na podstawie jego ID
export function generateSegmentCode(segmentId: string, existingCodes: Set<string>): string {
  // Usuń myślniki i podziel na słowa
  const words = segmentId.split('-')
  
  // Jeśli segment ma tylko jedno słowo
  if (words.length === 1) {
    // Weź pierwsze 3 litery (lub mniej, jeśli słowo jest krótsze)
    let code = words[0].substring(0, Math.min(3, words[0].length)).toUpperCase()
    
    // Jeśli kod już istnieje, dodaj liczbę na końcu
    let counter = 1
    let originalCode = code
    while (existingCodes.has(code)) {
      code = `${originalCode}${counter}`
      counter++
    }
    
    return code
  }
  
  // Dla segmentów z wieloma słowami, weź pierwsze litery każdego słowa
  let code = words.map(word => word.charAt(0).toUpperCase()).join('')
  
  // Jeśli kod już istnieje, dodaj liczbę na końcu
  let counter = 1
  let originalCode = code
  while (existingCodes.has(code)) {
    code = `${originalCode}${counter}`
    counter++
  }
  
  return code
}

// Funkcja do dekodowania wartości kodu DNA
export function decodeDNAValue(code: string, value: string): string {
  // Znajdź segment z odpowiednim kodem
  const segment = segments.find(s => s.code === code)
  if (!segment) return value // Jeśli nie znaleziono segmentu, zwróć oryginalną wartość
  
  // Sprawdź czy wartość zawiera + (wielokrotny wybór)
  if (value.includes('+') && segment.type === 'multiselect' && segment.reverseValueMap) {
    // Podziel wartości po znaku + i zdekoduj każdą z nich
    const values = value.split('+')
    const decodedValues = values.map(val => {
      return segment.reverseValueMap && segment.reverseValueMap[val] ? segment.reverseValueMap[val] : val
    })
    return decodedValues.join(', ')
  }
  
  // Jeśli istnieje reverseValueMap, użyj go do dekodowania
  if (segment.reverseValueMap && segment.reverseValueMap[value]) {
    return segment.reverseValueMap[value]
  }
  
  // Jeśli istnieje typ skali, zdekoduj go
  if (segment.scaleType && value.startsWith(segment.scaleType)) {
    const scaleValue = value.substring(1)
    
    switch (segment.scaleType) {
      case 'P':
        return `${scaleValue}%`
      case 'T':
        return `${scaleValue}/5`
      case 'F':
        return `Elastyczność: ${scaleValue}/5`
      case 'C':
        return `Kultura typu ${scaleValue}`
      case 'A':
        return `Dostępność: ${scaleValue}/5`
      case 'S':
        return `Synergia: ${scaleValue}/5`
      default:
        return value
    }
  }
  
  return value // Jeśli nie ma mapowania, zwróć oryginalną wartość
}

// Funkcja do grupowania segmentów według obszarów
export function groupSegmentsByArea(
  activeSegments: { id: string, segmentId: string, value: string | string[] | number, visible: boolean, order?: number }[]
): Record<string, { segmentId: string, value: string | string[] | number }[]> {
  const result: Record<string, { segmentId: string, value: string | string[] | number }[]> = {}
  
  // Inicjalizuj kategorie
  areas.forEach(area => {
    result[area.id] = []
  })
  
  console.log(`Grouping ${activeSegments.length} active segments`)
  let skippedSegments = 0
  
  // Grupuj aktywne segmenty według obszarów
  activeSegments.filter(s => s.visible).forEach(segment => {
    const segmentData = segments.find(s => s.id === segment.segmentId)
    
    if (!segmentData) {
      console.log(`No segment data found for segment: ${segment.segmentId}`)
      skippedSegments++
      return
    }
    
    const areaId = segmentData.areaId
    if (!result[areaId]) result[areaId] = []
    
    result[areaId].push({
      segmentId: segment.segmentId,
      value: segment.value
    })
  })
  
  console.log(`Skipped ${skippedSegments} segments due to missing data`)
  
  return result
}

// Funkcja do parsowania kodu DNA
export function parseDNACode(dnaCode: string): ParsedDNASegment[] {
  if (!dnaCode) return []
  
  const result: ParsedDNASegment[] = []
  
  // Podziel kod DNA na segmenty (obszary)
  const dnaSegments = dnaCode.split('|')
  
  dnaSegments.forEach(segment => {
    try {
      // Każdy segment powinien zaczynać się od emoji obszaru
      const match = segment.match(/^([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)(.+)$/u)
      if (!match) return
      
      const [, areaEmoji, codesStr] = match
      
      // Znajdź obszar na podstawie emoji
      const area = areas.find(a => a.emoji === areaEmoji)
      if (!area) {
        console.log(`Nie znaleziono obszaru dla emoji: ${areaEmoji}`)
        return
      }
      
      // Podziel kody na pary (emoji segmentu + wartość)
      const codeMatches = [...codesStr.matchAll(/([\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)([^[\p{Emoji}\p{Emoji_Presentation}\uFE0F]+)/gu)]
      
      const parsedCodes = []
      
      for (const [, segmentEmoji, value] of codeMatches) {
        // Znajdź segment na podstawie emoji
        const segment = segments.find(s => s.emoji === segmentEmoji)
        
        if (segment) {
          parsedCodes.push({
            code: segment.code || '???',
            value,
            decodedValue: decodeDNAValue(segment.code || '???', value),
            description: segment.description || segment.name,
            segmentEmoji
          })
        } else {
          console.log(`Nie znaleziono segmentu dla emoji: ${segmentEmoji}`)
          // Dodaj kod nawet jeśli nie ma segmentu, aby zachować wszystkie informacje
          parsedCodes.push({
            code: '???',
            value,
            decodedValue: value,
            description: `Nieznany segment: ${segmentEmoji}`,
            segmentEmoji
          })
        }
      }
      
      if (parsedCodes.length > 0) {
        result.push({
          area: area.id,
          areaName: area.name,
          emoji: areaEmoji,
          codes: parsedCodes
        })
      }
    } catch (error) {
      console.error('Błąd podczas parsowania segmentu:', segment, error)
    }
  })
  
  return result
}

// Funkcja do pobierania kodu DNA dla wartości segmentu
export function getDNACodeForValue(segmentId: string, value: string | number | string[]): string {
  const segment = segments.find(s => s.id === segmentId)
  
  if (!segment) return value.toString()
  
  // Jeśli wartość jest pusta lub undefined, zwróć pusty string
  if (value === undefined || value === null || value === '') return ''
  
  // Obsługa tablicy wartości dla multiselect
  if (Array.isArray(value)) {
    if (value.length === 0) return ''
    
    // Mapuj każdą wartość i łącz je znakiem +
    if (segment.valueMap) {
      return value.map(v => segment.valueMap[v] || v).join('+')
    }
    return value.join('+')
  }
  
  // Jeśli istnieje mapowanie wartości, użyj go
  if (segment.valueMap && typeof value === 'string' && segment.valueMap[value]) {
    return segment.valueMap[value]
  }
  
  // Jeśli istnieje typ skali, użyj go
  if (segment.scaleType && typeof value === 'number') {
    return `${segment.scaleType}${value}`
  }
  
  // Jeśli istnieje szablon formatowania, użyj go
  if (segment.formatTemplate) {
    return segment.formatTemplate.replace('{value}', value.toString())
  }
  
  // Jeśli wartość jest stringiem i zawiera spacje lub jest dłuższa niż 10 znaków,
  // wygeneruj skrócony kod na podstawie pierwszych liter słów
  if (typeof value === 'string' && (value.includes(' ') || value.length > 10)) {
    // Usuń znaki specjalne i podziel na słowa
    const words = value.replace(/[^\w\s]/gi, '').split(/\s+/)
    
    // Jeśli jest tylko jedno słowo, weź pierwsze 3 litery
    if (words.length === 1) {
      return words[0].substring(0, Math.min(3, words[0].length)).toUpperCase()
    }
    
    // Dla wielu słów, weź pierwsze litery każdego słowa (max 3)
    return words.slice(0, 3).map(word => word.charAt(0).toUpperCase()).join('')
  }
  
  // W przeciwnym razie zwróć oryginalną wartość
  return value.toString()
}

// Funkcja do generowania pełnego kodu DNA
export function generateDNACode(activeSegments: { id: string, segmentId: string, value: string | string[], visible: boolean, order?: number }[]): string {
  // Grupuj segmenty według obszarów
  const groupedSegments = groupSegmentsByArea(activeSegments as any)
  
  // Tablica na segmenty kodu DNA
  const dnaSegments = []
  
  // Dla każdego obszaru
  Object.entries(groupedSegments).forEach(([areaId, areaSegments]) => {
    if (areaSegments.length === 0) return
    
    // Znajdź obszar
    const area = areas.find(a => a.id === areaId)
    if (!area) return
    
    // Emoji obszaru
    const areaEmoji = area.emoji
    
    // Tablica na kody segmentów
    const segmentCodes = []
    
    // Dla każdego segmentu w obszarze
    areaSegments.forEach(({ segmentId, value }) => {
      // Pobierz dane segmentu
      const segment = segments.find(s => s.id === segmentId)
      if (!segment) return
      
      // Emoji segmentu
      const segmentEmoji = segment.emoji
      if (!segmentEmoji) return
      
      // Kod DNA dla wartości
      const dnaValue = getDNACodeForValue(segmentId, value)
      
      // Dodaj kod segmentu
      segmentCodes.push(`${segmentEmoji}${dnaValue}`)
    })
    
    // Jeśli są jakieś kody segmentów, dodaj segment obszaru
    if (segmentCodes.length > 0) {
      dnaSegments.push(`${areaEmoji}${segmentCodes.join('')}`)
    }
  })
  
  // Połącz wszystkie segmenty
  return dnaSegments.join('|')
}

// Funkcja do inicjalizacji kodów dla wszystkich segmentów
export function ensureAllSegmentCodes(): void {
  // Pobierz wszystkie segmenty
  const allSegments = segments
  
  // Zbiór istniejących kodów
  const existingCodes = new Set(allSegments.filter(s => s.code).map(s => s.code))
  
  // Dla każdego segmentu bez kodu, wygeneruj kod
  allSegments.forEach(segment => {
    if (!segment.code) {
      // Wygeneruj kod segmentu
      const code = generateSegmentCode(segment.id, existingCodes)
      
      // Dodaj kod do zbioru istniejących kodów
      existingCodes.add(code)
      
      // Ustaw kod segmentu
      segment.code = code
    }
  })
}
